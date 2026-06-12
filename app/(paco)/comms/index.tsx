import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Megaphone, Newspaper } from "@/components/paco/glyphs";
import { Image, View } from "react-native";
import { illustrationAssets, peopleAssets } from "@/components/paco/assets";
import { EmptyState, Screen } from "@/components/paco/layout";
import { ListGroup, Row, Segmented } from "@/components/paco/ui";
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
        <EmptyState title="Sin comunicados" description="Cuando tu empresa publique un comunicado aparecerá aquí." icon={Megaphone} image={illustrationAssets.empty} />
      ) : (
        <ListGroup>
          {list.map((comm) => {
            const read = readCommIds.includes(comm.id);
            return (
              <Row
                key={comm.id}
                icon={Newspaper}
                leading={
                  <View className="h-10 w-10 items-center justify-center rounded-[12px] border border-separator bg-white/55">
                    <Image source={peopleAssets.docIcon} resizeMode="contain" style={{ width: 25, height: 25 }} />
                  </View>
                }
                title={comm.title}
                subtitle={`${comm.author} · ${comm.body}`}
                meta={comm.date.split(" · ")[0]}
                metaSub={comm.attachments.length > 0 ? `${comm.attachments.length} adjunto${comm.attachments.length > 1 ? "s" : ""}` : undefined}
                unread={!read}
                chevron
                onPress={() => router.push({ pathname: "/(paco)/comms/[id]", params: { id: comm.id } })}
              />
            );
          })}
        </ListGroup>
      )}
    </Screen>
  );
}
