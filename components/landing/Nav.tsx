"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PRODUCT_LINKS = [
  { href: "/product/organize", label: "01 - Organize" },
  { href: "/product/create", label: "02 - Create" },
  { href: "/product/intelligent-action", label: "03 - Intelligent Action" },
  { href: "/product/collaborate", label: "04 - Collaborate" },
  { href: "/product/connect", label: "05 - Connect" }
];

const LINKS = [
  { href: "/pricing", label: "Pricing" }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!productMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!productMenuRef.current?.contains(event.target as Node)) {
        setProductMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [productMenuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[200] h-[60px] border-b border-cream-3 bg-[rgba(250,248,244,0.94)] backdrop-blur-xl transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink"
          onClick={() => setProductMenuOpen(false)}
        >
          Saria
        </Link>
        <ul className="flex items-center gap-8 text-[13px] font-normal text-ink-3">
          <li
            ref={productMenuRef}
            className="relative"
            onMouseEnter={() => setProductMenuOpen(true)}
            onMouseLeave={() => setProductMenuOpen(false)}
          >
            <button
              type="button"
              aria-expanded={productMenuOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-ink"
              onClick={() => setProductMenuOpen((open) => !open)}
              onFocus={() => setProductMenuOpen(true)}
            >
              Product
              <span className="text-[10px] text-stone">v</span>
            </button>
            <div
              className={`absolute left-1/2 top-full z-50 w-[250px] -translate-x-1/2 pt-3 transition-all duration-150 ${
                productMenuOpen
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
            >
              <div className="rounded-xl border border-cream-3 bg-[rgba(250,248,244,0.98)] p-2 shadow-[0_18px_42px_rgba(28,25,23,0.12)] backdrop-blur-md">
                {PRODUCT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-[12px] text-ink-3 transition-colors duration-150 hover:bg-cream-2 hover:text-ink"
                    onClick={() => setProductMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {LINKS.map((item, index) => (
            <li
              key={item.href}
              className={index < LINKS.length - 1 ? "max-[880px]:hidden" : undefined}
            >
              <Link
                href={item.href}
                className="transition-colors duration-150 hover:text-ink"
                onClick={() => setProductMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#cta"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-white transition-colors duration-200"
              onClick={() => setProductMenuOpen(false)}
              style={{ backgroundColor: "#1D4ED8" }}
            >
              Start Free Trial
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
