import type { ImageSourcePropType } from "react-native";

export type PacoAsset = ImageSourcePropType;

const svgAsset = (label: string, color = "#2F42CB"): PacoAsset => {
  const initials = label
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"><rect width="240" height="180" rx="36" fill="#F8FAFF"/><circle cx="72" cy="64" r="44" fill="${color}" opacity=".14"/><circle cx="168" cy="116" r="54" fill="${color}" opacity=".20"/><rect x="62" y="58" width="116" height="64" rx="24" fill="${color}"/><text x="120" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return { uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` };
};

export const fontAssets = {} as const;

export const brandAssets = {
  icon: svgAsset("Paco"),
  icon1024: svgAsset("Paco"),
  favicon: svgAsset("Paco"),
  splash: svgAsset("Paco"),
  iconMain: svgAsset("Paco"),
  headerIcon: svgAsset("Paco", "#1E1E1E"),
  headerIconWhite: svgAsset("Paco", "#FFFFFF"),
  logo: svgAsset("Paco"),
  textLogo: svgAsset("Paco"),
  imageLogo: svgAsset("Paco"),
  homeBg: svgAsset("Inicio", "#5176F3"),
  dashboardBg: svgAsset("Panel", "#5176F3"),
} as const;

export const moduleAssets = {
  advance: svgAsset("Adelanto"),
  topups: svgAsset("Recargas", "#5176F3"),
  services: svgAsset("Servicios", "#674EA7"),
  expenses: svgAsset("Gastos", "#FB4F33"),
  pin: svgAsset("PiN", "#6AA84F"),
  mood: svgAsset("Ánimo", "#674EA7"),
  celebrations: svgAsset("Celebraciones", "#F1C232"),
  surveys: svgAsset("Encuestas", "#5176F3"),
  voice: svgAsset("Voz", "#A64D79"),
  recognitions: svgAsset("Reconocimientos", "#F1C232"),
  requests: svgAsset("Solicitudes"),
  "onboarding-tasks": svgAsset("Onboarding", "#5176F3"),
  training: svgAsset("Capacitaciones", "#B8860B"),
  wellness: svgAsset("Bienestar", "#6AA84F"),
  comms: svgAsset("Comunicados", "#5176F3"),
  "document-requests": svgAsset("Documentos"),
  "corporate-docs": svgAsset("Corporativos", "#64748b"),
  receipts: svgAsset("Recibos"),
  sua: svgAsset("SUA", "#64748b"),
  profile: svgAsset("Perfil", "#1E1E1E"),
  chat: svgAsset("Chat", "#5176F3"),
  support: svgAsset("Soporte", "#674EA7"),
  settings: svgAsset("Ajustes", "#64748b"),
  legal: svgAsset("Legal", "#1E1E1E"),
} as const;

export const quickActionAssets = {
  advance: moduleAssets.advance,
  topups: moduleAssets.topups,
  services: moduleAssets.services,
  expenses: moduleAssets.expenses,
} as const;

export const menuAssets = {
  profile: moduleAssets.profile,
  mood: moduleAssets.mood,
  recognitions: moduleAssets.recognitions,
  voice: moduleAssets.voice,
  expenses: moduleAssets.expenses,
  receipts: moduleAssets.receipts,
  sua: moduleAssets.sua,
  "corporate-docs": moduleAssets["corporate-docs"],
  chat: moduleAssets.chat,
  help: moduleAssets.support,
  support: moduleAssets.support,
  legal: moduleAssets.legal,
  settings: moduleAssets.settings,
} as const;

export const bannerAssets = {
  b1: svgAsset("Equipo", "#6AA84F"),
  b2: svgAsset("Adelanto"),
  b3: svgAsset("Beneficio", "#FB4F33"),
} as const;

export const financeAssets = {
  cardVisa: svgAsset("Visa"),
  cardMastercard: svgAsset("MC", "#FB4F33"),
  cardAccount: svgAsset("Cuenta", "#64748b"),
  cardSent: svgAsset("Enviado", "#6AA84F"),
  mail: svgAsset("Correo", "#5176F3"),
  check: svgAsset("OK", "#6AA84F"),
} as const;

export const topupAssets = {
  movistar: svgAsset("Movistar", "#6AA84F"),
  iusacell: svgAsset("Iusacell", "#FB4F33"),
  mirecarga: svgAsset("Recarga"),
  aire: svgAsset("Aire", "#5176F3"),
  datos: svgAsset("Datos", "#674EA7"),
} as const;

export const serviceAssets = {
  telmex: svgAsset("Telmex", "#5176F3"),
  sky: svgAsset("Sky"),
  dish: svgAsset("Dish", "#FB4F33"),
  cfe: svgAsset("CFE", "#F1C232"),
  naturgy: svgAsset("Gas", "#6AA84F"),
  pase: svgAsset("Pase", "#674EA7"),
  televia: svgAsset("Televia", "#A64D79"),
  avon: svgAsset("Avon", "#A64D79"),
  natura: svgAsset("Natura", "#6AA84F"),
  tv: svgAsset("TV"),
  "agua-luz-gas": svgAsset("Servicios", "#F1C232"),
  telepeaje: svgAsset("Peaje", "#674EA7"),
  entretenimiento: svgAsset("Entretenimiento", "#FB4F33"),
  gobierno: svgAsset("Gobierno", "#64748b"),
  catalogo: svgAsset("Catálogo", "#A64D79"),
  scanner: svgAsset("Escáner", "#1E1E1E"),
} as const;

export const peopleAssets = {
  avatarPlaceholder: svgAsset("RJ", "#1E1E1E"),
  avatarSmall: svgAsset("RJ", "#1E1E1E"),
  user: svgAsset("Usuario", "#1E1E1E"),
  paperclip: svgAsset("Adjunto", "#64748b"),
  docIcon: svgAsset("Doc"),
  like: svgAsset("Sí", "#6AA84F"),
  dislike: svgAsset("No", "#CC0000"),
  clock: svgAsset("Tiempo", "#F1C232"),
  surveyWelcome: svgAsset("Encuesta", "#5176F3"),
  surveyWink: svgAsset("Gracias", "#6AA84F"),
  surveyBlank: svgAsset("Encuesta", "#64748b"),
  surveyFinal: svgAsset("Listo", "#6AA84F"),
  smiley1: svgAsset("Bajo", "#CC0000"),
  smiley2: svgAsset("Medio", "#F1C232"),
  smiley3: svgAsset("Alto", "#6AA84F"),
  person: svgAsset("Persona", "#5176F3"),
} as const;

export const illustrationAssets = {
  onboarding1: svgAsset("Bienvenido"),
  onboarding2: svgAsset("Permisos", "#5176F3"),
  onboarding3: svgAsset("Nómina", "#6AA84F"),
  onboarding4: svgAsset("Listo", "#FB4F33"),
  activation: svgAsset("Activación"),
  error: svgAsset("Error", "#CC0000"),
  loginConfirm: svgAsset("Login"),
  password: svgAsset("Contraseña", "#674EA7"),
  empty: svgAsset("Vacío", "#64748b"),
  training: svgAsset("Capacitación", "#B8860B"),
  documents: svgAsset("Documentos"),
  support: svgAsset("Soporte", "#674EA7"),
  wellness: svgAsset("Bienestar", "#6AA84F"),
  success: svgAsset("Éxito", "#6AA84F"),
} as const;

export const assetForModule = (id: string): PacoAsset | undefined => moduleAssets[id as keyof typeof moduleAssets];
export const assetForMenu = (id: string): PacoAsset | undefined => menuAssets[id as keyof typeof menuAssets];
export const assetForTopupOperator = (id: string): PacoAsset | undefined => topupAssets[id as keyof typeof topupAssets];
export const assetForService = (id: string): PacoAsset => serviceAssets[id as keyof typeof serviceAssets] ?? svgAsset(id, "#64748b");
export const assetForMoodScore = (score: number): PacoAsset => {
  if (score <= 33) return peopleAssets.smiley1;
  if (score <= 66) return peopleAssets.smiley2;
  return peopleAssets.smiley3;
};
