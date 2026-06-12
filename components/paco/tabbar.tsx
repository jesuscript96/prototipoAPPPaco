// Dock de navegacion inferior flotante con iconografia de marca Paco.

import { useEffect, useRef, useState, type ReactNode, type ReactPortal } from "react";
import { Animated, Image, Platform, Pressable, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { usePathname, useRouter, type Href } from "expo-router";
import { tabAssets } from "@/components/paco/assets";
import { GlassDock } from "@/components/paco/glass";
import { usePacoStore } from "@/store/paco-store";

type TabItem = {
  id: keyof typeof tabAssets;
  label: string;
  icon: ImageSourcePropType;
  href: Href;
  match: (path: string) => boolean;
};

const tabs: TabItem[] = [
  { id: "home", label: "Inicio", icon: tabAssets.home, href: "/(paco)/home", match: (p) => p === "/home" || p.endsWith("/home") },
  {
    id: "money",
    label: "Dinero",
    icon: tabAssets.money,
    href: "/(paco)/expenses",
    match: (p) => p === "/expenses" || p === "/advance" || p === "/topups" || p === "/services",
  },
  { id: "requests", label: "Solicitudes", icon: tabAssets.requests, href: "/(paco)/requests", match: (p) => p.startsWith("/requests") },
  { id: "chat", label: "Chat", icon: tabAssets.chat, href: "/(paco)/chat", match: (p) => p === "/chat" },
  { id: "more", label: "Más", icon: tabAssets.more, href: "/(paco)/menu", match: (p) => p === "/menu" || p.startsWith("/settings") || p === "/profile" },
];

const hiddenExact = ["/", "/login", "/activate", "/recover", "/help"];

const isConversation = (path: string) =>
  (path.startsWith("/chat/") && path !== "/chat") || (path.startsWith("/voice/") && path !== "/voice" && path !== "/voice/status");

function normalizePath(path: string) {
  return path.replace(/\/\(paco\)/g, "") || "/";
}

function TabBarDock() {
  const router = useRouter();
  const pathname = normalizePath(usePathname());
  const surveyBlocked = !usePacoStore((s) => s.completedSurveyIds).includes("nom035");

  const [width, setWidth] = useState(0);
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.match(pathname)));
  const slide = useRef(new Animated.Value(0)).current;
  const segment = width / tabs.length;

  useEffect(() => {
    Animated.spring(slide, { toValue: activeIndex * segment, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  }, [activeIndex, segment, slide]);

  const dockContainerStyle =
    Platform.OS === "web"
      ? ({ position: "fixed", left: 0, right: 0, bottom: 16, zIndex: 2147483646, pointerEvents: "box-none" } as object)
      : ({ position: "absolute", left: 0, right: 0, bottom: 16, zIndex: 99999, elevation: 999, pointerEvents: "box-none" } as object);

  return (
    <View style={dockContainerStyle} className="items-center px-4">
      <GlassDock
        onLayout={(event) => setWidth(event.nativeEvent.layout.width - 12)}
        className="relative w-full max-w-md flex-row overflow-hidden p-1.5"
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
              backgroundColor: "rgba(255,255,255,0.78)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.92)",
              boxShadow: Platform.OS === "web" ? "0 8px 24px rgba(0, 64, 128, 0.16)" : undefined,
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
                if (surveyBlocked && tab.id !== "home") {
                  router.push({ pathname: "/(paco)/surveys/[id]", params: { id: "nom035" } });
                  return;
                }
                if (!active) router.replace(tab.href);
              }}
              className="min-h-[58px] flex-1 items-center justify-center gap-0.5 rounded-2xl active:opacity-60"
            >
              <Image
                source={tab.icon}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  opacity: active ? 1 : 0.7,
                }}
              />
              <Text className={active ? "text-[10px] font-bold text-navy" : "text-[10px] font-semibold text-slate-700"}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </GlassDock>
    </View>
  );
}

export function PacoTabBar() {
  const pathname = normalizePath(usePathname());
  const loggedIn = usePacoStore((s) => s.loggedIn);

  if (!loggedIn) return null;
  if (hiddenExact.includes(pathname) || isConversation(pathname)) return null;

  if (Platform.OS === "web" && typeof document !== "undefined") {
    // Portal en web para que el dock quede siempre visible sobre el stack.
    const { createPortal } = require("react-dom") as {
      createPortal: (children: ReactNode, container: Element) => ReactPortal;
    };
    return createPortal(<TabBarDock />, document.body);
  }

  return <TabBarDock />;
}
