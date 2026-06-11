import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowDownAZ, FileQuestion, FolderOpen, Search } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { FileTile } from "@/components/paco/ui";
import { wellnessCategories } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function WellnessCategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const category = wellnessCategories.find((c) => c.id === id);
  const { downloadedFiles, downloadFile } = usePacoStore();
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const resources = useMemo(() => {
    if (!category) return [];
    let list = [...category.resources];
    if (query.trim()) list = list.filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase()));
    list.sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return list;
  }, [category, query, sortAsc]);

  if (!category) {
    return (
      <Screen title="Categoría no encontrada">
        <EmptyState title="Sin categoría" description="La carpeta de bienestar no existe." icon={FileQuestion} />
        <Button onPress={() => router.back()}>Volver</Button>
      </Screen>
    );
  }

  return (
    <Screen eyebrow="Bienestar en línea" title={category.name}>
      {category.resources.length === 0 ? (
        <EmptyState
          title="Por el momento no hay ningún documento disponible"
          description="Tu empresa aún no carga contenidos en esta carpeta. Vuelve a revisar más adelante."
          icon={FolderOpen}
        />
      ) : (
        <>
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
              <Search size={18} color="#94a3b8" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar recurso…"
                placeholderTextColor="#94a3b8"
                className="min-h-12 flex-1 text-base text-slate-950"
              />
            </View>
            <Pressable
              accessibilityLabel="Ordenar"
              onPress={() => setSortAsc((v) => !v)}
              className="h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white"
            >
              <ArrowDownAZ size={18} color="#3148c8" />
            </Pressable>
          </View>

          {resources.length === 0 ? (
            <EmptyState title="Sin coincidencias" description={`Ningún recurso coincide con “${query}”.`} icon={Search} />
          ) : (
            <View className="gap-2">
              {resources.map((resource) => (
                <FileTile
                  key={resource.id}
                  name={resource.name}
                  kind={resource.kind}
                  size={resource.size}
                  downloaded={downloadedFiles.includes(resource.name)}
                  onDownload={() => downloadFile(resource.name)}
                  actionLabel={resource.kind === "Video" ? "Reproducir" : "Abrir"}
                />
              ))}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}
