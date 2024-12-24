import type { Config } from "tailwindcss"

export default {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.463rem",
      "3xl": "1.953rem",
      "4xl": "2.241rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        background: "var(--background)",
        "lighter-background": "var(--lighter-background)",
        foreground: "var(--foreground)",
        anchor: "var(--anchor)",
        "anchor-visited": "var(--anchor-visited)",
        "anchor-alt": "var(--anchor-alt)",
        "anchor-visited-alt": "var(--anchor-visited-alt)",
        "input-background": "var(--input-background)",
        "input-border": "var(--input-border)",
        "button-background": "var(--button-background)",
        "button-hover": "var(--button-hover)",
        disabled: "var(--disabled)",
        "disabled-foreground": "var(--disabled-foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config
