import styles from './VisualCard.module.css';

type Props = {
  label: string;
};

export function VisualCard({ label }: Props) {
  return (
    <div className={styles.visualPlaceholder} aria-hidden>
      {label}
    </div>
  );
}
