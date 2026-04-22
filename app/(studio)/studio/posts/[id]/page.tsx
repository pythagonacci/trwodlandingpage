import { notFound } from "next/navigation";
import { PostEditor } from "@/components/studio/PostEditor";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { getStudioCategories, getStudioPost } from "@/lib/cms/queries";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { supabase } = await requireStudioAdmin();
  const [post, categories] = await Promise.all([
    getStudioPost(supabase, id),
    getStudioCategories(supabase)
  ]);

  if (!post) {
    notFound();
  }

  return <PostEditor post={post} categories={categories} />;
}
