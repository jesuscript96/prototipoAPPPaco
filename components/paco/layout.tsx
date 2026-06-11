// Sistema visual Paco · light glass. Lenguaje inspirado en el design system de
// Apple (materiales translucidos sobre un fondo ambiental) aplicado a una app
// corporativa de uso diario: superficies bg-white/70 con borde claro, radios
// contenidos (12-16 px), tipografia densa y acentos por dominio.

import { ComponentType, ReactNode, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Platform, Pressable, ScrollView, Text, TextInput, TextInputProps, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "@/components/paco/glyphs";
import { FadeSlideIn, PopIn, easeOut } from "@/components/paco/motion";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const blur = (px: number) => (Platform.OS === "web" ? ({ filter: `blur(${px}px)` } as object) : null);

// Fondo ambiental: manchas de color suaves sobre el lienzo claro, para que las
// superficies glass tengan algo que dejar traslucir.
export function Ambient() {
  return (
    <View style={{ pointerEvents: "none" }} className="absolute inset-0 overflow-hidden">
      <View style={blur(70)} className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-brand-300/40" />
      <View style={blur(70)} className="absolute -left-28 top-44 h-72 w-72 rounded-full bg-brand-200/60" />
      <View style={blur(80)} className="absolute right-[-70px] top-[420px] h-64 w-64 rounded-full bg-violet-300/30" />
    </View>
  );
}

export function GlassNavButton({ icon: IconComponent, label, onPress }: { icon: Icon; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      className="h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/70 shadow-card active:bg-white"
    >
      <IconComponent size={19} color="#1E1E1E" strokeWidth={2.2} />
    </Pressable>
  );
}

// ---- Pantalla ----

export function Screen({
  children,
  title,
  eyebrow,
  description,
  action,
}: {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
}) {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  return (
    <View className="flex-1 bg-canvas">
      <Ambient />

      <View className="flex-row items-center justify-between px-5 pb-2 pt-14">
        {canGoBack ? <GlassNavButton icon={ArrowLeft} label="Regresar" onPress={() => router.back()} /> : <View className="h-11 w-11" />}
        {action ?? <View className="h-11 w-11" />}
      </View>

      <ScrollView className="flex-1" contentContainerClassName="flex-grow" showsVerticalScrollIndicator={false}>
        {title || description || eyebrow ? (
          <View className="gap-1.5 px-6 pb-5 pt-1">
            {eyebrow ? <Text className="text-[11px] font-bold uppercase tracking-[1.8px] text-brand-600">{eyebrow}</Text> : null}
            {title ? <Text className="text-[27px] font-bold leading-9 tracking-tight text-slate-950">{title}</Text> : null}
            {description ? <Text className="text-sm leading-6 text-slate-500">{description}</Text> : null}
          </View>
        ) : null}
        <FadeSlideIn className="flex-1">
          <View className="flex-1 gap-4 px-5 pb-20 pt-2">{children}</View>
        </FadeSlideIn>
      </ScrollView>
    </View>
  );
}

// ---- Bloques ----

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <View className="gap-2.5 pt-1.5">
      <View className="gap-0.5 px-0.5">
        <Text className="text-[16px] font-bold tracking-tight text-slate-900">{title}</Text>
        {description ? <Text className="text-[13px] leading-5 text-slate-500">{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  // NativeWind no resuelve conflictos de utilidades: si quien llama trae su
  // propio fondo o color de borde, omitimos el default para evitar choques.
  const hasBg = /\bbg-/.test(className);
  const hasBorderColor = /\bborder-(?:[a-z]+-\d+|white|transparent|ink)/.test(className);
  return (
    <View
      className={cn(
        "rounded-2xl border p-4 shadow-card",
        !hasBg && "bg-white/75",
        !hasBorderColor && "border-white/80",
        className,
      )}
    >
      {children}
    </View>
  );
}

export function Divider() {
  return <View className="h-px bg-slate-900/10" />;
}

// ---- Acciones ----

export function Button({
  children,
  variant = "primary",
  loading,
  disabled,
  icon: IconComponent,
  onPress,
}: {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  loading?: boolean;
  disabled?: boolean;
  icon?: Icon;
  onPress?: () => void;
}) {
  const variants = {
    primary: "bg-ink shadow-card hover:bg-ink-soft",
    secondary: "border border-white/80 bg-white/75 shadow-card hover:bg-white",
    outline: "border border-slate-900/15 bg-white/50 hover:bg-white/80",
    ghost: "bg-transparent hover:bg-slate-900/5",
    destructive: "bg-red-500 shadow-card hover:bg-red-600",
  };
  const text = {
    primary: "text-white",
    secondary: "text-ink",
    outline: "text-slate-800",
    ghost: "text-slate-500",
    destructive: "text-white",
  };
  const iconColor = variant === "primary" || variant === "destructive" ? "#fff" : "#1E1E1E";
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => Animated.timing(scale, { toValue: 0.97, duration: 110, easing: easeOut, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, speed: 30, bounciness: 7, useNativeDriver: true }).start()}
    >
      <Animated.View
        style={{ transform: [{ scale }] }}
        className={cn(
          "min-h-[50px] flex-row items-center justify-center gap-2 rounded-[14px] px-5",
          variants[variant],
          (disabled || loading) && "opacity-40",
        )}
      >
        {loading ? <ActivityIndicator color={iconColor} /> : IconComponent ? <IconComponent size={18} color={iconColor} strokeWidth={2.3} /> : null}
        {children ? <Text className={cn("text-center text-[15px] font-bold", text[variant])}>{children}</Text> : null}
      </Animated.View>
    </Pressable>
  );
}

export function Checkbox({ label, checked, onPress }: { label: string; checked: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onPress} className="flex-row items-start gap-3">
      <View
        className={cn(
          "mt-0.5 h-6 w-6 items-center justify-center rounded-[8px] border-2",
          checked ? "border-ink bg-ink" : "border-slate-300 bg-white/80",
        )}
      >
        {checked ? (
          <PopIn>
            <Check size={14} color="#fff" strokeWidth={3.2} />
          </PopIn>
        ) : null}
      </View>
      <Text className="flex-1 text-sm leading-6 text-slate-700">{label}</Text>
    </Pressable>
  );
}

// ---- Formularios ----

export function Field({
  label,
  helper,
  error,
  readOnly,
  ...props
}: TextInputProps & { label: string; helper?: string | undefined; error?: string | undefined; readOnly?: boolean | undefined }) {
  return (
    <View className="gap-1.5">
      <Text className="text-[13px] font-semibold text-slate-600">{label}</Text>
      <TextInput
        {...props}
        editable={!readOnly && props.editable !== false}
        placeholderTextColor="#94a3b8"
        className={cn(
          "min-h-[50px] rounded-xl border bg-white/80 px-4 text-base text-slate-950 focus:border-brand-400",
          props.multiline && "min-h-28 py-3",
          error ? "border-red-300" : "border-slate-900/10",
          (readOnly || props.editable === false) && "bg-slate-100/70 text-slate-500",
        )}
      />
      {error ? (
        <Text className="text-[13px] font-semibold text-red-600">{error}</Text>
      ) : helper ? (
        <Text className="text-[13px] text-slate-400">{helper}</Text>
      ) : null}
    </View>
  );
}

// ---- Estado y feedback ----

const tones = {
  success: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-900", sub: "text-emerald-700", dot: "#6AA84F" },
  warning: { bg: "bg-amber-400/15", border: "border-amber-400/30", text: "text-amber-900", sub: "text-amber-700", dot: "#F1C232" },
  danger: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-900", sub: "text-red-700", dot: "#CC0000" },
  info: { bg: "bg-brand-400/10", border: "border-brand-400/25", text: "text-brand-700", sub: "text-brand-600", dot: "#5176F3" },
  neutral: { bg: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-800", sub: "text-slate-600", dot: "#64748b" },
} as const;

export type Tone = keyof typeof tones;

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  const t = tones[tone];
  return (
    <View className={cn("flex-row items-center gap-1.5 self-start rounded-[8px] border px-2 py-1", t.bg, t.border)}>
      <View style={{ backgroundColor: t.dot }} className="h-1.5 w-1.5 rounded-full" />
      <Text className={cn("text-[11px] font-bold", t.text)}>{children}</Text>
    </View>
  );
}

export function InlineAlert({ title, description, tone = "info" }: { title: string; description: string; tone?: Tone }) {
  const t = tones[tone];
  return (
    <View className={cn("gap-0.5 rounded-xl border p-3.5", t.bg, t.border)}>
      <View className="flex-row items-center gap-2">
        <View style={{ backgroundColor: t.dot }} className="h-2 w-2 rounded-full" />
        <Text className={cn("flex-1 text-sm font-bold", t.text)}>{title}</Text>
      </View>
      <Text className={cn("pl-4 text-[13px] leading-5", t.sub)}>{description}</Text>
    </View>
  );
}

export function EmptyState({ title, description, icon: IconComponent }: { title: string; description: string; icon: Icon }) {
  return (
    <View className="items-center gap-3 rounded-2xl border border-dashed border-slate-900/15 bg-white/40 px-6 py-10">
      <PopIn>
        <View className="h-14 w-14 items-center justify-center rounded-[14px] border border-white/80 bg-white/70">
          <IconComponent size={24} color="#94a3b8" />
        </View>
      </PopIn>
      <Text className="text-center text-base font-bold text-slate-800">{title}</Text>
      <Text className="text-center text-[13px] leading-5 text-slate-500">{description}</Text>
    </View>
  );
}

export function Progress({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, { toValue: clamped, duration: 500, easing: easeOut, useNativeDriver: false }).start();
  }, [clamped, width]);

  return (
    <View className="gap-1.5">
      <View className="h-1.5 overflow-hidden rounded-full bg-slate-900/10">
        <Animated.View
          style={{ width: width.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }}
          className="h-full rounded-full bg-brand-500"
        />
      </View>
      <Text className="text-[11px] font-bold text-slate-400">{clamped}% completado</Text>
    </View>
  );
}
