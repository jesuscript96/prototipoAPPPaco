import { Link, useLocalSearchParams } from "expo-router";
import { CheckCircle2, Download, FileCheck2, HelpCircle, MessageCircle, Plus, Send, ShieldCheck, Trash2 } from "lucide-react-native";
import { Text, View } from "react-native";
import {
  AttachmentPreview,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  EmptyState,
  Field,
  InlineAlert,
  Progress,
  RadioRow,
  Screen,
  Section,
  SegmentedControl,
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
  pacoModules,
  payrollAdvance,
  payrollReceipts,
  recognitionBadges,
  recognitions,
  requestTypes,
  serviceProviders,
  suaLetters,
  supportTicket,
  surveys,
  supportBot,
  topupOperators,
  trainingCourses,
  trainingEvaluations,
  voiceCategories,
  wellnessCategories,
} from "@/mock/paco-data";
import { PacoFunctionalModule } from "@/components/paco-functional-modules";
import { DemoState, useDemoStore } from "@/store/demo-store";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-slate-100 p-3">
      <Text className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</Text>
      <Text className="mt-1 text-lg font-bold text-slate-950">{value}</Text>
    </View>
  );
}

function Timeline({ steps }: { steps: readonly string[] }) {
  return (
    <View className="gap-3">
      {steps.map((step, index) => (
        <View key={step} className="flex-row gap-3">
          <View className="items-center">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-brand-500">
              <Text className="text-xs font-bold text-white">{index + 1}</Text>
            </View>
            {index < steps.length - 1 ? <View className="h-8 w-px bg-brand-100" /> : null}
          </View>
          <Text className="flex-1 pt-1 text-sm font-semibold text-slate-700">{step}</Text>
        </View>
      ))}
    </View>
  );
}

function Money({ value }: { value: number }) {
  return <Text className="font-bold text-slate-950">${value.toLocaleString("es-MX")}</Text>;
}

export default function PacoModuleScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id;
  const moduleInfo = id ? pacoModules.find((item) => item.id === id) : undefined;
  const store = useDemoStore();

  if (!moduleInfo) {
    return (
      <Screen title="Módulo no encontrado" description="La ruta solicitada no existe en el contrato de cobertura Paco.">
        <EmptyState title="Sin módulo" description="Regresa al dashboard para navegar por los módulos disponibles." icon={HelpCircle} />
        <Link href="/(paco)/dashboard" asChild>
          <Button>Volver al dashboard</Button>
        </Link>
      </Screen>
    );
  }

  return (
    <Screen eyebrow={moduleInfo.domain} title={moduleInfo.title} description={moduleInfo.subtitle}>
      {store.pacoToast ? <InlineAlert title="Acción simulada" description={store.pacoToast} tone="success" /> : null}
      <PacoFunctionalModule id={moduleInfo.id} />
      <Section title="Trazabilidad del prototipo">
        <Card className="gap-2">
          <Text className="text-sm leading-5 text-slate-600">
            Este módulo se implementa como front-end con mock data, estados visibles y acciones locales. La referencia funcional
            proviene de `funcionalidadvideo.md` y de los videos verificados en `assets/videosfuncioalidades`.
          </Text>
          <Link href="/(paco)/dashboard" asChild>
            <Button variant="outline">Volver al dashboard Paco</Button>
          </Link>
        </Card>
      </Section>
    </Screen>
  );
}

function renderModule(id: string, store: DemoState) {
  switch (id) {
    case "notifications":
      return (
        <>
          <Section title="Centro de notificaciones" description="Tipos conectados a encuestas, cursos, cumpleaños, reconocimientos y voz.">
            {notifications.map((item) => {
              const read = item.read || store.readNotificationIds.includes(item.id);
              return (
                <Card key={item.id} className="gap-2">
                  <View className="flex-row items-center justify-between">
                    <Badge tone={read ? "neutral" : item.tone}>{item.type}</Badge>
                    <Text className="text-xs font-semibold text-slate-500">{item.time}</Text>
                  </View>
                  <Text className="text-base font-bold text-slate-950">{item.title}</Text>
                  <Text className="text-sm leading-5 text-slate-600">{item.body}</Text>
                  <Text className="text-xs font-bold text-brand-700">{read ? "Leída" : "No leída"}</Text>
                </Card>
              );
            })}
            <Button icon={Trash2} onPress={store.markAllPacoNotificationsRead}>Borrar / marcar todas como leídas</Button>
          </Section>
        </>
      );
    case "employee-onboarding":
      return (
        <Section title="Onboarding de tareas programadas" description="Mensajes, encuestas/exámenes y material didáctico asignado por día, con vencimiento y mentor.">
          {onboardingTasks.map((task) => {
            const completed = store.completedOnboardingTaskIds.includes(task.id);
            return (
              <Card key={task.id} className="gap-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-slate-950">{task.title}</Text>
                    <Text className="text-sm text-slate-600">{task.type} · {task.scheduledFor} · vence {task.dueDate}</Text>
                  </View>
                  <Badge tone={completed ? "success" : task.status === "Vence pronto" ? "warning" : "info"}>{completed ? "Completada" : task.status}</Badge>
                </View>
                <Text className="text-sm text-slate-600">Mentor calificador: {task.mentor}</Text>
                {task.materials.map((material) => (
                  <AttachmentPreview key={material.title} name={`${material.title} · ${material.type}`} size={material.size} />
                ))}
                <InlineAlert
                  title="Push programada"
                  description="Esta tarea genera recordatorios push por fecha asignada y aviso al mentor cuando requiere calificación."
                  tone="info"
                />
                <Button icon={CheckCircle2} onPress={() => store.completeOnboardingTask(task.id)}>
                  {completed ? "Tarea completada" : "Marcar tarea como completada"}
                </Button>
              </Card>
            );
          })}
        </Section>
      );
    case "surveys":
      return (
        <Section title="Encuesta obligatoria y bloqueo">
          <InlineAlert
            title={store.mandatorySurveyDone ? "Navegación desbloqueada" : "Navegación bloqueada por encuesta"}
            description="La NOM-035 se dispara desde el panel y debe responderse antes de usar otros servicios."
            tone={store.mandatorySurveyDone ? "success" : "warning"}
          />
          {surveys.map((survey) => (
            <Card key={survey.id} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-950">{survey.title}</Text>
                <Badge tone={survey.mandatory ? "warning" : "info"}>{survey.mandatory ? "Obligatoria" : "Programada"}</Badge>
              </View>
              <Progress value={store.mandatorySurveyDone && survey.mandatory ? 100 : 33} />
              {survey.questions.map((question, index) => (
                <RadioRow key={question} label={`${index + 1}. ${question}`} selected={index === 0 || store.mandatorySurveyDone} />
              ))}
              {survey.mandatory ? <Button icon={CheckCircle2} onPress={store.completeMandatorySurvey}>Enviar encuesta y desbloquear</Button> : null}
            </Card>
          ))}
        </Section>
      );
    case "mood":
      return (
        <>
          <Section title="Registro diario">
            <Card className="gap-4">
              <View className="items-center gap-2">
                <View className="h-20 w-20 items-center justify-center rounded-full bg-brand-50">
                  <Text className="text-4xl">{store.moodSubmitted ? ":)" : ":|"}</Text>
                </View>
                <Text className="text-xl font-bold text-slate-950">{store.moodSubmitted ? "Muy bien" : "¿Cómo te sientes hoy?"}</Text>
                <Progress value={store.moodSubmitted ? 82 : 58} />
              </View>
              <Text className="font-bold text-slate-900">¿Qué describe lo que sientes?</Text>
              <View className="flex-row flex-wrap gap-2">{feelings.map((label, index) => <Chip key={label} label={label} active={index < 3} />)}</View>
              <Text className="font-bold text-slate-900">¿Qué te está afectando más?</Text>
              <View className="flex-row flex-wrap gap-2">{moodFactors.map((label, index) => <Chip key={label} label={label} active={index === 0 || index === 5 || index === 7} />)}</View>
              <Button icon={CheckCircle2} onPress={store.submitMood}>Registrar estado de ánimo</Button>
            </Card>
          </Section>
          <Section title="Gráficas históricas">
            <SegmentedControl options={["S", "M", "6M", "A"]} value="M" />
            {moodEntries.map((entry) => (
              <Card key={entry.date} className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-slate-900">{entry.date} · {entry.label}</Text>
                  <Text className="font-bold text-brand-700">{entry.score}/100</Text>
                </View>
                <Progress value={entry.score} />
                <Text className="text-sm text-slate-600">Sentimientos: {entry.feelings.join(", ")} · Factores: {entry.factors.join(", ")}</Text>
              </Card>
            ))}
          </Section>
        </>
      );
    case "celebrations":
      return (
        <Section title="Cumpleaños y aniversarios">
          <SegmentedControl options={["Todos", "Cumpleaños", "Aniversarios"]} value="Todos" />
          {celebrations.map((item) => (
            <Card key={`${item.name}-${item.date}`} className="gap-2">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-base font-bold text-slate-950">{item.name}</Text>
                  <Text className="text-sm text-slate-600">{item.type} · {item.date} · {item.area}</Text>
                </View>
                {item.years ? <Badge tone="success">{item.years} años</Badge> : <Badge tone="info">Felicitar</Badge>}
              </View>
              <Button variant="outline">Enviar felicitación mock</Button>
            </Card>
          ))}
        </Section>
      );
    case "payroll-advance":
      return (
        <Section title="Solicitud de adelanto">
          <Card className="gap-4">
            <InlineAlert title="Validación de antigüedad aprobada" description={`${demoEmployee.seniority}. Regla: ${payrollAdvance.seniorityRule}.`} tone="success" />
            <InlineAlert
              title={store.payrollKycDone ? "Identidad verificada" : "Primer adelanto requiere KYC"}
              description={`${payrollAdvance.thirdPartyProvider}: INE frente, INE reverso y selfie antes de dispersar el primer adelanto.`}
              tone={store.payrollKycDone ? "success" : "warning"}
            />
            <Timeline steps={kycSteps.map((step) => `${step}${store.payrollKycDone ? " · validado" : ""}`)} />
            <Button icon={ShieldCheck} variant="outline" onPress={store.completePayrollKyc}>
              {store.payrollKycDone ? "KYC validado" : "Enviar INE y selfie a verificación"}
            </Button>
            <View className="flex-row gap-3">
              <Stat label="Disponible" value={`$${payrollAdvance.max.toLocaleString("es-MX")}`} />
              <Stat label="Mínimo" value={`$${payrollAdvance.min}`} />
            </View>
            <Text className="font-bold text-slate-900">Cuenta de depósito y cobro</Text>
            <Text className="text-sm text-slate-600">{payrollAdvance.account.alias} · {payrollAdvance.account.number}</Text>
            <Progress value={48} />
            <View className="gap-2">
              <Text>Monto seleccionado: <Money value={payrollAdvance.selected} /></Text>
              <Text>Comisión: <Money value={payrollAdvance.commission} /></Text>
              <Text>Neto a recibir: <Money value={payrollAdvance.net} /></Text>
              <Text className="text-sm text-slate-500">Solicitud {payrollAdvance.requestedAt}; cobro {payrollAdvance.chargeDate}.</Text>
            </View>
            <Checkbox label="Acepto términos, mandato de cobro, domiciliación e información crediticia." checked />
            <Button icon={ShieldCheck} onPress={store.submitPayrollAdvance} disabled={!store.payrollKycDone}>
              {store.payrollAdvanceSubmitted ? "Adelanto confirmado" : "Confirmar adelanto"}
            </Button>
          </Card>
        </Section>
      );
    case "expenses":
      return (
        <Section title="Adeudos y mis gastos">
          <View className="flex-row gap-3">
            <Stat label="Adeudo" value={store.payrollAdvanceSubmitted ? "$1,296" : "$1,200"} />
            <Stat label="Periodo" value="1Q junio" />
          </View>
          <SegmentedControl options={["Adeudos", "Mis gastos", "Soporte"]} value="Mis gastos" />
          {[...(store.payrollAdvanceSubmitted ? [{ id: "live", type: "Adelanto confirmado", amount: 1200, commission: 96, period: "1Q junio", date: "Hoy", status: "Demo" }] : []), ...expenses].map((item) => (
            <Card key={item.id} className="gap-1">
              <Text className="font-bold text-slate-950">{item.type}</Text>
              <Text className="text-sm text-slate-600">{item.date} · {item.period} · {item.status}</Text>
              <Text className="text-sm">Monto <Money value={item.amount} /> · comisión <Money value={item.commission} /></Text>
            </Card>
          ))}
          <Button icon={MessageCircle} variant="outline">Contactar soporte WhatsApp mock</Button>
        </Section>
      );
    case "discount-club":
      return (
        <Section title="Club de Descuentos PiN">
          <InlineAlert
            title="Redirección a ecosistema PiN"
            description="Las promociones usan ubicación concedida en onboarding para mostrar cupones cercanos. En prototipo se simula la salida segura."
            tone="info"
          />
          {discountCoupons.map((coupon) => (
            <Card key={coupon.brand} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-950">{coupon.brand}</Text>
                <Badge tone="success">{coupon.distance}</Badge>
              </View>
              <Text className="text-sm text-slate-600">{coupon.category} · {coupon.expires}</Text>
              <Text className="text-xl font-bold text-brand-700">{coupon.offer}</Text>
              <Button variant="outline">Abrir cupón PiN externo</Button>
            </Card>
          ))}
        </Section>
      );
    case "topups":
      return (
        <Section title="Recarga telefónica">
          <Card className="gap-3">
            <Text className="font-bold text-slate-900">Operadores habilitados</Text>
            <View className="flex-row flex-wrap gap-2">{topupOperators.map((operator) => <Chip key={operator.name} label={operator.name} active={operator.name === "Telcel"} />)}</View>
            <SegmentedControl options={["Tiempo aire", "Datos"]} value="Tiempo aire" />
            <View className="flex-row flex-wrap gap-2">{topupOperators[0].amounts.map((amount) => <Chip key={amount} label={`$${amount}`} active={amount === 150} />)}</View>
            <Field label="Número celular" value="55 6677 8899" readOnly />
            <Field label="Confirmar número" value="55 6677 8899" readOnly />
            <InlineAlert title="Pasarela mock" description="Se solicitará código de seguridad antes de firmar la recarga." tone="info" />
            <Button icon={Send}>Confirmar recarga y validar código</Button>
          </Card>
        </Section>
      );
    case "services":
      return (
        <Section title="Pago de servicios y KYC">
          {serviceProviders.map((provider) => (
            <Card key={provider.name} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-950">{provider.name}</Text>
                <Badge tone="info">{provider.category}</Badge>
              </View>
              <Field label="Referencia" value={provider.reference} readOnly />
              <Text>Monto: <Money value={provider.amount} /> · método: {provider.method}</Text>
              <Button variant="outline">Escanear código de barras con cámara mock</Button>
              <Divider />
              <Text className="font-bold text-slate-900">Validación KYC</Text>
              <Timeline steps={kycSteps} />
              <Button icon={ShieldCheck}>Pagar y validar identidad</Button>
            </Card>
          ))}
        </Section>
      );
    case "comms":
      return (
        <Section title="Comunicados internos">
          {communications.map((item) => (
            <Card key={item.title} className="gap-3">
              <Text className="text-lg font-bold text-slate-950">{item.title}</Text>
              <Text className="text-sm text-slate-600">{item.date} · {item.body}</Text>
              {item.attachments.map((attachment) => <AttachmentPreview key={attachment.name} {...attachment} />)}
              <Button icon={Download} variant="outline">Abrir / descargar adjunto mock</Button>
            </Card>
          ))}
        </Section>
      );
    case "voice":
      return (
        <Section title="Crear reporte de voz del colaborador">
          <Card className="gap-3">
            <Text className="font-bold text-slate-900">Categoría</Text>
            <View className="gap-2">
              {voiceCategories.map((category, index) => (
                <View key={category.name} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <RadioRow label={category.name} selected={index === 4} />
                  <Text className="mt-2 text-sm text-slate-600">{category.description}</Text>
                </View>
              ))}
            </View>
            <Field label="Comentario" value="Quiero reportar tensión frecuente en el turno vespertino." readOnly multiline />
            <AttachmentPreview name="evidencia-turno.jpg" size="640 KB" />
            <SwitchRow label="Enviar de forma anónima" value />
            <Button icon={Send} onPress={store.submitFeedbackReport}>Enviar reporte a RH</Button>
          </Card>
        </Section>
      );
    case "voice-status":
      return (
        <Section title="Seguimiento y conversación con RH">
          <SegmentedControl options={["Recientes", "Antiguos", "No leídos"]} value="Recientes" />
          {feedbackReports.map((report) => (
            <Card key={report.id} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-950">{report.id} · {report.title}</Text>
                <Badge tone={report.tone}>{report.status}</Badge>
              </View>
              {report.messages.map((message) => (
                <View key={`${report.id}-${message.text}`} className={`rounded-2xl p-3 ${message.mine ? "bg-brand-50" : "bg-slate-100"}`}>
                  <Text className="text-xs font-bold text-slate-500">{message.from}</Text>
                  <Text className="text-sm text-slate-700">{message.text}</Text>
                </View>
              ))}
              <Button icon={Send} onPress={() => store.sendChatMessage("Gracias, quedo pendiente de seguimiento.")}>Responder en chat RH</Button>
            </Card>
          ))}
        </Section>
      );
    case "recognitions":
      return (
        <Section title="Reconoce a tu equipo">
          <Card className="gap-3">
            <Text className="font-bold text-slate-900">Medallas cargadas desde panel</Text>
            {recognitionBadges.map((badge, index) => (
              <View key={badge.name} className="rounded-2xl bg-slate-100 p-3">
                <RadioRow label={badge.name} selected={index === 4} />
                <Text className="mt-1 text-sm text-slate-600">{badge.description}</Text>
              </View>
            ))}
            <Field label="¿A quién le envías este reconocimiento?" value="Orlando Luna" readOnly />
            <Field label="¿Por qué das este reconocimiento?" value="Porque siempre busca resolver." readOnly multiline />
            <Button icon={Send} onPress={store.sendRecognition}>Enviar medalla de iniciativa</Button>
          </Card>
          <Section title="Mis reconocimientos">
            <SegmentedControl options={["Recibidos", "Enviados"]} value="Recibidos" />
            {recognitions.map((item) => (
              <Card key={`${item.badge}-${item.direction}`} className="gap-1">
                <Text className="font-bold text-slate-950">{item.badge} · {item.direction}</Text>
                <Text className="text-sm text-slate-600">{item.person} · {item.reason} · {item.date}</Text>
              </Card>
            ))}
          </Section>
        </Section>
      );
    case "requests":
      return (
        <Section title="Solicitudes RH">
          <Card className="gap-3">
            <SegmentedControl options={["Nueva solicitud", "Mis solicitudes"]} value="Nueva solicitud" />
            {requestTypes.map((type, index) => (
              <View key={type.name} className="rounded-2xl border border-slate-200 p-3">
                <RadioRow label={`${type.category} · ${type.name}`} selected={index === 0} />
                <Text className="mt-1 text-sm text-slate-600">{type.description}</Text>
              </View>
            ))}
            <Field label="Fecha inicial" value="11 de junio de 2026" readOnly />
            <Field label="Fecha final" value="11 de junio de 2026" readOnly />
            <Timeline steps={requestTypes[0].questions} />
            <Field label="Comentarios opcionales" value="Revisión y pruebas." readOnly multiline />
            <Button icon={Send} onPress={store.submitEmployeeRequest}>Crear solicitud</Button>
          </Card>
          {employeeRequests.map((request) => (
            <Card key={request.title} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-slate-950">{request.title}</Text>
                <Badge tone={request.status === "Aprobada" ? "success" : request.status === "Rechazada" ? "danger" : "warning"}>{request.status}</Badge>
              </View>
              <Text className="text-sm text-slate-600">{request.dates}</Text>
              <Timeline steps={request.timeline} />
              <View className="flex-row gap-2">
                <Button variant="outline">Editar</Button>
                <Button variant="destructive">Eliminar</Button>
              </View>
            </Card>
          ))}
        </Section>
      );
    case "wellness":
      return (
        <Section title="Bienestar en línea">
          {wellnessCategories.map((category) => (
            <Card key={category.name} className="gap-3">
              <Text className="text-lg font-bold text-slate-950">{category.name}</Text>
              {category.resources.length === 0 ? (
                <EmptyState title="Sin documentos" description="Por el momento no hay ningún documento disponible." icon={HelpCircle} />
              ) : (
                category.resources.map((resource) => <AttachmentPreview key={resource.title} name={`${resource.title}.${resource.type.toLowerCase()}`} size={resource.size} />)
              )}
            </Card>
          ))}
        </Section>
      );
    case "document-requests":
      return (
        <Section title="Generar y firmar documentos">
          {documentTemplates.map((doc) => {
            const signed = store.signedDocumentIds.includes(doc.name);
            return (
              <Card key={doc.name} className="gap-3">
                <Text className="text-lg font-bold text-slate-950">{doc.folder} · {doc.name}</Text>
                <Badge tone={signed ? "success" : "warning"}>{signed ? "Firmado y subido" : doc.status}</Badge>
                <InlineAlert title="PDF mock generado" description="Carátula de operación autocompletada con datos del colaborador." tone="info" />
                <Button icon={FileCheck2} onPress={() => store.signDocument(doc.name)}>{signed ? "Documento firmado" : "Generar, firmar y subir"}</Button>
              </Card>
            );
          })}
        </Section>
      );
    case "training":
      return (
        <Section title="Capacitaciones online y offline">
          <SegmentedControl options={["Pendientes", "En curso", "Finalizados"]} value={store.lessonCompleted ? "Finalizados" : "Pendientes"} />
          {trainingCourses.map((course) => (
            <Card key={course.title} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-950">{course.title}</Text>
                <Badge tone={course.mandatory ? "warning" : "neutral"}>{course.mandatory ? "Obligatorio" : course.status}</Badge>
              </View>
              <Text className="text-sm text-slate-600">{course.mode} · {store.courseDownloaded || course.downloaded ? "Descargado" : "Disponible para descarga"}</Text>
              <Progress value={store.lessonCompleted && course.title === "Seguridad en sucursal" ? 100 : course.progress} />
              {course.mode === "Offline" ? <Button icon={Download} onPress={store.downloadCourse}>{store.courseDownloaded ? "Descarga completada" : "Descargar curso offline"}</Button> : null}
              <Timeline steps={course.lessons.map((lesson) => `${lesson.title}${lesson.locked && !store.lessonCompleted ? " · bloqueada" : ""} · ${lesson.activity}`)} />
              <View className="gap-2 rounded-2xl bg-slate-100 p-3">
                <Text className="font-bold text-slate-900">Actividad práctica</Text>
                <Text className="text-sm text-slate-600">Reproductor de audio, grabación .wav, entregable PDF/imagen y envío de actividad simulados.</Text>
                <Text className="font-bold text-slate-900">Evaluación y satisfacción incorporadas</Text>
                {trainingEvaluations.map((evaluation, index) => (
                  <View key={evaluation.question} className="rounded-2xl bg-white p-3">
                    <Text className="text-sm font-bold text-slate-900">{index + 1}. {evaluation.question}</Text>
                    <Text className="mt-1 text-xs text-slate-500">{evaluation.type} · {evaluation.options.join(" / ")}</Text>
                  </View>
                ))}
                <Button icon={CheckCircle2} onPress={store.completeLesson}>Enviar actividad y finalizar lección</Button>
              </View>
            </Card>
          ))}
        </Section>
      );
    case "profile":
      return (
        <Section title="Mi expediente">
          <Card className="gap-3 bg-brand-500">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-bold uppercase tracking-wide text-white/70">Tarjeta digital de colaborador</Text>
                <Text className="mt-1 text-2xl font-bold text-white">{employeeDigitalCard.holder}</Text>
                <Text className="text-sm text-white/80">{employeeDigitalCard.role}</Text>
              </View>
              <View className="h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <Text className="font-bold text-brand-700">{demoEmployee.avatar}</Text>
              </View>
            </View>
            <View className="rounded-2xl bg-white/10 p-3">
              <Text className="text-sm text-white">No. {employeeDigitalCard.employeeNumber}</Text>
              <Text className="text-sm text-white">{employeeDigitalCard.area}</Text>
              <Text className="text-sm text-white">{employeeDigitalCard.validity}</Text>
              <Text className="mt-2 text-xs font-bold text-white/80">QR mock: {employeeDigitalCard.qr}</Text>
            </View>
          </Card>
          <Card className="gap-3">
            {[
              ["Nombre", demoEmployee.name],
              ["Género", demoEmployee.gender],
              ["Número de colaborador", demoEmployee.employeeNumber],
              ["RFC", demoEmployee.rfc],
              ["CURP", demoEmployee.curp],
              ["NSS", demoEmployee.nss],
              ["Fecha contratación", demoEmployee.hireDate],
              ["Antigüedad", demoEmployee.seniority],
              ["Empleador", demoEmployee.employer],
              ["Departamento", demoEmployee.department],
              ["Área", demoEmployee.area],
              ["Puesto", demoEmployee.role],
            ].map(([label, value]) => (
              <View key={label} className="flex-row justify-between gap-3">
                <Text className="text-sm font-bold text-slate-500">{label}</Text>
                <Text className="flex-1 text-right text-sm text-slate-800">{value}</Text>
              </View>
            ))}
            <Divider />
            <Field label="Correo editable" value={demoEmployee.email} readOnly />
            <Field label="Teléfono editable" value={demoEmployee.phone} readOnly />
            <Button icon={FileCheck2}>Abrir contrato laboral PDF mock</Button>
          </Card>
        </Section>
      );
    case "corporate-docs":
      return (
        <Section title="Documentos corporativos">
          {corporateDocuments.map((doc) => (
            <Card key={doc.name} className="gap-2">
              <Text className="font-bold text-slate-950">{doc.folder}</Text>
              <AttachmentPreview name={doc.name} size={doc.size} />
              <Badge tone="info">{doc.status}</Badge>
              <Button icon={Download} variant="outline">Ver / descargar</Button>
            </Card>
          ))}
        </Section>
      );
    case "payroll-docs":
      return (
        <Section title="Recibos de nómina y cartas SUA">
          {payrollReceipts.map((receipt) => (
            <Card key={receipt.period} className="gap-3">
              <Text className="font-bold text-slate-950">{receipt.period} · {receipt.amount}</Text>
              <View className="flex-row gap-2">
                <Badge tone="info">PDF</Badge>
                <Badge tone="info">XML</Badge>
                <Badge tone="info">{receipt.certificate}</Badge>
                <Badge tone={receipt.signed || store.signedDocumentIds.includes(receipt.period) ? "success" : "warning"}>{receipt.signed || store.signedDocumentIds.includes(receipt.period) ? "Firmado" : "Pendiente"}</Badge>
              </View>
              <Text className="text-sm text-slate-600">Integración mock con tercero para validar firma digital y descargar certificado.</Text>
              <Button icon={FileCheck2} onPress={() => store.signDocument(receipt.period)}>Firmar recibo</Button>
            </Card>
          ))}
          {suaLetters.map((letter) => (
            <Card key={letter.title} className="gap-2">
              <Text className="font-bold text-slate-950">{letter.title}</Text>
              <Badge tone={letter.status === "Firmada" ? "success" : "warning"}>{letter.status}</Badge>
              <Button icon={FileCheck2} onPress={() => store.signDocument(letter.title)}>Firmar carta SUA</Button>
            </Card>
          ))}
        </Section>
      );
    case "settings":
      return (
        <Section title="Configuración y seguridad">
          <Card className="gap-3">
            <Button icon={Plus} variant="outline">Agregar foto de perfil mock</Button>
            <Field label="Contraseña actual" value="••••••••" readOnly secureTextEntry />
            <Field label="Nueva contraseña" value="••••••••" readOnly secureTextEntry />
            <Button icon={ShieldCheck}>Cambiar contraseña</Button>
            <Button variant="outline">Recuperar NIP por correo</Button>
            <Field label="NIP actual" value="1234" readOnly secureTextEntry />
            <Field label="Nuevo NIP" value="2580" readOnly secureTextEntry />
            <Button variant="outline">Cambiar NIP</Button>
          </Card>
          <Section title="Cuentas y tarjetas">
            {bankAccounts.map((account) => (
              <Card key={account.id} className="gap-2">
                <Text className="font-bold text-slate-950">{account.alias}</Text>
                <Text className="text-sm text-slate-600">{account.bank} · {account.type} · {account.number}</Text>
                <Badge tone="success">{account.status}</Badge>
              </Card>
            ))}
            {store.bankAccountAdded ? <InlineAlert title="Cuenta agregada" description="Nueva CLABE registrada en modo demo." tone="success" /> : null}
            <Button icon={Plus} onPress={store.addBankAccount}>Agregar cuenta o tarjeta</Button>
            <Button variant="outline">Cerrar sesión en este dispositivo</Button>
            <Button variant="outline">Cerrar sesión en todos los dispositivos</Button>
            <Button variant="destructive">Solicitar eliminar cuenta</Button>
          </Section>
        </Section>
      );
    case "support":
      return (
        <Section title="Soporte Paco">
          <Card className="gap-3">
            <Button icon={HelpCircle} variant="outline">Abrir preguntas frecuentes externas</Button>
            <Button icon={MessageCircle} variant="outline">Contactar por WhatsApp: necesito ayuda</Button>
            <InlineAlert title={supportBot.provider} description={supportBot.greeting} tone="info" />
            <View className="flex-row flex-wrap gap-2">
              {supportBot.channels.map((channel) => <Chip key={channel} label={channel} active />)}
            </View>
            <Text className="text-sm text-slate-600">{supportBot.escalation}</Text>
            <Field label="Nombre" value={supportTicket.name} readOnly />
            <Field label="Correo" value={supportTicket.email} readOnly />
            <Field label="Número de contacto" value={supportTicket.phone} readOnly />
            <Field label="Consulta" value={supportTicket.query} readOnly multiline />
            <Button icon={Send} onPress={store.createSupportTicket}>{store.supportTicketCreated ? "Ticket creado" : "Enviar ticket técnico"}</Button>
            {store.supportTicketCreated ? <InlineAlert title="Conversación abierta" description="Soporte recibió tu consulta y responderá desde el panel mock." tone="success" /> : null}
          </Card>
        </Section>
      );
    case "internal-chat":
      return (
        <Section title="Chat interno">
          <Card className="gap-3">
            <Field label="Buscar chats" value="Simón" readOnly />
            <Field label="Nombre de nueva sala" value="Operación norte" readOnly />
            <Text className="font-bold text-slate-900">Participantes</Text>
            <View className="flex-row flex-wrap gap-2">{["Simón Aguilar", "Laura Méndez", "Orlando Luna"].map((name) => <Chip key={name} label={name} active />)}</View>
            <Button icon={Plus} onPress={() => store.sendChatMessage("Sala Operación norte creada.")}>Crear sala virtual</Button>
          </Card>
          {chatRooms.map((room) => (
            <Card key={room.name} className="gap-3">
              <Text className="text-lg font-bold text-slate-950">{room.name}</Text>
              <Text className="text-sm text-slate-600">{room.participants.join(", ")}</Text>
              {[...room.messages, ...store.chatMessages.map((message) => ({ from: "Tú", text: message, mine: true }))].map((message) => (
                <View key={`${message.from}-${message.text}`} className={`rounded-2xl p-3 ${message.mine ? "bg-brand-50" : "bg-slate-100"}`}>
                  <Text className="text-xs font-bold text-slate-500">{message.from}</Text>
                  <Text className="text-sm text-slate-700">{message.text}</Text>
                </View>
              ))}
              <AttachmentPreview name="foto-sucursal.jpg" size="520 KB" />
              <AttachmentPreview name="video-recorrido.mp4" size="8.4 MB" />
              <AttachmentPreview name="documento-operacion.pdf" size="1.1 MB" />
              <Button icon={Send} onPress={() => store.sendChatMessage("Hola, confirmo seguimiento.")}>Enviar mensaje</Button>
            </Card>
          ))}
        </Section>
      );
    case "legal":
      return (
        <Section title="Términos y privacidad">
          <Card className="gap-3">
            <Text className="text-lg font-bold text-slate-950">{legalAcceptance.document}</Text>
            <Text className="text-sm leading-5 text-slate-600">
              Condiciones de servicio de {legalAcceptance.issuer}, mandato de uso, privacidad, tratamiento de datos,
              firma de conformidad y registro de aceptación para auditoría.
            </Text>
            <Text className="text-sm text-slate-600">Firmante: {legalAcceptance.signer} · {legalAcceptance.role}</Text>
            <Text className="text-sm text-slate-600">Versión: {legalAcceptance.version} · Fecha: {legalAcceptance.acceptedAt}</Text>
            <Checkbox label="He leído y acepto los términos y condiciones." checked={store.legalAccepted} onPress={store.acceptLegal} />
            <Button icon={ShieldCheck} onPress={store.acceptLegal}>{store.legalAccepted ? "Firmado digitalmente" : "Aceptar y firmar"}</Button>
          </Card>
        </Section>
      );
    default:
      return (
        <Section title="Módulo en preparación">
          <EmptyState title="Pendiente" description="Este módulo no tiene renderer específico todavía." icon={HelpCircle} />
        </Section>
      );
  }
}
