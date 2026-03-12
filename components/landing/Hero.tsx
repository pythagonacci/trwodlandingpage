"use client";

export function Hero() {
  return (
    <section
      id="top"
      className="grid min-h-[calc(100vh-60px)] grid-cols-[52%_48%] border-b border-cream-3 pt-[60px] max-[880px]:grid-cols-1"
    >
      <div className="flex flex-col justify-center border-r border-cream-3 px-[60px] pr-[60px] pl-[60px] py-20 max-[880px]:border-r-0 max-[880px]:px-6">
        <div className="hero-anim hero-anim-badge mb-10 inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] px-[14px] py-[5px] pr-[14px] pl-[8px] text-[11px] font-medium tracking-[0.02em]" style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
          <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: "#1D4ED8" }} />
          Built for D2C Brands
        </div>
        <h1 className="hero-anim hero-anim-heading mb-7 font-display text-[clamp(48px,5.2vw,72px)] font-normal leading-[1.08] tracking-[-0.06em] text-ink">
          Your launch is in three weeks.
          <br />
          <span
            className="font-display italic"
            style={{ color: "#1D4ED8" }}
          >
            Trak keeps it together.
          </span>
        </h1>
        <p className="hero-anim hero-anim-sub mb-11 max-w-[420px] text-[16px] font-normal leading-[1.8] text-ink-2">
          Briefs, timelines, Shopify data, and your agency — all in one workspace
          built for how D2C teams actually work. Stop hunting across Dropbox,
          Notion, and your inbox. Everything lives here.
        </p>
        <div className="hero-anim hero-anim-ctas mb-10 flex items-center gap-5 max-[480px]:flex-col max-[480px]:items-start">
          <div className="flex flex-col gap-[4px]">
            <a
              href="#cta"
              className="rounded-full px-[30px] py-[13px] text-[14px] font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: "#1D4ED8" }}
            >
              Start Free Trial
            </a>
            <span className="text-[11px] font-normal tracking-[0.03em] text-ink-3">
              No credit card required
            </span>
          </div>
          <a
            href="#features"
            className="flex items-center gap-[7px] border-b border-cream-3 pb-[2px] text-[14px] font-normal text-ink-2 transition-colors duration-150 hover:border-ink hover:text-ink"
          >
            See how it works →
          </a>
        </div>
        <div className="hero-anim hero-anim-proof mt-4 border-t border-cream-3 pt-7">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-medium tracking-[0.08em] text-stone">
            <span>RHODE</span>
            <span className="h-[3px] w-[3px] rounded-full bg-cream-3" />
            <span>GISOU</span>
            <span className="h-[3px] w-[3px] rounded-full bg-cream-3" />
            <span>RIDGE</span>
            <span className="h-[3px] w-[3px] rounded-full bg-cream-3" />
            <span>DAIRY BOY</span>
          </div>
        </div>
      </div>
      <div className="hero-anim hero-anim-visual flex items-center justify-center bg-cream-2 px-9 py-12 max-[880px]:hidden">
        <div className="w-full max-w-[520px] rounded-card border border-cream-3 border-dashed bg-cream shadow-hero">
          <div className="flex aspect-[16/9] items-center justify-center rounded-card border-[1.5px] border-dashed border-cream-3 bg-cream text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            Launch timeline screenshot
          </div>
        </div>
      </div>
    </section>
  );
}

