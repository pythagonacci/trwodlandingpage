import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/app/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saria — The Brand Operating System",
    template: "%s | Saria"
  },
  description:
    "Saria is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify.",
  openGraph: {
    type: "website",
    siteName: "Saria",
    title: "Saria — The Brand Operating System",
    description:
      "Saria is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Saria workspace preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Saria — The Brand Operating System",
    description:
      "Saria is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify.",
    images: [DEFAULT_OG_IMAGE]
  },
  icons: {
    icon: "/logo-copy.png",
    shortcut: "/logo-copy.png",
    apple: "/logo-copy.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/media/demo1-poster.jpg" as="image" />
      </head>
      <body className="bg-cream text-ink font-sans antialiased overflow-x-hidden">
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
