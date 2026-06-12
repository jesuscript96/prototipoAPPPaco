import type { ImageSourcePropType } from "react-native";

export type PacoAsset = ImageSourcePropType;

export const brandAssets = {
  icon: require("../../assets/paco/brand/icon.png") as PacoAsset,
  icon1024: require("../../assets/paco/brand/icon-1024.png") as PacoAsset,
  favicon: require("../../assets/paco/brand/favicon.png") as PacoAsset,
  splash: require("../../assets/paco/brand/splash.png") as PacoAsset,
  iconMain: require("../../assets/paco/brand/icon-main.png") as PacoAsset,
  headerIcon: require("../../assets/paco/brand/header-icon.png") as PacoAsset,
  headerIconWhite: require("../../assets/paco/brand/header-icon-white.png") as PacoAsset,
  logo: require("../../assets/paco/brand/logo.png") as PacoAsset,
  textLogo: require("../../assets/paco/brand/text-logo.png") as PacoAsset,
  imageLogo: require("../../assets/paco/brand/img-logo.png") as PacoAsset,
  homeBg: require("../../assets/paco/brand/home-bg.png") as PacoAsset,
  dashboardBg: require("../../assets/paco/brand/dashboard-bg.png") as PacoAsset,
} as const;

/** Legacy brand fonts — Inter es la familia vigente (ver lib/fonts.ts). */
export const fontAssets = {
  gorditaBold: require("../../assets/paco/fonts/Gordita-Bold.otf"),
  gorditaRegular: require("../../assets/paco/fonts/Lato-Regular.ttf"),
  latoRegular: require("../../assets/paco/fonts/Lato-Regular.ttf"),
} as const;

export const moduleAssets = {
  advance: require("../../assets/paco/modules/money.png") as PacoAsset,
  topups: require("../../assets/paco/modules/cell.png") as PacoAsset,
  services: require("../../assets/paco/modules/wallet.png") as PacoAsset,
  expenses: require("../../assets/paco/modules/discount.png") as PacoAsset,
  pin: require("../../assets/paco/modules/discount.png") as PacoAsset,
  mood: require("../../assets/paco/modules/doctor.png") as PacoAsset,
  celebrations: require("../../assets/paco/modules/trophy.png") as PacoAsset,
  surveys: require("../../assets/paco/modules/question.png") as PacoAsset,
  voice: require("../../assets/paco/modules/megaphone.png") as PacoAsset,
  recognitions: require("../../assets/paco/modules/trophy.png") as PacoAsset,
  requests: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  "onboarding-tasks": require("../../assets/paco/modules/paco.png") as PacoAsset,
  training: require("../../assets/paco/modules/tournament.png") as PacoAsset,
  wellness: require("../../assets/paco/modules/doctor.png") as PacoAsset,
  comms: require("../../assets/paco/modules/message.png") as PacoAsset,
  "document-requests": require("../../assets/paco/modules/menu-doc.png") as PacoAsset,
  "corporate-docs": require("../../assets/paco/modules/menu-doc.png") as PacoAsset,
  receipts: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  sua: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  profile: require("../../assets/paco/people/avatar-small.png") as PacoAsset,
  chat: require("../../assets/paco/modules/menu-messages.png") as PacoAsset,
  support: require("../../assets/paco/modules/question.png") as PacoAsset,
  settings: require("../../assets/paco/modules/menu-config.png") as PacoAsset,
  legal: require("../../assets/paco/modules/menu-exclamacion.png") as PacoAsset,
} as const;

export const quickActionAssets = {
  advance: moduleAssets.advance,
  topups: moduleAssets.topups,
  services: moduleAssets.services,
  expenses: moduleAssets.expenses,
} as const;

export const menuAssets = {
  profile: require("../../assets/paco/people/avatar-small.png") as PacoAsset,
  mood: require("../../assets/paco/modules/menu-circle.png") as PacoAsset,
  recognitions: require("../../assets/paco/modules/menu-tournament.png") as PacoAsset,
  voice: require("../../assets/paco/modules/menu-exclamacion.png") as PacoAsset,
  expenses: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  receipts: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  sua: require("../../assets/paco/modules/menu-doc.png") as PacoAsset,
  "corporate-docs": require("../../assets/paco/modules/menu-doc.png") as PacoAsset,
  chat: require("../../assets/paco/modules/menu-messages.png") as PacoAsset,
  help: require("../../assets/paco/modules/menu-question.png") as PacoAsset,
  support: require("../../assets/paco/modules/menu-question.png") as PacoAsset,
  legal: require("../../assets/paco/modules/menu-exclamacion.png") as PacoAsset,
  settings: require("../../assets/paco/modules/menu-config.png") as PacoAsset,
} as const;

export const tabAssets = {
  home: require("../../assets/paco/modules/menu-house.png") as PacoAsset,
  money: require("../../assets/paco/modules/money.png") as PacoAsset,
  requests: require("../../assets/paco/modules/menu-paper.png") as PacoAsset,
  chat: require("../../assets/paco/modules/menu-messages.png") as PacoAsset,
  more: require("../../assets/paco/modules/menu-circle.png") as PacoAsset,
} as const;

export const bannerAssets = {
  b1: require("../../assets/paco/banners/banner-celebrate-flowers.png") as PacoAsset,
  b2: require("../../assets/paco/banners/banner-2-paco-goal.png") as PacoAsset,
  b3: require("../../assets/paco/banners/banner-convenio-tono.png") as PacoAsset,
} as const;

export const financeAssets = {
  cardVisa: require("../../assets/paco/finance/card-visa.png") as PacoAsset,
  cardMastercard: require("../../assets/paco/finance/card-mastercard.png") as PacoAsset,
  cardAccount: require("../../assets/paco/finance/card-account.png") as PacoAsset,
  cardSent: require("../../assets/paco/finance/card-sent.png") as PacoAsset,
  mail: require("../../assets/paco/finance/mail.png") as PacoAsset,
  check: require("../../assets/paco/finance/check.png") as PacoAsset,
} as const;

export const topupAssets = {
  movistar: require("../../assets/paco/topups/movistar.png") as PacoAsset,
  iusacell: require("../../assets/paco/topups/iusacell.png") as PacoAsset,
  mirecarga: require("../../assets/paco/topups/mas-recarga.png") as PacoAsset,
  aire: require("../../assets/paco/topups/aire.png") as PacoAsset,
  datos: require("../../assets/paco/topups/datos.png") as PacoAsset,
} as const;

export const serviceAssets = {
  telmex: require("../../assets/paco/services/telmex.png") as PacoAsset,
  sky: require("../../assets/paco/services/sky.png") as PacoAsset,
  dish: require("../../assets/paco/services/dish.png") as PacoAsset,
  cfe: require("../../assets/paco/services/cfe.png") as PacoAsset,
  naturgy: require("../../assets/paco/services/gasnatural.png") as PacoAsset,
  pase: require("../../assets/paco/services/iavepaseu.png") as PacoAsset,
  televia: require("../../assets/paco/services/televia.png") as PacoAsset,
  avon: require("../../assets/paco/services/avon.png") as PacoAsset,
  natura: require("../../assets/paco/services/natura.png") as PacoAsset,
  tv: require("../../assets/paco/services/b-1.png") as PacoAsset,
  "agua-luz-gas": require("../../assets/paco/services/b-2.png") as PacoAsset,
  telepeaje: require("../../assets/paco/services/b-3.png") as PacoAsset,
  entretenimiento: require("../../assets/paco/services/b-4.png") as PacoAsset,
  gobierno: require("../../assets/paco/services/b-5.png") as PacoAsset,
  catalogo: require("../../assets/paco/services/b-6.png") as PacoAsset,
  scanner: require("../../assets/paco/services/camera.png") as PacoAsset,
} as const;

export const peopleAssets = {
  avatarPlaceholder: require("../../assets/paco/people/avatar-placeholder.png") as PacoAsset,
  avatarSmall: require("../../assets/paco/people/avatar-small.png") as PacoAsset,
  user: require("../../assets/paco/people/user.jpg") as PacoAsset,
  paperclip: require("../../assets/paco/people/paper-clip.png") as PacoAsset,
  docIcon: require("../../assets/paco/people/doc-icon.png") as PacoAsset,
  like: require("../../assets/paco/people/like.png") as PacoAsset,
  dislike: require("../../assets/paco/people/dislike.png") as PacoAsset,
  clock: require("../../assets/paco/people/clock.png") as PacoAsset,
  surveyWelcome: require("../../assets/paco/people/survey-welcome.png") as PacoAsset,
  surveyWink: require("../../assets/paco/people/survey-wink.png") as PacoAsset,
  surveyBlank: require("../../assets/paco/people/survey-blank.png") as PacoAsset,
  surveyFinal: require("../../assets/paco/people/survey-final.png") as PacoAsset,
  smiley1: require("../../assets/paco/people/smiley-1.png") as PacoAsset,
  smiley2: require("../../assets/paco/people/smiley-2.png") as PacoAsset,
  smiley3: require("../../assets/paco/people/smiley-3.png") as PacoAsset,
  person: require("../../assets/paco/people/person.png") as PacoAsset,
} as const;

export const illustrationAssets = {
  onboarding1: require("../../assets/paco/illustrations/onboarding-1.png") as PacoAsset,
  onboarding2: require("../../assets/paco/illustrations/onboarding-2.png") as PacoAsset,
  onboarding3: require("../../assets/paco/illustrations/onboarding-3.png") as PacoAsset,
  onboarding4: require("../../assets/paco/illustrations/onboarding-4.png") as PacoAsset,
  activation: require("../../assets/paco/illustrations/activation.png") as PacoAsset,
  error: require("../../assets/paco/illustrations/error.png") as PacoAsset,
  loginConfirm: require("../../assets/paco/illustrations/login-confirm.png") as PacoAsset,
  password: require("../../assets/paco/illustrations/reg-pass.png") as PacoAsset,
  empty: require("../../assets/paco/illustrations/h-8.png") as PacoAsset,
  training: require("../../assets/paco/illustrations/ic-7.png") as PacoAsset,
  documents: require("../../assets/paco/illustrations/ic-3.png") as PacoAsset,
  support: require("../../assets/paco/illustrations/ic-9.png") as PacoAsset,
  wellness: require("../../assets/paco/illustrations/h-5.png") as PacoAsset,
  success: require("../../assets/paco/people/survey-final.png") as PacoAsset,
} as const;

export const assetForModule = (id: string): PacoAsset | undefined => moduleAssets[id as keyof typeof moduleAssets];
export const assetForMenu = (id: string): PacoAsset | undefined => menuAssets[id as keyof typeof menuAssets];
export const assetForTopupOperator = (id: string): PacoAsset | undefined => topupAssets[id as keyof typeof topupAssets];
export const assetForService = (id: string): PacoAsset | undefined => serviceAssets[id as keyof typeof serviceAssets];
export const assetForMoodScore = (score: number): PacoAsset => {
  if (score <= 33) return peopleAssets.smiley1;
  if (score <= 66) return peopleAssets.smiley2;
  return peopleAssets.smiley3;
};
