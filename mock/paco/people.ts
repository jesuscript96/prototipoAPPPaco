// Dominio personas y RH: estado de animo, encuestas, voz del colaborador,
// reconocimientos, solicitudes y onboarding de tareas.

import type { Tone } from "./core";

// ---- Estado de animo ----

export const moodLevels = [
  { score: 0, label: "Muy mal", color: "#dc2626" },
  { score: 25, label: "Mal", color: "#ea580c" },
  { score: 50, label: "Regular", color: "#d97706" },
  { score: 75, label: "Bien", color: "#65a30d" },
  { score: 100, label: "Muy bien", color: "#16a34a" },
] as const;

export const baseFeelings = ["Alivio", "Confianza", "Diversión", "Esperanza", "Gratitud", "Satisfacción", "Frustración", "Estrés"] as const;

export const extraFeelings = ["Molestia", "Celos", "Culpa", "Sorpresa", "Desesperanza", "Irritabilidad", "Soledad", "Desaliento", "Decepción", "Orgullo", "Calma", "Entusiasmo"] as const;

export const moodFactors = [
  "Salud", "Condición física", "Cuidado personal", "Pasatiempos", "Identidad", "Espiritualidad",
  "Comunidad", "Familia", "Amistades", "Pareja", "Vida sentimental", "Quehaceres",
  "Trabajo", "Educación", "Viajes", "Clima", "Dinero", "Sucesos actuales",
] as const;

export type MoodEntry = {
  id: string;
  dateLabel: string;
  weeksAgo: number;
  score: number;
  feelings: string[];
  factors: string[];
};

export const seedMoodEntries: MoodEntry[] = [
  { id: "md1", dateLabel: "Mar 9 jun", weeksAgo: 0, score: 75, feelings: ["Confianza", "Gratitud"], factors: ["Trabajo", "Familia"] },
  { id: "md2", dateLabel: "Lun 8 jun", weeksAgo: 0, score: 50, feelings: ["Estrés"], factors: ["Dinero", "Trabajo"] },
  { id: "md3", dateLabel: "Vie 5 jun", weeksAgo: 0, score: 100, feelings: ["Satisfacción", "Diversión"], factors: ["Amistades"] },
  { id: "md4", dateLabel: "Jue 4 jun", weeksAgo: 0, score: 75, feelings: ["Esperanza"], factors: ["Salud"] },
  { id: "md5", dateLabel: "Lun 1 jun", weeksAgo: 1, score: 50, feelings: ["Frustración", "Estrés"], factors: ["Trabajo", "Sucesos actuales"] },
  { id: "md6", dateLabel: "Mié 27 may", weeksAgo: 2, score: 25, feelings: ["Frustración"], factors: ["Trabajo", "Dinero"] },
  { id: "md7", dateLabel: "Vie 22 may", weeksAgo: 2, score: 75, feelings: ["Alivio", "Gratitud"], factors: ["Familia"] },
  { id: "md8", dateLabel: "Lun 18 may", weeksAgo: 3, score: 50, feelings: ["Estrés"], factors: ["Quehaceres"] },
];

// ---- Encuestas ----

export type SurveyQuestion = {
  id: string;
  text: string;
  kind: "yesno" | "single" | "multi" | "scale" | "open";
  options?: string[];
};

export type Survey = {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
  due: string;
  questions: SurveyQuestion[];
};

export const surveys: Survey[] = [
  {
    id: "nom035",
    title: "Guía de Referencia I · NOM-035",
    description: "Cuestionario para identificar a los trabajadores que fueron sujetos a acontecimientos traumáticos severos. Es obligatoria: bloquea la navegación hasta completarse.",
    mandatory: true,
    due: "Vence en 22 días",
    questions: [
      { id: "q1", text: "¿Has presenciado o vivido un acontecimiento que ponga en riesgo tu vida durante tu jornada laboral?", kind: "yesno" },
      { id: "q2", text: "¿Tu carga de trabajo actual te parece manejable?", kind: "single", options: ["Siempre", "Casi siempre", "A veces", "Casi nunca"] },
      { id: "q3", text: "¿Qué factores afectan más tu desempeño esta semana?", kind: "multi", options: ["Carga de trabajo", "Horarios", "Comunicación con mi líder", "Herramientas", "Ninguno"] },
      { id: "q4", text: "Del 1 al 5, ¿qué tanto apoyo sientes de tu equipo directo?", kind: "scale", options: ["1", "2", "3", "4", "5"] },
      { id: "q5", text: "¿Quieres agregar algún comentario para Recursos Humanos?", kind: "open" },
    ],
  },
  {
    id: "clima-junio",
    title: "Clima laboral · junio 2026",
    description: "Encuesta mensual programada por tu empresa para medir comunicación y ambiente.",
    mandatory: false,
    due: "Disponible hasta el 14 jun",
    questions: [
      { id: "q1", text: "¿Cómo calificas la comunicación interna este mes?", kind: "scale", options: ["1", "2", "3", "4", "5"] },
      { id: "q2", text: "¿Recibiste retroalimentación útil de tu líder?", kind: "yesno" },
      { id: "q3", text: "¿Qué mejorarías primero?", kind: "single", options: ["Juntas más cortas", "Mejores herramientas", "Más reconocimiento", "Flexibilidad de horario"] },
    ],
  },
];

// ---- Voz del colaborador ----

export type VoiceCategory = { id: string; name: string; description: string };

export const voiceCategories: VoiceCategory[] = [
  { id: "abuso", name: "Abuso de autoridad", description: "Uso indebido de una posición de jerarquía para presionar, amenazar o condicionar tu trabajo." },
  { id: "acoso-laboral", name: "Acoso laboral", description: "Conductas repetidas de hostigamiento, exclusión o humillación que afectan tu entorno de trabajo." },
  { id: "acoso-sexual", name: "Acoso sexual", description: "Canal confidencial para reportar conductas de carácter sexual no deseadas. Tu identidad puede mantenerse anónima." },
  { id: "agradecimiento", name: "Agradecimiento", description: "Reconoce apoyo o atención extraordinaria de alguien de la empresa." },
  { id: "clima", name: "Clima laboral", description: "Situaciones que afectan la convivencia, colaboración o bienestar del equipo." },
  { id: "conflicto", name: "Conflicto de interés", description: "Situaciones donde intereses personales podrían afectar decisiones de la empresa." },
  { id: "discriminacion", name: "Discriminación", description: "Tratos desiguales por género, edad, religión, orientación, apariencia o cualquier otra condición." },
  { id: "higiene", name: "Higiene y seguridad", description: "Riesgos físicos, instalaciones inseguras o falta de equipo de protección." },
  { id: "innovacion", name: "Innovación", description: "Propón mejoras para procesos, herramientas o experiencia del colaborador." },
];

export type ChatMessage = {
  id: string;
  from: string;
  text: string;
  mine: boolean;
  time: string;
  attachment?: string;
};

export type VoiceStatus = "Pendiente" | "En proceso" | "Atendido";

export type VoiceReport = {
  id: string;
  folio: string;
  categoryId: string;
  categoryName: string;
  title: string;
  status: VoiceStatus;
  anonymous: boolean;
  createdAt: string;
  unread: boolean;
  messages: ChatMessage[];
};

export const seedVoiceReports: VoiceReport[] = [
  {
    id: "vr1",
    folio: "CLM-204",
    categoryId: "clima",
    categoryName: "Clima laboral",
    title: "Tensión en turno vespertino",
    status: "En proceso",
    anonymous: true,
    createdAt: "8 jun 2026",
    unread: true,
    messages: [
      { id: "vm1", from: "Tú", text: "Quiero reportar tensión frecuente entre supervisores y personal del turno vespertino.", mine: true, time: "8 jun · 16:20" },
      { id: "vm2", from: "Recursos Humanos", text: "Gracias por levantar este reporte. Estamos revisando el caso con total confidencialidad. ¿Podrías indicarnos desde cuándo notas esta situación?", mine: false, time: "9 jun · 10:05" },
    ],
  },
  {
    id: "vr2",
    folio: "AGR-118",
    categoryId: "agradecimiento",
    categoryName: "Agradecimiento",
    title: "Apoyo de soporte en cierre de mes",
    status: "Atendido",
    anonymous: false,
    createdAt: "29 may 2026",
    unread: false,
    messages: [
      { id: "vm3", from: "Tú", text: "Quiero agradecer a Orlando Luna por quedarse a apoyar el cierre de mes.", mine: true, time: "29 may · 18:40" },
      { id: "vm4", from: "Recursos Humanos", text: "¡Gracias por compartirlo! El reconocimiento ya fue comunicado a su líder directo.", mine: false, time: "30 may · 9:12" },
    ],
  },
  {
    id: "vr3",
    folio: "HIG-097",
    categoryId: "higiene",
    categoryName: "Higiene y seguridad",
    title: "Extintor caducado en bodega",
    status: "Pendiente",
    anonymous: false,
    createdAt: "9 jun 2026",
    unread: false,
    messages: [
      { id: "vm5", from: "Tú", text: "El extintor de la bodega 2 muestra fecha de recarga vencida desde abril.", mine: true, time: "9 jun · 11:30", attachment: "foto-extintor.jpg" },
    ],
  },
];

// ---- Reconocimientos ----

export type RecognitionBadge = { id: string; name: string; description: string };

export const recognitionBadges: RecognitionBadge[] = [
  { id: "servicio", name: "Actitud de servicio", description: "Contar con la disposición permanente de apoyar al cliente interno y/o externo." },
  { id: "cambio", name: "Adaptación al cambio", description: "Capacidad de adaptación a los cambios organizacionales con apertura y flexibilidad." },
  { id: "compromiso", name: "Compromiso", description: "Identificarse con las metas de la empresa, hacerlas propias y cumplirlas." },
  { id: "confianza", name: "Confianza", description: "Asegurar la confiabilidad del servicio y fortalecer la relación con el equipo." },
  { id: "excelencia", name: "Excelencia", description: "Esfuerzo continuo en cumplir con las especificaciones y superarlas." },
  { id: "integridad", name: "Integridad", description: "Rectitud y coherencia con los valores propios de la empresa." },
  { id: "iniciativa", name: "Iniciativa", description: "Buscar soluciones: el punto de partida para encontrar el 'cómo sí'." },
];

export type Recognition = {
  id: string;
  badgeId: string;
  badgeName: string;
  direction: "Recibido" | "Enviado";
  person: string;
  reason: string;
  date: string;
  origin: "Colaborador" | "Sistema";
};

export const seedRecognitions: Recognition[] = [
  { id: "rec1", badgeId: "excelencia", badgeName: "Excelencia", direction: "Recibido", person: "Andrea Lara", reason: "Por completar el Curso test dc3 al 100%.", date: "8 jun · 10:24", origin: "Sistema" },
  { id: "rec2", badgeId: "compromiso", badgeName: "Compromiso", direction: "Recibido", person: "Jorge Patiño", reason: "Por cubrir el inventario del fin de semana.", date: "30 may · 17:45", origin: "Colaborador" },
  { id: "rec3", badgeId: "iniciativa", badgeName: "Iniciativa", direction: "Enviado", person: "Orlando Luna", reason: "Porque siempre busca resolver.", date: "27 may · 13:32", origin: "Colaborador" },
];

// ---- Solicitudes ----

export type RequestQuestion = {
  id: string;
  text: string;
  kind: "open" | "yesno" | "single";
  options?: string[];
};

export type RequestType = {
  id: string;
  name: string;
  category: "Permiso con goce de sueldo" | "Permisos" | "Vacaciones" | "Incapacidades";
  description: string;
  approvalDays: number;
  questions: RequestQuestion[];
};

export const requestTypes: RequestType[] = [
  {
    id: "vacuna",
    name: "Vacuna Covid",
    category: "Permiso con goce de sueldo",
    description: "Permiso para asistir a tu cita de vacunación sin descuento de sueldo. Recuerda presentar tu comprobante al regresar.",
    approvalDays: 4,
    questions: [
      { id: "rq1", text: "¿Cuál vacuna te van a poner?", kind: "open" },
      { id: "rq2", text: "Al día de hoy, ¿ya has recibido alguna dosis de la vacuna contra el COVID-19?", kind: "yesno" },
      { id: "rq3", text: "¿Qué vacuna te gustaría recibir?", kind: "single", options: ["Moderna", "Pfizer", "Astra Zeneca", "Sputnik"] },
    ],
  },
  {
    id: "salir-temprano",
    name: "Salir temprano",
    category: "Permisos",
    description: "Solicitud para ausentarte parcialmente de tu jornada. Requiere visto bueno de tu jefe directo.",
    approvalDays: 2,
    questions: [
      { id: "rq1", text: "¿A qué hora necesitas salir?", kind: "single", options: ["13:00", "14:00", "15:00", "16:00"] },
      { id: "rq2", text: "Describe brevemente el motivo", kind: "open" },
    ],
  },
  {
    id: "vacaciones",
    name: "Vacaciones",
    category: "Vacaciones",
    description: "Usa tus días de vacaciones disponibles. Tienes 8 días vigentes del periodo 2026.",
    approvalDays: 5,
    questions: [
      { id: "rq1", text: "¿Dejarás pendientes asignados a alguien más?", kind: "yesno" },
      { id: "rq2", text: "¿Quién cubrirá tus actividades?", kind: "open" },
    ],
  },
  {
    id: "dias-personales",
    name: "Días personales",
    category: "Vacaciones",
    description: "Días libres por asuntos personales según tu contrato colectivo. Máximo 2 por trimestre.",
    approvalDays: 3,
    questions: [
      { id: "rq1", text: "Motivo del día personal", kind: "open" },
      { id: "rq2", text: "¿Es una emergencia familiar?", kind: "yesno" },
    ],
  },
  {
    id: "incapacidad",
    name: "Incapacidad IMSS",
    category: "Incapacidades",
    description: "Registra tu incapacidad expedida por el IMSS. Deberás adjuntar el folio de tu certificado.",
    approvalDays: 1,
    questions: [
      { id: "rq1", text: "Folio del certificado de incapacidad", kind: "open" },
      { id: "rq2", text: "Tipo de incapacidad", kind: "single", options: ["Enfermedad general", "Riesgo de trabajo", "Maternidad"] },
    ],
  },
];

export type EmployeeRequest = {
  id: string;
  typeId: string;
  typeName: string;
  category: string;
  status: "No iniciada" | "En evaluación" | "Aprobada" | "Rechazada";
  startDate: string;
  endDate: string;
  answers: { question: string; answer: string }[];
  comments: string;
  currentStage: number;
  stages: string[];
  createdAt: string;
};

export const seedRequests: EmployeeRequest[] = [
  {
    id: "req1",
    typeId: "salir-temprano",
    typeName: "Salir temprano",
    category: "Permisos",
    status: "Aprobada",
    startDate: "3 jun 2026",
    endDate: "3 jun 2026",
    answers: [
      { question: "¿A qué hora necesitas salir?", answer: "15:00" },
      { question: "Describe brevemente el motivo", answer: "Trámite bancario personal." },
    ],
    comments: "",
    currentStage: 3,
    stages: ["Etapa 1 · Jefe directo", "Etapa 2 · Recursos Humanos", "Etapa 3 · Registro en nómina"],
    createdAt: "1 jun 2026",
  },
  {
    id: "req2",
    typeId: "dias-personales",
    typeName: "Días personales",
    category: "Vacaciones",
    status: "Rechazada",
    startDate: "25 may 2026",
    endDate: "25 may 2026",
    answers: [
      { question: "Motivo del día personal", answer: "Mudanza" },
      { question: "¿Es una emergencia familiar?", answer: "No" },
    ],
    comments: "Aviso con poco tiempo, lo siento.",
    currentStage: 2,
    stages: ["Etapa 1 · Jefe directo", "Etapa 2 · Recursos Humanos"],
    createdAt: "22 may 2026",
  },
];

// ---- Onboarding de tareas ----

export type OnboardingMaterial = { name: string; type: "PDF" | "Video" | "Audio" | "Imagen" | "Word"; size: string };

export type OnboardingTask = {
  id: string;
  kind: "Mensaje" | "Examen" | "Material";
  title: string;
  description: string;
  scheduledFor: string;
  due: string;
  dueTone: Tone;
  mentor?: string;
  materials: OnboardingMaterial[];
  examQuestions?: RequestQuestion[];
};

export const onboardingTasks: OnboardingTask[] = [
  {
    id: "ot1",
    kind: "Mensaje",
    title: "Lee la bienvenida de tu Gerente de Cultura",
    description: "Andrea Lara te comparte el plan de incorporación de tus primeras dos semanas, los rituales del equipo y a quién acudir según el tema.",
    scheduledFor: "Día 1 · 8 jun",
    due: "Hoy 18:00",
    dueTone: "warning",
    materials: [{ name: "Bienvenida-Paco.png", type: "Imagen", size: "420 KB" }],
  },
  {
    id: "ot2",
    kind: "Examen",
    title: "Examen de políticas internas",
    description: "Responde el cuestionario sobre el reglamento interior. Tu mentor revisará y calificará tus respuestas.",
    scheduledFor: "Día 3 · 10 jun",
    due: "Viernes 12 jun",
    dueTone: "info",
    mentor: "Andrea Lara",
    materials: [],
    examQuestions: [
      { id: "oq1", text: "¿Cuál es el horario de tolerancia de entrada?", kind: "single", options: ["5 minutos", "10 minutos", "15 minutos"] },
      { id: "oq2", text: "¿Se puede compartir tu credencial de acceso?", kind: "yesno" },
      { id: "oq3", text: "Describe el procedimiento si detectas un riesgo de seguridad", kind: "open" },
    ],
  },
  {
    id: "ot3",
    kind: "Material",
    title: "Estudia el manual de seguridad de sucursal",
    description: "Material didáctico descargable. Tu mentor confirmará que lo revisaste en la sesión semanal.",
    scheduledFor: "Día 5 · 12 jun",
    due: "Domingo 14 jun",
    dueTone: "neutral",
    mentor: "Orlando Luna",
    materials: [
      { name: "Manual-de-seguridad.pdf", type: "PDF", size: "1.6 MB" },
      { name: "Induccion-sucursal.mp4", type: "Video", size: "12 min" },
      { name: "Audio-bienvenida.mp3", type: "Audio", size: "3 min" },
    ],
  },
];
