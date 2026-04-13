import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TemplateTitleCTA } from "@/components/landing/TemplateTitleCTA";

type LaunchProduct = {
  name: string;
  stock: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
  gradient?: string;
};

type MoodboardTile = {
  label?: string;
  tone?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const templateStats = [
  { value: "47 min", label: "Time to sell out" },
  { value: "$28,850", label: "First-hour revenue" },
  { value: "950", label: "Units sold" },
  { value: "1,240", label: "Waitlist signups in 48hrs" }
];

const templateTimeline = [
  { date: "June 2", label: "Brief locked in Launch HQ" },
  {
    date: "June 6",
    label: "Photographer briefed via Magic Link - Creative Direction tab"
  },
  {
    date: "June 14",
    label: "Product samples approved across all three SKU subtabs"
  },
  {
    date: "June 18",
    label: "Shoot day. Raw selects uploaded to Creative Direction tab same evening."
  },
  {
    date: "June 28",
    label: "All assets approved. Final all-clear in Assets + Approvals."
  },
  { date: "July 7", label: "PR packages shipped. 15 creators and editors." },
  { date: "July 11", label: "Email #1 sends. 61% open rate." },
  {
    date: "July 14, 9:00am EST",
    label: "The Lemon Edit goes live.",
    active: true
  },
  {
    date: "July 14, 9:47am EST",
    label: "Sold out. 950 units. 47 minutes.",
    active: true,
    complete: true
  }
];

const launchProducts: LaunchProduct[] = [
  {
    name: "The Lemon Edit Lip Balm",
    stock: "400",
    price: "$18",
    imageSrc: "/templates/seasonal-drop/lipbalm.png",
    imageAlt: "The Lemon Edit Lip Balm product image"
  },
  {
    name: "Lemon Brightening Moisturizer",
    stock: "250",
    price: "$42",
    imageSrc: "/templates/seasonal-drop/moisturizer.png",
    imageAlt: "Lemon Brightening Moisturizer product image"
  },
  {
    name: "Lemon Dewy Mist Spray",
    stock: "300",
    price: "$28",
    imageSrc: "/templates/seasonal-drop/spray.png",
    imageAlt: "Lemon Dewy Mist Spray product image"
  }
];

const launchTasks = [
  { name: "Lock campaign brief", status: "Done", complete: true },
  {
    name: "Confirm unit quantities with manufacturer",
    status: "Done",
    complete: true
  },
  { name: "Brief photographer", status: "In Progress", inProgress: true },
  { name: "Finalize product names + copy direction", status: "To-Do" }
];

const moisturizerTasks = [
  { name: "Approve product sample", status: "Done", complete: true },
  { name: "Write PDP copy", status: "In Progress", inProgress: true },
  { name: "Approve product photography", status: "To-Do" },
  { name: "Build Shopify listing", status: "To-Do" }
];

const moodboardTiles: MoodboardTile[] = [
  {
    imageSrc: "/templates/seasonal-drop/cm1.png",
    imageAlt: "Campaign moodboard image 1"
  },
  {
    imageSrc: "/templates/seasonal-drop/cm2.png",
    imageAlt: "Campaign moodboard image 2"
  },
  {
    imageSrc: "/templates/seasonal-drop/cm3.png",
    imageAlt: "Campaign moodboard image 3"
  },
  {
    imageSrc: "/templates/seasonal-drop/cm4.png",
    imageAlt: "Campaign moodboard image 4"
  },
  {
    imageSrc: "/templates/seasonal-drop/cm5.png",
    imageAlt: "Campaign moodboard image 5"
  },
  {
    imageSrc: "/templates/seasonal-drop/cm6.png",
    imageAlt: "Campaign moodboard image 6"
  }
];

const shotListRows = [
  { shot: "Hero product still life", sku: "All SKUs", minimum: "3", status: "Approved" },
  { shot: "Texture macro", sku: "Moisturizer", minimum: "2", status: "Needs selects" },
  { shot: "Hand-held lifestyle", sku: "Mist Spray", minimum: "2", status: "Approved" },
  { shot: "Routine stack", sku: "All SKUs", minimum: "2", status: "In review" }
];

const socialPostRows = [
  {
    creator: "Maya Elias",
    deliverable: "IG Reel - morning routine",
    product: "Mist Spray",
    postDate: "July 13",
    status: "Draft approved",
    tone: "done"
  },
  {
    creator: "Ari Lane",
    deliverable: "TikTok GRWM",
    product: "Moisturizer",
    postDate: "July 14",
    status: "Needs caption",
    tone: "progress"
  },
  {
    creator: "Nina Park",
    deliverable: "Stories - 3 frames",
    product: "Lip Balm",
    postDate: "July 14",
    status: "Scheduled",
    tone: "blue"
  },
  {
    creator: "Jules N.",
    deliverable: "Unboxing Reel",
    product: "Full set",
    postDate: "July 15",
    status: "Waiting on draft",
    tone: "urgent"
  }
];

const resultCards = [
  { value: "$28,850", label: "Revenue in under one hour" },
  { value: "61%", label: "Open rate on the live email" },
  { value: "41%", label: "Orders with 2 or more SKUs" },
  { value: "1,240", label: "Waitlist signups in 48 hours" }
];

const aiChecklistTasks = [
  ["Build Mist Spray Shopify listing", "Lina"],
  ["Build Moisturizer Shopify listing", "Lina"],
  ["QA all Shopify listings", "Lina"],
  ["Approve final PDP image - Lip Balm", "Nour"],
  ["Confirm variant label copy - Mist Spray", "Nour"],
  ["Approve Moisturizer product photography", "Nour"]
];

const milestoneRows = [
  ["Finalize all PDP copy", "Product Lineup", "July 9", "Nour", "In Progress"],
  ["Approve shot selects", "Creative Direction", "July 10", "Maya", "In Progress"],
  ["QA all Shopify listings", "Product Lineup", "July 11", "Lina", "To-Do"],
  ["Send launch email #1", "Campaign Rollout", "July 11", "Nour", "To-Do"],
  ["Go live - all three SKUs", "Launch HQ", "July 14", "Team", "To-Do"]
];

const managerStats = [
  { value: "36", label: "Tasks tracked", sub: "across 7 tabs" },
  { value: "3", label: "Assignees coordinated", sub: "zero status syncs" },
  { value: "0", label: "Status meetings held", sub: "during 6 weeks" },
  { value: "100%", label: "Launch-day readiness", sub: "confirmed by AI" }
];

const statusBreakdownRows = [
  {
    label: "Launch HQ",
    count: "8 tasks",
    segments: [
      { width: "75%", color: "#2F6B49" },
      { width: "12.5%", color: "var(--accent)" },
      { width: "12.5%", color: "#B8B4AC" }
    ]
  },
  {
    label: "Product Lineup",
    count: "13 tasks",
    segments: [
      { width: "31%", color: "#2F6B49" },
      { width: "23%", color: "var(--accent)" },
      { width: "38%", color: "#B8B4AC" },
      { width: "8%", color: "#99601A" }
    ]
  },
  {
    label: "Creative Direction",
    count: "9 tasks",
    segments: [
      { width: "55%", color: "#2F6B49" },
      { width: "22%", color: "var(--accent)" },
      { width: "11%", color: "#B8B4AC" },
      { width: "12%", color: "#99601A" }
    ]
  },
  {
    label: "Campaign Rollout",
    count: "10 tasks",
    segments: [
      { width: "80%", color: "#2F6B49" },
      { width: "20%", color: "#B8B4AC" }
    ]
  }
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

function MockTabs({ active }: { active: string }) {
  const tabs = [
    "Overview",
    "Launch HQ",
    "Product Lineup",
    "Creative Direction",
    "Social Media Posts",
    "Campaign Rollout + PR",
    "Site + Merch"
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-end border-t border-cream-3 px-5">
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={`mb-[-1px] flex items-center gap-1.5 border-b-2 px-4 py-3 text-[12px] whitespace-nowrap ${
              active === tab
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
  );
}

function MockWindow({
  activeTab,
  banner,
  backLink = false,
  titleAction,
  children
}: {
  activeTab: string;
  banner?: ReactNode;
  backLink?: boolean;
  titleAction?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[rgba(222,219,212,0.7)] bg-white shadow-[0_24px_48px_rgba(28,25,23,0.08)]">
      {banner}
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
              THE LEMON EDIT
            </div>
            {titleAction ?? (
              <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-3 py-1.5 text-[11px] font-medium text-[#53708A]">
                <span>◎</span>
                <span>Enable Public Link</span>
              </div>
            )}
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <MockPill tone="progress">In Progress</MockPill>
            <MockPill>Due July 14</MockPill>
            <MockPill tone="urgent">Urgent</MockPill>
          </div>
        </div>
        <MockTabs active={activeTab} />
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
  subtitle: string;
}) {
  return (
    <div className="mb-3 pr-11">
      <div className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </div>
      <div className="mt-1 text-[11px] text-stone">{subtitle}</div>
    </div>
  );
}

function ShopifyCard({
  name,
  stock,
  price,
  imageSrc,
  imageAlt,
  gradient
}: {
  name: string;
  stock: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
  gradient?: string;
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
          className={`flex h-20 items-center justify-center bg-gradient-to-br text-[24px] ${gradient ?? "from-[#F8F1D5] to-[#F5E8D7]"}`}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="px-3 py-3">
        <div className="mb-2 text-[12px] font-semibold leading-[1.35] text-ink">
          {name}
        </div>
        <div className="flex gap-4">
          <div>
            <div className="text-[14px] font-semibold leading-none text-ink">
              {stock}
            </div>
            <div className="mt-1 text-[10px] text-stone">In stock</div>
          </div>
          <div>
            <div className="text-[14px] font-semibold leading-none text-ink">
              {price}
            </div>
            <div className="mt-1 text-[10px] text-stone">Price</div>
          </div>
        </div>
        <div className="mt-3">
          <MockPill>Draft</MockPill>
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
          <span className="rounded-[4px] bg-accent-bg px-1.5 py-0.5 text-accent">
            Menu
          </span>
          <span>⊞</span>
          <span>⊟</span>
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
            {task.complete ? "" : "·"}
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
              task.status === "Done"
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

function RightRail() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-9 flex-col items-center gap-4 border-l border-[#F0EEEA] bg-white py-4 text-[13px] text-[#C5C0B6]">
      <span>L</span>
      <span>AI</span>
      <span>⊞</span>
      <span>C</span>
      <span>U</span>
    </div>
  );
}

function AiBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-[8px] border border-[#D7E5F6] bg-[#F5F9FC] px-3 py-1.5 text-[11px] font-semibold text-accent">
      <span>✦</span>
      <span>AI Workspace</span>
    </div>
  );
}

function ChatBubble({
  children,
  from = "ai"
}: {
  children: ReactNode;
  from?: "ai" | "user";
}) {
  const isUser = from === "user";

  return (
    <div className={`mb-2.5 flex items-start gap-2.5 ${isUser ? "justify-end" : ""}`}>
      {!isUser ? (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
          ✦
        </div>
      ) : null}
      <div
        className={`max-w-[80%] rounded-[12px] px-3.5 py-2.5 text-[12.5px] leading-[1.65] ${
          isUser
            ? "bg-[#F3F1EC] text-ink"
            : "border border-[#EFECE5] bg-white text-ink-2"
        }`}
      >
        {children}
      </div>
      {isUser ? (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#EFECE5] text-[11px] font-semibold text-stone">
          N
        </div>
      ) : null}
    </div>
  );
}

function AiAction({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-2.5 py-1 text-[10px] font-medium text-accent">
      <span>✦</span>
      <span>{children}</span>
    </div>
  );
}

function AiCreatedShell({
  title,
  meta,
  children
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mr-11 overflow-hidden rounded-[12px] border border-[#D7E5F6] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E5F6] bg-[#F5F9FC] px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-accent">
          <span>✦</span>
          <span>{title}</span>
        </div>
        {meta ? <div className="text-[11px] text-[#53708A]">{meta}</div> : null}
      </div>
      {children}
    </div>
  );
}

function MagicLinkBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-[6px] bg-accent-bg px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
      <span>◎</span>
      <span>Magic Link</span>
    </div>
  );
}

function AiTaskRow({ name, assignee }: { name: string; assignee: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[#EEF2FF] px-4 py-2.5 text-[12px] last:border-b-0">
      <span className="h-[15px] w-[15px] flex-shrink-0 rounded-full border border-[#D0CCC4]" />
      <div className="flex-1 text-ink">{name}</div>
      <span className="rounded-full bg-[#EFECE5] px-2 py-0.5 text-[10px] text-stone">
        {assignee}
      </span>
      <MockPill>To-Do</MockPill>
    </div>
  );
}

function MilestoneTable() {
  return (
    <AiCreatedShell
      title="Remaining Milestones"
      meta={
        <span className="inline-flex items-center gap-2">
          <MockPill tone="blue">Live - synced to tasks</MockPill>
          <span>Added to Overview tab</span>
        </span>
      }
    >
      <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
        <div className="flex-[2]">Milestone</div>
        <div className="flex-[1.5]">Tab</div>
        <div className="flex-1">Due</div>
        <div className="flex-1">Owner</div>
        <div className="flex-1">Status</div>
      </div>
      {milestoneRows.map(([milestone, tab, due, owner, status]) => (
        <div
          key={milestone}
          className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
        >
          <div className="flex-[2] pr-2 font-medium text-ink">{milestone}</div>
          <div className="flex-[1.5] pr-2 text-[11px] text-stone">{tab}</div>
          <div className="flex-1 pr-2 text-ink-2">{due}</div>
          <div className="flex-1 pr-2 text-ink-2">{owner}</div>
          <div className="flex-1">
            <MockPill tone={status === "In Progress" ? "progress" : "neutral"}>
              {status}
            </MockPill>
          </div>
        </div>
      ))}
    </AiCreatedShell>
  );
}

function PromptBar({
  children,
  run = false
}: {
  children: ReactNode;
  run?: boolean;
}) {
  return (
    <div className="mb-3 mr-11 flex items-center gap-2.5 rounded-[10px] border border-[#D7E5F6] bg-[#F5F9FC] px-4 py-2.5 text-[12.5px] text-[#53708A]">
      <span className="flex-shrink-0 text-[14px] text-accent">✦</span>
      <span className="flex-1">{children}</span>
      {run ? (
        <span className="rounded-[6px] bg-accent px-3.5 py-1.5 text-[11px] font-medium text-white">
          Run
        </span>
      ) : null}
    </div>
  );
}

function StatusBreakdownChart() {
  return (
    <AiCreatedShell
      title="Task Status by Tab"
      meta={
        <div className="flex flex-wrap gap-3 text-[10px] text-stone">
          {[
            ["Done", "#2F6B49"],
            ["In Progress", "var(--accent)"],
            ["To-Do", "#B8B4AC"],
            ["Blocked", "#99601A"]
          ].map(([label, color]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: color }}
              />
              {label}
            </span>
          ))}
        </div>
      }
    >
      <div className="px-4 py-4">
        {statusBreakdownRows.map((row) => (
          <div key={row.label} className="mb-3.5 last:mb-0">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[12px] text-ink">{row.label}</span>
              <span className="text-[11px] text-stone">{row.count}</span>
            </div>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-[#F3F1EC]">
              {row.segments.map((segment, index) => (
                <span
                  key={`${row.label}-${index}`}
                  style={{
                    width: segment.width,
                    backgroundColor: segment.color
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AiCreatedShell>
  );
}

export function Templates() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-[860px] px-12 pb-20 pt-[96px] max-[768px]:px-6 max-[768px]:pb-14 max-[768px]:pt-[72px]">
        <div className="mb-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-stone">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Case Study · Seasonal Drop Template
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
          <h1
            className="max-w-[820px] font-display text-[clamp(38px,5vw,58px)] leading-[1.08] text-ink"
            style={{
              fontFamily: "var(--font-hero-display), Georgia, serif",
              letterSpacing: "-0.03em"
            }}
          >
            How &Eacute;clat Studio launched{" "}
            <span className="text-accent">The Lemon Edit</span> and sold out in
            47 minutes.
          </h1>
          <TemplateTitleCTA />
        </div>
        <p className="mt-7 max-w-[640px] text-[18px] font-light leading-[1.7] text-ink-2">
          A small team. Three new SKUs. Six weeks from brief to live.
          Here&apos;s how &Eacute;clat Studio ran their entire seasonal drop
          out of a single Saria project - and what happened when they did.
        </p>
        <div className="mt-10 grid overflow-hidden rounded-[14px] border border-cream-3 bg-white md:grid-cols-4">
          {templateStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-cream-3 px-7 py-6 max-[768px]:px-5 max-[768px]:py-4 ${
                index < templateStats.length - 1 ? "md:border-r" : ""
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

      <section className="mx-auto grid max-w-[860px] gap-12 px-12 py-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[768px]:px-6 max-[768px]:py-14">
        <div>
          <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            The Drop
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            Three SKUs. Six weeks.{" "}
            <span className="font-semibold text-accent">One project.</span>
          </h2>
          <div className="mt-6 space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
            <p>
              &Eacute;clat Studio had a concept - The Lemon Edit, a limited
              three-product drop built on their Soft Glow base formula. They
              had a team, a manufacturer, and six weeks. What they didn&apos;t
              have was one place to run it.
            </p>
            <p>
              The brief was in Notion, assets were in Drive, copy was in email
              threads, and the ops contractor was asking Slack questions that
              had already been answered somewhere else.
            </p>
            <p>
              They set up a single Saria project and ran the entire launch from
              it - brief to sold out.
            </p>
          </div>
        </div>
        <div className="relative pl-9">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-cream-3" />
          {templateTimeline.map((event) => (
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
                {event.complete ? "OK" : event.active ? "Next" : ""}
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
            Seven tabs. Here&apos;s what the &Eacute;clat team put inside each
            one and why it mattered.
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
                  Launch HQ
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  The command center. Campaign brief, live Shopify inventory,
                  master task tracker, and the full six-week timeline - all in
                  one tab. The Launch Day subtab is what the team had open on
                  July 14.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow activeTab="Launch HQ" backLink>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-2 rounded-[10px] px-1 py-1 pr-11">
                    <div className="rounded-[8px] px-3 py-2 text-[13px] leading-[1.65] text-ink-2">
                      <strong>The Lemon Edit</strong> is &Eacute;clat Studio&apos;s
                      first seasonal drop - a limited extension of the Soft Glow
                      core line built around lemon as a hero ingredient. Three
                      products. Launch date: July 14. Drop window: 72 hours or
                      until sold out. No restock announcement at launch.
                    </div>
                  </div>

                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                    <ContentCard label="Drop Details">
                      <strong>Launch date:</strong> July 14
                      <br />
                      <strong>Channel priority:</strong> Email → IG → TikTok
                      <br />
                      <strong>Lip Balm:</strong> $18 · 400 units
                      <br />
                      <strong>Moisturizer:</strong> $42 · 250 units
                      <br />
                      <strong>Mist:</strong> $28 · 300 units
                    </ContentCard>
                    <ContentCard label="Who We&apos;re Talking To">
                      Women 22-34. Already in the Rhode/Augustinus Bader orbit
                      but not yet spending at that level. She buys
                      intentionally. She found &Eacute;clat through a friend or a
                      TikTok.
                    </ContentCard>
                  </div>

                  <SectionHeader
                    title="Products"
                    subtitle="Pinned from Shopify - live inventory and variant status"
                  />
                  <div className="mb-3 grid gap-2 pr-11 md:grid-cols-3">
                    {launchProducts.map((product) => (
                      <ShopifyCard key={product.name} {...product} />
                    ))}
                  </div>

                  <SectionHeader
                    title="Master Task Tracker"
                    subtitle="Pre-production phase"
                  />
                  <TaskBlock title="Pre-Production" tasks={launchTasks} />
                  <RightRail />
                </div>
              </MockWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 02
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Product Lineup
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  One subtab per SKU. Each has the live Shopify block for that
                  product, product story, key details, approval tasks,
                  photography, and manufacturer documents.
                </p>
              </div>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow activeTab="Product Lineup">
                <div className="grid grid-cols-[180px_minmax(0,1fr)] max-[880px]:grid-cols-1">
                  <div className="border-r border-[#F0EEEA] bg-[#FAF9F6] py-4 max-[880px]:hidden">
                    <div className="px-4 pb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-stone">
                      Subtabs
                    </div>
                    <div className="px-4 py-2 text-[12px] text-ink-2">
                      Lemon Lip Balm
                    </div>
                    <div className="border-r-2 border-ink bg-[#EFECE5] px-4 py-2 text-[12px] font-medium text-ink">
                      Brightening Moisturizer
                    </div>
                    <div className="px-4 py-2 text-[12px] text-ink-2">
                      Dewy Mist Spray
                    </div>
                  </div>

                  <div className="relative bg-white px-5 py-5 pr-14">
                    <SectionHeader
                      title="Lemon Brightening Moisturizer"
                      subtitle="Hero treatment SKU - limited run of 250 units"
                    />
                    <div className="mb-3 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                      <div className="grid min-[720px]:grid-cols-[100px_minmax(0,1fr)]">
                        <div className="flex items-center justify-center bg-gradient-to-br from-[#EEF2FF] to-[#E3EEF9] text-[28px]">
                          LM
                        </div>
                        <div className="px-4 py-4">
                          <div className="mb-2 text-[12px] font-semibold text-ink">
                            Lemon Brightening Moisturizer
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {[
                              ["250", "In stock"],
                              ["$42", "Price"],
                              ["1", "Variants"],
                              ["0", "Units sold"]
                            ].map(([value, label]) => (
                              <div key={label}>
                                <div className="text-[14px] font-semibold leading-none text-ink">
                                  {value}
                                </div>
                                <div className="mt-1 text-[10px] text-stone">
                                  {label}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3">
                            <MockPill>Draft - not live</MockPill>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 grid gap-2 pr-11 md:grid-cols-2">
                      <ContentCard label="Product Story">
                        The moisturizer is the collection&apos;s anchor - the
                        product that justifies the drop as a skincare story.
                        Lemon vitamin C + niacinamide for a brightening,
                        pore-minimizing effect. Lightweight gel-cream. Works
                        under SPF.
                      </ContentCard>
                      <ContentCard label="Key Details">
                        <strong>Price:</strong> $42 &nbsp;
                        <strong>Units:</strong> 250
                        <br />
                        <strong>Hero ingredients:</strong> Lemon vit C,
                        niacinamide, HA
                        <br />
                        <strong>Packaging:</strong> Frosted glass jar, yellow
                        lid
                        <br />
                        <strong>Status:</strong> Pending Shopify listing
                      </ContentCard>
                    </div>

                    <TaskBlock
                      title="Moisturizer - Product Tasks"
                      tasks={moisturizerTasks}
                    />
                    <RightRail />
                  </div>
                </div>
              </MockWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 03
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Creative Direction
                </h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-ink-2">
                  The only tab with a Magic Link. Photographer Maya Elias opened
                  it on June 6 - no login, no account. She saw the creative
                  vision, the moodboard, the shot list table, and the files she
                  needed.
                </p>
              </div>
              <MagicLinkBadge />
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow
                activeTab="Creative Direction"
                banner={
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E5F6] bg-[#F5F9FC] px-5 py-2 text-[12px] text-[#53708A]">
                    <div className="flex items-center gap-2">
                      <span>◎</span>
                      <span>
                        Public page - Creative Brief: The Lemon Edit · Shared by
                        Nour K.
                      </span>
                    </div>
                    <span className="font-medium">Copy link →</span>
                  </div>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mb-3 rounded-[8px] px-1 py-1 pr-11">
                    <div className="rounded-[8px] px-3 py-2 text-[13px] leading-[1.65] text-ink-2">
                      <strong>Creative Vision -</strong> The Lemon Edit should
                      feel like early morning light through a window. Not
                      tropical. Not loud. The lemon is a detail, not a costume.
                      Reference points: Aesop campaigns, early Rhode product
                      imagery, Jacquemus Le Citron. Clean surfaces. Natural
                      light. Skin that looks real.
                    </div>
                  </div>

                  <div className="mb-3 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">
                        Campaign Moodboard
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
                              alt={tile.imageAlt ?? `Campaign moodboard image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 33vw, 120px"
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
                    title="Shot List"
                    subtitle="Required deliverables per SKU - minimum selects noted"
                  />
                  <div className="mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">
                        Shot List
                      </div>
                      <div className="text-[11px] text-stone">11 shots</div>
                    </div>
                    <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
                      <div className="flex-[2]">Shot Type</div>
                      <div className="flex-[1.5]">SKU</div>
                      <div className="flex-1">Min. Selects</div>
                      <div className="flex-1">Status</div>
                    </div>
                    {shotListRows.map((row) => (
                      <div
                        key={row.shot}
                        className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
                      >
                        <div className="flex-[2] pr-2 text-ink">{row.shot}</div>
                        <div className="flex-[1.5] pr-2 text-ink-2">
                          {row.sku}
                        </div>
                        <div className="flex-1 pr-2 text-ink-2">
                          {row.minimum}
                        </div>
                        <div className="flex-1">
                          <MockPill
                            tone={
                              row.status === "Approved"
                                ? "done"
                                : row.status === "In review"
                                  ? "blue"
                                  : "progress"
                            }
                          >
                            {row.status}
                          </MockPill>
                        </div>
                      </div>
                    ))}
                  </div>
                  <RightRail />
                </div>
              </MockWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 flex max-w-[1000px] flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                  Tab 04
                </div>
                <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                  Social Media Posts
                </h3>
                <p className="mt-2 max-w-[660px] text-[14px] leading-[1.7] text-ink-2">
                  The creator and editor work did not live in a spreadsheet. The
                  team tracked every influencer deliverable in one Social Media
                  Posts tab, then used Magic Links so each creator could review
                  the brief, upload drafts, and confirm captions without a Saria
                  login.
                </p>
              </div>
              <MagicLinkBadge />
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow
                activeTab="Social Media Posts"
                banner={
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E5F6] bg-[#F5F9FC] px-5 py-2 text-[12px] text-[#53708A]">
                    <div className="flex items-center gap-2">
                      <span>◎</span>
                      <span>
                        Public page - Creator Brief: The Lemon Edit · Shared
                        with 15 creators
                      </span>
                    </div>
                    <span className="font-medium">Copy link →</span>
                  </div>
                }
              >
                <div className="relative bg-white px-5 py-5 pr-14">
                  <SectionHeader
                    title="Influencer Posting Tracker"
                    subtitle="Draft status, post dates, linked briefs, and caption approval in one tab"
                  />
                  <div className="mb-3 mr-11 overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                    <div className="flex items-center justify-between border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3">
                      <div className="text-[12px] font-semibold text-ink">
                        Social Media Posts
                      </div>
                      <div className="text-[11px] text-stone">
                        15 creators · 23 deliverables
                      </div>
                    </div>
                    <div className="flex border-b border-[#EFECE5] bg-[#F5F3EE] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.06em] text-stone">
                      <div className="flex-[1.4]">Creator</div>
                      <div className="flex-[2]">Deliverable</div>
                      <div className="flex-[1.2]">Product</div>
                      <div className="flex-1">Post Date</div>
                      <div className="flex-[1.2]">Status</div>
                    </div>
                    {socialPostRows.map((row) => (
                      <div
                        key={`${row.creator}-${row.deliverable}`}
                        className="flex items-center border-b border-[#F5F3EE] px-4 py-3 text-[12px] last:border-b-0"
                      >
                        <div className="flex-[1.4] pr-2 font-medium text-ink">
                          {row.creator}
                        </div>
                        <div className="flex-[2] pr-2 text-ink-2">
                          {row.deliverable}
                        </div>
                        <div className="flex-[1.2] pr-2 text-ink-2">
                          {row.product}
                        </div>
                        <div className="flex-1 pr-2 text-ink-2">
                          {row.postDate}
                        </div>
                        <div className="flex-[1.2]">
                          <MockPill
                            tone={
                              row.tone as "neutral" | "progress" | "done" | "urgent" | "blue"
                            }
                          >
                            {row.status}
                          </MockPill>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 pr-11 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="overflow-hidden rounded-[12px] border border-[#D7E5F6] bg-white">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D7E5F6] bg-[#F5F9FC] px-4 py-3">
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-accent">
                          <span>◎</span>
                          <span>Magic Link View - Ari Lane</span>
                        </div>
                        <MockPill tone="blue">External collaborator</MockPill>
                      </div>
                      <div className="space-y-3 px-4 py-4 text-[12.5px] leading-[1.65] text-ink-2">
                        <p>
                          Ari sees only the GRWM deliverable, the Lemon
                          Brightening Moisturizer notes, approved product
                          claims, caption guidance, and the upload field for her
                          draft.
                        </p>
                        <div className="rounded-[10px] border border-[#EFECE5] bg-[#FAF9F6] px-3 py-3">
                          <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-stone">
                            Creator note
                          </div>
                          <p>
                            &quot;Draft is uploaded. I kept the hook softer and
                            used the under-SPF angle from the brief.&quot;
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#D7E5F6] bg-[#F5F9FC] px-2.5 py-1 text-[10px] font-medium text-accent">
                          <span>◎</span>
                          <span>Draft attached · Caption ready for review</span>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[12px] border border-[#EFECE5] bg-white">
                      <div className="border-b border-[#EFECE5] bg-[#FAF9F6] px-4 py-3 text-[12px] font-semibold text-ink">
                        Creator Brief Assets
                      </div>
                      <div className="grid grid-cols-3 gap-1 p-2">
                        {launchProducts.map((product) => (
                          <div
                            key={product.name}
                            className="relative aspect-square overflow-hidden rounded-[6px] bg-[#F7F4EE]"
                          >
                            <Image
                              src={product.imageSrc ?? ""}
                              alt={product.imageAlt ?? product.name}
                              fill
                              className="object-contain p-1"
                              sizes="90px"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-[#EFECE5] px-4 py-3 text-[11px] leading-[1.6] text-stone">
                        Shared assets stayed attached to the post tracker, so
                        draft feedback and posting status lived beside the
                        product context.
                      </div>
                    </div>
                  </div>
                  <RightRail />
                </div>
              </MockWindow>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[1000px] px-12 py-20 max-[768px]:px-4 max-[768px]:py-14">
        <div className="mx-auto mb-14 max-w-[860px] px-0 md:px-6">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            AI Workspace
          </div>
          <h2 className="max-w-[740px] font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            The AI didn&apos;t just answer questions.{" "}
            <span className="font-semibold text-accent">It did the work.</span>
          </h2>
          <p className="mt-3 max-w-[600px] text-[16px] font-light leading-[1.8] text-ink-2">
            Saria&apos;s AI lives inside every project. It knows your tasks, your
            docs, your Shopify data, and your team - and it can act on all of
            it. The &Eacute;clat team used it throughout the launch, not as a
            chatbot, but as someone who actually understood the project.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <div className="mx-auto mb-5 max-w-[1000px]">
              <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                AI in action · 01
              </div>
              <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                Ask anything. Get a real answer.
              </h3>
              <p className="mt-2 max-w-[680px] text-[14px] leading-[1.7] text-ink-2">
                Three days before launch, Nour needed a clear picture of what
                was still open. She didn&apos;t dig through subtabs or message
                the team. She asked the AI. It scanned every task across all
                seven tabs, synthesized the full picture, and built the
                checklist for her.
              </p>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow activeTab="Launch HQ" titleAction={<AiBadge />}>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <div className="mr-11 mb-3">
                    <ChatBubble from="user">
                      Which tasks across all three SKUs are still open going
                      into launch week?
                    </ChatBubble>
                    <ChatBubble>
                      Across your three product subtabs, there are{" "}
                      <strong>6 open tasks</strong> going into launch week:
                      <br />
                      <br />
                      <strong>Lip Balm:</strong> Build Shopify listing · Approve
                      final PDP image
                      <br />
                      <strong>Moisturizer:</strong> Approve product photography
                      · Build Shopify listing
                      <br />
                      <strong>Mist Spray:</strong> Confirm variant label copy ·
                      QA Shopify listing
                      <br />
                      <br />
                      All 4 manufacturing approval tasks are marked Done. Want
                      me to create a launch-week checklist block grouping these
                      by owner?
                      <div>
                        <AiAction>Scanned 36 tasks across 7 tabs</AiAction>
                      </div>
                    </ChatBubble>
                    <ChatBubble from="user">
                      Yes - create the checklist. Assign Shopify tasks to Lina
                      and copy tasks to me.
                    </ChatBubble>
                    <ChatBubble>
                      Done. I&apos;ve added a Launch Week Checklist block with
                      all 6 tasks, assigned and prioritized. Lina will see her
                      tasks when she opens the project.
                      <div>
                        <AiAction>
                          Created: Launch Week Checklist · 6 tasks · 2 assignees
                        </AiAction>
                      </div>
                    </ChatBubble>
                  </div>

                  <AiCreatedShell
                    title="Launch Week Checklist"
                    meta={
                      <span className="inline-flex items-center gap-2">
                        <MockPill tone="blue">Created by AI</MockPill>
                        <span>6 tasks · 2 assignees</span>
                      </span>
                    }
                  >
                    {aiChecklistTasks.map(([name, assignee]) => (
                      <AiTaskRow key={name} name={name} assignee={assignee} />
                    ))}
                  </AiCreatedShell>
                  <RightRail />
                </div>
              </MockWindow>
            </div>
          </div>

          <div>
            <div className="mx-auto mb-5 max-w-[1000px]">
              <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
                AI in action · 02
              </div>
              <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
                One prompt. A block that stays in sync.
              </h3>
              <p className="mt-2 max-w-[680px] text-[14px] leading-[1.7] text-ink-2">
                Two weeks out, the team wanted a campaign timeline table - all
                remaining milestones, sorted by date, visible on the Overview
                tab. Nour typed the request. The AI built it and placed it. The
                table wasn&apos;t a snapshot; it was a live block pulling from
                tasks already in the project.
              </p>
            </div>
            <div className="feature-demo-shell px-0 pb-0 pt-4">
              <MockWindow activeTab="Overview" titleAction={<AiBadge />}>
                <div className="relative bg-white px-5 py-5 pr-14">
                  <PromptBar run>
                    Create a table of all remaining milestones, sorted by due
                    date, and add it to the Overview tab
                  </PromptBar>
                  <MilestoneTable />
                  <RightRail />
                </div>
              </MockWindow>
            </div>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[1000px] px-12 py-20 max-[768px]:px-4 max-[768px]:py-14">
        <div className="mx-auto mb-10 max-w-[860px] px-0 md:px-6">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            For the person running the launch
          </div>
          <h2 className="font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
            Full visibility. No status meetings.
          </h2>
          <p className="mt-3 max-w-[600px] text-[16px] font-light leading-[1.8] text-ink-2">
            Managing a launch means knowing exactly where things stand at any
            moment - across SKUs, across your team, across every part of the
            project. Saria gives you that picture without having to ask anyone
            for it.
          </p>
        </div>

        <div className="mx-auto mb-16 grid max-w-[860px] gap-10 px-0 md:grid-cols-2 md:px-6">
          <div className="space-y-5 text-[16px] font-light leading-[1.8] text-ink-2">
            <p>
              Before Saria, Nour was running status updates manually - a Friday
              Slack message, a shared Notion table she had to update herself,
              and a running note on her phone of what she was afraid people
              were forgetting.
            </p>
            <p>
              With Saria, she opened the Overview tab and knew. Every task across
              every SKU, every assignee, every status - pulled into one view
              automatically. Nothing to maintain. Nothing to ask.
            </p>
            <p>
              And when she wanted a breakdown by tab or assignee, she
              didn&apos;t build a pivot table. She asked the AI. In fifteen
              seconds, she had a live chart sitting inside the project.
            </p>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {managerStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[14px] border border-cream-3 bg-white px-5 py-5"
              >
                <div
                  className="font-display text-[30px] leading-none text-ink"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-ink">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.06em] text-stone">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mx-auto mb-5 max-w-[1000px]">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
              AI in action · 03
            </div>
            <h3 className="font-display text-[24px] tracking-[-0.02em] text-ink">
              &quot;Show me task completion by tab.&quot;
            </h3>
            <p className="mt-2 max-w-[680px] text-[14px] leading-[1.7] text-ink-2">
              Five days out, Nour wanted to know which parts of the project
              were lagging. She typed one sentence. The AI generated a
              breakdown chart directly inside the project - pulling from every
              real task in every real tab.
            </p>
          </div>
          <div className="feature-demo-shell px-0 pb-0 pt-4">
            <MockWindow activeTab="Overview" titleAction={<AiBadge />}>
              <div className="relative bg-white px-5 py-5 pr-14">
                <PromptBar>Show me a breakdown of task status by tab</PromptBar>
                <div className="mr-11 mb-3">
                  <ChatBubble>
                    Here&apos;s a live breakdown of all 36 tasks across your
                    project by tab. Product Lineup has the most open work - 5
                    tasks still To-Do. Campaign Rollout is in the best shape at
                    80% done.
                  </ChatBubble>
                </div>
                <StatusBreakdownChart />
                <RightRail />
              </div>
            </MockWindow>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-[860px] border-0 border-t border-cream-3 px-12 max-[768px]:mx-6 max-[768px]:max-w-none max-[768px]:px-0" />

      <section className="mx-auto max-w-[860px] px-12 py-20 max-[768px]:px-6 max-[768px]:py-14">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Result
        </div>
        <h2 className="max-w-[700px] font-display text-[clamp(30px,3.5vw,40px)] leading-[1.14] tracking-[-0.03em] text-ink">
          Everything the team needed to launch was already in the room.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="grid gap-4 rounded-[18px] border border-accent bg-accent-bg px-7 py-7 text-ink md:col-span-2 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
            <div
              className="font-display text-[clamp(52px,7vw,72px)] leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              950
            </div>
            <div className="border-accent/20 pt-5 text-[16px] font-light leading-[1.75] text-ink-2 md:border-l md:pl-12 md:pt-0">
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                Units sold
              </div>
              <p className="mt-2">
                The Lemon Edit sold out in 47 minutes because inventory,
                creative, launch-day tasks, live Shopify data, and real-time
                visibility were all running from one project - not six tools
                and a Friday Slack message.
              </p>
            </div>
          </div>
          {resultCards.map((result) => (
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
            &quot;When launch day came, nobody had to ask where anything lived.
            The team was already working from the same source of truth.&quot;
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
              Run your next <span className="text-accent">seasonal drop</span>{" "}
              from one workspace.
            </h2>
            <p className="mt-3 text-[15px] font-light leading-[1.7] text-ink-2">
              Use the same structure for launch HQ, SKU subtabs, creative
              direction, and launch-day coordination - with AI that knows your
              project as well as you do.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto">
            <a
              href="https://app.sariasoftware.com/start-free-trial"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[13px] font-medium text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Use this template
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-full border border-cream-3 px-7 py-3 text-[13px] font-medium text-ink-2 transition-colors duration-200 hover:border-stone hover:text-ink"
            >
              See all templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
