import { Text, View } from "react-native";
import { Bell, ChevronLeft, ExternalLink, Home, Lock, User } from "lucide-react-native";
import { Badge, Button, Card, GuideNote, InlineAlert, ListItem, Screen, Section, SegmentedControl } from "@/components/ui";
import { useDemoStore } from "@/store/demo-store";

export default function NavigationScreen() {
  const { simulatedSession, toggleSession } = useDemoStore();

  return (
    <Screen
      eyebrow="Navegación"
      title="Patrones móviles"
      description="Ejemplos de navegación file-based con Expo Router: stack, tabs inferiores, detalle, modal, deep link y protección simulada."
    >
      <Section title="Stack navigation">
        <Card className="gap-3">
          <View className="flex-row items-center gap-3">
            <ChevronLeft size={20} color="#3148c8" />
            <Text className="text-lg font-bold text-slate-950">Detalle de registro</Text>
          </View>
          <Text className="text-sm leading-5 text-slate-600">Usa headers claros, botón atrás visible y títulos cortos. Evita esconder navegación esencial.</Text>
          <ListItem title="Abrir detalle real" subtitle="Ruta dinámica con mock data." href="/(prototype)/registro/r1" />
        </Card>
      </Section>

      <Section title="Tabs inferiores">
        <Card className="gap-4">
          <SegmentedControl options={["Inicio", "Inbox", "Perfil"]} value="Inicio" />
          <View className="flex-row justify-around rounded-3xl bg-slate-100 p-3">
            {[Home, Bell, User].map((Icon, index) => (
              <View key={index} className="items-center gap-1">
                <Icon size={22} color={index === 0 ? "#3148c8" : "#64748b"} />
                <Text className={index === 0 ? "text-xs font-bold text-brand-700" : "text-xs text-slate-500"}>
                  {["Inicio", "Avisos", "Perfil"][index]}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title="Modal route">
        <ListItem title="Abrir ruta modal" subtitle="Presentación modal definida en Root Stack." icon={ExternalLink} href="/modal" />
      </Section>

      <Section title="Deep link mock">
        <InlineAlert tone="info" title="paco-showroom://registro/r1" description="El scheme está configurado para documentar deep links, sin depender de backend." />
      </Section>

      <Section title="Protected route simulada">
        <Card className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-slate-900">Sesión demo</Text>
            <Badge tone={simulatedSession ? "success" : "warning"}>{simulatedSession ? "Activa" : "Bloqueada"}</Badge>
          </View>
          <Button icon={Lock} onPress={toggleSession}>{simulatedSession ? "Cerrar sesión mock" : "Activar sesión mock"}</Button>
          <InlineAlert
            tone={simulatedSession ? "success" : "warning"}
            title={simulatedSession ? "Ruta permitida" : "Ruta protegida"}
            description={simulatedSession ? "El usuario puede ver el contenido demo." : "Muestra una pantalla clara para iniciar sesión o pedir acceso."}
          />
        </Card>
      </Section>

      <Section title="Onboarding, ajustes y perfil">
        <Card className="gap-3">
          <ListItem title="Onboarding inicial" subtitle="Presenta valor, permisos y primer paso." href="/(prototype)/onboarding" />
          <ListItem title="Ajustes/configuración" subtitle="Preferencias agrupadas, copy claro y switches." href="/(prototype)/configuracion" />
          <ListItem title="Menú de perfil" subtitle="Identidad, seguridad y cierre de sesión mock." href="/(prototype)/perfil" />
        </Card>
      </Section>

      <GuideNote />
    </Screen>
  );
}
