import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { ProductDesignDevelopmentTemplate } from "@/components/landing/ProductDesignDevelopmentTemplate";

export const metadata = createPageMetadata({
  title: "Product Design and Development Template | Saria",
  description:
    "See how Saria's Product Design and Development template helps modern product teams run briefs, samples, manufacturer communication, and launch prep from one workspace.",
  path: "/templates/product-design-and-development"
});

export default function ProductDesignAndDevelopmentTemplatePage() {
  return (
    <>
      <Nav />
      <main>
        <ProductDesignDevelopmentTemplate />
      </main>
      <Footer />
    </>
  );
}
