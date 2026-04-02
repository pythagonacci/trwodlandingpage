import type { ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import base from "../dashboard-visibility/use-case.module.css";
import { getUseCaseLinks } from "../links";
import styles from "./use-case.module.css";

export const metadata = createPageMetadata({
  title: "Team and Task Management | Saria Use Cases",
  description:
    "See how teams manage people, ownership, comments, permissions, and Slack-connected execution in Saria.",
  path: "/use-cases/team-task-management"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/team-task-management");

type Feature = {
  icon: ReactNode;
  title: string;
  body: ReactNode;
};

type FeatureSectionProps = {
  id: string;
  label: string;
  title: ReactNode;
  features: Feature[];
  visual: ReactNode;
  reverse?: boolean;
  lead?: ReactNode;
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
  features,
  visual,
  reverse,
  lead,
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
            {lead ? <p className={styles.lead}>{lead}</p> : null}
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

function Avatar({
  initials,
  color,
  large
}: {
  initials: string;
  color: string;
  large?: boolean;
}) {
  return (
    <div
      className={cx(styles.avatar, large && styles.avatarLarge)}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function AiSparkIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 1 6.5 4H9.5L7 6 8 9 5 7.5 2 9 3 6 .5 4H3.5L5 1Z" />
    </svg>
  );
}

function TeamSectionVisual() {
  return (
    <MockFrame
      sidebar={
        <div className={base.mockSidebar}>
          <div className={base.sidebarSection}>
            <div className={base.sidebarLabel}>Workspace</div>
            <div className={base.sidebarItem}>Dashboard</div>
            <div className={base.sidebarItem}>Projects</div>
            <div className={cx(base.sidebarItem, base.sidebarItemActive)}>Members</div>
            <div className={base.sidebarItem}>Settings</div>
          </div>
        </div>
      }
      canvasClassName={styles.canvasDense}
    >
      <div className={styles.panelTitle}>Members</div>

      <div className={styles.teamGroup}>
        <div className={styles.teamGroupHeader}>
          <div className={styles.teamName}>Creative</div>
          <div className={styles.avatarStack}>
            <Avatar initials="MP" color="#6f63c7" />
            <Avatar initials="SL" color="#b97431" />
            <Avatar initials="JK" color="#1d4ed8" />
          </div>
        </div>
        <div className={styles.teamMeta}>3 members · access to Campaign, Brand Refresh</div>
      </div>

      <div className={styles.teamGroup}>
        <div className={styles.teamGroupHeader}>
          <div className={styles.teamName}>Growth</div>
          <div className={styles.avatarStack}>
            <Avatar initials="RN" color="#3f7b53" />
            <Avatar initials="AK" color="#da7b4c" />
          </div>
        </div>
        <div className={styles.teamMeta}>2 members · access to all projects</div>
      </div>

      <div className={styles.panelDivider} />

      <div className={styles.panelLabel}>All Members</div>
      <div className={base.block}>
        <div className={styles.memberRow}>
          <Avatar initials="MP" color="#6f63c7" large />
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>Mia P.</div>
            <div className={styles.memberMeta}>Admin · Creative</div>
          </div>
          <span className={cx(base.badge, base.badgeNeutral)}>5 tasks</span>
        </div>
        <div className={styles.memberRow}>
          <Avatar initials="JK" color="#1d4ed8" large />
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>Jade K.</div>
            <div className={styles.memberMeta}>Member · Creative</div>
          </div>
          <span className={cx(base.badge, base.badgeNeutral)}>3 tasks</span>
        </div>
        <div className={styles.memberRow}>
          <Avatar initials="RN" color="#3f7b53" large />
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>Rosa N.</div>
            <div className={styles.memberMeta}>Member · Growth</div>
          </div>
          <span className={cx(base.badge, base.badgeNeutral)}>7 tasks</span>
        </div>
        <div className={styles.memberRow}>
          <Avatar initials="SL" color="#b97431" large />
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>Sam L.</div>
            <div className={styles.memberMeta}>Member · Creative</div>
          </div>
          <span className={cx(base.badge, base.badgeWarm)}>2 overdue</span>
        </div>
      </div>
    </MockFrame>
  );
}

function OwnershipVisual() {
  return (
    <MockFrame canvasClassName={styles.canvasDense}>
      <div className={styles.topMeta}>
        <div className={styles.panelTitle}>Summer Drop - Campaign Tab</div>
        <div className={styles.panelMeta}>Creative · 8 tasks</div>
      </div>

      <div className={styles.filterBar}>
        <span className={cx(styles.filterChip, styles.filterChipActive)}>All</span>
        <span className={styles.filterChip}>Mia P.</span>
        <span className={styles.filterChip}>Jade K.</span>
        <span className={styles.filterChip}>Urgent</span>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Campaign Tasks</div>
          <span className={cx(base.badge, base.badgeWarm)}>2 overdue</span>
        </div>

        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityUrgent)} />
          <div className={cx(base.taskCheck, base.taskCheckDone)} />
          <div className={cx(base.taskName, base.taskNameDone)}>Brief to creative team</div>
          <Avatar initials="MP" color="#6f63c7" />
          <div className={base.taskDue}>Done</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityUrgent)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Hero shot final selects</div>
          <Avatar initials="SL" color="#b97431" />
          <div className={cx(base.taskDue, base.taskDueLate)}>2 days late</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityHigh)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Copy review - PDP + emails</div>
          <Avatar initials="JK" color="#1d4ed8" />
          <div className={cx(base.taskDue, base.taskDueLate)}>Yesterday</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityHigh)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Approve colour grading</div>
          <Avatar initials="MP" color="#6f63c7" />
          <div className={base.taskDue}>Today · 3 pm</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityMedium)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Upload assets to Drive</div>
          <Avatar initials="RN" color="#3f7b53" />
          <div className={base.taskDue}>Tomorrow</div>
        </div>
        <div className={base.taskRow}>
          <div className={cx(base.taskPriority, base.priorityLow)} />
          <div className={base.taskCheck} />
          <div className={base.taskName}>Archive v1 mood board</div>
          <Avatar initials="JK" color="#1d4ed8" />
          <div className={base.taskDue}>Jun 14</div>
        </div>
      </div>
    </MockFrame>
  );
}

function VisibilityVisual() {
  return (
    <MockFrame canvasClassName={styles.canvasDense}>
      <div className={styles.aiPromptCard}>
        <div className={styles.aiPromptHeader}>
          <div className={styles.aiPromptIcon}>
            <AiSparkIcon />
          </div>
          <div className={styles.aiPromptTitle}>Saria AI</div>
        </div>
        <div className={styles.aiPromptText}>
          &quot;Who has overdue work on Summer Drop, broken down by person?&quot;
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Overdue · Summer Drop</div>
          <span className={cx(base.badge, styles.badgeCritical)}>by assignee</span>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricHead}>
            <div className={styles.metricPerson}>
              <Avatar initials="SL" color="#b97431" />
              <span>Sam L.</span>
            </div>
            <span className={styles.metricValue}>3</span>
          </div>
          <div className={styles.metricTrack}>
            <div className={cx(styles.metricFill, styles.metricFillWarm)} style={{ width: "75%" }} />
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricHead}>
            <div className={styles.metricPerson}>
              <Avatar initials="JK" color="#1d4ed8" />
              <span>Jade K.</span>
            </div>
            <span className={styles.metricValue}>2</span>
          </div>
          <div className={styles.metricTrack}>
            <div
              className={cx(styles.metricFill, styles.metricFillAccent)}
              style={{ width: "50%" }}
            />
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricHead}>
            <div className={styles.metricPerson}>
              <Avatar initials="MP" color="#6f63c7" />
              <span>Mia P.</span>
            </div>
            <span className={styles.metricMuted}>0</span>
          </div>
          <div className={styles.metricTrack}>
            <div className={cx(styles.metricFill, styles.metricFillNeutral)} style={{ width: "6%" }} />
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricHead}>
            <div className={styles.metricPerson}>
              <Avatar initials="RN" color="#3f7b53" />
              <span>Rosa N.</span>
            </div>
            <span className={styles.metricValue}>1</span>
          </div>
          <div className={styles.metricTrack}>
            <div
              className={cx(styles.metricFill, styles.metricFillGold)}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Work Load · All Projects</div>
          <span className={cx(base.badge, base.badgeAccent)}>by team</span>
        </div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <strong>11</strong>
            <span>Creative</span>
            <small>3 overdue</small>
          </div>
          <div className={cx(styles.summaryCard, styles.summaryCardSuccess)}>
            <strong>7</strong>
            <span>Growth</span>
            <small>0 overdue</small>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function StructureVisual() {
  return (
    <MockFrame
      sidebar={
        <div className={base.mockSidebar}>
          <div className={base.sidebarSection}>
            <div className={base.sidebarLabel}>Summer Drop</div>
            <div className={cx(base.sidebarItem, base.sidebarItemActive)}>Overview</div>
            <div className={base.sidebarItem}>Strategy</div>
            <div className={base.sidebarItem}>Campaign</div>
            <div className={styles.sidebarSubitem}>Copy</div>
            <div className={styles.sidebarSubitem}>Shoot</div>
            <div className={base.sidebarItem}>Shopify</div>
            <div className={base.sidebarItem}>Launch Day</div>
          </div>
        </div>
      }
      canvasClassName={styles.canvasDense}
    >
      <div className={styles.headerRow}>
        <div>
          <div className={styles.panelTitle}>Summer Drop</div>
          <div className={styles.panelMeta}>16 open tasks · 4 tabs</div>
        </div>
        <span className={cx(base.badge, base.badgeWarm)}>In Progress</span>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Timeline</div>
          <span className={cx(base.badge, base.badgeNeutral)}>Jun - Jul</span>
        </div>
        <div className={styles.timelineEvent}>
          <div className={cx(styles.timelineBar, styles.timelineBarAccent)} />
          <div className={styles.timelineName}>Creative brief + kickoff</div>
          <Avatar initials="MP" color="#6f63c7" />
          <div className={styles.timelineDates}>Jun 3 - 6</div>
        </div>
        <div className={styles.timelineEvent}>
          <div className={cx(styles.timelineBar, styles.timelineBarWarm)} />
          <div className={styles.timelineName}>Shoot production</div>
          <Avatar initials="SL" color="#b97431" />
          <div className={styles.timelineDates}>Jun 10 - 17</div>
        </div>
        <div className={styles.timelineEvent}>
          <div className={cx(styles.timelineBar, styles.timelineBarGold)} />
          <div className={styles.timelineName}>Copy + PDP review</div>
          <Avatar initials="JK" color="#1d4ed8" />
          <div className={styles.timelineDates}>Jun 18 - 21</div>
        </div>
        <div className={styles.timelineEvent}>
          <div className={cx(styles.timelineBar, styles.timelineBarSuccess)} />
          <div className={styles.timelineName}>Go live</div>
          <Avatar initials="RN" color="#3f7b53" />
          <div className={styles.timelineDates}>Jul 1</div>
        </div>
      </div>

      <div className={styles.aiInsightCard}>
        <div className={styles.aiPromptHeader}>
          <div className={styles.aiPromptIcon}>
            <AiSparkIcon />
          </div>
          <div className={styles.aiPromptTitle}>Saria AI</div>
        </div>
        <div className={styles.aiInsightText}>
          Shoot production is <strong>3 days behind</strong>. Copy review depends on final selects
          - if shoot slips further, <span className={styles.inlineHighlight}>go-live is at risk</span>.
          Consider pulling in a second reviewer.
        </div>
      </div>
    </MockFrame>
  );
}

function CommentsVisual() {
  return (
    <MockFrame canvasClassName={styles.canvasDense}>
      <div className={styles.panelTitle}>Hero Campaign Shot - Comments</div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Comments</div>
          <span className={cx(base.badge, base.badgeAccent)}>3</span>
        </div>
        <div className={styles.commentItem}>
          <Avatar initials="SL" color="#b97431" />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>Sam L.</span>
              <span className={styles.commentRef}>· 10 min ago</span>
            </div>
            <div className={styles.commentText}>
              v3 uploaded - crop is fixed and background is warmer. Ready for review.
            </div>
          </div>
        </div>
        <div className={styles.commentItem}>
          <Avatar initials="MP" color="#6f63c7" />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>Mia P.</span>
              <span className={styles.commentRef}>· 5 min ago</span>
            </div>
            <div className={styles.commentText}>
              Looks great. <span className={styles.mention}>@Jade K.</span> can you check the colour
              grading against the brand board before we send to client?
            </div>
          </div>
        </div>
        <div className={styles.commentItem}>
          <Avatar initials="JK" color="#1d4ed8" />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>Jade K.</span>
              <span className={styles.commentRef}>· 2 min ago</span>
            </div>
            <div className={styles.commentText}>
              On it - checking now against <span className={styles.mention}>@Brand Board tab</span>.
            </div>
          </div>
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Project Overview · Team Comments</div>
        </div>
        <div className={styles.commentItem}>
          <Avatar initials="RN" color="#3f7b53" />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>Rosa N.</span>
              <span className={styles.commentRef}>· Shopify Setup · 1 hr</span>
            </div>
            <div className={styles.commentText}>
              Collection page staged - need final inventory before publishing.
            </div>
          </div>
        </div>
        <div className={styles.commentItem}>
          <Avatar initials="CL" color="#da7b4c" />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>Client</span>
              <span className={cx(styles.commentRef, styles.commentRefWarm)}>
                · external · Campaign Tab
              </span>
            </div>
            <div className={styles.commentText}>
              Colour direction approved. Love the warmer tone.
            </div>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function SlackVisual() {
  return (
    <MockFrame canvasClassName={styles.slackCanvas}>
      <div className={styles.slackHeader}>
        <div className={styles.slackHash}>#</div>
        <div className={styles.slackChannel}>brand-team</div>
      </div>

      <div className={styles.slackMessage}>
        <div className={cx(styles.slackAvatar, styles.slackAvatarViolet)}>MP</div>
        <div className={styles.slackContent}>
          <div className={styles.slackMeta}>
            <div className={styles.slackName}>Mia P.</div>
            <div className={styles.slackTime}>11:03 AM</div>
          </div>
          <div className={styles.slackText}>@trak what&apos;s overdue on Summer Drop right now?</div>
        </div>
      </div>

      <div className={styles.slackMessage}>
        <div className={cx(styles.slackAvatar, styles.slackAvatarAccent)}>T</div>
        <div className={styles.slackContent}>
          <div className={styles.slackMeta}>
            <div className={styles.slackName}>Saria</div>
            <div className={styles.slackAppBadge}>APP</div>
            <div className={styles.slackTime}>11:03 AM</div>
          </div>
          <div className={styles.slackText}>
            2 tasks overdue on <span className={styles.trakRef}>Summer Drop</span>:
            <br />• <strong>Hero shot final selects</strong> - Sam L. · 2 days late
            <br />• <strong>Copy review - PDP + emails</strong> - Jade K. · due yesterday
          </div>
        </div>
      </div>

      <div className={styles.slackMessage}>
        <div className={cx(styles.slackAvatar, styles.slackAvatarWarm)}>SL</div>
        <div className={styles.slackContent}>
          <div className={styles.slackMeta}>
            <div className={styles.slackName}>Sam L.</div>
            <div className={styles.slackTime}>11:05 AM</div>
          </div>
          <div className={styles.slackText}>
            sorry - uploading now, should be done today. @trak mark &quot;Hero shot final selects&quot;
            as high priority and move due date to today.
          </div>
        </div>
      </div>

      <div className={styles.slackMessage}>
        <div className={cx(styles.slackAvatar, styles.slackAvatarAccent)}>T</div>
        <div className={styles.slackContent}>
          <div className={styles.slackMeta}>
            <div className={styles.slackName}>Saria</div>
            <div className={styles.slackAppBadge}>APP</div>
            <div className={styles.slackTime}>11:05 AM</div>
          </div>
          <div className={styles.slackText}>
            Done - <span className={styles.trakRef}>Hero shot final selects</span> updated to{" "}
            <strong>High priority</strong>, due date moved to today.
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

function PermissionsVisual() {
  return (
    <MockFrame canvasClassName={styles.canvasDense}>
      <div className={styles.panelTitle}>Summer Drop - Permissions</div>
      <div className={styles.panelMeta}>Configure who can access this project</div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Teams</div>
        </div>
        <div className={styles.permissionRow}>
          <div className={cx(styles.teamPill, styles.teamPillViolet)}>CR</div>
          <div className={styles.permissionName}>Creative</div>
          <span className={cx(base.badge, base.badgeAccent)}>View + Edit</span>
          <div className={cx(styles.permissionToggle, styles.permissionToggleOn)}>
            <div className={styles.permissionThumb} />
          </div>
        </div>
        <div className={styles.permissionRow}>
          <div className={cx(styles.teamPill, styles.teamPillSuccess)}>GR</div>
          <div className={styles.permissionName}>Growth</div>
          <span className={cx(base.badge, base.badgeSuccess)}>View only</span>
          <div className={cx(styles.permissionToggle, styles.permissionToggleOn)}>
            <div className={styles.permissionThumb} />
          </div>
        </div>
        <div className={styles.permissionRow}>
          <div className={cx(styles.teamPill, styles.teamPillWarm)}>OP</div>
          <div className={styles.permissionName}>Ops</div>
          <span className={cx(base.badge, base.badgeNeutral)}>No access</span>
          <div className={styles.permissionToggle}>
            <div className={styles.permissionThumb} />
          </div>
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Individuals</div>
        </div>
        <div className={styles.permissionRow}>
          <Avatar initials="SL" color="#b97431" />
          <div className={styles.permissionName}>
            Sam L. <span className={styles.permissionMeta}>· Freelancer</span>
          </div>
          <span className={cx(base.badge, base.badgeWarm)}>Campaign tab only</span>
          <div className={cx(styles.permissionToggle, styles.permissionToggleOn)}>
            <div className={styles.permissionThumb} />
          </div>
        </div>
      </div>

      <div className={base.block}>
        <div className={base.blockHeader}>
          <div className={base.blockType}>Magic Link</div>
          <span className={cx(base.badge, base.badgeWarm)}>Active</span>
        </div>
        <div className={base.blockBodyText}>
          Client-facing view · Campaign tab visible · Comments enabled
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
            <div className={base.eyebrow}>Team &amp; Task Management</div>
            <h1 className={base.heroHeading}>
              One place for your team, your work, and <em>what needs to happen next</em>
            </h1>
            <p className={base.heroSubhead}>
              How Saria keeps brand teams aligned - who&apos;s doing what, what&apos;s overdue, and
              how to move work forward without the back-and-forth.
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
              Saria&apos;s team layer has four parts: <strong>your people</strong> (a dedicated
              members page, workspace roles, and named teams), <strong>task ownership</strong>{" "}
              (assignees, priorities, due dates, and deadlines that surface everywhere),{" "}
              <strong>structured work</strong> (task blocks, timelines, and project canvases that
              make work visible), and <strong>how the team communicates</strong> (inline comments,
              mentions, and a Slack bot connected to the same data).
            </p>
          </div>
        </section>

        <FeatureSection
          id="people"
          label="Your people"
          title={
            <>
              Set up your workspace once - <em>everyone knows what they can touch</em>
            </>
          }
          features={[
            {
              icon: "👥",
              title: "A dedicated members page",
              body: (
                <>
                  Every workspace has a Members page where you can see everyone on the team, their
                  role, and manage access in one place. No digging through settings - it&apos;s
                  always a click away.
                </>
              )
            },
            {
              icon: "🔑",
              title: "Workspace roles and project-level permissions",
              body: (
                <>
                  Assign roles at the workspace level (owner, admin, member). Then go further -{" "}
                  <strong>configure access per project</strong> so that, say, your creative agency
                  can only see the Campaign project and nothing else. Permissions are both broad
                  and surgical.
                </>
              )
            },
            {
              icon: "🏷️",
              title: "Teams - groups you assign and configure together",
              body: (
                <>
                  Create named teams (Creative, Growth, Ops) and add members to them. You can
                  assign tasks, configure project access, and manage permissions at the team level
                  - so adding a new designer to the Creative team gives them the right access
                  immediately.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Why it matters:</strong> D2C brand teams wear a lot of hats. Someone might be
              creative lead on one project and a reviewer on another. Teams + project permissions
              means the right people see the right work without anyone getting lost in someone
              else&apos;s backlog.
            </>
          }
          visual={<TeamSectionVisual />}
        />

        <FeatureSection
          id="ownership"
          label="Ownership"
          reverse
          title={
            <>
              Assign ownership to <em>anything - not just tasks</em>
            </>
          }
          features={[
            {
              icon: "👤",
              title: "Assignees are a universal property",
              body: (
                <>
                  In most tools, only tasks have owners. In Saria, <strong>any block can have an assignee</strong> -
                  a task, a timeline milestone, a file review, a gallery, a section of work. If
                  something needs to get done, someone can own it, regardless of what kind of block
                  it is.
                </>
              )
            },
            {
              icon: "✅",
              title: "Priority and due dates travel with ownership",
              body: (
                <>
                  Assignees come paired with due dates and priority levels - urgent, high, medium,
                  low - on every block that supports them. These aren&apos;t decorative.
                  They&apos;re what the dashboard uses to surface what&apos;s overdue, due today,
                  and due soon across your whole workspace.
                </>
              )
            },
            {
              icon: "🔍",
              title: "Nothing without an owner falls through the cracks",
              body: (
                <>
                  Because ownership isn&apos;t limited to a task list, your team can assign the
                  shoot brief, the asset gallery, the timeline event, and the launch checklist -
                  and have all of it surface in the right dashboards and overviews automatically.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Think of it this way:</strong> a task is one type of work. But a shoot block,
              a mood board, a copy doc, a timeline event - those are work too. In Saria, any of
              them can have an owner, a deadline, and a priority. Your team&apos;s accountability
              layer isn&apos;t confined to a checklist.
            </>
          }
          visual={<OwnershipVisual />}
        />

        <FeatureSection
          id="visibility"
          label="Team visibility"
          reverse
          title={
            <>
              Ask Saria who&apos;s carrying what - <em>scoped exactly to what you need to know</em>
            </>
          }
          lead={
            <>
              Once your team has ownership across work, you can ask Saria to surface it as a chart
              - by person, by project, by priority, by status. No setup, no exports. Just describe
              the question and the answer appears.
            </>
          }
          features={[
            {
              icon: "💬",
              title: "Ask in plain language",
              body: (
                <>
                  Type <em>&quot;who has overdue work on Summer Drop?&quot;</em> or{" "}
                  <em>&quot;show me the task load across the Creative team this week&quot;</em> and
                  Saria generates the chart from your live workspace data. No filters to configure,
                  no spreadsheet to export to.
                </>
              )
            },
            {
              icon: "🎯",
              title: "Infinite scope - one project or the whole workspace",
              body: (
                <>
                  Narrow to a single project, a specific team, a priority level, a date range, or
                  any combination. <strong>Who on Growth has urgent tasks right now? How is work
                  distributed across everyone on Brand Refresh?</strong> The conditions are yours -
                  Saria handles the rest.
                </>
              )
            },
            {
              icon: "📌",
              title: "Pin it wherever it&apos;s most useful",
              body: (
                <>
                  The chart drops in as a block - keep it on the dashboard for a persistent team
                  view, or put it inside a project tab so workload visibility lives right next to
                  the work itself.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>This is what ownership data is for.</strong> Assigning work across your team
              is only half of it - being able to instantly see where things are piling up,
              who&apos;s overloaded, and what&apos;s slipping is what actually lets you manage
              people well.
            </>
          }
          visual={<VisibilityVisual />}
        />

        <FeatureSection
          id="structure"
          label="Structured work"
          title={
            <>
              Tabs and timelines that give every piece of work <em>a place to live</em>
            </>
          }
          features={[
            {
              icon: "📑",
              title: "Tabs organize work into areas, not lists",
              body: (
                <>
                  A project can have a Strategy tab, a Campaign tab, a Shopify tab, a Shoot tab -
                  each with its own blocks, tasks, and files. Subtabs let you go deeper. The
                  structure matches how your team actually thinks about the work, not how a generic
                  PM tool wants you to.
                </>
              )
            },
            {
              icon: "📅",
              title: "Timeline blocks for sequences and milestones",
              body: (
                <>
                  Add a Timeline block to any tab to map out work over time - with start and end
                  dates, assignees, and priority. Timeline events sync to the workspace calendar so
                  nothing lives only in one place.
                </>
              )
            },
            {
              icon: "🤖",
              title: "AI can build the structure for you",
              body: (
                <>
                  Open a Workflow page, describe what you&apos;re working on, and the AI panel can
                  generate a block layout - tabs, task lists, timelines, and sections - based on
                  what your project needs. Start from scratch in seconds rather than building it
                  out manually.
                </>
              )
            }
          ]}
          visual={<StructureVisual />}
        />

        <FeatureSection
          id="comments"
          label="How the team communicates"
          reverse
          title={
            <>
              Comments and mentions that <em>keep feedback attached to the work</em>
            </>
          }
          features={[
            {
              icon: "💬",
              title: "Comment on any block, not the project in general",
              body: (
                <>
                  Every block in Saria has its own comment thread - so feedback on a hero image
                  lives on the hero image block, not in a general channel or a comment buried in a
                  doc. Threaded replies keep conversations focused.
                </>
              )
            },
            {
              icon: "@",
              title: "@ mentions that link to specific items",
              body: (
                <>
                  While commenting, use @ to mention a teammate or reference another task or block
                  directly. The mention appears inline in the comment - one click takes you there.
                  No more &quot;which file are you referring to?&quot;
                </>
              )
            },
            {
              icon: "📬",
              title: "Comment feeds on the dashboard and project overview",
              body: (
                <>
                  Recent team comments appear both on the workspace dashboard and in every
                  project&apos;s Overview tab. Before a standup, open the project overview -
                  you&apos;re caught up in 20 seconds without opening a single tab.
                </>
              )
            }
          ]}
          calloutWarm
          callout={
            <>
              <strong>Client comments are separate.</strong> If you&apos;ve shared a Magic Link
              with a client, their feedback comes in labeled as external - your team always knows
              what&apos;s internal discussion and what&apos;s client feedback, in the same view.
            </>
          }
          visual={<CommentsVisual />}
        />

        <FeatureSection
          id="slack"
          label="Where your team already lives"
          title={
            <>
              The Saria Slack bot - <em>update work without opening a new tab</em>
            </>
          }
          lead={
            <>
              Your team is already in Slack. The Saria bot connects directly to your workspace data
              - tasks, projects, and AI - so the team can act on work without breaking their flow.
            </>
          }
          features={[
            {
              icon: "#",
              title: "Ask it anything about your workspace",
              body: (
                <>
                  Ping the bot with a question - <em>&quot;what&apos;s overdue on the Summer
                  Drop?&quot;</em> or <em>&quot;who owns the Shopify setup task?&quot;</em> - and
                  it pulls the answer directly from Saria. No context switching.
                </>
              )
            },
            {
              icon: "+",
              title: "Create and update tasks from Slack",
              body: (
                <>
                  The bot can create new tasks, mark tasks complete, reassign them, and update
                  priorities - all from a message. When someone says &quot;can you take that off my
                  plate&quot; in a thread, act on it immediately.
                </>
              )
            },
            {
              icon: "✦",
              title: "AI-powered, not just a slash command",
              body: (
                <>
                  The bot is connected to Saria&apos;s AI - so it understands context. Ask it to{" "}
                  <em>&quot;summarize what&apos;s happening on the brand refresh&quot;</em> and it
                  gives you a narrative answer, not a raw data dump.
                </>
              )
            }
          ]}
          visual={<SlackVisual />}
        />

        <FeatureSection
          id="permissions"
          label="Access control"
          reverse
          title={
            <>
              The right people see the right projects - <em>and nothing they shouldn&apos;t</em>
            </>
          }
          lead={
            <>
              As your brand team grows - freelancers, agency partners, seasonal hires - you need
              access control that&apos;s both easy to set up and precise enough to matter.
            </>
          }
          features={[
            {
              icon: "🔒",
              title: "Per-project permissions for individuals or teams",
              body: (
                <>
                  Lock down specific projects so only certain members - or entire teams - can view
                  or edit them. Your agency creative team sees the Campaign project. Your ops lead
                  sees everything. Freelancers see only what they&apos;re working on.
                </>
              )
            },
            {
              icon: "⚡",
              title: "Add a team, not a list of people",
              body: (
                <>
                  Because teams are groups, granting the Creative team access to a project means
                  everyone in that group gets it - and anyone you add to that team later gets it
                  automatically. One configuration, no maintenance.
                </>
              )
            }
          ]}
          callout={
            <>
              <strong>Magic Links work alongside permissions.</strong> If you need a client or
              external stakeholder to see specific project tabs, share a Magic Link - they see only
              what you expose, without needing a workspace account at all.
            </>
          }
          visual={<PermissionsVisual />}
        />

        <section className={base.ctaSection}>
          <div className={base.ctaInner}>
            <div className={base.ctaLabel}>Get started</div>
            <h2 className={base.ctaHeading}>
              Your team, your projects, and your work - all in one place.
            </h2>
            <p className={base.ctaText}>
              Set up your workspace, add your team, and start working. Everything from task
              ownership to Slack updates is ready from day one.
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
