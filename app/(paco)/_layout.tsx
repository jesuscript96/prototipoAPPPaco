import { Stack } from "expo-router";
import { Platform, View, type ViewStyle } from "react-native";
import { ToastHost } from "@/components/paco/ui";
import { PacoTabBar } from "@/components/paco/tabbar";

export default function PacoLayout() {
  return (
    <View
      className="flex-1 bg-canvas"
      style={Platform.OS === "web" ? ({ minHeight: "100vh", position: "relative" } as unknown as ViewStyle) : undefined}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#DCE6F4" },
        }}
      />
      <PacoTabBar />
      <ToastHost />
    </View>
  );
}
