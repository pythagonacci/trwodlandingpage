import Link from "next/link";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { signOutOfStudio } from "@/app/(studio-auth)/studio/login/actions";

export const dynamic = "force-dynamic";

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireStudioAdmin();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-[rgba(144,144,144,0.2)] bg-[rgba(255,255,255,0.92)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/studio/posts" className="font-display text-[16px] font-semibold">
              Saria Studio
            </Link>
            <nav className="hidden items-center gap-4 text-[13px] text-ink-3 md:flex">
              <Link href="/studio/posts" className="hover:text-ink">
                Posts
              </Link>
              <Link href="/studio/posts/new" className="hover:text-ink">
                New post
              </Link>
              <Link href="/studio/media" className="hover:text-ink">
                Media
              </Link>
              <Link href="/blog" className="hover:text-ink">
                Public blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[12px] text-ink-3 sm:inline">{user.email}</span>
            <form action={signOutOfStudio}>
              <button
                type="submit"
                className="rounded-full border border-[rgba(144,144,144,0.28)] bg-white px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
