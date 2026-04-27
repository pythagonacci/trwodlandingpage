"use client";

import { HeroWorkspaceVisual } from "@/components/landing/HeroWorkspaceVisual";

export function Hero() {
  return (
    <section id="top" className="bg-cream pt-[60px]">
      <div className="mx-auto max-w-[1320px] px-6 pb-14 md:px-8 lg:px-12 lg:pb-20">
        <div className="grid gap-10 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-20 lg:pt-10">
          <div>
            <h1 className="hero-anim hero-anim-heading font-display text-[clamp(32px,5.2vw,64px)] font-medium leading-[1.05] tracking-[-0.045em] text-ink">
              The Product Launch Workspace for Modern D2C Brands
            </h1>
          </div>
          <div className="flex flex-col justify-start lg:pt-1">
            <p className="hero-anim hero-anim-sub text-[16px] font-normal leading-[1.75] text-[#8a8a8e] md:text-[18px]">
              The AI-Native workspace for your products, team, and launches. Spend{" "}
              <strong className="font-medium text-ink">less time managing work</strong> and more time
              creating <strong className="font-medium text-ink">products customers love</strong>.
            </p>
            <div className="hero-anim hero-anim-ctas mt-5 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://app.sariasoftware.com/start-free-trial"
                  className="inline-flex items-center justify-center rounded-lg bg-[#2B52EE] px-4 py-2 text-[12px] font-medium text-white transition-colors duration-200 hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Free Trial
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-1 text-[12px] font-normal text-ink-3 transition-colors duration-150 hover:text-ink"
                >
                  See how it works →
                </a>
              </div>
              <span className="text-[11px] text-stone">No credit card required</span>
            </div>
          </div>
        </div>

        <div className="hero-workspace-shell hero-anim hero-anim-visual relative left-1/2 mt-12 w-[min(1520px,calc(100vw-20px))] max-w-none -translate-x-1/2 lg:mt-16 lg:w-[min(1600px,calc(100vw-56px))]">
          <div className="hero-workspace-frame">
            <HeroWorkspaceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
