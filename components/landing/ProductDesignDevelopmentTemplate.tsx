import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";

const heroStats = [
  { value: "14 wks", label: "Brief to production-ready" },
  { value: "3", label: "Sample rounds" },
  { value: "4", label: "People across the project" },
  { value: "1", label: "Project in Saria" }
];

const processTimeline = [
  {
    date: "Week 1",
    label:
      "Brief written. Specs, dimensions, materials, and target retail price documented in Product Brief tab."
  },
  {
    date: "Week 2-3",
    label: "Sketches and reference images uploaded to Design & Samples. Spec sheet finalized."
  },
  {
    date: "Week 4",
    label: "Spec sheet sent to factory. Costing and timeline logged in Manufacturer tab."
  },
  {
    date: "Week 6",
    label:
      "Sample 1 received. Nadia logged feedback directly on the sample round block - handle width, base reinforcement, zipper pocket depth."
  },
  {
    date: "Week 9",
    label: "Sample 2 received. Most changes resolved. Strap attachment still needs work."
  },
  {
    date: "Week 12",
    label: "Sample 3 received. Sign-off given. Launch Prep tab opened."
  },
  {
    date: "Week 14",
    label: "Production order placed. 400 units.",
    active: true
  }
];

const briefTasks = [
  { name: "Write product brief", status: "Done", complete: true },
  { name: "Align on dimensions + colorways", status: "Done", complete: true },
  { name: "Confirm target COGS with James", status: "Done", complete: true }
];

type DesignGalleryTile = {
  imageSrc: string;
  imageAlt: string;
};

const designGalleryTiles: DesignGalleryTile[] = [
  {
    imageSrc: "/templates/product-development/dm1.png",
    imageAlt: "Design and samples reference image 1"
  },
  {
    imageSrc: "/templates/product-development/dm2.png",
    imageAlt: "Design and samples reference image 2"
  },
  {
    imageSrc: "/templates/product-development/dm3.png",
    imageAlt: "Design and samples reference image 3"
  },
  {
    imageSrc: "/templates/product-development/dm4.png",
    imageAlt: "Design and samples reference image 4"
  },
  {
    imageSrc: "/templates/product-development/dm5.png",
    imageAlt: "Design and samples reference image 5"
  },
  {
    imageSrc: "/templates/product-development/dm6.png",
    imageAlt: "Design and samples reference image 6"
  }
];

const specRows = [
  {
    component: "Body",
    specification: "12oz waxed canvas, double-stitched seams",
    supplier: "Halley Stevensons",
    status: "Confirmed"
  },
  {
    component: "Base panel",
    specification: "3mm full-grain leather, hand-stitched to body",
    supplier: "Cortez Leathers",
    status: "Confirmed"
  },
  {
    component: "Handles",
    specification: "Rolled leather, 2.5cm diameter, 28cm drop",
    supplier: "Cortez Leathers",
    status: "Confirmed"
  },
  {
    component: "Interior pocket",
    specification: "Zip pocket, 28 x 18cm, YKK #5 zipper",
    supplier: "YKK",
    status: "Confirmed"
  },
  {
    component: "Hardware",
    specification: "Brass D-rings, antique finish",
    supplier: "TBD",
    status: "Sourcing"
  }
];

const sampleRounds = [
  {
    name: "Sample 1",
    date: "Received Week 6",
    feedback:
      "Good overall shape. Handle width too narrow - feels flimsy when loaded. Base panel not reinforced enough - needs an interior board. Interior zip pocket is too shallow at 12cm, needs 18cm minimum. Canvas treatment good, colour accurate.",
    changes: ["Handle width", "Base reinforcement", "Zip pocket depth"]
  },
  {
    name: "Sample 2",
    date: "Received Week 9",
    feedback:
      "Handle and base both fixed. Pocket depth correct. Strap attachment point pulling away from body - stitching not deep enough on the leather tabs. Sand colorway slightly warm, needs to shift cooler. Otherwise production-ready.",
    changes: ["Strap attachment", "Sand colorway"]
  },
  {
    name: "Sample 3",
    date: "Received Week 12",
    feedback:
      "All changes resolved. Sand colorway correct. Strap attachment solid. Signed off for production.",
    changes: ["All changes resolved", "Production sign-off"]
  }
];

const productionTasks = [
  {
    name: "Send final spec sheet v3 to Atelier Minho",
    status: "Done",
    complete: true
  },
  {
    name: "Confirm 400 unit order + deposit paid",
    status: "Done",
    complete: true
  },
  {
    name: "Confirm packaging spec with factory",
    status: "In Progress",
    inProgress: true
  },
  { name: "Book freight forwarder - FOB Lisbon", status: "To-Do" },
  { name: "QC check at factory before shipment", status: "To-Do" }
];

const launchTasks = [
  {
    name: "Create Shopify product draft - both variants",
    status: "Done",
    complete: true
  },
  {
    name: "Finalize product copy + dimensions",
    status: "In Progress",
    inProgress: true
  },
  { name: "Upload approved photography", status: "Waiting on stock" },
  { name: "Set pricing + inventory - Sand and Black", status: "To-Do" },
  { name: "Publish listing", status: "To-Do" }
];

const resultCards = [
  { value: "3", label: "Sample rounds, all logged in one tab" },
  { value: "$54.90", label: "COGS - under the $58 target" },
  { value: "400", label: "Units in production, 2 colorways" }
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
  className,
  children
}: {
  activeTab: string;
  backLink?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const tabs = ["Overview", "Product Brief", "Design & Samples", "Manufacturer", "Launch Prep"];

  return (
    <div
      className={cx(
        "overflow-hidden rounded-[24px] border border-[rgba(222,219,212,0.7)] bg-white shadow-[0_24px_48px_rgba(28,25,23,0.08)]",
        className
      )}
    >
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
              FOLD - MARKET TOTE
            </div>
            <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-3 py-1.5 text-[11px] font-medium text-[#53708A]">
              <span>◎</span>
              <span>Enable Public Link</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusPill tone="progress">In Progress</StatusPill>
            <StatusPill tone="neutral">
              {activeTab === "Launch Prep" ? "Launch Week 24" : "Production Q2"}
            </StatusPill>
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

function TaskBlock({
  title,
  tasks
}: {
  title: string;
  tasks: Array<{
    name: string;
    status: string;
    complete?: boolean;
    inProgress?: boolean;
  }>;
}) {
  return (
    <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
      <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
        <div className="text-[12px] font-semibold tracking-[-0.01em] text-ink">{title}</div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#B8B4AC]">
          <span className="rounded-[4px] bg-accent-bg px-1.5 py-0.5 text-accent">☰</span>
          <span>⊞</span>
        </div>
      </div>
      {tasks.map((task) => (
        <div
          key={task.name}
          className="flex items-center gap-3 border-b border-[#F5F3EE] px-4 py-3 last:border-b-0"
        >
          <span
            className={cx(
              "flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full border text-[9px]",
              task.complete
                ? "border-[#2F6B49] bg-[#E7F6EE] text-[#2F6B49]"
                : task.inProgress
                  ? "border-accent text-accent"
                  : "border-[#D0CCC4] text-transparent"
            )}
          >
            {task.complete ? "✓" : "·"}
          </span>
          <div
            className={cx(
              "flex-1 text-[12px]",
              task.complete ? "text-stone line-through" : "text-ink"
            )}
          >
            {task.name}
          </div>
          <StatusPill
            tone={
              task.status === "Done"
                ? "done"
                : task.status === "In Progress"
                  ? "progress"
                  : task.status === "Waiting on stock"
                    ? "warm"
                    : "neutral"
            }
          >
            {task.status}
          </StatusPill>
        </div>
      ))}
      <div className="px-4 py-3 text-[11px] text-[#B8B4AC]">+ Add task</div>
    </div>
  );
}

function RightRail() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-9 flex-col items-center gap-4 border-l border-[#F0EEEA] bg-white py-4 text-[13px] text-[#C5C0B6]">
      <span>🔒</span>
      <span>✦</span>
      <span>⊞</span>
      <span>💬</span>
      <span>👤</span>
    </div>
  );
}

export function ProductDesignDevelopmentTemplate() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-[860px] px-12 pb-20 pt-[96px] max-[768px]:px-6 max-[768px]:pb-14 max-[768px]:pt-[72px]">
        <div className="mb-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-stone">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Case Study · Product Design and Development Template
        </div>
        <h1
          className="max-w-[820px] font-display text-[clamp(38px,5vw,58px)] leading-[1.08] text-ink"
          style={{
            fontFamily: "var(--font-hero-display), Georgia, serif",
            letterSpacing: "-0.03em"
          }}
        >
          How Fold took the <span className="text-accent">Market Tote</span> from brief to
          production.
        </h1>
        <p className="mt-7 max-w-[640px] text-[18px] font-light leading-[1.7] text-ink-2">
          From initial brief to final sample sign-off - how the Fold team managed design,
          samples, and manufacturer communication in one project.
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
            The Product
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            A new bag. A small team. <span className="text-accent">A lot of back-and-forth.</span>
          </h2>
        </div>
        <div className="space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            Fold makes bags and accessories built around the idea that everyday objects should
            work harder. Their existing line - a zip pouch, a passport wallet, a structured
            crossbody - had built a solid customer base. The Market Tote was a natural next step:
            a canvas and leather tote sized for the farmer&apos;s market, the grocery run, the
            Tuesday errands. Simple brief, well-understood category.
          </p>
          <p>
            The team is small. Nadia handles product design and works directly with their
            manufacturer in Portugal. James manages ops and sourcing. Their photographer and
            copywriter come in at the end. The development process is the same every time: brief,
            sketches, spec sheet, sample rounds, revisions, sign-off, production.
          </p>
          <p>
            What changes is how well that process is documented. The Market Tote was the first
            product they ran entirely in Saria - brief through sign-off. Every sample round, every
            revision note, every question from the factory - in the project, not scattered across
            email threads.
          </p>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto grid max-w-[860px] gap-12 px-12 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[768px]:px-6 max-[768px]:py-14">
        <div>
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            The Process
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            Fourteen weeks, <span className="text-accent">start to finish.</span>
          </h2>
          <p className="mt-6 text-[16px] font-light leading-[1.8] text-ink-2">
            The project had four tabs: Product Brief, Design &amp; Samples, Manufacturer, and
            Launch Prep. Nadia worked primarily in Design &amp; Samples, logging every sample
            round and tracking revision status. James owned Manufacturer - costing table,
            production timeline, factory comms. Launch Prep was built out once sample three was
            signed off.
          </p>
        </div>
        <div className="relative pl-9">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-cream-3" />
          {processTimeline.map((event) => (
            <div key={`${event.date}-${event.label}`} className="relative flex gap-4 pb-7 last:pb-0">
              <div
                className={cx(
                  "relative z-10 flex h-[33px] w-[33px] flex-shrink-0 items-center justify-center rounded-full border text-[12px]",
                  event.active
                    ? "border-accent bg-accent-bg text-accent"
                    : "border-cream-3 bg-cream-2 text-stone"
                )}
              >
                {event.active ? "→" : "✦"}
              </div>
              <div className="pt-1">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                  {event.date}
                </div>
                <div
                  className={cx(
                    "mt-1 text-[15px] leading-[1.55]",
                    event.active ? "font-medium text-accent" : "text-ink"
                  )}
                >
                  {event.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[1000px] px-12 py-20 max-[768px]:px-4 max-[768px]:py-14">
        <div className="mx-auto mb-14 max-w-[860px] px-0 md:px-6">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Inside the Project
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            How the template was built
          </h2>
          <p className="mt-3 max-w-[560px] text-[16px] font-light leading-[1.8] text-ink-2">
            Four tabs. Here&apos;s what the Fold team put in each one and how they used it.
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
                  Product Brief
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Where the product starts. The concept, target customer, dimensions, materials,
                  and retail price target - all written out before any design work begins. The
                  pinned Shopify block shows the existing crossbody, which informed the sizing
                  decisions for the tote.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <WindowShell activeTab="Product Brief" backLink>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 rounded-[8px] px-1 py-1 pr-11">
                    <div className="rounded-[8px] px-3 py-2 text-[13px] leading-[1.65] text-ink-2">
                      <strong>Market Tote</strong> - a canvas and leather tote for everyday
                      carry. Sized between a grocery bag and a weekend bag. The customer already
                      owns our crossbody. This is for when she needs more room. Waxed canvas body,
                      full-grain leather handles and base panel. Should hold a laptop, a jacket,
                      and groceries without looking like a duffel bag.
                    </div>
                  </div>

                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-3">
                    <InfoCard label="Dimensions (target)">
                      <strong>H:</strong> 38cm
                      <br />
                      <strong>W:</strong> 32cm
                      <br />
                      <strong>D:</strong> 14cm
                      <br />
                      <strong>Handle drop:</strong> 28cm
                    </InfoCard>
                    <InfoCard label="Materials">
                      <strong>Body:</strong> 12oz waxed canvas
                      <br />
                      <strong>Base panel:</strong> Full-grain leather
                      <br />
                      <strong>Handles:</strong> Rolled leather
                      <br />
                      <strong>Lining:</strong> Cotton twill
                    </InfoCard>
                    <InfoCard label="Commercial">
                      <strong>Target retail:</strong> $195
                      <br />
                      <strong>Target COGS:</strong> &lt;$58
                      <br />
                      <strong>First run:</strong> 400 units
                      <br />
                      <strong>Colorways:</strong> 2 (Sand, Black)
                    </InfoCard>
                  </div>

                  <SectionHeader
                    title="Related Product"
                    subtitle="Pinned from Shopify - used as sizing reference"
                  />
                  <div className="mb-3 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="grid min-[720px]:grid-cols-[100px_minmax(0,1fr)]">
                      <div className="flex items-center justify-center bg-[linear-gradient(135deg,#F2EFE8,#E8E3D8)] text-[28px]">
                        👜
                      </div>
                      <div className="px-4 py-4">
                        <div className="mb-2 text-[12px] font-semibold text-ink">
                          Structured Crossbody - Waxed Canvas
                        </div>
                        <div className="flex flex-wrap gap-5">
                          {[
                            ["214", "In stock"],
                            ["$145", "Price"],
                            ["1,840", "Units sold"],
                            ["4.8★", "Rating"]
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
                          <StatusPill tone="progress">Active</StatusPill>
                        </div>
                      </div>
                    </div>
                  </div>

                  <SectionHeader title="Tasks" />
                  <TaskBlock title="Brief & Kick-Off" tasks={briefTasks} />
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
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Design &amp; Samples
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Nadia&apos;s tab. Sketches and reference images in a gallery block, the spec
                  sheet as a table, and a sample round block for each round received - with
                  feedback logged directly alongside the revision status. James could see exactly
                  where things stood without Nadia having to update him separately.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4 md:-mx-6 md:pt-6 lg:-mx-10">
              <WindowShell activeTab="Design & Samples" className="md:rounded-[28px]">
                <div className="relative bg-white px-6 py-6 pr-16 md:px-7 md:py-7 md:pr-[4.5rem]">
                  <div className="mb-4 mr-12 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">Sketches + References</div>
                      <div className="text-[11px] text-stone">
                        {designGalleryTiles.length} files
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 p-2.5 max-[640px]:grid-cols-2">
                      {designGalleryTiles.map((tile) => (
                        <div
                          key={tile.imageSrc}
                          className="relative aspect-square overflow-hidden rounded-[8px] bg-[#F4F0E8]"
                        >
                          <Image
                            src={tile.imageSrc}
                            alt={tile.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 180px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <SectionHeader title="Spec Sheet" />
                  <div className="mr-12 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">Technical Spec</div>
                      <div className="text-[11px] text-stone">v3 - final</div>
                    </div>
                    <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
                      <div className="flex-[2]">Component</div>
                      <div className="flex-[2]">Specification</div>
                      <div className="flex-[1.5]">Material / Supplier</div>
                      <div className="flex-1">Status</div>
                    </div>
                    {specRows.map((row) => (
                      <div
                        key={row.component}
                        className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
                      >
                        <div className="flex-[2] pr-2 font-medium text-ink">{row.component}</div>
                        <div className="flex-[2] pr-2 text-ink-2">{row.specification}</div>
                        <div className="flex-[1.5] pr-2 text-ink-2">{row.supplier}</div>
                        <div className="flex-1">
                          <StatusPill tone={row.status === "Confirmed" ? "done" : "progress"}>
                            {row.status}
                          </StatusPill>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <SectionHeader
                      title="Sample Rounds"
                      subtitle="Feedback and revision status per round"
                    />
                    <div className="mr-12 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                      <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                        <div className="text-[12px] font-semibold text-ink">Sample Rounds</div>
                        <StatusPill tone="done">S3 signed off</StatusPill>
                      </div>
                      {sampleRounds.map((round) => (
                        <div
                          key={round.name}
                          className="border-b border-[#F5F3EE] px-4 py-4 last:border-b-0"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="text-[13px] font-medium text-ink">{round.name}</div>
                            <div className="text-[11px] text-stone">{round.date}</div>
                          </div>
                          <div className="text-[12px] font-light leading-[1.6] text-ink-2">
                            {round.feedback}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {round.changes.map((change) => (
                              <span
                                key={change}
                                className="rounded-[6px] bg-[#E7F6EE] px-2.5 py-1 text-[10px] font-medium text-[#2F6B49]"
                              >
                                {change} ✓
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
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
                  Tab 03
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Manufacturer
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  James&apos;s tab. Factory details, costing breakdown, production timeline, and a
                  task block for everything that needs to happen between sign-off and the shipment
                  landing. When Nadia had a question about lead times, this tab had the answer.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <WindowShell activeTab="Manufacturer">
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                    <InfoCard label="Factory">
                      <strong>Atelier Minho, Portugal</strong>
                      <br />
                      Contact: Rafael / rafael@minho.pt
                      <br />
                      <strong>Lead time:</strong> 8-10 weeks post sign-off
                      <br />
                      <strong>MOQ:</strong> 200 units per colorway
                      <br />
                      <strong>Relationship:</strong> 3 years, 4 prior products
                    </InfoCard>
                    <InfoCard label="Order">
                      <strong>Units:</strong> 400 total (200 Sand, 200 Black)
                      <br />
                      <strong>Order placed:</strong> Week 14
                      <br />
                      <strong>Est. ship date:</strong> Week 22
                      <br />
                      <strong>Incoterms:</strong> FOB Lisbon
                      <br />
                      <strong>Status:</strong> In production
                    </InfoCard>
                  </div>

                  <SectionHeader title="Costing" />
                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3 text-[12px] font-semibold text-ink">
                      Cost Breakdown - per unit
                    </div>
                    <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
                      <div className="flex-[2.5]">Item</div>
                      <div className="flex-1">Cost</div>
                      <div className="flex-1">Notes</div>
                    </div>
                    {[
                      ["Materials (canvas, leather, hardware)", "$28.40", "Quoted"],
                      ["Labour (cut, sew, finish)", "$16.80", "Quoted"],
                      ["Packaging + tags", "$3.20", "Estimated"],
                      ["Freight + duties", "$6.50", "Estimated"]
                    ].map(([item, cost, notes]) => (
                      <div
                        key={item}
                        className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px]"
                      >
                        <div className="flex-[2.5] pr-2 font-medium text-ink">{item}</div>
                        <div className="flex-1 pr-2 text-ink-2">{cost}</div>
                        <div className="flex-1 text-ink-2">{notes}</div>
                      </div>
                    ))}
                    <div className="flex items-center bg-[#FAF9F6] px-4 py-3 text-[12px]">
                      <div className="flex-[2.5] pr-2 font-semibold text-ink">Total COGS</div>
                      <div className="flex-1 pr-2 font-semibold text-ink">$54.90</div>
                      <div className="flex-1 text-ink-2">Target: &lt;$58 ✓</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <SectionHeader title="Production Tasks" />
                    <TaskBlock title="Post Sign-Off" tasks={productionTasks} />
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
                  Tab 04
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Launch Prep
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Opened once sample three was signed off. Product copy, photography brief, and
                  the Shopify listing status - built out while production runs so it&apos;s ready
                  the day stock lands. The block comment thread shows Nadia and the copywriter
                  working through the product description together.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <WindowShell activeTab="Launch Prep">
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                    <InfoCard label="Product Copy - Draft">
                      The Market Tote is built for the days when you need more room. Waxed canvas
                      body, full-grain leather handles and base panel. Fits a laptop, a jacket,
                      and whatever else the day asks for. Available in Sand and Black.
                    </InfoCard>
                    <InfoCard label="Photography Brief">
                      <strong>Shots needed:</strong> Hero flat lay, carried shot, interior detail,
                      base leather detail, both colorways together
                      <br />
                      <strong>Photographer:</strong> Mia S. - briefed
                      <br />
                      <strong>Date:</strong> TBC - when stock lands
                    </InfoCard>
                  </div>

                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">Comments - Product Copy</div>
                      <div className="text-[11px] text-stone">3 comments</div>
                    </div>
                    <div className="space-y-4 px-4 py-4">
                      {[
                        {
                          initials: "N",
                          color: "bg-accent",
                          name: "Nadia",
                          time: "2 days ago",
                          text: "@Tom first pass at the PDP copy above - want to make sure \"whatever else the day asks for\" doesn't feel too vague. Can we be more specific about what fits? Like call out the laptop explicitly?"
                        },
                        {
                          initials: "T",
                          color: "bg-[#8A7A6A]",
                          name: "Tom",
                          time: "1 day ago",
                          text: "Agree - I'll rework it. Also want to lead with the leather base panel, that's the differentiator. Will have a revised version by end of day."
                        },
                        {
                          initials: "J",
                          color: "bg-[#2F6B49]",
                          name: "James",
                          time: "1 day ago",
                          text: "Can we also confirm the dimensions in the copy? Customers always ask."
                        }
                      ].map((comment) => (
                        <div key={`${comment.name}-${comment.time}`} className="flex gap-3">
                          <div
                            className={cx(
                              "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                              comment.color
                            )}
                          >
                            {comment.initials}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex gap-2 text-[11px] text-stone">
                              <span className="font-medium text-ink-2">{comment.name}</span>
                              <span>{comment.time}</span>
                            </div>
                            <div className="text-[12.5px] font-light leading-[1.55] text-ink-2">
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 border-t border-[#F5F3EE] px-4 py-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D0CCC4] text-[9px] text-white">
                        +
                      </div>
                      <div className="flex-1 rounded-[6px] bg-[#F5F3EE] px-3 py-2 text-[12px] text-stone">
                        Reply...
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <SectionHeader title="Shopify Listing" />
                    <TaskBlock title="Pre-Launch Checklist" tasks={launchTasks} />
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
          Production order placed. <span className="text-accent">Launch prep already running.</span>
        </h2>
        <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            The Market Tote went into production at week 14. Three sample rounds, one spec sheet
            that got updated and not lost, and a costing table that meant James and Nadia were
            never looking at different numbers. By the time the production order went out, Launch
            Prep was already half-built - copy in draft, photography brief written, Shopify
            listing created.
          </p>
          <p>
            The project stays open until stock lands and the listing goes live. Everything that
            happened during development is still there - sample round notes, revision history,
            factory correspondence - if they need to refer back to it for the next bag.
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
              14 wks
            </div>
            <div className="border-accent/20 pt-5 text-[16px] font-light leading-[1.75] text-ink-2 md:border-l md:pl-12 md:pt-0">
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                Brief to production order
              </div>
              <p className="mt-2">
                Three sample rounds, all revisions tracked in the same project. James and Nadia
                were never working off different versions of the spec.
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
            &quot;Every sample round, every revision note - it&apos;s all still in the project.
            When we do the next bag we&apos;ll start from the same template and already know what
            to expect from Atelier Minho.&quot;
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
              Manage your next <span className="text-accent">product</span> in one project.
            </h2>
            <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink-2">
              The Product Design and Development template covers brief through production - spec
              sheet, sample rounds, manufacturer, and launch prep.
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
