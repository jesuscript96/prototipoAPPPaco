import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Award, Check, FileQuestion, Lock, Play } from "@/components/paco/glyphs";
import { Pressable, Text, TextInput, View } from "react-native";
import { Badge, Button, Card, EmptyState, Progress, Screen, Section, glassTextAreaClass } from "@/components/paco/layout";
import { RadioOption, SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { completedLessons, courseProgress, isLessonLocked, lessonKey } from "@/lib/paco-training";
import { courses } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

export default function CourseScreen() {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const course = courses.find((c) => c.id === courseId);
  const store = usePacoStore();
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [satisfactionAnswers, setSatisfactionAnswers] = useState<Record<string, string>>({});
  const [sendingEval, setSendingEval] = useState(false);
  const [sendingSatisfaction, setSendingSatisfaction] = useState(false);

  if (!course) {
    return (
      <Screen title="Curso no encontrado">
        <EmptyState title="Sin curso" description="El curso solicitado no existe o fue retirado." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  const finished = store.finishedCourses.includes(course.id);
  const lessonsDone = completedLessons(course, store.lessonStates);
  const allLessonsDone = lessonsDone === course.lessons.length;
  const evalDone = !course.evaluation || !!store.evaluationDone[course.id];
  const satisfactionDone = !course.satisfaction || !!store.satisfactionDone[course.id];
  const progress = courseProgress(course, store.lessonStates, store.evaluationDone, store.satisfactionDone, store.finishedCourses);
  const downloaded = store.downloadedCourses.includes(course.id);
  const firstPendingIndex = course.lessons.findIndex((lesson) => !store.lessonStates[lessonKey(course.id, lesson.id)]?.completed);

  const examComplete = course.evaluation?.questions.every((q) => (examAnswers[q.id] ?? "").trim().length > 0) ?? true;
  const satisfactionComplete = course.satisfaction?.every((q) => (satisfactionAnswers[q.id] ?? "").length > 0) ?? true;

  const submitEvaluation = async () => {
    setSendingEval(true);
    await simulate(null, 900);
    store.completeEvaluation(course.id);
    setSendingEval(false);
  };

  const submitSatisfaction = async () => {
    setSendingSatisfaction(true);
    await simulate(null, 900);
    store.completeSatisfaction(course.id);
    setSendingSatisfaction(false);
    if (!course.evaluation || store.evaluationDone[course.id]) store.finishCourse(course.id, course.title);
  };

  const canFinish = allLessonsDone && evalDone && satisfactionDone && !finished;

  return (
    <Screen eyebrow="Capacitación" title={course.title}>
      <View className="flex-row flex-wrap items-center gap-2">
        {course.mandatory ? <Badge tone="warning">Obligatorio</Badge> : null}
        <Badge tone={course.mode === "Offline" ? "info" : "neutral"}>{course.mode}</Badge>
        {downloaded ? <Badge tone="success">Disponible sin conexión</Badge> : null}
        <Badge tone="neutral">{course.deadline}</Badge>
      </View>

      <Card className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-slate-700">Tu avance</Text>
          <Text className="text-sm font-bold text-brand-700">{progress}%</Text>
        </View>
        <Progress value={progress} />
        <Text className="text-xs text-slate-500">
          {lessonsDone} de {course.lessons.length} lecciones completadas
          {course.evaluation ? ` · evaluación ${evalDone ? "" : "pendiente"}` : ""}
          {course.satisfaction ? ` · satisfacción ${satisfactionDone ? "" : "pendiente"}` : ""}
        </Text>
      </Card>

      {finished ? (
        <SuccessCard
          title="Capacitación finalizada al 100%"
          description="Tu constancia quedó registrada en el panel y recibiste una medalla de Excelencia por completar el curso."
        >
          <View className="w-full pt-2">
            <Button variant="outline" onPress={() => router.push("/(paco)/recognitions")}>
              Ver mi medalla
            </Button>
          </View>
        </SuccessCard>
      ) : firstPendingIndex >= 0 ? (
        <Button
          icon={Play}
          onPress={() =>
            router.push({
              pathname: "/(paco)/training/[courseId]/[lessonId]",
              params: { courseId: course.id, lessonId: course.lessons[firstPendingIndex]?.id ?? "l1" },
            })
          }
        >
          {lessonsDone === 0 ? "Comenzar capacitación" : "Continuar capacitación"}
        </Button>
      ) : null}

      <Section title="Temario" description="Las lecciones se desbloquean en orden al completar la anterior.">
        <View className="gap-2">
          {course.lessons.map((lesson, index) => {
            const state = store.lessonStates[lessonKey(course.id, lesson.id)];
            const locked = isLessonLocked(course, index, store.lessonStates);
            const completed = !!state?.completed;
            return (
              <Pressable
                key={lesson.id}
                accessibilityRole="button"
                disabled={locked}
                onPress={() =>
                  router.push({ pathname: "/(paco)/training/[courseId]/[lessonId]", params: { courseId: course.id, lessonId: lesson.id } })
                }
                style={completed ? { borderColor: vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" } : undefined}
                className={cn(
                  "flex-row items-center gap-3 rounded-2xl border p-3.5",
                  !completed && (locked ? "border-slate-200 bg-white/40 opacity-60" : "border-white/80 bg-white/50"),
                )}
              >
                <View
                  style={completed ? { backgroundColor: vibrants.success.accent } : undefined}
                  className={cn(
                    "h-9 w-9 items-center justify-center rounded-full",
                    !completed && (locked ? "bg-slate-300" : "bg-brand-500"),
                  )}
                >
                  {locked ? <Lock size={14} color="#fff" /> : completed ? <Check size={14} color="#fff" strokeWidth={3} /> : <Text className="text-xs font-bold text-white">{index + 1}</Text>}
                </View>
                <View className="flex-1">
                  <Text className={cn("text-sm font-bold", locked ? "text-slate-500" : "text-slate-900")}>{lesson.title}</Text>
                  <Text className="text-xs text-slate-500" numberOfLines={1}>
                    {completed ? "Lección finalizada" : locked ? "Se desbloquea al completar la anterior" : lesson.summary}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Section>

      {course.evaluation && allLessonsDone && !store.evaluationDone[course.id] ? (
        <Section title="Evaluación final" description="Responde para acreditar el curso.">
          <View className="gap-3">
            {course.evaluation.questions.map((question) => (
              <Card key={question.id} className="gap-2.5">
                <Text className="text-base font-bold text-slate-950">{question.text}</Text>
                {question.kind === "single" && question.options ? (
                  question.options.map((option) => (
                    <RadioOption
                      key={option}
                      label={option}
                      selected={examAnswers[question.id] === option}
                      onPress={() => setExamAnswers((prev) => ({ ...prev, [question.id]: option }))}
                    />
                  ))
                ) : (
                  <TextInput
                    value={examAnswers[question.id] ?? ""}
                    onChangeText={(text) => setExamAnswers((prev) => ({ ...prev, [question.id]: text }))}
                    multiline
                    placeholder="Escribe tu respuesta…"
                    placeholderTextColor="#94a3b8"
                    className={cn(glassTextAreaClass, "min-h-20")}
                  />
                )}
              </Card>
            ))}
            <Button loading={sendingEval} disabled={!examComplete} onPress={submitEvaluation}>
              Enviar evaluación
            </Button>
          </View>
        </Section>
      ) : null}

      {course.satisfaction && allLessonsDone && evalDone && !store.satisfactionDone[course.id] ? (
        <Section title="Encuesta de satisfacción" description="Califica el curso del 1 al 5.">
          <View className="gap-3">
            {course.satisfaction.map((question) => (
              <Card key={question.id} className="gap-3">
                <Text className="text-base font-bold text-slate-950">{question.text}</Text>
                <View className="flex-row justify-between">
                  {["1", "2", "3", "4", "5"].map((option) => (
                    <Pressable
                      key={option}
                      accessibilityRole="button"
                      onPress={() => setSatisfactionAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      className={cn(
                        "h-12 w-12 items-center justify-center rounded-2xl border",
                        satisfactionAnswers[question.id] === option ? "border-brand-500 bg-brand-500" : "border-white/80 bg-white/50",
                      )}
                    >
                      <Text className={cn("text-base font-bold", satisfactionAnswers[question.id] === option ? "text-white" : "text-slate-700")}>
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Card>
            ))}
            <Button icon={Award} loading={sendingSatisfaction} disabled={!satisfactionComplete} onPress={submitSatisfaction}>
              Enviar y finalizar curso
            </Button>
          </View>
        </Section>
      ) : null}

      {canFinish && !course.satisfaction ? (
        <Button icon={Award} onPress={() => store.finishCourse(course.id, course.title)}>
          Finalizar curso
        </Button>
      ) : null}
    </Screen>
  );
}
