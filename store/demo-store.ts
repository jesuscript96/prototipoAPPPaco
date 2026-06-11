import { create } from "zustand";

export type DemoState = {
  filter: string;
  activeSegment: string;
  onboardingDone: boolean;
  simulatedSession: boolean;
  pacoSession: boolean;
  pacoPermissionsDone: boolean;
  mandatorySurveyDone: boolean;
  pacoToast: string;
  readNotificationIds: string[];
  completedOnboardingTaskIds: string[];
  payrollKycDone: boolean;
  payrollAdvanceSubmitted: boolean;
  moodSubmitted: boolean;
  feedbackSubmitted: boolean;
  recognitionSent: boolean;
  requestSubmitted: boolean;
  courseDownloaded: boolean;
  lessonCompleted: boolean;
  signedDocumentIds: string[];
  supportTicketCreated: boolean;
  chatMessages: string[];
  bankAccountAdded: boolean;
  legalAccepted: boolean;
  setFilter: (filter: string) => void;
  setActiveSegment: (segment: string) => void;
  completeOnboarding: () => void;
  toggleSession: () => void;
  grantPacoPermissions: () => void;
  startPacoSession: () => void;
  completeMandatorySurvey: () => void;
  markAllPacoNotificationsRead: () => void;
  completeOnboardingTask: (id: string) => void;
  completePayrollKyc: () => void;
  submitPayrollAdvance: () => void;
  submitMood: () => void;
  submitFeedbackReport: () => void;
  sendRecognition: () => void;
  submitEmployeeRequest: () => void;
  downloadCourse: () => void;
  completeLesson: () => void;
  signDocument: (id: string) => void;
  createSupportTicket: () => void;
  sendChatMessage: (message: string) => void;
  addBankAccount: () => void;
  acceptLegal: () => void;
  clearPacoToast: () => void;
};

export const useDemoStore = create<DemoState>((set) => ({
  filter: "",
  activeSegment: "Todos",
  onboardingDone: false,
  simulatedSession: false,
  pacoSession: false,
  pacoPermissionsDone: false,
  mandatorySurveyDone: false,
  pacoToast: "",
  readNotificationIds: [],
  completedOnboardingTaskIds: [],
  payrollKycDone: false,
  payrollAdvanceSubmitted: false,
  moodSubmitted: false,
  feedbackSubmitted: false,
  recognitionSent: false,
  requestSubmitted: false,
  courseDownloaded: false,
  lessonCompleted: false,
  signedDocumentIds: [],
  supportTicketCreated: false,
  chatMessages: [],
  bankAccountAdded: false,
  legalAccepted: false,
  setFilter: (filter) => set({ filter }),
  setActiveSegment: (activeSegment) => set({ activeSegment }),
  completeOnboarding: () => set({ onboardingDone: true }),
  toggleSession: () => set((state) => ({ simulatedSession: !state.simulatedSession })),
  grantPacoPermissions: () => set({ pacoPermissionsDone: true, pacoToast: "Permisos de notificaciones y ubicación concedidos en modo demo." }),
  startPacoSession: () => set({ pacoSession: true, onboardingDone: true, pacoToast: "Sesión iniciada. Hay una encuesta obligatoria pendiente." }),
  completeMandatorySurvey: () => set({ mandatorySurveyDone: true, pacoToast: "Encuesta enviada. El dashboard queda desbloqueado." }),
  markAllPacoNotificationsRead: () => set({ readNotificationIds: ["n1", "n2", "n3", "n4", "n5"], pacoToast: "Todas las notificaciones fueron marcadas como leídas." }),
  completeOnboardingTask: (id) => set((state) => ({ completedOnboardingTaskIds: Array.from(new Set([...state.completedOnboardingTaskIds, id])), pacoToast: "Tarea de onboarding completada y notificada al mentor." })),
  completePayrollKyc: () => set({ payrollKycDone: true, pacoToast: "INE y selfie enviados a verificación de tercero. Identidad validada en modo demo." }),
  submitPayrollAdvance: () => set({ payrollAdvanceSubmitted: true, pacoToast: "Adelanto confirmado y reflejado en reporte de gastos." }),
  submitMood: () => set({ moodSubmitted: true, pacoToast: "Estado de ánimo registrado y agregado al histórico." }),
  submitFeedbackReport: () => set({ feedbackSubmitted: true, pacoToast: "Reporte enviado a Recursos Humanos con folio CLM-309." }),
  sendRecognition: () => set({ recognitionSent: true, pacoToast: "Medalla de Iniciativa enviada a Orlando Luna." }),
  submitEmployeeRequest: () => set({ requestSubmitted: true, pacoToast: "Solicitud creada. Podrás editarla mientras siga sin iniciar evaluación." }),
  downloadCourse: () => set({ courseDownloaded: true, pacoToast: "Curso descargado para uso sin conexión." }),
  completeLesson: () => set({ lessonCompleted: true, pacoToast: "Lección finalizada y avance sincronizado en modo demo." }),
  signDocument: (id) => set((state) => ({ signedDocumentIds: Array.from(new Set([...state.signedDocumentIds, id])), pacoToast: "Documento firmado y subido al panel mock." })),
  createSupportTicket: () => set({ supportTicketCreated: true, pacoToast: "Ticket técnico creado. Soporte responderá en esta conversación mock." }),
  sendChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message], pacoToast: "Mensaje enviado en chat interno." })),
  addBankAccount: () => set({ bankAccountAdded: true, pacoToast: "Cuenta CLABE agregada y verificada en modo demo." }),
  acceptLegal: () => set({ legalAccepted: true, pacoToast: "Términos firmados digitalmente." }),
  clearPacoToast: () => set({ pacoToast: "" }),
}));
