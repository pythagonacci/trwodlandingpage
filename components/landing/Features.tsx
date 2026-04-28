import { FiEdit3, FiPlus } from "react-icons/fi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { AutoplayVideo } from "@/components/landing/AutoplayVideo";
import { InfrastructureVisual } from "@/components/landing/InfrastructureVisual";

export function Features() {
  const aiDemoVideoSrc = "/media/v2demo3-web.mp4";
  const aiDemoPosterSrc = "/media/v2demo3-poster.jpg";
  const shopifyDemoVideoSrc = "/media/v2demo4-web.mp4";
  const shopifyDemoPosterSrc = "/media/v2demo4-poster.jpg";

  const aiPrompts = [
    {
      label: "Create",
      prompt: "Create a table of all influencers by submission status.",
      accentClassName: "text-[#147B69]",
      chipClassName: "bg-[#E1F3EE] text-[#147B69]",
      icon: FiPlus,
    },
    {
      label: "Ask",
      prompt: "What's blocking the Spring launch?",
      accentClassName: "text-[#554EC7]",
      chipClassName: "bg-[#ECE9FF] text-[#554EC7]",
      icon: HiOutlineQuestionMarkCircle,
    },
    {
      label: "Update",
      prompt: "Update every campaign deadline to April 15th.",
      accentClassName: "text-[#99601A]",
      chipClassName: "bg-[#FAEFD9] text-[#99601A]",
      icon: FiEdit3,
    },
  ];

  return (
    <section
      id="features"
      className="border-b border-cream-3 bg-cream"
    >
      <div className="grid grid-cols-2 gap-[60px] px-[60px] pb-16 pt-[72px] max-[880px]:grid-cols-1 max-[880px]:gap-6 max-[880px]:px-6 max-[880px]:pb-10 max-[880px]:pt-[48px]">
        <div>
          <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Built for Brand Ops
          </div>
          <h2 className="font-display text-[clamp(36px,3.9vw,58px)] font-normal leading-[1.1] tracking-[-0.04em] text-ink">
            Infrastructure for how brands{" "}
            <span
              className="font-display font-semibold text-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              actually work.
            </span>
          </h2>
        </div>
        <p className="self-start pt-[52px] text-[15px] leading-[1.8] text-ink-2 max-[880px]:pt-0">
          Most tools manage tasks. Saria embeds your entire workflow —
          products, files, approvals, and live Shopify data — so execution
          happens where the work lives. Assets, briefs, moodboards.{" "}
          <span className="font-semibold text-ink">One tab.</span>
        </p>
      </div>

      <div className="border-b border-cream-3 bg-cream-2 px-[60px] pb-12 pt-6 max-[880px]:px-6 max-[880px]:pb-10 max-[880px]:pt-5">
        <InfrastructureVisual />
      </div>

      <div className="border-b border-cream-3 px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream-2 max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          AI-Powered
        </span>
        <h3 className="mb-6 w-full max-w-none font-display text-[clamp(30px,3.8vw,52px)] font-normal leading-[1.06] tracking-[-0.038em] text-ink">
          Ask questions. Get answers.{" "}
          <span
            className="font-display font-semibold text-accent"
            style={{ letterSpacing: "-0.018em" }}
          >
            Take action.
          </span>
        </h3>
        <p className="max-w-[720px] text-[15px] leading-[1.8] text-ink-2">
          Your AI assistant operates inside your work — not on top of it. Ask it
          anything. Then tell it what to do.
        </p>
        <div className="mb-7 mt-7 overflow-x-auto pb-2">
          <div className="flex min-w-[1040px] gap-6 max-[1100px]:min-w-[960px]">
            {aiPrompts.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-h-[180px] flex-1 flex-col rounded-[18px] border border-[#D9D3CA] bg-[#FFFEFC] px-5 py-4 shadow-[0_2px_12px_rgba(28,25,23,0.04)]"
                >
                  <div
                    className={`mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-full ${item.chipClassName}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] ${item.accentClassName}`}
                  >
                    {item.label}
                  </span>
                  <p className="max-w-[250px] text-[16px] leading-[1.4] tracking-[-0.03em] text-ink">
                    &quot;{item.prompt}&quot;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="feature-demo-shell mx-auto mt-7 w-full max-w-[1040px]">
          <div className="feature-demo-frame relative aspect-[16/8.6] w-full overflow-hidden max-[880px]:aspect-[16/10]">
            <AutoplayVideo
              className="h-full w-full object-cover"
              poster={aiDemoPosterSrc}
              src={aiDemoVideoSrc}
              preload="metadata"
            />
          </div>
        </div>
      </div>

      <div className="px-[60px] py-[52px] transition-colors duration-200 hover:bg-cream max-[880px]:px-6 max-[880px]:py-10">
        <span className="mb-[18px] block text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
          Shopify Native
        </span>
        <h3 className="mb-6 w-full max-w-none font-display text-[clamp(30px,3.8vw,52px)] font-normal leading-[1.06] tracking-[-0.038em] text-ink">
          Shopify.{" "}
          <span
            className="font-display font-semibold text-accent"
            style={{ letterSpacing: "-0.018em" }}
          >
            Built In.
          </span>
        </h3>
        <p className="mb-9 max-w-[760px] text-[15px] leading-[1.8] text-ink-2">
          Saria doesn&apos;t integrate with Shopify. It&apos;s built around it.
          Create a project for your Barrier Restore Cream restock, and Saria
          automatically connects to that SKU. Real-time inventory levels.
          Product variants. Sales Data. All the data you need, exactly when you
          need it.
        </p>
        <div className="feature-demo-shell mx-auto w-full max-w-[1040px]">
          <div className="feature-demo-frame relative aspect-[16/8.4] w-full overflow-hidden max-[880px]:aspect-[16/10]">
            <AutoplayVideo
              className="h-full w-full object-cover"
              poster={shopifyDemoPosterSrc}
              src={shopifyDemoVideoSrc}
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
