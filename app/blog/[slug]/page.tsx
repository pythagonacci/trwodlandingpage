import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/app/seo";
import { ArticleBody } from "@/components/blog/ArticleBody";
import articleStyles from "@/components/blog/article-content.module.css";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { formatPostDate, type PostRecord } from "@/lib/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { renderTiptapContent } from "@/lib/tiptap/render";
import styles from "./blog-post.module.css";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPublishedPost(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, content, is_published, published_at, created_at, updated_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as PostRecord;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return createPageMetadata({
      title: "Journal | Saria",
      description: "Editorial notes, launch breakdowns, and operating insights from the Saria team.",
      path: "/blog"
    });
  }

  return createPageMetadata({
    title: `${post.title} | Saria Journal`,
    description: post.excerpt || `Read ${post.title} on the Saria Journal.`,
    path: `/blog/${post.slug}`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <article className={styles.shell}>
          <div className={`${styles.article} ${articleStyles.articleColumn}`}>
            <header className={articleStyles.articleHeader}>
              <p className={articleStyles.articleEyebrow}>{formatPostDate(post.published_at)}</p>
              <h1 className={articleStyles.articleTitle}>{post.title}</h1>
              {post.excerpt ? <p className={articleStyles.articleExcerpt}>{post.excerpt}</p> : null}
            </header>

            {post.cover_image_url ? (
              <figure className={articleStyles.heroFigure}>
                <img src={post.cover_image_url} alt="" className={articleStyles.heroImage} />
              </figure>
            ) : null}

            <div className={styles.bodySpacing}>
              <ArticleBody html={renderTiptapContent(post.content)} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
