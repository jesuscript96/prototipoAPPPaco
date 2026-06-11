import { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, FileText, Image as ImageIcon, MessageSquareX, Users, Video } from "@/components/paco/glyphs";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { illustrationAssets, peopleAssets } from "@/components/paco/assets";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { ChatBubble, ChatComposer, SheetHeader } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

const attachmentOptions = [
  { id: "image", label: "Imagen", icon: ImageIcon, file: "foto-equipo.jpg", message: "Imagen compartida" },
  { id: "doc", label: "Documento", icon: FileText, file: "minuta-reunion.pdf", message: "Documento compartido" },
  { id: "video", label: "Video", icon: Video, file: "video-recorrido.mp4", message: "Video compartido" },
] as const;

export default function ChatRoomScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { chatRooms, sendChatMessage, showToast } = usePacoStore();
  const room = chatRooms.find((r) => r.id === id);
  const [attachSheet, setAttachSheet] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

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
      <View className="flex-row items-center gap-3 border-b border-slate-200 bg-white px-4 pb-3 pt-12">
        <Pressable
          accessibilityLabel="Regresar"
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200"
        >
          <ArrowLeft size={18} color="#1E1E1E" />
        </Pressable>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-100">
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

      <ScrollView
        ref={scrollRef}
        contentContainerClassName="gap-3 px-5 py-4"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {room.messages.length === 0 ? (
          <View className="items-center py-8">
            <View className="h-14 w-14 items-center justify-center rounded-[14px] bg-brand-100">
              <Image source={peopleAssets.paperclip} resizeMode="contain" style={{ width: 34, height: 34 }} />
            </View>
            <Text className="mt-2 text-sm font-semibold text-slate-500">Sala creada. ¡Manda el primer mensaje!</Text>
          </View>
        ) : (
          room.messages.map((message) => <ChatBubble key={message.id} {...message} />)
        )}
      </ScrollView>

      <View className="border-t border-slate-200 bg-white px-4 py-3">
        <ChatComposer onSend={(text) => sendChatMessage(room.id, text)} onAttach={() => setAttachSheet(true)} />
      </View>

      <Modal transparent visible={attachSheet} animationType="slide" onRequestClose={() => setAttachSheet(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[20px] bg-white p-5 pb-8">
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
                  className="flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white py-5 active:bg-brand-50"
                >
                  <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                    <Image source={option.id === "doc" ? peopleAssets.docIcon : option.id === "image" ? peopleAssets.user : peopleAssets.paperclip} resizeMode="contain" style={{ width: 30, height: 30 }} />
                  </View>
                  <Text className="text-sm font-bold text-slate-800">{option.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
