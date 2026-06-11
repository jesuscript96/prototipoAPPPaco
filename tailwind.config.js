/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#dfe6ff",
          200: "#c3cfff",
          300: "#97abff",
          400: "#6d87f8",
          500: "#3148c8",
          600: "#293bae",
          700: "#25338f",
        },
        ink: {
          DEFAULT: "#15143a",
          deep: "#0e0d2c",
          soft: "#23215c",
          line: "#2e2b73",
        },
        mint: {
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        sun: {
          300: "#fcd34d",
          400: "#fbbf24",
        },
        canvas: "#f2f4fb",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
        info: "#0284c7",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(19, 18, 58, 0.07)",
        card: "0 4px 16px rgba(19, 18, 58, 0.05)",
        pop: "0 16px 40px rgba(19, 18, 58, 0.18)",
      },
    },
  },
  plugins: [],
};
