// Primitivos de movimiento Paco. Reglas del sistema:
// - Solo transform/opacity (60 fps, sin reflow).
// - Entradas con ease-out (rapido -> freno suave), 200-280 ms.
// - Micro feedback tactil 100-160 ms con ligero overshoot al soltar.
// - Nada decorativo: cada animacion confirma una accion o guia la vista.

import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ViewStyle } from "react-native";
import { cssInterop } from "nativewind";

// NativeWind no registra los componentes Animated por defecto: sin esto,
// className en Animated.View se ignora silenciosamente.
cssInterop(Animated.View, { className: "style" });

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// Feedback de presion universal: encoge 3% al presionar (anticipacion) y
// regresa con un spring corto (rebote organico). Sustituye a Pressable en
// tarjetas, filas y botones del sistema.
export function PressableScale({
  children,
  onPress,
  onLongPress,
  disabled,
  className,
  style,
  accessibilityRole = "button",
  accessibilityLabel,
  accessibilityState,
}: {
  children: ReactNode;
  onPress?: (() => void) | undefined;
  onLongPress?: (() => void) | undefined;
  disabled?: boolean | undefined;
  className?: string;
  style?: ViewStyle;
  accessibilityRole?: "button" | "radio" | "checkbox" | "switch" | "tab";
  accessibilityLabel?: string | undefined;
  accessibilityState?: { checked?: boolean; selected?: boolean } | undefined;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.timing(scale, { toValue: 0.97, duration: 110, easing: easeOut, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, speed: 30, bounciness: 7, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      {...(accessibilityLabel ? { accessibilityLabel } : {})}
      {...(accessibilityState ? { accessibilityState } : {})}
      disabled={disabled ?? false}
      onPressIn={pressIn}
      onPressOut={pressOut}
      {...(onPress ? { onPress } : {})}
      {...(onLongPress ? { onLongPress } : {})}
    >
      <Animated.View className={className ?? ""} style={[style ?? {}, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// Entrada de contenido: fade + desplazamiento de 14 px hacia arriba con
// ease-out. `delay` permite escalonar listas (30-50 ms por elemento).
export function FadeSlideIn({
  children,
  delay = 0,
  duration = 260,
  distance = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration, delay, easing: easeOut, useNativeDriver: true }).start();
  }, [progress, delay, duration]);

  return (
    <Animated.View
      className={className ?? ""}
      style={{
        opacity: progress,
        transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// Aparicion con escala y overshoot (sello de exito, iconos de confirmacion).
export function PopIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 160, delay, easing: easeOut, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, delay, speed: 22, bounciness: 12, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity, delay]);

  return <Animated.View style={{ opacity, transform: [{ scale }] }}>{children}</Animated.View>;
}

// Numero animado: interpola entre el valor anterior y el nuevo (600 ms
// ease-out). Para saldos y totales que cambian tras una accion.
export function useAnimatedNumber(value: number, duration = 650) {
  const animated = useRef(new Animated.Value(value)).current;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const id = animated.addListener(({ value: v }) => setDisplay(v));
    Animated.timing(animated, { toValue: value, duration, easing: easeOut, useNativeDriver: false }).start();
    return () => animated.removeListener(id);
  }, [value, animated, duration]);

  return display;
}

// Barra de progreso animada (ancho en %, driver JS: es un elemento pequeno).
export function AnimatedBar({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, { toValue: Math.min(100, Math.max(0, value)), duration: 500, easing: easeOut, useNativeDriver: false }).start();
  }, [value, width]);

  return (
    <Animated.View
      className={className ?? ""}
      style={{ width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }}
    >
      {barClassName ? <Animated.View className={barClassName} /> : null}
    </Animated.View>
  );
}

export { easeOut };

// Sacudida elastica para errores de validacion: 4 oscilaciones decrecientes
// (10 -> -8 -> 5 -> 0) en ~360 ms. Se dispara cada vez que cambia `trigger`.
export function ShakeView({ children, trigger, className }: { children: ReactNode; trigger: number | string | null; className?: string }) {
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!trigger) return;
    shift.setValue(0);
    Animated.sequence([
      Animated.timing(shift, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shift, { toValue: -8, duration: 80, useNativeDriver: true }),
      Animated.timing(shift, { toValue: 5, duration: 80, useNativeDriver: true }),
      Animated.spring(shift, { toValue: 0, speed: 30, bounciness: 8, useNativeDriver: true }),
    ]).start();
  }, [trigger, shift]);

  return (
    <Animated.View className={className ?? ""} style={{ transform: [{ translateX: shift }] }}>
      {children}
    </Animated.View>
  );
}

// Skeleton con brillo: bloque slate con un destello que recorre en loop.
export function Shimmer({ width = "100%", height = 14, radius = 7, className }: { width?: number | `${number}%`; height?: number; radius?: number; className?: string }) {
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [sweep]);

  return (
    <Animated.View
      className={className ?? ""}
      style={{ width, height, borderRadius: radius, backgroundColor: "rgba(30,30,30,0.08)", overflow: "hidden" }}
    >
      <Animated.View
        style={{
          width: 90,
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.55)",
          transform: [{ translateX: sweep.interpolate({ inputRange: [0, 1], outputRange: [-90, 360] }) }, { skewX: "-18deg" }],
        }}
      />
    </Animated.View>
  );
}

// Confetti contenido: 10 particulas que salen del centro con springs, una sola
// vez. Reservado para exitos de alto valor (operacion confirmada, curso 100%).
const confettiColors = ["#2F42CB", "#5176F3", "#FB4F33", "#6AA84F", "#F1C232", "#674EA7"];

export function ConfettiBurst({ trigger = 1 }: { trigger?: number }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    Animated.spring(progress, { toValue: 1, speed: 4, bounciness: 0, useNativeDriver: true }).start();
  }, [trigger, progress]);

  const particles = Array.from({ length: 10 }).map((_, index) => {
    const angle = (index / 10) * Math.PI * 2;
    const distance = 46 + (index % 3) * 14;
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, color: confettiColors[index % confettiColors.length]! };
  });

  return (
    <Animated.View style={{ pointerEvents: "none", position: "absolute", left: "50%", top: 36 }}>
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: index % 2 === 0 ? 3 : 1,
            backgroundColor: particle.color,
            opacity: progress.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0, 1, 0] }),
            transform: [
              { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, particle.x] }) },
              { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, particle.y] }) },
              { scale: progress.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1.2, 0.7] }) },
            ],
          }}
        />
      ))}
    </Animated.View>
  );
}

// Pulso continuo (reproduccion activa): escala 1 <-> 1.07 en loop suave.
export function Pulse({ children, active }: { children: ReactNode; active: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      scale.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.07, duration: 520, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, scale]);

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
}

// Parpadeo (grabando): opacidad 1 <-> 0.25 en loop.
export function Blink({ children, active = true }: { children: ReactNode; active?: boolean }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      opacity.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.25, duration: 450, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 450, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, opacity]);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

// Carga simulada breve para mostrar skeletons en listas locales (<450 ms).
export function useFakeLoad(ms = 380) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);
  return loading;
}
