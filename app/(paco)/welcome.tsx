import { useState } from "react";
import { useRouter } from "expo-router";
import { Bell, HardHat, KeyRound, LogIn, MapPin, Phone } from "lucide-react-native";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ambient, Button } from "@/components/paco/layout";
import { HelpFab, cn } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

type PermissionKind = "notifications" | "location";

const permissionCopy: Record<PermissionKind, { icon: typeof Bell; title: string; body: string }> = {
  notifications: {
    icon: Bell,
    title: "¿Permitir que Paco te envíe notificaciones?",
    body: "Te avisaremos de encuestas pendientes, cursos asignados, comunicados, recordatorios y felicitaciones.",
  },
  location: {
    icon: MapPin,
    title: "¿Permitir que Paco acceda a tu ubicación?",
    body: "Usamos tu ubicación aproximada para mostrarte Ofertas PiN y promociones comerciales cercanas.",
  },
};

export default function WelcomeScreen() {
  const router = useRouter();
  const {
    permissionNotifications,
    permissionLocation,
    grantNotificationPermission,
    grantLocationPermission,
    showToast,
  } = usePacoStore();
  const [dialog, setDialog] = useState<PermissionKind | null>(null);

  const permissionsAsked = permissionNotifications || permissionLocation;

  const startPermissionFlow = () => setDialog("notifications");

  const resolveDialog = (granted: boolean) => {
    if (dialog === "notifications") {
      if (granted) grantNotificationPermission();
      setDialog("location");
      return;
    }
    if (dialog === "location") {
      if (granted) grantLocationPermission();
      setDialog(null);
      showToast(granted ? "Permisos configurados. Ya puedes iniciar sesión." : "Puedes activar la ubicación después desde Ofertas PiN.");
    }
  };

  const dialogContent = dialog ? permissionCopy[dialog] : null;

  return (
    <View className="flex-1 bg-canvas">
      <Ambient />

      <ScrollView contentContainerClassName="flex-grow justify-between px-6 pb-12 pt-24">
        <View className="items-center gap-4">
          <View className="h-24 w-24 items-center justify-center rounded-[22px] border border-white/90 bg-white/85 shadow-pop">
            <HardHat size={44} color="#3148c8" strokeWidth={1.9} />
          </View>
          <Text className="text-4xl font-bold tracking-tight text-slate-950">paco</Text>
          <Text className="text-center text-[15px] leading-6 text-slate-500">
            Tu plataforma de beneficios, salud financiera y cultura organizacional. Si ya activaste tu cuenta, accede con tu
            teléfono o correo.
          </Text>
        </View>

        <View className="gap-4">
          <View className="gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card">
            <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">Permisos del dispositivo</Text>
            {(
              [
                { kind: "notifications" as const, label: "Notificaciones", granted: permissionNotifications },
                { kind: "location" as const, label: "Ubicación para Ofertas PiN", granted: permissionLocation },
              ]
            ).map((item) => (
              <View key={item.kind} className="flex-row items-center justify-between">
                <Text className="text-[15px] text-slate-700">{item.label}</Text>
                <View className={cn("rounded-[8px] border px-2 py-0.5", item.granted ? "border-emerald-500/25 bg-emerald-500/10" : "border-slate-900/10 bg-slate-900/5")}>
                  <Text className={cn("text-[11px] font-bold", item.granted ? "text-emerald-700" : "text-slate-500")}>
                    {item.granted ? "Concedido" : "Pendiente"}
                  </Text>
                </View>
              </View>
            ))}
            {!permissionsAsked ? (
              <Button variant="outline" onPress={startPermissionFlow}>
                Configurar permisos
              </Button>
            ) : null}
          </View>

          <View className="gap-2.5">
            <Button icon={LogIn} onPress={() => router.push("/(paco)/login")}>
              Ya tengo cuenta
            </Button>
            <Button icon={Phone} variant="secondary" onPress={() => router.push("/(paco)/activate")}>
              No tengo cuenta
            </Button>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/(paco)/recover")}
              className="min-h-11 flex-row items-center justify-center gap-2"
            >
              <KeyRound size={15} color="#3148c8" />
              <Text className="text-sm font-bold text-brand-600">Olvidé mi contraseña</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <HelpFab onPress={() => router.push("/(paco)/help")} />

      <Modal transparent visible={dialog !== null} animationType="fade" onRequestClose={() => setDialog(null)}>
        <View className="flex-1 items-center justify-center bg-ink/40 px-8">
          {dialogContent ? (
            <View className="w-full max-w-sm items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-6 shadow-pop">
              <View className="h-14 w-14 items-center justify-center rounded-[14px] bg-brand-50">
                <dialogContent.icon size={26} color="#3148c8" />
              </View>
              <Text className="text-center text-lg font-bold tracking-tight text-slate-950">{dialogContent.title}</Text>
              <Text className="text-center text-sm leading-6 text-slate-600">{dialogContent.body}</Text>
              <View className="mt-2 w-full gap-2">
                <Button onPress={() => resolveDialog(true)}>Permitir</Button>
                <Button variant="ghost" onPress={() => resolveDialog(false)}>
                  No permitir
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
