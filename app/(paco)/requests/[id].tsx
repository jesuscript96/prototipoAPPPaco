import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, FileQuestion, Pencil, Trash2, X } from "@/components/paco/glyphs";
import { Text, TextInput, View } from "react-native";
import { Badge, Button, Card, EmptyState, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { ConfirmSheet, MoneyRow, SelectChip, cn } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

const dateOptions = ["10 jun 2026", "11 jun 2026", "12 jun 2026", "15 jun 2026", "16 jun 2026"] as const;

const statusTone = (status: string) =>
  status === "Aprobada" ? ("success" as const) : status === "Rechazada" ? ("danger" as const) : status === "En evaluación" ? ("warning" as const) : ("neutral" as const);

export default function RequestDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { requests, updateRequestDates, deleteRequest } = usePacoStore();
  const request = requests.find((r) => r.id === id);

  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newStart, setNewStart] = useState(request?.startDate ?? "");
  const [newEnd, setNewEnd] = useState(request?.endDate ?? "");
  const [newComments, setNewComments] = useState(request?.comments ?? "");

  if (!request) {
    return (
      <Screen title="Solicitud no encontrada">
        <EmptyState title="Sin solicitud" description="La solicitud fue eliminada o no existe." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  const editable = request.status === "No iniciada";

  return (
    <Screen eyebrow={request.category} title={request.typeName} description={`Creada el ${request.createdAt}`}>
      <View className="flex-row items-center justify-between">
        <Badge tone={statusTone(request.status)}>{request.status}</Badge>
        <Text className="text-sm font-semibold text-slate-500">
          {request.startDate}
          {request.endDate !== request.startDate ? ` → ${request.endDate}` : ""}
        </Text>
      </View>

      {editable ? (
        <InlineAlert
          title="Solicitud editable"
          description="Puedes modificar fechas y comentarios o eliminarla mientras Recursos Humanos no inicie el proceso de evaluación."
          tone="info"
        />
      ) : null}

      <Section title="Flujo de aprobación">
        <Card className="gap-0">
          {request.stages.map((stage, index) => {
            const reached = index < request.currentStage;
            const rejected = request.status === "Rechazada" && index === request.currentStage - 1;
            return (
              <View key={stage} className="flex-row gap-3">
                <View className="items-center">
                  <View
                    className={cn(
                      "h-8 w-8 items-center justify-center rounded-full",
                      rejected ? "bg-red-500" : reached ? "bg-green-500" : "bg-slate-200",
                    )}
                  >
                    {rejected ? (
                      <X size={13} color="#fff" strokeWidth={3} />
                    ) : reached ? (
                      <Check size={13} color="#fff" strokeWidth={3} />
                    ) : (
                      <Text className="text-xs font-bold text-slate-500">{index + 1}</Text>
                    )}
                  </View>
                  {index < request.stages.length - 1 ? <View className="h-8 w-0.5 bg-slate-200" /> : null}
                </View>
                <View className="flex-1 pb-3 pt-1.5">
                  <Text className={cn("text-sm font-bold", reached ? "text-slate-900" : "text-slate-500")}>{stage}</Text>
                  <Text className="text-xs text-slate-400">
                    {rejected ? "Rechazada en esta etapa" : reached ? "Completada" : request.status === "No iniciada" ? "Sin iniciar" : "Pendiente"}
                  </Text>
                </View>
              </View>
            );
          })}
        </Card>
      </Section>

      <Section title="Respuestas del cuestionario">
        <Card className="gap-2.5">
          {request.answers.map((item) => (
            <View key={item.question} className="gap-0.5">
              <Text className="text-xs font-bold text-slate-500">{item.question}</Text>
              <Text className="text-sm text-slate-800">{item.answer}</Text>
            </View>
          ))}
          {request.comments ? (
            <View className="gap-0.5 border-t border-slate-100 pt-2">
              <Text className="text-xs font-bold text-slate-500">Comentarios adicionales</Text>
              <Text className="text-sm text-slate-800">{request.comments}</Text>
            </View>
          ) : null}
        </Card>
      </Section>

      {editable && editing ? (
        <Section title="Editar solicitud">
          <Card className="gap-3">
            <Text className="text-sm font-bold text-slate-700">Nueva fecha inicial</Text>
            <View className="flex-row flex-wrap gap-2">
              {dateOptions.map((option) => (
                <SelectChip key={`s-${option}`} label={option} active={newStart === option} onPress={() => setNewStart(option)} />
              ))}
            </View>
            <Text className="text-sm font-bold text-slate-700">Nueva fecha final</Text>
            <View className="flex-row flex-wrap gap-2">
              {dateOptions.map((option) => (
                <SelectChip key={`e-${option}`} label={option} active={newEnd === option} onPress={() => setNewEnd(option)} />
              ))}
            </View>
            <Text className="text-sm font-bold text-slate-700">Comentarios</Text>
            <TextInput
              value={newComments}
              onChangeText={setNewComments}
              multiline
              placeholder="Comentarios adicionales…"
              placeholderTextColor="#94a3b8"
              className="min-h-20 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950"
            />
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Button
                  onPress={() => {
                    updateRequestDates(request.id, newStart, newEnd, newComments.trim());
                    setEditing(false);
                  }}
                >
                  Guardar cambios
                </Button>
              </View>
              <View className="flex-1">
                <Button variant="ghost" onPress={() => setEditing(false)}>
                  Cancelar
                </Button>
              </View>
            </View>
          </Card>
        </Section>
      ) : null}

      {editable && !editing ? (
        <View className="gap-2">
          <Button icon={Pencil} variant="outline" onPress={() => setEditing(true)}>
            Editar
          </Button>
          <Button icon={Trash2} variant="destructive" onPress={() => setConfirmDelete(true)}>
            Eliminar
          </Button>
        </View>
      ) : null}

      <Card className="gap-1">
        <MoneyRow label="Folio interno" value={`SOL-${request.id.toUpperCase()}`} />
        <MoneyRow label="Estado" value={request.status} />
      </Card>

      <ConfirmSheet
        visible={confirmDelete}
        title="¿Eliminar esta solicitud?"
        message={`Se dará de baja tu solicitud de "${request.typeName}". Esta acción no se puede deshacer.`}
        confirmLabel="Sí, eliminar"
        destructive
        onConfirm={() => {
          setConfirmDelete(false);
          deleteRequest(request.id);
          router.back();
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </Screen>
  );
}
