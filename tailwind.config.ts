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
          50: "#E6F5FF",
          100: "#B8E5FF",
          200: "#8AD5FF",
          300: "#5CC5FF",
          400: "#3DB5FF",
          500: "#6EC6FF",
          600: "#4FA8E6",
          700: "#3A7FB3",
          800: "#2A5C80",
          900: "#1A394D",
        },
        cyan: {
          50: "#F0F9FF",
          100: "#D4EDFF",
          200: "#A8E1FF",
          300: "#7CD5FF",
          400: "#50C9FF",
          500: "#A8E1FF",
          600: "#7DB3CC",
          700: "#5C8599",
          800: "#3D5766",
          900: "#1E2B33",
        },
        pink: {
          50: "#FFF0F5",
          100: "#FFE0EB",
          200: "#FFC5D9",
          300: "#FFB6D5",
          400: "#FFA7D1",
          500: "#FF9ECF",
          600: "#CC7FA5",
          700: "#995F7C",
          800: "#664052",
          900: "#332029",
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

