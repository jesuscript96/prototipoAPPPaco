import { Text, View } from "react-native";
import { Bell, CheckCircle2, CircleAlert, Info, Search, ShieldCheck } from "lucide-react-native";
import { Card, Chip, GuideNote, InlineAlert, Progress, Screen, Section, Skeleton } from "@/components/ui";
import { colors, radius, semantic, spacing, typography } from "@/theme/tokens";

export default function FoundationsScreen() {
  const gray = ["#f8fafc", "#f1f5f9", "#e2e8f0", "#94a3b8", "#475569", "#0f172a"];

  return (
    <Screen
      eyebrow="Fundamentos"
      title="Sistema visual"
      description="Tokens para una experiencia profesional, clara y confiable en móvil."
    >
      <Section title="Colores de marca">
        <Card className="gap-3">
          <View className="h-24 rounded-3xl bg-brand-500" />
          <Text className="font-bold text-slate-950">Primario {colors.brand}</Text>
          <Text className="text-sm text-slate-500">Úsalo para acciones principales, navegación activa y énfasis controlado.</Text>
        </Card>
      </Section>

      <Section title="Escala de grises">
        <View className="flex-row gap-2">
          {gray.map((item) => <View key={item} style={{ backgroundColor: item }} className="h-16 flex-1 rounded-2xl border border-slate-200" />)}
        </View>
      </Section>

      <Section title="Colores semánticos">
        <View className="gap-2">
          {(Object.keys(semantic) as Array<keyof typeof semantic>).map((tone) => (
            <InlineAlert key={tone} tone={tone} title={semantic[tone].label} description="Siempre acompaña el color con texto, icono o estado explícito." />
          ))}
        </View>
      </Section>

      <Section title="Tipografía móvil">
        <Card className="gap-4">
          {typography.map((item) => (
            <View key={item.name}>
              <Text className="text-xs font-bold uppercase text-slate-400">{item.name}</Text>
              <Text className={item.className}>{item.sample}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Espaciado y radios">
        <Card className="gap-4">
          <View className="flex-row flex-wrap gap-2">
            {spacing.map((value) => <Chip key={value} label={`${value}px`} active={value === 16} />)}
          </View>
          <View className="flex-row flex-wrap gap-3">
            {radius.map((value) => <View key={value} style={{ borderRadius: value }} className="h-12 w-16 bg-brand-100" />)}
          </View>
        </Card>
      </Section>

      <Section title="Sombras, iconografía y superficies">
        <Card className="gap-4">
          <View className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <Text className="font-bold text-slate-900">Card blanca con borde suave</Text>
            <Text className="text-sm text-slate-500">La elevación debe separar capas, no decorar en exceso.</Text>
          </View>
          <View className="flex-row justify-between">
            {[Search, Bell, ShieldCheck, CheckCircle2, CircleAlert, Info].map((Icon, index) => (
              <View key={index} className="h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Icon size={20} color={colors.brand} />
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title="Estados">
        <Card className="gap-4">
          <View className="rounded-2xl border border-brand-500 bg-brand-50 p-3"><Text className="font-bold text-brand-700">Foco visible</Text></View>
          <View className="rounded-2xl bg-slate-200 p-3 opacity-70"><Text className="font-bold text-slate-500">Disabled</Text></View>
          <Progress value={68} />
          <Skeleton lines={2} />
        </Card>
      </Section>

      <GuideNote />
    </Screen>
  );
}
