import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import styles from '@/app/legal.module.css';

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <h1>Security</h1>
          <p className={styles.updated}>Last updated: March 2025</p>
          <p>
            Trak takes security seriously. This page summarizes how we protect
            your data and our infrastructure.
          </p>
          <h2>Data protection</h2>
          <p>
            We use industry-standard encryption (TLS in transit, encryption at
            rest where applicable). Data is stored in secure, access-controlled
            environments.
          </p>
          <h2>Authentication</h2>
          <p>
            We rely on Supabase Auth for authentication. Passwords are hashed
            and we support secure sign-in flows. We recommend strong passwords
            and, where available, two-factor authentication.
          </p>
          <h2>Access and monitoring</h2>
          <p>
            Access to production systems is limited and logged. We monitor for
            suspicious activity and respond to incidents according to our
            internal procedures.
          </p>
          <h2>Compliance</h2>
          <p>
            We design our systems with privacy and security in mind. For
            specific compliance questions (e.g., SOC 2, GDPR), please contact
            us.
          </p>
          <h2>Reporting</h2>
          <p>
            If you believe you have found a security vulnerability, please
            report it to us responsibly via our contact form. Do not disclose
            it publicly before we have had a chance to address it.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
