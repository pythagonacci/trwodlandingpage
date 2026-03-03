import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import styles from '@/app/demo/page.module.css';

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Request a demo</h1>
          <p className={styles.subtitle}>
            See Trak in action. We&apos;ll reach out to schedule a walkthrough.
          </p>
          <ContactForm source="demo" />
        </div>
      </main>
      <Footer />
    </>
  );
}
