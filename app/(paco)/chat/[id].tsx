import { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, FileText, Image as ImageIcon, MessageSquareX, Users, Video } from "@/components/paco/glyphs";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { illustrationAssets, peopleAssets } from "@/components/paco/assets";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { GlassBottomSheet, GlassConversationFooter, GlassConversationHeader, GlassIconButton, GlassSurface } from "@/components/paco/glass";
import { ChatBubble, ChatComposer, SheetHeader } from "@/components/paco/ui";
import { TypingIndicator } from "@/components/paco/motion";
import { usePacoStore } from "@/store/paco-store";

const attachmentOptions = [
  { id: "image", label: "Imagen", icon: ImageIcon, file: "foto-equipo.jpg", message: "Imagen compartida" },
  { id: "doc", label: "Documento", icon: FileText, file: "minuta-reunion.pdf", message: "Documento compartido" },
  { id: "video", label: "Video", icon: Video, file: "video-recorrido.mp4", message: "Video compartido" },
] as const;

export default function ChatRoomScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { chatRooms, sendChatMessage, receiveChatMessage, showToast } = usePacoStore();
  const room = chatRooms.find((r) => r.id === id);
  const [attachSheet, setAttachSheet] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const replyIndex = useRef(0);
  const scrollRef = useRef<ScrollView>(null);

  const cannedReplies = [
    "Va, lo reviso y te confirmo en un rato.",
    "Perfecto, gracias por avisar.",
    "Recibido. Lo comento con el equipo y te digo.",
  ];

  const sendWithReply = (text: string) => {
    if (!room) return;
    sendChatMessage(room.id, text);
    const author = room.participants.find((p) => !p.startsWith("Ricardo")) ?? room.name;
    const reply = cannedReplies[replyIndex.current % cannedReplies.length] ?? cannedReplies[0]!;
    replyIndex.current += 1;
    setTimeout(() => setOtherTyping(true), 600);
    setTimeout(() => {
      receiveChatMessage(room.id, author, reply);
      setOtherTyping(false);
    }, 2200);
  };

  if (!room) {
    return (
      <Screen title="Conversación no encontrada">
        <EmptyState title="Sin conversación" description="La sala no existe o fue eliminada." icon={MessageSquareX} image={illustrationAssets.support} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  return (
    <View className="flex-1 bg-canvas">
      <GlassConversationHeader>
        <View className="flex-row items-center gap-3">
          <GlassIconButton label="Regresar" onPress={() => router.back()}>
            <ArrowLeft size={18} color="#004080" />
          </GlassIconButton>
        <View className="h-10 w-10 items-center justify-center rounded-full border border-separator bg-white/55">
          {room.isGroup ? (
            <Users size={18} color="#2F42CB" />
          ) : (
            <Image source={peopleAssets.avatarSmall} resizeMode="cover" style={{ width: 36, height: 36, borderRadius: 18 }} />
          )}
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-950">{room.name}</Text>
          <Text className="text-xs text-slate-500" numberOfLines={1}>
            {room.isGroup ? room.participants.join(", ") : "Conversación directa · infraestructura corporativa protegida"}
          </Text>
        </View>
        </View>
      </GlassConversationHeader>

      <ScrollView
        ref={scrollRef}
        contentContainerClassName="gap-3 px-5 py-4"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {room.messages.length === 0 ? (
          <View className="items-center py-8">
            <View className="h-14 w-14 items-center justify-center rounded-[14px] border border-separator bg-white/55">
              <Image source={peopleAssets.paperclip} resizeMode="contain" style={{ width: 34, height: 34 }} />
            </View>
            <Text className="mt-2 text-sm font-semibold text-slate-500">Sala creada. ¡Manda el primer mensaje!</Text>
          </View>
        ) : (
          room.messages.map((message) => <ChatBubble key={message.id} {...message} />)
        )}
        {otherTyping ? <TypingIndicator /> : null}
      </ScrollView>

      <GlassConversationFooter>
        <ChatComposer onSend={sendWithReply} onAttach={() => setAttachSheet(true)} />
      </GlassConversationFooter>

      <Modal transparent visible={attachSheet} animationType="slide" onRequestClose={() => setAttachSheet(false)}>
        <View className="flex-1 justify-end bg-navy/40">
          <GlassBottomSheet>
            <SheetHeader title="Adjuntar" onClose={() => setAttachSheet(false)} />
            <View className="flex-row gap-3">
              {attachmentOptions.map((option) => (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  onPress={() => {
                    sendChatMessage(room.id, option.message, option.file);
                    setAttachSheet(false);
                    showToast(`${option.label} "${option.file}" enviada (simulado).`);
                  }}
                  className="flex-1 active:opacity-80"
                >
                  <GlassSurface variant="light" className="items-center gap-2 py-5">
                  <View className="h-12 w-12 items-center justify-center rounded-2xl border border-separator bg-white/55">
                    <Image source={option.id === "doc" ? peopleAssets.docIcon : option.id === "image" ? peopleAssets.user : peopleAssets.paperclip} resizeMode="contain" style={{ width: 30, height: 30 }} />
                  </View>
                  <Text className="text-sm font-bold text-slate-800">{option.label}</Text>
                  </GlassSurface>
                </Pressable>
              ))}
            </View>
          </GlassBottomSheet>
        </View>
      </Modal>
    </View>
  );
}
