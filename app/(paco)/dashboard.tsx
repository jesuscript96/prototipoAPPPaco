import { Link } from "expo-router";
import {
  Bell,
  Cake,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  FileSignature,
  FileText,
  FolderOpen,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  LifeBuoy,
  Megaphone,
  Medal,
  MessageCircle,
  MessageSquarePlus,
  MessagesSquare,
  PieChart,
  Receipt,
  Settings,
  ShieldCheck,
  Smartphone,
  Tags,
  Smile,
  User,
  Wallet,
} from "lucide-react-native";
import { Text, View } from "react-native";
import { Badge, Button, Card, InlineAlert, ListItem, Progress, Screen, Section } from "@/components/ui";
import { banners, demoEmployee, discountCoupons, expenses, notifications, onboardingTasks, pacoModules, PacoModule } from "@/mock/paco-data";
import { useDemoStore } from "@/store/demo-store";

const iconMap = {
  Bell,
  Cake,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  FileSignature,
  FileText,
  FolderOpen,
  GraduationCap,
  HeartPulse,
  LifeBuoy,
  Megaphone,
  Medal,
  MessageCircle,
  MessageSquarePlus,
  MessagesSquare,
  PieChart,
  Receipt,
  Settings,
  ShieldCheck,
  Smartphone,
  Tags,
  Smile,
  User,
  Wallet,
} as const;

const domains = ["Finanzas", "Personas y RH", "Documentos", "Soporte", "Acceso"] as const;

function ModuleCard({ item }: { item: PacoModule }) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? HelpCircle;
  return (
    <Link href={{ pathname: "/(paco)/module/[id]", params: { id: item.id } }} asChild>
      <Card className="gap-3">
        <View className="flex-row items-start gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
            <Icon size={22} color="#3148c8" />
          </View>
          <View className="flex-1">
            <View className="flex-row flex-wrap items-center gap-2">
              <Text className="text-base font-bold text-slate-950">{item.title}</Text>
              <Badge tone={item.priority === "P0" ? "warning" : "neutral"}>{item.priority}</Badge>
            </View>
            <Text className="mt-1 text-sm leading-5 text-slate-600">{item.subtitle}</Text>
            {item.pending ? <Text className="mt-2 text-xs font-bold text-brand-700">{item.pending}</Text> : null}
          </View>
        </View>
      </Card>
    </Link>
  );
}

export default function PacoDashboardScreen() {
  const {
    completedOnboardingTaskIds,
    courseDownloaded,
    mandatorySurveyDone,
    completeMandatorySurvey,
    moodSubmitted,
    payrollAdvanceSubmitted,
    readNotificationIds,
  } = useDemoStore();
  const unreadCount = notifications.filter((item) => !item.read && !readNotificationIds.includes(item.id)).length;
  const onboardingProgress = Math.round((completedOnboardingTaskIds.length / onboardingTasks.length) * 100);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount + item.commission, 0);

  return (
    <Screen
      eyebrow="Inicio"
      title={`Bienvenido, ${demoEmployee.preferredName}`}
      description="Centro de acción moderno para beneficios, finanzas, cultura, documentos y soporte corporativo."
    >
      {!mandatorySurveyDone ? (
        <InlineAlert
          title="Encuesta obligatoria pendiente"
          description="La navegación general queda bloqueada en la app real hasta responder la encuesta NOM-035. En este prototipo puedes resolverla desde aquí o entrar al módulo."
          tone="warning"
        />
      ) : (
        <InlineAlert title="Dashboard desbloqueado" description="La encuesta obligatoria fue enviada y todos los módulos quedan disponibles." tone="success" />
      )}

      <Section title="Banners administrados desde panel">
        <View className="gap-3">
          {banners.map((banner) => (
            <Link key={banner.title} href={{ pathname: "/(paco)/module/[id]", params: { id: banner.moduleId } }} asChild>
              <Card className="gap-2 bg-brand-50">
                <Text className="text-lg font-bold text-slate-950">{banner.title}</Text>
                <Text className="text-sm leading-5 text-slate-600">{banner.subtitle}</Text>
              </Card>
            </Link>
          ))}
        </View>
      </Section>

      <Section title="Hoy en Paco" description="Agenda accionable: no es una lista de accesos, son pendientes que cambian estado.">
        <View className="gap-3">
          <Card className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-slate-900">Encuesta NOM-035</Text>
              <Badge tone={mandatorySurveyDone ? "success" : "warning"}>{mandatorySurveyDone ? "Completada" : "Bloqueante"}</Badge>
            </View>
            <Progress value={mandatorySurveyDone ? 100 : 33} />
            <View className="flex-row gap-2">
              <Button icon={ClipboardList} onPress={completeMandatorySurvey} variant={mandatorySurveyDone ? "secondary" : "primary"}>
                {mandatorySurveyDone ? "Completada" : "Responder ahora"}
              </Button>
              <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "surveys" } }} asChild>
                <Button variant="outline">Abrir flujo</Button>
              </Link>
            </View>
          </Card>
          <Card className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-slate-900">Onboarding programado</Text>
              <Badge tone={onboardingProgress === 100 ? "success" : "info"}>{onboardingProgress}%</Badge>
            </View>
            <Progress value={onboardingProgress} />
            <Text className="text-sm text-slate-600">
              {completedOnboardingTaskIds.length} de {onboardingTasks.length} tareas completadas. Incluye lectura, examen y material descargable con mentor.
            </Text>
            <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "employee-onboarding" } }} asChild>
              <Button variant="outline">Continuar onboarding</Button>
            </Link>
          </Card>
          <Card className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-slate-900">Estado de ánimo diario</Text>
              <Badge tone={moodSubmitted ? "success" : "warning"}>{moodSubmitted ? "Registrado" : "Pendiente"}</Badge>
            </View>
            <Text className="text-sm text-slate-600">El registro alimenta analíticos de clima laboral en tiempo real.</Text>
            <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "mood" } }} asChild>
              <Button variant="outline">Registrar bienestar</Button>
            </Link>
          </Card>
        </View>
      </Section>

      <Section title="Operación financiera">
        <View className="gap-3">
          <Card className="gap-3">
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-2xl bg-slate-100 p-3">
                <Text className="text-xs font-bold uppercase text-slate-500">Disponible</Text>
                <Text className="text-2xl font-bold text-slate-950">$2,500</Text>
              </View>
              <View className="flex-1 rounded-2xl bg-slate-100 p-3">
                <Text className="text-xs font-bold uppercase text-slate-500">Movimientos</Text>
                <Text className="text-2xl font-bold text-slate-950">${totalExpenses.toLocaleString("es-MX")}</Text>
              </View>
            </View>
            <Text className="text-sm text-slate-600">
              {payrollAdvanceSubmitted ? "Tu adelanto ya aparece como adeudo próximo." : "Primer adelanto requiere KYC antes de dispersar."}
            </Text>
            <View className="flex-row gap-2">
              <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "payroll-advance" } }} asChild>
                <Button icon={Wallet}>Solicitar adelanto</Button>
              </Link>
              <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "expenses" } }} asChild>
                <Button variant="outline">Ver estado</Button>
              </Link>
            </View>
          </Card>
          <View className="flex-row gap-3">
            <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "topups" } }} asChild>
              <Card className="flex-1 gap-2">
                <Smartphone size={22} color="#3148c8" />
                <Text className="font-bold text-slate-950">Recargar</Text>
                <Text className="text-xs text-slate-600">Telcel, AT&T, Movistar, Bait.</Text>
              </Card>
            </Link>
            <Link href={{ pathname: "/(paco)/module/[id]", params: { id: "services" } }} asChild>
              <Card className="flex-1 gap-2">
                <Receipt size={22} color="#3148c8" />
                <Text className="font-bold text-slate-950">Servicios</Text>
                <Text className="text-xs text-slate-600">Referencia, escaneo y KYC.</Text>
              </Card>
            </Link>
          </View>
        </View>
      </Section>

      <Section title="Aprendizaje y beneficios">
        <View className="gap-3">
          <ListItem
            title={courseDownloaded ? "Curso offline descargado" : "Curso offline pendiente de descarga"}
            subtitle="Contiene video, audio, entregables, evaluación y encuesta de satisfacción."
            icon={GraduationCap}
            href={{ pathname: "/(paco)/module/[id]", params: { id: "training" } }}
          />
          <ListItem
            title={`${discountCoupons.length} promociones PiN cerca de ti`}
            subtitle="Cupones y descuentos por ubicación concedida."
            icon={Tags}
            href={{ pathname: "/(paco)/module/[id]", params: { id: "discount-club" } }}
          />
          <ListItem title={`${unreadCount} notificaciones por revisar`} subtitle="Push, mensajes, encuestas y tareas asignadas." icon={Bell} href={{ pathname: "/(paco)/module/[id]", params: { id: "notifications" } }} />
        </View>
      </Section>

      {domains.map((domain) => (
        <Section key={domain} title={domain}>
          <View className="gap-3">
            {pacoModules.filter((item) => item.domain === domain).map((item) => (
              <ModuleCard key={item.id} item={item} />
            ))}
          </View>
        </Section>
      ))}
    </Screen>
  );
}
