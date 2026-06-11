import { useState } from "react";
import { Award, FileCheck2, FileDown, FileText } from "lucide-react-native";
import { Modal, Text, View } from "react-native";
import { Badge, Button, Card, InlineAlert, Screen } from "@/components/paco/layout";
import { SignatureBox, cn } from "@/components/paco/ui";
import { runPhases } from "@/lib/paco-api";
import { company, employee, seedReceipts } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const signaturePhases = ["Conectando con FirmaMX…", "Generando cadena de firma…", "Sellando documento…", "Firma registrada"] as const;

export default function ReceiptsScreen() {
  const { signedReceiptIds, signReceipt, signAllReceipts, certificateDownloaded, downloadCertificate, downloadedFiles, downloadFile } =
    usePacoStore();
  const [signing, setSigning] = useState<string | null>(null);
  const [phase, setPhase] = useState<string | null>(null);
  const [viewing, setViewing] = useState<string | null>(null);

  const pendingIds = seedReceipts.filter((r) => !signedReceiptIds.includes(r.id)).map((r) => r.id);
  const viewingReceipt = seedReceipts.find((r) => r.id === viewing);

  const sign = async (id: string | "all") => {
    setSigning(id);
    await runPhases(signaturePhases, (p) => setPhase(p), 650);
    if (id === "all") signAllReceipts(pendingIds);
    else signReceipt(id);
    setSigning(null);
    setPhase(null);
  };

  return (
    <Screen
      title="Recibos de nómina"
      description={`Consulta, descarga y firma tus CFDI de nómina. La firma digital se procesa con ${company.signatureProvider}.`}
    >
      {pendingIds.length > 0 ? (
        <Card className="gap-3 bg-ink">
          <Text className="text-base font-bold text-white">Tienes {pendingIds.length} recibo(s) sin firmar</Text>
          <Text className="text-sm text-white/80">Puedes firmarlos todos de golpe con tu firma digital registrada.</Text>
          <Button variant="secondary" icon={FileCheck2} loading={signing === "all"} onPress={() => sign("all")}>
            Firmar todos
          </Button>
          {signing === "all" && phase ? <Text className="text-center text-xs font-semibold text-white/80">{phase}</Text> : null}
        </Card>
      ) : (
        <InlineAlert title="Todo firmado" description="No tienes recibos pendientes de firma." tone="success" />
      )}

      <View className="gap-2.5">
        {seedReceipts.map((receipt) => {
          const signed = signedReceiptIds.includes(receipt.id);
          const pdfName = `Recibo-${receipt.period.replace(/ /g, "-")}.pdf`;
          const xmlName = `CFDI-${receipt.period.replace(/ /g, "-")}.xml`;
          return (
            <Card key={receipt.id} className={cn("gap-3", !signed && "border-amber-200")}>
              <View className="flex-row items-center justify-between gap-2">
                <View className="flex-1">
                  <Text className="text-base font-bold text-slate-950">{receipt.period}</Text>
                  <Text className="text-xs text-slate-500">Pagado el {receipt.paidOn}</Text>
                </View>
                <Text className="text-lg font-bold text-slate-950">{receipt.net}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Badge tone={signed ? "success" : "warning"}>{signed ? "Firmado" : "Pendiente de firma"}</Badge>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Button icon={FileText} variant="outline" onPress={() => setViewing(receipt.id)}>
                    Ver PDF
                  </Button>
                </View>
                <View className="flex-1">
                  <Button
                    icon={FileDown}
                    variant="outline"
                    onPress={() => downloadFile(downloadedFiles.includes(pdfName) ? xmlName : pdfName)}
                  >
                    {downloadedFiles.includes(pdfName) ? "Descargar XML" : "Descargar PDF"}
                  </Button>
                </View>
              </View>
              {!signed ? (
                <>
                  <Button icon={FileCheck2} loading={signing === receipt.id} onPress={() => sign(receipt.id)}>
                    Firmar recibo
                  </Button>
                  {signing === receipt.id && phase ? <Text className="text-center text-xs font-semibold text-slate-500">{phase}</Text> : null}
                </>
              ) : null}
            </Card>
          );
        })}
      </View>

      <Card className="gap-3">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
            <Award size={22} color="#d97706" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-slate-950">Certificado de firma digital</Text>
            <Text className="text-xs text-slate-500">Constancia emitida por {company.signatureProvider} para tus declaraciones.</Text>
          </View>
        </View>
        <Button variant={certificateDownloaded ? "secondary" : "outline"} icon={FileDown} onPress={downloadCertificate}>
          {certificateDownloaded ? "Certificado descargado" : "Descargar certificado"}
        </Button>
      </Card>

      <Modal transparent visible={viewing !== null} animationType="slide" onRequestClose={() => setViewing(null)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="max-h-[80%] rounded-t-[20px] bg-white p-5">
            <View className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
            <Text className="text-center text-xs font-bold uppercase tracking-[2px] text-slate-400">Visor PDF</Text>
            <Text className="mt-1 text-center text-lg font-bold text-slate-950">Recibo de nómina · {viewingReceipt?.period}</Text>
            <View className="mt-4 gap-2 rounded-2xl border border-slate-200 p-4">
              {[
                ["Trabajador", employee.name],
                ["RFC", employee.rfc],
                ["NSS", employee.nss],
                ["Periodo", viewingReceipt?.period ?? ""],
                ["Percepciones", "$11,930.00"],
                ["Deducciones", "$2,680.00"],
                ["Neto pagado", viewingReceipt?.net ?? ""],
              ].map(([label, value]) => (
                <View key={label} className="flex-row justify-between">
                  <Text className="text-xs font-bold text-slate-500">{label}</Text>
                  <Text className="text-xs text-slate-800">{value}</Text>
                </View>
              ))}
              <SignatureBox
                signed={signedReceiptIds.includes(viewing ?? "")}
                signerName={employee.name}
                onSign={() => {
                  if (viewing) sign(viewing);
                  setViewing(null);
                }}
              />
            </View>
            <View className="pt-4">
              <Button onPress={() => setViewing(null)}>Cerrar visor</Button>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
