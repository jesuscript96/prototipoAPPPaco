import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "@/components/paco/layout";
import { GlassSurface } from "@/components/paco/glass";
import { moduleTileHeight } from "@/theme/tokens";
import { HeartPulse } from "@/components/paco/glyphs";
import { wellnessIcons } from "@/components/paco/icons";
import { FadeSlideIn, PressableScale } from "@/components/paco/motion";
import { wellnessCategories } from "@/mock/paco";

export default function WellnessScreen() {
  const router = useRouter();

  return (
    <Screen
      title="Bienestar en línea"
      description="Biblioteca de contenidos de salud y desarrollo cargada por tu empresa: videos, presentaciones, PDFs y más."
    >
      <View className="flex-row flex-wrap justify-between">
        {wellnessCategories.map((category, index) => {
          const WellnessIcon = wellnessIcons[category.id] ?? HeartPulse;
          const count = category.resources.length;
          return (
            <FadeSlideIn key={category.id} delay={index * 40} className="mb-3 w-[48.5%]">
              <PressableScale
                className="w-full"
                accessibilityLabel={`${category.name}. ${count === 0 ? "Sin contenido" : `${count} recurso${count > 1 ? "s" : ""}`}`}
                onPress={() => router.push({ pathname: "/(paco)/wellness/[id]", params: { id: category.id } })}
              >
                <GlassSurface variant="light" className="p-4 shadow-card" style={{ height: moduleTileHeight }}>
                  <View className="flex-row items-start justify-between">
                    <View className="h-14 w-14 items-center justify-center rounded-[14px] border border-separator bg-white/55">
                      <WellnessIcon size={44} color="#674EA7" strokeWidth={2} />
                    </View>
                    {count > 0 ? (
                      <View className="rounded-full border border-separator bg-white/55 px-2 py-0.5">
                        <Text className="text-[10px] font-bold text-brand-700">{count}</Text>
                      </View>
                    ) : (
                      <View className="w-8" />
                    )}
                  </View>
                  <Text className="mt-2 h-[40px] text-[15px] font-bold leading-5 text-ink-body" numberOfLines={2}>
                    {category.name}
                  </Text>
                </GlassSurface>
              </PressableScale>
            </FadeSlideIn>
          );
        })}
      </View>
    </Screen>
  );
}
