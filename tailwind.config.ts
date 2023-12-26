import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        portrait: "url('/portrait.jpg')",
      },
      boxShadow: {
        landingPageInner: "0px -25px 100px black inset",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
