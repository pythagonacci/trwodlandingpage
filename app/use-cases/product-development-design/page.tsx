import type { ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Product Development and Design | Saria Use Cases",
  description:
    "See how modern product teams run development and design in Saria, from the first brief to launch-ready packaging, timelines, reviews, and supplier collaboration.",
  path: "/use-cases/product-development-design"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/product-development-design");

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
      <span className={cx(styles.windowDot, styles.windowDotRed)} />
      <span className={cx(styles.windowDot, styles.windowDotYellow)} />
      <span className={cx(styles.windowDot, styles.windowDotGreen)} />
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
    <div className={styles.mockScroller}>
      <div className={styles.mock}>
        <div className={styles.chrome}>
          <WindowDots />
        </div>
        <div className={cx(styles.mockBody, bodyClassName)}>
          {sidebar}
          <div className={cx(styles.mockCanvas, canvasClassName)}>{children}</div>
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
    <section id={id} className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={cx(styles.sectionGrid, reverse && styles.sectionGridReverse)}>
          <div className={styles.sectionCopy}>
            <div className={styles.sectionLabel}>{stepLabel}</div>
            <h2 className={styles.sectionHeading}>{title}</h2>
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div key={step.title} className={styles.step}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepText}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
            {callout ? <div className={styles.callout}>{callout}</div> : null}
          </div>
          <div className={styles.sectionVisual}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className={styles.page}>
        <div className={styles.sectionNav}>
          <div className={styles.sectionNavInner}>
            {USE_CASE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(styles.sectionNavItem, item.active && styles.sectionNavItemActive)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>Product Development & Design</div>
              <h1 className={styles.heroHeading}>
                How to run <em>product development</em> in Saria
              </h1>
              <p className={styles.heroSubhead}>
                A step-by-step walkthrough of how a physical product team sets up and manages
                development, from first brief to launch-ready.
              </p>
              <div className={styles.heroActions}>
                <a
                  href="https://app.sariasoftware.com/start-free-trial"
                  className={styles.primaryButton}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Free Trial
                </a>
                <Link href="/pricing" className={styles.secondaryButton}>
                  Book a walkthrough
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualWrap}>
              <div className={styles.heroVisual}>
                <div className={styles.heroVisualTop}>
                  <div>
                    <div className={styles.heroVisualLabel}>Launch Canvas</div>
                    <div className={styles.heroVisualTitle}>Vitamin C Serum</div>
                  </div>
                  <span className={cx(styles.badge, styles.badgeAccent)}>In Progress</span>
                </div>

                <div className={styles.heroVisualBoard}>
                  <div className={styles.heroVisualColumn}>
                    <div className={styles.heroVisualColumnHeader}>Brief</div>
                    <div className={styles.heroMiniCard}>
                      <div className={styles.heroMiniTitle}>Product vision</div>
                      <div className={styles.heroMiniLines}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className={styles.heroMiniCard}>
                      <div className={styles.heroMiniTitle}>Formula brief</div>
                      <div className={styles.heroMiniTags}>
                        <span>15% Vit C</span>
                        <span>HA base</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.heroVisualColumn}>
                    <div className={styles.heroVisualColumnHeader}>Design</div>
                    <div className={styles.heroMoodboard}>
                      <div className={cx(styles.heroSwatch, styles.heroSwatchOne)} />
                      <div className={cx(styles.heroSwatch, styles.heroSwatchTwo)} />
                      <div className={cx(styles.heroSwatch, styles.heroSwatchThree)} />
                      <div className={cx(styles.heroSwatch, styles.heroSwatchFour)} />
                    </div>
                    <div className={styles.heroBottleCard}>
                      <div className={styles.heroBottle} />
                      <div className={styles.heroPin} />
                    </div>
                  </div>

                  <div className={styles.heroVisualColumn}>
                    <div className={styles.heroVisualColumnHeader}>Timeline</div>
                    <div className={styles.heroTimelineList}>
                      <div className={styles.heroTimelineItem}>
                        <span className={styles.heroTimelineName}>Lab review</span>
                        <div className={styles.heroTimelineTrack}>
                          <div className={styles.heroTimelineBarShort} />
                        </div>
                      </div>
                      <div className={styles.heroTimelineItem}>
                        <span className={styles.heroTimelineName}>Packaging</span>
                        <div className={styles.heroTimelineTrack}>
                          <div className={styles.heroTimelineBarMedium} />
                        </div>
                      </div>
                      <div className={styles.heroTimelineItem}>
                        <span className={styles.heroTimelineName}>Samples</span>
                        <div className={styles.heroTimelineTrack}>
                          <div className={styles.heroTimelineBarLong} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.heroKpiRow}>
                      <div className={styles.heroKpiCard}>
                        <strong>8</strong>
                        <span>Open tasks</span>
                      </div>
                      <div className={styles.heroKpiCard}>
                        <strong>3</strong>
                        <span>Tabs live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.introStrip}>
          <div className={styles.introStripInner}>
            <div className={styles.introLabel}>How it works</div>
            <p className={styles.introText}>
              You create <strong>one project per product</strong>, connect it to Shopify, break it
              into tabs by phase, and fill each tab with the blocks that phase actually needs:
              briefs, tasks, files, timelines, Figma embeds. Everything your team needs to develop
              a product lives in that one project.
            </p>
          </div>
        </section>

        <StepSection
          id="project-and-shopify"
          stepLabel="Step 1"
          title={
            <>
              Create a project and connect it to your <em>Shopify product</em>
            </>
          }
          steps={[
            {
              title: "Go to Projects and create a new project",
              body: (
                <>
                  Name it after the product. Set a status, <strong>In Progress</strong>, a due
                  date, a priority, and tags like <strong>skincare</strong> or{" "}
                  <strong>serum</strong>. These propagate to your dashboard and calendar
                  automatically.
                </>
              )
            },
            {
              title: "Attach it to the Shopify product",
              body: (
                <>
                  If the product already exists in your store, even as a draft, connect it from
                  your product library. Saria pulls in the name, images, variant structure, and
                  store metadata. You can also create the project directly from the product page
                  and Saria does this automatically.
                </>
              )
            },
            {
              title: "The Shopify block appears on your first tab",
              body: (
                <>
                  It shows live inventory, units sold, variant count, and price so your ops context
                  lives right next to your development work from the start.
                </>
              )
            }
          ]}
          visual={
            <MockFrame
              sidebar={
                <div className={styles.mockSidebar}>
                  <div className={styles.sidebarSection}>
                    <div className={styles.sidebarLabel}>Projects</div>
                    <div className={cx(styles.sidebarItem, styles.sidebarItemActive)}>
                      Vitamin C Serum
                    </div>
                    <div className={styles.sidebarItem}>Moisturizer SPF 30</div>
                    <div className={styles.sidebarItem}>Lip Treatment</div>
                  </div>
                </div>
              }
            >
              <div className={styles.projectTitle}>Vitamin C Serum - 30ml</div>
              <div className={styles.metaRow}>
                <span className={cx(styles.badge, styles.badgeWarm)}>In Progress</span>
                <span className={cx(styles.badge, styles.badgeAccent)}>Due Apr 14</span>
                <span className={cx(styles.badge, styles.badgeGold)}>Urgent</span>
                <span className={cx(styles.badge, styles.badgeNeutral)}>skincare - serum</span>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Shopify Product</div>
                  <span className={cx(styles.badge, styles.badgeSuccess)}>Active</span>
                </div>
                <div className={styles.shopifyGrid}>
                  <div className={styles.shopifyThumb}>
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                      <rect width="32" height="32" rx="8" />
                      <path d="M16 8c-3.31 0-6 2.69-6 6 0 5 6 10 6 10s6-5 6-10c0-3.31-2.69-6-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.shopifyName}>Vitamin C Serum 30ml</div>
                    <div className={styles.inlineBadges}>
                      <span className={cx(styles.badge, styles.badgeNeutral)}>3 variants</span>
                      <span className={cx(styles.badge, styles.badgeAccent)}>
                        beautyco.myshopify.com
                      </span>
                    </div>
                    <div className={styles.shopifyStats}>
                      <div>
                        <div className={styles.statValue}>248</div>
                        <div className={styles.statLabel}>Units sold</div>
                      </div>
                      <div>
                        <div className={styles.statValue}>82</div>
                        <div className={styles.statLabel}>In stock</div>
                      </div>
                      <div>
                        <div className={styles.statValue}>$38</div>
                        <div className={styles.statLabel}>Price</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="phases-and-tabs"
          stepLabel="Step 2"
          reverse
          title={
            <>
              Create a tab for <em>each phase</em> of your process
            </>
          }
          steps={[
            {
              title: 'Hit "New tab" and name it after a phase',
              body: (
                <>
                  Start with <strong>Brief & Concept</strong>. Then add <strong>Formulation</strong>
                  , <strong>Packaging & Design</strong>, <strong>Samples & Review</strong>,{" "}
                  <strong>Launch Ready</strong>. Each tab is a separate canvas. Your formulator
                  works in Formulation, your creative director in Packaging, same project, separate
                  workspaces.
                </>
              )
            },
            {
              title: "Add subtabs if a phase gets complex",
              body: (
                <>
                  Right-click any tab and select <strong>Add subtab</strong>. If Packaging needs
                  its own sub-pages, like Dieline and Mood Board, nest them under it. The sidebar
                  updates automatically so nothing gets buried.
                </>
              )
            },
            {
              title: "Each tab starts blank, you build it with blocks",
              body: (
                <>
                  Click the <strong>+</strong> on any tab to add a block: text, tasks, files,
                  timelines, galleries, embeds. Choose what that phase actually needs. The next
                  few steps show exactly what to add for product development.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasTight}>
              <div className={styles.projectTitle}>Vitamin C Serum - 30ml</div>
              <div className={styles.tabs}>
                <div className={styles.tab}>Overview</div>
                <div className={cx(styles.tab, styles.tabActive)}>Brief & Concept</div>
                <div className={styles.tab}>Formulation</div>
                <div className={styles.tab}>Packaging & Design</div>
                <div className={styles.tab}>Samples</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Text - Product Vision</div>
                </div>
                <div className={styles.blockBodyText}>
                  <strong>Vitamin C Serum - Brief</strong>
                  <br />
                  High-potency Vit C targeting hyperpigmentation, skin types 2-4. 15% L-Ascorbic
                  acid, ferulic acid stabilizer, HA base. Lightweight, fast-absorbing, no
                  tackiness.
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Tasks - Concept Phase</div>
                  <span className={cx(styles.badge, styles.badgeAccent)}>4 open</span>
                </div>
                <div className={styles.taskRow}>
                  <div className={cx(styles.taskCheck, styles.taskCheckDone)} />
                  <div className={cx(styles.taskPriority, styles.priorityLow)} />
                  <div className={cx(styles.taskName, styles.taskNameDone)}>
                    Finalize actives with formulator
                  </div>
                  <div className={styles.taskDue}>Mar 12</div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.taskCheck} />
                  <div className={cx(styles.taskPriority, styles.priorityUrgent)} />
                  <div className={styles.taskName}>Submit brief to lab</div>
                  <div className={cx(styles.taskDue, styles.taskDueLate)}>Mar 18</div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.taskCheck} />
                  <div className={cx(styles.taskPriority, styles.priorityMedium)} />
                  <div className={styles.taskName}>Confirm regulatory flags</div>
                  <div className={styles.taskDue}>Mar 24</div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="files-and-visuals"
          stepLabel="Step 3"
          title={
            <>
              Add your files, Figma comps, and <em>visual assets</em> to the right tab
            </>
          }
          steps={[
            {
              title: "On Formulation, add a file block for lab documents",
              body: (
                <>
                  Click <strong>{"+ -> File block"}</strong>. Drag in your lab results, supplier
                  specs, and formula briefs. You can attach multiple files to one block, round one
                  results, round two, revised brief, all versioned in place. No Drive folder to
                  maintain separately.
                </>
              )
            },
            {
              title: "On Packaging & Design, embed your Figma comp",
              body: (
                <>
                  Click <strong>{"+ -> Embed block"}</strong> and paste the Figma link. The live
                  frame
                  renders inside the tab. Your team reviews the actual design without switching
                  tools, and when your designer updates it in Figma, Saria reflects it
                  automatically.
                </>
              )
            },
            {
              title: "Add a gallery block for mood boards and visual references",
              body: (
                <>
                  Click <strong>{"+ -> Gallery block"}</strong> and upload your reference images.
                  Texture inspiration, material swatches, competitive packaging, all visible in the
                  canvas next to the brief they&apos;re informing.
                </>
              )
            }
          ]}
          visual={
            <MockFrame>
              <div className={styles.tabs}>
                <div className={styles.tab}>Brief & Concept</div>
                <div className={cx(styles.tab, styles.tabActive)}>Formulation</div>
                <div className={styles.tab}>Packaging & Design</div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Files - Lab Results</div>
                </div>
                <div className={styles.fileItem}>
                  <div className={cx(styles.fileIcon, styles.fileIconPdf)}>PDF</div>
                  <div className={styles.fileName}>Lab Results - Round 1.pdf</div>
                  <div className={styles.fileMeta}>2.4 MB</div>
                </div>
                <div className={styles.fileItem}>
                  <div className={cx(styles.fileIcon, styles.fileIconPdf)}>PDF</div>
                  <div className={styles.fileName}>Lab Results - Round 2.pdf</div>
                  <div className={styles.fileMeta}>2.1 MB</div>
                </div>
                <div className={styles.fileItem}>
                  <div className={cx(styles.fileIcon, styles.fileIconPdf)}>PDF</div>
                  <div className={styles.fileName}>Revised Formula Brief v3.pdf</div>
                  <div className={styles.fileMeta}>840 KB</div>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Embed - Figma</div>
                  <span className={cx(styles.badge, styles.badgeViolet)}>Live</span>
                </div>
                <div className={styles.embedFrame}>
                  <div className={styles.embedIcon}>
                    <svg viewBox="0 0 38 57" aria-hidden="true">
                      <path d="M19 28.5A9.5 9.5 0 1 0 28.5 19 9.5 9.5 0 0 0 19 28.5z" />
                      <path d="M9.5 47.5A9.5 9.5 0 1 0 19 38v9.5z" />
                      <path d="M9.5 19A9.5 9.5 0 1 0 19 9.5H9.5z" />
                      <path d="M9.5 38A9.5 9.5 0 1 0 19 28.5H9.5z" />
                      <path d="M9.5 9.5A9.5 9.5 0 1 0 19 19H9.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.embedTitle}>Packaging Comps v2 - 4 frames</div>
                    <div className={styles.embedUrl}>figma.com/file/Vc3x...</div>
                  </div>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Gallery - Mood Board</div>
                </div>
                <div className={styles.gallery}>
                  <div className={cx(styles.gallerySwatch, styles.gallerySwatchOne)} />
                  <div className={cx(styles.gallerySwatch, styles.gallerySwatchTwo)} />
                  <div className={cx(styles.gallerySwatch, styles.gallerySwatchThree)} />
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="phase-specific-actions"
          stepLabel="Step 4"
          reverse
          title={
            <>
              Add a task block to each tab to <em>track phase-specific actions</em>
            </>
          }
          steps={[
            {
              title: "Click + -> Task block on each tab",
              body: (
                <>
                  On Formulation, add tasks for lab-related actions: submit brief, review
                  stability results, approve revised formula, send to regulatory. On Packaging, add
                  tasks for design and print steps. Set an owner, due date, and priority on each
                  task inline.
                </>
              )
            },
            {
              title: "Switch to board view to see status at a glance",
              body: (
                <>
                  Toggle the task block to <strong>board view</strong> from the block menu. Tasks
                  sort into columns, Not Started, In Review, Done, automatically based on their
                  status. No manual drag needed.
                </>
              )
            },
            {
              title: "Check the project overview for the full picture",
              body: (
                <>
                  Click <strong>Overview</strong> in the tab bar. Every task across every tab
                  surfaces here, due today, due this week, overdue, each linking back to the exact
                  tab and block it lives in.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Tasks - Board View</div>
                </div>
                <div className={styles.board}>
                  <div>
                    <div className={styles.boardHeader}>
                      Not Started <span className={styles.boardCount}>2</span>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Submit dieline to printer</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeGold)}>Urgent</span>
                        <span className={cx(styles.badge, styles.badgeNeutral)}>packaging</span>
                      </div>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Confirm MOQ with supplier</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeNeutral)}>Med</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.boardHeader}>
                      In Review <span className={styles.boardCount}>2</span>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Stability test results</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeAccent)}>formulation</span>
                      </div>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Packaging comp v2</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeViolet)}>design</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.boardHeader}>
                      Done <span className={styles.boardCount}>3</span>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Finalize actives list</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeSuccess)}>Done</span>
                      </div>
                    </div>
                    <div className={styles.boardCard}>
                      <div className={styles.boardCardTitle}>Submit brief to lab</div>
                      <div className={styles.inlineBadges}>
                        <span className={cx(styles.badge, styles.badgeSuccess)}>Done</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                  <div className={styles.overviewTitle}>Due Today</div>
                  <div className={styles.overviewItem}>
                    <div className={cx(styles.taskPriority, styles.priorityUrgent)} />
                    <div className={styles.overviewName}>Send revised brief</div>
                    <div className={styles.overviewMeta}>Formulation</div>
                  </div>
                </div>
                <div className={styles.overviewCard}>
                  <div className={styles.overviewTitle}>Overdue</div>
                  <div className={styles.overviewItem}>
                    <div className={cx(styles.taskPriority, styles.priorityHigh)} />
                    <div className={cx(styles.overviewName, styles.overviewNameWarning)}>
                      Approve dieline
                    </div>
                    <div className={styles.overviewMeta}>Packaging</div>
                  </div>
                </div>
                <div className={styles.overviewCard}>
                  <div className={styles.overviewTitle}>Open Tasks</div>
                  <div className={styles.overviewCount}>8</div>
                  <div className={styles.overviewLabel}>across 4 tabs</div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="development-schedule"
          stepLabel="Step 5"
          title={
            <>
              Add a timeline block to map your <em>development schedule</em>
            </>
          }
          steps={[
            {
              title: "Click + -> Timeline block",
              body: (
                <>
                  Add it to your project&apos;s main tab or a dedicated planning tab. Create a
                  milestone for each phase: first lab submission, stability window, sample receipt,
                  packaging approval, bulk production start.
                </>
              )
            },
            {
              title: "Set dates and assign each milestone",
              body: (
                <>
                  Click a milestone to set a start and end date, then assign it to the right
                  person, your ops lead on lab milestones, your creative director on packaging,
                  your supplier contact on production. The timeline visualizes the full schedule
                  across all phases.
                </>
              )
            },
            {
              title: "It syncs to the workspace calendar automatically",
              body: (
                <>
                  Every milestone shows up in the calendar the moment you create it. When a date
                  moves, the calendar reflects it. No manual update and no checking whether the
                  timeline changed.
                </>
              )
            }
          ]}
          visual={
            <MockFrame>
              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Timeline - Development Schedule</div>
                </div>
                <div className={styles.timelineMonths}>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Lab Submission</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarAccent)} style={{ left: "0%", width: "20%" }}>
                      <span>R. Chen</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Stability Testing</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarWarm)} style={{ left: "18%", width: "28%" }}>
                      <span>Lab / Ops</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Packaging Design</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarViolet)} style={{ left: "20%", width: "30%" }}>
                      <span>M. Park</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Sample Review</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarSuccess)} style={{ left: "48%", width: "20%" }}>
                      <span>Full team</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Bulk Production</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarGold)} style={{ left: "70%", width: "28%" }}>
                      <span>Supplier</span>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="comments-and-review"
          stepLabel="Step 6"
          reverse
          title={
            <>
              Review designs and files by <em>commenting directly on the block</em>
            </>
          }
          steps={[
            {
              title: "Open the comment panel on any block",
              body: (
                <>
                  Hover over any block and click the comment icon in the toolbar. The comment panel
                  opens alongside the block. Leave feedback pinned to exactly what you&apos;re
                  looking at: a packaging mockup, a lab result PDF, a mood board image.
                </>
              )
            },
            {
              title: "Use @ to pull a teammate into the thread",
              body: (
                <>
                  Type <code>@name</code> in any comment. They get a notification that links
                  directly to the block, not a Slack message saying &quot;can you check the
                  packaging thing.&quot; They land in the right context immediately.
                </>
              )
            },
            {
              title: "Thread and resolve comments as the work moves forward",
              body: (
                <>
                  Reply inline to create a thread. When feedback is addressed, resolve the comment.
                  The full review history stays attached to the block so two weeks later you can
                  see exactly what was flagged, who responded, and what changed.
                </>
              )
            }
          ]}
          visual={
            <MockFrame
              canvasClassName={styles.canvasCompact}
              panel={
                <div className={styles.commentPanel}>
                  <div className={styles.commentPanelTitle}>Comments</div>
                  <div className={styles.commentThread}>
                    <div className={styles.commentHeader}>
                      <div className={cx(styles.commentAvatar, styles.avatarWarm)}>JS</div>
                      <div className={styles.commentAuthor}>Jade S.</div>
                      <div className={styles.commentTime}>2h</div>
                    </div>
                    <div className={styles.commentText}>
                      Logo too small. Needs more breathing room at the top. Bump 15%?
                    </div>
                  </div>
                  <div className={styles.commentThread}>
                    <div className={styles.commentHeader}>
                      <div className={cx(styles.commentAvatar, styles.avatarAccent)}>MP</div>
                      <div className={styles.commentAuthor}>Mia P.</div>
                      <div className={styles.commentTime}>1h</div>
                    </div>
                    <div className={styles.commentText}>
                      <span className={styles.commentMention}>@Jade</span> agreed. Ingredient font
                      is 7pt, too small for compliance. Revising now.
                    </div>
                  </div>
                  <div className={styles.commentThread}>
                    <div className={styles.commentHeader}>
                      <div className={cx(styles.commentAvatar, styles.avatarSuccess)}>EX</div>
                      <div className={styles.commentAuthor}>External</div>
                      <div className={styles.commentTime}>30m</div>
                    </div>
                    <div className={styles.commentText}>
                      Colour approved on our end. Proceed with proof.
                    </div>
                    <div className={styles.commentTag}>Client feedback</div>
                  </div>
                </div>
              }
            >
              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Image - Packaging Comp v2</div>
                </div>
                <div className={styles.imageMock}>
                  <div className={styles.bottleCard}>
                    <div className={styles.bottleLinePrimary} />
                    <div className={styles.bottleLineSecondary} />
                    <div className={styles.bottleLineTertiary} />
                  </div>
                  <div className={cx(styles.pin, styles.pinWarm)} style={{ top: "16%", left: "30%" }}>
                    1
                  </div>
                  <div className={cx(styles.pin, styles.pinAccent)} style={{ right: "20%", bottom: "20%" }}>
                    2
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="magic-link"
          stepLabel="Step 7"
          title={
            <>
              Share specific tabs with suppliers or founders using a <em>Magic Link</em>
            </>
          }
          steps={[
            {
              title: "Turn on the client page from the project header",
              body: (
                <>
                  Click the share toggle in the project header. This enables the public client
                  view. Nothing is visible yet, you choose exactly which tabs to expose in the next
                  step.
                </>
              )
            },
            {
              title: "Mark specific tabs as visible and set a client-facing title",
              body: (
                <>
                  Right-click any tab and select <strong>Make public</strong>. Set a client-facing
                  title if the internal name, like &quot;Packaging & Design,&quot; doesn&apos;t
                  make sense for your supplier. They&apos;ll only see the tabs you&apos;ve
                  explicitly made public.
                </>
              )
            },
            {
              title: "Copy the Magic Link and send it",
              body: (
                <>
                  No login required. They see a clean view of just those tabs, your brief, your
                  Figma embed, your files. They leave comments directly on the page. Those comments
                  appear in your project labeled as <strong>external feedback</strong>, separate
                  from your internal thread.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasPublic}>
              <div className={styles.publicCard}>
                <div className={styles.publicHeader}>
                  <div className={styles.publicBadge}>S</div>
                  <div>
                    <div className={styles.publicTitle}>Vitamin C Serum - Packaging Review</div>
                    <div className={styles.publicMeta}>Shared by beautyco - 2 tabs visible</div>
                  </div>
                </div>

                <div className={styles.tabs}>
                  <div className={cx(styles.tab, styles.tabActive)}>Packaging Direction</div>
                  <div className={styles.tab}>Final Comps</div>
                </div>

                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Text - Brief for Review</div>
                  </div>
                  <div className={styles.blockBodyText}>
                    Minimalist direction. Clean sans type, terracotta accent. Frosted glass
                    dropper. Please review and comment below.
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Files</div>
                  </div>
                  <div className={styles.fileItem}>
                    <div className={cx(styles.fileIcon, styles.fileIconFigma)}>Fig</div>
                    <div className={styles.fileName}>Packaging Comp v2 - Final</div>
                    <div className={styles.fileMeta}>View only</div>
                  </div>
                </div>

                <div className={styles.publicCommentBar}>
                  <span>Leave a comment...</span>
                  <span className={styles.publicCommentSend}>Send</span>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="ai-blocks"
          stepLabel="Step 8"
          reverse
          title={
            <>
              Use AI to <em>build blocks, edit content, and search</em> across your project
            </>
          }
          steps={[
            {
              title: "Hit Cmd+K and describe what you need built",
              body: (
                <>
                  Type something like{" "}
                  <strong>
                    &quot;set up a packaging review tab with a brief section, approval task list,
                    and a two-week timeline.&quot;
                  </strong>{" "}
                  Saria creates the blocks on the canvas, a text block, a task block, a timeline
                  block, ready to fill in. Not a suggestion. The blocks are there.
                </>
              )
            },
            {
              title: "Select any block to edit it with AI",
              body: (
                <>
                  Click a block, open the AI panel, and ask it to rewrite, revise the formulation
                  brief after a direction change, restructure a task list after a scope change,
                  summarize a supplier PDF you&apos;ve attached. Every AI edit is undoable from the
                  block toolbar.
                </>
              )
            },
            {
              title: "Use Cmd+K to search the whole project conversationally",
              body: (
                <>
                  Ask <strong>&quot;what was the feedback on round two samples?&quot;</strong> and
                  Saria finds the comment, on the block, in the tab. You don&apos;t have to
                  remember where it lives or open each tab to check.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.aiPrompt}>
                <strong>Cmd+K</strong> &quot;Set up packaging review tab with brief, tasks, and
                timeline&quot;
              </div>
              <div className={styles.aiMetaRow}>
                <div className={styles.aiMetaIcon}>
                  <svg viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M5 1 6.5 4H9.5L7 6 8 9 5 7.5 2 9 3 6 .5 4H3.5L5 1Z" />
                  </svg>
                </div>
                3 blocks created on Packaging & Design
              </div>

              <div className={cx(styles.block, styles.aiBlock)}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Text</div>
                  <div className={styles.aiTag}>AI</div>
                </div>
                <div className={styles.blockBodyText}>
                  <strong>Packaging Review Brief</strong>
                  <br />
                  Direction, approval stages, and stakeholder contacts for V2 review cycle.
                </div>
              </div>

              <div className={cx(styles.block, styles.aiBlock)}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Tasks</div>
                  <div className={styles.aiTag}>AI</div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.taskCheck} />
                  <div className={cx(styles.taskPriority, styles.priorityUrgent)} />
                  <div className={styles.taskName}>Approve dieline from printer</div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.taskCheck} />
                  <div className={cx(styles.taskPriority, styles.priorityHigh)} />
                  <div className={styles.taskName}>Internal sign-off on comps</div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.taskCheck} />
                  <div className={cx(styles.taskPriority, styles.priorityMedium)} />
                  <div className={styles.taskName}>Share Magic Link with supplier</div>
                </div>
              </div>

              <div className={cx(styles.block, styles.aiBlock)}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Timeline</div>
                  <div className={styles.aiTag}>AI</div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Internal review</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarAccent)} style={{ left: "0%", width: "35%" }}>
                      <span>3 days</span>
                    </div>
                  </div>
                </div>
                <div className={styles.timelineRow}>
                  <div className={styles.timelineLabel}>Supplier review</div>
                  <div className={styles.timelineTrack}>
                    <div className={cx(styles.timelineBar, styles.timelineBarWarm)} style={{ left: "33%", width: "30%" }}>
                      <span>2 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="cross-project-view"
          stepLabel="Step 9"
          title={
            <>
              Tag any block with a status, then <em>pull a cross-project view</em> instantly
            </>
          }
          steps={[
            {
              title: "Open the properties panel on any block",
              body: (
                <>
                  Click the properties icon on any block, a Figma embed, a file, a gallery, a
                  task. Add a <strong>tag</strong>, like <code>packaging</code> or{" "}
                  <code>regulatory</code>, and set a <strong>status</strong>, In Review, Approved,
                  Needs Revision. This works on every block type, not just tasks.
                </>
              )
            },
            {
              title: "Tag as you work, across every tab",
              body: (
                <>
                  Your designer tags a Figma comp on Packaging as{" "}
                  <strong>packaging - in review</strong>. Another comp on Concept gets{" "}
                  <strong>concept - approved</strong>. A third on Samples gets{" "}
                  <strong>sampling - needs revision</strong>. Three different tabs. Same tagging
                  system.
                </>
              )
            },
            {
              title: "Ask AI to aggregate by tag or status",
              body: (
                <>
                  Hit <code>Cmd+K</code> and ask{" "}
                  <strong>&quot;Show me all Figma files and their current status.&quot;</strong>{" "}
                  Saria pulls every matching block from across the project into a board, grouped by
                  status, with the source tab shown on each card. No separate tracker needed. The
                  tags you set while working become the view you use to manage.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Works for anything.</strong> Every file tagged <code>regulatory</code>.
              Every task tagged <code>supplier</code>. Every asset tagged <code>final</code>. Ask
              for it, get a live board built from the work already in the canvas.
            </>
          }
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.aiPrompt}>
                <strong>AI</strong> &quot;Show me all Figma files and their current status&quot;
              </div>
              <div className={styles.aggregateMeta}>4 Figma embeds across 3 tabs</div>
              <div className={styles.aggregateBoard}>
                <div>
                  <div className={styles.aggregateHeader}>In Review</div>
                  <div className={styles.aggregateCard}>
                    <div className={styles.aggregateName}>Packaging Comp v2</div>
                    <div className={styles.aggregateFrom}>
                      <span className={styles.aggregateDot} />
                      Packaging & Design
                    </div>
                    <div className={styles.inlineBadges}>
                      <span className={cx(styles.badge, styles.badgeViolet)}>packaging</span>
                    </div>
                  </div>
                  <div className={styles.aggregateCard}>
                    <div className={styles.aggregateName}>Label Typography</div>
                    <div className={styles.aggregateFrom}>
                      <span className={styles.aggregateDot} />
                      Packaging & Design
                    </div>
                    <div className={styles.inlineBadges}>
                      <span className={cx(styles.badge, styles.badgeViolet)}>packaging</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.aggregateHeader}>Approved</div>
                  <div className={styles.aggregateCard}>
                    <div className={styles.aggregateName}>Brand Direction</div>
                    <div className={styles.aggregateFrom}>
                      <span className={styles.aggregateDot} />
                      Brief & Concept
                    </div>
                    <div className={styles.inlineBadges}>
                      <span className={cx(styles.badge, styles.badgeSuccess)}>concept</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.aggregateHeader}>Needs Revision</div>
                  <div className={styles.aggregateCard}>
                    <div className={styles.aggregateName}>Sample Renders v1</div>
                    <div className={styles.aggregateFrom}>
                      <span className={styles.aggregateDot} />
                      Samples & Review
                    </div>
                    <div className={styles.inlineBadges}>
                      <span className={cx(styles.badge, styles.badgeWarm)}>sampling</span>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaLabel}>Get started</div>
            <h2 className={styles.ctaHeading}>Set up your first product project in Saria.</h2>
            <p className={styles.ctaText}>
              Takes about five minutes. Your team will have a shared canvas by end of day.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://app.sariasoftware.com/start-free-trial"
                className={styles.ctaPrimary}
                target="_blank"
                rel="noreferrer"
              >
                Start Free Trial
              </a>
              <Link href="/pricing" className={styles.ctaSecondary}>
                Book a walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
