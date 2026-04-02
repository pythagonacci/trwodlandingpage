import Link from "next/link";
import type { Route } from "next";
import { PostsTable } from "@/components/admin/PostsTable";
import type { PostRecord } from "@/lib/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, content, is_published, published_at, created_at, updated_at")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as PostRecord[];

  return (
    <main className="space-y-8 py-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone">CMS</p>
          <h1 className="font-display text-4xl leading-tight text-ink">Manage journal posts</h1>
          <p className="max-w-2xl text-sm text-ink-2">
            Draft, publish, and update long-form content without leaving the site.
          </p>
        </div>
        <Link
          href={"/admin/posts/new" as Route}
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
        >
          New Post
        </Link>
      </section>

      <div className="rounded-[24px] border border-[rgba(29,78,216,0.18)] bg-[rgba(239,246,255,0.7)] p-5 shadow-[0_12px_28px_rgba(29,78,216,0.08)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-2">
          <p>
            Create a draft here:
            <Link href={"/admin/posts/new" as Route} className="ml-2 font-medium text-accent underline">
              /admin/posts/new
            </Link>
          </p>
          <p>
            Published posts are visible here:
            <Link href={"/blog" as Route} className="ml-2 font-medium text-accent underline">
              /blog
            </Link>
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-[24px] border border-cream-3 bg-[rgba(250,248,244,0.94)] p-6 text-sm text-ink-2 shadow-[0_18px_40px_rgba(28,25,23,0.06)]">
          Unable to load posts. Run the SQL migration in
          <span className="font-medium text-ink"> supabase/migrations/001_blog.sql </span>
          and confirm the table exists in Supabase.
        </div>
      ) : (
        <PostsTable posts={posts} />
      )}
    </main>
  );
}
