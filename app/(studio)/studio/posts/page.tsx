import Link from "next/link";
import { PostsTable } from "@/components/studio/PostsTable";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { getStudioPosts } from "@/lib/cms/queries";

export default async function StudioPostsPage() {
  const { supabase } = await requireStudioAdmin();
  const posts = await getStudioPosts(supabase);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            CMS
          </p>
          <h1 className="mt-2 font-display text-[44px] leading-[1.04] text-ink">
            Posts
          </h1>
          <p className="mt-2 max-w-[620px] text-[15px] text-ink-3">
            Draft, publish, and update editorial posts for the marketing blog.
          </p>
        </div>
        <Link
          href="/studio/posts/new"
          className="rounded-full bg-[var(--ink)] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[var(--ink-2)]"
        >
          New post
        </Link>
      </div>
      <PostsTable posts={posts} />
    </div>
  );
}
