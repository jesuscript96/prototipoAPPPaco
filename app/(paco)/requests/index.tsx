import { useState } from "react";
import { useRouter } from "expo-router";
import { CalendarCheck, CalendarRange, ChevronRight } from "@/components/paco/glyphs";

const statusColors: Record<string, string> = {
  Aprobada: "#6AA84F",
  Rechazada: "#CC0000",
  "En evaluación": "#B8860B",
  "No iniciada": "#64748b",
};
import { Pressable, Text, View } from "react-native";
import { EmptyState, Screen, Section } from "@/components/paco/layout";
import { ListGroup, Row, Segmented } from "@/components/paco/ui";
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
                        <CalendarRange size={20} color="#674EA7" strokeWidth={2} />
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
              <ListGroup>
                {pending.map((request) => (
                  <Row
                    key={request.id}
                    icon={CalendarRange}
                    iconColor="#674EA7"
                    iconTint="bg-violet-50"
                    title={request.typeName}
                    subtitle={`${request.startDate}${request.endDate !== request.startDate ? ` → ${request.endDate}` : ""} · creada el ${request.createdAt}`}
                    metaSub={request.status}
                    metaSubColor={statusColors[request.status] ?? "#64748b"}
                    chevron
                    onPress={() => router.push({ pathname: "/(paco)/requests/[id]", params: { id: request.id } })}
                  />
                ))}
              </ListGroup>
            )}
          </Section>

          <Section title={`Finalizadas (${finished.length})`}>
            {finished.length === 0 ? (
              <EmptyState title="Sin historial" description="Aquí verás tus solicitudes aprobadas o rechazadas." icon={CalendarCheck} />
            ) : (
              <ListGroup>
                {finished.map((request) => (
                  <Row
                    key={request.id}
                    icon={CalendarRange}
                    iconColor="#64748b"
                    iconTint="bg-slate-100"
                    title={request.typeName}
                    subtitle={`${request.startDate} · resuelta por ${request.stages[request.stages.length - 1]?.replace(/Etapa \d+ · /, "")}`}
                    metaSub={request.status}
                    metaSubColor={statusColors[request.status] ?? "#64748b"}
                    chevron
                    onPress={() => router.push({ pathname: "/(paco)/requests/[id]", params: { id: request.id } })}
                  />
                ))}
              </ListGroup>
            )}
          </Section>
        </>
      )}
    </Screen>
  );
}
