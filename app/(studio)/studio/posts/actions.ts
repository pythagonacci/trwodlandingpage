"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { sanitizeEditorContent, toPlainEditorContent } from "@/lib/cms/content";
import { cleanOptionalString, estimateReadingTime, postPayloadSchema } from "@/lib/cms/validation";
import type { PostStatus } from "@/lib/cms/types";

export type SavePostResult = {
  ok: boolean;
  postId?: string;
  slug?: string;
  status?: PostStatus;
  publishedAt?: string | null;
  message: string;
};

export async function savePost(
  postId: string | null,
  payload: unknown,
  nextStatus: PostStatus
): Promise<SavePostResult> {
  const { supabase, user } = await requireStudioAdmin();
  const parsed = postPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "The post has invalid fields."
    };
  }

  const data = parsed.data;
  const content = sanitizeEditorContent(toPlainEditorContent(data.content as JSONContent));
  const now = new Date().toISOString();
  const readingTime = estimateReadingTime(content, data.excerpt);

  const record = {
    title: data.title,
    slug: data.slug,
    excerpt: cleanOptionalString(data.excerpt),
    category_id: data.categoryId,
    cover_image_url: cleanOptionalString(data.coverImageUrl),
    cover_image_alt: cleanOptionalString(data.coverImageAlt),
    editor_content_json: content,
    editor_content_html: null,
    status: nextStatus,
    published_at: nextStatus === "published" ? now : null,
    author_name: cleanOptionalString(data.authorName) ?? "Trak Editorial",
    seo_title: cleanOptionalString(data.seoTitle),
    seo_description: cleanOptionalString(data.seoDescription),
    seo_og_image_url: cleanOptionalString(data.seoOgImageUrl),
    canonical_url: cleanOptionalString(data.canonicalUrl),
    reading_time: readingTime,
    featured: data.featured ?? false,
    updated_by: user.id
  };

  const result = postId
    ? await supabase
        .from("posts")
        .update(record)
        .eq("id", postId)
        .select("id, slug, status, published_at")
        .single()
    : await supabase
        .from("posts")
        .insert({
          ...record,
          created_by: user.id
        })
        .select("id, slug, status, published_at")
        .single();

  if (result.error) {
    const duplicate = result.error.code === "23505";
    return {
      ok: false,
      message: duplicate
        ? "That slug is already used in this category."
        : result.error.message
    };
  }

  revalidatePath("/blog");
  revalidatePath("/studio/posts");

  return {
    ok: true,
    postId: result.data.id,
    slug: result.data.slug,
    status: result.data.status,
    publishedAt: result.data.published_at,
    message: result.data.status === "published" ? "Post published." : "Draft saved."
  };
}

export async function deletePost(postId: string) {
  const { supabase } = await requireStudioAdmin();
  await supabase.from("posts").delete().eq("id", postId);
  revalidatePath("/studio/posts");
  revalidatePath("/blog");
  redirect("/studio/posts");
}
