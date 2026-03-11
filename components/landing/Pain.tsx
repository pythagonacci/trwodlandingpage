"use client";

import { useRef } from "react";
import { useInView } from "../../hooks/useInView";

const PAIN_ITEMS = [
  {
    number: "01",
    title: "Your attention is shattered.",
    body:
      "Shopify for products. Notion for plans. Slack for updates. Dropbox for assets. Email for contractors. Six tabs, zero clarity. You spend more time tracking down information than acting on it."
  },
  {
    number: "02",
    title: "Launch day is still chaos.",
    body:
      "You have a hard deadline. Creative, ops, marketing, inventory, and external partners all need to move together. No existing tool holds all of that with live business context attached."
  },
  {
    number: "03",
    title: "External collaboration is a nightmare.",
    body:
      "Adding agencies to internal systems. Explaining folder structures. Chasing influencers for deliverables over DM. Every external partner is a new coordination headache."
  },
  {
    number: "04",
    title: "Your Shopify data lives somewhere else.",
    body:
      "Planning a campaign in Notion, checking inventory in Shopify, writing a brief in Google Docs. Your business context is never where your work is."
  }
];

type PainItemProps = {
  index: number;
  number: string;
  title: string;
  body: string;
};

function PainItem({ index, number, title, body }: PainItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`fade-up-initial border-b border-cream-3 px-[60px] py-[44px] transition-all duration-[550ms] ease-subtle max-[880px]:px-6 max-[880px]:py-9 ${
        inView ? "fade-up-enter" : ""
      }`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : undefined }}
    >
      <div className="grid grid-cols-[30px_1fr] gap-[18px]">
        <div className="pt-[5px] text-[11px] font-medium tracking-[0.08em] text-sand">
          {number}
        </div>
        <div>
          <h3 className="mb-[10px] font-display text-[20px] font-bold leading-[1.25] tracking-[-0.01em] text-ink">
            {title}
          </h3>
          <p className="text-[15px] leading-[1.8] text-ink-2">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function Pain() {
  return (
    <section className="grid grid-cols-2 border-b border-cream-3 max-[880px]:grid-cols-1">
      <div className="sticky top-[60px] self-start border-r border-cream-3 px-[60px] py-[100px] max-[880px]:static max-[880px]:border-b max-[880px]:border-r-0 max-[880px]:px-6 max-[880px]:pt-[60px] max-[880px]:pb-10">
        <div className="mb-7 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
          The Problem
        </div>
        <h2 className="mb-6 font-display text-[clamp(36px,3.8vw,54px)] font-normal leading-[1.1] tracking-[-0.05em] text-ink">
          Monday was built for engineers.
          <br />
          Asana for enterprise.
          <br />
          <span className="font-display font-bold text-accent">
            Nothing was built for you.
          </span>
        </h2>
        <p className="max-w-[320px] text-[15px] leading-[1.8] text-ink-2">
          DTC brands have been duct-taping together five tools because nothing
          was designed for how a brand team actually thinks, works, and
          launches.
        </p>
      </div>
      <div className="flex flex-col">
        {PAIN_ITEMS.map((item, index) => (
          <PainItem
            key={item.number}
            index={index}
            number={item.number}
            title={item.title}
            body={item.body}
          />
        ))}
      </div>
    </section>
  );
}

