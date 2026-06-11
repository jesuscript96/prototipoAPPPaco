import { ReactNode, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CheckCircle2, Download, FileCheck2, Send, ShieldCheck, Trash2 } from "lucide-react-native";
import {
  AttachmentPreview,
  Badge,
  Button,
  Card,
  Checkbox,
  Field,
  InlineAlert,
  Progress,
  RadioRow,
  Section,
  SwitchRow,
} from "@/components/ui";
import {
  bankAccounts,
  celebrations,
  chatRooms,
  communications,
  corporateDocuments,
  demoEmployee,
  discountCoupons,
  documentTemplates,
  employeeDigitalCard,
  employeeRequests,
  expenses,
  feedbackReports,
  feelings,
  kycSteps,
  legalAcceptance,
  moodEntries,
  moodFactors,
  notifications,
  onboardingTasks,
  PacoModuleId,
  payrollAdvance,
  payrollReceipts,
  recognitionBadges,
  requestTypes,
  serviceProviders,
  suaLetters,
  supportBot,
  supportTicket,
  surveys,
  topupOperators,
  trainingCourses,
  trainingEvaluations,
  voiceCategories,
  wellnessCategories,
} from "@/mock/paco-data";
import { useDemoStore } from "@/store/demo-store";

type PillProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

function Pill({ label, active, onPress }: PillProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-2 ${active ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white"}`}
    >
      <Text className={`text-sm font-bold ${active ? "text-brand-700" : "text-slate-600"}`}>{label}</Text>
    </Pressable>
  );
}

function StepHeader({ step, total, title }: { step: number; total: number; title: string }) {
  return (
    <Card className="gap-2 bg-brand-50">
      <Text className="text-xs font-bold uppercase tracking-wide text-brand-700">Paso {step} de {total}</Text>
      <Text className="text-xl font-bold text-slate-950">{title}</Text>
      <Progress value={Math.round((step / total) * 100)} />
    </Card>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <View className="flex-row items-start justify-between gap-3">
      <Text className="text-sm font-bold text-slate-500">{label}</Text>
      <Text className="flex-1 text-right text-sm text-slate-900">{value}</Text>
    </View>
  );
}

function Money({ value }: { value: number }) {
  return `$${value.toLocaleString("es-MX")}`;
}

export function PacoFunctionalModule({ id }: { id: PacoModuleId }) {
  switch (id) {
    case "notifications":
      return <NotificationsModule />;
    case "employee-onboarding":
      return <EmployeeOnboardingModule />;
    case "surveys":
      return <SurveysModule />;
    case "mood":
      return <MoodModule />;
    case "celebrations":
      return <CelebrationsModule />;
    case "payroll-advance":
      return <PayrollAdvanceModule />;
    case "expenses":
      return <ExpensesModule />;
    case "discount-club":
      return <DiscountClubModule />;
    case "topups":
      return <TopupsModule />;
    case "services":
      return <ServicesModule />;
    case "comms":
      return <CommsModule />;
    case "voice":
    case "voice-status":
      return <VoiceModule />;
    case "recognitions":
      return <RecognitionsModule />;
    case "requests":
      return <RequestsModule />;
    case "wellness":
      return <WellnessModule />;
    case "document-requests":
      return <DocumentRequestsModule />;
    case "training":
      return <TrainingModule />;
    case "profile":
      return <ProfileModule />;
    case "corporate-docs":
      return <CorporateDocsModule />;
    case "payroll-docs":
      return <PayrollDocsModule />;
    case "settings":
      return <SettingsModule />;
    case "support":
      return <SupportModule />;
    case "internal-chat":
      return <InternalChatModule />;
    case "legal":
      return <LegalModule />;
    default:
      return null;
  }
}

function NotificationsModule() {
  const store = useDemoStore();
  const [removed, setRemoved] = useState<string[]>([]);
  const visible = notifications.filter((item) => !removed.includes(item.id));

  return (
    <Section title="Buzón unificado accionable" description="No solo lista avisos: permite limpiar, abrir adjuntos y saltar al flujo correcto.">
      {visible.map((item) => {
        const read = item.read || store.readNotificationIds.includes(item.id);
        return (
          <Card key={item.id} className="gap-3">
            <View className="flex-row items-center justify-between">
              <Badge tone={read ? "neutral" : item.tone}>{item.type}</Badge>
              <Text className="text-xs font-bold text-slate-500">{item.time}</Text>
            </View>
            <Text className="text-lg font-bold text-slate-950">{item.title}</Text>
            <Text className="text-sm leading-5 text-slate-600">{item.body}</Text>
            {item.type === "Onboarding" ? <AttachmentPreview name="manual-induccion.pdf" size="1.6 MB" /> : null}
            <View className="flex-row gap-2">
              <Button variant="outline" onPress={store.markAllPacoNotificationsRead}>Marcar leída</Button>
              <Button variant="ghost" icon={Trash2} onPress={() => setRemoved((current) => [...current, item.id])}>Quitar</Button>
            </View>
          </Card>
        );
      })}
      {visible.length === 0 ? <InlineAlert title="Buzón limpio" description="No hay notificaciones pendientes." tone="success" /> : null}
    </Section>
  );
}

function EmployeeOnboardingModule() {
  const store = useDemoStore();
  const [activeId, setActiveId] = useState<string>(onboardingTasks[0].id);
  const activeTask = onboardingTasks.find((task) => task.id === activeId) ?? onboardingTasks[0];
  const completed = store.completedOnboardingTaskIds.includes(activeTask.id);

  return (
    <>
      <Section title="Plan de incorporación programado">
        <View className="flex-row flex-wrap gap-2">
          {onboardingTasks.map((task) => (
            <Pill key={task.id} label={`${task.scheduledFor}: ${task.type}`} active={task.id === activeId} onPress={() => setActiveId(task.id)} />
          ))}
        </View>
        <Card className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-xl font-bold text-slate-950">{activeTask.title}</Text>
            <Badge tone={completed ? "success" : "warning"}>{completed ? "Completada" : activeTask.status}</Badge>
          </View>
          <Row label="Vencimiento" value={activeTask.dueDate} />
          <Row label="Mentor" value={activeTask.mentor} />
          <InlineAlert title="Notificación push" description="Se programa recordatorio al colaborador y aviso al mentor si debe calificar." tone="info" />
          {activeTask.materials.map((material) => (
            <AttachmentPreview key={material.title} name={`${material.title} · ${material.type}`} size={material.size} />
          ))}
          {activeTask.type === "Encuesta / examen" ? (
            <View className="gap-2 rounded-2xl bg-slate-100 p-3">
              <Text className="font-bold text-slate-900">Examen rápido</Text>
              <RadioRow label="Sí leí la política de seguridad" selected />
              <RadioRow label="Solicito revisión del mentor" selected={false} />
              <Field label="Respuesta abierta" value="Me comprometo a cumplir el proceso de apertura." readOnly />
            </View>
          ) : null}
          <Button icon={CheckCircle2} onPress={() => store.completeOnboardingTask(activeTask.id)}>
            {completed ? "Tarea finalizada" : "Enviar avance"}
          </Button>
        </Card>
      </Section>
    </>
  );
}

function SurveysModule() {
  const store = useDemoStore();
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const survey = surveys[surveyIndex] ?? surveys[0];
  const question = survey.questions[questionIndex] ?? survey.questions[0];

  return (
    <Section title="Responder encuesta con progreso">
      <View className="flex-row flex-wrap gap-2">
        {surveys.map((item, index) => <Pill key={item.id} label={item.title} active={index === surveyIndex} onPress={() => { setSurveyIndex(index); setQuestionIndex(0); setSubmitted(false); }} />)}
      </View>
      <StepHeader step={submitted ? survey.questions.length : questionIndex + 1} total={survey.questions.length} title={survey.title} />
      <Card className="gap-3">
        <Badge tone={survey.mandatory ? "warning" : "info"}>{survey.mandatory ? "Obligatoria" : `Vence ${survey.dueDate}`}</Badge>
        <Text className="text-lg font-bold text-slate-950">{question}</Text>
        <RadioRow label="Totalmente de acuerdo" selected={questionIndex === 0} />
        <RadioRow label="Parcialmente de acuerdo" selected={questionIndex === 1} />
        <RadioRow label="No aplica / prefiero describir" selected={questionIndex > 1} />
        <Field label="Comentario opcional" placeholder="Escribe un comentario para RH" multiline />
        <View className="flex-row gap-2">
          <Button variant="outline" disabled={questionIndex === 0} onPress={() => setQuestionIndex((value) => Math.max(0, value - 1))}>Anterior</Button>
          {questionIndex < survey.questions.length - 1 ? (
            <Button onPress={() => setQuestionIndex((value) => value + 1)}>Siguiente</Button>
          ) : (
            <Button icon={Send} onPress={() => { setSubmitted(true); if (survey.mandatory) store.completeMandatorySurvey(); }}>Enviar encuesta</Button>
          )}
        </View>
      </Card>
      {submitted ? <InlineAlert title="Encuesta enviada" description="Las respuestas quedan guardadas para procesamiento en panel administrativo." tone="success" /> : null}
    </Section>
  );
}

function MoodModule() {
  const store = useDemoStore();
  const [score, setScore] = useState(58);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>(["Confianza"]);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(["Trabajo"]);
  const toggle = (value: string, list: string[], setter: (items: string[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <>
      <Section title="Registro diario interactivo">
        <Card className="gap-4">
          <View className="items-center gap-2">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-brand-50">
              <Text className="text-5xl">{score > 75 ? ":)" : score > 45 ? ":|" : ":("}</Text>
            </View>
            <Text className="text-2xl font-bold text-slate-950">{score > 75 ? "Muy bien" : score > 45 ? "Regular" : "Necesito apoyo"}</Text>
            <Progress value={score} />
          </View>
          <View className="flex-row flex-wrap gap-2">{[20, 40, 60, 80, 100].map((value) => <Pill key={value} label={`${value}`} active={score === value} onPress={() => setScore(value)} />)}</View>
          <Text className="font-bold text-slate-900">Sentimientos</Text>
          <View className="flex-row flex-wrap gap-2">{feelings.map((item) => <Pill key={item} label={item} active={selectedFeelings.includes(item)} onPress={() => toggle(item, selectedFeelings, setSelectedFeelings)} />)}</View>
          <Text className="font-bold text-slate-900">Factores influyentes</Text>
          <View className="flex-row flex-wrap gap-2">{moodFactors.map((item) => <Pill key={item} label={item} active={selectedFactors.includes(item)} onPress={() => toggle(item, selectedFactors, setSelectedFactors)} />)}</View>
          <Button icon={CheckCircle2} onPress={store.submitMood}>Registrar y alimentar analíticos</Button>
        </Card>
      </Section>
      <Section title="Analíticos de clima">
        {moodEntries.map((entry) => <Card key={entry.date} className="gap-2"><Text className="font-bold">{entry.date} · {entry.label}</Text><Progress value={entry.score} /><Text className="text-sm text-slate-600">{entry.feelings.join(", ")} · {entry.factors.join(", ")}</Text></Card>)}
      </Section>
    </>
  );
}

function CelebrationsModule() {
  const [filter, setFilter] = useState("Todos");
  const [sent, setSent] = useState<string[]>([]);
  const visible = celebrations.filter((item) => filter === "Todos" || item.type === filter);
  return (
    <Section title="Celebraciones del equipo">
      <View className="flex-row gap-2">{["Todos", "Cumpleaños", "Aniversario"].map((item) => <Pill key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />)}</View>
      {visible.map((item) => <Card key={`${item.name}-${item.date}`} className="gap-3"><Row label={item.type} value={`${item.name} · ${item.date}`} /><Row label="Área" value={item.area} />{item.years ? <Badge tone="success">{item.years} años de antigüedad</Badge> : null}<Button variant="outline" onPress={() => setSent((current) => [...current, item.name])}>{sent.includes(item.name) ? "Felicitación enviada" : "Enviar felicitación"}</Button></Card>)}
    </Section>
  );
}

function PayrollAdvanceModule() {
  const store = useDemoStore();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(payrollAdvance.selected);
  const commission = Math.round(amount * 0.08);
  const net = amount - commission;

  return (
    <Section title="Adelanto de nómina transaccional">
      <StepHeader step={step} total={4} title={["KYC inicial", "Simulador", "Cuenta y legales", "Confirmación"][step - 1] ?? "Adelanto"} />
      {step === 1 ? <Card className="gap-3"><InlineAlert title="Primer uso requiere validación" description="INE frente, INE reverso y selfie se envían a tercero antes de permitir dispersión." tone="warning" />{kycSteps.map((item) => <Checkbox key={item} label={item} checked={store.payrollKycDone} />)}<Button icon={ShieldCheck} onPress={() => { store.completePayrollKyc(); setStep(2); }}>Validar identidad</Button></Card> : null}
      {step === 2 ? <Card className="gap-3"><Row label="Mínimo" value={<Money value={payrollAdvance.min} />} /><Row label="Máximo" value={<Money value={payrollAdvance.max} />} /><View className="flex-row flex-wrap gap-2">{[200, 300, 600, 1200, 2500].map((value) => <Pill key={value} label={`$${value}`} active={amount === value} onPress={() => setAmount(value)} />)}</View><Progress value={Math.round((amount / payrollAdvance.max) * 100)} /><Button onPress={() => setStep(3)}>Continuar</Button></Card> : null}
      {step === 3 ? <Card className="gap-3"><Row label="Cuenta destino" value={`${bankAccounts[0].alias} · ${bankAccounts[0].number}`} /><Row label="Monto" value={<Money value={amount} />} /><Row label="Comisión" value={<Money value={commission} />} /><Row label="Neto" value={<Money value={net} />} /><Checkbox label="Acepto términos, mandato de cobro, domiciliación e información crediticia." checked /><Button onPress={() => setStep(4)}>Revisar confirmación</Button></Card> : null}
      {step === 4 ? <Card className="gap-3"><InlineAlert title="Listo para confirmar" description={`Se depositarán ${Money({ value: net })} y se cobrará el ${payrollAdvance.chargeDate}.`} tone="info" /><Button icon={CheckCircle2} onPress={store.submitPayrollAdvance}>{store.payrollAdvanceSubmitted ? "Confirmado y reflejado en gastos" : "Confirmar adelanto"}</Button></Card> : null}
    </Section>
  );
}

function ExpensesModule() {
  const [filter, setFilter] = useState("Todos");
  const [supportOpened, setSupportOpened] = useState(false);
  const visible = expenses.filter((item) => filter === "Todos" || item.type.includes(filter));
  return <Section title="Estado de cuenta"><View className="flex-row gap-2">{["Todos", "Adelanto", "Recarga", "Pago"].map((item) => <Pill key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />)}</View><Card className="gap-2"><Row label="Adeudo vigente" value="$1,296" /><Progress value={64} /><Text className="text-sm text-slate-600">Gráfica circular mock: adelanto 72%, servicios 20%, recargas 8%.</Text></Card>{visible.map((item) => <Card key={item.id} className="gap-2"><Row label={item.type} value={`${Money({ value: item.amount })} · ${item.status}`} /><Row label="Periodo" value={`${item.period} · ${item.date}`} /><Row label="Comisión" value={<Money value={item.commission} />} /></Card>)}<Button variant="outline" onPress={() => setSupportOpened(true)}>{supportOpened ? "WhatsApp abierto: necesito ayuda" : "Contactar soporte WhatsApp"}</Button>{supportOpened ? <InlineAlert title="Soporte WhatsApp" description="Se preparó una conversación mock con Paco para dudas sobre gastos." tone="success" /> : null}</Section>;
}

function DiscountClubModule() {
  const [redeemed, setRedeemed] = useState("");
  return <Section title="Club de Descuentos PiN">{discountCoupons.map((coupon) => <Card key={coupon.brand} className="gap-3"><View className="flex-row justify-between"><Text className="text-lg font-bold text-slate-950">{coupon.brand}</Text><Badge tone="success">{coupon.distance}</Badge></View><Text className="text-2xl font-bold text-brand-700">{coupon.offer}</Text><Text className="text-sm text-slate-600">{coupon.category} · {coupon.expires}</Text><Button variant="outline" onPress={() => setRedeemed(coupon.brand)}>{redeemed === coupon.brand ? "Cupón abierto en PiN" : "Abrir cupón PiN"}</Button></Card>)}</Section>;
}

function TopupsModule() {
  const [operator, setOperator] = useState("Telcel");
  const [amount, setAmount] = useState(150);
  const [step, setStep] = useState(1);
  const [paid, setPaid] = useState(false);
  const selected = topupOperators.find((item) => item.name === operator) ?? topupOperators[0];
  return <Section title="Compra de tiempo aire"><StepHeader step={step} total={3} title={["Proveedor", "Teléfono", "Confirmación"][step - 1] ?? "Recarga"} />{step === 1 ? <Card className="gap-3"><View className="flex-row flex-wrap gap-2">{topupOperators.map((item) => <Pill key={item.name} label={item.name} active={operator === item.name} onPress={() => setOperator(item.name)} />)}</View><View className="flex-row flex-wrap gap-2">{selected.amounts.map((value) => <Pill key={value} label={`$${value}`} active={amount === value} onPress={() => setAmount(value)} />)}</View><Button onPress={() => setStep(2)}>Continuar</Button></Card> : null}{step === 2 ? <Card className="gap-3"><Field label="Número celular" value="55 6677 8899" readOnly /><Field label="Confirmar número" value="55 6677 8899" readOnly /><Button onPress={() => setStep(3)}>Validar número</Button></Card> : null}{step === 3 ? <Card className="gap-3"><Row label="Operador" value={operator} /><Row label="Monto" value={<Money value={amount} />} /><Field label="Código de seguridad" value="482910" readOnly /><Button icon={CheckCircle2} onPress={() => setPaid(true)}>{paid ? "Recarga pagada y firmada" : "Pagar recarga"}</Button>{paid ? <InlineAlert title="Recarga exitosa" description={`${operator} recibió una recarga de ${Money({ value: amount })}.`} tone="success" /> : null}</Card> : null}</Section>;
}

function ServicesModule() {
  const [provider, setProvider] = useState<string>(serviceProviders[0].name);
  const [kyc, setKyc] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [paid, setPaid] = useState(false);
  const active = serviceProviders.find((item) => item.name === provider) ?? serviceProviders[0];
  return <Section title="Pago de servicios"><Card className="gap-3"><View className="flex-row flex-wrap gap-2">{serviceProviders.map((item) => <Pill key={item.name} label={item.name} active={provider === item.name} onPress={() => setProvider(item.name)} />)}</View><Row label="Categoría" value={active.category} /><Field label="Referencia" value={scanned ? active.reference : ""} readOnly placeholder="Escanea o captura referencia" /><Row label="Monto" value={<Money value={active.amount} />} /><Button variant="outline" onPress={() => setScanned(true)}>{scanned ? "Referencia escaneada" : "Escanear código con cámara mock"}</Button><Text className="font-bold">KYC / pasarela de tercero</Text>{kycSteps.map((step, index) => <Checkbox key={step} label={step} checked={index < kyc} onPress={() => setKyc(index + 1)} />)}<Button icon={CheckCircle2} disabled={!scanned || kyc < kycSteps.length} onPress={() => setPaid(true)}>{paid ? "Servicio pagado" : "Confirmar pago"}</Button>{paid ? <InlineAlert title="Pago exitoso" description={`${active.name} procesado con referencia ${active.reference}.`} tone="success" /> : null}</Card></Section>;
}

function CommsModule() {
  const [opened, setOpened] = useState("");
  return <Section title="Centro de mensajes corporativos">{communications.map((item) => <Card key={item.title} className="gap-3"><Text className="text-lg font-bold">{item.title}</Text><Text className="text-sm text-slate-600">{item.body}</Text>{item.attachments.map((attachment) => <AttachmentPreview key={attachment.name} {...attachment} />)}<Button icon={Download} onPress={() => setOpened(item.title)}>{opened === item.title ? "Adjunto abierto" : "Abrir comunicado"}</Button></Card>)}</Section>;
}

function VoiceModule() {
  const store = useDemoStore();
  const [category, setCategory] = useState("Clima laboral");
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState<string[]>(feedbackReports[0].messages.map((item) => item.text));
  return <Section title="Voz del colaborador"><Card className="gap-3"><Text className="font-bold">Categoría sensible</Text>{voiceCategories.map((item) => <Pressable key={item.name} onPress={() => setCategory(item.name)} className="rounded-2xl border border-slate-200 p-3"><RadioRow label={item.name} selected={category === item.name} /><Text className="mt-1 text-sm text-slate-600">{item.description}</Text></Pressable>)}<Field label="Comentario" value="Quiero reportar una situación para revisión de RH." readOnly multiline /><AttachmentPreview name="evidencia.jpg" size="640 KB" /><SwitchRow label="Enviar de forma anónima" value /><Button icon={Send} onPress={() => { setSent(true); store.submitFeedbackReport(); }}>Enviar reporte</Button></Card>{sent ? <Card className="gap-3"><Badge tone="warning">En proceso</Badge>{messages.map((message, index) => <View key={`${message}-${index}`} className={`rounded-2xl p-3 ${index % 2 === 0 ? "bg-brand-50" : "bg-slate-100"}`}><Text className="text-sm">{message}</Text></View>)}<Button onPress={() => setMessages((current) => [...current, "Gracias, agrego más contexto para RH."])}>Responder en chat</Button></Card> : null}</Section>;
}

function RecognitionsModule() {
  const store = useDemoStore();
  const [badge, setBadge] = useState("Iniciativa");
  return <Section title="Reconocimientos con historial"><Card className="gap-3">{recognitionBadges.map((item) => <Pressable key={item.name} onPress={() => setBadge(item.name)} className="rounded-2xl bg-slate-100 p-3"><RadioRow label={item.name} selected={badge === item.name} /><Text className="text-sm text-slate-600">{item.description}</Text></Pressable>)}<Field label="Destinatario" value="Orlando Luna" readOnly /><Field label="Motivo" value="Porque siempre busca resolver." readOnly multiline /><Button icon={Send} onPress={store.sendRecognition}>Enviar reconocimiento</Button></Card></Section>;
}

function RequestsModule() {
  const store = useDemoStore();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string>(requestTypes[0].name);
  const [edited, setEdited] = useState("");
  const [deleted, setDeleted] = useState("");
  const active = requestTypes.find((item) => item.name === type) ?? requestTypes[0];
  return <Section title="Solicitudes con aprobación"><StepHeader step={step} total={3} title={["Tipo y fechas", "Cuestionario", "Historial"][step - 1] ?? "Solicitud"} />{step === 1 ? <Card className="gap-3">{requestTypes.map((item) => <Pill key={item.name} label={`${item.category}: ${item.name}`} active={type === item.name} onPress={() => setType(item.name)} />)}<Field label="Fecha inicial" value="11 jun 2026" readOnly /><Field label="Fecha final" value="11 jun 2026" readOnly /><Button onPress={() => setStep(2)}>Continuar</Button></Card> : null}{step === 2 ? <Card className="gap-3">{active.questions.map((question) => <Field key={question} label={question} value="Respuesta demo" readOnly />)}<Button icon={Send} onPress={() => { store.submitEmployeeRequest(); setStep(3); }}>Enviar solicitud</Button></Card> : null}{step === 3 ? employeeRequests.filter((request) => deleted !== request.title).map((request) => <Card key={request.title} className="gap-2"><Row label={edited === request.title ? `${request.title} (editada)` : request.title} value={request.status} />{request.timeline.map((stepItem) => <Text key={stepItem} className="text-sm text-slate-600">• {stepItem}</Text>)}<View className="flex-row gap-2"><Button variant="outline" onPress={() => setEdited(request.title)}>Editar</Button><Button variant="destructive" onPress={() => setDeleted(request.title)}>Eliminar</Button></View></Card>) : null}</Section>;
}

function WellnessModule() {
  const [category, setCategory] = useState<string>(wellnessCategories[0].name);
  const active = wellnessCategories.find((item) => item.name === category) ?? wellnessCategories[0];
  return <Section title="Biblioteca de bienestar"><View className="flex-row flex-wrap gap-2">{wellnessCategories.map((item) => <Pill key={item.name} label={item.name} active={category === item.name} onPress={() => setCategory(item.name)} />)}</View><Card className="gap-3">{active.resources.length ? active.resources.map((resource) => <AttachmentPreview key={resource.title} name={`${resource.title}.${resource.type.toLowerCase()}`} size={resource.size} />) : <InlineAlert title="Sin documentos" description="Por el momento no hay ningún documento disponible." tone="neutral" />}</Card></Section>;
}

function DocumentRequestsModule() {
  const store = useDemoStore();
  return <Section title="Solicitud y firma de documentos">{documentTemplates.map((doc) => <Card key={doc.name} className="gap-3"><Row label={doc.folder} value={doc.name} /><Badge tone={store.signedDocumentIds.includes(doc.name) ? "success" : "warning"}>{store.signedDocumentIds.includes(doc.name) ? "Firmado" : doc.status}</Badge><InlineAlert title="PDF autogenerado" description="Documento prellenado con datos del expediente." tone="info" /><Button icon={FileCheck2} onPress={() => store.signDocument(doc.name)}>Generar, firmar y subir</Button></Card>)}</Section>;
}

function TrainingModule() {
  const store = useDemoStore();
  const [course, setCourse] = useState<string>(trainingCourses[0].title);
  const active = trainingCourses.find((item) => item.title === course) ?? trainingCourses[0];
  return <Section title="Capacitación multimedia"><View className="flex-row flex-wrap gap-2">{trainingCourses.map((item) => <Pill key={item.title} label={item.title} active={course === item.title} onPress={() => setCourse(item.title)} />)}</View><Card className="gap-3"><Badge tone={active.mandatory ? "warning" : "neutral"}>{active.mandatory ? "Obligatorio" : active.status}</Badge><Progress value={store.lessonCompleted ? 100 : active.progress} />{active.mode === "Offline" ? <Button icon={Download} onPress={store.downloadCourse}>{store.courseDownloaded ? "Curso descargado" : "Descargar para modo offline"}</Button> : null}{active.lessons.map((lesson, index) => <View key={lesson.title} className="rounded-2xl bg-slate-100 p-3"><Text className="font-bold">{lesson.title}</Text><Text className="text-sm text-slate-600">{lesson.locked && !store.lessonCompleted ? "Bloqueada hasta completar anterior" : lesson.activity}</Text>{index === 0 ? <AttachmentPreview name="audio-leccion.wav" size="00:18" /> : null}</View>)}{trainingEvaluations.map((evaluation) => <Field key={evaluation.question} label={`${evaluation.type}: ${evaluation.question}`} value={evaluation.options[0]} readOnly />)}<Button icon={CheckCircle2} onPress={store.completeLesson}>Enviar actividad y finalizar</Button></Card></Section>;
}

function ProfileModule() {
  const [saved, setSaved] = useState(false);
  return <Section title="Expediente y tarjeta digital"><Card className="gap-3 bg-brand-500"><Text className="text-xs font-bold uppercase text-white/70">Identificación corporativa</Text><Text className="text-2xl font-bold text-white">{employeeDigitalCard.holder}</Text><Text className="text-white/80">{employeeDigitalCard.role}</Text><Text className="text-white">{employeeDigitalCard.employeeNumber} · {employeeDigitalCard.validity}</Text><Text className="text-xs font-bold text-white/80">QR mock: {employeeDigitalCard.qr}</Text></Card><Card className="gap-2">{Object.entries({ Correo: saved ? "ricardo.actualizado@empresa.mx" : demoEmployee.email, Teléfono: demoEmployee.phone, RFC: demoEmployee.rfc, CURP: demoEmployee.curp, NSS: demoEmployee.nss, Antigüedad: demoEmployee.seniority, Puesto: demoEmployee.role }).map(([label, value]) => <Row key={label} label={label} value={value} />)}<Button variant="outline" onPress={() => setSaved(true)}>{saved ? "Contacto guardado" : "Guardar edición de contacto"}</Button></Card></Section>;
}

function CorporateDocsModule() {
  const [downloaded, setDownloaded] = useState("");
  return <Section title="Documentos corporativos">{corporateDocuments.map((doc) => <Card key={doc.name} className="gap-2"><Row label={doc.folder} value={doc.name} /><AttachmentPreview name={doc.name} size={doc.size} /><Button icon={Download} onPress={() => setDownloaded(doc.name)}>{downloaded === doc.name ? "Descargado" : "Ver / descargar"}</Button></Card>)}</Section>;
}

function PayrollDocsModule() {
  const store = useDemoStore();
  return <Section title="Recibos, XML, firma y SUA">{payrollReceipts.map((receipt) => <Card key={receipt.period} className="gap-3"><Row label={receipt.period} value={receipt.amount} /><View className="flex-row flex-wrap gap-2"><Badge tone="info">PDF</Badge><Badge tone="info">XML</Badge><Badge tone="info">{receipt.certificate}</Badge></View><Button icon={FileCheck2} onPress={() => store.signDocument(receipt.period)}>Firmar y descargar certificado</Button></Card>)}{suaLetters.map((letter) => <Card key={letter.title} className="gap-2"><Row label="Carta SUA" value={letter.title} /><Badge tone={letter.status === "Firmada" ? "success" : "warning"}>{letter.status}</Badge><Button onPress={() => store.signDocument(letter.title)}>Firmar carta</Button></Card>)}</Section>;
}

function SettingsModule() {
  const store = useDemoStore();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [nipChanged, setNipChanged] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  return <Section title="Perfil y seguridad"><Card className="gap-3"><Field label="Contraseña actual" value="••••••••" readOnly /><Field label="Nueva contraseña" value="••••••••" readOnly /><Button onPress={() => setPasswordChanged(true)}>{passwordChanged ? "Contraseña cambiada" : "Cambiar contraseña"}</Button><Field label="NIP actual" value="1234" readOnly /><Field label="Nuevo NIP" value="2580" readOnly /><Button variant="outline" onPress={() => setNipChanged(true)}>{nipChanged ? "NIP cambiado" : "Cambiar NIP"}</Button><Button onPress={store.addBankAccount}>Agregar tarjeta o CLABE</Button><Button variant="destructive" onPress={() => setDeleteRequested(true)}>{deleteRequested ? "Baja solicitada" : "Solicitar eliminar cuenta"}</Button>{deleteRequested ? <InlineAlert title="Solicitud recibida" description="La baja de cuenta queda pendiente de confirmación administrativa mock." tone="warning" /> : null}</Card></Section>;
}

function SupportModule() {
  const store = useDemoStore();
  const [botMessages, setBotMessages] = useState<string[]>([supportBot.greeting]);
  return <Section title="Soporte omnicanal"><Card className="gap-3"><View className="flex-row flex-wrap gap-2">{supportBot.channels.map((channel) => <Pill key={channel} label={channel} active />)}</View>{botMessages.map((message, index) => <View key={`${message}-${index}`} className="rounded-2xl bg-slate-100 p-3"><Text className="text-sm">{message}</Text></View>)}<Button onPress={() => setBotMessages((current) => [...current, supportBot.escalation])}>Hablar con bot Zoho</Button><Field label="Consulta" value={supportTicket.query} readOnly multiline /><Button icon={Send} onPress={store.createSupportTicket}>Crear ticket</Button></Card></Section>;
}

function InternalChatModule() {
  const store = useDemoStore();
  const [roomCreated, setRoomCreated] = useState(false);
  return <Section title="Chat en vivo 1-1 y grupal"><Card className="gap-3"><Field label="Nueva sala" value="Operación norte" readOnly /><View className="flex-row flex-wrap gap-2">{["Simón", "Laura", "Orlando"].map((name) => <Pill key={name} label={name} active />)}</View><Button onPress={() => setRoomCreated(true)}>Crear sala grupal</Button>{roomCreated ? <InlineAlert title="Sala creada" description="Operación norte ya está disponible." tone="success" /> : null}</Card>{chatRooms.map((room) => <Card key={room.name} className="gap-3"><Text className="text-lg font-bold">{room.name}</Text>{[...room.messages, ...store.chatMessages.map((message) => ({ from: "Tú", text: message, mine: true }))].map((message, index) => <View key={`${message.text}-${index}`} className={`rounded-2xl p-3 ${message.mine ? "bg-brand-50" : "bg-slate-100"}`}><Text className="text-xs font-bold">{message.from}</Text><Text>{message.text}</Text></View>)}<AttachmentPreview name="foto-sucursal.jpg" size="520 KB" /><AttachmentPreview name="video-recorrido.mp4" size="8.4 MB" /><AttachmentPreview name="documento-operacion.pdf" size="1.1 MB" /><Button onPress={() => store.sendChatMessage("Hola, confirmo seguimiento y adjunto evidencia.")}>Enviar mensaje y adjuntos</Button></Card>)}</Section>;
}

function LegalModule() {
  const store = useDemoStore();
  return <Section title="Términos y privacidad"><Card className="gap-3"><Text className="text-lg font-bold">{legalAcceptance.document}</Text><Text className="text-sm text-slate-600">Versión {legalAcceptance.version}, emisor {legalAcceptance.issuer}. Firma de conformidad digital del colaborador.</Text><Row label="Firmante" value={`${legalAcceptance.signer} · ${legalAcceptance.role}`} /><Checkbox label="He leído y acepto términos, privacidad, mandato y tratamiento de datos." checked={store.legalAccepted} onPress={store.acceptLegal} /><Button icon={ShieldCheck} onPress={store.acceptLegal}>{store.legalAccepted ? "Firmado" : "Aceptar y firmar"}</Button></Card></Section>;
}
