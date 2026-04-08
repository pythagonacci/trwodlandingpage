import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { PopupTemplate } from "@/components/landing/PopupTemplate";

export const metadata = createPageMetadata({
  title: "Pop-Ups Template | Saria",
  description:
    "See how Saria's Pop-Ups template helps brand teams plan, coordinate, and run retail events from one workspace.",
  path: "/templates/pop-ups"
});

export default function PopUpsTemplatePage() {
  return (
    <>
      <Nav />
      <main>
        <PopupTemplate />
      </main>
      <Footer />
    </>
  );
}
