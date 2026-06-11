import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Screen } from "@/components/paco/layout";
import { wellnessIcons } from "@/components/paco/icons";
import { HeartPulse } from "lucide-react-native";
import { wellnessCategories } from "@/mock/paco";

export default function WellnessScreen() {
  const router = useRouter();

  return (
    <Screen
      title="Bienestar en línea"
      description="Biblioteca de contenidos de salud y desarrollo cargada por tu empresa: videos, presentaciones, PDFs y más."
    >
      <View className="flex-row flex-wrap justify-between">
        {wellnessCategories.map((category) => (
          <Pressable
            key={category.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: "/(paco)/wellness/[id]", params: { id: category.id } })}
            className="mb-3 w-[48.5%] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-6 active:bg-brand-50"
          >
            {(() => {
              const WellnessIcon = wellnessIcons[category.id] ?? HeartPulse;
              return (
                <View className="h-14 w-14 items-center justify-center rounded-[14px] bg-violet-50">
                  <WellnessIcon size={26} color="#7c3aed" strokeWidth={2} />
                </View>
              );
            })()}
            <Text className="text-center text-sm font-bold text-slate-900">{category.name}</Text>
            <Text className="text-xs font-semibold text-slate-500">
              {category.resources.length === 0 ? "Sin contenido" : `${category.resources.length} recurso${category.resources.length > 1 ? "s" : ""}`}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
