import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
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
    }
  ];
}
