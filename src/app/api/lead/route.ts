import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { Resend } from 'resend';

const schema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().email().max(320),
  company: z.string().max(200).optional(),
  website: z.string().url().max(500).optional().or(z.literal('')),
  message: z.string().max(5000).optional(),
  source: z.enum(['contact', 'demo']),
  utm: z.record(z.unknown()).optional(),
  website_url: z.string().optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input.', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website_url: honeypot, ...rest } = parsed.data;
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const supabase = createAdminClient();
  const row = {
    name: rest.name ?? null,
    email: rest.email,
    company: rest.company ?? null,
    website: rest.website || null,
    message: rest.message ?? null,
    source: rest.source,
    utm: rest.utm ?? null,
  };

  const { error: insertError } = await supabase
    .from('marketing_leads')
    .insert(row);

  if (insertError) {
    console.error('Supabase insert error:', insertError);
    return NextResponse.json(
      { error: 'Failed to save your message. Please try again.' },
      { status: 500 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEADS_NOTIFY_EMAIL ?? '';
  if (resendKey && notifyEmail) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'Trak Landing <onboarding@resend.dev>',
        to: [notifyEmail],
        subject: `[Trak] New ${rest.source} lead: ${rest.email}`,
        text: [
          `Source: ${rest.source}`,
          `Email: ${rest.email}`,
          rest.name && `Name: ${rest.name}`,
          rest.company && `Company: ${rest.company}`,
          rest.message && `Message:\n${rest.message}`,
        ]
          .filter(Boolean)
          .join('\n'),
      });
    } catch (emailErr) {
      console.error('Resend error:', emailErr);
    }
  }

  return NextResponse.json({ success: true });
}
