import { useState } from "react";
import { useRouter } from "expo-router";
import { Camera, ChevronLeft, Image as ImageIcon, Send, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Button, Card, Field, InlineAlert, Screen } from "@/components/paco/layout";
import { OptionCard, StepHeader, SuccessCard, ToggleRow } from "@/components/paco/ui";
import { voiceCategoryIcons } from "@/components/paco/icons";
import { simulate } from "@/lib/paco-api";
import { VoiceCategory, voiceCategories } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function VoiceScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [step, setStep] = useState<"category" | "detail" | "success">("category");
  const [category, setCategory] = useState<VoiceCategory | null>(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [folio, setFolio] = useState("");

  const send = async () => {
    if (!category) return;
    if (title.trim().length < 4) {
      setError("Dale un título breve a tu reporte (mínimo 4 caracteres).");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Describe la situación con más detalle (mínimo 10 caracteres).");
      return;
    }
    setError(null);
    setSending(true);
    await simulate(null, 1000);
    const newFolio = store.submitVoiceReport(category.id, category.name, title.trim(), comment.trim(), anonymous, attachment);
    setSending(false);
    setFolio(newFolio);
    setStep("success");
  };

  if (step === "success" && category) {
    return (
      <Screen>
        <SuccessCard
          title={`Reporte enviado · folio ${folio}`}
          description={`Tu reporte de ${category.name.toLowerCase()} llegó al panel de Recursos Humanos${anonymous ? " de forma anónima" : ""}. Puedes dar seguimiento y conversar con RH desde Estatus de voz del colaborador.`}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/voice/status")}>Ver estatus de mis reportes</Button>
            <Button
              variant="ghost"
              onPress={() => {
                setStep("category");
                setCategory(null);
                setTitle("");
                setComment("");
                setAttachment(null);
                setAnonymous(false);
              }}
            >
              Crear otro reporte
            </Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen>
      {step === "detail" ? (
        <Pressable accessibilityRole="button" onPress={() => setStep("category")} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#3148c8" />
          <Text className="text-sm font-bold text-brand-700">Cambiar tema</Text>
        </Pressable>
      ) : null}

      {step === "category" ? (
        <>
          <StepHeader
            step={1}
            total={2}
            title="¿De qué tema quieres hablar?"
            subtitle="Canal seguro y confidencial hacia Recursos Humanos. Elige el tema que mejor describa tu caso."
          />
          <View className="gap-2.5">
            {voiceCategories.map((cat) => (
              <OptionCard
                key={cat.id}
                title={cat.name}
                icon={voiceCategoryIcons[cat.id]}
                iconColor="#dc2626"
                iconTint="bg-red-50"
                onPress={() => {
                  setCategory(cat);
                  setStep("detail");
                }}
              />
            ))}
          </View>
        </>
      ) : null}

      {step === "detail" && category ? (
        <>
          <StepHeader step={2} total={2} title={category.name} />
          <InlineAlert title="¿Es este el tema correcto?" description={category.description} tone="info" />

          <Card className="gap-3">
            <Field label="Título del reporte" value={title} onChangeText={setTitle} placeholder="Resume tu caso en una línea" />
            <Field
              label="Comentario"
              value={comment}
              onChangeText={setComment}
              multiline
              placeholder="Describe la situación: qué pasó, cuándo y a quién involucra…"
              error={error ?? undefined}
            />

            {attachment ? (
              <View className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <ImageIcon size={20} color="#475569" />
                <Text className="flex-1 text-sm font-semibold text-slate-700">{attachment}</Text>
                <Pressable accessibilityLabel="Quitar imagen" onPress={() => setAttachment(null)} className="h-9 w-9 items-center justify-center rounded-full bg-slate-200">
                  <X size={14} color="#475569" />
                </Pressable>
              </View>
            ) : (
              <Button
                icon={Camera}
                variant="outline"
                onPress={() => {
                  setAttachment("evidencia-2026-06-10.jpg");
                  store.showToast("Imagen adjuntada desde la cámara (simulado).");
                }}
              >
                Adjuntar imagen (opcional)
              </Button>
            )}

            <ToggleRow
              label="Enviar de forma anónima"
              helper={anonymous ? "RH no verá tu nombre ni tu número de colaborador." : "Tu nombre será visible para RH."}
              value={anonymous}
              onChange={setAnonymous}
            />
          </Card>

          <Button icon={Send} loading={sending} onPress={send}>
            Enviar reporte a Recursos Humanos
          </Button>
        </>
      ) : null}
    </Screen>
  );
}
