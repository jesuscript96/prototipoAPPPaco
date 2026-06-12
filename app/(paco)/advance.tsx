import { useState } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft, Wallet } from "@/components/paco/glyphs";
import { Image, Pressable, Text, View } from "react-native";
import { financeAssets } from "@/components/paco/assets";
import { Button, Card, Checkbox, Divider, InlineAlert, Screen } from "@/components/paco/layout";
import { GlassHero } from "@/components/paco/glass";
import { AmountSlider, MoneyRow, RadioOption, StepHeader, SuccessCard, mxn } from "@/components/paco/ui";
import { KycFlow } from "@/components/paco/kyc";
import { MorphButton, type MorphStatus } from "@/components/paco/motion";
import { simulate } from "@/lib/paco-api";
import { company, employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

type Step = "eligibility" | "kyc" | "amount" | "review" | "success";

export default function AdvanceScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [step, setStep] = useState<Step>("eligibility");
  const [demoIneligible, setDemoIneligible] = useState(false);
  const [amount, setAmount] = useState(300);
  const [accountId, setAccountId] = useState(store.accounts[0]?.id ?? "");
  const [terms, setTerms] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<MorphStatus>("idle");

  const commission = Math.round(amount * company.advanceCommissionRate);
  const net = amount - commission;
  const account = store.accounts.find((a) => a.id === accountId) ?? store.accounts[0];
  const eligible = employee.seniorityMonths >= company.minSeniorityMonths && !demoIneligible;
  const isFirstUse = !store.kycDone;

  const confirm = async () => {
    setConfirmStatus("loading");
    await simulate(null, 1100);
    store.confirmAdvance(amount, commission, account?.alias ?? "Cuenta principal");
    setConfirmStatus("success");
    // El check se asienta antes de viajar al comprobante (narrativa 10.6).
    setTimeout(() => setStep("success"), 750);
  };

  const goBack = () => {
    if (step === "kyc") setStep("eligibility");
    else if (step === "amount") setStep(isFirstUse ? "kyc" : "eligibility");
    else if (step === "review") setStep("amount");
  };

  return (
    <Screen>
      {step !== "eligibility" && step !== "success" ? (
        <Pressable accessibilityRole="button" onPress={goBack} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      {step === "eligibility" ? (
        <>
          <GlassHero
            eyebrow="Servicio core de Paco"
            title="Adelanta parte de tu sueldo ya devengado"
            subtitle={`Sin buró, con cobro automático en tu siguiente nómina. Comisión por convenio: ${Math.round(company.advanceCommissionRate * 100)}%.`}
          >
            <Image source={financeAssets.cardSent} resizeMode="contain" style={{ alignSelf: "flex-end", width: 154, height: 66 }} />
          </GlassHero>

          {eligible ? (
            <>
              <InlineAlert
                title="Eres elegible"
                description={`Antigüedad de ${employee.seniority} (mínimo requerido: ${company.minSeniorityMonths} meses). Monto máximo configurado por tu empresa según tu salario: ${mxn(company.advanceMax)}.`}
                tone="success"
              />
              {isFirstUse ? (
                <InlineAlert
                  title="Primer adelanto: verificación de identidad"
                  description="Por seguridad, tu primer adelanto requiere validar tu INE y una selfie con nuestro verificador externo. Solo se hace una vez."
                  tone="warning"
                />
              ) : null}
              <Button icon={Wallet} onPress={() => setStep(isFirstUse ? "kyc" : "amount")}>
                {isFirstUse ? "Comenzar verificación" : "Solicitar adelanto"}
              </Button>
            </>
          ) : (
            <>
              <InlineAlert
                title="Aún no eres elegible"
                description={`Necesitas al menos ${company.minSeniorityMonths} meses de antigüedad para solicitar un adelanto. Si crees que es un error, contacta a soporte.`}
                tone="danger"
              />
              <Button variant="outline" onPress={() => router.push("/(paco)/support")}>
                Contactar soporte
              </Button>
            </>
          )}

          <Pressable accessibilityRole="button" onPress={() => setDemoIneligible((v) => !v)} className="min-h-11 items-center justify-center">
            <Text className="text-xs font-semibold text-slate-400">
              {demoIneligible ? "Demo: volver al caso elegible" : "Demo: ver caso no elegible"}
            </Text>
          </Pressable>
        </>
      ) : null}

      {step === "kyc" ? (
        <>
          <StepHeader step={1} total={3} title="Verificación de identidad" subtitle="Solo tu primer adelanto la requiere." />
          <KycFlow
            onDone={() => {
              store.completeKyc();
              store.showToast("Identidad validada con el verificador externo.");
              setStep("amount");
            }}
          />
        </>
      ) : null}

      {step === "amount" ? (
        <>
          <StepHeader step={isFirstUse ? 2 : 1} total={isFirstUse ? 3 : 2} title="¿Cuánto deseas solicitar?" />
          <Card className="gap-4 py-6">
            <AmountSlider min={company.advanceMin} max={company.advanceMax} step={100} value={amount} onChange={setAmount} />
            <Divider />
            <MoneyRow label="Saldo disponible" value={mxn(company.advanceMax)} />
          </Card>

          <Card className="gap-3">
            <Text className="text-sm font-bold text-slate-700">Cuenta de depósito y cobro</Text>
            {store.accounts.map((acc) => (
              <View key={acc.id} className="gap-2">
                <Image source={acc.kind === "Tarjeta" ? financeAssets.cardVisa : financeAssets.cardAccount} resizeMode="contain" style={{ width: 124, height: 72 }} />
                <RadioOption
                  label={`${acc.alias} · ${acc.masked}`}
                  helper={`${acc.bank} · aquí se deposita el adelanto y se domicilia el cobro`}
                  selected={accountId === acc.id}
                  onPress={() => setAccountId(acc.id)}
                />
              </View>
            ))}
            <Button variant="ghost" onPress={() => router.push("/(paco)/settings/accounts")}>
              Administrar cuentas y tarjetas
            </Button>
          </Card>

          <Button onPress={() => setStep("review")}>Continuar</Button>
        </>
      ) : null}

      {step === "review" ? (
        <>
          <StepHeader step={isFirstUse ? 3 : 2} total={isFirstUse ? 3 : 2} title="Revisa y confirma" />
          <Card className="gap-3">
            <MoneyRow label="Monto solicitado" value={mxn(amount)} />
            <MoneyRow label={`Comisión por convenio (${Math.round(company.advanceCommissionRate * 100)}%)`} value={`- ${mxn(commission)}`} />
            <Divider />
            <MoneyRow label="Neto a recibir" value={mxn(net)} strong />
            <Divider />
            <MoneyRow label="Cuenta destino" value={account?.masked ?? ""} />
            <MoneyRow label="Titular" value={employee.name} />
            <MoneyRow label="Fecha de solicitud" value="10 de junio de 2026" />
            <MoneyRow label="Fecha de cobro en nómina" value="15 de junio de 2026" />
          </Card>

          <Card className="gap-3">
            <Checkbox
              label="He leído y acepto los términos y condiciones, mandato de cobro, domiciliación e información de instituciones crediticias."
              checked={terms}
              onPress={() => setTerms((v) => !v)}
            />
            <Pressable accessibilityRole="button" onPress={() => router.push("/(paco)/legal")} className="min-h-11 justify-center">
              <Text className="text-sm font-bold text-brand-700">Leer documentos legales</Text>
            </Pressable>
          </Card>

          <MorphButton
            label="Confirmar adelanto"
            loadingLabel="Dispersando a tu cuenta…"
            successLabel="Adelanto confirmado"
            disabled={!terms}
            status={confirmStatus}
            onPress={confirm}
          />
        </>
      ) : null}

      {step === "success" ? (
        <SuccessCard
          title={`Adelanto de ${mxn(amount)} confirmado`}
          description={`Recibirás ${mxn(net)} en ${account?.alias ?? "tu cuenta"} en los próximos minutos. El cargo de ${mxn(amount + commission)} se aplicará en tu nómina del 15 de junio. Ya quedó registrado como adeudo en tu reporte de gastos.`}
          image={financeAssets.check}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/expenses")}>Ver en reporte de gastos</Button>
            <Button variant="ghost" onPress={() => router.replace("/(paco)/home")}>
              Volver al inicio
            </Button>
          </View>
        </SuccessCard>
      ) : null}
    </Screen>
  );
}
