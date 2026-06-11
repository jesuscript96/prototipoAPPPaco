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
6. **Modo reduce-motion**: respetar `prefers-reduced-motion`/AccessibilityInfo desactivando translates y dejando solo fades.

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
