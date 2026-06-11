import {
  Bell,
  Briefcase,
  ChartNoAxesCombined,
  ClipboardList,
  FileText,
  FolderOpen,
  Home,
  Inbox,
  Lock,
  Settings,
  ShieldAlert,
  User,
  WifiOff,
} from "lucide-react-native";

export const storybookSections = [
  {
    title: "Fundamentos visuales",
    subtitle: "Marca, color, tipografía, superficies y estados.",
    href: "/(storybook)/fundamentos",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Componentes base",
    subtitle: "Controles, feedback, overlays y composición móvil.",
    href: "/(storybook)/componentes",
    icon: ClipboardList,
  },
  {
    title: "Formularios",
    subtitle: "React Hook Form, Zod, validaciones y wizards.",
    href: "/(storybook)/formularios",
    icon: FileText,
  },
  {
    title: "Listas y datos",
    subtitle: "Búsqueda, filtros, refresh, infinite scroll y detalles.",
    href: "/(storybook)/listas",
    icon: FolderOpen,
  },
  {
    title: "Navegación móvil",
    subtitle: "Stacks, tabs, modales, rutas protegidas simuladas.",
    href: "/(storybook)/navegacion",
    icon: Home,
  },
] as const;

export const prototypeSections = [
  { title: "Dashboard", subtitle: "Home móvil con KPIs y actividad.", href: "/(prototype)/dashboard", icon: Home },
  { title: "Notificaciones", subtitle: "Centro de avisos accionables.", href: "/(prototype)/notificaciones", icon: Bell },
  { title: "Inbox", subtitle: "Conversación con adjuntos mock.", href: "/(prototype)/inbox", icon: Inbox },
  { title: "Perfil y ajustes", subtitle: "Usuario, preferencias y seguridad visual.", href: "/(prototype)/perfil", icon: User },
  { title: "CRUD móvil", subtitle: "Listado, detalle y crear/editar.", href: "/(prototype)/crud", icon: Briefcase },
  { title: "Documentos", subtitle: "Biblioteca con previews y estados.", href: "/(prototype)/documentos", icon: FileText },
  { title: "Reportes", subtitle: "Analytics simplificados para móvil.", href: "/(prototype)/reportes", icon: ChartNoAxesCombined },
  { title: "Estados de app", subtitle: "Sin acceso, offline, mantenimiento y error.", href: "/(prototype)/estados", icon: ShieldAlert },
  { title: "Onboarding y login", subtitle: "Flujos simulados sin autenticación real.", href: "/(prototype)/onboarding", icon: Lock },
  { title: "Sin conexión", subtitle: "Patrón offline con recuperación.", href: "/(prototype)/offline", icon: WifiOff },
  { title: "Configuración", subtitle: "Preferencias B2B/B2C.", href: "/(prototype)/configuracion", icon: Settings },
] as const;

export const users = [
  { id: "u1", name: "Mariana López", role: "Gerente de Operaciones", email: "mariana@empresa.mx", team: "Operaciones" },
  { id: "u2", name: "Diego Ramos", role: "Analista de Cuentas", email: "diego@empresa.mx", team: "Finanzas" },
  { id: "u3", name: "Ana Torres", role: "Líder Comercial", email: "ana@empresa.mx", team: "Ventas" },
] as const;

export const kpis = [
  { label: "Solicitudes resueltas", value: "128", trend: "+12% vs ayer", tone: "success" },
  { label: "Tiempo promedio", value: "4.2 h", trend: "Meta 6 h", tone: "info" },
  { label: "Pendientes críticos", value: "7", trend: "Requiere acción", tone: "warning" },
] as const;

export const notifications = [
  { id: "n1", title: "Registro aprobado", body: "La solicitud PAC-1024 ya puede avanzar a firma.", tone: "success", time: "Hace 8 min" },
  { id: "n2", title: "Documento vencido", body: "El comprobante fiscal requiere actualización.", tone: "warning", time: "Hace 24 min" },
  { id: "n3", title: "Nueva asignación", body: "Tienes 3 registros listos para revisión.", tone: "info", time: "Hoy" },
] as const;

export const conversations = [
  {
    id: "c1",
    person: "Equipo de Soporte",
    lastMessage: "Adjuntamos la evidencia solicitada para el folio.",
    unread: 2,
    messages: [
      { id: "m1", from: "Soporte", text: "Hola, revisamos el caso PAC-1024.", mine: false },
      { id: "m2", from: "Tú", text: "Gracias, ¿pueden anexar la evidencia?", mine: true },
      { id: "m3", from: "Soporte", text: "Claro. Adjuntamos el PDF y una imagen de referencia.", mine: false },
    ],
    attachments: [
      { name: "Evidencia-PAC-1024.pdf", size: "1.8 MB" },
      { name: "captura-validacion.png", size: "640 KB" },
    ],
  },
] as const;

export const records = [
  { id: "r1", folio: "PAC-1024", client: "Café Norte", status: "En revisión", priority: "Alta", amount: "$48,250", owner: "Mariana López" },
  { id: "r2", folio: "PAC-1025", client: "Logística Azul", status: "Aprobado", priority: "Media", amount: "$18,900", owner: "Diego Ramos" },
  { id: "r3", folio: "PAC-1026", client: "Mercado Vivo", status: "Pendiente", priority: "Alta", amount: "$72,100", owner: "Ana Torres" },
  { id: "r4", folio: "PAC-1027", client: "Salud Integral", status: "Borrador", priority: "Baja", amount: "$9,750", owner: "Mariana López" },
  { id: "r5", folio: "PAC-1028", client: "Tecno Sur", status: "Rechazado", priority: "Media", amount: "$31,430", owner: "Diego Ramos" },
  { id: "r6", folio: "PAC-1029", client: "Alimentos Campo", status: "En revisión", priority: "Alta", amount: "$55,000", owner: "Ana Torres" },
] as const;

export const documents = [
  { id: "d1", name: "Contrato marco 2026.pdf", type: "PDF", owner: "Legal", status: "Vigente", size: "2.4 MB" },
  { id: "d2", name: "Acta de entrega.docx", type: "DOCX", owner: "Operaciones", status: "Por revisar", size: "980 KB" },
  { id: "d3", name: "Análisis Q2.xlsx", type: "XLSX", owner: "Finanzas", status: "Compartido", size: "1.2 MB" },
] as const;

export const chartBars = [64, 78, 55, 92, 70, 84, 96] as const;
