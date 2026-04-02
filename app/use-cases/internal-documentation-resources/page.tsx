import type { ReactNode } from "react";
import Link from "next/link";
import {
  FiCheckSquare,
  FiDatabase,
  FiEdit3,
  FiExternalLink,
  FiFolder,
  FiImage,
  FiLink2,
  FiLock,
  FiList
} from "react-icons/fi";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import base from "../dashboard-visibility/use-case.module.css";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Internal Documentation and Resources | Saria Use Cases",
  description:
    "See how teams keep SOPs, internal resources, docs, and client records in Saria without splitting operations across separate tools.",
  path: "/use-cases/internal-documentation-resources"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/internal-documentation-resources");

type Feature = {
  icon: ReactNode;
  title: string;
  body: ReactNode;
};

type FeatureSectionProps = {
  id: string;
  label: string;
  title: ReactNode;
  lead: ReactNode;
  features: Feature[];
  visual: ReactNode;
  reverse?: boolean;
  callout?: ReactNode;
  calloutWarm?: boolean;
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
      <span className={cx(base.windowDot, base.windowDotRed)} />
      <span className={cx(base.windowDot, base.windowDotYellow)} />
      <span className={cx(base.windowDot, base.windowDotGreen)} />
    </>
  );
}

function MockFrame({ children, sidebar, canvasClassName }: MockFrameProps) {
  return (
    <div className={base.mockScroller}>
      <div className={base.mock}>
        <div className={base.chrome}>
          <WindowDots />
        </div>
        <div className={base.mockBody}>
          {sidebar}
          <div className={cx(base.mockCanvas, canvasClassName)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function FeaturePoint({ icon, title, body }: Feature) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>{icon}</div>
      <div>
        <div className={styles.featureTitle}>{title}</div>
        <div className={styles.featureText}>{body}</div>
      </div>
    </div>
  );
}

function FeatureSection({
  id,
  label,
  title,
  lead,
  features,
  visual,
  reverse,
  callout,
  calloutWarm
}: FeatureSectionProps) {
  return (
    <section id={id} className={base.section}>
      <div className={base.sectionInner}>
        <div className={cx(base.sectionGrid, reverse && base.sectionGridReverse)}>
          <div className={base.sectionCopy}>
            <div className={base.sectionLabel}>{label}</div>
            <h2 className={base.sectionHeading}>{title}</h2>
            <p className={styles.lead}>{lead}</p>
            <div className={styles.featureList}>
              {features.map((feature) => (
                <FeaturePoint
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  body={feature.body}
                />
              ))}
            </div>
            {callout ? (
              <div className={cx(base.callout, calloutWarm && styles.calloutWarm)}>{callout}</div>
            ) : null}
          </div>
          <div className={base.sectionVisual}>{visual}</div>
        </div>
      </div>
    </section>
  );
}

function InternalSpacesVisual() {
  return (
    <MockFrame
      sidebar={
        <div className={base.mockSidebar}>
          <div className={base.sidebarSection}>
            <div className={base.sidebarLabel}>Internal</div>
            <div className={cx(base.sidebarItem, base.sidebarItemActive)}>Brand Guidelines</div>
            <div className={base.sidebarItem}>Team Onboarding</div>
            <div className={base.sidebarItem}>Seasonal Ops</div>
            <div className={base.sidebarItem}>SOPs</div>
          </div>
          <div className={cx(base.sidebarSection, styles.sidebarSectionSpaced)}>
            <div className={base.sidebarLabel}>Brand Guidelines</div>
            <div className={styles.sidebarSubitem}>Visual Identity</div>
            <div className={styles.sidebarSubitem}>Voice &amp; Tone</div>
            <div className={styles.sidebarSubitem}>Asset Library</div>
          </div>
        </div>
      }
      canvasClassName={styles.canvasDense}
    >
      <div className={styles.panelTitle}>Brand Guidelines</div>
      <div className={styles.panelMeta}>Internal · 3 tabs · last updated 2 days ago</div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Visual Identity</div>
        </div>
        <div className={styles.paletteCard}>
          <div className={styles.paletteSwatch} style={{ background: "var(--page-accent)" }} />
          <div className={styles.paletteSwatch} style={{ background: "var(--page-warm)" }} />
          <div className={styles.paletteSwatch} style={{ background: "var(--page-success)" }} />
          <div className={styles.paletteLabel}>Approved palette</div>
        </div>
        <div className={base.blockBodyText}>
          Primary font is the site sans. Use the display face for headlines only. Minimum
          logo clear space is 24px on all sides.
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Quarterly Housekeeping</div>
          <span className={cx(base.badge, base.badgeNeutral)}>Recurring</span>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityHigh)} />
          <div className={cx(base.taskCheck, base.taskCheckDone)} />
          <div className={cx(base.taskName, base.taskNameDone)}>Audit asset library</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityMedium)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Update approved vendor list</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityMedium)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Review onboarding doc</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityLow)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Archive Q1 campaign files</div>
        </div>
      </div>
    </MockFrame>
  );
}

function DocsVisual() {
  return (
    <MockFrame
      sidebar={
        <div className={base.mockSidebar}>
          <div className={base.sidebarSection}>
            <div className={base.sidebarLabel}>Docs</div>
            <div className={cx(base.sidebarItem, base.sidebarItemActive)}>Campaign Launch SOP</div>
            <div className={base.sidebarItem}>Shoot Day Checklist</div>
            <div className={base.sidebarItem}>Influencer Brief Template</div>
            <div className={base.sidebarItem}>Approval Process</div>
          </div>
        </div>
      }
      canvasClassName={styles.canvasCompact}
    >
      <div className={styles.docEditor}>
        <div className={styles.docToolbar}>
          <span className={cx(styles.docTool, styles.docToolActive)}>B</span>
          <span className={cx(styles.docTool, styles.docToolActive, styles.docToolItalic)}>I</span>
          <span className={styles.docTool}>H1</span>
          <span className={cx(styles.docTool, styles.docToolActive)}>H2</span>
          <div className={styles.docDivider} />
          <span className={styles.docTool}>List</span>
          <span className={styles.docTool}>@</span>
          <div className={styles.docDivider} />
          <span className={styles.docTool}>IMG</span>
        </div>

        <div className={styles.docBody}>
          <div className={styles.docH1}>Campaign Launch SOP</div>

          <div className={styles.docH2}>Pre-Launch</div>
          <div className={styles.docP}>
            All creative assets must be approved at least <strong>5 days before go-live</strong>.
            Reference the <span className={styles.docMention}>@ Shoot Checklist block</span> and
            confirm all deliverables are marked complete before briefing the Shopify team.
          </div>

          <div className={styles.docImagePlaceholder}>
            <span className={styles.docImageIcon}>IMG</span>
            <div className={styles.docImageLabel}>Pre-launch timeline - Q2 2024.png</div>
          </div>

          <div className={styles.docH2}>Go-Live Checklist</div>
          <div className={styles.docListItem}>
            <span className={styles.docBullet} />
            <span>PDPs live and linked to collection page</span>
          </div>
          <div className={styles.docListItem}>
            <span className={styles.docBullet} />
            <span>Email scheduled and tested across all segments</span>
          </div>
          <div className={styles.docListItem}>
            <span className={styles.docBullet} />
            <span>Social assets exported and queued</span>
          </div>
          <div className={styles.docListItem}>
            <span className={styles.docBullet} />
            <span>
              Confirm <span className={styles.docMention}>@ Shopify Setup tab</span> tasks are
              complete
            </span>
          </div>

          <div className={styles.docH2}>Post-Launch</div>
          <div className={styles.docP}>
            Performance review at <strong>48 hours and 7 days</strong>. Archive campaign files
            within 2 weeks. Update this doc with any process changes.
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function ClientLogo({
  initials,
  color
}: {
  initials: string;
  color: string;
}) {
  return (
    <div className={styles.clientLogo} style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

function ClientsVisual() {
  return (
    <MockFrame
      sidebar={
        <div className={base.mockSidebar}>
          <div className={base.sidebarSection}>
            <div className={base.sidebarLabel}>Clients</div>
            <div className={cx(base.sidebarItem, base.sidebarItemActive)}>All clients</div>
            <div className={base.sidebarItem}>Active only</div>
          </div>
          <div className={cx(base.sidebarSection, styles.sidebarSectionSpaced)}>
            <div className={base.sidebarLabel}>Recent</div>
            <div className={base.sidebarItem}>Maison Eclat</div>
            <div className={base.sidebarItem}>Verdure Studio</div>
            <div className={base.sidebarItem}>Lune Collective</div>
          </div>
        </div>
      }
      canvasClassName={styles.canvasCompact}
    >
      <div className={styles.clientListLabel}>All Clients · 6</div>

      <div className={styles.clientCard}>
        <ClientLogo initials="ME" color="var(--page-accent)" />
        <div className={styles.clientInfo}>
          <div className={styles.clientName}>Maison Eclat</div>
          <div className={styles.clientMeta}>Luxury skincare · Paris</div>
        </div>
        <span className={cx(base.badge, base.badgeAccent)}>2 active</span>
      </div>

      <div className={styles.clientCard}>
        <ClientLogo initials="VS" color="var(--page-success)" />
        <div className={styles.clientInfo}>
          <div className={styles.clientName}>Verdure Studio</div>
          <div className={styles.clientMeta}>Clean beauty · London</div>
        </div>
        <span className={cx(base.badge, base.badgeSuccess)}>1 active</span>
      </div>

      <div className={cx(styles.clientCard, styles.clientCardActive)}>
        <ClientLogo initials="LC" color="var(--page-violet)" />
        <div className={styles.clientInfo}>
          <div className={styles.clientName}>Lune Collective</div>
          <div className={styles.clientMeta}>Fragrance · NYC</div>
        </div>
        <span className={cx(base.badge, base.badgeViolet)}>Open ↗</span>
      </div>

      <div className={cx(base.block, styles.detailCard)}>
        <div className={styles.detailHeader}>
          <div className={styles.detailTitleWrap}>
            <ClientLogo initials="LC" color="var(--page-violet)" />
            <div className={styles.detailTitle}>Lune Collective</div>
          </div>
          <span className={cx(base.badge, base.badgeWarm)}>In progress</span>
        </div>

        <div className={styles.detailField}>
          <div className={styles.detailLabel}>Company</div>
          <div className={styles.detailValue}>Lune Collective LLC</div>
        </div>
        <div className={styles.detailField}>
          <div className={styles.detailLabel}>Contact</div>
          <div className={styles.detailValue}>Camille Roset · camille@lune.co</div>
        </div>
        <div className={styles.detailField}>
          <div className={styles.detailLabel}>Notes</div>
          <div className={cx(styles.detailValue, styles.detailValueMuted)}>
            Prefers async feedback via Magic Link. Final approvals need CEO sign-off.
          </div>
        </div>
        <div className={styles.detailField}>
          <div className={styles.detailLabel}>Projects</div>
          <div className={styles.detailTags}>
            <span className={cx(base.badge, base.badgeViolet)}>Summer Drop</span>
            <span className={cx(base.badge, base.badgeNeutral)}>Brand Refresh &apos;23</span>
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
            <div className={base.eyebrow}>Internal Docs &amp; Resources</div>
            <h1 className={base.heroHeading}>
              Your SOPs, resources, and client records - <em>all inside Saria</em>
            </h1>
            <p className={base.heroSubhead}>
              Keep your internal operations organized in the same place your work lives. No
              separate wiki, no scattered docs, no context switching.
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

        <div className={base.introStrip}>
          <div className={base.introStripInner}>
            <div className={base.introLabel}>What&apos;s covered</div>
            <p className={base.introText}>
              Saria&apos;s internal layer has three parts: <strong>Internal spaces</strong> -
              projects built exactly like any other project, but scoped to your team&apos;s ops
              work; <strong>Docs</strong> - a dedicated rich-text editor for SOPs, guides, and
              resources, with block references and images; and <strong>Clients</strong> - a
              database of every external partner and brand relationship, each with their own
              detail page.
            </p>
          </div>
        </div>

        <FeatureSection
          id="internal-spaces"
          label="Internal Spaces"
          title={
            <>
              A dedicated space for how your team operates - <em>built like any other
              project</em>
            </>
          }
          lead={
            <>
              Internal spaces are projects scoped to your team&apos;s own operations rather than
              an external campaign. They work exactly the same way - tabs, blocks, tasks,
              timelines, files - just pointed inward.
            </>
          }
          features={[
            {
              icon: <FiFolder />,
              title: "Organize ops work the same way you organize everything else",
              body: (
                <>
                  Create an internal space for Onboarding, one for Brand Guidelines, one for
                  Seasonal Planning - each with its own tabs and blocks. The same structure you
                  use for active projects works just as well for how your team runs itself.
                </>
              )
            },
            {
              icon: <FiCheckSquare />,
              title: "Tasks, timelines, and files - the full block system",
              body: (
                <>
                  Internal spaces have access to every block type. Add a task list for recurring
                  housekeeping, a timeline for quarterly planning cycles, a file block for brand
                  assets, a gallery for approved visual references. Anything you&apos;d put in a
                  project, you can put here.
                </>
              )
            },
            {
              icon: <FiLock />,
              title: "Visible only to your team",
              body: (
                <>
                  Internal spaces are exactly that - internal. They&apos;re never exposed
                  externally and don&apos;t show up in Magic Link views. Your SOPs and internal
                  planning stay separate from what anyone outside your team ever sees.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>One fewer tool.</strong> Most brand ops teams keep their internal processes
              in a separate Notion or Confluence. In Saria, your ops infrastructure lives in the
              same workspace as your active work - same interface, same search, same AI.
            </>
          }
          visual={<InternalSpacesVisual />}
        />

        <FeatureSection
          id="docs"
          label="Docs"
          title={
            <>
              A dedicated doc editor for everything your team needs to <em>write down and
              reference</em>
            </>
          }
          lead={
            <>
              Docs are separate from project tabs - they have their own dedicated rich-text
              editor, built for the kind of content that lives outside of tasks and blocks. SOPs,
              brand guidelines, onboarding guides, process write-ups.
            </>
          }
          features={[
            {
              icon: <FiEdit3 />,
              title: "Rich text that actually feels like a doc",
              body: (
                <>
                  Headings, body text, bold, lists, images - a proper writing environment, not a
                  notes field. Write your launch SOP the same way you&apos;d write it anywhere,
                  and it stays readable and well-structured for whoever references it later.
                </>
              )
            },
            {
              icon: <FiLink2 />,
              title: "Mention blocks directly inside a doc",
              body: (
                <>
                  Reference a specific block - a task list, a timeline, an asset - directly
                  inside your doc text. Your launch SOP can mention the <em>@ Shoot Checklist
                  block</em> or the <em>@ Shopify Setup tab</em> so that the written process and
                  the actual work are always one click apart.
                </>
              )
            },
            {
              icon: <FiImage />,
              title: "Add images inline",
              body: (
                <>
                  Drop images directly into the doc - annotated screenshots, visual references,
                  approved mockups. Useful for anything that needs a visual to make sense: brand
                  guidelines, packaging specs, layout references.
                </>
              )
            }
          ]}
          reverse
          calloutWarm
          callout={
            <>
              <strong>Docs and projects stay connected.</strong> A doc can live inside an
              internal space or alongside a project. Either way, it&apos;s in the same workspace
              - findable by AI search, accessible to your team, and never buried in a Drive
              folder nobody opens.
            </>
          }
          visual={<DocsVisual />}
        />

        <FeatureSection
          id="clients"
          label="Clients"
          title={
            <>
              Every external relationship in one place - <em>with their own page in Saria</em>
            </>
          }
          lead={
            <>
              Clients in Saria aren&apos;t just a name attached to a project. Each client has
              their own dedicated page - a single place to hold everything about that
              relationship.
            </>
          }
          features={[
            {
              icon: <FiDatabase />,
              title: "A database of every external actor",
              body: (
                <>
                  Everyone you work with externally lives in the Clients section - agencies,
                  retail partners, PR contacts, brand collaborators. Browse them as a list,
                  search by name or company, and open any record in seconds.
                </>
              )
            },
            {
              icon: <FiList />,
              title: "Each client has their own detail page",
              body: (
                <>
                  Open any client and you get their full record - contact details, company,
                  notes, and every project they&apos;re linked to. Add context that doesn&apos;t
                  fit anywhere else: how they prefer to communicate, what they&apos;ve approved,
                  what&apos;s still outstanding.
                </>
              )
            },
            {
              icon: <FiExternalLink />,
              title: "Linked to every project they&apos;re part of",
              body: (
                <>
                  When you attach a client to a project, that project shows up on their page. You
                  can see every active and past engagement for that client from one place - no
                  searching, no cross-referencing.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Connected to Magic Links.</strong> Once a client exists in Saria, sharing
              a project view with them is one step - generate a Magic Link, choose what they see,
              and send it. Their feedback comes back into the same record.
            </>
          }
          visual={<ClientsVisual />}
        />

        <section className={base.ctaSection}>
          <div className={base.ctaInner}>
            <div className={base.ctaLabel}>Get started</div>
            <h2 className={base.ctaHeading}>
              Your operations, your docs, your clients - all in the same workspace.
            </h2>
            <p className={base.ctaText}>
              Stop splitting your internal work across tools. Everything your team needs to run
              well lives inside Saria.
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
