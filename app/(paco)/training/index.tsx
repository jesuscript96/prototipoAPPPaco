import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { CheckCircle2, Download, GraduationCap, Search, WifiOff } from "@/components/paco/glyphs";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Badge, Button, Card, EmptyState, Progress, Screen } from "@/components/paco/layout";
import { Segmented } from "@/components/paco/ui";
import { runPhases } from "@/lib/paco-api";
import { courseProgress, courseStatus } from "@/lib/paco-training";
import { courseIcons } from "@/components/paco/icons";
import { Course, courses, downloadPhases } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const tabs = ["Pendientes", "En Curso", "Finalizados"] as const;

export default function TrainingScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [tab, setTab] = useState<string>("Pendientes");
  const [query, setQuery] = useState("");
  const [downloadModal, setDownloadModal] = useState<Course | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadPhase, setDownloadPhase] = useState<string | null>(null);
  const [downloadIndex, setDownloadIndex] = useState(0);

  const filtered = useMemo(() => {
    const tabStatus = tab === "Pendientes" ? "Pendiente" : tab === "En Curso" ? "En curso" : "Finalizado";
    let list = courses.filter((course) => courseStatus(course, store.lessonStates, store.finishedCourses) === tabStatus);
    if (query.trim()) list = list.filter((course) => course.title.toLowerCase().includes(query.trim().toLowerCase()));
    return list;
  }, [tab, query, store.lessonStates, store.finishedCourses]);

  const startDownload = async (course: Course) => {
    setDownloading(true);
    await runPhases(downloadPhases, (phase, index) => {
      setDownloadPhase(phase);
      setDownloadIndex(index);
    }, 700);
    store.markCourseDownloaded(course.id);
    setDownloading(false);
    setDownloadPhase(null);
    setDownloadModal(null);
  };

  return (
    <Screen
      title="Capacitaciones"
      description="Cursos asignados por tu empresa. Los cursos offline se descargan para avanzar sin conexión y sincronizar después."
    >
      <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
        <Search size={18} color="#94a3b8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar curso…"
          placeholderTextColor="#94a3b8"
          className="min-h-12 flex-1 text-base text-slate-950"
        />
      </View>

      <Segmented options={tabs} value={tab} onChange={setTab} />

      {store.pendingSync.length > 0 ? (
        <Card className="gap-2 border-amber-200 bg-amber-50">
          <View className="flex-row items-center gap-2">
            <WifiOff size={16} color="#B8860B" />
            <Text className="flex-1 text-sm font-bold text-amber-800">Avance offline sin sincronizar</Text>
          </View>
          <Text className="text-xs text-amber-700">Tu progreso se guardó en el dispositivo. Al recuperar conexión se enviará al panel.</Text>
          <Button variant="outline" onPress={() => store.pendingSync.forEach((id) => store.syncCourse(id))}>
            Simular recuperar conexión y sincronizar
          </Button>
        </Card>
      ) : null}

      {filtered.length === 0 ? (
        <EmptyState
          title={`Sin cursos en ${tab.toLowerCase()}`}
          description={query ? `Ningún curso coincide con “${query}”.` : "Cuando tu empresa te asigne cursos en este estado, aparecerán aquí."}
          icon={GraduationCap}
        />
      ) : (
        <View className="gap-3">
          {filtered.map((course) => {
            const progress = courseProgress(course, store.lessonStates, store.evaluationDone, store.satisfactionDone, store.finishedCourses);
            const downloaded = store.downloadedCourses.includes(course.id);
            return (
              <Card key={course.id} className="gap-3">
                <View className="flex-row items-start gap-3">
                  {(() => {
                    const CourseIcon = courseIcons[course.id] ?? GraduationCap;
                    return (
                      <View className="h-12 w-12 items-center justify-center rounded-[12px] bg-brand-50">
                        <CourseIcon size={22} color="#2F42CB" strokeWidth={2} />
                      </View>
                    );
                  })()}
                  <View className="flex-1 gap-1">
                    <Text className="text-base font-bold text-slate-950">{course.title}</Text>
                    <View className="flex-row flex-wrap items-center gap-1.5">
                      {course.mandatory ? <Badge tone="warning">Obligatorio</Badge> : null}
                      <Badge tone={course.mode === "Offline" ? "info" : "neutral"}>{course.mode}</Badge>
                      {downloaded ? <Badge tone="success">Descargado</Badge> : null}
                    </View>
                    <Text className="text-xs text-slate-500">{course.deadline}</Text>
                  </View>
                </View>
                <Progress value={progress} />
                <View className="flex-row gap-2">
                  {course.mode === "Offline" && !downloaded ? (
                    <View className="flex-1">
                      <Button icon={Download} variant="outline" onPress={() => setDownloadModal(course)}>
                        Descargar
                      </Button>
                    </View>
                  ) : null}
                  <View className="flex-1">
                    <Button onPress={() => router.push({ pathname: "/(paco)/training/[courseId]", params: { courseId: course.id } })}>
                      {progress === 100 ? "Ver curso" : progress > 0 ? "Continuar" : "Comenzar"}
                    </Button>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      )}

      <Modal transparent visible={downloadModal !== null} animationType="fade" onRequestClose={() => !downloading && setDownloadModal(null)}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full max-w-sm gap-3 rounded-2xl bg-white p-6">
            {downloading ? (
              <>
                <Text className="text-center text-lg font-bold text-slate-950">Descargando “{downloadModal?.title}”</Text>
                <Progress value={Math.round(((downloadIndex + 1) / downloadPhases.length) * 100)} />
                <Text className="text-center text-sm font-semibold text-brand-700">{downloadPhase}</Text>
              </>
            ) : (
              <>
                <View className="items-center">
                  <View className="h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
                    <WifiOff size={26} color="#2F42CB" />
                  </View>
                </View>
                <Text className="text-center text-lg font-bold text-slate-950">Contenido disponible sin conexión</Text>
                <Text className="text-center text-sm leading-5 text-slate-600">
                  Este curso puede verse y completarse sin internet. Tu avance se guardará en el dispositivo y se sincronizará
                  automáticamente con el panel de tu empresa al recuperar la conexión.
                </Text>
                <View className="gap-2 pt-1">
                  <Button icon={Download} onPress={() => downloadModal && startDownload(downloadModal)}>
                    Descargar curso
                  </Button>
                  <Button variant="ghost" onPress={() => setDownloadModal(null)}>
                    Ahora no
                  </Button>
                </View>
              </>
            )}
            {!downloading && store.downloadedCourses.includes(downloadModal?.id ?? "") ? (
              <View className="flex-row items-center justify-center gap-2">
                <CheckCircle2 size={16} color="#16a34a" />
                <Text className="text-sm font-bold text-green-700">Descarga completada</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
