import { useState } from "react";
import { useRouter } from "expo-router";
import { KeyRound, Send } from "@/components/paco/glyphs";
import { Image, Text, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Button, Card, Field, Screen } from "@/components/paco/layout";
import { SuccessCard } from "@/components/paco/ui";
import { mockSendRecovery } from "@/lib/paco-api";
import { usePacoStore } from "@/store/paco-store";

export default function RecoverScreen() {
  const router = useRouter();
  const { recoverySent, sendRecovery } = usePacoStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Ingresa un correo válido para enviarte la liga de recuperación.");
      return;
    }
    setError(null);
    setLoading(true);
    await mockSendRecovery(email);
    setLoading(false);
    sendRecovery();
  };

  return (
    <Screen
      eyebrow="Acceso"
      title="Recupera tu contraseña"
      description="Te enviaremos una liga segura para restablecer tu contraseña al correo registrado en tu expediente."
    >
      {recoverySent ? (
        <SuccessCard
          title="Revisa tu correo"
          description={`Enviamos la liga de recuperación a ${email || "tu correo registrado"}. La liga vence en 30 minutos.`}
          image={illustrationAssets.success}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/login")}>Volver a iniciar sesión</Button>
          </View>
        </SuccessCard>
      ) : (
        <Card className="gap-4">
          <View className="items-center gap-2">
            <Image source={illustrationAssets.password} resizeMode="contain" style={{ width: 178, height: 112 }} />
          </View>
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
              <KeyRound size={22} color="#2F42CB" />
            </View>
            <Text className="flex-1 text-sm leading-5 text-slate-600">
              Por seguridad, la liga sólo funciona una vez y caduca a los 30 minutos.
            </Text>
          </View>
          <Field
            label="Correo registrado"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="correo@empresa.mx"
            error={error ?? undefined}
          />
          <Button icon={Send} loading={loading} onPress={submit}>
            Enviar liga de recuperación
          </Button>
        </Card>
      )}
    </Screen>
  );
}
