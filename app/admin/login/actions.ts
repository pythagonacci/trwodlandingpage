"use server";

import { headers } from "next/headers";
import { SITE_URL } from "@/app/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type MagicLinkResult = {
  success: boolean;
  error?: string;
};

function getBaseUrl(forwardedHeaders: Headers): string {
  const host = forwardedHeaders.get("x-forwarded-host") ?? forwardedHeaders.get("host");
  const protocol = forwardedHeaders.get("x-forwarded-proto") ?? "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return SITE_URL;
}

export async function sendMagicLink(email: string): Promise<MagicLinkResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!normalizedEmail) {
    return {
      success: false,
      error: "Enter the admin email address."
    };
  }

  if (!adminEmail || normalizedEmail !== adminEmail) {
    return {
      success: false,
      error: "This email is not authorized for the CMS."
    };
  }

  const headerStore = await headers();
  const supabase = await createSupabaseServerClient();
  const redirectUrl = `${getBaseUrl(headerStore)}/admin/auth/callback`;
  const { error } = await supabase.auth.signInWithOtp({
    email: normalizedEmail,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: redirectUrl
    }
  });

  if (error) {
    return {
      success: false,
      error: error.message
    };
  }

  return { success: true };
}
