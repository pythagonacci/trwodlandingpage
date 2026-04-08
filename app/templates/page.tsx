import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";

const templateCards = [
  {
    href: "/templates/multi-sku-seasonal-drop",
    eyebrow: "Launch Template",
    title: "Multi-SKU / Seasonal Drop",
    description:
      "A case-study template for coordinated launches across Shopify, creative, PR, and launch-day execution.",
    stats: ["47 min sellout", "3 SKUs", "6-week timeline"]
  },
  {
    href: "/templates/product-design-and-development",
    eyebrow: "Product Template",
    title: "Product Design and Development",
    description:
      "A case-study template for running product briefs, sample rounds, factory communication, costing, and launch prep in one project.",
    stats: ["14 weeks", "3 sample rounds", "1 project"]
  },
  {
    href: "/templates/pr-tracking",
    eyebrow: "PR Template",
    title: "PR Tracking",
    description:
      "A case-study template for influencer seeding, shipment tracking, posting follow-up, and post-campaign results.",
    stats: ["24 influencers", "2.1M reach", "2 tabs"]
  }
];

export const metadata = createPageMetadata({
  title: "Templates | Saria",
  description:
    "Explore Saria templates for product launches, product design and development, and other modern D2C workflows.",
  path: "/templates"
});

export default function TemplatesPage() {
  return (
    <>
      <Nav />
      <main className="bg-cream">
        <section className="mx-auto max-w-[1100px] px-12 pb-18 pt-[96px] max-[768px]:px-6 max-[768px]:pb-14 max-[768px]:pt-[72px]">
          <div className="mb-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-stone">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Templates
          </div>
          <h1
            className="max-w-[760px] font-display text-[clamp(38px,5vw,58px)] leading-[1.08] text-ink"
            style={{
              fontFamily: "var(--font-hero-display), Georgia, serif",
              letterSpacing: "-0.03em"
            }}
          >
            Template pages built for <span className="text-accent">real operating workflows.</span>
          </h1>
          <p className="mt-7 max-w-[640px] text-[18px] font-light leading-[1.7] text-ink-2">
            Explore the structures product and launch teams can start from, then adapt inside
            Saria.
          </p>
        </section>

        <section className="mx-auto max-w-[1100px] px-12 pb-20 max-[768px]:px-6 max-[768px]:pb-14">
          <div className="grid gap-6 md:grid-cols-2">
            {templateCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[24px] border border-cream-3 bg-white p-8 shadow-[0_24px_48px_rgba(28,25,23,0.06)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  {card.eyebrow}
                </div>
                <h2 className="mt-4 text-[30px] leading-[1.08] tracking-[-0.03em] text-ink">
                  {card.title}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[15px] font-light leading-[1.75] text-ink-2">
                  {card.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {card.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-cream-3 bg-cream px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-2"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-accent">
                  <span>Open template</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
