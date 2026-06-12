import { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, FileQuestion } from "@/components/paco/glyphs";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { peopleAssets } from "@/components/paco/assets";
import { Button, EmptyState, Screen, glassTextAreaClass } from "@/components/paco/layout";
import { WizardStep } from "@/components/paco/wizard-step";
import { RadioOption, SelectChip, StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { MorphButton, type MorphStatus } from "@/components/paco/motion";
import { simulate } from "@/lib/paco-api";
import { scheduleWizardAdvance } from "@/lib/wizard-flow";
import { surveys } from "@/mock/paco";
import { colors } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

export default function SurveyRunnerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const survey = surveys.find((s) => s.id === id);
  const { completeSurvey } = usePacoStore();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [sendStatus, setSendStatus] = useState<MorphStatus>("idle");
  const [finished, setFinished] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!survey) {
    return (
      <Screen title="Encuesta no encontrada">
        <EmptyState title="Sin encuesta" description="La encuesta solicitada no existe o ya no está disponible." icon={FileQuestion} image={peopleAssets.surveyBlank} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  if (finished) {
    return (
      <Screen>
        <SuccessCard
          transparent
          title="¡Encuesta enviada!"
          description={
            survey.mandatory
              ? "Gracias por completar la encuesta obligatoria. La navegación de la app queda desbloqueada."
              : "Tus respuestas se enviaron al panel de tu empresa. Gracias por participar."
          }
          image={peopleAssets.surveyFinal}
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

  const setAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    if (question.kind === "open" || question.kind === "multi") return;
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = scheduleWizardAdvance(() => {
      const finalAnswers = { ...answers, [question.id]: value };
      if (index < total - 1) {
        setAnswers(finalAnswers);
        setMultiSelection([]);
        setIndex(index + 1);
      } else {
        void (async () => {
          setSendStatus("loading");
          await simulate(null, 900);
          completeSurvey(survey.id, finalAnswers);
          setSendStatus("success");
          setTimeout(() => setFinished(true), 650);
        })();
      }
    });
  };

  const toggleMulti = (option: string) => {
    setMultiSelection((prev) => {
      const next = prev.includes(option) ? prev.filter((x) => x !== option) : [...prev, option];
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      if (next.length > 0) {
        advanceTimer.current = scheduleWizardAdvance(() => {
          const finalAnswers = { ...answers, [question.id]: next.join(", ") };
          if (index < total - 1) {
            setAnswers(finalAnswers);
            setMultiSelection([]);
            setIndex(index + 1);
          } else {
            void (async () => {
              setSendStatus("loading");
              await simulate(null, 900);
              completeSurvey(survey.id, finalAnswers);
              setSendStatus("success");
              setTimeout(() => setFinished(true), 650);
            })();
          }
        }, 480);
      }
      return next;
    });
  };

  const next = async () => {
    const finalAnswers = question.kind === "multi" ? { ...answers, [question.id]: multiSelection.join(", ") } : answers;
    if (index < total - 1) {
      setAnswers(finalAnswers);
      setMultiSelection([]);
      setIndex(index + 1);
      return;
    }
    setSendStatus("loading");
    await simulate(null, 900);
    completeSurvey(survey.id, finalAnswers);
    setSendStatus("success");
    setTimeout(() => setFinished(true), 650);
  };

  return (
    <Screen>
      {index > 0 ? (
        <Pressable accessibilityRole="button" onPress={() => setIndex(index - 1)} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      <WizardStep stepKey={`${survey.id}-${index}`}>
      <StepHeader step={index + 1} total={total} title={`Pregunta ${index + 1} de ${total}`} subtitle={survey.title} />

      {/* La pregunta va transparente sobre el canvas: solo el StepHeader lleva
          fondo; las opciones (radio/chips/escala) sostienen su propio contraste. */}
      <View style={{ marginTop: 28 }} className="gap-4 px-1">
        <Image source={question.kind === "scale" ? peopleAssets.surveyWink : peopleAssets.surveyWelcome} resizeMode="contain" style={{ alignSelf: "center", width: 150, height: 96 }} />
        <Text className="text-lg font-bold leading-7 text-ink-body">{question.text}</Text>

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
                onPress={() => toggleMulti(option)}
              />
            ))}
          </View>
        ) : null}

        {question.kind === "scale" && question.options ? (
          <View className="flex-row justify-between">
            {question.options.map((option) => {
              const selected = currentAnswer === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  onPress={() => setAnswer(option)}
                  className={cn("h-14 w-14 items-center justify-center rounded-2xl border", selected ? "border-navy" : "border-white/80 bg-white/70")}
                  style={selected ? { backgroundColor: colors.navy } : undefined}
                >
                  <Text className={cn("text-lg font-bold", selected ? "text-white" : "text-ink-body")}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {question.kind === "open" ? (
          <TextInput
            value={answers[question.id] ?? ""}
            onChangeText={(text) => setAnswers((prev) => ({ ...prev, [question.id]: text }))}
            multiline
            placeholder="Escribe tu respuesta (opcional)…"
            placeholderTextColor="#94a3b8"
            className={cn(glassTextAreaClass, "min-h-28")}
          />
        ) : null}
      </View>

      {question.kind === "open" ? (
        index < total - 1 ? (
          <Button onPress={next}>Continuar</Button>
        ) : (
          <MorphButton
            label="Enviar encuesta"
            loadingLabel="Enviando respuestas…"
            successLabel="Encuesta enviada"
            status={sendStatus}
            onPress={next}
          />
        )
      ) : null}
      </WizardStep>

      {survey.mandatory ? (
        <Text className="text-center text-xs text-slate-400">Encuesta obligatoria: no podrás usar la app hasta enviarla.</Text>
      ) : null}
    </Screen>
  );
}
