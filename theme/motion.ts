// Tokens de movimiento Paco (fuente de verdad del plan de motion branding).
// Ningun modulo debe inventar valores arbitrarios si existe un preset aqui.
// Las constantes de spring usan dos formatos porque RN Animated.spring acepta
// speed/bounciness, mientras que las specs del plan razonan en damping/stiffness.

export const motion = {
  duration: {
    instant: 90,
    fast: 150,
    normal: 260,
    slow: 420,
    narrative: 700,
  },
  // Presets para Animated.spring (RN core, useNativeDriver compatible).
  spring: {
    press: { speed: 30, bounciness: 7 },
    soft: { speed: 18, bounciness: 6 },
    confident: { speed: 20, bounciness: 4 },
    celebratory: { speed: 14, bounciness: 12 },
  },
  scale: {
    press: 0.97,
    cardPress: 0.985,
    successPop: 1.04,
  },
  distance: {
    screenEnterY: 14,
    sheetEnterY: 28,
    listItemY: 10,
  },
} as const;
