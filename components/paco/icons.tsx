// Registro central de iconografia Paco. Nada de emojis: todo el sistema usa
// lucide con burbujas tintadas por dominio. Los mocks conservan campos `emoji`
// heredados pero la UI resuelve siempre contra estos mapas.

import { ComponentType } from "react";
import { Image, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import {
  Angry,
  Award,
  Ban,
  Banknote,
  Brain,
  Briefcase,
  Building2,
  Cake,
  Camera,
  CalendarCheck,
  CalendarRange,
  Car,
  Clapperboard,
  ClipboardList,
  Contact,
  CreditCard,
  Droplets,
  Dumbbell,
  FileImage,
  FileMusic,
  FileSignature,
  FileSpreadsheet,
  FileText,
  FileVideo,
  FolderOpen,
  Frown,
  GitMerge,
  GraduationCap,
  Handshake,
  HardHat,
  Heart,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Laugh,
  Lightbulb,
  LifeBuoy,
  Mail,
  Medal,
  Megaphone,
  Meh,
  MessagesSquare,
  Newspaper,
  PartyPopper,
  Phone,
  PieChart,
  Presentation,
  ReceiptText,
  RefreshCw,
  Rocket,
  Scale,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Signal,
  Smartphone,
  Smile,
  Sparkles,
  Star,
  Tags,
  Target,
  Tv,
  UtensilsCrossed,
  Wallet,
  Wifi,
} from "@/components/paco/glyphs";

export type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const join = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

// Burbuja de icono estandar del sistema · Liquid Glass: la burbuja es vidrio
// thin neutro (borde separador + blanco translúcido); el color del dominio
// vive en el glifo, nunca en el fondo. El prop `tint` se conserva por
// compatibilidad pero ya no pinta rellenos semánticos.
const bubbleGlassClass = "items-center justify-center rounded-[12px] border border-separator bg-white/55";

// ---- Manchita (estilo Bento) ----
// Formas orgánicas para el fondo de iconos libres: radios desiguales por
// esquina + desplazamiento determinista por seed. Calibradas para icono 48px;
// los offsets se escalan al tamaño real.
export const iconBlobShapes = [
  { tl: 0.62, tr: 0.48, br: 0.56, bl: 0.5, dx: -7, dy: -5, scale: 1.22, alt: { dx: 0.72, dy: 0.66, size: 0.34 } },
  { tl: 0.5, tr: 0.6, br: 0.46, bl: 0.58, dx: 5, dy: -7, scale: 1.16, alt: { dx: -0.18, dy: 0.7, size: 0.3 } },
  { tl: 0.56, tr: 0.5, br: 0.62, bl: 0.44, dx: -4, dy: 6, scale: 1.2, alt: { dx: 0.74, dy: -0.12, size: 0.32 } },
  { tl: 0.46, tr: 0.58, br: 0.5, bl: 0.6, dx: 7, dy: 4, scale: 1.14, alt: { dx: -0.16, dy: -0.1, size: 0.28 } },
] as const;

export function IconBubble({
  icon: IconComponent,
  color,
  tint: _tint,
  size = 44,
  iconSize = 20,
  className = "",
}: {
  icon: Icon;
  color: string;
  tint?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <View style={{ width: size, height: size }} className={join(bubbleGlassClass, className)}>
      <IconComponent size={iconSize} color={color} strokeWidth={2.1} />
    </View>
  );
}

// Icono de asset libre sobre manchita (estilo Bento): sin caja, sin borde.
// El prop `tint` se mantiene por compatibilidad pero ya no se usa.
export function AssetIconBubble({
  source,
  tint: _tint,
  size = 44,
  imageSize = 24,
  seed = 0,
  blobColor = "rgba(47, 66, 203, 0.12)",
  blobAltColor = "rgba(81, 118, 243, 0.10)",
  className = "",
}: {
  source: ImageSourcePropType;
  tint?: string;
  size?: number;
  imageSize?: number;
  seed?: number;
  blobColor?: string;
  blobAltColor?: string;
  className?: string;
}) {
  const shape = iconBlobShapes[seed % iconBlobShapes.length] ?? iconBlobShapes[0];
  const blob = Math.min(size, imageSize * shape.scale + 8);
  const altSize = blob * shape.alt.size;
  const k = imageSize / 48;
  const pad = (size - blob) / 2;

  return (
    <View style={{ width: size, height: size }} className={join("items-center justify-center", className)}>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: blob,
          height: blob,
          left: pad + shape.dx * k,
          top: pad + shape.dy * k,
          backgroundColor: blobColor,
          borderTopLeftRadius: blob * shape.tl,
          borderTopRightRadius: blob * shape.tr,
          borderBottomRightRadius: blob * shape.br,
          borderBottomLeftRadius: blob * shape.bl,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: altSize,
          height: altSize,
          left: pad + blob * shape.alt.dx,
          top: pad + blob * shape.alt.dy,
          borderRadius: altSize / 2,
          backgroundColor: blobAltColor,
        }}
      />
      <Image source={source} resizeMode="contain" style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}

// ---- Dominios ----
// `tint` neutro glass: el acento del dominio va solo en `color` (glifo).

export const domainStyles: Record<string, { tint: string; color: string }> = {
  Finanzas: { tint: "bg-white/55", color: "#2F42CB" },
  "Personas y cultura": { tint: "bg-white/55", color: "#674EA7" },
  Documentos: { tint: "bg-white/55", color: "#B8860B" },
  Soporte: { tint: "bg-white/55", color: "#5176F3" },
};

export const moduleIcons: Record<string, Icon> = {
  advance: Wallet,
  topups: Smartphone,
  services: ReceiptText,
  expenses: PieChart,
  pin: Tags,
  mood: Smile,
  celebrations: Cake,
  surveys: ClipboardList,
  voice: Megaphone,
  recognitions: Medal,
  requests: CalendarCheck,
  "onboarding-tasks": Rocket,
  training: GraduationCap,
  wellness: HeartPulse,
  comms: Newspaper,
  "document-requests": FileSignature,
  "corporate-docs": FolderOpen,
  receipts: FileText,
  sua: Mail,
  profile: Contact,
  chat: MessagesSquare,
  support: LifeBuoy,
  settings: Settings,
  legal: ShieldCheck,
};

// ---- Banners ----

export const bannerIcons: Record<string, Icon> = {
  b1: HeartHandshake,
  b2: Banknote,
  b3: UtensilsCrossed,
};

// ---- Estado de animo ----

export const moodIcons: Record<number, Icon> = {
  0: Angry,
  25: Frown,
  50: Meh,
  75: Smile,
  100: Laugh,
};

export const moodIconFor = (score: number): Icon => {
  const keys = [0, 25, 50, 75, 100];
  const nearest = keys.reduce((best, key) => (Math.abs(key - score) < Math.abs(best - score) ? key : best), 0);
  return moodIcons[nearest] ?? Meh;
};

// ---- Operadores de recarga ----

export const operatorIcons: Record<string, Icon> = {
  telcel: Signal,
  att: Wifi,
  movistar: Signal,
  weex: Smartphone,
  bait: Wifi,
  virgin: Smartphone,
  mirecarga: Phone,
  unefon: Signal,
  flash: Wifi,
  pillofon: Phone,
  freedompop: Wifi,
  oui: Phone,
  diri: Smartphone,
};

// ---- Categorias de pago de servicios ----

export const serviceCategoryIcons: Record<string, Icon> = {
  tv: Tv,
  "agua-luz-gas": Droplets,
  telepeaje: Car,
  entretenimiento: Clapperboard,
  gobierno: Landmark,
  catalogo: ShoppingBag,
};

// ---- Voz del colaborador ----

export const voiceCategoryIcons: Record<string, Icon> = {
  abuso: Scale,
  "acoso-laboral": ShieldAlert,
  "acoso-sexual": Ban,
  agradecimiento: Heart,
  clima: Sparkles,
  conflicto: GitMerge,
  discriminacion: Ban,
  higiene: HardHat,
  innovacion: Lightbulb,
};

// ---- Bienestar ----

export const wellnessIcons: Record<string, Icon> = {
  mental: Brain,
  fisico: Dumbbell,
  financiero: Wallet,
  emocional: Heart,
};

// ---- Medallas de reconocimiento ----

export const badgeIcons: Record<string, Icon> = {
  servicio: Handshake,
  cambio: RefreshCw,
  compromiso: Target,
  confianza: Shield,
  excelencia: Star,
  integridad: ShieldCheck,
  iniciativa: Rocket,
};

// ---- Cursos ----

export const courseIcons: Record<string, Icon> = {
  seguridad: HardHat,
  "onboarding-toño": UtensilsCrossed,
  dc3: ClipboardList,
};

// ---- KYC ----

export const kycIcons: Record<string, Icon> = {
  "ine-front": CreditCard,
  "ine-back": RefreshCw,
  selfie: Camera,
};

// ---- Cupones PiN por categoria ----

export const couponIcons: Record<string, Icon> = {
  Comida: UtensilsCrossed,
  Salud: HeartPulse,
  Entretenimiento: Clapperboard,
  Deporte: Dumbbell,
  Educación: GraduationCap,
};

// ---- Archivos ----

export const fileIcons: Record<string, Icon> = {
  PDF: FileText,
  DOCX: FileText,
  Word: FileText,
  XLSX: FileSpreadsheet,
  PPTX: Presentation,
  Imagen: FileImage,
  Video: FileVideo,
  Audio: FileMusic,
  XML: FileSpreadsheet,
  Examen: ClipboardList,
};

export const fileIconFor = (kind: string): Icon => fileIcons[kind] ?? FileText;

// ---- Otros ----

export const miscIcons = {
  party: PartyPopper,
  award: Award,
  briefcase: Briefcase,
  building: Building2,
  bank: Landmark,
  card: CreditCard,
  calendar: CalendarRange,
  brand: HardHat,
};
