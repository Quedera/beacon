import type { Config } from "tailwindcss";
import quederaPreset from "../branding/quedera-tailwind-preset.cjs";

// Safelist every palette token (bg + text) so dynamically-composed class
// names like `bg-${product.token}` survive Tailwind's JIT purge.
// See components/ProductMark.tsx for the dynamic-composition case.
const QUEDERA_SAFELIST = [
  "bg-quedera-navy",
  "bg-quedera-deep-blue",
  "bg-quedera-cyan",
  "bg-quedera-violet",
  "bg-quedera-amber",
  "bg-quedera-emerald",
  "bg-quedera-surface",
  "text-quedera-navy",
  "text-quedera-deep-blue",
  "text-quedera-cyan",
  "text-quedera-violet",
  "text-quedera-amber",
  "text-quedera-emerald",
  "text-quedera-surface",
];

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: QUEDERA_SAFELIST,
  theme: {
    extend: {
      ...quederaPreset.theme.extend,
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;