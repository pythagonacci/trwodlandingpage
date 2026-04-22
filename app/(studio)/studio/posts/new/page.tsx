import { PostEditor } from "@/components/studio/PostEditor";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { getStudioCategories } from "@/lib/cms/queries";

export default async function NewPostPage() {
  const { supabase } = await requireStudioAdmin();
  const categories = await getStudioCategories(supabase);

  return <PostEditor post={null} categories={categories} />;
}
