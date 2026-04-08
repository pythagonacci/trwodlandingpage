import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { PRTrackingTemplate } from "@/components/landing/PRTrackingTemplate";

export const metadata = createPageMetadata({
  title: "PR Tracking Template | Saria",
  description:
    "See how Saria's PR Tracking template helps D2C teams run influencer seeding, shipment tracking, posting follow-up, and campaign results from one workspace.",
  path: "/templates/pr-tracking"
});

export default function PRTrackingTemplatePage() {
  return (
    <>
      <Nav />
      <main>
        <PRTrackingTemplate />
      </main>
      <Footer />
    </>
  );
}
