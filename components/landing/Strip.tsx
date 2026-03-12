export function Strip() {
  const features = [
    {
      title: "Shopify Native",
      description:
        "Products, inventory, and sales data live inside your workspace — no extra tabs."
    },
    {
      title: "Magic Links",
      description:
        "Share branded client portals with your agency. No login required on their end."
    },
    {
      title: "Launch Timelines",
      description:
        "Visual campaign and product launch timelines your whole team can actually follow."
    },
    {
      title: "AI-Powered",
      description:
        "CMD+K to automate briefs, generate tasks, and surface insights from your brand data."
    }
  ];

  return (
    <section className="border-y border-cream-3 bg-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-4 max-[900px]:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`border-r border-cream-3 px-9 py-9 max-[600px]:px-6 ${
              (index + 1) % 2 === 0 ? "max-[900px]:border-r-0" : ""
            } ${
              index >= 2
                ? "max-[900px]:border-t max-[900px]:border-cream-3"
                : ""
            } ${index === features.length - 1 ? "border-r-0" : ""}`}
          >
            <div className="mb-3 text-blue">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {index === 0 && (
                  <path d="M12 2 3 7l9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />
                )}
                {index === 1 && (
                  <>
                    <path d="M5 5h14v14H5z" />
                    <path d="M9 9h6v6H9z" />
                  </>
                )}
                {index === 2 && (
                  <>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" />
                  </>
                )}
                {index === 3 && (
                  <>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M4.22 4.22 6.7 6.7M17.3 17.3l2.48 2.48M2 12h3M19 12h3M4.22 19.78 6.7 17.3M17.3 6.7l2.48-2.48" />
                  </>
                )}
              </svg>
            </div>
            <h3 className="mb-2 font-display text-[16px] font-normal tracking-[-0.03em] text-ink">
              {feature.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-ink-2">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

