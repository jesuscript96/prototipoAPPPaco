import { useState } from "react";
import { useRouter } from "expo-router";
import { CalendarCheck, CalendarRange, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Badge, Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { Segmented, StatusDot } from "@/components/paco/ui";
import { requestTypes } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const categories = ["Permiso con goce de sueldo", "Permisos", "Vacaciones", "Incapacidades"] as const;

const statusTone = (status: string) =>
  status === "Aprobada" ? ("success" as const) : status === "Rechazada" ? ("danger" as const) : status === "En evaluación" ? ("warning" as const) : ("neutral" as const);

export default function RequestsScreen() {
  const router = useRouter();
  const { requests } = usePacoStore();
  const [tab, setTab] = useState<string>("Nueva solicitud");

  const pending = requests.filter((r) => r.status === "No iniciada" || r.status === "En evaluación");
  const finished = requests.filter((r) => r.status === "Aprobada" || r.status === "Rechazada");

  return (
    <Screen
      title="Solicitudes"
      description="Gestiona permisos, vacaciones e incapacidades. Cada tipo tiene su propio flujo de aprobación configurado por tu empresa."
    >
      <Segmented options={["Nueva solicitud", "Mis solicitudes"]} value={tab} onChange={setTab} />

      {tab === "Nueva solicitud" ? (
        <>
          {categories.map((category) => {
            const types = requestTypes.filter((t) => t.category === category);
            if (types.length === 0) return null;
            return (
              <Section key={category} title={category}>
                <View className="gap-2.5">
                  {types.map((type) => (
                    <Pressable
                      key={type.id}
                      accessibilityRole="button"
                      onPress={() => router.push({ pathname: "/(paco)/requests/new", params: { type: type.id } })}
                      className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 active:bg-brand-50"
                    >
                      <View className="h-11 w-11 items-center justify-center rounded-[12px] bg-violet-50">
                        <CalendarRange size={20} color="#7c3aed" strokeWidth={2} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-bold text-slate-900">{type.name}</Text>
                        <Text className="text-xs text-slate-500">
                          {type.questions.length} preguntas · aprobación en ~{type.approvalDays} días
                        </Text>
                      </View>
                      <ChevronRight size={18} color="#94a3b8" />
                    </Pressable>
                  ))}
                </View>
              </Section>
            );
          })}
        </>
      ) : (
        <>
          <Section title={`Pendientes (${pending.length})`}>
            {pending.length === 0 ? (
              <EmptyState title="Sin solicitudes pendientes" description="Crea una nueva solicitud desde la otra pestaña." icon={CalendarCheck} />
            ) : (
              <View className="gap-2.5">
                {pending.map((request) => (
                  <Pressable
                    key={request.id}
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: "/(paco)/requests/[id]", params: { id: request.id } })}
                  >
                    <Card className="gap-2">
                      <View className="flex-row items-center justify-between">
                        <Text className="flex-1 text-base font-bold text-slate-950">{request.typeName}</Text>
                        <Badge tone={statusTone(request.status)}>{request.status}</Badge>
                      </View>
                      <Text className="text-sm text-slate-500">
                        {request.startDate}
                        {request.endDate !== request.startDate ? ` → ${request.endDate}` : ""} · creada el {request.createdAt}
                      </Text>
                      <Text className="text-xs font-bold text-brand-700">
                        {request.status === "No iniciada" ? "Editable hasta iniciar evaluación · toca para ver" : "En evaluación · toca para ver timeline"}
                      </Text>
                    </Card>
                  </Pressable>
                ))}
              </View>
            )}
          </Section>

          <Section title={`Finalizadas (${finished.length})`}>
            {finished.length === 0 ? (
              <EmptyState title="Sin historial" description="Aquí verás tus solicitudes aprobadas o rechazadas." icon={CalendarCheck} />
            ) : (
              <View className="gap-2.5">
                {finished.map((request) => (
                  <Pressable
                    key={request.id}
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: "/(paco)/requests/[id]", params: { id: request.id } })}
                  >
                    <Card className="gap-2">
                      <View className="flex-row items-center justify-between">
                        <Text className="flex-1 text-base font-bold text-slate-950">{request.typeName}</Text>
                        <Badge tone={statusTone(request.status)}>{request.status}</Badge>
                      </View>
                      <Text className="text-sm text-slate-500">
                        {request.startDate} · resuelta por {request.stages[request.stages.length - 1]?.replace(/Etapa \d+ · /, "")}
                      </Text>
                    </Card>
                  </Pressable>
                ))}
              </View>
            )}
          </Section>
        </>
      )}
    </Screen>
  );
}
