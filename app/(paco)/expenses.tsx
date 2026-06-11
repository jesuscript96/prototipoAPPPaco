import { useMemo, useState } from "react";
import { MessageCircle, PiggyBank, ReceiptText, Smartphone, Wallet } from "@/components/paco/glyphs";
import { Image, ScrollView, Text, View } from "react-native";
import { financeAssets, illustrationAssets, moduleAssets } from "@/components/paco/assets";
import { Button, Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { ChatBubble, ChatComposer, ListGroup, Row, Segmented, SelectChip, StackedBar, mxn } from "@/components/paco/ui";
import { Shimmer, useAnimatedNumber, useFakeLoad } from "@/components/paco/motion";
import type { Icon } from "@/components/paco/icons";
import { company, expensePeriods } from "@/mock/paco";
import { nowLabel, usePacoStore } from "@/store/paco-store";

const tabs = ["Adeudos", "Mis gastos", "Soporte"] as const;
const categoryFilters = ["Todos", "Adelanto de nómina", "Recarga", "Pago de servicio"] as const;
const categoryColors: Record<string, string> = {
  "Adelanto de nómina": "#2F42CB",
  Recarga: "#5176F3",
  "Pago de servicio": "#F1C232",
};

const categoryIcons: Record<string, Icon> = {
  "Adelanto de nómina": Wallet,
  Recarga: Smartphone,
  "Pago de servicio": ReceiptText,
};

const statusColors: Record<string, string> = {
  "Adeudo próximo": "#B8860B",
  Procesado: "#5176F3",
  Liquidado: "#6AA84F",
};

export default function ExpensesScreen() {
  const { movements, showToast } = usePacoStore();
  const [tab, setTab] = useState<string>("Adeudos");
  const [period, setPeriod] = useState<string>("Todos");
  const [category, setCategory] = useState<string>("Todos");
  const [waMessages, setWaMessages] = useState<{ id: string; from: string; text: string; mine: boolean; time: string }[]>([]);
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  const loading = useFakeLoad(380);
  const debts = movements.filter((m) => m.status === "Adeudo próximo");
  const totalDebt = debts.reduce((sum, m) => sum + m.amount + m.commission, 0);
  const animatedDebt = useAnimatedNumber(totalDebt);

  const filtered = useMemo(
    () =>
      movements.filter((m) => {
        if (period !== "Todos" && m.period !== period) return false;
        if (category !== "Todos" && m.category !== category) return false;
        return true;
      }),
    [movements, period, category],
  );

  const slices = useMemo(() => {
    const byCategory = new Map<string, number>();
    for (const m of filtered) byCategory.set(m.category, (byCategory.get(m.category) ?? 0) + m.amount + m.commission);
    return [...byCategory.entries()].map(([label, value]) => ({ label, value, color: categoryColors[label] ?? "#64748b" }));
  }, [filtered]);

  const openWhatsApp = () => {
    if (waMessages.length > 0) return;
    setWaMessages([
      { id: "wa1", from: "Tú", text: "Hola, necesito ayuda con mi estado de cuenta de Paco.", mine: true, time: nowLabel() },
      {
        id: "wa2",
        from: `Soporte Paco (${company.whatsappSupport})`,
        text: "¡Hola Ricardo! Con gusto te apoyamos. ¿Tu duda es sobre un adeudo, una recarga o un pago de servicio?",
        mine: false,
        time: nowLabel(),
      },
    ]);
    showToast("Redirigiendo a WhatsApp con mensaje preparado (simulado).");
  };

  return (
    <Screen
      title="Estado de cuenta"
      description="Adeudos por retener en tu siguiente nómina y el historial de movimientos hechos desde Paco."
    >
      <Card className="gap-1 bg-ink">
        <Image source={financeAssets.cardSent} resizeMode="contain" style={{ alignSelf: "flex-end", width: 150, height: 64 }} />
        <Text className="text-xs font-bold uppercase tracking-[1px] text-white/70">Total de adeudos</Text>
        <Text className="text-4xl font-bold tracking-tight text-white">{mxn(Math.round(animatedDebt))}</Text>
        <Text className="text-sm text-white/80">{totalDebt > 0 ? "Se retendrá en la nómina del 15 de junio de 2026." : "No tienes adeudos pendientes."}</Text>
      </Card>

      <Segmented options={tabs} value={tab} onChange={setTab} />

      {tab === "Adeudos" ? (
        loading ? (
          <View className="gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card">
            {[0, 1].map((index) => (
              <View key={index} className="flex-row items-center gap-3">
                <Shimmer width={36} height={36} radius={10} />
                <View className="flex-1 gap-1.5">
                  <Shimmer width="64%" />
                  <Shimmer width="40%" height={10} />
                </View>
                <Shimmer width={56} />
              </View>
            ))}
          </View>
        ) : debts.length === 0 ? (
          <EmptyState title="$0 en adeudos" description="Cuando solicites un adelanto o pago con cargo a nómina, aparecerá aquí." icon={PiggyBank} image={moduleAssets.expenses} />
        ) : (
          <ListGroup>
            {debts.map((m) => (
              <Row
                key={m.id}
                icon={categoryIcons[m.category] ?? Wallet}
                title={m.concept}
                subtitle={`${m.date} · ${m.period} · incluye ${mxn(m.commission)} de comisión`}
                meta={mxn(m.amount + m.commission)} metaBold
                metaSub="Se retiene el 15 jun"
                metaSubColor="#B8860B"
              />
            ))}
          </ListGroup>
        )
      ) : null}

      {tab === "Mis gastos" ? (
        <>
          <Section title="Filtros">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {expensePeriods.map((p) => (
                <SelectChip key={p} label={p} active={period === p} onPress={() => setPeriod(p)} />
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {categoryFilters.map((c) => (
                <SelectChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
              ))}
            </ScrollView>
          </Section>

          {filtered.length === 0 ? (
            <EmptyState title="Sin movimientos" description="No hay gastos con los filtros seleccionados. Prueba otro periodo o tipo." icon={PiggyBank} image={illustrationAssets.empty} />
          ) : (
            <>
              <Section title="Resumen por tipo de gasto">
                <Card>
                  <StackedBar slices={slices} />
                </Card>
              </Section>
              <Section title={`Movimientos (${filtered.length})`}>
                <ListGroup>
                  {filtered.map((m) => (
                    <View key={m.id}>
                      <Row
                        icon={categoryIcons[m.category] ?? Wallet}
                        title={m.concept}
                        subtitle={`${m.date} · ${m.period}`}
                        meta={`-${mxn(m.amount + m.commission)}`} metaBold
                        metaSub={m.status}
                        metaSubColor={statusColors[m.status] ?? "#64748b"}
                        onPress={() => setOpenDetail(openDetail === m.id ? null : m.id)}
                      />
                      {openDetail === m.id ? (
                        <View className="flex-row flex-wrap gap-x-5 gap-y-1 bg-slate-900/[0.03] px-4 py-3 pl-16">
                          <Text className="text-xs text-slate-600">Importe {mxn(m.amount)}</Text>
                          <Text className="text-xs text-slate-600">Comisión {mxn(m.commission)}</Text>
                          <Text className="text-xs text-slate-600">Folio PACO-{m.id.toUpperCase()}</Text>
                        </View>
                      ) : null}
                    </View>
                  ))}
                </ListGroup>
              </Section>
            </>
          )}
        </>
      ) : null}

      {tab === "Soporte" ? (
        <Section title="Soporte por WhatsApp" description="Es el canal oficial para aclaraciones de tu estado de cuenta.">
          {waMessages.length === 0 ? (
            <Card className="items-center gap-3 py-6">
              <View className="h-14 w-14 items-center justify-center rounded-[14px] bg-emerald-500/15">
                <Image source={moduleAssets.support} resizeMode="contain" style={{ width: 36, height: 36 }} />
              </View>
              <Text className="text-center text-sm leading-5 text-slate-600">
                Te conectaremos con el WhatsApp de soporte Paco con un mensaje preparado: “necesito ayuda”.
              </Text>
              <Button icon={MessageCircle} onPress={openWhatsApp}>
                Contactar a soporte
              </Button>
            </Card>
          ) : (
            <Card className="gap-3 bg-emerald-50">
              <Text className="text-xs font-bold uppercase tracking-[1px] text-emerald-700">WhatsApp · {company.whatsappSupport}</Text>
              <View className="gap-2">
                {waMessages.map((msg) => (
                  <ChatBubble key={msg.id} {...msg} />
                ))}
              </View>
              <ChatComposer
                placeholder="Escribe a soporte…"
                onSend={(text) => {
                  setWaMessages((prev) => [
                    ...prev,
                    { id: `wa-${prev.length + 1}`, from: "Tú", text, mine: true, time: nowLabel() },
                    {
                      id: `wa-${prev.length + 2}`,
                      from: "Soporte Paco",
                      text: "Gracias por los detalles. Estamos revisando tu caso, te respondemos en unos minutos por este medio.",
                      mine: false,
                      time: nowLabel(),
                    },
                  ]);
                }}
              />
            </Card>
          )}
        </Section>
      ) : null}
    </Screen>
  );
}
