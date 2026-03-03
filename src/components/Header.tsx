import Link from 'next/link';
import { Button } from './Button';
import styles from './Header.module.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Trak
        </Link>
        <div className={styles.navLinks}>
          <Link href="/#features">Features</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Button href={appUrl ? `${appUrl}/signup` : '#'} external>
            Get Started
          </Button>
          <Link
            href={appUrl ? `${appUrl}/login` : '#'}
            className={styles.loginLink}
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
}
