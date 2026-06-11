import { ComponentType, ReactNode, useState } from "react";
import {
  ActivityIndicator,
  Modal as RNModal,
  Pressable,
  ScrollView,
  Switch as RNSwitch,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Link, LinkProps } from "expo-router";
import { Check, ChevronDown, ChevronRight, Paperclip, X } from "lucide-react-native";
import { colors, semantic } from "@/theme/tokens";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
type Tone = keyof typeof semantic;

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

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
  return (
    <ScrollView className="flex-1 bg-canvas" contentContainerClassName="px-5 pb-12 pt-4">
      {(title || description || action) && (
        <View className="mb-5 gap-2">
          {eyebrow ? <Text className="text-xs font-bold uppercase tracking-[1.5px] text-brand-600">{eyebrow}</Text> : null}
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              {title ? <Text className="text-3xl font-bold tracking-tight text-slate-950">{title}</Text> : null}
              {description ? <Text className="mt-2 text-base leading-6 text-slate-600">{description}</Text> : null}
            </View>
            {action}
          </View>
        </View>
      )}
      <View className="gap-4">{children}</View>
    </ScrollView>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-3">
      <View>
        <Text className="text-xl font-bold text-slate-950">{title}</Text>
        {description ? <Text className="mt-1 text-sm leading-5 text-slate-600">{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <View className={cn("rounded-3xl border border-slate-200 bg-white p-4 shadow-sm", className)}>{children}</View>;
}

export function GuideNote() {
  return (
    <Card className="gap-2">
      <Text className="text-sm font-bold text-slate-900">Guía UX</Text>
      <Text className="text-sm leading-5 text-slate-600">
        Úsalo cuando reduzca fricción y haga evidente el siguiente paso. Evítalo si compite con la acción principal,
        si depende solo del color o si ocupa más atención que la tarea. Mantén copy humano, targets de al menos 44 px,
        contraste suficiente y estados de carga, vacío y error.
      </Text>
    </Card>
  );
}

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
  const base = "min-h-12 flex-row items-center justify-center gap-2 rounded-2xl px-4";
  const variants = {
    primary: "bg-brand-500",
    secondary: "bg-brand-50",
    outline: "border border-slate-300 bg-white",
    ghost: "bg-transparent",
    destructive: "bg-red-600",
  };
  const text = {
    primary: "text-white",
    secondary: "text-brand-700",
    outline: "text-slate-800",
    ghost: "text-slate-700",
    destructive: "text-white",
  };
  const iconColor = variant === "primary" || variant === "destructive" ? "#fff" : colors.brand;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(base, variants[variant], (disabled || loading) && "opacity-50")}
    >
      {loading ? <ActivityIndicator color={iconColor} /> : IconComponent ? <IconComponent size={18} color={iconColor} /> : null}
      {children ? <Text className={cn("text-center text-base font-bold", text[variant])}>{children}</Text> : null}
    </Pressable>
  );
}

export function IconButton({ icon: IconComponent, label, onPress }: { icon: Icon; label: string; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white"
    >
      <IconComponent size={20} color={colors.brand} />
    </Pressable>
  );
}

export function Field({
  label,
  helper,
  error,
  readOnly,
  ...props
}: TextInputProps & { label: string; helper?: string | undefined; error?: string | undefined; readOnly?: boolean | undefined }) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-slate-700">{label}</Text>
      <TextInput
        {...props}
        editable={!readOnly && props.editable !== false}
        placeholderTextColor="#94a3b8"
        className={cn(
          "min-h-12 rounded-2xl border bg-white px-4 text-base text-slate-950",
          props.multiline && "min-h-28 py-3",
          error ? "border-red-300" : "border-slate-200",
          (readOnly || props.editable === false) && "bg-slate-100 text-slate-500",
        )}
      />
      {error ? <Text className="text-sm text-red-600">{error}</Text> : helper ? <Text className="text-sm text-slate-500">{helper}</Text> : null}
    </View>
  );
}

export function SelectMock({ label, value }: { label: string; value: string }) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-slate-700">{label}</Text>
      <View className="min-h-12 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white px-4">
        <Text className="text-base text-slate-900">{value}</Text>
        <ChevronDown size={18} color={colors.muted} />
      </View>
    </View>
  );
}

export function Checkbox({ label, checked, onPress }: { label: string; checked: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onPress} className="flex-row items-center gap-3">
      <View className={cn("h-6 w-6 items-center justify-center rounded-lg border", checked ? "border-brand-500 bg-brand-500" : "border-slate-300 bg-white")}>
        {checked ? <Check size={15} color="#fff" /> : null}
      </View>
      <Text className="text-base text-slate-700">{label}</Text>
    </Pressable>
  );
}

export function RadioRow({ label, selected }: { label: string; selected: boolean }) {
  return (
    <View className="flex-row items-center gap-3">
      <View className={cn("h-6 w-6 items-center justify-center rounded-full border", selected ? "border-brand-500" : "border-slate-300")}>
        {selected ? <View className="h-3 w-3 rounded-full bg-brand-500" /> : null}
      </View>
      <Text className="text-base text-slate-700">{label}</Text>
    </View>
  );
}

export function SwitchRow({ label, value }: { label: string; value: boolean }) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl bg-white p-3">
      <Text className="text-base font-semibold text-slate-800">{label}</Text>
      <RNSwitch value={value} trackColor={{ true: colors.brandSoft, false: "#cbd5e1" }} thumbColor={value ? colors.brand : "#fff"} />
    </View>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  const s = semantic[tone];
  return <Text className={cn("self-start rounded-full border px-3 py-1 text-xs font-bold", s.bg, s.text, s.border)}>{children}</Text>;
}

export function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View className={cn("rounded-full border px-3 py-2", active ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white")}>
      <Text className={cn("text-sm font-semibold", active ? "text-brand-700" : "text-slate-600")}>{label}</Text>
    </View>
  );
}

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center rounded-full bg-brand-100">
      <Text className="font-bold text-brand-700">{initials}</Text>
    </View>
  );
}

export function KpiCard({ label, value, trend, tone = "info" }: { label: string; value: string; trend: string; tone?: Tone }) {
  return (
    <Card className="flex-1 gap-2">
      <Badge tone={tone}>{trend}</Badge>
      <Text className="text-3xl font-bold text-slate-950">{value}</Text>
      <Text className="text-sm text-slate-500">{label}</Text>
    </Card>
  );
}

export function ListItem({
  title,
  subtitle,
  meta,
  icon: IconComponent,
  href,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: Icon;
  href?: LinkProps["href"];
}) {
  const content = (
    <View className="flex-row items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4">
      {IconComponent ? (
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-brand-50">
          <IconComponent size={20} color={colors.brand} />
        </View>
      ) : null}
      <View className="flex-1">
        <Text className="text-base font-bold text-slate-900">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</Text> : null}
      </View>
      {meta ? <Text className="text-xs font-semibold text-slate-500">{meta}</Text> : null}
      {href ? <ChevronRight size={18} color={colors.muted} /> : null}
    </View>
  );
  return href ? <Link href={href} asChild>{content}</Link> : content;
}

export function Divider() {
  return <View className="h-px bg-slate-200" />;
}

export function EmptyState({ title, description, icon: IconComponent }: { title: string; description: string; icon: Icon }) {
  return (
    <Card className="items-center gap-3 py-8">
      <View className="h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
        <IconComponent size={26} color={colors.muted} />
      </View>
      <Text className="text-center text-lg font-bold text-slate-900">{title}</Text>
      <Text className="text-center text-sm leading-5 text-slate-500">{description}</Text>
    </Card>
  );
}

export function InlineAlert({ title, description, tone = "info" }: { title: string; description: string; tone?: Tone }) {
  const s = semantic[tone];
  return (
    <View className={cn("rounded-3xl border p-4", s.bg, s.border)}>
      <Text className={cn("font-bold", s.text)}>{title}</Text>
      <Text className={cn("mt-1 text-sm leading-5", s.text)}>{description}</Text>
    </View>
  );
}

export function Skeleton({ lines = 3 }: { lines?: number }) {
  return (
    <Card className="gap-3">
      {Array.from({ length: lines }).map((_, index) => (
        <View key={index} className={cn("h-4 rounded-full bg-slate-200", index === lines - 1 && "w-2/3")} />
      ))}
    </Card>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <View className="gap-2">
      <View className="h-3 overflow-hidden rounded-full bg-slate-200">
        <View style={{ width: `${Math.min(100, Math.max(0, value))}%` }} className="h-full rounded-full bg-brand-500" />
      </View>
      <Text className="text-xs font-semibold text-slate-500">{value}% completado</Text>
    </View>
  );
}

export function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="gap-3">
      <Pressable className="flex-row items-center justify-between" onPress={() => setOpen((value) => !value)}>
        <Text className="text-base font-bold text-slate-900">{title}</Text>
        <ChevronDown size={18} color={colors.muted} />
      </Pressable>
      {open ? <View>{children}</View> : null}
    </Card>
  );
}

export function SegmentedControl({ options, value }: { options: string[]; value: string }) {
  return (
    <View className="flex-row rounded-2xl bg-slate-100 p-1">
      {options.map((option) => (
        <View key={option} className={cn("flex-1 rounded-xl px-3 py-2", option === value && "bg-white shadow-sm")}>
          <Text className={cn("text-center text-sm font-bold", option === value ? "text-brand-700" : "text-slate-500")}>{option}</Text>
        </View>
      ))}
    </View>
  );
}

export function FeedbackToast({ message }: { message: string }) {
  return (
    <View className="rounded-2xl bg-slate-950 px-4 py-3">
      <Text className="text-center text-sm font-semibold text-white">{message}</Text>
    </View>
  );
}

export function DemoModal({ title, children }: { title: string; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Button variant="outline" onPress={() => setVisible(true)}>Abrir modal</Button>
      <RNModal animationType="slide" transparent visible={visible} onRequestClose={() => setVisible(false)}>
        <View className="flex-1 justify-end bg-black/30">
          <View className="rounded-t-[32px] bg-white p-5">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-slate-950">{title}</Text>
              <IconButton icon={X} label="Cerrar" onPress={() => setVisible(false)} />
            </View>
            {children}
          </View>
        </View>
      </RNModal>
    </View>
  );
}

export function BottomSheetMock({ children }: { children: ReactNode }) {
  return (
    <View className="rounded-t-[32px] border border-slate-200 bg-white p-5 shadow-sm">
      <View className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
      {children}
    </View>
  );
}

export function FAB({ icon: IconComponent, label }: { icon: Icon; label: string }) {
  return (
    <View className="self-end">
      <Pressable accessibilityLabel={label} className="h-14 w-14 items-center justify-center rounded-full bg-brand-500 shadow-sm">
        <IconComponent size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

export function AttachmentPreview({ name, size }: { name: string; size: string }) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Paperclip size={18} color={colors.muted} />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-slate-900">{name}</Text>
        <Text className="text-xs text-slate-500">{size}</Text>
      </View>
    </View>
  );
}

export function SearchBox({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return <Field label="Buscar" value={value} onChangeText={onChangeText} placeholder="Busca por nombre, estado o folio" />;
}
