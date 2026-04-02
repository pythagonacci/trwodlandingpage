import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import type { PostRecord } from "@/lib/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, content, is_published, published_at, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return <PostEditor post={data as PostRecord} />;
}
