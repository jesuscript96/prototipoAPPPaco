import { Text, View } from "react-native";
import { Download, TrendingUp } from "lucide-react-native";
import { Button, Card, InlineAlert, KpiCard, Screen, Section, SegmentedControl } from "@/components/ui";
import { chartBars, kpis } from "@/mock/data";

export default function ReportsScreen() {
  return (
    <Screen
      eyebrow="Analytics"
      title="Reportes"
      description="Visualización simple y legible para móvil; evita tablas densas y prioriza decisiones."
    >
      <SegmentedControl options={["Semana", "Mes", "Trimestre"]} value="Semana" />
      <View className="gap-3">
        {kpis.map((item) => <KpiCard key={item.label} {...item} />)}
      </View>
      <Section title="Tendencia semanal">
        <Card className="gap-4">
          <View className="h-40 flex-row items-end gap-2">
            {chartBars.map((height, index) => (
              <View key={index} style={{ height: `${height}%` }} className="flex-1 rounded-t-2xl bg-brand-500" />
            ))}
          </View>
          <Text className="text-sm text-slate-500">Barras mock: volumen relativo de solicitudes por día.</Text>
          <Button icon={Download} variant="outline">Exportar mock</Button>
        </Card>
      </Section>
      <InlineAlert tone="info" title="Consideración mobile" description="Para datos complejos, muestra resumen, tendencia y opción de profundizar; no intentes replicar una tabla desktop." />
      <Button icon={TrendingUp}>Ver oportunidades</Button>
    </Screen>
  );
}
