import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bolt: {
          50: "#e3f2ff",
          100: "#badcff",
          200: "#8fc4ff",
          300: "#66abff",
          400: "#3b90ff",
          500: "#1a75e8",
          600: "#0f5ec1",
          700: "#09479a",
          800: "#053270",
          900: "#031f49",
        },
        midnight: "#0b1624",
        ash: "#f4f7fb",
        slate: "#1f2a37",
      },
      boxShadow: {
        glass: "0 20px 60px -30px rgba(10, 34, 57, 0.65)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
};

export default config;
