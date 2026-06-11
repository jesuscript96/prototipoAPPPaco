import { useMemo, useState } from "react";
import { MessageCircle, PiggyBank } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { Badge, Button, Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { ChatBubble, ChatComposer, Segmented, SelectChip, StackedBar, cn, mxn } from "@/components/paco/ui";
import { company, expensePeriods } from "@/mock/paco";
import { nowLabel, usePacoStore } from "@/store/paco-store";

const tabs = ["Adeudos", "Mis gastos", "Soporte"] as const;
const categoryFilters = ["Todos", "Adelanto de nómina", "Recarga", "Pago de servicio"] as const;
const categoryColors: Record<string, string> = {
  "Adelanto de nómina": "#3148c8",
  Recarga: "#0ea5e9",
  "Pago de servicio": "#f59e0b",
};

export default function ExpensesScreen() {
  const { movements, showToast } = usePacoStore();
  const [tab, setTab] = useState<string>("Adeudos");
  const [period, setPeriod] = useState<string>("Todos");
  const [category, setCategory] = useState<string>("Todos");
  const [waMessages, setWaMessages] = useState<{ id: string; from: string; text: string; mine: boolean; time: string }[]>([]);
  const [openDetail, setOpenDetail] = useState<string | null>(null);

  const debts = movements.filter((m) => m.status === "Adeudo próximo");
  const totalDebt = debts.reduce((sum, m) => sum + m.amount + m.commission, 0);

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
        <Text className="text-xs font-bold uppercase tracking-[1px] text-white/70">Total de adeudos</Text>
        <Text className="text-4xl font-bold text-white">{mxn(totalDebt)}</Text>
        <Text className="text-sm text-white/80">{totalDebt > 0 ? "Se retendrá en la nómina del 15 de junio de 2026." : "No tienes adeudos pendientes."}</Text>
      </Card>

      <Segmented options={tabs} value={tab} onChange={setTab} />

      {tab === "Adeudos" ? (
        debts.length === 0 ? (
          <EmptyState title="$0 en adeudos" description="Cuando solicites un adelanto o pago con cargo a nómina, aparecerá aquí." icon={PiggyBank} />
        ) : (
          <View className="gap-3">
            {debts.map((m) => (
              <Card key={m.id} className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="flex-1 text-base font-bold text-slate-950">{m.concept}</Text>
                  <Badge tone="warning">{m.status}</Badge>
                </View>
                <Text className="text-sm text-slate-500">
                  {m.date} · {m.period}
                </Text>
                <Text className="text-lg font-bold text-slate-950">
                  {mxn(m.amount + m.commission)}{" "}
                  <Text className="text-xs font-semibold text-slate-500">
                    ({mxn(m.amount)} + {mxn(m.commission)} comisión)
                  </Text>
                </Text>
              </Card>
            ))}
          </View>
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
            <EmptyState title="Sin movimientos" description="No hay gastos con los filtros seleccionados. Prueba otro periodo o tipo." icon={PiggyBank} />
          ) : (
            <>
              <Section title="Resumen por tipo de gasto">
                <Card>
                  <StackedBar slices={slices} />
                </Card>
              </Section>
              <Section title={`Movimientos (${filtered.length})`}>
                <View className="gap-2.5">
                  {filtered.map((m) => (
                    <Card key={m.id} className="gap-1.5">
                      <View className="flex-row items-center justify-between">
                        <Text className="flex-1 text-sm font-bold text-slate-950">{m.concept}</Text>
                        <Text className="text-base font-bold text-slate-950">{mxn(m.amount + m.commission)}</Text>
                      </View>
                      <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-slate-500">
                          {m.date} · {m.period}
                        </Text>
                        <Badge tone={m.status === "Adeudo próximo" ? "warning" : m.status === "Procesado" ? "info" : "success"}>{m.status}</Badge>
                      </View>
                      <Text
                        onPress={() => setOpenDetail(openDetail === m.id ? null : m.id)}
                        className="text-xs font-bold text-brand-700"
                        suppressHighlighting
                      >
                        {openDetail === m.id ? "Ocultar detalle" : "Ver detalle"}
                      </Text>
                      {openDetail === m.id ? (
                        <View className={cn("gap-1 rounded-2xl bg-slate-50 p-3")}>
                          <Text className="text-xs text-slate-600">Tipo: {m.category}</Text>
                          <Text className="text-xs text-slate-600">Importe: {mxn(m.amount)}</Text>
                          <Text className="text-xs text-slate-600">Comisión: {mxn(m.commission)}</Text>
                          <Text className="text-xs text-slate-600">Folio: PACO-{m.id.toUpperCase()}</Text>
                        </View>
                      ) : null}
                    </Card>
                  ))}
                </View>
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
                <MessageCircle size={24} color="#059669" strokeWidth={2} />
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
