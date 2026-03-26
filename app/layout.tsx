import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saria — The Brand Operating System",
  description:
    "Saria is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify.",
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
        <link rel="preload" href="/media/demo1-web.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/media/frv2demo2-web.mp4" as="video" type="video/mp4" />
      </head>
      <body className="bg-cream text-ink font-sans antialiased overflow-x-hidden">
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
