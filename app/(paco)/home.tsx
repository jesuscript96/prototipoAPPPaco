import { Link, useRouter } from "expo-router";
import {
  Bell,
  Cake,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Lock,
  Medal,
  PieChart,
  ReceiptText,
  Rocket,
  Smartphone,
  Smile,
  Wallet,
} from "@/components/paco/glyphs";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ambient, Button, Progress } from "@/components/paco/layout";
import { FadeSlideIn, PressableScale, useAnimatedNumber } from "@/components/paco/motion";
import { cn, mxn } from "@/components/paco/ui";
import { Icon, IconBubble, bannerIcons, domainStyles, moduleIcons } from "@/components/paco/icons";
import { banners, celebrations, courses, employee, moduleRegistry, onboardingTasks, surveys } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const domains = ["Finanzas", "Personas y cultura", "Documentos", "Soporte"] as const;

const bannerTints = [
  { bg: "bg-ink", text: "text-white", sub: "text-indigo-200/80", icon: "#6AA84F" },
  { bg: "bg-brand-500", text: "text-white", sub: "text-white/75", icon: "#fff" },
  { bg: "bg-white/80 border border-white/90", text: "text-slate-900", sub: "text-slate-500", icon: "#2F42CB" },
] as const;

function HomeHeader({ unread }: { unread: number }) {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-3 px-5 pb-3 pt-14">
      <Pressable
        accessibilityLabel="Mi expediente"
        onPress={() => router.push("/(paco)/profile")}
        className="h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/75 shadow-card"
      >
        <Text className="text-[13px] font-bold text-ink">{employee.initials}</Text>
      </Pressable>
      <View className="flex-1">
        <Text className="text-[17px] font-bold tracking-tight text-slate-950">Hola, {employee.preferredName}</Text>
        <Text className="text-[11px] text-slate-500">Miércoles 10 de junio · {employee.role}</Text>
      </View>
      <Pressable
        accessibilityLabel="Notificaciones"
        onPress={() => router.push("/(paco)/notifications")}
        className="h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/75 shadow-card active:bg-white"
      >
        <Bell size={18} color="#1E1E1E" strokeWidth={2.2} />
        {unread > 0 ? (
          <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full border-2 border-canvas bg-red-500 px-1">
            <Text className="text-[9px] font-bold text-white">{unread}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

function MandatorySurveyLock() {
  const router = useRouter();
  const mandatory = surveys.find((s) => s.mandatory);
  return (
    <View className="flex-1 items-center justify-center gap-4 px-7 pb-24">
      <View className="h-20 w-20 items-center justify-center rounded-[18px] border border-amber-500/25 bg-amber-500/15">
        <Lock size={34} color="#B8860B" />
      </View>
      <Text className="text-center text-2xl font-bold tracking-tight text-slate-950">Tienes una encuesta obligatoria</Text>
      <Text className="text-center text-[15px] leading-6 text-slate-500">
        Tu empresa disparó la encuesta “{mandatory?.title}”. La navegación queda bloqueada hasta que la completes.
      </Text>
      <View className="w-full gap-3 pt-2">
        <Button onPress={() => router.push({ pathname: "/(paco)/surveys/[id]", params: { id: mandatory?.id ?? "nom035" } })}>
          Responder encuesta ahora
        </Button>
        <Text className="text-center text-xs font-semibold text-slate-400">
          {mandatory?.questions.length ?? 0} preguntas · {mandatory?.due}
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const unread = store.notifications.filter((n) => !n.read).length;
  const surveyBlocked = !store.completedSurveyIds.includes("nom035");
  const animatedAvailable = useAnimatedNumber(2500, 900);

  if (surveyBlocked) {
    return (
      <View className="flex-1 bg-canvas">
        <Ambient />
        <HomeHeader unread={unread} />
        <MandatorySurveyLock />
      </View>
    );
  }

  const debt = store.movements.filter((m) => m.status === "Adeudo próximo").reduce((sum, m) => sum + m.amount + m.commission, 0);
  const onboardingDone = onboardingTasks.filter((t) => {
    const status = store.onboardingStatus[t.id];
    return status === "Completada" || status === "Por calificar";
  }).length;
  const pendingCourse = courses.find((c) => c.mandatory && !store.finishedCourses.includes(c.id));
  const optionalSurveyPending = surveys.some((s) => !s.mandatory && !store.completedSurveyIds.includes(s.id));
  const todayCelebrations = celebrations.filter((c) => c.dayOffset === 0);

  const pendings: { id: string; icon: Icon; tint: string; color: string; title: string; meta: string; done: boolean; onPress: () => void }[] = [
    {
      id: "mood",
      icon: Smile,
      tint: "bg-violet-50",
      color: "#674EA7",
      title: "Registra tu estado de ánimo",
      meta: store.moodRegisteredToday ? "Registrado hoy" : "Pendiente de hoy · toma 1 minuto",
      done: store.moodRegisteredToday,
      onPress: () => router.push(store.moodRegisteredToday ? "/(paco)/mood-charts" : "/(paco)/mood"),
    },
    {
      id: "onboarding",
      icon: Rocket,
      tint: "bg-brand-100",
      color: "#5176F3",
      title: "Plan de onboarding",
      meta: `${onboardingDone} de ${onboardingTasks.length} tareas · mentor asignado`,
      done: onboardingDone === onboardingTasks.length,
      onPress: () => router.push("/(paco)/onboarding-tasks"),
    },
    ...(pendingCourse
      ? [
          {
            id: "course",
            icon: GraduationCap,
            tint: "bg-amber-50",
            color: "#B8860B",
            title: `Curso obligatorio: ${pendingCourse.title}`,
            meta: `${pendingCourse.deadline} · ${store.downloadedCourses.includes(pendingCourse.id) ? "descargado offline" : "disponible para descargar"}`,
            done: false,
            onPress: () => router.push({ pathname: "/(paco)/training/[courseId]", params: { courseId: pendingCourse.id } }),
          },
        ]
      : []),
    ...(optionalSurveyPending
      ? [
          {
            id: "survey",
            icon: ClipboardList,
            tint: "bg-brand-100",
            color: "#5176F3",
            title: "Encuesta de clima laboral",
            meta: "Junio 2026 · 3 preguntas rápidas",
            done: false,
            onPress: () => router.push("/(paco)/surveys"),
          },
        ]
      : []),
  ];

  return (
    <View className="flex-1 bg-canvas">
      <Ambient />
      <HomeHeader unread={unread} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="gap-6 px-5 pb-24 pt-2">
        {/* Hero financiero */}
        <FadeSlideIn>
        <View className="rounded-2xl border border-white/90 bg-white/80 p-5 shadow-pop">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">Disponible para adelanto</Text>
              <Text className="mt-1 text-[34px] font-bold tracking-tight text-slate-950">{mxn(Math.round(animatedAvailable))}</Text>
            </View>
            <View className={cn("rounded-[8px] border px-2.5 py-1.5", debt > 0 ? "border-amber-500/25 bg-amber-500/10" : "border-emerald-500/20 bg-emerald-500/10")}>
              <Text className={cn("text-[11px] font-bold", debt > 0 ? "text-amber-700" : "text-emerald-700")}>
                {debt > 0 ? `Adeudo ${mxn(debt)}` : "Sin adeudos"}
              </Text>
            </View>
          </View>
          <View className="mt-4 flex-row justify-between border-t border-slate-900/10 pt-4">
            {(
              [
                { label: "Adelanto", icon: Wallet, href: "/(paco)/advance" },
                { label: "Recargas", icon: Smartphone, href: "/(paco)/topups" },
                { label: "Servicios", icon: ReceiptText, href: "/(paco)/services" },
                { label: "Gastos", icon: PieChart, href: "/(paco)/expenses" },
              ] as const
            ).map((action) => (
              <PressableScale key={action.label} onPress={() => router.push(action.href)} className="items-center gap-1.5">
                <View className="h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-ink">
                  <action.icon size={20} color="#fff" strokeWidth={2.1} />
                </View>
                <Text className="text-[11px] font-bold text-slate-600">{action.label}</Text>
              </PressableScale>
            ))}
          </View>
        </View>
        </FadeSlideIn>

        {/* Banners */}
        <FadeSlideIn delay={60}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5">
          {banners.map((banner, index) => {
            const tint = bannerTints[index % bannerTints.length] ?? bannerTints[0];
            const BannerIcon = bannerIcons[banner.id] ?? Wallet;
            return (
              <Link key={banner.id} href={banner.href} asChild>
                <Pressable className={cn("w-72 rounded-2xl p-4 shadow-card active:opacity-90", tint.bg)}>
                  <BannerIcon size={26} color={tint.icon} strokeWidth={2} />
                  <Text className={cn("mt-2.5 text-[15px] font-bold", tint.text)}>{banner.title}</Text>
                  <Text className={cn("mt-0.5 text-[13px] leading-5", tint.sub)}>{banner.subtitle}</Text>
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>
        </FadeSlideIn>

        {/* Pendientes de hoy */}
        <FadeSlideIn delay={120}>
        <View className="gap-2.5">
          <View className="flex-row items-center justify-between px-0.5">
            <Text className="text-[16px] font-bold tracking-tight text-slate-900">Hoy en Paco</Text>
            <Text className="text-xs font-bold text-slate-400">{pendings.filter((p) => !p.done).length} pendiente(s)</Text>
          </View>
          <View className="overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-card">
            {pendings.map((item, index) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={item.onPress}
                className={cn("flex-row items-center gap-3 p-4 active:bg-white", index > 0 && "border-t border-slate-900/5")}
              >
                <IconBubble icon={item.icon} color={item.color} tint={item.tint} size={42} iconSize={19} />
                <View className="flex-1">
                  <Text className="text-[14px] font-bold text-slate-900" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="mt-0.5 text-xs text-slate-500" numberOfLines={1}>
                    {item.meta}
                  </Text>
                </View>
                {item.done ? (
                  <View className="rounded-[8px] bg-emerald-500/15 px-2 py-1">
                    <Text className="text-[10px] font-bold text-emerald-700">Listo</Text>
                  </View>
                ) : (
                  <ChevronRight size={17} color="#cbd5e1" />
                )}
              </Pressable>
            ))}
          </View>
          {onboardingDone < onboardingTasks.length ? (
            <View className="px-1">
              <Progress value={Math.round((onboardingDone / onboardingTasks.length) * 100)} />
            </View>
          ) : null}
        </View>
        </FadeSlideIn>

        {/* Celebraciones de hoy */}
        {todayCelebrations.length > 0 ? (
          <Pressable accessibilityRole="button" onPress={() => router.push("/(paco)/celebrations")} className="active:opacity-90">
            <View className="flex-row items-center gap-3 rounded-2xl border border-violet-300/40 bg-violet-500/10 p-4">
              <IconBubble icon={Cake} color="#674EA7" tint="bg-white/80" size={42} iconSize={19} />
              <View className="flex-1">
                <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-violet-600">Celebraciones de hoy</Text>
                {todayCelebrations.map((item) => (
                  <Text key={item.id} className="mt-0.5 text-[13px] font-semibold text-slate-800">
                    {item.name}
                    <Text className="font-medium text-slate-500">
                      {"  "}
                      {item.type}
                      {item.years ? ` · ${item.years} años` : ""}
                    </Text>
                  </Text>
                ))}
              </View>
              <ChevronRight size={17} color="#a78bfa" />
            </View>
          </Pressable>
        ) : null}

        {/* Modulos por dominio */}
        {domains.map((domain) => {
          const style = domainStyles[domain] ?? { tint: "bg-slate-100", color: "#475569" };
          return (
            <View key={domain} className="gap-2.5">
              <Text className="px-0.5 text-[16px] font-bold tracking-tight text-slate-900">{domain}</Text>
              <View className="flex-row flex-wrap justify-between">
                {moduleRegistry
                  .filter((m) => m.domain === domain)
                  .map((module) => {
                    const ModuleIcon = moduleIcons[module.id] ?? Wallet;
                    return (
                      <Link key={module.id} href={module.href} asChild>
                        <Pressable className="mb-3 w-[48.5%] rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card active:bg-white">
                          <View className="flex-row items-start justify-between">
                            <IconBubble icon={ModuleIcon} color={style.color} tint={style.tint} size={40} iconSize={19} />
                            {module.core ? (
                              <View className="rounded-[6px] bg-ink px-1.5 py-0.5">
                                <Text className="text-[8px] font-bold tracking-wide text-accent-400">CORE</Text>
                              </View>
                            ) : null}
                          </View>
                          <Text className="mt-3 text-[13px] font-bold leading-4 text-slate-900">{module.title}</Text>
                          <Text className="mt-1 text-[11px] leading-4 text-slate-400" numberOfLines={2}>
                            {module.subtitle}
                          </Text>
                        </Pressable>
                      </Link>
                    );
                  })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
