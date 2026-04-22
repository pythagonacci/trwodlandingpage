import { AutoplayVideo } from "@/components/landing/AutoplayVideo";

export function MagicLinks() {
  const createMagicLinkVideoSrc = "/media/finalml1-web.mp4";
  const createMagicLinkPosterSrc = "/media/finalml1-poster.jpg";
  const collaboratorUploadVideoSrc = "/media/ml2-web.mp4";
  const collaboratorUploadPosterSrc = "/media/ml2-poster.jpg";

  const rows = [
    "Photographers receive briefs, upload deliverables, get paid — no account needed",
    "Influencers get their brief, submit content for approval, track payment status",
    "Agencies review briefs, upload creative, give feedback — all in one place",
    "Brand partners coordinate co-launch assets and timelines without friction"
  ];

  const labels = ["Photographers", "Influencers", "Agencies", "Brand partners"];

  return (
    <section
      id="collaboration"
      className="border-b border-cream-3 bg-cream"
    >
      <div className="grid grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] max-[880px]:grid-cols-1">
        <div className="sticky top-[60px] flex flex-col justify-center self-start border-r border-cream-3 px-[60px] py-[100px] max-[880px]:static max-[880px]:border-b max-[880px]:border-r-0 max-[880px]:px-6 max-[880px]:pt-[60px] max-[880px]:pb-10">
          <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Magic Links
          </div>
          <h2 className="mb-6 font-display text-[clamp(36px,3.8vw,54px)] font-normal leading-[1.1] tracking-[-0.04em] text-ink">
            Every person who touches your brand.{" "}
            <span
              className="font-display font-semibold text-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              One link away.
            </span>
          </h2>
          <p className="mb-11 max-w-[380px] text-[15px] leading-[1.8] text-ink-2">
            You work with agencies, photographers, influencers, and freelancers
            every day. Managing them shouldn&apos;t require onboarding them into
            your internal systems. Send a Magic Link — they click, they see what
            they need, they deliver.
          </p>
          <div className="flex flex-col">
            {rows.map((row, index) => (
              <div
                key={row}
                className="flex items-start gap-[14px] border-t border-cream-3 py-4 text-[15px] leading-[1.6] text-ink-2 last:border-b"
              >
                <span className="mt-2 h-[6px] w-[6px] flex-shrink-0 rounded-full bg-accent" />
                <span>
                  <span className="font-medium text-ink">
                    {labels[index]}
                  </span>{" "}
                  {row.replace(`${labels[index]}`, "").trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-l border-cream-3 bg-cream-2">
          <div className="border-b border-cream-3 px-[52px] py-[48px] max-[880px]:px-6 max-[880px]:py-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full border border-[#BFDBFE] bg-accent-bg px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                01
              </span>
              <span className="text-[13px] font-medium tracking-[0.01em] text-ink-2">
                Create &amp; send a Magic Link
              </span>
            </div>
            <div className="feature-demo-shell w-full">
              <div className="feature-demo-frame relative aspect-[16/8.6] w-full overflow-hidden max-[880px]:aspect-[16/10]">
                <AutoplayVideo
                  className="h-full w-full object-cover"
                  poster={createMagicLinkPosterSrc}
                  src={createMagicLinkVideoSrc}
                  preload="auto"
                />
              </div>
            </div>
          </div>

          <div className="px-[52px] py-[48px] max-[880px]:border-t max-[880px]:border-cream-3 max-[880px]:px-6 max-[880px]:py-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full border border-[#BFDBFE] bg-accent-bg px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                02
              </span>
              <span className="text-[13px] font-medium tracking-[0.01em] text-ink-2">
                Collaborator uploads · You&apos;re notified instantly
              </span>
            </div>
            <div className="feature-demo-shell w-full">
              <div className="feature-demo-frame relative aspect-[16/8.6] w-full overflow-hidden max-[880px]:aspect-[16/10]">
                <AutoplayVideo
                  className="h-full w-full object-cover"
                  poster={collaboratorUploadPosterSrc}
                  src={collaboratorUploadVideoSrc}
                  preload="auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
