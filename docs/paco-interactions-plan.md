# Paco App · Plan de microinteracciones

Marco: ciclo de Dan Saffer (disparador → reglas → feedback → bucles/modos) + principios de animation feel (ease-out en entradas, 100–200 ms micro / 200–300 ms transiciones, overshoot sutil, solo `transform`/`opacity`). La animación nunca retrasa la acción: el mock corre en paralelo.

Primitivos en `components/paco/motion.tsx`; demos vivas en Storybook → Movimiento.

## Implementado (fase 1)

| Microinteracción | Disparador | Reglas | Feedback | Dónde |
| --- | --- | --- | --- | --- |
| Press-scale | pressIn/pressOut en cualquier accionable | encoge a 0.97 (anticipación) | timing 110 ms ease-out al presionar; spring con rebote 7 al soltar | `PressableScale`, `Button`, `OptionCard`, `Row`, acciones rápidas del wallet |
| Entrada de pantalla | montaje de `Screen` | contenido completo | fade + translateY 14→0, 260 ms ease-out | todas las pantallas (paco) |
| Entradas escalonadas | montaje del dashboard | hero → banners → pendientes | `FadeSlideIn` con delay 0/60/120 ms | `home.tsx` |
| Indicador de tabs | tap en opción | una sola activa; equal-width | píldora blanca desliza con spring (speed 18, bounce 6) | `Segmented` (todas las tabs) |
| Número animado | cambio de saldo/adeudo | interpola valor anterior → nuevo | 650–900 ms ease-out, tabular | wallet del home, total de adeudos en gastos, demo storybook |
| Pop con overshoot | confirmaciones | una vez por aparición | scale 0.4→1 spring bounce 12 + fade 160 ms | sello de `SuccessCard`, check de `Checkbox`, `ConfirmSheet` |
| Switch | tap | on/off | thumb desliza 20 px con spring | `ToggleRow` (anonimato, etc.) |
| Toast | acción completada (sistema) | se autodescarta a los 2.6 s | sube 18→0 con spring + fade; baja al salir (ease-in) | `ToastHost` global |
| Progreso | cambio de avance | clamp 0–100 | ancho crece 500 ms ease-out | `Progress` (onboarding, cursos, encuestas) |
| Descarga offline | botón Descargar | 6 fases secuenciales | barra + texto de fase cada 700 ms | capacitaciones |
| Verificación KYC | enviar capturas | 4 fases | alerta cambia de texto y tono al validar | `KycFlow` |
| Respuesta de chat | enviar mensaje | RH/bot responde 1.6–1.8 s después | burbuja nueva + "esperando respuesta" | voz RH, soporte bot, WhatsApp |

## Roadmap (fase 2 — requiere decisión/deps)

1. **Haptics** (`expo-haptics`): tick ligero en switch/checkbox/confirmaciones; impacto medio al firmar o confirmar adelanto. Solo nativo.
2. **Reanimated + worklets** (plugin babel pendiente): gestos físicos — swipe para borrar notificación con resistencia, pull-to-refresh con estiramiento, sheet arrastrable con snap points.
3. **Continuidad de elementos** (shared transitions): la tarjeta del curso se expande hasta ser cabecera del detalle; el avatar del chat viaja a la conversación.
4. **Skeleton shimmer** en cargas >300 ms (listas de gastos/notificaciones) en lugar de spinner.
5. **Contador regresivo animado** en código SMS de pasarela; **confetti contenido** (una sola vez) al finalizar curso obligatorio.
6. **Modo reduce-motion**: ✅ hecho (Visual 6.0) — `useReduceMotion` ahora escucha `prefers-reduced-motion` en web **y** `AccessibilityInfo.isReduceMotionEnabled` en nativo. Además se implementó **Reduce Transparency** (`useReduceTransparency` en `components/paco/a11y.ts`): API iOS + media query web + toggle demo en Configuración; el motor glass rinde fallbacks opacos.

## Reglas de oro del sistema

- Si una animación se nota la vez 50, sobra: bajar duración o quitarla.
- Un mismo gesto → siempre la misma respuesta (consistencia entre módulos).
- Prohibido animar `width/height/top/left` en listas largas; solo la barra de progreso (elemento único) usa width.

## Fase 2 implementada (auditoría de puntos muertos)

Especificaciones de movimiento por interacción nueva:

### Error de validación · sacudida elástica
- **Disparador:** validación fallida (login, NIP que no coincide, teléfono/código de pasarela inválido).
- **Propiedades:** `translateX` del contenedor del formulario.
- **Duración y curva:** secuencia 10 → -8 → 5 → 0 px en ~360 ms; el retorno final es spring(speed 30, bounce 8).
- **Resultado:** acompaña al mensaje de error en rojo; si la acción tiene éxito no hay sacudida, se navega con la entrada estándar.
- **Dónde:** `login`, `settings/nip`, `topups` (teléfono y código), `services` (código). Primitivo `ShakeView`.

### Carga de listas · skeleton con brillo
- **Disparador:** montaje de listas de colección (notificaciones, adeudos de gastos).
- **Propiedades:** bloque `rgba(30,30,30,0.08)` + destello blanco que recorre con `translateX` y `skewX(-18°)`.
- **Duración y curva:** loop 1100 ms ease-in-out; la carga simulada dura 380 ms (nunca aburre).
- **Resultado:** el contenido real entra con el `FadeSlideIn` de pantalla; el skeleton jamás bloquea acciones.
- **Dónde:** `notifications`, `expenses`. Primitivos `Shimmer` + `useFakeLoad`.

### Éxito de alto valor · confetti contenido + sello pop
- **Disparador:** montar `SuccessCard` (adelanto confirmado, recarga, pago, solicitud, curso).
- **Propiedades:** 10 partículas (`translateX/Y`, `scale`, `opacity`) radiando del sello; sello con scale 0.4→1.
- **Duración y curva:** partículas spring(speed 4) ~900 ms una sola vez; sello spring(bounce 12) + fade 160 ms.
- **Resultado:** solo en éxito; el error nunca llega a esta pantalla (se queda en el shake del formulario).

### Reproducción de audio · pulso
- **Disparador:** estado `playing` del reproductor (lecciones, grabación).
- **Propiedades:** `scale` 1 ↔ 1.07 del botón play/pause.
- **Duración y curva:** loop 520 ms + 520 ms ease-in-out; se detiene en seco al pausar.

### Grabación activa · parpadeo
- **Disparador:** grabadora encendida en lección.
- **Propiedades:** `opacity` 1 ↔ 0.25 del punto rojo.
- **Duración:** 450 ms por fase, loop hasta detener.

### Hover y focus (web)
- **Disparador:** puntero encima / campo enfocado.
- **Propiedades:** fondo del botón (ink→pizarra, glass→blanco), fila de lista a blanco; borde del input a azul medio.
- **Duración:** inmediato (cambio de color), sin transición para no ensuciar el press-scale.

### Vacíos con presencia
- `EmptyState` hace pop del icono al montar (mismo spring del sello) para que ni los vacíos sean estáticos.

## Fase 3 implementada · Sistema declarativo del plan de Motion Branding

Tokens en `theme/motion.ts` (duration/spring/scale/distance). Primitivos nuevos en `components/paco/motion.tsx`: `MorphButton`, `LiquidButton`, `MutableContainer`, `TypingIndicator`, `useReduceMotion`.

### Acceso - Login con morph y check previo a la navegación
- Disparador: press en "Inicia sesión" con credenciales mock válidas.
- Ruta: `app/(paco)/login.tsx`
- Primitive: `MorphButton` (controlado) + `ShakeView` para el caso de error.
- Propiedades animadas: scale del botón, crossfade label/loader, scale del check (spring celebratory).
- Duración/física: press 110 ms ease-out; loading crossfade 140/180 ms; check spring(speed 14, bounce 12); navegación diferida 700 ms.
- Estado local afectado: `status: idle→loading→success`; `loggedIn` en store.
- Feedback textual: "Validando credenciales…" → "Bienvenido".
- Reduce motion: sin scale de press (hook `useReduceMotion`); crossfade se mantiene.
- Verificación manual: pwd "error" sacude y vuelve a idle; pwd válida muestra check y entra a home.

### Adelanto - Confirmar con narrativa de dispersión
- Disparador: press en "Confirmar adelanto" con términos aceptados.
- Ruta: `app/(paco)/advance.tsx`
- Primitive: `MorphButton` controlado.
- Propiedades animadas: ídem login.
- Duración/física: loading real 1100 ms (simulate); success se asienta 750 ms antes de viajar al comprobante.
- Estado local afectado: `confirmStatus`; `movements` + push notification en store.
- Feedback textual: "Dispersando a tu cuenta…" → "Adelanto confirmado".
- Reduce motion: solo crossfade textual.
- Verificación manual: confirmar → check → SuccessCard con confetti → movimiento visible en Gastos.

### Recargas y Servicios - Pago en pasarela
- Disparador: press en "Confirmar pago"/"Pagar $X" con código válido.
- Rutas: `app/(paco)/topups.tsx`, `app/(paco)/services.tsx`
- Primitive: `MorphButton`; código inválido dispara `ShakeView` y el morph no inicia.
- Duración/física: loading 1200 ms; success 750 ms antes del comprobante.
- Estado local afectado: `payStatus`; movimiento en store.
- Feedback textual: "Procesando con la pasarela…" → "Pago aprobado"/"Pago exitoso".
- Verificación manual: código corto sacude; código válido muestra check y comprobante.

### Recargas - Código de confirmación copiable
- Disparador: press en "Copiar código" del comprobante.
- Ruta: `app/(paco)/topups.tsx` (paso success)
- Primitive: `LiquidButton` (icono Copy → check verde, fondo emerald).
- Duración/física: crossfade 220 ms ease-out; scale del check 0.6→1.
- Estado local afectado: `codeCopied` (se resetea al iniciar otra recarga).
- Feedback textual: "Copiar código" → "Código copiado" + toast.
- Verificación manual: el estado final permanece visible >1.2 s (persistente).

### Encuestas, Voz, Solicitudes, Soporte - Envíos primarios
- Disparador: press en el CTA final de cada asistente.
- Rutas: `surveys/[id]`, `voice/index`, `requests/new`, `support`.
- Primitive: `MorphButton` controlado; en soporte el ticket aparece tras asentarse el check (750 ms).
- Feedback textual: "Enviando respuestas…/Enviando con confidencialidad…/Registrando en el panel…/Abriendo ticket…" → estado de éxito.
- Estado local afectado: store correspondiente (`completedSurveyIds`, `voiceReports`+folio, `requests`, `ticketCreated`).
- Verificación manual: cada envío muestra check antes del comprobante/cambio de vista.

### Legal - Firma sobria
- Disparador: press en "Aceptar y firmar digitalmente".
- Ruta: `app/(paco)/legal.tsx`
- Primitive: `MorphButton` no controlado (800 ms de firma simulada). Sin confetti (regla 3.2).
- Estado final: caja de conformidad con fecha/hora; firma en `SignatureBox`.

### Chats - Indicador de escritura
- Disparador: enviar mensaje en voz RH, soporte técnico o chat interno.
- Rutas: `voice/[id]`, `support`, `chat/[id]` (+ acción `receiveChatMessage` en store).
- Primitive: `TypingIndicator` (3 puntos, opacidad 0.3→1 y translateY 0→-4, fase 160 ms por punto).
- Duración/física: typing aparece a los 400-600 ms; respuesta llega a los 1.9-2.2 s y el indicador se desmonta.
- Feedback textual: la respuesta mock entra como burbuja con su hora.
- Verificación manual: enviar "hola" en cualquiera de los tres chats → puntos → respuesta.

### Perfil y Recibos - Cargas/descargas líquidas
- Disparador: "Subir currículum"/"Subir contrato firmado"/"Descargar certificado".
- Rutas: `profile.tsx`, `receipts.tsx`
- Primitive: `LiquidButton` con fases busy ("Subiendo archivo…"/"Descargando certificado…").
- Estado local afectado: `cvUploaded`/`contractUploaded`/`certificateDownloaded` (persistente).
- Verificación manual: el botón queda en verde con check; reintentar no duplica.
