import { useState } from "react";
import { Text, View } from "react-native";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react-native";
import { Button, Card, Field, InlineAlert, Progress, Screen, Section } from "@/components/ui";
import { useDemoStore } from "@/store/demo-store";

const steps = [
  { title: "Control operativo", body: "Da seguimiento a registros, documentos y conversaciones desde móvil." },
  { title: "Estados claros", body: "Cada flujo incluye carga, vacío, error y confirmaciones críticas." },
  { title: "Listo para demo", body: "No hay backend real; todo se puede recorrer con mock data local." },
] as const;

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useDemoStore();
  const current = steps[step] ?? steps[0];

  return (
    <Screen eyebrow="Onboarding" title={current.title} description={current.body}>
      <Card className="gap-4">
        <Progress value={(step + 1) * 33} />
        <View className="h-44 items-center justify-center rounded-[32px] bg-brand-50">
          <ShieldCheck size={56} color="#3148c8" />
          <Text className="mt-4 text-center text-lg font-bold text-brand-700">Paso {step + 1} de 3</Text>
        </View>
        <Button
          icon={ArrowRight}
          onPress={() => {
            if (step === 2) completeOnboarding();
            setStep((value) => Math.min(2, value + 1));
          }}
        >
          {step === 2 ? "Terminar onboarding" : "Continuar"}
        </Button>
      </Card>

      <Section title="Login mock">
        <Card className="gap-4">
          <Field label="Correo" placeholder="tu@empresa.mx" keyboardType="email-address" />
          <Field label="Contraseña" placeholder="Mínimo 8 caracteres" secureTextEntry />
          <Button icon={KeyRound}>Entrar sin auth real</Button>
          <InlineAlert tone="info" title="Recuperación de contraseña mock" description="Se muestra el flujo, pero no se envían correos ni tokens reales." />
          <Button icon={Mail} variant="outline">Enviar enlace mock</Button>
        </Card>
      </Section>
    </Screen>
  );
}
