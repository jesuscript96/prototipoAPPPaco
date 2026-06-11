import { prototypeSections } from "@/mock/data";
import { GuideNote, ListItem, Screen, Section } from "@/components/ui";

export default function PrototypeIndex() {
  return (
    <Screen
      eyebrow="App demo"
      title="Pantallas completas"
      description="Flujos reales combinando componentes, datos mock, estados de carga y navegación móvil."
    >
      <Section title="Módulos">
        {prototypeSections.map((section) => (
          <ListItem key={section.title} {...section} />
        ))}
      </Section>
      <GuideNote />
    </Screen>
  );
}
