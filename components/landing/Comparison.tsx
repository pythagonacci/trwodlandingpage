export function Comparison() {
  return (
    <section
      id="why-saria"
      className="border-b border-cream-3 bg-cream-2 px-[60px] py-[100px] max-[880px]:px-6 max-[880px]:py-[60px]"
    >
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
                  Saria
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
