import { Link } from "expo-router";
import { Bell, Eye, HelpCircle, KeyRound, LocateFixed, LogIn, Phone, ShieldCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import { Badge, Button, Card, Field, InlineAlert, Screen, Section } from "@/components/ui";
import { demoEmployee } from "@/mock/paco-data";
import { useDemoStore } from "@/store/demo-store";

export default function PacoOnboardingScreen() {
  const {
    pacoPermissionsDone,
    pacoSession,
    pacoToast,
    grantPacoPermissions,
    startPacoSession,
  } = useDemoStore();

  return (
    <Screen
      eyebrow="Paco App"
      title="Bienvenido a tu app de beneficios"
      description="Prototipo front-end con permisos, login, activación y soporte simulados para recorrer la experiencia completa."
    >
      {pacoToast ? <InlineAlert title="Acción demo" description={pacoToast} tone="success" /> : null}

      <Section title="1. Permisos del dispositivo" description="Se simulan los permisos obligatorios que habilitan alertas, cursos, encuestas y ofertas PIN.">
        <Card className="gap-3">
          <View className="flex-row gap-3">
            <View className="flex-1 gap-2 rounded-2xl bg-brand-50 p-3">
              <Bell size={22} color="#3148c8" />
              <Text className="font-bold text-slate-900">Notificaciones</Text>
              <Text className="text-sm text-slate-600">Encuestas, cursos, mensajes, cumpleaños y reconocimientos.</Text>
            </View>
            <View className="flex-1 gap-2 rounded-2xl bg-brand-50 p-3">
              <LocateFixed size={22} color="#3148c8" />
              <Text className="font-bold text-slate-900">Ubicación</Text>
              <Text className="text-sm text-slate-600">Ofertas PIN y beneficios cercanos al colaborador.</Text>
            </View>
          </View>
          <Button icon={ShieldCheck} onPress={grantPacoPermissions} variant={pacoPermissionsDone ? "secondary" : "primary"}>
            {pacoPermissionsDone ? "Permisos concedidos" : "Permitir y continuar"}
          </Button>
        </Card>
      </Section>

      <Section title="2. Ya tengo cuenta" description="Acceso limitado a colaboradores registrados por la empresa en el panel.">
        <Card className="gap-3">
          <Field label="Correo o teléfono" value={demoEmployee.email} readOnly />
          <Field label="Contraseña" value="••••••••••" readOnly secureTextEntry />
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Eye size={18} color="#64748b" />
              <Text className="text-sm font-semibold text-slate-600">Mostrar / ocultar contraseña</Text>
            </View>
            <Badge tone="warning">Error recuperable</Badge>
          </View>
          <InlineAlert title="Credenciales incorrectas" description="Ejemplo de alerta superior roja del video. Puedes volver a intentar sin perder el flujo." tone="danger" />
          <Button icon={LogIn} onPress={startPacoSession} disabled={!pacoPermissionsDone}>
            Iniciar sesión
          </Button>
          {pacoSession ? (
            <Link href="/(paco)/dashboard" asChild>
              <Button variant="secondary">Ir al dashboard</Button>
            </Link>
          ) : null}
        </Card>
      </Section>

      <Section title="3. Alternativas y soporte">
        <Card className="gap-3">
          <Button icon={Phone} variant="outline">No tengo cuenta: activar con celular</Button>
          <Button icon={KeyRound} variant="outline">Olvidé mi contraseña: enviar código</Button>
          <Button icon={HelpCircle} variant="ghost">Abrir ayuda externa Paco</Button>
          <Text className="text-sm leading-5 text-slate-500">
            La ayuda externa se mantiene como redirección mock al portal de preguntas frecuentes, adelanto, recargas,
            servicios, descuentos, asistencias y tickets técnicos.
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}
