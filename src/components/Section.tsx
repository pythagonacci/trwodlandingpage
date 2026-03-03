import React, { type ReactNode } from 'react';
import styles from './Section.module.css';

type SectionProps = {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
};

export function Section({
  children,
  className = '',
  alt,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${alt ? styles.sectionAlt : ''} ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  center,
  accentLine,
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  accentLine?: boolean;
}) {
  return (
    <div
      className={`${styles.sectionHeader} ${center ? styles.sectionHeaderCenter : ''}`}
    >
      {accentLine && <div className={styles.accentLine} />}
      {label && (
        <div className={`label ${styles.sectionLabel}`}>{label}</div>
      )}
      <h2>{title}</h2>
      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </div>
  );
}

export function TwoCol({ children }: { children: ReactNode }) {
  const nodes = React.Children.toArray(children);
  const [first, second] = nodes;
  return (
    <div className={styles.twoCol}>
      {first}
      {second}
    </div>
  );
}

export function ContentBlock({ children }: { children: ReactNode }) {
  return <div className={styles.contentBlock}>{children}</div>;
}
