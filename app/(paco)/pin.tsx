import { useMemo, useState } from "react";
import { ExternalLink, MapPin, Tags } from "@/components/paco/glyphs";
import { ScrollView, Text, View } from "react-native";
import { Badge, Button, Card, EmptyState, Screen, Section } from "@/components/paco/layout";
import { SelectChip } from "@/components/paco/ui";
import { couponIcons } from "@/components/paco/icons";
import { company, pinCategories, pinCoupons } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function PinScreen() {
  const { permissionLocation, grantLocationPermission, showToast } = usePacoStore();
  const [category, setCategory] = useState<string>("Todos");
  const [openedCoupons, setOpenedCoupons] = useState<string[]>([]);

  const filtered = useMemo(
    () => pinCoupons.filter((coupon) => category === "Todos" || coupon.category === category),
    [category],
  );

  if (!permissionLocation) {
    return (
      <Screen title="Club de Descuentos PiN" description="Promociones y cupones de comercios cercanos, operados por nuestro aliado PiN.">
        <Card className="items-center gap-3 py-8">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
            <MapPin size={28} color="#B8860B" />
          </View>
          <Text className="text-center text-lg font-bold text-slate-950">Activa tu ubicación</Text>
          <Text className="text-center text-sm leading-5 text-slate-600">
            Para mostrarte ofertas físicas cerca de ti necesitamos el permiso de ubicación que omitiste al inicio.
          </Text>
          <Button
            icon={MapPin}
            onPress={() => {
              grantLocationPermission();
              showToast("Ubicación activada. Mostrando ofertas cercanas.");
            }}
          >
            Permitir ubicación
          </Button>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen
      title="Club de Descuentos PiN"
      description={`Beneficios cerca de Av. Insurgentes Sur (ubicación aproximada) · operado por ${company.pinProvider}.`}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {pinCategories.map((cat) => (
          <SelectChip key={cat} label={cat} active={category === cat} onPress={() => setCategory(cat)} />
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState title="Sin promociones" description="No hay cupones activos en esta categoría por ahora." icon={Tags} />
      ) : (
        <Section title={`${filtered.length} promociones disponibles`}>
          <View className="gap-3">
            {filtered.map((coupon) => {
              const opened = openedCoupons.includes(coupon.id);
              return (
                <Card key={coupon.id} className="gap-3">
                  <View className="flex-row items-start gap-3">
                    {(() => {
                      const CouponIcon = couponIcons[coupon.category] ?? Tags;
                      return (
                        <View className="h-11 w-11 items-center justify-center rounded-[12px] bg-brand-50">
                          <CouponIcon size={20} color="#2F42CB" strokeWidth={2.1} />
                        </View>
                      );
                    })()}
                    <View className="flex-1">
                      <Text className="text-base font-bold text-slate-950">{coupon.brand}</Text>
                      <Text className="text-lg font-bold text-brand-700">{coupon.offer}</Text>
                      <Text className="mt-0.5 text-xs text-slate-500">
                        {coupon.category} · a {coupon.distance} de ti
                      </Text>
                    </View>
                    <Badge tone={coupon.expires.includes("hoy") ? "warning" : "neutral"}>{coupon.expires}</Badge>
                  </View>
                  {opened ? (
                    <View className="items-center gap-1 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 p-4">
                      <Text className="text-xs font-bold uppercase tracking-[2px] text-brand-700">Cupón PiN</Text>
                      <Text className="text-2xl font-bold tracking-[4px] text-slate-950">PIN-{coupon.id.toUpperCase()}26</Text>
                      <Text className="text-xs text-slate-500">Muéstralo en caja antes de pagar</Text>
                    </View>
                  ) : null}
                  <Button
                    variant={opened ? "secondary" : "primary"}
                    icon={ExternalLink}
                    onPress={() => {
                      if (!opened) setOpenedCoupons((prev) => [...prev, coupon.id]);
                      showToast(opened ? "Abriendo app de PiN (redirección simulada)." : `Cupón de ${coupon.brand} generado.`);
                    }}
                  >
                    {opened ? "Abrir en PiN" : "Obtener cupón"}
                  </Button>
                </Card>
              );
            })}
          </View>
        </Section>
      )}
    </Screen>
  );
}
