import { View, Text } from "react-native";
import { Card, Screen, Section } from "@/components/paco/layout";
import { BentoActionChip, BentoHalfTile, BentoHeroTile, BentoIcon, BentoMini, bentoAccents, type BentoDomain } from "@/components/paco/bento";
import { ListGroup, Row } from "@/components/paco/ui";
import { ChevronRight } from "@/components/paco/glyphs";
import { moduleIcons } from "@/components/paco/icons";
import { moduleAssets } from "@/components/paco/assets";
import { usePacoStore } from "@/store/paco-store";

const domainLabels: Record<BentoDomain, string> = {
  finance: "Finanzas",
  people: "Personas y cultura",
  docs: "Documentos",
  support: "Soporte",
};

export default function BentoScreen() {
  const showToast = usePacoStore((s) => s.showToast);

  return (
    <Screen
      eyebrow="Patrones"
      title="Bento Grid"
      description="Criterio del grid de módulos (Home): jerarquía por tamaño, color por categoría como manchita detrás del icono y listas para la gestión. Nunca una rejilla uniforme de tarjetas idénticas."
    >
      <Section
        title="Jerarquía de tres niveles"
        description="Hero: máximo una por categoría, para el módulo más usado, con dato vivo y acción directa. Half (48.5%): módulos frecuentes con meta de estado. Mini: pastilla compacta para secundarios. Si todo pesa igual, nada pesa."
      >
        <View className="gap-2.5">
          <BentoHeroTile
            icon={moduleAssets.advance}
            domain="finance"
            seed={0}
            title="Adelanto de nómina"
            subtitle="Hasta $2,500 disponibles esta quincena"
            onPress={() => showToast("Hero: navega al módulo completo.")}
            trailing={<BentoActionChip label="Solicitar" onPress={() => showToast("Acción directa del hero.")} />}
          />
          <View className="flex-row justify-between">
            <View className="w-[48.5%]">
              <BentoHalfTile icon={moduleAssets.topups} domain="finance" seed={1} title="Recargas" meta="Tiempo aire y datos" href="/(storybook)/bento" />
            </View>
            <View className="w-[48.5%]">
              <BentoHalfTile icon={moduleAssets.services} domain="finance" seed={2} title="Pago de servicios" meta="CFE, Telmex y más" href="/(storybook)/bento" />
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <BentoMini icon={moduleAssets.expenses} domain="finance" seed={3} label="Reporte de gastos" href="/(storybook)/bento" />
            <BentoMini icon={moduleAssets.pin} domain="finance" seed={0} label="Club PiN" href="/(storybook)/bento" />
          </View>
        </View>
      </Section>

      <Section
        title="Manchita e icono libre"
        description="El icono nunca va en caja con borde: flota sobre un blob orgánico sin borde (alpha bajo, radios desiguales, descentrado determinista por seed 0-3). El color identifica la categoría: Finanzas verde/petróleo, Personas coral/salmón, Documentos violeta/gris, Soporte azul pizarra."
      >
        <Card className="gap-3">
          <View className="flex-row justify-around">
            {(["finance", "people", "docs", "support"] as const).map((domain, index) => (
              <View key={domain} className="items-center gap-1.5">
                <BentoIcon source={moduleAssets.advance} domain={domain} size={44} seed={index} />
                <Text className="text-[10px] font-bold text-ink-muted">{domainLabels[domain]}</Text>
              </View>
            ))}
          </View>
          <Text className="text-xs leading-5 text-ink-muted">
            La manchita es el único fondo de color permitido en la tarjeta; el resto es material glass neutro. Tonos en
            `bentoAccents` de `components/paco/bento.tsx`.
          </Text>
        </Card>
      </Section>

      <Section
        title="Acción directa"
        description="Toda tarjeta hero debe ofrecer algo observable sin salir de la pantalla: un CTA navy o un cambio de estado inline (registrar ánimo con un toque, firmar recibo). El estado completado usa el tono done."
      >
        <Card className="flex-row items-center gap-2.5">
          <BentoActionChip label="Firmar ahora" onPress={() => showToast("Acción ejecutada con feedback inline + toast.")} />
          <BentoActionChip label="Registrado hoy" tone="done" />
        </Card>
      </Section>

      <Section
        title="Gestión como lista"
        description="Soporte, configuración, expediente y legales nunca van como tarjetas: usan ListGroup/Row (icono libre a la izquierda, chevron a la derecha). Limpia el cierre de la pantalla y separa operación de mantenimiento."
      >
        <ListGroup>
          {(["support", "settings", "legal"] as const).map((id, index) => {
            const Glyph = moduleIcons[id];
            return (
              <Row
                key={id}
                leading={Glyph ? <BentoIcon glyph={Glyph} domain="support" size={30} seed={index} /> : undefined}
                title={id === "support" ? "Soporte técnico" : id === "settings" ? "Configuración" : "Términos y privacidad"}
                subtitle={id === "support" ? "FAQ, WhatsApp y tickets" : id === "settings" ? "Seguridad, NIP y cuentas" : "Documentos legales"}
                onPress={() => showToast("Fila de gestión: navega directo.")}
                trailing={<ChevronRight size={17} color="#cbd5e1" />}
              />
            );
          })}
        </ListGroup>
      </Section>

      <Section
        title="Reglas rápidas"
        description="Checklist al montar un grid bento en cualquier pantalla."
      >
        <Card className="gap-2">
          {[
            "Máximo 1 hero por categoría; si hay dos candidatos, gana el de dato vivo.",
            "El color semántico vive en la manchita y el acento, nunca como relleno completo.",
            "Pills mini: fluid={false}, texto en una línea; si el label no cabe, abreviar el copy, no encoger el icono.",
            "Acciones directas reutilizan el store real (registerMood, signReceipt…), nunca estado suelto.",
            "Todo módulo del registro debe seguir navegable: el bento reordena, no recorta cobertura.",
          ].map((rule) => (
            <View key={rule} className="flex-row gap-2">
              <View className="mt-[7px] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: bentoAccents.finance.accent }} />
              <Text className="flex-1 text-[13px] leading-5 text-ink-body">{rule}</Text>
            </View>
          ))}
        </Card>
      </Section>
    </Screen>
  );
}
