import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PricingCards } from '@/components/PricingCards';
import { PricingCanceled } from '@/components/PricingCanceled';
import styles from '@/app/pricing/page.module.css';

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Pricing</h1>
          <p className={styles.subtitle}>
            Simple pricing. Built to scale with your brand.
          </p>
          <p className={styles.subtitle}>
            From early structure to full operational infrastructure — Trak grows
            with the way you operate.
          </p>
          <PricingCards />
          <PricingCanceled />

          <section className={styles.why}>
            <div className={styles.whyInner}>
              <h2 className={styles.whyTitle}>Built for serious operators</h2>
              <p className={styles.whyText}>
                Organizations let you structure your company the way it actually
                runs.
              </p>
              <div className={styles.orgExample}>
                <p className={styles.orgName}>ABC Beauty</p>
                <ul className={styles.orgList}>
                  <li>&rarr; Product</li>
                  <li>&rarr; Growth</li>
                  <li>&rarr; Retail</li>
                  <li>&rarr; International</li>
                </ul>
                <p className={styles.orgCaption}>
                  Each team operates in its own workspace — while leadership
                  maintains visibility across everything.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.scale}>
            <p className={styles.scaleLine}>
              As your operations grow, Trak grows with you.
            </p>
            <p className={styles.scaleLine}>
              Start with a single workspace. Expand into full organizational
              infrastructure when you&rsquo;re ready.
            </p>
            <p className={styles.scaleLine}>
              No migrations. No switching tools. Just scale.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
