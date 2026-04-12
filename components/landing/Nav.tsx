"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { USE_CASE_ITEMS } from "@/app/use-cases/links";

const PRODUCT_LINKS = [
  { href: "/product/organize", label: "01 - Organize" },
  { href: "/product/create", label: "02 - Create" },
  { href: "/product/intelligent-action", label: "03 - Intelligent Action" },
  { href: "/product/collaborate", label: "04 - Collaborate" },
  { href: "/product/connect", label: "05 - Connect" }
];

const TEMPLATE_LINKS = [
  { href: "/templates", label: "All Templates" },
  { href: "/templates/multi-sku-seasonal-drop", label: "01 - Multi-SKU / Seasonal Drop" },
  {
    href: "/templates/product-design-and-development",
    label: "02 - Product Design and Development"
  },
  { href: "/templates/pop-ups", label: "03 - Pop-Ups" },
  { href: "/templates/pr-tracking", label: "04 - PR Tracking" }
];

const LINKS = [
  { href: "/pricing", label: "Pricing", hideOnMobile: true }
];

export type NavVariant = "default" | "linear" | "linearLight";

export function Nav({ variant = "default" }: { variant?: NavVariant }) {
  const [scrolled, setScrolled] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [templatesMenuOpen, setTemplatesMenuOpen] = useState(false);
  const [useCaseMenuOpen, setUseCaseMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLLIElement>(null);
  const templatesMenuRef = useRef<HTMLLIElement>(null);
  const useCaseMenuRef = useRef<HTMLLIElement>(null);

  const closeMenus = () => {
    setProductMenuOpen(false);
    setTemplatesMenuOpen(false);
    setUseCaseMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!productMenuOpen && !templatesMenuOpen && !useCaseMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !productMenuRef.current?.contains(target) &&
        !templatesMenuRef.current?.contains(target) &&
        !useCaseMenuRef.current?.contains(target)
      ) {
        closeMenus();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [productMenuOpen, templatesMenuOpen, useCaseMenuOpen]);

  const isLinearDark = variant === "linear";
  const isLinearLight = variant === "linearLight";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[200] h-[48px] border-b backdrop-blur-xl transition-shadow duration-200 ${
        isLinearDark
          ? `border-white/[0.08] bg-black/75 ${
              scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "shadow-none"
            }`
          : `border-cream-3 bg-[rgba(255,255,255,0.94)] ${
              scrolled ? "shadow-nav" : "shadow-none"
            }`
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8 lg:px-12">
        <Link
          href="/"
          className={`flex items-center gap-1.5 font-display text-[16px] font-semibold tracking-[-0.015em] ${
            isLinearDark ? "text-white" : "text-ink"
          }`}
          onClick={closeMenus}
        >
          <Image
            src="/logo-copy.png"
            alt="Saria logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
            priority
          />
          <span>Saria</span>
        </Link>
        <ul
          className={`flex items-center gap-6 text-[11px] font-normal ${
            isLinearDark ? "text-white/55" : "text-ink-3"
          }`}
        >
          <li
            ref={productMenuRef}
            className="relative"
            onMouseEnter={() => {
              setProductMenuOpen(true);
              setTemplatesMenuOpen(false);
              setUseCaseMenuOpen(false);
            }}
            onMouseLeave={() => setProductMenuOpen(false)}
          >
            <Link
              href={PRODUCT_LINKS[0].href}
              aria-expanded={productMenuOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 transition-colors duration-150 ${
                isLinearDark ? "hover:text-white" : "hover:text-ink"
              }`}
              onClick={() => setProductMenuOpen(false)}
              onFocus={() => {
                setProductMenuOpen(true);
                setTemplatesMenuOpen(false);
                setUseCaseMenuOpen(false);
              }}
            >
              Product
              <span className={`text-[9px] ${isLinearDark ? "text-white/35" : "text-stone"}`}>v</span>
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 w-[250px] -translate-x-1/2 pt-3 transition-all duration-150 ${
                productMenuOpen
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
            >
              <div
                className={`rounded-xl border p-2 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-md ${
                  isLinearDark
                    ? "border-white/[0.1] bg-[#111111]/98"
                    : "border-cream-3 bg-[rgba(255,255,255,0.98)] shadow-[0_18px_42px_rgba(28,25,23,0.10)]"
                }`}
              >
                {PRODUCT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-3 py-1.5 text-[11px] transition-all duration-150 ${
                      isLinearDark
                        ? "text-white/65 hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white"
                        : "text-ink-3 hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink"
                    }`}
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`translate-x-[-2px] text-[10px] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                        isLinearDark ? "text-white/50" : "text-accent"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          <li
            ref={templatesMenuRef}
            className="relative"
            onMouseEnter={() => {
              setTemplatesMenuOpen(true);
              setProductMenuOpen(false);
              setUseCaseMenuOpen(false);
            }}
            onMouseLeave={() => setTemplatesMenuOpen(false)}
          >
            <Link
              href={TEMPLATE_LINKS[0].href}
              aria-expanded={templatesMenuOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 transition-colors duration-150 ${
                isLinearDark ? "hover:text-white" : "hover:text-ink"
              }`}
              onClick={() => setTemplatesMenuOpen(false)}
              onFocus={() => {
                setTemplatesMenuOpen(true);
                setProductMenuOpen(false);
                setUseCaseMenuOpen(false);
              }}
            >
              Templates
              <span className={`text-[9px] ${isLinearDark ? "text-white/35" : "text-stone"}`}>v</span>
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-3 transition-all duration-150 ${
                templatesMenuOpen
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
            >
              <div
                className={`rounded-xl border p-2 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-md ${
                  isLinearDark
                    ? "border-white/[0.1] bg-[#111111]/98"
                    : "border-cream-3 bg-[rgba(255,255,255,0.98)] shadow-[0_18px_42px_rgba(28,25,23,0.10)]"
                }`}
              >
                {TEMPLATE_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-3 py-1.5 text-[11px] transition-all duration-150 ${
                      isLinearDark
                        ? "text-white/65 hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white"
                        : "text-ink-3 hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink"
                    }`}
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`translate-x-[-2px] text-[10px] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                        isLinearDark ? "text-white/50" : "text-accent"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          <li
            ref={useCaseMenuRef}
            className="relative"
            onMouseEnter={() => {
              setUseCaseMenuOpen(true);
              setProductMenuOpen(false);
              setTemplatesMenuOpen(false);
            }}
            onMouseLeave={() => setUseCaseMenuOpen(false)}
          >
            <Link
              href={USE_CASE_ITEMS[0].href}
              aria-expanded={useCaseMenuOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 transition-colors duration-150 ${
                isLinearDark ? "hover:text-white" : "hover:text-ink"
              }`}
              onClick={() => setUseCaseMenuOpen(false)}
              onFocus={() => {
                setUseCaseMenuOpen(true);
                setProductMenuOpen(false);
                setTemplatesMenuOpen(false);
              }}
            >
              Use Cases
              <span className={`text-[9px] ${isLinearDark ? "text-white/35" : "text-stone"}`}>v</span>
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 w-[288px] -translate-x-1/2 pt-3 transition-all duration-150 ${
                useCaseMenuOpen
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
            >
              <div
                className={`rounded-xl border p-2 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-md ${
                  isLinearDark
                    ? "border-white/[0.1] bg-[#111111]/98"
                    : "border-cream-3 bg-[rgba(255,255,255,0.98)] shadow-[0_18px_42px_rgba(28,25,23,0.10)]"
                }`}
              >
                {USE_CASE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-3 py-1.5 text-[11px] transition-all duration-150 ${
                      isLinearDark
                        ? "text-white/65 hover:bg-white/[0.06] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white"
                        : "text-ink-3 hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink"
                    }`}
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`translate-x-[-2px] text-[10px] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                        isLinearDark ? "text-white/50" : "text-accent"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {LINKS.map((item) => (
            <li
              key={item.href}
              className={item.hideOnMobile ? "max-[880px]:hidden" : undefined}
            >
              <Link
                href={item.href}
                className={`transition-colors duration-150 ${
                  isLinearDark ? "hover:text-white" : "hover:text-ink"
                }`}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <Link
              href="https://app.sariasoftware.com/login"
              className={`border px-3.5 py-1.5 text-[11px] font-medium transition-colors duration-200 ${
                isLinearDark
                  ? "rounded-lg border-white/[0.14] text-white/85 hover:border-white/25 hover:bg-white/[0.05]"
                  : isLinearLight
                    ? "rounded-lg border-cream-3 text-ink hover:border-stone hover:bg-cream-2"
                    : "rounded-full border-cream-3 text-ink hover:border-stone hover:bg-cream-2"
              }`}
              onClick={closeMenus}
              target="_blank"
              rel="noreferrer"
            >
              Log In
            </Link>
            <Link
              href="https://app.sariasoftware.com/start-free-trial"
              className={`px-3.5 py-1.5 text-[11px] font-medium text-white transition-colors duration-200 ${
                isLinearDark
                  ? "rounded-lg bg-white text-black hover:bg-white/90"
                  : isLinearLight
                    ? "rounded-lg hover:opacity-90"
                    : "rounded-full hover:opacity-90"
              }`}
              onClick={closeMenus}
              target="_blank"
              rel="noreferrer"
              style={isLinearDark ? undefined : { backgroundColor: "#1D4ED8" }}
            >
              Start Free Trial
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
