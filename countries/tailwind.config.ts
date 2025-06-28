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
        "background-dark" : "hsl(207, 26%, 17%)",
        "background-light" : "hsl(0, 0%, 98%)",
        "inputdark" : "hsl(209, 23%, 22%)",
        "inputlight": "hsl(0, 0%, 100%)"
      },
    },
  },
  plugins: [],
};
export default config;
