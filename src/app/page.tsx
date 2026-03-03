import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSplit } from '@/components/HeroSplit';
import {
  Section,
  SectionHeader,
  TwoCol,
  ContentBlock,
} from '@/components/Section';
import { VisualCard } from '@/components/VisualCard';
import { FeatureCard } from '@/components/FeatureCard';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Button } from '@/components/Button';
import styles from '@/app/page.module.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSplit />

      {/* What is Trak */}
      <section className={styles.whatIs}>
        <div className={styles.narrowCenter}>
          <p className={styles.whatIsText}>
            Trak combines AI-powered project management, native Shopify
            integration, and frictionless collaboration in one platform. Manage
            launches, campaigns, and operations while your team and external
            partners stay perfectly in sync.
          </p>
        </div>
      </section>

      {/* Built for How Brands Actually Operate */}
      <Section>
        <div className="container">
          <SectionHeader
            label="CRAFTED FOR OPERATORS"
            title="Built for How Brands Actually Operate."
            intro="Most tools manage tasks. Trak embeds your entire workflow in one place—products, images, videos, files, tasks, approvals, and live Shopify data—so execution happens where the work actually lives."
            center
          />
          <TwoCol>
            <ContentBlock key="c">
              <p>
                Every project becomes a management hub. Creative assets sit
                next to deadlines. SKUs sit next to launch plans. Tasks,
                approvals, and ownership are visible in one structured
                workflow.
              </p>
              <p>
                See what&apos;s on track, what&apos;s blocked, and who&apos;s
                responsible—without chasing updates or digging through
                threads. Context stays attached to the work, so decisions
                happen faster and execution stays aligned.
              </p>
              <p>
                Ask questions in plain English, trigger bulk updates, generate
                structured reports, and surface blockers in seconds. AI
                doesn&apos;t sit on top of your work—it acts inside it.
              </p>
            </ContentBlock>
            <VisualCard key="v" label="[Premium Design Detail]" />
          </TwoCol>
        </div>
      </Section>

      {/* Designed for Speed and Intelligence / It Just Works */}
      <Section alt>
        <div className="container">
          <TwoCol>
            <VisualCard key="v" label="[AI Assistant Demo]" />
            <ContentBlock key="c">
              <div className="label" style={{ marginBottom: 16 }}>
                Designed for Speed and Intelligence
              </div>
              <h2>It Just Works</h2>
              <p>
                Your brand moves fast. Your software should think just as fast.
              </p>
              <p>
                With Trak, you don&apos;t navigate menus — you give instructions.
              </p>
              <p>
                &quot;Create a table of all creators organized by submission
                status.&quot; &quot;Update every campaign deadline to April
                15th.&quot; &quot;Show me workload by team for this launch.&quot;
              </p>
              <p>
                Trak understands your data and takes action. It builds
                structured views in seconds, answers real operational
                questions, and executes management updates instantly.
              </p>
              <p>
                Everything lives inside your workflows — projects, products,
                files, tasks. The AI doesn&apos;t sit on top of your system. It
                operates within it.
              </p>
              <p>
                <strong>
                  Enterprise capability.
                  <br />
                  Zero operational drag.
                </strong>
              </p>
            </ContentBlock>
          </TwoCol>
        </div>
      </Section>

      {/* Shopify Built In */}
      <Section>
        <div className="container">
          <TwoCol>
            <ContentBlock key="c">
              <div className="label" style={{ marginBottom: 16 }}>
                SHOPIFY NATIVE
              </div>
              <h2>Shopify. Built In.</h2>
              <p>Your product lives in Shopify. Your workflow should too.</p>
              <p>
                Trak doesn&apos;t integrate with Shopify. It&apos;s built around
                it. Create a project for your Barrier Restore Cream restock,
                and Trak automatically connects to that SKU. Real-time
                inventory levels. Pre-order counts. Fulfillment status.
                Product variants. All the data you need, exactly when you need
                it.
              </p>
              <p>
                <strong>
                  One system, always in sync with the truth. The power of deep
                  integration, the simplicity of native design.
                </strong>
              </p>
            </ContentBlock>
            <VisualCard key="v" label="[Shopify Integration]" />
          </TwoCol>
        </div>
      </Section>

      {/* Magic Links */}
      <Section alt>
        <div className="container">
          <TwoCol>
            <VisualCard key="v" label="[Magic Link Flow]" />
            <ContentBlock key="c">
              <div className="label" style={{ marginBottom: 16 }}>
                ZERO FRICTION
              </div>
              <h2>Magic Links.</h2>
              <p>
                You work with people outside your team. Photographers.
                Agencies. Influencers. Contractors. They need to deliver work.
                You need to receive it. Neither of you needs the complexity.
              </p>
              <p>
                Generate a magic link. Send it. They click. They see exactly
                what they need—a brief, an upload area, a deadline. They drag
                in their files. The work appears in your project, right where
                it belongs.
              </p>
              <p>
                <strong>No accounts. No access issues. Just a link.</strong>
              </p>
            </ContentBlock>
          </TwoCol>
        </div>
      </Section>

      {/* Key Features Grid */}
      <Section id="features">
        <div className="wide-container">
          <SectionHeader
            label="POWERFUL & INTUITIVE"
            title="One Place. Everything."
          />
          <FeatureGrid>
            <FeatureCard
              number="01"
              title="Search. Instant."
            >
              Type &quot;What did we decide about the March launch date?&quot; or
              &quot;Where are those product shots from the desert shoot?&quot;
              AI-powered search that understands context, not just keywords.
              Information shouldn&apos;t hide in folders. With Trak, it
              doesn&apos;t.
            </FeatureCard>
            <FeatureCard
              number="02"
              title="Workspaces. Organized."
            >
              Dedicated environments for different parts of your business.
              Product launches, influencer partnerships, operations. Each with
              its own structure, permissions, and workflows. Scale your
              organization without losing control.
            </FeatureCard>
            <FeatureCard
              number="03"
              title="Beautiful. Intentionally."
            >
              Every pixel is considered. Clean design, thoughtful details, smooth
              interactions. Software that looks like it belongs next to your
              brand, not fighting against it.
            </FeatureCard>
          </FeatureGrid>
        </div>
      </Section>

      {/* Why Now / Problem */}
      <Section alt>
        <div className="container">
          <SectionHeader label="THE PROBLEM" title="Here's what doesn't work:" />
          <div className={styles.valueList}>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>01</div>
              <div className={styles.valueContent}>
                <h3>Scattered Tools</h3>
                <p>
                  Shopify for products. Notion for plans. Slack for updates.
                  Dropbox for files. Email for contractors. Your attention,
                  shattered across six tabs.
                </p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>02</div>
              <div className={styles.valueContent}>
                <h3>Complicated Collaboration</h3>
                <p>
                  Adding contractors to internal systems. Explaining folder
                  structures. Managing permissions. The friction of working with
                  external partners.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.highlightBox}>
            <h3>Here&apos;s what does:</h3>
            <p>
              Open Trak. Your projects. Your files. Your Shopify data. Your
              collaborators&apos; work. Your AI assistant. One place, always
              current, infinitely capable. Built for how D2C brands actually
              operate.
            </p>
          </div>
        </div>
      </Section>

      {/* Create Boldly */}
      <Section id="about">
        <div className="container">
          <SectionHeader
            title="Create Boldly."
            intro="You started this brand because you saw something missing. You built something better. You launch products people didn't know they needed, coordinate teams across continents, move faster than anyone expects."
            center
            accentLine
          />
          <TwoCol>
            <ContentBlock key="c">
              <p>Your tools should match your ambition. Not limit it.</p>
              <p>
                Trak is infrastructure built for scale. Launch as fast as you
                want. Coordinate as many people as you need. Manage complexity
                without drowning in it. Build as boldly as you dare.
              </p>
              <p>
                <strong>
                  The software just works. So you can focus on creating
                  something that matters.
                </strong>
              </p>
            </ContentBlock>
            <VisualCard key="v" label="[Brand Vision]" />
          </TwoCol>
        </div>
      </Section>

      {/* Final CTA */}
      <section className={styles.finalCta} id="pricing">
        <div className="container">
          <h2>Ready to create boldly?</h2>
          <p className="subtitle">
            Join the modern D2C brands building faster with Trak.
          </p>
          <div className={styles.ctaRow}>
            <Button
              href={appUrl ? `${appUrl}/signup` : '/pricing'}
              external={!!appUrl}
              large
            >
              Start Free Trial
            </Button>
            <Link href="/demo">
              <Button variant="secondary" large>
                Schedule Demo
              </Button>
            </Link>
          </div>
          <p className={styles.tagline}>Launch January 19th</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
