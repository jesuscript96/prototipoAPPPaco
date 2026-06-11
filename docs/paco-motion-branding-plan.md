# Paco App - Plan maestro de Motion Branding y microinteracciones premium

Este documento define como llevar Paco App a una experiencia de UI con movimiento premium: morphing, transiciones de elementos compartidos, botones liquidos, contenedores mutables, motion graphics aplicado a UI, microanimaciones narrativas e identidad de movimiento.

La intencion no es animar por decorar. Cada movimiento debe explicar una relacion, confirmar una accion, reducir incertidumbre o reforzar la personalidad corporativa de Paco.

## 1. Contexto tecnico del proyecto

Paco App no es una app React/Next.js tradicional. Es un prototipo Expo/React Native con:

- `expo@~56.0.9`
- `expo-router@~56.2.9`
- `react-native@0.85.3`
- `react-native-reanimated@4.3.1`
- `react-native-gesture-handler@~2.31.1`
- `nativewind@^4.2.5`
- `tailwindcss@^3.4.19`

Por eso, la idea "Framer Motion + Tailwind CSS" se debe traducir a un stack equivalente para mobile:

| Concepto en React/Next.js | Equivalente recomendado en Paco App |
| --- | --- |
| `framer-motion` / `motion` | `react-native-reanimated` |
| `motion.button` | `AnimatedPressable`, `PressableScale`, `MorphButton` |
| `whileHover` | Solo web: `onHoverIn/onHoverOut` o estados visuales por plataforma |
| `whileTap` | `onPressIn/onPressOut` + shared values |
| `layoutId` / shared layout | Transiciones coordinadas con Expo Router, Reanimated layout transitions o shared transition simulation |
| `AnimatePresence` | Montaje/desmontaje con estado local + Reanimated entering/exiting |
| Tailwind CSS | NativeWind + tokens en `tailwind.config.js` |
| Spring physics | `withSpring`, presets de `spring` y tokens en `theme/motion.ts` |
| Variants declarativas | Objetos de preset en `theme/motion.ts` y wrappers en `components/paco/motion.tsx` |

Framer Motion solo debe considerarse directamente si se crea una superficie web separada en React/Next.js. Para la app mobile-first de este repo, el plan oficial debe ejecutarse con Reanimated, Gesture Handler y NativeWind.

## 2. Regla para agentes IA

Los agentes no necesitan "ver" la animacion para implementarla bien. Necesitan reglas declarativas.

Toda tarea de motion debe especificarse con esta estructura:

- **Disparador:** que accion o estado inicia el movimiento.
- **Objeto:** que elemento se mueve o cambia.
- **Transformacion:** escala, opacidad, posicion, color, borde, radio, progreso o contenido.
- **Fisica:** timing o spring, duracion, damping, stiffness o bounce.
- **Narrativa:** que historia visual comunica.
- **Estado final:** que queda visible despues.
- **Accesibilidad:** como se degrada con reduce motion.
- **Performance:** que propiedades evita animar.

Ejemplo de instruccion correcta para un agente:

> Implementa el boton de confirmar adelanto como `MorphButton`. Disparador: press en confirmar. Estado 1: boton pill normal. Estado 2: se comprime a capsula de carga con spinner. Estado 3: viaja visualmente hacia la tarjeta de resultado. Estado 4: se transforma en check y luego en comprobante. Usa `withSpring` para escala y `withTiming` para opacidad. Respeta reduce motion dejando solo fade y cambio textual.

## 3. Principios de identidad de movimiento

### 3.1 Personalidad Paco

El movimiento debe sentirse:

- **Confiable:** transiciones estables en dinero, firma, documentos y seguridad.
- **Humano:** microinteracciones calidas en bienestar, mood, reconocimientos, cumpleaños y chat.
- **Corporativo:** elegante, sobrio, sin animaciones infantiles.
- **Operativo:** feedback inmediato, sin bloquear la tarea.
- **Premium:** continuidad espacial, transformaciones suaves y estados claros.

### 3.2 Reglas de estilo

- El movimiento debe ayudar a entender causa y consecuencia.
- Un mismo gesto debe tener la misma respuesta en toda la app.
- Las operaciones financieras no usan confetti exagerado.
- Los procesos legales y de seguridad usan motion sobrio.
- Los modulos de bienestar y reconocimiento pueden usar motion mas expresivo.
- El usuario nunca debe esperar una animacion para poder continuar.
- El texto de feedback siempre acompaña al movimiento.

## 4. Tokens de motion

Crear o ampliar `theme/motion.ts` con tokens declarativos.

```ts
export const motion = {
  duration: {
    instant: 90,
    fast: 150,
    normal: 260,
    slow: 420,
    narrative: 700,
  },
  spring: {
    press: { damping: 18, stiffness: 360 },
    soft: { damping: 22, stiffness: 220 },
    confident: { damping: 26, stiffness: 300 },
    celebratory: { damping: 14, stiffness: 260 },
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
};
```

Estos tokens deben ser la fuente de verdad. Ningun modulo debe inventar valores arbitrarios si existe un preset.

## 5. Componentes base de motion

### 5.1 `PressableScale`

Uso:

- Cards.
- Rows.
- Chips.
- Botones secundarios.
- Acciones rapidas del dashboard.

Comportamiento:

- `onPressIn`: escala a `0.97`.
- `onPressOut`: vuelve con spring.
- Reduce motion: sin escala, solo cambio de opacidad o color.

### 5.2 `MorphButton`

Uso:

- Login.
- Activacion.
- Recuperar contraseña.
- Confirmar adelanto.
- Confirmar recarga.
- Pagar servicio.
- Enviar solicitud.
- Enviar voz del colaborador.
- Firmar documento.
- Completar curso.
- Guardar configuracion.

Estados:

- `idle`: pill estable con label e icono opcional.
- `pressed`: contraccion tactil.
- `loading`: ancho se comprime, label se desvanece, loader aparece.
- `success`: radio aumenta, loader se convierte en check.
- `expandedSuccess`: check se expande a tarjeta o comprobante.
- `error`: shake localizado y mensaje inline.

Narrativa:

1. "El usuario inicio una accion."
2. "La app esta procesando."
3. "La accion termino."
4. "El resultado ya vive en la interfaz."

### 5.3 `LiquidButton`

Uso:

- Descargar.
- Copiar codigo.
- Marcar como leido.
- Adjuntar archivo.
- Filtrar.
- Guardar borrador.
- Abrir soporte externo.

Comportamiento:

- El contenedor cambia de ancho segun estado.
- El icono y el texto se alternan con crossfade.
- Puede mostrar contador, progreso o check.
- No debe navegar por si solo sin feedback previo.

### 5.4 `MutableContainer`

Uso:

- Confirm sheets.
- Resumen financiero.
- Bloqueo de encuesta obligatoria.
- Adjuntos.
- KYC.
- Firma.
- Comprobantes.

Comportamiento:

- El contenedor se expande o contrae para revelar el siguiente estado.
- El contenido interno entra con stagger.
- Los cambios de altura deben usarse con cuidado; en listas largas se prefiere transform/opacidad.

### 5.5 `SharedSurface`

Uso:

- Card de lista a detalle.
- Banner a comunicado.
- Curso a leccion.
- Documento a visor.
- Chat list item a sala.
- Notificacion a destino.

Comportamiento:

- El elemento tocado conserva identidad visual durante la navegacion.
- Si la transicion compartida real no es viable, simularla con:
  - card origen con press/scale,
  - pantalla destino con header que replica icono/titulo,
  - entrada con scale/fade desde la zona de origen,
  - skeleton o placeholder para evitar parpadeo.

### 5.6 `NarrativeSuccess`

Uso:

- Adelanto aprobado.
- Pago exitoso.
- Recarga completada.
- Documento firmado.
- Encuesta finalizada.
- Ticket creado.
- Curso completado.

Secuencia:

1. CTA se comprime.
2. Loader confirma proceso.
3. Check aparece con pop sobrio.
4. Resultado se expande a comprobante.
5. Acciones secundarias entran despues: descargar, copiar, compartir, volver.

## 6. Equivalencia declarativa estilo Framer Motion

Aunque no se use Framer Motion directamente, los agentes deben pensar con una sintaxis mental parecida:

```tsx
// Mental model Framer Motion
<motion.button
  whileTap={{ scale: 0.95 }}
  animate={state === "success" ? "success" : "idle"}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```

En Paco App debe implementarse como:

```tsx
// Mental model Expo/Reanimated
const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

function pressIn() {
  scale.value = withSpring(0.97, motion.spring.press);
}

function pressOut() {
  scale.value = withSpring(1, motion.spring.press);
}
```

La meta es conservar la claridad declarativa de Framer Motion, pero con primitives nativas compatibles con Expo.

## 7. Motion Graphics aplicado a UI

Motion Graphics en UI significa que la interfaz tiene direccion visual, ritmo y storytelling.

### 7.1 Ritmo

- Dashboard: entrada escalonada hero -> pendientes -> acciones -> modulos.
- Formularios: paso activo primero, campos secundarios despues.
- Listas: maximo 6 elementos con stagger visible; listas largas no deben animar cada item individualmente.
- Comprobantes: sello/check primero, datos importantes despues, acciones al final.

### 7.2 Direccion

- Entrar a detalle: movimiento hacia adelante y arriba.
- Volver: movimiento inverso suave.
- Confirmar: movimiento hacia el centro o hacia el resumen.
- Error: movimiento horizontal corto.
- Exito: movimiento vertical positivo o expansion desde el CTA.

### 7.3 Jerarquia

El movimiento debe indicar prioridad:

- Lo urgente entra primero.
- Lo secundario aparece despues.
- Lo bloqueado no compite con el CTA.
- Los cambios de estado deben enfocarse visualmente sin ocultar contexto.

## 8. Patrones por tipo de interaccion

### 8.1 Morphing

Definicion:

Un elemento cambia de forma, tamaño o funcion suavemente para convertirse en otra cosa.

Aplicaciones Paco:

- Boton "Confirmar" -> loader -> check -> comprobante.
- Chip de emocion -> seleccion activa -> resumen de mood.
- Archivo adjunto -> preview -> documento cargado.
- Firma pendiente -> sello firmado.
- Curso en progreso -> curso completado.

Criterios:

- El usuario debe reconocer que es el mismo objeto transformado.
- No debe haber salto visual entre estados.
- El cambio de texto debe acompañarse de opacidad, no aparecer abruptamente.

### 8.2 Transiciones de elementos compartidos

Definicion:

Un elemento de la pantalla A se convierte en parte de la pantalla B.

Aplicaciones Paco:

- Card de notificacion -> detalle o modulo destino.
- Card de curso -> pantalla de leccion.
- Row de documento -> visor.
- Card de comunicado -> detalle con adjunto.
- Chat preview -> sala de chat.
- Recibo -> visor/firma.

Criterios:

- La identidad visual se conserva: icono, titulo, color de dominio o imagen.
- La pantalla destino debe abrir con continuidad espacial.
- Si la navegacion no soporta shared transition real, se permite una simulacion documentada.

### 8.3 Botones de estado liquido

Definicion:

El contenedor responde al estado de la app: se estira, comprime, rebota o cambia de funcion.

Aplicaciones Paco:

- Descargar -> descargando -> disponible offline.
- Copiar codigo -> copiado.
- Marcar leida -> leida.
- Adjuntar -> archivo listo.
- Guardar -> guardado.
- Enviar mensaje -> enviado.

Criterios:

- El estado final debe quedar visible al menos 1.2 segundos.
- El cambio debe ser reversible si la accion se puede revertir.
- No usar rebote fuerte en acciones sensibles.

### 8.4 Microanimaciones narrativas

Definicion:

Secuencias pequeñas que cuentan un resultado.

Aplicaciones Paco:

- KYC: capturas -> validando -> identidad verificada.
- Adelanto: monto -> aceptacion legal -> dispersion mock -> reflejo en gastos.
- Encuesta: preguntas -> progreso -> desbloqueo.
- Curso: lecciones -> progreso -> completado.
- Voz RH: reporte -> folio -> chat abierto.

Criterios:

- Debe tener inicio, proceso y cierre.
- Debe comunicar progreso, no solo decorar.
- Debe actualizar datos locales o estado visible.

## 9. Cobertura por modulo

### 9.1 Acceso y configuracion inicial

Motion requerido:

- Cards de permisos que se expanden al aceptar.
- Boton login con morph `idle -> loading -> success`.
- Error de credenciales con shake localizado.
- Mostrar contraseña con icono que rota/cambia suavemente.
- Recuperacion con pasos y barra de progreso.

Narrativa:

"Paco prepara el entorno, valida tu identidad y te abre la app con confianza."

### 9.2 Dashboard

Motion requerido:

- Entrada escalonada del saludo, wallet, pendientes, banners y modulos.
- Pulse sobrio para pendientes criticos.
- Cards con press-scale.
- Notificacion nueva con punto que aparece mediante pop.
- Si hay bloqueo por encuesta, overlay que sube como sheet y enfoca la tarea.

Narrativa:

"La app ordena el dia laboral y muestra que requiere atencion."

### 9.3 Estado de animo

Motion requerido:

- Slider con thumb elastico.
- Avatar/estado que cambia por morphing.
- Chips de sentimientos con seleccion liquida.
- Factores expandibles con contenedor mutable.
- Guardar registro con `MorphButton`.
- Graficas con barras/lineas que se dibujan progresivamente.

Narrativa:

"El colaborador convierte una sensacion personal en un registro claro y visible."

### 9.4 Cumpleaños y aniversarios

Motion requerido:

- Tabs con indicador liquido.
- Medallas de antiguedad con pop controlado.
- Filtro por fecha con reordenamiento suave.
- Felicitar con boton `Felicitado`.

Narrativa:

"La convivencia interna se siente viva sin perder sobriedad."

### 9.5 Notificaciones

Motion requerido:

- Rows con unread dot animado.
- Swipe o accion de borrar con resistencia visual.
- Borrar todas con confirm sheet mutable.
- Notificacion a detalle con shared surface.
- Marcar leida disuelve el punto y cambia peso visual.

Narrativa:

"Las alertas se limpian, se entienden y conectan con su destino."

### 9.6 Adelanto de nomina

Motion requerido:

- Validacion de elegibilidad con checks secuenciales.
- Slider de monto con fill liquido.
- Desglose que aparece en acordeon.
- Checkbox legal con sello sobrio.
- Confirmar con morph a comprobante.
- Reflejo en reporte de gastos con entrada animada del nuevo adeudo.

Narrativa:

"El usuario transforma salario disponible en una solicitud confirmada y trazable."

### 9.7 Reporte de gastos

Motion requerido:

- Grafica circular dibujada progresivamente.
- Filtros con chips liquidos.
- Adeudos actualizados con numero animado.
- Historial con list items escalonados.
- Soporte WhatsApp mock con feedback `abriendo soporte`.

Narrativa:

"Los movimientos financieros se vuelven comprensibles y auditables."

### 9.8 Recargas

Motion requerido:

- Operadores seleccionables con scale y borde animado.
- Tipo de recarga con segmented liquido.
- Montos como pills mutables.
- Confirmacion de numero con validacion visual.
- Codigo mock con boton copiar liquido.

Narrativa:

"La seleccion se convierte en una recarga confirmada con codigo visible."

### 9.9 Pago de servicios

Motion requerido:

- Categoria -> proveedor con shared transition.
- Escaneo mock con marco pulsante.
- Metodo de pago con contenedor mutable.
- KYC con pasos narrativos.
- Confirmar pago con morph a recibo.

Narrativa:

"El recibo fisico o referencia se convierte en un pago digital comprobable."

### 9.10 Comunicacion interna

Motion requerido:

- Comunicado list item -> detalle con shared surface.
- Adjuntos como chips que se expanden a visor/descarga.
- Descarga simulada con barra que se transforma en check.
- Badge de no leido que desaparece al abrir.

Narrativa:

"Un aviso de RH pasa de alerta pendiente a documento consultado."

### 9.11 Encuestas

Motion requerido:

- Bloqueo obligatorio como overlay narrativo.
- Progreso que avanza pregunta por pregunta.
- Preguntas con slide horizontal.
- Respuestas con chips/radios liquidos.
- Finalizar -> desbloqueo del dashboard.

Narrativa:

"La app explica por que bloquea, guia la respuesta y libera el acceso."

### 9.12 Voz del colaborador

Motion requerido:

- Categorias con selection cards.
- Descripcion contextual que se expande.
- Toggle anonimo con microcopy dinamico.
- Adjuntar evidencia con preview mutable.
- Enviar reporte -> folio -> chat RH.
- Estatus con timeline animado.

Narrativa:

"Una inquietud sensible se convierte en un caso rastreable y acompañado."

### 9.13 Reconocimientos

Motion requerido:

- Medallas con entrada premium.
- Busqueda de colaborador con resultados escalonados.
- Medalla enviada que viaja simbolicamente al destinatario.
- Tabs enviados/recibidos con indicador liquido.

Narrativa:

"El reconocimiento se siente como una transferencia positiva entre personas."

### 9.14 Solicitudes

Motion requerido:

- Wizard con progreso.
- Campos dinamicos que aparecen segun respuestas.
- Selector de fechas con feedback tactil.
- Enviar solicitud -> card pendiente.
- Timeline que activa pasos.
- Editar/eliminar con confirmacion mutable.

Narrativa:

"Una necesidad laboral se convierte en solicitud formal con seguimiento."

### 9.15 Bienestar en linea

Motion requerido:

- Categorias con cards compartidas a recursos.
- Play multimedia con pulso suave.
- Descargar recurso con progress morph.
- Estado vacio con icono que aparece calmadamente.

Narrativa:

"El recurso de bienestar se siente accesible, tranquilo y guiado."

### 9.16 Solicitud de documentos

Motion requerido:

- Carpeta -> listado con shared surface.
- Generar PDF mock con documento que se construye.
- Firma mock con trazo o sello.
- Guardar/subir con boton liquido.

Narrativa:

"Un formato solicitado se convierte en documento generado y firmado."

### 9.17 Capacitaciones

Motion requerido:

- Tabs pendientes/en curso/finalizadas.
- Curso -> leccion con shared surface.
- Progreso animado.
- Descargar offline con fases.
- Audio con ondas/pulso.
- Grabacion mock con punto parpadeante.
- Completar leccion -> avance visible.

Narrativa:

"El aprendizaje avanza por pasos visibles hasta convertirse en logro."

### 9.18 Perfil y expediente

Motion requerido:

- Avatar editable con morph.
- Secciones tipo acordeon.
- Editar correo/telefono inline.
- Carga de CV/contrato como chip/document card.
- Guardar cambios con `MorphButton`.

Narrativa:

"El expediente pasa de lectura a actualizacion controlada."

### 9.19 Documentos corporativos

Motion requerido:

- Carpeta -> documentos con shared surface.
- Documento -> visor.
- Descarga -> descargado.
- Acciones recurrentes con LiquidButton.

Narrativa:

"Los documentos se sienten ubicables, consultables y recuperables."

### 9.20 Recibos de nomina

Motion requerido:

- PDF/XML como acciones hermanas.
- Firma individual con morph a sello.
- Firma masiva con contador mutable.
- Badge firmado con pop sobrio.

Narrativa:

"El recibo deja de estar pendiente y queda firmado con evidencia visual."

### 9.21 Cartas SUA

Motion requerido:

- Carta -> visor.
- Firma mock -> comprobante.
- Descarga con estado persistente.

Narrativa:

"Una carta laboral pasa de pendiente a documento aceptado."

### 9.22 Preguntas frecuentes

Motion requerido:

- Acordeones fluidos.
- Busqueda con resultados que se reordenan suavemente.
- Soporte externo con boton liquido.

Narrativa:

"La duda se abre, se reduce y conecta con ayuda externa si hace falta."

### 9.23 Chat de soporte tecnico

Motion requerido:

- Formulario -> ticket.
- Ticket -> conversacion.
- Burbujas con entrada natural.
- Adjuntos como previews mutables.
- Respuesta mock con indicador de escritura.

Narrativa:

"El problema se convierte en ticket y luego en conversacion."

### 9.24 Configuracion y seguridad

Motion requerido:

- Cambiar contraseña/NIP con pasos.
- Recuperar NIP con codigo revelado.
- Cuentas/tarjetas con cards accionables.
- Logout con confirmacion sobria.
- Eliminar cuenta sin animacion celebratoria.

Narrativa:

"Las acciones sensibles se sienten controladas, claras y seguras."

### 9.25 Chat interno

Motion requerido:

- Chat preview -> sala con shared surface.
- Crear sala con participantes que se convierten en chips.
- Mensajes con stagger.
- Adjuntos con preview.

Narrativa:

"Una relacion de equipo pasa de lista a conversacion activa."

### 9.26 Terminos y condiciones

Motion requerido:

- Progreso de lectura sutil.
- Aceptacion/firma con sello.
- Fecha de aceptacion aparece con fade.

Narrativa:

"La aceptacion legal queda clara, fechada y visible."

## 10. Fases de implementacion

### Fase 0 - Auditoria

Objetivo:

Mapear lo que ya existe en `docs/paco-interactions-plan.md`, `components/paco/motion.tsx`, `components/paco/ui.tsx`, `components/paco/layout.tsx` y pantallas `(paco)`.

Entregables:

- Inventario de primitives existentes.
- Lista de acciones primarias sin feedback.
- Lista de rutas que necesitan shared surface.
- Decisiones agregadas a `docs/paco-ux-decisions.md`.

### Fase 1 - Sistema declarativo de motion

Objetivo:

Crear la capa reusable antes de modificar modulos.

Entregables:

- `theme/motion.ts`
- `components/paco/motion.tsx` ampliado
- `MorphButton`
- `LiquidButton`
- `MutableContainer`
- `SharedSurface`
- `NarrativeSuccess`
- `ShakeView`
- `ReduceMotionProvider` o hook equivalente

### Fase 2 - Acciones primarias

Objetivo:

Todo boton primario debe tener feedback visible.

Orden recomendado:

1. Acceso/login.
2. Adelanto.
3. Recargas.
4. Servicios.
5. Solicitudes.
6. Voz colaborador.
7. Documentos/firma.
8. Capacitaciones.
9. Configuracion.

### Fase 3 - Continuidad espacial

Objetivo:

Eliminar cambios bruscos entre listas y detalles.

Prioridad:

- Notificaciones.
- Comunicados.
- Cursos.
- Documentos.
- Recibos.
- Chats.
- Solicitudes.
- Bienestar.

### Fase 4 - Motion narrativo por flujo core

Objetivo:

Los flujos de alto valor deben tener inicio, proceso y cierre animado.

Flujos core:

- Adelanto confirmado.
- Pago de servicio.
- Recarga.
- Encuesta obligatoria finalizada.
- Firma de recibo/documento.
- Curso completado.
- Reporte de voz creado.
- Ticket de soporte creado.

### Fase 5 - Motion branding por dominio

Objetivo:

Afinar personalidad por area.

- Finanzas: spring firme, poco rebote, comprobantes claros.
- RH/personas: motion calido, medallas, chips y avatares vivos.
- Documentos: transiciones formales, sellos y estados persistentes.
- Bienestar: motion calmado, fades suaves, pulsos discretos.
- Chat/soporte: burbujas agiles, typing indicators, adjuntos mutables.

### Fase 6 - QA, accesibilidad y performance

Objetivo:

Asegurar que el motion mejora la app sin romper usabilidad.

Checklist:

- Reduce motion activo no rompe flujos.
- No se animan propiedades costosas en listas grandes.
- Las animaciones no bloquean navegacion.
- Los estados finales quedan visibles.
- `npm run typecheck` pasa.
- No hay lints nuevos.

## 11. Reglas de performance

- Preferir `transform` y `opacity`.
- Evitar animar `top`, `left`, `width`, `height` en listas grandes.
- Limitar stagger a los primeros elementos visibles.
- No usar loops infinitos salvo estados activos reales: audio, grabacion, carga.
- Detener animaciones al desmontar.
- Evitar particulas/confetti salvo logros puntuales.
- Skeleton shimmer solo si la carga dura mas de 250-300 ms.

## 12. Accesibilidad

Debe existir soporte para reducir movimiento:

- Si reduce motion esta activo, sustituir desplazamientos por fades.
- Evitar shakes fuertes; usar borde/mensaje.
- No depender del color o movimiento para comunicar exito/error.
- Mantener feedback textual.
- Los cambios de estado deben ser entendibles sin animacion.

## 13. Sobre Skills y MCP

La propuesta de instalar un skill de animacion para Claude Code es util como metodologia, pero este repo esta trabajando en Cursor. La idea equivalente aqui es convertir este documento y los primitives del repo en reglas semanticas que cualquier agente pueda seguir.

Acciones recomendadas:

- Mantener este documento como referencia principal de motion.
- Si se usa Claude Code fuera de Cursor, crear un `SKILL.md` con una version condensada de estas reglas.
- Si se diseña en Framer, usar Framer MCP solo como apoyo visual, no como fuente tecnica unica.
- No introducir Framer Motion en la app mobile salvo que se cree una app web/Next separada.

## 14. Prompt maestro para agentes

Usar este prompt al pedir implementacion:

> Implementa motion premium en Paco App usando el sistema existente de Expo/React Native. No uses Framer Motion web salvo que el objetivo sea una superficie React/Next separada. Traduce los conceptos de Framer Motion a Reanimated: `whileTap` como press shared values, variants como presets en `theme/motion.ts`, layout transitions como `SharedSurface` o simulacion documentada, y spring physics como `withSpring`. Cada microinteraccion debe declarar disparador, objeto, transformacion, fisica, narrativa, estado final, accesibilidad y performance. Prioriza morphing de botones primarios, botones liquidos, contenedores mutables, transiciones de elemento compartido y microanimaciones narrativas en flujos core. Respeta Expo SDK 56, NativeWind, tokens de marca Paco y reduce motion.

## 15. Criterios de aceptacion especificos de motion

- Cada modulo del contrato funcional tiene al menos una microinteraccion relevante.
- Cada accion primaria tiene feedback observable.
- Los flujos core tienen secuencia narrativa: accion -> proceso -> exito/error -> resultado persistente.
- Los listados importantes tienen continuidad hacia detalle.
- Los errores tienen feedback localizado.
- Los estados de carga usan skeleton, progreso o loader integrado segun contexto.
- Los estados vacios tienen entrada suave.
- Las animaciones respetan reduce motion.
- El movimiento usa tokens compartidos.
- No hay animaciones sin proposito.
- No se agregan dependencias nuevas sin justificar.
- La documentacion de cobertura indica que motion se aplico o queda como limitacion mock.

## 16. Definicion de terminado

Esta iniciativa se considera completa cuando:

- `docs/paco-interactions-plan.md` refleja las microinteracciones implementadas.
- `docs/paco-ux-decisions.md` registra decisiones de motion branding.
- Los primitives de motion estan centralizados.
- Las pantallas principales usan esos primitives.
- Los flujos financieros, legales, RH, documentos y capacitaciones tienen narrativa visual.
- La app conserva rendimiento fluido en mobile.
- `npm run typecheck` pasa.
- No hay lints nuevos en archivos tocados.
