import { useState } from "react";
import { View } from "react-native";
import { Download, Plus, ShieldCheck } from "@/components/paco/glyphs";
import { Badge, Button, Card, Checkbox, EmptyState, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { OptionCard, RadioOption, Segmented, SelectChip, StatusDot, ToggleRow } from "@/components/paco/ui";
import { IconBubble, domainStyles, moduleIcons } from "@/components/paco/icons";
import { Bell } from "@/components/paco/glyphs";
import { usePacoStore } from "@/store/paco-store";

export default function ComponentesScreen() {
  const showToast = usePacoStore((s) => s.showToast);
  const [tab, setTab] = useState("Pendientes");
  const [chip, setChip] = useState("Todos");
  const [checked, setChecked] = useState(true);
  const [toggled, setToggled] = useState(true);
  const [radio, setRadio] = useState("a");

  return (
    <Screen
      eyebrow="Sistema Paco"
      title="Componentes"
      description="Cada control incluye su microinteracción: press-scale en botones y tarjetas, indicador deslizante en tabs, pop en checks."
    >
      <Section title="Botones" description="Primario en carbón; el resto glass. Todos encogen 3% al presionar.">
        <Card className="gap-2.5">
          <Button icon={ShieldCheck} onPress={() => showToast("Acción primaria ejecutada.")}>Primario</Button>
          <Button variant="secondary" icon={Download} onPress={() => showToast("Acción secundaria.")}>Secundario</Button>
          <Button variant="outline" onPress={() => showToast("Acción outline.")}>Outline</Button>
          <View className="flex-row gap-2">
            <View className="flex-1"><Button variant="ghost" onPress={() => showToast("Ghost.")}>Ghost</Button></View>
            <View className="flex-1"><Button variant="destructive" onPress={() => showToast("Destructiva.")}>Eliminar</Button></View>
          </View>
          <Button loading>Cargando</Button>
          <Button disabled>Deshabilitado</Button>
        </Card>
      </Section>

      <Section title="Tabs segmentadas" description="Indicador blanco con spring entre opciones.">
        <Segmented options={["Pendientes", "En curso", "Finalizados"]} value={tab} onChange={setTab} />
      </Section>

      <Section title="Chips de filtro">
        <View className="flex-row flex-wrap gap-2">
          {["Todos", "Finanzas", "Personas", "Documentos"].map((label) => (
            <SelectChip key={label} label={label} active={chip === label} onPress={() => setChip(label)} />
          ))}
        </View>
      </Section>

      <Section title="Badges y semáforo">
        <Card className="gap-3">
          <View className="flex-row flex-wrap gap-2">
            <Badge tone="success">Aprobada</Badge>
            <Badge tone="warning">Pendiente</Badge>
            <Badge tone="danger">Rechazada</Badge>
            <Badge tone="info">En proceso</Badge>
            <Badge tone="neutral">Borrador</Badge>
          </View>
          <View className="flex-row gap-5">
            <StatusDot status="Pendiente" />
            <StatusDot status="En proceso" />
            <StatusDot status="Atendido" />
          </View>
        </Card>
      </Section>

      <Section title="Alertas">
        <InlineAlert title="Información" description="Mensajes contextuales con barra de tono y fondo translúcido." tone="info" />
        <InlineAlert title="Advertencia" description="Para reglas, vencimientos y bloqueos recuperables." tone="warning" />
        <InlineAlert title="Éxito" description="Confirmaciones persistentes dentro del flujo." tone="success" />
      </Section>

      <Section title="Selección" description="Radio, checkbox con pop y switch con thumb animado.">
        <Card className="gap-3">
          <RadioOption label="Opción A" helper="Con texto de apoyo" selected={radio === "a"} onPress={() => setRadio("a")} />
          <RadioOption label="Opción B" selected={radio === "b"} onPress={() => setRadio("b")} />
          <Checkbox label="Acepto los términos y condiciones del servicio." checked={checked} onPress={() => setChecked((v) => !v)} />
          <ToggleRow label="Enviar de forma anónima" helper="El thumb desliza con spring" value={toggled} onChange={setToggled} />
        </Card>
      </Section>

      <Section title="Tarjeta de opción" description="Para catálogos (servicios, voz, solicitudes).">
        <OptionCard
          title="Agua, luz y gas"
          subtitle="CFE · Agua CDMX · Naturgy"
          icon={moduleIcons.services}
          onPress={() => showToast("Categoría seleccionada.")}
        />
      </Section>

      <Section title="Burbujas por dominio">
        <Card className="flex-row flex-wrap gap-3">
          {Object.entries(domainStyles).map(([domain, style]) => (
            <View key={domain} className="items-center gap-1">
              <IconBubble icon={moduleIcons.advance ?? Bell} color={style.color} tint={style.tint} />
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Estado vacío">
        <EmptyState title="Sin elementos" description="Borde discontinuo sobre material glass, con icono neutro." icon={Plus} />
      </Section>
    </Screen>
  );
}
