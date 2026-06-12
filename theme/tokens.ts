// Tokens de marca Paco (Brand Guidelines 2026).
// Azul Paco como primario, azul medio para informativos, naranja como acento
// estrategico y paleta de enfasis para casos de UI.

export const colors = {
  brand: "#2F42CB",
  brandMid: "#5176F3",
  brandDark: "#202C89",
  brandSoft: "#ECF1FF",
  accent: "#FB4F33",
  canvas: "#DCE6F4",
  surface: "#ffffff",
  border: "#E4EAFF",
  text: "#1E1E1E",
  slate: "#263238",
  muted: "#64748b",
  navy: "#004080",
  navyDeep: "#003366",
  navySoft: "#0059A8",
  success: "#6AA84F",
  warning: "#B8860B",
  warningBright: "#F1C232",
  danger: "#CC0000",
  info: "#5176F3",
  violet: "#674EA7",
  mora: "#A64D79",
  neutral: "#475569",
} as const;

/** Superficies glass · Visual 5.0 Navy Glass */
export const glass = {
  navyGlass: "rgba(0, 64, 128, 0.72)",
  navyGlassBorder: "rgba(255, 255, 255, 0.28)",
  surfaceLight: "rgba(255, 255, 255, 0.78)",
  surfaceBorder: "rgba(0, 64, 128, 0.14)",
  surfaceBorderStrong: "rgba(0, 64, 128, 0.22)",
  overlayScrim: "rgba(0, 64, 128, 0.35)",
  shadow: "0 8px 32px rgba(0, 64, 128, 0.14)",
  dockBg: "rgba(255, 255, 255, 0.58)",
} as const;

// ---------------------------------------------------------------------------
// Visual 6.0 · Liquid Glass — materiales, jerarquía, separadores y vibrancy
// ---------------------------------------------------------------------------

export type MaterialName = "ultraThin" | "thin" | "regular" | "thick" | "ultraThick";

export type MaterialSpec = {
  /** Alpha del fondo blanco en web (backdrop-filter) */
  webAlpha: number;
  /** Alpha del overlay blanco sobre BlurView en nativo */
  overlayAlpha: number;
  /** Radio de blur en px (web backdrop-filter) */
  blur: number;
  /** Intensity de expo-blur BlurView (nativo) */
  intensity: number;
  /** Color sólido cuando Reduce Transparency está activo */
  fallback: string;
};

/**
 * Escala de 5 materiales estilo Apple. A mayor grosor, más opacidad y blur:
 * - ultraThin/thin: solo elementos flotantes sobre fondos controlados (chips, search).
 * - regular: estándar para cards de contenido.
 * - thick: banners de estado, dock y superficies sobre fondo impredecible.
 * - ultraThick: sheets, modales y texto denso sobre fondos muy claros.
 */
export const materials: Record<MaterialName, MaterialSpec> = {
  ultraThin: { webAlpha: 0.35, overlayAlpha: 0.3, blur: 14, intensity: 28, fallback: "#FBFCFE" },
  thin: { webAlpha: 0.5, overlayAlpha: 0.44, blur: 18, intensity: 38, fallback: "#FAFBFD" },
  regular: { webAlpha: 0.65, overlayAlpha: 0.58, blur: 24, intensity: 50, fallback: "#F8FAFC" },
  thick: { webAlpha: 0.78, overlayAlpha: 0.72, blur: 28, intensity: 62, fallback: "#F7F9FB" },
  ultraThick: { webAlpha: 0.9, overlayAlpha: 0.86, blur: 32, intensity: 75, fallback: "#FFFFFF" },
} as const;

export type DarkMaterialName = "regular" | "thick";

/** Materiales oscuros navy para heroes, chips activos y burbujas propias */
export const materialsDark: Record<DarkMaterialName, MaterialSpec> = {
  regular: { webAlpha: 0.72, overlayAlpha: 0.78, blur: 32, intensity: 55, fallback: "#004080" },
  thick: { webAlpha: 0.86, overlayAlpha: 0.9, blur: 36, intensity: 70, fallback: "#003366" },
} as const;

/**
 * Colores jerárquicos de texto (Hierarchical Colors). Al ser rgba sobre el
 * vidrio, el texto absorbe parte del fondo → vibrancy simulada coherente.
 */
export const labels = {
  /** Títulos y énfasis máximo */
  primary: "rgba(18, 26, 41, 0.96)",
  /** Subtítulos y descripciones */
  secondary: "rgba(28, 38, 56, 0.66)",
  /** Placeholders y metadatos */
  tertiary: "rgba(34, 44, 64, 0.42)",
  /** Decorativo y disabled */
  quaternary: "rgba(38, 48, 68, 0.26)",
} as const;

/** Jerarquía equivalente sobre materiales oscuros (hero navy, chips activos) */
export const labelsOnDark = {
  primary: "rgba(255, 255, 255, 0.98)",
  secondary: "rgba(255, 255, 255, 0.72)",
  tertiary: "rgba(255, 255, 255, 0.45)",
  quaternary: "rgba(255, 255, 255, 0.28)",
} as const;

/** Separadores de sistema — capa de separación Apple */
export const separators = {
  /** Hairline interno: listas, divisores */
  separator: "rgba(20, 40, 70, 0.16)",
  /** Delimitación de contenedores en Reduce Transparency */
  opaqueSeparator: "#C8D2E0",
  /** Filo superior del vidrio (highlight) */
  glassEdge: "rgba(255, 255, 255, 0.65)",
} as const;

export type VibrantTone = "success" | "warning" | "danger" | "info" | "neutral";

/**
 * Acentos vibrantes. El color semántico nunca es relleno; es acento.
 * `wash` es el único “fondo” permitido (≤8% alpha) y siempre sobre un material.
 */
export const vibrants: Record<VibrantTone, { accent: string; wash: string; border: string }> = {
  success: { accent: "#2E8B57", wash: "rgba(46, 139, 87, 0.07)", border: "rgba(46, 139, 87, 0.22)" },
  warning: { accent: "#B8860B", wash: "rgba(184, 134, 11, 0.07)", border: "rgba(184, 134, 11, 0.24)" },
  danger: { accent: "#CC0000", wash: "rgba(204, 0, 0, 0.06)", border: "rgba(204, 0, 0, 0.20)" },
  info: { accent: "#2F42CB", wash: "rgba(47, 66, 203, 0.06)", border: "rgba(47, 66, 203, 0.20)" },
  neutral: { accent: "#64748B", wash: "rgba(100, 116, 139, 0.05)", border: "rgba(100, 116, 139, 0.18)" },
} as const;

/** Altura fija de tiles de módulo (Home, Bienestar, etc.) */
export const moduleTileHeight = 136;

/**
 * @deprecated Legacy del showroom `(prototype)`. En `(paco)` usar `vibrants`:
 * el color semántico es acento (dot/icono/borde), nunca relleno de fondo.
 */
export const semantic = {
  success: { label: "Éxito", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  warning: { label: "Advertencia", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  danger: { label: "Peligro", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  info: { label: "Información", bg: "bg-brand-100", text: "text-brand-600", border: "border-brand-200" },
  neutral: { label: "Neutral", bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
} as const;

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48] as const;
export const radius = [8, 10, 12, 14, 16, 20] as const;

import { textClass, typographyScale } from "./typography";

/** Escala tipográfica para storybook — derivada de theme/typography.ts */
export const typography = typographyScale.map((item) => ({
  name: item.name,
  className: textClass[item.role],
  sample: item.sample,
}));
