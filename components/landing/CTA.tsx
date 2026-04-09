"use client";

import { useEffect, useRef, useState } from "react";

export function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      {
        threshold: 0.45
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isSectionInView) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
  }, [isSectionInView]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="cta-shell relative border-b border-cream-3 bg-cream-2 px-[60px] pb-[112px] pt-[112px] text-center max-[880px]:px-6 max-[880px]:pb-[84px] max-[880px]:pt-[84px]"
    >
      <span className="mb-6 block text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
        Create Boldly
      </span>
      <h2
        className="mx-auto mb-8 max-w-[760px] font-display text-[clamp(40px,5vw,68px)] font-normal leading-[1.06] text-ink"
        style={{ letterSpacing: "-1.5px" }}
      >
        Your tools should match your{" "}
        <span
          className="font-display font-semibold text-accent"
          style={{ letterSpacing: "-1px" }}
        >
          ambition.
        </span>
      </h2>
      <a
        href="https://app.sariasoftware.com/start-free-trial"
        className="inline-block rounded-full bg-[#2B52EE] px-8 py-3 text-[13px] font-medium text-white shadow-[0_14px_34px_rgba(43,82,238,0.24)] transition-colors duration-200 hover:bg-[#2147D0]"
        target="_blank"
        rel="noreferrer"
      >
        Start Free Trial
      </a>
      <div className="feature-demo-shell mx-auto mt-6 w-full max-w-[1040px]">
        <div className="feature-demo-frame relative aspect-[16/9] w-full overflow-hidden max-[880px]:aspect-[16/10]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          >
            <source src="/saria%20final.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={() => setIsMuted((current) => !current)}
            className="absolute bottom-4 right-4 rounded-full bg-[rgba(15,23,42,0.76)] px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[rgba(15,23,42,0.9)]"
          >
            {isMuted ? "Tap for sound" : "Mute video"}
          </button>
        </div>
      </div>
      <p className="mt-[18px] text-[12px] text-stone">
        No credit card required · Free 14-day trial · Setup in minutes
      </p>
    </section>
  );
}
