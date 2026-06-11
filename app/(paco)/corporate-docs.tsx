import { useMemo, useState } from "react";
import { Search } from "@/components/paco/glyphs";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { illustrationAssets } from "@/components/paco/assets";
import { Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { FileTile, cn } from "@/components/paco/ui";
import { corporateFolders } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function CorporateDocsScreen() {
  const { downloadedFiles, downloadFile } = usePacoStore();
  const [openFolder, setOpenFolder] = useState<string | null>(corporateFolders[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const searching = query.trim().length > 0;
  const searchResults = useMemo(() => {
    if (!searching) return [];
    const q = query.trim().toLowerCase();
    return corporateFolders.flatMap((folder) =>
      folder.documents.filter((d) => d.name.toLowerCase().includes(q)).map((d) => ({ ...d, folderName: folder.name })),
    );
  }, [query, searching]);

  return (
    <Screen
      title="Documentos corporativos"
      description="Políticas, reglamentos y manuales asignados por tu empresa, organizados por carpetas."
    >
      <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
        <Search size={18} color="#94a3b8" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar documento…"
          placeholderTextColor="#94a3b8"
          className="min-h-12 flex-1 text-base text-slate-950"
        />
      </View>

      {searching ? (
        searchResults.length === 0 ? (
          <EmptyState title="Sin resultados" description={`Ningún documento coincide con “${query}”.`} icon={Search} image={illustrationAssets.documents} />
        ) : (
          <Section title={`Resultados (${searchResults.length})`}>
            <View className="gap-2">
              {searchResults.map((doc) => (
                <View key={doc.id} className="gap-1">
                  <Text className="text-xs font-bold text-slate-400">{doc.folderName}</Text>
                  <FileTile
                    name={doc.name}
                    kind={doc.kind}
                    size={doc.size}
                    downloaded={downloadedFiles.includes(doc.name)}
                    onDownload={() => downloadFile(doc.name)}
                  />
                </View>
              ))}
            </View>
          </Section>
        )
      ) : (
        <View className="gap-3">
          {corporateFolders.map((folder) => {
            const open = openFolder === folder.id;
            return (
              <Card key={folder.id} className="gap-3">
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setOpenFolder(open ? null : folder.id)}
                  className="min-h-11 flex-row items-center gap-3"
                >
                  <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-amber-50">
                    <Image source={illustrationAssets.documents} resizeMode="contain" style={{ width: 28, height: 28 }} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-slate-950">{folder.name}</Text>
                    <Text className="text-xs text-slate-500">
                      {folder.documents.length === 0 ? "Carpeta vacía" : `${folder.documents.length} documento${folder.documents.length > 1 ? "s" : ""}`}
                    </Text>
                  </View>
                  <Text className={cn("text-xs font-bold", open ? "text-brand-700" : "text-slate-400")}>{open ? "Cerrar" : "Abrir"}</Text>
                </Pressable>

                {open ? (
                  folder.documents.length === 0 ? (
                    <View className="items-center gap-2 rounded-2xl bg-slate-50 py-6">
                      <Image source={illustrationAssets.empty} resizeMode="contain" style={{ width: 42, height: 42 }} />
                      <Text className="text-sm font-semibold text-slate-500">Por el momento no hay ningún documento disponible</Text>
                    </View>
                  ) : (
                    <View className="gap-2">
                      {folder.documents.map((doc) => (
                        <FileTile
                          key={doc.id}
                          name={doc.name}
                          kind={doc.kind}
                          size={doc.size}
                          downloaded={downloadedFiles.includes(doc.name)}
                          onDownload={() => downloadFile(doc.name)}
                        />
                      ))}
                    </View>
                  )
                ) : null}
              </Card>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
