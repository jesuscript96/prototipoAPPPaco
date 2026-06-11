import { useRouter } from "expo-router";
import { BellOff, CheckCheck, Trash2, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Badge, Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { cn } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification, clearNotifications } = usePacoStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Screen
      title="Notificaciones"
      description={
        notifications.length === 0
          ? "Sin novedades por ahora."
          : `${unread} sin leer de ${notifications.length}. Toca una notificación para abrir su destino.`
      }
    >
      {notifications.length === 0 ? (
        <EmptyState
          title="Bandeja vacía"
          description="Cuando tu empresa dispare encuestas, cursos, comunicados o felicitaciones, aparecerán aquí."
          icon={BellOff}
        />
      ) : (
        <>
          <View className="gap-3">
            {notifications.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => {
                  markNotificationRead(item.id);
                  router.push(item.href);
                }}
              >
                <Card className={cn("gap-2", !item.read && "border-brand-200 bg-brand-50/60")}>
                  <View className="flex-row items-center justify-between gap-2">
                    <View className="flex-row items-center gap-2">
                      {!item.read ? <View className="h-2.5 w-2.5 rounded-full bg-brand-500" /> : null}
                      <Badge tone={item.tone}>{item.type}</Badge>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs font-semibold text-slate-400">{item.time}</Text>
                      <Pressable
                        accessibilityLabel="Borrar notificación"
                        onPress={() => deleteNotification(item.id)}
                        className="h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                      >
                        <X size={14} color="#64748b" />
                      </Pressable>
                    </View>
                  </View>
                  <Text className="text-base font-bold text-slate-950">{item.title}</Text>
                  <Text className="text-sm leading-5 text-slate-600">{item.body}</Text>
                  <Text className="text-xs font-bold text-brand-700">{item.read ? "Leída" : "No leída · toca para abrir"}</Text>
                </Card>
              </Pressable>
            ))}
          </View>
          <View className="gap-2 pt-1">
            {unread > 0 ? (
              <Button icon={CheckCheck} variant="outline" onPress={markAllNotificationsRead}>
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
