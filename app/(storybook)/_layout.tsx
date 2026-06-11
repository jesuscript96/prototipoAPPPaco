import { Stack } from "expo-router";

export default function StorybookLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f7f9fc" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#f7f9fc" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Storybook móvil" }} />
      <Stack.Screen name="fundamentos" options={{ title: "Fundamentos" }} />
      <Stack.Screen name="componentes" options={{ title: "Componentes" }} />
      <Stack.Screen name="formularios" options={{ title: "Formularios" }} />
      <Stack.Screen name="listas" options={{ title: "Listas y datos" }} />
      <Stack.Screen name="navegacion" options={{ title: "Navegación" }} />
    </Stack>
  );
}
