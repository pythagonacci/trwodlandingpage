import styles from "@/components/blog/article-content.module.css";

type ArticleBodyProps = {
  html: string;
  className?: string;
};

export function ArticleBody({ html, className }: ArticleBodyProps) {
  const cardClassName = className ? `${styles.bodyCard} ${className}` : styles.bodyCard;

  return (
    <div className={cardClassName}>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
