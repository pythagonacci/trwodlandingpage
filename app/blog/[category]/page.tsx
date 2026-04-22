import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import styles from "@/components/blog/blog-page.module.css";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { SITE_URL } from "@/app/seo";
import { getPublicCategories, getPublicCategoryBySlug, getPublishedPosts } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getPublicCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Saria Blog`,
    description: category.description ?? `Articles in ${category.name} from Saria.`,
    alternates: {
      canonical: new URL(`/blog/${category.slug}`, SITE_URL).toString()
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const [category, categories, posts] = await Promise.all([
    getPublicCategoryBySlug(categorySlug),
    getPublicCategories(),
    getPublishedPosts({ categorySlug })
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Nav />
      <main>
        <section className={`${styles.frame} ${styles.indexHero}`}>
          <div className={styles.eyebrow}>Category</div>
          <h1>{category.name}</h1>
          {category.description ? <p>{category.description}</p> : null}
          <nav className={styles.categoryNav} aria-label="Blog categories">
            <Link href="/blog">All</Link>
            {categories.map((item) => (
              <Link key={item.id} href={`/blog/${item.slug}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </section>
        <section className={`${styles.frame} ${styles.postGrid}`}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </section>
        {!posts.length ? (
          <div className={styles.frame}>
            <div className={styles.emptyState}>No published posts in this category yet.</div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
