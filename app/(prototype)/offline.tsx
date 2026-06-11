import { RefreshCw, WifiOff } from "lucide-react-native";
import { Button, Card, EmptyState, InlineAlert, Screen, Section, SwitchRow } from "@/components/ui";

export default function OfflineScreen() {
  return (
    <Screen
      eyebrow="Offline mock"
      title="Sin conexión"
      description="Patrón para degradar con claridad sin prometer sincronización real."
    >
      <EmptyState title="No hay internet" description="Puedes revisar datos cargados previamente. Las acciones nuevas quedan deshabilitadas en este prototipo." icon={WifiOff} />
      <Section title="Comportamiento esperado">
        <Card className="gap-3">
          <SwitchRow label="Mostrar datos en caché" value />
          <InlineAlert tone="warning" title="Acciones pausadas" description="No permitas submit si no puedes garantizar que se guardará después." />
          <Button icon={RefreshCw} variant="secondary">Reintentar conexión</Button>
        </Card>
      </Section>
    </Screen>
  );
}
