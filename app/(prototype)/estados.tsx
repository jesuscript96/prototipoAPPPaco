import { AlertTriangle, Lock, ServerCrash, ShieldOff, WifiOff } from "lucide-react-native";
import { Button, EmptyState, InlineAlert, Screen, Section } from "@/components/ui";

export default function AppStatesScreen() {
  return (
    <Screen
      eyebrow="Estados de app"
      title="Permisos, errores y mantenimiento"
      description="Estados completos para reducir incertidumbre y ofrecer salida clara."
    >
      <Section title="Sin acceso">
        <EmptyState title="No tienes permiso" description="Pide acceso a tu administrador o cambia de cuenta." icon={Lock} />
        <Button variant="secondary" icon={ShieldOff}>Solicitar acceso mock</Button>
      </Section>
      <Section title="Sin conexión">
        <EmptyState title="Estás sin conexión" description="Mostramos la última información disponible y reintentaremos al volver." icon={WifiOff} />
      </Section>
      <Section title="Mantenimiento">
        <InlineAlert tone="warning" title="Mantenimiento programado" description="El servicio estará limitado de 22:00 a 22:30. Guarda tus cambios antes." />
      </Section>
      <Section title="Error inesperado">
        <EmptyState title="Algo salió mal" description="No pudimos completar la acción. Reintenta o contacta soporte con el folio ERR-204." icon={ServerCrash} />
        <Button icon={AlertTriangle}>Reintentar</Button>
      </Section>
    </Screen>
  );
}
