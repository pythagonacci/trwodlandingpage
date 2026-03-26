"use client";

import Image from "next/image";
import { useState } from "react";

export function Hero() {
  const heroVideoSrc = "/media/demo1-web.mp4";
  const heroPosterSrc = "/media/demo1-poster.jpg";
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <section
      id="top"
      className="border-b pt-[60px]"
      style={{ backgroundColor: "#F4F2EE", borderColor: "#DEDBD4" }}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center px-8 pb-16">
        {/* Badge pill */}
        <div
          className="hero-anim hero-anim-badge mt-6 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 pl-2.5 text-[12.5px] font-medium tracking-[0.02em] md:mt-8 md:mb-5"
          style={{ backgroundColor: "#EBF0FF", color: "#2B52EE" }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: "#2B52EE" }}
          />
          Built for D2C Brands
        </div>

        {/* Headline */}
        <h1
          className="hero-anim hero-anim-heading mx-auto mb-4 max-w-[1100px] text-center font-display text-[clamp(32px,5.5vw,68px)] font-normal leading-[1.08]"
          style={{
            fontFamily: "var(--font-hero-display), Georgia, serif",
            letterSpacing: "-2px",
            color: "#0F0E0C"
          }}
        >
          Project Management for Modern D2C Brands
        </h1>

        {/* Subheadline */}
        <p
          className="hero-anim hero-anim-sub mb-6 max-w-[720px] text-center text-[16px] font-light leading-[1.7]"
          style={{ color: "#555" }}
        >
          Your brand runs on five tabs, three apps, and a group chat. Saria puts
          your products, people, and launches in one place — so you can stop
          managing tools and start managing your brand.
        </p>

        {/* CTA row + no credit card */}
        <div className="hero-anim hero-anim-ctas mb-6 flex flex-col items-center gap-2">
          <div className="flex flex-row flex-wrap items-center justify-center gap-6">
            <a
              href="https://app.sariasoftware.com/start-free-trial"
              className="rounded-full px-3 py-1.5 text-[11px] font-medium text-white transition-colors duration-200 hover:opacity-90"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: "#2B52EE" }}
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="flex items-center gap-1 text-[11px] font-normal text-ink transition-colors duration-150 hover:opacity-70"
            >
              See how it works →
            </a>
          </div>
          <span className="text-[11px]" style={{ color: "#78716C" }}>
            No credit card required
          </span>
        </div>

        {/* Hero visual + logo bar wrapper — visual and logo bar connect seamlessly */}
        <div className="hero-video-shell w-full max-w-[1320px]" style={{ width: "100%", maxWidth: "1320px" }}>
          <div
            className="hero-video-frame relative flex aspect-[16/8.2] items-center justify-center overflow-hidden max-[880px]:aspect-[4/3]"
            style={{ position: "relative", width: "100%", aspectRatio: "16 / 8.2", overflow: "hidden" }}
          >
            <Image
              src={heroPosterSrc}
              alt="Saria workspace preview"
              fill
              priority
              sizes="(max-width: 880px) 100vw, 1320px"
              className={`object-cover transition-opacity duration-300 ${isVideoReady ? "opacity-0" : "opacity-100"}`}
            />
            <video
              className={`h-full w-full object-cover transition-opacity duration-300 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              poster={heroPosterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setIsVideoReady(true)}
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          </div>

          <div
            className="hero-video-bar flex items-center justify-center gap-4 px-6 py-4"
            style={{ width: "100%" }}
          >
            <span
              className="text-[11px] font-normal uppercase tracking-[0.06em]"
              style={{ color: "#78716C" }}
            >
              Trusted by teams at
            </span>
            <div className="h-4 w-px" style={{ backgroundColor: "#DEDBD4" }} />
            <div className="flex items-center gap-5 text-[13px] font-medium tracking-[0.04em]" style={{ color: "#6B6760" }}>
              <span>RHODE</span>
              <span>GISOU</span>
              <span>RIDGE</span>
              <span>DAIRY BOY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
