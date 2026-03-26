import type { ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import styles from "./intelligent-action.module.css";

export const metadata = createPageMetadata({
  title: "AI-Powered Workflows for D2C Teams | Saria",
  description:
    "Run AI-powered workflows built for D2C teams with Saria. Help your team search projects, generate deliverables, and turn workspace and Shopify context into action.",
  path: "/product/intelligent-action"
});

const SECTION_LINKS = [
  { href: "/product/organize", label: "01 - Organize", active: false, route: true },
  { href: "/product/create", label: "02 - Create", active: false, route: true },
  { href: "/product/intelligent-action", label: "03 - Intelligent Action", active: true, route: true },
  { href: "/product/collaborate", label: "04 - Collaborate", active: false, route: true },
  { href: "/product/connect", label: "05 - Connect", active: false, route: true }
];

const HERO_RESULTS = [
  {
    label: "Generate chart - Task breakdown by status",
    meta: "Chart block",
    tone: "chart",
    active: true,
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
    label: "Create tasks from this description",
    meta: "Task block",
    tone: "task",
    active: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    )
  },
  {
    label: "Build table from workspace data",
    meta: "Table block",
    tone: "table",
    active: false,
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
    label: 'Search across workspace for "Q2 Launch"',
    meta: "Search",
    tone: "search",
    active: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )
  }
];

const ARTIFACT_BARS = [
  { value: "13", height: "72%", color: "rgba(184, 150, 46, 0.6)", label: "In Progress" },
  { value: "9", height: "50%", color: "rgba(29, 78, 216, 0.55)", label: "Todo" },
  { value: "6", height: "33%", color: "rgba(122, 140, 126, 0.5)", label: "Review" },
  { value: "18", height: "100%", color: "rgba(40, 200, 64, 0.4)", label: "Done" }
];

const CHART_BARS = [
  { value: "18", height: "100%", color: "#28C840", opacity: 0.7, label: "Done" },
  { value: "13", height: "72%", color: "var(--page-gold)", opacity: 0.8, label: "In Progress" },
  { value: "9", height: "50%", color: "var(--page-accent)", opacity: 0.7, label: "Todo" },
  { value: "6", height: "33%", color: "var(--page-sage)", opacity: 0.8, label: "Review" }
];

const WORKFLOW_ROWS = [
  ["Amna M.", "14", "9", "2", true],
  ["Sara R.", "11", "8", "0", false],
  ["Jamie K.", "8", "5", "1", true],
  ["Kenji P.", "13", "7", "0", false]
] as const;

const ANALYSIS_FILES = [
  {
    label: "Q2 Creative Audit.pdf",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  },
  {
    label: "Influencer Brief v2.pdf",
    active: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
];

const SEARCH_RESULTS = [
  {
    title: "Influencer Brief - Batch 3.pdf",
    meta: "File - Glow Serum Launch",
    color: "var(--page-accent)",
    background: "rgba(29, 78, 216, 0.08)",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  },
  {
    title: "Send influencer brief to batch 3",
    meta: "Task - Due Apr 18 - Jamie K.",
    color: "var(--page-sage)",
    background: "rgba(122, 140, 126, 0.1)",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
      </svg>
    )
  },
  {
    title: "Creator Campaign - Brief template",
    meta: "Document - Templates",
    color: "var(--page-gold)",
    background: "rgba(184, 150, 46, 0.1)",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
];

type FeatureCard = {
  tag: string;
  title: string;
  body: ReactNode;
  icon: ReactNode;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    tag: "Command",
    title: "Context-Aware Command",
    body: (
      <>
        The AI palette follows where you are: project, tab, or block. It <strong>knows the scope
        before you ask.</strong> Describe what you want and it executes: create tasks, build
        tables, generate charts, search across everything.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )
  },
  {
    tag: "Charts",
    title: "Charts From Questions",
    body: (
      <>
        Ask &quot;show me task breakdown by status for Q2 Launch&quot; and Saria builds a{" "}
        <strong>real chart block</strong>, not a text description, an actual interactive chart you
        can keep, configure, and share.
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
    tag: "Canvas",
    title: "Workflow Pages",
    body: (
      <>
        Persistent analysis canvases with an always-mounted AI sidebar. Triage data, explore
        patterns, and assemble operational views in a dedicated space that{" "}
        <strong>does not clutter your project structure.</strong>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    )
  },
  {
    tag: "Analysis",
    title: "File Analysis -> Saved Artifact",
    body: (
      <>
        Upload a document, analyze it with AI, then <strong>promote the entire analysis thread</strong>{" "}
        into a saved workflow page. One-off research becomes a living operational reference.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15h6" />
      </svg>
    )
  },
  {
    tag: "Modes",
    title: "Three Modes, One Surface",
    body: (
      <>
        Assistant mode for conversation. File analysis mode for uploaded material. Workspace search
        mode for direct retrieval. <strong>All from the same panel.</strong> No switching, no
        context loss.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    )
  },
  {
    tag: "Aggregate",
    title: "Search + Aggregate + Build",
    body: (
      <>
        Search structured and unstructured data across your workspace, then turn results into{" "}
        <strong>tables, charts, or written summaries</strong> directly on the page. Analysis and
        output in one motion.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    )
  }
];

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
                className={cx(styles.sectionNavItem, item.active && styles.sectionNavItemActive)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={cx(styles.sectionNavItem, item.active && styles.sectionNavItemActive)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
        </div>

      <section className={styles.heroDark}>
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroEyebrow}>03 - Intelligent Action</div>
              <h1 className={styles.heroHeading}>
                AI-powered workflows
                <br />
                for <em>D2C teams.</em>
              </h1>
            </div>

            <div>
              <p className={styles.heroSubhead}>Intelligence that builds, not just answers.</p>
              <p className={styles.heroDescription}>
                Saria&apos;s AI layer does not just search your workspace, <strong>it acts on it.</strong>{" "}
                Ask a question and get a chart. Describe what you need and get a page. Upload a
                file and get an analysis you can save, build on, and share. The AI follows your
                context, knows your project, and creates real artifacts, not just text responses.
              </p>
            </div>
          </div>

          <div className={styles.paletteWrap}>
            <div className={styles.paletteShell}>
              <div className={styles.paletteFrame}>
                <div className={styles.palette}>
                  <div className={styles.paletteBar}>
                    <div className={styles.paletteSearchIcon}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                    <input
                      className={styles.paletteInput}
                      value="show me task breakdown by status for Q2 Launch"
                      readOnly
                    />
                    <div className={styles.paletteKeys}>
                      <span className={styles.keycap}>Cmd</span>
                      <span className={styles.keycap}>K</span>
                    </div>
                  </div>

                  <div className={styles.paletteScope}>
                    Scope:
                    <span className={styles.scopePill}>Project: Glow Serum Launch</span>
                    <span>All tabs</span>
                  </div>

                  <div className={styles.paletteResults}>
                    {HERO_RESULTS.slice(0, 2).map((result) => (
                      <div
                        key={result.label}
                        className={cx(
                          styles.paletteResult,
                          result.active && styles.paletteResultActive
                        )}
                      >
                        <div
                          className={cx(
                            styles.paletteIcon,
                            result.tone === "chart" && styles.paletteIconChart,
                            result.tone === "task" && styles.paletteIconTask,
                            result.tone === "table" && styles.paletteIconTable,
                            result.tone === "search" && styles.paletteIconSearch
                          )}
                        >
                          {result.icon}
                        </div>
                        <span className={styles.paletteResultLabel}>{result.label}</span>
                        <span className={styles.paletteResultMeta}>{result.meta}</span>
                      </div>
                    ))}

                    <div className={styles.paletteDivider} />

                    {HERO_RESULTS.slice(2).map((result) => (
                      <div key={result.label} className={styles.paletteResult}>
                        <div
                          className={cx(
                            styles.paletteIcon,
                            result.tone === "table" && styles.paletteIconTable,
                            result.tone === "search" && styles.paletteIconSearch
                          )}
                        >
                          {result.icon}
                        </div>
                        <span className={styles.paletteResultLabel}>{result.label}</span>
                        <span className={styles.paletteResultMeta}>{result.meta}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.execStrip}>
                    <div className={styles.execDot} />
                    <span className={styles.execText}>
                      Building chart block - Task breakdown by status - Q2 Launch...
                    </span>
                  </div>

                  <div className={styles.artifactBlock}>
                    <div className={styles.artifactLabel}>
                      <span>Chart block - inserted into current page</span>
                      <span className={styles.artifactMeta}>Live - updates as tasks change</span>
                    </div>

                    <div className={styles.artifactBars}>
                      {ARTIFACT_BARS.map((bar) => (
                        <div key={bar.label} className={styles.artifactBarItem}>
                          <div className={styles.artifactBarValue}>{bar.value}</div>
                          <div
                            className={styles.artifactBar}
                            style={{ height: bar.height, background: bar.color }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className={styles.artifactLegend}>
                      {ARTIFACT_BARS.map((bar) => (
                        <span key={bar.label} className={styles.artifactLegendItem}>
                          <span
                            className={styles.artifactLegendSwatch}
                            style={{ background: bar.color }}
                          />
                          {bar.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mock}>
            <div className={styles.topbar}>
              <WindowDots />
              <span className={styles.topbarTitle}>Glow Serum Launch - Overview</span>
            </div>

            <div className={styles.chartMockInner}>
              <div className={styles.chatPrompt}>
                <div className={styles.userBubble}>
                  <span className={styles.questionMark}>&gt;</span>
                  show me task breakdown by status for Q2 Launch
                </div>
              </div>

              <div className={styles.aiResponse}>
                <div className={styles.aiAvatar}>S</div>
                <div className={styles.aiBody}>
                  <div className={styles.aiText}>
                    Here&apos;s the task breakdown across your Q2 Launch project.{" "}
                    <strong>18 tasks are complete</strong>, 13 are in progress. You have a review
                    backlog building, 6 items waiting.
                  </div>

                  <div className={styles.chartOutput}>
                    <div className={styles.chartOutputHeader}>
                      <span className={styles.chartOutputTitle}>
                        Task breakdown by status - Q2 Launch
                      </span>
                      <div className={styles.chartActions}>
                        <button type="button" className={styles.chartActionButton}>
                          Configure
                        </button>
                        <button type="button" className={styles.chartActionButton}>
                          Keep on page
                        </button>
                        <button type="button" className={styles.chartActionButton}>
                          Share
                        </button>
                      </div>
                    </div>

                    <div className={styles.chartArea}>
                      <div className={styles.barChartDisplay}>
                        {CHART_BARS.map((bar) => (
                          <div key={bar.label} className={styles.chartBarItem}>
                            <div className={styles.chartBarValue}>{bar.value}</div>
                            <div
                              className={styles.chartBar}
                              style={{ height: bar.height, background: bar.color, opacity: bar.opacity }}
                            />
                            <div className={styles.chartBarLabel}>{bar.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.chartFooter}>
                      <span>46 tasks total - Q2 Launch</span>
                      <div className={styles.chartLiveBadge}>
                        <span className={styles.liveDot} />
                        Live - updates as tasks change
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Charts From Questions</div>
            <h2 className={styles.showcaseHeading}>
              Not a text description. An actual <em>interactive chart</em> you can keep.
            </h2>
            <p>
              Ask &quot;show me task breakdown by status for Q2 Launch&quot; and Saria builds a real chart
              block, placed on the page, connected to live data, configurable, and shareable.
            </p>
            <p>
              The AI does not describe the answer. <strong>It builds it.</strong>
            </p>
            <ul className={styles.detailList}>
              <li>Bar, line, pie, and donut charts from natural language</li>
              <li>Charts are live blocks that update as your data changes</li>
              <li>Keep on page, freeze a snapshot, or share directly</li>
              <li>Configure type, grouping, and filters after generation</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Workflow Pages</div>
            <h2 className={styles.showcaseHeading}>
              A dedicated canvas with an AI that <em>never leaves.</em>
            </h2>
            <p>
              Persistent analysis canvases with an always-mounted AI sidebar. Triage data, explore
              patterns, and assemble operational views in a dedicated space that does not clutter
              your project structure.
            </p>
            <ul className={styles.detailList}>
              <li>AI sidebar is always open with no separate panel to launch</li>
              <li>Ask questions and get outputs inserted directly onto the canvas</li>
              <li>Aggregate data from across your workspace into one view</li>
              <li>Saved permanently so you can return any time</li>
            </ul>
          </div>

          <div className={styles.mock}>
            <div className={styles.topbar}>
              <WindowDots />
              <span className={styles.topbarTitle}>Q2 Operations - Workflow Page</span>
              <span className={styles.topbarTitle} style={{ marginLeft: "auto", color: "var(--page-sage)" }}>
                AI always on
              </span>
            </div>

            <div className={styles.workflowLayout}>
              <div className={styles.workflowMain}>
                <div className={styles.workflowTitle}>Q2 Launch - Operations Triage</div>
                <div className={styles.workflowSub}>Generated - Apr 14 - Updated 2 hours ago</div>

                <div className={styles.statRow}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>46</div>
                    <div className={styles.statLabel}>Open Tasks</div>
                    <div className={cx(styles.statDelta, styles.statDeltaDown)}>+ 4 since Mon</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>89%</div>
                    <div className={styles.statLabel}>On Track</div>
                    <div className={cx(styles.statDelta, styles.statDeltaUp)}>+ 3% this week</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>Apr 21</div>
                    <div className={styles.statLabel}>Launch Date</div>
                    <div className={cx(styles.statDelta, styles.statDeltaMuted)}>7 days away</div>
                  </div>
                </div>

                <table className={styles.workflowTable}>
                  <thead>
                    <tr>
                      <th>Owner</th>
                      <th>Tasks</th>
                      <th>Done</th>
                      <th>Blocked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WORKFLOW_ROWS.map(([owner, tasks, done, blocked, accent]) => (
                      <tr key={owner}>
                        <td>{owner}</td>
                        <td>{tasks}</td>
                        <td>{done}</td>
                        <td className={accent ? styles.blockedValue : undefined}>{blocked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.workflowSidebar}>
                <div className={styles.workflowSidebarHead}>
                  <div className={styles.aiBadge}>S</div>
                  <span className={styles.workflowSidebarLabel}>AI Sidebar</span>
                </div>

                <div className={styles.workflowMessages}>
                  <div className={styles.workflowMessageUser}>who has the most blockers?</div>
                  <div className={styles.workflowMessageAi}>
                    <strong>Amna has 2 blocked tasks</strong> - &quot;Ad copy sign-off&quot; and &quot;Meta
                    campaign brief.&quot; Both are waiting on external review. Jamie has 1:
                    &quot;Influencer payment confirmation.&quot;
                  </div>
                  <div className={styles.workflowMessageUser}>build me a table of blocked tasks</div>
                  <div className={styles.workflowMessageAi}>
                    <strong>Done</strong> - table block inserted above. 3 blocked tasks across 2
                    owners.
                  </div>
                </div>

                <input className={styles.workflowInput} placeholder="Ask anything about this page..." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={cx(styles.mock, styles.analysisMock)}>
            <div className={styles.analysisTopbar}>
              <WindowDots />
              <span className={styles.analysisTopbarTitle}>File Analysis - Q2 Creative Audit.pdf</span>
            </div>

            <div className={styles.analysisLayout}>
              <div className={styles.analysisFiles}>
                <div className={styles.analysisFileLabel}>Uploaded files</div>

                {ANALYSIS_FILES.map((file) => (
                  <div
                    key={file.label}
                    className={cx(
                      styles.analysisFileItem,
                      file.active && styles.analysisFileItemActive
                    )}
                  >
                    {file.icon}
                    {file.label}
                  </div>
                ))}

                <div className={cx(styles.analysisFileItem, styles.analysisSaveItem)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="17 1 21 5 17 9" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  </svg>
                  Save as Workflow Page
                </div>
              </div>

              <div className={styles.analysisMain}>
                <div className={cx(styles.analysisMessage, styles.analysisMessageUser)}>
                  <div className={cx(styles.analysisBubble, styles.analysisBubbleUser)}>
                    what are the top gaps in the Q2 creative brief?
                  </div>
                </div>

                <div className={styles.analysisMessage}>
                  <div className={styles.aiBadge}>S</div>
                  <div className={cx(styles.analysisBubble, styles.analysisBubbleAi)}>
                    The brief has <strong>three significant gaps:</strong> no defined success
                    metrics for influencer posts, missing photography dimensions for Meta
                    placements, and no copy approval workflow specified. The tone guidelines are
                    also underspecified, &quot;warm&quot; is mentioned once but not operationalized.
                  </div>
                </div>

                <div className={cx(styles.analysisMessage, styles.analysisMessageUser)}>
                  <div className={cx(styles.analysisBubble, styles.analysisBubbleUser)}>
                    summarize the influencer requirements as a task list
                  </div>
                </div>

                <div className={styles.analysisMessage}>
                  <div className={styles.aiBadge}>S</div>
                  <div className={cx(styles.analysisBubble, styles.analysisBubbleAi)}>
                    <strong>Done - 7 tasks generated</strong> and added to the Q2 Launch project.
                    Includes deliverable formats, deadlines extracted from the brief, and assignee
                    suggestions based on your team&apos;s current load.
                  </div>
                </div>

                <button type="button" className={styles.promoteButton}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                  Promote to Workflow Page
                </button>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>File Analysis -&gt; Saved Artifact</div>
            <h2 className={styles.showcaseHeading}>
              One-off research becomes a <em>living operational reference.</em>
            </h2>
            <p>
              Upload a document, analyze it with AI, then promote the entire analysis thread into a
              saved workflow page. The conversation, the outputs, and the generated tasks all stay
              preserved and linkable.
            </p>
            <ul className={styles.detailList}>
              <li>Upload PDFs, briefs, decks, and research docs</li>
              <li>Ask questions, generate tasks, and extract structured data</li>
              <li>Promote the analysis thread into a persistent page</li>
              <li>Generated tasks go directly into your project</li>
              <li>Saved pages are searchable and shareable</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.modesSection}>
        <div className={styles.modesInner}>
          <div className={styles.modesHeader}>
            <div>
              <div className={styles.monoLabel}>Three Modes, One Surface</div>
              <h2 className={styles.modesHeading}>
                Assistant. Analyst.
                <br />
                <em>Search engine.</em>
              </h2>
            </div>
            <p className={styles.modesDescription}>
              All from the same panel. Switch between conversation, file analysis, and workspace
              search without context-switching. The AI palette remembers where you are and what you
              were doing.
            </p>
          </div>

          <div className={styles.modesUi}>
            <div className={styles.modeTabs}>
              <div className={cx(styles.modeTab, styles.modeTabActive)}>Assistant</div>
              <div className={styles.modeTab}>File Analysis</div>
              <div className={styles.modeTab}>Workspace Search</div>
            </div>

            <div className={styles.modePanel}>
              <div className={styles.modeSection}>
                <div className={styles.modeLabel}>Conversation mode</div>
                <div className={styles.assistantMessages}>
                  <div className={styles.assistantUser}>
                    create 5 tasks for the influencer batch review
                  </div>
                  <div className={styles.assistantAi}>
                    <strong>5 tasks added</strong> to Glow Serum Launch - Influencer Batch tab.
                    Assigned to Sara based on current load.
                  </div>
                  <div className={styles.assistantUser}>what&apos;s due this week?</div>
                  <div className={styles.assistantAi}>
                    4 items due by Friday: <strong>Ad copy sign-off</strong> (Apr 16),{" "}
                    <strong>Photography brief</strong> (Apr 16), <strong>Packaging final</strong>{" "}
                    (Apr 17), <strong>Influencer brief send</strong> (Apr 18).
                  </div>
                </div>
              </div>

              <div className={styles.modeSection}>
                <div className={styles.modeLabel}>File analysis mode</div>
                <div className={styles.fileDrop}>
                  <div className={styles.fileDropIcon}>[ ]</div>
                  <div className={styles.fileDropText}>Drop a file or click to upload</div>
                </div>
                <div className={styles.filePill}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Q2 Creative Audit.pdf - 14 pages
                </div>
                <div className={styles.fileResult}>
                  Summary ready. <strong>3 gaps identified.</strong> 7 tasks generated from
                  influencer requirements.{" "}
                  <span className={styles.fileResultLink}>Promote to Workflow Page -&gt;</span>
                </div>
              </div>

              <div className={styles.modeSection}>
                <div className={styles.modeLabel}>Workspace search mode</div>
                <div className={styles.searchInputRow}>
                  <input className={styles.searchInput} value="influencer brief" readOnly />
                </div>
                {SEARCH_RESULTS.map((result) => (
                  <div key={result.title} className={styles.searchResultItem}>
                    <div
                      className={styles.searchResultIcon}
                      style={{ background: result.background, color: result.color }}
                    >
                      {result.icon}
                    </div>
                    <div>
                      <div className={styles.searchResultText}>
                        <strong>{result.title}</strong>
                      </div>
                      <div className={styles.searchResultMeta}>{result.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aggregateSection}>
        <div className={styles.aggInner}>
          <div className={styles.aggText}>
            <div className={styles.monoLabel}>Search + Aggregate + Build</div>
            <h2 className={styles.aggHeading}>
              Search your workspace.
              <br />
              Turn results into <em>outputs.</em>
            </h2>
            <p>
              The AI can search structured and unstructured data across your workspace, then turn
              results into <strong>tables, charts, or written summaries</strong> directly on the
              page. Analysis and output in one motion.
            </p>
            <ul className={styles.detailList}>
              <li>Searches tasks, tables, docs, files, and Shopify data simultaneously</li>
              <li>Aggregates results into any block type: table, chart, summary</li>
              <li>Output lands on the page, not in a modal and not in a chat thread</li>
              <li>Combine structured and unstructured data in a single query</li>
            </ul>
          </div>

          <div className={styles.pipeline}>
            <div className={styles.pipelineStep}>
              <div className={styles.pipelineNum}>01</div>
              <div className={styles.pipelineContent}>
                <div className={styles.pipelineLabel}>You ask</div>
                <div className={styles.pipelineDetail}>
                  &quot;How did the Glow Serum perform last month - units sold, campaign tasks done,
                  influencer posts delivered&quot;
                </div>
              </div>
            </div>

            <div className={styles.pipelineConnector} />

            <div className={styles.pipelineStep}>
              <div className={styles.pipelineNum}>02</div>
              <div className={styles.pipelineContent}>
                <div className={styles.pipelineLabel}>Saria searches across everything</div>
                <div className={styles.pipelineDetail}>
                  Shopify sales data - Task completion - Influencer deliverable cards - Workspace
                  files
                </div>
              </div>
            </div>

            <div className={styles.pipelineConnector} />

            <div className={styles.pipelineStep}>
              <div className={styles.pipelineNum}>03</div>
              <div className={styles.pipelineContent}>
                <div className={styles.pipelineLabel}>Output lands on the page</div>
                <div className={styles.pipelineOutput}>
                  <div className={styles.pipelineOutputLabel}>Generated - Table block</div>
                  <table className={styles.miniTable}>
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Result</th>
                        <th>vs. Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Units sold</td>
                        <td>1,840</td>
                        <td className={styles.miniUp}>+12%</td>
                      </tr>
                      <tr>
                        <td>Tasks completed</td>
                        <td>34 / 37</td>
                        <td className={styles.miniUp}>92%</td>
                      </tr>
                      <tr>
                        <td>Influencer posts</td>
                        <td>14 / 16</td>
                        <td className={styles.miniDown}>-12%</td>
                      </tr>
                      <tr>
                        <td>Avg. order value</td>
                        <td>$68.40</td>
                        <td className={styles.miniUp}>+4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresHeading}>
            Six ways Saria&apos;s AI <em>acts</em> on your workspace.
          </h2>
          <p className={styles.featuresSub}>
            Not a chatbot bolted on. Intelligence built into the structure of how the work flows.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className={styles.featureCard}>
              <span className={styles.featureTag}>{card.tag}</span>
              <div className={styles.featureIcon}>{card.icon}</div>
              <h3 className={styles.featureTitle}>{card.title}</h3>
              <p className={styles.featureBody}>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.footerInner}>
          <p className={styles.footerHeading}>
            Ready to bring in
            <br />
            <em>your collaborators?</em>
          </p>
          <div className={styles.footerActions}>
            <Link href="/product/collaborate" className={styles.ghostButton}>
              04 - Collaborate
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
