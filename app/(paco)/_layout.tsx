import { Stack } from "expo-router";

export default function PacoLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f7f9fc" },
        headerShadowVisible: false,
        headerTitleStyle: { color: "#0f172a" },
        contentStyle: { backgroundColor: "#f7f9fc" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Paco App" }} />
      <Stack.Screen name="onboarding" options={{ title: "Acceso Paco" }} />
      <Stack.Screen name="dashboard" options={{ title: "Inicio Paco" }} />
      <Stack.Screen name="module/[id]" options={{ title: "Módulo Paco" }} />
    </Stack>
  );
}
