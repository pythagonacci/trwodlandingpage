'use client';

import { Button } from './Button';
import { VideoFrame } from './VideoFrame';
import { DemoModal } from './DemoModal';
import styles from './HeroSplit.module.css';
import { useState } from 'react';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

export function HeroSplit() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.wideContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.badge}>AI-Native for Commerce</div>
              <h1>The Operating System for Modern D2C Brands.</h1>
              <p className={styles.subtitle}>
                Powerful enough for everything you do. Designed to feel
                effortless.
              </p>
              <div className={styles.heroCta}>
                <Button
                  href={appUrl ? `${appUrl}/signup` : '/pricing'}
                  external={!!appUrl}
                >
                  Start Free Trial
                </Button>
                <Button variant="secondary" onClick={() => setDemoOpen(true)}>
                  Watch Demo
                </Button>
              </div>
              <p className={styles.tagline}>Launch January 19th</p>
            </div>
            <div className={styles.heroVisual}>
              <VideoFrame />
            </div>
          </div>
        </div>
      </section>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
