import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

function getPriceId(planId: string): string | null {
  const plan = planId.trim().toLowerCase();
  if (plan === 'pro') return process.env.STRIPE_PRICE_ID_PRO ?? null;
  if (plan === 'team') return process.env.STRIPE_PRICE_ID_TEAM ?? null;
  return null;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured.' },
      { status: 500 }
    );
  }

  let body: {
    priceId?: string;
    planId?: string;
    customerEmail?: string;
    clientReferenceId?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const priceId =
    body.priceId?.trim() ||
    (body.planId && getPriceId(body.planId));
  if (!priceId) {
    return NextResponse.json(
      { error: 'Invalid or missing plan / price ID.' },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001';

  const clientReferenceId = body.clientReferenceId?.trim();
  const validRef =
    clientReferenceId &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      clientReferenceId
    );

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=1`,
      customer_email: body.customerEmail?.trim() || undefined,
      client_reference_id: validRef ? clientReferenceId : undefined,
    });

    return NextResponse.json({ url: session.url ?? undefined });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Failed to create checkout session.' },
      { status: 500 }
    );
  }
}
