// Jerarquía tipográfica neogrotesca premium (referencia Revolut).
// Familia: Inter con fallback SF Pro Display / sistema.
// Títulos: Bold/Black + tracking negativo compacto.
// Subtítulos y botones: Medium, tracking neutro.
// Cuerpo y legales: Regular/Light, gris antracita, line-height amplio.

import { Platform } from "react-native";

/** Stack de familia sans principal */
export const fontStack = Platform.select({
  ios: ["Inter", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
  default: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
}) as string[];

/**
 * Colores de texto · jerarquía Liquid Glass (Hierarchical Colors de Apple).
 * Al ser rgba sobre vidrio, el texto absorbe parte del fondo (vibrancy):
 * sobre fondos claros el contraste sube automáticamente.
 */
export const textColors = {
  /** Títulos y énfasis fuerte — label primary */
  heading: "rgba(18, 26, 41, 0.96)",
  /** Cuerpo principal — label primary */
  body: "rgba(18, 26, 41, 0.96)",
  /** Secundario / descripción — label secondary */
  muted: "rgba(28, 38, 56, 0.66)",
  /** Legales y microcopy de soporte — label secondary */
  legal: "rgba(28, 38, 56, 0.66)",
  /** Placeholder y hints — label tertiary */
  faint: "rgba(34, 44, 64, 0.42)",
} as const;

/** Clases Tailwind por rol — usar en className de Text */
export const textClass = {
  /** Hero / H1 pantalla — 32px, Black, tracking -1.5% */
  hero: "font-sans text-[32px] font-black leading-[1.15] tracking-display text-label-primary",
  /** Display marketing — 36px, Black, tracking -2% */
  display: "font-sans text-4xl font-black leading-[1.12] tracking-hero text-label-primary",
  /** H2 sección — 24px, Bold, tracking -1% */
  h2: "font-sans text-2xl font-bold leading-[1.2] tracking-display text-label-primary",
  /** H3 card — 20px, Bold */
  h3: "font-sans text-xl font-bold leading-[1.25] tracking-display text-label-primary",
  /** Subtítulo / descripción de pantalla — Medium, neutro */
  subtitle: "font-sans text-[15px] font-medium leading-normal tracking-normal text-label-secondary",
  /** Sección interna — 18px Medium */
  section: "font-sans text-lg font-medium leading-snug tracking-normal text-label-primary",
  /** Botón primario/secundario — Medium 15px */
  button: "font-sans text-[15px] font-medium leading-none tracking-normal",
  /** Cuerpo — Regular, line-height 1.5 */
  body: "font-sans text-base font-normal leading-relaxed tracking-normal text-label-primary",
  /** Cuerpo pequeño */
  bodySm: "font-sans text-sm font-normal leading-relaxed tracking-normal text-label-primary",
  /** Legal / terminos — Light/Regular, jerarquía secundaria */
  legal: "font-sans text-sm font-light leading-relaxed tracking-normal text-label-secondary",
  /** Label de campo */
  label: "font-sans text-[13px] font-medium leading-normal tracking-normal text-label-secondary",
  /** Eyebrow / overline */
  eyebrow: "font-sans text-[11px] font-bold uppercase tracking-[1.8px] text-brand-600",
  /** Caption / meta */
  caption: "font-sans text-xs font-normal leading-normal tracking-normal text-label-tertiary",
  /** Números financieros */
  amount: "font-sans text-3xl font-bold leading-tight tracking-display tabular-nums text-label-primary",
  /** Badge compacto */
  badge: "font-sans text-[11px] font-bold leading-none tracking-normal",
} as const;

export type TextRole = keyof typeof textClass;

/** Muestras para storybook / tokens */
export const typographyScale = [
  { name: "Display · Hero", role: "display" as TextRole, sample: "Panel operativo" },
  { name: "H1 · Pantalla", role: "hero" as TextRole, sample: "Resumen del día" },
  { name: "H2 · Sección", role: "h2" as TextRole, sample: "Solicitudes recientes" },
  { name: "H3 · Tarjeta", role: "h3" as TextRole, sample: "Equipo asignado" },
  { name: "Subtítulo", role: "subtitle" as TextRole, sample: "Descripción breve de contexto" },
  { name: "Sección", role: "section" as TextRole, sample: "Pendientes de hoy" },
  { name: "Botón", role: "button" as TextRole, sample: "Continuar" },
  { name: "Cuerpo", role: "body" as TextRole, sample: "Texto claro para lectura móvil prolongada." },
  { name: "Cuerpo pequeño", role: "bodySm" as TextRole, sample: "Detalle secundario en listas." },
  { name: "Legal", role: "legal" as TextRole, sample: "Acepto los terminos y condiciones del servicio." },
  { name: "Label", role: "label" as TextRole, sample: "Estado del registro" },
  { name: "Caption", role: "caption" as TextRole, sample: "Actualizado hace 5 min" },
  { name: "Número", role: "amount" as TextRole, sample: "$2,500.00" },
] as const;
