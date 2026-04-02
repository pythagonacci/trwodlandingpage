import Link from "next/link";
import type { ReactNode } from "react";
import {
  FiBarChart2,
  FiBookmark,
  FiEdit3,
  FiExternalLink,
  FiFolder,
  FiSearch,
  FiShuffle,
  FiZap
} from "react-icons/fi";
import base from "@/app/use-cases/dashboard-visibility/use-case.module.css";
import styles from "./use-cases.module.css";

type UseCasesProps = {
  standalone?: boolean;
};

type StorySectionProps = {
  label: string;
  heading: ReactNode;
  body: ReactNode;
  callout?: ReactNode;
  reverse?: boolean;
  gridClassName?: string;
  visualClassName?: string;
  features: Array<{
    title: string;
    body: ReactNode;
    icon: typeof FiSearch;
  }>;
  visual: ReactNode;
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 1.2 6.2 3.8 8.8 5 6.2 6.2 5 8.8 3.8 6.2 1.2 5 3.8 3.8 5 1.2Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 8 8" aria-hidden="true">
      <path d="M1 4h6" />
      <path d="M4 1 7 4 4 7" />
    </svg>
  );
}

function AccentButton({
  href,
  children,
  external
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#1D4ED8] bg-[#1D4ED8] px-6 text-[13px] font-medium text-white shadow-[0_14px_30px_rgba(29,78,216,0.18)] transition-colors duration-200 hover:bg-[#1e40af]"
        style={{ color: "#ffffff" }}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#1D4ED8] bg-[#1D4ED8] px-6 text-[13px] font-medium text-white shadow-[0_14px_30px_rgba(29,78,216,0.18)] transition-colors duration-200 hover:bg-[#1e40af]"
      style={{ color: "#ffffff" }}
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-cream-3 bg-[rgba(255,255,255,0.72)] px-6 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-cream"
    >
      {children}
    </Link>
  );
}

function Badge({
  children,
  variant
}: {
  children: ReactNode;
  variant: "blue" | "warm" | "success" | "danger" | "violet" | "gold";
}) {
  return (
    <span
      className={cx(
        styles.badge,
        variant === "blue" && styles.badgeBlue,
        variant === "warm" && styles.badgeWarm,
        variant === "success" && styles.badgeSuccess,
        variant === "danger" && styles.badgeDanger,
        variant === "violet" && styles.badgeViolet,
        variant === "gold" && styles.badgeGold
      )}
    >
      {children}
    </span>
  );
}

function Avatar({
  initials,
  color
}: {
  initials: string;
  color: string;
}) {
  return <span className={styles.avatar} style={{ background: color }}>{initials}</span>;
}

function StorySection({
  label,
  heading,
  body,
  callout,
  reverse,
  gridClassName,
  visualClassName,
  features,
  visual
}: StorySectionProps) {
  return (
    <section className={styles.storySection}>
      <div className={styles.storyInner}>
        <div className={cx(styles.storyGrid, reverse && styles.storyReverse, gridClassName)}>
          <div className={styles.storyCopy}>
            <div className={styles.storyLabel}>{label}</div>
            <h3 className={styles.storyHeading}>{heading}</h3>
            <p className={styles.storyBody}>{body}</p>
            <div className={styles.featureList}>
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <Icon />
                    </div>
                    <div>
                      <div className={styles.featureTitle}>{feature.title}</div>
                      <div className={styles.featureText}>{feature.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {callout ? <div className={styles.callout}>{callout}</div> : null}
          </div>
          <div className={styles.storyVisual}>
            <div className="feature-demo-shell w-full">
              <div className={cx(styles.mockOuter, visualClassName)}>{visual}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className={styles.heroFrame}>
      <div className={styles.heroFrameBody}>
        <div className={styles.heroFrameLabel}>Cross-project overview</div>
        <div className={styles.heroFrameTitle}>One workspace. Three live ways to see it.</div>
        <div className={styles.heroFrameGrid}>
          <div className={cx(styles.heroFrameCard, styles.heroPromptCard)}>
            <div className={styles.heroPromptTitle}>
              <span className={styles.heroPromptIcon}>
                <SparkIcon />
              </span>
              Saria AI
            </div>
            <div className={styles.heroPromptText}>
              &quot;Compare open task counts across all active projects, broken down by
              priority.&quot;
            </div>
            <div className={styles.heroStatGrid}>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatValue} style={{ color: "var(--accent)" }}>
                  16
                </div>
                <div className={styles.heroStatLabel}>Open total</div>
              </div>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatValue} style={{ color: "var(--use-danger)" }}>
                  5
                </div>
                <div className={styles.heroStatLabel}>Urgent</div>
              </div>
              <div className={styles.heroStatCard}>
                <div className={styles.heroStatValue} style={{ color: "var(--use-warm)" }}>
                  5
                </div>
                <div className={styles.heroStatLabel}>Overdue</div>
              </div>
            </div>
          </div>
          <div className={cx(styles.heroFrameCard, styles.heroOverviewCard)}>
            <div className={styles.heroOverviewHeader}>
              <div className={styles.heroOverviewSub}>Project status</div>
              <div className={styles.heroOverviewHeading}>Active workspace projects</div>
            </div>
            <div className={styles.heroOverviewList}>
              <div className={styles.heroOverviewItem}>
                <span
                  className={styles.heroOverviewDot}
                  style={{ background: "var(--use-danger)" }}
                />
                <div className={styles.heroOverviewName}>Summer Drop</div>
                <Badge variant="danger">At risk</Badge>
              </div>
              <div className={styles.heroOverviewItem}>
                <span
                  className={styles.heroOverviewDot}
                  style={{ background: "var(--use-warm)" }}
                />
                <div className={styles.heroOverviewName}>Brand Refresh</div>
                <Badge variant="warm">In progress</Badge>
              </div>
              <div className={styles.heroOverviewItem}>
                <span
                  className={styles.heroOverviewDot}
                  style={{ background: "var(--use-success)" }}
                />
                <div className={styles.heroOverviewName}>Hydration Q2</div>
                <Badge variant="success">Complete</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div className={cx(styles.mock, "feature-demo-frame")}>
      <div className={styles.chrome}>
        <WindowDots />
      </div>
      <div className={styles.workflowLayout}>
        <div className={styles.workflowChat}>
          <div className={styles.workflowChatHeader}>Saria AI</div>
          <div className={styles.workflowMessages}>
            <div className={styles.workflowUser}>
              What&apos;s behind across all active projects?
            </div>
            <div className={styles.workflowAi}>
              <strong>3 projects</strong> have overdue work. Summer Drop is most at risk and
              blocks copy.
            </div>
            <div className={styles.workflowUser}>
              Build a table of all overdue tasks, sorted by project
            </div>
            <div className={styles.workflowAi}>
              Done. Added an overdue task table to the canvas, sorted by project and priority.
            </div>
            <div className={styles.workflowUser}>Mark the Hydration Q2 project as complete</div>
            <div className={styles.workflowAi}>
              Updated. <strong>Hydration Q2</strong> is now marked complete.
            </div>
          </div>
          <div className={styles.workflowInput}>
            <div className={styles.workflowInputBox}>Ask anything...</div>
            <div className={styles.workflowSend}>
              <SendIcon />
            </div>
          </div>
        </div>

        <div className={styles.workflowCanvas}>
          <div className={styles.canvasLabel}>Generated by Saria AI</div>

          <div className={cx(styles.block, styles.blockCompact)}>
            <div className={styles.blockHeader}>
              <div className={styles.blockType}>Overdue tasks - all projects</div>
              <Badge variant="danger">5 items</Badge>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Project</th>
                    <th>Owner</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className={styles.tableName}>Hero shot selects</div></td>
                    <td><Badge variant="warm">Summer Drop</Badge></td>
                    <td><Avatar initials="SL" color="#b97431" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>3d late</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Copy review - PDP</div></td>
                    <td><Badge variant="warm">Summer Drop</Badge></td>
                    <td><Avatar initials="JK" color="var(--accent)" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>1d late</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Shoot moodboard v2</div></td>
                    <td><Badge variant="warm">Summer Drop</Badge></td>
                    <td><Avatar initials="MP" color="#6f63c7" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>2d late</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Font approval</div></td>
                    <td><Badge variant="blue">Brand Refresh</Badge></td>
                    <td><Avatar initials="RN" color="#48735b" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>Yesterday</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={cx(styles.block, styles.blockCompact)}>
            <div className={styles.blockHeader}>
              <div className={styles.blockType}>Project status</div>
            </div>
            <div className={styles.statusList}>
              <div className={styles.statusRow}>
                <div className={styles.statusName}>Summer Drop</div>
                <Badge variant="danger">At risk</Badge>
              </div>
              <div className={styles.statusRow}>
                <div className={styles.statusName}>Brand Refresh</div>
                <Badge variant="warm">In progress</Badge>
              </div>
              <div className={styles.statusRow}>
                <div className={styles.statusName}>Hydration Q2</div>
                <Badge variant="success">Complete</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EverythingVisual() {
  return (
    <div className={cx(styles.mock, "feature-demo-frame")}>
      <div className={styles.chrome}>
        <WindowDots />
      </div>
      <div className={styles.mockBody}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Workspace</div>
            <div className={styles.sidebarItem}>Dashboard</div>
            <div className={styles.sidebarItem}>Projects</div>
            <div className={cx(styles.sidebarItem, styles.sidebarItemActive)}>Everything</div>
            <div className={styles.sidebarItem}>Calendar</div>
            <div className={styles.sidebarItem}>Members</div>
          </div>
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarLabel}>Projects</div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarProjectDot} style={{ background: "var(--use-warm)" }} />
              Summer Drop
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarProjectDot} style={{ background: "var(--accent)" }} />
              Brand Refresh
            </div>
            <div className={styles.sidebarItem}>
              <span className={styles.sidebarProjectDot} style={{ background: "var(--use-success)" }} />
              Hydration Q2
            </div>
          </div>
        </div>
        <div className={styles.canvas}>
          <div className={styles.tableTitle}>Everything Table</div>
          <div className={styles.filterBar}>
            <span className={cx(styles.filterChip, styles.filterChipActive)}>Tasks</span>
            <span className={cx(styles.filterChip, styles.filterChipActive)}>Summer Drop</span>
            <span className={cx(styles.filterChip, styles.filterChipActive)}>Brand Refresh</span>
            <span className={cx(styles.filterChip, styles.filterChipActive)}>Urgent + High</span>
            <span className={styles.filterChip}>+ Filter</span>
          </div>
          <div className={styles.block}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Assignee</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className={styles.tableName}>Hero shot selects</div></td>
                    <td><div className={styles.tableProject}>Summer Drop</div></td>
                    <td><Badge variant="danger">Urgent</Badge></td>
                    <td><Avatar initials="SL" color="#b97431" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>Overdue</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Approve colour grade</div></td>
                    <td><div className={styles.tableProject}>Summer Drop</div></td>
                    <td><Badge variant="warm">High</Badge></td>
                    <td><Avatar initials="MP" color="#6f63c7" /></td>
                    <td><span className={styles.tableProject}>Today</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Logo lockup finals</div></td>
                    <td><div className={styles.tableProject}>Brand Refresh</div></td>
                    <td><Badge variant="danger">Urgent</Badge></td>
                    <td><Avatar initials="JK" color="var(--accent)" /></td>
                    <td><span className={styles.tableProject}>Tomorrow</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Typography system</div></td>
                    <td><div className={styles.tableProject}>Brand Refresh</div></td>
                    <td><Badge variant="warm">High</Badge></td>
                    <td><Avatar initials="RN" color="#48735b" /></td>
                    <td><span className={styles.tableProject}>Jun 20</span></td>
                  </tr>
                  <tr>
                    <td><div className={styles.tableName}>Copy review - PDP</div></td>
                    <td><div className={styles.tableProject}>Summer Drop</div></td>
                    <td><Badge variant="danger">Urgent</Badge></td>
                    <td><Avatar initials="JK" color="var(--accent)" /></td>
                    <td><span className={styles.tableProject} style={{ color: "var(--use-warm)" }}>Overdue</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartsVisual() {
  return (
    <div className={cx(styles.mock, "feature-demo-frame")}>
      <div className={styles.chrome}>
        <WindowDots />
      </div>
      <div className={styles.canvas}>
        <div className={styles.promptCard}>
          <div className={styles.promptHeader}>
            <span className={styles.heroPromptIcon}>
              <SparkIcon />
            </span>
            Saria AI
          </div>
          <div className={styles.promptText}>
            &quot;Compare open task counts across all active projects, broken down by
            priority.&quot;
          </div>
        </div>

        <div className={cx(styles.block, styles.blockCompact)}>
          <div className={styles.blockHeader}>
            <div className={styles.blockType}>Open tasks by project &amp; priority</div>
          </div>

          <div className={styles.chartGroupLabel}>Summer Drop</div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>Urgent</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "80%", background: "var(--use-danger)" }} />
            </div>
            <div className={styles.barValue}>4</div>
          </div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>High</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "60%", background: "var(--use-warm)" }} />
            </div>
            <div className={styles.barValue}>3</div>
          </div>
          <div className={styles.barRow} style={{ marginBottom: 9 }}>
            <div className={styles.barLabel}>Medium</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "40%", background: "var(--use-gold)" }} />
            </div>
            <div className={styles.barValue}>2</div>
          </div>

          <div className={styles.chartGroupLabel}>Brand Refresh</div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>Urgent</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "20%", background: "var(--use-danger)" }} />
            </div>
            <div className={styles.barValue}>1</div>
          </div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>High</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "40%", background: "var(--use-warm)" }} />
            </div>
            <div className={styles.barValue}>2</div>
          </div>
          <div className={styles.barRow} style={{ marginBottom: 9 }}>
            <div className={styles.barLabel}>Medium</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "60%", background: "var(--use-gold)" }} />
            </div>
            <div className={styles.barValue}>3</div>
          </div>

          <div className={styles.chartGroupLabel}>Hydration Q2</div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>Urgent</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "0%", background: "var(--use-danger)" }} />
            </div>
            <div className={styles.barValue}>0</div>
          </div>
          <div className={styles.barRow}>
            <div className={styles.barLabel}>High</div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: "20%", background: "var(--use-warm)" }} />
            </div>
            <div className={styles.barValue}>1</div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.miniStat}>
            <div className={styles.miniStatValue} style={{ color: "var(--use-danger)" }}>
              5
            </div>
            <div className={styles.miniStatLabel}>Urgent total</div>
          </div>
          <div className={styles.miniStat}>
            <div className={styles.miniStatValue} style={{ color: "var(--accent)" }}>
              16
            </div>
            <div className={styles.miniStatLabel}>Open total</div>
          </div>
          <div className={styles.miniStat}>
            <div className={styles.miniStatValue} style={{ color: "var(--use-warm)" }}>
              5
            </div>
            <div className={styles.miniStatLabel}>Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STORY_SECTIONS: StorySectionProps[] = [
  {
    label: "Workflow Pages",
    heading: (
      <>
        An AI that knows your entire workspace, <span>ask it anything. Tell it to do anything.</span>
      </>
    ),
    body: (
      <>
        A Workflow page is a canvas with an AI panel on the side. It&apos;s not a chatbot
        with preset commands. It&apos;s an open-ended analyst and operator with full
        context of everything in your workspace.
      </>
    ),
    features: [
      {
        title: "Ask any question across any project",
        body: (
          <>
            Ask <em>&quot;what&apos;s behind across all active projects right now?&quot;</em>{" "}
            or <em>&quot;which project has the most open urgent tasks?&quot;</em> and get
            a real answer from live workspace data.
          </>
        ),
        icon: FiSearch
      },
      {
        title: "Tell it to build what you need",
        body: (
          <>
            Ask it to create an overdue-task table, generate a status chart, build a
            tracker, or draft a new block layout. <strong>Whatever you can do in the
            UI, it can do from a message.</strong>
          </>
        ),
        icon: FiZap
      },
      {
        title: "Update information without digging through tabs",
        body: (
          <>
            Mark a task complete, reassign something, update a project status, or change
            a priority across any project without navigating there yourself.
          </>
        ),
        icon: FiEdit3
      }
    ],
    callout: (
      <>
        <strong>This is the difference between a search tool and an operator.</strong>{" "}
        You&apos;re not looking things up. You&apos;re talking to something that
        understands the full picture and can act on it.
      </>
    ),
    gridClassName: styles.storyGridVisualHeavy,
    visualClassName: styles.mockOuterWide,
    visual: <WorkflowVisual />
  },
  {
    label: "The Everything Table",
    heading: (
      <>
        Every asset across every project, <span>filtered down to exactly what you want.</span>
      </>
    ),
    body: (
      <>
        The Everything Table is its own page in Saria. Every task, file, block, and item
        from every project in one place. The point isn&apos;t to show you everything at
        once. It&apos;s to let you slice it until you&apos;re looking at only what matters.
      </>
    ),
    features: [
      {
        title: "Filter by any combination of conditions",
        body: (
          <>
            Filter by project, type, status, assignee, priority, due date, or tag. Show
            only urgent tasks assigned to the creative team across the two projects
            launching this month.
          </>
        ),
        icon: FiFolder
      },
      {
        title: "See assets from multiple projects side by side",
        body: (
          <>
            Compare what&apos;s in flight, what&apos;s overdue, and who owns what
            without switching between project tabs.
          </>
        ),
        icon: FiShuffle
      },
      {
        title: "Click through directly to the item in context",
        body: (
          <>
            Every row links back to where the work lives. The table becomes a navigation
            layer. You&apos;re always one click from the actual work.
          </>
        ),
        icon: FiExternalLink
      }
    ],
    reverse: true,
    visual: <EverythingVisual />
  },
  {
    label: "On-the-Fly Charts & Boards",
    heading: (
      <>
        Build any view across any projects, <span>from a single prompt.</span>
      </>
    ),
    body: (
      <>
        Tell Saria&apos;s AI what you want to see across your projects and it generates a
        chart, board, or table immediately from your real data. Not a template. Not a
        preset. Exactly what you asked for.
      </>
    ),
    features: [
      {
        title: "Cross-project charts from a single prompt",
        body: (
          <>
            Ask for a bar chart of open tasks across all projects, a breakdown of work by
            status across your Q2 launches, or a timeline comparing deadlines across
            three projects.
          </>
        ),
        icon: FiBarChart2
      },
      {
        title: "Combine any data, any way you want",
        body: (
          <>
            The conditions are yours. You&apos;re not limited to what a dashboard widget
            was designed to show. You&apos;re describing exactly what you need to know.
          </>
        ),
        icon: FiShuffle
      },
      {
        title: "Keep it or throw it away",
        body: (
          <>
            Generated views drop in as blocks on your Workflow canvas. Pin the useful
            ones to your dashboard, or use them once for a meeting and move on.
          </>
        ),
        icon: FiBookmark
      }
    ],
    callout: (
      <>
        <strong>There&apos;s no reporting feature to configure.</strong> The AI is the
        reporting feature. You describe what you want to see and it builds it.
      </>
    ),
    visual: <ChartsVisual />
  }
];

export function UseCases({ standalone = false }: UseCasesProps) {
  return (
    <>
      <section
        id={standalone ? undefined : "use-cases"}
        className={cx(styles.section, "border-b border-cream-3 bg-cream")}
      >
        {standalone ? (
          <section className={base.hero}>
            <div className={base.heroSolo}>
              <div className={base.eyebrow}>Multi-Project Management</div>
              <h1 className={base.heroHeading}>
                Run multiple projects without losing the <em>thread across any of them</em>
              </h1>
              <p className={base.heroSubhead}>
                Ask anything about your workspace, filter across every project at once, and
                build the view you need on the fly, in seconds.
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
        ) : null}

        <div
          className={cx(
            "px-[60px] pb-14 max-[880px]:px-6 max-[880px]:pb-10",
            standalone ? "pt-0" : "pt-[72px] max-[880px]:pt-[52px]"
          )}
        >
          <div className="mx-auto max-w-[1360px]">
            {standalone ? null : (
              <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-[56px] max-[980px]:grid-cols-1 max-[980px]:gap-8">
                <div>
                  <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
                    Use Cases
                  </div>
                  <h2 className="font-display text-[clamp(36px,4vw,58px)] font-normal leading-[1.08] tracking-[-0.045em] text-ink">
                    Run multiple projects without losing the{" "}
                    <span className="font-display font-semibold text-accent">
                      thread across any of them.
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className="max-w-[620px] pt-[44px] text-[15px] leading-[1.85] text-ink-2 max-[980px]:pt-0">
                    The first use case is Multi-Project Management. Ask anything about
                    your workspace, filter across every project at once, and build the
                    view you need on the fly, in seconds.
                  </p>
                  <div>
                    <Link
                      href="/use-cases"
                      className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-cream-3 bg-[rgba(255,255,255,0.72)] px-5 text-[12px] font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:bg-cream-2"
                    >
                      Explore the use case
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className={cx("mt-8", standalone && "mx-auto max-w-[1220px]")}>
              <div className="feature-demo-shell w-full">
                <HeroVisual />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.introStrip}>
          <div className={styles.introStripInner}>
            <div className={styles.introLabel}>How it works</div>
            <p className={styles.introText}>
              Saria gives you three ways to work across projects:{" "}
              <strong>Workflow pages</strong>, an open-ended AI you talk to that knows
              everything in your workspace and can build, update, and analyze anything;{" "}
              <strong>the Everything Table</strong>, every item across all projects,
              filterable any way you want; and <strong>on-the-fly charts and boards</strong>{" "}
              built from whatever combination of project data you need.
            </p>
          </div>
        </div>

        {STORY_SECTIONS.map((section) => (
          <StorySection key={section.label} {...section} />
        ))}
      </section>

      {standalone ? (
        <section className={styles.standaloneCta}>
          <div className={styles.standaloneCtaInner}>
            <div className={styles.standaloneCtaLabel}>Get Started</div>
            <h2 className={styles.standaloneCtaHeading}>
              Every project, one workspace. <span>Ask anything. See everything.</span>
            </h2>
            <p className={styles.standaloneCtaBody}>
              Workflow pages, the Everything Table, and on-the-fly charts are ready from
              day one. No configuration. No setup.
            </p>
            <div className={styles.standaloneActionRow}>
              <AccentButton href="https://app.sariasoftware.com/start-free-trial" external>
                Start Free Trial
              </AccentButton>
              <SecondaryButton href="/pricing">Book a walkthrough</SecondaryButton>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
