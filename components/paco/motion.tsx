// Primitivos de movimiento Paco. Reglas del sistema:
// - Solo transform/opacity (60 fps, sin reflow).
// - Entradas con ease-out (rapido -> freno suave), 200-280 ms.
// - Micro feedback tactil 100-160 ms con ligero overshoot al soltar.
// - Nada decorativo: cada animacion confirma una accion o guia la vista.

import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Pressable, View, ViewStyle } from "react-native";
import { cssInterop } from "nativewind";
import { colors } from "@/theme/tokens";

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
  fluid = true,
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
  /** false: el contenido conserva su ancho intrínseco (pills, chips inline). */
  fluid?: boolean;
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
      className={className ?? ""}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }], ...(fluid ? { width: "100%" as const } : null) }}>{children}</Animated.View>
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

// ============================================================================
// Primitivos premium (plan de motion branding, fase 1)
// ============================================================================

import { ActivityIndicator, Platform, Text } from "react-native";
import { Check } from "@/components/paco/glyphs";
import { motion } from "@/theme/motion";

type GlyphIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

// Hook de accesibilidad: en web respeta prefers-reduced-motion y en nativo
// la preferencia del sistema vía AccessibilityInfo.
export function useReduceMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => mounted && setReduced(value))
      .catch(() => undefined);
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);
  return reduced;
}

export type MorphStatus = "idle" | "loading" | "success";

// MorphButton: accion primaria con narrativa idle -> loading -> success.
// El ancho se mantiene (estabilidad financiera), el label hace crossfade con
// el loader y al exito aparece un check con pop. La navegacion/cierre la
// decide el llamador tras `onPress` (que puede ser async).
export function MorphButton({
  label,
  successLabel,
  loadingLabel,
  icon: IconComponent,
  onPress,
  disabled,
  variant = "primary",
  status: controlledStatus,
  autoReset = false,
}: {
  label: string;
  successLabel?: string;
  loadingLabel?: string;
  icon?: GlyphIcon;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  variant?: "primary" | "destructive" | "secondary";
  status?: MorphStatus;
  autoReset?: boolean;
}) {
  const [internal, setInternal] = useState<MorphStatus>("idle");
  const status = controlledStatus ?? internal;
  const reduce = useReduceMotion();

  const scale = useRef(new Animated.Value(1)).current;
  const labelOpacity = useRef(new Animated.Value(1)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);

  useEffect(() => {
    if (status === "loading") {
      Animated.parallel([
        Animated.timing(labelOpacity, { toValue: 0, duration: 140, useNativeDriver: true }),
        Animated.timing(loaderOpacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
      checkScale.setValue(0);
    } else if (status === "success") {
      Animated.parallel([
        Animated.timing(labelOpacity, { toValue: 1, duration: 200, easing: easeOut, useNativeDriver: true }),
        Animated.timing(loaderOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
        Animated.spring(checkScale, { toValue: 1, ...motion.spring.celebratory, useNativeDriver: true }),
      ]).start();
      if (autoReset) {
        const t = setTimeout(() => mounted.current && setInternal("idle"), 1400);
        return () => clearTimeout(t);
      }
    } else {
      Animated.parallel([
        Animated.timing(labelOpacity, { toValue: 1, duration: 160, useNativeDriver: true }),
        Animated.timing(loaderOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      ]).start();
      checkScale.setValue(0);
    }
  }, [status, labelOpacity, loaderOpacity, checkScale, autoReset]);

  const bg = variant === "destructive" ? "shadow-card" : variant === "secondary" ? "bg-white/50 border border-white/80" : "shadow-card";
  const fillStyle: ViewStyle | undefined =
    variant === "destructive"
      ? { backgroundColor: colors.danger }
      : variant === "secondary"
        ? undefined
        : { backgroundColor: colors.navy };
  const fg = variant === "secondary" ? colors.text : "#fff";
  const busy = status !== "idle";

  const run = () => {
    if (controlledStatus === undefined) {
      setInternal("loading");
      Promise.resolve(onPress()).then(() => {
        if (mounted.current) setInternal("success");
      });
    } else {
      onPress();
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: status === "loading" }}
      disabled={disabled || busy}
      onPressIn={() => !reduce && Animated.timing(scale, { toValue: motion.scale.press, duration: 110, easing: easeOut, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, ...motion.spring.press, useNativeDriver: true }).start()}
      onPress={run}
    >
      <Animated.View
        style={[{ transform: reduce ? [] : [{ scale }] }, fillStyle]}
        className={cx("min-h-[50px] flex-row items-center justify-center gap-2 rounded-[14px] px-5 shadow-card", bg, disabled && "opacity-40")}
      >
        <Animated.View style={{ position: "absolute", opacity: loaderOpacity }}>
          <ActivityIndicator color={fg} />
        </Animated.View>
        {status === "success" ? (
          <Animated.View style={{ transform: [{ scale: checkScale }] }}>
            <Check size={18} color={fg} strokeWidth={3.2} />
          </Animated.View>
        ) : IconComponent && status === "idle" ? (
          <IconComponent size={18} color={fg} strokeWidth={2.3} />
        ) : null}
        <Animated.Text
          style={{ opacity: labelOpacity, color: variant === "secondary" ? colors.text : "#ffffff" }}
          className={cx("text-center text-[15px] font-medium tracking-normal", variant === "secondary" ? "text-ink" : "text-white")}
        >
          {status === "loading" ? (loadingLabel ?? label) : status === "success" ? (successLabel ?? label) : label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

// LiquidButton: accion secundaria que cambia de estado (descargar, copiar,
// marcar leido...). El contenedor hace crossfade de icono+texto entre estados;
// el estado final queda visible. No navega por si solo.
export function LiquidButton({
  idleLabel,
  busyLabel,
  doneLabel,
  idleIcon,
  doneIcon,
  done,
  onPress,
  tone = "neutral",
}: {
  idleLabel: string;
  busyLabel?: string;
  doneLabel: string;
  idleIcon?: GlyphIcon;
  doneIcon?: GlyphIcon;
  done: boolean;
  onPress: () => void | Promise<void>;
  tone?: "neutral" | "brand";
}) {
  const [busy, setBusy] = useState(false);
  const fade = useRef(new Animated.Value(done ? 1 : 0)).current;
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);

  useEffect(() => {
    Animated.timing(fade, { toValue: done ? 1 : 0, duration: 220, easing: easeOut, useNativeDriver: true }).start();
  }, [done, fade]);

  const DoneIcon = doneIcon ?? Check;
  const label = busy ? (busyLabel ?? idleLabel) : done ? doneLabel : idleLabel;
  const activeColor = done ? "#2E8B57" : tone === "brand" ? "#2F42CB" : "#475569";

  const run = () => {
    if (done || busy) {
      onPress();
      return;
    }
    setBusy(true);
    Promise.resolve(onPress()).then(() => mounted.current && setBusy(false));
  };

  return (
    <PressableScale
      onPress={run}
      {...(done ? { style: { borderColor: "rgba(46, 139, 87, 0.30)", backgroundColor: "rgba(255, 255, 255, 0.55)" } } : {})}
      className={cx(
        "min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] border px-4",
        !done && "border-white/80 bg-white/50",
      )}
    >
      {busy ? (
        <ActivityIndicator size="small" color={activeColor} />
      ) : done ? (
        <Animated.View style={{ opacity: fade, transform: [{ scale: fade.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }] }}>
          <DoneIcon size={16} color={activeColor} strokeWidth={2.6} />
        </Animated.View>
      ) : idleIcon ? (
        (() => { const I = idleIcon; return <I size={16} color={activeColor} strokeWidth={2.4} />; })()
      ) : null}
      <Text style={{ color: activeColor }} className="text-[13px] font-bold">{label}</Text>
    </PressableScale>
  );
}

// MutableContainer: revela/oculta contenido con fade + slide y un overshoot
// leve, sin animar height (evita reflow). El contenido entra desde arriba.
export function MutableContainer({ open, children }: { open: boolean; children: ReactNode }) {
  const progress = useRef(new Animated.Value(open ? 1 : 0)).current;
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) setRender(true);
    Animated.timing(progress, { toValue: open ? 1 : 0, duration: open ? 280 : 180, easing: easeOut, useNativeDriver: true }).start(({ finished }) => {
      if (finished && !open) setRender(false);
    });
  }, [open, progress]);

  if (!render) return null;
  return (
    <Animated.View
      style={{
        opacity: progress,
        transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}

// TypingIndicator: tres puntos que suben/bajan en secuencia. Para soporte,
// voz RH y chat interno mientras "el otro" escribe.
export function TypingIndicator() {
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  useEffect(() => {
    const loops = dots.map((dot, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 160),
          Animated.timing(dot, { toValue: 1, duration: 320, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 320, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.delay((2 - index) * 160),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="flex-row items-center gap-1 self-start rounded-2xl rounded-bl-[4px] border border-white/80 bg-white/85 px-3.5 py-3 shadow-card">
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={{
            opacity: dot.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
            transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
          }}
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      ))}
    </View>
  );
}
