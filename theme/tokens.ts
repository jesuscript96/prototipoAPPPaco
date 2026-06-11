// Tokens de marca Paco (Brand Guidelines 2026).
// Azul Paco como primario, azul medio para informativos, naranja como acento
// estrategico y paleta de enfasis para casos de UI.

export const colors = {
  brand: "#2F42CB",
  brandMid: "#5176F3",
  brandDark: "#202C89",
  brandSoft: "#ECF1FF",
  accent: "#FB4F33",
  canvas: "#F6F8FF",
  surface: "#ffffff",
  border: "#E4EAFF",
  text: "#1E1E1E",
  slate: "#263238",
  muted: "#64748b",
  success: "#6AA84F",
  warning: "#B8860B",
  warningBright: "#F1C232",
  danger: "#CC0000",
  info: "#5176F3",
  violet: "#674EA7",
  mora: "#A64D79",
  neutral: "#475569",
} as const;

export const semantic = {
  success: { label: "Éxito", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  warning: { label: "Advertencia", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  danger: { label: "Peligro", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  info: { label: "Información", bg: "bg-brand-100", text: "text-brand-600", border: "border-brand-200" },
  neutral: { label: "Neutral", bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
} as const;

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48] as const;
export const radius = [8, 10, 12, 14, 16, 20] as const;

export const typography = [
  { name: "Display · Gordita Bold", className: "font-display text-4xl font-bold tracking-tight text-slate-950", sample: "Panel operativo" },
  { name: "Título 1", className: "font-display text-3xl font-bold text-slate-950", sample: "Resumen del día" },
  { name: "Título 2", className: "font-display text-2xl font-bold text-slate-900", sample: "Solicitudes recientes" },
  { name: "Título 3", className: "text-xl font-bold text-slate-900", sample: "Equipo asignado" },
  { name: "Body · Lato", className: "text-base text-slate-700", sample: "Texto claro para lectura móvil." },
  { name: "Label", className: "text-sm font-semibold text-slate-700", sample: "Estado del registro" },
  { name: "Caption", className: "text-xs text-slate-500", sample: "Actualizado hace 5 min" },
  { name: "Número", className: "text-3xl font-bold tabular-nums text-slate-950", sample: "$2,500.00" },
] as const;
