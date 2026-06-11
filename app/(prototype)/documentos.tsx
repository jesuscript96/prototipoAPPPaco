import { Text, View } from "react-native";
import { Download, FileText, FolderOpen, Upload } from "lucide-react-native";
import { AttachmentPreview, Badge, Button, Card, EmptyState, InlineAlert, ListItem, Screen, Section, Skeleton } from "@/components/ui";
import { documents } from "@/mock/data";

export default function DocumentsScreen() {
  return (
    <Screen
      eyebrow="Biblioteca"
      title="Documentos"
      description="Cards móviles para archivos, con tipo, dueño, estado y acciones claras."
    >
      <Button icon={Upload}>Subir archivo mock</Button>
      <Section title="Recientes">
        {documents.map((document) => (
          <Card key={document.id} className="gap-3">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-lg font-bold text-slate-950">{document.name}</Text>
                <Text className="text-sm text-slate-500">{document.owner} · {document.type} · {document.size}</Text>
              </View>
              <Badge tone={document.status === "Vigente" ? "success" : "info"}>{document.status}</Badge>
            </View>
            <AttachmentPreview name={document.name} size={document.size} />
            <Button variant="outline" icon={Download}>Descargar mock</Button>
          </Card>
        ))}
      </Section>
      <Section title="Estados">
        <Skeleton lines={3} />
        <EmptyState title="Carpeta vacía" description="Cuando no haya documentos, explica qué puede subir el usuario." icon={FolderOpen} />
        <InlineAlert tone="danger" title="Error de carga" description="Permite reintentar y conserva filtros o carpeta actual." />
        <ListItem title="Vista previa" subtitle="No descargues automáticamente en móvil; muestra contexto primero." icon={FileText} />
      </Section>
    </Screen>
  );
}
