import { Text, View } from "react-native";
import {
  Bell,
  CalendarCheck,
  ChartPie,
  FolderOpen,
  HardHat,
  Lifebuoy,
  Medal,
  Megaphone,
  Smiley,
  Wallet,
} from "phosphor-react-native";
import { Card, Screen, Section } from "@/components/paco/layout";
import { typography } from "@/theme/tokens";

const palette = [
  { group: "Principales", swatches: [
    { name: "Azul Paco", hex: "#2F42CB", text: "#fff" },
    { name: "Azul medio", hex: "#5176F3", text: "#fff" },
    { name: "Naranja · acento estratégico", hex: "#FB4F33", text: "#fff" },
  ]},
  { group: "Azules claros", swatches: [
    { name: "Azul nube", hex: "#E4EAFF", text: "#1E1E1E" },
    { name: "Azul celeste", hex: "#ECF1FF", text: "#1E1E1E" },
    { name: "Azul bruma (canvas)", hex: "#F6F8FF", text: "#1E1E1E" },
  ]},
  { group: "Oscuros", swatches: [
    { name: "Carbón (ink)", hex: "#1E1E1E", text: "#fff" },
    { name: "Gris pizarra", hex: "#263238", text: "#fff" },
  ]},
  { group: "Énfasis UI", swatches: [
    { name: "Verde", hex: "#6AA84F", text: "#fff" },
    { name: "Amarillo", hex: "#F1C232", text: "#1E1E1E" },
    { name: "Rojo", hex: "#CC0000", text: "#fff" },
    { name: "Violeta", hex: "#674EA7", text: "#fff" },
    { name: "Mora", hex: "#A64D79", text: "#fff" },
  ]},
];

const radii = [
  { label: "Chips · 10", value: 10 },
  { label: "Filas e inputs · 12", value: 12 },
  { label: "Botones · 14", value: 14 },
  { label: "Tarjetas · 16", value: 16 },
  { label: "Sheets · 20", value: 20 },
];

const iconRow = [Wallet, Bell, Smiley, Medal, ChartPie, Megaphone, CalendarCheck, FolderOpen, Lifebuoy, HardHat];

export default function FundamentosScreen() {
  return (
    <Screen
      eyebrow="Brand guidelines"
      title="Fundamentos"
      description="Tokens extraídos de Paco_BrandGuidelines.pdf. El naranja se reserva como acento estratégico para elementos de alto valor."
    >
      {palette.map((group) => (
        <Section key={group.group} title={group.group}>
          <View className="flex-row flex-wrap gap-2">
            {group.swatches.map((swatch) => (
              <View key={swatch.hex} style={{ backgroundColor: swatch.hex }} className="min-w-[31%] flex-1 rounded-xl p-3 shadow-card">
                <Text style={{ color: swatch.text }} className="text-[12px] font-bold">
                  {swatch.name}
                </Text>
                <Text style={{ color: swatch.text, opacity: 0.75 }} className="mt-0.5 text-[11px] font-semibold">
                  {swatch.hex}
                </Text>
              </View>
            ))}
          </View>
        </Section>
      ))}

      <Section title="Tipografía" description="Gordita Bold para títulos y CTAs (interlineado 120%); Lato para cuerpos (150%). En web carga Lato; Gordita queda pendiente de licencia.">
        <Card className="gap-3">
          {typography.map((type) => (
            <View key={type.name} className="gap-0.5">
              <Text className="text-[11px] font-bold uppercase tracking-[1px] text-slate-400">{type.name}</Text>
              <Text className={type.className}>{type.sample}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Radios" description="Escala contenida: redondeado pero sin parecer juguete.">
        <Card className="flex-row flex-wrap items-end gap-3">
          {radii.map((r) => (
            <View key={r.label} className="items-center gap-1.5">
              <View style={{ borderRadius: r.value }} className="h-14 w-14 border-2 border-brand-500 bg-brand-100" />
              <Text className="text-[10px] font-semibold text-slate-500">{r.label}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Iconografía" description="Phosphor Icons en peso Bold, sobre burbujas tintadas por dominio.">
        <Card className="flex-row flex-wrap gap-3">
          {iconRow.map((IconComponent, index) => (
            <View key={index} className="h-11 w-11 items-center justify-center rounded-[12px] bg-brand-100">
              <IconComponent size={20} color="#2F42CB" weight="bold" />
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Material glass" description="Superficies translúcidas con borde hairline sobre el fondo ambiental; el contraste lo anclan los elementos en carbón.">
        <Card className="gap-1">
          <Text className="text-[13px] font-bold text-slate-900">bg-white/75 · border-white/80 · shadow-card</Text>
          <Text className="text-[12px] leading-5 text-slate-500">
            Las tarjetas dejan traslucir los brillos azules del fondo. Los CTAs usan carbón #1E1E1E para máximo contraste en claro.
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}
