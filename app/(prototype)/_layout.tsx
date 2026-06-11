import { Stack } from "expo-router";

export default function PrototypeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f7f9fc" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#f7f9fc" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Prototipo" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Stack.Screen name="notificaciones" options={{ title: "Notificaciones" }} />
      <Stack.Screen name="inbox" options={{ title: "Inbox" }} />
      <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="configuracion" options={{ title: "Configuración" }} />
      <Stack.Screen name="crud" options={{ title: "CRUD móvil" }} />
      <Stack.Screen name="documentos" options={{ title: "Documentos" }} />
      <Stack.Screen name="reportes" options={{ title: "Reportes" }} />
      <Stack.Screen name="estados" options={{ title: "Estados" }} />
      <Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
      <Stack.Screen name="offline" options={{ title: "Sin conexión" }} />
      <Stack.Screen name="registro/[id]" options={{ title: "Detalle" }} />
    </Stack>
  );
}
