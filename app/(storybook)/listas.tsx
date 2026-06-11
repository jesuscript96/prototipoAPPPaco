import { useState } from "react";
import { View } from "react-native";
import { Cake, ClipboardList, Smartphone, Wallet } from "@/components/paco/glyphs";
import { Card, Screen, Section } from "@/components/paco/layout";
import { BarChart, CountBar, FileTile, ListGroup, Row, StackedBar } from "@/components/paco/ui";
import { usePacoStore } from "@/store/paco-store";

export default function ListasScreen() {
  const showToast = usePacoStore((s) => s.showToast);
  const [downloaded, setDownloaded] = useState(false);

  return (
    <Screen
      eyebrow="Patrones"
      title="Listas y datos"
      description="Regla de densidad: los colecciones largas no usan tarjetas con borde por elemento; usan un grupo glass único con filas divididas por hairline y la meta alineada a la derecha."
    >
      <Section title="ListGroup + Row" description="Notificación, movimiento y evento: icono tintado, título, subtítulo de una línea, meta derecha.">
        <ListGroup>
          <Row
            icon={ClipboardList}
            iconColor="#674EA7"
            iconTint="bg-violet-50"
            title="Encuesta NOM-035 obligatoria"
            subtitle="Vence en 22 días · 5 preguntas"
            meta="9:40"
            unread
            onPress={() => showToast("Abriendo notificación…")}
          />
          <Row
            icon={Wallet}
            title="Adelanto de nómina · Nómina BBVA"
            subtitle="10 jun 2026 · 1Q junio"
            meta="-$1,296"
            metaSub="Adeudo próximo"
            metaSubColor="#B8860B"
            onPress={() => showToast("Detalle del movimiento")}
          />
          <Row
            icon={Smartphone}
            iconColor="#5176F3"
            title="Recarga Telcel 55 6677 8899"
            subtitle="5 jun 2026 · 1Q junio"
            meta="-$150"
            metaSub="Procesado"
            metaSubColor="#5176F3"
          />
          <Row
            icon={Cake}
            iconColor="#A64D79"
            iconTint="bg-pink-50"
            title="Jorge Patiño"
            subtitle="Cumpleaños · Operaciones"
            metaSub="Hoy"
            metaSubColor="#FB4F33"
            chevron
            onPress={() => showToast("Ir a celebraciones")}
          />
        </ListGroup>
      </Section>

      <Section title="Archivo descargable">
        <FileTile
          name="Politica-vacaciones-2026.docx"
          kind="DOCX"
          size="480 KB"
          downloaded={downloaded}
          onDownload={() => {
            setDownloaded(true);
            showToast("Archivo descargado.");
          }}
        />
      </Section>

      <Section title="Gráficas mock" description="Solo Views: barras, conteos y distribución.">
        <Card className="gap-4">
          <BarChart
            bars={[
              { label: "Lun", value: 50, color: "#F1C232" },
              { label: "Mar", value: 75, color: "#6AA84F" },
              { label: "Mié", value: 100, color: "#6AA84F" },
              { label: "Jue", value: 25, color: "#FB4F33" },
              { label: "Vie", value: 75, color: "#6AA84F" },
            ]}
          />
          <CountBar label="Trabajo" count={4} max={4} />
          <CountBar label="Familia" count={2} max={4} color="#5176F3" />
          <StackedBar
            slices={[
              { label: "Adelanto de nómina", value: 540, color: "#2F42CB" },
              { label: "Pago de servicio", value: 832, color: "#F1C232" },
              { label: "Recarga", value: 150, color: "#5176F3" },
            ]}
          />
        </Card>
      </Section>
    </Screen>
  );
}
