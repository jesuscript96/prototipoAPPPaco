import { useState } from "react";
import { CreditCard, Landmark, Plus, Trash2 } from "@/components/paco/glyphs";
import { Modal, Pressable, Text, View } from "react-native";
import { Button, Field, Screen } from "@/components/paco/layout";
import { GlassBottomSheet } from "@/components/paco/glass";
import { ConfirmSheet, ListGroup, Row, Segmented, SelectChip, SheetHeader } from "@/components/paco/ui";
import { banks } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function AccountsScreen() {
  const { accounts, addAccount, removeAccount } = usePacoStore();
  const [adding, setAdding] = useState(false);
  const [kind, setKind] = useState<string>("Tarjetas");
  const [alias, setAlias] = useState("");
  const [bank, setBank] = useState<string>(banks[0]);
  const [number, setNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  const isCard = kind === "Tarjetas";
  const digits = number.replace(/\D/g, "");
  const requiredLength = isCard ? 16 : 18;

  const save = () => {
    if (alias.trim().length < 3) {
      setError("Dale un alias a tu cuenta (mínimo 3 caracteres).");
      return;
    }
    if (digits.length !== requiredLength) {
      setError(isCard ? "El número de tarjeta debe tener 16 dígitos." : "La CLABE interbancaria debe tener 18 dígitos.");
      return;
    }
    setError(null);
    addAccount({ alias: alias.trim(), bank, kind: isCard ? "Tarjeta" : "Cuenta", number: digits });
    setAdding(false);
    setAlias("");
    setNumber("");
  };

  const removingAccount = accounts.find((a) => a.id === removing);

  return (
    <Screen
      title="Cuentas y tarjetas"
      description="Métodos registrados para depósitos y cobros de tus adelantos de nómina y pagos."
    >
      <ListGroup>
        {accounts.map((account) => (
          <Row
            key={account.id}
            icon={account.kind === "Tarjeta" ? CreditCard : Landmark}
            iconColor={account.kind === "Tarjeta" ? "#674EA7" : "#2F42CB"}
            title={account.alias}
            subtitle={`${account.bank} · ${account.masked}`}
            metaSub={account.primary ? "Principal" : undefined}
            metaSubColor="#6AA84F"
            trailing={
              !account.primary ? (
                <Pressable
                  accessibilityLabel={`Eliminar ${account.alias}`}
                  onPress={() => setRemoving(account.id)}
                  className="h-8 w-8 items-center justify-center rounded-full active:bg-white/70"
                >
                  <Trash2 size={14} color="#CC0000" />
                </Pressable>
              ) : undefined
            }
          />
        ))}
      </ListGroup>

      <Button icon={Plus} onPress={() => setAdding(true)}>
        Agregar cuenta o tarjeta
      </Button>

      <Modal transparent visible={adding} animationType="slide" onRequestClose={() => setAdding(false)}>
        <View className="flex-1 justify-end bg-navy/40">
          <GlassBottomSheet>
            <SheetHeader title="Agregar método" onClose={() => setAdding(false)} />
            <View className="gap-4">
              <Segmented options={["Tarjetas", "Cuenta"]} value={kind} onChange={setKind} />
              <Field label="Alias" value={alias} onChangeText={setAlias} placeholder={isCard ? "Ej. Débito personal" : "Ej. Mi cuenta de ahorro"} />
              <View className="gap-2">
                <Text className="text-sm font-bold text-slate-700">Banco</Text>
                <View className="flex-row flex-wrap gap-2">
                  {banks.map((b) => (
                    <SelectChip key={b} label={b} active={bank === b} onPress={() => setBank(b)} />
                  ))}
                </View>
              </View>
              <Field
                label={isCard ? "Número de tarjeta de débito" : "CLABE interbancaria (18 dígitos)"}
                value={number}
                onChangeText={setNumber}
                keyboardType="number-pad"
                placeholder={isCard ? "16 dígitos" : "18 dígitos"}
                error={error ?? undefined}
                helper={error ? undefined : `${digits.length}/${requiredLength} dígitos`}
              />
              <Button onPress={save}>Agregar</Button>
            </View>
          </GlassBottomSheet>
        </View>
      </Modal>

      <ConfirmSheet
        visible={removing !== null}
        title="¿Eliminar este método?"
        message={`Se eliminará "${removingAccount?.alias ?? ""}" (${removingAccount?.masked ?? ""}) de tus métodos registrados.`}
        confirmLabel="Sí, eliminar"
        destructive
        onConfirm={() => {
          if (removing) removeAccount(removing);
          setRemoving(null);
        }}
        onCancel={() => setRemoving(null)}
      />
    </Screen>
  );
}
