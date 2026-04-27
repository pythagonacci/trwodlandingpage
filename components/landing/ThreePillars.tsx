import type { ReactNode } from "react";

type Pillar = {
  figure: string;
  title: string;
  description: string;
  visual: ReactNode;
};

const pillars: Pillar[] = [
  {
    figure: "FIG 0.2",
    title: "Built for launches",
    description:
      "Purpose-built for modern brands coordinating product drops, campaign calendars, creative approvals, and operational handoffs in one system.",
    visual: <BrandSystemVisual />,
  },
  {
    figure: "FIG 0.3",
    title: "AI inside the workflow",
    description:
      "Plan launches, summarize blockers, draft briefs, and answer questions directly inside the workspace instead of stitching together separate tools.",
    visual: <AIExecutionVisual />,
  },
  {
    figure: "FIG 0.4",
    title: "One workspace, less drag",
    description:
      "Products, tasks, assets, timelines, and execution stay connected so teams can move from idea to launch with less noise and less context switching.",
    visual: <UnifiedSurfaceVisual />,
  },
];

export function ThreePillars() {
  return (
    <section className="border-b border-cream-3 bg-[linear-gradient(180deg,#fcfcfc_0%,#f8f8f8_100%)]">
      <div className="mx-auto max-w-[1520px] px-8 pt-4 pb-10 md:px-12 md:pt-5 md:pb-12 lg:px-16 lg:pt-6 lg:pb-14">
        <div className="grid lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.figure}
              className="grid min-h-[520px] grid-rows-[auto_minmax(280px,1fr)_auto] bg-transparent md:min-h-[560px] lg:border-l lg:border-[rgba(28,25,23,0.05)] first:lg:border-l-0"
            >
              <div className="px-6 pt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-stone md:px-8 md:pt-7">
                {pillar.figure}
              </div>
              <div className="flex items-center justify-center px-6 py-8 md:px-8 md:py-10">
                {pillar.visual}
              </div>
              <div className="px-6 pb-7 md:px-8 md:pb-8">
                <h3 className="mb-2 font-display text-[24px] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
                  {pillar.title}
                </h3>
                <p className="max-w-[360px] text-[15px] leading-[1.75] text-ink-3">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandSystemVisual() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 220 180"
      className="max-h-[280px] max-w-[300px]"
      role="img"
      aria-label="Brand system visual"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .brand-dot {
            animation: brandPulse 4.8s ease-in-out infinite;
          }
          .brand-dot-outline {
            animation: brandOutline 4.8s ease-in-out infinite;
          }
          .brand-mark {
            animation: brandFloat 5.8s ease-in-out infinite;
            transform-origin: 171px 153px;
          }
        }
        .brand-delay-1 { animation-delay: 0.18s; }
        .brand-delay-2 { animation-delay: 0.36s; }
        .brand-delay-3 { animation-delay: 0.54s; }
        .brand-delay-4 { animation-delay: 0.72s; }
        @keyframes brandPulse {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-1.5px); opacity: 0.84; }
        }
        @keyframes brandOutline {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.82; }
        }
        @keyframes brandFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
      `}</style>
      <text
        x="110"
        y="18"
        textAnchor="middle"
        fontSize="8"
        letterSpacing="0.2em"
        fill="rgba(120,113,108,0.85)"
      >
        RESORT DROP
      </text>
      {[34, 72, 110, 148, 186].map((cx, index) => (
        <g
          key={cx}
          className={index === 0 ? "" : `brand-delay-${index}`}
        >
          <circle
            className="brand-dot"
            cx={cx}
            cy="48"
            r="15"
            fill={`rgba(28,25,23,${0.06 + index * 0.07})`}
          />
          <circle
            className="brand-dot-outline"
            cx={cx}
            cy="48"
            r="15"
            fill="none"
            stroke="rgba(120,113,108,0.45)"
            strokeWidth="0.9"
          />
        </g>
      ))}
      <line x1="20" y1="78" x2="200" y2="78" stroke="rgba(224,224,224,0.95)" strokeWidth="1" />
      <text x="20" y="106" fontSize="24" fontWeight="500" letterSpacing="0.06em" fill="rgba(28,25,23,0.92)">
        SOLÈNE
      </text>
      <text x="20" y="120" fontSize="8" letterSpacing="0.16em" fill="rgba(120,113,108,0.85)">
        PARIS · EST. 2019
      </text>
      <line x1="20" y1="130" x2="200" y2="130" stroke="rgba(224,224,224,0.95)" strokeWidth="1" />
      <rect x="20" y="140" width="70" height="5" rx="2.5" fill="rgba(28,25,23,0.46)" />
      <rect x="20" y="149" width="48" height="4" rx="2" fill="rgba(28,25,23,0.24)" />
      <rect x="20" y="156" width="34" height="3" rx="1.5" fill="rgba(28,25,23,0.14)" />
      <g className="brand-mark">
        <rect
          x="154"
          y="136"
          width="34"
          height="34"
          rx="7"
          fill="rgba(255,255,255,0.8)"
          stroke="rgba(120,113,108,0.55)"
          strokeWidth="1"
        />
        <line x1="154" y1="153" x2="188" y2="153" stroke="rgba(120,113,108,0.38)" strokeWidth="0.8" />
        <line x1="171" y1="136" x2="171" y2="170" stroke="rgba(120,113,108,0.38)" strokeWidth="0.8" />
        <circle cx="171" cy="153" r="6.5" fill="none" stroke="rgba(120,113,108,0.56)" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

function AIExecutionVisual() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 220 180"
      className="max-h-[280px] max-w-[300px]"
      role="img"
      aria-label="AI execution visual"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .ai-ray {
            animation: aiRay 3s ease-in-out infinite;
          }
          .ai-ray-1 { animation-delay: 0s; }
          .ai-ray-2 { animation-delay: 0.2s; }
          .ai-ray-3 { animation-delay: 0.45s; }
          .ai-ray-4 { animation-delay: 0.12s; }
          .ai-ray-5 { animation-delay: 0.32s; }
          .ai-ray-6 { animation-delay: 0.56s; }
          .ai-cmd {
            animation: aiPalette 3s ease-in-out infinite;
            transform-origin: 110px 82px;
          }
          .ai-caret {
            animation: aiCaret 1.15s step-end infinite;
          }
        }
        @keyframes aiRay {
          0% { opacity: 0.1; stroke-dashoffset: 18; }
          45% { opacity: 0.58; }
          100% { opacity: 0.16; stroke-dashoffset: 0; }
        }
        @keyframes aiPalette {
          0%, 100% { transform: translateY(0px); opacity: 0.94; }
          50% { transform: translateY(-1.5px); opacity: 1; }
        }
        @keyframes aiCaret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      {[
        [18, 22, 58, 10],
        [18, 36, 42, 10],
        [144, 22, 58, 10],
        [144, 36, 42, 10],
        [18, 140, 48, 10],
        [18, 154, 66, 10],
        [144, 140, 58, 10],
        [144, 154, 38, 10],
      ].map(([x, y, width, height], index) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={width}
          height={height}
          rx="3"
          fill="none"
          stroke="rgba(144,144,144,0.28)"
          strokeWidth="0.8"
        />
      ))}

      {[
        [110, 82, 36, 28],
        [110, 82, 180, 28],
        [110, 82, 36, 146],
        [110, 82, 180, 146],
        [110, 82, 14, 82],
        [110, 82, 206, 82],
      ].map(([x1, y1, x2, y2], index) => (
        <line
          key={index}
          className={`ai-ray ai-ray-${index + 1}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(144,144,144,0.38)"
          strokeWidth="1"
          strokeDasharray="5 4"
          strokeDashoffset="18"
        />
      ))}

      <g className="ai-cmd">
        <rect
          x="44"
          y="60"
          width="132"
          height="44"
          rx="10"
          fill="rgba(255,255,255,0.88)"
          stroke="rgba(68,64,60,0.72)"
          strokeWidth="1.2"
        />
        <rect
          x="54"
          y="69"
          width="30"
          height="16"
          rx="5"
          fill="none"
          stroke="rgba(120,113,108,0.55)"
          strokeWidth="0.9"
        />
        <text x="69" y="80.5" textAnchor="middle" fontSize="8" fill="rgba(68,64,60,0.76)">
          ⌘K
        </text>
        <line x1="98" y1="70" x2="98" y2="89" stroke="rgba(68,64,60,0.78)" strokeWidth="1.1" />
        <rect x="104" y="72" width="52" height="5.5" rx="2.75" fill="rgba(29,78,216,0.18)" />
        <rect x="104" y="82" width="34" height="4.5" rx="2.25" fill="rgba(28,25,23,0.12)" />
        <line className="ai-caret" x1="144" y1="72" x2="144" y2="77.5" stroke="rgba(29,78,216,0.8)" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function UnifiedSurfaceVisual() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 220 180"
      className="max-h-[280px] max-w-[300px]"
      role="img"
      aria-label="Unified workspace visual"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .unified-frag-1 { animation: unifyTopLeft 4.8s ease-in-out infinite; }
          .unified-frag-2 { animation: unifyTopRight 4.8s ease-in-out infinite 0.18s; }
          .unified-frag-3 { animation: unifyBottomLeft 4.8s ease-in-out infinite 0.34s; }
          .unified-frag-4 { animation: unifyBottomRight 4.8s ease-in-out infinite 0.12s; }
          .unified-frag-5 { animation: unifyMidLeft 4.8s ease-in-out infinite 0.26s; }
          .unified-link {
            animation: unifiedLink 4.8s ease-in-out infinite;
          }
          .unified-core {
            animation: unifiedCore 4.8s ease-in-out infinite;
            transform-origin: 115px 88px;
          }
          .unified-core-accent {
            animation: unifiedAccent 4.8s ease-in-out infinite;
          }
        }
        @keyframes unifyTopLeft {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
          50% { transform: translate(8px, 8px); opacity: 0.95; }
        }
        @keyframes unifyTopRight {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
          50% { transform: translate(-10px, 8px); opacity: 0.95; }
        }
        @keyframes unifyBottomLeft {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
          50% { transform: translate(10px, -8px); opacity: 0.95; }
        }
        @keyframes unifyBottomRight {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
          50% { transform: translate(-10px, -8px); opacity: 0.95; }
        }
        @keyframes unifyMidLeft {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.5; }
          50% { transform: translate(12px, 0px); opacity: 0.95; }
        }
        @keyframes unifiedLink {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.62; }
        }
        @keyframes unifiedCore {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-1.5px) scale(1.012); }
        }
        @keyframes unifiedAccent {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.34; }
        }
      `}</style>
      {[
        [16, 18, 38, 28],
        [166, 18, 40, 28],
        [14, 130, 30, 30],
        [168, 128, 38, 30],
        [8, 74, 30, 30],
      ].map(([x, y, width, height], index) => (
        <g key={index} className={`unified-frag-${index + 1}`}>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx="5"
            fill="rgba(255,255,255,0.55)"
            stroke="rgba(144,144,144,0.38)"
            strokeWidth="0.9"
          />
          <line
            className="unified-link"
            x1={x + width}
            y1={y + height / 2}
            x2="78"
            y2="88"
            stroke="rgba(144,144,144,0.34)"
            strokeWidth="0.9"
          />
        </g>
      ))}

      <g className="unified-core">
        <rect
          className="unified-core-accent"
          x="72"
          y="44"
          width="86"
          height="88"
          rx="16"
          fill="rgba(29,78,216,0.06)"
        />
        <rect
          x="78"
          y="50"
          width="74"
          height="76"
          rx="12"
          fill="rgba(255,255,255,0.9)"
          stroke="rgba(68,64,60,0.74)"
          strokeWidth="1.3"
        />
        <rect x="88" y="62" width="38" height="6" rx="3" fill="rgba(28,25,23,0.42)" />
        <rect x="88" y="74" width="54" height="4" rx="2" fill="rgba(28,25,23,0.16)" />
        <line x1="88" y1="87" x2="142" y2="87" stroke="rgba(224,224,224,0.95)" strokeWidth="1" />
        <rect x="88" y="92" width="28" height="4" rx="2" fill="rgba(29,78,216,0.16)" />
        <rect x="120" y="92" width="16" height="4" rx="2" fill="rgba(28,25,23,0.12)" />
        <line x1="88" y1="104" x2="142" y2="104" stroke="rgba(240,240,240,0.95)" strokeWidth="1" />
        <rect x="88" y="110" width="36" height="4" rx="2" fill="rgba(28,25,23,0.14)" />
      </g>
    </svg>
  );
}
