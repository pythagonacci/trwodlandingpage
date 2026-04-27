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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const productMenuRef = useRef<HTMLLIElement>(null);
  const templatesMenuRef = useRef<HTMLLIElement>(null);
  const useCaseMenuRef = useRef<HTMLLIElement>(null);

  const closeMenus = () => {
    setProductMenuOpen(false);
    setTemplatesMenuOpen(false);
    setUseCaseMenuOpen(false);
    setMobileMenuOpen(false);
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
    if (!productMenuOpen && !templatesMenuOpen && !useCaseMenuOpen && !mobileMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!navRef.current?.contains(target)) {
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
  }, [mobileMenuOpen, productMenuOpen, templatesMenuOpen, useCaseMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 881px)");
    const onChange = () => {
      if (mediaQuery.matches) {
        setMobileMenuOpen(false);
      }
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const isLinearDark = variant === "linear";
  const isLinearLight = variant === "linearLight";

  return (
    <nav
      ref={navRef}
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
      <div className="mx-auto grid h-full w-full max-w-[1360px] grid-cols-[auto_1fr_auto] items-center gap-4 px-7 md:px-14 lg:px-20 xl:px-24">
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
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
            priority
          />
          <span>Saria</span>
        </Link>
        <ul
          className={`hidden items-center justify-self-center gap-7 text-[11px] font-normal min-[881px]:flex xl:gap-8 ${
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
        </ul>
        <div className="hidden items-center justify-self-end gap-2 min-[881px]:flex">
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
        </div>
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className={`inline-flex items-center justify-self-end gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 min-[881px]:hidden ${
            isLinearDark
              ? "border-white/[0.14] text-white/85 hover:border-white/25 hover:bg-white/[0.05]"
              : "border-cream-3 text-ink hover:border-stone hover:bg-cream-2"
          }`}
          onClick={() => {
            setProductMenuOpen(false);
            setTemplatesMenuOpen(false);
            setUseCaseMenuOpen(false);
            setMobileMenuOpen((current) => !current);
          }}
        >
          Menu
          <span className="text-[13px] leading-none">{mobileMenuOpen ? "x" : "+"}</span>
        </button>
      </div>
      <div
        className={`absolute inset-x-0 top-full max-h-[calc(100vh-48px)] overflow-y-auto border-b backdrop-blur-xl transition-all duration-200 min-[881px]:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        } ${
          isLinearDark
            ? "border-white/[0.08] bg-black/95 text-white"
            : "border-cream-3 bg-[rgba(255,255,255,0.98)] text-ink"
        }`}
      >
        <div className="px-4 py-4">
          <div className="grid gap-3">
            <MobileMenuGroup
              title="Product"
              links={PRODUCT_LINKS}
              isLinearDark={isLinearDark}
              onNavigate={closeMenus}
            />
            <MobileMenuGroup
              title="Templates"
              links={TEMPLATE_LINKS}
              isLinearDark={isLinearDark}
              onNavigate={closeMenus}
            />
            <MobileMenuGroup
              title="Use Cases"
              links={USE_CASE_ITEMS}
              isLinearDark={isLinearDark}
              onNavigate={closeMenus}
            />
            <div className={`border-t pt-3 ${isLinearDark ? "border-white/[0.08]" : "border-cream-3"}`}>
              <Link
                href="/pricing"
                className={`block rounded-lg px-3 py-2 text-[13px] font-medium ${
                  isLinearDark
                    ? "text-white/76 hover:bg-white/[0.06] hover:text-white"
                    : "text-ink-2 hover:bg-cream hover:text-ink"
                }`}
                onClick={closeMenus}
              >
                Pricing
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="https://app.sariasoftware.com/login"
                className={`inline-flex min-h-10 items-center justify-center rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors duration-200 ${
                  isLinearDark
                    ? "border-white/[0.14] text-white/85 hover:border-white/25 hover:bg-white/[0.05]"
                    : "border-cream-3 text-ink hover:border-stone hover:bg-cream-2"
                }`}
                onClick={closeMenus}
                target="_blank"
                rel="noreferrer"
              >
                Log In
              </Link>
              <Link
                href="https://app.sariasoftware.com/start-free-trial"
                className={`inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 text-center text-[12px] font-medium transition-colors duration-200 ${
                  isLinearDark
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-[#1D4ED8] text-white hover:opacity-90"
                }`}
                onClick={closeMenus}
                target="_blank"
                rel="noreferrer"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

type MobileMenuGroupProps = {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
  isLinearDark: boolean;
  onNavigate: () => void;
};

function MobileMenuGroup({ title, links, isLinearDark, onNavigate }: MobileMenuGroupProps) {
  return (
    <div className={`border-t pt-3 ${isLinearDark ? "border-white/[0.08]" : "border-cream-3"}`}>
      <div className={`px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] ${
        isLinearDark ? "text-white/40" : "text-stone"
      }`}>
        {title}
      </div>
      <div className="grid gap-1">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 text-[13px] font-medium ${
              isLinearDark
                ? "text-white/76 hover:bg-white/[0.06] hover:text-white"
                : "text-ink-2 hover:bg-cream hover:text-ink"
            }`}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
