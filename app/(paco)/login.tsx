import { useState } from "react";
import { useRouter } from "expo-router";
import { AlertTriangle, ArrowLeft, Eye, EyeOff, LogIn } from "@/components/paco/glyphs";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { brandAssets, illustrationAssets } from "@/components/paco/assets";
import { Ambient, Button, GlassNavButton } from "@/components/paco/layout";
import { ShakeView } from "@/components/paco/motion";
import { HelpFab } from "@/components/paco/ui";
import { mockLogin } from "@/lib/paco-api";
import { usePacoStore } from "@/store/paco-store";

export default function LoginScreen() {
  const router = useRouter();
  const login = usePacoStore((s) => s.login);
  const [identifier, setIdentifier] = useState("ricardo.jafif@lacentral.mx");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const result = await mockLogin(identifier, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    login();
    router.replace("/(paco)/home");
  };

  return (
    <View className="flex-1 bg-canvas">
      <Ambient />

      {error ? (
        <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center gap-2 bg-red-600 px-5 pb-3 pt-14">
          <AlertTriangle size={18} color="#fff" />
          <Text className="flex-1 text-sm font-semibold text-white">{error}</Text>
        </View>
      ) : null}

      <View className="flex-row items-center px-5 pt-14">
        <GlassNavButton icon={ArrowLeft} label="Regresar" onPress={() => router.back()} />
      </View>

      <ScrollView contentContainerClassName="flex-grow justify-center px-6 pb-16">
        <View className="items-center gap-3 pb-7">
          <View className="h-16 w-16 items-center justify-center rounded-[16px] border border-white/90 bg-white/85 shadow-card">
            <Image source={brandAssets.iconMain} resizeMode="contain" style={{ width: 45, height: 45 }} />
          </View>
          <Image source={illustrationAssets.loginConfirm} resizeMode="contain" style={{ width: 168, height: 92 }} />
          <Text className="text-[27px] font-bold tracking-tight text-slate-950">Inicia sesión</Text>
          <Text className="text-center text-sm leading-6 text-slate-500">
            Acceso exclusivo para colaboradores registrados por tu empresa en el panel Paco.
          </Text>
        </View>

        <ShakeView trigger={error} className="gap-4 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-pop">
          <View className="gap-1.5">
            <Text className="text-[13px] font-semibold text-slate-600">Teléfono o correo</Text>
            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="correo@empresa.mx o 10 dígitos"
              placeholderTextColor="#94a3b8"
              className="min-h-[50px] rounded-xl border border-slate-900/10 bg-white px-4 text-base text-slate-950"
            />
          </View>
          <View className="gap-1.5">
            <Text className="text-[13px] font-semibold text-slate-600">Contraseña</Text>
            <View className="flex-row items-center rounded-xl border border-slate-900/10 bg-white pr-2">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Tu contraseña"
                placeholderTextColor="#94a3b8"
                onSubmitEditing={submit}
                className="min-h-[50px] flex-1 px-4 text-base text-slate-950"
              />
              <Pressable
                accessibilityLabel={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onPress={() => setShowPassword((v) => !v)}
                className="h-11 w-11 items-center justify-center"
              >
                {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
              </Pressable>
            </View>
          </View>

          <Button icon={LogIn} loading={loading} onPress={submit}>
            Inicia sesión
          </Button>

          <View className="flex-row items-center justify-between">
            <Pressable accessibilityRole="button" onPress={() => router.push("/(paco)/recover")} className="min-h-11 justify-center">
              <Text className="text-[13px] font-bold text-brand-600">Olvidé mi contraseña</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => router.push("/(paco)/activate")} className="min-h-11 justify-center">
              <Text className="text-[13px] font-bold text-brand-600">No tengo cuenta</Text>
            </Pressable>
          </View>

          <View className="rounded-xl bg-slate-900/5 p-3">
            <Text className="text-xs leading-4 text-slate-500">
              Modo demo: cualquier contraseña de 4+ caracteres inicia sesión. Escribe "error" para ver la alerta de
              credenciales incorrectas.
            </Text>
          </View>
        </ShakeView>
      </ScrollView>

      <HelpFab onPress={() => router.push("/(paco)/help")} />
    </View>
  );
}
