import { Stack } from "expo-router";
import { View } from "react-native";
import { ToastHost } from "@/components/paco/ui";
import { PacoTabBar } from "@/components/paco/tabbar";

export default function PacoLayout() {
  return (
    <View className="flex-1 bg-canvas">
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F6F8FF" },
          }}
        />
        <ToastHost />
      </View>
      <PacoTabBar />
    </View>
  );
}
