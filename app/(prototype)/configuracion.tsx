import { Bell, Globe2, Lock, Moon, UserCog } from "lucide-react-native";
import { Card, InlineAlert, ListItem, Screen, Section, SwitchRow } from "@/components/ui";

export default function SettingsScreen() {
  return (
    <Screen
      eyebrow="Configuración"
      title="Ajustes"
      description="Preferencias agrupadas por intención, con lenguaje claro y sin saturar la pantalla."
    >
      <Section title="Cuenta">
        <Card className="gap-3">
          <ListItem title="Datos personales" subtitle="Nombre, rol y contacto" icon={UserCog} />
          <ListItem title="Privacidad y acceso" subtitle="Permisos visibles para el usuario" icon={Lock} />
        </Card>
      </Section>
      <Section title="Preferencias">
        <Card className="gap-3">
          <SwitchRow label="Notificaciones críticas" value />
          <SwitchRow label="Modo compacto" value={false} />
          <ListItem title="Idioma" subtitle="Español de México" icon={Globe2} />
          <ListItem title="Apariencia" subtitle="Tema claro por defecto" icon={Moon} />
          <ListItem title="Alertas" subtitle="Push y correo mock" icon={Bell} />
        </Card>
      </Section>
      <InlineAlert tone="warning" title="Evita ajustes ambiguos" description="Cada switch debe explicar el impacto antes de que el usuario lo active." />
    </Screen>
  );
}
