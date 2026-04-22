import { MediaGrid } from "@/components/studio/MediaGrid";
import { requireStudioAdmin } from "@/lib/cms/auth";
import { getStudioMediaAssets } from "@/lib/cms/queries";

export default async function StudioMediaPage() {
  const { supabase } = await requireStudioAdmin();
  const assets = await getStudioMediaAssets(supabase);

  return (
    <div>
      <div className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          Assets
        </p>
        <h1 className="mt-2 font-display text-[44px] leading-[1.04] text-ink">
          Media
        </h1>
        <p className="mt-2 max-w-[620px] text-[15px] text-ink-3">
          Recent Supabase Storage uploads from cover and article-body image workflows.
        </p>
      </div>
      <MediaGrid assets={assets} />
    </div>
  );
}
