import { useMemo, useState } from "react";
import { Medal, Search, Send } from "@/components/paco/glyphs";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Badge, Button, Card, EmptyState, Field, Screen, Section } from "@/components/paco/layout";
import { Segmented, SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { badgeIcons } from "@/components/paco/icons";
import { directory, recognitionBadges } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function RecognitionsScreen() {
  const { recognitions, sendRecognition } = usePacoStore();
  const [tab, setTab] = useState<string>("Reconocer");
  const [historyTab, setHistoryTab] = useState<string>("Recibidos");
  const [badgeId, setBadgeId] = useState(recognitionBadges[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [person, setPerson] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const badge = recognitionBadges.find((b) => b.id === badgeId) ?? recognitionBadges[0]!;
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return directory;
    return directory.filter((c) => c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q));
  }, [query]);

  const history = recognitions.filter((r) => (historyTab === "Recibidos" ? r.direction === "Recibido" : r.direction === "Enviado"));

  const submit = async () => {
    if (!person) {
      setError("Selecciona a quién va dirigido el reconocimiento.");
      return;
    }
    if (reason.trim().length < 5) {
      setError("Cuéntale por qué lo reconoces (mínimo 5 caracteres).");
      return;
    }
    setError(null);
    setSending(true);
    await simulate(null, 900);
    sendRecognition(badge.id, badge.name, person, reason.trim());
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <Screen>
        <SuccessCard
          title={`¡Medalla de ${badge.name} enviada!`}
          description={`${person} recibirá una notificación con tu reconocimiento: “${reason.trim()}”. También quedó registrado en tu historial de enviados.`}
        >
          <View className="w-full gap-2 pt-2">
            <Button
              onPress={() => {
                setSent(false);
                setTab("Mis reconocimientos");
                setHistoryTab("Enviados");
              }}
            >
              Ver mis reconocimientos
            </Button>
            <Button
              variant="ghost"
              onPress={() => {
                setSent(false);
                setPerson(null);
                setReason("");
                setQuery("");
              }}
            >
              Enviar otro
            </Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen title="Reconoce a tu equipo" description="Envía medallas con los valores de tu organización y consulta tu historial.">
      <Segmented options={["Reconocer", "Mis reconocimientos"]} value={tab} onChange={setTab} />

      {tab === "Reconocer" ? (
        <>
          <Section title="1. Elige la medalla">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-5">
              {recognitionBadges.map((item) => (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  onPress={() => setBadgeId(item.id)}
                  className={cn(
                    "w-32 items-center gap-2 rounded-2xl border px-3 py-4",
                    badgeId === item.id ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white",
                  )}
                >
                  {(() => {
                    const BadgeIcon = badgeIcons[item.id] ?? Medal;
                    return (
                      <View className={cn("h-14 w-14 items-center justify-center rounded-full", badgeId === item.id ? "bg-ink" : "bg-slate-100")}>
                        <BadgeIcon size={24} color={badgeId === item.id ? "#fff" : "#64748b"} strokeWidth={2} />
                      </View>
                    );
                  })()}
                  <Text className={cn("text-center text-xs font-bold", badgeId === item.id ? "text-brand-700" : "text-slate-700")} numberOfLines={2}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Card className="bg-brand-50">
              <Text className="text-sm leading-5 text-slate-700">
                <Text className="font-bold">{badge.name}: </Text>
                {badge.description}
              </Text>
            </Card>
          </Section>

          <Section title="2. ¿A quién le envías este reconocimiento?">
            <View className="flex-row items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3">
              <Search size={18} color="#94a3b8" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Busca por nombre o área…"
                placeholderTextColor="#94a3b8"
                className="min-h-12 flex-1 text-base text-slate-950"
              />
            </View>
            {person ? (
              <Card className="flex-row items-center gap-3 border-brand-200 bg-brand-50">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-500">
                  <Text className="text-sm font-bold text-white">
                    {person
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </Text>
                </View>
                <Text className="flex-1 text-sm font-bold text-brand-700">Se enviará a: {person}</Text>
                <Pressable accessibilityRole="button" onPress={() => setPerson(null)} className="min-h-10 justify-center">
                  <Text className="text-xs font-bold text-slate-500">Cambiar</Text>
                </Pressable>
              </Card>
            ) : (
              <View className="gap-2">
                {results.slice(0, 5).map((coworker) => (
                  <Pressable
                    key={coworker.id}
                    accessibilityRole="button"
                    onPress={() => setPerson(coworker.name)}
                    className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 active:bg-brand-50"
                  >
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <Text className="text-sm font-bold text-slate-600">
                        {coworker.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-bold text-slate-900">{coworker.name}</Text>
                      <Text className="text-xs text-slate-500">
                        {coworker.role} · {coworker.area}
                      </Text>
                    </View>
                  </Pressable>
                ))}
                {results.length === 0 ? <Text className="py-2 text-center text-sm text-slate-500">Sin coincidencias para “{query}”.</Text> : null}
              </View>
            )}
          </Section>

          <Section title="3. ¿Por qué das este reconocimiento?">
            <Field
              label="Motivo"
              value={reason}
              onChangeText={setReason}
              multiline
              placeholder="Ej. porque siempre busca resolver…"
              error={error ?? undefined}
            />
          </Section>

          <Button icon={Send} loading={sending} onPress={submit}>
            Enviar medalla de {badge.name}
          </Button>
        </>
      ) : (
        <>
          <Segmented options={["Recibidos", "Enviados"]} value={historyTab} onChange={setHistoryTab} />
          {history.length === 0 ? (
            <EmptyState
              title={historyTab === "Recibidos" ? "Aún no recibes medallas" : "Aún no envías medallas"}
              description={historyTab === "Recibidos" ? "Cuando un compañero o el sistema te reconozca, lo verás aquí." : "Reconoce a un compañero desde la pestaña Reconocer."}
              icon={Medal}
            />
          ) : (
            <View className="gap-2.5">
              {history.map((item) => {
                const itemBadge = recognitionBadges.find((b) => b.id === item.badgeId);
                return (
                  <Card key={item.id} className="gap-2">
                    <View className="flex-row items-center gap-3">
                      {(() => {
                        const HistoryIcon = badgeIcons[item.badgeId] ?? Medal;
                        return (
                          <View className="h-11 w-11 items-center justify-center rounded-full bg-amber-50">
                            <HistoryIcon size={20} color="#B8860B" strokeWidth={2.1} />
                          </View>
                        );
                      })()}
                      <View className="flex-1">
                        <Text className="text-base font-bold text-slate-950">{item.badgeName}</Text>
                        <Text className="text-sm text-slate-600">
                          {item.direction === "Recibido" ? `De: ${item.person}` : `Para: ${item.person}`}
                        </Text>
                      </View>
                      <Badge tone={item.origin === "Sistema" ? "info" : "neutral"}>{item.origin}</Badge>
                    </View>
                    <Text className="text-sm italic leading-5 text-slate-600">“{item.reason}”</Text>
                    <Text className="text-xs text-slate-400">{item.date}</Text>
                  </Card>
                );
              })}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}
