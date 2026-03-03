'use client';

import styles from './VideoFrame.module.css';

const VIDEO_SRC = '/demos/hero.mp4';
const POSTER_SRC = '/demos/hero-poster.jpg';
const LABEL = 'Workflow demo • Launch control center';

export function VideoFrame() {
  return (
    <div className={styles.heroMedia} aria-label="Trak workflow demo video">
      <video
        className={styles.heroVideo}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className={styles.heroMediaLabel}>{LABEL}</div>
    </div>
  );
}
