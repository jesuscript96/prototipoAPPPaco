import { useRouter } from "expo-router";
import { ClipboardCheck } from "@/components/paco/glyphs";
import { Image, Text, View } from "react-native";
import { peopleAssets } from "@/components/paco/assets";
import { Badge, Button, Card, EmptyState, Screen } from "@/components/paco/layout";
import { surveys } from "@/mock/paco";
import { vibrants } from "@/theme/tokens";
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
          image={peopleAssets.surveyBlank}
        />
      ) : null}

      <View className="gap-3">
        {surveys.map((survey) => {
          const done = completedSurveyIds.includes(survey.id);
          return (
            <Card key={survey.id} className="gap-3">
              <Image source={survey.mandatory ? peopleAssets.surveyWelcome : peopleAssets.surveyWink} resizeMode="contain" style={{ alignSelf: "flex-end", width: 70, height: 54 }} />
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
                <View style={{ borderColor: vibrants.success.border, backgroundColor: vibrants.success.wash }} className="flex-row items-center gap-2 rounded-2xl border p-3">
                  <View style={{ backgroundColor: vibrants.success.accent }} className="h-2 w-2 rounded-full" />
                  <Text className="flex-1 text-sm font-semibold text-label-primary">Respuestas enviadas al panel</Text>
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
