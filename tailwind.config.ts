import type { Config } from "tailwindcss";

// Design tokens from the Figma file ("Doug Portfolio", 1728px desktop frames).
// Change colors, fonts and spacing here.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060907", // page background
        accent: "#FFC600", // script titles, name, arrow
      },
      fontFamily: {
        // CSS variables are set by next/font in app/layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-bebas)", "Impact", "sans-serif"],
        script: ["var(--font-homemade-apple)", "cursive"],
      },
      fontSize: {
        hero: ["128px", { lineHeight: "1.45" }],
        "hero-sm": ["64px", { lineHeight: "1.45" }],
        kicker: ["48px", { lineHeight: "1" }],
        name: ["36px", { lineHeight: "56px" }],
        nav: ["20px", { lineHeight: "1" }],
        card: ["24px", { lineHeight: "2.15" }],
      },
      spacing: {
        gutter: "45px", // desktop page margin
        "gutter-sm": "16px", // mobile page margin
        "grid-x": "17px", // gap between grid columns
        "grid-y": "48px", // gap between grid rows
        "card-gap": "23px", // gap between image, title and line
      },
      aspectRatio: {
        card: "811 / 525",
      },
      opacity: {
        overlay: "0.41",
      },
    },
  },
  plugins: [],
};

export default config;
