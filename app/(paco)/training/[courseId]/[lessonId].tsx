import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, Clapperboard, FileQuestion, FileText, Mic, Play, RotateCcw, Send, Square, Upload } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Badge, Button, Card, EmptyState, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { AudioPlayer, ConfirmSheet, FileTile, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { isLessonLocked, lessonKey } from "@/lib/paco-training";
import { courses } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

function useMockPlayback() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setPlaying(false);
          return 100;
        }
        return value + 4;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [playing]);
  return { playing, progress, toggle: () => setPlaying((v) => !v || progress >= 100 ? (setProgress(progress >= 100 ? 0 : progress), !v) : !v) };
}

export default function LessonScreen() {
  const router = useRouter();
  const { courseId, lessonId } = useLocalSearchParams<{ courseId?: string; lessonId?: string }>();
  const course = courses.find((c) => c.id === courseId);
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = lessonIndex >= 0 ? course?.lessons[lessonIndex] : undefined;
  const store = usePacoStore();

  const [videoPlayed, setVideoPlayed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const audio = useMockPlayback();
  const recordingPlayback = useMockPlayback();
  const [permissionAsk, setPermissionAsk] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordedFile, setRecordedFile] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [sendingActivity, setSendingActivity] = useState(false);
  const recordTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!videoPlaying) return;
    const timeout = setTimeout(() => {
      setVideoPlaying(false);
      setVideoPlayed(true);
      store.showToast("Video reproducido completo.");
    }, 2500);
    return () => clearTimeout(timeout);
  }, [videoPlaying, store]);

  useEffect(() => () => {
    if (recordTimer.current) clearInterval(recordTimer.current);
  }, []);

  if (!course || !lesson) {
    return (
      <Screen title="Lección no encontrada">
        <EmptyState title="Sin lección" description="La lección solicitada no existe." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  const key = lessonKey(course.id, lesson.id);
  const state = store.lessonStates[key];
  const locked = isLessonLocked(course, lessonIndex, store.lessonStates);
  const completed = !!state?.completed;
  const activitySent = !!state?.activitySent;
  const hasActivity = lesson.requiresRecording || lesson.requiresUpload;
  const activityReady = (!lesson.requiresRecording || recordedFile !== null || !!state?.recordingDone) && (!lesson.requiresUpload || uploadedFile !== null || !!state?.uploadDone);
  const nextLesson = course.lessons[lessonIndex + 1];

  if (locked) {
    return (
      <Screen title={lesson.title}>
        <InlineAlert title="Lección bloqueada" description="Completa la lección anterior para desbloquear este contenido." tone="warning" />
        <Button onPress={() => router.back()}>Volver al temario</Button>
      </Screen>
    );
  }

  const startRecording = () => {
    setPermissionAsk(false);
    setRecording(true);
    setRecordSeconds(0);
    recordTimer.current = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    if (recordTimer.current) clearInterval(recordTimer.current);
    setRecording(false);
    const file = `audio_${Date.now()}.wav`;
    setRecordedFile(file);
    store.setLessonState(course.id, lesson.id, { recordingDone: true });
    store.showToast(`Grabación guardada (${file}).`);
  };

  const uploadDeliverable = async () => {
    await simulate(null, 900);
    const file = "evidencia-recorrido.pdf";
    setUploadedFile(file);
    store.setLessonState(course.id, lesson.id, { uploadDone: true });
    store.showToast(`Archivo "${file}" cargado como entregable.`);
  };

  const sendActivity = async () => {
    setSendingActivity(true);
    await simulate(null, 1000);
    store.setLessonState(course.id, lesson.id, { activitySent: true });
    store.showToast("Actividad enviada al instructor.");
    setSendingActivity(false);
  };

  const finishLesson = () => {
    store.completeLesson(course.id, lesson.id);
  };

  return (
    <Screen eyebrow={`${course.title} · Lección ${lessonIndex + 1} de ${course.lessons.length}`} title={lesson.title}>
      <Text className="text-sm leading-6 text-slate-600">{lesson.summary}</Text>

      {lesson.video ? (
        <Section title="Video de la lección">
          <Pressable
            accessibilityRole="button"
            onPress={() => setVideoPlaying(true)}
            className="h-48 items-center justify-center overflow-hidden rounded-2xl bg-slate-900"
          >
            {videoPlaying ? (
              <View className="items-center gap-2">
                <Clapperboard size={36} color="#fff" strokeWidth={1.6} />
                <Text className="text-sm font-semibold text-white">Reproduciendo {lesson.video}…</Text>
                <View className="h-1.5 w-44 overflow-hidden rounded-full bg-white/20">
                  <View className="h-full w-1/2 rounded-full bg-white" />
                </View>
              </View>
            ) : (
              <View className="items-center gap-2">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  {videoPlayed ? <RotateCcw size={28} color="#fff" strokeWidth={2} /> : <Play size={28} color="#fff" strokeWidth={2} />}
                </View>
                <Text className="text-sm font-semibold text-white">{lesson.video}</Text>
                {videoPlayed ? <Badge tone="success">Visto</Badge> : null}
              </View>
            )}
          </Pressable>
        </Section>
      ) : null}

      {lesson.audio ? (
        <Section title="Archivo adjunto · audio">
          <AudioPlayer
            name={lesson.audio.name}
            duration={`0:${String(Math.min(57, Math.round((audio.progress / 100) * 57)).toFixed(0)).padStart(2, "0")} / ${lesson.audio.duration}`}
            playing={audio.playing}
            progress={audio.progress}
            onToggle={audio.toggle}
          />
        </Section>
      ) : null}

      {lesson.resources.length > 0 ? (
        <Section title="Material de apoyo">
          <View className="gap-2">
            {lesson.resources.map((resource) => (
              <FileTile
                key={resource.id}
                name={resource.name}
                kind={resource.kind}
                size={resource.size}
                downloaded={store.downloadedFiles.includes(resource.name)}
                onDownload={() => store.downloadFile(resource.name)}
                actionLabel="Abrir"
              />
            ))}
          </View>
        </Section>
      ) : null}

      {hasActivity ? (
        <Section title="Actividad práctica" description="Completa los elementos requeridos y envía tu actividad.">
          <Card className="gap-3">
            {lesson.requiresRecording ? (
              <View className="gap-2">
                <Text className="text-sm font-bold text-slate-700">Graba tu respuesta en audio (.wav)</Text>
                {recording ? (
                  <View className="flex-row items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-3">
                    <View className="h-3 w-3 rounded-full bg-red-500" />
                    <Text className="flex-1 text-sm font-bold text-red-700">
                      Grabando… 0:{String(recordSeconds).padStart(2, "0")}
                    </Text>
                    <Pressable accessibilityLabel="Detener grabación" onPress={stopRecording} className="h-11 w-11 items-center justify-center rounded-full bg-red-500">
                      <Square size={16} color="#fff" />
                    </Pressable>
                  </View>
                ) : recordedFile || state?.recordingDone ? (
                  <View className="gap-2">
                    <AudioPlayer
                      name={recordedFile ?? "audio_grabado.wav"}
                      duration={`0:${String(recordSeconds || 3).padStart(2, "0")}`}
                      playing={recordingPlayback.playing}
                      progress={recordingPlayback.progress}
                      onToggle={recordingPlayback.toggle}
                    />
                    <Button variant="ghost" icon={Mic} onPress={() => setPermissionAsk(true)}>
                      Volver a grabar
                    </Button>
                  </View>
                ) : (
                  <Button icon={Mic} variant="outline" onPress={() => setPermissionAsk(true)}>
                    Grabar audio
                  </Button>
                )}
              </View>
            ) : null}

            {lesson.requiresUpload ? (
              <View className="gap-2">
                <Text className="text-sm font-bold text-slate-700">Sube tu entregable (PDF, imagen o documento)</Text>
                {uploadedFile || state?.uploadDone ? (
                  <View className="flex-row items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-3">
                    <FileText size={18} color="#059669" strokeWidth={2.1} />
                    <Text className="flex-1 text-sm font-bold text-green-800">{uploadedFile ?? "evidencia-recorrido.pdf"}</Text>
                    <Pressable accessibilityRole="button" onPress={uploadDeliverable} className="min-h-10 justify-center">
                      <Text className="text-xs font-bold text-slate-500">Reemplazar</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Button icon={Upload} variant="outline" onPress={uploadDeliverable}>
                    Elegir archivo del dispositivo
                  </Button>
                )}
              </View>
            ) : null}

            <Button icon={Send} loading={sendingActivity} disabled={!activityReady || activitySent} onPress={sendActivity}>
              {activitySent ? "Actividad enviada" : "Enviar actividad"}
            </Button>
          </Card>
        </Section>
      ) : null}

      <Card className={cn("gap-3", completed && "border-green-200 bg-green-50")}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: completed }}
          disabled={completed || (hasActivity && !activitySent)}
          onPress={finishLesson}
          className="flex-row items-center gap-3"
        >
          <View className={cn("h-7 w-7 items-center justify-center rounded-lg border-2", completed ? "border-green-500 bg-green-500" : "border-slate-300 bg-white")}>
            {completed ? <CheckCircle2 size={16} color="#fff" /> : null}
          </View>
          <View className="flex-1">
            <Text className={cn("text-base font-bold", completed ? "text-green-800" : "text-slate-900")}>Lección finalizada</Text>
            <Text className="text-xs text-slate-500">
              {completed
                ? "Avance guardado en el dispositivo."
                : hasActivity && !activitySent
                  ? "Envía tu actividad para poder finalizar."
                  : "Márcala para desbloquear la siguiente lección."}
            </Text>
          </View>
        </Pressable>
      </Card>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Button variant="outline" onPress={() => router.back()}>
            Volver
          </Button>
        </View>
        <View className="flex-1">
          <Button
            disabled={!completed}
            onPress={() =>
              nextLesson
                ? router.replace({ pathname: "/(paco)/training/[courseId]/[lessonId]", params: { courseId: course.id, lessonId: nextLesson.id } })
                : router.back()
            }
          >
            {nextLesson ? "Siguiente" : "Ir al temario"}
          </Button>
        </View>
      </View>

      <ConfirmSheet
        visible={permissionAsk}
        title="¿Permitir que Paco grabe audio?"
        message="Necesitamos acceso al micrófono para grabar tu actividad práctica. (Permiso simulado del sistema)"
        confirmLabel="Permitir y grabar"
        onConfirm={startRecording}
        onCancel={() => setPermissionAsk(false)}
      />
    </Screen>
  );
}
