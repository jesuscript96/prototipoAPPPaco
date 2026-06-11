// Barra de navegacion inferior sticky. Cinco posiciones: accesos directos a
// los hubs de uso diario y "Mas" para abrir el menu completo. Material glass
// con hairline superior, icono Phosphor fill cuando esta activo y pildora
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

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={Platform.OS === "web" ? ({ backdropFilter: "blur(18px)" } as object) : null}
      className="relative flex-row border-t border-slate-900/10 bg-white/85 px-1 pb-5 pt-2"
    >
      {segment > 0 ? (
        <Animated.View
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 6,
            left: 0,
            width: segment,
            alignItems: "center",
            transform: [{ translateX: slide }],
          }}
        >
          <View className="h-1 w-9 rounded-full bg-brand-500" />
        </Animated.View>
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
            className="min-h-12 flex-1 items-center justify-center gap-1 pt-1.5 active:opacity-60"
          >
            <tab.icon size={23} color={active ? "#2F42CB" : "#64748b"} weight={active ? "fill" : "bold"} />
            <Text className={active ? "text-[10px] font-bold text-brand-600" : "text-[10px] font-semibold text-slate-500"}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
