// Accesibilidad · Liquid Glass — Reduce Transparency
//
// Triple fuente de verdad:
// 1. iOS: AccessibilityInfo.isReduceTransparencyEnabled (preferencia del sistema).
// 2. Web: media query prefers-reduced-transparency.
// 3. Override manual de demo en el store (Android no expone la preferencia
//    del sistema; el toggle vive en Configuración).
//
// Cuando está activo, el motor glass (components/paco/glass.tsx) renderiza el
// color `fallback` opaco de cada material, sin BlurView ni backdrop-filter, y
// los bordes pasan a `opaqueSeparator` para delimitar contenedores.

import { useEffect, useState } from "react";
import { AccessibilityInfo, Platform } from "react-native";
import { usePacoStore } from "@/store/paco-store";

function useSystemReduceTransparency() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mq = window.matchMedia("(prefers-reduced-transparency: reduce)");
      setReduced(mq.matches);
      const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }

    if (Platform.OS === "ios") {
      let mounted = true;
      AccessibilityInfo.isReduceTransparencyEnabled()
        .then((value) => mounted && setReduced(value))
        .catch(() => undefined);
      const subscription = AccessibilityInfo.addEventListener("reduceTransparencyChanged", setReduced);
      return () => {
        mounted = false;
        subscription.remove();
      };
    }

    return;
  }, []);

  return reduced;
}

/** true si el usuario pidió reducir transparencia (sistema o toggle demo). */
export function useReduceTransparency() {
  const system = useSystemReduceTransparency();
  const manual = usePacoStore((s) => s.reduceTransparency);
  return system || manual;
}
