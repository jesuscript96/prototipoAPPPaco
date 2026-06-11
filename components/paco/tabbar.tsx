// Dock de navegacion inferior flotante. Cinco posiciones: accesos directos a
// los hubs de uso diario y "Mas" para abrir el menu completo. Material glass
// con blur real en web, icono Phosphor fill cuando esta activo y pildora
// indicadora que desliza con spring (misma fisica que Segmented).

import { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, Text, View } from "react-native";
import { usePathname, useRouter, type Href } from "expo-router";
import { CalendarCheck, ChartPie, ChatsCircle, House, SquaresFour } from "phosphor-react-native";
import { usePacoStore } from "@/store/paco-store";

type TabItem = {
  id: string;
  label: string;
  icon: typeof House;
  href: Href;
  match: (path: string) => boolean;
};

const tabs: TabItem[] = [
  { id: "home", label: "Inicio", icon: House, href: "/(paco)/home", match: (p) => p === "/home" },
  { id: "money", label: "Dinero", icon: ChartPie, href: "/(paco)/expenses", match: (p) => p === "/expenses" || p === "/advance" || p === "/topups" || p === "/services" },
  { id: "requests", label: "Solicitudes", icon: CalendarCheck, href: "/(paco)/requests", match: (p) => p.startsWith("/requests") },
  { id: "chat", label: "Chat", icon: ChatsCircle, href: "/(paco)/chat", match: (p) => p === "/chat" },
  { id: "more", label: "Más", icon: SquaresFour, href: "/(paco)/menu", match: (p) => p === "/menu" || p.startsWith("/settings") || p === "/profile" },
];

const hiddenExact = ["/", "/welcome", "/login", "/activate", "/recover", "/help"];

const isConversation = (path: string) =>
  (path.startsWith("/chat/") && path !== "/chat") || (path.startsWith("/voice/") && path !== "/voice" && path !== "/voice/status");

export function PacoTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const loggedIn = usePacoStore((s) => s.loggedIn);
  const surveyBlocked = !usePacoStore((s) => s.completedSurveyIds).includes("nom035");

  const [width, setWidth] = useState(0);
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.match(pathname)));
  const slide = useRef(new Animated.Value(0)).current;
  const segment = width / tabs.length;

  useEffect(() => {
    Animated.spring(slide, { toValue: activeIndex * segment, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  }, [activeIndex, segment, slide]);

  if (!loggedIn || surveyBlocked) return null;
  if (hiddenExact.includes(pathname) || isConversation(pathname)) return null;

  const dockGlassStyle =
    Platform.OS === "web"
      ? ({
          backdropFilter: "saturate(180%) blur(28px)",
          WebkitBackdropFilter: "saturate(180%) blur(28px)",
          boxShadow: "0 22px 54px rgba(32, 44, 137, 0.22), 0 6px 18px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.78)",
        } as object)
      : ({
          shadowColor: "#202C89",
          shadowOffset: { width: 0, height: 18 },
          shadowOpacity: 0.22,
          shadowRadius: 28,
          elevation: 18,
        } as object);

  const dockContainerStyle =
    Platform.OS === "web"
      ? ({ position: "fixed", left: 0, right: 0, bottom: 8, zIndex: 9999 } as object)
      : ({ position: "absolute", left: 0, right: 0, bottom: 8, zIndex: 9999, elevation: 999 } as object);

  return (
    <View pointerEvents="box-none" style={dockContainerStyle} className="items-center px-4">
      <View
        onLayout={(event) => setWidth(event.nativeEvent.layout.width - 12)}
        style={dockGlassStyle}
        className="relative w-full max-w-md flex-row overflow-hidden rounded-[20px] border border-white/70 bg-white/55 p-1.5"
      >
      {segment > 0 ? (
        <Animated.View
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 6,
            bottom: 6,
            left: 6,
            width: segment,
            borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.82)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.9)",
            boxShadow: Platform.OS === "web" ? "0 8px 22px rgba(32, 44, 137, 0.14)" : undefined,
            transform: [{ translateX: slide }],
          }}
        />
      ) : null}

      {tabs.map((tab, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
            onPress={() => {
              if (!active) router.replace(tab.href);
            }}
            className="min-h-[58px] flex-1 items-center justify-center gap-0.5 rounded-2xl active:opacity-60"
          >
            <tab.icon size={22} color={active ? "#2F42CB" : "#64748b"} weight={active ? "fill" : "bold"} />
            <Text className={active ? "text-[10px] font-bold text-brand-600" : "text-[10px] font-semibold text-slate-500"}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
      </View>
    </View>
  );
}
