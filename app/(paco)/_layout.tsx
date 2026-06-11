import { Stack } from "expo-router";
import { View } from "react-native";
import { ToastHost } from "@/components/paco/ui";

export default function PacoLayout() {
  return (
    <View className="flex-1 bg-canvas">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f2f4fb" },
        }}
      />
      <ToastHost />
    </View>
  );
}
