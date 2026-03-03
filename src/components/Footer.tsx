import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wideContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              Trak
            </Link>
            <p>
              The project management platform built for modern D2C brands.
              Beautiful, intelligent, effortless.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Product</h4>
            <ul>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/#features">Integrations</Link></li>
              <li><Link href="/#features">Changelog</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/demo">Request Demo</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Trak. All rights reserved.</p>
          <p>Built with intention.</p>
        </div>
      </div>
    </footer>
  );
}
