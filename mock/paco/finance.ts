// Dominio financiero: cuentas, adelanto, movimientos, recargas, servicios y club PiN.

export type BankAccount = {
  id: string;
  alias: string;
  bank: string;
  kind: "Cuenta" | "Tarjeta";
  number: string;
  masked: string;
  primary?: boolean;
};

export const seedAccounts: BankAccount[] = [
  { id: "ba1", alias: "Nómina BBVA", bank: "BBVA", kind: "Cuenta", number: "012180001234567890", masked: "CLABE •••• 7890", primary: true },
  { id: "ba2", alias: "Débito Santander", bank: "Santander", kind: "Tarjeta", number: "5579070012342366", masked: "Tarjeta •••• 2366" },
];

export const banks = ["BBVA", "Santander", "Banorte", "Citibanamex", "HSBC", "Scotiabank", "Banco Azteca", "BanCoppel"] as const;

export type ExpenseCategory = "Adelanto de nómina" | "Recarga" | "Pago de servicio";

export type Movement = {
  id: string;
  concept: string;
  category: ExpenseCategory;
  amount: number;
  commission: number;
  period: string;
  date: string;
  status: "Adeudo próximo" | "Procesado" | "Liquidado";
};

export const seedMovements: Movement[] = [
  { id: "m1", concept: "Recarga Telcel 55 6677 8899", category: "Recarga", amount: 150, commission: 0, period: "1Q junio 2026", date: "5 jun 2026", status: "Procesado" },
  { id: "m2", concept: "Pago CFE ref 0123…4567", category: "Pago de servicio", amount: 820, commission: 12, period: "2Q mayo 2026", date: "28 may 2026", status: "Liquidado" },
  { id: "m3", concept: "Adelanto de nómina", category: "Adelanto de nómina", amount: 500, commission: 40, period: "2Q mayo 2026", date: "21 may 2026", status: "Liquidado" },
];

export const expensePeriods = ["Todos", "1Q junio 2026", "2Q mayo 2026"] as const;

export type TopupOperator = { id: string; name: string; types: ("Tiempo aire" | "Datos")[]; amounts: number[] };

export const topupOperators: TopupOperator[] = [
  { id: "telcel", name: "Telcel", types: ["Tiempo aire", "Datos"], amounts: [500, 300, 200, 150, 100, 50, 30, 20, 10] },
  { id: "att", name: "AT&T", types: ["Tiempo aire", "Datos"], amounts: [500, 300, 200, 150, 100, 50] },
  { id: "movistar", name: "Movistar", types: ["Tiempo aire", "Datos"], amounts: [300, 200, 150, 100, 50, 30] },
  { id: "weex", name: "Weex", types: ["Datos"], amounts: [200, 150, 100, 50] },
  { id: "bait", name: "Bait", types: ["Tiempo aire", "Datos"], amounts: [200, 100, 50, 20] },
  { id: "virgin", name: "Virgin Mobile", types: ["Tiempo aire", "Datos"], amounts: [200, 150, 100, 50] },
  { id: "mirecarga", name: "Mi Recarga", types: ["Tiempo aire"], amounts: [100, 50, 30, 20, 10] },
  { id: "unefon", name: "Unefon", types: ["Tiempo aire", "Datos"], amounts: [300, 200, 100, 50] },
  { id: "flash", name: "Flash Mobile", types: ["Datos"], amounts: [150, 100, 50] },
  { id: "pillofon", name: "PilloFon", types: ["Tiempo aire", "Datos"], amounts: [200, 100, 50] },
  { id: "freedompop", name: "FreedomPop", types: ["Datos"], amounts: [100, 50, 30] },
  { id: "oui", name: "Oui móvil", types: ["Tiempo aire"], amounts: [100, 50, 30] },
  { id: "diri", name: "Diri", types: ["Datos"], amounts: [150, 100, 50] },
];

export type ServiceCategory = {
  id: string;
  name: string;

  providers: { id: string; name: string; refLabel: string; refSample: string }[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "tv",
    name: "Televisión, telefonía e internet",
   
    providers: [
      { id: "telmex", name: "Telmex", refLabel: "Número de teléfono (10 dígitos)", refSample: "5512345678" },
      { id: "sky", name: "Sky", refLabel: "Número de contrato", refSample: "401234567" },
      { id: "dish", name: "Dish", refLabel: "Número de cliente", refSample: "812345609" },
    ],
  },
  {
    id: "agua-luz-gas",
    name: "Agua, luz y gas",
   
    providers: [
      { id: "cfe", name: "CFE", refLabel: "Referencia del recibo (30 dígitos)", refSample: "012345678901234567890123456789" },
      { id: "sacmex", name: "Agua CDMX (SACMEX)", refLabel: "Cuenta predial del recibo", refSample: "11-222-333-44" },
      { id: "naturgy", name: "Naturgy", refLabel: "Número de servicio", refSample: "70012345" },
    ],
  },
  {
    id: "telepeaje",
    name: "Telepeaje",
   
    providers: [
      { id: "pase", name: "PASE", refLabel: "Número de TAG", refSample: "PASE-778812" },
      { id: "televia", name: "TeleVía", refLabel: "Número de TAG", refSample: "TV-1029384" },
    ],
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
   
    providers: [
      { id: "spotify", name: "Spotify", refLabel: "Correo de la cuenta", refSample: "correo@dominio.mx" },
      { id: "hbo", name: "Max", refLabel: "Referencia de pago", refSample: "MAX-556677" },
    ],
  },
  {
    id: "gobierno",
    name: "Pagos de gobierno",
   
    providers: [
      { id: "tenencia", name: "Tenencia CDMX", refLabel: "Placa vehicular", refSample: "NXR-12-34" },
      { id: "predial", name: "Predial CDMX", refLabel: "Cuenta predial", refSample: "044-123-45-678" },
    ],
  },
  {
    id: "catalogo",
    name: "Ventas por catálogo",
   
    providers: [
      { id: "avon", name: "Avon", refLabel: "Número de representante", refSample: "REP-445566" },
      { id: "natura", name: "Natura", refLabel: "Código de consultora", refSample: "NAT-778899" },
    ],
  },
];

export const kycSteps = [
  { id: "ine-front", title: "INE por el frente", description: "Captura fotográfica de tu identificación oficial." },
  { id: "ine-back", title: "INE por el reverso", description: "Asegúrate de que el código de barras sea legible." },
  { id: "selfie", title: "Selfie de verificación", description: "Tu rostro descubierto, con buena iluminación." },
] as const;

export type Coupon = {
  id: string;
  brand: string;
  offer: string;
  category: string;
  distance: string;
  expires: string;

};

export const pinCoupons: Coupon[] = [
  { id: "cp1", brand: "De Toño", offer: "2x1 en menú ejecutivo", category: "Comida", distance: "450 m", expires: "Vence hoy" },
  { id: "cp2", brand: "Farmacias Bienestar", offer: "15% en medicamentos OTC", category: "Salud", distance: "1.2 km", expires: "Vence 15 jun" },
  { id: "cp3", brand: "Cine Centro", offer: "Boleto colaborador a $69", category: "Entretenimiento", distance: "2.4 km", expires: "Vence domingo" },
  { id: "cp4", brand: "Gym Fuerza", offer: "Inscripción gratis + 20% mensualidad", category: "Deporte", distance: "3.1 km", expires: "Vence 30 jun" },
  { id: "cp5", brand: "Librerías Aldea", offer: "10% en papelería corporativa", category: "Educación", distance: "5.0 km", expires: "Vence 30 jun" },
];

export const pinCategories = ["Todos", "Comida", "Salud", "Entretenimiento", "Deporte", "Educación"] as const;
