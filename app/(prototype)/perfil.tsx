import { Mail, ShieldCheck, UserRound } from "lucide-react-native";
import { Avatar, Badge, Button, Card, Field, InlineAlert, ListItem, Screen, Section } from "@/components/ui";
import { users } from "@/mock/data";
import { useDemoStore } from "@/store/demo-store";

export default function ProfileScreen() {
  const user = users[0];
  const { simulatedSession, toggleSession } = useDemoStore();

  return (
    <Screen eyebrow="Perfil" title={user.name} description={user.role}>
      <Card className="items-center gap-3">
        <Avatar name={user.name} size={72} />
        <Badge tone="info">{user.team}</Badge>
        <ListItem title={user.email} subtitle="Correo corporativo mock" icon={Mail} />
      </Card>
      <Section title="Datos editables">
        <Card className="gap-4">
          <Field label="Nombre" value={user.name} />
          <Field label="Rol" value={user.role} />
          <Button icon={UserRound}>Guardar cambios mock</Button>
        </Card>
      </Section>
      <Section title="Seguridad simulada">
        <Card className="gap-3">
          <InlineAlert tone={simulatedSession ? "success" : "warning"} title="Sesión local demo" description={simulatedSession ? "Activa solo en memoria." : "Inactiva; no existe auth real."} />
          <Button icon={ShieldCheck} variant="secondary" onPress={toggleSession}>{simulatedSession ? "Cerrar sesión mock" : "Iniciar sesión mock"}</Button>
        </Card>
      </Section>
    </Screen>
  );
}
