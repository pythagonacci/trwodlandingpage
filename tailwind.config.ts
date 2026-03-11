import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "cream-2": "var(--cream-2)",
        "cream-3": "var(--cream-3)",
        sand: "var(--sand)",
        stone: "var(--stone)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        accent: "var(--accent)",
        "accent-bg": "var(--accent-bg)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        nav: "0 1px 12px rgba(28,25,23,0.06)",
        hero: "0 32px 80px rgba(28,25,23,0.12), 0 8px 24px rgba(28,25,23,0.06)"
      },
      borderRadius: {
        card: "12px"
      },
      transitionTimingFunction: {
        subtle: "ease"
      }
    }
  },
  plugins: []
};

export default config;

