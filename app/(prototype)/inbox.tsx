import { Text, View } from "react-native";
import { Send } from "lucide-react-native";
import { AttachmentPreview, Avatar, Button, Card, Field, Screen, Section } from "@/components/ui";
import { conversations } from "@/mock/data";

export default function InboxScreen() {
  const conversation = conversations[0];

  return (
    <Screen
      eyebrow="Inbox"
      title={conversation.person}
      description="Conversación demo con mensajes, adjuntos y composer sin enviar nada a un backend."
    >
      <Section title="Mensajes">
        {conversation.messages.map((message) => (
          <View key={message.id} className={message.mine ? "items-end" : "items-start"}>
            <View className={message.mine ? "max-w-[82%] rounded-3xl bg-brand-500 p-4" : "max-w-[82%] rounded-3xl bg-white p-4"}>
              <Text className={message.mine ? "text-sm font-bold text-white" : "text-sm font-bold text-slate-900"}>{message.from}</Text>
              <Text className={message.mine ? "mt-1 text-base leading-6 text-white" : "mt-1 text-base leading-6 text-slate-700"}>{message.text}</Text>
            </View>
          </View>
        ))}
      </Section>
      <Section title="Adjuntos">
        {conversation.attachments.map((attachment) => <AttachmentPreview key={attachment.name} {...attachment} />)}
      </Section>
      <Card className="gap-3">
        <View className="flex-row items-center gap-3">
          <Avatar name="Mariana López" />
          <Field label="Responder" placeholder="Escribe un mensaje claro y accionable" multiline />
        </View>
        <Button icon={Send}>Enviar mock</Button>
      </Card>
    </Screen>
  );
}
