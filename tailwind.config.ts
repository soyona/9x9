import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        accent: "#0071e3",
      },
      boxShadow: {
        float: "0 24px 70px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
