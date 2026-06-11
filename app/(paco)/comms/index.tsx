import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ChevronRight, Megaphone, Paperclip } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Card, EmptyState, Screen } from "@/components/paco/layout";
import { Segmented, cn } from "@/components/paco/ui";
import { communications } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function CommsScreen() {
  const router = useRouter();
  const { readCommIds } = usePacoStore();
  const [filter, setFilter] = useState<string>("Recientes");

  const list = useMemo(() => {
    const sorted = [...communications];
    return filter === "Antiguos" ? sorted.reverse() : sorted;
  }, [filter]);

  return (
    <Screen
      title="Comunicación"
      description="Circulares, políticas y avisos enviados por tu empresa desde el panel. Los adjuntos se abren con las apps de tu dispositivo."
    >
      <Segmented options={["Recientes", "Antiguos"]} value={filter} onChange={setFilter} />

      {list.length === 0 ? (
        <EmptyState title="Sin comunicados" description="Cuando tu empresa publique un comunicado aparecerá aquí." icon={Megaphone} />
      ) : (
        <View className="gap-2.5">
          {list.map((comm) => {
            const read = readCommIds.includes(comm.id);
            return (
              <Pressable
                key={comm.id}
                accessibilityRole="button"
                onPress={() => router.push({ pathname: "/(paco)/comms/[id]", params: { id: comm.id } })}
              >
                <Card className={cn("gap-2", !read && "border-brand-200")}>
                  <View className="flex-row items-center justify-between gap-2">
                    <View className="flex-row items-center gap-2">
                      {!read ? <View className="h-2.5 w-2.5 rounded-full bg-brand-500" /> : null}
                      <Text className="text-xs font-bold text-slate-500">{comm.author}</Text>
                    </View>
                    <Text className="text-xs text-slate-400">{comm.date}</Text>
                  </View>
                  <View className="flex-row items-center justify-between gap-2">
                    <Text className="flex-1 text-base font-bold text-slate-950">{comm.title}</Text>
                    <ChevronRight size={18} color="#94a3b8" />
                  </View>
                  <Text className="text-sm text-slate-600" numberOfLines={2}>
                    {comm.body}
                  </Text>
                  {comm.attachments.length > 0 ? (
                    <View className="flex-row items-center gap-1.5">
                      <Paperclip size={13} color="#64748b" />
                      <Text className="text-xs font-semibold text-slate-500">
                        {comm.attachments.length} adjunto{comm.attachments.length > 1 ? "s" : ""}
                      </Text>
                    </View>
                  ) : null}
                  <Text className="text-xs font-bold text-brand-700">{read ? "Leído" : "No leído"}</Text>
                </Card>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
