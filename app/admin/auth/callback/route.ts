import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Configure this URL in Supabase dashboard -> Authentication -> URL Configuration -> Redirect URLs.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/admin/login?error=auth_failed", url));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/admin/login?error=auth_failed", url));
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!user || user.email?.toLowerCase() !== adminEmail) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.redirect(new URL("/admin", url));
}
