import { useState } from "react";
import { useRouter } from "expo-router";
import { ChevronDown, ChevronUp, ExternalLink, MessageCircle, Ticket } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Button, Card, Screen, Section } from "@/components/paco/layout";
import { usePacoStore } from "@/store/paco-store";
import { company, faqTopics } from "@/mock/paco";

export default function HelpScreen() {
  const router = useRouter();
  const showToast = usePacoStore((s) => s.showToast);
  const loggedIn = usePacoStore((s) => s.loggedIn);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <Screen
      eyebrow="paco.mx/ayuda"
      title="Centro de ayuda Paco"
      description="Redirección simulada al portal externo de soporte: guía de uso de la app, preguntas frecuentes por tema y levantamiento de tickets."
    >
      <Card className="gap-3 bg-ink">
        <Text className="text-xs font-bold uppercase tracking-[1px] text-white/70">Portal externo</Text>
        <Text className="text-2xl font-bold text-white">PACO, la plataforma de People Analytics y Cultura Organizacional</Text>
        <Button variant="secondary" icon={ExternalLink} onPress={() => showToast(`Abriendo ${company.faqUrl} en el navegador (simulado).`)}>
          Abrir portal en el navegador
        </Button>
      </Card>

      <Section title="Preguntas frecuentes" description="Organizadas por tema, igual que en el portal oficial.">
        <View className="gap-2">
          {faqTopics.map((topic) => {
            const open = openTopic === topic.id;
            return (
              <Card key={topic.id} className="gap-2">
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setOpenTopic(open ? null : topic.id)}
                  className="min-h-11 flex-row items-center justify-between"
                >
                  <Text className="text-base font-bold text-slate-900">{topic.topic}</Text>
                  {open ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                </Pressable>
                {open ? (
                  <View className="gap-2 rounded-2xl bg-slate-50 p-3">
                    <Text className="text-sm font-semibold text-slate-700">{topic.detail}</Text>
                    <Text className="text-sm leading-5 text-slate-600">
                      Encuentra la guía paso a paso en el portal. Si tu duda persiste, levanta un ticket y el equipo técnico te
                      responderá en menos de 24 horas hábiles.
                    </Text>
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>
      </Section>

      <Section title="¿Necesitas más ayuda?">
        <Card className="gap-3">
          <Button
            icon={Ticket}
            variant="outline"
            onPress={() =>
              loggedIn ? router.push("/(paco)/support") : showToast("Formulario de ticket disponible al iniciar sesión. (En el portal real es público.)")
            }
          >
            Enviar ticket al área técnica
          </Button>
          <Button icon={MessageCircle} variant="outline" onPress={() => showToast(`Abriendo WhatsApp con ${company.whatsappSupport} (simulado).`)}>
            WhatsApp de soporte
          </Button>
        </Card>
      </Section>
    </Screen>
  );
}
