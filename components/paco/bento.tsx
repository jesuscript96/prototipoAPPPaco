// Bento Grid de la Home · jerarquía por tamaño y color de categoría.
//
// Principios:
// - El icono nunca va en caja con borde: flota libre sobre una "manchita"
//   orgánica (blob sin borde, alpha bajo) del color de su categoría.
// - La manchita se descentra y deforma de manera determinista (seed) para que
//   el conjunto se sienta casi aleatorio pero estable entre renders.
// - Tres tamaños: hero (ancho completo con acción directa), half (48.5%) y
//   mini (pastilla compacta para módulos secundarios).

import { ReactNode } from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { useRouter, type Href } from "expo-router";
import { GlassSurface } from "@/components/paco/glass";
import { PressableScale } from "@/components/paco/motion";
import { iconBlobShapes, type Icon } from "@/components/paco/icons";

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export type BentoDomain = "finance" | "people" | "docs" | "support";

/** Acentos por categoría: la manchita es el único fondo de color permitido. */
export const bentoAccents: Record<BentoDomain, { blob: string; blobAlt: string; accent: string }> = {
  finance: { blob: "rgba(14, 116, 144, 0.16)", blobAlt: "rgba(46, 139, 87, 0.14)", accent: "#0E7490" },
  people: { blob: "rgba(251, 146, 60, 0.20)", blobAlt: "rgba(248, 113, 113, 0.14)", accent: "#C2410C" },
  docs: { blob: "rgba(103, 78, 167, 0.15)", blobAlt: "rgba(100, 116, 139, 0.13)", accent: "#674EA7" },
  support: { blob: "rgba(81, 118, 243, 0.13)", blobAlt: "rgba(100, 116, 139, 0.10)", accent: "#33415C" },
};

// Variantes de manchita: compartidas con AssetIconBubble (icons.tsx) para que
// todo icono libre del sistema use las mismas formas orgánicas.
const blobShapes = iconBlobShapes;

/**
 * Icono libre sobre manchita. Acepta un asset PNG (`source`) o un glifo
 * lucide (`glyph`) para las listas de gestión.
 */
export function BentoIcon({
  source,
  glyph: Glyph,
  domain,
  size = 48,
  seed = 0,
}: {
  source?: ImageSourcePropType;
  glyph?: Icon;
  domain: BentoDomain;
  size?: number;
  seed?: number;
}) {
  const palette = bentoAccents[domain];
  const shape = blobShapes[seed % blobShapes.length] ?? blobShapes[0];
  const blob = size * shape.scale;
  const altSize = blob * shape.alt.size;
  const box = size + 12;
  const pad = 6;
  // Los offsets están calibrados para size 48; se escalan para que la mancha
  // nunca se salga del box en tamaños chicos (pills) y no la recorte el clip.
  const k = size / 48;

  return (
    <View style={{ width: box, height: box }} className="items-center justify-center">
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: blob,
          height: blob,
          left: pad + shape.dx * k,
          top: pad + shape.dy * k,
          backgroundColor: palette.blob,
          borderTopLeftRadius: blob * shape.tl,
          borderTopRightRadius: blob * shape.tr,
          borderBottomRightRadius: blob * shape.br,
          borderBottomLeftRadius: blob * shape.bl,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: altSize,
          height: altSize,
          left: pad + blob * shape.alt.dx,
          top: pad + blob * shape.alt.dy,
          borderRadius: altSize / 2,
          backgroundColor: palette.blobAlt,
        }}
      />
      {source ? (
        <Image source={source} resizeMode="contain" style={{ width: size, height: size }} />
      ) : Glyph ? (
        <Glyph size={size * 0.62} color={palette.accent} strokeWidth={2.1} />
      ) : null}
    </View>
  );
}

/** Chip de acción directa dentro de una tarjeta bento. */
export function BentoActionChip({
  label,
  onPress,
  tone = "navy",
}: {
  label: string;
  onPress?: () => void;
  tone?: "navy" | "done";
}) {
  const inner = (
    <View
      className={cn(
        "min-h-[36px] flex-row items-center justify-center rounded-full px-4 py-2",
        tone === "navy" ? "bg-navy" : "border border-emerald-600/30 bg-white/60",
      )}
    >
      <Text className={cn("text-[12px] font-bold", tone === "navy" ? "text-white" : "text-emerald-700")}>{label}</Text>
    </View>
  );
  if (!onPress) return inner;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} fluid={false}>
      {inner}
    </PressableScale>
  );
}

/**
 * Tarjeta hero: ancho completo, horizontal, con dato vivo y zona de acción
 * directa (children).
 */
export function BentoHeroTile({
  icon,
  domain,
  seed = 0,
  title,
  subtitle,
  onPress,
  accessibilityLabel,
  trailing,
  children,
}: {
  icon: ImageSourcePropType;
  domain: BentoDomain;
  seed?: number;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  trailing?: ReactNode;
  children?: ReactNode;
}) {
  const body = (
    <GlassSurface material="regular" radius={18} className="p-4 shadow-card">
      <View className="flex-row items-center gap-3.5">
        <BentoIcon source={icon} domain={domain} size={54} seed={seed} />
        <View className="flex-1">
          <Text className="text-[16px] font-bold tracking-tight text-label-primary" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="mt-0.5 text-[12px] font-semibold text-ink-muted" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {trailing}
      </View>
      {children ? <View className="mt-3">{children}</View> : null}
    </GlassSurface>
  );

  if (!onPress) return body;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={accessibilityLabel ?? title}>
      {body}
    </PressableScale>
  );
}

/** Tarjeta media (48.5% — el ancho lo da el wrapper en Home). */
export function BentoHalfTile({
  icon,
  domain,
  seed = 0,
  title,
  meta,
  href,
  accessibilityLabel,
}: {
  icon: ImageSourcePropType;
  domain: BentoDomain;
  seed?: number;
  title: string;
  meta?: string;
  href: Href;
  accessibilityLabel?: string;
}) {
  const router = useRouter();
  return (
    <PressableScale onPress={() => router.push(href)} accessibilityLabel={accessibilityLabel ?? title} className="w-full">
      <GlassSurface material="regular" radius={18} className="p-4 shadow-card" style={{ minHeight: 118 }}>
        <BentoIcon source={icon} domain={domain} size={42} seed={seed} />
        <Text className="mt-2 text-[14px] font-bold leading-[18px] text-label-primary" numberOfLines={2}>
          {title}
        </Text>
        {meta ? (
          <Text className="mt-0.5 text-[11px] font-semibold text-ink-muted" numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
      </GlassSurface>
    </PressableScale>
  );
}

/** Acceso mini: pastilla compacta icono + label para módulos secundarios. */
export function BentoMini({
  icon,
  domain,
  seed = 0,
  label,
  href,
}: {
  icon: ImageSourcePropType;
  domain: BentoDomain;
  seed?: number;
  label: string;
  href: Href;
}) {
  const router = useRouter();
  return (
    <PressableScale onPress={() => router.push(href)} accessibilityLabel={label} fluid={false}>
      <GlassSurface material="thin" radius={999} className="flex-row items-center gap-1.5 px-4 py-1">
        <BentoIcon source={icon} domain={domain} size={24} seed={seed} />
        <Text className="shrink text-[12px] font-bold text-label-primary" numberOfLines={1}>
          {label}
        </Text>
      </GlassSurface>
    </PressableScale>
  );
}
