import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import styles from '@/app/about/page.module.css';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>About Trak</h1>
          <p className={styles.intro}>
            Trak is the operating system for modern D2C brands. We combine
            AI-powered project management, native Shopify integration, and
            frictionless collaboration so your team and external partners stay
            in sync—without the complexity.
          </p>
          <p className={styles.body}>
            You started your brand because you saw something missing. You built
            something better. Your tools should match that ambition. Trak is
            built for companies that refuse to compromise on their products,
            their standards, or their software.
          </p>
          <div className={styles.cta}>
            <Link href="/#pricing" className={styles.link}>
              See pricing
            </Link>
            <Link href="/contact" className={styles.link}>
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
