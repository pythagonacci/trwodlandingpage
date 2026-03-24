import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Pain } from "@/components/landing/Pain";
import { Features } from "@/components/landing/Features";
import { MagicLinks } from "@/components/landing/MagicLinks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Features />
        <MagicLinks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
