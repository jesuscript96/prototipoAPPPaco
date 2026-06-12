import { ReactNode } from "react";
import { View } from "react-native";
import { FadeSlideIn } from "@/components/paco/motion";

/** Contenedor de paso con entrada animada al cambiar `stepKey`. */
export function WizardStep({ stepKey, children }: { stepKey: string | number; children: ReactNode }) {
  return (
    <View key={String(stepKey)} className="gap-4">
      <FadeSlideIn>{children}</FadeSlideIn>
    </View>
  );
}
