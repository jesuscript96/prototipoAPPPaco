import "react-native-gesture-handler";
import "@/global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { queryClient } from "@/lib/query-client";
import { usePacoFonts } from "@/lib/fonts";

export default function RootLayout() {
  const [fontsLoaded, fontError] = usePacoFonts();

  if (!fontsLoaded && !fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator size="large" color="#2F42CB" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#f7f9fc" },
          headerShadowVisible: false,
          headerTitleStyle: { color: "#0f172a" },
          contentStyle: { backgroundColor: "#f7f9fc" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "PACO Showroom" }} />
        <Stack.Screen name="(storybook)" options={{ headerShown: false }} />
        <Stack.Screen name="(prototype)" options={{ headerShown: false }} />
        <Stack.Screen name="(paco)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Ruta modal" }} />
      </Stack>
    </QueryClientProvider>
  );
}
