import { useRouter } from "expo-router";
import { ClipboardCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import { Badge, Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { surveys } from "@/mock/paco";
import { usePacoStore } from "@/store/paco-store";

export default function SurveysScreen() {
  const router = useRouter();
  const completedSurveyIds = usePacoStore((s) => s.completedSurveyIds);
  const pending = surveys.filter((s) => !completedSurveyIds.includes(s.id));

  return (
    <Screen
      title="Encuestas"
      description="Cuestionarios internos y normativos disparados desde el panel de tu empresa. Las obligatorias bloquean la app hasta completarse."
    >
      {pending.length === 0 ? (
        <EmptyState
          title="Por el momento no hay encuestas disponibles"
          description="Cuando tu empresa dispare una nueva encuesta te llegará una notificación push."
          icon={ClipboardCheck}
        />
      ) : null}

      <View className="gap-3">
        {surveys.map((survey) => {
          const done = completedSurveyIds.includes(survey.id);
          return (
            <Card key={survey.id} className="gap-3">
              <View className="flex-row items-start justify-between gap-2">
                <Text className="flex-1 text-lg font-bold text-slate-950">{survey.title}</Text>
                <Badge tone={done ? "success" : survey.mandatory ? "warning" : "info"}>
                  {done ? "Completada" : survey.mandatory ? "Obligatoria" : "Programada"}
                </Badge>
              </View>
              <Text className="text-sm leading-5 text-slate-600">{survey.description}</Text>
              <Text className="text-xs font-semibold text-slate-500">
                {survey.questions.length} preguntas · {survey.due}
              </Text>
              {done ? (
                <View className="rounded-2xl bg-green-50 p-3">
                  <Text className="text-sm font-semibold text-green-800">Respuestas enviadas al panel</Text>
                </View>
              ) : (
                <Button onPress={() => router.push({ pathname: "/(paco)/surveys/[id]", params: { id: survey.id } })}>
                  {survey.mandatory ? "Responder ahora (bloqueante)" : "Ver encuesta"}
                </Button>
              )}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
