import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
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
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      priority: 0.8
    }
  ];

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data) {
      return staticRoutes;
    }

    return [
      ...staticRoutes,
      ...data.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : lastModified,
        priority: 0.7
      }))
    ];
  } catch {
    return staticRoutes;
  }
}
