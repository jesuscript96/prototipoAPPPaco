export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export type PacoModuleId =
  | "notifications"
  | "employee-onboarding"
  | "surveys"
  | "mood"
  | "celebrations"
  | "payroll-advance"
  | "expenses"
  | "discount-club"
  | "topups"
  | "services"
  | "comms"
  | "voice"
  | "voice-status"
  | "recognitions"
  | "requests"
  | "wellness"
  | "document-requests"
  | "training"
  | "profile"
  | "corporate-docs"
  | "payroll-docs"
  | "settings"
  | "support"
  | "internal-chat"
  | "legal";

export type PacoModule = {
  id: PacoModuleId;
  title: string;
  subtitle: string;
  domain: "Finanzas" | "Personas y RH" | "Documentos" | "Soporte" | "Acceso";
  icon: string;
  priority: "P0" | "P1" | "P2" | "P3";
  pending?: string;
};

export const demoEmployee = {
  name: "Ricardo Jafif",
  preferredName: "Ricardo",
  email: "ricardo.jafif@empresa.mx",
  phone: "55 4123 7788",
  gender: "Masculino",
  birthDate: "1992-08-14",
  employeeNumber: "PAC-EMP-0427",
  rfc: "JAJR9208149K7",
  curp: "JAJR920814HDFLRC08",
  nss: "01929273451",
  hireDate: "2023-09-04",
  seniority: "2 años, 3 meses y 6 días",
  employer: "Servicios Corporativos La Central, S.A. de C.V.",
  payPeriod: "Quincenal",
  department: "Operaciones",
  area: "Experiencia del Colaborador",
  role: "Coordinador de Sucursal",
  salary: 18500,
  avatar: "RJ",
} as const;

export const companyConfig = {
  minimumSeniorityMonths: 3,
  payrollAdvanceCommissionRate: 0.08,
  serviceCommissionRate: 0.035,
  supportUrl: "https://ayuda.paco.mx",
  whatsappSupport: "+52 55 0000 7226",
  enabledModules: "Todos los modulos del prototipo habilitados",
} as const;

export const banners = [
  { title: "Beneficio destacado", subtitle: "Adelanto disponible hasta $2,500 para esta quincena.", moduleId: "payroll-advance" },
  { title: "NOM-035 pendiente", subtitle: "Tu empresa solicita responder una encuesta obligatoria hoy.", moduleId: "surveys" },
  { title: "Reconoce a tu equipo", subtitle: "Celebra a Orlando por su iniciativa esta semana.", moduleId: "recognitions" },
] satisfies Array<{ title: string; subtitle: string; moduleId: PacoModuleId }>;

export const pacoModules = [
  { id: "notifications", title: "Notificaciones", subtitle: "Encuestas, cursos, cumpleaños y avisos.", domain: "Acceso", icon: "Bell", priority: "P0", pending: "5 nuevas" },
  { id: "employee-onboarding", title: "Onboarding de tareas", subtitle: "Mensajes, encuestas, exámenes y material con mentor.", domain: "Personas y RH", icon: "ClipboardCheck", priority: "P0", pending: "3 tareas" },
  { id: "surveys", title: "Encuestas", subtitle: "NOM-035 y cuestionarios internos.", domain: "Personas y RH", icon: "ClipboardList", priority: "P0", pending: "Obligatoria" },
  { id: "mood", title: "Estado de ánimo", subtitle: "Registro diario, factores y gráficas.", domain: "Personas y RH", icon: "Smile", priority: "P1", pending: "Pendiente hoy" },
  { id: "celebrations", title: "Cumpleaños y aniversarios", subtitle: "Tabs, semana y medallas de antigüedad.", domain: "Personas y RH", icon: "Cake", priority: "P2" },
  { id: "payroll-advance", title: "Adelanto de nómina", subtitle: "Monto, comisión, legales y dispersión.", domain: "Finanzas", icon: "Wallet", priority: "P0", pending: "$2,500 disponibles" },
  { id: "expenses", title: "Reporte de gastos", subtitle: "Adeudos, historial, filtros y soporte.", domain: "Finanzas", icon: "PieChart", priority: "P1" },
  { id: "discount-club", title: "Club de Descuentos PiN", subtitle: "Cupones y promociones por ubicación.", domain: "Finanzas", icon: "Tags", priority: "P2" },
  { id: "topups", title: "Recargas telefónicas", subtitle: "Operadores, paquetes, teléfono y código.", domain: "Finanzas", icon: "Smartphone", priority: "P1" },
  { id: "services", title: "Pago de servicios", subtitle: "Referencia, cámara mock, KYC y desglose.", domain: "Finanzas", icon: "Receipt", priority: "P1" },
  { id: "comms", title: "Comunicación interna", subtitle: "Comunicados y adjuntos corporativos.", domain: "Documentos", icon: "Megaphone", priority: "P2" },
  { id: "voice", title: "Voz del colaborador", subtitle: "Reportes, anonimato y evidencia.", domain: "Personas y RH", icon: "MessageCircle", priority: "P1" },
  { id: "voice-status", title: "Estatus de voz", subtitle: "Semáforo, filtros y chat con RH.", domain: "Personas y RH", icon: "MessagesSquare", priority: "P1" },
  { id: "recognitions", title: "Reconoce a tu equipo", subtitle: "Medallas, destinatario, motivo e historial.", domain: "Personas y RH", icon: "Medal", priority: "P2" },
  { id: "requests", title: "Solicitudes", subtitle: "Vacaciones, permisos, cuestionarios y timeline.", domain: "Personas y RH", icon: "CalendarCheck", priority: "P1" },
  { id: "wellness", title: "Bienestar en línea", subtitle: "Mental, físico, financiero y emocional.", domain: "Documentos", icon: "HeartPulse", priority: "P3" },
  { id: "document-requests", title: "Solicitud de documentos", subtitle: "Generar, firmar y subir formatos.", domain: "Documentos", icon: "FileSignature", priority: "P2" },
  { id: "training", title: "Capacitaciones", subtitle: "Online/offline, lecciones y actividades.", domain: "Personas y RH", icon: "GraduationCap", priority: "P1", pending: "1 curso nuevo" },
  { id: "profile", title: "Mi expediente", subtitle: "Datos laborales, contrato y edición.", domain: "Soporte", icon: "User", priority: "P1" },
  { id: "corporate-docs", title: "Documentos corporativos", subtitle: "Políticas, manuales y descargas.", domain: "Documentos", icon: "FolderOpen", priority: "P3" },
  { id: "payroll-docs", title: "Recibos y cartas SUA", subtitle: "PDF, XML, firma individual y masiva.", domain: "Documentos", icon: "FileText", priority: "P2" },
  { id: "settings", title: "Configuración y seguridad", subtitle: "Foto, contraseña, NIP, cuentas y baja.", domain: "Soporte", icon: "Settings", priority: "P1" },
  { id: "support", title: "Soporte técnico", subtitle: "FAQ, WhatsApp y ticket conversacional.", domain: "Soporte", icon: "LifeBuoy", priority: "P2" },
  { id: "internal-chat", title: "Chat interno", subtitle: "Salas, mensajes, participantes y adjuntos.", domain: "Soporte", icon: "MessageSquarePlus", priority: "P2" },
  { id: "legal", title: "Términos y privacidad", subtitle: "Lectura, aceptación y firma digital mock.", domain: "Soporte", icon: "ShieldCheck", priority: "P0" },
] as const satisfies readonly PacoModule[];

export const notifications = [
  { id: "n1", type: "Encuesta", title: "Encuesta NOM-035 obligatoria", body: "Responde hoy para desbloquear el resto de la app.", time: "Hace 12 min", read: false, tone: "warning", moduleId: "surveys" },
  { id: "n2", type: "Onboarding", title: "Tienes una tarea de onboarding", body: "Tu mentor revisará el examen de inducción antes del viernes.", time: "Hoy", read: false, tone: "info", moduleId: "employee-onboarding" },
  { id: "n3", type: "Cumpleaños", title: "Amaury cumple años esta semana", body: "Felicítalo desde cumpleaños y aniversarios.", time: "Hoy", read: false, tone: "success", moduleId: "celebrations" },
  { id: "n4", type: "Voz", title: "RH respondió tu reporte", body: "Tu caso CLM-204 está en proceso.", time: "Ayer", read: false, tone: "info", moduleId: "voice-status" },
  { id: "n5", type: "Reconocimiento", title: "Recibiste una medalla", body: "Excelencia por completar Curso test dc3.", time: "Lun", read: true, tone: "success", moduleId: "recognitions" },
] satisfies Array<{ id: string; type: string; title: string; body: string; time: string; read: boolean; tone: Tone; moduleId: PacoModuleId }>;

export const onboardingTasks = [
  {
    id: "ot1",
    type: "Mensaje",
    title: "Lee la bienvenida de Recursos Humanos",
    dueDate: "Hoy 18:00",
    scheduledFor: "Día 1",
    mentor: "Andrea Lara",
    status: "Pendiente de lectura",
    materials: [{ title: "Bienvenida Paco", type: "Imagen", size: "420 KB" }],
  },
  {
    id: "ot2",
    type: "Encuesta / examen",
    title: "Examen de políticas internas",
    dueDate: "12 jun",
    scheduledFor: "Día 3",
    mentor: "Laura Méndez",
    status: "Mentor calificará",
    materials: [{ title: "Cuestionario de 8 preguntas", type: "Examen", size: "8 reactivos" }],
  },
  {
    id: "ot3",
    type: "Material didáctico",
    title: "Estudia manual de seguridad y descarga video",
    dueDate: "14 jun",
    scheduledFor: "Día 5",
    mentor: "Orlando Luna",
    status: "Vence pronto",
    materials: [
      { title: "Manual de seguridad.pdf", type: "PDF", size: "1.6 MB" },
      { title: "Inducción sucursal.mp4", type: "Video", size: "12 min" },
      { title: "Audio bienvenida.mp3", type: "Audio", size: "3 min" },
    ],
  },
] as const;

export const feelings = ["Alivio", "Confianza", "Diversión", "Esperanza", "Gratitud", "Satisfacción", "Frustración", "Estrés"] as const;
export const moodFactors = ["Salud", "Condición física", "Cuidado personal", "Pasatiempos", "Familia", "Trabajo", "Educación", "Dinero", "Sucesos actuales"] as const;
export const moodEntries = [
  { date: "Lun", score: 68, label: "Bien", feelings: ["Confianza", "Gratitud"], factors: ["Trabajo"] },
  { date: "Mar", score: 48, label: "Regular", feelings: ["Estrés"], factors: ["Dinero", "Trabajo"] },
  { date: "Mié", score: 78, label: "Muy bien", feelings: ["Satisfacción"], factors: ["Familia"] },
  { date: "Jue", score: 58, label: "Bien", feelings: ["Esperanza"], factors: ["Salud"] },
] as const;

export const celebrations = [
  { name: "Amaury González", type: "Cumpleaños", date: "5 de febrero", area: "Operaciones", years: undefined },
  { name: "Laura Méndez", type: "Aniversario", date: "6 de febrero", area: "Finanzas", years: 5 },
  { name: "Orlando Luna", type: "Aniversario", date: "7 de febrero", area: "Soporte", years: 4 },
  { name: "Simón Aguilar", type: "Cumpleaños", date: "Viernes", area: "Ventas", years: undefined },
] as const;

export const bankAccounts = [
  { id: "ba1", alias: "Nómina BBVA", bank: "BBVA", type: "CLABE", number: "012180001234567890", status: "Principal" },
  { id: "ba2", alias: "Débito Santander", bank: "Santander", type: "Tarjeta", number: "**** 4821", status: "Verificada" },
] as const;

export const payrollAdvance = {
  eligible: true,
  seniorityRule: "Mínimo 3 meses de contratación",
  min: 200,
  max: 2500,
  selected: 1200,
  commission: 96,
  net: 1104,
  requestedAt: "10 jun 2026",
  chargeDate: "15 jun 2026",
  account: bankAccounts[0],
  firstUseKycRequired: true,
  thirdPartyProvider: "Pasarela de pagos / verificación de identidad",
} as const;

export const expenses = [
  { id: "e1", type: "Adelanto de nómina", amount: 1200, commission: 96, period: "1Q junio", date: "10 jun", status: "Adeudo próximo" },
  { id: "e2", type: "Recarga Telcel", amount: 150, commission: 0, period: "1Q junio", date: "9 jun", status: "Procesado" },
  { id: "e3", type: "Pago CFE", amount: 820, commission: 28.7, period: "2Q mayo", date: "28 may", status: "Procesado" },
] as const;

export const topupOperators = [
  { name: "Telcel", types: ["Tiempo aire", "Datos"], amounts: [500, 300, 200, 150, 100, 50, 30, 20, 10] },
  { name: "AT&T", types: ["Tiempo aire", "Datos"], amounts: [300, 200, 150, 100, 50] },
  { name: "Movistar", types: ["Tiempo aire", "Datos"], amounts: [200, 150, 100, 50, 30] },
  { name: "Bait", types: ["Datos"], amounts: [200, 100, 50, 20] },
] as const;

export const serviceProviders = [
  { category: "Agua, luz y gas", name: "CFE", reference: "012345678901234567", amount: 820, method: "Adelanto de Nómina" },
  { category: "Televisión, telefonía e internet", name: "Telmex", reference: "5512345678", amount: 599, method: "Pago con Tarjeta" },
  { category: "Telepeaje", name: "PASE", reference: "TAG-778812", amount: 400, method: "Adelanto de Nómina" },
] as const;

export const kycSteps = ["INE frente", "INE reverso", "Selfie", "Código de validación"] as const;

export const discountCoupons = [
  { brand: "PiN Restaurantes", offer: "2x1 en menú ejecutivo", distance: "450 m", category: "Comida", expires: "Vence hoy" },
  { brand: "Farmacia Bienestar", offer: "15% en medicamentos OTC", distance: "1.2 km", category: "Salud", expires: "Vence 15 jun" },
  { brand: "Cine Centro", offer: "$69 boleto colaborador", distance: "2.4 km", category: "Entretenimiento", expires: "Vence domingo" },
] as const;

export const communications = [
  { title: "Política de vacaciones 2026", body: "Lineamientos actualizados para solicitudes y aprobaciones.", date: "10 jun", attachments: [{ name: "Politica-vacaciones.docx", size: "480 KB" }] },
  { title: "Manual de operación de sucursal", body: "Material obligatorio para coordinadores regionales.", date: "8 jun", attachments: [{ name: "Manual-operaciones.pptx", size: "2.1 MB" }] },
] as const;

export const surveys = [
  {
    id: "s1",
    title: "Encuesta NOM-035",
    mandatory: true,
    dueDate: "Hoy",
    questions: ["¿Tu carga de trabajo es manejable?", "¿Cuentas con apoyo de tu líder?", "¿Has vivido eventos traumáticos severos?"],
  },
  {
    id: "s2",
    title: "Clima laboral junio",
    mandatory: false,
    dueDate: "14 jun",
    questions: ["¿Cómo calificas la comunicación interna?", "¿Qué mejorarías este mes?"],
  },
] as const;

export const voiceCategories = [
  { name: "Abuso de autoridad", description: "Reporta uso indebido de jerarquía o presión laboral." },
  { name: "Acoso laboral", description: "Describe conductas repetidas que afecten tu entorno de trabajo." },
  { name: "Acoso sexual", description: "Canal confidencial para reportar conductas de carácter sexual no deseadas." },
  { name: "Agradecimiento", description: "Reconoce apoyo o atención extraordinaria de alguien de la empresa." },
  { name: "Clima laboral", description: "Comparte situaciones que afecten convivencia, colaboración o bienestar." },
  { name: "Innovación", description: "Propón mejoras para procesos, herramientas o experiencia del colaborador." },
] as const;

export const feedbackReports = [
  {
    id: "CLM-204",
    title: "Clima laboral en turno vespertino",
    category: "Clima laboral",
    status: "En proceso",
    tone: "warning",
    anonymous: true,
    messages: [
      { from: "Tú", text: "Quiero reportar tensión frecuente en el turno vespertino.", mine: true },
      { from: "Recursos Humanos", text: "Gracias, Ricardo. Estamos revisando el caso con confidencialidad.", mine: false },
    ],
  },
  {
    id: "AGR-118",
    title: "Agradecimiento a soporte",
    category: "Agradecimiento",
    status: "Atendido",
    tone: "success",
    anonymous: false,
    messages: [{ from: "Recursos Humanos", text: "El reconocimiento fue compartido con el equipo.", mine: false }],
  },
] as const;

export const recognitionBadges = [
  { name: "Actitud de servicio", description: "Disposición permanente para apoyar al cliente interno y externo." },
  { name: "Adaptación al cambio", description: "Capacidad para adoptar cambios organizacionales con apertura." },
  { name: "Compromiso", description: "Identificarse con las metas de la empresa y hacerlas propias." },
  { name: "Excelencia", description: "Esfuerzo continuo por cumplir con especificaciones y mejorar." },
  { name: "Iniciativa", description: "Buscar soluciones y encontrar el cómo sí." },
] as const;

export const recognitions = [
  { badge: "Excelencia", direction: "Recibido", person: "Andrea Lara", reason: "Completar Curso test dc3", date: "Hoy 10:24" },
  { badge: "Iniciativa", direction: "Enviado", person: "Orlando Luna", reason: "Siempre busca resolver", date: "Hoy 13:32" },
] as const;

export const requestTypes = [
  {
    name: "Vacuna Covid",
    category: "Vacaciones",
    description: "Permiso para asistir a vacunación programada.",
    questions: ["¿Cuál vacuna te van a poner?", "¿Ya has recibido alguna dosis contra COVID-19?", "¿Qué vacuna te gustaría recibir?"],
  },
  { name: "Salir temprano", category: "Permisos", description: "Solicitud para ausentarte parcialmente.", questions: ["Horario de salida", "Motivo"] },
  { name: "Días personales", category: "Vacaciones", description: "Uso de días disponibles.", questions: ["Motivo", "Contacto de emergencia"] },
] as const;

export const employeeRequests = [
  { title: "Vacuna Covid", status: "No iniciada", dates: "11 jun 2026", timeline: ["Etapa 1: RH", "Etapa 2: Jefe directo", "Etapa 3: Nómina"] },
  { title: "Salir temprano", status: "Aprobada", dates: "3 jun 2026", timeline: ["Aprobada por líder", "Registrada en RH"] },
  { title: "Días personales", status: "Rechazada", dates: "24 may 2026", timeline: ["Revisión RH", "Rechazada por operación"] },
] as const;

export const wellnessCategories = [
  { name: "Bienestar Mental", resources: [{ title: "Guía para manejar estrés", type: "PDF", size: "1.2 MB" }, { title: "Meditación guiada", type: "Video", size: "8 min" }] },
  { name: "Bienestar Físico", resources: [{ title: "Rutina de movilidad", type: "Video", size: "12 min" }] },
  { name: "Bienestar Financiero", resources: [{ title: "Presupuesto quincenal", type: "XLSX", size: "320 KB" }] },
  { name: "Bienestar Emocional", resources: [] },
] as const;

export const documentTemplates = [
  { folder: "Solicitudes", name: "Alta IMSS patronal", type: "PDF", status: "Listo para generar", requiresSignature: true },
  { folder: "Prueba GIM", name: "Certificado laboral", type: "PDF", status: "Pendiente de firma", requiresSignature: true },
] as const;

export const corporateDocuments = [
  { folder: "Políticas COVID", name: "Lineamientos COVID 2026.pdf", type: "PDF", status: "Vigente", size: "1.1 MB" },
  { folder: "Prestaciones y Beneficios", name: "Beneficios 2026.pptx", type: "PPTX", status: "Nuevo", size: "3.4 MB" },
  { folder: "Manual de Operaciones", name: "Apertura de sucursal.docx", type: "DOCX", status: "Compartido", size: "850 KB" },
] as const;

export const payrollReceipts = [
  { period: "1Q junio 2026", pdf: true, xml: true, signed: false, amount: "$9,250.00", certificate: "Certificado firma pendiente" },
  { period: "2Q mayo 2026", pdf: true, xml: true, signed: true, amount: "$9,250.00", certificate: "CERT-FIRMA-2026-052B" },
] as const;

export const employeeDigitalCard = {
  holder: demoEmployee.name,
  employeeNumber: demoEmployee.employeeNumber,
  role: demoEmployee.role,
  area: demoEmployee.area,
  employer: demoEmployee.employer,
  validity: "Vigente al 31 dic 2026",
  qr: "PACO-ID-RJ-0427",
} as const;

export const suaLetters = [
  { title: "Carta SUA mayo 2026", status: "Pendiente de firma" },
  { title: "Carta SUA abril 2026", status: "Firmada" },
] as const;

export const trainingCourses = [
  {
    title: "Seguridad en sucursal",
    status: "Pendiente",
    mode: "Offline",
    mandatory: true,
    progress: 0,
    downloaded: false,
    lessons: [
      { title: "1. Bienvenida", locked: false, activity: "Ver video y marcar finalizada" },
      { title: "2. Respuesta en incidentes", locked: true, activity: "Grabar audio .wav de evidencia" },
      { title: "3. Entregable final", locked: true, activity: "Subir PDF o imagen" },
    ],
  },
  {
    title: "Curso test dc3",
    status: "Finalizado",
    mode: "Online",
    mandatory: false,
    progress: 100,
    downloaded: true,
    lessons: [{ title: "Lección final", locked: false, activity: "Completada" }],
  },
] as const;

export const trainingEvaluations = [
  { question: "¿El contenido fue claro?", type: "Satisfacción", options: ["Excelente", "Bueno", "Regular"] },
  { question: "Selecciona el equipo de seguridad correcto", type: "Evaluación", options: ["Guantes y gafas", "Solo cubrebocas", "No aplica"] },
] as const;

export const supportTicket = {
  name: demoEmployee.name,
  email: demoEmployee.email,
  phone: demoEmployee.phone,
  query: "Necesito ayuda con mi adelanto de nómina.",
  status: "Listo para enviar",
} as const;

export const supportBot = {
  provider: "Zoho + bot Paco",
  greeting: "Hola, soy el bot de soporte Paco. Puedo ayudarte con adelanto, recargas, servicios o acceso.",
  escalation: "Si no resuelvo tu caso, abriré ticket con un agente técnico.",
  channels: ["FAQ", "WhatsApp", "Zoho chat", "Ticket panel"],
} as const;

export const chatRooms = [
  {
    name: "Equipo Operaciones",
    participants: ["Ricardo Jafif", "Simón Aguilar", "Laura Méndez"],
    messages: [
      { from: "Simón", text: "¿Confirmamos capacitación de mañana?", mine: false },
      { from: "Tú", text: "Sí, ya tengo el material descargado.", mine: true },
    ],
  },
] as const;

export const legalAcceptance = {
  document: "Términos y condiciones de uso Paco App",
  issuer: "TBM",
  signer: demoEmployee.name,
  role: "Mandante",
  acceptedAt: "10 jun 2026, 18:20",
  version: "2026.06",
} as const;
