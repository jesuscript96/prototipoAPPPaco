import { useRouter } from "expo-router";
import {
  Bell,
  BellOff,
  Cake,
  CheckCheck,
  ClipboardList,
  GraduationCap,
  Medal,
  Megaphone,
  Newspaper,
  Rocket,
  Trash2,
  Wallet,
  X,
} from "@/components/paco/glyphs";
import { Pressable, View } from "react-native";
import { Button, EmptyState, Screen } from "@/components/paco/layout";
import { GlassSurface } from "@/components/paco/glass";
import { ListGroup, Row } from "@/components/paco/ui";
import type { Icon } from "@/components/paco/icons";
import { Shimmer, useFakeLoad } from "@/components/paco/motion";
import { usePacoStore } from "@/store/paco-store";

// Liquid Glass: el tipo se distingue por el color del glifo (acento vibrante);
// la burbuja es vidrio neutro en todos los casos.
const typeStyles: Record<string, { icon: Icon; color: string }> = {
  Encuesta: { icon: ClipboardList, color: "#674EA7" },
  Curso: { icon: GraduationCap, color: "#B8860B" },
  Onboarding: { icon: Rocket, color: "#5176F3" },
  "Cumpleaños": { icon: Cake, color: "#A64D79" },
  Voz: { icon: Megaphone, color: "#CC0000" },
  Reconocimiento: { icon: Medal, color: "#B8860B" },
  Comunicado: { icon: Newspaper, color: "#2F42CB" },
  Finanzas: { icon: Wallet, color: "#2F42CB" },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification, clearNotifications } = usePacoStore();
  const unread = notifications.filter((n) => !n.read).length;
  const loading = useFakeLoad(380);

  return (
    <Screen
      title="Notificaciones"
      description={
        notifications.length === 0
          ? "Sin novedades por ahora."
          : `${unread} sin leer de ${notifications.length}. Toca una notificación para abrir su destino.`
      }
    >
      {loading ? (
        <GlassSurface variant="light" className="gap-3 p-4 shadow-card">
          {[0, 1, 2, 3].map((index) => (
            <View key={index} className="flex-row items-center gap-3">
              <Shimmer width={36} height={36} radius={10} />
              <View className="flex-1 gap-1.5">
                <Shimmer width="72%" />
                <Shimmer width="48%" height={10} />
              </View>
              <Shimmer width={34} height={10} />
            </View>
          ))}
        </GlassSurface>
      ) : notifications.length === 0 ? (
        <EmptyState
          title="Bandeja vacía"
          description="Cuando tu empresa dispare encuestas, cursos, comunicados o felicitaciones, aparecerán aquí."
          icon={BellOff}
        />
      ) : (
        <>
          <ListGroup>
            {notifications.map((item) => {
              const style = typeStyles[item.type] ?? { icon: Bell, color: "#2F42CB" };
              return (
                <Row
                  key={item.id}
                  icon={style.icon}
                  iconColor={style.color}
                  title={item.title}
                  subtitle={item.body}
                  meta={item.time.replace("Hoy · ", "").replace("Ayer · ", "Ayer ")}
                  unread={!item.read}
                  onPress={() => {
                    markNotificationRead(item.id);
                    router.push(item.href);
                  }}
                  trailing={
                    <Pressable
                      accessibilityLabel="Borrar notificación"
                      onPress={() => deleteNotification(item.id)}
                      className="h-8 w-8 items-center justify-center rounded-full active:bg-white/70"
                    >
                      <X size={13} color="#94a3b8" />
                    </Pressable>
                  }
                />
              );
            })}
          </ListGroup>

          <View className="gap-2 pt-1">
            {unread > 0 ? (
              <Button icon={CheckCheck} variant="secondary" onPress={markAllNotificationsRead}>
                Marcar todas como leídas
              </Button>
            ) : null}
            <Button icon={Trash2} variant="ghost" onPress={clearNotifications}>
              Borrar todas las notificaciones
            </Button>
          </View>
        </>
      )}
    </Screen>
  );
}
