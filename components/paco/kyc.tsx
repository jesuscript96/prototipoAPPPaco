// Verificacion de identidad (KYC) simulada con tercero: INE frente/reverso,
// selfie y validacion. Se reutiliza en adelanto de nomina y pago de servicios.

import { useState } from "react";
import { Camera, ShieldCheck } from "@/components/paco/glyphs";
import { Pressable, Text, View } from "react-native";
import { Button, Card, InlineAlert } from "@/components/paco/layout";
import { cn } from "@/components/paco/ui";
import { runPhases } from "@/lib/paco-api";
import { kycIcons } from "@/components/paco/icons";
import { company, kycSteps } from "@/mock/paco";

const verificationPhases = ["Enviando documentos al verificador…", "Analizando identificación…", "Comparando biometría…", "Identidad validada"] as const;

export function KycFlow({ onDone }: { onDone: () => void }) {
  const [captured, setCaptured] = useState<string[]>([]);
  const [verifying, setVerifying] = useState(false);
  const [phase, setPhase] = useState<string | null>(null);

  const allCaptured = captured.length === kycSteps.length;

  const capture = (id: string) => setCaptured((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const verify = async () => {
    setVerifying(true);
    await runPhases(verificationPhases, (p) => setPhase(p), 750);
    setVerifying(false);
    onDone();
  };

  return (
    <Card className="gap-4">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
          <ShieldCheck size={22} color="#B8860B" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-950">Verificación de identidad</Text>
          <Text className="text-sm text-slate-500">{company.kycProvider} · requerida por la pasarela de pagos</Text>
        </View>
      </View>

      <View className="gap-2">
        {kycSteps.map((step) => {
          const done = captured.includes(step.id);
          return (
            <Pressable
              key={step.id}
              accessibilityRole="button"
              onPress={() => capture(step.id)}
              disabled={verifying}
              className={cn(
                "flex-row items-center gap-3 rounded-2xl border p-3",
                done ? "border-green-300 bg-green-50" : "border-slate-200 bg-white",
              )}
            >
              {(() => {
                const StepIcon = kycIcons[step.id] ?? Camera;
                return (
                  <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-amber-50">
                    <StepIcon size={18} color="#B8860B" strokeWidth={2.1} />
                  </View>
                );
              })()}
              <View className="flex-1">
                <Text className={cn("text-sm font-bold", done ? "text-green-800" : "text-slate-900")}>{step.title}</Text>
                <Text className="text-xs leading-4 text-slate-500">{done ? "Captura lista" : step.description}</Text>
              </View>
              {!done ? (
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <Camera size={18} color="#2F42CB" />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {phase ? <InlineAlert title="Verificación con tercero" description={phase} tone={phase.includes("validada") ? "success" : "info"} /> : null}

      <Button icon={ShieldCheck} disabled={!allCaptured} loading={verifying} onPress={verify}>
        {allCaptured ? "Enviar a verificación" : `Captura ${kycSteps.length - captured.length} elemento(s) restante(s)`}
      </Button>
    </Card>
  );
}
