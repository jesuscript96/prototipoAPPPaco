import { useState } from "react";
import { CreditCard, Landmark, Plus, Trash2 } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { Badge, Button, Card, Field, Screen } from "@/components/paco/layout";
import { ConfirmSheet, Segmented, SelectChip, SheetHeader, cn } from "@/components/paco/ui";
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
      <View className="gap-2.5">
        {accounts.map((account) => (
          <Card key={account.id} className="gap-2">
            <View className="flex-row items-center gap-3">
              <View className={cn("h-11 w-11 items-center justify-center rounded-[12px]", account.kind === "Tarjeta" ? "bg-violet-50" : "bg-brand-50")}>
                {account.kind === "Tarjeta" ? <CreditCard size={20} color="#7c3aed" strokeWidth={2} /> : <Landmark size={20} color="#3148c8" strokeWidth={2} />}
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-slate-950">{account.alias}</Text>
                <Text className="text-sm text-slate-500">
                  {account.bank} · {account.masked}
                </Text>
              </View>
              {account.primary ? <Badge tone="success">Principal</Badge> : null}
            </View>
            {!account.primary ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => setRemoving(account.id)}
                className="min-h-10 flex-row items-center gap-1.5 self-start"
              >
                <Trash2 size={14} color="#dc2626" />
                <Text className="text-xs font-bold text-red-600">Eliminar</Text>
              </Pressable>
            ) : (
              <Text className="text-xs text-slate-400">La cuenta principal de nómina no puede eliminarse desde la app.</Text>
            )}
          </Card>
        ))}
      </View>

      <Button icon={Plus} onPress={() => setAdding(true)}>
        Agregar cuenta o tarjeta
      </Button>

      <Modal transparent visible={adding} animationType="slide" onRequestClose={() => setAdding(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[20px] bg-white p-5 pb-8">
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
          </View>
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
