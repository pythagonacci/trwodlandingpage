"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState, useTransition } from "react";
import { deletePost, togglePublish } from "@/app/admin/posts/actions";
import { formatPostDate, type PostRecord } from "@/lib/blog";

type PostsTableProps = {
  posts: PostRecord[];
};

export function PostsTable({ posts }: PostsTableProps) {
  const [feedback, setFeedback] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const runAction = (postId: string, action: () => Promise<{ success: boolean; error?: string }>) => {
    setActiveId(postId);
    setFeedback("");

    startTransition(async () => {
      const result = await action();
      setActiveId(null);

      if (!result.success) {
        setFeedback(result.error ?? "Action failed.");
        return;
      }

      setFeedback("Saved.");
    });
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-cream-3 bg-[rgba(250,248,244,0.94)] shadow-[0_24px_52px_rgba(28,25,23,0.08)] backdrop-blur-sm">
      <div className="flex flex-col gap-4 border-b border-cream-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Posts</h2>
          <p className="text-sm text-ink-2">All drafts and published entries live here.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={"/blog" as Route}
            className="inline-flex items-center justify-center rounded-full border border-cream-3 px-5 py-3 text-sm font-medium text-ink transition hover:border-stone hover:bg-cream-2"
          >
            View Blog
          </Link>
          <Link
            href={"/admin/posts/new" as Route}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-95"
          >
            New Post
          </Link>
        </div>
      </div>

      {feedback ? <div className="border-b border-cream-3 px-6 py-3 text-sm text-ink-2">{feedback}</div> : null}

      {posts.length === 0 ? (
        <div className="px-6 py-10 text-sm text-ink-2">No posts yet. Start with a draft.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cream-3 text-left">
            <thead className="bg-[rgba(242,239,232,0.72)] text-xs uppercase tracking-[0.18em] text-stone">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Published date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-3 text-sm text-ink-2">
              {posts.map((post) => {
                const rowPending = isPending && activeId === post.id;

                return (
                  <tr key={post.id} className="align-top">
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="font-medium text-ink">{post.title}</div>
                        <div className="text-xs text-stone">/{post.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          post.is_published
                            ? "bg-[rgba(29,78,216,0.12)] text-accent"
                            : "bg-cream-2 text-ink-2"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-5">{post.is_published ? formatPostDate(post.published_at) : "—"}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/admin/posts/${post.id}/edit` as Route}
                          className="text-sm font-medium text-ink transition hover:text-accent"
                        >
                          Edit
                        </Link>
                        {post.is_published ? (
                          <Link
                            href={`/blog/${post.slug}` as Route}
                            className="text-sm font-medium text-ink transition hover:text-accent"
                          >
                            View Live
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          disabled={rowPending}
                          onClick={() =>
                            runAction(post.id, () => togglePublish(post.id, post.is_published))
                          }
                          className="text-sm font-medium text-ink transition hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {post.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          disabled={rowPending}
                          onClick={() => {
                            if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                              return;
                            }

                            runAction(post.id, () => deletePost(post.id));
                          }}
                          className="text-sm font-medium text-[rgba(161,47,27,0.9)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
