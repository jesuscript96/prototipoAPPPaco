import { useMemo, useState } from "react";
import { PartyPopper } from "@/components/paco/glyphs";
import { Image, ScrollView, Text, View } from "react-native";
import { illustrationAssets, moduleAssets } from "@/components/paco/assets";
import { Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { Segmented, SelectChip } from "@/components/paco/ui";
import { celebrations } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

const tabs = ["Todos", "Cumpleaños", "Aniversarios"] as const;
const dayFilters = [
  { label: "Todos los días", offset: -1 },
  { label: "Hoy (10 jun)", offset: 0 },
  { label: "Mañana (11 jun)", offset: 1 },
  { label: "Viernes (12 jun)", offset: 2 },
  { label: "Fin de semana", offset: 3 },
] as const;

export default function CelebrationsScreen() {
  const { congratulatedIds, congratulate } = usePacoStore();
  const [tab, setTab] = useState<string>("Todos");
  const [dayOffset, setDayOffset] = useState(-1);

  const filtered = useMemo(
    () =>
      celebrations.filter((item) => {
        if (tab === "Cumpleaños" && item.type !== "Cumpleaños") return false;
        if (tab === "Aniversarios" && item.type !== "Aniversario") return false;
        if (dayOffset === -1) return true;
        if (dayOffset === 3) return item.dayOffset >= 3;
        return item.dayOffset === dayOffset;
      }),
    [tab, dayOffset],
  );

  return (
    <Screen
      title="Cumpleaños y aniversarios"
      description="Fechas especiales de tus compañeros esta semana. Las medallas indican años de antigüedad."
    >
      <Segmented options={tabs} value={tab} onChange={setTab} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {dayFilters.map((filter) => (
          <SelectChip key={filter.label} label={filter.label} active={dayOffset === filter.offset} onPress={() => setDayOffset(filter.offset)} />
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState
          title="Sin celebraciones"
          description="No hay cumpleaños ni aniversarios con los filtros seleccionados. Prueba otro día o pestaña."
          icon={PartyPopper}
          image={illustrationAssets.empty}
        />
      ) : (
        <View className="gap-3">
          {filtered.map((item) => {
            const congratulated = congratulatedIds.includes(item.id);
            return (
              <Card key={item.id} className="gap-3">
                <View className="flex-row items-center gap-3">
                  <View className="h-11 w-11 items-center justify-center rounded-[12px] border border-separator bg-white/55">
                    <Image source={moduleAssets.celebrations} resizeMode="contain" style={{ width: 28, height: 28 }} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-slate-950">{item.name}</Text>
                    <Text className="text-sm text-slate-500">
                      {item.type} · {item.dayLabel} · {item.area}
                    </Text>
                  </View>
                  {item.years ? (
                    <View className="h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-white/55">
                      <Text className="text-base font-bold text-amber-700">{item.years}</Text>
                      <Text className="text-[8px] font-bold uppercase text-amber-600">años</Text>
                    </View>
                  ) : null}
                </View>
                <Button
                  variant={congratulated ? "secondary" : "primary"}
                  disabled={congratulated}
                  onPress={() => congratulate(item.id, item.name)}
                >
                  {congratulated ? "Felicitación enviada" : `Felicitar a ${item.name.split(" ")[0]}`}
                </Button>
              </Card>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
