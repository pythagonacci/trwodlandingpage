import Link from "next/link";
import { formatDate } from "@/lib/cms/validation";
import type { PostWithCategory } from "@/lib/cms/types";

export function PostsTable({ posts }: { posts: PostWithCategory[] }) {
  if (!posts.length) {
    return (
      <div className="rounded-xl border border-[rgba(144,144,144,0.2)] bg-white p-8 text-[14px] text-ink-3">
        No posts yet. Create the first draft to start building the editorial library.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(144,144,144,0.2)] bg-white shadow-[0_12px_28px_rgba(28,25,23,0.04)]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead className="bg-cream-2 text-[11px] uppercase tracking-[0.12em] text-ink-3">
          <tr>
            <th className="px-4 py-3 font-semibold">Post</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Updated</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t border-[rgba(144,144,144,0.16)]">
              <td className="px-4 py-4">
                <Link href={`/studio/posts/${post.id}`} className="font-semibold text-ink hover:text-accent">
                  {post.title}
                </Link>
                <p className="mt-1 max-w-[560px] truncate text-[13px] text-ink-3">{post.excerpt}</p>
              </td>
              <td className="px-4 py-4 text-ink-3">{post.categories?.name ?? "Uncategorized"}</td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    post.status === "published"
                      ? "bg-accent-bg text-accent"
                      : "bg-cream-3 text-ink-3"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-4 py-4 text-ink-3">{formatDate(post.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
