import { ComponentType, useState } from "react";
import { useRouter, type Href } from "expo-router";
import {
  ArrowLeft,
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
} from "@/components/paco/glyphs";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { assetForMenu, brandAssets, peopleAssets } from "@/components/paco/assets";
import { Ambient, Button, GlassNavButton } from "@/components/paco/layout";
import { ConfirmSheet, cn } from "@/components/paco/ui";
import { AssetIconBubble, IconBubble } from "@/components/paco/icons";
import { employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type MenuItem = { id: string; label: string; icon: Icon; color: string; tint: string; href: Href };

const groups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Mi información",
    items: [
      { id: "profile", label: "Mi expediente", icon: Contact, color: "#5176F3", tint: "bg-brand-100", href: "/(paco)/profile" },
      { id: "mood", label: "Estado de ánimo", icon: Smile, color: "#674EA7", tint: "bg-violet-50", href: "/(paco)/mood" },
      { id: "recognitions", label: "Mis reconocimientos", icon: Medal, color: "#B8860B", tint: "bg-amber-50", href: "/(paco)/recognitions" },
      { id: "voice", label: "Estatus de voz del colaborador", icon: Megaphone, color: "#dc2626", tint: "bg-red-50", href: "/(paco)/voice/status" },
    ],
  },
  {
    title: "Finanzas y documentos",
    items: [
      { id: "expenses", label: "Reporte de gastos", icon: PieChart, color: "#2F42CB", tint: "bg-brand-50", href: "/(paco)/expenses" },
      { id: "receipts", label: "Recibos de nómina", icon: FileText, color: "#2F42CB", tint: "bg-brand-50", href: "/(paco)/receipts" },
      { id: "sua", label: "Cartas SUA", icon: Mail, color: "#B8860B", tint: "bg-amber-50", href: "/(paco)/sua" },
      { id: "corporate-docs", label: "Documentos corporativos", icon: FolderOpen, color: "#B8860B", tint: "bg-amber-50", href: "/(paco)/corporate-docs" },
    ],
  },
  {
    title: "Comunicación y ayuda",
    items: [
      { id: "chat", label: "Chat interno", icon: MessagesSquare, color: "#5176F3", tint: "bg-brand-100", href: "/(paco)/chat" },
      { id: "help", label: "Preguntas frecuentes", icon: HelpCircle, color: "#5176F3", tint: "bg-brand-100", href: "/(paco)/help" },
      { id: "support", label: "Chat de soporte técnico", icon: LifeBuoy, color: "#5176F3", tint: "bg-brand-100", href: "/(paco)/support" },
      { id: "legal", label: "Términos y condiciones", icon: ShieldCheck, color: "#475569", tint: "bg-slate-100", href: "/(paco)/legal" },
      { id: "settings", label: "Configuración", icon: Settings, color: "#475569", tint: "bg-slate-100", href: "/(paco)/settings" },
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
        {router.canGoBack() ? (
          <GlassNavButton icon={ArrowLeft} label="Regresar" onPress={() => router.back()} />
        ) : (
          <View className="h-11 w-11" />
        )}
        <Text className="flex-1 pr-11 text-center text-[15px] font-bold text-slate-900">Menú</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerClassName="gap-5 px-5 pb-40 pt-3">
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
              <Image source={peopleAssets.avatarPlaceholder} resizeMode="cover" style={{ width: 74, height: 74, borderRadius: 37 }} />
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
                  {assetForMenu(item.id) ? (
                    <AssetIconBubble source={assetForMenu(item.id)!} tint={item.tint} size={38} imageSize={22} />
                  ) : (
                    <IconBubble icon={item.icon} color={item.color} tint={item.tint} size={38} iconSize={17} />
                  )}
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
        <View className="items-center gap-1">
          <Image source={brandAssets.headerIcon} resizeMode="contain" style={{ width: 70, height: 24 }} />
          <Text className="text-center text-[11px] text-slate-400">Prototipo demo · versión 2026.06</Text>
        </View>
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
