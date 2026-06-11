import { useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MessagesSquare } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { ChatBubble, ChatComposer, StatusDot } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

const rhReplies = [
  "Gracias por la información adicional. La estamos integrando al expediente del caso.",
  "Tu caso sigue en revisión con el comité correspondiente. Te avisaremos de cualquier avance por este medio.",
  "Recibido. ¿Hay algo más que quieras agregar mientras avanzamos con la revisión?",
];

export default function VoiceChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { voiceReports, sendVoiceMessage, receiveRhReply, markVoiceRead, showToast } = usePacoStore();
  const report = voiceReports.find((r) => r.id === id);
  const replyIndex = useRef(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (report?.unread) markVoiceRead(report.id);
  }, [report?.id, report?.unread, markVoiceRead]);

  if (!report) {
    return (
      <Screen title="Reporte no encontrado">
        <EmptyState title="Sin conversación" description="El reporte solicitado no existe o fue eliminado." icon={MessagesSquare} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  const send = (text: string) => {
    sendVoiceMessage(report.id, text);
    const reply = rhReplies[replyIndex.current % rhReplies.length] ?? rhReplies[0]!;
    replyIndex.current += 1;
    setTimeout(() => receiveRhReply(report.id, reply), 1800);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View className="flex-1 bg-canvas">
      <View className="gap-2 border-b border-slate-200 bg-white px-4 pb-3 pt-12">
        <View className="flex-row items-center gap-3">
          <Pressable
            accessibilityLabel="Regresar"
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200"
          >
            <ArrowLeft size={18} color="#15143a" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-base font-bold text-slate-950" numberOfLines={1}>
              {report.folio} · {report.title}
            </Text>
            <Text className="text-xs text-slate-500">
              {report.categoryName} · creado el {report.createdAt}
              {report.anonymous ? " · anónimo" : ""}
            </Text>
          </View>
          <StatusDot status={report.status} />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerClassName="gap-3 px-5 py-4"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        <View className="items-center">
          <Text className="rounded-full bg-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600">
            Conversación segura con Recursos Humanos
          </Text>
        </View>
        {report.messages.map((message) => (
          <ChatBubble key={message.id} {...message} />
        ))}
        {report.status !== "Atendido" ? (
          <View className="items-center">
            <Text className="text-[10px] font-semibold text-slate-400">
              {report.status === "Pendiente" ? "Esperando primera respuesta de RH…" : "RH está dando seguimiento a tu caso…"}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <View className="border-t border-slate-200 bg-white px-4 py-3">
        <ChatComposer
          onSend={send}
          onAttach={() => {
            sendVoiceMessage(report.id, "Adjunto evidencia adicional.", "foto-evidencia-2.jpg");
            showToast("Foto tomada y enviada a RH (simulado).");
          }}
        />
      </View>
    </View>
  );
}
