import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { FileText, UserRound } from "lucide-react-native";
import { AttachmentPreview, Badge, Button, Card, InlineAlert, ListItem, Screen, Section } from "@/components/ui";
import { records } from "@/mock/data";

export default function RecordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const record = records.find((item) => item.id === id) ?? records[0];

  return (
    <Screen eyebrow="Detalle" title={record.folio} description={`${record.client} · ${record.amount}`}>
      <Card className="gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-slate-950">Estado del registro</Text>
          <Badge tone={record.status === "Aprobado" ? "success" : record.status === "Rechazado" ? "danger" : "warning"}>{record.status}</Badge>
        </View>
        <Text className="text-sm leading-5 text-slate-600">Prioridad {record.priority}. Este detalle demuestra master-detail adaptado a móvil con navegación por stack.</Text>
      </Card>
      <Section title="Responsable">
        <ListItem title={record.owner} subtitle="Propietario del seguimiento" icon={UserRound} />
      </Section>
      <Section title="Documentos relacionados">
        <AttachmentPreview name={`${record.folio}-contrato.pdf`} size="1.4 MB" />
        <AttachmentPreview name={`${record.folio}-evidencia.png`} size="820 KB" />
      </Section>
      <InlineAlert tone="info" title="Acción recomendada" description="Muestra una sola acción primaria por pantalla y acciones secundarias en contexto." />
      <Button icon={FileText}>Actualizar estado mock</Button>
    </Screen>
  );
}
