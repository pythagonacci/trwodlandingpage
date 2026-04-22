"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";

export type LoginState = {
  message: string;
  ok: boolean;
};

export async function sendStudioMagicLink(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!hasSupabaseEnv()) {
    return {
      ok: false,
      message: "Supabase environment variables are not configured."
    };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = String(formData.get("next") ?? "/studio");

  if (!email || !email.includes("@")) {
    return {
      ok: false,
      message: "Enter a valid admin email."
    };
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const redirectTo = new URL("/studio/auth/callback", origin);
  redirectTo.searchParams.set("next", next.startsWith("/studio") ? next : "/studio");

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo.toString()
    }
  });

  if (error) {
    return {
      ok: false,
      message: error.message
    };
  }

  return {
    ok: true,
    message: "Check your email for the secure studio sign-in link."
  };
}

export async function signOutOfStudio() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/studio/login");
}
