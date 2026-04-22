import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";
import { getPublishedPosts } from "@/lib/cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getPublishedPosts();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      priority: 1
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      priority: 0.9
    },
    {
      url: `${SITE_URL}/product/organize`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/product/create`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/product/intelligent-action`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/product/collaborate`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/product/connect`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/multi-project-management`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/team-task-management`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/product-launch`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/dashboard-visibility`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/product-development-design`,
      lastModified,
      priority: 0.85
    },
    {
      url: `${SITE_URL}/use-cases/internal-documentation-resources`,
      lastModified,
      priority: 0.85
    }
  ];

  return [
    ...staticRoutes,
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      priority: 0.75
    },
    ...posts
      .filter((post) => post.categories)
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.categories!.slug}/${post.slug}`,
        lastModified: new Date(post.updated_at),
        priority: post.featured ? 0.78 : 0.7
      }))
  ];
}
