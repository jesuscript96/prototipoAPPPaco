import { Link, useRouter } from "expo-router";
import { Bell, ChevronRight, Lock } from "@/components/paco/glyphs";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { assetForModule, bannerAssets, brandAssets, moduleAssets, peopleAssets, quickActionAssets } from "@/components/paco/assets";
import { Ambient, Button, GlassNavButton, Progress } from "@/components/paco/layout";
import { GlassModuleTile, GlassSurface } from "@/components/paco/glass";
import { FadeSlideIn, PressableScale, useAnimatedNumber } from "@/components/paco/motion";
import { cn, ListGroup, mxn, Row } from "@/components/paco/ui";
import { AssetIconBubble, domainStyles } from "@/components/paco/icons";
import { banners, celebrations, courses, employee, moduleRegistry, onboardingTasks, surveys } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

const domains = ["Finanzas", "Personas y cultura", "Documentos", "Soporte"] as const;

const BANNER_WIDTH = 300;
const BANNER_ASPECT = 1024 / 571;

function HomeHeader({ unread }: { unread: number }) {
  const router = useRouter();
  return (
    <View className="flex-row items-center gap-3 px-5 pb-3 pt-14">
      <Pressable accessibilityLabel="Mi expediente" onPress={() => router.push("/(paco)/profile")}>
        <GlassSurface variant="light" radius={22} className="h-11 w-11 items-center justify-center overflow-hidden p-0">
          <Image source={peopleAssets.avatarSmall} resizeMode="cover" style={{ width: 38, height: 38, borderRadius: 19 }} />
        </GlassSurface>
      </Pressable>
      <View className="flex-1">
        <Image source={brandAssets.headerIcon} resizeMode="contain" style={{ width: 72, height: 22 }} />
        <Text className="text-[17px] font-bold tracking-tight text-ink-body">Hola, {employee.preferredName}</Text>
        <Text className="text-[11px] font-semibold text-ink-muted">Miércoles 10 de junio · {employee.role}</Text>
      </View>
      <View className="relative">
        <GlassNavButton icon={Bell} label="Notificaciones" onPress={() => router.push("/(paco)/notifications")} />
        {unread > 0 ? (
          <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full border-2 border-canvas bg-red-500 px-1">
            <Text className="text-[9px] font-bold text-white">{unread}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function MandatorySurveyLock() {
  const router = useRouter();
  const mandatory = surveys.find((s) => s.mandatory);
  return (
    <View className="flex-1 justify-center px-5 pb-28 pt-4">
      <GlassSurface variant="elevated" radius={20} className="items-center gap-4 p-6 shadow-pop">
        <View style={{ borderColor: vibrants.warning.border, backgroundColor: "rgba(255, 255, 255, 0.55)" }} className="h-20 w-20 items-center justify-center rounded-[18px] border">
          <Lock size={34} color={vibrants.warning.accent} strokeWidth={2.2} />
        </View>
        <Text className="text-center text-2xl font-bold tracking-tight text-ink-body">Tienes una encuesta obligatoria</Text>
        <Text className="text-center text-[15px] leading-6 text-ink-muted">
          Tu empresa disparó la encuesta “{mandatory?.title}”. La navegación queda bloqueada hasta que la completes.
        </Text>
        <View className="w-full gap-3 pt-1">
          <Button onPress={() => router.push({ pathname: "/(paco)/surveys/[id]", params: { id: mandatory?.id ?? "nom035" } })}>
            Responder encuesta ahora
          </Button>
          <Text className="text-center text-xs font-semibold text-ink-muted">
            {mandatory?.questions.length ?? 0} preguntas · {mandatory?.due}
          </Text>
        </View>
      </GlassSurface>
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

  const pendings: { id: string; asset: (typeof moduleAssets)[keyof typeof moduleAssets]; title: string; meta: string; done: boolean; onPress: () => void }[] = [
    {
      id: "mood",
      asset: moduleAssets.mood,
      title: "Registra tu estado de ánimo",
      meta: store.moodRegisteredToday ? "Registrado hoy" : "Pendiente de hoy · toma 1 minuto",
      done: store.moodRegisteredToday,
      onPress: () => router.push(store.moodRegisteredToday ? "/(paco)/mood-charts" : "/(paco)/mood"),
    },
    {
      id: "onboarding",
      asset: moduleAssets["onboarding-tasks"],
      title: "Plan de onboarding",
      meta: `${onboardingDone} de ${onboardingTasks.length} tareas · mentor asignado`,
      done: onboardingDone === onboardingTasks.length,
      onPress: () => router.push("/(paco)/onboarding-tasks"),
    },
    ...(pendingCourse
      ? [
          {
            id: "course",
            asset: moduleAssets.training,
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
            asset: moduleAssets.surveys,
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="gap-6 px-5 pb-44 pt-2">
        {/* Hero financiero */}
        <FadeSlideIn>
        <GlassSurface variant="elevated" className="gap-0 p-5 shadow-pop">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-ink-muted">Disponible para adelanto</Text>
              <Text className="mt-1 text-[34px] font-bold tracking-tight text-ink-body">{mxn(Math.round(animatedAvailable))}</Text>
            </View>
            <Image source={quickActionAssets.advance} resizeMode="contain" style={{ width: 54, height: 54 }} />
            <View
              style={{ borderColor: debt > 0 ? vibrants.warning.border : vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" }}
              className="flex-row items-center gap-1.5 rounded-[8px] border px-2.5 py-1.5"
            >
              <View style={{ backgroundColor: debt > 0 ? vibrants.warning.accent : vibrants.success.accent }} className="h-1.5 w-1.5 rounded-full" />
              <Text className="text-[11px] font-bold text-label-primary">
                {debt > 0 ? `Adeudo ${mxn(debt)}` : "Sin adeudos"}
              </Text>
            </View>
          </View>
          <View className="mt-4 flex-row justify-between border-t border-slate-900/10 pt-4">
            {(
              [
                { label: "Adelanto", asset: quickActionAssets.advance, href: "/(paco)/advance" },
                { label: "Recargas", asset: quickActionAssets.topups, href: "/(paco)/topups" },
                { label: "Servicios", asset: quickActionAssets.services, href: "/(paco)/services" },
                { label: "Gastos", asset: quickActionAssets.expenses, href: "/(paco)/expenses" },
              ] as const
            ).map((action) => (
              <PressableScale key={action.label} onPress={() => router.push(action.href)} className="items-center gap-1.5">
                <AssetIconBubble source={action.asset} tint="bg-navy" size={56} imageSize={34} />
                <Text className="text-[11px] font-bold text-ink-muted">{action.label}</Text>
              </PressableScale>
            ))}
          </View>
        </GlassSurface>
        </FadeSlideIn>

        {/* Banners */}
        <FadeSlideIn delay={60}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5">
          {banners.map((banner) => (
            <Link key={banner.id} href={banner.href} asChild>
              <Pressable
                accessibilityLabel={banner.title}
                className="overflow-hidden rounded-2xl shadow-card active:opacity-90"
                style={{ width: BANNER_WIDTH, height: BANNER_WIDTH / BANNER_ASPECT }}
              >
                <Image
                  source={bannerAssets[banner.id as keyof typeof bannerAssets]}
                  resizeMode="cover"
                  style={{ width: BANNER_WIDTH, height: BANNER_WIDTH / BANNER_ASPECT }}
                />
              </Pressable>
            </Link>
          ))}
        </ScrollView>
        </FadeSlideIn>

        {/* Pendientes de hoy */}
        <FadeSlideIn delay={120}>
        <View className="gap-2.5">
          <View className="flex-row items-center justify-between px-0.5">
            <Text className="text-[16px] font-bold tracking-tight text-ink-body">Hoy en Paco</Text>
            <Text className="text-xs font-bold text-ink-muted">{pendings.filter((p) => !p.done).length} pendiente(s)</Text>
          </View>
          <ListGroup>
            {pendings.map((item) => (
              <Row
                key={item.id}
                leading={<AssetIconBubble source={item.asset} size={42} imageSize={24} />}
                title={item.title}
                subtitle={item.meta}
                onPress={item.onPress}
                trailing={
                  item.done ? (
                    <View style={{ borderColor: vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" }} className="rounded-[8px] border px-2 py-1">
                      <Text style={{ color: vibrants.success.accent }} className="text-[10px] font-bold">Listo</Text>
                    </View>
                  ) : (
                    <ChevronRight size={17} color="#cbd5e1" />
                  )
                }
              />
            ))}
          </ListGroup>
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
            <GlassSurface material="regular" className="flex-row items-center gap-3 p-4">
              <AssetIconBubble source={moduleAssets.celebrations} size={42} imageSize={24} />
              <View className="flex-1">
                <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-violet-600">Celebraciones de hoy</Text>
                {todayCelebrations.map((item) => (
                  <Text key={item.id} className="mt-0.5 text-[13px] font-semibold text-label-primary">
                    {item.name}
                    <Text className="font-medium text-label-secondary">
                      {"  "}
                      {item.type}
                      {item.years ? ` · ${item.years} años` : ""}
                    </Text>
                  </Text>
                ))}
              </View>
              <ChevronRight size={17} color="#674EA7" />
            </GlassSurface>
          </Pressable>
        ) : null}

        {/* Modulos por dominio */}
        {domains.map((domain) => {
          const style = domainStyles[domain] ?? { tint: "bg-white/55", color: "#475569" };
          return (
            <View key={domain} className="gap-2.5">
              <Text className="px-0.5 text-[18px] font-bold tracking-tight text-ink-body">{domain}</Text>
              <View className="flex-row flex-wrap justify-between">
                {moduleRegistry
                  .filter((m) => m.domain === domain)
                  .map((module, index) => {
                    const moduleAsset = assetForModule(module.id);
                    return (
                      <FadeSlideIn key={module.id} delay={index * 40} className="mb-3 w-[48.5%]">
                        <GlassModuleTile
                          title={module.title}
                          {...(moduleAsset ? { icon: moduleAsset } : {})}
                          iconTint={style.tint}
                          href={module.href}
                          {...(module.core ? { core: true } : {})}
                          accessibilityLabel={`${module.title}. ${module.subtitle}`}
                        />
                      </FadeSlideIn>
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
