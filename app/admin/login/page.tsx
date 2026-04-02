import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminLoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (user?.email?.toLowerCase() === adminEmail) {
    redirect("/admin");
  }

  if (user && user.email?.toLowerCase() !== adminEmail) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams.error;
  const initialError =
    typeof error === "string" && error === "auth_failed"
      ? "Magic link verification failed. Request a new link and try again."
      : undefined;

  return (
    <main className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
      <section className="w-full max-w-md rounded-[28px] border border-cream-3 bg-[rgba(250,248,244,0.94)] p-8 shadow-[0_28px_60px_rgba(28,25,23,0.08)] backdrop-blur-sm">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone">Admin</p>
          <h1 className="font-display text-4xl leading-tight text-ink">Sign in to the journal CMS</h1>
          <p className="text-sm text-ink-2">
            Magic-link access is limited to the configured admin email. Supabase Auth must have
            <span className="font-medium text-ink"> /admin/auth/callback </span>
            configured as an allowed redirect URL.
          </p>
        </div>
        <AdminLoginForm initialError={initialError} />
      </section>
    </main>
  );
}
