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
import { quickActionAssets } from "@/components/paco/assets";
import { GlassHero, GlassModuleTile, GlassSurface } from "@/components/paco/glass";
import { Card, InlineAlert, Screen, Section, type Tone } from "@/components/paco/layout";
import { ToggleRow } from "@/components/paco/ui";
import { materials, separators, typography, type MaterialName } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

const materialScale: { name: MaterialName; label: string; usage: string }[] = [
  { name: "ultraThin", label: "Ultra Thin", usage: "Solo flotantes sobre fondo controlado" },
  { name: "thin", label: "Thin", usage: "Chips, search, inputs" },
  { name: "regular", label: "Regular", usage: "Cards de contenido (estándar)" },
  { name: "thick", label: "Thick", usage: "Banners de estado, dock" },
  { name: "ultraThick", label: "Ultra Thick", usage: "Sheets, modales, texto denso" },
];

const labelScale: { name: string; className: string; sample: string }[] = [
  { name: "Primary", className: "text-label-primary", sample: "Título principal · máximo contraste" },
  { name: "Secondary", className: "text-label-secondary", sample: "Subtítulos y descripciones" },
  { name: "Tertiary", className: "text-label-tertiary", sample: "Placeholders y metadatos" },
  { name: "Quaternary", className: "text-label-quaternary", sample: "Decorativo y deshabilitado" },
];

const toneScale: Tone[] = ["success", "warning", "danger", "info", "neutral"];

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
  { group: "Oscuros · Visual 5.0", swatches: [
    { name: "Navy primario", hex: "#004080", text: "#fff" },
    { name: "Navy deep", hex: "#003366", text: "#fff" },
    { name: "Navy soft", hex: "#0059A8", text: "#fff" },
    { name: "Texto body", hex: "#2B2B2B", text: "#fff" },
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
  const reduceTransparency = usePacoStore((s) => s.reduceTransparency);
  const setReduceTransparency = usePacoStore((s) => s.setReduceTransparency);
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

      <Section title="Tipografía" description="Inter neogrotesca premium: Black/Bold con tracking negativo en títulos; Medium en botones; Regular/Light antracita en cuerpo y legales (line-height 1.45–1.5).">
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

      <Section title="Iconografía" description="Phosphor Icons en peso Bold, sobre burbujas de vidrio neutro: el color del dominio vive en el glifo.">
        <Card className="flex-row flex-wrap gap-3">
          {iconRow.map((IconComponent, index) => (
            <View key={index} className="h-11 w-11 items-center justify-center rounded-[12px] border border-separator bg-white/55">
              <IconComponent size={20} color="#2F42CB" weight="bold" />
            </View>
          ))}
        </Card>
      </Section>

      <Section
        title="Materiales · Liquid Glass 6.0"
        description="Cinco grosores estilo Apple: a mayor grosor, más opacidad y blur, protegiendo el contraste sobre fondos claros o impredecibles."
      >
        <View className="gap-3">
          {materialScale.map((item) => (
            <GlassSurface key={item.name} material={item.name} radius={16} className="gap-0.5 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] font-bold text-label-primary">{item.label}</Text>
                <Text className="text-[11px] font-semibold text-label-tertiary">
                  alpha {Math.round(materials[item.name].webAlpha * 100)}% · blur {materials[item.name].blur}px
                </Text>
              </View>
              <Text className="text-[12px] leading-5 text-label-secondary">{item.usage}</Text>
            </GlassSurface>
          ))}
        </View>
      </Section>

      <Section
        title="Colores jerárquicos (vibrancy)"
        description="Labels rgba sobre el vidrio: el texto absorbe el fondo y mantiene el contraste automáticamente. Nada de grises fijos."
      >
        <Card className="gap-2.5">
          {labelScale.map((item) => (
            <View key={item.name} className="flex-row items-baseline gap-3">
              <Text className="w-24 text-[11px] font-bold uppercase tracking-[1px] text-label-tertiary">{item.name}</Text>
              <Text className={`flex-1 text-[15px] font-semibold ${item.className}`}>{item.sample}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section
        title="Capa de separación"
        description="Todo contenedor glass lleva borde 1px (separator) y highlight superior. En Reduce Transparency el borde pasa a opaque separator."
      >
        <Card className="gap-3">
          <View className="gap-1">
            <Text className="text-[11px] font-bold uppercase tracking-[1px] text-label-tertiary">Separator (hairline)</Text>
            <View style={{ backgroundColor: separators.separator }} className="h-px" />
          </View>
          <View className="gap-1">
            <Text className="text-[11px] font-bold uppercase tracking-[1px] text-label-tertiary">Opaque separator</Text>
            <View style={{ backgroundColor: separators.opaqueSeparator }} className="h-px" />
          </View>
          <View className="gap-1">
            <Text className="text-[11px] font-bold uppercase tracking-[1px] text-label-tertiary">Glass edge (highlight)</Text>
            <View style={{ backgroundColor: separators.glassEdge }} className="h-px" />
          </View>
        </Card>
      </Section>

      <Section
        title="Acentos vibrantes"
        description="El color semántico nunca es relleno: vive en el dot, el borde y el wash ≤8% dentro del vidrio thick."
      >
        <View className="gap-2.5">
          {toneScale.map((tone) => (
            <InlineAlert
              key={tone}
              tone={tone}
              title={`Estado ${tone}`}
              description="Material thick + borde vibrante + dot de acento + labels jerárquicos."
            />
          ))}
        </View>
      </Section>

      <Section
        title="Reduce Transparency"
        description="Demo en vivo: el motor glass rinde el fallback opaco de cada material, sin blur, con bordes opacos. En iOS también responde a la preferencia del sistema."
      >
        <ToggleRow
          label="Reducir transparencia"
          helper={reduceTransparency ? "Superficies sólidas activas" : "Efecto vidrio activo"}
          value={reduceTransparency}
          onChange={setReduceTransparency}
        />
      </Section>

      <Section title="Superficies del sistema" description="Hero navy oscuro (labels on-dark) y tiles de módulo sobre material regular.">
        <View className="gap-3">
          <GlassHero eyebrow="Vacaciones" title="Vacaciones" subtitle="Solicita días de descanso con aprobación de tu jefe." />
          <View className="flex-row flex-wrap justify-between gap-y-3">
            <View className="w-[48%]">
              <GlassModuleTile title="Adelanto de nómina" icon={quickActionAssets.advance} href="/(paco)/advance" core accessibilityLabel="Adelanto de nómina. Hasta $2,500 esta quincena" />
            </View>
            <View className="w-[48%]">
              <GlassModuleTile title="Recargas" icon={quickActionAssets.topups} href="/(paco)/topups" accessibilityLabel="Recargas. Tiempo aire y datos" />
            </View>
          </View>
        </View>
      </Section>
    </Screen>
  );
}
