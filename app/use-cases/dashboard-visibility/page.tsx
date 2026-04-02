import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Dashboard and Visibility | Saria Use Cases",
  description:
    "See how teams use Saria dashboards, the Everything Table, instant charts, and project overviews to get a live picture of work across the workspace.",
  path: "/use-cases/dashboard-visibility"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/dashboard-visibility");

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
  canvasClassName?: string;
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

function MockFrame({ children, sidebar, canvasClassName }: MockFrameProps) {
  return (
    <div className={styles.mockScroller}>
      <div className={styles.mock}>
        <div className={styles.chrome}>
          <WindowDots />
        </div>
        <div className={styles.mockBody}>
          {sidebar}
          <div className={cx(styles.mockCanvas, canvasClassName)}>{children}</div>
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

function WidgetChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V10" />
      <path d="M12 18V6" />
      <path d="M19 18v-8" />
      <path d="M4 18h16" />
    </svg>
  );
}

function WidgetQuickLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 7H7a4 4 0 0 0 0 8h3" />
      <path d="M14 17h3a4 4 0 0 0 0-8h-3" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

function WidgetSectionIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h12" />
      <path d="M6 12h12" />
      <path d="M6 17h8" />
    </svg>
  );
}

function AiSparkIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 1 6.5 4H9.5L7 6 8 9 5 7.5 2 9 3 6 .5 4H3.5L5 1Z" />
    </svg>
  );
}

function ProgressFill({
  width,
  className
}: {
  width: string;
  className?: string;
}) {
  return <div className={cx(styles.projectProgressFill, className)} style={{ width } as CSSProperties} />;
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
          <div className={styles.heroSolo}>
            <div className={styles.eyebrow}>Dashboard & Visibility</div>
            <h1 className={styles.heroHeading}>
              How to use Saria&apos;s dashboard to <em>see everything at once</em>
            </h1>
            <p className={styles.heroSubhead}>
              What&apos;s there by default, what you configure, and how the Everything Table and
              instant charts give you a complete picture of your workspace.
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
        </section>

        <section className={styles.introStrip}>
          <div className={styles.introStripInner}>
            <div className={styles.introLabel}>How it works</div>
            <p className={styles.introText}>
              Saria has four visibility layers: <strong>the workspace dashboard</strong>{" "}
              (configurable, starts useful from day one), <strong>the Everything Table</strong>{" "}
              (its own page, every item in your workspace, filterable),{" "}
              <strong>instant charts</strong> (any data type, any format, anywhere), and{" "}
              <strong>per-project overviews</strong> (scoped to a single project). Each serves a
              different level of zoom.
            </p>
          </div>
        </section>

        <StepSection
          id="workspace-dashboard"
          stepLabel="Step 1"
          title={
            <>
              The workspace dashboard - <em>useful from day one, no setup needed</em>
            </>
          }
          steps={[
            {
              title: "Open the dashboard - everything default is already there",
              body: (
                <>
                  Click <strong>Dashboard</strong> in the sidebar. Four things are there
                  automatically: an <strong>AI workspace overview</strong>, <strong>task cards</strong>{" "}
                  (Due Today, Due Soon, Overdue), a <strong>notifications feed</strong>, and a{" "}
                  <strong>project status list</strong>. Nothing to configure to get here - it
                  pulls from everything in your workspace from the moment you start using Saria.
                </>
              )
            },
            {
              title: "The AI overview reads across every project and summarizes it",
              body: (
                <>
                  At the top of the dashboard, the AI reads your tasks, deadlines, comments, and
                  file activity across every project and writes a plain-language summary. Which
                  projects are on track. What&apos;s overdue. Where there&apos;s been recent
                  feedback. Hit <strong>Regenerate</strong> any time for a fresh read - it also
                  refreshes automatically on a schedule.
                </>
              )
            },
            {
              title: "Task cards and notifications are always live",
              body: (
                <>
                  The Due Today, Due Soon, and Overdue cards pull from every task block in every
                  project - always current, no manual updates. The notifications feed shows team
                  activity and client feedback as it comes in, labeled separately so you can tell
                  internal from external at a glance. Click anything to go directly to its source.
                </>
              )
            }
          ]}
          visual={
            <MockFrame
              sidebar={
                <div className={styles.mockSidebar}>
                  <div className={styles.sidebarSection}>
                    <div className={styles.sidebarLabel}>Workspace</div>
                    <div className={cx(styles.sidebarItem, styles.sidebarItemActive)}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotAccent)} />
                      Dashboard
                    </div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotMuted)} />
                      Everything
                    </div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotMuted)} />
                      Calendar
                    </div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotMuted)} />
                      Projects
                    </div>
                  </div>
                </div>
              }
            >
              <div className={styles.visualHeading}>Good morning, Amara.</div>

              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <div className={styles.aiIcon}>
                    <AiSparkIcon />
                  </div>
                  <div className={styles.aiCardTitle}>AI Workspace Overview</div>
                  <span className={cx(styles.badge, styles.badgeNeutral)}>8:02am</span>
                </div>
                <div className={styles.aiCardBody}>
                  <span className={styles.aiHighlight}>Hydration Launch</span> has{" "}
                  <strong>2 overdue tasks</strong> blocking launch readiness.{" "}
                  <span className={styles.aiHighlight}>Brand Refresh</span> is on track.{" "}
                  <span className={styles.aiHighlight}>Summer Campaign</span> has new activity from
                  Mia. <strong>3 tasks due today across the workspace.</strong>
                </div>
              </div>

              <div className={styles.dashboardStats}>
                <div className={styles.dashboardStatCard}>
                  <div className={cx(styles.dashboardStatNumber, styles.dashboardStatNumberWarm)}>
                    2
                  </div>
                  <div className={styles.dashboardStatLabel}>Overdue</div>
                </div>
                <div className={styles.dashboardStatCard}>
                  <div className={styles.dashboardStatNumber}>3</div>
                  <div className={styles.dashboardStatLabel}>Due today</div>
                </div>
                <div className={styles.dashboardStatCard}>
                  <div
                    className={cx(styles.dashboardStatNumber, styles.dashboardStatNumberSuccess)}
                  >
                    12
                  </div>
                  <div className={styles.dashboardStatLabel}>Done this week</div>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Notifications</div>
                  <span className={cx(styles.badge, styles.badgeAccent)}>5 new</span>
                </div>

                <div className={styles.notificationRow}>
                  <span className={cx(styles.notificationDot, styles.notificationDotSuccess)} />
                  <div className={styles.notificationBody}>
                    <div className={styles.notificationText}>
                      <strong>Client feedback</strong> on Packaging Direction - "Colour approved."
                    </div>
                    <div className={styles.notificationTime}>2 min - Hydration Launch</div>
                  </div>
                </div>

                <div className={styles.notificationRow}>
                  <span className={cx(styles.notificationDot, styles.notificationDotViolet)} />
                  <div className={styles.notificationBody}>
                    <div className={styles.notificationText}>
                      <strong>Mia P.</strong> commented on Hero Campaign Shot
                    </div>
                    <div className={styles.notificationTime}>1 hour - Campaign & Creative</div>
                  </div>
                </div>

                <div className={styles.notificationRow}>
                  <span className={cx(styles.notificationDot, styles.notificationDotAccent)} />
                  <div className={styles.notificationBody}>
                    <div className={styles.notificationText}>
                      <strong>Jade S.</strong> completed - Create drop collection page
                    </div>
                    <div className={styles.notificationTime}>2 hours - Shopify Setup</div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="configure-dashboard"
          stepLabel="Step 2"
          reverse
          title={
            <>
              Configure the dashboard to show <em>exactly what your team needs</em>
            </>
          }
          steps={[
            {
              title: "Click + Add to start building on top of the defaults",
              body: (
                <>
                  Scroll below the default cards and click <strong>+ Add</strong>. A picker opens
                  with everything you can add - <strong>chart blocks, quick links to projects, custom sections</strong>.
                  Add as many as you want. The dashboard is a canvas. You build on top of the
                  defaults to make it useful for how your team actually works.
                </>
              )
            },
            {
              title: "Add quick links to your most active projects",
              body: (
                <>
                  Select <strong>Quick Link - Project</strong> and choose any project. It appears
                  as a card showing the project name, status, due date, and open task count - live
                  and always current. Add one for every project your team is actively running and
                  click any card to jump directly in.
                </>
              )
            },
            {
              title: "Rearrange, remove, and make it yours",
              body: (
                <>
                  Drag any section to reorder it. Remove cards you don&apos;t need. If quick links
                  are what your team uses most, move them to the top. If you only need the AI
                  overview and one chart, keep it minimal. The layout is persistent - it stays
                  exactly the way you configure it.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.visualLabel}>Active Projects</div>

              <div className={styles.block}>
                <div className={styles.projectRow}>
                  <span className={cx(styles.projectDot, styles.projectDotWarm)} />
                  <div className={styles.projectName}>Hydration Collection Q2</div>
                  <span className={cx(styles.badge, styles.badgeWarm)}>In Progress</span>
                  <div className={styles.projectProgress}>
                    <ProgressFill width="58%" className={styles.projectProgressFillWarm} />
                  </div>
                  <span className={cx(styles.badge, styles.badgeNeutral)}>9 open</span>
                </div>

                <div className={styles.projectRow}>
                  <span className={cx(styles.projectDot, styles.projectDotAccent)} />
                  <div className={styles.projectName}>Summer Campaign</div>
                  <span className={cx(styles.badge, styles.badgeWarm)}>In Progress</span>
                  <div className={styles.projectProgress}>
                    <ProgressFill width="35%" className={styles.projectProgressFillAccent} />
                  </div>
                  <span className={cx(styles.badge, styles.badgeNeutral)}>6 open</span>
                </div>

                <div className={styles.projectRow}>
                  <span className={cx(styles.projectDot, styles.projectDotSuccess)} />
                  <div className={styles.projectName}>Brand Refresh</div>
                  <span className={cx(styles.badge, styles.badgeSuccess)}>On Track</span>
                  <div className={styles.projectProgress}>
                    <ProgressFill width="75%" className={styles.projectProgressFillSuccess} />
                  </div>
                  <span className={cx(styles.badge, styles.badgeNeutral)}>3 open</span>
                </div>
              </div>

              <div className={styles.widgetAdd}>
                <div className={styles.widgetAddIcon}>+</div>
                <div className={styles.widgetAddText}>
                  <strong>Add to dashboard</strong> - chart, quick link, or section
                </div>
              </div>

              <div className={styles.widgetPicker}>
                <div className={styles.widgetOption}>
                  <div className={cx(styles.widgetIcon, styles.widgetIconAccent)}>
                    <WidgetChartIcon />
                  </div>
                  <div>
                    <div className={styles.widgetName}>Chart block</div>
                    <div className={styles.widgetDesc}>Any data type, any format</div>
                  </div>
                </div>

                <div className={styles.widgetOption}>
                  <div className={cx(styles.widgetIcon, styles.widgetIconWarm)}>
                    <WidgetQuickLinkIcon />
                  </div>
                  <div>
                    <div className={styles.widgetName}>Quick link</div>
                    <div className={styles.widgetDesc}>Jump to project with live task count</div>
                  </div>
                </div>

                <div className={styles.widgetOption}>
                  <div className={cx(styles.widgetIcon, styles.widgetIconSuccess)}>
                    <WidgetSectionIcon />
                  </div>
                  <div>
                    <div className={styles.widgetName}>Custom section</div>
                    <div className={styles.widgetDesc}>Add a text section or divider</div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="everything-table"
          stepLabel="Step 3"
          title={
            <>
              The Everything Table - every item in your workspace, <em>filterable by any property</em>
            </>
          }
          steps={[
            {
              title: "Click Everything in the sidebar",
              body: (
                <>
                  The Everything Table is its own page in Saria - click <strong>Everything</strong>{" "}
                  in the sidebar. It pulls every item across your entire workspace - every task,
                  every block that has properties set - into a single table. Every row shows the
                  five universal properties: <strong>status, priority, tags, due date, and assignee</strong>.
                  Nothing is excluded.
                </>
              )
            },
            {
              title: "Filter it down to exactly what you want to see",
              body: (
                <>
                  Click <strong>Filter</strong> and combine any properties -{" "}
                  <strong>assignee is Mia, priority is Urgent, tag is packaging</strong>. Stack as
                  many filters as you need. The table updates instantly. The result is a precise,
                  live slice of your workspace - every matching item across every project, pulled
                  into one view.
                </>
              )
            },
            {
              title: "Click any row to go directly to that item",
              body: (
                <>
                  Every row in the table links back to its source - the block, the tab, the
                  project. The Everything Table is a view into your workspace, not a copy of it.
                  When you click through, you land in context with everything around it visible.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Most useful for:</strong> pre-launch audits ("everything tagged launch that
              isn&apos;t done"), workload checks ("everything assigned to Jade due this week"), and
              cross-project reviews ("all urgent items across the workspace").
            </>
          }
          visual={
            <MockFrame
              sidebar={
                <div className={styles.mockSidebar}>
                  <div className={styles.sidebarSection}>
                    <div className={styles.sidebarLabel}>Workspace</div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotAccent)} />
                      Dashboard
                    </div>
                    <div className={cx(styles.sidebarItem, styles.sidebarItemActive)}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotAccent)} />
                      Everything
                    </div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotMuted)} />
                      Calendar
                    </div>
                    <div className={styles.sidebarItem}>
                      <span className={cx(styles.sidebarItemDot, styles.sidebarItemDotMuted)} />
                      Projects
                    </div>
                  </div>
                </div>
              }
              canvasClassName={styles.canvasTight}
            >
              <div className={styles.visualHeading}>Everything</div>

              <div className={styles.filterBar}>
                <div className={cx(styles.filterChip, styles.filterChipActive)}>
                  Assignee: Mia P. x
                </div>
                <div className={cx(styles.filterChip, styles.filterChipActive)}>
                  Priority: Urgent, High x
                </div>
                <div className={styles.filterChip}>+ Filter</div>
              </div>

              <div className={styles.everythingTableWrap}>
                <table className={styles.everythingTable}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Due</th>
                      <th>Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className={styles.everythingName}>Hero campaign images</div>
                      </td>
                      <td>
                        <div className={styles.everythingProject}>Hydration Launch</div>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeWarm)}>In Review</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeDanger)}>Urgent</span>
                      </td>
                      <td>
                        <span className={styles.dueWarning}>May 1</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeViolet)}>design</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.everythingName}>PDP assets - 4 SKUs</div>
                      </td>
                      <td>
                        <div className={styles.everythingProject}>Hydration Launch</div>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeNeutral)}>Not Started</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeWarm)}>High</span>
                      </td>
                      <td>
                        <span className={styles.dueNeutral}>May 5</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeViolet)}>design</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.everythingName}>Packaging comp v3</div>
                      </td>
                      <td>
                        <div className={styles.everythingProject}>Brand Refresh</div>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeAccent)}>In Review</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeWarm)}>High</span>
                      </td>
                      <td>
                        <span className={styles.dueNeutral}>May 6</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeNeutral)}>packaging</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={styles.everythingName}>Summer hero visual</div>
                      </td>
                      <td>
                        <div className={styles.everythingProject}>Summer Campaign</div>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeNeutral)}>Not Started</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeDanger)}>Urgent</span>
                      </td>
                      <td>
                        <span className={styles.dueNeutral}>May 9</span>
                      </td>
                      <td>
                        <span className={cx(styles.badge, styles.badgeWarm)}>campaign</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.tableFootnote}>
                Showing 4 of 22 items - filtered by assignee + priority
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="instant-charts"
          stepLabel="Step 4"
          reverse
          title={
            <>
              Instant charts - <em>any data type, any format, anywhere in Saria</em>
            </>
          }
          steps={[
            {
              title: "Add a chart block from the dashboard or any project tab",
              body: (
                <>
                  Charts aren&apos;t just a dashboard feature. Add a chart block to the dashboard,
                  to a project&apos;s overview tab, or to any canvas tab inside a project - anywhere
                  you&apos;d want to see data visualized inline. Click{" "}
                  <strong>{"+ -> Chart block"}</strong>{" "}
                  wherever you are.
                </>
              )
            },
            {
              title: "Choose what data to visualize",
              body: (
                <>
                  Charts can be scoped to any data type in Saria - <strong>tasks by status, tasks by priority, tasks by assignee, tasks by tag, completion rate over time, items by project, overdue count</strong>{" "}
                  - or any combination. You&apos;re not limited to project-level rollups. A chart
                  can pull from a single tab, a specific tag, a specific assignee, or everything
                  at once. If you want a fixed snapshot instead of a live view, you can also lock a
                  chart to preserve the data at a specific point in time.
                </>
              )
            },
            {
              title: "Pick the format that communicates it best",
              body: (
                <>
                  The same data can be displayed multiple ways. <strong>Bar</strong> for comparing
                  counts across categories. <strong>Donut</strong> for showing distribution at a
                  glance. <strong>Line</strong> for tracking change over time.{" "}
                  <strong>Summary count</strong> for a single number stat card. Choose the format
                  for the insight, not just the aesthetic.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Charts are live.</strong> They pull from your workspace data in real time -
              as tasks are completed and properties change, the charts update automatically. No
              exports, no manual refreshes. And when you need to present or compare against a
              specific moment, you can lock a chart so it stays fixed to that point in time.
            </>
          }
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.visualLabel}>Chart Data</div>

              <div className={styles.scopePicker}>
                <div className={styles.scopeTitle}>Measure</div>
                <div className={cx(styles.scopeOption, styles.scopeOptionActive)}>
                  <span className={cx(styles.scopeRadio, styles.scopeRadioChecked)} />
                  Tasks by assignee
                </div>
                <div className={styles.scopeOption}>
                  <span className={styles.scopeRadio} />
                  Tasks by status
                </div>
                <div className={styles.scopeOption}>
                  <span className={styles.scopeRadio} />
                  Tasks by priority
                </div>
                <div className={styles.scopeOption}>
                  <span className={styles.scopeRadio} />
                  Tasks by tag
                </div>
                <div className={styles.scopeOption}>
                  <span className={styles.scopeRadio} />
                  Completion rate over time
                </div>
                <div className={styles.scopeOption}>
                  <span className={styles.scopeRadio} />
                  Overdue count
                </div>
              </div>

              <div className={styles.chartGrid}>
                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Bar</div>
                  </div>
                  <div className={styles.barChart}>
                    <div className={styles.barRow}>
                      <div className={styles.barLabel}>Mia P.</div>
                      <div className={styles.barTrack}>
                        <div className={cx(styles.barFill, styles.barFillViolet)} style={{ width: "72%" } as CSSProperties} />
                      </div>
                      <div className={styles.barValue}>5</div>
                    </div>
                    <div className={styles.barRow}>
                      <div className={styles.barLabel}>Jade S.</div>
                      <div className={styles.barTrack}>
                        <div className={cx(styles.barFill, styles.barFillAccent)} style={{ width: "57%" } as CSSProperties} />
                      </div>
                      <div className={styles.barValue}>4</div>
                    </div>
                    <div className={styles.barRow}>
                      <div className={styles.barLabel}>Amara F.</div>
                      <div className={styles.barTrack}>
                        <div className={cx(styles.barFill, styles.barFillWarm)} style={{ width: "43%" } as CSSProperties} />
                      </div>
                      <div className={styles.barValue}>3</div>
                    </div>
                    <div className={styles.barRow}>
                      <div className={styles.barLabel}>Rania K.</div>
                      <div className={styles.barTrack}>
                        <div className={cx(styles.barFill, styles.barFillSuccess)} style={{ width: "28%" } as CSSProperties} />
                      </div>
                      <div className={styles.barValue}>2</div>
                    </div>
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Donut</div>
                  </div>
                  <div className={styles.donutWrap}>
                    <div className={styles.donutChart} />
                    <div className={styles.donutLegend}>
                      <div className={styles.legendItem}>
                        <span className={cx(styles.legendDot, styles.legendDotViolet)} />
                        Mia - 5
                      </div>
                      <div className={styles.legendItem}>
                        <span className={cx(styles.legendDot, styles.legendDotAccent)} />
                        Jade - 4
                      </div>
                      <div className={styles.legendItem}>
                        <span className={cx(styles.legendDot, styles.legendDotWarm)} />
                        Amara - 3
                      </div>
                      <div className={styles.legendItem}>
                        <span className={cx(styles.legendDot, styles.legendDotSuccess)} />
                        Rania - 2
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Line - Over Time</div>
                  </div>
                  <div className={styles.trendBars}>
                    <span className={cx(styles.trendBar, styles.trendBarAccent)} style={{ height: 18 } as CSSProperties} />
                    <span className={cx(styles.trendBar, styles.trendBarAccent)} style={{ height: 26 } as CSSProperties} />
                    <span className={cx(styles.trendBar, styles.trendBarAccent)} style={{ height: 32 } as CSSProperties} />
                    <span className={cx(styles.trendBar, styles.trendBarSuccess)} style={{ height: 40 } as CSSProperties} />
                    <span className={cx(styles.trendBar, styles.trendBarSuccess)} style={{ height: 44 } as CSSProperties} />
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockType}>Summary Count</div>
                  </div>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryCell}>
                      <div className={styles.summaryValue}>22</div>
                      <div className={styles.summaryLabel}>Open</div>
                    </div>
                    <div className={styles.summaryCell}>
                      <div className={cx(styles.summaryValue, styles.summaryValueSuccess)}>12</div>
                      <div className={styles.summaryLabel}>Done</div>
                    </div>
                    <div className={styles.summaryCell}>
                      <div className={cx(styles.summaryValue, styles.summaryValueWarm)}>2</div>
                      <div className={styles.summaryLabel}>Overdue</div>
                    </div>
                    <div className={styles.summaryCell}>
                      <div className={cx(styles.summaryValue, styles.summaryValueDanger)}>6</div>
                      <div className={styles.summaryLabel}>Urgent</div>
                    </div>
                  </div>
                </div>
              </div>
            </MockFrame>
          }
        />

        <StepSection
          id="project-overview"
          stepLabel="Step 5"
          title={
            <>
              Every project has its own overview - <em>the same dashboard, zoomed into one project</em>
            </>
          }
          steps={[
            {
              title: "Open the Overview tab inside any project",
              body: (
                <>
                  Every project has an Overview tab that&apos;s always there - you don&apos;t
                  create it. Click it and you get the project-level version of the dashboard: open
                  task count, Due Today, Due Soon, and Overdue cards - all scoped to that project
                  only. Same format as the workspace dashboard, zoomed in to a single project.
                </>
              )
            },
            {
              title: "It also shows recent team comments from across the project",
              body: (
                <>
                  Below the task cards, the project overview surfaces a comment feed - who said
                  what, on which block, with a direct link. Use it as your project-level async
                  standup. Before a team check-in, open the overview. You&apos;re oriented in 20
                  seconds without opening individual tabs.
                </>
              )
            },
            {
              title: "Each task in the overview links directly to where it lives",
              body: (
                <>
                  Click any task in the overview cards and you&apos;re taken to it in context - in
                  its tab, in its block, with everything around it visible. The overview is a
                  navigation layer, not a flat list. You&apos;re always one click away from the
                  actual work.
                </>
              )
            }
          ]}
          visual={
            <MockFrame canvasClassName={styles.canvasCompact}>
              <div className={styles.overviewTop}>
                <div>
                  <div className={styles.overviewTopTitle}>Hydration Collection - Q2</div>
                  <div className={styles.overviewTopMeta}>9 open tasks - 3 comments today</div>
                </div>
                <span className={cx(styles.badge, styles.badgeWarm)}>In Progress</span>
              </div>

              <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                  <div className={styles.overviewTitle}>Due Today</div>
                  <div className={styles.overviewItem}>
                    <span className={cx(styles.taskPriority, styles.priorityUrgent)} />
                    <div className={styles.overviewName}>Shopify SKU check</div>
                    <div className={styles.overviewMeta}>Shopify</div>
                  </div>
                  <div className={styles.overviewItem}>
                    <span className={cx(styles.taskPriority, styles.priorityMedium)} />
                    <div className={styles.overviewName}>Pre-launch audit</div>
                    <div className={styles.overviewMeta}>Launch Day</div>
                  </div>
                </div>

                <div className={cx(styles.overviewCard, styles.overviewCardWarning)}>
                  <div className={cx(styles.overviewTitle, styles.overviewTitleWarning)}>
                    Overdue
                  </div>
                  <div className={styles.overviewItem}>
                    <span className={cx(styles.taskPriority, styles.priorityUrgent)} />
                    <div className={cx(styles.overviewName, styles.overviewNameWarning)}>
                      Hero images
                    </div>
                    <div className={styles.overviewMeta}>Campaign</div>
                  </div>
                  <div className={styles.overviewItem}>
                    <span className={cx(styles.taskPriority, styles.priorityUrgent)} />
                    <div className={cx(styles.overviewName, styles.overviewNameWarning)}>
                      SKUs to collection
                    </div>
                    <div className={styles.overviewMeta}>Shopify</div>
                  </div>
                </div>

                <div className={styles.overviewCard}>
                  <div className={styles.overviewTitle}>Open Tasks</div>
                  <div className={styles.overviewCount}>9</div>
                  <div className={styles.overviewLabel}>across 5 tabs</div>
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockType}>Team Comments</div>
                </div>

                <div className={styles.feedRow}>
                  <div className={cx(styles.feedAvatar, styles.feedAvatarViolet)}>MP</div>
                  <div className={styles.feedBody}>
                    <div className={styles.feedMeta}>
                      Mia P. <span>Hero Campaign Shot</span>
                    </div>
                    <div className={styles.feedText}>
                      v3 uploaded - crop fixed, background pulled warmer.
                    </div>
                  </div>
                </div>

                <div className={styles.feedRow}>
                  <div className={cx(styles.feedAvatar, styles.feedAvatarAccent)}>JS</div>
                  <div className={styles.feedBody}>
                    <div className={styles.feedMeta}>
                      Jade S. <span>Shopify Setup</span>
                    </div>
                    <div className={styles.feedText}>
                      Collection page live in staging - need final inventory counts.
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
            <h2 className={styles.ctaHeading}>
              Build a dashboard that actually tells you what&apos;s going on.
            </h2>
            <p className={styles.ctaText}>
              Default cards from day one. Everything Table, instant charts, and quick links when
              you&apos;re ready to go deeper.
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
