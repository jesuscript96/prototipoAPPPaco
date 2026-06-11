import { Text, View } from "react-native";
import { Edit3, Plus, Trash2 } from "lucide-react-native";
import { Badge, Button, Card, Field, GuideNote, InlineAlert, ListItem, Screen, Section, SelectMock } from "@/components/ui";
import { records } from "@/mock/data";

export default function CrudScreen() {
  return (
    <Screen
      eyebrow="CRUD móvil"
      title="Registros"
      description="Listado, acciones por item y formulario crear/editar con confirmación antes de acciones destructivas."
    >
      <Button icon={Plus}>Crear registro</Button>
      <Section title="Listado">
        {records.map((record) => (
          <Card key={record.id} className="gap-3">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-lg font-bold text-slate-950">{record.folio}</Text>
                <Text className="text-sm text-slate-500">{record.client} · {record.amount}</Text>
              </View>
              <Badge tone={record.status === "Aprobado" ? "success" : record.status === "Rechazado" ? "danger" : "warning"}>{record.status}</Badge>
            </View>
            <ListItem title="Ver detalle" subtitle={`Responsable: ${record.owner}`} href={`/(prototype)/registro/${record.id}`} />
            <View className="flex-row gap-2">
              <View className="flex-1"><Button variant="outline" icon={Edit3}>Editar</Button></View>
              <View className="flex-1"><Button variant="destructive" icon={Trash2}>Eliminar</Button></View>
            </View>
          </Card>
        ))}
      </Section>
      <Section title="Crear/editar registro">
        <Card className="gap-4">
          <Field label="Cliente" placeholder="Nombre comercial" />
          <Field label="Monto" placeholder="$0.00" />
          <SelectMock label="Prioridad" value="Alta" />
          <Field label="Notas" placeholder="Describe el contexto operativo" multiline />
          <InlineAlert tone="warning" title="Confirmación de descarte" description="Si el usuario sale con cambios, pregunta si desea descartar el borrador." />
          <Button>Guardar registro mock</Button>
        </Card>
      </Section>
      <GuideNote />
    </Screen>
  );
}
