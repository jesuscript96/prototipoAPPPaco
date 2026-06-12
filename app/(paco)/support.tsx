import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { ArrowUpRight, HelpCircle, MessageCircle, Send, UserRound } from "@/components/paco/glyphs";
import { Image, Text, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Badge, Button, Card, Field, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { ChatBubble, ChatComposer } from "@/components/paco/ui";
import { MorphButton, TypingIndicator, type MorphStatus } from "@/components/paco/motion";
import { simulate } from "@/lib/paco-api";
import { botReplies, company, employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function SupportScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [name, setName] = useState<string>(employee.name);
  const [email, setEmail] = useState(store.email);
  const [phone, setPhone] = useState(store.phone);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [createStatus, setCreateStatus] = useState<MorphStatus>("idle");
  const [botTyping, setBotTyping] = useState(false);
  const botIndex = useRef(0);

  const createTicket = async () => {
    if (query.trim().length < 10) {
      setError("Describe tu consulta con un poco más de detalle (mínimo 10 caracteres).");
      return;
    }
    if (!name.trim() || !email.includes("@") || phone.replace(/\D/g, "").length < 10) {
      setError("Nombre, correo y número de contacto son obligatorios.");
      return;
    }
    setError(null);
    setCreateStatus("loading");
    await simulate(null, 1100);
    setCreateStatus("success");
    // El check del boton se asienta y despues aparece la conversacion.
    setTimeout(() => store.createTicket(query.trim()), 750);
  };

  const sendMessage = (text: string) => {
    store.sendTicketMessage(text);
    const reply = botReplies[botIndex.current % botReplies.length] ?? botReplies[0]!;
    botIndex.current += 1;
    setTimeout(() => setBotTyping(true), 400);
    setTimeout(() => {
      store.receiveBotReply(reply);
      setBotTyping(false);
    }, 1900);
  };

  return (
    <Screen
      title="Soporte técnico"
      description={`Canales para resolver problemas del aplicativo. Chat en vivo operado por ${company.chatProvider}.`}
    >
      <Card className="items-center gap-2">
        <Image source={illustrationAssets.support} resizeMode="contain" style={{ width: 150, height: 94 }} />
        <Text className="text-center text-sm font-semibold text-brand-700">Soporte Paco con ticket, bot y escalamiento a agente humano.</Text>
      </Card>
      <Section title="Otros canales">
        <Card className="gap-2.5">
          <Button icon={HelpCircle} variant="outline" onPress={() => router.push("/(paco)/help")}>
            Preguntas frecuentes (portal externo)
          </Button>
          <Button
            icon={MessageCircle}
            variant="outline"
            onPress={() => store.showToast(`Abriendo WhatsApp ${company.whatsappSupport} con "necesito ayuda" (simulado).`)}
          >
            WhatsApp de soporte
          </Button>
        </Card>
      </Section>

      {!store.ticketCreated ? (
        <Section title="Chatea con nosotros ahora" description="Sin conversaciones activas. Completa el formulario para abrir un ticket.">
          <Card className="items-center gap-2 py-5">
            <View className="h-14 w-14 items-center justify-center rounded-[14px] border border-separator bg-white/55">
              <Image source={illustrationAssets.support} resizeMode="contain" style={{ width: 42, height: 42 }} />
            </View>
            <Text className="text-center text-sm leading-5 text-slate-600">
              Las herramientas tecnológicas a tu lado: nuestro bot te atiende de inmediato y puede escalar tu caso a un agente
              humano.
            </Text>
          </Card>
          <Card className="gap-3">
            <Field label="Nombre" value={name} onChangeText={setName} />
            <Field label="Dirección de correo electrónico" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Field label="Número de contacto" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <Field
              label="Consulta"
              value={query}
              onChangeText={setQuery}
              multiline
              placeholder="Describe el problema que tienes con la app…"
              error={error ?? undefined}
            />
            <MorphButton
              label="Iniciar chat y crear ticket"
              loadingLabel="Abriendo ticket…"
              successLabel="Ticket creado"
              icon={Send}
              status={createStatus}
              onPress={createTicket}
            />
          </Card>
        </Section>
      ) : (
        <Section title="Conversación · Ticket #PA-2086">
          <View className="flex-row items-center gap-2">
            <Badge tone={store.escalated ? "info" : "success"}>{store.escalated ? "Con agente humano" : "Bot atendiendo"}</Badge>
            <Text className="text-xs text-slate-400">El ticket también llegó al panel de soporte de Paco</Text>
          </View>
          <Card className="gap-2.5">
            {store.ticketMessages.map((message) => (
              <ChatBubble key={message.id} {...message} />
            ))}
            {botTyping ? <TypingIndicator /> : null}
            <ChatComposer onSend={sendMessage} placeholder="Escribe tu mensaje al soporte…" />
          </Card>
          {!store.escalated ? (
            <Button icon={UserRound} variant="outline" onPress={store.escalateTicket}>
              Escalar a un agente humano
            </Button>
          ) : (
            <InlineAlert
              title="Caso escalado"
              description="Mariana, de soporte técnico, sigue tu caso. Recibirás también respuestas desde el panel."
              tone="info"
            />
          )}
        </Section>
      )}

      <Card className="flex-row items-center gap-3">
        <ArrowUpRight size={18} color="#2F42CB" />
        <Text className="flex-1 text-xs leading-4 text-slate-500">
          ¿Tu duda es del estado de cuenta? Usa el botón de WhatsApp dentro de Reporte de gastos para una atención más rápida.
        </Text>
      </Card>
    </Screen>
  );
}
