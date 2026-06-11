import { Text, View } from "react-native";
import { Bell, CalendarCheck, Plus } from "lucide-react-native";
import { Button, Card, FAB, KpiCard, ListItem, Screen, Section } from "@/components/ui";
import { kpis, notifications, records } from "@/mock/data";

export default function DashboardScreen() {
  return (
    <Screen
      eyebrow="Inicio"
      title="Hola, Mariana"
      description="Resumen operativo con las tareas más importantes para hoy."
      action={<FAB icon={Plus} label="Crear" />}
    >
      <View className="gap-3">
        {kpis.map((item) => <KpiCard key={item.label} {...item} />)}
      </View>
      <Section title="Siguiente mejor acción">
        <Card className="gap-3">
          <Text className="text-lg font-bold text-slate-950">Revisar pendientes críticos</Text>
          <Text className="text-sm leading-5 text-slate-600">Hay 7 registros de alta prioridad. Empieza por los de mayor impacto económico.</Text>
          <Button icon={CalendarCheck}>Ver plan del día</Button>
        </Card>
      </Section>
      <Section title="Actividad reciente">
        {records.slice(0, 3).map((record) => (
          <ListItem key={record.id} title={`${record.folio} · ${record.client}`} subtitle={`${record.status} · ${record.amount}`} href={`/(prototype)/registro/${record.id}`} />
        ))}
      </Section>
      <Section title="Alertas">
        {notifications.map((item) => <ListItem key={item.id} title={item.title} subtitle={item.body} meta={item.time} icon={Bell} />)}
      </Section>
    </Screen>
  );
}
