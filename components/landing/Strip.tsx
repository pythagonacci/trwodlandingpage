export function Strip() {
  const items = [
    "Launch Management",
    "Shopify Native",
    "Magic Links",
    "Influencer Tracking",
    "Brand Calendar",
    "AI Assistant",
    "Creative Workspace",
    "Campaign Ops"
  ];

  return (
    <div className="border-y border-cream-3 bg-cream-2 py-4">
      <div className="mx-auto flex max-w-6xl items-center gap-5 overflow-hidden">
        <div className="ml-14 flex items-center gap-5 border-r border-cream-3 pr-5 text-[11px] font-medium uppercase tracking-[0.06em] text-stone max-[880px]:ml-6">
          What&apos;s inside
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track inline-flex">
            {[...items, ...items].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="border-r border-cream-3 px-8 text-[13px] font-medium uppercase tracking-[0.06em] text-stone"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

