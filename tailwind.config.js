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
          500: "#3148c8",
          600: "#293bae",
          700: "#25338f",
        },
        canvas: "#f7f9fc",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
        info: "#0284c7",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
