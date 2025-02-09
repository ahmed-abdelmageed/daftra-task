import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ✅ Ensure this path is correct
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
