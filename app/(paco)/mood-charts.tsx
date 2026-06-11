import { useMemo, useState } from "react";
import { LineChart } from "lucide-react-native";
import { Text, View } from "react-native";
import { Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { BarChart, CountBar, Segmented } from "@/components/paco/ui";
import { moodLevels } from "@/mock/paco";
import { moodIconFor } from "@/components/paco/icons";
import { usePacoStore } from "@/store/paco-store";

const periods = ["S", "M", "6M", "A"] as const;
const periodWeeks: Record<(typeof periods)[number], number> = { S: 0, M: 4, "6M": 26, A: 52 };

const levelForScore = (score: number) =>
  moodLevels.reduce((best, level) => (Math.abs(level.score - score) < Math.abs(best.score - score) ? level : best), moodLevels[0]);

function countItems(lists: string[][]) {
  const counts = new Map<string, number>();
  for (const list of lists) for (const item of list) counts.set(item, (counts.get(item) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export default function MoodChartsScreen() {
  const moodEntries = usePacoStore((s) => s.moodEntries);
  const [period, setPeriod] = useState<string>("M");

  const entries = useMemo(
    () => moodEntries.filter((entry) => entry.weeksAgo <= periodWeeks[(period as (typeof periods)[number]) ?? "M"]),
    [moodEntries, period],
  );

  const bars = useMemo(
    () =>
      [...entries]
        .reverse()
        .slice(-8)
        .map((entry) => ({
          label: entry.dateLabel.replace("Hoy · ", "Hoy "),
          value: Math.max(8, entry.score),
          color: levelForScore(entry.score).color,
        })),
    [entries],
  );

  const feelingCounts = useMemo(() => countItems(entries.map((entry) => entry.feelings)), [entries]);
  const factorCounts = useMemo(() => countItems(entries.map((entry) => entry.factors)), [entries]);
  const maxFeeling = feelingCounts[0]?.[1] ?? 1;
  const maxFactor = factorCounts[0]?.[1] ?? 1;
  const average = entries.length > 0 ? Math.round(entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length) : 0;

  return (
    <Screen
      title="Mis gráficas"
      description="Histórico de tus registros emocionales por semana, mes, semestre o año."
    >
      <Segmented options={periods} value={period} onChange={setPeriod} />

      {entries.length === 0 ? (
        <EmptyState title="Sin registros en este periodo" description="Registra tu estado de ánimo para empezar a ver tendencias." icon={LineChart} />
      ) : (
        <>
          <Section title="Estados" description="Tendencia general de tu humor en el tiempo.">
            <Card className="gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-slate-600">Promedio del periodo</Text>
                <View className="flex-row items-center gap-2">
                  {(() => {
                    const AvgIcon = moodIconFor(average);
                    return <AvgIcon size={24} color={levelForScore(average).color} strokeWidth={1.9} />;
                  })()}
                  <Text style={{ color: levelForScore(average).color }} className="text-lg font-bold">
                    {levelForScore(average).label}
                  </Text>
                </View>
              </View>
              <BarChart bars={bars} />
            </Card>
          </Section>

          <Section title="Sentimientos" description="Cuántas veces seleccionaste cada etiqueta.">
            <Card className="gap-3">
              {feelingCounts.length === 0 ? (
                <Text className="text-sm text-slate-500">Sin sentimientos registrados en este periodo.</Text>
              ) : (
                feelingCounts.map(([label, count]) => <CountBar key={label} label={label} count={count} max={maxFeeling} />)
              )}
            </Card>
          </Section>

          <Section title="Factores" description="Qué ha influido más en tu estado de ánimo.">
            <Card className="gap-3">
              {factorCounts.length === 0 ? (
                <Text className="text-sm text-slate-500">Sin factores registrados en este periodo.</Text>
              ) : (
                factorCounts.map(([label, count]) => <CountBar key={label} label={label} count={count} max={maxFactor} color="#0ea5e9" />)
              )}
            </Card>
          </Section>
        </>
      )}
    </Screen>
  );
}
