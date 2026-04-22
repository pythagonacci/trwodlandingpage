import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, Database, MediaAsset, Post, PostWithCategory } from "@/lib/cms/types";
import { createPublicSupabaseClient, hasSupabaseEnv } from "@/lib/supabase/server";

const POST_SELECT = `
  id,
  title,
  slug,
  excerpt,
  category_id,
  cover_image_url,
  cover_image_alt,
  editor_content_json,
  editor_content_html,
  status,
  published_at,
  author_name,
  seo_title,
  seo_description,
  seo_og_image_url,
  canonical_url,
  reading_time,
  featured,
  created_by,
  updated_by,
  created_at,
  updated_at,
  categories (
    id,
    name,
    slug,
    description
  )
`;

async function safePublicQuery<T>(promise: PromiseLike<T>, fallback: T): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      Promise.resolve(promise),
      new Promise<T>((resolve) => {
        timeout = setTimeout(() => resolve(fallback), 5000);
      })
    ]);
  } catch {
    return fallback;
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

function publicFallback<T>(data: T) {
  return {
    success: true as const,
    data,
    error: null,
    count: null,
    status: 200,
    statusText: "CMS query unavailable"
  };
}

export async function getPublicCategories(): Promise<Category[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await safePublicQuery(
    supabase.from("categories").select("*").order("name"),
    publicFallback<Category[]>([])
  );

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPublicCategoryBySlug(slug: string): Promise<Category | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await safePublicQuery(
    supabase.from("categories").select("*").eq("slug", slug).maybeSingle(),
    publicFallback<Category | null>(null)
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPublishedPosts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<PostWithCategory[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = createPublicSupabaseClient();
  let categoryId: string | null = null;

  if (options?.categorySlug) {
    const { data: category, error: categoryError } = await safePublicQuery(
      supabase.from("categories").select("id").eq("slug", options.categorySlug).maybeSingle(),
      publicFallback<{ id: string } | null>(null)
    );

    if (categoryError) {
      throw new Error(categoryError.message);
    }

    if (!category) {
      return [];
    }

    categoryId = category.id;
  }

  let query = supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (options?.featuredOnly) {
    query = query.eq("featured", true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await safePublicQuery(query, publicFallback([]));

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PostWithCategory[];
}

export async function getPublishedPostByRoute(categorySlug: string, slug: string): Promise<PostWithCategory> {
  if (!hasSupabaseEnv()) {
    notFound();
  }

  const supabase = createPublicSupabaseClient();
  const { data: category, error: categoryError } = await safePublicQuery(
    supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle(),
    publicFallback<{ id: string } | null>(null)
  );

  if (categoryError || !category) {
    notFound();
  }

  const { data, error } = await safePublicQuery(
    supabase
      .from("posts")
      .select(POST_SELECT)
      .eq("slug", slug)
      .eq("category_id", category.id)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle(),
    publicFallback(null)
  );

  if (error || !data || (data as PostWithCategory).categories?.slug !== categorySlug) {
    notFound();
  }

  return data as PostWithCategory;
}

export async function getStudioCategories(
  supabase: SupabaseClient<Database>
): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getStudioPosts(
  supabase: SupabaseClient<Database>
): Promise<PostWithCategory[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PostWithCategory[];
}

export async function getStudioPost(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<Post | null> {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStudioMediaAssets(
  supabase: SupabaseClient<Database>
): Promise<MediaAsset[]> {
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
