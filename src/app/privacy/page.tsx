import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from '@/app/legal.module.css';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: March 2025</p>
          <p>
            Trak (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy.
            This policy describes how we collect, use, and protect your
            information when you use our website and services.
          </p>
          <h2>Information we collect</h2>
          <p>
            We collect information you provide directly (e.g., name, email,
            company when you contact us or request a demo), usage data when you
            use our product, and technical data such as IP address and browser
            type.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information to provide and improve our services,
            communicate with you, and ensure security and compliance.
          </p>
          <h2>Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with
            service providers (e.g., hosting, email, analytics) under strict
            agreements.
          </p>
          <h2>Your rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct,
            or delete your data. Contact us at the email below to exercise these
            rights.
          </p>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us via the contact form on
            this site or at the email address provided in the footer.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
