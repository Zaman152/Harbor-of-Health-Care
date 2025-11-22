import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#E6F7F7",
          100: "#B8E8E8",
          200: "#8AD9D9",
          300: "#5CCACA",
          400: "#2EBBBB",
          500: "#00ACAC",
          600: "#008A8A",
          700: "#006868",
          800: "#004646",
          900: "#002424",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          700: "#374151",
          900: "#111827",
        },
        cream: "#FFF9F5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

