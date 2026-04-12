"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import styles from "./pricing.module.css";

type PlanGroup = {
  label?: string;
  items: string[];
};

type Plan = {
  tier: string;
  name: string;
  tagline: string;
  monthly?: number;
  annual?: number;
  note?: string;
  featured?: boolean;
  muted?: boolean;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  groups: PlanGroup[];
};

const PLANS: Plan[] = [
  {
    tier: "Free",
    name: "Starter",
    tagline: "Try Saria before you commit.",
    note: "No credit card required",
    muted: true,
    ctaLabel: "Get started free",
    ctaHref: "https://app.sariasoftware.com/signup",
    groups: [
      {
        items: [
          "1 workspace · 3 projects",
          "3 tabs · 20 blocks per tab",
          "Shopify view (read-only)",
          "5 AI actions / month"
        ]
      }
    ]
  },
  {
    tier: "Business",
    name: "Business",
    tagline: "For teams running a full creative operation.",
    monthly: 25,
    annual: 20,
    featured: true,
    badge: "Most popular",
    ctaLabel: "Start Business plan",
    ctaHref: "https://app.sariasoftware.com/billing/start?plan=business",
    groups: [
      {
        label: "Workspace",
        items: [
          "Unlimited workspaces",
          "Unlimited projects, tabs & blocks",
          "Everything page - full brand view",
          "Configurable dashboard",
          "Cross-project charts & analytics",
          "Magic Links - shareable client views"
        ]
      },
      {
        label: "AI",
        items: [
          "2,000 AI actions / month",
          "Cross-project AI - sees your full operation",
          "Prompt-to-action across all workspaces"
        ]
      }
    ]
  },
  {
    tier: "Standard",
    name: "Standard",
    tagline: "For active brands running campaigns and launches.",
    monthly: 15,
    annual: 12,
    ctaLabel: "Start Standard plan",
    ctaHref: "https://app.sariasoftware.com/billing/start?plan=standard",
    groups: [
      {
        label: "Workspace",
        items: [
          "1 workspace",
          "Unlimited projects, tabs & blocks",
          "Full Shopify data in context",
          "Magic Links - shareable client views",
          "Per-project charts & analytics"
        ]
      },
      {
        label: "AI",
        items: [
          "500 AI actions / month",
          "AI scoped to project context",
          "Prompt-to-action (CMD+K)"
        ]
      }
    ]
  }
];

const FAQS = [
  {
    question: "What counts as a workspace?",
    answer:
      "A workspace is your team's dedicated instance of Saria - with its own projects, members, and settings. Business plan users can create as many as their organization needs."
  },
  {
    question: "What's a Magic Link?",
    answer:
      "Magic Links let you share a clean, client-facing view of any project with no login required. Clients see exactly what you want them to see, nothing more."
  },
  {
    question: "What's the Everything page?",
    answer:
      "A unified view across all your workspaces and projects - one place to see status, deadlines, and activity across your entire operation. Exclusive to the Business plan."
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, anytime. Upgrade or downgrade from your settings. If you downgrade, you keep access through the end of your billing period."
  },
  {
    question: "Is per-user pricing per seat?",
    answer:
      "Yes - you're only billed for the people who have access. You can add or remove seats at any time and we'll prorate the difference."
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data stays accessible for 30 days after cancellation. You can export everything in that window. We never delete your work without notice."
  }
];

function CheckIcon({ tone }: { tone: "dim" | "accent" | "featured" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      className={`${styles.checkIcon} ${
        tone === "featured"
          ? styles.checkFeatured
          : tone === "accent"
            ? styles.checkAccent
            : styles.checkDim
      }`}
    >
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M4.5 7l2 2 3-3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPageClient() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Pricing</p>
          <h1 className={styles.title}>
            Simple pricing,
            <br />
            built to scale with you.
          </h1>
          <p className={styles.subtitle}>One plan for most brands. More when you need it.</p>
          <div className={styles.toggleWrapper}>
            <button
              type="button"
              className={`${styles.toggleLabel} ${!annual ? styles.toggleLabelActive : ""}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              className={`${styles.toggleTrack} ${annual ? styles.toggleTrackOn : ""}`}
              onClick={() => setAnnual((current) => !current)}
            >
              <span className={styles.toggleThumb} />
            </button>
            <button
              type="button"
              className={`${styles.toggleLabel} ${annual ? styles.toggleLabelActive : ""}`}
              onClick={() => setAnnual(true)}
            >
              Annual
            </button>
            <span className={styles.savePill}>Save 20%</span>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {PLANS.map((plan, index) => {
              const tone = plan.featured ? "featured" : plan.muted ? "dim" : "accent";
              const price = annual ? plan.annual ?? plan.monthly ?? 0 : plan.monthly ?? 0;

              return (
                <article
                  key={plan.name}
                  className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""} ${
                    plan.muted ? styles.cardMuted : ""
                  }`}
                  style={{ animationDelay: `${150 + index * 100}ms` }}
                >
                  {plan.badge ? <span className={styles.popularBadge}>{plan.badge}</span> : null}
                  <p className={styles.cardTier}>{plan.tier}</p>
                  <h2 className={styles.cardName}>{plan.name}</h2>
                  <p className={styles.cardTagline}>{plan.tagline}</p>
                  <div className={styles.priceBlock}>
                    <div className={styles.priceAmount}>
                      <sup>$</sup>
                      {price}
                    </div>
                    <p className={styles.pricePeriod}>
                      {plan.note ? (
                        plan.note
                      ) : (
                        <>
                          per user / month · billed{" "}
                          <span className={styles.billingPeriod}>
                            {annual ? "annually" : "monthly"}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className={styles.divider} />
                  {plan.groups.map((group) => (
                    <div key={group.label ?? plan.name}>
                      {group.label ? <p className={styles.sectionLabel}>{group.label}</p> : null}
                      <ul className={styles.featureList}>
                        {group.items.map((item) => (
                          <li key={item} className={styles.featureItem}>
                            <CheckIcon tone={tone} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    href={plan.ctaHref}
                    className={`${styles.ctaBtn} ${
                      plan.featured
                        ? styles.ctaBtnCream
                        : plan.muted
                          ? styles.ctaBtnGhost
                          : styles.ctaBtnAccent
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.enterpriseSection}>
          <div className={styles.enterpriseBand}>
            <div>
              <h3 className={styles.enterpriseTitle}>Built for larger operations.</h3>
              <p className={styles.enterpriseCopy}>
                For brands doing serious volume. Enterprise includes dedicated onboarding, priority
                support, custom contract terms, and pricing that scales with your business, not
                against it.
              </p>
            </div>
            <Link href="/#cta" className={styles.enterpriseButton}>
              Talk to us →
            </Link>
          </div>
        </section>

        <section className={styles.faqSection}>
          <p className={styles.eyebrow}>Common questions</p>
          <div className={styles.faqGrid}>
            {FAQS.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
