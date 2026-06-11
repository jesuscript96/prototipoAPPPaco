import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { BookOpen, ChevronRight, ClipboardCheck, ClipboardList, Mail } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Badge, Card, EmptyState, InlineAlert, Progress, Screen } from "@/components/paco/layout";
import { Segmented } from "@/components/paco/ui";
import { onboardingTasks } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const kindIcons = { Mensaje: Mail, Examen: ClipboardList, Material: BookOpen } as const;
const filters = ["Todas", "Pendientes", "Completadas"] as const;

export default function OnboardingTasksScreen() {
  const router = useRouter();
  const { onboardingStatus } = usePacoStore();
  const [filter, setFilter] = useState<string>("Todas");

  const statusOf = (id: string) => onboardingStatus[id] ?? "Pendiente";
  const doneCount = onboardingTasks.filter((t) => statusOf(t.id) !== "Pendiente").length;

  const filtered = useMemo(
    () =>
      onboardingTasks.filter((task) => {
        const status = statusOf(task.id);
        if (filter === "Pendientes") return status === "Pendiente";
        if (filter === "Completadas") return status !== "Pendiente";
        return true;
      }),
    [filter, onboardingStatus],
  );

  return (
    <Screen
      title="Onboarding"
      description="Tareas de incorporación asignadas por tu empresa: mensajes, exámenes y material didáctico, con día programado, vencimiento y mentor."
    >
      <Card className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-slate-700">Avance del plan</Text>
          <Text className="text-sm font-bold text-brand-700">
            {doneCount}/{onboardingTasks.length}
          </Text>
        </View>
        <Progress value={Math.round((doneCount / onboardingTasks.length) * 100)} />
      </Card>

      <InlineAlert
        title="Recordatorios push programados"
        description="Cada tarea genera notificaciones push en su día programado y avisa a tu mentor cuando requiere calificación."
        tone="info"
      />

      <Segmented options={filters} value={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState title="Nada por aquí" description="No hay tareas con este filtro." icon={ClipboardCheck} />
      ) : (
        <View className="gap-2.5">
          {filtered.map((task) => {
            const status = statusOf(task.id);
            return (
              <Pressable
                key={task.id}
                accessibilityRole="button"
                onPress={() => router.push({ pathname: "/(paco)/onboarding-tasks/[id]", params: { id: task.id } })}
              >
                <Card className="gap-2">
                  <View className="flex-row items-start gap-3">
                    {(() => {
                      const KindIcon = kindIcons[task.kind];
                      return (
                        <View className="h-11 w-11 items-center justify-center rounded-[12px] bg-sky-50">
                          <KindIcon size={20} color="#0284c7" strokeWidth={2} />
                        </View>
                      );
                    })()}
                    <View className="flex-1">
                      <Text className="text-base font-bold text-slate-950">{task.title}</Text>
                      <Text className="mt-0.5 text-xs text-slate-500">
                        {task.kind} · {task.scheduledFor} · vence {task.due}
                      </Text>
                      {task.mentor ? <Text className="mt-0.5 text-xs text-slate-500">Mentor: {task.mentor}</Text> : null}
                    </View>
                    <ChevronRight size={18} color="#94a3b8" />
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Badge
                      tone={
                        status === "Completada" ? "success" : status === "Por calificar" ? "info" : task.dueTone === "warning" ? "warning" : "neutral"
                      }
                    >
                      {status === "Pendiente" && task.dueTone === "warning" ? "Vence pronto" : status}
                    </Badge>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
