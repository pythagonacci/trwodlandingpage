import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import styles from "./collaborate.module.css";

export const metadata = createPageMetadata({
  title: "Collaborate with Teams, Partners, and Creators | Saria",
  description:
    "Run a connected D2C collaboration workflow with Saria. Keep your team, partners, creators, and client approvals in one project without exposing your full workspace.",
  path: "/product/collaborate"
});

const SECTION_LINKS = [
  { href: "/product/organize", label: "01 - Organize", active: false, route: true },
  { href: "/product/create", label: "02 - Create", active: false, route: true },
  {
    href: "/product/intelligent-action",
    label: "03 - Intelligent Action",
    active: false,
    route: true
  },
  { href: "/product/collaborate", label: "04 - Collaborate", active: true, route: true },
  { href: "/product/connect", label: "05 - Connect", active: false, route: true }
];

const VISIBILITY_ROWS = [
  {
    name: "Deliverables",
    clientName: '"Deliverables"',
    shared: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    )
  },
  {
    name: "Moodboard",
    clientName: '"Creative Direction"',
    shared: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    name: "Internal Ops",
    clientName: "-",
    shared: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    name: "Budget",
    clientName: "-",
    shared: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    name: "Tasks",
    clientName: "-",
    shared: false,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    )
  }
] as const;

const APPROVAL_ITEMS = [
  {
    name: "Hero Banner - 1200x628",
    meta: "Approved by Client - Apr 12 - 9:41 AM",
    approved: true,
    thumb: "linear-gradient(135deg, #f0ddd2, #e4c4ad)"
  },
  {
    name: "Packaging - Direction C",
    meta: "Approved by Client - Apr 10 - 2:17 PM",
    approved: true,
    thumb: "linear-gradient(135deg, #eaf0eb, #c9dccb)"
  },
  {
    name: "Hero Video - 15s cut",
    meta: "Sent for review - Apr 13 - 2 comments pending",
    approved: false,
    thumb: "linear-gradient(135deg, #f5edda, #e8d5b2)"
  },
  {
    name: "IG Stories - 9 slides",
    meta: "Sent for review - Apr 14 - Awaiting",
    approved: false,
    thumb: "linear-gradient(135deg, #e8edf5, #cfdaea)"
  }
] as const;

const SHARED_FILES = [
  {
    title: "Creative Brief v4 - Final.pdf",
    meta: "Shared - 6 pages - Viewed by client Apr 13",
    action: "Download",
    tone: "download",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    background: "rgba(29, 78, 216, 0.08)"
  },
  {
    title: "Hero Video - 15s v3.mp4",
    meta: "Shared - 42 MB - Plays inline",
    action: "Download",
    tone: "neutral",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="15" height="14" rx="2" />
        <polygon points="10 9 10 15 15 12" fill="currentColor" stroke="none" />
        <path d="M18 10l3-2v8l-3-2" />
      </svg>
    ),
    background: "rgba(28, 25, 23, 0.06)"
  },
  {
    title: "Packaging - Direction C - Gallery",
    meta: "Shared - 8 images - 3 comments",
    action: "Download all",
    tone: "download",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    background: "rgba(184, 150, 46, 0.1)"
  }
] as const;

const RETURNED_FILES = [
  {
    title: "Upload revised Hero Video",
    meta: "Requested by Amna - Due Apr 16",
    action: "Upload file",
    tone: "upload",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 5 17 10" />
        <line x1="12" y1="5" x2="12" y2="16" />
      </svg>
    ),
    background: "rgba(29, 78, 216, 0.08)",
    dashed: true
  },
  {
    title: "Revised Hero Banner - received",
    meta: "Uploaded by client - Apr 14 - 3.4 MB - Tracked in project",
    action: "Received",
    tone: "received",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    background: "rgba(40, 200, 64, 0.08)",
    dashed: false
  }
] as const;

type FeatureCard = {
  tag: string;
  title: string;
  body: ReactNode;
  icon: ReactNode;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    tag: "Sharing",
    title: "Magic Links",
    body: (
      <>
        Generate a shareable link to any project. <strong>No login required.</strong> External
        collaborators see a clean view of exactly the tabs you choose to share, and nothing else.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )
  },
  {
    tag: "Visibility",
    title: "Per-Tab Visibility",
    body: (
      <>
        Choose which tabs are public and which stay internal. Give each shared tab a client-facing
        title. <strong>Your operational tabs stay hidden</strong> while deliverable tabs go out.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    tag: "Feedback",
    title: "Client Comments and Review",
    body: (
      <>
        External reviewers leave comments directly on shared blocks with <strong>no account
        needed.</strong> Feedback syncs back to your workspace and triggers internal notifications.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    tag: "Sign-Off",
    title: "Approvals and Sign-Off",
    body: (
      <>
        Clients mark deliverables as approved. The approval state flows back into your project so
        the team knows when something is <strong>locked and ready to ship.</strong>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  },
  {
    tag: "Delivery",
    title: "File Delivery and Collection",
    body: (
      <>
        Share files and galleries through the public page. Clients download what they need and{" "}
        <strong>upload deliverables back</strong>, all tracked within the project.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
      </svg>
    )
  },
  {
    tag: "Security",
    title: "Anonymized and Safe",
    body: (
      <>
        Client comments show as "Client" while internal identities stay private.{" "}
        <strong>Rate limiting, scoped access, and signed URLs</strong> keep shared pages secure,
        with analytics tracking who is viewing.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

function EyeIcon({ off = false }: { off?: boolean }) {
  return off ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
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

      <section className={styles.hero}>
        <div className={styles.eyebrow}>04 - Collaborate</div>
        <div className={styles.heroGrid}>
          <div>
            <h1 className={styles.heroHeading}>
              Collaborate with teams,
              <br />
              partners, and
              <br />
              <em>creators.</em>
            </h1>
          </div>
          <div>
            <p className={styles.heroSubhead}>Share the work. Keep the workspace.</p>
            <p className={styles.heroDescription}>
              D2C brands work with everyone: <strong>creators, agencies, freelancers, vendors,
              clients.</strong> Saria lets you share exactly what external collaborators need to
              see, collect their feedback and approvals, and receive their deliverables without
              handing over workspace access or spinning up another tool.
            </p>
          </div>
        </div>

        <div className={styles.mockViewport}>
          <div className={cx(styles.mock, styles.heroMock)}>
            <div className={styles.topbar}>
              <WindowDots />
              <span className={styles.topbarTitle}>Glow Serum Launch</span>
              <div className={styles.topbarMagicLink}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className={styles.magicLinkUrl}>saria.so/share/glow-serum-q2</span>
                <button type="button" className={styles.magicLinkCopy}>
                  Copy link
                </button>
              </div>
            </div>

            <div className={styles.splitScreen}>
              <div className={cx(styles.splitPane, styles.splitPaneInternal)}>
                <div className={cx(styles.splitLabel, styles.splitLabelInternal)}>
                  <span className={styles.splitLabelDot} />
                  Your workspace - internal
                </div>

                <div className={styles.tabRow}>
                  <div className={cx(styles.tabPill, styles.tabPillActive)}>
                    <EyeIcon />
                    Deliverables
                  </div>
                  <div className={cx(styles.tabPill, styles.tabPillActive)}>
                    <EyeIcon />
                    Moodboard
                  </div>
                  <div className={cx(styles.tabPill, styles.tabPillHidden)}>
                    <EyeIcon off />
                    Internal ops
                  </div>
                  <div className={cx(styles.tabPill, styles.tabPillHidden)}>
                    <EyeIcon off />
                    Budget
                  </div>
                </div>

                <div className={styles.internalBlock}>
                  <div className={styles.internalBlockHeader}>
                    Deliverables
                    <span className={styles.internalBlockBadge}>Shared</span>
                  </div>
                  <div className={styles.internalBlockBody}>
                    <strong>Hero Video - 15s</strong> - Due Apr 18 - Jamie K.
                    <br />
                    <strong>Hero Banner - 1200x628</strong> - Done - Sara R.
                    <br />
                    IG Stories - 9 slides - In progress
                  </div>
                </div>

                <div className={styles.internalBlock}>
                  <div className={styles.internalBlockHeader}>
                    Internal Ops
                    <span className={cx(styles.internalBlockBadge, styles.internalBlockBadgeMuted)}>
                      Hidden
                    </span>
                  </div>
                  <div className={cx(styles.internalBlockBody, styles.internalBlockBodyBlurred)}>
                    Budget: $12,400 remaining - Agency invoice pending - Freelancer NDA status
                  </div>
                </div>
              </div>

              <div className={styles.splitDivider}>
                <div className={styles.splitDividerIcon}>
                  <ArrowIcon />
                </div>
              </div>

              <div className={cx(styles.splitPane, styles.splitPaneExternal)}>
                <div className={cx(styles.splitLabel, styles.splitLabelExternal)}>
                  <span className={styles.splitLabelDot} />
                  Client view - no login required
                </div>

                <div className={styles.viewerBar}>
                  <span className={styles.viewerIcon}>I</span>
                  Viewing as:
                  <strong>External reviewer</strong>
                  <span className={styles.viewerStatus}>
                    <span className={styles.liveDot} />
                    Live
                  </span>
                </div>

                <div className={styles.clientBlock}>
                  <div className={styles.clientBlockHeader}>
                    Deliverables
                    <span className={styles.clientBlockMeta}>3 items</span>
                  </div>
                  <div className={styles.clientBlockBody}>
                    <strong>Hero Video - 15s</strong> - Due Apr 18
                    <br />
                    <strong>Hero Banner - 1200x628</strong> - <span className={styles.doneText}>Done</span>
                    <br />
                    IG Stories - 9 slides - In progress
                  </div>
                </div>

                <div className={styles.commentCard}>
                  <div className={styles.commentCardLabel}>Leave a comment</div>
                  <div className={styles.commentBubble}>
                    The hero banner looks great - can we see the 9:16 crop for Stories?
                  </div>
                  <div className={styles.commentActions}>
                    <button type="button" className={styles.commentSend}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cx(styles.showcase, styles.showcaseTop)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <p className={styles.monoLabel}>Per-Tab Visibility</p>
            <h2>
              Choose exactly what they see.
              <br />
              <em>Nothing more.</em>
            </h2>
            <p>
              Choose which tabs are public and which stay internal. Give each shared tab a
              client-facing title. Your operational tabs, budget, internal ops, team notes, stay
              hidden while the deliverable tabs go out.
            </p>
            <ul className={styles.detailList}>
              <li>Toggle visibility per tab with no complex permissions</li>
              <li>Rename tabs for the client-facing view</li>
              <li>Internal tabs are invisible, not just locked</li>
              <li>Update visibility any time while the link stays the same</li>
            </ul>
          </div>

          <div className={styles.mockViewport}>
            <div className={cx(styles.mock, styles.visibilityMock)}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Share settings - Glow Serum Launch</span>
              </div>
              <div className={styles.shareStatusBar}>
                <span className={styles.shareStatusLabel}>Sharing:</span>
                <div className={styles.shareStatusPill}>
                  <span className={styles.liveDot} />
                  Active - 2 viewers
                </div>
                <div className={styles.shareUrl}>saria.so/share/glow-serum-q2</div>
              </div>

              <div className={styles.visibilityRows}>
                <div className={styles.visibilityGroupLabel}>Project tabs</div>
                {VISIBILITY_ROWS.map((row) => (
                  <div
                    key={row.name}
                    className={cx(
                      styles.visibilityRow,
                      row.shared ? styles.visibilityRowShared : styles.visibilityRowHidden
                    )}
                  >
                    <div className={styles.visibilityRowIcon}>{row.icon}</div>
                    <span className={styles.visibilityRowName}>{row.name}</span>
                    <span
                      className={cx(
                        styles.visibilityClientName,
                        !row.shared && styles.visibilityClientNameMuted
                      )}
                    >
                      {row.shared ? `-> ${row.clientName}` : row.clientName}
                    </span>
                    <span
                      className={cx(
                        styles.visibilityStatus,
                        row.shared ? styles.visibilityStatusShared : styles.visibilityStatusHidden
                      )}
                    >
                      <EyeIcon off={!row.shared} />
                      {row.shared ? "Shared" : "Hidden"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockViewport}>
            <div className={cx(styles.mock, styles.clientCommentMock)}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Creative Direction - Client view</span>
                <span className={styles.externalBadgeTop}>External</span>
              </div>

              <div className={styles.commentImageArea}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div className={styles.commentImageLabel}>Hero - Direction C</div>
              </div>

              <div className={styles.commentPanel}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentTitle}>Comments on "Hero - Direction C"</span>
                  <span className={styles.externalBadge}>No login required</span>
                </div>

                <div className={styles.reviewComment}>
                  <div className={styles.commentAvatarBlue}>C</div>
                  <div className={styles.reviewBody}>
                    <div className={styles.reviewName}>
                      Client <span className={styles.externalMiniBadge}>External</span>
                      <span className={styles.reviewTime}>1h ago</span>
                    </div>
                    <div className={styles.reviewText}>
                      Love the warm tones - can we go slightly more contrast on the product? The
                      crop also feels a touch tight on the right edge.
                    </div>
                  </div>
                </div>

                <div className={styles.reviewComment}>
                  <div className={styles.commentAvatarGreen}>C</div>
                  <div className={styles.reviewBody}>
                    <div className={styles.reviewName}>
                      Client <span className={styles.externalMiniBadge}>External</span>
                      <span className={styles.reviewTime}>40 min ago</span>
                    </div>
                    <div className={styles.reviewText}>
                      Also, do we have a version without the gradient overlay? Want to see the raw
                      shot.
                    </div>
                  </div>
                </div>

                <div className={styles.internalNote}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>
                    Internal: Client identities show as "Client" while your team identities stay
                    private on the external view.
                  </span>
                </div>

                <div className={styles.commentInputRow}>
                  <input className={styles.commentInput} placeholder="Reply as Client..." />
                  <button type="button" className={styles.commentInputButton}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <p className={styles.monoLabel}>Client Comments and Review</p>
            <h2>
              Feedback on the work. No account.
              <br />
              <em>No Slack thread.</em>
            </h2>
            <p>
              External reviewers can leave comments directly on shared blocks with no account
              needed, just a name. Their feedback syncs back to your workspace and triggers
              internal notifications. Review happens where the work lives.
            </p>
            <ul className={styles.detailList}>
              <li>No login required for external commenters</li>
              <li>Comments sync to your workspace in real time</li>
              <li>Internal notifications link directly to the comment</li>
              <li>Client identities show as "Client" while your team stays private</li>
              <li>Works on blocks, gallery images, cards, and files</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <p className={styles.monoLabel}>Approvals and Sign-Off</p>
            <h2>
              Approved means approved.
              <br />
              <em>The team knows instantly.</em>
            </h2>
            <p>
              Clients can review work and mark deliverables as approved. The approval state flows
              back into your project so the team knows when something is locked and ready to ship,
              without chasing confirmation over email.
            </p>
            <ul className={styles.detailList}>
              <li>Approve button on any shared deliverable</li>
              <li>Approval state syncs back to your workspace instantly</li>
              <li>Approved items auto-lock to prevent accidental edits</li>
              <li>Approval history is logged with timestamp and reviewer</li>
            </ul>
          </div>

          <div className={styles.mockViewport}>
            <div className={cx(styles.mock, styles.approvalsMock)}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Deliverables - Awaiting approval</span>
                <span className={styles.topbarMeta}>3 of 5 approved</span>
              </div>

              <div className={styles.approvalItems}>
                {APPROVAL_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className={cx(
                      styles.approvalItem,
                      item.approved && styles.approvalItemApproved
                    )}
                  >
                    <div
                      className={styles.approvalThumb}
                      style={{ background: item.thumb } satisfies CSSProperties}
                    />
                    <div className={styles.approvalInfo}>
                      <div className={styles.approvalName}>{item.name}</div>
                      <div className={styles.approvalMeta}>{item.meta}</div>
                    </div>
                    <button
                      type="button"
                      className={cx(
                        styles.approvalButton,
                        item.approved ? styles.approvalButtonDone : styles.approvalButtonAction
                      )}
                    >
                      {item.approved && (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {item.approved ? "Approved" : "Approve"}
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.approvalFlow}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  <strong>Hero Banner</strong> and <strong>Packaging - Direction C</strong>{" "}
                  auto-locked after client approval.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockViewport}>
            <div className={cx(styles.mock, styles.deliveryMock)}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Files - Glow Serum Launch</span>
              </div>

              <div className={styles.deliverySectionLabel}>Shared with client</div>
              <div className={styles.deliveryItems}>
                {SHARED_FILES.map((item) => (
                  <div key={item.title} className={styles.deliveryItem}>
                    <div
                      className={styles.deliveryIcon}
                      style={{ background: item.background } satisfies CSSProperties}
                    >
                      {item.icon}
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div className={styles.deliveryName}>{item.title}</div>
                      <div className={styles.deliveryMeta}>{item.meta}</div>
                    </div>
                    <span
                      className={cx(
                        styles.deliveryAction,
                        item.tone === "download" && styles.deliveryActionDownload
                      )}
                    >
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>

              <div className={cx(styles.deliverySectionLabel, styles.deliverySectionLabelAccent)}>
                Upload deliverables back to you
              </div>
              <div className={styles.deliveryItems}>
                {RETURNED_FILES.map((item) => (
                  <div
                    key={item.title}
                    className={cx(
                      styles.deliveryItem,
                      item.dashed && styles.deliveryItemUploadRequest
                    )}
                  >
                    <div
                      className={styles.deliveryIcon}
                      style={{ background: item.background } satisfies CSSProperties}
                    >
                      {item.icon}
                    </div>
                    <div className={styles.deliveryInfo}>
                      <div
                        className={cx(
                          styles.deliveryName,
                          item.tone === "upload" && styles.deliveryNameAccent
                        )}
                      >
                        {item.title}
                      </div>
                      <div className={styles.deliveryMeta}>{item.meta}</div>
                    </div>
                    <span
                      className={cx(
                        styles.deliveryAction,
                        item.tone === "upload" && styles.deliveryActionUpload,
                        item.tone === "received" && styles.deliveryActionReceived
                      )}
                    >
                      {item.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <p className={styles.monoLabel}>File Delivery and Collection</p>
            <h2>
              Share files out. Collect deliverables
              <br />
              <em>back in.</em>
            </h2>
            <p>
              Share files, galleries, PDFs, and videos through the public page. Clients download
              what they need and upload deliverables back, all tracked within the project rather
              than buried in email attachments.
            </p>
            <ul className={styles.detailList}>
              <li>Share any file type through the public project page</li>
              <li>Clients upload revisions directly back to the project</li>
              <li>Uploads are tracked and timestamped inside the project</li>
              <li>No email attachments and no permission chaos</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.securitySection}>
        <div className={styles.securityInner}>
          <div className={styles.securityText}>
            <p className={styles.monoLabel}>Anonymized and Safe</p>
            <h2>
              Scoped. Signed.
              <br />
              <em>Secure by design.</em>
            </h2>
            <p>
              Client-facing comments show as "Client" while internal author identities stay
              private. Rate limiting, scoped access, and signed URLs keep shared pages{" "}
              <strong>secure and performant.</strong> Analytics track who is viewing what.
            </p>
            <ul className={styles.detailList}>
              <li>Client identities anonymized and internal names never exposed</li>
              <li>Rate limiting prevents abuse of public links</li>
              <li>Signed URLs expire and can be revoked at any time</li>
              <li>Scoped access means viewers only see what you share</li>
              <li>Analytics show views, time on page, and files downloaded</li>
            </ul>
          </div>

          <div className={styles.securityVisual}>
            <div className={styles.securityCard}>
              <div className={styles.securityCardHead}>
                <div
                  className={styles.securityIcon}
                  style={{ background: "rgba(123, 157, 196, 0.12)", color: "var(--page-slate)" }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className={styles.securityCardTitle}>Identity anonymization</span>
              </div>
              <div className={styles.securityCardBody}>
                External commenters appear as "Client" to the outside world. Your team names and
                roles are never exposed.
              </div>
              <div className={styles.anonThread}>
                <div className={styles.anonComment}>
                  <div className={styles.anonAvatarBlue}>C</div>
                  <div className={styles.anonBody}>
                    <div className={styles.anonName}>
                      Client <span className={styles.anonMeta}>External view</span>
                    </div>
                    <div className={styles.anonText}>
                      The hero image is approved. Send the final file.
                    </div>
                  </div>
                </div>
                <div className={styles.anonComment}>
                  <div className={styles.anonAvatarAccent}>C</div>
                  <div className={styles.anonBody}>
                    <div className={styles.anonName}>
                      Client <span className={styles.anonMeta}>External view</span>
                    </div>
                    <div className={styles.anonText}>
                      One more revision needed on the 9:16 crop.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.securityCard}>
              <div className={styles.securityCardHead}>
                <div
                  className={styles.securityIcon}
                  style={{ background: "rgba(29, 78, 216, 0.12)", color: "var(--page-accent)" }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className={styles.securityCardTitle}>Scoped access and signed URLs</span>
              </div>
              <div className={styles.securityCardBody}>
                Links are signed, scoped to exactly what you shared, and revocable in one click.
                Rate limiting prevents abuse.
              </div>
              <div className={styles.securityPillRow}>
                <span className={styles.securityPill}>Signed URL</span>
                <span className={styles.securityPill}>Rate limited</span>
                <span className={styles.securityPill}>Revocable</span>
                <span className={styles.securityPill}>Scoped to tabs</span>
              </div>
            </div>

            <div className={styles.securityCard}>
              <div className={styles.securityCardHead}>
                <div
                  className={styles.securityIcon}
                  style={{ background: "rgba(184, 150, 46, 0.12)", color: "var(--page-gold)" }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                  </svg>
                </div>
                <span className={styles.securityCardTitle}>Viewer analytics</span>
              </div>
              <div className={styles.securityCardBody}>
                See who is viewing, how long they spend, and what they download.
              </div>
              <div className={styles.analyticsRow}>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsNumber}>14</div>
                  <div className={styles.analyticsLabel}>Page views</div>
                </div>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsNumber}>3</div>
                  <div className={styles.analyticsLabel}>Unique visitors</div>
                </div>
                <div className={styles.analyticsStat}>
                  <div className={styles.analyticsNumber}>4:32</div>
                  <div className={styles.analyticsLabel}>Avg. time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresHeading}>
            Six ways to work with <em>anyone</em> without the risk.
          </h2>
          <p className={styles.featuresSubhead}>
            Agencies, freelancers, creators, vendors, clients. Collaborate with all of them from a
            single workspace without handing over access.
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
            The last piece:
            <br />
            <em>built around Shopify.</em>
          </p>
          <div className={styles.footerActions}>
            <Link href="/product/connect" className={styles.ghostButton}>
              05 - Connect
              <ArrowIcon className={styles.ctaArrow} />
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
