import Link from "next/link";
import { StudioLoginForm } from "@/components/studio/StudioLoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function StudioLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params.next?.startsWith("/studio") ? params.next : "/studio";
  const error =
    params.error === "unauthorized"
      ? "This account is not on the studio admin allowlist."
      : params.error === "missing-env"
        ? "Supabase is not configured for this deployment."
        : "";

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[1100px] items-center justify-center">
        <section className="w-full max-w-[460px] rounded-xl border border-[rgba(144,144,144,0.22)] bg-white p-8 shadow-[0_24px_70px_rgba(28,25,23,0.08)]">
          <Link href="/" className="font-display text-[18px] font-semibold text-ink">
            Saria
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Editorial Studio
          </p>
          <h1 className="mt-3 font-display text-[44px] leading-[1.02] text-ink">
            Sign in to publish.
          </h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink-3">
            Access is restricted to emails in the Supabase admin allowlist.
          </p>
          {error ? <p className="mt-4 rounded-lg bg-[#fff3f0] p-3 text-[13px] text-[#b42318]">{error}</p> : null}
          <StudioLoginForm next={next} />
        </section>
      </div>
    </main>
  );
}
