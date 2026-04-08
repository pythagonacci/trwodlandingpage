import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { Templates } from "@/components/landing/Templates";

export const metadata = createPageMetadata({
  title: "Multi-SKU / Seasonal Drop Template | Saria",
  description:
    "See how Saria's Multi-SKU / Seasonal Drop template helps modern D2C brands run fast, coordinated product launches from one workspace.",
  path: "/templates/multi-sku-seasonal-drop"
});

export default function MultiSkuSeasonalDropPage() {
  return (
    <>
      <Nav />
      <main>
        <Templates />
      </main>
      <Footer />
    </>
  );
}
