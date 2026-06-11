// Capa de "API" simulada del prototipo Paco. Todas las llamadas devuelven
// promesas con latencia breve para poder mostrar estados de carga reales.

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function simulate<T>(result: T, ms = 600): Promise<T> {
  await wait(ms);
  return result;
}

// Login mock: falla si la contraseña es exactamente "error" para demostrar el
// estado de credenciales incorrectas del video.
export async function mockLogin(identifier: string, password: string) {
  await wait(900);
  if (!identifier.trim() || password.length < 4 || password.toLowerCase() === "error") {
    return { ok: false as const, error: "Credenciales incorrectas. Verifica tu correo o contraseña e inténtalo de nuevo." };
  }
  return { ok: true as const };
}

export async function mockSendActivation(phone: string) {
  await wait(800);
  return { ok: true as const, message: `Solicitud de activación enviada al panel de tu empresa para el ${phone}.` };
}

export async function mockSendRecovery(email: string) {
  await wait(800);
  return { ok: true as const, message: `Enviamos un enlace de recuperación a ${email}.` };
}

// Proceso por fases (KYC, descargas, pasarela). Invoca onPhase con cada etapa
// y respeta el orden con latencia para que la UI muestre el avance.
export async function runPhases(phases: readonly string[], onPhase: (phase: string, index: number) => void, msPerPhase = 700) {
  for (let index = 0; index < phases.length; index++) {
    const phase = phases[index];
    if (phase !== undefined) onPhase(phase, index);
    await wait(msPerPhase);
  }
}

export async function mockValidateCode(code: string) {
  await wait(700);
  return code.trim().length >= 4
    ? { ok: true as const }
    : { ok: false as const, error: "El código debe tener al menos 4 dígitos." };
}
