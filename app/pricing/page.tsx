import { createPageMetadata } from "@/app/seo";
import PricingPageClient from "./PricingPageClient";

export const metadata = createPageMetadata({
  title: "Pricing | Saria for D2C Teams",
  description:
    "Simple, scalable pricing for modern D2C teams. Start free and upgrade as your brand grows.",
  path: "/pricing"
});

export default function PricingPage() {
  return <PricingPageClient />;
}
