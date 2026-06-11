import { useState } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft, Smartphone } from "@/components/paco/glyphs";
import { assetForTopupOperator, topupAssets } from "@/components/paco/assets";
import { operatorIcons } from "@/components/paco/icons";
import { Image, Pressable, Text, View } from "react-native";
import { Button, Card, Divider, Field, InlineAlert, Screen } from "@/components/paco/layout";
import { MoneyRow, Segmented, StepHeader, SuccessCard, cn, mxn } from "@/components/paco/ui";
import { ShakeView } from "@/components/paco/motion";
import { mockValidateCode, simulate } from "@/lib/paco-api";
import { TopupOperator, topupOperators } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

type Step = "operator" | "amount" | "phone" | "gateway" | "success";

export default function TopupsScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [step, setStep] = useState<Step>("operator");
  const [operator, setOperator] = useState<TopupOperator | null>(null);
  const [kind, setKind] = useState<string>("Tiempo aire");
  const [amount, setAmount] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneConfirm, setPhoneConfirm] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const digits = phone.replace(/\D/g, "");

  const selectOperator = (op: TopupOperator) => {
    setOperator(op);
    setKind(op.types[0] ?? "Tiempo aire");
    setAmount(null);
    setStep("amount");
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
    setPaying(true);
    await simulate(null, 1200);
    if (operator && amount) store.confirmTopup(operator.name, kind, amount, phone);
    setPaying(false);
    setStep("success");
  };

  const goBack = () => {
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
        <>
          <StepHeader step={1} total={4} title="¿Con qué operador recargas?" subtitle="Convenios activos con 13 operadores nacionales." />
          <View className="flex-row flex-wrap justify-between">
            {topupOperators.map((op) => {
              const OperatorIcon = operatorIcons[op.id] ?? Smartphone;
              const operatorAsset = assetForTopupOperator(op.id);
              return (
                <Pressable
                  key={op.id}
                  accessibilityRole="button"
                  onPress={() => selectOperator(op)}
                  className="mb-3 w-[31.5%] items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-2 py-4 shadow-card active:bg-white"
                >
                  <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-brand-50">
                    {operatorAsset ? <Image source={operatorAsset} resizeMode="contain" style={{ width: 28, height: 28 }} /> : <OperatorIcon size={18} color="#2F42CB" strokeWidth={2.1} />}
                  </View>
                  <Text className="text-center text-xs font-bold text-slate-800" numberOfLines={1}>
                    {op.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}

      {step === "amount" && operator ? (
        <>
          <StepHeader step={2} total={4} title={`Recarga ${operator.name}`} subtitle="Elige el tipo de recarga y el monto." />
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
                  <Text className="text-xs font-bold text-slate-600">{type}</Text>
                </View>
              ))}
            </View>
            <View className="flex-row flex-wrap justify-between">
              {operator.amounts.map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  onPress={() => setAmount(value)}
                  className={cn(
                    "mb-2.5 w-[31.5%] items-center rounded-2xl border py-3.5",
                    amount === value ? "border-ink bg-ink" : "border-white/80 bg-white/70",
                  )}
                >
                  <Text className={cn("text-base font-bold", amount === value ? "text-white" : "text-slate-800")}>${value}</Text>
                </Pressable>
              ))}
            </View>
            <Divider />
            <MoneyRow label="Saldo disponible (adelanto de nómina)" value={mxn(2500)} />
          </Card>
          <Button disabled={amount === null} onPress={() => setStep("phone")}>
            Continuar {amount ? `con ${mxn(amount)}` : ""}
          </Button>
        </>
      ) : null}

      {step === "phone" && operator ? (
        <>
          <StepHeader step={3 } total={4} title="¿A qué número?" subtitle="Captura y confirma el celular que recibirá la recarga." />
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
        </>
      ) : null}

      {step === "gateway" && operator && amount ? (
        <>
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
            <Button icon={Smartphone} loading={paying} onPress={pay}>
              Confirmar pago
            </Button>
          </Card>
          </ShakeView>
        </>
      ) : null}

      {step === "success" && operator && amount ? (
        <SuccessCard
          title="¡Recarga exitosa!"
          description={`Tu recarga de ${kind.toLowerCase()} ${operator.name} por ${mxn(amount)} al ${phone} fue procesada. El movimiento ya aparece en tu reporte de gastos.`}
        >
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
              }}
            >
              Hacer otra recarga
            </Button>
          </View>
        </SuccessCard>
      ) : null}
    </Screen>
  );
}
