"use server";

import { revalidatePath } from "next/cache";
import type { PostFormData, PostRecord } from "@/lib/blog";
import { slugify } from "@/lib/blog";
import { createEmptyRichTextDoc } from "@/lib/blog/content";
import { validatePostFormData } from "@/lib/blog/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PostActionResult = {
  success: boolean;
  error?: string;
  postId?: string;
  slug?: string;
  isPublished?: boolean;
  publishedAt?: string | null;
};

function randomSuffix() {
  return Math.random().toString(36).slice(2, 7);
}

async function ensureUniqueSlug(initialSlug: string, currentId: string | null) {
  const supabase = await createSupabaseServerClient();
  let candidate = initialSlug;
  let attempts = 0;

  while (attempts < 10) {
    let query = supabase.from("posts").select("id").eq("slug", candidate);

    if (currentId) {
      query = query.neq("id", currentId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return candidate;
    }

    candidate = `${initialSlug}-${randomSuffix()}`;
    attempts += 1;
  }

  return `${initialSlug}-${randomSuffix()}`;
}

function revalidatePostPaths(slug?: string | null, previousSlug?: string | null) {
  revalidatePath("/admin");
  revalidatePath("/blog");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/blog/${previousSlug}`);
  }
}

export async function deletePost(id: string): Promise<PostActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: existing, error: existingError } = await supabase
      .from("posts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePostPaths(existing?.slug);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to delete post."
    };
  }
}

export async function togglePublish(id: string, currentState: boolean): Promise<PostActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: existing, error: existingError } = await supabase
      .from("posts")
      .select("slug, published_at")
      .eq("id", id)
      .maybeSingle();

    if (existingError || !existing) {
      throw existingError ?? new Error("Post not found.");
    }

    const nextPublishedState = !currentState;
    const nextPublishedAt = nextPublishedState ? existing.published_at ?? new Date().toISOString() : null;
    const { data: updated, error } = await supabase
      .from("posts")
      .update({
        is_published: nextPublishedState,
        published_at: nextPublishedAt
      })
      .eq("id", id)
      .select("id, slug, is_published, published_at")
      .single();

    if (error) {
      throw error;
    }

    revalidatePostPaths(updated.slug, existing.slug);

    return {
      success: true,
      postId: updated.id,
      slug: updated.slug,
      isPublished: updated.is_published,
      publishedAt: updated.published_at
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to update publish state."
    };
  }
}

export async function savePost(id: string | null, data: PostFormData): Promise<PostActionResult> {
  try {
    const validation = validatePostFormData({
      ...data,
      content: data.content ?? createEmptyRichTextDoc()
    });

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message ?? "Invalid post data."
      };
    }

    const { title, excerpt, slug: requestedSlug, coverImageUrl, content, isPublished } = validation.data;

    const baseSlug = slugify(requestedSlug || title);

    if (!baseSlug) {
      return {
        success: false,
        error: "Provide a title or slug that can be converted into a URL."
      };
    }

    const supabase = await createSupabaseServerClient();
    let existingPost: Pick<PostRecord, "slug" | "published_at"> | null = null;

    if (id) {
      const { data: existing, error: existingError } = await supabase
        .from("posts")
        .select("slug, published_at")
        .eq("id", id)
        .maybeSingle();

      if (existingError || !existing) {
        throw existingError ?? new Error("Post not found.");
      }

      existingPost = existing as Pick<PostRecord, "slug" | "published_at">;
    }

    const uniqueSlug = await ensureUniqueSlug(baseSlug, id);
    const payload = {
      title,
      excerpt: excerpt || null,
      slug: uniqueSlug,
      content,
      cover_image_url: coverImageUrl || null,
      is_published: isPublished,
      published_at: isPublished ? existingPost?.published_at ?? new Date().toISOString() : null
    };

    if (id) {
      const { data: updated, error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", id)
        .select("id, slug, is_published, published_at")
        .single();

      if (error) {
        throw error;
      }

      revalidatePostPaths(updated.slug, existingPost?.slug);

      return {
        success: true,
        postId: updated.id,
        slug: updated.slug,
        isPublished: updated.is_published,
        publishedAt: updated.published_at
      };
    }

    const { data: created, error } = await supabase
      .from("posts")
      .insert(payload)
      .select("id, slug, is_published, published_at")
      .single();

    if (error) {
      throw error;
    }

    revalidatePostPaths(created.slug);

    return {
      success: true,
      postId: created.id,
      slug: created.slug,
      isPublished: created.is_published,
      publishedAt: created.published_at
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to save post."
    };
  }
}
