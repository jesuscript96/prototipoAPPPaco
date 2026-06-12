// Sistema visual Paco · light glass. Lenguaje inspirado en el design system de
// Apple (materiales translucidos sobre un fondo ambiental) aplicado a una app
// corporativa de uso diario: superficies bg-white/70 con borde claro, radios
// contenidos (12-16 px), tipografia densa y acentos por dominio.

import { ComponentType, ReactNode, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Image, Platform, Pressable, ScrollView, Text, TextInput, TextInputProps, View, type ViewStyle } from "react-native";
import { cssInterop } from "nativewind";
import type { ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "@/components/paco/glyphs";
import { GlassNavButton, GlassSurface, glassInputClass, glassInputRowClass, glassTextAreaClass } from "@/components/paco/glass";
export { glassInputClass, glassTextAreaClass, glassInputRowClass };
import { FadeSlideIn, PopIn, easeOut } from "@/components/paco/motion";
import { textClass } from "@/theme/typography";
import { colors, vibrants, type VibrantTone } from "@/theme/tokens";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

cssInterop(Animated.View, { className: "style" });

const blur = (px: number) => (Platform.OS === "web" ? ({ filter: `blur(${px}px)` } as object) : null);

// Fondo ambiental: manchas de color suaves sobre el lienzo claro, para que las
// superficies glass tengan algo que dejar traslucir.
export function Ambient() {
  return (
    <View style={{ pointerEvents: "none" }} className="absolute inset-0 overflow-hidden">
      <View className="absolute inset-0 bg-brand-300/30" />
      <View style={blur(72)} className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-brand-500/40" />
      <View style={blur(72)} className="absolute -left-36 top-32 h-96 w-96 rounded-full bg-brand-400/45" />
      <View style={blur(80)} className="absolute right-[-80px] top-[340px] h-80 w-80 rounded-full bg-violet-500/30" />
      <View style={blur(64)} className="absolute left-[-40px] top-[520px] h-72 w-72 rounded-full bg-navy/20" />
      <View style={blur(56)} className="absolute bottom-16 left-0 right-0 h-48 bg-brand-400/28" />
      <View style={blur(48)} className="absolute -right-12 bottom-32 h-56 w-56 rounded-full bg-navy-soft/25" />
    </View>
  );
}

export { GlassNavButton };

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
            {eyebrow ? <Text className={textClass.eyebrow}>{eyebrow}</Text> : null}
            {title ? <Text className={textClass.hero}>{title}</Text> : null}
            {description ? <Text className={textClass.subtitle}>{description}</Text> : null}
          </View>
        ) : null}
        <FadeSlideIn className="flex-1">
          <View className="flex-1 gap-4 px-5 pb-40 pt-2">{children}</View>
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
        <Text className={textClass.section}>{title}</Text>
        {description ? <Text className={textClass.caption}>{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Bypass del glass solo para fondos de marca explícitos (navy/ink/white).
  // Los tintes semánticos (bg-emerald-50, bg-amber-50…) ya NO escapan al
  // material: el color de estado es acento, nunca relleno (Liquid Glass).
  const hasBrandBg = /\bbg-(?:navy|ink|white)\b|\bbg-(?:navy|ink)\//.test(className);
  if (hasBrandBg) {
    return <View className={cn("rounded-2xl border border-transparent p-4 shadow-card", className)}>{children}</View>;
  }
  return (
    <GlassSurface material="regular" radius={16} className={cn("p-4 shadow-card", className)}>
      {children}
    </GlassSurface>
  );
}

export function Divider() {
  return <View className="h-px bg-separator" />;
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
  const solidFill: Partial<Record<typeof variant, ViewStyle>> = {
    primary: { backgroundColor: colors.navy },
    destructive: { backgroundColor: colors.danger },
  };
  const textColor: Partial<Record<typeof variant, string>> = {
    primary: "#ffffff",
    destructive: "#ffffff",
    secondary: colors.navy,
    outline: colors.text,
    ghost: colors.muted,
  };
  const variants = {
    primary: "shadow-card active:opacity-90",
    secondary: "border border-white/80 bg-white/50 shadow-card hover:bg-white/70",
    outline: "border border-slate-900/15 bg-white/50 hover:bg-white/60",
    ghost: "bg-transparent hover:bg-slate-900/5",
    destructive: "shadow-card active:opacity-90",
  };
  const text = {
    primary: "text-white",
    secondary: "text-navy",
    outline: "text-slate-800",
    ghost: "text-slate-500",
    destructive: "text-white",
  };
  const iconColor = variant === "primary" || variant === "destructive" ? "#fff" : colors.navy;
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
        style={[{ transform: [{ scale }] }, solidFill[variant]]}
        className={cn(
          "min-h-[50px] flex-row items-center justify-center gap-2 rounded-[14px] px-5",
          variants[variant],
          (disabled || loading) && "opacity-40",
        )}
      >
        {loading ? <ActivityIndicator color={iconColor} /> : IconComponent ? <IconComponent size={18} color={iconColor} strokeWidth={2.3} /> : null}
        {children ? (
          <Text
            style={{ color: textColor[variant] }}
            className={cn("text-center", textClass.button, text[variant])}
          >
            {children}
          </Text>
        ) : null}
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
          checked ? "border-navy bg-navy" : "border-slate-300 bg-white/50",
        )}
      >
        {checked ? (
          <PopIn>
            <Check size={14} color="#fff" strokeWidth={3.2} />
          </PopIn>
        ) : null}
      </View>
      <Text className={cn(textClass.bodySm, "flex-1")}>{label}</Text>
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
      <Text className={textClass.label}>{label}</Text>
      <TextInput
        {...props}
        editable={!readOnly && props.editable !== false}
        placeholderTextColor="#94a3b8"
        className={cn(
          glassInputClass,
          "focus:border-brand-400",
          props.multiline && "min-h-28 py-3",
          error ? "border-danger/30" : "",
          (readOnly || props.editable === false) && "bg-slate-100/70 text-slate-500",
        )}
      />
      {error ? (
        <Text className="text-[13px] font-semibold text-danger">{error}</Text>
      ) : helper ? (
        <Text className="text-[13px] text-label-tertiary">{helper}</Text>
      ) : null}
    </View>
  );
}

// ---- Estado y feedback ----
//
// Liquid Glass: el estatus se comunica con dot/icono + borde + texto sobre
// material glass. El color semántico nunca es relleno; `vibrants[tone].wash`
// (≤8% alpha) es el único tinte de fondo permitido y vive dentro del vidrio.

export type Tone = VibrantTone;

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  const v = vibrants[tone];
  return (
    <View
      style={{ borderColor: v.border, backgroundColor: "rgba(255, 255, 255, 0.55)" }}
      className="flex-row items-center gap-1.5 self-start rounded-[8px] border px-2 py-1"
    >
      <View style={{ backgroundColor: v.accent }} className="h-1.5 w-1.5 rounded-full" />
      <Text className={cn(textClass.badge, "text-label-primary")}>{children}</Text>
    </View>
  );
}

export function InlineAlert({ title, description, tone = "info" }: { title: string; description: string; tone?: Tone }) {
  const v = vibrants[tone];
  return (
    <GlassSurface material="thick" tint={tone} radius={12} className="gap-0.5 p-3.5">
      <View className="flex-row items-center gap-2">
        <View style={{ backgroundColor: v.accent }} className="h-2 w-2 rounded-full" />
        <Text className="flex-1 font-sans text-sm font-semibold leading-relaxed text-label-primary">{title}</Text>
      </View>
      <Text className="pl-4 font-sans text-xs leading-normal text-label-secondary">{description}</Text>
    </GlassSurface>
  );
}

export function EmptyState({
  title,
  description,
  icon: IconComponent,
  image,
}: {
  title: string;
  description: string;
  icon: Icon;
  image?: ImageSourcePropType;
}) {
  return (
    <GlassSurface variant="light" className="items-center gap-3 border-dashed border-slate-900/15 px-6 py-10">
      <PopIn>
        <View className="h-20 w-20 items-center justify-center rounded-[18px] border border-white/80 bg-white/70">
          {image ? <Image source={image} resizeMode="contain" style={{ width: 58, height: 58 }} /> : <IconComponent size={28} color="#94a3b8" />}
        </View>
      </PopIn>
      <Text className={cn(textClass.h3, "text-center")}>{title}</Text>
      <Text className={cn(textClass.caption, "text-center")}>{description}</Text>
    </GlassSurface>
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
      <Text className={cn(textClass.caption, "font-medium text-slate-400")}>{clamped}% completado</Text>
    </View>
  );
}
