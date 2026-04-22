import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import styles from "@/components/blog/blog-page.module.css";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { SITE_URL } from "@/app/seo";
import { getPublicCategories, getPublishedPosts } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Saria",
  description: "Launch teardowns, brand operations essays, and product strategy from Saria.",
  alternates: {
    canonical: new URL("/blog", SITE_URL).toString()
  }
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getPublicCategories()
  ]);
  const [featured, ...rest] = posts;

  return (
    <div className={styles.page}>
      <Nav />
      <main>
        <section className={`${styles.frame} ${styles.indexHero}`}>
          <div className={styles.eyebrow}>Editorial</div>
          <h1>Essays for modern brand operators.</h1>
          <p>
            Product essays, launch teardowns, and operating ideas for teams managing campaigns,
            creative work, and growth systems.
          </p>
          <nav className={styles.categoryNav} aria-label="Blog categories">
            <Link href="/blog">All</Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/blog/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </nav>
        </section>

        <section className={`${styles.frame} ${styles.postGrid}`}>
          {featured ? <BlogPostCard post={featured} priority /> : null}
          {rest.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </section>
        {!posts.length ? (
          <div className={styles.frame}>
            <div className={styles.emptyState}>
              Published posts will appear here after the first article is published from Studio.
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
