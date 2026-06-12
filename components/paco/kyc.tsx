// Verificacion de identidad (KYC) simulada con tercero: INE frente/reverso,
// selfie y validacion. Se reutiliza en adelanto de nomina y pago de servicios.

import { useState } from "react";
import { Camera, Check, ShieldCheck } from "@/components/paco/glyphs";
import { Pressable, Text, View } from "react-native";
import { Button, Card, InlineAlert } from "@/components/paco/layout";
import { cn } from "@/components/paco/ui";
import { vibrants } from "@/theme/tokens";
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
        <View className="h-12 w-12 items-center justify-center rounded-2xl border border-separator bg-white/55">
          <ShieldCheck size={22} color={vibrants.warning.accent} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-label-primary">Verificación de identidad</Text>
          <Text className="text-sm text-label-secondary">{company.kycProvider} · requerida por la pasarela de pagos</Text>
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
              style={done ? { borderColor: vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" } : undefined}
              className={cn(
                "flex-row items-center gap-3 rounded-2xl border p-3",
                !done && "border-white/80 bg-white/50",
              )}
            >
              {(() => {
                const StepIcon = kycIcons[step.id] ?? Camera;
                return (
                  <View className="h-10 w-10 items-center justify-center rounded-[10px] border border-separator bg-white/55">
                    <StepIcon size={18} color={done ? vibrants.success.accent : vibrants.warning.accent} strokeWidth={2.1} />
                  </View>
                );
              })()}
              <View className="flex-1">
                <Text className="text-sm font-bold text-label-primary">{step.title}</Text>
                <Text className="text-xs leading-4 text-label-secondary">{done ? "Captura lista" : step.description}</Text>
              </View>
              {done ? (
                <View style={{ backgroundColor: vibrants.success.accent }} className="h-6 w-6 items-center justify-center rounded-full">
                  <Check size={13} color="#fff" strokeWidth={3} />
                </View>
              ) : (
                <View className="h-10 w-10 items-center justify-center rounded-xl border border-separator bg-white/55">
                  <Camera size={18} color="#2F42CB" />
                </View>
              )}
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
