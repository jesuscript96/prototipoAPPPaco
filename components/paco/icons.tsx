// Registro central de iconografia Paco. Nada de emojis: todo el sistema usa
// lucide con burbujas tintadas por dominio. Los mocks conservan campos `emoji`
// heredados pero la UI resuelve siempre contra estos mapas.

import { ComponentType } from "react";
import { View } from "react-native";
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
} from "lucide-react-native";

export type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const join = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

// Burbuja de icono estandar del sistema (radio contenido, tinte suave).
export function IconBubble({
  icon: IconComponent,
  color,
  tint,
  size = 44,
  iconSize = 20,
  className = "",
}: {
  icon: Icon;
  color: string;
  tint: string;
  size?: number;
  iconSize?: number;
  className?: string;
}) {
  return (
    <View style={{ width: size, height: size }} className={join("items-center justify-center rounded-[12px]", tint, className)}>
      <IconComponent size={iconSize} color={color} strokeWidth={2.1} />
    </View>
  );
}

// ---- Dominios ----

export const domainStyles: Record<string, { tint: string; color: string }> = {
  Finanzas: { tint: "bg-brand-50", color: "#3148c8" },
  "Personas y cultura": { tint: "bg-violet-50", color: "#7c3aed" },
  Documentos: { tint: "bg-amber-50", color: "#b45309" },
  Soporte: { tint: "bg-teal-50", color: "#0d9488" },
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
