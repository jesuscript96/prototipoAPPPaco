import { AlertTriangle } from "lucide-react-native";
import { Button, Card, InlineAlert, Screen } from "@/components/ui";

export default function ModalRouteScreen() {
  return (
    <Screen eyebrow="Modal route" title="Confirmación" description="Ejemplo de presentación modal desde Expo Router.">
      <Card className="gap-4">
        <InlineAlert tone="warning" title="Acción destructiva" description="Antes de eliminar un registro, confirma el impacto con lenguaje específico." />
        <Button variant="destructive" icon={AlertTriangle}>Sí, eliminar registro mock</Button>
      </Card>
    </Screen>
  );
}
