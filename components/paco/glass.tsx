// Motor de materiales · Visual 6.0 Liquid Glass
//
// Escala de 5 grosores estilo Apple (ultraThin → ultraThick) definida en
// theme/tokens.ts. Guía de uso:
// - ultraThin / thin: solo elementos flotantes sobre fondos controlados
//   (chips, search bars, meta). Evitar sobre fondos claros con detalle.
// - regular: estándar para cards de contenido.
// - thick: banners de estado, dock y superficies sobre fondo impredecible.
// - ultraThick: sheets, modales y texto denso sobre fondos muy claros.
//
// Reglas del sistema:
// - El color semántico nunca es relleno; es acento (dot/icono/borde). El único
//   fondo tintado permitido es `tint` (wash ≤8% alpha) sobre un material.
// - Todo contenedor glass lleva borde 1px (capa de separación) + highlight
//   superior en web.
// - Reduce Transparency: cada material rinde su `fallback` opaco, sin blur,
//   con borde `opaqueSeparator`.
// - Performance: no anidar más de 2 BlurView por pantalla; usar `noBlur`
//   cuando el padre ya blurrea.
//
// Web: backdrop-filter. Nativo: expo-blur BlurView + overlay.

import { ComponentType, Children, ReactNode, isValidElement } from "react";
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { BlurView } from "expo-blur";
import { useRouter, type Href } from "expo-router";
import { AssetIconBubble } from "@/components/paco/icons";
import { PressableScale } from "@/components/paco/motion";
import { useReduceTransparency } from "@/components/paco/a11y";
import {
  glass as glassTokens,
  materials,
  materialsDark,
  moduleTileHeight,
  separators,
  vibrants,
  type DarkMaterialName,
  type MaterialName,
  type VibrantTone,
} from "@/theme/tokens";

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const whiteAlpha = (alpha: number) => `rgba(255, 255, 255, ${alpha})`;
const navyAlpha = (alpha: number) => `rgba(0, 64, 128, ${alpha})`;

export type GlassTint = VibrantTone | "none";

/** @deprecated API previa (Visual 5.0); usar `material` + `tint`. */
type GlassVariant = "light" | "info" | "elevated";

const legacyVariantMap: Record<GlassVariant, { material: MaterialName; tint: GlassTint }> = {
  light: { material: "regular", tint: "none" },
  info: { material: "regular", tint: "info" },
  elevated: { material: "thick", tint: "none" },
};

type GlassSurfaceProps = {
  children: ReactNode;
  /** Grosor del material (default "regular"). */
  material?: MaterialName;
  /** Wash semántico ≤8% alpha sobre el material; el acento va en contenido/borde. */
  tint?: GlassTint;
  /** @deprecated Mapeo legacy: light→regular, info→regular+info, elevated→thick. */
  variant?: GlassVariant;
  radius?: number;
  className?: string;
  style?: ViewStyle;
  /** Evita BlurView interno cuando el padre ya blurrea (performance) */
  noBlur?: boolean;
  onLayout?: (event: { nativeEvent: { layout: { width: number; height: number } } }) => void;
};

function webGlassStyle(blur: number, bg: string): ViewStyle {
  return {
    backgroundColor: bg,
    ...(Platform.OS === "web"
      ? ({
          backdropFilter: `saturate(180%) blur(${blur}px)`,
          WebkitBackdropFilter: `saturate(180%) blur(${blur}px)`,
          boxShadow: `${glassTokens.shadow}, inset 0 1px 0 ${separators.glassEdge}`,
        } as ViewStyle)
      : {}),
  };
}

export function GlassSurface({
  children,
  material,
  tint,
  variant,
  radius = 16,
  className = "",
  style,
  noBlur = false,
  onLayout,
}: GlassSurfaceProps) {
  const legacy = legacyVariantMap[variant ?? "light"];
  const materialName = material ?? legacy.material;
  const tintName = tint ?? legacy.tint;
  const spec = materials[materialName];
  const wash = tintName !== "none" ? vibrants[tintName] : null;
  const reduced = useReduceTransparency();

  const rounded = { borderRadius: radius, overflow: "hidden" as const };
  const borderColor = reduced ? separators.opaqueSeparator : wash ? wash.border : separators.separator;

  // Reduce Transparency: superficie sólida, sin blur, borde opaco.
  if (reduced) {
    return (
      <View
        onLayout={onLayout}
        style={[rounded, { borderWidth: 1, borderColor, backgroundColor: spec.fallback }, style]}
        className={className}
      >
        {wash ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: wash.wash }]} /> : null}
        {children}
      </View>
    );
  }

  if (Platform.OS === "web") {
    return (
      <View
        onLayout={onLayout}
        style={[rounded, webGlassStyle(spec.blur, whiteAlpha(spec.webAlpha)), { borderWidth: 1, borderColor }, style]}
        className={cn("shadow-glass", className)}
      >
        {wash ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: wash.wash }]} /> : null}
        {children}
      </View>
    );
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        rounded,
        { borderWidth: 1, borderColor, shadowColor: "#004080", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 6 },
        style,
      ]}
      className={className}
    >
      {!noBlur ? <BlurView intensity={spec.intensity} tint="light" style={StyleSheet.absoluteFill} /> : null}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: whiteAlpha(spec.overlayAlpha) }]} />
      {wash ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: wash.wash }]} /> : null}
      {children}
    </View>
  );
}

/**
 * Material oscuro navy para heroes, toasts y burbujas propias.
 * Texto interior: usar jerarquía labelsOnDark (white/98, /72, /45...).
 */
export function GlassDarkSurface({
  children,
  material = "regular",
  radius = 16,
  className = "",
  style,
  noBlur = false,
}: {
  children: ReactNode;
  material?: DarkMaterialName;
  radius?: number;
  className?: string;
  style?: ViewStyle;
  noBlur?: boolean;
}) {
  const spec = materialsDark[material];
  const reduced = useReduceTransparency();
  const rounded = { borderRadius: radius, overflow: "hidden" as const };

  if (reduced) {
    return (
      <View style={[rounded, { borderWidth: 1, borderColor: separators.opaqueSeparator, backgroundColor: spec.fallback }, style]} className={className}>
        {children}
      </View>
    );
  }

  if (Platform.OS === "web") {
    return (
      <View
        style={[
          rounded,
          { borderWidth: 1, borderColor: glassTokens.navyGlassBorder },
          webGlassStyle(spec.blur, navyAlpha(spec.webAlpha)),
          { boxShadow: `${glassTokens.shadow}, inset 0 1px 0 rgba(255,255,255,0.35)` } as ViewStyle,
          style,
        ]}
        className={cn("shadow-glass", className)}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        rounded,
        {
          borderWidth: 1,
          borderColor: glassTokens.navyGlassBorder,
          shadowColor: "#004080",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.18,
          shadowRadius: 20,
          elevation: 8,
        },
        style,
      ]}
      className={className}
    >
      {!noBlur ? <BlurView intensity={spec.intensity} tint="dark" style={StyleSheet.absoluteFill} /> : null}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: navyAlpha(spec.overlayAlpha) }]} />
      {children}
    </View>
  );
}

export function GlassHero({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <GlassDarkSurface material="regular" radius={16} className={cn("p-5", className)}>
      <View pointerEvents="none" className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/20" />
      <View className="relative gap-3">
        {eyebrow ? <Text className="text-[11px] font-bold uppercase tracking-[1.8px] text-label-dark-secondary">{eyebrow}</Text> : null}
        <Text className="text-[28px] font-bold leading-tight tracking-tight text-label-dark-primary">{title}</Text>
        {subtitle ? <Text className="text-[15px] leading-relaxed text-label-dark-secondary">{subtitle}</Text> : null}
        {children}
      </View>
    </GlassDarkSurface>
  );
}

export function GlassDock({
  children,
  className = "",
  style,
  onLayout,
}: {
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
  onLayout?: (event: { nativeEvent: { layout: { width: number; height: number } } }) => void;
}) {
  const radius = 20;
  const spec = materials.thick;
  const reduced = useReduceTransparency();

  if (reduced) {
    return (
      <View
        onLayout={onLayout}
        style={[
          { borderRadius: radius, overflow: "hidden", borderWidth: 1, borderColor: separators.opaqueSeparator, backgroundColor: spec.fallback },
          { shadowColor: "#004080", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.18, shadowRadius: 24, elevation: 18 },
          style,
        ]}
        className={className}
      >
        {children}
      </View>
    );
  }

  if (Platform.OS === "web") {
    return (
      <View
        onLayout={onLayout}
        style={[
          { borderRadius: radius, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.72)" },
          webGlassStyle(spec.blur + 8, whiteAlpha(spec.webAlpha - 0.12)),
          {
            boxShadow: "0 16px 48px rgba(0, 64, 128, 0.2), inset 0 1px 0 rgba(255,255,255,0.85)",
          } as ViewStyle,
          style,
        ]}
        className={cn(className)}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        {
          borderRadius: radius,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.65)",
          shadowColor: "#004080",
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 0.24,
          shadowRadius: 32,
          elevation: 24,
        },
        style,
      ]}
      className={className}
    >
      <BlurView intensity={spec.intensity} tint="light" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: glassTokens.dockBg }]} />
      {children}
    </View>
  );
}

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

export function GlassNavButton({ icon: IconComponent, label, onPress }: { icon: Icon; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={label} onPress={onPress}>
      <GlassSurface material="regular" radius={22} className="h-11 w-11 items-center justify-center shadow-card">
        <IconComponent size={19} color="#004080" strokeWidth={2.2} />
      </GlassSurface>
    </Pressable>
  );
}

export function GlassChip({
  label,
  active,
  onPress,
  className = "",
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  className?: string;
}) {
  const reduced = useReduceTransparency();
  const inner = (
    <View
      style={!active ? { borderColor: separators.separator, backgroundColor: reduced ? materials.thin.fallback : whiteAlpha(0.7) } : undefined}
      className={cn(
        "min-h-[36px] items-center justify-center rounded-full border px-4 py-2",
        active ? "border-navy bg-navy" : "",
        className,
      )}
    >
      <Text className={cn("text-[13px] font-semibold", active ? "text-label-dark-primary" : "text-label-primary")}>{label}</Text>
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {inner}
    </Pressable>
  );
}

export function GlassChoiceGrid({ children, columns = 3, gap = 10 }: { children: ReactNode; columns?: 2 | 3 | 4; gap?: number }) {
  const widthPercent = columns === 2 ? "48%" : columns === 4 ? "23.5%" : "31%";
  return (
    <View className="w-full flex-row flex-wrap" style={{ gap }}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null;
        return (
          <View key={child.key ?? `choice-${index}`} style={{ width: widthPercent }}>
            {child}
          </View>
        );
      })}
    </View>
  );
}

export function GlassModuleTile({
  title,
  icon,
  iconTint = "bg-brand-100",
  href,
  core,
  accessibilityLabel,
  className = "",
}: {
  title: string;
  icon?: ImageSourcePropType;
  iconTint?: string;
  href: Href;
  core?: boolean;
  accessibilityLabel?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <PressableScale
      onPress={() => router.push(href)}
      accessibilityLabel={accessibilityLabel ?? title}
      className={cn("w-full", className)}
    >
      <GlassSurface material="regular" radius={16} className={cn("p-4 shadow-card", className)} style={{ height: moduleTileHeight }}>
        <View className="flex-row items-start justify-between">
          {icon ? <AssetIconBubble source={icon} tint={iconTint} size={56} imageSize={44} /> : <View className="h-14 w-14" />}
          {core ? (
            <View className="rounded-[6px] bg-navy px-1.5 py-0.5">
              <Text className="text-[8px] font-bold tracking-wide text-accent-400">CORE</Text>
            </View>
          ) : (
            <View className="w-8" />
          )}
        </View>
        <Text className="mt-2 h-[40px] text-[15px] font-bold leading-5 text-label-primary" numberOfLines={2}>
          {title}
        </Text>
      </GlassSurface>
    </PressableScale>
  );
}

/** Sheet elevado (modales, confirmaciones) — ultraThick: fondo impredecible detrás */
export function GlassSheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface material="ultraThick" radius={20} className={cn("gap-2.5 p-5 shadow-pop", className)}>
      {children}
    </GlassSurface>
  );
}

/** Sheet inferior deslizable — ultraThick para texto denso */
export function GlassBottomSheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <View className={cn("max-h-[85%] overflow-hidden rounded-t-[20px]", className)}>
      <GlassSurface material="ultraThick" radius={20} className="gap-3 p-5 pb-8">
        <View className="mx-auto mb-1 h-1.5 w-12 rounded-full bg-slate-300/80" />
        {children}
      </GlassSurface>
    </View>
  );
}

/** Barra de búsqueda glass — thin: elemento flotante compacto */
export function GlassSearchBar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface material="thin" radius={16} className={cn("flex-row items-center gap-2 px-3 py-2", className)}>
      {children}
    </GlassSurface>
  );
}

/** Header de conversación (chat / voz) — thick: protege contraste al hacer scroll */
export function GlassConversationHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface material="thick" radius={0} className={cn("border-b border-glass-edge px-4 pb-3 pt-12", className)} noBlur>
      {children}
    </GlassSurface>
  );
}

/** Footer composer de conversación */
export function GlassConversationFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface material="thick" radius={0} className={cn("border-t border-glass-edge px-4 py-3", className)} noBlur>
      {children}
    </GlassSurface>
  );
}

/** Botón circular glass compacto */
export function GlassIconButton({
  children,
  label,
  onPress,
  className = "",
}: {
  children: ReactNode;
  label: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable accessibilityLabel={label} onPress={onPress} className={className}>
      <GlassSurface material="regular" radius={12} className="h-11 w-11 items-center justify-center shadow-card">
        {children}
      </GlassSurface>
    </Pressable>
  );
}

/** Clases glass para TextInput */
export const glassInputClass = "min-h-[50px] rounded-xl border border-white/80 bg-white/50 px-4 font-sans text-base text-slate-950";
export const glassTextAreaClass = "min-h-24 rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-base text-slate-950";
export const glassInputRowClass = "flex-row items-center rounded-xl border border-white/80 bg-white/50 pr-2";

export function GlassInputShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <GlassSurface material="thin" radius={12} className={cn("min-h-[50px] justify-center px-4", className)}>
      {children}
    </GlassSurface>
  );
}
