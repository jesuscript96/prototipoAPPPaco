import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft, Copy, Smartphone } from "@/components/paco/glyphs";
import { assetForTopupOperator, topupAssets } from "@/components/paco/assets";
import { operatorIcons } from "@/components/paco/icons";
import { Image, Pressable, Text, View } from "react-native";
import { Button, Card, Divider, Field, InlineAlert, Screen } from "@/components/paco/layout";
import { GlassChoiceGrid, GlassSurface } from "@/components/paco/glass";
import { WizardStep } from "@/components/paco/wizard-step";
import { PressableScale } from "@/components/paco/motion";
import { MoneyRow, Segmented, StepHeader, SuccessCard, cn, mxn } from "@/components/paco/ui";
import { LiquidButton, MorphButton, ShakeView, type MorphStatus } from "@/components/paco/motion";
import { mockValidateCode, simulate } from "@/lib/paco-api";
import { scheduleWizardAdvance } from "@/lib/wizard-flow";
import { TopupOperator, topupOperators } from "@/mock/paco";
import { colors } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

type Step = "operator" | "amount" | "phone" | "gateway" | "success";

export default function TopupsScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [step, setStep] = useState<Step>("operator");
  const [operator, setOperator] = useState<TopupOperator | null>(null);
  const [kind, setKind] = useState<string>("Tiempo aire");
  const [amount, setAmount] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneConfirm, setPhoneConfirm] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [payStatus, setPayStatus] = useState<MorphStatus>("idle");
  const [codeCopied, setCodeCopied] = useState(false);

  const digits = phone.replace(/\D/g, "");

  const clearAdvance = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  };

  const selectOperator = (op: TopupOperator) => {
    clearAdvance();
    setOperator(op);
    setKind(op.types[0] ?? "Tiempo aire");
    setAmount(null);
    advanceTimer.current = scheduleWizardAdvance(() => setStep("amount"));
  };

  const pickAmount = (value: number) => {
    clearAdvance();
    setAmount(value);
    advanceTimer.current = scheduleWizardAdvance(() => setStep("phone"));
  };

  const continueToGateway = () => {
    if (digits.length !== 10) {
      setPhoneError("El número debe tener 10 dígitos.");
      return;
    }
    if (phone.replace(/\D/g, "") !== phoneConfirm.replace(/\D/g, "")) {
      setPhoneError("Los números no coinciden. Verifica antes de continuar.");
      return;
    }
    setPhoneError(null);
    setStep("gateway");
  };

  const pay = async () => {
    const valid = await mockValidateCode(code);
    if (!valid.ok) {
      setCodeError(valid.error);
      return;
    }
    setCodeError(null);
    setPayStatus("loading");
    await simulate(null, 1200);
    if (operator && amount) store.confirmTopup(operator.name, kind, amount, phone);
    setPayStatus("success");
    setTimeout(() => setStep("success"), 750);
  };

  const goBack = () => {
    clearAdvance();
    if (step === "amount") setStep("operator");
    else if (step === "phone") setStep("amount");
    else if (step === "gateway") setStep("phone");
  };

  return (
    <Screen>
      {step !== "operator" && step !== "success" ? (
        <Pressable accessibilityRole="button" onPress={goBack} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      {step === "operator" ? (
        <WizardStep stepKey="operator">
          <StepHeader step={1} total={4} title="¿Con qué operador recargas?" subtitle="Convenios activos con 13 operadores nacionales." />
          <GlassChoiceGrid columns={3}>
            {topupOperators.map((op) => {
              const OperatorIcon = operatorIcons[op.id] ?? Smartphone;
              const operatorAsset = assetForTopupOperator(op.id);
              return (
                <PressableScale key={op.id} onPress={() => selectOperator(op)} className="w-full">
                  <GlassSurface variant="light" radius={12} className="w-full items-center gap-2 px-2 py-4 shadow-card">
                    <View className="h-12 w-12 items-center justify-center rounded-[10px] border border-separator bg-white/55">
                      {operatorAsset ? (
                        <Image source={operatorAsset} resizeMode="contain" style={{ width: 36, height: 36 }} />
                      ) : (
                        <OperatorIcon size={22} color="#2F42CB" strokeWidth={2.1} />
                      )}
                    </View>
                    <Text className="text-center text-[12px] font-bold leading-4 text-ink-body" numberOfLines={2}>
                      {op.name}
                    </Text>
                  </GlassSurface>
                </PressableScale>
              );
            })}
          </GlassChoiceGrid>
        </WizardStep>
      ) : null}

      {step === "amount" && operator ? (
        <WizardStep stepKey={`amount-${operator.id}`}>
          <StepHeader step={2} total={4} title={`Recarga ${operator.name}`} subtitle="Elige el tipo y el monto; avanzamos al confirmar." />
          <Card className="gap-4">
            {operator.types.length > 1 ? (
              <Segmented options={operator.types} value={kind} onChange={setKind} />
            ) : (
              <InlineAlert title={operator.types[0] ?? ""} description="Único tipo de recarga disponible con este operador." tone="info" />
            )}
            <View className="flex-row gap-2">
              {operator.types.map((type) => (
                <View key={type} className="flex-1 items-center gap-1 rounded-xl bg-white/70 p-3">
                  <Image source={type === "Datos" ? topupAssets.datos : topupAssets.aire} resizeMode="contain" style={{ width: 34, height: 34 }} />
                  <Text className="text-xs font-bold text-ink-muted">{type}</Text>
                </View>
              ))}
            </View>
            <GlassChoiceGrid columns={3} gap={8}>
              {operator.amounts.map((value) => {
                const selected = amount === value;
                return (
                  <PressableScale key={value} onPress={() => pickAmount(value)} className="w-full">
                    <View
                      className={cn("items-center rounded-2xl border py-3.5", selected ? "border-navy" : "border-white/80 bg-white/70")}
                      style={selected ? { backgroundColor: colors.navy } : undefined}
                    >
                      <Text className={cn("text-base font-bold", selected ? "text-white" : "text-ink-body")}>${value}</Text>
                    </View>
                  </PressableScale>
                );
              })}
            </GlassChoiceGrid>
            <Divider />
            <MoneyRow label="Saldo disponible (adelanto de nómina)" value={mxn(2500)} />
          </Card>
        </WizardStep>
      ) : null}

      {step === "phone" && operator ? (
        <WizardStep stepKey="phone">
          <StepHeader step={3} total={4} title="¿A qué número?" subtitle="Captura y confirma el celular que recibirá la recarga." />
          <ShakeView trigger={phoneError}>
            <Card className="gap-3">
              <Field
                label="Número celular"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="55 6677 8899"
                helper={`${digits.length}/10 dígitos`}
              />
              <Field
                label="Confirma el número"
                value={phoneConfirm}
                onChangeText={setPhoneConfirm}
                keyboardType="phone-pad"
                placeholder="Repite el número"
                error={phoneError ?? undefined}
              />
            </Card>
          </ShakeView>
          <Button onPress={continueToGateway}>Continuar</Button>
        </WizardStep>
      ) : null}

      {step === "gateway" && operator && amount ? (
        <WizardStep stepKey="gateway">
          <StepHeader step={4} total={4} title="Pasarela de pagos" subtitle="Confirma el resumen y firma con tu código de seguridad." />
          <Card className="gap-3">
            <MoneyRow label="Operador" value={operator.name} />
            <MoneyRow label="Tipo" value={kind} />
            <MoneyRow label="Número" value={phone} />
            <Divider />
            <MoneyRow label="Total a pagar" value={mxn(amount)} strong />
            <MoneyRow label="Cargo a" value="Saldo de adelanto de nómina" />
          </Card>
          <ShakeView trigger={codeError}>
            <Card className="gap-3">
              <Field
                label="Código de seguridad"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                secureTextEntry
                placeholder="••••"
                error={codeError ?? undefined}
                helper={codeError ? undefined : "Te lo enviamos por SMS (demo: escribe 4+ dígitos)."}
              />
              <MorphButton
                label="Confirmar pago"
                loadingLabel="Procesando con la pasarela…"
                successLabel="Pago aprobado"
                icon={Smartphone}
                status={payStatus}
                onPress={pay}
              />
            </Card>
          </ShakeView>
        </WizardStep>
      ) : null}

      {step === "success" && operator && amount ? (
        <WizardStep stepKey="success">
          <SuccessCard
            title="¡Recarga exitosa!"
            description={`Tu recarga de ${kind.toLowerCase()} ${operator.name} por ${mxn(amount)} al ${phone} fue procesada. El movimiento ya aparece en tu reporte de gastos.`}
          >
            <View className="w-full items-center gap-1 rounded-xl border border-dashed border-slate-900/15 bg-white/60 px-4 py-3">
              <Text className="text-[10px] font-bold uppercase tracking-[2px] text-ink-muted">Código de confirmación</Text>
              <Text className="text-xl font-bold tracking-[3px] text-ink-body">TPU-{phone.replace(/\D/g, "").slice(-4)}-26</Text>
            </View>
            <View className="w-full">
              <LiquidButton
                idleLabel="Copiar código"
                doneLabel="Código copiado"
                idleIcon={Copy}
                done={codeCopied}
                tone="brand"
                onPress={() => {
                  if (codeCopied) return;
                  setCodeCopied(true);
                  store.showToast("Código copiado al portapapeles (simulado).");
                }}
              />
            </View>
            <View className="w-full gap-2 pt-2">
              <Button onPress={() => router.replace("/(paco)/expenses")}>Ver movimiento</Button>
              <Button
                variant="ghost"
                onPress={() => {
                  setStep("operator");
                  setOperator(null);
                  setAmount(null);
                  setPhone("");
                  setPhoneConfirm("");
                  setCode("");
                  setCodeCopied(false);
                  setPayStatus("idle");
                }}
              >
                Hacer otra recarga
              </Button>
            </View>
          </SuccessCard>
        </WizardStep>
      ) : null}
    </Screen>
  );
}
