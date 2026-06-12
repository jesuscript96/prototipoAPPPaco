import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MessagesSquare } from "@/components/paco/glyphs";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { GlassConversationFooter, GlassConversationHeader, GlassIconButton } from "@/components/paco/glass";
import { ChatBubble, ChatComposer, StatusDot } from "@/components/paco/ui";
import { TypingIndicator } from "@/components/paco/motion";
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
  const [rhTyping, setRhTyping] = useState(false);
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
    // RH "escribe" antes de responder: typing 500ms despues, respuesta a los 2.1s.
    setTimeout(() => setRhTyping(true), 500);
    setTimeout(() => {
      receiveRhReply(report.id, reply);
      setRhTyping(false);
    }, 2100);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View className="flex-1 bg-canvas">
      <GlassConversationHeader>
        <View className="flex-row items-center gap-3">
          <GlassIconButton label="Regresar" onPress={() => router.back()}>
            <ArrowLeft size={18} color="#004080" />
          </GlassIconButton>
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
      </GlassConversationHeader>

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
        {rhTyping ? <TypingIndicator /> : null}
        {!rhTyping && report.status !== "Atendido" ? (
          <View className="items-center">
            <Text className="text-[10px] font-semibold text-slate-400">
              {report.status === "Pendiente" ? "Esperando primera respuesta de RH…" : "RH está dando seguimiento a tu caso…"}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <GlassConversationFooter>
        <ChatComposer
          onSend={send}
          onAttach={() => {
            sendVoiceMessage(report.id, "Adjunto evidencia adicional.", "foto-evidencia-2.jpg");
            showToast("Foto tomada y enviada a RH (simulado).");
          }}
        />
      </GlassConversationFooter>
    </View>
  );
}
