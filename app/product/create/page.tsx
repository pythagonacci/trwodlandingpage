import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import styles from "./create.module.css";

export const metadata = createPageMetadata({
  title: "Create and Manage Creative Workflows | Saria",
  description:
    "Create and manage creative workflows in one D2C project workspace. Saria helps your team turn briefs, moodboards, assets, and approvals into a connected workflow.",
  path: "/product/create"
});

const SECTION_LINKS = [
  { href: "/product/organize", label: "01 - Organize", active: false, route: true },
  { href: "/product/create", label: "02 - Create", active: true, route: true },
  { href: "/product/intelligent-action", label: "03 - Intelligent Action", active: false, route: true },
  { href: "/product/collaborate", label: "04 - Collaborate", active: false, route: true },
  { href: "/product/connect", label: "05 - Connect", active: false, route: true }
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

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
        <div className={styles.eyebrow}>02 - Create</div>
        <div className={styles.heroInner}>
          <div>
            <h1 className={styles.heroHeading}>
              Create and manage
              <br />
              creative <em>workflows.</em>
            </h1>
          </div>
          <div>
            <p className={styles.heroSubhead}>
              Briefs, moodboards, campaigns, copy. Not tracked in Saria. Made in Saria.
            </p>
            <p className={styles.heroDescription}>
              Your team does not just need a place to manage tasks. They need a place to{" "}
              <strong>write the brief,</strong> assemble the moodboard, review the influencer
              batch, and draft the launch copy without scattering the work across five different
              apps. Saria gives every project a creative surface as rich as the work itself.
            </p>
          </div>
        </div>
        </section>

        <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Glow Serum Launch - Overview</span>
                <span className={cx(styles.statusPill, styles.statusReview, styles.topbarRight)}>
                  In Review
                </span>
              </div>

              <div className={styles.canvasBody}>
                <div className={styles.canvasSidebar}>
                  <p className={styles.canvasSectionLabel}>Project</p>
                  <div className={cx(styles.canvasItem, styles.canvasItemActive)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                    Overview
                  </div>
                  <div className={styles.canvasItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Brief
                  </div>
                  <div className={styles.canvasItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                    Moodboard
                  </div>
                  <div className={styles.canvasItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    Tasks
                  </div>
                  <div className={styles.canvasItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="15" y2="12" />
                      <line x1="3" y1="18" x2="18" y2="18" />
                    </svg>
                    Timeline
                  </div>
                  <p className={styles.canvasSectionLabel}>Assets</p>
                  <div className={styles.canvasItem}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Creative Batch
                  </div>
                </div>

                <div className={styles.canvasMain}>
                  <div className={styles.pageTitle}>Glow Serum - Q2 Launch</div>
                  <div className={styles.blockText}>
                    The goal for this launch is to move positioning from{" "}
                    <strong>&quot;skincare routine&quot;</strong> to{" "}
                    <strong>&quot;morning ritual.&quot;</strong> Aspirational, minimal, earned.
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <div className={styles.blockLabel}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      Moodboard - 3 directions
                    </div>
                    <div className={styles.miniCollage}>
                      <div className={cx(styles.miniCell, styles.miniTall)}>
                        <div className={cx(styles.miniInner, styles.miniInnerTall, styles.paletteOne)} />
                        <div className={styles.miniCaption}>Direction A</div>
                      </div>
                      <div className={styles.miniCell}>
                        <div className={cx(styles.miniInner, styles.paletteTwo)} />
                        <div className={styles.miniCaption}>Direction B</div>
                      </div>
                      <div className={styles.miniCell}>
                        <div className={cx(styles.miniInner, styles.paletteThree)} />
                        <div className={styles.miniCaption}>Direction C</div>
                      </div>
                      <div className={styles.miniCell}>
                        <div className={cx(styles.miniInner, styles.paletteFour)} />
                      </div>
                      <div className={styles.miniCell}>
                        <div className={cx(styles.miniInner, styles.paletteFive)} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.blockLabel}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                      Packaging Concepts
                    </div>
                    <div className={styles.assetRow}>
                      <div className={styles.assetCard}>
                        <div className={cx(styles.assetImage, styles.paletteOne)} />
                        <div className={styles.assetFooter}>
                          v2
                          <div className={styles.commentCount}>
                            <CommentIcon />3
                          </div>
                        </div>
                      </div>
                      <div className={styles.assetCard}>
                        <div className={cx(styles.assetImage, styles.paletteTwo)} />
                        <div className={styles.assetFooter}>
                          v3
                          <div className={styles.commentCount}>
                            <CommentIcon />1
                          </div>
                        </div>
                      </div>
                      <div className={styles.assetCard}>
                        <div className={cx(styles.assetImage, styles.paletteThree)} />
                        <div className={styles.assetFooter}>
                          Final
                          <span
                            className={cx(
                              styles.statusPill,
                              styles.statusReview,
                              styles.tinyStatusArrow
                            )}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Your project is your workspace</div>
            <h2 className={styles.showcaseHeading}>
              A brief at the top. A moodboard in the middle. Packaging concepts <em>pinned below.</em>
            </h2>
            <p>
              Most tools give you a task list and call it done. In Saria, a product launch looks
              like a brief at the top, a moodboard in the middle, packaging concepts pinned as
              cards, and an influencer gallery at the bottom.
            </p>
            <p>
              <strong>One surface. All the work.</strong>
            </p>
            <ul className={styles.detailList}>
              <li>Mix text, galleries, cards, tasks, timelines, and files on a single page</li>
              <li>Every block type is purpose-built, not a generic note</li>
              <li>The project structure reflects how the work actually flows</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Galleries built for visual review</div>
            <h2 className={styles.showcaseHeading}>
              Not the whole folder. The <em>exact frame</em> your art director flagged.
            </h2>
            <p>
              Drop a photoshoot batch into a gallery. Arrange it as a collage or a grid. Leave a
              comment thread on a single image pinned to that image, not floating somewhere in
              Slack.
            </p>
            <ul className={styles.detailList}>
              <li>Collage and array layout options per gallery</li>
              <li>Comment threads pinned to individual images</li>
              <li>Per-image captions, fit and crop controls</li>
              <li>Drag to reorder, lightbox for full view</li>
              <li>Deep-link directly to the flagged frame</li>
            </ul>
          </div>

          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Spring Campaign - Photo Batch</span>
                <span className={cx(styles.topbarRight, styles.commentMeta)}>14 images</span>
              </div>

              <div className={styles.galleryToolbar}>
                <button type="button" className={cx(styles.toolbarButton, styles.toolbarButtonActive)}>
                  Collage
                </button>
                <button type="button" className={styles.toolbarButton}>
                  Grid
                </button>
                <button
                  type="button"
                  className={cx(styles.toolbarButton, styles.toolbarButtonEnd)}
                >
                  + Add images
                </button>
              </div>

              <div className={styles.galleryCollage}>
                <div className={cx(styles.galleryCell, styles.galleryCellTall)}>
                  <div className={cx(styles.galleryInner, styles.galleryInnerTall, styles.paletteOne)} />
                  <div className={styles.galleryLabel}>Hero - Option A</div>
                  <div className={styles.galleryBadge}>2</div>
                </div>
                <div className={styles.galleryCell}>
                  <div className={cx(styles.galleryInner, styles.galleryInnerHalf, styles.paletteTwo)} />
                  <div className={styles.galleryLabel}>Texture ref</div>
                </div>
                <div className={cx(styles.galleryCell, styles.galleryFlagged)}>
                  <div
                    className={cx(styles.galleryInner, styles.galleryInnerHalf, styles.paletteThree)}
                  />
                  <div className={cx(styles.galleryLabel, styles.galleryFlagLabel)}>Flagged ↓</div>
                  <div className={styles.galleryBadge}>4</div>
                </div>
              </div>

              <div className={styles.commentPanel}>
                <div className={styles.commentPanelHeader}>
                  <div className={styles.commentPanelTitle}>
                    <div className={styles.commentPanelThumb} />
                    Thread on &quot;Texture - Option C&quot;
                  </div>
                  <span className={styles.commentMeta}>4 comments</span>
                </div>

                <div className={styles.commentItem}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "#7B9DC4" }}>
                    SR
                  </div>
                  <div className={styles.commentBody}>
                    <div className={styles.commentNameRow}>
                      Sara <span className={styles.commentTime}>2h ago</span>
                    </div>
                    <div className={styles.commentText}>
                      The warmth is exactly right. <span className={styles.mention}>@Amna</span>,
                      can we get a tighter crop on the center?
                    </div>
                  </div>
                </div>

                <div className={styles.commentItem}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "var(--accent)" }}>
                    AM
                  </div>
                  <div className={styles.commentBody}>
                    <div className={styles.commentNameRow}>
                      Amna <span className={styles.commentTime}>1h ago</span>
                    </div>
                    <div className={styles.commentText}>
                      Adding it to the retouching brief now. This is the one.
                    </div>
                  </div>
                </div>

                <div className={styles.commentInputRow}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "#B8962E" }}>
                    KP
                  </div>
                  <input className={styles.commentInput} placeholder="Reply to this thread…" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Campaign Assets - Review</span>
                <span className={styles.topbarRight} style={{ display: "flex", gap: 3 }}>
                  <span
                    style={{
                      padding: "2px 7px",
                      background: "var(--ink)",
                      color: "white",
                      borderRadius: 3,
                      fontSize: 9
                    }}
                  >
                    Grid
                  </span>
                  <span
                    style={{
                      padding: "2px 7px",
                      border: "1px solid rgba(28, 25, 23, 0.1)",
                      borderRadius: 3,
                      fontSize: 9,
                      color: "rgba(28, 25, 23, 0.6)"
                    }}
                  >
                    List
                  </span>
                </span>
              </div>

              <div className={styles.cardsGrid}>
                <div className={styles.gridCard}>
                  <div className={cx(styles.gridCardMedia, styles.paletteOne)}>
                    <span className={styles.gridCardMediaText} style={{ color: "rgba(29, 78, 216, 0.45)" }}>
                      Hero Banner
                    </span>
                  </div>
                  <div className={styles.gridCardBody}>
                    <div className={styles.gridCardName}>Hero - Static 1200×628</div>
                    <div className={styles.gridCardMeta}>
                      <div className={styles.commentCount}>
                        <CommentIcon />2
                      </div>
                      <span className={cx(styles.statusPill, styles.statusReview)} style={{ fontSize: 8, padding: "1px 5px", marginLeft: "auto" }}>
                        Review
                      </span>
                    </div>
                  </div>
                </div>

                <div className={cx(styles.gridCard, styles.gridCardAccent)}>
                  <div className={cx(styles.gridCardMedia, styles.paletteTwo)}>
                    <span className={styles.gridCardMediaText} style={{ color: "rgba(122, 140, 126, 0.45)" }}>
                      Video Cut
                    </span>
                  </div>
                  <div className={styles.gridCardBody}>
                    <div className={styles.gridCardName}>Hero Video - 15s cut</div>
                    <div className={styles.gridCardNote}>
                      The opening 3 frames feel slow. Tighten the cut before the product reveal?
                    </div>
                    <div className={styles.gridCardMeta}>
                      <div className={styles.commentCount}>
                        <CommentIcon />5
                      </div>
                      <div className={styles.avatarGroup}>
                        <div
                          className={cx(styles.commentAvatar, styles.tinyAvatar)}
                          style={{ backgroundColor: "var(--accent)" }}
                        >
                          AM
                        </div>
                        <div
                          className={cx(styles.commentAvatar, styles.tinyAvatar)}
                          style={{ backgroundColor: "#7B9DC4" }}
                        >
                          SR
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.gridCard}>
                  <div className={cx(styles.gridCardMedia, styles.paletteThree)}>
                    <span className={styles.gridCardMediaText} style={{ color: "rgba(184, 150, 46, 0.4)" }}>
                      Story Deck
                    </span>
                  </div>
                  <div className={styles.gridCardBody}>
                    <div className={styles.gridCardName}>IG Stories - 9 slides</div>
                    <div className={styles.gridCardMeta}>
                      <div className={styles.commentCount}>
                        <CommentIcon />1
                      </div>
                      <span className={cx(styles.statusPill, styles.statusProgress)} style={{ fontSize: 8, padding: "1px 5px", marginLeft: "auto" }}>
                        In progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Pin assets as cards</div>
            <h2 className={styles.showcaseHeading}>
              A creative review board that <em>lives inside</em> your project.
            </h2>
            <p>
              Campaign hero images, video cuts, slideshow decks pinned as visual cards with notes
              and their own comment threads. Grid view for the review, list view for density.
            </p>
            <ul className={styles.detailList}>
              <li>Image, video, and slideshow support per card</li>
              <li>Attach notes and leave threaded comments on each card</li>
              <li>Grid for visual scanning, list for density</li>
              <li>Status badges per card: review, approved, in progress</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Files that live in the project</div>
            <h2 className={styles.showcaseHeading}>
              PDFs render. Videos play. Drive stays the <em>source of truth.</em>
            </h2>
            <p>
              PDFs render in-place with pagination. Videos play with generated thumbnails. Link
              assets from Google Drive without duplicating storage. Drive stays the source of truth,
              Saria stays the surface where your team actually discusses the work.
            </p>
            <ul className={styles.detailList}>
              <li>PDFs render inline with page-by-page navigation</li>
              <li>Video files play with auto-generated thumbnails</li>
              <li>Link Google Drive assets with no storage duplication</li>
              <li>Comment threads on every file, not just the folder</li>
            </ul>
          </div>

          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Glow Serum - Files</span>
              </div>

              <div className={styles.pdfPreview}>
                <div className={styles.pdfToolbar}>
                  <span>📄</span>
                  <span className={styles.pdfTitle}>Creative Brief v4 - Final.pdf</span>
                  <span className={styles.pdfPage}>Page 1 of 6</span>
                  <span className={styles.pdfArrow}>‹</span>
                  <span className={styles.pdfArrow}>›</span>
                </div>
                <div className={styles.pdfBody}>
                  <div className={styles.pdfLine} style={{ width: "100%" }} />
                  <div className={styles.pdfLine} style={{ width: "88%" }} />
                  <div className={styles.pdfLine} style={{ width: "74%" }} />
                  <div style={{ height: 3 }} />
                  <div className={styles.pdfLine} style={{ width: "96%" }} />
                  <div className={styles.pdfLine} style={{ width: "79%" }} />
                  <div className={cx(styles.pdfLine, styles.pdfLineHighlight)} style={{ width: "58%" }} />
                </div>
              </div>

              <div className={styles.filesList}>
                <div className={styles.fileRow}>
                  <div className={styles.fileIcon} style={{ background: "rgba(28, 25, 23, 0.06)" }}>
                    🎬
                  </div>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>Hero_Video_15s_v3.mp4</div>
                    <div className={styles.fileMeta}>42 MB · Apr 11 · 2 comments</div>
                  </div>
                  <span className={cx(styles.fileBadge, styles.fileBadgeVideo)}>Plays inline</span>
                </div>

                <div className={styles.fileRow}>
                  <div className={styles.fileIcon} style={{ background: "rgba(123, 157, 196, 0.12)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7B9DC4" strokeWidth="1.5" aria-hidden="true">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>
                  </div>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>Photography Spec Sheet.gdoc</div>
                    <div className={styles.fileMeta}>Google Drive · source of truth · 1 comment</div>
                  </div>
                  <span className={cx(styles.fileBadge, styles.fileBadgeDrive)}>Drive linked</span>
                </div>

                <div className={styles.fileRow}>
                  <div className={styles.fileIcon} style={{ background: "rgba(29, 78, 216, 0.08)" }}>
                    📄
                  </div>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>Influencer Brief - Batch 3.pdf</div>
                    <div className={styles.fileMeta}>1.2 MB · Apr 9 · 4 comments</div>
                  </div>
                  <span className={cx(styles.fileBadge, styles.fileBadgePdf)}>Renders inline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Packaging Brief - Embedded tools</span>
              </div>

              <div className={styles.embedFull}>
                <div className={styles.embedHeader}>
                  🎨 Figma - Packaging v3
                  <span className={styles.embedMeta}>4 frames · auto-synced</span>
                </div>
                <div className={styles.embedFullBody}>
                  <div className={cx(styles.embedFrame, styles.embedSideOne)} />
                  <div className={cx(styles.embedFrame, styles.embedMain)} />
                  <div className={cx(styles.embedFrame, styles.embedSideTwo)} />
                </div>
                <div className={styles.embedCaption}>
                  Packaging v3 - final direction for production. Do not edit without sign-off.
                </div>
              </div>

              <div className={styles.embedsTwoCol}>
                <div className={styles.embedCard}>
                  <div className={styles.embedHeader}>
                    🎬 Loom - Creative Walkthrough
                    <span className={styles.embedMeta}>8:42</span>
                  </div>
                  <div className={styles.loomWrap}>
                    <div className={styles.loomThumb}>
                      <div className={styles.loomPlay} />
                      <div className={styles.loomBar}>
                        <div className={styles.loomProgress} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.embedCard}>
                  <div className={styles.embedHeader}>📊 Google Sheets - SKU Tracker</div>
                  <div className={styles.sheetWrap}>
                    <div className={styles.sheetPreview}>
                      <div className={styles.sheetRow}>
                        <div className={cx(styles.sheetCell, styles.sheetHead)}>SKU</div>
                        <div className={cx(styles.sheetCell, styles.sheetHead)}>Stock</div>
                        <div className={cx(styles.sheetCell, styles.sheetHead)}>Status</div>
                        <div className={cx(styles.sheetCell, styles.sheetHead)}>Launch</div>
                      </div>
                      <div className={styles.sheetRow}>
                        <div className={styles.sheetCell}>GLOW-30ML</div>
                        <div className={styles.sheetCell}>1,240</div>
                        <div className={cx(styles.sheetCell, styles.sheetGreen)}>Ready</div>
                        <div className={styles.sheetCell}>Apr 21</div>
                      </div>
                      <div className={styles.sheetRow}>
                        <div className={styles.sheetCell}>GLOW-50ML</div>
                        <div className={styles.sheetCell}>880</div>
                        <div className={cx(styles.sheetCell, styles.sheetGreen)}>Ready</div>
                        <div className={styles.sheetCell}>Apr 21</div>
                      </div>
                      <div className={styles.sheetRow}>
                        <div className={styles.sheetCell}>SPF-DROP</div>
                        <div className={styles.sheetCell}>340</div>
                        <div className={cx(styles.sheetCell, styles.sheetRed)}>Low stock</div>
                        <div className={styles.sheetCell}>May 10</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Your tools, inside the project</div>
            <h2 className={styles.showcaseHeading}>
              Your designer&apos;s mockup lives right below the brief <em>it&apos;s based on.</em>
            </h2>
            <p>
              Figma mockups, Google Docs, Loom walkthroughs, YouTube embedded inline with
              resizable previews. Not linked in a sidebar. In the project.
            </p>
            <ul className={styles.detailList}>
              <li>Figma designs embed at full width with captions</li>
              <li>Loom walkthroughs play inline with no new tab</li>
              <li>Google Docs, Sheets, and Slides render live</li>
              <li>YouTube, Calendly, and more supported</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Feedback on the work, not about it</div>
            <h2 className={styles.showcaseHeading}>
              The conversation happens <em>on the work</em>, not in a channel about it.
            </h2>
            <p>
              Every block has threaded comments. Every gallery image, every card, every file.
              Mention a teammate and they land on the exact thing you are talking about.
            </p>
            <ul className={styles.detailList}>
              <li>Threaded comments on every block, image, card, and file</li>
              <li>@mention drops collaborators onto the exact frame</li>
              <li>Deep-link notifications point to the specific thing</li>
              <li>No more &quot;see my note in Slack about the third image&quot;</li>
            </ul>
          </div>

          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Influencer Batch - Review</span>
              </div>

              <div className={styles.feedbackImage}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(29, 78, 216, 0.18)" strokeWidth="1" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div className={styles.feedbackImageLabel}>Hero image - Option C</div>
                <div className={styles.pin} style={{ top: "30%", left: "54%" }}>
                  1
                </div>
                <div className={styles.pin} style={{ top: "56%", left: "27%" }}>
                  2
                </div>
              </div>

              <div className={styles.commentPanel}>
                <div className={styles.commentPanelHeader}>
                  <div className={styles.commentPanelTitle}>
                    <div className={styles.commentPanelThumb} />
                    Thread on Pin 2 - &quot;Hero image, Option C&quot;
                  </div>
                  <span className={styles.commentMeta}>3 comments</span>
                </div>

                <div className={styles.commentItem}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "#7A8C7E" }}>
                    JS
                  </div>
                  <div className={styles.commentBody}>
                    <div className={styles.commentNameRow}>
                      Jamie <span className={styles.commentTime}>45 min ago</span>
                    </div>
                    <div className={styles.commentText}>
                      The lighting is slightly warm. <span className={styles.mention}>@Sara</span>,
                      does this match the retouching spec?
                    </div>
                  </div>
                </div>

                <div className={styles.commentItem}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "#7B9DC4" }}>
                    SR
                  </div>
                  <div className={styles.commentBody}>
                    <div className={styles.commentNameRow}>
                      Sara <span className={styles.commentTime}>30 min ago</span>
                    </div>
                    <div className={styles.commentText}>Yes. Approved on my end.</div>
                  </div>
                </div>

                <div className={styles.commentInputRow}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "var(--accent)" }}>
                    AM
                  </div>
                  <input className={styles.commentInput} placeholder="Reply…" />
                </div>

                <div className={styles.notifStrip}>
                  <div className={styles.commentAvatar} style={{ backgroundColor: "#7A8C7E", width: 20, height: 20 }}>
                    JS
                  </div>
                  <div className={styles.notifText}>
                    <strong>Jamie</strong> mentioned you on Pin 2 of &quot;Hero image, Option C&quot;
                  </div>
                  <a href="/" className={styles.notifLink}>
                    View →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.showcase}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockScroller}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Glow Serum Launch - Brief</span>
                <span className={cx(styles.topbarRight, styles.statusReview)} style={{ background: "transparent" }}>
                  Sidebar open
                </span>
              </div>

              <div className={styles.docSplit}>
                <div className={styles.docMain}>
                  <div className={styles.docTitle}>Glow Serum - Creative Brief</div>
                  <div className={styles.docBody}>
                    The positioning shift is from &quot;skincare routine&quot; to{" "}
                    <strong>&quot;morning ritual.&quot;</strong> Every creative decision should
                    serve that frame.
                    <br />
                    <br />
                    See <span className={cx(styles.mentionChip, styles.mentionChipDoc)}>📋 Moodboard</span>{" "}
                    for visual direction.{" "}
                    <span className={cx(styles.mentionChip, styles.mentionChipTask)}>
                      ✓ Photography brief
                    </span>{" "}
                    is due Apr 12 per{" "}
                    <span className={cx(styles.mentionChip, styles.mentionChipTimeline)}>
                      ⟶ Timeline
                    </span>
                    .
                    <br />
                    <br />
                    Launch confirmed against{" "}
                    <span className={cx(styles.mentionChip, styles.mentionChipShop)}>
                      ⬛ Glow Serum SKU
                    </span>{" "}
                    in Shopify. Inventory is clear for Apr 21.
                  </div>
                </div>

                <div className={styles.docSidebar}>
                  <div className={styles.sidebarTitle}>Launch Copy Draft</div>
                  <div className={styles.sidebarText}>
                    <strong>Headline:</strong> A ritual, not a routine.
                    <br />
                    <br />
                    The Glow Serum was built for the five minutes that are yours.
                    <span className={styles.cursor} />
                  </div>

                  <div className={styles.linkedSection}>
                    <div className={styles.linkedLabel}>Linked from this doc</div>
                    <div className={styles.linkedRef}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      Moodboard - 3 directions
                    </div>
                    <div className={styles.linkedRef}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="9 11 12 14 22 4" />
                      </svg>
                      Photography brief
                    </div>
                    <div className={styles.linkedRef}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="15" y2="12" />
                      </svg>
                      Timeline - Q2 Launch
                    </div>
                    <div className={styles.linkedRef}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      </svg>
                      Glow Serum SKU
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <div className={styles.monoLabel}>Write together. Reference everything.</div>
            <h2 className={styles.showcaseHeading}>
              The brief links to the moodboard links to the timeline links to the <em>Shopify product.</em>
            </h2>
            <p>
              Native documents with rich formatting and autosave. Open in a sidebar without leaving
              the canvas. Mention a person, a task, a file, or another block from anywhere.
              Everything in Saria is linkable.
            </p>
            <ul className={styles.detailList}>
              <li>Open any doc in a sidebar while the main canvas stays in view</li>
              <li>Inline @mentions for people, tasks, files, blocks, and products</li>
              <li>&quot;Linked from this doc&quot; surfaces every reference</li>
              <li>Autosave so nothing gets lost mid-draft</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.reuseDark}>
        <div className={styles.reuseInner}>
          <div className={styles.reuseText}>
            <div className={styles.monoLabel}>Reuse what&apos;s built. Lock what&apos;s done.</div>
            <h2 className={styles.reuseHeading}>
              Write it once.
              <br />
              <em>Reference it everywhere.</em>
            </h2>
            <p>
              Save any block as reusable and reference it across projects: brand guidelines,
              creative specs, packaging dimensions. When something is signed off, lock it. Reviewed
              means reviewed.
            </p>
            <ul className={styles.darkList}>
              <li>Save any block as a synced reference</li>
              <li>Update the source and all instances update</li>
              <li>Lock blocks after sign-off to prevent accidental edits</li>
              <li>See every project a block appears in</li>
            </ul>
          </div>

          <div className={styles.reuseVisual}>
            <div className={styles.refBlock}>
              <div className={styles.refHeader}>
                <div className={styles.refIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className={styles.refName}>Brand Voice Guidelines</span>
                <span className={styles.syncedBadge}>
                  <span className={styles.syncDot} />
                  Synced
                </span>
              </div>
              <div className={styles.refBody}>
                Tone: warm but precise. Never casual, never clinical. Write like a trusted friend
                who knows everything about skincare.
              </div>
              <div className={styles.refUsed}>
                <span className={styles.usageChip}>Glow Serum Launch</span>
                <span className={styles.usageChip}>Q2 Campaigns</span>
                <span className={styles.usageChip}>Influencer Briefs</span>
                <span className={styles.usageChip}>+4 more</span>
              </div>
            </div>

            <div className={styles.refBlock}>
              <div className={styles.refHeader}>
                <div className={styles.refIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <span className={styles.refName}>Photography Spec Sheet</span>
                <span className={styles.syncedBadge}>
                  <span className={styles.syncDot} />
                  Synced
                </span>
              </div>
              <div className={styles.refBody}>
                Ratio: 4:5 primary, 1:1 secondary. Background: warm white. No drop shadows.
                Natural light only.
              </div>
              <div className={styles.refUsed}>
                <span className={styles.usageChip}>All Creative Briefs</span>
                <span className={styles.usageChip}>Agency Onboarding</span>
              </div>
            </div>

            <div className={styles.lockedBlock}>
              <div className={styles.lockedBar}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Approved &amp; locked - Apr 10, 2025
              </div>
              <div className={styles.lockedBody}>
                Packaging direction C is approved for production. Dimensions, colorways, and finish
                are final. No further edits without a new sign-off cycle.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.footerInner}>
          <p className={styles.footerHeading}>
            Ready to see the
            <br />
            <em>intelligence layer?</em>
          </p>
          <div className={styles.footerActions}>
            <Link href="/product/intelligent-action" className={styles.ghostButton}>
              03 - Intelligent Action
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
