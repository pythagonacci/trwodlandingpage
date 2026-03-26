import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import styles from "./organize.module.css";

export const metadata = createPageMetadata({
  title: "Organize Your Entire Brand Workflow | Saria",
  description:
    "Organize every D2C workflow in one place with Saria. Give your team a unified project view for tasks, timelines, calendars, and reporting across launches and campaigns.",
  path: "/product/organize"
});

const SECTION_LINKS = [
  { href: "/product/organize", label: "01 - Organize", active: true, route: true },
  { href: "/product/create", label: "02 - Create", active: false, route: true },
  {
    href: "/product/intelligent-action",
    label: "03 - Intelligent Action",
    active: false,
    route: true
  },
  { href: "/product/collaborate", label: "04 - Collaborate", active: false, route: true },
  { href: "/product/connect", label: "05 - Connect", active: false, route: true }
];

const ATTRIBUTE_PILLS = [
  { label: "Status", color: "var(--page-gold)" },
  { label: "Priority", color: "var(--page-accent)" },
  { label: "Assignee", color: "var(--page-sage)" },
  { label: "Due Date", color: "var(--page-sky)" },
  { label: "Tags", color: "var(--page-rose)" }
];

type FeatureCard = {
  tag: string;
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    tag: "View",
    title: "The Everything Page",
    description: (
      <>
        A workspace-wide view that aggregates every trackable item into one surface. Filter by{" "}
        <strong>status, priority, assignee, due date, tags, project, or type.</strong> Switch
        between table and board layouts. Save views and return to them.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )
  },
  {
    tag: "Tasks",
    title: "Tasks That Go Deep",
    description: (
      <>
        Run workloads in <strong>list, board, or table view.</strong> Group by status, priority,
        assignee, or due date. Drill into subtasks and detail cards without leaving the page. See
        task distribution at a glance with rollup bars.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    )
  },
  {
    tag: "Database",
    title: "Tables As Databases",
    description: (
      <>
        <strong>Rich field types</strong> like status, priority, tags, person, date, relation,
        rollup, and formula. View the same data as table, board, timeline, calendar, list, or
        gallery. Filter, sort, group, pin, and save views.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    )
  },
  {
    tag: "Planning",
    title: "Timelines With Teeth",
    description: (
      <>
        Gantt-style planning with <strong>dependencies, auto-scheduling, milestones,</strong> and
        baselines for plan-vs-actual tracking. Zoom from day to year. Shift one date and
        everything downstream adjusts.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="15" y2="12" />
        <line x1="3" y1="18" x2="18" y2="18" />
        <circle cx="20" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    tag: "Analytics",
    title: "Charts From Live Data",
    description: (
      <>
        Bar, line, pie, and doughnut charts generated from tasks, timelines, tables, and cards.
        Keep them live for daily standups or <strong>freeze a snapshot</strong> for the board
        deck. AI can build one from a question.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    )
  },
  {
    tag: "Calendar",
    title: "A Calendar That Knows Everything",
    description: (
      <>
        Tasks, project deadlines, timeline events, and <strong>Google Calendar</strong> merged
        into one view across month, week, and day. Click any date to see the workload and create
        tasks directly.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }
];

const EVERYTHING_ROWS = [
  {
    name: "Q2 Product Launch - Hero copy",
    status: "In Progress",
    statusClass: "statusInProgress",
    statusDot: "var(--page-accent)",
    priority: "High",
    priorityHigh: true,
    assigneeInitials: "AM",
    assigneeName: "Amna",
    avatarColor: "var(--page-accent)",
    due: "Apr 12",
    dueClass: "dueText"
  },
  {
    name: "Influencer brief - Glow Serum",
    status: "Review",
    statusClass: "statusReview",
    statusDot: "var(--page-sage)",
    priority: "High",
    priorityHigh: true,
    assigneeInitials: "JS",
    assigneeName: "Jamie",
    avatarColor: "var(--page-sage)",
    due: "Apr 10",
    dueClass: "dueAccent"
  },
  {
    name: "Shopify variant audit - Spring SKUs",
    status: "Todo",
    statusClass: "statusTodo",
    statusDot: "rgba(28, 25, 23, 0.32)",
    priority: "Med",
    priorityHigh: false,
    assigneeInitials: "KP",
    assigneeName: "Kenji",
    avatarColor: "var(--page-gold)",
    due: "Apr 18",
    dueClass: "dueText"
  },
  {
    name: "Creative review - Packaging v3",
    status: "Done",
    statusClass: "statusDone",
    statusDot: "#28c840",
    priority: "Low",
    priorityHigh: false,
    assigneeInitials: "SR",
    assigneeName: "Sara",
    avatarColor: "var(--page-sky)",
    due: "Apr 5",
    dueClass: "dueSoft"
  },
  {
    name: "Meta Ads copy - Retargeting batch",
    status: "In Progress",
    statusClass: "statusInProgress",
    statusDot: "var(--page-accent)",
    priority: "High",
    priorityHigh: true,
    assigneeInitials: "MR",
    assigneeName: "Maya",
    avatarColor: "var(--page-rose)",
    due: "Apr 14",
    dueClass: "dueText"
  }
];

const ROLLUP_SEGMENTS = [
  { width: "28%", color: "#28c840" },
  { width: "38%", color: "var(--page-accent)" },
  { width: "18%", color: "var(--page-sage)" },
  { width: "16%", color: "rgba(28, 25, 23, 0.18)" }
];

type TimelineSegment = {
  column: number;
  label: string;
  tone: "sage" | "gold" | "sky" | "accent";
  style: CSSProperties;
};

type TimelineRow = {
  task: string;
  segments?: TimelineSegment[];
  milestoneColumn?: number;
};

const TIMELINE_ROWS: TimelineRow[] = [
  {
    task: "Brief & Strategy",
    segments: [
      {
        column: 0,
        label: "Brief",
        tone: "sage",
        style: { left: "4px", width: "65%" }
      }
    ]
  },
  {
    task: "Creative Production",
    segments: [
      {
        column: 0,
        label: "Creative",
        tone: "gold",
        style: { left: "55%", width: "40%" }
      },
      {
        column: 1,
        label: "->",
        tone: "gold",
        style: { left: "0", width: "60%" }
      }
    ]
  },
  {
    task: "Influencer Outreach",
    segments: [
      {
        column: 1,
        label: "Outreach",
        tone: "sky",
        style: { left: "10%", width: "80%" }
      },
      {
        column: 2,
        label: "->",
        tone: "sky",
        style: { left: "0", width: "50%" }
      }
    ]
  },
  {
    task: "Launch Day",
    milestoneColumn: 2
  },
  {
    task: "Post-launch Review",
    segments: [
      {
        column: 2,
        label: "Review",
        tone: "accent",
        style: { left: "55%", width: "44%" }
      },
      {
        column: 3,
        label: "->",
        tone: "accent",
        style: { left: "0", width: "55%" }
      }
    ]
  }
];

const CALENDAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type CalendarEvent = {
  label: string;
  background: string;
  color: string;
};

type CalendarCell = {
  date: string;
  otherMonth?: boolean;
  today?: boolean;
  events?: CalendarEvent[];
};

const CALENDAR_CELLS: CalendarCell[] = [
  { date: "31", otherMonth: true },
  {
    date: "1",
    events: [{ label: "Q2 kickoff", background: "var(--page-accent-soft)", color: "var(--page-accent)" }]
  },
  { date: "2" },
  {
    date: "3",
    events: [{ label: "Team standup", background: "rgba(123, 157, 196, 0.14)", color: "#5a85b5" }]
  },
  {
    date: "4",
    events: [{ label: "Brief due", background: "rgba(184, 150, 46, 0.14)", color: "var(--page-gold)" }]
  },
  { date: "5" },
  { date: "6" },
  {
    date: "7",
    events: [
      { label: "Creative review", background: "var(--page-accent-soft)", color: "var(--page-accent)" }
    ]
  },
  { date: "8" },
  {
    date: "9",
    events: [{ label: "Investor call", background: "rgba(123, 157, 196, 0.14)", color: "#5a85b5" }]
  },
  {
    date: "10",
    events: [
      { label: "Influencer brief", background: "rgba(184, 150, 46, 0.14)", color: "var(--page-gold)" }
    ]
  },
  { date: "11" },
  { date: "12" },
  { date: "13" },
  {
    date: "14",
    today: true,
    events: [
      { label: "Ad copy due", background: "var(--page-accent-soft)", color: "var(--page-accent)" },
      { label: "Sync: Maya", background: "rgba(123, 157, 196, 0.14)", color: "#5a85b5" }
    ]
  },
  { date: "15" },
  {
    date: "16",
    events: [{ label: "SKU review", background: "rgba(184, 150, 46, 0.14)", color: "var(--page-gold)" }]
  },
  { date: "17" },
  {
    date: "18",
    events: [{ label: "Shopify audit", background: "var(--page-accent-soft)", color: "var(--page-accent)" }]
  },
  { date: "19" },
  { date: "20" },
  {
    date: "21",
    events: [{ label: "Launch Day", background: "rgba(40, 200, 64, 0.08)", color: "#1a9e30" }]
  },
  { date: "22" },
  {
    date: "23",
    events: [{ label: "Post-launch sync", background: "rgba(123, 157, 196, 0.14)", color: "#5a85b5" }]
  },
  { date: "24" },
  { date: "25" },
  { date: "26" },
  { date: "27" }
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function timelineBarClass(tone: TimelineSegment["tone"]) {
  if (tone === "sage") return styles.ganttBarSage;
  if (tone === "gold") return styles.ganttBarGold;
  if (tone === "sky") return styles.ganttBarSky;
  return styles.ganttBarAccent;
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className={styles.page}>
        <div id="section-nav" className={styles.sectionNav}>
        <div className={styles.sectionNavInner}>
          {SECTION_LINKS.map((item) =>
            item.route ? (
              <Link
                key={item.label}
                href={item.href}
                className={cx(styles.sectionNavLink, item.active && styles.sectionNavLinkActive)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={cx(styles.sectionNavLink, item.active && styles.sectionNavLinkActive)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
        </div>

      <section className={styles.heroSection}>
        <div>
          <div className={styles.heroLabel}>01 - Organize</div>
          <h1 className={styles.heroTitle}>
            Organize your entire
            <br />
            <span className={styles.heroTitleAccent}>workflow in one place.</span>
          </h1>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.heroSubhead}>Core Attributes</p>
          <p className={styles.heroDescription}>
            Every item in Saria, tasks, timeline events, table rows, cards, and even content blocks,
            carries the same five core attributes: <strong>status, priority, assignee, due date, and tags.</strong> That means everything rolls up into one view. One place to see the state of every
            product launch, every campaign, and every deliverable across your entire operation.
          </p>
        </div>
      </section>

      <section className={styles.attributesSection}>
        <div className={styles.attributesInner}>
          <div>
            <p className={styles.sectionEyebrowDark}>Five properties. Everything unified.</p>
            <h2 className={styles.attributesTitle}>One model for your entire workspace.</h2>
            <p className={styles.attributesDescription}>
              When every item shares the same properties, you can filter, group, and aggregate
              across your entire operation, not just within a single project or tool.
            </p>
          </div>
          <div className={styles.pillGrid}>
            {ATTRIBUTE_PILLS.map((pill) => (
              <div key={pill.label} className={styles.pill}>
                <span className={styles.pillDot} style={{ backgroundColor: pill.color }} />
                {pill.label}
              </div>
            ))}
            <div className={cx(styles.pill, styles.pillWide)}>
              + works across tasks, tables, timelines, cards, blocks
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className={styles.featureCard}>
              <span className={styles.cardTag}>{card.tag}</span>
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.showcaseStrip}>
        <div className={styles.showcaseInner}>
          <div className={styles.uiScroller}>
            <div className={styles.showcaseUi}>
              <div className={styles.uiTopbar}>
                <span className={cx(styles.uiDot, styles.uiDotRed)} />
                <span className={cx(styles.uiDot, styles.uiDotYellow)} />
                <span className={cx(styles.uiDot, styles.uiDotGreen)} />
                <span className={styles.uiTitle}>Everything - All Projects</span>
                <span className={styles.liveBadge}>
                  <span className={styles.liveDot} />
                  Live
                </span>
              </div>

              <div className={styles.uiFilters}>
                <span className={cx(styles.uiFilterChip, styles.uiFilterChipActive)}>All types</span>
                <span className={styles.uiFilterChip}>Tasks</span>
                <span className={styles.uiFilterChip}>Table rows</span>
                <span className={styles.uiFilterChip}>Timeline events</span>
                <span className={styles.uiFilterChip}>Cards</span>
                <span className={cx(styles.uiFilterChip, styles.uiFilterChipAccent)}>+ Add filter</span>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.uiTable}>
                  <thead>
                    <tr>
                      <th style={{ width: "36%" }}>Name</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Assignee</th>
                      <th>Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EVERYTHING_ROWS.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>
                          <span className={cx(styles.statusBadge, styles[row.statusClass])}>
                            <span
                              className={styles.statusDot}
                              style={{ backgroundColor: row.statusDot }}
                            />
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={cx(
                              styles.priorityBadge,
                              row.priorityHigh && styles.priorityHigh
                            )}
                          >
                            {row.priorityHigh ? "↑" : "-"} {row.priority}
                          </span>
                        </td>
                        <td>
                          <span className={styles.assigneeChip}>
                            <span
                              className={styles.assigneeAvatar}
                              style={{ backgroundColor: row.avatarColor }}
                            >
                              {row.assigneeInitials}
                            </span>
                            {row.assigneeName}
                          </span>
                        </td>
                        <td className={cx(styles.dueText, styles[row.dueClass])}>{row.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.rollupRow}>
                <span>12 of 34 items shown</span>
                <div className={styles.rollupTrack}>
                  {ROLLUP_SEGMENTS.map((segment) => (
                    <span
                      key={segment.width}
                      className={styles.rollupSegment}
                      style={{ width: segment.width, backgroundColor: segment.color }}
                    />
                  ))}
                </div>
                <span>9 done · 13 active · 6 review · 6 todo</span>
              </div>
            </div>
          </div>

          <div>
            <p className={styles.showcaseLabel}>Everything Page</p>
            <h3 className={styles.showcaseHeading}>Your entire operation in one surface.</h3>
            <p className={styles.showcaseCopy}>
              Not project by project. Not tool by tool. Every task, table row, timeline event, and
              card across every project in your workspace aggregated into a single view.
            </p>
            <ul className={styles.detailList}>
              <li>Filter across 7 dimensions simultaneously</li>
              <li>Switch between table and board layouts instantly</li>
              <li>Save and return to custom views for standups, reviews, and sprint planning</li>
              <li>Rollup bars show workload distribution at a glance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.timelineShowcase}>
        <div className={styles.showcaseTextLeft}>
          <div>
            <p className={styles.showcaseLabel}>Timelines With Teeth</p>
            <h3 className={styles.showcaseHeading}>Plans that actually move with the work.</h3>
            <p className={styles.showcaseCopy}>
              Dependencies connect dates across your project. Auto-scheduling propagates changes
              downstream. Milestones anchor the plan. Baselines track drift.
            </p>
            <ul className={styles.detailList}>
              <li>Shift one date and downstream tasks auto-adjust</li>
              <li>Milestones with conditional logic and alerts</li>
              <li>Baseline overlays for plan-vs-actual tracking</li>
              <li>Zoom from day view to full-year overview</li>
            </ul>
          </div>

          <div className={styles.uiScroller}>
            <div className={styles.timelineUi}>
              <div className={styles.timelineHeader}>
                <span className={styles.timelineTitle}>Q2 Product Launch</span>
                <div className={styles.timelineZoom}>
                  <span className={styles.zoomButton}>Day</span>
                  <span className={cx(styles.zoomButton, styles.zoomButtonActive)}>Week</span>
                  <span className={styles.zoomButton}>Month</span>
                </div>
              </div>

              <div className={styles.ganttHeader}>
                {["Task", "Apr 7", "Apr 14", "Apr 21", "Apr 28"].map((label) => (
                  <div key={label} className={styles.ganttHeaderCell}>
                    {label}
                  </div>
                ))}
              </div>

              {TIMELINE_ROWS.map((row) => (
                <div key={row.task} className={styles.ganttRow}>
                  <div className={styles.ganttTask}>{row.task}</div>
                  {Array.from({ length: 4 }).map((_, columnIndex) => {
                    const segment = row.segments?.find((item) => item.column === columnIndex);
                    const hasMilestone = row.milestoneColumn === columnIndex;

                    return (
                      <div
                        key={`${row.task}-${columnIndex}`}
                        className={cx(
                          styles.ganttCell,
                          hasMilestone && styles.ganttMilestoneWrap
                        )}
                      >
                        {segment ? (
                          <span
                            className={cx(styles.ganttBar, timelineBarClass(segment.tone))}
                            style={segment.style}
                          >
                            {segment.label}
                          </span>
                        ) : null}
                        {hasMilestone ? <span className={styles.ganttMilestone} /> : null}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.chartsStrip}>
        <div className={styles.chartsInner}>
          <div className={styles.chartsHeader}>
            <div>
              <p className={styles.showcaseLabel}>Charts From Live Data</p>
              <h3 className={styles.chartsHeading}>Ask it. Get a chart. Keep it.</h3>
            </div>
            <p className={styles.chartsCopy}>
              Built from your actual project data, not spreadsheets. Keep charts live for standups
              or freeze a snapshot for the board.
            </p>
          </div>

          <div className={styles.chartsGrid}>
            <article className={styles.chartCard}>
              <p className={styles.chartCardLabel}>Tasks · Q2 Launch</p>
              <p className={styles.chartCardTitle}>Status breakdown by assignee</p>
              <div className={styles.barChart}>
                {[
                  ["Amna", "72%", "var(--page-accent)"],
                  ["Jamie", "45%", "var(--page-gold)"],
                  ["Kenji", "60%", "var(--page-sage)"],
                  ["Sara", "30%", "var(--page-sky)"],
                  ["Maya", "55%", "var(--page-rose)"]
                ].map(([label, height, color]) => (
                  <div key={label} className={styles.barItem}>
                    <span
                      className={styles.barFill}
                      style={{ height, backgroundColor: color }}
                    />
                    <span className={styles.barLabel}>{label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.chartMeta}>
                <span>34 tasks total</span>
                <span className={styles.chartMetaBadge}>Live</span>
              </div>
            </article>

            <article className={styles.chartCard}>
              <p className={styles.chartCardLabel}>All Projects · This Month</p>
              <p className={styles.chartCardTitle}>Workload by project type</p>
              <div className={styles.donutWrap}>
                <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="rgba(28, 25, 23, 0.1)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="var(--page-accent)"
                    strokeWidth="12"
                    strokeDasharray="70 119"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="var(--page-gold)"
                    strokeWidth="12"
                    strokeDasharray="47 142"
                    strokeDashoffset="-70"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="var(--page-sage)"
                    strokeWidth="12"
                    strokeDasharray="32 157"
                    strokeDashoffset="-117"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="var(--page-sky)"
                    strokeWidth="12"
                    strokeDasharray="39 150"
                    strokeDashoffset="-149"
                    transform="rotate(-90 40 40)"
                  />
                </svg>

                <div className={styles.donutLegend}>
                  {[
                    ["Product Launch (37%)", "var(--page-accent)"],
                    ["Campaigns (25%)", "var(--page-gold)"],
                    ["Operations (17%)", "var(--page-sage)"],
                    ["Creative (21%)", "var(--page-sky)"]
                  ].map(([label, color]) => (
                    <div key={label} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ backgroundColor: color }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.chartMeta}>
                <span>Apr 2025</span>
                <span className={styles.chartMetaBadge}>Snapshot</span>
              </div>
            </article>

            <article className={styles.chartCard}>
              <p className={styles.chartCardLabel}>Velocity · Last 4 Weeks</p>
              <p className={styles.chartCardTitle}>Tasks completed per week</p>
              <div className={styles.lineChartArea}>
                <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradOrganize" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(29, 78, 216, 0.32)" />
                      <stop offset="100%" stopColor="rgba(29, 78, 216, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,55 C50,55 60,30 100,35 S160,20 200,25 S250,15 300,18 L300,80 L0,80 Z"
                    fill="url(#lineGradOrganize)"
                  />
                  <path
                    d="M0,55 C50,55 60,30 100,35 S160,20 200,25 S250,15 300,18"
                    fill="none"
                    stroke="var(--page-accent)"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="55" r="3" fill="var(--page-accent)" />
                  <circle cx="100" cy="35" r="3" fill="var(--page-accent)" />
                  <circle cx="200" cy="25" r="3" fill="var(--page-accent)" />
                  <circle cx="300" cy="18" r="3" fill="var(--page-accent)" />
                </svg>
              </div>
              <div className={styles.chartMeta}>
                <span>+42% velocity this month</span>
                <span className={styles.chartMetaBadge}>↑ Live</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.calendarSection}>
        <div className={styles.uiScroller}>
          <div className={styles.calendarUi}>
            <div className={styles.calendarHeader}>
              <span className={styles.calendarMonth}>April 2025</span>

              <div className={styles.calendarHeaderRight}>
                <div className={styles.calendarSources}>
                  <span className={styles.calendarSource}>
                    <span
                      className={styles.calendarSourceDot}
                      style={{ backgroundColor: "var(--page-accent)" }}
                    />
                    Saria Tasks
                  </span>
                  <span className={styles.calendarSource}>
                    <span
                      className={styles.calendarSourceDot}
                      style={{ backgroundColor: "var(--page-sky)" }}
                    />
                    Google Cal
                  </span>
                  <span className={styles.calendarSource}>
                    <span
                      className={styles.calendarSourceDot}
                      style={{ backgroundColor: "var(--page-gold)" }}
                    />
                    Deadlines
                  </span>
                </div>

                <div className={styles.calendarViewTabs}>
                  <span className={cx(styles.calendarViewTab, styles.calendarViewTabActive)}>
                    Month
                  </span>
                  <span className={styles.calendarViewTab}>Week</span>
                  <span className={styles.calendarViewTab}>Day</span>
                </div>
              </div>
            </div>

            <div className={styles.calendarGridHeader}>
              {CALENDAR_DAYS.map((day) => (
                <div key={day} className={styles.calendarDayLabel}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {CALENDAR_CELLS.map((cell) => (
                <div
                  key={`${cell.date}-${cell.events?.[0]?.label ?? "empty"}`}
                  className={cx(
                    styles.calendarCell,
                    cell.today && styles.calendarCellToday,
                    cell.otherMonth && styles.calendarCellOtherMonth
                  )}
                >
                  <div className={styles.calendarDate}>{cell.date}</div>
                  {cell.events?.map((event) => (
                    <div
                      key={event.label}
                      className={styles.calendarEvent}
                      style={{ background: event.background, color: event.color }}
                    >
                      {event.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className={styles.showcaseLabel}>The Unified Calendar</p>
          <h3 className={styles.showcaseHeading}>Every deadline. Every meeting. One view.</h3>
          <p className={styles.showcaseCopy}>
            Your tasks, project milestones, timeline events, and Google Calendar merged into a
            single calendar that actually knows everything happening in your operation.
          </p>
          <ul className={styles.detailList}>
            <li>Three views: month, week, and day</li>
            <li>Google Calendar events merged alongside project dates</li>
            <li>Click any date to see workload and create tasks inline</li>
            <li>Color-coded by source: tasks, deadlines, and external events</li>
          </ul>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.footerCtaInner}>
          <p className={styles.footerCtaText}>
            Ready to stop
            <br />
            missing <span className={styles.footerCtaTextAccent}>anything?</span>
          </p>

          <div className={styles.footerCtaActions}>
            <Link href="/product/create" className={styles.ghostButton}>
              02 - Create
              <svg
                className={styles.ctaArrow}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href="https://app.sariasoftware.com/start-free-trial"
              className={styles.primaryButton}
              target="_blank"
              rel="noreferrer"
            >
              Start for free
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
