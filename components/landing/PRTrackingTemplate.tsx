import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TemplateTitleCTA } from "@/components/landing/TemplateTitleCTA";

const heroStats = [
  { value: "24", label: "Influencers seeded" },
  { value: "18", label: "Posts published" },
  { value: "2.1M", label: "Combined reach" },
  { value: "1 tab", label: "All of it" }
];

type RowState = "done" | "pending" | "empty";

const seedingRows: Array<{
  handle: string;
  platform: string;
  followers: string;
  address: RowState;
  shipped: RowState;
  posted: RowState;
  content: string;
}> = [
  {
    handle: "@theluminousskin",
    platform: "TikTok + IG",
    followers: "284K",
    address: "done",
    shipped: "done",
    posted: "done",
    content: "TikTok · 340K views"
  },
  {
    handle: "@softmorningco",
    platform: "Instagram",
    followers: "91K",
    address: "done",
    shipped: "done",
    posted: "done",
    content: "IG Reel · 88K views"
  },
  {
    handle: "@rituelbeauty",
    platform: "TikTok",
    followers: "178K",
    address: "done",
    shipped: "done",
    posted: "done",
    content: "TikTok · 210K views"
  },
  {
    handle: "@calmandcurated",
    platform: "Instagram",
    followers: "62K",
    address: "done",
    shipped: "done",
    posted: "pending",
    content: "-"
  },
  {
    handle: "Vogue Beauty",
    platform: "Editorial",
    followers: "-",
    address: "done",
    shipped: "done",
    posted: "empty",
    content: "-"
  },
  {
    handle: "@oilsandrituals",
    platform: "TikTok + IG",
    followers: "430K",
    address: "done",
    shipped: "done",
    posted: "done",
    content: "TikTok · 580K views"
  },
  {
    handle: "@morningshelf",
    platform: "Instagram",
    followers: "44K",
    address: "pending",
    shipped: "empty",
    posted: "empty",
    content: "-"
  }
];

const resultCards = [
  { value: "75%", label: "Post rate - 18 of 24 seeded" },
  { value: "388", label: "Units sold in first two weeks" },
  { value: "2 tabs", label: "Tracker and results - nothing else needed" }
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function StatusPill({
  children,
  tone = "neutral"
}: {
  children: string;
  tone?: "neutral" | "progress" | "done" | "warm";
}) {
  const toneClassName = {
    neutral: "bg-[#F3F1EC] text-stone",
    progress: "bg-accent-bg text-accent",
    done: "bg-[#E7F6EE] text-[#2F6B49]",
    warm: "bg-[#F7EFE1] text-[#99601A]"
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-[6px] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em]",
        toneClassName[tone]
      )}
    >
      {children}
    </span>
  );
}

function WindowShell({
  activeTab,
  backLink = false,
  complete = false,
  children
}: {
  activeTab: string;
  backLink?: boolean;
  complete?: boolean;
  children: ReactNode;
}) {
  const tabs = ["Overview", "Seeding Tracker", "Results"];

  return (
    <div className="overflow-hidden rounded-[24px] border border-[rgba(222,219,212,0.7)] bg-white shadow-[0_24px_48px_rgba(28,25,23,0.08)]">
      <div className="border-b border-cream-3 bg-white">
        <div className="px-5 pt-5">
          {backLink ? (
            <div className="mb-3 flex items-center gap-1.5 text-[11px] text-stone">
              <span className="text-[12px]">←</span>
              <span>Back to projects</span>
            </div>
          ) : null}
          <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
            <div className="text-[20px] font-semibold tracking-[-0.03em] text-ink">
              DUSK - AMBER BODY OIL SEEDING
            </div>
            {!complete ? (
              <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-3 py-1.5 text-[11px] font-medium text-[#53708A]">
                <span>◎</span>
                <span>Enable Public Link</span>
              </div>
            ) : null}
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {complete ? (
              <>
                <StatusPill tone="done">Complete</StatusPill>
                <StatusPill tone="neutral">Launched Sept 12</StatusPill>
              </>
            ) : (
              <>
                <StatusPill tone="progress">In Progress</StatusPill>
                <StatusPill tone="neutral">Launch Sept 12</StatusPill>
              </>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-end border-t border-cream-3 px-5">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={cx(
                  "mb-[-1px] flex items-center gap-1.5 border-b-2 px-4 py-3 text-[12px] whitespace-nowrap",
                  activeTab === tab
                    ? "border-ink font-medium text-ink"
                    : "border-transparent text-stone"
                )}
              >
                {index === 0 ? <span className="text-[11px] opacity-60">⊞</span> : null}
                <span>{tab}</span>
              </div>
            ))}
            <div className="mb-[-1px] px-3 py-3 text-[16px] text-[#B8B4AC]">+</div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3 pr-11">
      <div className="text-[14px] font-semibold tracking-[-0.01em] text-ink">{title}</div>
      {subtitle ? <div className="mt-1 text-[11px] text-stone">{subtitle}</div> : null}
    </div>
  );
}

function InfoCard({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#EFECE5] bg-white px-4 py-4">
      <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-stone">
        {label}
      </div>
      <div className="text-[12.5px] leading-[1.65] text-ink-2">{children}</div>
    </div>
  );
}

function RightRail() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-9 flex-col items-center gap-4 border-l border-[#F0EEEA] bg-white py-4 text-[13px] text-[#C5C0B6]">
      <span>L</span>
      <span>AI</span>
      <span>⊞</span>
      <span>C</span>
      <span>U</span>
    </div>
  );
}

function MiniStatus({ state }: { state: RowState }) {
  if (state === "done") {
    return <StatusPill tone="done">Done</StatusPill>;
  }

  if (state === "pending") {
    return <StatusPill tone="progress">Pending</StatusPill>;
  }

  return <StatusPill tone="neutral">-</StatusPill>;
}

export function PRTrackingTemplate() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-[860px] px-12 pb-20 pt-[96px] max-[768px]:px-6 max-[768px]:pb-14 max-[768px]:pt-[72px]">
        <div className="mb-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-stone">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Case Study · Influencer Seeding Template
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
          <h1
            className="max-w-[820px] font-display text-[clamp(38px,5vw,58px)] leading-[1.08] text-ink"
            style={{
              fontFamily: "var(--font-hero-display), Georgia, serif",
              letterSpacing: "-0.03em"
            }}
          >
            How Dusk tracked influencer seeding for their{" "}
            <span className="text-accent">new body oil launch.</span>
          </h1>
          <TemplateTitleCTA />
        </div>
        <p className="mt-7 max-w-[640px] text-[18px] font-light leading-[1.7] text-ink-2">
          24 influencers. One tab. How Dusk kept their seeding campaign organized from address
          collected to post live.
        </p>
        <div className="mt-10 grid overflow-hidden rounded-[14px] border border-cream-3 bg-white md:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cx(
                "border-cream-3 px-7 py-6 max-[768px]:px-5 max-[768px]:py-4",
                index < heroStats.length - 1 && "md:border-r",
                index < 3 && "max-[768px]:border-b"
              )}
            >
              <div
                className="font-display text-[32px] leading-none text-ink"
                style={{
                  fontFamily: "var(--font-hero-display), Georgia, serif",
                  letterSpacing: "-0.03em"
                }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.08em] text-stone">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto grid max-w-[860px] gap-12 px-12 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[768px]:px-6 max-[768px]:py-14">
        <div>
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            The Campaign
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            A new product. A seeding list. <span className="text-accent">The usual chaos.</span>
          </h2>
        </div>
        <div className="space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            Dusk is a body care brand. Their Amber Body Oil - dry oil, fast-absorbing, a warm
            amber and sandalwood scent - was their most-anticipated launch of the year. They had a
            list of 24 influencers they wanted to seed ahead of the launch date: a mix of
            mid-size lifestyle creators, a few skinfluencers, and two editors.
          </p>
          <p>
            The process is always the same: collect addresses, confirm what each person is
            getting, ship, follow up, track whether they posted. The problem is that it&apos;s all
            happening at once and the information lives everywhere - DMs for addresses, email for
            follow-ups, a spreadsheet nobody remembers to update.
          </p>
          <p>
            For the Amber Body Oil launch they ran the whole thing out of a single Saria tab.
          </p>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[1000px] px-12 py-20 max-[768px]:px-4 max-[768px]:py-14">
        <div className="mx-auto mb-14 max-w-[860px] px-0 md:px-6">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Inside the Project
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            Two tabs. That&apos;s it.
          </h2>
          <p className="mt-3 max-w-[560px] text-[16px] font-light leading-[1.8] text-ink-2">
            The seeding tracker and a post-campaign summary. Everything needed to run a seeding
            campaign from start to finish.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 01
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Seeding Tracker
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Every influencer in one table. Handle, platform, what they were sent, address
                  confirmed, shipped, posted, and a link to the content. The Shopify block at the
                  top keeps the product and its launch inventory visible without switching tabs.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <WindowShell activeTab="Seeding Tracker" backLink>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-4 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="grid min-[720px]:grid-cols-[90px_minmax(0,1fr)]">
                      <div className="relative flex min-h-[90px] items-center justify-center overflow-hidden bg-[#F7F4EE] p-2">
                        <Image
                          src="/templates/influencerseeding/seeding1.png"
                          alt="Amber Body Oil product image"
                          fill
                          className="object-contain"
                          sizes="90px"
                        />
                      </div>
                      <div className="px-4 py-4">
                        <div className="mb-2 text-[12px] font-semibold text-ink">
                          Amber Body Oil - 100ml
                        </div>
                        <div className="flex flex-wrap gap-5">
                          {[
                            ["0", "In stock (pre-launch)"],
                            ["$48", "Retail price"],
                            ["24", "Units seeded"]
                          ].map(([value, label]) => (
                            <div key={label}>
                              <div className="text-[14px] font-semibold leading-none text-ink">
                                {value}
                              </div>
                              <div className="mt-1 text-[10px] text-stone">{label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <StatusPill tone="neutral">Draft - launches Sept 12</StatusPill>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 grid gap-2 pr-11 md:grid-cols-3">
                    <InfoCard label="What's in the package">
                      Amber Body Oil 100ml
                      <br />
                      Dusk branded dust bag
                      <br />
                      Handwritten note
                    </InfoCard>
                    <InfoCard label="Ship date">
                      <strong>Sept 5</strong> - 7 days before launch.
                      <br />
                      All addresses needed by Sept 3.
                    </InfoCard>
                    <InfoCard label="Ask">
                      No formal obligation. Post if you love it. Tag @dusk.body and use #AmberOil
                      if you do.
                    </InfoCard>
                  </div>

                  <SectionHeader
                    title="Influencer List"
                    subtitle="24 contacts - address, ship status, and post tracking"
                  />
                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">Seeding List</div>
                      <div className="text-[11px] text-stone">24 total · 18 posted</div>
                    </div>
                    <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
                      <div className="flex-[1.8]">Handle</div>
                      <div className="flex-1">Platform</div>
                      <div className="flex-1">Followers</div>
                      <div className="flex-[0.8]">Address</div>
                      <div className="flex-[0.8]">Shipped</div>
                      <div className="flex-[0.8]">Posted</div>
                      <div className="flex-[1.2]">Content</div>
                    </div>
                    {seedingRows.map((row) => (
                      <div
                        key={row.handle}
                        className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
                      >
                        <div className="flex-[1.8] pr-2 font-medium text-ink">{row.handle}</div>
                        <div className="flex-1 pr-2 text-ink-2">{row.platform}</div>
                        <div className="flex-1 pr-2 text-ink-2">{row.followers}</div>
                        <div className="flex-[0.8] pr-2">
                          <MiniStatus state={row.address} />
                        </div>
                        <div className="flex-[0.8] pr-2">
                          <MiniStatus state={row.shipped} />
                        </div>
                        <div className="flex-[0.8] pr-2">
                          <MiniStatus state={row.posted} />
                        </div>
                        <div className="flex-[1.2] text-ink-2">{row.content}</div>
                      </div>
                    ))}
                    <div className="bg-[#FAF9F6] px-4 py-3 text-[11px] text-[#B8B4AC]">
                      + 17 more rows
                    </div>
                  </div>
                  <RightRail />
                </div>
              </WindowShell>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 02
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">Results</h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Written two weeks after launch. A breakdown of who posted, total reach, and a
                  chart showing performance by platform. The Shopify block shows the product live
                  - same block from the tracker tab, now showing real sales numbers.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <WindowShell activeTab="Results" complete>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-4 grid gap-2 pr-11 md:grid-cols-3">
                    <InfoCard label="Reach">
                      <strong>Total reach:</strong> 2.1M
                      <br />
                      <strong>Posts published:</strong> 18 / 24
                      <br />
                      <strong>TikTok views:</strong> 1.4M
                      <br />
                      <strong>IG views:</strong> 700K
                    </InfoCard>
                    <InfoCard label="Top performer">
                      <strong>@oilsandrituals</strong>
                      <br />
                      580K TikTok views
                      <br />
                      Link in bio for 3 days
                      <br />
                      ~420 direct click-throughs
                    </InfoCard>
                    <InfoCard label="Post rate">
                      <strong>18 of 24 seeded</strong> posted within 2 weeks of receiving. 4 still
                      pending. 2 didn&apos;t post.
                    </InfoCard>
                  </div>

                  <SectionHeader title="Performance by Platform" />
                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
                        <span>Reach by Platform</span>
                        <span className="rounded-[4px] bg-[#EEF0FF] px-2 py-0.5 text-[10px] font-medium text-[#5B63B7]">
                          Chart
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 px-5 py-5 min-[760px]:flex-row min-[760px]:items-center">
                      <svg className="h-[110px] w-[110px] flex-shrink-0" viewBox="0 0 110 110">
                        <circle
                          cx="55"
                          cy="55"
                          r="38"
                          fill="none"
                          stroke="#1D4ED8"
                          strokeWidth="18"
                          strokeDasharray="150.4 88.6"
                          strokeDashoffset="0"
                          transform="rotate(-90 55 55)"
                        />
                        <circle
                          cx="55"
                          cy="55"
                          r="38"
                          fill="none"
                          stroke="#C7B58A"
                          strokeWidth="18"
                          strokeDasharray="75.4 163.6"
                          strokeDashoffset="-150.4"
                          transform="rotate(-90 55 55)"
                        />
                        <circle
                          cx="55"
                          cy="55"
                          r="38"
                          fill="none"
                          stroke="#9A9184"
                          strokeWidth="18"
                          strokeDasharray="13.2 225.8"
                          strokeDashoffset="-225.8"
                          transform="rotate(-90 55 55)"
                        />
                        <text
                          x="55"
                          y="51"
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="600"
                          fill="#1C1917"
                          fontFamily="Avenir Next, Segoe UI, sans-serif"
                        >
                          2.1M
                        </text>
                        <text
                          x="55"
                          y="63"
                          textAnchor="middle"
                          fontSize="8"
                          fill="#9A9184"
                          fontFamily="Avenir Next, Segoe UI, sans-serif"
                        >
                          total reach
                        </text>
                      </svg>

                      <div className="flex-1">
                        {[
                          ["TikTok", "1.4M (67%)", "bg-accent"],
                          ["Instagram", "700K (33%)", "bg-[#C7B58A]"],
                          ["Editorial", "Pending", "bg-stone"]
                        ].map(([label, value, color]) => (
                          <div
                            key={label}
                            className="mb-1 flex items-center justify-between rounded-[6px] px-2 py-1.5 last:mb-0"
                          >
                            <div className="flex items-center gap-2 text-[12px] text-ink-2">
                              <span className={cx("h-2 w-2 rounded-full", color)} />
                              <span>{label}</span>
                            </div>
                            <div className="text-[12px] text-ink-2">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-8 border-t border-[#F0EEEA] px-5 py-3">
                      {[
                        ["Posts", "18"],
                        ["Seeded", "24"],
                        ["Post rate", "75%"]
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="text-[10px] text-stone">{label}</div>
                          <div className="text-[18px] font-semibold leading-[1.2] text-ink">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <SectionHeader title="Product - Post-Launch" />
                    <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                      <div className="grid min-[720px]:grid-cols-[90px_minmax(0,1fr)]">
                        <div className="relative flex min-h-[90px] items-center justify-center overflow-hidden bg-[#F7F4EE] p-2">
                          <Image
                            src="/templates/influencerseeding/seeding1.png"
                            alt="Amber Body Oil product image"
                            fill
                            className="object-contain"
                            sizes="90px"
                          />
                        </div>
                        <div className="px-4 py-4">
                          <div className="mb-2 text-[12px] font-semibold text-ink">
                            Amber Body Oil - 100ml
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {[
                              ["112", "In stock"],
                              ["388", "Units sold"],
                              ["$48", "Price"],
                              ["4.9", "Rating"]
                            ].map(([value, label]) => (
                              <div key={label}>
                                <div className="text-[14px] font-semibold leading-none text-ink">
                                  {value}
                                </div>
                                <div className="mt-1 text-[10px] text-stone">{label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3">
                            <StatusPill tone="done">Active</StatusPill>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <RightRail />
                </div>
              </WindowShell>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[860px] px-12 py-20 max-[768px]:px-6 max-[768px]:py-14">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Result
        </div>
        <h2 className="max-w-[700px] font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
          18 posts. 2.1M reach. <span className="text-accent">One tab.</span>
        </h2>
        <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            The Amber Body Oil launched September 12. Eighteen of the twenty-four seeded
            influencers posted within two weeks. @oilsandrituals drove 580K views on TikTok alone
            and kept the link in bio for three days. The product hit 388 units sold in the first
            two weeks.
          </p>
          <p>
            The Results tab got filled in as posts went live - reach, views, and post rate all in
            one place. When it comes to the next launch, the seeding list from this project is the
            starting point.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="grid gap-4 rounded-[18px] border border-accent bg-accent-bg px-7 py-7 text-ink md:col-span-2 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <div
              className="font-display text-[clamp(52px,7vw,72px)] leading-none"
              style={{
                fontFamily: "var(--font-hero-display), Georgia, serif",
                letterSpacing: "-0.04em"
              }}
            >
              2.1M
            </div>
            <div className="border-accent/20 pt-5 text-[16px] font-light leading-[1.75] text-ink-2 md:border-l md:pl-12 md:pt-0">
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                Combined reach
              </div>
              <p className="mt-2">
                18 posts across TikTok and Instagram. @oilsandrituals was the standout - 580K
                views, link in bio for 3 days.
              </p>
            </div>
          </div>
          {resultCards.map((result) => (
            <div
              key={result.label}
              className="rounded-[18px] border border-cream-3 bg-white px-7 py-6"
            >
              <div
                className="font-display text-[42px] leading-none text-ink"
                style={{
                  fontFamily: "var(--font-hero-display), Georgia, serif",
                  letterSpacing: "-0.04em"
                }}
              >
                {result.value}
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.06em] text-stone">
                {result.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-r-[14px] border-l-[3px] border-accent bg-accent-bg px-6 py-6">
          <p
            className="font-display text-[clamp(22px,2.6vw,28px)] leading-[1.4] text-ink"
            style={{
              fontFamily: "var(--font-hero-display), Georgia, serif",
              letterSpacing: "-0.02em"
            }}
          >
            &quot;Every launch we were chasing addresses in DMs and updating a spreadsheet
            nobody had open. Now it&apos;s one table. You can see exactly where every person is
            at.&quot;
          </p>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-[860px] px-12 max-[768px]:mb-14 max-[768px]:px-6">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[20px] border border-cream-3 bg-cream-2 px-10 py-12 md:flex-row md:items-center max-[768px]:px-7 max-[768px]:py-10">
          <div className="max-w-[460px]">
            <h2
              className="font-display text-[clamp(26px,3vw,34px)] leading-[1.18] text-ink"
              style={{
                fontFamily: "var(--font-hero-display), Georgia, serif",
                letterSpacing: "-0.02em"
              }}
            >
              Track your next seeding campaign <span className="text-accent">in one place.</span>
            </h2>
            <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink-2">
              The Influencer Seeding template is two tabs - tracker and results. Clone it for any
              product launch.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto">
            <a
              href="https://app.sariasoftware.com/start-free-trial"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[13px] font-medium text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Use this template
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full border border-cream-3 px-7 py-3 text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:border-stone hover:text-ink"
            >
              See all templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
