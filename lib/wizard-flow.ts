/** Retardo estándar antes de avanzar al siguiente paso tras una elección. */
export const WIZARD_ADVANCE_MS = 340;

export function scheduleWizardAdvance(action: () => void, delay = WIZARD_ADVANCE_MS): ReturnType<typeof setTimeout> {
  return setTimeout(action, delay);
}
