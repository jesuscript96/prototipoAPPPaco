import { useState } from "react";
import { useRouter } from "expo-router";
import { Phone, Send } from "@/components/paco/glyphs";
import { Image, Text, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Button, Card, Field, InlineAlert, Screen } from "@/components/paco/layout";
import { SuccessCard } from "@/components/paco/ui";
import { mockSendActivation } from "@/lib/paco-api";
import { usePacoStore } from "@/store/paco-store";

export default function ActivateScreen() {
  const router = useRouter();
  const { activationSent, sendActivation } = usePacoStore();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const digits = phone.replace(/\D/g, "");

  const submit = async () => {
    if (digits.length !== 10) {
      setError("Ingresa los 10 dígitos de tu número celular.");
      return;
    }
    setError(null);
    setLoading(true);
    await mockSendActivation(phone);
    setLoading(false);
    sendActivation();
  };

  return (
    <Screen
      eyebrow="Primer acceso"
      title="Activa tu cuenta"
      description="Tu empresa ya te registró en el panel Paco. Valida tu identidad con tu número celular para recibir la solicitud de activación."
    >
      {activationSent ? (
        <SuccessCard
          title="Solicitud enviada"
          description={`Enviamos la solicitud de activación para el número ${phone || "registrado"}. Recibirás un SMS con tu liga de activación en los próximos minutos.`}
          image={illustrationAssets.success}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/login")}>Ir a iniciar sesión</Button>
            <Button variant="ghost" onPress={() => router.back()}>
              Volver
            </Button>
          </View>
        </SuccessCard>
      ) : (
        <>
          <Card className="items-center gap-2">
            <Image source={illustrationAssets.activation} resizeMode="contain" style={{ width: 190, height: 126 }} />
            <Text className="text-center text-sm font-semibold text-slate-600">Validación rápida con el teléfono registrado por RH.</Text>
          </Card>
          <Card className="gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
                <Phone size={22} color="#2F42CB" />
              </View>
              <Text className="flex-1 text-sm leading-5 text-slate-600">
                El número debe coincidir con el que Recursos Humanos registró en tu expediente.
              </Text>
            </View>
            <Field
              label="Número celular"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="55 1234 5678"
              error={error ?? undefined}
              helper={error ? undefined : `${digits.length}/10 dígitos`}
            />
            <Button icon={Send} loading={loading} onPress={submit}>
              Enviar solicitud de activación
            </Button>
          </Card>
          <InlineAlert
            title="¿No reconoces tu número registrado?"
            description="Contacta a tu área de Recursos Humanos o abre la ayuda externa de Paco para levantar un ticket."
            tone="info"
          />
        </>
      )}
    </Screen>
  );
}
