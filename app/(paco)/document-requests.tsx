import { useState } from "react";
import { FileSignature, Save } from "@/components/paco/glyphs";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Badge, Button, Card, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { ConfirmSheet, SignatureBox, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { DocumentTemplate, documentFolders, documentTemplates, employee } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

type Phase = "idle" | "confirm" | "generating" | "preview" | "saving";

export default function DocumentRequestsScreen() {
  const { docStatus, generateDocument, signDocument, showToast } = usePacoStore();
  const [selected, setSelected] = useState<DocumentTemplate | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [signed, setSigned] = useState(false);

  const open = (doc: DocumentTemplate) => {
    setSelected(doc);
    setSigned(false);
    setPhase("confirm");
  };

  const generate = async () => {
    if (!selected) return;
    setPhase("generating");
    await simulate(null, 1400);
    generateDocument(selected.id);
    setPhase("preview");
  };

  const save = async () => {
    if (!selected) return;
    setPhase("saving");
    await simulate(null, 1200);
    signDocument(selected.id);
    setPhase("idle");
    setSelected(null);
  };

  if (selected && (phase === "preview" || phase === "saving")) {
    return (
      <Screen eyebrow={selected.folder} title={selected.name} description="Documento generado y autocompletado con tus datos del expediente.">
        <Card className="gap-3 border-slate-300">
          <View className="items-center gap-1 border-b border-slate-200 pb-3">
            <Image source={illustrationAssets.documents} resizeMode="contain" style={{ width: 80, height: 58 }} />
            <Text className="text-xs font-bold uppercase tracking-[2px] text-slate-400">Vista previa · PDF</Text>
            <Text className="text-center text-base font-bold text-slate-950">
              {selected.id === "dt1" ? "Carátula de Operación · Instituto Mexicano del Seguro Social" : selected.name}
            </Text>
          </View>
          {[
            ["Nombre del colaborador", employee.name],
            ["Número de colaborador", employee.employeeNumber],
            ["RFC", employee.rfc],
            ["CURP", employee.curp],
            ["NSS", employee.nss],
            ["Empleador", employee.employer],
            ["Puesto", employee.role],
            ["Fecha de emisión", "10 de junio de 2026"],
          ].map(([label, value]) => (
            <View key={label} className="flex-row justify-between gap-3">
              <Text className="text-xs font-bold text-slate-500">{label}</Text>
              <Text className="flex-1 text-right text-xs text-slate-800">{value}</Text>
            </View>
          ))}

          {selected.requiresSignature ? (
            <View className="gap-2 pt-2">
              <Text className="text-sm font-bold text-slate-700">Firma del colaborador</Text>
              <SignatureBox
                signed={signed}
                signerName={employee.name}
                onSign={() => {
                  setSigned(true);
                  showToast("Firma añadida al documento.");
                }}
              />
            </View>
          ) : null}
        </Card>

        <InlineAlert
          title="Carga automatizada"
          description="Al guardar, el documento se sube automáticamente al panel de tu empresa y queda disponible para Recursos Humanos."
          tone="info"
        />

        <Button icon={Save} loading={phase === "saving"} disabled={selected.requiresSignature && !signed} onPress={save}>
          {selected.requiresSignature && !signed ? "Firma el documento para guardar" : "Guardar y subir al panel"}
        </Button>
        <Button variant="ghost" onPress={() => setPhase("idle")}>
          Cancelar
        </Button>
      </Screen>
    );
  }

  return (
    <Screen
      title="Solicitud de documentos"
      description="Genera constancias y formatos oficiales parametrizados por tu empresa, fírmalos y se suben solos al panel."
    >
      <Card className="items-center gap-2">
        <Image source={illustrationAssets.documents} resizeMode="contain" style={{ width: 142, height: 92 }} />
        <Text className="text-center text-sm font-semibold text-label-secondary">Generación PDF mock con firma visible y guardado en expediente.</Text>
      </Card>
      {phase === "generating" ? (
        <Card className="items-center gap-3 py-8">
          <ActivityIndicator color="#2F42CB" size="large" />
          <Text className="text-sm font-semibold text-slate-600">Generando documento autocompletado…</Text>
        </Card>
      ) : null}

      {documentFolders.map((folder) => {
        const docs = documentTemplates.filter((d) => d.folder === folder);
        return (
          <Section key={folder} title={folder}>
            <View className="gap-2.5">
              {docs.map((doc) => {
                const status = docStatus[doc.id];
                return (
                  <Card key={doc.id} className="gap-2">
                    <View className="flex-row items-start justify-between gap-2">
                      <Text className="flex-1 text-base font-bold text-slate-950">{doc.name}</Text>
                      <Badge tone={status === "Subido" ? "success" : status === "Generado" ? "info" : "neutral"}>
                        {status ?? "Disponible"}
                      </Badge>
                    </View>
                    <Text className="text-sm leading-5 text-slate-600">{doc.description}</Text>
                    <Text className="text-xs font-semibold text-slate-500">
                      {doc.requiresSignature ? "Requiere tu firma digital" : "No requiere firma"}
                    </Text>
                    {status === "Subido" ? (
                      <View style={{ borderColor: vibrants.success.border, backgroundColor: vibrants.success.wash }} className="flex-row items-center gap-2 rounded-2xl border p-3">
                        <View style={{ backgroundColor: vibrants.success.accent }} className="h-2 w-2 rounded-full" />
                        <Text className="flex-1 text-sm font-semibold text-label-primary">Firmado y subido al panel de tu empresa</Text>
                      </View>
                    ) : (
                      <Button icon={FileSignature} variant="outline" onPress={() => open(doc)}>
                        Generar documento
                      </Button>
                    )}
                  </Card>
                );
              })}
            </View>
          </Section>
        );
      })}

      <ConfirmSheet
        visible={phase === "confirm"}
        title="¿Generar documento?"
        message={`¿Estás seguro que deseas generar “${selected?.name ?? ""}”? Se autocompletará con los datos de tu expediente.`}
        confirmLabel="Sí, generar"
        onConfirm={generate}
        onCancel={() => {
          setPhase("idle");
          setSelected(null);
        }}
      />
    </Screen>
  );
}
