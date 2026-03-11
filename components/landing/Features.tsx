export function Features() {
  return (
    <section
      id="features"
      className="border-b border-cream-3 bg-cream"
    >
      <div className="grid grid-cols-2 gap-[60px] border-b border-cream-3 px-[60px] pb-16 pt-[100px] max-[880px]:grid-cols-1 max-[880px]:gap-6 max-[880px]:px-6 max-[880px]:pb-10 max-[880px]:pt-[60px]">
        <div>
          <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Built for Brand Ops
          </div>
          <h2 className="font-display text-[clamp(36px,3.9vw,58px)] font-normal leading-[1.1] tracking-[-0.05em] text-ink">
            Infrastructure for how brands{" "}
            <span className="font-display font-bold text-accent">
              actually work.
            </span>
          </h2>
        </div>
        <p className="self-end text-[15px] leading-[1.8] text-ink-2">
          Most tools manage tasks. Trak embeds your entire workflow in one place
          — products, images, files, tasks, approvals, and live Shopify data —
          so execution happens where the work actually lives.
        </p>
      </div>

      <div className="border-b border-cream-3 bg-cream-2 px-[60px] py-12 max-[880px]:px-6 max-[880px]:py-10">
        <div className="flex w-full items-center justify-center rounded-card border-[1.5px] border-dashed border-cream-3 bg-cream">
          <span className="py-16 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            Product Demo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-cream-3 max-[880px]:grid-cols-1">
        <div className="border-r border-cream-3 px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream max-[880px]:border-r-0 max-[880px]:px-6 max-[880px]:py-10">
          <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
            Shopify Native
          </span>
          <h3 className="mb-[14px] font-display text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.04em] text-ink">
            Trak doesn&apos;t integrate with Shopify.{" "}
            <span className="font-display font-bold text-accent">
              It&apos;s built around it.
            </span>
          </h3>
          <p className="mb-7 max-w-[440px] text-[15px] leading-[1.8] text-ink-2">
            Live inventory, variants, pre-order counts, and fulfillment status —
            attached to the projects they belong to. Your business context lives
            next to your work.
          </p>
          <div className="group w-full overflow-hidden rounded-[10px] border border-cream-3">
            <div className="flex aspect-[16/9] items-center justify-center border-[1.5px] border-dashed border-cream-3 bg-cream text-[12px] font-medium uppercase tracking-[0.1em] text-sand transition-transform duration-500 group-hover:scale-[1.02]">
              Shopify + Trak view
            </div>
          </div>
        </div>

        <div className="px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream max-[880px]:border-t max-[880px]:border-cream-3 max-[880px]:px-6 max-[880px]:py-10">
          <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
            Creative Workspace
          </span>
          <h3 className="mb-[14px] font-display text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.04em] text-ink">
            Assets, briefs, moodboards.{" "}
            <span className="font-display font-bold text-accent">
              All in one tab.
            </span>
          </h3>
          <p className="mb-7 max-w-[440px] text-[15px] leading-[1.8] text-ink-2">
            Inspiration photos next to quality checklists. Campaign briefs next
            to production timelines. Everything your team touches, in one
            place.
          </p>
          <div className="group w-full overflow-hidden rounded-[10px] border border-cream-3">
            <div className="flex aspect-[16/9] items-center justify-center border-[1.5px] border-dashed border-cream-3 bg-cream text-[12px] font-medium uppercase tracking-[0.1em] text-sand transition-transform duration-500 group-hover:scale-[1.02]">
              Moodboard + quality tracker
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-cream-3 px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream-2 max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          AI-Powered
        </span>
        <h3 className="mb-[14px] font-display text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.04em] text-ink">
          Ask questions. Get answers.{" "}
          <span className="font-display font-bold text-accent">Take action.</span>
        </h3>
        <p className="mb-7 max-w-[600px] text-[15px] leading-[1.8] text-ink-2">
          Your AI assistant operates inside your work — not on top of it. Ask it
          anything. Then tell it what to do.
          <br />
          <br />
          <span className="font-medium text-ink">
            &quot;Create a table of all influencers by submission status.&quot; ·
            &nbsp;&quot;Update every campaign deadline to April 15th.&quot; ·
            &nbsp;&quot;What&apos;s blocking the Spring launch?&quot;
          </span>
        </p>
        <div className="flex w-full items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-cream-3 bg-cream-2">
          <span className="py-10 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            AI assistant demo
          </span>
        </div>
      </div>

      <div className="px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream-2 max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          Brand Calendar
        </span>
        <h3 className="mb-[14px] font-display text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.04em] text-ink">
          Your brand&apos;s entire operating rhythm.{" "}
          <span className="font-display font-bold text-accent">One view.</span>
        </h3>
        <p className="mb-7 max-w-[600px] text-[15px] leading-[1.8] text-ink-2">
          Every launch, campaign, content drop, and influencer post date in a
          single calendar. See the whole picture without assembling it from
          five places.
        </p>
        <div className="flex w-full items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-cream-3 bg-cream-2">
          <span className="py-10 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            Brand calendar demo
          </span>
        </div>
      </div>
    </section>
  );
}

