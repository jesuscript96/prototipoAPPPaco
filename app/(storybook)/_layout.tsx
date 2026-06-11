import { Stack } from "expo-router";
import { View } from "react-native";
import { ToastHost } from "@/components/paco/ui";

export default function StorybookLayout() {
  return (
    <View className="flex-1 bg-canvas">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F6F8FF" },
        }}
      />
      <ToastHost />
    </View>
  );
}
