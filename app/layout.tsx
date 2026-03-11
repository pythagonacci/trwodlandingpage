import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display"
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Trak — The Brand Operating System",
  description:
    "Trak is the brand operating system for modern D2C teams — launches, campaigns, and collaborators in one workspace, built around Shopify."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} scroll-smooth`}>
      <body className="bg-cream text-ink font-sans antialiased overflow-x-hidden">
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}

