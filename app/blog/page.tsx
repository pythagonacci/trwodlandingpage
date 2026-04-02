import Link from "next/link";
import type { Route } from "next";
import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { formatPostDate, type PostRecord } from "@/lib/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = createPageMetadata({
  title: "Journal | Saria",
  description: "Editorial notes, launch breakdowns, and operating insights from the Saria team.",
  path: "/blog"
});

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, content, is_published, published_at, created_at, updated_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const posts = (data ?? []) as PostRecord[];

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream pt-[96px]">
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 pb-12">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone">Journal</p>
            <h1 className="font-display text-5xl leading-tight text-ink sm:text-6xl">
              Operational notes for modern brand teams
            </h1>
            <p className="text-base text-ink-2 sm:text-lg">
              Stories, launch systems, and behind-the-scenes thinking from the team building Saria.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-[28px] border border-cream-3 bg-[rgba(250,248,244,0.92)] p-8 text-ink-2 shadow-[0_24px_52px_rgba(28,25,23,0.06)]">
              No published posts yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-[28px] border border-cream-3 bg-[rgba(250,248,244,0.94)] shadow-[0_24px_52px_rgba(28,25,23,0.08)]"
                >
                  {post.cover_image_url ? (
                    <Link href={`/blog/${post.slug}` as Route} className="block">
                      <img
                        src={post.cover_image_url}
                        alt=""
                        loading="lazy"
                        className="h-60 w-full object-cover"
                      />
                    </Link>
                  ) : null}
                  <div className="space-y-4 p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone">
                      {formatPostDate(post.published_at)}
                    </p>
                    <div className="space-y-3">
                      <h2 className="font-display text-3xl leading-tight text-ink">
                        <Link href={`/blog/${post.slug}` as Route} className="transition hover:text-accent">
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt ? <p className="text-sm leading-7 text-ink-2">{post.excerpt}</p> : null}
                    </div>
                    <Link
                      href={`/blog/${post.slug}` as Route}
                      className="inline-flex text-sm font-medium text-ink transition hover:text-accent"
                    >
                      Read post
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
