import { redirect } from "next/navigation";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!hasSupabaseEnv()) {
    return false;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return false;
  }

  const { data, error } = await supabase
    .from("admin_allowlist")
    .select("id")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  return !error && Boolean(data);
}

export async function getStudioAdminContext() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const { data, error } = await supabase
    .from("admin_allowlist")
    .select("id")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return { supabase, user };
}

export async function requireStudioAdmin() {
  if (!hasSupabaseEnv()) {
    redirect("/studio/login?error=missing-env");
  }

  const context = await getStudioAdminContext();

  if (!context) {
    redirect("/studio/login?error=unauthorized");
  }

  return context;
}
