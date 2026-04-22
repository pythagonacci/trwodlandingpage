import Link from "next/link";
import type { PostWithCategory } from "@/lib/cms/types";
import { formatDate } from "@/lib/cms/validation";
import styles from "@/components/blog/blog-page.module.css";

export function BlogPostCard({ post, priority = false }: { post: PostWithCategory; priority?: boolean }) {
  const category = post.categories;
  const href = category ? `/blog/${category.slug}/${post.slug}` : "/blog";

  return (
    <article className={priority ? styles.featuredCard : styles.postCard}>
      <Link href={href} className={styles.cardImageLink}>
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt={post.cover_image_alt ?? ""} className={styles.cardImage} />
        ) : (
          <div className={styles.cardPlaceholder} />
        )}
      </Link>
      <div className={styles.cardContent}>
        <div className={styles.metaRow}>
          <span>{category?.name ?? "Editorial"}</span>
          <span>{formatDate(post.published_at)}</span>
          <span>{post.reading_time} min read</span>
        </div>
        <h2>
          <Link href={href}>{post.title}</Link>
        </h2>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </div>
    </article>
  );
}
