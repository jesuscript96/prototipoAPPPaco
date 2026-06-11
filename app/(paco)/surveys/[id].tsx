import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, FileQuestion } from "@/components/paco/glyphs";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { RadioOption, SelectChip, StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { surveys } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function SurveyRunnerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const survey = surveys.find((s) => s.id === id);
  const { completeSurvey } = usePacoStore();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!survey) {
    return (
      <Screen title="Encuesta no encontrada">
        <EmptyState title="Sin encuesta" description="La encuesta solicitada no existe o ya no está disponible." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  if (finished) {
    return (
      <Screen>
        <SuccessCard
          title="¡Encuesta enviada!"
          description={
            survey.mandatory
              ? "Gracias por completar la encuesta obligatoria. La navegación de la app queda desbloqueada."
              : "Tus respuestas se enviaron al panel de tu empresa. Gracias por participar."
          }
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/home")}>{survey.mandatory ? "Entrar al inicio" : "Volver al inicio"}</Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  const question = survey.questions[index];
  if (!question) return null;
  const total = survey.questions.length;
  const currentAnswer = question.kind === "multi" ? multiSelection.join(", ") : (answers[question.id] ?? "");
  const canContinue = question.kind === "open" ? true : currentAnswer.length > 0;

  const setAnswer = (value: string) => setAnswers((prev) => ({ ...prev, [question.id]: value }));

  const next = async () => {
    const finalAnswers = question.kind === "multi" ? { ...answers, [question.id]: multiSelection.join(", ") } : answers;
    if (index < total - 1) {
      setAnswers(finalAnswers);
      setMultiSelection([]);
      setIndex(index + 1);
      return;
    }
    setSending(true);
    await simulate(null, 900);
    completeSurvey(survey.id, finalAnswers);
    setSending(false);
    setFinished(true);
  };

  return (
    <Screen>
      {index > 0 ? (
        <Pressable accessibilityRole="button" onPress={() => setIndex(index - 1)} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      <StepHeader step={index + 1} total={total} title={`Pregunta ${index + 1} de ${total}`} subtitle={survey.title} />

      <Card className="gap-4">
        <Text className="text-lg font-bold leading-7 text-slate-950">{question.text}</Text>

        {question.kind === "yesno" ? (
          <View className="gap-2">
            {["Sí", "No"].map((option) => (
              <RadioOption key={option} label={option} selected={currentAnswer === option} onPress={() => setAnswer(option)} />
            ))}
          </View>
        ) : null}

        {question.kind === "single" && question.options ? (
          <View className="gap-2">
            {question.options.map((option) => (
              <RadioOption key={option} label={option} selected={currentAnswer === option} onPress={() => setAnswer(option)} />
            ))}
          </View>
        ) : null}

        {question.kind === "multi" && question.options ? (
          <View className="flex-row flex-wrap gap-2">
            {question.options.map((option) => (
              <SelectChip
                key={option}
                label={option}
                active={multiSelection.includes(option)}
                onPress={() =>
                  setMultiSelection((prev) => (prev.includes(option) ? prev.filter((x) => x !== option) : [...prev, option]))
                }
              />
            ))}
          </View>
        ) : null}

        {question.kind === "scale" && question.options ? (
          <View className="flex-row justify-between">
            {question.options.map((option) => (
              <Pressable
                key={option}
                accessibilityRole="button"
                onPress={() => setAnswer(option)}
                className={cn(
                  "h-14 w-14 items-center justify-center rounded-2xl border",
                  currentAnswer === option ? "border-ink bg-ink" : "border-white/80 bg-white/70",
                )}
              >
                <Text className={cn("text-lg font-bold", currentAnswer === option ? "text-white" : "text-slate-700")}>{option}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {question.kind === "open" ? (
          <TextInput
            value={answers[question.id] ?? ""}
            onChangeText={setAnswer}
            multiline
            placeholder="Escribe tu respuesta (opcional)…"
            placeholderTextColor="#94a3b8"
            className="min-h-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950"
          />
        ) : null}
      </Card>

      <Button disabled={!canContinue} loading={sending} onPress={next}>
        {index < total - 1 ? "Continuar" : "Enviar encuesta"}
      </Button>

      {survey.mandatory ? (
        <Text className="text-center text-xs text-slate-400">Encuesta obligatoria: no podrás usar la app hasta enviarla.</Text>
      ) : null}
    </Screen>
  );
}
