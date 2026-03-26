export function CTA() {
  return (
    <section
      id="cta"
      className="cta-shell relative border-b border-cream-3 bg-cream-2 px-[60px] py-[160px] text-center max-[880px]:px-6 max-[880px]:py-[100px]"
    >
      <span className="mb-6 block text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
        Create Boldly
      </span>
      <h2
        className="mx-auto mb-6 max-w-[700px] font-display text-[clamp(52px,6.5vw,88px)] font-normal leading-[1.08] text-ink"
        style={{ letterSpacing: "-1.5px" }}
      >
        Your tools should match your{" "}
        <span
          className="font-display font-semibold text-accent"
          style={{ letterSpacing: "-1px" }}
        >
          ambition.
        </span>
      </h2>
      <p className="mx-auto mb-11 max-w-[380px] text-[16px] leading-[1.8] text-ink-2">
        You built something people didn&apos;t know they needed. Your workspace
        should be built the same way.
      </p>
      <a
        href="https://app.sariasoftware.com/start-free-trial"
        className="inline-block rounded-full bg-accent px-8 py-3 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#1e40af]"
        target="_blank"
        rel="noreferrer"
      >
        Start Free Trial
      </a>
      <p className="mt-[18px] text-[12px] text-stone">
        No credit card required · Free 14-day trial · Setup in minutes
      </p>
    </section>
  );
}
