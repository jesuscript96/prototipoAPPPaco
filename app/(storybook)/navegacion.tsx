import { useState } from "react";
import { Text, View } from "react-native";
import { ArrowsClockwise, CheckCircle, CursorClick, HandTap } from "phosphor-react-native";
import { Button, Card, Progress, Screen, Section } from "@/components/paco/layout";
import { ConfettiBurst, FadeSlideIn, PopIn, PressableScale, ShakeView, Shimmer, useAnimatedNumber } from "@/components/paco/motion";
import { mxn } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

export default function MovimientoScreen() {
  const showToast = usePacoStore((s) => s.showToast);
  const [replay, setReplay] = useState(0);
  const [balance, setBalance] = useState(2500);
  const [shake, setShake] = useState(0);
  const animated = useAnimatedNumber(balance);

  return (
    <Screen
      eyebrow="Microinteracciones"
      title="Movimiento"
      description="Reglas: solo transform/opacity, entradas ease-out de 200-280 ms, feedback de presión de 110 ms con rebote sutil al soltar. Nada decorativo."
    >
      <Section title="Press-scale (110 ms + spring)" description="Todo elemento accionable encoge 3% al presionar.">
        <PressableScale onPress={() => showToast("Feedback de presión.")} className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-brand-100">
              <HandTap size={20} color="#2F42CB" weight="bold" />
            </View>
            <Text className="text-[14px] font-semibold text-slate-800">Mantén presionado para sentir la anticipación</Text>
          </View>
        </PressableScale>
      </Section>

      <Section title="Entradas escalonadas" description="FadeSlideIn con delay incremental de 60 ms.">
        <Button variant="secondary" icon={ArrowsClockwise} onPress={() => setReplay((v) => v + 1)}>
          Reproducir de nuevo
        </Button>
        <View key={replay} className="gap-2">
          {["Primero entra el contexto", "Después el contenido principal", "Al final las acciones"].map((label, index) => (
            <FadeSlideIn key={label} delay={index * 90}>
              <Card>
                <Text className="text-[13px] font-semibold text-slate-700">{label}</Text>
              </Card>
            </FadeSlideIn>
          ))}
        </View>
      </Section>

      <Section title="Pop con overshoot" description="Sellos de éxito y confirmaciones.">
        <Card className="items-center gap-3 py-6">
          <PopIn key={`pop-${replay}`}>
            <View className="h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-card">
              <CheckCircle size={28} color="#fff" weight="bold" />
            </View>
          </PopIn>
          <Text className="text-[12px] font-semibold text-slate-500">Spring con bounciness 12: rebota un pelo y se asienta</Text>
        </Card>
      </Section>

      <Section title="Números animados" description="Los saldos interpolan 650 ms ease-out al cambiar.">
        <Card className="items-center gap-3 py-5">
          <Text className="text-4xl font-bold tracking-tight text-slate-950">{mxn(Math.round(animated))}</Text>
          <View className="flex-row gap-2">
            <Button variant="outline" onPress={() => setBalance((v) => Math.max(0, v - 700))}>
              Gastar $700
            </Button>
            <Button variant="outline" onPress={() => setBalance(2500)}>
              Restaurar
            </Button>
          </View>
        </Card>
      </Section>

      <Section title="Error con sacudida elástica" description="Validación fallida: 4 oscilaciones decrecientes en 360 ms.">
        <ShakeView trigger={shake}>
          <Card className="gap-3 border-red-200">
            <Text className="text-[13px] font-semibold text-slate-700">Campo con error de validación</Text>
            <Button variant="destructive" onPress={() => setShake((v) => v + 1)}>
              Provocar error
            </Button>
          </Card>
        </ShakeView>
      </Section>

      <Section title="Skeleton con brillo" description="Para cargas de 300-500 ms en listas; un destello recorre el bloque.">
        <Card className="gap-3">
          {[0, 1, 2].map((index) => (
            <View key={index} className="flex-row items-center gap-3">
              <Shimmer width={36} height={36} radius={10} />
              <View className="flex-1 gap-1.5">
                <Shimmer width="70%" />
                <Shimmer width="45%" height={10} />
              </View>
            </View>
          ))}
        </Card>
      </Section>

      <Section title="Confetti contenido" description="Una sola ráfaga de 10 partículas para éxitos de alto valor.">
        <Card className="items-center gap-2 overflow-hidden py-6" key={`confetti-${replay}`}>
          <ConfettiBurst trigger={replay} />
          <PopIn key={`seal-${replay}`}>
            <View className="h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-card">
              <CheckCircle size={24} color="#fff" weight="bold" />
            </View>
          </PopIn>
          <Text className="text-[12px] font-semibold text-slate-500">Usa "Reproducir de nuevo" arriba</Text>
        </Card>
      </Section>

      <Section title="Progreso animado" description="La barra crece con ease-out al montar o cambiar.">
        <Card className="gap-3" key={`bar-${replay}`}>
          <Progress value={68} />
        </Card>
      </Section>

      <Section title="Principios" >
        <Card className="gap-2">
          {[
            "Ease-out al entrar, ease-in al salir; nunca lineal.",
            "100-200 ms para micro feedback, 200-300 ms para transiciones.",
            "Overshoot sutil: el rebote se siente, no se ve.",
            "El backend mock corre en paralelo: la animación nunca retrasa la acción.",
            "Consistencia: el mismo gesto produce siempre la misma respuesta.",
          ].map((rule) => (
            <View key={rule} className="flex-row items-start gap-2">
              <CursorClick size={14} color="#2F42CB" weight="bold" />
              <Text className="flex-1 text-[13px] leading-5 text-slate-600">{rule}</Text>
            </View>
          ))}
        </Card>
      </Section>
    </Screen>
  );
}
