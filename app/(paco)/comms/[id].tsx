import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileQuestion } from "@/components/paco/glyphs";
import { Text, View } from "react-native";
import { Button, Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { FileTile } from "@/components/paco/ui";
import { communications } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function CommDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const comm = communications.find((c) => c.id === id);
  const { markCommRead, downloadedFiles, downloadFile } = usePacoStore();

  useEffect(() => {
    if (comm) markCommRead(comm.id);
  }, [comm, markCommRead]);

  if (!comm) {
    return (
      <Screen title="Comunicado no encontrado">
        <EmptyState title="Sin comunicado" description="El comunicado solicitado no existe o fue retirado." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  return (
    <Screen eyebrow={comm.author} title={comm.title} description={comm.date}>
      <Card>
        <Text className="text-base leading-7 text-slate-700">{comm.body}</Text>
      </Card>

      {comm.attachments.length > 0 ? (
        <Section title="Material adjunto" description="Descarga y abre los archivos con las aplicaciones de tu dispositivo.">
          <View className="gap-2">
            {comm.attachments.map((attachment) => (
              <FileTile
                key={attachment.id}
                name={attachment.name}
                kind={attachment.kind}
                size={attachment.size}
                downloaded={downloadedFiles.includes(attachment.name)}
                onDownload={() => downloadFile(attachment.name)}
              />
            ))}
          </View>
        </Section>
      ) : null}

      <View className="rounded-2xl bg-green-50 p-3">
        <Text className="text-sm font-semibold text-green-800">Comunicado marcado como leído</Text>
      </View>
    </Screen>
  );
}
