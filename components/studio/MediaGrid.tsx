import type { MediaAsset } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/validation";

export function MediaGrid({ assets }: { assets: MediaAsset[] }) {
  if (!assets.length) {
    return (
      <div className="rounded-xl border border-[rgba(144,144,144,0.2)] bg-white p-8 text-[14px] text-ink-3">
        Uploaded blog images will appear here after you add covers or body media in the editor.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <article
          key={asset.id}
          className="overflow-hidden rounded-xl border border-[rgba(144,144,144,0.2)] bg-white shadow-[0_12px_28px_rgba(28,25,23,0.04)]"
        >
          <div className="aspect-[4/3] bg-cream-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.public_url} alt={asset.alt_text ?? ""} className="h-full w-full object-cover" />
          </div>
          <div className="p-4">
            <p className="truncate text-[13px] font-semibold text-ink">{asset.filename}</p>
            <p className="mt-1 text-[12px] text-ink-3">{formatDate(asset.created_at)}</p>
            <a
              href={asset.public_url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-full border border-[rgba(144,144,144,0.26)] px-3 py-1.5 text-[12px] font-semibold text-ink hover:border-ink"
            >
              Open asset
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
