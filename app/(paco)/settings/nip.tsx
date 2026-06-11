import { useState } from "react";
import { useRouter } from "expo-router";
import { KeyRound } from "@/components/paco/glyphs";
import { Text, TextInput, View } from "react-native";
import { Button, Card, InlineAlert, Screen } from "@/components/paco/layout";
import { StepHeader, SuccessCard, cn } from "@/components/paco/ui";
import { ShakeView } from "@/components/paco/motion";
import { simulate } from "@/lib/paco-api";
import { usePacoStore } from "@/store/paco-store";

function NipInput({ value, onChangeText, autoFocus }: { value: string; onChangeText: (text: string) => void; autoFocus?: boolean }) {
  return (
    <View className="items-center gap-3">
      <View className="flex-row gap-3">
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className={cn(
              "h-14 w-14 items-center justify-center rounded-2xl border-2",
              index < value.length ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white",
            )}
          >
            <Text className="text-2xl font-bold text-brand-700">{index < value.length ? "●" : ""}</Text>
          </View>
        ))}
      </View>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, "").slice(0, 4))}
        keyboardType="number-pad"
        maxLength={4}
        autoFocus={autoFocus ?? false}
        caretHidden
        className="h-12 w-44 rounded-2xl border border-slate-200 bg-white text-center text-base text-transparent"
      />
      <Text className="text-xs text-slate-400">Escribe los 4 dígitos en el campo de arriba</Text>
    </View>
  );
}

export default function NipScreen() {
  const router = useRouter();
  const { changeNip } = usePacoStore();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const advance = async () => {
    if (step === 0 && current.length === 4) {
      setError(null);
      setStep(1);
      return;
    }
    if (step === 1 && next.length === 4) {
      setError(null);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (confirm !== next) {
        setError("Los NIP no coinciden. Vuelve a intentarlo.");
        setConfirm("");
        return;
      }
      setError(null);
      setSaving(true);
      await simulate(null, 900);
      changeNip();
      setSaving(false);
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <Screen>
        <SuccessCard title="NIP actualizado" description="Usa tu nuevo NIP de 4 dígitos para autorizar adelantos, recargas y pagos.">
          <View className="w-full pt-2">
            <Button onPress={() => router.back()}>Volver a configuración</Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  const screens = [
    { title: "Tu NIP actual", value: current, set: setCurrent, cta: "Continuar" },
    { title: "Tu nuevo NIP", value: next, set: setNext, cta: "Continuar" },
    { title: "Confirma tu nuevo NIP", value: confirm, set: setConfirm, cta: "Guardar NIP" },
  ] as const;
  const active = screens[step];

  return (
    <Screen title="NIP de transacciones" description="El NIP autoriza tus movimientos financieros dentro de Paco.">
      <StepHeader step={step + 1} total={3} title={active.title} />
      <ShakeView trigger={error}>
      <Card className="gap-4 py-8">
        <View className="items-center">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
            <KeyRound size={22} color="#2F42CB" />
          </View>
        </View>
        <NipInput value={active.value} onChangeText={active.set} autoFocus />
      </Card>
      </ShakeView>
      {error ? <InlineAlert title="Verifica tu NIP" description={error} tone="danger" /> : null}
      <Button disabled={active.value.length !== 4} loading={saving} onPress={advance}>
        {active.cta}
      </Button>
    </Screen>
  );
}
