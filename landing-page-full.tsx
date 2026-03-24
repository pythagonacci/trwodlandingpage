/**
 * FULL LANDING PAGE — Single File
 * ===============================
 * This file contains the entire Saria landing page. All components are inlined.
 * No external component imports — everything is self-contained.
 *
 * SETUP FOR YOUR PROJECT:
 * 1. Ensure Tailwind CSS is configured with the colors/fonts from the config block below.
 * 2. Add the CSS from the GLOBALS CSS block below to your globals.css (or equivalent).
 * 3. Use this as your page component, or wrap it in a layout that provides the font variables.
 *
 * --- TAILWIND CONFIG (add to theme.extend in tailwind.config) ---
 * colors: {
 *   cream: "var(--cream)",
 *   "cream-2": "var(--cream-2)",
 *   "cream-3": "var(--cream-3)",
 *   sand: "var(--sand)",
 *   stone: "var(--stone)",
 *   ink: "var(--ink)",
 *   "ink-2": "var(--ink-2)",
 *   "ink-3": "var(--ink-3)",
 *   accent: "var(--accent)",
 *   "accent-bg": "var(--accent-bg)"
 * },
 * fontFamily: {
 *   display: ["var(--font-display)", "Georgia", "serif"],
 *   sans: ["var(--font-sans)", "system-ui", "sans-serif"]
 * },
 * boxShadow: { nav: "0 1px 12px rgba(28,25,23,0.06)" },
 * borderRadius: { card: "12px" },
 * transitionTimingFunction: { subtle: "ease" },
 *
 * --- GLOBALS CSS (add to your stylesheet) ---
 * :root {
 *   --cream: #FAF8F4;
 *   --cream-2: #F2EFE8;
 *   --cream-3: #E8E3D8;
 *   --sand: #D4CBB8;
 *   --stone: #9A9184;
 *   --ink: #1C1917;
 *   --ink-2: #44403C;
 *   --ink-3: #78716C;
 *   --accent: #1D4ED8;
 *   --accent-bg: #EFF6FF;
 * }
 * .fade-up-initial { opacity: 0; transform: translateY(12px); }
 * .fade-up-enter { opacity: 1; transform: translateY(0); transition: opacity 0.55s, transform 0.55s ease; }
 * .hero-anim { opacity: 0; animation: hero-fade-up 0.6s ease both; }
 * .hero-anim-badge { animation-delay: 0.05s; }
 * .hero-anim-heading { animation-delay: 0.15s; }
 * .hero-anim-sub { animation-delay: 0.28s; }
 * .hero-anim-ctas { animation-delay: 0.38s; }
 * .hero-anim-visual { animation-delay: 0.2s; animation-duration: 0.8s; }
 * @keyframes hero-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
 * .cta-shell::before, .cta-shell::after { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 9999px; border: 1px solid var(--cream-3); pointer-events: none; z-index: 0; }
 * .cta-shell::before { width: 900px; height: 900px; }
 * .cta-shell::after { width: 600px; height: 600px; }
 * .cta-shell > * { position: relative; z-index: 1; }
 */

"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

// =============================================================================
// useInView hook (inlined — used by Pain section)
// =============================================================================

function useInView<T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInView(true);
        });
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref, options, isInView]);

  return isInView;
}

// =============================================================================
// NAV
// =============================================================================

const NAV_LINKS = [
  { href: "#features", label: "Shopify Integration" },
  { href: "#why-saria", label: "For Brand Teams" },
  { href: "#collaboration", label: "Collaboration" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-[60px] border-b border-cream-3 bg-[rgba(250,248,244,0.94)] backdrop-blur-xl transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink"
        >
          Saria
        </a>
        <ul className="flex items-center gap-8 text-[13px] font-normal text-ink-3">
          {NAV_LINKS.map((item, index) => (
            <li
              key={item.href}
              className={index < NAV_LINKS.length - 1 ? "max-[880px]:hidden" : undefined}
            >
              <a href={item.href} className="transition-colors duration-150 hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: "#1D4ED8" }}
            >
              Start Free Trial
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// =============================================================================
// HERO
// =============================================================================

function Hero() {
  return (
    <section
      id="top"
      className="border-b pt-[60px]"
      style={{ backgroundColor: "#F4F2EE", borderColor: "#DEDBD4" }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-8 pb-16">
        <div
          className="hero-anim hero-anim-badge mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 pl-2.5 text-[12.5px] font-medium tracking-[0.02em]"
          style={{ backgroundColor: "#EBF0FF", color: "#2B52EE" }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: "#2B52EE" }}
          />
          Built for D2C Brands
        </div>

        <h1
          className="hero-anim hero-anim-heading mx-auto mb-4 max-w-[1100px] text-center font-display text-[clamp(36px,6vw,84px)] font-normal leading-[1.08]"
          style={{ letterSpacing: "-2px", color: "#0F0E0C" }}
        >
          The Operating System for D2C Brands
        </h1>

        <p
          className="hero-anim hero-anim-sub mb-6 max-w-[720px] text-center text-[16px] font-light leading-[1.7]"
          style={{ color: "#555" }}
        >
          Your brand runs on five tabs, three apps, and a group chat. Saria puts
          your products, people, and launches in one place — so you can stop
          managing tools and start managing your brand.
        </p>

        <div className="hero-anim hero-anim-ctas mb-6 flex flex-col items-center gap-2">
          <div className="flex flex-row flex-wrap items-center justify-center gap-6">
            <a
              href="#cta"
              className="rounded-full px-5 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: "#2B52EE" }}
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="flex items-center gap-1.5 text-[14.5px] font-normal text-ink transition-colors duration-150 hover:opacity-70"
            >
              See how it works →
            </a>
          </div>
          <span className="text-[11px]" style={{ color: "#78716C" }}>
            No credit card required
          </span>
        </div>

        <div className="hero-anim hero-anim-visual w-full max-w-[1000px] overflow-hidden">
          <div
            className="flex aspect-video items-center justify-center bg-white/60"
            style={{
              borderTop: "1px solid #DEDBD4",
              borderLeft: "1px solid #DEDBD4",
              borderRight: "1px solid #DEDBD4",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <div
              className="flex flex-col items-center gap-2.5 rounded-lg border border-dashed p-8"
              style={{ borderColor: "#DEDBD4" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8C4BB" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span className="text-[10.5px] font-normal uppercase tracking-[0.1em]" style={{ color: "#9A9184" }}>
                Your screenshot goes here
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-center gap-4 px-6 py-4"
            style={{
              backgroundColor: "#F4F2EE",
              borderBottom: "1px solid #DEDBD4",
              borderLeft: "1px solid #DEDBD4",
              borderRight: "1px solid #DEDBD4",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <span className="text-[11px] font-normal uppercase tracking-[0.06em]" style={{ color: "#78716C" }}>
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

// =============================================================================
// PAIN (The Problem)
// =============================================================================

const PAIN_ITEMS = [
  {
    number: "01",
    title: "Your attention is shattered.",
    body:
      "Shopify for products. Notion for plans. Slack for updates. Dropbox for assets. Email for contractors. Six tabs, zero context. You spend more time chasing information than making anything with it.",
  },
  {
    number: "02",
    title: "Launch day is still chaos.",
    body:
      "You have a hard deadline. Creative, ops, marketing, inventory, and external partners all need to move in sync. No existing tool holds all of that — with live business context — in one place.",
  },
  {
    number: "03",
    title: "External collaboration is a nightmare.",
    body:
      "Adding agencies to internal systems. Explaining folder structures. Chasing influencers for deliverables over DM. Every external partner is a new coordination headache.",
  },
  {
    number: "04",
    title: "Your work is visual. Your tools forgot that.",
    body:
      "Mood boards. Asset libraries. Campaign galleries. Creative briefs with real references. This isn't nice-to-have — it's how brand work actually gets done. No PM tool was built to hold it.",
  },
];

function PainItem({
  index,
  number,
  title,
  body,
}: {
  index: number;
  number: string;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`fade-up-initial border-b border-cream-3 px-[60px] py-[44px] transition-all duration-[550ms] ease-subtle max-[880px]:px-6 max-[880px]:py-9 ${
        inView ? "fade-up-enter" : ""
      }`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : undefined }}
    >
      <div className="grid grid-cols-[30px_1fr] gap-[18px]">
        <div className="pt-[5px] text-[11px] font-medium tracking-[0.08em] text-sand">
          {number}
        </div>
        <div>
          <h3 className="mb-[10px] font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.005em] text-ink">
            {title}
          </h3>
          <p className="text-[15px] leading-[1.8] text-ink-2">{body}</p>
        </div>
      </div>
    </div>
  );
}

function Pain() {
  return (
    <section className="grid grid-cols-2 border-b border-cream-3 max-[880px]:grid-cols-1">
      <div className="sticky top-[60px] self-start border-r border-cream-3 px-[60px] py-[100px] max-[880px]:static max-[880px]:border-b max-[880px]:border-r-0 max-[880px]:px-6 max-[880px]:pt-[60px] max-[880px]:pb-10">
        <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Problem
        </div>
        <h2 className="mb-6 font-display text-[clamp(36px,3.8vw,54px)] font-normal leading-[1.1] tracking-[-0.04em] text-ink">
          Brand work, team management, product launches — and not a single
          tool built to hold all of it.
        </h2>
        <p className="max-w-[320px] text-[15px] leading-[1.8] text-ink-2">
          DTC brands have been duct-taping together five tools because nothing
          was designed for how a brand team actually thinks, works, and launches.
        </p>
      </div>
      <div className="flex flex-col">
        {PAIN_ITEMS.map((item, index) => (
          <PainItem
            key={item.number}
            index={index}
            number={item.number}
            title={item.title}
            body={item.body}
          />
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// FEATURES
// =============================================================================

function Features() {
  const aiPrompts = [
    {
      label: "Create",
      prompt: "Create a table of all influencers by submission status.",
      accentClassName: "text-[#147B69]",
      chipClassName: "bg-[#E1F3EE] text-[#147B69]",
      icon: FiPlus,
    },
    {
      label: "Ask",
      prompt: "What's blocking the Spring launch?",
      accentClassName: "text-[#554EC7]",
      chipClassName: "bg-[#ECE9FF] text-[#554EC7]",
      icon: HiOutlineQuestionMarkCircle,
    },
    {
      label: "Update",
      prompt: "Update every campaign deadline to April 15th.",
      accentClassName: "text-[#99601A]",
      chipClassName: "bg-[#FAEFD9] text-[#99601A]",
      icon: FiEdit3,
    },
  ];

  return (
    <section id="features" className="border-b border-cream-3 bg-cream">
      <div className="grid grid-cols-2 gap-[60px] border-b border-cream-3 px-[60px] pb-16 pt-[100px] max-[880px]:grid-cols-1 max-[880px]:gap-6 max-[880px]:px-6 max-[880px]:pb-10 max-[880px]:pt-[60px]">
        <div>
          <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Built for Brand Ops
          </div>
          <h2 className="font-display text-[clamp(36px,3.9vw,58px)] font-normal leading-[1.1] tracking-[-0.04em] text-ink">
            Infrastructure for how brands{" "}
            <span
              className="font-display font-semibold text-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              actually work.
            </span>
          </h2>
        </div>
        <p className="self-end text-[15px] leading-[1.8] text-ink-2">
          Most tools manage tasks. Saria embeds your entire workflow —
          products, files, approvals, and live Shopify data — so execution
          happens where the work lives. Assets, briefs, moodboards.{" "}
          <span className="font-semibold text-ink">One tab.</span>
        </p>
      </div>

      <div className="border-b border-cream-3 bg-cream-2 px-[60px] py-12 max-[880px]:px-6 max-[880px]:py-10">
        <div className="flex w-full items-center justify-center rounded-card border-[1.5px] border-dashed border-cream-3 bg-cream">
          <span className="py-16 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            Product Demo
          </span>
        </div>
      </div>

      <div className="border-b border-cream-3 px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream-2 max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          AI-Powered
        </span>
        <h3 className="mb-6 w-full max-w-none font-display text-[clamp(30px,3.8vw,52px)] font-normal leading-[1.06] tracking-[-0.038em] text-ink">
          Ask questions. Get answers.{" "}
          <span
            className="font-display font-semibold text-accent"
            style={{ letterSpacing: "-0.018em" }}
          >
            Take action.
          </span>
        </h3>
        <p className="max-w-[720px] text-[15px] leading-[1.8] text-ink-2">
          Your AI assistant operates inside your work — not on top of it. Ask it
          anything. Then tell it what to do.
        </p>
        <div className="mb-7 mt-7 overflow-x-auto pb-2">
          <div className="flex min-w-[1040px] gap-6 max-[1100px]:min-w-[960px]">
            {aiPrompts.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-h-[180px] flex-1 flex-col rounded-[18px] border border-[#D9D3CA] bg-[#FFFEFC] px-5 py-4 shadow-[0_2px_12px_rgba(28,25,23,0.04)]"
                >
                  <div
                    className={`mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-full ${item.chipClassName}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${item.accentClassName}`}
                  >
                    {item.label}
                  </span>
                  <p className="max-w-[250px] text-[16px] leading-[1.4] tracking-[-0.03em] text-ink">
                    &quot;{item.prompt}&quot;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-cream-3 bg-cream-2">
          <span className="py-10 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
            AI assistant demo
          </span>
        </div>
      </div>

      <div className="px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          Shopify Native
        </span>
        <h3 className="mb-6 w-full max-w-none font-display text-[clamp(30px,3.8vw,52px)] font-normal leading-[1.06] tracking-[-0.038em] text-ink">
          Shopify.{" "}
          <span
            className="font-display font-semibold text-accent"
            style={{ letterSpacing: "-0.018em" }}
          >
            Built In.
          </span>
        </h3>
        <p className="mb-9 max-w-[760px] text-[15px] leading-[1.8] text-ink-2">
          Saria doesn&apos;t integrate with Shopify. It&apos;s built around it.
          Create a project for your Barrier Restore Cream restock, and Saria
          automatically connects to that SKU. Real-time inventory levels.
          Product variants. Sales Data. All the data you need, exactly when you
          need it.
        </p>
        <div className="group w-full overflow-hidden rounded-[10px] border border-cream-3">
          <div className="flex aspect-[16/8] items-center justify-center border-[1.5px] border-dashed border-cream-3 bg-cream text-[12px] font-medium uppercase tracking-[0.1em] text-sand transition-transform duration-500 group-hover:scale-[1.02] max-[880px]:aspect-[16/10]">
            Shopify + Saria view
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MAGIC LINKS (Collaboration)
// =============================================================================

function MagicLinks() {
  const rows = [
    "Photographers receive briefs, upload deliverables, get paid — no account needed",
    "Influencers get their brief, submit content for approval, track payment status",
    "Agencies review briefs, upload creative, give feedback — all in one place",
    "Brand partners coordinate co-launch assets and timelines without friction",
  ];

  const labels = ["Photographers", "Influencers", "Agencies", "Brand partners"];

  return (
    <section id="collaboration" className="border-b border-cream-3 bg-cream">
      <div className="grid grid-cols-2 max-[880px]:grid-cols-1">
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
                  <span className="font-medium text-ink">{labels[index]}</span>{" "}
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
            <div className="flex w-full items-center justify-center rounded-card border-[1.5px] border-dashed border-cream-3 bg-cream">
              <span className="py-12 text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
                Visual — creating &amp; sending a Magic Link
              </span>
            </div>
          </div>

          <div className="px-[52px] py-[48px] max-[880px]:border-t max-[880px]:border-cream-3 max-[880px]:px-6 max-[880px]:py-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full border border-[#BFDBFE] bg-accent-bg px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                02 — 03
              </span>
              <span className="text-[13px] font-medium tracking-[0.01em] text-ink-2">
                Collaborator uploads · You&apos;re notified instantly
              </span>
            </div>
            <div className="relative grid aspect-[16/7] grid-cols-2 overflow-hidden rounded-card border-[1.5px] border-dashed border-cream-3 bg-cream max-[880px]:aspect-auto max-[880px]:grid-cols-1 max-[880px]:h-80">
              <div className="relative flex items-center justify-center border-r-[1.5px] border-cream-3 max-[880px]:border-b-[1.5px] max-[880px]:border-r-0">
                <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
                  Collaborator view — uploading
                </span>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cream-3 bg-cream px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Their view
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-sand">
                  Saria — real-time notification
                </span>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cream-3 bg-cream px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Your view
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream-3 bg-cream px-[14px] py-[6px] text-[11px] font-semibold uppercase tracking-[0.08em] text-stone max-[880px]:top-1/2">
                Simultaneously
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CTA
// =============================================================================

function CTA() {
  return (
    <section
      id="cta"
      className="cta-shell relative border-b border-cream-3 bg-cream-2 px-[60px] py-[160px] text-center max-[880px]:px-6 max-[880px]:py-[100px]"
    >
      <span className="mb-6 block text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
        Create Boldly
      </span>
      <h2
        className="mx-auto mb-6 max-w-[700px] font-display text-[clamp(52px,6.5vw,88px)] font-normal leading-[1.08] text-ink"
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
      <p className="mx-auto mb-11 max-w-[380px] text-[16px] leading-[1.8] text-ink-2">
        You built something people didn&apos;t know they needed. Your workspace
        should be built the same way.
      </p>
      <a
        href="#top"
        className="inline-block rounded-full bg-accent px-8 py-3 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#1e40af]"
      >
        Start Free Trial
      </a>
      <p className="mt-[18px] text-[12px] text-stone">
        No credit card required · Free 14-day trial · Setup in minutes
      </p>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================

function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-cream-3 bg-cream px-[60px] py-9 text-[12px] max-[880px]:flex-col max-[880px]:items-center max-[880px]:gap-2 max-[880px]:px-6 max-[880px]:py-7">
      <div className="font-display text-[18px] font-semibold tracking-[-0.015em] text-ink">
        Saria
      </div>
      <div className="text-center text-[12px] tracking-[0.04em] text-stone max-[880px]:mx-4">
        The operating system for modern D2C brands
      </div>
      <div className="text-[12px] text-sand">© 2025 Saria. All rights reserved.</div>
    </footer>
  );
}

// =============================================================================
// FULL LANDING PAGE (default export)
// =============================================================================

export default function LandingPageFull() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Features />
        <MagicLinks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
