import { useState } from "react";
import { useRouter } from "expo-router";
import { Camera, ChevronLeft, Receipt } from "@/components/paco/glyphs";
import { Modal, Pressable, Text, View } from "react-native";
import { Button, Card, Checkbox, Divider, Field, InlineAlert, Screen } from "@/components/paco/layout";
import { MoneyRow, OptionCard, RadioOption, StepHeader, SuccessCard, mxn } from "@/components/paco/ui";
import { KycFlow } from "@/components/paco/kyc";
import { ShakeView } from "@/components/paco/motion";
import { serviceCategoryIcons } from "@/components/paco/icons";
import { mockValidateCode, simulate } from "@/lib/paco-api";
import { ServiceCategory, company, serviceCategories } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

type Provider = ServiceCategory["providers"][number];
type Step = "category" | "provider" | "details" | "method" | "kyc" | "gateway" | "success";

export default function ServicesScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [scanning, setScanning] = useState(false);
  const [method, setMethod] = useState<"Adelanto de Nómina" | "Pago con Tarjeta">("Adelanto de Nómina");
  const [terms, setTerms] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const numericAmount = Number(amount.replace(/[^\d.]/g, "")) || 0;
  const commission = company.serviceCommission;
  const total = numericAmount + commission;
  const remaining = Math.max(0, 2500 - total);

  const scan = async () => {
    setScanning(true);
    await simulate(null, 1600);
    if (provider) setReference(provider.refSample);
    setScanning(false);
    store.showToast("Código de barras leído. Referencia capturada.");
  };

  const continueFromDetails = () => {
    if (numericAmount <= 0) {
      setDetailsError("Captura el monto exacto de tu recibo.");
      return;
    }
    if (reference.trim().length < 6) {
      setDetailsError("La referencia es muy corta. Escanéala o revisa tu recibo.");
      return;
    }
    setDetailsError(null);
    setStep("method");
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
    if (provider) store.confirmServicePayment(provider.name, numericAmount, commission, reference, method);
    setPaying(false);
    setStep("success");
  };

  const goBack = () => {
    if (step === "provider") setStep("category");
    else if (step === "details") setStep("provider");
    else if (step === "method") setStep("details");
    else if (step === "kyc") setStep("method");
    else if (step === "gateway") setStep(store.kycDone ? "method" : "kyc");
  };

  return (
    <Screen>
      {step !== "category" && step !== "success" ? (
        <Pressable accessibilityRole="button" onPress={goBack} className="min-h-11 flex-row items-center gap-1">
          <ChevronLeft size={18} color="#2F42CB" />
          <Text className="text-sm font-bold text-brand-700">Anterior</Text>
        </Pressable>
      ) : null}

      {step === "category" ? (
        <>
          <StepHeader step={1} total={5} title="¿Qué servicio vas a pagar?" subtitle="Paga recibos domésticos y de gobierno con tu nómina o tarjeta." />
          <View className="gap-2.5">
            {serviceCategories.map((cat) => (
              <OptionCard
                key={cat.id}
                title={cat.name}
                subtitle={cat.providers.map((p) => p.name).join(" · ")}
                icon={serviceCategoryIcons[cat.id]}
                onPress={() => {
                  setCategory(cat);
                  setProvider(null);
                  setStep("provider");
                }}
              />
            ))}
          </View>
        </>
      ) : null}

      {step === "provider" && category ? (
        <>
          <StepHeader step={2} total={5} title={category.name} subtitle="Elige el proveedor de tu recibo." />
          <View className="gap-2.5">
            {category.providers.map((p) => (
              <OptionCard
                key={p.id}
                title={p.name}
                subtitle={p.refLabel}
                icon={serviceCategoryIcons[category.id]}
                onPress={() => {
                  setProvider(p);
                  setReference("");
                  setStep("details");
                }}
              />
            ))}
          </View>
        </>
      ) : null}

      {step === "details" && provider ? (
        <>
          <StepHeader step={3} total={5} title={`Pago a ${provider.name}`} subtitle="Captura el monto y la referencia, o escanéala con la cámara." />
          <Card className="gap-3">
            <Field
              label="Monto a pagar"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="$0.00"
            />
            <Field
              label={provider.refLabel}
              value={reference}
              onChangeText={setReference}
              placeholder="¿Cuál es la referencia?"
              error={detailsError ?? undefined}
            />
            <Button icon={Camera} variant="outline" loading={scanning} onPress={scan}>
              Escanear código de barras del recibo
            </Button>
          </Card>
          <Button onPress={continueFromDetails}>Continuar</Button>
        </>
      ) : null}

      {step === "method" && provider ? (
        <>
          <StepHeader step={4} total={5} title="¿Cómo lo quieres pagar?" />
          <Card className="gap-3">
            <RadioOption
              label="Adelanto de Nómina"
              helper={`Se descuenta de tu saldo disponible (${mxn(2500)}).`}
              selected={method === "Adelanto de Nómina"}
              onPress={() => setMethod("Adelanto de Nómina")}
            />
            <RadioOption
              label="Pago con Tarjeta"
              helper="Cargo a tu tarjeta de débito registrada (•••• 2366)."
              selected={method === "Pago con Tarjeta"}
              onPress={() => setMethod("Pago con Tarjeta")}
            />
          </Card>
          <Card className="gap-3">
            <MoneyRow label="Servicio" value={`${provider.name}`} />
            <MoneyRow label="Importe del recibo" value={mxn(numericAmount)} />
            <MoneyRow label="Comisión (configurada por panel)" value={`+ ${mxn(commission)}`} />
            <Divider />
            <MoneyRow label="Total a pagar" value={mxn(total)} strong />
            {method === "Adelanto de Nómina" ? <MoneyRow label="Saldo restante" value={mxn(remaining)} /> : null}
          </Card>
          <Card className="gap-2">
            <Checkbox label="He leído y acepto los términos y condiciones del pago de servicios." checked={terms} onPress={() => setTerms((v) => !v)} />
          </Card>
          <Button disabled={!terms} onPress={() => setStep(store.kycDone ? "gateway" : "kyc")}>
            Continuar
          </Button>
          {store.kycDone ? (
            <InlineAlert title="Identidad ya verificada" description="Tu KYC sigue vigente, pasarás directo a la pasarela de pagos." tone="success" />
          ) : null}
        </>
      ) : null}

      {step === "kyc" ? (
        <>
          <StepHeader step={5} total={5} title="Validación de identidad" subtitle="La pasarela requiere verificar tu INE y rostro la primera vez." />
          <KycFlow
            onDone={() => {
              store.completeKyc();
              store.showToast("Validación exitosa. Continúa con tu pago.");
              setStep("gateway");
            }}
          />
        </>
      ) : null}

      {step === "gateway" && provider ? (
        <>
          <StepHeader step={5} total={5} title="Pasarela de pagos" subtitle="Último paso: firma con tu código de validación." />
          <Card className="gap-3">
            <MoneyRow label="Pago a" value={provider.name} />
            <MoneyRow label="Referencia" value={reference.length > 14 ? `${reference.slice(0, 10)}…${reference.slice(-4)}` : reference} />
            <MoneyRow label="Método" value={method} />
            <Divider />
            <MoneyRow label="Total" value={mxn(total)} strong />
          </Card>
          <ShakeView trigger={codeError}>
          <Card className="gap-3">
            <Field
              label="Código de validación"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              secureTextEntry
              placeholder="••••"
              error={codeError ?? undefined}
              helper={codeError ? undefined : "Enviado por SMS (demo: escribe 4+ dígitos)."}
            />
            <Button icon={Receipt} loading={paying} onPress={pay}>
              Pagar {mxn(total)}
            </Button>
          </Card>
          </ShakeView>
        </>
      ) : null}

      {step === "success" && provider ? (
        <SuccessCard
          title="Pago exitoso"
          description={`Tu pago de ${mxn(total)} a ${provider.name} (${method}) fue procesado. Guarda tu folio PAGO-${reference.slice(-4) || "0000"}-26. El movimiento ya está en tu reporte de gastos.`}
        >
          <View className="w-full gap-2 pt-2">
            <Button onPress={() => router.replace("/(paco)/expenses")}>Ver en gastos</Button>
            <Button
              variant="ghost"
              onPress={() => {
                setStep("category");
                setCategory(null);
                setProvider(null);
                setAmount("");
                setReference("");
                setTerms(false);
                setCode("");
              }}
            >
              Pagar otro servicio
            </Button>
          </View>
        </SuccessCard>
      ) : null}

      <Modal transparent visible={scanning} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/80 px-10">
          <View className="h-56 w-full max-w-sm items-center justify-center rounded-2xl border-2 border-white/40">
            <View className="h-0.5 w-4/5 bg-red-500" />
            <Text className="mt-4 text-sm font-semibold text-white">Apunta al código de barras del recibo…</Text>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
