import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Check, MessageSquarePlus, Paperclip, Plus, Search, Users } from "@/components/paco/glyphs";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { illustrationAssets, peopleAssets } from "@/components/paco/assets";
import { Button, EmptyState, Field, Screen } from "@/components/paco/layout";
import { ListGroup, Row, SheetHeader, cn } from "@/components/paco/ui";
import { directory } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function ChatListScreen() {
  const router = useRouter();
  const { chatRooms, createChatRoom } = usePacoStore();
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chatRooms;
    return chatRooms.filter((room) => room.name.toLowerCase().includes(q) || room.participants.some((p) => p.toLowerCase().includes(q)));
  }, [chatRooms, query]);

  const toggleParticipant = (name: string) =>
    setParticipants((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]));

  const create = () => {
    if (participants.length === 0) {
      setError("Selecciona al menos un participante.");
      return;
    }
    const isGroup = participants.length > 1;
    const name = isGroup ? roomName.trim() : (participants[0] ?? "");
    if (isGroup && name.length < 3) {
      setError("Dale un nombre a la sala (mínimo 3 caracteres).");
      return;
    }
    setError(null);
    const id = createChatRoom(name, participants);
    setCreating(false);
    setRoomName("");
    setParticipants([]);
    router.push({ pathname: "/(paco)/chat/[id]", params: { id } });
  };

  return (
    <Screen
      title="Chat interno"
      description="Mensajería corporativa segura: conversaciones 1 a 1 y salas grupales con tu equipo."
    >
      <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
        <Search size={18} color="#94a3b8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar chats o personas…"
          placeholderTextColor="#94a3b8"
          className="min-h-12 flex-1 text-base text-slate-950"
        />
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          title={query ? "Sin resultados" : "Sin conversaciones"}
          description={query ? `Nada coincide con “${query}”.` : "Crea una sala o inicia una conversación con un compañero."}
          icon={MessageSquarePlus}
          image={illustrationAssets.support}
        />
      ) : (
        <ListGroup>
          {filtered.map((room) => {
            const last = room.messages[room.messages.length - 1];
            return (
              <Row
                key={room.id}
                leading={
                  <View className={cn("h-10 w-10 items-center justify-center rounded-full", room.isGroup ? "bg-violet-50" : "bg-brand-100")}>
                    {room.isGroup ? (
                      <Users size={17} color="#674EA7" />
                    ) : (
                      <Image source={peopleAssets.avatarSmall} resizeMode="cover" style={{ width: 36, height: 36, borderRadius: 18 }} />
                    )}
                  </View>
                }
                title={room.name}
                subtitle={last ? `${last.mine ? "Tú: " : ""}${last.attachment ? "Adjunto · " : ""}${last.text}` : "Sala creada · sin mensajes"}
                meta={last?.time?.replace("Hoy · ", "") ?? ""}
                chevron
                onPress={() => router.push({ pathname: "/(paco)/chat/[id]", params: { id: room.id } })}
              />
            );
          })}
        </ListGroup>
      )}

      <Button icon={Plus} onPress={() => setCreating(true)}>
        Crear sala o conversación
      </Button>

      <Modal transparent visible={creating} animationType="slide" onRequestClose={() => setCreating(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="max-h-[85%] rounded-t-[20px] bg-white p-5 pb-8">
            <SheetHeader title="Nueva conversación" onClose={() => setCreating(false)} />
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-sm font-bold text-slate-700">Participantes ({participants.length})</Text>
                <View className="gap-2">
                  {directory.slice(0, 6).map((coworker) => {
                    const selected = participants.includes(coworker.name);
                    return (
                      <Pressable
                        key={coworker.id}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: selected }}
                        onPress={() => toggleParticipant(coworker.name)}
                        className={cn(
                          "flex-row items-center gap-3 rounded-2xl border p-3",
                          selected ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white",
                        )}
                      >
                        <View className={cn("h-9 w-9 items-center justify-center rounded-full", selected ? "bg-brand-500" : "bg-slate-100")}>
                          <Text className={cn("text-xs font-bold", selected ? "text-white" : "text-slate-600")}>
                            {coworker.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-bold text-slate-900">{coworker.name}</Text>
                          <Text className="text-xs text-slate-500">{coworker.area}</Text>
                        </View>
                        {selected ? <Text className="text-xs font-bold text-brand-700"></Text> : null}
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {participants.length > 1 ? (
                <Field label="Nombre de la sala" value={roomName} onChangeText={setRoomName} placeholder="Ej. Operación norte" />
              ) : null}

              {error ? <Text className="text-sm text-red-600">{error}</Text> : null}

              <Button onPress={create}>
                {participants.length > 1 ? "Crear sala grupal" : "Iniciar conversación"}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
