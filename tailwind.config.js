/** @type {import('tailwindcss').Config} */
// Tokens alineados a Paco Brand Guidelines:
// Azul Paco #2F42CB · Azul medio #5176F3 · Naranja (acento estrategico) #FB4F33
// Azules claros: bruma #F6F8FF, celeste #ECF1FF, nube #E4EAFF
// Oscuros: carbon #1E1E1E, gris pizarra #263238 · Enfasis UI: verde #6AA84F,
// amarillo #F1C232, rojo #CC0000, violeta #674EA7, mora #A64D79
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F6F8FF",
          100: "#ECF1FF",
          200: "#E4EAFF",
          300: "#B9C8FB",
          400: "#5176F3",
          500: "#2F42CB",
          600: "#2838AC",
          700: "#202C89",
        },
        ink: {
          DEFAULT: "#1E1E1E",
          deep: "#000000",
          soft: "#263238",
          line: "#3A464E",
        },
        accent: {
          50: "#FFEDE9",
          400: "#FB4F33",
          500: "#E8432A",
        },
        emphasis: {
          green: "#6AA84F",
          yellow: "#F1C232",
          red: "#CC0000",
          violet: "#674EA7",
          mora: "#A64D79",
        },
        canvas: "#F6F8FF",
        success: "#6AA84F",
        warning: "#F1C232",
        danger: "#CC0000",
        info: "#5176F3",
      },
      fontFamily: {
        sans: ["Lato", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Gordita", "Lato", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(32, 44, 137, 0.08)",
        card: "0 4px 16px rgba(32, 44, 137, 0.06)",
        pop: "0 16px 40px rgba(32, 44, 137, 0.16)",
      },
    },
  },
  plugins: [],
};
