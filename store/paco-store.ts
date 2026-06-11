import { create } from "zustand";
import {
  BankAccount,
  ChatRoom,
  EmployeeRequest,
  Movement,
  MoodEntry,
  PacoNotification,
  Recognition,
  VoiceReport,
  employee,
  seedAccounts,
  seedChatRooms,
  seedMoodEntries,
  seedMovements,
  seedNotifications,
  seedReceipts,
  seedRecognitions,
  seedRequests,
  seedSuaLetters,
  seedVoiceReports,
} from "@/mock/paco";

let counter = 100;
const uid = (prefix: string) => `${prefix}-${counter++}`;

export const nowLabel = () => {
  const now = new Date();
  const hh = `${now.getHours()}`.padStart(2, "0");
  const mm = `${now.getMinutes()}`.padStart(2, "0");
  return `Hoy · ${hh}:${mm}`;
};

export type LessonState = {
  recordingDone: boolean;
  uploadDone: boolean;
  activitySent: boolean;
  completed: boolean;
};

export type TicketMessage = { id: string; from: string; text: string; mine: boolean; time: string };

export type PacoState = {
  // sesion y permisos
  permissionNotifications: boolean;
  permissionLocation: boolean;
  loggedIn: boolean;
  activationSent: boolean;
  recoverySent: boolean;
  profilePhotoSet: boolean;
  // encuestas
  completedSurveyIds: string[];
  surveyAnswers: Record<string, Record<string, string>>;
  // notificaciones
  notifications: PacoNotification[];
  // mood
  moodEntries: MoodEntry[];
  moodRegisteredToday: boolean;
  // celebraciones
  congratulatedIds: string[];
  // finanzas
  accounts: BankAccount[];
  kycDone: boolean;
  movements: Movement[];
  advanceCount: number;
  // onboarding tareas
  onboardingStatus: Record<string, "Pendiente" | "Enviada" | "Por calificar" | "Completada">;
  // voz
  voiceReports: VoiceReport[];
  // reconocimientos
  recognitions: Recognition[];
  // solicitudes
  requests: EmployeeRequest[];
  // comunicacion / contenidos
  readCommIds: string[];
  downloadedFiles: string[];
  // documentos
  docStatus: Record<string, "Generado" | "Firmado" | "Subido">;
  signedReceiptIds: string[];
  certificateDownloaded: boolean;
  signedSuaIds: string[];
  cvUploaded: boolean;
  contractUploaded: boolean;
  // capacitacion
  downloadedCourses: string[];
  lessonStates: Record<string, LessonState>;
  evaluationDone: Record<string, boolean>;
  satisfactionDone: Record<string, boolean>;
  finishedCourses: string[];
  pendingSync: string[];
  // perfil editable
  email: string;
  phone: string;
  // seguridad
  passwordChangedAt: string | null;
  nipRecoverySent: boolean;
  nipChangedAt: string | null;
  logoutAllDone: boolean;
  deletionRequested: boolean;
  // soporte
  ticketCreated: boolean;
  ticketMessages: TicketMessage[];
  escalated: boolean;
  // chat interno
  chatRooms: ChatRoom[];
  // legal
  legalAccepted: boolean;
  legalAcceptedAt: string | null;
  // toast global
  toast: string | null;
  toastStamp: number;

  // acciones
  showToast: (message: string) => void;
  clearToast: () => void;
  grantPermissions: () => void;
  grantNotificationPermission: () => void;
  grantLocationPermission: () => void;
  login: () => void;
  logout: () => void;
  logoutAll: () => void;
  sendActivation: () => void;
  sendRecovery: () => void;
  setProfilePhoto: () => void;
  requestDeletion: () => void;
  pushNotification: (n: Omit<PacoNotification, "id" | "read" | "time">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
  completeSurvey: (surveyId: string, answers: Record<string, string>) => void;
  registerMood: (score: number, feelings: string[], factors: string[]) => void;
  congratulate: (celebrationId: string, name: string) => void;
  completeKyc: () => void;
  addAccount: (account: Omit<BankAccount, "id" | "masked">) => void;
  removeAccount: (id: string) => void;
  confirmAdvance: (amount: number, commission: number, accountAlias: string) => void;
  confirmTopup: (operator: string, kind: string, amount: number, phone: string) => void;
  confirmServicePayment: (provider: string, amount: number, commission: number, reference: string, method: string) => void;
  submitOnboardingTask: (taskId: string, needsMentor: boolean) => void;
  submitVoiceReport: (categoryId: string, categoryName: string, title: string, comment: string, anonymous: boolean, attachment: string | null) => string;
  sendVoiceMessage: (reportId: string, text: string, attachment?: string) => void;
  markVoiceRead: (reportId: string) => void;
  receiveRhReply: (reportId: string, text: string) => void;
  sendRecognition: (badgeId: string, badgeName: string, person: string, reason: string) => void;
  addSystemRecognition: (badgeName: string, reason: string) => void;
  createRequest: (request: Omit<EmployeeRequest, "id" | "status" | "currentStage" | "createdAt">) => void;
  updateRequestDates: (id: string, startDate: string, endDate: string, comments: string) => void;
  deleteRequest: (id: string) => void;
  markCommRead: (id: string) => void;
  downloadFile: (name: string) => void;
  generateDocument: (id: string) => void;
  signDocument: (id: string) => void;
  signReceipt: (id: string) => void;
  signAllReceipts: (ids: string[]) => void;
  downloadCertificate: () => void;
  signSua: (id: string) => void;
  uploadCv: () => void;
  uploadContract: () => void;
  updateEmail: (email: string) => void;
  updatePhone: (phone: string) => void;
  markCourseDownloaded: (courseId: string) => void;
  setLessonState: (courseId: string, lessonId: string, patch: Partial<LessonState>) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  completeEvaluation: (courseId: string) => void;
  completeSatisfaction: (courseId: string) => void;
  finishCourse: (courseId: string, courseTitle: string) => void;
  syncCourse: (courseId: string) => void;
  changePassword: () => void;
  recoverNip: () => void;
  changeNip: () => void;
  createTicket: (query: string) => void;
  sendTicketMessage: (text: string) => void;
  receiveBotReply: (text: string) => void;
  escalateTicket: () => void;
  createChatRoom: (name: string, participants: string[]) => string;
  sendChatMessage: (roomId: string, text: string, attachment?: string) => void;
  acceptLegal: () => void;
  resetDemo: () => void;
};

const initialState = () => ({
  permissionNotifications: false,
  permissionLocation: false,
  loggedIn: false,
  activationSent: false,
  recoverySent: false,
  profilePhotoSet: false,
  completedSurveyIds: [] as string[],
  surveyAnswers: {} as Record<string, Record<string, string>>,
  notifications: seedNotifications.map((n) => ({ ...n })),
  moodEntries: seedMoodEntries.map((m) => ({ ...m })),
  moodRegisteredToday: false,
  congratulatedIds: [] as string[],
  accounts: seedAccounts.map((a) => ({ ...a })),
  kycDone: false,
  movements: seedMovements.map((m) => ({ ...m })),
  advanceCount: 1,
  onboardingStatus: {} as Record<string, "Pendiente" | "Enviada" | "Por calificar" | "Completada">,
  voiceReports: seedVoiceReports.map((r) => ({ ...r, messages: [...r.messages] })),
  recognitions: seedRecognitions.map((r) => ({ ...r })),
  requests: seedRequests.map((r) => ({ ...r, answers: [...r.answers], stages: [...r.stages] })),
  readCommIds: [] as string[],
  downloadedFiles: [] as string[],
  docStatus: {} as Record<string, "Generado" | "Firmado" | "Subido">,
  signedReceiptIds: seedReceipts.filter((r) => r.signed).map((r) => r.id),
  certificateDownloaded: false,
  signedSuaIds: seedSuaLetters.filter((s) => s.signed).map((s) => s.id),
  cvUploaded: false,
  contractUploaded: false,
  downloadedCourses: [] as string[],
  lessonStates: {} as Record<string, LessonState>,
  evaluationDone: {} as Record<string, boolean>,
  satisfactionDone: {} as Record<string, boolean>,
  finishedCourses: ["dc3"] as string[],
  pendingSync: [] as string[],
  email: employee.email,
  phone: employee.phone,
  passwordChangedAt: null as string | null,
  nipRecoverySent: false,
  nipChangedAt: null as string | null,
  logoutAllDone: false,
  deletionRequested: false,
  ticketCreated: false,
  ticketMessages: [] as TicketMessage[],
  escalated: false,
  chatRooms: seedChatRooms.map((r) => ({ ...r, messages: [...r.messages] })),
  legalAccepted: false,
  legalAcceptedAt: null as string | null,
  toast: null as string | null,
  toastStamp: 0,
});

export const usePacoStore = create<PacoState>((set, get) => ({
  ...initialState(),

  showToast: (message) => set({ toast: message, toastStamp: Date.now() }),
  clearToast: () => set({ toast: null }),

  grantPermissions: () =>
    set({ permissionNotifications: true, permissionLocation: true, toast: "Permisos de notificaciones y ubicación concedidos.", toastStamp: Date.now() }),
  grantNotificationPermission: () => set({ permissionNotifications: true }),
  grantLocationPermission: () => set({ permissionLocation: true }),
  login: () => set({ loggedIn: true }),
  logout: () => set({ loggedIn: false, toast: "Cerraste sesión en este dispositivo.", toastStamp: Date.now() }),
  logoutAll: () => set({ loggedIn: false, logoutAllDone: true, toast: "Sesión cerrada en todos los dispositivos vinculados.", toastStamp: Date.now() }),
  sendActivation: () => set({ activationSent: true }),
  sendRecovery: () => set({ recoverySent: true }),
  setProfilePhoto: () => set({ profilePhotoSet: true, toast: "Foto de perfil actualizada.", toastStamp: Date.now() }),
  requestDeletion: () => set({ deletionRequested: true, toast: "Solicitud de eliminación de cuenta registrada. RH te contactará.", toastStamp: Date.now() }),

  pushNotification: (n) =>
    set((s) => ({ notifications: [{ ...n, id: uid("n"), read: false, time: nowLabel() }, ...s.notifications] })),
  markNotificationRead: (id) =>
    set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  markAllNotificationsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })), toast: "Todas las notificaciones quedaron marcadas como leídas.", toastStamp: Date.now() })),
  deleteNotification: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  clearNotifications: () => set({ notifications: [], toast: "Se borraron todas las notificaciones.", toastStamp: Date.now() }),

  completeSurvey: (surveyId, answers) =>
    set((s) => ({
      completedSurveyIds: [...new Set([...s.completedSurveyIds, surveyId])],
      surveyAnswers: { ...s.surveyAnswers, [surveyId]: answers },
      notifications: surveyId === "nom035" ? s.notifications.map((n) => (n.id === "n1" ? { ...n, read: true } : n)) : s.notifications,
      toast: surveyId === "nom035" ? "Encuesta NOM-035 enviada. La navegación queda desbloqueada." : "Encuesta enviada. Gracias por participar.",
      toastStamp: Date.now(),
    })),

  registerMood: (score, feelings, factors) =>
    set((s) => ({
      moodEntries: [{ id: uid("md"), dateLabel: "Hoy · 10 jun", weeksAgo: 0, score, feelings, factors }, ...s.moodEntries],
      moodRegisteredToday: true,
      toast: "Tu registro ha sido exitoso.",
      toastStamp: Date.now(),
    })),

  congratulate: (celebrationId, name) =>
    set((s) => ({
      congratulatedIds: [...new Set([...s.congratulatedIds, celebrationId])],
      toast: `Felicitación enviada a ${name}.`,
      toastStamp: Date.now(),
    })),

  completeKyc: () => set({ kycDone: true }),

  addAccount: (account) =>
    set((s) => ({
      accounts: [
        ...s.accounts,
        {
          ...account,
          id: uid("ba"),
          masked: account.kind === "Cuenta" ? `CLABE •••• ${account.number.slice(-4)}` : `Tarjeta •••• ${account.number.slice(-4)}`,
        },
      ],
      toast: `${account.kind} "${account.alias}" agregada correctamente.`,
      toastStamp: Date.now(),
    })),
  removeAccount: (id) =>
    set((s) => ({ accounts: s.accounts.filter((a) => a.id !== id), toast: "Cuenta eliminada de tu registro.", toastStamp: Date.now() })),

  confirmAdvance: (amount, commission, accountAlias) => {
    set((s) => ({
      movements: [
        {
          id: uid("m"),
          concept: `Adelanto de nómina · ${accountAlias}`,
          category: "Adelanto de nómina" as const,
          amount,
          commission,
          period: "1Q junio 2026",
          date: "10 jun 2026",
          status: "Adeudo próximo" as const,
        },
        ...s.movements,
      ],
      advanceCount: s.advanceCount + 1,
      toast: `Adelanto de $${amount.toLocaleString("es-MX")} confirmado. Ya aparece en tu reporte de gastos.`,
      toastStamp: Date.now(),
    }));
    get().pushNotification({
      type: "Finanzas",
      title: "Adelanto dispersado",
      body: `Tu adelanto de $${amount.toLocaleString("es-MX")} fue enviado a tu cuenta. El cobro se aplicará en la nómina del 15 jun.`,
      tone: "success",
      href: "/(paco)/expenses",
    });
  },

  confirmTopup: (operator, kind, amount, phone) => {
    set((s) => ({
      movements: [
        {
          id: uid("m"),
          concept: `Recarga ${operator} ${phone}`,
          category: "Recarga" as const,
          amount,
          commission: 0,
          period: "1Q junio 2026",
          date: "10 jun 2026",
          status: "Procesado" as const,
        },
        ...s.movements,
      ],
      toast: `Recarga ${kind.toLowerCase()} de $${amount} a ${operator} aplicada.`,
      toastStamp: Date.now(),
    }));
  },

  confirmServicePayment: (provider, amount, commission, reference, method) => {
    set((s) => ({
      movements: [
        {
          id: uid("m"),
          concept: `Pago ${provider} ref ${reference.length > 10 ? `${reference.slice(0, 6)}…${reference.slice(-4)}` : reference}`,
          category: "Pago de servicio" as const,
          amount,
          commission,
          period: "1Q junio 2026",
          date: "10 jun 2026",
          status: "Procesado" as const,
        },
        ...s.movements,
      ],
      toast: `Pago a ${provider} por $${amount.toLocaleString("es-MX")} (${method}) exitoso.`,
      toastStamp: Date.now(),
    }));
  },

  submitOnboardingTask: (taskId, needsMentor) =>
    set((s) => ({
      onboardingStatus: { ...s.onboardingStatus, [taskId]: needsMentor ? "Por calificar" : "Completada" },
      toast: needsMentor ? "Avance enviado. Tu mentor lo calificará pronto." : "Tarea de onboarding completada.",
      toastStamp: Date.now(),
    })),

  submitVoiceReport: (categoryId, categoryName, title, comment, anonymous, attachment) => {
    const folio = `${categoryName.slice(0, 3).toUpperCase()}-${300 + Math.floor(Math.random() * 600)}`;
    const message = {
      id: uid("vm"),
      from: anonymous ? "Anónimo" : "Tú",
      text: comment,
      mine: true,
      time: nowLabel(),
      ...(attachment ? { attachment } : {}),
    };
    set((s) => ({
      voiceReports: [
        {
          id: uid("vr"),
          folio,
          categoryId,
          categoryName,
          title,
          status: "Pendiente" as const,
          anonymous,
          createdAt: "10 jun 2026",
          unread: false,
          messages: [message],
        },
        ...s.voiceReports,
      ],
      toast: `Reporte enviado a RH con folio ${folio}.`,
      toastStamp: Date.now(),
    }));
    return folio;
  },

  sendVoiceMessage: (reportId, text, attachment) =>
    set((s) => ({
      voiceReports: s.voiceReports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              messages: [...r.messages, { id: uid("vm"), from: "Tú", text, mine: true, time: nowLabel(), ...(attachment ? { attachment } : {}) }],
            }
          : r,
      ),
    })),

  markVoiceRead: (reportId) =>
    set((s) => ({ voiceReports: s.voiceReports.map((r) => (r.id === reportId ? { ...r, unread: false } : r)) })),

  receiveRhReply: (reportId, text) =>
    set((s) => ({
      voiceReports: s.voiceReports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: r.status === "Pendiente" ? ("En proceso" as const) : r.status,
              messages: [...r.messages, { id: uid("vm"), from: "Recursos Humanos", text, mine: false, time: nowLabel() }],
            }
          : r,
      ),
    })),

  sendRecognition: (badgeId, badgeName, person, reason) => {
    set((s) => ({
      recognitions: [
        { id: uid("rec"), badgeId, badgeName, direction: "Enviado" as const, person, reason, date: nowLabel(), origin: "Colaborador" as const },
        ...s.recognitions,
      ],
      toast: `Medalla de ${badgeName} enviada a ${person}.`,
      toastStamp: Date.now(),
    }));
  },

  addSystemRecognition: (badgeName, reason) =>
    set((s) => ({
      recognitions: [
        { id: uid("rec"), badgeId: "excelencia", badgeName, direction: "Recibido" as const, person: "Sistema Paco", reason, date: nowLabel(), origin: "Sistema" as const },
        ...s.recognitions,
      ],
    })),

  createRequest: (request) => {
    set((s) => ({
      requests: [
        { ...request, id: uid("req"), status: "No iniciada" as const, currentStage: 0, createdAt: "10 jun 2026" },
        ...s.requests,
      ],
      toast: "Solicitud creada. Podrás editarla mientras no inicie la evaluación.",
      toastStamp: Date.now(),
    }));
  },

  updateRequestDates: (id, startDate, endDate, comments) =>
    set((s) => ({
      requests: s.requests.map((r) => (r.id === id ? { ...r, startDate, endDate, comments } : r)),
      toast: "Solicitud actualizada.",
      toastStamp: Date.now(),
    })),

  deleteRequest: (id) =>
    set((s) => ({ requests: s.requests.filter((r) => r.id !== id), toast: "Solicitud eliminada.", toastStamp: Date.now() })),

  markCommRead: (id) => set((s) => ({ readCommIds: [...new Set([...s.readCommIds, id])] })),

  downloadFile: (name) =>
    set((s) => ({
      downloadedFiles: [...new Set([...s.downloadedFiles, name])],
      toast: `"${name}" descargado. Se abrirá con la app del sistema.`,
      toastStamp: Date.now(),
    })),

  generateDocument: (id) => set((s) => ({ docStatus: { ...s.docStatus, [id]: "Generado" } })),
  signDocument: (id) =>
    set((s) => ({
      docStatus: { ...s.docStatus, [id]: "Subido" },
      toast: "Documento firmado y subido automáticamente al panel de tu empresa.",
      toastStamp: Date.now(),
    })),

  signReceipt: (id) =>
    set((s) => ({
      signedReceiptIds: [...new Set([...s.signedReceiptIds, id])],
      toast: "Recibo firmado digitalmente vía FirmaMX.",
      toastStamp: Date.now(),
    })),
  signAllReceipts: (ids) =>
    set((s) => ({
      signedReceiptIds: [...new Set([...s.signedReceiptIds, ...ids])],
      toast: "Todos los recibos pendientes fueron firmados en lote.",
      toastStamp: Date.now(),
    })),
  downloadCertificate: () =>
    set({ certificateDownloaded: true, toast: "Certificado de firma digital descargado (CERT-2026-RJ109).", toastStamp: Date.now() }),
  signSua: (id) =>
    set((s) => ({ signedSuaIds: [...new Set([...s.signedSuaIds, id])], toast: "Carta SUA firmada correctamente.", toastStamp: Date.now() })),

  uploadCv: () => set({ cvUploaded: true, toast: "Currículum cargado a tu expediente.", toastStamp: Date.now() }),
  uploadContract: () => set({ contractUploaded: true, toast: "Contrato cargado a tu expediente.", toastStamp: Date.now() }),
  updateEmail: (email) => set({ email, toast: "Correo electrónico actualizado.", toastStamp: Date.now() }),
  updatePhone: (phone) => set({ phone, toast: "Teléfono celular actualizado.", toastStamp: Date.now() }),

  markCourseDownloaded: (courseId) =>
    set((s) => ({
      downloadedCourses: [...new Set([...s.downloadedCourses, courseId])],
      toast: "Curso descargado. Puedes avanzar sin conexión.",
      toastStamp: Date.now(),
    })),

  setLessonState: (courseId, lessonId, patch) =>
    set((s) => {
      const key = `${courseId}:${lessonId}`;
      const prev = s.lessonStates[key] ?? { recordingDone: false, uploadDone: false, activitySent: false, completed: false };
      return { lessonStates: { ...s.lessonStates, [key]: { ...prev, ...patch } } };
    }),

  completeLesson: (courseId, lessonId) => {
    get().setLessonState(courseId, lessonId, { completed: true });
    set((s) => ({
      pendingSync: s.downloadedCourses.includes(courseId) ? [...new Set([...s.pendingSync, courseId])] : s.pendingSync,
      toast: "Lección finalizada. Avance guardado.",
      toastStamp: Date.now(),
    }));
  },

  completeEvaluation: (courseId) =>
    set((s) => ({ evaluationDone: { ...s.evaluationDone, [courseId]: true }, toast: "Evaluación enviada.", toastStamp: Date.now() })),
  completeSatisfaction: (courseId) =>
    set((s) => ({ satisfactionDone: { ...s.satisfactionDone, [courseId]: true }, toast: "Encuesta de satisfacción enviada. ¡Gracias!", toastStamp: Date.now() })),

  finishCourse: (courseId, courseTitle) => {
    set((s) => ({
      finishedCourses: [...new Set([...s.finishedCourses, courseId])],
      toast: `¡Capacitación "${courseTitle}" finalizada al 100%!`,
      toastStamp: Date.now(),
    }));
    get().addSystemRecognition("Excelencia", `Por completar la capacitación "${courseTitle}".`);
    get().pushNotification({
      type: "Reconocimiento",
      title: "Nueva medalla de Excelencia",
      body: `El sistema te otorgó una medalla por finalizar "${courseTitle}".`,
      tone: "success",
      href: "/(paco)/recognitions",
    });
  },

  syncCourse: (courseId) =>
    set((s) => ({
      pendingSync: s.pendingSync.filter((id) => id !== courseId),
      toast: "Avance sincronizado con el panel de tu empresa.",
      toastStamp: Date.now(),
    })),

  changePassword: () => set({ passwordChangedAt: nowLabel(), toast: "Contraseña actualizada correctamente.", toastStamp: Date.now() }),
  recoverNip: () =>
    set({ nipRecoverySent: true, toast: "Te enviamos un código de verificación a tu correo para restablecer el NIP.", toastStamp: Date.now() }),
  changeNip: () => set({ nipChangedAt: nowLabel(), toast: "NIP de transacciones actualizado.", toastStamp: Date.now() }),

  createTicket: (query) =>
    set(() => ({
      ticketCreated: true,
      ticketMessages: [
        { id: uid("tk"), from: "Tú", text: query, mine: true, time: nowLabel() },
        {
          id: uid("tk"),
          from: "Bot Paco",
          text: "¡Hola! Soy el asistente de Paco. Ya abrí el ticket #PA-2086 con tu consulta. Un agente la revisará; mientras tanto puedo ayudarte con dudas frecuentes.",
          mine: false,
          time: nowLabel(),
        },
      ],
      toast: "Ticket #PA-2086 creado con soporte técnico.",
      toastStamp: Date.now(),
    })),
  sendTicketMessage: (text) =>
    set((s) => ({ ticketMessages: [...s.ticketMessages, { id: uid("tk"), from: "Tú", text, mine: true, time: nowLabel() }] })),
  receiveBotReply: (text) =>
    set((s) => ({ ticketMessages: [...s.ticketMessages, { id: uid("tk"), from: "Bot Paco", text, mine: false, time: nowLabel() }] })),
  escalateTicket: () =>
    set((s) => ({
      escalated: true,
      ticketMessages: [
        ...s.ticketMessages,
        { id: uid("tk"), from: "Agente · Mariana", text: "Hola, soy Mariana de soporte técnico. Ya tengo tu ticket #PA-2086, lo reviso y te confirmo en esta misma conversación.", mine: false, time: nowLabel() },
      ],
      toast: "Tu caso fue escalado a un agente humano.",
      toastStamp: Date.now(),
    })),

  createChatRoom: (name, participants) => {
    const id = uid("room");
    set((s) => ({
      chatRooms: [
        { id, name, isGroup: participants.length > 1, participants: ["Ricardo Jafif Pereyra", ...participants], messages: [] },
        ...s.chatRooms,
      ],
      toast: `Sala "${name}" creada con ${participants.length} participante(s).`,
      toastStamp: Date.now(),
    }));
    return id;
  },

  sendChatMessage: (roomId, text, attachment) =>
    set((s) => ({
      chatRooms: s.chatRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              messages: [
                ...room.messages,
                { id: uid("cm"), from: "Tú", text, mine: true, time: nowLabel(), ...(attachment ? { attachment } : {}) },
              ],
            }
          : room,
      ),
    })),

  acceptLegal: () =>
    set({ legalAccepted: true, legalAcceptedAt: "10 de junio de 2026 · " + nowLabel().replace("Hoy · ", ""), toast: "Términos firmados digitalmente.", toastStamp: Date.now() }),

  resetDemo: () => set({ ...initialState(), toast: "Demo reiniciada.", toastStamp: Date.now() }),
}));
