import { ShieldCheck } from "@/components/paco/glyphs";
import { Text, View } from "react-native";
import { Badge, Button, Card, Checkbox, Screen, Section } from "@/components/paco/layout";
import { SignatureBox } from "@/components/paco/ui";
import { MorphButton } from "@/components/paco/motion";
import { employee, legalDocument } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";
import { textClass } from "@/theme/typography";

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
              <Text className={textClass.label}>{section.heading}</Text>
              <Text className={textClass.legal}>{section.body}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Firma de conformidad" description="Tu aceptación queda registrada con nombre, carácter, fecha y hora.">
        <Card className="gap-4">
          <View className="gap-1">
            <Text className={textClass.caption}>Firmante</Text>
            <Text className={textClass.bodySm}>{employee.name}</Text>
            <Text className={textClass.caption}>Carácter</Text>
            <Text className={textClass.bodySm}>{legalDocument.signerRole}</Text>
            {legalAccepted && legalAcceptedAt ? (
              <>
                <Text className={textClass.caption}>Fecha y hora de aceptación</Text>
                <Text className={textClass.bodySm}>{legalAcceptedAt}</Text>
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
            <MorphButton
              label="Aceptar y firmar digitalmente"
              loadingLabel="Firmando…"
              successLabel="Aceptado"
              icon={ShieldCheck}
              onPress={async () => {
                await new Promise((resolve) => setTimeout(resolve, 800));
                acceptLegal();
              }}
            />
          ) : (
            <View style={{ borderColor: vibrants.success.border, backgroundColor: vibrants.success.wash }} className="flex-row items-center gap-2 rounded-2xl border p-3">
              <View style={{ backgroundColor: vibrants.success.accent }} className="h-2 w-2 rounded-full" />
              <Text className="flex-1 text-sm font-semibold text-label-primary">
                Documento firmado digitalmente · el registro se envió al panel de tu empresa.
              </Text>
            </View>
          )}
        </Card>
      </Section>
    </Screen>
  );
}
