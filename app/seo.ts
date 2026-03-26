import type { Metadata } from "next";

export const SITE_URL = "https://sariasoftware.com";
export const DEFAULT_OG_IMAGE = "/media/demo1-poster.jpg";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path
}: PageMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : new URL(path, SITE_URL).toString();
  const image = {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "Saria workspace preview"
  };

  return {
    title: {
      absolute: title
    },
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      siteName: "Saria",
      title,
      description,
      url,
      images: [image]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
