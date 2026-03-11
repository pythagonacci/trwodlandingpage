import { Nav } from "../components/landing/Nav";
import { Hero } from "../components/landing/Hero";
import { Strip } from "../components/landing/Strip";
import { Pain } from "../components/landing/Pain";
import { Features } from "../components/landing/Features";
import { Comparison } from "../components/landing/Comparison";
import { MagicLinks } from "../components/landing/MagicLinks";
import { CTA } from "../components/landing/CTA";
import { Footer } from "../components/landing/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Pain />
        <Features />
        <Comparison />
        <MagicLinks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

