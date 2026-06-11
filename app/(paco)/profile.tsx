import { useState } from "react";
import { Camera, FileText, Pencil, Save, Upload, X } from "@/components/paco/glyphs";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Badge, Button, Card, Divider, Screen, Section } from "@/components/paco/layout";
import { cn } from "@/components/paco/ui";
import { simulate } from "@/lib/paco-api";
import { employee } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

function EditableRow({
  label,
  value,
  onSave,
  keyboard,
}: {
  label: string;
  value: string;
  onSave: (next: string) => void;
  keyboard?: "email-address" | "phone-pad";
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  return (
    <View className="gap-2">
      <Text className="text-xs font-bold text-slate-500">{label}</Text>
      {editing ? (
        <View className="flex-row items-center gap-2">
          <TextInput
            value={draft}
            onChangeText={setDraft}
            autoCapitalize="none"
            keyboardType={keyboard}
            className="min-h-11 flex-1 rounded-2xl border border-brand-300 bg-white px-3 text-sm text-slate-950"
          />
          <Pressable
            accessibilityLabel={`Guardar ${label}`}
            onPress={() => {
              onSave(draft.trim());
              setEditing(false);
            }}
            className="h-11 w-11 items-center justify-center rounded-xl bg-brand-500"
          >
            <Save size={16} color="#fff" />
          </Pressable>
          <Pressable
            accessibilityLabel="Cancelar edición"
            onPress={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="h-11 w-11 items-center justify-center rounded-xl bg-slate-100"
          >
            <X size={16} color="#64748b" />
          </Pressable>
        </View>
      ) : (
        <View className="flex-row items-center justify-between gap-2">
          <Text className="flex-1 text-sm text-slate-800">{value}</Text>
          <Pressable
            accessibilityLabel={`Editar ${label}`}
            onPress={() => {
              setDraft(value);
              setEditing(true);
            }}
            className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100"
          >
            <Pencil size={14} color="#2F42CB" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default function ProfileScreen() {
  const store = usePacoStore();
  const [contractOpen, setContractOpen] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  const uploadCv = async () => {
    setUploadingCv(true);
    await simulate(null, 1100);
    store.uploadCv();
    setUploadingCv(false);
  };

  const fields: [string, string][] = [
    ["Nombre completo", employee.name],
    ["Género", employee.gender],
    ["Fecha de nacimiento", employee.birthDate],
    ["Número de colaborador", employee.employeeNumber],
    ["RFC", employee.rfc],
    ["CURP", employee.curp],
    ["Número de Seguridad Social", employee.nss],
    ["Fecha de contratación", employee.hireDate],
    ["Antigüedad", employee.seniority],
    ["Empleador (razón social)", employee.employer],
    ["Periodicidad de pago", employee.payPeriod],
    ["Departamento", employee.department],
    ["Área", employee.area],
    ["Puesto", employee.role],
  ];

  return (
    <Screen title="Mi expediente" description="Información sincronizada desde el panel de tu empresa. Solo correo y teléfono son editables desde la app.">
      <Card className="gap-4 overflow-hidden bg-ink p-5">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-xs font-bold uppercase tracking-[2px] text-white/60">Tarjeta digital de colaborador</Text>
            <Text className="mt-2 text-xl font-bold text-white">{employee.name}</Text>
            <Text className="text-sm text-white/80">{employee.role}</Text>
          </View>
          <Pressable
            accessibilityLabel="Foto de perfil"
            onPress={store.setProfilePhoto}
            className={cn("h-14 w-14 items-center justify-center rounded-2xl", store.profilePhotoSet ? "bg-white" : "bg-white/20")}
          >
            {store.profilePhotoSet ? <Text className="text-lg font-bold text-brand-700">{employee.initials}</Text> : <Camera size={20} color="#fff" />}
          </Pressable>
        </View>
        <View className="flex-row items-end justify-between">
          <View className="gap-0.5">
            <Text className="text-xs text-white/70">No. colaborador: {employee.employeeNumber}</Text>
            <Text className="text-xs text-white/70">{employee.area} · {employee.department}</Text>
            <Text className="text-xs text-white/70">Vigente al 31 dic 2026</Text>
            <View className="mt-1 self-start rounded-full bg-emerald-400/20 px-2 py-0.5">
              <Text className="text-[10px] font-bold text-emerald-300">● ACTIVO</Text>
            </View>
          </View>
          <View className="h-20 w-20 items-center justify-center rounded-xl bg-white p-1">
            <View className="flex-1 w-full flex-row flex-wrap">
              {Array.from({ length: 36 }).map((_, index) => (
                <View key={index} style={{ width: "16.66%", height: "16.66%" }} className={(index * 7 + 3) % 5 < 2 || index % 9 === 0 ? "bg-slate-900" : "bg-white"} />
              ))}
            </View>
            <Text className="text-[7px] font-bold text-slate-500">PACO-ID-{employee.employeeNumber}</Text>
          </View>
        </View>
      </Card>

      <Section title="Contrato y documentos">
        <Card className="gap-3">
          <Button icon={FileText} variant="outline" onPress={() => setContractOpen(true)}>
            Abrir contrato laboral (PDF)
          </Button>
          <Button icon={Upload} variant={store.cvUploaded ? "secondary" : "outline"} loading={uploadingCv} onPress={uploadCv}>
            {store.cvUploaded ? "Currículum cargado" : "Subir currículum"}
          </Button>
          <Button
            icon={Upload}
            variant={store.contractUploaded ? "secondary" : "outline"}
            onPress={store.uploadContract}
          >
            {store.contractUploaded ? "Contrato firmado cargado" : "Subir contrato firmado"}
          </Button>
        </Card>
      </Section>

      <Section title="Datos de contacto" description="Editables desde la app; el resto se actualiza vía Recursos Humanos.">
        <Card className="gap-4">
          <EditableRow label="Correo electrónico" value={store.email} keyboard="email-address" onSave={store.updateEmail} />
          <Divider />
          <EditableRow label="Teléfono celular" value={store.phone} keyboard="phone-pad" onSave={store.updatePhone} />
        </Card>
      </Section>

      <Section title="Datos laborales y personales">
        <Card className="gap-3">
          {fields.map(([label, value], index) => (
            <View key={label} className={cn("flex-row items-start justify-between gap-3", index > 0 && "border-t border-slate-100 pt-3")}>
              <Text className="text-xs font-bold text-slate-500">{label}</Text>
              <Text className="flex-1 text-right text-sm text-slate-800">{value}</Text>
            </View>
          ))}
        </Card>
      </Section>

      <Modal transparent visible={contractOpen} animationType="slide" onRequestClose={() => setContractOpen(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="max-h-[80%] rounded-t-[20px] bg-white p-5">
            <View className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
            <Text className="text-center text-xs font-bold uppercase tracking-[2px] text-slate-400">Visor PDF · Contrato laboral</Text>
            <View className="mt-4 gap-3 rounded-2xl border border-slate-200 p-4">
              <Text className="text-center text-sm font-bold text-slate-950">CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO INDETERMINADO</Text>
              <Text className="text-xs leading-5 text-slate-600">
                Que celebran por una parte {employee.employer}, representada en este acto por su apoderado legal, y por la otra{" "}
                {employee.name}, a quien en lo sucesivo se le denominará "EL TRABAJADOR", con fecha de inicio {employee.hireDate},
                para desempeñar el puesto de {employee.role} en el área de {employee.area}, con periodicidad de pago{" "}
                {employee.payPeriod.toLowerCase()}…
              </Text>
              <Badge tone="success">Firmado el {employee.hireDate}</Badge>
            </View>
            <View className="pt-4">
              <Button onPress={() => setContractOpen(false)}>Cerrar visor</Button>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
