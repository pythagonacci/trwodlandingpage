"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#features", label: "Shopify Integration" },
  { href: "#why-trak", label: "For Brand Teams" },
  { href: "#collaboration", label: "Collaboration" }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-[60px] border-b border-cream-3 bg-[rgba(250,248,244,0.94)] backdrop-blur-xl transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="#top"
          className="font-display text-[20px] font-bold tracking-[-0.03em] text-ink"
        >
          Trak
        </Link>
        <ul className="flex items-center gap-8 text-[13px] font-normal text-ink-3">
          {LINKS.map((item, index) => (
            <li
              key={item.href}
              className={index < LINKS.length - 1 ? "max-[880px]:hidden" : undefined}
            >
              <a
                href={item.href}
                className="transition-colors duration-150 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              className="rounded-full px-[22px] py-[9px] text-[13px] font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: "#1D4ED8" }}
            >
              Start Free Trial
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

