import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#E8C152",
        "brand-black": "#000000",
        "brand-deep-grey": "#222323",
      },
      fontFamily: {
        "display": ["'Book Antiqua'", "Palatino", "serif"],
        "sans": ["var(--font-sans)", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
