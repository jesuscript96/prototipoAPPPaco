import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ChevronRight, MessagesSquare, Plus, Search } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { Segmented, StatusDot, cn } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

const filters = ["Recientes", "Antiguos", "No leídos"] as const;

export default function VoiceStatusScreen() {
  const router = useRouter();
  const { voiceReports } = usePacoStore();
  const [filter, setFilter] = useState<string>("Recientes");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...voiceReports];
    if (filter === "Antiguos") list = list.reverse();
    if (filter === "No leídos") list = list.filter((r) => r.unread);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q) || r.folio.toLowerCase().includes(q) || r.categoryName.toLowerCase().includes(q));
    }
    return list;
  }, [voiceReports, filter, query]);

  return (
    <Screen
      title="Estatus de voz del colaborador"
      description="Da seguimiento a tus reportes con el semáforo de atención y continúa la conversación con RH."
    >
      <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
        <Search size={18} color="#94a3b8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por título, folio o tema…"
          placeholderTextColor="#94a3b8"
          className="min-h-12 flex-1 text-base text-slate-950"
        />
      </View>

      <Segmented options={filters} value={filter} onChange={setFilter} />

      <View className="flex-row items-center justify-around rounded-2xl bg-slate-100 px-3 py-2.5">
        <StatusDot status="Pendiente" />
        <StatusDot status="En proceso" />
        <StatusDot status="Atendido" />
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          title="Sin reportes"
          description={query ? "Ningún reporte coincide con tu búsqueda." : "No tienes reportes con este filtro. Crea uno desde Voz del colaborador."}
          icon={MessagesSquare}
        />
      ) : (
        <View className="gap-2.5">
          {filtered.map((report) => {
            const lastMessage = report.messages[report.messages.length - 1];
            return (
              <Pressable
                key={report.id}
                accessibilityRole="button"
                onPress={() => router.push({ pathname: "/(paco)/voice/[id]", params: { id: report.id } })}
              >
                <Card className={cn("gap-2", report.unread && "border-brand-200 bg-brand-50/60")}>
                  <View className="flex-row items-center justify-between gap-2">
                    <Text className="text-xs font-bold text-slate-500">
                      ({report.categoryName}) · {report.folio}
                    </Text>
                    <StatusDot status={report.status} />
                  </View>
                  <View className="flex-row items-center justify-between gap-2">
                    <Text className="flex-1 text-base font-bold text-slate-950">{report.title}</Text>
                    <ChevronRight size={18} color="#94a3b8" />
                  </View>
                  {lastMessage ? (
                    <Text className="text-sm text-slate-500" numberOfLines={1}>
                      {lastMessage.mine ? "Tú: " : "RH: "}
                      {lastMessage.text}
                    </Text>
                  ) : null}
                  <Text className="text-xs text-slate-400">
                    Creado el {report.createdAt}
                    {report.anonymous ? " · anónimo" : ""}
                    {report.unread ? " · respuesta sin leer" : ""}
                  </Text>
                </Card>
              </Pressable>
            );
          })}
        </View>
      )}

      <Button icon={Plus} variant="outline" onPress={() => router.push("/(paco)/voice")}>
        Crear nuevo reporte
      </Button>
    </Screen>
  );
}
