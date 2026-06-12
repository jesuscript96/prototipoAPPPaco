import { Text, View } from "react-native";
import { Card, Screen, Section } from "@/components/paco/layout";

function RuleList({ rules, accent = "#2F42CB" }: { rules: string[]; accent?: string }) {
  return (
    <Card className="gap-2">
      {rules.map((rule) => (
        <View key={rule} className="flex-row gap-2">
          <View className="mt-[7px] h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <Text className="flex-1 text-[13px] leading-5 text-ink-body">{rule}</Text>
        </View>
      ))}
    </Card>
  );
}

export default function PrincipiosScreen() {
  return (
    <Screen
      eyebrow="Sistema de diseño"
      title="Principios UX/UI"
      description="Las reglas que gobiernan todas las pantallas de Paco. Si una pantalla nueva contradice algo de aquí, o se corrige la pantalla o se actualiza este documento."
    >
      <Section
        title="Espaciado y respiración"
        description="Nada pegado: cada bloque respira respecto al anterior."
      >
        <RuleList
          rules={[
            "Entre bloques de pantalla: gap-4 (16 px). Lo provee Screen; no recrearlo a mano.",
            "Dentro de un grupo (tarjeta, formulario): gap-2 a gap-3 (8-12 px).",
            "Contenedores animados (WizardStep, FadeSlideIn): el gap debe vivir DENTRO del wrapper animado; los hijos son hermanos del Animated.View interno, no del View externo.",
            "Targets táctiles de mínimo 44 px de alto.",
            "Si un elemento queda visualmente pegado, es un bug: corregir en el contenedor compartido, no con márgenes sueltos por pantalla.",
          ]}
        />
      </Section>

      <Section
        title="Transparencia y contraste"
        description="Pantallas de foco único van sin tarjeta, directo sobre el canvas."
      >
        <RuleList
          accent="#0E7490"
          rules={[
            "Login, bloqueo de encuesta, runner de preguntas y confirmaciones de éxito: contenido transparente sobre el canvas/ambient.",
            "Al quitar la tarjeta, los controles suben su propia opacidad: inputs bg-white/80, opciones bg-white/60, ambos con borde white/90 y sombra si flotan solos.",
            "El color semántico nunca es relleno completo: es acento (icono, dot, borde, manchita). Único fondo tintado permitido: wash de alpha bajo.",
            "Listas largas y contenido denso sí llevan superficie (ListGroup glass) para sostener legibilidad.",
            "No depender solo del color para comunicar estado: acompañar con texto o icono.",
          ]}
        />
      </Section>

      <Section
        title="Jerarquía Bento"
        description="El detalle completo, con ejemplos vivos, está en la página Bento Grid de este storybook."
      >
        <RuleList
          accent="#C2410C"
          rules={[
            "Tres niveles por categoría: hero (dato vivo + acción directa), half (frecuentes) y mini (secundarios). Nunca rejilla uniforme.",
            "Iconos libres, sin caja con borde: flotan sobre una manchita orgánica del color de su categoría (AssetIconBubble / BentoIcon).",
            "Color por categoría: Finanzas verde/petróleo, Personas coral/salmón, Documentos violeta/gris, Soporte azul pizarra.",
            "Gestión (soporte, configuración, legales) como lista con chevron, no como tarjetas.",
          ]}
        />
      </Section>

      <Section
        title="Feedback y acciones"
        description="Todo botón primario visible hace algo observable."
      >
        <RuleList
          accent="#674EA7"
          rules={[
            "Toda interacción táctil pasa por PressableScale (encoge 3% y rebota al soltar).",
            "Acciones con resultado: toast global, morph del botón (cargando → éxito), cambio de estado inline (Firmado, Registrado, Listo) o confetti en éxitos mayores.",
            "Las acciones directas mutan el store real (registerMood, signReceipt…): el cambio se refleja en todos los módulos conectados.",
            "Errores con ShakeView + mensaje visible; nunca fallo silencioso.",
            "Entradas de contenido con FadeSlideIn escalonado (30-50 ms por elemento); solo transform/opacity.",
          ]}
        />
      </Section>

      <Section
        title="Contenido y copy"
        description="Datos que parecen reales, texto que parece humano."
      >
        <RuleList
          accent="#B8860B"
          rules={[
            "Copy visible en español, directo y específico de Paco; rutas y nombres técnicos en inglés/kebab-case.",
            "Datos realistas mexicanos: MXN, CLABE, RFC, NSS, nómina quincenal, fechas locales y empresas creíbles.",
            "Estados mínimos por módulo: carga, vacío, contenido, éxito y error simulado cuando aplique.",
            "Nada de emojis en UI: iconografía del sistema (lucide/assets de marca).",
          ]}
        />
      </Section>
    </Screen>
  );
}
