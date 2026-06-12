import { Children, ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Check, ChevronRight, Minus, Paperclip, Pause, Play, Plus, Send, X } from "@/components/paco/glyphs";
import { Button } from "@/components/paco/layout";
import { GlassDarkSurface, GlassIconButton, GlassSheet, GlassSurface, glassInputClass, glassTextAreaClass } from "@/components/paco/glass";
import { fileIconFor } from "@/components/paco/icons";
import { ConfettiBurst, PopIn, PressableScale, Pulse, easeOut } from "@/components/paco/motion";
import { colors, vibrants } from "@/theme/tokens";
import { usePacoStore } from "@/store/paco-store";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const mxn = (value: number) =>
  `$${value.toLocaleString("es-MX", { minimumFractionDigits: value % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;

// ---- Toast global ----

export function ToastHost() {
  const toast = usePacoStore((s) => s.toast);
  const toastStamp = usePacoStore((s) => s.toastStamp);
  const clearToast = usePacoStore((s) => s.clearToast);
  const opacity = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    if (!toast) return;
    opacity.setValue(0);
    lift.setValue(18);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 180, easing: easeOut, useNativeDriver: false }),
      Animated.spring(lift, { toValue: 0, speed: 24, bounciness: 8, useNativeDriver: false }),
    ]).start();
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        Animated.timing(lift, { toValue: 10, duration: 200, useNativeDriver: false }),
      ]).start(() => clearToast());
    }, 2600);
    return () => clearTimeout(timer);
  }, [toast, toastStamp, clearToast, opacity, lift]);

  if (!toast) return null;
  return (
    <Animated.View
      style={{ opacity, pointerEvents: "none", transform: [{ translateY: lift }] }}
      className="absolute bottom-32 left-5 right-5 items-center"
    >
      <GlassDarkSurface material="thick" radius={14} className="max-w-full flex-row items-center gap-2 px-4 py-3 shadow-pop">
        <Check size={15} color="#6AA84F" strokeWidth={3} />
        <Text className="shrink text-[13px] font-semibold text-label-dark-primary">{toast}</Text>
      </GlassDarkSurface>
    </Animated.View>
  );
}

// ---- Listas compactas (densidad Revolut) ----

// Grupo: contenedor glass unico; los hijos quedan separados por hairlines en
// lugar de tarjetas independientes con borde.
export function ListGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const items = Children.toArray(children).filter(Boolean);
  return (
    <GlassSurface material="regular" radius={16} className={cn("overflow-hidden shadow-card", className)}>
      {items.map((child, index) => (
        <View key={index} className={cn(index > 0 && "border-t border-separator")}>
          {child}
        </View>
      ))}
    </GlassSurface>
  );
}

// Fila compacta: icono tintado, titulo + subtitulo de una linea y columna
// derecha para meta (monto, hora) + estado. 56-64 px de alto total.
export function Row({
  icon: IconComponent,
  iconColor = "#2F42CB",
  iconTint = "bg-brand-100",
  leading,
  title,
  subtitle,
  meta,
  metaBold,
  metaSub,
  metaSubColor = "#64748b",
  unread,
  chevron,
  onPress,
  trailing,
}: {
  icon?: Icon | undefined;
  iconColor?: string;
  iconTint?: string;
  leading?: ReactNode;
  title: string;
  subtitle?: string | undefined;
  meta?: string | undefined;
  metaBold?: boolean | undefined;
  metaSub?: string | undefined;
  metaSubColor?: string;
  unread?: boolean | undefined;
  chevron?: boolean | undefined;
  onPress?: (() => void) | undefined;
  trailing?: ReactNode;
}) {
  const content = (
    <View className="flex-row items-center gap-3 px-4 py-3">
      {leading ??
        (IconComponent ? (
          <View className="h-9 w-9 items-center justify-center rounded-[10px] border border-separator bg-white/55">
            <IconComponent size={17} color={iconColor} />
          </View>
        ) : null)}
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          {unread ? <View className="h-1.5 w-1.5 rounded-full bg-accent-400" /> : null}
          <Text className={cn("flex-1 text-[14px] text-slate-900", unread ? "font-bold" : "font-semibold")} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {subtitle ? (
          <Text className="mt-0.5 text-[12px] leading-4 text-ink-muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {meta || metaSub ? (
        <View className="items-end">
          {meta ? <Text className={cn(metaBold ? "text-[13px] font-bold text-slate-900" : "text-[12px] font-semibold text-slate-500")}>{meta}</Text> : null}
          {metaSub ? (
            <Text style={{ color: metaSubColor }} className="mt-0.5 text-[11px] font-semibold">
              {metaSub}
            </Text>
          ) : null}
        </View>
      ) : null}
      {trailing}
      {chevron ? <ChevronRight size={15} color="#cbd5e1" /> : null}
    </View>
  );

  if (!onPress) return content;
  return (
    <PressableScale onPress={onPress} className="transition-colors active:bg-white hover:bg-white/90">
      {content}
    </PressableScale>
  );
}

// ---- Tabs segmentadas con indicador animado ----

export function Segmented({ options, value, onChange }: { options: readonly string[]; value: string; onChange: (option: string) => void }) {
  const [width, setWidth] = useState(0);
  const index = Math.max(0, options.indexOf(value));
  const translate = useRef(new Animated.Value(0)).current;
  const segment = options.length > 0 ? width / options.length : 0;

  useEffect(() => {
    Animated.spring(translate, { toValue: index * segment, useNativeDriver: false, speed: 18, bounciness: 6 }).start();
  }, [index, segment, translate]);

  return (
    <GlassSurface
      variant="light"
      radius={14}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width - 8)}
      className="relative flex-row p-1"
    >
      {segment > 0 ? (
        <Animated.View
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 4,
            width: segment,
            borderRadius: 10,
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 4px 12px rgba(19, 18, 58, 0.10)",
            transform: [{ translateX: translate }],
          }}
        />
      ) : null}
      {options.map((option) => (
        <Pressable
          key={option}
          accessibilityRole="tab"
          onPress={() => onChange(option)}
          className="min-h-10 flex-1 items-center justify-center rounded-[10px] px-2"
        >
          <Text className={cn("text-center text-[13px] font-bold", option === value ? "text-navy" : "text-slate-600")}>{option}</Text>
        </Pressable>
      ))}
    </GlassSurface>
  );
}

export function SelectChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn(
        "min-h-10 justify-center rounded-[10px] border px-3.5 py-2",
        active ? "border-navy bg-navy" : "border-white/80 bg-white/50",
      )}
    >
      <Text className={cn("text-[13px] font-semibold", active ? "text-white" : "text-slate-600")}>{label}</Text>
    </Pressable>
  );
}

export function RadioOption({ label, helper, selected, onPress }: { label: string; helper?: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={cn(
        "flex-row items-start gap-3 rounded-xl border p-3.5",
        selected ? "border-navy/80 bg-white/60 shadow-card" : "border-white/80 bg-white/50",
      )}
    >
      <View className={cn("mt-0.5 h-[22px] w-[22px] items-center justify-center rounded-full border-2", selected ? "border-navy" : "border-slate-300")}>
        {selected ? <View className="h-2.5 w-2.5 rounded-full bg-navy" /> : null}
      </View>
      <View className="flex-1">
        <Text className={cn("text-[15px] font-semibold", selected ? "text-ink" : "text-slate-700")}>{label}</Text>
        {helper ? <Text className="mt-0.5 text-[13px] leading-5 text-slate-500">{helper}</Text> : null}
      </View>
    </Pressable>
  );
}

export function OptionCard({
  title,
  subtitle,
  icon: IconComponent,
  image,
  iconColor = "#2F42CB",
  iconTint = "bg-brand-50",
  selected,
  badge,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon?: Icon | undefined;
  image?: ImageSourcePropType | undefined;
  iconColor?: string;
  iconTint?: string;
  selected?: boolean;
  badge?: ReactNode;
  onPress: () => void;
}) {
  return (
    <PressableScale
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-3 rounded-2xl border p-4 shadow-card",
        selected ? "border-navy/70 bg-white/60" : "border-white/80 bg-white/50",
      )}
    >
      {image ? (
        <View className="h-11 w-11 items-center justify-center rounded-[12px] border border-separator bg-white/55">
          <Image source={image} resizeMode="contain" style={{ width: 30, height: 30 }} />
        </View>
      ) : IconComponent ? (
        <View className="h-11 w-11 items-center justify-center rounded-[12px] border border-separator bg-white/55">
          <IconComponent size={20} color={iconColor} strokeWidth={2.1} />
        </View>
      ) : null}
      <View className="flex-1">
        <Text className={cn("text-[15px] font-bold", selected ? "text-ink" : "text-slate-900")}>{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 text-[13px] leading-5 text-slate-500" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {badge}
    </PressableScale>
  );
}

export function ToggleRow({ label, helper, value, onChange }: { label: string; helper?: string; value: boolean; onChange: (value: boolean) => void }) {
  const slide = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(slide, { toValue: value ? 1 : 0, speed: 26, bounciness: 7, useNativeDriver: true }).start();
  }, [value, slide]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      className="flex-row items-center justify-between gap-3 rounded-xl border border-white/80 bg-white/50 p-3.5"
    >
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-slate-800">{label}</Text>
        {helper ? <Text className="mt-0.5 text-[13px] text-slate-500">{helper}</Text> : null}
      </View>
      <View className={cn("h-7 w-12 justify-center rounded-full px-1", value ? "bg-navy" : "bg-slate-300")}>
        <Animated.View
          style={{ transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) }] }}
          className="h-5 w-5 rounded-full bg-white shadow-card"
        />
      </View>
    </Pressable>
  );
}

// ---- Selector de monto ----

export function AmountSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const segments = 24;
  const ratio = (value - min) / (max - min);
  const setFromIndex = (index: number) => {
    const raw = min + ((max - min) * index) / (segments - 1);
    const snapped = Math.min(max, Math.max(min, Math.round(raw / step) * step));
    onChange(snapped);
  };
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-center gap-3">
        <GlassIconButton label="Disminuir monto" onPress={() => onChange(Math.max(min, value - step))}>
          <Minus size={18} color="#004080" />
        </GlassIconButton>
        <View className="min-w-44 items-center rounded-[16px] bg-navy px-6 py-4 shadow-card">
          <Text className="text-3xl font-bold tracking-tight text-white">{mxn(value)}</Text>
        </View>
        <GlassIconButton label="Aumentar monto" onPress={() => onChange(Math.min(max, value + step))}>
          <Plus size={18} color="#004080" />
        </GlassIconButton>
      </View>
      <View className="flex-row items-center gap-0.5">
        {Array.from({ length: segments }).map((_, index) => (
          <Pressable
            key={index}
            accessibilityLabel={`Posición ${index + 1} del monto`}
            onPress={() => setFromIndex(index)}
            className="h-8 flex-1 justify-center"
          >
            <View className={cn("h-1.5 rounded-full", index / (segments - 1) <= ratio ? "bg-navy" : "bg-slate-900/10")} />
          </Pressable>
        ))}
      </View>
      <View className="flex-row justify-between">
        <Text className="text-xs font-semibold text-slate-400">{mxn(min)}</Text>
        <Text className="text-xs font-semibold text-slate-400">{mxn(max)}</Text>
      </View>
    </View>
  );
}

// ---- Pasos de asistente ----

export function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle?: string }) {
  return (
    <GlassSurface material="regular" className="gap-1.5 p-4 shadow-card">
      <Text className="text-[11px] font-bold uppercase tracking-[1.8px] text-navy">Paso {step} de {total}</Text>
      <Text className="text-xl font-bold leading-7 tracking-tight text-label-primary">{title}</Text>
      {subtitle ? <Text className="text-[13px] leading-5 text-label-secondary">{subtitle}</Text> : null}
      <View className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-900/10">
        <View style={{ width: `${Math.round((step / total) * 100)}%` }} className="h-full rounded-full bg-navy" />
      </View>
    </GlassSurface>
  );
}

export function MoneyRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text className={cn("flex-1 text-sm", strong ? "font-bold text-slate-900" : "text-slate-500")}>{label}</Text>
      <Text className={cn(strong ? "text-lg font-bold text-slate-950" : "text-sm font-semibold text-slate-800")}>{value}</Text>
    </View>
  );
}

export function SuccessCard({ title, description, children, image }: { title: string; description: string; children?: ReactNode; image?: ImageSourcePropType }) {
  return (
    <GlassSurface material="thick" tint="success" radius={16} className="items-center gap-3 p-6">
      <ConfettiBurst />
      <PopIn>
        <View style={{ backgroundColor: vibrants.success.accent }} className="h-16 w-16 items-center justify-center rounded-full shadow-card">
          {image ? <Image source={image} resizeMode="contain" style={{ width: 46, height: 46 }} /> : <Check size={28} color="#fff" strokeWidth={3} />}
        </View>
      </PopIn>
      <Text className="text-center text-xl font-bold tracking-tight text-label-primary">{title}</Text>
      <Text className="text-center text-sm leading-6 text-label-secondary">{description}</Text>
      {children}
    </GlassSurface>
  );
}

// ---- Confirmacion modal ----

export function ConfirmSheet({
  visible,
  title,
  message,
  confirmLabel,
  destructive,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-navy/40 px-6">
        <PopIn>
          <GlassSheet className="w-full max-w-sm">
          <Text className="text-lg font-bold tracking-tight text-slate-950">{title}</Text>
          <Text className="text-sm leading-6 text-slate-600">{message}</Text>
          <View className="mt-2 gap-2">
            <Button variant={destructive ? "destructive" : "primary"} onPress={onConfirm}>
              {confirmLabel}
            </Button>
            <Button variant="ghost" onPress={onCancel}>
              Cancelar
            </Button>
          </View>
          </GlassSheet>
        </PopIn>
      </View>
    </Modal>
  );
}

// ---- Chat ----

export function ChatBubble({ from, text, mine, time, attachment }: { from: string; text: string; mine: boolean; time: string; attachment?: string }) {
  return (
    <View
      className={cn(
        "max-w-[85%] gap-1 rounded-[14px] px-3.5 py-2.5",
        mine ? "self-end rounded-br-[4px] bg-navy" : "self-start rounded-bl-[4px] border border-white/80 bg-white/55 shadow-card",
      )}
    >
      {!mine ? <Text className="text-[11px] font-bold text-brand-600">{from}</Text> : null}
      {attachment ? (
        <View className={cn("flex-row items-center gap-2 rounded-[10px] p-2", mine ? "bg-white/15" : "bg-slate-900/5")}>
          <Paperclip size={13} color={mine ? "#fff" : colors.muted} />
          <Text className={cn("text-xs font-semibold", mine ? "text-label-dark-primary" : "text-label-primary")}>{attachment}</Text>
        </View>
      ) : null}
      <Text className={cn("text-sm leading-5", mine ? "text-label-dark-primary" : "text-label-primary")}>{text}</Text>
      <Text className={cn("self-end text-[10px]", mine ? "text-label-dark-tertiary" : "text-label-tertiary")}>{time}</Text>
    </View>
  );
}

export function ChatComposer({
  onSend,
  onAttach,
  placeholder = "Escribe un mensaje…",
}: {
  onSend: (text: string) => void;
  onAttach?: () => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");
  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };
  return (
    <View className="flex-row items-center gap-2">
      {onAttach ? (
        <GlassIconButton label="Adjuntar archivo" onPress={onAttach}>
          <Paperclip size={17} color="#004080" />
        </GlassIconButton>
      ) : null}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        onSubmitEditing={send}
        className={cn("min-h-11 flex-1 rounded-[12px]", glassInputClass)}
      />
      <Pressable accessibilityLabel="Enviar mensaje" onPress={send} className="h-11 w-11 items-center justify-center rounded-[12px] bg-navy active:opacity-80">
        <Send size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

// ---- Graficas mock (solo Views) ----

export function BarChart({ bars, maxValue = 100 }: { bars: { label: string; value: number; color?: string }[]; maxValue?: number }) {
  return (
    <View className="gap-2">
      <View className="h-36 flex-row items-end gap-2">
        {bars.map((bar, index) => (
          <View key={`${bar.label}-${index}`} className="flex-1 items-center justify-end gap-1">
            <View
              style={{ height: `${Math.max(6, (bar.value / maxValue) * 100)}%`, backgroundColor: bar.color ?? colors.brand }}
              className="w-full max-w-9 rounded-t-[6px]"
            />
          </View>
        ))}
      </View>
      <View className="flex-row gap-2">
        {bars.map((bar, index) => (
          <Text key={`${bar.label}-label-${index}`} className="flex-1 text-center text-[10px] font-semibold text-slate-500" numberOfLines={1}>
            {bar.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function CountBar({ label, count, max, color }: { label: string; count: number; max: number; color?: string }) {
  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-slate-700">{label}</Text>
        <Text className="text-sm font-bold text-slate-900">{count}</Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-slate-900/10">
        <View style={{ width: `${Math.max(4, (count / Math.max(1, max)) * 100)}%`, backgroundColor: color ?? colors.brand }} className="h-full rounded-full" />
      </View>
    </View>
  );
}

export function StackedBar({ slices }: { slices: { label: string; value: number; color: string }[] }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
  return (
    <View className="gap-3">
      <View className="h-4 flex-row overflow-hidden rounded-[6px]">
        {slices.map((slice) => (
          <View key={slice.label} style={{ width: `${(slice.value / total) * 100}%`, backgroundColor: slice.color }} />
        ))}
      </View>
      <View className="gap-1.5">
        {slices.map((slice) => (
          <View key={slice.label} className="flex-row items-center gap-2">
            <View style={{ backgroundColor: slice.color }} className="h-2.5 w-2.5 rounded-[3px]" />
            <Text className="flex-1 text-sm text-slate-600">{slice.label}</Text>
            <Text className="text-sm font-bold text-slate-900">{mxn(slice.value)}</Text>
            <Text className="w-12 text-right text-xs font-semibold text-slate-400">{Math.round((slice.value / total) * 100)}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---- Estatus tipo semaforo ----

const statusColors: Record<string, string> = {
  Pendiente: "#F1C232",
  "En proceso": "#FB4F33",
  Atendido: "#6AA84F",
};

export function StatusDot({ status }: { status: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View style={{ backgroundColor: statusColors[status] ?? colors.muted }} className="h-2.5 w-2.5 rounded-full" />
      <Text className="text-[13px] font-bold text-label-primary">{status}</Text>
    </View>
  );
}

// ---- Archivos ----

export function FileTile({
  name,
  kind,
  size,
  downloaded,
  onDownload,
  actionLabel,
}: {
  name: string;
  kind: string;
  size: string;
  downloaded: boolean;
  onDownload: () => void;
  actionLabel?: string;
}) {
  const FileIcon = fileIconFor(kind);
  return (
    <GlassSurface variant="light" radius={12} className="flex-row items-center gap-3 p-3 shadow-card">
      <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-slate-900/5">
        <FileIcon size={18} color="#475569" strokeWidth={2} />
      </View>
      <View className="flex-1">
        <Text className="text-[13px] font-bold text-slate-900" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-[11px] text-slate-500">
          {kind} · {size}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onDownload}
        style={downloaded ? { borderWidth: 1, borderColor: vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" } : undefined}
        className={cn("min-h-9 justify-center rounded-[10px] px-3", !downloaded && "bg-navy")}
      >
        <Text style={downloaded ? { color: vibrants.success.accent } : undefined} className={cn("text-xs font-bold", !downloaded && "text-white")}>
          {downloaded ? "Descargado" : (actionLabel ?? "Descargar")}
        </Text>
      </Pressable>
    </GlassSurface>
  );
}

// ---- Firma digital mock ----

export function SignatureBox({ signed, signerName, onSign }: { signed: boolean; signerName: string; onSign: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onSign}
      style={signed ? { borderColor: vibrants.success.border, backgroundColor: "rgba(255, 255, 255, 0.55)" } : undefined}
      className={cn(
        "min-h-24 items-center justify-center rounded-xl border-2 border-dashed p-4",
        !signed && "border-slate-900/15 bg-white/50",
      )}
    >
      {signed ? (
        <View className="items-center gap-1">
          <Text style={{ fontStyle: "italic" }} className="text-2xl font-semibold text-label-primary">
            {signerName}
          </Text>
          <Text style={{ color: vibrants.success.accent }} className="text-xs font-bold">Firma capturada</Text>
        </View>
      ) : (
        <Text className="text-sm font-semibold text-label-tertiary">Toca aquí para estampar tu firma digital</Text>
      )}
    </Pressable>
  );
}

// ---- Widget flotante de ayuda (4 circulos) ----

export function HelpFab({ onPress }: { onPress: () => void }) {
  return (
    <GlassIconButton label="¿Necesitas ayuda?" onPress={onPress} className="absolute right-5 top-14">
      <View className="flex-row flex-wrap" style={{ width: 16 }}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={{ margin: 1 }} className="h-1.5 w-1.5 rounded-full bg-navy" />
        ))}
      </View>
    </GlassIconButton>
  );
}

// ---- Audio player mock ----

export function AudioPlayer({ name, duration, playing, onToggle, progress }: { name: string; duration: string; playing: boolean; onToggle: () => void; progress: number }) {
  return (
    <GlassSurface variant="light" radius={12} className="gap-2 p-3 shadow-card">
      <View className="flex-row items-center gap-3">
        <Pressable
          accessibilityLabel={playing ? "Pausar audio" : "Reproducir audio"}
          onPress={onToggle}
        >
          <Pulse active={playing}>
            <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-navy">
              {playing ? <Pause size={16} color="#fff" /> : <Play size={16} color="#fff" />}
            </View>
          </Pulse>
        </Pressable>
        <View className="flex-1">
          <Text className="text-[13px] font-bold text-slate-900" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-[11px] text-slate-500">{duration}</Text>
        </View>
      </View>
      <View className="h-1.5 overflow-hidden rounded-full bg-slate-900/10">
        <View style={{ width: `${progress}%` }} className="h-full rounded-full bg-brand-500" />
      </View>
    </GlassSurface>
  );
}

// ---- Cabecera de modal simple ----

export function SheetHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-xl font-bold tracking-tight text-slate-950">{title}</Text>
      <Pressable accessibilityLabel="Cerrar" onPress={onClose} className="h-10 w-10 items-center justify-center rounded-[12px] bg-slate-900/5">
        <X size={17} color={colors.muted} />
      </Pressable>
    </View>
  );
}

export type { Icon };
