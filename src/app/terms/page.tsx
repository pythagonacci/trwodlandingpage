import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from '@/app/legal.module.css';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <h1>Terms of Service</h1>
          <p className={styles.updated}>Last updated: March 2025</p>
          <p>
            By using Trak&apos;s website and services, you agree to these terms.
            If you do not agree, do not use our services.
          </p>
          <h2>Use of service</h2>
          <p>
            You must use Trak in compliance with applicable laws and not for any
            illegal or unauthorized purpose. You are responsible for keeping
            your account credentials secure and for activity under your
            account.
          </p>
          <h2>Subscription and payment</h2>
          <p>
            Paid plans are billed according to the pricing displayed at
            checkout. You may cancel at any time. Refunds are handled according
            to our refund policy.
          </p>
          <h2>Intellectual property</h2>
          <p>
            Trak and its content, features, and functionality are owned by us
            or our licensors. You may not copy, modify, or distribute our
            materials without permission.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Trak shall not be liable for
            indirect, incidental, or consequential damages arising from your use
            of the service.
          </p>
          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continued use after
            changes constitutes acceptance. For material changes, we will
            provide notice where appropriate.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us via the contact form or the
            email in the footer.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
