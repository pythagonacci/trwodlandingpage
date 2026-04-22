import type { Metadata } from "next";
import { ArticleBody } from "@/components/blog/ArticleBody";
import styles from "@/components/blog/blog-page.module.css";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { SITE_URL } from "@/app/seo";
import { getPublishedPostByRoute } from "@/lib/cms/queries";
import { formatDate } from "@/lib/cms/validation";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPublishedPostByRoute(category, slug);
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "";
  const canonical = post.canonical_url || new URL(`/blog/${category}/${slug}`, SITE_URL).toString();
  const image = post.seo_og_image_url || post.cover_image_url;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type: "article",
      siteName: "Saria",
      title,
      description,
      url: canonical,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : undefined,
      section: post.categories?.name,
      images: image
        ? [
            {
              url: image,
              alt: post.cover_image_alt ?? title
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const post = await getPublishedPostByRoute(category, slug);
  const canonical = post.canonical_url || new URL(`/blog/${category}/${slug}`, SITE_URL).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: post.author_name || "Saria Editorial"
    },
    publisher: {
      "@type": "Organization",
      name: "Saria"
    },
    image: post.seo_og_image_url || post.cover_image_url,
    mainEntityOfPage: canonical
  };

  return (
    <div className={styles.page}>
      <Nav />
      <main>
        <article>
          <header className={`${styles.frame} ${styles.articleHeader}`}>
            <div className={styles.metaRow}>
              <span>{post.categories?.name ?? "Editorial"}</span>
              <span>{post.reading_time} min read</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt ? <p className={styles.articleDek}>{post.excerpt}</p> : null}
            <div className={styles.articleByline}>
              <span>{formatDate(post.published_at)}</span>
              <span>By {post.author_name || "Saria Editorial"}</span>
            </div>
          </header>

          {post.cover_image_url ? (
            <section className={styles.frame}>
              <div className={styles.heroMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image_url} alt={post.cover_image_alt ?? ""} />
              </div>
            </section>
          ) : null}

          <section className={`${styles.frame} ${styles.articleShell}`}>
            <ArticleBody content={post.editor_content_json} />
            <aside className={styles.articleCta}>
              <h2>Run launches, campaigns, and creative work in one workspace.</h2>
              <p>
                Saria helps modern brand teams keep assets, timelines, approvals, and launch
                operations moving together.
              </p>
              <div className={styles.ctaActions}>
                <a
                  href="https://app.sariasoftware.com/start-free-trial"
                  className={styles.primaryCta}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Free Trial
                </a>
                <a href="/pricing" className={styles.secondaryCta}>
                  View Pricing
                </a>
              </div>
            </aside>
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Footer />
    </div>
  );
}
