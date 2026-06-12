import { useState } from "react";
import { useRouter } from "expo-router";
import { Camera, ChevronRight, CreditCard, KeyRound, LockKeyhole, LogOut, Mail, Trash2 } from "@/components/paco/glyphs";
import { Pressable, Text, View } from "react-native";
import { Button, Card, InlineAlert, Screen, Section } from "@/components/paco/layout";
import { ConfirmSheet, ToggleRow, cn } from "@/components/paco/ui";
import { employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function SettingsScreen() {
  const router = useRouter();
  const store = usePacoStore();
  const [confirm, setConfirm] = useState<"logout" | "logoutAll" | "delete" | null>(null);

  const rows = [
    {
      icon: LockKeyhole,
      label: "Cambiar contraseña",
      helper: store.passwordChangedAt ? `Actualizada ${store.passwordChangedAt.toLowerCase()}` : "Tu llave de acceso a la app",
      onPress: () => router.push("/(paco)/settings/password"),
    },
    {
      icon: Mail,
      label: "Recuperar NIP",
      helper: store.nipRecoverySent ? "Código enviado a tu correo" : "Te enviamos un código de verificación por correo",
      onPress: () => {
        store.recoverNip();
      },
    },
    {
      icon: KeyRound,
      label: "Cambiar NIP",
      helper: store.nipChangedAt ? `Actualizado ${store.nipChangedAt.toLowerCase()}` : "NIP de 4 dígitos para autorizar transacciones",
      onPress: () => router.push("/(paco)/settings/nip"),
    },
    {
      icon: CreditCard,
      label: "Cuentas de banco y tarjetas",
      helper: `${store.accounts.length} registradas · depósitos y cobros de adelantos`,
      onPress: () => router.push("/(paco)/settings/accounts"),
    },
  ];

  return (
    <Screen title="Configuración" description="Credenciales, seguridad, métodos financieros y sesión.">
      <Card className="flex-row items-center gap-4">
        <Pressable
          accessibilityLabel="Agregar foto"
          onPress={store.setProfilePhoto}
          className={cn("h-16 w-16 items-center justify-center rounded-full", store.profilePhotoSet ? "bg-brand-500" : "border border-separator bg-white/55")}
        >
          {store.profilePhotoSet ? <Text className="text-xl font-bold text-white">{employee.initials}</Text> : <Camera size={22} color="#2F42CB" />}
        </Pressable>
        <View className="flex-1">
          <Text className="text-base font-bold text-slate-950">{employee.name}</Text>
          <Text className="text-sm text-slate-500">{store.email}</Text>
          <Pressable accessibilityRole="button" onPress={store.setProfilePhoto} className="min-h-9 justify-center">
            <Text className="text-xs font-bold text-brand-700">{store.profilePhotoSet ? "Cambiar foto" : "Agregar foto"}</Text>
          </Pressable>
        </View>
      </Card>

      <Section title="Cuenta y seguridad">
        <Card className="p-1">
          {rows.map((row, index) => (
            <Pressable
              key={row.label}
              accessibilityRole="button"
              onPress={row.onPress}
              className={cn("flex-row items-center gap-3 px-3 py-3.5 active:bg-white/70", index < rows.length - 1 && "border-b border-separator")}
            >
              <View className="h-10 w-10 items-center justify-center rounded-xl border border-separator bg-white/55">
                <row.icon size={18} color="#2F42CB" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-slate-800">{row.label}</Text>
                <Text className="text-xs text-slate-500">{row.helper}</Text>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </Pressable>
          ))}
        </Card>
        {store.nipRecoverySent ? (
          <InlineAlert
            title="Revisa tu correo"
            description={`Enviamos un código único a ${store.email} para restablecer tu NIP. La liga vence en 15 minutos.`}
            tone="info"
          />
        ) : null}
      </Section>

      <Section title="Accesibilidad">
        <ToggleRow
          label="Reducir transparencia"
          helper="Sustituye el efecto vidrio por superficies sólidas con bordes definidos. En iOS también se respeta la preferencia del sistema."
          value={store.reduceTransparency}
          onChange={store.setReduceTransparency}
        />
      </Section>

      <Section title="Sesión">
        <Card className="gap-2.5">
          <Button icon={LogOut} variant="outline" onPress={() => setConfirm("logout")}>
            Cerrar sesión
          </Button>
          <Button icon={LogOut} variant="outline" onPress={() => setConfirm("logoutAll")}>
            Cerrar sesión en todos los dispositivos
          </Button>
          <Button icon={Trash2} variant="destructive" onPress={() => setConfirm("delete")}>
            Eliminar cuenta
          </Button>
          {store.deletionRequested ? (
            <InlineAlert
              title="Solicitud de baja registrada"
              description="Recursos Humanos procesará la eliminación definitiva de tu perfil en un máximo de 30 días, como piden las tiendas de aplicaciones."
              tone="warning"
            />
          ) : null}
        </Card>
      </Section>

      <ConfirmSheet
        visible={confirm === "logout"}
        title="¿Cerrar sesión?"
        message="Saldrás de tu cuenta en este dispositivo."
        confirmLabel="Cerrar sesión"
        onConfirm={() => {
          setConfirm(null);
          store.logout();
          router.replace("/(paco)/login");
        }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmSheet
        visible={confirm === "logoutAll"}
        title="¿Cerrar sesión en todos los dispositivos?"
        message="Se invalidarán las sesiones activas en cualquier teléfono o tableta vinculados a tu cuenta."
        confirmLabel="Cerrar todas las sesiones"
        onConfirm={() => {
          setConfirm(null);
          store.logoutAll();
          router.replace("/(paco)/login");
        }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmSheet
        visible={confirm === "delete"}
        title="¿Eliminar tu cuenta definitivamente?"
        message="Esta acción solicita la baja de tu perfil y tus datos de la plataforma. No se puede deshacer desde la app."
        confirmLabel="Solicitar eliminación"
        destructive
        onConfirm={() => {
          setConfirm(null);
          store.requestDeletion();
        }}
        onCancel={() => setConfirm(null)}
      />
    </Screen>
  );
}
