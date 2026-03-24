import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/landing/Nav";
import styles from "./connect.module.css";

const SECTION_LINKS = [
  { href: "/product/organize", label: "01 - Organize", active: false, route: true },
  { href: "/product/create", label: "02 - Create", active: false, route: true },
  {
    href: "/product/intelligent-action",
    label: "03 - Intelligent Action",
    active: false,
    route: true
  },
  { href: "/product/collaborate", label: "04 - Collaborate", active: false, route: true },
  { href: "/product/connect", label: "05 - Connect", active: true, route: true }
];

const STACK_CARDS = [
  {
    title: "Google Drive",
    body: (
      <>
        Stays your file source of truth. Link assets and preview them <strong>inline in Saria</strong>{" "}
        without duplicating storage.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 3h9l4.5 7.8-4.5 7.2h-9L3 10.8z" />
        <path d="M12 3l4.5 7.8" />
        <path d="M7.5 18l4.5-7.2" />
      </svg>
    )
  },
  {
    title: "Google Calendar",
    body: (
      <>
        Merges with your project timeline and calendar view. <strong>One place to see</strong>{" "}
        tasks, deadlines, and meetings.
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
  },
  {
    title: "Slack",
    body: (
      <>
        Run Saria commands from any channel. <strong>Create tasks, check statuses,</strong> and
        get updates without leaving Slack.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3a2 2 0 1 0-2 2h2z" />
        <path d="M3 9a2 2 0 1 0 2-2v2z" />
        <path d="M15 3a2 2 0 1 1 2 2h-2z" />
        <path d="M21 9a2 2 0 1 1-2-2v2z" />
        <path d="M15 21a2 2 0 1 0 2-2h-2z" />
        <path d="M21 15a2 2 0 1 0-2 2v-2z" />
        <path d="M9 21a2 2 0 1 1-2-2h2z" />
        <path d="M3 15a2 2 0 1 1 2 2v-2z" />
        <line x1="9" y1="5" x2="9" y2="15" />
        <line x1="15" y1="9" x2="5" y2="9" />
        <line x1="15" y1="19" x2="15" y2="9" />
        <line x1="19" y1="15" x2="9" y2="15" />
      </svg>
    )
  },
  {
    title: "CSV Import",
    body: (
      <>
        Import CSV data directly into Saria tables. <strong>Clean, map, and query</strong> your
        data inside the workspace immediately.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    )
  }
] as const;

type FeatureCard = {
  tag: string;
  title: string;
  body: ReactNode;
  shopify?: boolean;
  icon: ReactNode;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    tag: "Sync",
    title: "Deep Shopify Sync",
    body: (
      <>
        Products, variants, per-location inventory, and sales data imported and{" "}
        <strong>continuously synced</strong> through a background engine. Not a snapshot. A living
        connection.
      </>
    ),
    shopify: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    )
  },
  {
    tag: "Blocks",
    title: "Shopify Product Blocks",
    body: (
      <>
        Embed a Shopify product into any project. See <strong>product details, variant data, and
        units sold</strong> right next to the launch timeline and the creative brief.
      </>
    ),
    shopify: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    )
  },
  {
    tag: "Projects",
    title: "Project From Product",
    body: (
      <>
        Create a Saria project directly from a Shopify product. <strong>Born with product context
        already attached</strong> without copy-pasting SKUs or linking spreadsheets.
      </>
    ),
    shopify: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    )
  },
  {
    tag: "Analytics",
    title: "Sales Analytics",
    body: (
      <>
        Units sold computed from Shopify orders, <strong>cached hourly</strong>, with background
        processing for longer date ranges. Know how a product is performing without leaving your
        workspace.
      </>
    ),
    shopify: true,
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
    tag: "AI",
    title: "AI That Knows Your Catalog",
    body: (
      <>
        Search products, pull sales data, and build product tables through the AI layer. Ask{" "}
        <strong>"how did Glow Serum do last month"</strong> and get an answer, not a redirect to
        Shopify admin.
      </>
    ),
    shopify: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )
  },
  {
    tag: "Stack",
    title: "And The Rest Of Your Stack",
    body: (
      <>
        Google Drive, Google Calendar, Slack, and CSV import. <strong>Your tools stay
        connected</strong> without becoming another tab to manage.
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
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

function ShopifyBadge() {
  return <span className={styles.shopifyBadgeIcon}>S</span>;
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
        <div className={styles.eyebrow}>05 - Connect</div>
        <div className={styles.heroGrid}>
          <div>
            <h1 className={styles.heroHeading}>
              Saria doesn't integrate
              <br />
              with Shopify.
              <br />
              <em>It's built around it.</em>
            </h1>
          </div>
          <div>
            <p className={styles.heroSubhead}>
              Most tools bolt Shopify on as an afterthought.
            </p>
            <p className={styles.heroDescription}>
              A widget in a sidebar, a one-way data sync you have to babysit. Saria treats your
              Shopify store as a <strong>first-class part of the workspace.</strong> Products,
              inventory, variants, sales data, all updated in the background, queryable by AI, and
              connected to the projects and timelines where the actual work happens.
            </p>

            <div className={styles.integrationRow}>
              <span className={cx(styles.integrationPill, styles.integrationBad)}>
                Shopify integration
              </span>
              <span className={styles.integrationArrow}>-&gt;</span>
              <span className={cx(styles.integrationPill, styles.integrationGood)}>
                <ShopifyBadge />
                Built around Shopify
              </span>
            </div>
          </div>
        </div>

        <div className={styles.syncWrap}>
          <div className={styles.syncDiagram}>
            <div className={styles.syncHeader}>
              <span className={styles.syncTitle}>
                Background sync engine - Shopify -&gt; Saria
              </span>
              <div className={styles.syncStatus}>
                <span className={styles.syncDot} />
                Live - syncing now
              </div>
            </div>

            <div className={styles.syncPipeline}>
              <div className={styles.syncSource}>
                <div className={styles.syncSourceLabel}>
                  <ShopifyBadge />
                  Shopify Store
                </div>
                <div className={styles.syncItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  </svg>
                  Products and variants
                </div>
                <div className={styles.syncItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  Per-location inventory
                </div>
                <div className={styles.syncItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Orders and sales data
                </div>
                <div className={styles.syncItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                  </svg>
                  Product media
                </div>
              </div>

              <div className={styles.syncArrowCol}>
                <div className={styles.syncTrack}>
                  <div className={styles.syncPulse} />
                </div>
                <div className={styles.syncArrowLabel}>
                  continuous
                  <br />
                  sync
                </div>
                <div className={styles.syncTrack}>
                  <div className={cx(styles.syncPulse, styles.syncPulseDelayed)} />
                </div>
              </div>

              <div className={styles.syncDest}>
                <div className={styles.syncDestLabel}>Saria Workspace</div>
                <div className={styles.syncDestItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                  Product blocks in any project
                </div>
                <div className={styles.syncDestItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  Live sales analytics
                </div>
                <div className={styles.syncDestItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  AI-queryable catalog
                </div>
                <div className={styles.syncDestItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  Project-attached context
                </div>
              </div>
            </div>

            <div className={styles.syncFooter}>
              <span>Not a snapshot.</span>
              <span className={styles.syncFooterDot}>.</span>
              <span>A living connection.</span>
              <span className={styles.syncUpdated}>Last sync: 4 seconds ago</span>
            </div>
          </div>
        </div>
      </section>

      <section className={cx(styles.showcase, styles.showcaseTop)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.mockViewport}>
            <div className={styles.mock}>
              <div className={styles.topbar}>
                <WindowDots />
                <span className={styles.topbarTitle}>Glow Serum Launch - Brief</span>
              </div>

              <div className={styles.productCanvas}>
                <div className={styles.productPageTitle}>Glow Serum - Q2 Launch Brief</div>
                <div className={styles.productText}>
                  The positioning shifts from "skincare routine" to <strong>"morning ritual."</strong>{" "}
                  Every creative decision should serve that frame.
                </div>

                <div className={cx(styles.contextStub, styles.contextStubSpaced)}>
                  <div className={styles.contextStubLabel}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="15" y2="12" />
                    </svg>
                    Timeline - Apr 21 ship date - 7 days out
                  </div>
                </div>

                <div className={styles.productEmbed}>
                  <div className={styles.productEmbedHeader}>
                    <span className={styles.productShopifyTag}>
                      <ShopifyBadge />
                      Shopify - Live
                    </span>
                    <span className={styles.productName}>Glow Serum - 30ml</span>
                    <span className={styles.productSku}>GLOW-30ML</span>
                  </div>

                  <div className={styles.productEmbedBody}>
                    <div className={styles.productImage}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>

                    <div className={styles.productDetails}>
                      <div className={styles.productRow}>
                        <span className={styles.productLabel}>Price</span>
                        <span className={styles.productValue}>$48.00</span>
                      </div>
                      <div className={styles.productRow}>
                        <span className={styles.productLabel}>In stock</span>
                        <span className={cx(styles.productValue, styles.productValueGreen)}>
                          1,240 units
                        </span>
                      </div>
                      <div className={styles.productRow}>
                        <span className={styles.productLabel}>Units sold (MTD)</span>
                        <span className={styles.productValue}>1,840</span>
                      </div>
                      <div className={styles.productRow}>
                        <span className={styles.productLabel}>Status</span>
                        <span className={cx(styles.productValue, styles.productValueSage)}>
                          Active
                        </span>
                      </div>
                      <div className={styles.productVariants}>
                        <span className={styles.productVariant}>30ml</span>
                        <span className={styles.productVariant}>50ml</span>
                        <span className={cx(styles.productVariant, styles.productVariantMuted)}>
                          +1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.contextStub}>
                  <div className={styles.contextStubLabel}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Influencer Deliverables - 14 of 16 received
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <p className={styles.shopifyLabel}>Shopify Product Blocks</p>
            <h2>
              Product details, variants, units sold - right next to the{" "}
              <em className={styles.shopifyEmphasis}>launch timeline.</em>
            </h2>
            <p>
              Embed a Shopify product into any project. See product details, variant data, and
              units sold right next to the creative brief, the influencer deliverables, and the
              launch timeline.
            </p>
            <p>
              <strong>
                The product and the work about the product, finally in the same place.
              </strong>
            </p>
            <ul className={styles.shopifyList}>
              <li>Embed any Shopify product into any project tab</li>
              <li>Live data for price, stock, variants, and units sold</li>
              <li>Product context updates in the background automatically</li>
              <li>Link directly to Shopify admin if you need to go deeper</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <p className={styles.shopifyLabel}>Project From Product</p>
            <h2>
              Born with product context <em className={styles.shopifyEmphasis}>already attached.</em>
            </h2>
            <p>
              Create a Saria project directly from a Shopify product. The project is born with
              product context already attached, no copy-pasting SKUs, no linking spreadsheets, and
              no setup from scratch.
            </p>
            <ul className={styles.shopifyList}>
              <li>One click from any Shopify product to a Saria project</li>
              <li>SKU, variants, inventory, and price pre-attached</li>
              <li>Default tabs generated from a product launch template</li>
              <li>Product block embedded on the overview tab automatically</li>
            </ul>
          </div>

          <div className={styles.projectFromProduct}>
            <div className={styles.shopifyCard}>
              <div className={styles.shopifyCardImage} />
              <div className={styles.shopifyCardInfo}>
                <div className={styles.shopifyCardName}>Glow Serum - 30ml</div>
                <div className={styles.shopifyCardMeta}>
                  SKU: GLOW-30ML - Active - 1,240 in stock
                </div>
              </div>
              <button type="button" className={styles.shopifyCardButton}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
                Create Saria project
              </button>
            </div>

            <div className={styles.projectArrow}>
              <div className={styles.projectArrowLine} />
              <span>Project created</span>
              <div className={styles.projectArrowLine} />
            </div>

            <div className={styles.trakBornCard}>
              <div className={styles.trakBornHeader}>
                <span className={styles.trakBornTitle}>Glow Serum - Launch</span>
                <span className={styles.trakBornBadge}>From Shopify</span>
              </div>

              <div className={styles.trakBornBody}>
                <div className={styles.trakBornItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  </svg>
                  SKU: GLOW-30ML
                </div>
                <div className={styles.trakBornItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  1,240 units - 2 variants
                </div>
                <div className={styles.trakBornItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  $48.00 - Active
                </div>
                <div className={styles.trakBornItem}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  Sales synced
                </div>
                <div className={cx(styles.trakBornItem, styles.trakBornItemFaint)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                  Overview tab ready
                </div>
                <div className={cx(styles.trakBornItem, styles.trakBornItemFaint)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="9 11 12 14 22 4" />
                  </svg>
                  Default tasks added
                </div>
              </div>

              <div className={styles.trakBornFooter}>
                <span className={styles.trakBornTab}>Overview</span>
                <span className={styles.trakBornTab}>Brief</span>
                <span className={styles.trakBornTab}>Tasks</span>
                <span className={styles.trakBornTab}>Timeline</span>
                <span className={cx(styles.trakBornTab, styles.trakBornTabMuted)}>+ Add tab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTr)}>
          <div className={styles.darkMock}>
            <div className={styles.darkTopbar}>
              <WindowDots />
              <span className={styles.darkTopbarTitle}>Glow Serum - Sales Analytics</span>
              <span className={styles.darkTopbarStatus}>
                <span className={styles.syncDot} />
                Shopify - live
              </span>
            </div>

            <div className={styles.salesHeaderArea}>
              <div className={styles.salesProductRow}>
                <div className={styles.salesProductThumb} />
                <div>
                  <div className={styles.salesProductName}>Glow Serum - 30ml</div>
                  <div className={styles.salesProductSku}>GLOW-30ML</div>
                </div>
              </div>
            </div>

            <div className={styles.salesStats}>
              <div className={styles.salesStat}>
                <div className={styles.salesStatLabel}>Units sold</div>
                <div className={styles.salesStatValue}>1,840</div>
                <div className={cx(styles.salesDelta, styles.salesDeltaUp)}>Up 12%</div>
              </div>
              <div className={styles.salesStat}>
                <div className={styles.salesStatLabel}>Revenue</div>
                <div className={styles.salesStatValue}>$88K</div>
                <div className={cx(styles.salesDelta, styles.salesDeltaUp)}>Up 9%</div>
              </div>
              <div className={styles.salesStat}>
                <div className={styles.salesStatLabel}>Avg. order</div>
                <div className={styles.salesStatValue}>$68</div>
                <div className={cx(styles.salesDelta, styles.salesDeltaUp)}>Up 4%</div>
              </div>
              <div className={styles.salesStat}>
                <div className={styles.salesStatLabel}>In stock</div>
                <div className={styles.salesStatValue}>1,240</div>
                <div className={cx(styles.salesDelta, styles.salesDeltaDown)}>Down 600</div>
              </div>
            </div>

            <div className={styles.salesChartArea}>
              <div className={styles.salesChartLabel}>
                Units sold - daily
                <div className={styles.dateRangeTabs}>
                  <span className={styles.dateRangeTab}>7d</span>
                  <span className={cx(styles.dateRangeTab, styles.dateRangeTabActive)}>30d</span>
                  <span className={styles.dateRangeTab}>90d</span>
                </div>
              </div>

              <div className={styles.lineArea}>
                <svg viewBox="0 0 500 70" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="connect-sales-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(110,165,40,0.22)" />
                      <stop offset="100%" stopColor="rgba(110,165,40,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,58 C40,55 70,48 100,44 S150,50 180,36 S230,26 260,22 S310,28 340,18 S400,12 440,15 S480,9 500,8 L500,70 L0,70 Z"
                    fill="url(#connect-sales-gradient)"
                  />
                  <path
                    d="M0,58 C40,55 70,48 100,44 S150,50 180,36 S230,26 260,22 S310,28 340,18 S400,12 440,15 S480,9 500,8"
                    fill="none"
                    stroke="rgba(110,165,40,0.65)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className={styles.variantSection}>
                <div className={styles.variantSectionLabel}>By variant</div>
                <div className={styles.variantRow}>
                  <span className={styles.variantName}>30ml</span>
                  <div className={styles.variantTrack}>
                    <div className={styles.variantFillPrimary} />
                  </div>
                  <span className={styles.variantUnits}>1,472</span>
                </div>
                <div className={styles.variantRow}>
                  <span className={styles.variantName}>50ml</span>
                  <div className={styles.variantTrack}>
                    <div className={styles.variantFillSecondary} />
                  </div>
                  <span className={styles.variantUnits}>368</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.showcaseText}>
            <p className={styles.shopifyLabel}>Sales Analytics</p>
            <h2>
              Know how a product is performing without{" "}
              <em className={styles.shopifyEmphasis}>leaving your workspace.</em>
            </h2>
            <p>
              Units sold computed from Shopify orders, cached hourly, with background processing
              for longer date ranges. Revenue, velocity, variant breakdown, all inside the project
              where the work is happening.
            </p>
            <ul className={styles.shopifyList}>
              <li>Units sold computed directly from Shopify orders</li>
              <li>Cached hourly for fresh results without slow queries</li>
              <li>Revenue, AOV, and variant breakdown in one view</li>
              <li>Daily, 30-day, and 90-day ranges on demand</li>
              <li>No Shopify admin redirect needed</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={cx(styles.showcase, styles.showcaseBorder)}>
        <div className={cx(styles.showcaseRow, styles.showcaseRowTl)}>
          <div className={styles.showcaseText}>
            <p className={styles.shopifyLabel}>AI That Knows Your Catalog</p>
            <h2>
              Ask how a product did. Get an answer, not a{" "}
              <em className={styles.shopifyEmphasis}>redirect.</em>
            </h2>
            <p>
              Search products, look up details, pull sales data, and build product tables through
              the AI layer. Ask "how did Glow Serum do last month" and get an actual answer pulled
              from live Shopify data.
            </p>
            <ul className={styles.shopifyList}>
              <li>Natural language queries against your full product catalog</li>
              <li>AI pulls live Shopify data directly into the response</li>
              <li>Build product comparison tables from a question</li>
              <li>Results land on the page as blocks, not just chat text</li>
            </ul>
          </div>

          <div className={styles.darkMock}>
            <div className={styles.darkTopbar}>
              <WindowDots />
              <span className={styles.darkTopbarTitle}>AI - Workspace search</span>
              <span className={styles.darkTopbarStatus}>
                <span className={styles.syncDot} />
                Shopify connected
              </span>
            </div>

            <div className={styles.aiChat}>
              <div className={styles.aiUser}>
                <span className={styles.aiPrompt}>&gt;</span>
                how did Glow Serum do last month
              </div>
              <div className={styles.aiResponse}>
                <div className={styles.aiAvatar}>S</div>
                <div className={styles.aiResponseBody}>
                  <div className={styles.aiResponseText}>
                    <strong>Glow Serum sold 1,840 units</strong> last month, up 12% vs prior
                    month. Revenue was $88K, AOV $68. The 30ml drove 80% of volume. Stock is at
                    1,240 units as of this morning.
                  </div>
                </div>
              </div>

              <div className={styles.aiUser}>
                <span className={styles.aiPrompt}>&gt;</span>
                compare all active products by units sold this month
              </div>
              <div className={styles.aiResponse}>
                <div className={styles.aiAvatar}>S</div>
                <div className={styles.aiResponseBody}>
                  <div className={styles.aiResponseText}>
                    <strong>Product table built from your Shopify catalog</strong>, live data,
                    sorted by units.
                  </div>

                  <div className={styles.aiTableBlock}>
                    <div className={styles.aiTableHead}>
                      <span className={styles.aiTableLabel}>Product comparison - April 2025</span>
                      <span className={styles.aiTableLive}>
                        <span className={styles.aiTableLiveDot} />
                        Shopify - live
                      </span>
                    </div>

                    <table className={styles.aiTable}>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Units</th>
                          <th>Revenue</th>
                          <th>vs. last mo.</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={styles.aiTableName}>Glow Serum 30ml</td>
                          <td>1,840</td>
                          <td>$88K</td>
                          <td className={styles.aiTableUp}>Up 12%</td>
                        </tr>
                        <tr>
                          <td className={styles.aiTableName}>SPF Drops</td>
                          <td>1,204</td>
                          <td>$60K</td>
                          <td className={styles.aiTableUp}>Up 4%</td>
                        </tr>
                        <tr>
                          <td className={styles.aiTableName}>Cleanser</td>
                          <td>986</td>
                          <td>$34K</td>
                          <td className={styles.aiTableDown}>Down 6%</td>
                        </tr>
                        <tr>
                          <td className={styles.aiTableName}>Eye Cream</td>
                          <td>442</td>
                          <td>$31K</td>
                          <td className={styles.aiTableUp}>Up 22%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.aiInputRow}>
              <input className={styles.aiInput} placeholder="Ask anything about your catalog..." />
              <button type="button" className={styles.aiSend}>
                Ask
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stackSection}>
        <div className={styles.stackInner}>
          <div className={styles.stackHeader}>
            <div>
              <p className={styles.monoLabel}>And the rest of your stack</p>
              <h2 className={styles.stackHeading}>
                Shopify is first-class.
                <br />
                <em>Everything else connects.</em>
              </h2>
            </div>
            <p className={styles.stackDescription}>
              Google Drive stays your file source of truth. Google Calendar merges with your
              project timeline. Slack runs Saria commands from any channel. CSV data imports
              directly into tables.
            </p>
          </div>

          <div className={styles.stackGrid}>
            {STACK_CARDS.map((card) => (
              <article key={card.title} className={styles.stackCard}>
                <div className={styles.stackCardIcon}>{card.icon}</div>
                <div className={styles.stackCardName}>{card.title}</div>
                <div className={styles.stackCardBody}>{card.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresHeading}>
            Six ways Shopify lives <em>inside your workspace.</em>
          </h2>
          <p className={styles.featuresSubhead}>
            Not synced to a sidebar. Not linked in a doc. First-class, queryable, and connected to
            every project where the work actually happens.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className={styles.featureCard}>
              <span className={styles.featureTag}>{card.tag}</span>
              <div className={cx(styles.featureIcon, card.shopify && styles.featureIconShopify)}>
                {card.icon}
              </div>
              <h3 className={styles.featureTitle}>{card.title}</h3>
              <p className={styles.featureBody}>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.closingInner}>
          <p className={styles.closingLabel}>05 - Connect</p>
          <p className={styles.closingQuote}>
            "Every D2C brand runs on Shopify.
            <br />
            Every D2C team manages work
            <br />
            <em>somewhere else.</em>
            <br />
            Saria is the first tool that treats
            <br />
            those as the same problem."
          </p>
          <div className={styles.closingRule} />
          <div className={styles.closingActions}>
            <a href="#" className={styles.shopifyButton}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              Start with Shopify
            </a>
            <a href="#" className={styles.ghostLightButton}>
              See all features
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footerBar}>
        <div className={styles.footerBarInner}>
          <span className={styles.footerLogo}>Saria</span>
          <div className={styles.footerLinks}>
            <a href="#">Product</a>
            <a href="#">Templates</a>
            <Link href="/pricing">Pricing</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
