import { ReactNode } from "react";
import { View } from "react-native";
import { FadeSlideIn } from "@/components/paco/motion";

/** Contenedor de paso con entrada animada al cambiar `stepKey`. */
export function WizardStep({ stepKey, children }: { stepKey: string | number; children: ReactNode }) {
  // El gap debe vivir DENTRO del FadeSlideIn: los children son hermanos del
  // Animated.View interno, no del View externo. Sin esto, los pasos del
  // wizard (StepHeader + contenido) quedan pegados entre sí.
  return (
    <View key={String(stepKey)}>
      <FadeSlideIn className="gap-4">{children}</FadeSlideIn>
    </View>
  );
}
