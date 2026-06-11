import { Bell, CheckCheck } from "lucide-react-native";
import { Badge, Button, Card, InlineAlert, ListItem, Screen, Section } from "@/components/ui";
import { notifications } from "@/mock/data";

export default function NotificationsScreen() {
  return (
    <Screen
      eyebrow="Centro de notificaciones"
      title="Avisos"
      description="Mensajes accionables con prioridad, estado leído y copy claro."
    >
      <Button icon={CheckCheck} variant="secondary">Marcar todo como leído</Button>
      <Section title="Hoy">
        {notifications.map((notification) => (
          <Card key={notification.id} className="gap-3">
            <Badge tone={notification.tone}>{notification.time}</Badge>
            <ListItem title={notification.title} subtitle={notification.body} icon={Bell} />
          </Card>
        ))}
      </Section>
      <InlineAlert tone="info" title="Buenas prácticas" description="Las notificaciones deben decir qué pasó, por qué importa y cuál es la acción esperada." />
    </Screen>
  );
}
