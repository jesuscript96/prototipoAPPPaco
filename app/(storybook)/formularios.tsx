import { useState } from "react";
import { Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, LogIn, Save, UserRound } from "lucide-react-native";
import { Button, Card, Checkbox, Field, GuideNote, InlineAlert, Progress, Screen, Section, SelectMock } from "@/components/ui";
import { mockSubmit } from "@/lib/mock-api";
import { loginSchema, LoginValues, profileSchema, ProfileValues, recordSchema, RecordValues } from "@/schemas/forms";

function LoginDemo() {
  const [success, setSuccess] = useState(false);
  const { control, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submit = handleSubmit(async () => {
    await mockSubmit();
    setSuccess(true);
  });

  return (
    <Card className="gap-4">
      <Controller control={control} name="email" render={({ field, fieldState }) => (
        <Field label="Correo" placeholder="tu@empresa.mx" autoCapitalize="none" keyboardType="email-address" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="password" render={({ field, fieldState }) => (
        <Field label="Contraseña" placeholder="Mínimo 8 caracteres" secureTextEntry value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Button icon={LogIn} loading={formState.isSubmitting} onPress={() => void submit()}>Entrar en modo demo</Button>
      {success ? <InlineAlert tone="success" title="Login simulado" description="No hay auth real; solo se muestra el estado de éxito del flujo." /> : null}
    </Card>
  );
}

function ProfileDemo() {
  const { control, handleSubmit, formState } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Mariana López", phone: "5512345678", role: "Gerente de Operaciones" },
  });

  const submit = handleSubmit(async () => mockSubmit());

  return (
    <Card className="gap-4">
      <Controller control={control} name="name" render={({ field, fieldState }) => (
        <Field label="Nombre completo" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="phone" render={({ field, fieldState }) => (
        <Field label="Teléfono" keyboardType="phone-pad" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="role" render={({ field, fieldState }) => (
        <Field label="Rol" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Field label="ID interno" value="USR-2048" readOnly helper="Campo readonly para datos generados por sistema." />
      <Button icon={UserRound} variant="secondary" loading={formState.isSubmitting} onPress={() => void submit()}>Actualizar perfil</Button>
    </Card>
  );
}

function RecordFormDemo() {
  const [saved, setSaved] = useState(false);
  const { control, handleSubmit, formState } = useForm<RecordValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: { client: "", amount: "", description: "", acceptsTerms: false },
  });

  const submit = handleSubmit(async () => {
    await mockSubmit();
    setSaved(true);
  });

  return (
    <Card className="gap-4">
      <Text className="text-lg font-bold text-slate-950">Formulario corto</Text>
      <Controller control={control} name="client" render={({ field, fieldState }) => (
        <Field label="Cliente requerido" placeholder="Ej. Café Norte" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="amount" render={({ field, fieldState }) => (
        <Field label="Monto estimado" placeholder="$0.00" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="description" render={({ field, fieldState }) => (
        <Field label="Descripción" placeholder="Explica el caso y el siguiente paso" multiline value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />
      )} />
      <Controller control={control} name="acceptsTerms" render={({ field, fieldState }) => (
        <View className="gap-2">
          <Checkbox label="Confirmo que revisé los datos" checked={field.value} onPress={() => field.onChange(!field.value)} />
          {fieldState.error ? <Text className="text-sm text-red-600">{fieldState.error.message}</Text> : null}
        </View>
      )} />
      <Button icon={Save} loading={formState.isSubmitting} onPress={() => void submit()}>Enviar mock</Button>
      {saved ? <InlineAlert tone="success" title="Registro guardado" description="El submit se resolvió con una promesa local simulada." /> : null}
    </Card>
  );
}

function WizardDemo() {
  const [step, setStep] = useState(1);
  return (
    <Card className="gap-4">
      <Text className="text-lg font-bold text-slate-950">Wizard multi-step</Text>
      <Progress value={step * 33} />
      {step === 1 ? <Field label="Datos generales" placeholder="Nombre del proyecto" helper="Paso 1 de 3" /> : null}
      {step === 2 ? <SelectMock label="Prioridad" value="Alta" /> : null}
      {step === 3 ? <InlineAlert tone="info" title="Revisión" description="Muestra resumen y confirma antes de enviar." /> : null}
      <View className="flex-row gap-3">
        <View className="flex-1"><Button variant="outline" disabled={step === 1} onPress={() => setStep((value) => Math.max(1, value - 1))}>Atrás</Button></View>
        <View className="flex-1"><Button onPress={() => setStep((value) => Math.min(3, value + 1))}>{step === 3 ? "Finalizar" : "Siguiente"}</Button></View>
      </View>
    </Card>
  );
}

export default function FormsScreen() {
  return (
    <Screen
      eyebrow="Formularios"
      title="Validación y flujos"
      description="Ejemplos con React Hook Form y Zod. Los submits son simulados y las validaciones están en español."
    >
      <Section title="Login mock"><LoginDemo /></Section>
      <Section title="Perfil de usuario"><ProfileDemo /></Section>
      <Section title="Formulario corto con errores por campo"><RecordFormDemo /></Section>
      <Section title="Formulario largo por secciones">
        <Card className="gap-4">
          <InlineAlert tone="info" title="Sección 1: Datos" description="Agrupa campos relacionados y muestra progreso." />
          <InlineAlert tone="neutral" title="Sección 2: Contacto" description="Marca requeridos y opcionales con copy claro." />
          <InlineAlert tone="warning" title="Descartar cambios" description="Si hay cambios sin guardar, pide confirmación antes de salir." />
        </Card>
      </Section>
      <Section title="Wizard de alta"><WizardDemo /></Section>
      <GuideNote />
      <InlineAlert tone="success" title="Reglas de formulario" description="Divide flujos largos, valida cerca del campo y conserva helper text útil." />
      <CheckCircle2 size={1} color="transparent" />
    </Screen>
  );
}
