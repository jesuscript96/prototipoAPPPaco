import { Text, View } from "react-native";
import { AlertTriangle, Archive, CheckCircle2, Edit3, Plus, Send, Trash2 } from "lucide-react-native";
import {
  Accordion,
  AttachmentPreview,
  Avatar,
  Badge,
  BottomSheetMock,
  Button,
  Card,
  Checkbox,
  Chip,
  DemoModal,
  Divider,
  EmptyState,
  FAB,
  FeedbackToast,
  Field,
  GuideNote,
  IconButton,
  InlineAlert,
  KpiCard,
  ListItem,
  Progress,
  RadioRow,
  Screen,
  Section,
  SegmentedControl,
  SelectMock,
  Skeleton,
  SwitchRow,
} from "@/components/ui";

export default function ComponentsScreen() {
  return (
    <Screen
      eyebrow="Componentes"
      title="Biblioteca base"
      description="Variantes y estados listos para combinarse en flujos reales, no solo ejemplos aislados."
    >
      <Section title="Buttons">
        <Card className="gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive" icon={Trash2}>Destructive</Button>
          <Button loading>Guardando</Button>
          <Button disabled>Disabled</Button>
          <IconButton icon={Edit3} label="Editar" />
        </Card>
      </Section>

      <Section title="Inputs y selección">
        <Card className="gap-4">
          <Field label="Nombre" placeholder="Ej. Mariana López" helper="Usa el nombre legal del contacto." />
          <Field label="Campo con error" placeholder="RFC" error="El formato no es válido" />
          <Field label="Notas" placeholder="Describe el contexto" multiline />
          <SelectMock label="Área" value="Operaciones" />
          <Checkbox label="Acepto los términos" checked />
          <RadioRow label="Notificación por correo" selected />
          <SwitchRow label="Recibir alertas críticas" value />
        </Card>
      </Section>

      <Section title="Badges, chips, tags y avatars">
        <Card className="gap-4">
          <View className="flex-row flex-wrap gap-2">
            <Badge tone="success">Aprobado</Badge>
            <Badge tone="warning">Pendiente</Badge>
            <Badge tone="danger">Bloqueado</Badge>
            <Badge tone="info">Nuevo</Badge>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <Chip label="Todos" active />
            <Chip label="Alta prioridad" />
            <Chip label="Asignados a mí" />
          </View>
          <View className="flex-row gap-3">
            <Avatar name="Mariana López" />
            <Avatar name="Diego Ramos" />
            <Avatar name="Ana Torres" />
          </View>
        </Card>
      </Section>

      <Section title="Cards, KPIs y listas">
        <View className="gap-3">
          <KpiCard label="Conversión mensual" value="82%" trend="+4%" tone="success" />
          <ListItem title="Solicitud PAC-1024" subtitle="Café Norte, revisión legal" meta="Hoy" icon={Archive} />
          <Divider />
        </View>
      </Section>

      <Section title="Estados y feedback">
        <View className="gap-3">
          <EmptyState title="Sin resultados" description="Ajusta filtros o intenta con otro término de búsqueda." icon={Archive} />
          <InlineAlert tone="warning" title="Requiere confirmación" description="Las acciones destructivas siempre deben pedir confirmación." />
          <Skeleton />
          <Progress value={42} />
          <FeedbackToast message="Cambios guardados. Puedes continuar." />
        </View>
      </Section>

      <Section title="Overlays y composición">
        <Card className="gap-4">
          <DemoModal title="Confirmar acción">
            <Text className="mb-4 text-base leading-6 text-slate-600">Este patrón evita errores en acciones irreversibles.</Text>
            <Button variant="destructive" icon={AlertTriangle}>Confirmar eliminación</Button>
          </DemoModal>
          <BottomSheetMock>
            <Text className="text-lg font-bold text-slate-950">Bottom sheet simulado</Text>
            <Text className="mt-1 text-sm text-slate-500">Ideal para acciones secundarias sin perder contexto.</Text>
          </BottomSheetMock>
          <SegmentedControl options={["Todos", "Activos", "Cerrados"]} value="Todos" />
          <Accordion title="Buenas prácticas">
            <Text className="text-sm leading-5 text-slate-600">Evita saturar pantallas; prioriza una acción principal y feedback inmediato.</Text>
          </Accordion>
          <AttachmentPreview name="contrato-firmado.pdf" size="2.1 MB" />
          <FAB icon={Plus} label="Crear registro" />
        </Card>
      </Section>

      <Section title="Tooltip / helper text">
        <InlineAlert tone="info" title="Helper text" description="En móvil es más estable mostrar ayuda persistente junto al campo que depender de tooltips precisos." />
      </Section>

      <Button icon={Send}>Ejemplo de acción principal</Button>
      <GuideNote />
      <InlineAlert tone="success" title="Accesibilidad" description="Los componentes usan labels visibles, feedback textual y áreas de toque cómodas." />
      <InlineAlert tone="danger" title="Error común" description="No uses solo color para comunicar estados; siempre incluye texto o iconografía." />
      <CheckCircle2 size={1} color="transparent" />
    </Screen>
  );
}
