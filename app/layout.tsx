import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display"
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans"
});

const heroDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hero-display"
});

export const metadata: Metadata = {
  title: "Saria — The Brand Operating System",
  description:
    "Saria is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${heroDisplay.variable} scroll-smooth`}
    >
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
