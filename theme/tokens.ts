export const colors = {
  brand: "#3148c8",
  brandDark: "#25338f",
  brandSoft: "#eef2ff",
  canvas: "#f7f9fc",
  surface: "#ffffff",
  border: "#dbe3ef",
  text: "#0f172a",
  muted: "#64748b",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#0284c7",
  neutral: "#475569",
} as const;

export const semantic = {
  success: { label: "Éxito", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  warning: { label: "Advertencia", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  danger: { label: "Peligro", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  info: { label: "Información", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  neutral: { label: "Neutral", bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
} as const;

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48] as const;
export const radius = [8, 12, 16, 20, 28] as const;

export const typography = [
  { name: "Display", className: "text-4xl font-bold tracking-tight text-slate-950", sample: "Panel operativo" },
  { name: "Título 1", className: "text-3xl font-bold text-slate-950", sample: "Resumen del día" },
  { name: "Título 2", className: "text-2xl font-semibold text-slate-900", sample: "Solicitudes recientes" },
  { name: "Título 3", className: "text-xl font-semibold text-slate-900", sample: "Equipo asignado" },
  { name: "Body", className: "text-base text-slate-700", sample: "Texto claro para lectura móvil." },
  { name: "Label", className: "text-sm font-semibold text-slate-700", sample: "Estado del registro" },
  { name: "Caption", className: "text-xs text-slate-500", sample: "Actualizado hace 5 min" },
  { name: "Número", className: "text-3xl font-bold tabular-nums text-slate-950", sample: "98.4%" },
] as const;
