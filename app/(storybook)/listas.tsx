import { useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Archive, Filter, MoreHorizontal, Search } from "lucide-react-native";
import { Badge, Button, Card, Chip, EmptyState, GuideNote, InlineAlert, ListItem, Screen, SearchBox, Section, Skeleton } from "@/components/ui";
import { getRecords } from "@/lib/mock-api";
import { records } from "@/mock/data";
import { useDemoStore } from "@/store/demo-store";

export default function ListsScreen() {
  const { filter, setFilter, activeSegment, setActiveSegment } = useDemoStore();
  const [refreshing, setRefreshing] = useState(false);
  const query = useInfiniteQuery({
    queryKey: ["records", filter],
    queryFn: ({ pageParam }) => getRecords({ pageParam, query: filter }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  const refresh = async () => {
    setRefreshing(true);
    await query.refetch();
    setRefreshing(false);
  };

  return (
    <Screen
      eyebrow="Listas y datos"
      title="Patrones para contenido móvil"
      description="Cards en lugar de tablas, filtros visibles y estados completos para carga, vacío, error y actualización."
    >
      <RefreshControl refreshing={refreshing} onRefresh={refresh} />

      <Section title="Listado simple">
        {records.slice(0, 3).map((record) => (
          <ListItem key={record.id} title={`${record.folio} · ${record.client}`} subtitle={`${record.status} · ${record.owner}`} meta={record.amount} href={`/(prototype)/registro/${record.id}`} />
        ))}
      </Section>

      <Section title="Búsqueda y filtros">
        <Card className="gap-4">
          <SearchBox value={filter} onChangeText={setFilter} />
          <View className="flex-row flex-wrap gap-2">
            {["Todos", "Alta", "Pendiente", "Aprobado"].map((item) => (
              <Chip key={item} label={item} active={activeSegment === item} />
            ))}
          </View>
          <Button variant="secondary" icon={Filter} onPress={() => setActiveSegment(activeSegment === "Alta" ? "Todos" : "Alta")}>
            Alternar filtro activo
          </Button>
        </Card>
      </Section>

      <Section title="Infinite scroll mock">
        <View className="gap-3">
          {query.isLoading ? <Skeleton lines={4} /> : null}
          {query.isError ? <InlineAlert tone="danger" title="No se pudo cargar" description="Muestra una acción de reintento y conserva contexto." /> : null}
          {!query.isLoading && items.length === 0 ? <EmptyState title="Sin resultados" description="No encontramos registros con esos filtros." icon={Search} /> : null}
          {items.map((record) => (
            <Card key={record.id} className="gap-3">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-950">{record.folio}</Text>
                  <Text className="text-sm text-slate-500">{record.client}</Text>
                </View>
                <Badge tone={record.status === "Aprobado" ? "success" : record.status === "Rechazado" ? "danger" : "warning"}>{record.status}</Badge>
              </View>
              <Text className="text-sm text-slate-600">Prioridad {record.priority} · Responsable {record.owner}</Text>
              <View className="flex-row gap-2">
                <View className="flex-1"><Button variant="outline">Ver detalle</Button></View>
                <View className="flex-1"><Button variant="ghost" icon={MoreHorizontal}>Acciones</Button></View>
              </View>
            </Card>
          ))}
          {query.hasNextPage ? <Button loading={query.isFetchingNextPage} onPress={() => void query.fetchNextPage()}>Cargar más</Button> : null}
        </View>
      </Section>

      <Section title="Acciones por item y swipe viable">
        <Card className="gap-3">
          <InlineAlert tone="info" title="Swipe actions" description="Úsalas como atajo, nunca como único acceso a una acción crítica." />
          <View className="flex-row gap-2">
            <Button variant="outline">Archivar</Button>
            <Button variant="destructive">Eliminar con confirmación</Button>
          </View>
        </Card>
      </Section>

      <Section title="Master-detail móvil">
        <ListItem title="Vista detalle desde item" subtitle="En móvil se navega a una ruta de detalle con header y botón atrás." icon={Archive} href="/(prototype)/registro/r1" />
      </Section>

      <GuideNote />
    </Screen>
  );
}
