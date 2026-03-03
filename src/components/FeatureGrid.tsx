import type { ReactNode } from 'react';
import styles from './FeatureGrid.module.css';

export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className={styles.featureGrid}>{children}</div>;
}
