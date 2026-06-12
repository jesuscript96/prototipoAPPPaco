import { useRouter } from "expo-router";
import { Compass, GridFour, ListDashes, PencilRuler, Sparkle, SquaresFour, StackSimple } from "phosphor-react-native";
import { Screen } from "@/components/paco/layout";
import { ListGroup, Row } from "@/components/paco/ui";

export default function StorybookIndex() {
  const router = useRouter();
  return (
    <Screen
      eyebrow="Sistema de diseño"
      title="Storybook Paco"
      description="Fuente de verdad visual del prototipo: tokens de marca, componentes, patrones de lista, formularios y movimiento. Todo lo que ves aquí es lo que usa la app."
    >
      <ListGroup>
        <Row
          leading={<Compass size={22} color="#0E7490" weight="bold" />}
          title="Principios UX/UI"
          subtitle="Espaciado, transparencia y contraste, feedback, bento y copy"
          chevron
          onPress={() => router.push("/(storybook)/principios")}
        />
        <Row
          leading={<PencilRuler size={22} color="#2F42CB" weight="bold" />}
          title="Fundamentos"
          subtitle="Paleta oficial, tipografía Inter neogrotesca, radios e iconografía Phosphor"
          chevron
          onPress={() => router.push("/(storybook)/fundamentos")}
        />
        <Row
          leading={<SquaresFour size={22} color="#674EA7" weight="bold" />}
          title="Componentes"
          subtitle="Botones, badges, alertas, chips, tabs animadas y controles"
          chevron
          onPress={() => router.push("/(storybook)/componentes")}
        />
        <Row
          leading={<GridFour size={22} color="#0E7490" weight="bold" />}
          title="Bento Grid"
          subtitle="Jerarquía hero/half/mini, manchitas por categoría y listas de gestión"
          chevron
          onPress={() => router.push("/(storybook)/bento")}
        />
        <Row
          leading={<ListDashes size={22} color="#B8860B" weight="bold" />}
          title="Listas y datos"
          subtitle="Filas compactas, grupos con hairlines, archivos y gráficas"
          chevron
          onPress={() => router.push("/(storybook)/listas")}
        />
        <Row
          leading={<StackSimple size={22} color="#5176F3" weight="bold" />}
          title="Formularios y flujos"
          subtitle="Campos, asistentes por pasos, selector de monto y firma"
          chevron
          onPress={() => router.push("/(storybook)/formularios")}
        />
        <Row
          leading={<Sparkle size={22} color="#FB4F33" weight="bold" />}
          title="Movimiento"
          subtitle="Microinteracciones: press, entradas, pop, números animados"
          chevron
          onPress={() => router.push("/(storybook)/navegacion")}
        />
      </ListGroup>
    </Screen>
  );
}
