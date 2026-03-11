export function Comparison() {
  return (
    <section
      id="why-trak"
      className="border-b border-cream-3 bg-cream-2 px-[60px] py-[100px] max-[880px]:px-6 max-[880px]:py-[60px]"
    >
      <div className="mb-13 grid grid-cols-2 gap-[60px] max-[880px]:grid-cols-1 max-[880px]:gap-6">
        <h2 className="font-display text-[clamp(36px,3.9vw,58px)] font-normal leading-[1.1] tracking-[-0.05em] text-ink">
          Built for brands.{" "}
          <span className="font-display font-bold text-accent">
            Not borrowed from enterprise.
          </span>
        </h2>
        <p className="border-t border-cream-3 pt-5 text-[15px] leading-[1.8] text-ink-2">
          Every other PM tool was built for someone else and adapted for brands.
          Trak was designed from day one for DTC teams — with the integrations,
          templates, and workflows that actually matter.
        </p>
      </div>

      <div className="overflow-hidden rounded-card border border-cream-3 bg-cream">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                <th className="w-[38%] border-b border-cream-3 bg-cream px-6 py-4">
                  Capability
                </th>
                <th className="border-b border-l border-cream-3 bg-cream px-6 py-4">
                  Monday
                </th>
                <th className="border-b border-l border-cream-3 bg-cream px-6 py-4">
                  Asana
                </th>
                <th className="border-b border-l border-cream-3 bg-cream px-6 py-4">
                  Notion
                </th>
                <th className="border-b border-l border-cream-3 bg-accent px-6 py-4 text-white">
                  Trak
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {[
                "Native Shopify integration",
                "External collaboration without accounts",
                "Influencer & creator management",
                "Creative workspace with assets & moodboards",
                "DTC product launch templates",
                "AI that acts inside your workspace"
              ].map((label, index) => (
                <tr
                  key={label}
                  className="transition-colors duration-150 hover:bg-[rgba(250,248,244,0.7)]"
                >
                  <td className="border-b border-cream-3 px-6 py-[15px] text-[13px] text-ink-2">
                    {label}
                  </td>
                  <td className="border-b border-l border-cream-3 px-6 py-[15px] text-stone">
                    <span className="text-[15px] text-cream-3">—</span>
                  </td>
                  <td className="border-b border-l border-cream-3 px-6 py-[15px] text-stone">
                    <span className="text-[15px] text-cream-3">—</span>
                  </td>
                  <td className="border-b border-l border-cream-3 px-6 py-[15px] text-stone">
                    {index === 3 ? (
                      <span className="text-[13px] text-stone">Partial</span>
                    ) : (
                      <span className="text-[15px] text-cream-3">—</span>
                    )}
                  </td>
                  <td className="border-b border-l border-cream-3 bg-accent-bg px-6 py-[15px] font-medium text-ink">
                    <span className="text-[15px] font-semibold text-[#16A34A]">
                      ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

