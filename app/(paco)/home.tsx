import { Link, useRouter } from "expo-router";
import { Bell, ChevronRight, Lock } from "@/components/paco/glyphs";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { bannerAssets, brandAssets, moduleAssets, peopleAssets, quickActionAssets } from "@/components/paco/assets";
import { Ambient, Button, GlassNavButton, Progress } from "@/components/paco/layout";
import { GlassSurface } from "@/components/paco/glass";
import { BentoActionChip, BentoHalfTile, BentoHeroTile, BentoIcon, BentoMini, bentoAccents } from "@/components/paco/bento";
import { FadeSlideIn, PressableScale, useAnimatedNumber } from "@/components/paco/motion";
import { ListGroup, mxn, Row } from "@/components/paco/ui";
import { AssetIconBubble, moduleIcons } from "@/components/paco/icons";
import { banners, celebrations, communications, courses, employee, moduleRegistry, onboardingTasks, seedReceipts, surveys } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

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
    <View className="flex-1 justify-center px-6 pb-28 pt-4">
      {/* Bloqueo transparente: sin tarjeta, el candado va sobre una manchita
          ámbar y el botón navy sostiene el contraste sobre el canvas. */}
      <View className="items-center gap-4">
        <View className="h-24 w-24 items-center justify-center">
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              width: 88,
              height: 88,
              left: 2,
              top: 6,
              backgroundColor: "rgba(184, 134, 11, 0.16)",
              borderTopLeftRadius: 54,
              borderTopRightRadius: 42,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 44,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              width: 26,
              height: 26,
              right: -2,
              bottom: 2,
              borderRadius: 13,
              backgroundColor: "rgba(241, 194, 50, 0.20)",
            }}
          />
          <Lock size={40} color={vibrants.warning.accent} strokeWidth={2.2} />
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
  const pendingReceipts = seedReceipts.filter((r) => !store.signedReceiptIds.includes(r.id));
  const nextReceipt = pendingReceipts[0];
  const unreadComms = communications.filter((c) => !store.readCommIds.includes(c.id)).length;
  const activeRequests = store.requests.filter((r) => r.status === "No iniciada" || r.status === "En evaluación").length;
  const supportModules = moduleRegistry.filter((m) => m.domain === "Soporte");

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
            {pendings.map((item, index) => (
              <Row
                key={item.id}
                leading={
                  <AssetIconBubble
                    source={item.asset}
                    size={42}
                    imageSize={26}
                    seed={index}
                    blobColor={bentoAccents.people.blob}
                    blobAltColor={bentoAccents.people.blobAlt}
                  />
                }
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
              <AssetIconBubble
                source={moduleAssets.celebrations}
                size={42}
                imageSize={26}
                seed={2}
                blobColor={bentoAccents.people.blob}
                blobAltColor={bentoAccents.people.blobAlt}
              />
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

        {/* Bento · Finanzas */}
        <FadeSlideIn delay={160}>
          <View className="gap-2.5">
            <Text className="px-0.5 text-[18px] font-bold tracking-tight text-ink-body">Finanzas</Text>
            <BentoHeroTile
              icon={moduleAssets.advance}
              domain="finance"
              seed={0}
              title="Adelanto de nómina"
              subtitle="Hasta $2,500 disponibles esta quincena"
              onPress={() => router.push("/(paco)/advance")}
              accessibilityLabel="Adelanto de nómina. Hasta $2,500 disponibles esta quincena"
              trailing={<BentoActionChip label="Solicitar" onPress={() => router.push("/(paco)/advance")} />}
            />
            <View className="flex-row justify-between">
              <View className="w-[48.5%]">
                <BentoHalfTile icon={moduleAssets.topups} domain="finance" seed={1} title="Recargas" meta="Tiempo aire y datos" href="/(paco)/topups" />
              </View>
              <View className="w-[48.5%]">
                <BentoHalfTile icon={moduleAssets.services} domain="finance" seed={2} title="Pago de servicios" meta="CFE, Telmex y más" href="/(paco)/services" />
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <BentoMini icon={moduleAssets.expenses} domain="finance" seed={3} label="Reporte de gastos" href="/(paco)/expenses" />
              <BentoMini icon={moduleAssets.pin} domain="finance" seed={0} label="Club PiN" href="/(paco)/pin" />
            </View>
          </View>
        </FadeSlideIn>

        {/* Bento · Personas y cultura */}
        <FadeSlideIn delay={200}>
          <View className="gap-2.5">
            <Text className="px-0.5 text-[18px] font-bold tracking-tight text-ink-body">Personas y cultura</Text>
            <BentoHeroTile
              icon={moduleAssets.mood}
              domain="people"
              seed={1}
              title="¿Cómo te sientes hoy?"
              subtitle={store.moodRegisteredToday ? "Listo por hoy · vuelve mañana" : "Registra tu ánimo en un toque"}
              onPress={() => router.push(store.moodRegisteredToday ? "/(paco)/mood-charts" : "/(paco)/mood")}
              accessibilityLabel="Estado de ánimo. Registro diario y gráficas"
            >
              {store.moodRegisteredToday ? (
                <View className="flex-row items-center justify-between">
                  <BentoActionChip label="Registrado hoy" tone="done" />
                  <View className="flex-row items-center gap-0.5">
                    <Text style={{ color: bentoAccents.people.accent }} className="text-[12px] font-bold">Ver gráficas</Text>
                    <ChevronRight size={14} color={bentoAccents.people.accent} />
                  </View>
                </View>
              ) : (
                <View className="flex-row items-center justify-around border-t border-slate-900/10 pt-2.5">
                  {(
                    [
                      { asset: peopleAssets.smiley1, score: 25, label: "Mal" },
                      { asset: peopleAssets.smiley2, score: 60, label: "Normal" },
                      { asset: peopleAssets.smiley3, score: 95, label: "Bien" },
                    ] as const
                  ).map((option) => (
                    <PressableScale
                      key={option.label}
                      onPress={() => store.registerMood(option.score, [], [])}
                      accessibilityLabel={`Registrar ánimo: ${option.label}`}
                      className="items-center gap-1 px-4 py-1"
                    >
                      <Image source={option.asset} resizeMode="contain" style={{ width: 36, height: 36 }} />
                      <Text className="text-[10px] font-bold text-ink-muted">{option.label}</Text>
                    </PressableScale>
                  ))}
                </View>
              )}
            </BentoHeroTile>
            <View className="flex-row justify-between">
              <View className="w-[48.5%]">
                <BentoHalfTile
                  icon={moduleAssets.requests}
                  domain="people"
                  seed={2}
                  title="Solicitudes"
                  meta={activeRequests > 0 ? `${activeRequests} en curso` : "Vacaciones y permisos"}
                  href="/(paco)/requests"
                />
              </View>
              <View className="w-[48.5%]">
                <BentoHalfTile
                  icon={moduleAssets.training}
                  domain="people"
                  seed={3}
                  title="Capacitaciones"
                  meta={pendingCourse ? "1 curso obligatorio" : "Estás al día"}
                  href="/(paco)/training"
                />
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <BentoMini icon={moduleAssets.celebrations} domain="people" seed={0} label="Cumpleaños" href="/(paco)/celebrations" />
              <BentoMini icon={moduleAssets.recognitions} domain="people" seed={1} label="Reconocer" href="/(paco)/recognitions" />
              <BentoMini icon={moduleAssets.surveys} domain="people" seed={2} label="Encuestas" href="/(paco)/surveys" />
              <BentoMini icon={moduleAssets.voice} domain="people" seed={3} label="Voz" href="/(paco)/voice" />
              <BentoMini icon={moduleAssets.wellness} domain="people" seed={0} label="Bienestar" href="/(paco)/wellness" />
              <BentoMini icon={moduleAssets["onboarding-tasks"]} domain="people" seed={1} label="Onboarding" href="/(paco)/onboarding-tasks" />
            </View>
          </View>
        </FadeSlideIn>

        {/* Bento · Documentos */}
        <FadeSlideIn delay={240}>
          <View className="gap-2.5">
            <Text className="px-0.5 text-[18px] font-bold tracking-tight text-ink-body">Documentos</Text>
            <BentoHeroTile
              icon={moduleAssets.receipts}
              domain="docs"
              seed={2}
              title="Recibos de nómina"
              subtitle={nextReceipt ? `${nextReceipt.period} · neto ${nextReceipt.net}` : "Todos tus recibos están firmados"}
              onPress={() => router.push("/(paco)/receipts")}
              accessibilityLabel="Recibos de nómina. PDF, XML y firma"
            >
              <View className="flex-row items-center justify-between">
                {nextReceipt ? (
                  <>
                    <Text className="text-[11px] font-semibold text-ink-muted">
                      {pendingReceipts.length} {pendingReceipts.length === 1 ? "recibo pendiente" : "recibos pendientes"} de firma
                    </Text>
                    <BentoActionChip label="Firmar ahora" onPress={() => store.signReceipt(nextReceipt.id)} />
                  </>
                ) : (
                  <BentoActionChip label="Todo firmado" tone="done" />
                )}
              </View>
            </BentoHeroTile>
            <View className="flex-row justify-between">
              <View className="w-[48.5%]">
                <BentoHalfTile
                  icon={moduleAssets.comms}
                  domain="docs"
                  seed={3}
                  title="Comunicación"
                  meta={unreadComms > 0 ? `${unreadComms} sin leer` : "Estás al día"}
                  href="/(paco)/comms"
                />
              </View>
              <View className="w-[48.5%]">
                <BentoHalfTile icon={moduleAssets["document-requests"]} domain="docs" seed={0} title="Solicitud de documentos" meta="Genera, firma y sube" href="/(paco)/document-requests" />
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              <BentoMini icon={moduleAssets["corporate-docs"]} domain="docs" seed={1} label="Corporativos" href="/(paco)/corporate-docs" />
              <BentoMini icon={moduleAssets.sua} domain="docs" seed={2} label="Cartas SUA" href="/(paco)/sua" />
            </View>
          </View>
        </FadeSlideIn>

        {/* Soporte y cuenta · lista de gestión */}
        <FadeSlideIn delay={280}>
          <View className="gap-2.5">
            <Text className="px-0.5 text-[18px] font-bold tracking-tight text-ink-body">Soporte y cuenta</Text>
            <ListGroup>
              {supportModules.map((module, index) => {
                const Glyph = moduleIcons[module.id];
                return (
                  <Row
                    key={module.id}
                    leading={Glyph ? <BentoIcon glyph={Glyph} domain="support" size={30} seed={index} /> : undefined}
                    title={module.title}
                    subtitle={module.subtitle}
                    onPress={() => router.push(module.href)}
                    trailing={<ChevronRight size={17} color="#cbd5e1" />}
                  />
                );
              })}
            </ListGroup>
          </View>
        </FadeSlideIn>
      </ScrollView>
    </View>
  );
}
