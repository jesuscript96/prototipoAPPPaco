import { BookOpen, Building2, Layers3, Smartphone } from "lucide-react-native";
import { Card, GuideNote, ListItem, Screen, Section } from "@/components/ui";

export default function IndexScreen() {
  return (
    <Screen
      eyebrow="Prototipo móvil"
      title="PACO Showroom"
      description="Guía navegable de componentes, patrones UX y pantallas completas para una app móvil real. Todo funciona con mock data, estado local y simulaciones."
    >
      <Card className="gap-3">
        <ListItem
          title="Paco App completa"
          subtitle="Prototipo moderno con todas las funcionalidades del video, mock data y acciones simuladas."
          icon={Building2}
          href="/(paco)"
        />
        <ListItem
          title="Storybook móvil"
          subtitle="Fundamentos visuales, componentes, formularios, listas y navegación."
          icon={BookOpen}
          href="/(storybook)"
        />
        <ListItem
          title="Prototipo de app"
          subtitle="Dashboard, inbox, CRUD, documentos, reportes y estados completos."
          icon={Smartphone}
          href="/(prototype)"
        />
      </Card>

      <Section title="Principios del sistema">
        <ListItem title="Mobile-first" subtitle="Jerarquía clara, pantallas ligeras y targets cómodos." icon={Layers3} />
        <GuideNote />
      </Section>
    </Screen>
  );
}
