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
        navy: {
          DEFAULT: "#004080",
          deep: "#003366",
          soft: "#0059A8",
        },
        ink: {
          DEFAULT: "#004080",
          deep: "#003366",
          soft: "#0059A8",
          line: "#3A464E",
          /** Antracita para titulos — no negro puro */
          body: "#2B2B2B",
          /** Cuerpo de lectura */
          prose: "#3D3D3D",
          /** Legales y secundario */
          legal: "#4A4A4A",
          muted: "#5C5C5C",
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
        canvas: "#DCE6F4",
        success: "#6AA84F",
        warning: "#F1C232",
        danger: "#CC0000",
        info: "#5176F3",
        // Liquid Glass · colores jerárquicos (vibrancy sobre vidrio)
        label: {
          primary: "rgba(18, 26, 41, 0.96)",
          secondary: "rgba(28, 38, 56, 0.66)",
          tertiary: "rgba(34, 44, 64, 0.42)",
          quaternary: "rgba(38, 48, 68, 0.26)",
        },
        "label-dark": {
          primary: "rgba(255, 255, 255, 0.98)",
          secondary: "rgba(255, 255, 255, 0.72)",
          tertiary: "rgba(255, 255, 255, 0.45)",
          quaternary: "rgba(255, 255, 255, 0.28)",
        },
        // Liquid Glass · separadores de sistema
        separator: "rgba(20, 40, 70, 0.16)",
        "opaque-separator": "#C8D2E0",
        "glass-edge": "rgba(255, 255, 255, 0.65)",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        /** -1% — titulos compactos */
        display: "-0.01em",
        /** -2% — hero / display */
        hero: "-0.02em",
      },
      lineHeight: {
        prose: "1.5",
        legal: "1.45",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(32, 44, 137, 0.08)",
        card: "0 4px 16px rgba(32, 44, 137, 0.06)",
        pop: "0 16px 40px rgba(32, 44, 137, 0.16)",
        glass: "0 8px 32px rgba(0, 64, 128, 0.12)",
      },
    },
  },
  plugins: [],
};
