import { useState } from "react";
import { View } from "react-native";
import { Send } from "@/components/paco/glyphs";
import { Button, Card, Field, Screen, Section } from "@/components/paco/layout";
import { AmountSlider, ChatBubble, ChatComposer, SignatureBox, StepHeader } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

export default function FormulariosScreen() {
  const showToast = usePacoStore((s) => s.showToast);
  const [amount, setAmount] = useState(800);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [signed, setSigned] = useState(false);
  const [messages, setMessages] = useState([
    { id: "m1", from: "Recursos Humanos", text: "Hola, ¿en qué podemos ayudarte?", mine: false, time: "10:02" },
  ]);

  return (
    <Screen
      eyebrow="Patrones"
      title="Formularios y flujos"
      description="Los procesos largos se guían con StepHeader; las operaciones financieras usan el selector de monto; la firma es un gesto explícito."
    >
      <Section title="Asistente por pasos">
        <StepHeader step={2} total={4} title="¿Cuánto deseas solicitar?" subtitle="El progreso siempre es visible." />
      </Section>

      <Section title="Selector de monto">
        <Card className="py-5">
          <AmountSlider min={200} max={2500} step={100} value={amount} onChange={setAmount} />
        </Card>
      </Section>

      <Section title="Campos">
        <Card className="gap-3">
          <Field label="Nombre" value={name} onChangeText={setName} placeholder="Escribe tu nombre" helper="Texto de apoyo opcional" />
          <Field label="Comentario" value={comment} onChangeText={setComment} multiline placeholder="Cuéntanos más…" />
          <Field label="Con error" value="" onChangeText={() => undefined} placeholder="Campo requerido" error="Este campo es obligatorio." />
          <Button icon={Send} onPress={() => showToast("Formulario enviado.")}>Enviar</Button>
        </Card>
      </Section>

      <Section title="Firma digital">
        <SignatureBox signed={signed} signerName="Ricardo Jafif Pereyra" onSign={() => setSigned(true)} />
      </Section>

      <Section title="Conversación">
        <Card className="gap-3">
          <View className="gap-2">
            {messages.map((m) => (
              <ChatBubble key={m.id} {...m} />
            ))}
          </View>
          <ChatComposer
            onSend={(text) =>
              setMessages((prev) => [...prev, { id: `m${prev.length + 1}`, from: "Tú", text, mine: true, time: "ahora" }])
            }
            onAttach={() => showToast("Adjunto simulado.")}
          />
        </Card>
      </Section>
    </Screen>
  );
}
