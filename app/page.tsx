import { Inter } from "next/font/google";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Pain } from "@/components/landing/Pain";
import { Features } from "@/components/landing/Features";
import { MagicLinks } from "@/components/landing/MagicLinks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = createPageMetadata({
  title: "The Operating System for Modern D2C Brands | Saria",
  description:
    "Saria is the project management platform built for modern D2C brands. Plan product launches, manage content, and collaborate with your team in one workspace.",
  path: "/"
});

export default function Page() {
  return (
    <div className={`landing-linear-light min-h-screen ${inter.variable} ${inter.className}`}>
      <Nav variant="linearLight" />
      <main>
        <Hero />
        <Pain />
        <Features />
        <MagicLinks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
