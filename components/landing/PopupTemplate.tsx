import Image from "next/image";
import type { ReactNode } from "react";

type PopupProduct = {
  name: string;
  stock?: string;
  price?: string;
  leftLabel?: string;
  leftValue?: string;
  rightLabel?: string;
  rightValue?: string;
  imageSrc?: string;
  imageAlt?: string;
  emoji?: string;
  gradient?: string;
  status: string;
  tone: "progress" | "urgent" | "done" | "neutral" | "blue";
};

type MoodboardTile = {
  imageSrc?: string;
  imageAlt?: string;
  label?: string;
  tone?: string;
};

const popupStats = [
  { value: "$41,200", label: "Revenue over 4 days" },
  { value: "6 wks", label: "Planning to doors open" },
  { value: "340", label: "Units sold" },
  { value: "0", label: "Vendor no-shows" }
];

const popupTimeline = [
  {
    date: "Aug 28",
    label: "Greene Street space confirmed. Project set up in Trak."
  },
  {
    date: "Sep 3",
    label:
      "Vendor outreach starts. Rack fabricator, florist, lighting all added to the logistics table."
  },
  {
    date: "Sep 10",
    label:
      "Creative direction locked. Moodboard and merch plan in Creative & Styling."
  },
  {
    date: "Sep 18",
    label: "All vendor deposits confirmed. Permits filed."
  },
  {
    date: "Oct 7",
    label: "Day-Of tab done. Staff assignments and run of show set."
  },
  { date: "Oct 8", label: "Build-out. Racks in, space dressed." },
  { date: "Oct 9, 11:00am", label: "Doors open.", active: true },
  {
    date: "Oct 12, 7:00pm",
    label: "Pop-up closes. 340 units, $41,200.",
    active: true,
    complete: true
  }
];

const replacedItems = [
  {
    icon: "📱",
    oldLabel: "iMessage task threads",
    replacement: "Replaced by master task tracker in Event HQ"
  },
  {
    icon: "📧",
    oldLabel: "Vendor emails buried in inbox",
    replacement: "Replaced by Vendor & Logistics table"
  },
  {
    icon: "📝",
    oldLabel: "Notes app run of show",
    replacement: "Replaced by Day-Of timeline block"
  },
  {
    icon: "📊",
    oldLabel: "Spreadsheet merch plan",
    replacement: "Replaced by merchandise table in Creative & Styling"
  },
  {
    icon: "🛍",
    oldLabel: "Separate Shopify tab, always open",
    replacement: "Replaced by live Shopify blocks in Trak"
  },
  {
    icon: "💬",
    oldLabel: "Slack threads across three channels",
    replacement: "Replaced by task blocks and block comments"
  }
];

const eventProducts: PopupProduct[] = [
  {
    name: "Cedar Overshirt - Autumn",
    stock: "80",
    price: "$195",
    imageSrc: "/templates/popup/autumnshirt.png",
    imageAlt: "Cedar Overshirt in autumn product image",
    status: "Active",
    tone: "progress" as const
  },
  {
    name: "Heavyweight Cotton Tee",
    stock: "160",
    price: "$85",
    imageSrc: "/templates/popup/whitetee.png",
    imageAlt: "Heavyweight Cotton Tee product image",
    status: "Active",
    tone: "progress" as const
  },
  {
    name: "Linen Trouser - Wide Leg",
    stock: "100",
    price: "$145",
    imageSrc: "/templates/popup/linenpants.png",
    imageAlt: "Linen Trouser wide leg product image",
    status: "Active",
    tone: "progress" as const
  }
];

const inventoryProducts: PopupProduct[] = [
  {
    name: "Cedar Overshirt",
    leftLabel: "Remaining",
    leftValue: "12",
    rightLabel: "Sold",
    rightValue: "68",
    imageSrc: "/templates/popup/autumnshirt.png",
    imageAlt: "Cedar Overshirt in autumn product image",
    status: "Low stock",
    tone: "urgent" as const
  },
  {
    name: "Heavyweight Cotton Tee",
    leftLabel: "Remaining",
    leftValue: "74",
    rightLabel: "Sold",
    rightValue: "86",
    imageSrc: "/templates/popup/whitetee.png",
    imageAlt: "Heavyweight Cotton Tee product image",
    status: "In Stock",
    tone: "progress" as const
  },
  {
    name: "Linen Trouser",
    leftLabel: "Remaining",
    leftValue: "14",
    rightLabel: "Sold",
    rightValue: "86",
    imageSrc: "/templates/popup/linenpants.png",
    imageAlt: "Linen Trouser wide leg product image",
    status: "Low stock",
    tone: "urgent" as const
  }
];

const eventTasks = [
  {
    name: "Confirm Greene St lease and dates",
    status: "Done",
    complete: true
  },
  {
    name: "Lock all vendors - racks, florals, lighting",
    status: "Done",
    complete: true
  },
  {
    name: "File temporary retail permit",
    status: "Done",
    complete: true
  },
  {
    name: "Finalize merch plan + units per SKU",
    status: "In Progress",
    inProgress: true
  },
  { name: "Send press invites", status: "To-Do" }
];

const permitTasks = [
  {
    name: "Temporary retail permit - NYC DoB",
    status: "Filed Sep 5",
    complete: true
  },
  {
    name: "Certificate of insurance - landlord copy",
    status: "Done",
    complete: true
  },
  {
    name: "Confirm Shopify POS hardware (2 readers)",
    status: "Done",
    complete: true
  }
];

const moodboardTiles: MoodboardTile[] = [
  { imageSrc: "/templates/popup/pm1.png", imageAlt: "Popup moodboard image 1" },
  { imageSrc: "/templates/popup/pm2.png", imageAlt: "Popup moodboard image 2" },
  { imageSrc: "/templates/popup/pm3.png", imageAlt: "Popup moodboard image 3" },
  { imageSrc: "/templates/popup/pm4.png", imageAlt: "Popup moodboard image 4" },
  { imageSrc: "/templates/popup/pm5.png", imageAlt: "Popup moodboard image 5" },
  { imageSrc: "/templates/popup/pm6.png", imageAlt: "Popup moodboard image 6" }
];

const vendorRows = [
  ["Form Supply Co.", "Rack fabrication + install", "$2,400", "✓ Paid", "Confirmed"],
  ["Studio Stem", "Florals - 3 arrangements", "$780", "✓ Paid", "Confirmed"],
  ["Arc Events", "Lighting setup + rental", "$1,100", "✓ Paid", "Confirmed"],
  ["Ace Printing", "Signage + price tags", "$340", "Pending", "In Progress"],
  ["GreenClean NYC", "Post-event clean", "$220", "-", "Booked"]
];

const merchRows = [
  ["Cedar Overshirt", "Cedar, Stone", "80", "Front rack", "Confirmed"],
  ["Heavyweight Cotton Tee", "White, Black, Slate", "160", "Folded table", "Confirmed"],
  ["Linen Trouser - Wide Leg", "Chalk, Tobacco", "100", "Side rack", "In Review"],
  ["Rib Knit Scarf", "Oat, Cedar", "-", "Accessory shelf", "TBD"]
];

const staffRows = [
  ["Lea D.", "Creative director - floor Oct 9 only", "11am-7pm", "Oct 9"],
  ["Sana M.", "Ops - setup, restocking, POS", "8am-7pm", "All 4 days"],
  ["Camille R.", "Floor staff - customer experience", "11am-7pm", "Oct 9-12"],
  ["Julien A.", "Floor staff - checkout + packaging", "11am-7pm", "Oct 10-12"]
];

const dayTimelineRows = [
  {
    time: "8:00am",
    label: "Sana + Form Supply Co. on site - final rack install",
    tone: "bg-accent-bg",
    textTone: "text-accent",
    width: "w-[90%]"
  },
  {
    time: "9:00am",
    label: "Studio Stem florals delivered + placed",
    tone: "bg-[#E8F5EE]",
    textTone: "text-[#2F6B49]",
    width: "w-[75%]"
  },
  {
    time: "9:30am",
    label: "Merchandise loaded + styled per plan",
    tone: "bg-[#F4EAE2]",
    textTone: "text-[#A1572E]",
    width: "w-[80%]"
  },
  {
    time: "10:30am",
    label: "Shopify POS tested - both readers",
    tone: "bg-[#F3F1EC]",
    textTone: "text-ink-2",
    width: "w-[60%]"
  },
  {
    time: "11:00am",
    label: "Doors open",
    tone: "bg-[#E8E3D8]",
    textTone: "text-ink",
    width: "w-[95%]"
  },
  {
    time: "7:00pm",
    label: "Doors close - restock + EOD inventory check",
    tone: "bg-[#F5F3EE]",
    textTone: "text-stone",
    width: "w-[50%]"
  }
];

const popupResults = [
  { value: "340", label: "Units sold across 3 SKUs" },
  { value: "6 wks", label: "From confirmed space to open doors" },
  { value: "0", label: "Vendor issues across 4 days" },
  { value: "4 tabs", label: "Everything in the project, nothing outside it" }
];

function MockPill({
  children,
  tone = "neutral"
}: {
  children: string;
  tone?: "neutral" | "progress" | "done" | "urgent" | "blue";
}) {
  const classNameByTone = {
    neutral: "bg-[#F3F1EC] text-stone",
    progress: "bg-accent-bg text-accent",
    done: "bg-[#E7F6EE] text-[#2F6B49]",
    urgent: "bg-[#FAEFD9] text-[#99601A]",
    blue: "bg-[#EEF2FF] text-[#5B63B7]"
  };

  return (
    <span
      className={`inline-flex items-center rounded-[6px] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${classNameByTone[tone]}`}
    >
      {children}
    </span>
  );
}

function TemplateWindow({
  title,
  tabs,
  activeTab,
  meta,
  backLink = false,
  children
}: {
  title: string;
  tabs: string[];
  activeTab: string;
  meta: ReactNode;
  backLink?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[rgba(222,219,212,0.7)] bg-white shadow-[0_24px_48px_rgba(28,25,23,0.08)]">
      <div className="border-b border-cream-3 bg-white">
        <div className="px-5 pb-0 pt-5">
          {backLink ? (
            <div className="mb-3 flex items-center gap-1.5 text-[11px] text-stone">
              <span className="text-[12px]">←</span>
              <span>Back to projects</span>
            </div>
          ) : null}
          <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
            <div className="text-[20px] font-semibold tracking-[-0.03em] text-ink">
              {title}
            </div>
            <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-3 py-1.5 text-[11px] font-medium text-[#53708A]">
              <span>◎</span>
              <span>Enable Public Link</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">{meta}</div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-end border-t border-cream-3 px-5">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={`mb-[-1px] flex items-center gap-1.5 border-b-2 px-4 py-3 text-[12px] whitespace-nowrap ${
                  activeTab === tab
                    ? "border-ink font-medium text-ink"
                    : "border-transparent text-stone"
                }`}
              >
                {index === 0 ? <span className="text-[11px] opacity-60">⊞</span> : null}
                <span>{tab}</span>
              </div>
            ))}
            <div className="mb-[-1px] px-3 py-3 text-[16px] text-[#B8B4AC]">+</div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function ContentCard({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#EFECE5] bg-white px-4 py-4">
      <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-stone">
        {label}
      </div>
      <div className="text-[12.5px] leading-[1.65] text-ink-2">{children}</div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3 pr-11">
      <div className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </div>
      {subtitle ? (
        <div className="mt-1 text-[11px] text-stone">{subtitle}</div>
      ) : null}
    </div>
  );
}

function ProductCard({
  name,
  imageSrc,
  imageAlt,
  emoji,
  gradient,
  leftValue,
  leftLabel,
  rightValue,
  rightLabel,
  status,
  tone
}: {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  emoji?: string;
  gradient?: string;
  leftValue: string;
  leftLabel: string;
  rightValue: string;
  rightLabel: string;
  status: string;
  tone: "progress" | "urgent" | "done" | "neutral" | "blue";
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
      {imageSrc ? (
        <div className="relative flex h-20 items-center justify-center overflow-hidden bg-[#F7F4EE] p-2">
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 220px"
          />
        </div>
      ) : (
        <div
          className={`flex h-20 items-center justify-center bg-gradient-to-br text-[24px] ${gradient ?? "from-[#F4EEE5] to-[#EAE4D9]"}`}
        >
          {emoji}
        </div>
      )}
      <div className="px-3 py-3">
        <div className="mb-2 text-[12px] font-semibold leading-[1.35] text-ink">
          {name}
        </div>
        <div className="flex gap-4">
          <div>
            <div className="text-[14px] font-semibold leading-none text-ink">
              {leftValue}
            </div>
            <div className="mt-1 text-[10px] text-stone">{leftLabel}</div>
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-none text-ink">
              {rightValue}
            </div>
            <div className="mt-1 text-[10px] text-stone">{rightLabel}</div>
          </div>
        </div>
        <div className="mt-3">
          <MockPill tone={tone}>{status}</MockPill>
        </div>
      </div>
    </div>
  );
}

function TaskBlock({
  title,
  tasks
}: {
  title: string;
  tasks: Array<{
    name: string;
    status: string;
    complete?: boolean;
    inProgress?: boolean;
  }>;
}) {
  return (
    <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
      <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
        <div className="text-[12px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#B8B4AC]">
          <span className="rounded-[4px] bg-accent-bg px-1.5 py-0.5 text-accent">☰</span>
          <span>⊞</span>
        </div>
      </div>
      {tasks.map((task) => (
        <div
          key={task.name}
          className="flex items-center gap-3 border-b border-[#F5F3EE] px-4 py-3 last:border-b-0"
        >
          <span
            className={`flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full border text-[9px] ${
              task.complete
                ? "border-[#2F6B49] bg-[#E7F6EE] text-[#2F6B49]"
                : task.inProgress
                  ? "border-accent text-accent"
                  : "border-[#D0CCC4] text-transparent"
            }`}
          >
            {task.complete ? "✓" : "·"}
          </span>
          <div
            className={`flex-1 text-[12px] ${
              task.complete ? "text-stone line-through" : "text-ink"
            }`}
          >
            {task.name}
          </div>
          <MockPill
            tone={
              task.status === "Done" || task.status.startsWith("Filed") || task.complete
                ? "done"
                : task.status === "In Progress"
                  ? "progress"
                  : "neutral"
            }
          >
            {task.status}
          </MockPill>
        </div>
      ))}
      <div className="px-4 py-3 text-[11px] text-[#B8B4AC]">+ Add task</div>
    </div>
  );
}

function DataTable({
  title,
  meta,
  headers,
  rows,
  widths
}: {
  title: string;
  meta?: string;
  headers: string[];
  rows: string[][];
  widths: string[];
}) {
  return (
    <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
      <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
        <div className="text-[12px] font-semibold text-ink">{title}</div>
        {meta ? <div className="text-[11px] text-stone">{meta}</div> : null}
      </div>
      <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
        {headers.map((header, index) => (
          <div key={header} className={widths[index]}>
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={`${title}-${rowIndex}`}
          className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
        >
          {row.map((cell, cellIndex) => {
            const widthClass = widths[cellIndex];
            const isStatus = cellIndex === row.length - 1 && headers[cellIndex] === "Status";
            const isDeposit = headers[cellIndex] === "Deposit";
            const tone =
              cell.includes("Confirmed") || cell.includes("✓ Paid")
                ? "done"
                : cell.includes("In Progress") || cell.includes("Pending") || cell.includes("In Review")
                  ? "progress"
                  : cell === "Booked" || cell === "TBD"
                    ? "neutral"
                    : null;

            return (
              <div key={`${rowIndex}-${cellIndex}`} className={`${widthClass} pr-2`}>
                {isStatus || isDeposit ? (
                  tone ? (
                    <MockPill tone={tone}>{cell}</MockPill>
                  ) : (
                    <span className="text-ink-2">{cell}</span>
                  )
                ) : (
                  <span className={cellIndex === 0 ? "font-medium text-ink" : "text-ink-2"}>
                    {cell}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RightRail() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-9 flex-col items-center gap-4 border-l border-[#F0EEEA] bg-white py-4 text-[13px] text-[#C5C0B6]">
      <span>🔒</span>
      <span>✦</span>
      <span>⊞</span>
      <span>💬</span>
      <span>👤</span>
    </div>
  );
}

export function PopupTemplate() {
  const tabs = [
    "Overview",
    "Event HQ",
    "Space & Logistics",
    "Creative & Styling",
    "Day-Of"
  ];

  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-[860px] px-12 pb-20 pt-[96px] max-[768px]:px-6 max-[768px]:pb-14 max-[768px]:pt-[72px]">
        <div className="mb-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-stone">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Case Study · Pop-Up Event Template
        </div>
        <h1
          className="max-w-[820px] font-display text-[clamp(38px,5vw,58px)] leading-[1.08] text-ink"
          style={{
            fontFamily: "var(--font-hero-display), Georgia, serif",
            letterSpacing: "-0.03em"
          }}
        >
          How Maison C&egrave;dre planned and ran their{" "}
          <span className="text-accent">SoHo pop-up</span> in six weeks.
        </h1>
        <p className="mt-7 max-w-[640px] text-[18px] font-light leading-[1.7] text-ink-2">
          Four days on Greene Street. Here&apos;s how the Maison C&egrave;dre
          team kept the planning, logistics, and event operations in one place.
        </p>
        <div className="mt-10 grid overflow-hidden rounded-[14px] border border-cream-3 bg-white md:grid-cols-4">
          {popupStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-cream-3 px-7 py-6 max-[768px]:px-5 max-[768px]:py-4 ${
                index < popupStats.length - 1 ? "md:border-r" : ""
              } ${index < 3 ? "max-[768px]:border-b" : ""}`}
            >
              <div
                className="font-display text-[32px] leading-none text-ink"
                style={{ letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.08em] text-stone">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[860px] px-12 py-20 max-[768px]:px-6 max-[768px]:py-14">
        <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Situation
        </div>
        <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
          A great space, a short window, and{" "}
          <span className="font-semibold text-accent">a lot to coordinate.</span>
        </h2>
        <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            Maison C&egrave;dre makes elevated basics - structured linen
            trousers, heavyweight cotton tees, and a cedar-dyed overshirt that
            had sold out twice. Their customers kept asking where they could try
            things on, so when a Greene Street space opened up for four days in
            October, creative director L&eacute;a said yes.
          </p>
          <p>
            Six weeks out, the planning started. A pop-up has a different kind
            of operational load than an online launch - there&apos;s a physical
            space to design, vendors to coordinate, permits to pull, a
            merchandise plan to finalize, and staff to schedule.
          </p>
          <p>
            The team was L&eacute;a on creative, ops lead Sana on logistics, a
            PR contact, and two part-time floor staff. They set up a Trak
            project with four tabs and worked from it until doors opened on
            October 9.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[14px] border border-cream-3 bg-white md:grid-cols-2">
          {replacedItems.map((item, index) => (
            <div
              key={item.oldLabel}
              className={`flex items-start gap-4 bg-white px-5 py-5 ${
                index % 2 === 0 ? "md:border-r md:border-cream-3" : ""
              } ${index < 4 ? "border-b border-cream-3" : ""}`}
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] bg-cream-2 text-[14px]">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] font-medium text-ink line-through decoration-[#A1572E]">
                  {item.oldLabel}
                </div>
                <div className="mt-1 text-[12px] font-light text-stone">
                  {item.replacement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto grid max-w-[860px] gap-12 px-12 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[768px]:px-6 max-[768px]:py-14">
        <div>
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            The Build
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            Six weeks. Four tabs.{" "}
            <span className="font-semibold text-accent">One project.</span>
          </h2>
          <div className="mt-6 text-[16px] font-light leading-[1.8] text-ink-2">
            <p>
              Sana ran the vendor and logistics side out of the Space &
              Logistics tab - every quote, deposit status, and permit in a
              single table she could update as things moved. L&eacute;a kept the
              creative direction and merch plan in Creative & Styling.
            </p>
            <p className="mt-5">
              Event HQ was the shared view they both referenced. Day-Of got
              built out two weeks before the event and was the only thing open
              on Sana&apos;s phone on October 9.
            </p>
          </div>
        </div>

        <div className="relative pl-9">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-cream-3" />
          {popupTimeline.map((event) => (
            <div
              key={`${event.date}-${event.label}`}
              className="relative flex gap-4 pb-7 last:pb-0"
            >
              <div
                className={`relative z-10 flex h-[33px] w-[33px] flex-shrink-0 items-center justify-center rounded-full border text-[12px] ${
                  event.active
                    ? "border-accent bg-accent-bg text-accent"
                    : "border-cream-3 bg-cream-2 text-stone"
                }`}
              >
                {event.complete ? "✓" : event.active ? "→" : "✦"}
              </div>
              <div className="pt-1">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                  {event.date}
                </div>
                <div
                  className={`mt-1 text-[15px] leading-[1.55] ${
                    event.active ? "font-medium text-accent" : "text-ink"
                  }`}
                >
                  {event.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[1000px] px-12 py-20 max-[768px]:px-4 max-[768px]:py-14">
        <div className="mx-auto mb-14 max-w-[860px] px-0 md:px-6">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            Inside the Project
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            How the template was built
          </h2>
          <p className="mt-3 max-w-[560px] text-[16px] font-light leading-[1.8] text-ink-2">
            Four tabs. Here&apos;s what the Maison C&egrave;dre team put inside
            each one.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 01
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Event HQ
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  The shared view. Event brief, master task tracker, and the
                  Shopify collection going to the space. L&eacute;a and Sana both
                  had this tab open throughout the six weeks.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <TemplateWindow
                title="MAISON CEDRE - GREENE ST POP-UP"
                tabs={tabs}
                activeTab="Event HQ"
                backLink
                meta={
                  <>
                    <MockPill tone="progress">In Progress</MockPill>
                    <MockPill>Oct 9-12</MockPill>
                    <MockPill tone="urgent">Urgent</MockPill>
                  </>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-2 rounded-[10px] px-1 py-1 pr-11">
                    <div className="rounded-[8px] px-3 py-2 text-[13px] leading-[1.65] text-ink-2">
                      <strong>Greene Street Pop-Up</strong> - Maison
                      C&egrave;dre&apos;s first temporary retail space. 4 days,
                      Oct 9-12. The goal is to put the product in customers&apos;
                      hands, capture content, and drive press ahead of the
                      holiday season. We are not discounting. We are not doing a
                      giveaway. We are letting the clothes speak.
                    </div>
                  </div>

                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                    <ContentCard label="Event Details">
                      <strong>Dates:</strong> Oct 9-12, 11am-7pm
                      <br />
                      <strong>Address:</strong> 112 Greene St, SoHo, NYC
                      <br />
                      <strong>Space size:</strong> ~900 sq ft
                      <br />
                      <strong>Team on floor:</strong> 2 staff + L&eacute;a (Oct
                      9 only)
                    </ContentCard>
                    <ContentCard label="Goals">
                      Move the Fall core collection IRL. Drive email signups.
                      Generate content for Q4. Seed press before holiday. No
                      hard revenue target - but $30K would be a success.
                    </ContentCard>
                  </div>

                  <SectionHeader
                    title="Collection in the Space"
                    subtitle="Pinned from Shopify - live inventory"
                  />
                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-3">
                    {eventProducts.map((product) => (
                      <ProductCard
                        key={product.name}
                        name={product.name}
                        imageSrc={product.imageSrc}
                        imageAlt={product.imageAlt}
                        emoji={product.emoji}
                        gradient={product.gradient}
                        leftValue={product.stock ?? ""}
                        leftLabel="In stock"
                        rightValue={product.price ?? ""}
                        rightLabel="Price"
                        status={product.status}
                        tone={product.tone}
                      />
                    ))}
                  </div>

                  <SectionHeader title="Master Task Tracker" />
                  <TaskBlock title="Pre-Event" tasks={eventTasks} />
                  <RightRail />
                </div>
              </TemplateWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 02
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Space & Logistics
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Sana&apos;s tab. Venue details, vendor tracker from first
                  contact to deposit paid, and a permits checklist.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <TemplateWindow
                title="MAISON CEDRE - GREENE ST POP-UP"
                tabs={tabs}
                activeTab="Space & Logistics"
                meta={
                  <>
                    <MockPill tone="progress">In Progress</MockPill>
                    <MockPill>Oct 9-12</MockPill>
                  </>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                    <ContentCard label="Venue">
                      <strong>112 Greene St, SoHo</strong>
                      <br />
                      ~900 sq ft ground floor
                      <br />
                      <strong>Lease contact:</strong> Marco / 917-555-0182
                      <br />
                      <strong>Access:</strong> Oct 8 from 8am (build-out)
                      <br />
                      <strong>Deposit:</strong> $3,200 - paid Sep 1
                    </ContentCard>
                    <ContentCard label="Key Contacts">
                      <strong>Ops lead:</strong> Sana M.
                      <br />
                      <strong>Rack fabricator:</strong> Form Supply Co.
                      <br />
                      <strong>Florist:</strong> Studio Stem
                      <br />
                      <strong>Lighting:</strong> Arc Events
                      <br />
                      <strong>Cleaning (post):</strong> GreenClean NYC
                    </ContentCard>
                  </div>

                  <SectionHeader
                    title="Vendor Tracker"
                    subtitle="Every vendor from quote to confirmed"
                  />
                  <DataTable
                    title="Vendors"
                    meta="6 vendors"
                    headers={["Vendor", "Service", "Quote", "Deposit", "Status"]}
                    rows={vendorRows}
                    widths={["flex-[2]", "flex-[1.5]", "flex-1", "flex-1", "flex-1"]}
                  />

                  <SectionHeader title="Permits & Paperwork" />
                  <TaskBlock title="Permits" tasks={permitTasks} />
                  <RightRail />
                </div>
              </TemplateWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 03
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Creative & Styling
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  L&eacute;a&apos;s tab. Visual direction, moodboard, and the
                  merchandise plan - which pieces, how many units, which
                  colorways, where they sit in the space.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <TemplateWindow
                title="MAISON CEDRE - GREENE ST POP-UP"
                tabs={tabs}
                activeTab="Creative & Styling"
                meta={
                  <>
                    <MockPill tone="progress">In Progress</MockPill>
                    <MockPill>Oct 9-12</MockPill>
                  </>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 rounded-[8px] px-1 py-1 pr-11">
                    <div className="rounded-[8px] px-3 py-2 text-[13px] leading-[1.65] text-ink-2">
                      <strong>Direction -</strong> The space should feel like
                      Maison C&egrave;dre&apos;s apartment, not a retail store.
                      Warm materials. Natural light where possible, supplemented
                      with warm tungsten. Racks are minimal - no overcrowding.
                      Every piece is given space to breathe.
                    </div>
                  </div>

                  <div className="mb-3 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">
                        Moodboard
                      </div>
                      <div className="text-[11px] text-stone">
                        {moodboardTiles.length} images
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 p-2 max-[640px]:grid-cols-2">
                      {moodboardTiles.map((tile, index) =>
                        tile.imageSrc ? (
                          <div
                            key={tile.imageSrc}
                            className="relative aspect-square overflow-hidden rounded-[6px] bg-[#F7F4EE]"
                          >
                            <Image
                              src={tile.imageSrc}
                              alt={tile.imageAlt ?? `Popup moodboard image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, 160px"
                            />
                          </div>
                        ) : (
                          <div
                            key={`${tile.label}-${tile.tone}`}
                            className={`flex aspect-square items-center justify-center rounded-[6px] text-[20px] ${tile.tone}`}
                          >
                            {tile.label}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <SectionHeader
                    title="Merchandise Plan"
                    subtitle="Units brought to space per SKU and colorway"
                  />
                  <DataTable
                    title="Merch Plan"
                    meta="8 SKUs · 340 units total"
                    headers={["Product", "Colorway", "Units", "Display", "Status"]}
                    rows={merchRows}
                    widths={["flex-[2.5]", "flex-[1.5]", "flex-1", "flex-1", "flex-1"]}
                  />
                  <RightRail />
                </div>
              </TemplateWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 04
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Day-Of
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  Built two weeks out, shared with floor staff on the morning of
                  October 9. Run of show, staff assignments, and live Shopify
                  inventory.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <TemplateWindow
                title="MAISON CEDRE - GREENE ST POP-UP"
                tabs={tabs}
                activeTab="Day-Of"
                meta={
                  <>
                    <MockPill tone="done">Complete</MockPill>
                    <MockPill>Oct 9-12</MockPill>
                  </>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <SectionHeader
                    title="Run of Show - Oct 9"
                    subtitle="Opening day"
                  />
                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">
                        Day-Of Timeline
                      </div>
                      <div className="text-[11px] text-stone">Oct 9</div>
                    </div>
                    <div className="space-y-3 px-4 py-4">
                      {dayTimelineRows.map((row) => (
                        <div key={`${row.time}-${row.label}`} className="flex items-start gap-3">
                          <div className="w-[56px] pt-1 text-[11px] font-medium text-stone">
                            {row.time}
                          </div>
                          <div className="flex-1">
                            <div
                              className={`flex h-6 items-center rounded-[6px] px-3 text-[11px] font-medium ${row.tone} ${row.textTone} ${row.width}`}
                            >
                              {row.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SectionHeader title="Staff" />
                  <DataTable
                    title="Staff Assignments"
                    headers={["Name", "Role", "Shift", "Days"]}
                    rows={staffRows}
                    widths={["flex-[1.5]", "flex-[2]", "flex-1", "flex-1"]}
                  />

                  <SectionHeader
                    title="Live Inventory"
                    subtitle="Shopify - updated in real time"
                  />
                  <div className="grid gap-2 pr-11 md:grid-cols-3">
                    {inventoryProducts.map((product) => (
                      <ProductCard
                        key={product.name}
                        name={product.name}
                        imageSrc={product.imageSrc}
                        imageAlt={product.imageAlt}
                        emoji={product.emoji}
                        gradient={product.gradient}
                        leftValue={product.leftValue ?? ""}
                        leftLabel={product.leftLabel ?? ""}
                        rightValue={product.rightValue ?? ""}
                        rightLabel={product.rightLabel ?? ""}
                        status={product.status}
                        tone={product.tone}
                      />
                    ))}
                  </div>
                  <RightRail />
                </div>
              </TemplateWindow>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[860px] px-12 py-20 max-[768px]:px-6 max-[768px]:py-14">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Result
        </div>
        <h2 className="max-w-[700px] font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
          Four days. <span className="font-semibold text-accent">$41,200.</span>{" "}
          Onto the next one.
        </h2>
        <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
          <p>
            The pop-up ran October 9-12. 340 units, $41,200 in revenue. The
            Cedar Overshirt was the standout - 46% of total revenue, nearly sold
            out by day three. The Day-Of tab stayed open on Sana&apos;s phone
            for the duration.
          </p>
          <p>
            L&eacute;a was back in Paris by October 13. The post-event notes
            were already in Event HQ. The next project brief started the
            following week.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="grid gap-4 rounded-[18px] border border-accent bg-accent-bg px-7 py-7 text-ink md:col-span-2 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <div
              className="font-display text-[clamp(52px,7vw,72px)] leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              $41,200
            </div>
            <div className="border-accent/20 pt-5 text-[16px] font-light leading-[1.75] text-ink-2 md:border-l md:pl-12 md:pt-0">
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                Revenue over 4 days
              </div>
              <p className="mt-2">
                The Cedar Overshirt drove 46% of revenue. Zero discounting. The
                space and the product did the work.
              </p>
            </div>
          </div>
          {popupResults.map((result) => (
            <div
              key={result.label}
              className="rounded-[18px] border border-cream-3 bg-white px-7 py-6"
            >
              <div
                className="font-display text-[42px] leading-none text-ink"
                style={{ letterSpacing: "-0.04em" }}
              >
                {result.value}
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.06em] text-stone">
                {result.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-r-[14px] border-l-[3px] border-accent bg-accent-bg px-6 py-6">
          <p
            className="font-display text-[clamp(22px,2.6vw,28px)] leading-[1.4] text-ink"
            style={{
              fontFamily: "var(--font-hero-display), Georgia, serif",
              letterSpacing: "-0.02em"
            }}
          >
            &quot;Sana had the Day-Of tab open the whole first day. Run of show,
            inventory, staff - one scroll. That&apos;s just how we work now.&quot;
          </p>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-[860px] px-12 max-[768px]:mb-14 max-[768px]:px-6">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[20px] border border-cream-3 bg-cream-2 px-10 py-12 md:flex-row md:items-center max-[768px]:px-7 max-[768px]:py-10">
          <div className="max-w-[420px]">
            <h2
              className="font-display text-[clamp(26px,3vw,34px)] leading-[1.18] text-ink"
              style={{
                fontFamily: "var(--font-hero-display), Georgia, serif",
                letterSpacing: "-0.02em"
              }}
            >
              Run your next pop-up out of{" "}
              <span className="text-accent">one project.</span>
            </h2>
            <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink-2">
              The Pop-Up template covers everything from vendor logistics to
              day-of run of show. Clone it and make it yours.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto">
            <a
              href="https://app.sariasoftware.com/start-free-trial"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent-bg px-7 py-3 text-[13px] font-medium text-accent transition-colors duration-200 hover:bg-[#dbeafe]"
            >
              Use this template
            </a>
            <a
              href="/templates/multi-sku-seasonal-drop"
              className="inline-flex items-center justify-center rounded-full border border-cream-3 px-7 py-3 text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:border-stone hover:text-ink"
            >
              See all templates
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
