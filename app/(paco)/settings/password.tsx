import { useState } from "react";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Save, ShieldCheck } from "@/components/paco/glyphs";
import { Pressable, Text, TextInput, View } from "react-native";
import { Button, Card, glassInputRowClass, Screen } from "@/components/paco/layout";
import { SuccessCard, cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { usePacoStore } from "@/store/paco-store";

function PasswordField({
  label,
  value,
  onChangeText,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-slate-700">{label}</Text>
      <View className={cn(glassInputRowClass, "pr-2", error ? "border-red-300" : undefined)}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          className="min-h-12 flex-1 px-4 text-base text-slate-950"
        />
        <Pressable
          accessibilityLabel={visible ? "Ocultar" : "Mostrar"}
          onPress={() => setVisible((v) => !v)}
          className="h-11 w-11 items-center justify-center"
        >
          {visible ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
        </Pressable>
      </View>
      {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}

export default function PasswordScreen() {
  const router = useRouter();
  const { changePassword } = usePacoStore();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ current?: string; next?: string; confirm?: string }>({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const save = async () => {
    const nextErrors: typeof errors = {};
    if (current.length < 4) nextErrors.current = "Ingresa tu contraseña actual.";
    if (next.length < 8) nextErrors.next = "La nueva contraseña debe tener al menos 8 caracteres.";
    if (next !== confirm) nextErrors.confirm = "Las contraseñas no coinciden.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSaving(true);
    await simulate(null, 1000);
    changePassword();
    setSaving(false);
    setDone(true);
  };

  if (done) {
    return (
      <Screen>
        <SuccessCard title="Contraseña actualizada" description="Usarás tu nueva contraseña la próxima vez que ingreses a la app.">
          <View className="w-full pt-2">
            <Button onPress={() => router.back()}>Volver a configuración</Button>
          </View>
        </SuccessCard>
      </Screen>
    );
  }

  return (
    <Screen title="Cambiar contraseña" description="Usarás tu contraseña para ingresar a la app.">
      <Card className="items-center gap-2 py-6">
        <ShieldCheck size={40} color="#2F42CB" />
        <Text className="text-center text-sm leading-5 text-slate-600">
          Combina mayúsculas, minúsculas, números y símbolos para una contraseña fuerte.
        </Text>
      </Card>
      <Card className="gap-4">
        <PasswordField label="Contraseña actual" value={current} onChangeText={setCurrent} error={errors.current ?? ""} />
        <PasswordField label="Nueva contraseña" value={next} onChangeText={setNext} error={errors.next ?? ""} />
        <PasswordField label="Confirmar contraseña" value={confirm} onChangeText={setConfirm} error={errors.confirm ?? ""} />
        <Button icon={Save} loading={saving} onPress={save}>
          Guardar
        </Button>
      </Card>
    </Screen>
  );
}
