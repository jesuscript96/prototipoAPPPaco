import { storybookSections } from "@/mock/data";
import { GuideNote, ListItem, Screen, Section } from "@/components/ui";

export default function StorybookIndex() {
  return (
    <Screen
      eyebrow="Guía UX"
      title="Storybook móvil"
      description="Explora tokens, componentes y patrones con ejemplos de uso real. Cada pantalla incluye criterios para diseñar, construir y evitar errores comunes."
    >
      <Section title="Secciones">
        {storybookSections.map((section) => (
          <ListItem key={section.title} {...section} />
        ))}
      </Section>
      <GuideNote />
    </Screen>
  );
}
