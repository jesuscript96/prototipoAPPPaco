import { ShieldCheck } from "@/components/paco/glyphs";
import { Text, View } from "react-native";
import { Badge, Button, Card, Checkbox, Screen, Section } from "@/components/paco/layout";
import { SignatureBox } from "@/components/paco/ui";
import { employee, legalDocument } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function LegalScreen() {
  const { legalAccepted, legalAcceptedAt, acceptLegal } = usePacoStore();

  return (
    <Screen
      title="Términos y privacidad"
      description={`${legalDocument.title} · versión ${legalDocument.version}, publicada el ${legalDocument.publishedAt}.`}
    >
      <View className="flex-row flex-wrap items-center gap-2">
        <Badge tone={legalAccepted ? "success" : "warning"}>{legalAccepted ? "Firmado" : "Pendiente de firma"}</Badge>
        <Badge tone="neutral">Emisor: TBM</Badge>
      </View>

      <Section title="Documento legal">
        <Card className="gap-4">
          {legalDocument.sections.map((section) => (
            <View key={section.heading} className="gap-1">
              <Text className="text-sm font-bold text-slate-900">{section.heading}</Text>
              <Text className="text-sm leading-6 text-slate-600">{section.body}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Firma de conformidad" description="Tu aceptación queda registrada con nombre, carácter, fecha y hora.">
        <Card className="gap-4">
          <View className="gap-1">
            <Text className="text-xs font-bold text-slate-500">Firmante</Text>
            <Text className="text-sm text-slate-800">{employee.name}</Text>
            <Text className="text-xs font-bold text-slate-500">Carácter</Text>
            <Text className="text-sm text-slate-800">{legalDocument.signerRole}</Text>
            {legalAccepted && legalAcceptedAt ? (
              <>
                <Text className="text-xs font-bold text-slate-500">Fecha y hora de aceptación</Text>
                <Text className="text-sm text-slate-800">{legalAcceptedAt}</Text>
              </>
            ) : null}
          </View>

          <Checkbox
            label="He leído íntegramente y acepto los términos y condiciones de uso y el aviso de privacidad."
            checked={legalAccepted}
            onPress={() => !legalAccepted && acceptLegal()}
          />

          <SignatureBox signed={legalAccepted} signerName={employee.name} onSign={() => !legalAccepted && acceptLegal()} />

          {!legalAccepted ? (
            <Button icon={ShieldCheck} onPress={acceptLegal}>
              Aceptar y firmar digitalmente
            </Button>
          ) : (
            <View className="rounded-2xl bg-green-50 p-3">
              <Text className="text-sm font-semibold text-green-800">
                Documento firmado digitalmente · el registro se envió al panel de tu empresa.
              </Text>
            </View>
          )}
        </Card>
      </Section>
    </Screen>
  );
}
