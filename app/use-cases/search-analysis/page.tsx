import type { ReactNode } from "react";
import Link from "next/link";
import {
  FiBarChart2,
  FiFileText,
  FiMapPin,
  FiMessageSquare,
  FiPaperclip,
  FiSave,
  FiSearch,
  FiShuffle,
  FiTag
} from "react-icons/fi";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import base from "../dashboard-visibility/use-case.module.css";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Search and Analysis | Saria Use Cases",
  description:
    "See how teams use Saria AI search, workflow pages, and AI analysis to find answers, shape workspace data, and understand what is happening across projects and files.",
  path: "/use-cases/search-analysis"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/search-analysis");

type FeatureItem = {
  title: string;
  body: ReactNode;
  icon: ReactNode;
};

type FeatureSectionProps = {
  id: string;
  label: string;
  title: ReactNode;
  body: ReactNode;
  features: FeatureItem[];
  visual: ReactNode;
  reverse?: boolean;
  callout?: ReactNode;
  calloutTone?: "accent" | "warm";
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

function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className={base.mockScroller}>
      <div className={base.mock}>
        <div className={base.chrome}>
          <WindowDots />
        </div>
        <div className={cx(base.mockBody, styles.mockBody)}>
          <div className={cx(base.mockCanvas, styles.mockCanvas)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function FeatureSection({
  id,
  label,
  title,
  body,
  features,
  visual,
  reverse,
  callout,
  calloutTone = "accent"
}: FeatureSectionProps) {
  return (
    <section id={id} className={base.section}>
      <div className={base.sectionInner}>
        <div className={cx(base.sectionGrid, reverse && base.sectionGridReverse)}>
          <div className={base.sectionCopy}>
            <div className={base.sectionLabel}>{label}</div>
            <h2 className={base.sectionHeading}>{title}</h2>
            <p className={styles.sectionBody}>{body}</p>

            <div className={styles.featureList}>
              {features.map((feature) => (
                <div key={feature.title} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div>
                    <div className={styles.featureTitle}>{feature.title}</div>
                    <div className={styles.featureText}>{feature.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {callout ? (
              <div
                className={cx(base.callout, calloutTone === "warm" && styles.calloutWarm)}
              >
                {callout}
              </div>
            ) : null}
          </div>

          <div className={base.sectionVisual}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

function AssistantTabs({
  active
}: {
  active: "assistant" | "search" | "files";
}) {
  const tabs: Array<{ id: "assistant" | "search" | "files"; label: string }> = [
    { id: "assistant", label: "Assistant" },
    { id: "search", label: "Search" },
    { id: "files", label: "Files" }
  ];

  return (
    <div className={styles.tabRow}>
      {tabs.map((tab) => (
        <div key={tab.id} className={cx(styles.tab, active === tab.id && styles.tabActive)}>
          {tab.label}
        </div>
      ))}
    </div>
  );
}

function Bubble({
  variant,
  children
}: {
  variant: "user" | "assistant";
  children: ReactNode;
}) {
  return (
    <div className={cx(styles.bubble, variant === "user" ? styles.bubbleUser : styles.bubbleAssistant)}>
      {children}
    </div>
  );
}

function Composer({
  placeholder
}: {
  placeholder: string;
}) {
  return (
    <div className={styles.composer}>
      <div className={styles.composerField}>{placeholder}</div>
      <div className={styles.composerButton}>
        <svg viewBox="0 0 8 8" aria-hidden="true">
          <path d="M1 4h6" />
          <path d="M4 1 7 4 4 7" />
        </svg>
      </div>
    </div>
  );
}

function SearchVisual() {
  return (
    <MockFrame>
      <div className={styles.panelLayout}>
        <div className={styles.assistantPane}>
          <AssistantTabs active="search" />
          <div className={styles.messageStack}>
            <Bubble variant="user">Show me everything high priority and overdue</Bubble>
            <Bubble variant="assistant">
              Found <strong>5 items</strong> - tasks, a timeline milestone, and a block. All
              high priority, all past due.
            </Bubble>
            <Bubble variant="user">What did we decide on Summer Drop packaging?</Bubble>
            <Bubble variant="assistant">
              Matte cream, debossed logo. Terra accent on inner sleeve. Copy tone:
              understated luxury. <span className={styles.sourceChip}>Campaign</span>{" "}
              <span className={styles.sourceChip}>Brand Doc</span>
            </Bubble>
          </div>
          <Composer placeholder="Ask anything..." />
        </div>

        <div className={styles.workspacePane}>
          <div className={styles.panelLabel}>High priority - overdue</div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>5 items</div>
              <span className={cx(base.badge, base.badgeDanger)}>High - Overdue</span>
            </div>

            <div className={styles.resultList}>
              {[
                ["Hero shot final selects", "Task", base.badgeWarm],
                ["Copy review - PDP", "Task", base.badgeWarm],
                ["Shoot production", "Timeline", base.badgeAccent],
                ["Logo lockup review", "Block", base.badgeNeutral],
                ["Influencer brief approval", "Block", base.badgeNeutral]
              ].map(([name, type, badgeClass]) => (
                <div key={name} className={styles.resultRow}>
                  <span className={styles.resultDot} />
                  <div className={styles.resultName}>{name}</div>
                  <span className={cx(base.badge, badgeClass)}>{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.citationCard}>
            <div className={styles.citationHeader}>
              <div className={cx(styles.fileGlyph, styles.fileGlyphWarm)}>
                <FiFileText />
              </div>
              <div className={styles.citationTitle}>Campaign Strategy</div>
              <span className={cx(base.badge, styles.badgeWarmSoft)}>Block</span>
            </div>
            <div className={styles.citationQuote}>
              <div className={styles.citationText}>
                &quot;Packaging approved: matte cream, debossed logo, terra accent on inner
                sleeve.&quot;
              </div>
              <div className={styles.citationSource}>Summer Drop - Campaign Tab</div>
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function WorkflowVisual() {
  return (
    <MockFrame>
      <div className={styles.panelLayout}>
        <div className={styles.assistantPane}>
          <div className={styles.assistantHeader}>
            <div className={styles.assistantBadge}>
              <svg viewBox="0 0 8 8" aria-hidden="true">
                <circle cx="4" cy="4" r="3" />
                <path d="M2.5 4h3" />
                <path d="M4 2.5v3" />
              </svg>
            </div>
            <div className={styles.assistantHeaderTitle}>Saria AI</div>
          </div>

          <div className={styles.messageStack}>
            <Bubble variant="user">Show me task load by person across all projects</Bubble>
            <Bubble variant="assistant">
              Table on the canvas - open tasks per person, all active projects.
            </Bubble>
            <Bubble variant="user">Now just overdue as a chart</Bubble>
            <Bubble variant="assistant">Done - overdue chart added below.</Bubble>
            <Bubble variant="user">Mark Summer Drop as at risk</Bubble>
            <Bubble variant="assistant">
              <strong>Summer Drop</strong> updated to At Risk.
            </Bubble>
          </div>

          <Composer placeholder="Ask or tell Saria..." />
        </div>

        <div className={styles.workspacePane}>
          <div className={styles.panelLabel}>Canvas</div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>Task Load - All Projects</div>
              <span className={cx(base.badge, base.badgeNeutral)}>by person</span>
            </div>

            <div className={styles.tableHeader}>
              <div>Person</div>
              <div>Open</div>
              <div>Overdue</div>
            </div>

            {[
              ["MP", "#6f63c7", "Mia P.", "8", "1"],
              ["SL", "#b97431", "Sam L.", "6", "3"],
              ["RN", "#3f7b53", "Rosa N.", "5", "0"]
            ].map(([initials, color, name, open, overdue]) => (
              <div key={name} className={styles.tableRow}>
                <div className={styles.personCell}>
                  <span className={styles.avatar} style={{ backgroundColor: color }}>
                    {initials}
                  </span>
                  {name}
                </div>
                <div className={styles.metricCell}>{open}</div>
                <div className={cx(styles.metricCell, overdue === "0" ? styles.metricMuted : styles.metricWarm)}>
                  {overdue}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>Overdue by Person</div>
              <span className={cx(base.badge, base.badgeDanger)}>chart</span>
            </div>

            {[
              ["Sam L.", "75%", styles.chartWarm, "3"],
              ["Mia P.", "25%", styles.chartGold, "1"],
              ["Rosa N.", "0%", styles.chartEmpty, "0"]
            ].map(([label, width, fillClass, value]) => (
              <div key={label} className={styles.chartRow}>
                <div className={styles.chartLabel}>{label}</div>
                <div className={styles.chartTrack}>
                  <div className={cx(styles.chartFill, fillClass)} style={{ width }} />
                </div>
                <div className={styles.chartValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function AnalysisVisual() {
  return (
    <MockFrame>
      <div className={styles.panelLayout}>
        <div className={styles.assistantPane}>
          <AssistantTabs active="assistant" />
          <div className={styles.messageStack}>
            <Bubble variant="user">Analyze the health of all active projects</Bubble>
            <Bubble variant="assistant">
              <strong>Summer Drop</strong> is at risk - shoot is 3 days late and blocks copy.{" "}
              <strong>Brand Refresh</strong> is on track. <strong>Hydration Q2</strong> is
              clear with no overdue work.
            </Bubble>
            <Bubble variant="user">What&apos;s in the supplier brief?</Bubble>
            <Bubble variant="assistant">
              MOQ: <strong>500 standard</strong>, <strong>1,000 debossed</strong>. Lead time
              6-8 weeks. Rush surcharge 15%. <span className={styles.sourceChip}>p.7</span>
            </Bubble>
          </div>
          <Composer placeholder="Analyze anything..." />
        </div>

        <div className={styles.workspacePane}>
          <div className={styles.panelLabel}>Project Health</div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>Active Projects - Summary</div>
            </div>

            <div className={styles.summaryList}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryTop}>
                  <div className={styles.summaryName}>Summer Drop</div>
                  <span className={cx(base.badge, base.badgeDanger)}>At risk</span>
                </div>
                <div className={styles.summaryText}>
                  Shoot 3d late - blocks copy review. Go-live at risk if not resolved today.
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryTop}>
                  <div className={styles.summaryName}>Brand Refresh</div>
                  <span className={cx(base.badge, base.badgeWarm)}>On track</span>
                </div>
                <div className={styles.summaryText}>
                  1 overdue item, low priority. No blockers.
                </div>
              </div>

              <div className={styles.summaryItemLast}>
                <div className={styles.summaryTop}>
                  <div className={styles.summaryName}>Hydration Q2</div>
                  <span className={cx(base.badge, base.badgeSuccess)}>Clear</span>
                </div>
                <div className={styles.summaryText}>No overdue work. All tasks assigned.</div>
              </div>
            </div>
          </div>

          <div className={styles.fileChipRow}>
            <div className={cx(styles.fileGlyph, styles.fileGlyphDanger)}>
              <FiFileText />
            </div>
            <div className={styles.fileChipName}>Supplier_Brief_Q2.pdf</div>
            <div className={styles.fileChipMeta}>24pp - analyzed</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>Key Terms - from file</div>
            </div>

            {[
              { label: "MOQ debossed", value: "1,000 units", warm: false },
              { label: "Lead time", value: "6-8 weeks", warm: false },
              { label: "Rush surcharge", value: "+15%", warm: true }
            ].map(({ label, value, warm }, index) => (
              <div
                key={label}
                className={cx(styles.termRow, index === 2 && styles.termRowLast)}
              >
                <div className={styles.termLabel}>{label}</div>
                <div className={cx(styles.termValue, warm && styles.termValueWarm)}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockFrame>
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
            <div className={base.eyebrow}>Search &amp; Analysis</div>
            <h1 className={base.heroHeading}>
              Ask anything. <em>Saria knows.</em>
            </h1>
            <p className={base.heroSubhead}>
              Search your workspace, analyze your data, and understand what&apos;s going on
              without leaving Saria.
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
            <div className={base.introLabel}>What&apos;s covered</div>
            <p className={base.introText}>
              Three ways to find and understand your work: <strong>AI search</strong> - ask a
              question, get an answer with sources; <strong>workflow pages</strong> - a canvas
              where you talk to Saria&apos;s AI and shape your data any way you need; and{" "}
              <strong>AI analysis</strong> - analyze anything in your workspace, from files to
              projects to your entire team&apos;s workload.
            </p>
          </div>
        </section>

        <FeatureSection
          id="ai-search"
          label="AI Search"
          title={
            <>
              Ask about your work. <em>Get an answer.</em>
            </>
          }
          body={
            <>
              Saria reads everything in your workspace - tasks, docs, blocks, files,
              comments - and gives you a direct answer to whatever you ask. Not a list of
              results. An actual answer, with sources.
            </>
          }
          features={[
            {
              title: "Everything is already tagged and queryable",
              body: (
                <>
                  Priority, due date, assignee, and status live on everything in Saria, not
                  just tasks. So you can ask <em>&quot;show me everything high priority and overdue&quot;</em>{" "}
                  and get back tasks, timeline events, and blocks all at once. No filter
                  setup, no custom view needed.
                </>
              ),
              icon: <FiTag />
            },
            {
              title: "It reads meaning, not just keywords",
              body: (
                <>
                  Ask <em>&quot;what did we decide about Summer Drop packaging?&quot;</em> and Saria
                  finds the right content even if those exact words do not appear anywhere.
                  It understands what you are asking across your blocks, docs, comments, and
                  files.
                </>
              ),
              icon: <FiSearch />
            },
            {
              title: "Every answer cites its source",
              body: (
                <>
                  Answers link back to the block, doc, or file they came from - clickable,
                  one tap away. You never have to wonder whether what Saria told you is still
                  accurate.
                </>
              ),
              icon: <FiPaperclip />
            }
          ]}
          visual={<SearchVisual />}
        />

        <FeatureSection
          id="workflow-pages"
          label="Workflow Pages"
          reverse
          title={
            <>
              Your data, <em>shaped however you need it</em>
            </>
          }
          body={
            <>
              A workflow page is a blank canvas with Saria&apos;s AI alongside it. Describe
              what you want to see and it builds it right there - a table, a chart, a
              breakdown, a summary. Keep pushing until it looks exactly right.
            </>
          }
          features={[
            {
              title: "Describe it, get it",
              body: (
                <>
                  Say <em>&quot;table of every overdue task by project&quot;</em> or{" "}
                  <em>&quot;how is work spread across the team this week&quot;</em> and it appears on
                  the canvas. No filters to configure, no report builder to navigate.
                </>
              ),
              icon: <FiMessageSquare />
            },
            {
              title: "Refine through conversation",
              body: (
                <>
                  <em>&quot;Break that down by priority.&quot;</em> <em>&quot;Turn this into a chart.&quot;</em>{" "}
                  <em>&quot;Only urgent ones.&quot;</em> The canvas updates as you go. You are shaping
                  the output in real time, not starting over each time.
                </>
              ),
              icon: <FiShuffle />
            },
            {
              title: "Keep it or move on",
              body: (
                <>
                  Anything on the canvas is a real block - pin it to your dashboard, drop it
                  into a project tab, or just use it once and close the page. Nothing stays
                  unless you want it to.
                </>
              ),
              icon: <FiMapPin />
            }
          ]}
          callout={
            <>
              <strong>It acts, not just answers.</strong> Tell Saria to update a task,
              reassign work, or change a project status from the same canvas. Understanding
              your work and acting on it happen in the same place.
            </>
          }
          calloutTone="warm"
          visual={<WorkflowVisual />}
        />

        <FeatureSection
          id="ai-analysis"
          label="AI Analysis"
          title={
            <>
              Analyze anything - <em>your projects, your team, your files</em>
            </>
          }
          body={
            <>
              Saria&apos;s AI does not just find things. It reads and analyzes everything in
              your workspace - your project data, your team&apos;s workload, your uploaded
              files - and tells you what is actually going on.
            </>
          }
          features={[
            {
              title: "Analyze your workspace data",
              body: (
                <>
                  Ask Saria to analyze anything - how a project is progressing, where your
                  team is stretched, which projects are at risk, what has fallen through the
                  cracks. It reads across all your projects and gives you a real picture, not
                  a raw data dump.
                </>
              ),
              icon: <FiBarChart2 />
            },
            {
              title: "Read what&apos;s inside your files",
              body: (
                <>
                  Upload a brief, a contract, a supplier spec, a rate card, and ask what is
                  inside instead of reading through it yourself. Ask{" "}
                  <em>&quot;what&apos;s the MOQ for debossed packaging?&quot;</em> and get the answer
                  with a citation to the exact page. Works with PDFs, Word docs, spreadsheets,
                  and text files.
                </>
              ),
              icon: <FiFileText />
            },
            {
              title: "Save what&apos;s useful",
              body: (
                <>
                  Any analysis becomes a block - drop it onto a project canvas, attach it as
                  a comment, or open it in a workflow page to keep going. Files you upload
                  stay part of your workspace knowledge, so AI search can find them later too.
                </>
              ),
              icon: <FiSave />
            }
          ]}
          callout={
            <>
              <strong>There&apos;s no limit to what you can analyze.</strong> If it is in your
              workspace - a comment thread, a project timeline, a doc, a spreadsheet, a task
              list - Saria can read it, analyze it, and tell you what it means.
            </>
          }
          visual={<AnalysisVisual />}
        />

        <section className={base.ctaSection}>
          <div className={base.ctaInner}>
            <div className={base.ctaLabel}>Get Started</div>
            <h2 className={base.ctaHeading}>Search it. Analyze it. Understand it.</h2>
            <p className={base.ctaText}>
              Everything in your workspace is readable and queryable from day one. No setup
              required.
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
