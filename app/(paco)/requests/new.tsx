import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CalendarDays, ChevronLeft, FileQuestion } from "@/components/paco/glyphs";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button, Card, EmptyState, InlineAlert, Screen, glassTextAreaClass } from "@/components/paco/layout";
import { GlassHero } from "@/components/paco/glass";
import { MoneyRow, RadioOption, SelectChip, StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { MorphButton, type MorphStatus } from "@/components/paco/motion";
import { WizardStep } from "@/components/paco/wizard-step";
import { simulate } from "@/lib/paco-api";
import { scheduleWizardAdvance } from "@/lib/wizard-flow";
import { requestTypes } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const dateOptions = ["Hoy · 10 jun 2026", "Mañana · 11 jun 2026", "Viernes · 12 jun 2026", "Lunes · 15 jun 2026", "Martes · 16 jun 2026"] as const;

export default function NewRequestScreen() {
  const router = useRouter();
  const { type: typeId } = useLocalSearchParams<{ type?: string }>();
  const requestType = requestTypes.find((t) => t.id === typeId);
  const { createRequest } = usePacoStore();

  const [step, setStep] = useState(0); // 0 info, 1 fechas, 2..n preguntas, n+1 comentarios, n+2 éxito
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comments, setComments] = useState("");
  const [sendStatus, setSendStatus] = useState<MorphStatus>("idle");
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!requestType) {
    return (
      <Screen title="Tipo de solicitud no encontrado">
        <EmptyState title="Sin solicitud" description="El tipo de solicitud no existe en el catálogo de tu empresa." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver al catálogo</Button>
      </Screen>
    );
  }

  const totalQuestions = requestType.questions.length;
  const questionIndex = step - 2;
  const commentStep = totalQuestions + 2;
  const successStep = totalQuestions + 3;
  const totalSteps = totalQuestions + 2; // fechas + preguntas + comentarios

  useEffect(() => {
    if (step !== 1 || !startDate || !endDate) return;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = scheduleWizardAdvance(() => setStep(2));
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, [step, startDate, endDate]);

  const submit = async () => {
    setSendStatus("loading");
    await simulate(null, 1000);
    createRequest({
      typeId: requestType.id,
      typeName: requestType.name,
      category: requestType.category,
      startDate: (startDate ?? "").replace(/^[^·]+· /, ""),
      endDate: (endDate ?? startDate ?? "").replace(/^[^·]+· /, ""),
      answers: requestType.questions.map((q) => ({ question: q.text, answer: answers[q.id] ?? "Sin respuesta" })),
      comments: comments.trim(),
      stages: ["Etapa 1 · Jefe directo", "Etapa 2 · Recursos Humanos", "Etapa 3 · Registro en nómina"],
    });
    setSendStatus("success");
    setTimeout(() => setStep(successStep), 700);
  };

  if (step === successStep) {
    return (
      <Screen>
        <SuccessCard
          title="Solicitud enviada"
          description={`Tu solicitud de “${requestType.name}” quedó registrada. Podrás modificar tus respuestas desde Solicitudes Pendientes mientras Recursos Humanos no inicie el proceso de evaluación.`}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/requests")}>Ver mis solicitudes</Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen>
      {step > 0 ? (
        <Pressable accessibilityRole="button" onPress={() => setStep(step - 1)} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      {step === 0 ? (
        <>
          <GlassHero
            eyebrow={requestType.category}
            title={requestType.name}
            subtitle={requestType.description}
          />
          <InlineAlert
            title="Flujo de aprobación"
            description={`Esta solicitud pasa por 3 etapas de autorización y suele resolverse en ~${requestType.approvalDays} días hábiles. Te notificaremos cada avance.`}
            tone="info"
          />
          <Button icon={CalendarDays} onPress={() => setStep(1)}>
            Comenzar
          </Button>
        </>
      ) : null}

      {step === 1 ? (
        <WizardStep stepKey="dates">
          <StepHeader step={1} total={totalSteps} title="Elige las fechas" subtitle="Selecciona la fecha inicial y la de finalización." />
          <Card className="gap-3">
            <Text className="text-sm font-bold text-slate-700">Fecha inicial</Text>
            <View className="flex-row flex-wrap gap-2">
              {dateOptions.map((option) => (
                <SelectChip key={`start-${option}`} label={option} active={startDate === option} onPress={() => setStartDate(option)} />
              ))}
            </View>
            <Text className="pt-2 text-sm font-bold text-slate-700">Fecha de finalización</Text>
            <View className="flex-row flex-wrap gap-2">
              {dateOptions.map((option) => (
                <SelectChip key={`end-${option}`} label={option} active={endDate === option} onPress={() => setEndDate(option)} />
              ))}
            </View>
          </Card>
        </WizardStep>
      ) : null}

      {questionIndex >= 0 && questionIndex < totalQuestions
        ? (() => {
            const question = requestType.questions[questionIndex];
            if (!question) return null;
            const answer = answers[question.id] ?? "";
            return (
              <WizardStep stepKey={`q-${question.id}`}>
                <StepHeader
                  step={questionIndex + 2}
                  total={totalSteps}
                  title={`Pregunta ${questionIndex + 1} de ${totalQuestions}`}
                  subtitle={requestType.name}
                />
                <Card className="gap-4">
                  <Text className="text-lg font-bold leading-7 text-ink-body">{question.text}</Text>
                  {question.kind === "yesno" ? (
                    <View className="gap-2">
                      {["Sí", "No"].map((option) => (
                        <RadioOption
                          key={option}
                          label={option}
                          selected={answer === option}
                          onPress={() => {
                            setAnswers((prev) => ({ ...prev, [question.id]: option }));
                            scheduleWizardAdvance(() => setStep(step + 1));
                          }}
                        />
                      ))}
                    </View>
                  ) : null}
                  {question.kind === "single" && question.options ? (
                    <View className="gap-2">
                      {question.options.map((option) => (
                        <RadioOption
                          key={option}
                          label={option}
                          selected={answer === option}
                          onPress={() => {
                            setAnswers((prev) => ({ ...prev, [question.id]: option }));
                            scheduleWizardAdvance(() => setStep(step + 1));
                          }}
                        />
                      ))}
                    </View>
                  ) : null}
                  {question.kind === "open" ? (
                    <TextInput
                      value={answer}
                      onChangeText={(text) => setAnswers((prev) => ({ ...prev, [question.id]: text }))}
                      multiline
                      placeholder="Escribe tu respuesta…"
                      placeholderTextColor="#94a3b8"
                      className={cn(glassTextAreaClass, "min-h-24")}
                    />
                  ) : null}
                </Card>
                {question.kind === "open" ? (
                  <Button disabled={answer.trim().length === 0} onPress={() => setStep(step + 1)}>
                    Continuar
                  </Button>
                ) : null}
              </WizardStep>
            );
          })()
        : null}

      {step === commentStep ? (
        <>
          <StepHeader step={totalSteps} total={totalSteps} title="Comentarios adicionales" subtitle="Opcional: agrega aclaraciones para quien evalúa." />
          <Card className="gap-3">
            <TextInput
              value={comments}
              onChangeText={setComments}
              multiline
              placeholder="Ej. revisión y pruebas…"
              placeholderTextColor="#94a3b8"
              className={cn(glassTextAreaClass, "min-h-24")}
            />
          </Card>
          <Card className="gap-2">
            <Text className="text-sm font-bold text-slate-900">Resumen</Text>
            <MoneyRow label="Tipo" value={requestType.name} />
            <MoneyRow label="Del" value={(startDate ?? "").replace(/^[^·]+· /, "")} />
            <MoneyRow label="Al" value={(endDate ?? "").replace(/^[^·]+· /, "")} />
            {requestType.questions.map((q) => (
              <MoneyRow key={q.id} label={q.text.length > 34 ? `${q.text.slice(0, 34)}…` : q.text} value={answers[q.id] ?? "—"} />
            ))}
          </Card>
          <MorphButton
            label="Enviar solicitud"
            loadingLabel="Registrando en el panel…"
            successLabel="Solicitud enviada"
            status={sendStatus}
            onPress={submit}
          />
        </>
      ) : null}
    </Screen>
  );
}
