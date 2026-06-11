import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { BarChart3, ChevronLeft } from "@/components/paco/glyphs";
import { Image, Pressable, Text, View } from "react-native";
import { assetForMoodScore, illustrationAssets } from "@/components/paco/assets";
import { Button, Card, Screen, Section } from "@/components/paco/layout";
import { SelectChip, StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { baseFeelings, extraFeelings, moodFactors, moodLevels } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const levelForScore = (score: number) =>
  moodLevels.reduce((best, level) => (Math.abs(level.score - score) < Math.abs(best.score - score) ? level : best), moodLevels[0]);

function MoodSlider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const segments = 21;
  const level = levelForScore(value);
  return (
    <View className="gap-4">
      <View className="items-center gap-2">
        <View style={{ backgroundColor: `${level.color}22` }} className="h-28 w-28 items-center justify-center rounded-full">
          <Image source={assetForMoodScore(value)} resizeMode="contain" style={{ width: 72, height: 72 }} />
        </View>
        <Text style={{ color: level.color }} className="text-2xl font-bold">
          {level.label}
        </Text>
      </View>
      <View className="flex-row items-center gap-0.5">
        {Array.from({ length: segments }).map((_, index) => {
          const segmentValue = Math.round((index / (segments - 1)) * 100);
          return (
            <Pressable
              key={index}
              accessibilityLabel={`Nivel ${segmentValue} de 100`}
              onPress={() => onChange(segmentValue)}
              className="h-9 flex-1 justify-center"
            >
              <View
                style={segmentValue <= value ? { backgroundColor: level.color } : undefined}
                className={cn("h-2.5 rounded-full", segmentValue > value && "bg-slate-200")}
              />
            </Pressable>
          );
        })}
      </View>
      <View className="flex-row justify-between">
        <Text className="text-xs font-semibold text-slate-500">Muy mal</Text>
        <Text className="text-xs font-semibold text-slate-500">Muy bien</Text>
      </View>
    </View>
  );
}

export default function MoodScreen() {
  const router = useRouter();
  const { moodRegisteredToday, moodEntries, registerMood } = usePacoStore();
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [score, setScore] = useState(50);
  const [feelings, setFeelings] = useState<string[]>([]);
  const [factors, setFactors] = useState<string[]>([]);
  const [showMoreFeelings, setShowMoreFeelings] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggle = (list: string[], setList: (next: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  const todayEntry = useMemo(() => moodEntries.find((entry) => entry.dateLabel.startsWith("Hoy")), [moodEntries]);
  const feelingOptions = showMoreFeelings ? [...baseFeelings, ...extraFeelings] : [...baseFeelings];

  const save = async () => {
    setSaving(true);
    await simulate(null, 800);
    registerMood(score, feelings, factors);
    setSaving(false);
    setStep(4);
  };

  // Pantalla resumen (sin registro o ya registrado)
  if (step === 0) {
    return (
      <Screen title="Hoy, 10 de junio" description="Tu registro diario alimenta los analíticos de clima laboral de forma anónima y agregada.">
        {moodRegisteredToday && todayEntry ? (
          <Card className="items-center gap-3 py-6">
            <Image source={assetForMoodScore(todayEntry.score)} resizeMode="contain" style={{ width: 64, height: 64 }} />
            <Text className="text-xl font-bold text-slate-950">Te sientes “{levelForScore(todayEntry.score).label}”</Text>
            {todayEntry.feelings.length > 0 ? (
              <Text className="text-center text-sm text-slate-600">Sentimientos: {todayEntry.feelings.join(", ")}</Text>
            ) : null}
            {todayEntry.factors.length > 0 ? (
              <Text className="text-center text-sm text-slate-600">Factores: {todayEntry.factors.join(", ")}</Text>
            ) : null}
            <Text className="text-xs font-bold text-green-700">Registro de hoy completado</Text>
          </Card>
        ) : (
          <Card className="items-center gap-3 py-8">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-slate-900/5">
              <Image source={illustrationAssets.wellness} resizeMode="contain" style={{ width: 48, height: 48 }} />
            </View>
            <Text className="text-lg font-bold text-slate-900">Sin entrada</Text>
            <Text className="text-center text-sm leading-5 text-slate-500">
              Aún no registras cómo te sientes hoy. Toma menos de un minuto.
            </Text>
          </Card>
        )}

        <View className="gap-2">
          {!moodRegisteredToday ? <Button onPress={() => setStep(1)}>Registra tu estado de ánimo</Button> : null}
          <Button icon={BarChart3} variant={moodRegisteredToday ? "primary" : "outline"} onPress={() => router.push("/(paco)/mood-charts")}>
            Mostrar gráficas
          </Button>
        </View>

        <Section title="Entradas recientes">
          <View className="gap-2">
            {moodEntries.slice(0, 5).map((entry) => {
              const level = levelForScore(entry.score);
              return (
                <Card key={entry.id} className="flex-row items-center gap-3 py-3">
                  <Image source={assetForMoodScore(entry.score)} resizeMode="contain" style={{ width: 30, height: 30 }} />
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-slate-900">
                      {entry.dateLabel} · {level.label}
                    </Text>
                    <Text className="text-xs text-slate-500" numberOfLines={1}>
                      {[...entry.feelings, ...entry.factors].join(" · ") || "Sin etiquetas"}
                    </Text>
                  </View>
                </Card>
              );
            })}
          </View>
        </Section>
      </Screen>
    );
  }

  if (step === 4) {
    return (
      <Screen>
        <SuccessCard
          title="Tu registro ha sido exitoso"
          description="Gracias por compartir cómo te sientes. Tu registro se sumó a tu histórico y a los analíticos de tu empresa."
          image={illustrationAssets.success}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.push("/(paco)/mood-charts")}>Mostrar gráficas</Button>
            <Button variant="ghost" onPress={() => setStep(0)}>
              Volver al resumen
            </Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable accessibilityRole="button" onPress={() => setStep((s) => (s === 1 ? 0 : ((s - 1) as typeof step)))} className="min-h-11 flex-row items-center gap-1">
        <ChevronLeft size={18} color="#2F42CB" />
        <Text className="text-sm font-bold text-brand-700">Anterior</Text>
      </Pressable>

      {step === 1 ? (
        <>
          <StepHeader step={1} total={3} title="Elige cómo te has sentido hoy" subtitle="Desliza o toca la barra: el avatar cambia contigo." />
          <Card className="py-6">
            <MoodSlider value={score} onChange={setScore} />
          </Card>
          <Button onPress={() => setStep(2)}>Siguiente</Button>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <StepHeader step={2} total={3} title="¿Qué describe lo que sientes?" subtitle="Selecciona una o varias etiquetas." />
          <Card className="gap-3">
            <View className="flex-row flex-wrap gap-2">
              {feelingOptions.map((feeling) => (
                <SelectChip key={feeling} label={feeling} active={feelings.includes(feeling)} onPress={() => toggle(feelings, setFeelings, feeling)} />
              ))}
            </View>
            {!showMoreFeelings ? (
              <Button variant="ghost" onPress={() => setShowMoreFeelings(true)}>
                Mostrar más
              </Button>
            ) : null}
          </Card>
          <Button onPress={() => setStep(3)} disabled={feelings.length === 0}>
            Siguiente {feelings.length > 0 ? `(${feelings.length})` : ""}
          </Button>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <StepHeader step={3} total={3} title="¿Qué te está afectando más?" subtitle="Factores de influencia: elige tantos como quieras." />
          <Card>
            <View className="flex-row flex-wrap gap-2">
              {moodFactors.map((factor) => (
                <SelectChip key={factor} label={factor} active={factors.includes(factor)} onPress={() => toggle(factors, setFactors, factor)} />
              ))}
            </View>
          </Card>
          <Button loading={saving} onPress={save} disabled={factors.length === 0}>
            Guardar registro
          </Button>
        </>
      ) : null}
    </Screen>
  );
}
