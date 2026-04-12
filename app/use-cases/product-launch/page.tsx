import type { ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import base from "../dashboard-visibility/use-case.module.css";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Product Launch | Saria Use Cases",
  description:
    "See how teams run a multi-SKU launch in Saria, from Shopify setup to campaign execution, influencer sends, launch-day coordination, and launch-readiness checks.",
  path: "/use-cases/product-launch"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/product-launch");

type StepItem = {
  title: string;
  body: ReactNode;
};

type StepSectionProps = {
  id: string;
  stepLabel: string;
  title: ReactNode;
  steps: StepItem[];
  visual: ReactNode;
  reverse?: boolean;
  callout?: ReactNode;
};

type MockFrameProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  panel?: ReactNode;
  canvasClassName?: string;
  bodyClassName?: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function WindowDots() {
  return (
    <>
      <span className={cx(base.windowDot, base.windowDotRed)} />
      <span className={cx(base.windowDot, base.windowDotYellow)} />
      <span className={cx(base.windowDot, base.windowDotGreen)} />
    </>
  );
}

function MockFrame({
  children,
  sidebar,
  panel,
  canvasClassName,
  bodyClassName
}: MockFrameProps) {
  return (
    <div className={base.mockScroller}>
      <div className={base.mock}>
        <div className={base.chrome}>
          <WindowDots />
        </div>
        <div className={cx(base.mockBody, bodyClassName)}>
          {sidebar}
          <div className={cx(base.mockCanvas, canvasClassName)}>{children}</div>
          {panel}
        </div>
      </div>
    </div>
  );
}

function StepSection({
  id,
  stepLabel,
  title,
  steps,
  visual,
  reverse,
  callout
}: StepSectionProps) {
  return (
    <section id={id} className={base.section}>
      <div className={base.sectionInner}>
        <div className={cx(base.sectionGrid, reverse && base.sectionGridReverse)}>
          <div className={base.sectionCopy}>
            <div className={base.sectionLabel}>{stepLabel}</div>
            <h2 className={base.sectionHeading}>{title}</h2>
            <div className={base.steps}>
              {steps.map((step, index) => (
                <div key={step.title} className={base.step}>
                  <div className={base.stepNumber}>{index + 1}</div>
                  <div>
                    <div className={base.stepTitle}>{step.title}</div>
                    <div className={base.stepText}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
            {callout ? <div className={base.callout}>{callout}</div> : null}
          </div>
          <div className={base.sectionVisual}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

function ProductGlyph({
  variant,
  size = 16
}: {
  variant: "serum" | "cream" | "balm" | "toner";
  size?: number;
}) {
  if (variant === "serum") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="rgba(29, 78, 216, 0.11)" />
        <circle cx="12" cy="12" r="4" fill="rgba(28, 25, 23, 0.42)" />
      </svg>
    );
  }

  if (variant === "cream") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="3" fill="rgba(29, 78, 216, 0.11)" />
        <rect x="9" y="8" width="6" height="2" rx="1" fill="rgba(28, 25, 23, 0.42)" />
      </svg>
    );
  }

  if (variant === "balm") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="6" ry="8" fill="rgba(29, 78, 216, 0.11)" />
        <ellipse cx="12" cy="12" rx="3" ry="4" fill="rgba(28, 25, 23, 0.42)" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" fill="rgba(29, 78, 216, 0.11)" />
      <rect x="10" y="7" width="4" height="1.5" rx="0.75" fill="rgba(28, 25, 23, 0.42)" />
    </svg>
  );
}

function ProductRow({
  variant,
  name,
  meta,
  status,
  statusClassName
}: {
  variant: "serum" | "cream" | "balm" | "toner";
  name: string;
  meta: string;
  status: string;
  statusClassName: string;
}) {
  return (
    <div className={styles.productRow}>
      <div className={styles.productThumb}>
        <ProductGlyph variant={variant} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>{name}</div>
        <div className={styles.productMeta}>{meta}</div>
      </div>
      <span className={cx(base.badge, statusClassName)}>{status}</span>
    </div>
  );
}

function TaskRow({
  name,
  due,
  priorityClassName,
  done,
  late
}: {
  name: string;
  due: string;
  priorityClassName: string;
  done?: boolean;
  late?: boolean;
}) {
  return (
    <div className={base.taskRow}>
      <div className={cx(base.taskCheck, done && base.taskCheckDone)} />
      <div className={cx(base.taskPriority, priorityClassName)} />
      <div className={cx(base.taskName, done && base.taskNameDone)}>{name}</div>
      <div className={cx(base.taskDue, late && base.taskDueLate)}>{due}</div>
    </div>
  );
}

function FileRow({
  icon,
  iconClassName,
  name,
  meta
}: {
  icon: string;
  iconClassName: string;
  name: string;
  meta: string;
}) {
  return (
    <div className={base.fileItem}>
      <div className={cx(base.fileIcon, iconClassName)}>{icon}</div>
      <div className={base.fileName}>{name}</div>
      <div className={base.fileMeta}>{meta}</div>
    </div>
  );
}

function InfluencerRow({
  initials,
  color,
  name,
  meta,
  status,
  statusClassName
}: {
  initials: string;
  color: string;
  name: string;
  meta: string;
  status: string;
  statusClassName: string;
}) {
  return (
    <div className={styles.influencerRow}>
      <div className={styles.influencerAvatar} style={{ backgroundColor: color }}>
        {initials}
      </div>
      <div className={styles.influencerInfo}>
        <div className={styles.influencerName}>{name}</div>
        <div className={styles.influencerMeta}>{meta}</div>
      </div>
      <span className={cx(base.badge, statusClassName)}>{status}</span>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className={base.page}>
        <div className={base.sectionNav}>
          <div className={base.sectionNavInner}>
            {USE_CASE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(base.sectionNavItem, item.active && base.sectionNavItemActive)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <section className={base.hero}>
          <div className={base.heroSolo}>
            <div className={base.eyebrow}>Product Drop & Launch</div>
            <h1 className={base.heroHeading}>
              How to run a <em>multi-SKU launch</em> in Saria
            </h1>
            <p className={base.heroSubhead}>
              A step-by-step walkthrough of how teams coordinate a new line drop - from Shopify
              setup to campaign execution to influencer sends - in one project.
            </p>
            <div className={base.heroActions}>
              <a
                href="https://app.sariasoftware.com/start-free-trial"
                className={base.primaryButton}
                target="_blank"
                rel="noreferrer"
              >
                Start Free Trial
              </a>
              <Link href="/pricing" className={base.secondaryButton}>
                Book a walkthrough
              </Link>
            </div>
          </div>
        </section>

        <section className={base.introStrip}>
          <div className={base.introStripInner}>
            <div className={base.introLabel}>How it works</div>
            <p className={base.introText}>
              You create <strong>one project for the entire launch</strong> - every product in the
              line connected from Shopify, every workstream organized into its own tab. Your ops
              lead, creative director, and marketing team all work in the same project, in the
              parts that belong to them, with one shared launch date keeping everything aligned.
            </p>
          </div>
        </section>

        <StepSection
          id="launch-project"
          stepLabel="Step 1"
          title={
            <>
              Create one project for the <em>entire line launch</em>
            </>
          }
          steps={[
            {
              title: "Go to Projects and create a new project",
              body: (
                <>
                  Name it after the collection - <strong>Summer Line Launch</strong> or{" "}
                  <strong>Hydration Collection - Q2</strong>. Set the launch date as the due date.
                  Tag it with the collection name so it&apos;s searchable across your workspace.
                  Set priority to <strong>Urgent</strong> - this is your most time-sensitive
                  project.
                </>
              )
            },
            {
              title: "Add every product in the line from Shopify",
              body: (
                <>
                  Instead of one Shopify block, you&apos;ll add a{" "}
                  <strong>Shopify product block for each SKU</strong> in the collection. Go to
                  your Products page, find each product in the line, and add it to the project.
                  Each one gets its own block showing live inventory, variant count, and status -
                  so you can see the full line at a glance without leaving the project.
                </>
              )
            },
            {
              title: "Pin your launch date visibly on the first tab",
              body: (
                <>
                  Add a <strong>text block</strong> at the top of the overview tab with the launch
                  date, collection name, and any hard constraints - retailer deadlines, PR embargo
                  dates, paid campaign go-live. This becomes the single reference your whole team
                  checks when they&apos;re not sure what &quot;on time&quot; means for this drop.
                </>
              )
            }
          ]}
          visual={
            <MockFrame
              sidebar={
                <div className={base.mockSidebar}>
                  <div className={base.sidebarSection}>
                    <div className={base.sidebarLabel}>Projects</div>
                    <div className={cx(base.sidebarItem, base.sidebarItemActive)}>
                      <span className={styles.sidebarDot} style={{ backgroundColor: "#b97431" }} />
                      Hydration Collection Q2
                    </div>
                    <div className={base.sidebarItem}>
                      <span className={styles.sidebarDot} style={{ backgroundColor: "#1d4ed8" }} />
                      Summer Campaign
                    </div>
                    <div className={base.sidebarItem}>
                      <span className={styles.sidebarDot} style={{ backgroundColor: "#3f7b53" }} />
                      Influencer Program
                    </div>
                  </div>
                </div>
              }
            >
              <div className={base.projectTitle}>Hydration Collection - Q2 Launch</div>
              <div className={base.metaRow}>
                <span className={cx(base.badge, base.badgeWarm)}>In Progress</span>
                <span className={cx(base.badge, base.badgeAccent)}>Launch May 14</span>
                <span className={cx(base.badge, base.badgeGold)}>Urgent</span>
                <span className={cx(base.badge, base.badgeNeutral)}>hydration - Q2</span>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Collection - Shopify Products</div>
                  <span className={cx(base.badge, base.badgeNeutral)}>4 SKUs</span>
                </div>
                <ProductRow
                  variant="serum"
                  name="Hydra-Burst Serum 30ml"
                  meta="3 variants - beautyco.myshopify.com"
                  status="Active"
                  statusClassName={base.badgeSuccess}
                />
                <ProductRow
                  variant="cream"
                  name="Moisture Barrier Cream 50ml"
                  meta="2 variants - beautyco.myshopify.com"
                  status="Draft"
                  statusClassName={base.badgeWarm}
                />
                <ProductRow
                  variant="balm"
                  name="Lip Hydration Balm"
                  meta="4 variants - beautyco.myshopify.com"
                  status="Draft"
                  statusClassName={base.badgeWarm}
                />
                <ProductRow
                  variant="toner"
                  name="Hydra-Mist Toner 100ml"
                  meta="1 variant - beautyco.myshopify.com"
                  status="Scheduled"
                  statusClassName={base.badgeViolet}
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="launch-workstreams"
          stepLabel="Step 2"
          reverse
          title={
            <>
              Structure your tabs around <em>launch workstreams</em>, not departments
            </>
          }
          steps={[
            {
              title: "Create a tab for each workstream in the launch",
              body: (
                <>
                  A new line launch typically runs across several parallel tracks. Create a tab for
                  each one - <strong>Campaign &amp; Creative, Shopify Setup, Influencer &amp; PR, Copy &amp; Messaging, Launch Day</strong>.
                  Each runs independently but shares the same project, the same launch date, and
                  the same overview.
                </>
              )
            },
            {
              title: "Assign ownership at the tab level",
              body: (
                <>
                  Your creative lead owns Campaign &amp; Creative. Your ops lead owns Shopify
                  Setup. Your marketing lead owns Influencer &amp; PR. They each work in their own
                  tab - building their blocks, managing their tasks - without stepping on each
                  other. Everyone still sees the same project overview.
                </>
              )
            },
            {
              title: "Add a Launch Day tab as the final checklist",
              body: (
                <>
                  Create a dedicated <strong>Launch Day</strong> tab with a single task block -
                  every action that needs to happen on drop day, assigned and time-stamped.
                  Shopify collections go live at 9am. Email sends at 9:05. Stories go up at 9:15.
                  This tab becomes the coordination layer when everyone is moving at once.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={base.canvasTight}>
              <div className={base.projectTitle}>Hydration Collection - Q2 Launch</div>
              <div className={base.tabs}>
                <div className={base.tab}>Overview</div>
                <div className={cx(base.tab, base.tabActive)}>Campaign &amp; Creative</div>
                <div className={base.tab}>Shopify Setup</div>
                <div className={base.tab}>Influencer &amp; PR</div>
                <div className={base.tab}>Launch Day</div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Text - Campaign Direction</div>
                </div>
                <div className={base.blockBodyText}>
                  <strong>Hydration Collection - Q2 Launch Brief</strong>
                  <br />
                  Hero theme: &quot;Skin that drinks.&quot; Primary palette: soft aqua, warm
                  cream, matte terracotta. Launch May 14. All creative assets locked by May 7.
                </div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Tasks - Creative Workstream</div>
                  <span className={cx(base.badge, base.badgeAccent)}>6 open</span>
                </div>
                <TaskRow
                  done
                  name="Lock campaign direction with founder"
                  due="Apr 21"
                  priorityClassName={base.priorityLow}
                />
                <TaskRow
                  name="Deliver hero campaign images"
                  due="May 1 ↑"
                  late
                  priorityClassName={base.priorityUrgent}
                />
                <TaskRow
                  name="Produce all PDP assets per SKU"
                  due="May 5"
                  priorityClassName={base.priorityHigh}
                />
                <TaskRow
                  name="Final email creative sign-off"
                  due="May 7"
                  priorityClassName={base.priorityMedium}
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="shopify-setup"
          stepLabel="Step 3"
          title={
            <>
              Use the Shopify Setup tab to <em>track every product&apos;s readiness</em> for launch
            </>
          }
          steps={[
            {
              title: "Add a Shopify product block for each SKU on this tab",
              body: (
                <>
                  Pull in each product in the collection - Hydra-Burst Serum, Moisture Barrier
                  Cream, Lip Balm, Hydra-Mist Toner. Each block shows its current Shopify status:{" "}
                  <strong>Draft, Scheduled,</strong> or <strong>Active</strong>. You can see at a
                  glance which products are ready and which still need work before the drop date.
                </>
              )
            },
            {
              title: "Tag each product block with its readiness status",
              body: (
                <>
                  Use universal properties to tag each product block - <strong>copy ready, images
                  uploaded, pricing confirmed, collection added</strong>. As your ops lead works
                  through each SKU, they update the status. The whole team can see which products
                  are launch-ready without asking.
                </>
              )
            },
            {
              title: "Add a task block for Shopify-specific launch actions",
              body: (
                <>
                  Below the product blocks, add a task block for setup actions: create the
                  collection page, add all SKUs to the drop collection, set inventory levels,
                  schedule the Shopify launch time, test the checkout flow. Assign each to your
                  ops lead with the day-before launch as the deadline.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>On launch day</strong>, your ops lead refreshes the Shopify blocks and sees
              live inventory and status update in real time - right inside Saria, without leaving
              the project.
            </>
          }
          visual={
            <MockFrame>
              <div className={base.tabs}>
                <div className={base.tab}>Campaign &amp; Creative</div>
                <div className={cx(base.tab, base.tabActive)}>Shopify Setup</div>
                <div className={base.tab}>Influencer &amp; PR</div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Shopify Products - Launch Readiness</div>
                </div>
                <ProductRow
                  variant="serum"
                  name="Hydra-Burst Serum"
                  meta="copy ready - images ready - pricing ready"
                  status="Ready"
                  statusClassName={base.badgeSuccess}
                />
                <ProductRow
                  variant="cream"
                  name="Moisture Barrier Cream"
                  meta="copy ready - images pending - pricing ready"
                  status="In Progress"
                  statusClassName={base.badgeWarm}
                />
                <ProductRow
                  variant="balm"
                  name="Lip Hydration Balm"
                  meta="copy pending - images pending"
                  status="Not Started"
                  statusClassName={styles.badgeRose}
                />
                <ProductRow
                  variant="toner"
                  name="Hydra-Mist Toner"
                  meta="copy ready - images ready - pricing ready"
                  status="Scheduled"
                  statusClassName={base.badgeViolet}
                />
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Tasks - Shopify Setup</div>
                </div>
                <TaskRow
                  done
                  name="Create drop collection page"
                  due="May 8"
                  priorityClassName={base.priorityLow}
                />
                <TaskRow
                  name="Add all SKUs to collection"
                  due="May 10 ↑"
                  late
                  priorityClassName={base.priorityUrgent}
                />
                <TaskRow
                  name="Schedule launch time - 9:00am"
                  due="May 13"
                  priorityClassName={base.priorityHigh}
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="campaign-creative"
          stepLabel="Step 4"
          reverse
          title={
            <>
              Build the Campaign &amp; Creative tab as your <em>creative and messaging hub</em>
            </>
          }
          steps={[
            {
              title: "Add a text block for the campaign brief",
              body: (
                <>
                  Write the campaign direction at the top - theme, visual references, tone, hero
                  message, channel breakdown. This is the brief your creative team, copywriter,
                  and photographer are all working from. Having it in the tab means no one is
                  working off a stale version emailed two weeks ago.
                </>
              )
            },
            {
              title: "Keep visual direction, references, and approved selects in one gallery",
              body: (
                <>
                  Upload your mood board, reference images, and approved campaign visuals as they
                  come in. Tag each image block with its status - <strong>reference, approved,
                  final</strong>. As your creative lead signs off on assets, the status updates and
                  your whole team can see what&apos;s locked.
                </>
              )
            },
            {
              title: "Plan launch copy for the site, product pages, and email in one place",
              body: (
                <>
                  Add a dedicated <strong>copy block or doc</strong> for launch messaging. Draft
                  the homepage hero, collection page copy, PDP bullets, product naming, email
                  subject lines, and send copy in the same tab as the campaign brief. Your brand
                  lead, copywriter, and lifecycle team can review the same source of truth instead
                  of passing versions across docs, Slack threads, and email.
                </>
              )
            },
            {
              title: "Embed the campaign Figma file",
              body: (
                <>
                  Use an <strong>embed block</strong> to pull in the Figma file with all
                  channel-specific creative - email header, PDP banners, paid social, story
                  templates. Your team reviews and comments on the live file in Saria. When your
                  designer updates it in Figma, it&apos;s reflected instantly - no re-sharing
                  links.
                </>
              )
            },
            {
              title: "Add a timeline block for creative deadlines",
              body: (
                <>
                  Map every creative deadline - photography delivery, first design pass, revision
                  window, final lock. Assign each milestone to the right person. The timeline is
                  visible on the tab so your creative lead can see the full production schedule
                  without opening a separate doc.
                </>
              )
            }
          ]}
          visual={
            <MockFrame>
              <div className={base.tabs}>
                <div className={cx(base.tab, base.tabActive)}>Campaign &amp; Creative</div>
                <div className={base.tab}>Shopify Setup</div>
                <div className={base.tab}>Influencer &amp; PR</div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Timeline - Creative Production</div>
                </div>
                <div className={base.timelineMonths}>
                  <div>Apr 21</div>
                  <div>Apr 28</div>
                  <div>May 5</div>
                  <div>May 14</div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Photography</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarWarm)} style={{ left: "0%", width: "28%" }}>
                      <span>Studio</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Design pass 1</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarViolet)} style={{ left: "26%", width: "22%" }}>
                      <span>M. Park</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Revisions</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarGold)} style={{ left: "46%", width: "18%" }}>
                      <span>Team</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Assets locked</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarSuccess)} style={{ left: "62%", width: "14%" }}>
                      <span>May 7</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Launch</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarAccent)} style={{ left: "78%", width: "8%" }}>
                      <span>May 14</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Files - Campaign Assets &amp; Copy</div>
                </div>
                <FileRow
                  icon="Fig"
                  iconClassName={base.fileIconFigma}
                  name="Campaign Creative - All Channels"
                  meta="Live"
                />
                <FileRow
                  icon="PDF"
                  iconClassName={base.fileIconPdf}
                  name="Campaign Brief v2 - Final.pdf"
                  meta="1.2 MB"
                />
                <FileRow
                  icon="DOC"
                  iconClassName={styles.fileIconDoc}
                  name="Website + PDP Launch Copy.docx"
                  meta="410 KB"
                />
                <FileRow
                  icon="DOC"
                  iconClassName={styles.fileIconDoc}
                  name="Launch Email Messaging.docx"
                  meta="340 KB"
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="influencer-pr"
          stepLabel="Step 5"
          title={
            <>
              Manage your influencer and PR sends <em>from a single tab</em>
            </>
          }
          steps={[
            {
              title: "Build a table block for your influencer list",
              body: (
                <>
                  Add a <strong>table block</strong> to the Influencer &amp; PR tab. Each row is a
                  contact - influencer name, handle, tier, products they&apos;re receiving, send
                  date, tracking status. You can filter by tier or status inline, so your
                  marketing lead can see at a glance who&apos;s been sent product and who&apos;s
                  still pending.
                </>
              )
            },
            {
              title: "Attach the PR brief and gifting notes as file blocks",
              body: (
                <>
                  Upload the PR brief, the gifting messaging guide, and the unboxing notes as file
                  blocks next to the table. When your team is pulling together packages, everything
                  they need - who&apos;s getting what, what to include in the note, which products
                  to prioritize - is in one tab.
                </>
              )
            },
            {
              title: "Use Magic Links to share send details with your PR partner",
              body: (
                <>
                  If you&apos;re working with an external PR agency or a freelance gifting
                  coordinator, toggle the Influencer &amp; PR tab as public and send a Magic Link.
                  They see the send list, the brief, the timeline - nothing else in the project.
                  They leave notes and updates directly in Saria.
                </>
              )
            }
          ]}
          visual={
            <MockFrame>
              <div className={base.tabs}>
                <div className={base.tab}>Campaign &amp; Creative</div>
                <div className={base.tab}>Shopify Setup</div>
                <div className={cx(base.tab, base.tabActive)}>Influencer &amp; PR</div>
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Influencer Send List</div>
                  <span className={cx(base.badge, base.badgeNeutral)}>8 contacts</span>
                </div>
                <InfluencerRow
                  initials="SL"
                  color="#b97431"
                  name="@skincarebysara"
                  meta="Tier 1 - Serum + Cream + Toner"
                  status="Sent"
                  statusClassName={base.badgeSuccess}
                />
                <InfluencerRow
                  initials="MK"
                  color="#1d4ed8"
                  name="@minkbeauty"
                  meta="Tier 1 - Full collection"
                  status="Sent"
                  statusClassName={base.badgeSuccess}
                />
                <InfluencerRow
                  initials="JP"
                  color="#6f63c7"
                  name="@jadeandpetal"
                  meta="Tier 2 - Serum + Lip Balm"
                  status="Packaging"
                  statusClassName={base.badgeGold}
                />
                <InfluencerRow
                  initials="RV"
                  color="#b0407a"
                  name="@rosavibes"
                  meta="Tier 2 - Serum + Toner"
                  status="Pending"
                  statusClassName={styles.badgeRose}
                />
              </div>

              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Files - PR Kit</div>
                </div>
                <FileRow
                  icon="PDF"
                  iconClassName={base.fileIconPdf}
                  name="PR Brief - Hydration Collection.pdf"
                  meta="980 KB"
                />
                <FileRow
                  icon="DOC"
                  iconClassName={styles.fileIconDoc}
                  name="Gifting Messaging Guide.docx"
                  meta="220 KB"
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="master-timeline"
          stepLabel="Step 6"
          reverse
          title={
            <>
              Add a master launch timeline that spans <em>every workstream</em>
            </>
          }
          steps={[
            {
              title: "Add a timeline block to the Overview tab",
              body: (
                <>
                  This is the master launch timeline - one view that shows every workstream&apos;s
                  critical path. Creative production, Shopify readiness, influencer sends,
                  campaign go-live. Each one as a bar on the same timeline, all anchored to the
                  same May 14 launch date.
                </>
              )
            },
            {
              title: "Assign each milestone to the right owner",
              body: (
                <>
                  Click each bar to assign it. Your creative lead owns the creative production
                  track. Your ops lead owns Shopify setup. Your marketing lead owns influencer
                  sends and campaign go-live. Ownership is visible on the timeline so there&apos;s
                  no ambiguity about who&apos;s responsible when a milestone slips.
                </>
              )
            },
            {
              title: "The timeline syncs to the workspace calendar",
              body: (
                <>
                  Every milestone appears in the shared calendar the moment it&apos;s created. When
                  a deadline moves - creative delivery pushed by two days, influencer send delayed
                  - update it in the timeline and the calendar reflects it across the whole team
                  immediately.
                </>
              )
            }
          ]}
          visual={
            <MockFrame>
              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Master Launch Timeline - May 14</div>
                </div>
                <div className={base.timelineMonths}>
                  <div>Apr 21</div>
                  <div>Apr 28</div>
                  <div>May 5</div>
                  <div>May 14</div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Campaign creative</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarWarm)} style={{ left: "0%", width: "62%" }}>
                      <span>M. Park</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Shopify setup</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarAccent)} style={{ left: "20%", width: "55%" }}>
                      <span>Ops</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Copy &amp; messaging</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarViolet)} style={{ left: "0%", width: "50%" }}>
                      <span>Copy team</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Influencer sends</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarGold)} style={{ left: "30%", width: "38%" }}>
                      <span>Marketing</span>
                    </div>
                  </div>
                </div>
                <div className={base.timelineRow}>
                  <div className={base.timelineLabel}>Campaign live</div>
                  <div className={base.timelineTrack}>
                    <div className={cx(base.timelineBar, base.timelineBarSuccess)} style={{ left: "76%", width: "10%" }}>
                      <span>May 14</span>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="comments-review"
          stepLabel="Step 7"
          title={
            <>
              Review campaign assets and give feedback <em>directly on the block</em>
            </>
          }
          steps={[
            {
              title: "Open the comment panel on any creative block",
              body: (
                <>
                  When your designer uploads a campaign image or an email header, hover over the
                  block and open the comment panel. Leave feedback pinned to exactly what you&apos;re
                  looking at - the hero image crop, the font choice on the PDP banner, the color
                  balance on the product shot. No Slack thread, no &quot;which version did you
                  mean.&quot;
                </>
              )
            },
            {
              title: "Use @ to loop in whoever needs to weigh in",
              body: (
                <>
                  Type <code>@name</code> to tag your founder on the final campaign direction, your
                  copywriter on a headline call, your ops lead on a product detail. They land
                  directly on the block - not in a thread trying to figure out what you&apos;re
                  referring to.
                </>
              )
            },
            {
              title: "Resolve comments as assets get locked",
              body: (
                <>
                  When a round of feedback is addressed, resolve the comment thread. As launch day
                  approaches, you can see at a glance which assets still have open feedback and
                  which are fully signed off. Nothing accidentally ships with unresolved notes.
                </>
              )
            }
          ]}
          visual={
            <MockFrame
              canvasClassName={base.canvasCompact}
              panel={
                <div className={base.commentPanel}>
                  <div className={base.commentPanelTitle}>Comments</div>
                  <div className={base.commentThread}>
                    <div className={base.commentHeader}>
                      <div className={cx(base.commentAvatar, base.avatarWarm)}>AF</div>
                      <div className={base.commentAuthor}>Amara F.</div>
                      <div className={base.commentTime}>3h</div>
                    </div>
                    <div className={base.commentText}>
                      Crop is too tight on the right - product feels cramped. Give it more air.
                    </div>
                  </div>
                  <div className={base.commentThread}>
                    <div className={base.commentHeader}>
                      <div className={cx(base.commentAvatar, base.avatarAccent)}>MP</div>
                      <div className={base.commentAuthor}>Mia P.</div>
                      <div className={base.commentTime}>2h</div>
                    </div>
                    <div className={base.commentText}>
                      <span className={base.commentMention}>@Amara</span> fixed in v3 - also
                      pulled the background color warmer to match the collection palette.
                    </div>
                  </div>
                  <div className={base.commentThread}>
                    <div className={base.commentHeader}>
                      <div className={cx(base.commentAvatar, base.avatarSuccess)}>JS</div>
                      <div className={base.commentAuthor}>Jade S.</div>
                      <div className={base.commentTime}>1h</div>
                    </div>
                    <div className={base.commentText}>
                      Logo lockup needs to move - it&apos;s competing with the product.{" "}
                      <span className={base.commentMention}>@Mia</span> can you shift it bottom
                      left?
                    </div>
                  </div>
                </div>
              }
            >
              <div className={base.block}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Image - Hero Campaign Shot</div>
                  <span className={cx(base.badge, base.badgeWarm)}>2 open</span>
                </div>
                <div className={styles.heroShot}>
                  <div className={styles.heroShotCard}>
                    <div className={styles.heroShotBottle} />
                    <div className={styles.heroShotLabel} />
                  </div>
                  <div className={cx(base.pin, base.pinWarm)} style={{ top: "15%", right: "25%" }}>
                    1
                  </div>
                  <div className={cx(base.pin, base.pinAccent)} style={{ bottom: "20%", left: "20%" }}>
                    2
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="launch-ai"
          stepLabel="Step 8"
          reverse
          title={
            <>
              Use AI to <em>build launch infrastructure</em> and search across every workstream
            </>
          }
          steps={[
            {
              title: "Generate a full tab setup with Cmd+K",
              body: (
                <>
                  Hit <code>Cmd+K</code> and ask Saria to set up a workstream tab -{" "}
                  <strong>
                    &quot;Create a Launch Day tab with a timed task checklist for a 9am drop -
                    Shopify, email, social, paid.&quot;
                  </strong>{" "}
                  It builds the task block with pre-populated items, times, and suggested owners.
                  You fill in the specifics; Saria handles the structure.
                </>
              )
            },
            {
              title: "Ask AI to draft copy blocks from your brief",
              body: (
                <>
                  With your campaign brief in the canvas, ask AI to generate a first draft of your
                  collection page headline, your launch email subject line, or your Instagram
                  caption set. It reads the brief in context and writes from it - not from scratch.
                  Every draft is editable and undoable.
                </>
              )
            },
            {
              title: "Search across all workstreams with a single prompt",
              body: (
                <>
                  When you&apos;re days out from launch and moving fast, use <code>Cmd+K</code> to
                  find anything instantly - <strong>&quot;which influencers haven&apos;t been sent
                  product yet&quot;</strong>, <strong>&quot;what&apos;s the status of the email
                  creative&quot;</strong>, <strong>&quot;show me all overdue tasks across the
                  project.&quot;</strong> Saria finds it across every tab.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={base.canvasCompact}>
              <div className={base.aiPrompt}>
                <strong>Cmd+K</strong> &quot;Create a Launch Day tab with a timed task checklist
                for a 9am drop&quot;
              </div>
              <div className={base.aiMetaRow}>
                <div className={base.aiMetaIcon}>
                  <svg viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M5 1 6.5 4H9.5L7 6 8 9 5 7.5 2 9 3 6 .5 4H3.5L5 1Z" />
                  </svg>
                </div>
                Launch Day tab created - 1 task block added
              </div>

              <div className={cx(base.block, base.aiBlock)}>
                <div className={base.blockHeader}>
                  <div className={base.blockType}>Tasks - Launch Day - May 14</div>
                  <div className={base.aiTag}>AI</div>
                </div>
                <TaskRow
                  name="9:00am - Shopify collection goes live"
                  due="9:00"
                  priorityClassName={base.priorityUrgent}
                />
                <TaskRow
                  name="9:05am - Launch email sends"
                  due="9:05"
                  priorityClassName={base.priorityUrgent}
                />
                <TaskRow
                  name="9:15am - Instagram stories go live"
                  due="9:15"
                  priorityClassName={base.priorityHigh}
                />
                <TaskRow
                  name="9:30am - Paid campaign activates"
                  due="9:30"
                  priorityClassName={base.priorityHigh}
                />
                <TaskRow
                  name="12:00pm - Check inventory levels"
                  due="12:00"
                  priorityClassName={base.priorityMedium}
                />
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="launch-readiness"
          stepLabel="Step 9"
          title={
            <>
              Tag assets across workstreams - then pull a <em>launch-readiness view</em> instantly
            </>
          }
          steps={[
            {
              title: "Tag every deliverable block with its SKU and status",
              body: (
                <>
                  As your team uploads assets and completes work across tabs, tag each block with
                  the product it belongs to - <strong>hydra-serum, moisture-cream, lip-balm,
                  hydra-toner</strong> - and a status: <strong>in progress, review, approved,
                  final</strong>. A campaign image in Creative gets tagged. A copy doc in Messaging
                  gets tagged. A Shopify block in Setup gets tagged.
                </>
              )
            },
            {
              title: "Ask AI for a readiness view per SKU",
              body: (
                <>
                  Hit <code>Cmd+K</code> and ask{" "}
                  <strong>
                    &quot;Show me all assets for the Hydra-Burst Serum and their status.&quot;
                  </strong>{" "}
                  Saria pulls every tagged block across every tab - the campaign image, the copy
                  doc, the PDP asset, the Shopify block - into a single board grouped by status.
                  You see instantly what&apos;s done and what&apos;s still open for that product,
                  without opening five tabs.
                </>
              )
            },
            {
              title: "Run a full launch readiness check the day before",
              body: (
                <>
                  Ask{" "}
                  <strong>
                    &quot;Show me everything tagged as pending or in review across the whole
                    project.&quot;
                  </strong>{" "}
                  Every outstanding item - across Creative, Shopify Setup, Influencer, Copy -
                  surfaces in one view. You know exactly what still needs to close before 9am
                  tomorrow.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>No status spreadsheet.</strong> No &quot;can you send me a list of what&apos;s
              still outstanding.&quot; The tags you set while building the launch become your
              pre-launch audit - pulled on demand, always current.
            </>
          }
          visual={
            <MockFrame canvasClassName={base.canvasCompact}>
              <div className={base.aiPrompt}>
                <strong>AI</strong> &quot;Show me everything pending or in review across the
                project&quot;
              </div>
              <div className={base.aggregateMeta}>7 items across 4 tabs</div>

              <div className={base.aggregateBoard}>
                <div>
                  <div className={base.aggregateHeader}>In Review</div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>Hero campaign image</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Campaign &amp; Creative
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, base.badgeWarm)}>hydra-serum</span>
                    </div>
                  </div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>PDP banner set</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Campaign &amp; Creative
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, base.badgeAccent)}>all SKUs</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={base.aggregateHeader}>Pending</div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>Lip Balm copy</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Copy &amp; Messaging
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, base.badgeViolet)}>lip-balm</span>
                    </div>
                  </div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>Shopify images</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Shopify Setup
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, base.badgeGold)}>moisture-cream</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={base.aggregateHeader}>Not Sent</div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>@rosavibes package</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Influencer &amp; PR
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, styles.badgeRose)}>tier-2</span>
                    </div>
                  </div>
                  <div className={base.aggregateCard}>
                    <div className={base.aggregateName}>@jadeandpetal package</div>
                    <div className={base.aggregateFrom}>
                      <span className={base.aggregateDot} />
                      Influencer &amp; PR
                    </div>
                    <div className={base.inlineBadges}>
                      <span className={cx(base.badge, styles.badgeRose)}>tier-2</span>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <section className={base.ctaSection}>
          <div className={base.ctaInner}>
            <div className={base.ctaLabel}>Get started</div>
            <h2 className={base.ctaHeading}>Set up your next launch in Saria.</h2>
            <p className={base.ctaText}>
              One project. Every workstream. One launch date. Ready in minutes.
            </p>
            <div className={base.ctaActions}>
              <a
                href="https://app.sariasoftware.com/start-free-trial"
                className={base.ctaPrimary}
                target="_blank"
                rel="noreferrer"
              >
                Start Free Trial
              </a>
              <Link href="/pricing" className={base.ctaSecondary}>
                Book a walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
