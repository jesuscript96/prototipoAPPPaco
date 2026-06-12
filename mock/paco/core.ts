// Dominio nucleo: colaborador, empresa, banners, directorio, celebraciones y notificaciones.
// Fechas ancladas al 10 de junio de 2026 (hoy) para que el prototipo se sienta vivo.

import type { Href } from "expo-router";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export const employee = {
  name: "Ricardo Jafif Pereyra",
  preferredName: "Ricardo",
  initials: "RJ",
  email: "ricardo.jafif@lacentral.mx",
  phone: "55 4123 7788",
  gender: "Masculino",
  birthDate: "12 de agosto de 1995",
  employeeNumber: "109",
  rfc: "JAPR950812HK7",
  curp: "JAPR950812HDFLRC04",
  nss: "01169527345",
  hireDate: "1 de abril de 2024",
  seniority: "2 años, 2 meses y 9 días",
  seniorityMonths: 26,
  employer: "Servicios Corporativos La Central, S.A. de C.V.",
  payPeriod: "Quincenal",
  department: "Operaciones",
  area: "Experiencia del Colaborador",
  role: "Coordinador de Sucursal",
  salaryPerPeriod: 9250,
} as const;

export const company = {
  name: "La Central",
  minSeniorityMonths: 3,
  advanceCommissionRate: 0.08,
  serviceCommission: 12,
  advanceMin: 200,
  advanceMax: 2500,
  faqUrl: "https://paco.mx/ayuda",
  whatsappSupport: "+52 55 0000 7226",
  chatProvider: "Zoho SalesIQ",
  pinProvider: "PiN Beneficios",
  signatureProvider: "FirmaMX Digital",
  paymentProvider: "Pasarela OpenPay (mock)",
  kycProvider: "Veridoc KYC (mock)",
} as const;

export type Banner = { id: string; title: string; subtitle: string; href: Href };

export const banners: Banner[] = [
  { id: "b1", title: "Celebrate the World Cup", subtitle: "World Cup 2026", href: "/(paco)/recognitions" },
  { id: "b2", title: "Paco's Amazing Goal", subtitle: "Celebremos el Mundial 2026", href: "/(paco)/recognitions" },
  { id: "b3", title: "Convenio De Toño", subtitle: "2x1 en menú ejecutivo presentando tu tarjeta digital.", href: "/(paco)/pin" },
];

export type Coworker = { id: string; name: string; area: string; role: string };

export const directory: Coworker[] = [
  { id: "c1", name: "Orlando Luna", area: "Soporte", role: "Analista de Mesa de Ayuda" },
  { id: "c2", name: "Simón Cohen", area: "Ventas", role: "Ejecutivo Comercial" },
  { id: "c3", name: "Laura Méndez", area: "Finanzas", role: "Analista de Nómina" },
  { id: "c4", name: "Jorge Patiño", area: "Operaciones", role: "Supervisor de Almacén" },
  { id: "c5", name: "Rodrigo Delgado", area: "Marketing", role: "Diseñador Gráfico" },
  { id: "c6", name: "Andrea Lara", area: "Recursos Humanos", role: "Gerente de Cultura" },
  { id: "c7", name: "Amaury González", area: "Operaciones", role: "Coordinador Regional" },
  { id: "c8", name: "Diana Beltrán", area: "Calidad", role: "Auditora Interna" },
];

export type Celebration = {
  id: string;
  coworkerId: string;
  name: string;
  type: "Cumpleaños" | "Aniversario";
  dayLabel: string;
  dayOffset: number;
  area: string;
  years?: number;
};

export const celebrations: Celebration[] = [
  { id: "cel1", coworkerId: "c4", name: "Jorge Patiño", type: "Cumpleaños", dayLabel: "Hoy · 10 de junio", dayOffset: 0, area: "Operaciones" },
  { id: "cel2", coworkerId: "c3", name: "Laura Méndez", type: "Aniversario", dayLabel: "Hoy · 10 de junio", dayOffset: 0, area: "Finanzas", years: 5 },
  { id: "cel3", coworkerId: "c5", name: "Rodrigo Delgado", type: "Cumpleaños", dayLabel: "Mañana · 11 de junio", dayOffset: 1, area: "Marketing" },
  { id: "cel4", coworkerId: "c1", name: "Orlando Luna", type: "Aniversario", dayLabel: "Viernes · 12 de junio", dayOffset: 2, area: "Soporte", years: 4 },
  { id: "cel5", coworkerId: "c2", name: "Simón Cohen", type: "Cumpleaños", dayLabel: "Sábado · 13 de junio", dayOffset: 3, area: "Ventas" },
  { id: "cel6", coworkerId: "c8", name: "Diana Beltrán", type: "Aniversario", dayLabel: "Domingo · 14 de junio", dayOffset: 4, area: "Calidad", years: 2 },
];

export type PacoModuleEntry = {
  id: string;
  title: string;
  subtitle: string;

  domain: "Finanzas" | "Personas y cultura" | "Documentos" | "Soporte";
  href: Href;
  core?: boolean;
};

export const moduleRegistry: PacoModuleEntry[] = [
  { id: "advance", title: "Adelanto de nómina", subtitle: "Hasta $2,500 esta quincena", domain: "Finanzas", href: "/(paco)/advance", core: true },
  { id: "topups", title: "Recargas", subtitle: "Tiempo aire y datos", domain: "Finanzas", href: "/(paco)/topups" },
  { id: "services", title: "Pago de servicios", subtitle: "CFE, Telmex, telepeaje y más", domain: "Finanzas", href: "/(paco)/services" },
  { id: "expenses", title: "Reporte de gastos", subtitle: "Adeudos y movimientos", domain: "Finanzas", href: "/(paco)/expenses" },
  { id: "pin", title: "Club de Descuentos PiN", subtitle: "Cupones cerca de ti", domain: "Finanzas", href: "/(paco)/pin" },
  { id: "mood", title: "Estado de ánimo", subtitle: "Registro diario y gráficas", domain: "Personas y cultura", href: "/(paco)/mood" },
  { id: "celebrations", title: "Cumpleaños y aniversarios", subtitle: "Felicita a tu equipo", domain: "Personas y cultura", href: "/(paco)/celebrations" },
  { id: "surveys", title: "Encuestas", subtitle: "NOM-035 y clima laboral", domain: "Personas y cultura", href: "/(paco)/surveys" },
  { id: "voice", title: "Voz del colaborador", subtitle: "Reportes y seguimiento", domain: "Personas y cultura", href: "/(paco)/voice" },
  { id: "recognitions", title: "Reconoce a tu equipo", subtitle: "Medallas y valores", domain: "Personas y cultura", href: "/(paco)/recognitions" },
  { id: "requests", title: "Solicitudes", subtitle: "Vacaciones, permisos e incidencias", domain: "Personas y cultura", href: "/(paco)/requests" },
  { id: "onboarding-tasks", title: "Onboarding", subtitle: "Tareas con mentor", domain: "Personas y cultura", href: "/(paco)/onboarding-tasks" },
  { id: "training", title: "Capacitaciones", subtitle: "Cursos online y offline", domain: "Personas y cultura", href: "/(paco)/training" },
  { id: "wellness", title: "Bienestar en línea", subtitle: "Mental, físico, financiero", domain: "Personas y cultura", href: "/(paco)/wellness" },
  { id: "comms", title: "Comunicación", subtitle: "Comunicados y adjuntos", domain: "Documentos", href: "/(paco)/comms" },
  { id: "document-requests", title: "Solicitud de documentos", subtitle: "Genera, firma y sube", domain: "Documentos", href: "/(paco)/document-requests" },
  { id: "corporate-docs", title: "Documentos corporativos", subtitle: "Políticas y manuales", domain: "Documentos", href: "/(paco)/corporate-docs" },
  { id: "receipts", title: "Recibos de nómina", subtitle: "PDF, XML y firma", domain: "Documentos", href: "/(paco)/receipts" },
  { id: "sua", title: "Cartas SUA", subtitle: "Consulta y firma", domain: "Documentos", href: "/(paco)/sua" },
  { id: "profile", title: "Mi expediente", subtitle: "Datos y tarjeta digital", domain: "Soporte", href: "/(paco)/profile" },
  { id: "chat", title: "Chat interno", subtitle: "Salas y mensajes del equipo", domain: "Soporte", href: "/(paco)/chat" },
  { id: "support", title: "Soporte técnico", subtitle: "FAQ, WhatsApp y tickets", domain: "Soporte", href: "/(paco)/support" },
  { id: "settings", title: "Configuración", subtitle: "Seguridad, NIP y cuentas", domain: "Soporte", href: "/(paco)/settings" },
  { id: "legal", title: "Términos y privacidad", subtitle: "Documentos legales", domain: "Soporte", href: "/(paco)/legal" },
];

export type PacoNotification = {
  id: string;
  type: "Encuesta" | "Curso" | "Cumpleaños" | "Reconocimiento" | "Voz" | "Comunicado" | "Onboarding" | "Finanzas";
  title: string;
  body: string;
  time: string;
  tone: Tone;
  href: Href;
  read: boolean;
};

export const seedNotifications: PacoNotification[] = [
  {
    id: "n1",
    type: "Encuesta",
    title: "Encuesta NOM-035 obligatoria",
    body: "Guía de Referencia I - Acontecimientos traumáticos severos. Vence en 22 días. Entra a Paco para contestarla.",
    time: "Hoy · 9:40",
    tone: "warning",
    href: "/(paco)/surveys",
    read: false,
  },
  {
    id: "n2",
    type: "Curso",
    title: "¡Tienes un nuevo curso asignado!",
    body: "Seguridad en sucursal está disponible en Capacitaciones. Puedes descargarlo para avanzar sin conexión.",
    time: "Hoy · 8:15",
    tone: "info",
    href: "/(paco)/training",
    read: false,
  },
  {
    id: "n3",
    type: "Onboarding",
    title: "Tarea de onboarding por vencer",
    body: "Tu mentor Andrea Lara espera el examen de políticas internas antes del viernes.",
    time: "Ayer · 17:02",
    tone: "warning",
    href: "/(paco)/onboarding-tasks",
    read: false,
  },
  {
    id: "n4",
    type: "Cumpleaños",
    title: "Jorge Patiño cumple años hoy",
    body: "Entra a Cumpleaños y aniversarios para felicitarlo.",
    time: "Hoy · 7:00",
    tone: "success",
    href: "/(paco)/celebrations",
    read: false,
  },
  {
    id: "n5",
    type: "Voz",
    title: "RH respondió tu reporte CLM-204",
    body: "Tu caso de clima laboral cambió a estatus En proceso. Continúa la conversación.",
    time: "Ayer · 12:30",
    tone: "info",
    href: "/(paco)/voice/status",
    read: false,
  },
  {
    id: "n6",
    type: "Reconocimiento",
    title: "Recibiste una medalla de Excelencia",
    body: "Andrea Lara te reconoció por completar el Curso test dc3.",
    time: "Lunes · 10:24",
    tone: "success",
    href: "/(paco)/recognitions",
    read: true,
  },
  {
    id: "n7",
    type: "Comunicado",
    title: "Nuevo comunicado: Política de vacaciones 2026",
    body: "Recursos Humanos publicó lineamientos actualizados con un adjunto.",
    time: "Lunes · 9:00",
    tone: "neutral",
    href: "/(paco)/comms",
    read: true,
  },
];
