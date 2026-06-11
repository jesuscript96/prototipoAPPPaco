import { ComponentType, useState } from "react";
import { useRouter, type Href } from "expo-router";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Contact,
  FileText,
  FolderOpen,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Mail,
  Medal,
  Megaphone,
  MessagesSquare,
  PieChart,
  Settings,
  ShieldCheck,
  Smile,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ambient, Button, GlassNavButton } from "@/components/paco/layout";
import { ConfirmSheet, cn } from "@/components/paco/ui";
import { IconBubble } from "@/components/paco/icons";
import { employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type MenuItem = { label: string; icon: Icon; color: string; tint: string; href: Href };

const groups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Mi información",
    items: [
      { label: "Mi expediente", icon: Contact, color: "#0d9488", tint: "bg-teal-50", href: "/(paco)/profile" },
      { label: "Estado de ánimo", icon: Smile, color: "#7c3aed", tint: "bg-violet-50", href: "/(paco)/mood" },
      { label: "Mis reconocimientos", icon: Medal, color: "#b45309", tint: "bg-amber-50", href: "/(paco)/recognitions" },
      { label: "Estatus de voz del colaborador", icon: Megaphone, color: "#dc2626", tint: "bg-red-50", href: "/(paco)/voice/status" },
    ],
  },
  {
    title: "Finanzas y documentos",
    items: [
      { label: "Reporte de gastos", icon: PieChart, color: "#3148c8", tint: "bg-brand-50", href: "/(paco)/expenses" },
      { label: "Recibos de nómina", icon: FileText, color: "#3148c8", tint: "bg-brand-50", href: "/(paco)/receipts" },
      { label: "Cartas SUA", icon: Mail, color: "#b45309", tint: "bg-amber-50", href: "/(paco)/sua" },
      { label: "Documentos corporativos", icon: FolderOpen, color: "#b45309", tint: "bg-amber-50", href: "/(paco)/corporate-docs" },
    ],
  },
  {
    title: "Comunicación y ayuda",
    items: [
      { label: "Chat interno", icon: MessagesSquare, color: "#0d9488", tint: "bg-teal-50", href: "/(paco)/chat" },
      { label: "Preguntas frecuentes", icon: HelpCircle, color: "#0284c7", tint: "bg-sky-50", href: "/(paco)/help" },
      { label: "Chat de soporte técnico", icon: LifeBuoy, color: "#0284c7", tint: "bg-sky-50", href: "/(paco)/support" },
      { label: "Términos y condiciones", icon: ShieldCheck, color: "#475569", tint: "bg-slate-100", href: "/(paco)/legal" },
      { label: "Configuración", icon: Settings, color: "#475569", tint: "bg-slate-100", href: "/(paco)/settings" },
    ],
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const { email, profilePhotoSet, setProfilePhoto, logout } = usePacoStore();
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <View className="flex-1 bg-canvas">
      <Ambient />

      <View className="flex-row items-center px-5 pb-2 pt-14">
        <GlassNavButton icon={ArrowLeft} label="Regresar" onPress={() => router.back()} />
        <Text className="flex-1 pr-11 text-center text-[15px] font-bold text-slate-900">Menú</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="gap-5 px-5 pb-20 pt-3">
        <View className="items-center gap-3 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-card">
          <Pressable
            accessibilityLabel="Cambiar foto de perfil"
            onPress={setProfilePhoto}
            className={cn(
              "h-20 w-20 items-center justify-center rounded-full border-2",
              profilePhotoSet ? "border-ink bg-ink" : "border-slate-200 bg-white",
            )}
          >
            {profilePhotoSet ? (
              <Text className="text-2xl font-bold text-white">{employee.initials}</Text>
            ) : (
              <Camera size={26} color="#64748b" />
            )}
          </Pressable>
          <View className="items-center">
            <Text className="text-xl font-bold tracking-tight text-slate-950">{employee.name}</Text>
            <Text className="text-[13px] text-slate-500">{email}</Text>
            <Text className="mt-1 text-[11px] font-semibold text-slate-400">
              {profilePhotoSet ? "Foto actualizada" : "Toca el avatar para agregar tu foto"}
            </Text>
          </View>
        </View>

        {groups.map((group) => (
          <View key={group.title} className="gap-2">
            <Text className="px-1 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">{group.title}</Text>
            <View className="overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-card">
              {group.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  accessibilityRole="button"
                  onPress={() => router.push(item.href)}
                  className={cn("flex-row items-center gap-3 px-4 py-3.5 active:bg-white", index > 0 && "border-t border-slate-900/5")}
                >
                  <IconBubble icon={item.icon} color={item.color} tint={item.tint} size={38} iconSize={17} />
                  <Text className="flex-1 text-[14px] font-semibold text-slate-800">{item.label}</Text>
                  <ChevronRight size={17} color="#cbd5e1" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Button icon={LogOut} variant="secondary" onPress={() => setConfirmLogout(true)}>
          Cerrar sesión
        </Button>
        <Text className="text-center text-[11px] text-slate-400">Paco App · prototipo demo · versión 2026.06</Text>
      </ScrollView>

      <ConfirmSheet
        visible={confirmLogout}
        title="¿Cerrar sesión?"
        message="Saldrás de tu cuenta en este dispositivo. Podrás volver a entrar con tu correo y contraseña."
        confirmLabel="Cerrar sesión"
        onConfirm={() => {
          setConfirmLogout(false);
          logout();
          router.replace("/(paco)/welcome");
        }}
        onCancel={() => setConfirmLogout(false)}
      />
    </View>
  );
}
