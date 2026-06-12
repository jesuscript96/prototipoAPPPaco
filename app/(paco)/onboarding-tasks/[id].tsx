import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, FileQuestion, Send } from "@/components/paco/glyphs";
import { Text, TextInput, View } from "react-native";
import { Badge, Button, Card, EmptyState, InlineAlert, Screen, Section, glassTextAreaClass } from "@/components/paco/layout";
import { FileTile, RadioOption, StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { onboardingTasks } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function OnboardingTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = onboardingTasks.find((t) => t.id === id);
  const { onboardingStatus, submitOnboardingTask, downloadedFiles, downloadFile } = usePacoStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  if (!task) {
    return (
      <Screen title="Tarea no encontrada">
        <EmptyState title="Sin tarea" description="La tarea de onboarding no existe o fue retirada." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  const status = onboardingStatus[task.id] ?? "Pendiente";
  const done = status !== "Pendiente";
  const needsMentor = task.kind === "Examen";
  const examComplete = task.examQuestions?.every((q) => (answers[q.id] ?? "").trim().length > 0) ?? true;

  const complete = async () => {
    setSending(true);
    await simulate(null, 900);
    submitOnboardingTask(task.id, needsMentor);
    setSending(false);
  };

  if (done) {
    return (
      <Screen>
        <SuccessCard
          title={status === "Por calificar" ? "Avance enviado a tu mentor" : "Tarea completada"}
          description={
            status === "Por calificar"
              ? `${task.mentor ?? "Tu mentor"} recibió tus respuestas y las calificará pronto. Te llegará una notificación con el resultado.`
              : "Esta tarea quedó registrada como completada en tu plan de onboarding."
          }
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.back()}>Volver al plan</Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen eyebrow={`${task.kind} · ${task.scheduledFor}`} title={task.title}>
      <View className="flex-row flex-wrap items-center gap-2">
        <Badge tone={task.dueTone === "warning" ? "warning" : "neutral"}>Vence {task.due}</Badge>
        {task.mentor ? <Badge tone="info">Mentor: {task.mentor}</Badge> : null}
      </View>

      <Card className="gap-2">
        <Text className="text-base leading-6 text-slate-700">{task.description}</Text>
      </Card>

      {task.materials.length > 0 ? (
        <Section title="Material adjunto">
          <View className="gap-2">
            {task.materials.map((material) => (
              <FileTile
                key={material.name}
                name={material.name}
                kind={material.type}
                size={material.size}
                downloaded={downloadedFiles.includes(material.name)}
                onDownload={() => downloadFile(material.name)}
                actionLabel={material.type === "Video" || material.type === "Audio" ? "Reproducir" : "Abrir"}
              />
            ))}
          </View>
        </Section>
      ) : null}

      {task.kind === "Examen" && task.examQuestions ? (
        <Section title="Cuestionario" description="Tu mentor revisará y calificará tus respuestas.">
          <View className="gap-3">
            {task.examQuestions.map((question, index) => (
              <Card key={question.id} className="gap-3">
                <StepHeader step={index + 1} total={task.examQuestions?.length ?? 0} title={question.text} />
                {question.kind === "single" && question.options ? (
                  <View className="gap-2">
                    {question.options.map((option) => (
                      <RadioOption
                        key={option}
                        label={option}
                        selected={answers[question.id] === option}
                        onPress={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      />
                    ))}
                  </View>
                ) : null}
                {question.kind === "yesno" ? (
                  <View className="gap-2">
                    {["Sí", "No"].map((option) => (
                      <RadioOption
                        key={option}
                        label={option}
                        selected={answers[question.id] === option}
                        onPress={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      />
                    ))}
                  </View>
                ) : null}
                {question.kind === "open" ? (
                  <TextInput
                    value={answers[question.id] ?? ""}
                    onChangeText={(text) => setAnswers((prev) => ({ ...prev, [question.id]: text }))}
                    multiline
                    placeholder="Escribe tu respuesta…"
                    placeholderTextColor="#94a3b8"
                    className={cn(glassTextAreaClass, "min-h-20")}
                  />
                ) : null}
              </Card>
            ))}
          </View>
        </Section>
      ) : null}

      {task.kind === "Mensaje" ? (
        <InlineAlert title="Confirmación de lectura" description="Al confirmar, tu empresa verá que leíste este mensaje de bienvenida." tone="info" />
      ) : null}

      <Button
        icon={task.kind === "Examen" ? Send : CheckCircle2}
        loading={sending}
        disabled={task.kind === "Examen" && !examComplete}
        onPress={complete}
      >
        {task.kind === "Mensaje" ? "Confirmar lectura" : task.kind === "Examen" ? "Enviar respuestas al mentor" : "Marcar material como estudiado"}
      </Button>
    </Screen>
  );
}
