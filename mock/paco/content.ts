// Dominio contenido y documentos: comunicacion interna, bienestar, solicitud de
// documentos, documentos corporativos, recibos, cartas SUA, capacitacion,
// soporte, chat interno y legales.

export type FileKind = "PDF" | "DOCX" | "XLSX" | "PPTX" | "Imagen" | "Video" | "Audio" | "XML";

export type FileAttachment = { id: string; name: string; kind: FileKind; size: string };

// ---- Comunicacion interna ----

export type Communication = {
  id: string;
  title: string;
  author: string;
  date: string;
  recent: boolean;
  body: string;
  attachments: FileAttachment[];
};

export const communications: Communication[] = [
  {
    id: "cm1",
    title: "Política de vacaciones 2026",
    author: "Recursos Humanos",
    date: "8 jun 2026 · 9:00",
    recent: true,
    body: "A partir de este mes, las solicitudes de vacaciones deberán registrarse con al menos 5 días hábiles de anticipación desde el módulo de Solicitudes. Los días vigentes del periodo 2026 aparecen en tu expediente. Las solicitudes pendientes del esquema anterior serán migradas automáticamente.",
    attachments: [
      { id: "at1", name: "Politica-vacaciones-2026.docx", kind: "DOCX", size: "480 KB" },
      { id: "at2", name: "Calendario-oficial.pdf", kind: "PDF", size: "220 KB" },
    ],
  },
  {
    id: "cm2",
    title: "Manual de operación de sucursal v3",
    author: "Dirección de Operaciones",
    date: "4 jun 2026 · 16:30",
    recent: true,
    body: "Se libera la versión 3 del manual operativo con los nuevos protocolos de apertura y cierre. Es material obligatorio para coordinadores regionales y de sucursal.",
    attachments: [{ id: "at3", name: "Manual-operaciones-v3.pptx", kind: "PPTX", size: "2.1 MB" }],
  },
  {
    id: "cm3",
    title: "Resultados del torneo interno de fútbol",
    author: "Comité de Cultura",
    date: "26 may 2026 · 13:15",
    recent: false,
    body: "¡Felicidades al equipo de Almacén por llevarse la copa 2026! Gracias a todos los que participaron. Adjuntamos la galería del evento y la tabla final de posiciones.",
    attachments: [
      { id: "at4", name: "Galeria-torneo.png", kind: "Imagen", size: "3.8 MB" },
      { id: "at5", name: "Tabla-posiciones.xlsx", kind: "XLSX", size: "96 KB" },
    ],
  },
];

// ---- Bienestar en linea ----

export type WellnessCategory = {
  id: string;
  name: string;

  resources: FileAttachment[];
};

export const wellnessCategories: WellnessCategory[] = [
  {
    id: "mental",
    name: "Bienestar Mental",
   
    resources: [
      { id: "wl1", name: "Guía para manejar el estrés laboral", kind: "PDF", size: "1.2 MB" },
      { id: "wl2", name: "Meditación guiada de 8 minutos", kind: "Video", size: "8 min" },
      { id: "wl3", name: "Higiene del sueño para turnos rotativos", kind: "PPTX", size: "1.6 MB" },
    ],
  },
  {
    id: "fisico",
    name: "Bienestar Físico",
   
    resources: [
      { id: "wl4", name: "Rutina de movilidad para oficina", kind: "Video", size: "12 min" },
      { id: "wl5", name: "Pausas activas: guía rápida", kind: "PDF", size: "640 KB" },
    ],
  },
  {
    id: "financiero",
    name: "Bienestar Financiero",
   
    resources: [
      { id: "wl6", name: "Plantilla de presupuesto quincenal", kind: "XLSX", size: "320 KB" },
      { id: "wl7", name: "Cómo usar tu adelanto de nómina con cabeza", kind: "PDF", size: "880 KB" },
    ],
  },
  { id: "emocional", name: "Bienestar Emocional", resources: [] },
];

// ---- Solicitud de documentos ----

export type DocumentTemplate = {
  id: string;
  folder: string;
  name: string;
  description: string;
  requiresSignature: boolean;
};

export const documentFolders = ["Solicitudes IMSS", "Constancias", "Formatos internos"] as const;

export const documentTemplates: DocumentTemplate[] = [
  {
    id: "dt1",
    folder: "Solicitudes IMSS",
    name: "Alta IMSS patronal",
    description: "Carátula de operación del Instituto Mexicano del Seguro Social autocompletada con tus datos.",
    requiresSignature: true,
  },
  {
    id: "dt2",
    folder: "Constancias",
    name: "Constancia laboral",
    description: "Constancia de antigüedad y salario con membrete de la empresa, lista para trámites bancarios.",
    requiresSignature: true,
  },
  {
    id: "dt3",
    folder: "Constancias",
    name: "Certificado de capacitación DC-3",
    description: "Formato DC-3 de la STPS con tus cursos finalizados.",
    requiresSignature: false,
  },
  {
    id: "dt4",
    folder: "Formatos internos",
    name: "Carta responsiva de equipo",
    description: "Responsiva del equipo de cómputo y herramientas asignadas a tu puesto.",
    requiresSignature: true,
  },
];

// ---- Documentos corporativos ----

export type CorporateFolder = {
  id: string;
  name: string;
  documents: FileAttachment[];
};

export const corporateFolders: CorporateFolder[] = [
  {
    id: "cf1",
    name: "Políticas y reglamentos",
    documents: [
      { id: "cd1", name: "Reglamento interior de trabajo.pdf", kind: "PDF", size: "1.4 MB" },
      { id: "cd2", name: "Políticas COVID 2026.pdf", kind: "PDF", size: "820 KB" },
      { id: "cd3", name: "Test Condusef.pdf", kind: "PDF", size: "540 KB" },
    ],
  },
  {
    id: "cf2",
    name: "Prestaciones y beneficios",
    documents: [
      { id: "cd4", name: "Prestaciones y Beneficios 2026.pptx", kind: "PPTX", size: "3.4 MB" },
      { id: "cd5", name: "Lead yourself first.pdf", kind: "PDF", size: "2.2 MB" },
    ],
  },
  {
    id: "cf3",
    name: "Manuales de operación",
    documents: [{ id: "cd6", name: "Manual de Operaciones.docx", kind: "DOCX", size: "850 KB" }],
  },
  { id: "cf4", name: "Promociones para tu negocio", documents: [] },
];

// ---- Recibos de nomina y cartas SUA ----

export type PayrollReceipt = {
  id: string;
  period: string;
  paidOn: string;
  net: string;
  signed: boolean;
};

export const seedReceipts: PayrollReceipt[] = [
  { id: "rc1", period: "1Q junio 2026", paidOn: "15 jun 2026", net: "$9,250.00", signed: false },
  { id: "rc2", period: "2Q mayo 2026", paidOn: "30 may 2026", net: "$9,250.00", signed: false },
  { id: "rc3", period: "1Q mayo 2026", paidOn: "15 may 2026", net: "$9,250.00", signed: true },
  { id: "rc4", period: "2Q abril 2026", paidOn: "30 abr 2026", net: "$9,180.00", signed: true },
];

export type SuaLetter = { id: string; title: string; assignedOn: string; signed: boolean };

export const seedSuaLetters: SuaLetter[] = [
  { id: "sua1", title: "Carta SUA · mayo 2026", assignedOn: "2 jun 2026", signed: false },
  { id: "sua2", title: "Carta SUA · abril 2026", assignedOn: "5 may 2026", signed: true },
];

// ---- Capacitaciones ----

export type LessonResource = { id: string; name: string; kind: FileKind; size: string };

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  video?: string;
  audio?: { name: string; duration: string };
  resources: LessonResource[];
  requiresRecording: boolean;
  requiresUpload: boolean;
};

export type CourseEvaluation = {
  questions: { id: string; text: string; kind: "single" | "open"; options?: string[]; correct?: string }[];
};

export type Course = {
  id: string;
  title: string;

  mode: "Online" | "Offline";
  mandatory: boolean;
  deadline: string;
  initialStatus: "Pendiente" | "En curso" | "Finalizado";
  initialProgress: number;
  lessons: Lesson[];
  evaluation?: CourseEvaluation;
  satisfaction?: { id: string; text: string }[];
};

export const downloadPhases = [
  "Descargando portada 1/6",
  "Descargando media 2/6",
  "Descargando audios 3/6",
  "Descargando documentos 4/6",
  "Descargando evaluaciones 5/6",
  "Verificando contenido 6/6",
] as const;

export const courses: Course[] = [
  {
    id: "seguridad",
    title: "Seguridad en sucursal",
   
    mode: "Offline",
    mandatory: true,
    deadline: "Vence 30 jun 2026",
    initialStatus: "Pendiente",
    initialProgress: 0,
    lessons: [
      {
        id: "l1",
        title: "1. Protocolos de apertura",
        summary: "Video introductorio sobre los protocolos de apertura y revisión de accesos.",
        video: "Protocolos-apertura.mp4 · 6 min",
        resources: [{ id: "lr1", name: "Checklist-apertura.pdf", kind: "PDF", size: "320 KB" }],
        requiresRecording: false,
        requiresUpload: false,
      },
      {
        id: "l2",
        title: "2. Respuesta ante incidentes",
        summary: "Escucha el audio de procedimiento y graba tu propia explicación como actividad práctica.",
        audio: { name: "Procedimiento-incidentes.mp3", duration: "0:57" },
        resources: [{ id: "lr2", name: "Matriz-de-riesgos.xlsx", kind: "XLSX", size: "96 KB" }],
        requiresRecording: true,
        requiresUpload: false,
      },
      {
        id: "l3",
        title: "3. Entregable final",
        summary: "Sube la evidencia fotográfica del recorrido de seguridad de tu sucursal.",
        resources: [],
        requiresRecording: false,
        requiresUpload: true,
      },
    ],
    evaluation: {
      questions: [
        { id: "ev1", text: "¿Cuál es el primer paso al detectar un incidente?", kind: "single", options: ["Avisar al supervisor", "Evacuar de inmediato", "Documentar con fotos"], correct: "Avisar al supervisor" },
        { id: "ev2", text: "¿Qué equipo de protección es obligatorio en bodega?", kind: "single", options: ["Guantes y gafas", "Solo cubrebocas", "Ninguno"], correct: "Guantes y gafas" },
        { id: "ev3", text: "Describe una mejora de seguridad para tu sucursal", kind: "open" },
      ],
    },
    satisfaction: [
      { id: "st1", text: "¿El contenido fue claro?" },
      { id: "st2", text: "¿La duración te pareció adecuada?" },
      { id: "st3", text: "¿Recomendarías este curso?" },
    ],
  },
  {
    id: "onboarding-toño",
    title: "Onboarding Operaciones Casa de Toño",
   
    mode: "Online",
    mandatory: false,
    deadline: "Sin límite de fecha",
    initialStatus: "En curso",
    initialProgress: 50,
    lessons: [
      {
        id: "l1",
        title: "1. Cultura de servicio",
        summary: "Video sobre los estándares de atención del convenio.",
        video: "Cultura-servicio.mp4 · 9 min",
        resources: [],
        requiresRecording: false,
        requiresUpload: false,
      },
      {
        id: "l2",
        title: "2. Manejo de inventario",
        summary: "Presentación con el flujo de inventarios y mermas.",
        resources: [{ id: "lr3", name: "Inventario-flujo.pptx", kind: "PPTX", size: "1.8 MB" }],
        requiresRecording: false,
        requiresUpload: true,
      },
    ],
    evaluation: {
      questions: [{ id: "ev1", text: "¿Cada cuánto se captura el inventario?", kind: "single", options: ["Diario", "Semanal", "Mensual"], correct: "Diario" }],
    },
  },
  {
    id: "dc3",
    title: "Curso test dc3",
   
    mode: "Online",
    mandatory: false,
    deadline: "Finalizado el 8 jun 2026",
    initialStatus: "Finalizado",
    initialProgress: 100,
    lessons: [
      {
        id: "l1",
        title: "1. Normatividad STPS",
        summary: "Lección única del curso de prueba para constancia DC-3.",
        resources: [{ id: "lr4", name: "Formato-DC3.pdf", kind: "PDF", size: "210 KB" }],
        requiresRecording: false,
        requiresUpload: false,
      },
    ],
  },
];

// ---- Soporte ----

export const faqTopics = [
  { id: "f1", topic: "Adelanto de nómina", detail: "Requisitos, comisiones y fechas de cobro" },
  { id: "f2", topic: "Recargas", detail: "Operadores disponibles y tiempos de abono" },
  { id: "f3", topic: "Pago de servicios", detail: "Referencias, escaneo y comprobantes" },
  { id: "f4", topic: "Descuentos", detail: "Cómo usar el Club PiN" },
  { id: "f5", topic: "Asistencias", detail: "Coberturas incluidas en tu plan" },
  { id: "f6", topic: "Seguros", detail: "Pólizas y beneficiarios" },
] as const;

export const botReplies = [
  "Gracias por tu mensaje. Estoy revisando tu caso con la información de tu cuenta…",
  "Encontré tu último movimiento. Si el problema es con un adelanto, normalmente se refleja en menos de 30 minutos.",
  "¿Te ayudo con algo más? Puedo escalar tu caso a un agente humano si lo necesitas.",
] as const;

// ---- Chat interno ----

export type ChatRoom = {
  id: string;
  name: string;
  isGroup: boolean;
  participants: string[];
  messages: { id: string; from: string; text: string; mine: boolean; time: string; attachment?: string }[];
};

export const seedChatRooms: ChatRoom[] = [
  {
    id: "room1",
    name: "Equipo Operaciones",
    isGroup: true,
    participants: ["Ricardo Jafif Pereyra", "Simón Cohen", "Laura Méndez", "Jorge Patiño"],
    messages: [
      { id: "cm1", from: "Simón Cohen", text: "¿Confirmamos la capacitación de mañana a las 10?", mine: false, time: "Hoy · 9:12" },
      { id: "cm2", from: "Tú", text: "Sí, ya tengo el material descargado en la app.", mine: true, time: "Hoy · 9:15" },
      { id: "cm3", from: "Laura Méndez", text: "Perfecto, yo llevo la lista de asistencia.", mine: false, time: "Hoy · 9:20" },
    ],
  },
  {
    id: "room2",
    name: "Simón Cohen",
    isGroup: false,
    participants: ["Ricardo Jafif Pereyra", "Simón Cohen"],
    messages: [{ id: "cm4", from: "Simón Cohen", text: "¡Gracias por el apoyo de ayer!", mine: false, time: "Ayer · 18:40" }],
  },
];

// ---- Terminos y privacidad ----

export const legalDocument = {
  title: "Términos y condiciones de uso · Paco App",
  issuer: "TBM, Sociedad Anónima Promotora de Inversión de Capital Variable",
  version: "2026.06",
  publishedAt: "1 de junio de 2026",
  signerRole: "Mandante",
  sections: [
    {
      heading: "1. Objeto del servicio",
      body: "Paco App es una plataforma de beneficios y salud financiera para colaboradores de empresas afiliadas. El uso de la aplicación implica la aceptación de los presentes términos, incluyendo el mandato de cobro y la domiciliación de los adelantos de nómina solicitados.",
    },
    {
      heading: "2. Mandato de cobro y domiciliación",
      body: "El colaborador instruye y autoriza a TBM, en su carácter de Mandante, a gestionar el cobro de los montos dispersados más las comisiones pactadas por convenio, mediante retención de nómina o cargo a la cuenta registrada.",
    },
    {
      heading: "3. Información crediticia",
      body: "El colaborador autoriza la consulta y reporte de su información ante sociedades de información crediticia exclusivamente para la operación de los servicios financieros contratados.",
    },
    {
      heading: "4. Privacidad y datos personales",
      body: "Los datos personales se tratan conforme al Aviso de Privacidad disponible en paco.mx/privacidad. La información de salud emocional (estado de ánimo) se reporta a la empresa únicamente de forma agregada y anónima.",
    },
    {
      heading: "5. Soporte y aclaraciones",
      body: "Cualquier aclaración puede levantarse desde los canales de soporte de la aplicación: preguntas frecuentes, WhatsApp o chat de soporte técnico, con folio de seguimiento.",
    },
  ],
} as const;
