import { useState } from "react";
import { FileCheck2, FileDown, Mail } from "@/components/paco/glyphs";
import { Image, Text, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Badge, Button, Card, EmptyState, InlineAlert, Screen } from "@/components/paco/layout";
import { SignatureBox, cn } from "@/components/paco/ui";
import { employee, seedSuaLetters } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function SuaScreen() {
  const { signedSuaIds, signSua, downloadedFiles, downloadFile } = usePacoStore();
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  return (
    <Screen
      title="Cartas SUA"
      description="Cartas del Sistema Único de Autodeterminación asignadas desde el panel: consúltalas, descárgalas y fírmalas."
    >
      {seedSuaLetters.length === 0 ? (
        <EmptyState title="Sin cartas asignadas" description="Cuando tu empresa te asigne una carta SUA aparecerá aquí." icon={Mail} image={illustrationAssets.documents} />
      ) : (
        <View className="gap-3">
          {seedSuaLetters.map((letter) => {
            const signed = signedSuaIds.includes(letter.id);
            const open = openLetter === letter.id;
            const fileName = `${letter.title.replace(/ /g, "-")}.pdf`;
            return (
              <Card key={letter.id} className={cn("gap-3", !signed && "border-amber-200")}>
                <Image source={illustrationAssets.documents} resizeMode="contain" style={{ alignSelf: "flex-end", width: 70, height: 50 }} />
                <View className="flex-row items-center justify-between gap-2">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-slate-950">{letter.title}</Text>
                    <Text className="text-xs text-slate-500">Asignada el {letter.assignedOn}</Text>
                  </View>
                  <Badge tone={signed ? "success" : "warning"}>{signed ? "Firmada" : "Pendiente de firma"}</Badge>
                </View>

                {open ? (
                  <View className="gap-2 rounded-2xl border border-slate-200 p-4">
                    <Text className="text-center text-xs font-bold uppercase tracking-[2px] text-slate-400">Visor de carta</Text>
                    <Text className="text-sm leading-6 text-slate-700">
                      Por medio de la presente se hace constar la determinación de cuotas obrero-patronales correspondientes al
                      periodo, calculadas mediante el Sistema Único de Autodeterminación (SUA) para el trabajador{" "}
                      <Text className="font-bold">{employee.name}</Text>, NSS {employee.nss}, registrado ante el IMSS por{" "}
                      {employee.employer}.
                    </Text>
                    <SignatureBox signed={signed} signerName={employee.name} onSign={() => !signed && signSua(letter.id)} />
                  </View>
                ) : null}

                <View className="flex-row gap-2">
                  <View className="flex-1">
                    <Button variant="outline" onPress={() => setOpenLetter(open ? null : letter.id)}>
                      {open ? "Cerrar carta" : "Abrir carta"}
                    </Button>
                  </View>
                  <View className="flex-1">
                    <Button
                      icon={FileDown}
                      variant="outline"
                      onPress={() => downloadFile(fileName)}
                    >
                      {downloadedFiles.includes(fileName) ? "Descargada" : "Descargar"}
                    </Button>
                  </View>
                </View>

                {!signed && !open ? (
                  <Button icon={FileCheck2} onPress={() => setOpenLetter(letter.id)}>
                    Revisar y firmar
                  </Button>
                ) : null}
              </Card>
            );
          })}
        </View>
      )}

      <InlineAlert
        title="¿Para qué sirven?"
        description="Las cartas SUA respaldan tus aportaciones al IMSS, Infonavit y retiro. Tu firma confirma que las consultaste."
        tone="info"
      />
    </Screen>
  );
}
