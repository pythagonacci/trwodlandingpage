import styles from './FeatureCard.module.css';

type Props = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export function FeatureCard({ number, title, children }: Props) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{number}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
