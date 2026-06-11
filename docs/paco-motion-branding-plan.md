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

## 10. Especificacion ejecutable por modulo

Esta seccion baja el plan a instrucciones concretas. Para cada modulo se indica:

- **Donde:** ruta o componente real del proyecto.
- **Motion/recurso:** primitive, efecto visual, patron narrativo o recurso complementario.
- **Como hacerlo:** instrucciones de implementacion para un agente.
- **Estado final esperado:** que debe quedar visible despues de la interaccion.

Regla tecnica: si el primitive ya existe en `components/paco/motion.tsx`, reutilizarlo. Si no existe, crearlo ahi o en `components/paco/ui.tsx` si es un componente compuesto. No dispersar animaciones dentro de cada pantalla salvo valores de estado locales inevitables.

### 10.1 Acceso, activacion y recuperacion

Donde:

- `app/(paco)/welcome.tsx`
- `app/(paco)/login.tsx`
- `app/(paco)/activate.tsx`
- `app/(paco)/recover.tsx`
- `app/(paco)/help.tsx`

Motion/recurso:

- `FadeSlideIn` para entrada de bloques.
- `ShakeView` para errores.
- Nuevo `MorphButton` para acciones primarias.
- Nuevo `MutableContainer` para pasos de activacion/recuperacion.
- Recurso visual: iconos Phosphor/lucide existentes desde `components/paco/glyphs.tsx`.

Como hacerlo:

1. En `welcome.tsx`, envolver cada card de permiso o acceso con `FadeSlideIn` usando delays `0`, `70`, `140`.
2. En los botones "Ya tengo cuenta", "No tengo cuenta" y ayuda externa, reemplazar `Button` por `MorphButton` solo si la accion simula carga o navegacion confirmada. Si solo navega, mantener `PressableScale`.
3. En `login.tsx`, envolver el formulario completo con `ShakeView` usando un contador `errorStamp`. Incrementar el contador cuando las credenciales mock sean invalidas.
4. En el boton "Ingresar", usar estados `idle -> loading -> success`. El estado `loading` debe durar `450-700ms` para que se perciba el procesamiento mock.
5. Al tener exito, el check del boton debe aparecer antes de navegar a `/(paco)/home`. La navegacion debe ocurrir al terminar la animacion o tras un `setTimeout` corto documentado.
6. En `activate.tsx` y `recover.tsx`, mostrar pasos dentro de `MutableContainer`: telefono/correo -> codigo -> nueva credencial/confirmacion.
7. El ojo de mostrar contraseña debe usar crossfade/rotacion leve entre iconos, no cambiar de golpe.

Estado final esperado:

- Login exitoso muestra check antes de entrar al dashboard.
- Error de login sacude solo el formulario y deja mensaje rojo visible.
- Activacion/recuperacion terminan con una tarjeta de exito y CTA para continuar.

### 10.2 Dashboard

Donde:

- `app/(paco)/home.tsx`
- `components/paco/layout.tsx`
- `components/paco/ui.tsx`

Motion/recurso:

- `FadeSlideIn` con stagger.
- `PressableScale` en accesos rapidos, banners y modulos.
- `useAnimatedNumber` en saldos y adeudos.
- Nuevo `PulseDot` o `PopIn` para badge de notificaciones.
- Nuevo `MandatoryOverlayMotion` o `MutableContainer` para bloqueo por encuesta.

Como hacerlo:

1. Mantener el `FadeSlideIn` del hero financiero, pero agregar delays por bloque: hero `0`, pendientes `80`, banners `140`, modulos `200`.
2. En `HomeHeader`, reemplazar `Pressable` de avatar y campana por `PressableScale`.
3. En el badge de notificaciones, envolver el circulo rojo con `PopIn` cuando `unread > 0`.
4. En la tarjeta wallet, usar `useAnimatedNumber` para disponible y deuda. Si una accion financiera cambia store, el numero debe interpolar, no saltar.
5. En `MandatorySurveyLock`, hacer que el icono de candado entre con `PopIn`, el texto con `FadeSlideIn delay=80` y el CTA con `FadeSlideIn delay=160`.
6. Si la encuesta obligatoria se completa, el bloqueo debe desaparecer con fade o navegacion controlada hacia home desbloqueado.

Estado final esperado:

- El dashboard aparece con jerarquia clara.
- La campana comunica novedad con pop.
- Los saldos cambian suavemente cuando hay operaciones mock.
- El bloqueo obligatorio se siente intencional, no como error.

### 10.3 Estado de animo

Donde:

- `app/(paco)/mood.tsx`
- `app/(paco)/mood-charts.tsx`
- `components/paco/ui.tsx`

Motion/recurso:

- `PressableScale` para chips.
- Nuevo `LiquidSlider` o extender slider existente.
- Nuevo `MoodFaceMorph`.
- `AnimatedBar` para graficas.
- `MorphButton` para guardar.

Como hacerlo:

1. El slider de animo debe actualizar un shared/animated value visual. El thumb debe escalar a `1.08` mientras se arrastra y volver a `1` al soltar.
2. El avatar/estado debe cambiar con morph: color de fondo interpolado, icono con crossfade y escala corta.
3. Los chips de sentimientos/factores deben usar `PressableScale`; al activarse, cambiar fondo/borde con transicion corta y mostrar check mini si aplica.
4. El boton "Mostrar mas" debe expandir el contenedor con `MutableContainer`, revelando nuevos chips con stagger de `30ms`.
5. "Guardar estado" debe usar `MorphButton`: `idle -> loading -> success`.
6. En `mood-charts.tsx`, las barras de historico deben usar `AnimatedBar`; los contadores deben usar `useAnimatedNumber`.

Estado final esperado:

- El estado seleccionado se siente vivo.
- Guardar cambia el store local y muestra confirmacion.
- El historico/graficas entra progresivamente.

### 10.4 Cumpleanos y aniversarios

Donde:

- `app/(paco)/celebrations.tsx`

Motion/recurso:

- `Segmented` existente para tabs.
- `PressableScale` para filas/personas.
- `PopIn` para medallas.
- `LiquidButton` para felicitar.

Como hacerlo:

1. Asegurar que las tabs usen `Segmented`; no implementar tabs estaticas.
2. Cada persona debe estar en `Row` o `PressableScale`.
3. Las medallas de antiguedad deben envolverse en `PopIn delay={index * 30}`.
4. El boton "Felicitar" debe convertirse a estado "Felicitado" con `LiquidButton`. No basta toast.
5. Al cambiar filtro de fecha, el listado debe entrar con `FadeSlideIn` usando key por filtro.

Estado final esperado:

- Tabs se desplazan con indicador liquido.
- Felicitar deja marca visible en la persona.
- Las medallas aparecen con motion premium discreto.

### 10.5 Notificaciones

Donde:

- `app/(paco)/notifications.tsx`
- `components/paco/ui.tsx` (`Row`, `ListGroup`)

Motion/recurso:

- `Row` con `PressableScale`.
- `PopIn` para unread dot.
- `FadeSlideIn` para entrada de lista.
- `ShakeView` no aplica salvo error.
- Nuevo `SwipeDismissRow` opcional si se aprueba gestos.
- `MutableContainer` para confirmar "Borrar todas".

Como hacerlo:

1. Cada notificacion debe usar `Row` con `unread`.
2. El punto unread debe envolverse con `PopIn` o primitive `UnreadDot`.
3. Al abrir una notificacion, marcarla como leida y hacer que el punto desaparezca con fade antes o durante la navegacion.
4. Si la notificacion tiene destino, simular shared transition: presionar row, hacer scale, navegar al destino y abrir pantalla destino con header equivalente.
5. "Borrar todas" debe abrir un confirm sheet con `MutableContainer`: resumen -> confirmar -> borrado.
6. Despues de borrar, mostrar estado vacio con `EmptyState` + `PopIn`.

Estado final esperado:

- Leido/no leido se entiende visualmente.
- Borrar todas no se siente brusco.
- Las notificaciones llevan al usuario a un contexto.

### 10.6 Adelanto de nomina

Donde:

- `app/(paco)/advance.tsx`
- `app/(paco)/expenses.tsx`
- `components/paco/kyc.tsx`
- `mock/paco/finance.ts`
- `store/paco-store.ts`

Motion/recurso:

- `AnimatedBar` o nuevo `LiquidAmountSlider`.
- `MorphButton` para confirmar.
- `MutableContainer` para desglose y legales.
- `NarrativeSuccess` para comprobante.
- `useAnimatedNumber` en monto/neto/adeudo.
- KYC con pasos narrativos.

Como hacerlo:

1. La validacion de antiguedad debe mostrar checks secuenciales con `FadeSlideIn` y `PopIn`.
2. El monto seleccionado debe actualizar numero con `useAnimatedNumber`.
3. El slider debe mostrar fill liquido; si no existe slider animado, crear `LiquidAmountSlider` en `components/paco/ui.tsx`.
4. El desglose financiero debe expandirse con `MutableContainer`.
5. El checkbox legal debe mostrar check con `PopIn`.
6. El boton "Confirmar" debe estar deshabilitado hasta aceptar terminos.
7. Al confirmar, ejecutar secuencia `MorphButton`: loading -> success -> navegar/mostrar `NarrativeSuccess`.
8. Al terminar, insertar movimiento mock en store y reflejarlo en `expenses.tsx`.
9. En `expenses.tsx`, el nuevo adeudo debe aparecer arriba con `FadeSlideIn` y el total debe animarse con `useAnimatedNumber`.

Estado final esperado:

- El adelanto confirmado genera comprobante.
- El adeudo aparece en gastos con entrada animada.
- No hay salto brusco entre solicitud y resultado.

### 10.7 Reporte de gastos

Donde:

- `app/(paco)/expenses.tsx`
- `mock/paco/finance.ts`

Motion/recurso:

- `Shimmer` + `useFakeLoad`.
- `AnimatedBar` o `AnimatedDonut` nuevo para grafica circular.
- `Segmented`/chips liquidos para filtros.
- `useAnimatedNumber` para totales.
- `LiquidButton` para soporte WhatsApp mock.

Como hacerlo:

1. Al montar, mostrar skeleton durante `300-450ms` con `useFakeLoad`.
2. Los totales de adeudo y gasto deben usar `useAnimatedNumber`.
3. Si hay grafica circular, crear `AnimatedDonut` con `react-native-svg`; animar `strokeDashoffset` si es viable. Si no, usar barras segmentadas con `AnimatedBar`.
4. Los filtros por periodo/tipo deben usar `Segmented` o `SelectChip` animado.
5. Al cambiar filtro, re-renderizar listado con `FadeSlideIn` por item.
6. Boton WhatsApp/soporte debe usar `LiquidButton`: "Abrir soporte" -> "Preparando enlace" -> "Soporte abierto (mock)".

Estado final esperado:

- El usuario ve carga, contenido y cambios de filtro fluidos.
- Los adeudos cambian sin saltos.

### 10.8 Recargas

Donde:

- `app/(paco)/topups.tsx`
- `mock/paco/finance.ts`

Motion/recurso:

- `PressableScale` para operadores.
- `Segmented` para tiempo aire/datos.
- `SelectChip` mejorado para montos.
- `ShakeView` para telefono/codigo invalido.
- `MorphButton` para pagar.
- `LiquidButton` para copiar codigo.

Como hacerlo:

1. Cada operador debe ser card seleccionable con `PressableScale`.
2. La seleccion debe cambiar borde/fondo y mostrar check con `PopIn`.
3. Tipo de recarga debe usar `Segmented`.
4. Montos deben usar chips; el activo escala sutilmente y cambia a fondo `ink`.
5. Telefono y confirmacion deben validarse; si no coinciden, envolver campos con `ShakeView`.
6. Confirmar debe usar `MorphButton` y mostrar `NarrativeSuccess` con codigo mock.
7. El codigo debe tener `LiquidButton`: "Copiar" -> "Copiado".

Estado final esperado:

- Operador, tipo, monto y numero quedan claramente seleccionados.
- La recarga termina con codigo visible y copiable.

### 10.9 Pago de servicios

Donde:

- `app/(paco)/services.tsx`
- `components/paco/kyc.tsx`
- `mock/paco/finance.ts`

Motion/recurso:

- `SharedSurface` simulado para categoria -> proveedor.
- `PressableScale` para proveedores.
- `Pulse` para marco de escaneo mock.
- `MutableContainer` para metodo/desglose.
- `MorphButton` para pago.
- `NarrativeSuccess` para recibo.

Como hacerlo:

1. Categorias de servicio deben ser tiles con `PressableScale`.
2. Al elegir categoria, proveedor debe aparecer con `FadeSlideIn` y conservar color/icono del dominio.
3. Boton de camara/escaneo debe abrir bloque mock con marco pulsante usando `Pulse active`.
4. KYC debe mostrar pasos INE frente, reverso, selfie y codigo con progreso.
5. Metodo de pago debe cambiar el desglose dentro de `MutableContainer`.
6. Si referencia/monto son invalidos, usar `ShakeView` en bloque de formulario.
7. Pago debe usar `MorphButton` y terminar en recibo con `NarrativeSuccess`.

Estado final esperado:

- El usuario entiende categoria, proveedor, referencia, KYC y pago.
- El recibo queda como estado persistente.

### 10.10 Comunicacion interna

Donde:

- `app/(paco)/comms/index.tsx`
- `app/(paco)/comms/[id].tsx`
- `mock/paco/content.ts`

Motion/recurso:

- `Row` + `PressableScale` en lista.
- `SharedSurface` simulado para comunicado -> detalle.
- `LiquidButton` para descargar/abrir adjuntos.
- `PopIn` para badge de leido/no leido.

Como hacerlo:

1. Listado debe usar `ListGroup` y `Row`.
2. Cada row debe mostrar icono/titulo/tipo de adjunto.
3. Al abrir comunicado, marcar leido y conservar en detalle el mismo icono/color como header.
4. Adjuntos deben ser chips o rows con `LiquidButton`: "Descargar" -> "Descargando" -> "Descargado".
5. Si el adjunto se "abre", mostrar visor mock en `MutableContainer`.

Estado final esperado:

- Comunicado pasa de pendiente a leido.
- Adjuntos tienen accion observable.

### 10.11 Encuestas

Donde:

- `app/(paco)/surveys/index.tsx`
- `app/(paco)/surveys/[id].tsx`
- `app/(paco)/home.tsx`
- `store/paco-store.ts`

Motion/recurso:

- Overlay de bloqueo en home.
- `AnimatedBar` para progreso.
- `FadeSlideIn`/slide para preguntas.
- `SelectChip` para respuestas.
- `MorphButton` para finalizar.
- `NarrativeSuccess` para desbloqueo.

Como hacerlo:

1. Encuesta obligatoria debe bloquear home con el motion especificado en dashboard.
2. En detalle de encuesta, cada pregunta debe tener `key` por indice para reiniciar entrada animada.
3. Progreso debe actualizar con `AnimatedBar`.
4. Respuestas deben usar chips/radio animados.
5. Boton "Siguiente" puede ser `LiquidButton`; boton "Finalizar" debe ser `MorphButton`.
6. Al finalizar, agregar encuesta a `completedSurveyIds`, mostrar tarjeta `NarrativeSuccess` y CTA a dashboard.
7. Al volver a home, el bloqueo ya no debe mostrarse.

Estado final esperado:

- La encuesta guia de pregunta a pregunta.
- Completar desbloquea la app visiblemente.

### 10.12 Voz del colaborador

Donde:

- `app/(paco)/voice/index.tsx`
- `app/(paco)/voice/status.tsx`
- `app/(paco)/voice/[id].tsx`
- `store/paco-store.ts`

Motion/recurso:

- `SelectChip`/cards para categorias.
- `MutableContainer` para descripcion y evidencia.
- Switch animado existente o `ToggleRow`.
- `MorphButton` para envio.
- `NarrativeSuccess` para folio.
- Burbujas de chat con `FadeSlideIn`.

Como hacerlo:

1. Categorias deben ser cards seleccionables, no lista estatica.
2. Al seleccionar categoria, expandir descripcion contextual con `MutableContainer`.
3. Toggle anonimo debe cambiar microcopy: "Tu identidad sera visible" / "Reporte anonimo activo".
4. Adjuntar evidencia debe crear preview local mock con entrada `PopIn`.
5. Enviar debe usar `MorphButton` y crear folio/caso en store.
6. Redirigir a status o mostrar CTA "Ver seguimiento".
7. En `voice/[id].tsx`, mensajes nuevos deben entrar con `FadeSlideIn`; respuesta RH mock con retraso e indicador de escritura.
8. Timeline de estatus debe activar puntos con `PopIn` segun estado.

Estado final esperado:

- Reporte creado con folio visible.
- Estatus y chat RH quedan disponibles.

### 10.13 Reconocimientos

Donde:

- `app/(paco)/recognitions.tsx`
- `mock/paco/people.ts`

Motion/recurso:

- `Segmented` para enviados/recibidos.
- `PopIn` para medallas.
- `PressableScale` para personas.
- `MorphButton` para enviar.
- Nuevo `MedalTransferMotion` opcional.

Como hacerlo:

1. Tabs deben usar `Segmented`.
2. Medallas existentes deben envolverse en `PopIn`.
3. Busqueda de colaborador debe mostrar resultados con `FadeSlideIn delay={index * 35}`.
4. Seleccionar colaborador debe convertirlo en chip/resumen con `MutableContainer`.
5. Enviar reconocimiento debe usar `MorphButton`.
6. Al exito, agregar reconocimiento enviado y mostrar medalla en lista enviados.

Estado final esperado:

- La medalla enviada queda visible.
- El receptor seleccionado se mantiene claro antes de confirmar.

### 10.14 Solicitudes

Donde:

- `app/(paco)/requests/index.tsx`
- `app/(paco)/requests/new.tsx`
- `app/(paco)/requests/[id].tsx`
- `store/paco-store.ts`

Motion/recurso:

- `Segmented` para pendientes/finalizadas.
- `AnimatedBar` para wizard.
- `MutableContainer` para preguntas dinamicas.
- `ShakeView` para validaciones.
- `MorphButton` para enviar.
- Timeline con `PopIn`.

Como hacerlo:

1. Index debe cargar listas con `FadeSlideIn`.
2. Nueva solicitud debe tener pasos: tipo -> fechas -> cuestionario -> resumen.
3. Cada paso debe actualizar `AnimatedBar`.
4. Preguntas dinamicas deben aparecer dentro de `MutableContainer` al elegir tipo/respuesta.
5. Campos requeridos invalidos deben sacudir solo el bloque correspondiente con `ShakeView`.
6. Enviar debe crear solicitud en store y mostrar `NarrativeSuccess`.
7. Detalle debe mostrar timeline; cada punto activo entra con `PopIn delay`.
8. Editar/eliminar deben abrir confirmacion mutable y dejar toast/estado visible.

Estado final esperado:

- Solicitud nueva aparece en pendientes.
- Timeline explica avance.
- Editar/eliminar tienen confirmacion observable.

### 10.15 Bienestar en linea

Donde:

- `app/(paco)/wellness/index.tsx`
- `app/(paco)/wellness/[id].tsx`
- `mock/paco/content.ts`

Motion/recurso:

- `PressableScale` para categorias.
- `SharedSurface` simulado para categoria -> detalle.
- `Pulse` para play multimedia.
- `LiquidButton` para descargar recurso.
- `EmptyState` con `PopIn`.

Como hacerlo:

1. Categorias deben entrar con stagger.
2. Al abrir recurso, detalle debe conservar icono/color de categoria.
3. Play de video/audio mock debe envolver icono con `Pulse active`.
4. Descargar documento debe usar `LiquidButton`.
5. Si una categoria esta vacia, mostrar `EmptyState` con icono `PopIn` y CTA alterno.

Estado final esperado:

- Recursos multimedia muestran estado reproducir/pausar.
- Descargas quedan marcadas.
- Vacio se siente diseñado.

### 10.16 Solicitud de documentos

Donde:

- `app/(paco)/document-requests.tsx`

Motion/recurso:

- `PressableScale` para carpetas/formatos.
- `MutableContainer` para pasos.
- `AnimatedBar` para generacion PDF mock.
- `MorphButton` para generar/firmar.
- `NarrativeSuccess` para documento listo.

Como hacerlo:

1. Carpetas deben abrir listado de formatos con entrada `FadeSlideIn`.
2. Al elegir formato, mostrar resumen en `MutableContainer`.
3. Boton "Generar PDF" debe usar `MorphButton`.
4. Durante generacion, mostrar barra `AnimatedBar` con textos: "Preparando datos", "Generando PDF", "Listo para firma".
5. Firma mock debe cambiar estado pendiente -> firmado con `PopIn`.
6. Guardar/subir debe usar `LiquidButton`.

Estado final esperado:

- Documento generado queda visible como card.
- Firma y guardado tienen estado persistente.

### 10.17 Capacitaciones

Donde:

- `app/(paco)/training/index.tsx`
- `app/(paco)/training/[courseId]/index.tsx`
- `app/(paco)/training/[courseId]/[lessonId].tsx`
- `store/paco-store.ts`

Motion/recurso:

- `Segmented` para pendientes/en curso/finalizadas.
- `SharedSurface` simulado curso -> detalle.
- `AnimatedBar` para progreso.
- `LiquidButton` para descarga offline.
- `Pulse` para audio.
- `Blink` para grabacion.
- `MorphButton` para completar leccion.
- `ConfettiBurst` solo al completar curso obligatorio o 100%.

Como hacerlo:

1. Listado de cursos debe usar `FadeSlideIn` por item.
2. Card de curso debe preservar icono/color en detalle.
3. Progreso de curso/leccion debe usar `AnimatedBar`.
4. Descargar offline debe cambiar por fases: "Descargando recursos" -> "Guardando offline" -> "Disponible offline".
5. En leccion, audio mock debe usar `Pulse active={playing}`.
6. Grabacion mock debe usar `Blink active={recording}` en punto rojo.
7. Completar leccion debe usar `MorphButton`.
8. Si completar la leccion cierra el curso, mostrar `ConfettiBurst` contenido una sola vez y marcar curso finalizado.

Estado final esperado:

- Curso muestra progreso real mock.
- Offline, audio, grabacion y entregables tienen feedback claro.

### 10.18 Perfil y expediente

Donde:

- `app/(paco)/profile.tsx`

Motion/recurso:

- `PopIn` para avatar/foto.
- `MutableContainer` para secciones editables.
- `LiquidButton` para cargar CV/contrato.
- `MorphButton` para guardar correo/telefono.
- `PressableScale` para filas de expediente.

Como hacerlo:

1. Avatar debe entrar con `PopIn`.
2. Datos laborales/personales deben estar en acordeones o grupos mutables.
3. Editar correo/telefono debe expandir input inline sin navegar.
4. Guardar dato debe usar `MorphButton`.
5. Cargar CV/contrato debe usar `LiquidButton`: "Subir" -> "Subiendo" -> "Archivo cargado".

Estado final esperado:

- Cambios de contacto quedan visibles.
- Archivos mock aparecen como documentos adjuntos.

### 10.19 Documentos corporativos

Donde:

- `app/(paco)/corporate-docs.tsx`

Motion/recurso:

- `PressableScale` para carpetas/documentos.
- `SharedSurface` simulado a visor.
- `LiquidButton` para descargar.
- `MutableContainer` para preview/visor mock.

Como hacerlo:

1. Carpetas deben mostrar icono y contador.
2. Al entrar a carpeta, documentos aparecen con `FadeSlideIn`.
3. Al abrir documento, mostrar visor mock que conserva titulo/icono.
4. Descargar debe tener estados "Descargando" y "Descargado".

Estado final esperado:

- Documento consultado/descargado queda marcado.

### 10.20 Recibos de nomina

Donde:

- `app/(paco)/receipts.tsx`

Motion/recurso:

- `Segmented` o filtros para periodos.
- `LiquidButton` para PDF/XML.
- `MorphButton` para firma individual.
- `MutableContainer` para firma masiva.
- `PopIn` para badge firmado.

Como hacerlo:

1. Listado de recibos debe entrar con stagger.
2. Acciones PDF/XML deben ser botones liquidos independientes.
3. Firma individual debe usar `MorphButton`: "Firmar" -> "Firmando" -> "Firmado".
4. Firma masiva debe mostrar contador mutable de seleccionados.
5. Al firmar, badge "Firmado" entra con `PopIn`.

Estado final esperado:

- Recibos firmados quedan persistentes.
- PDF/XML tienen feedback de descarga/apertura mock.

### 10.21 Cartas SUA

Donde:

- `app/(paco)/sua.tsx`

Motion/recurso:

- `Row` con `PressableScale`.
- `SharedSurface` simulado a visor.
- `MorphButton` para firmar.
- `LiquidButton` para descargar.

Como hacerlo:

1. Listado debe usar `ListGroup`.
2. Abrir carta debe mostrar visor mock con entrada `FadeSlideIn`.
3. Firmar debe convertir boton en sello/check.
4. Descargar debe quedar en estado descargado.

Estado final esperado:

- Carta firmada muestra sello y fecha mock.

### 10.22 Preguntas frecuentes y ayuda externa

Donde:

- `app/(paco)/help.tsx`

Motion/recurso:

- `MutableContainer` para acordeones.
- `FadeSlideIn` para resultados.
- `LiquidButton` para soporte externo.

Como hacerlo:

1. FAQs deben abrir/cerrar con contenedor mutable.
2. Si hay busqueda, resultados deben reaparecer con `FadeSlideIn`.
3. CTA externo debe cambiar estado: "Abrir soporte" -> "Preparando" -> "Soporte abierto (mock)".

Estado final esperado:

- Preguntas se expanden fluidamente.
- Redireccion externa queda simulada.

### 10.23 Chat de soporte tecnico

Donde:

- `app/(paco)/support.tsx`

Motion/recurso:

- `MorphButton` para crear ticket.
- `NarrativeSuccess` para folio.
- `FadeSlideIn` para burbujas.
- Nuevo `TypingIndicator`.
- `LiquidButton` para adjuntos.

Como hacerlo:

1. Formulario debe validar campos; errores usan `ShakeView`.
2. Crear ticket debe usar `MorphButton`.
3. Al exito, mostrar folio y abrir conversacion mock.
4. Mensaje del usuario entra inmediatamente con `FadeSlideIn`.
5. Respuesta del soporte entra tras indicador de escritura.
6. Adjuntar archivo crea preview con `PopIn`.

Estado final esperado:

- Ticket creado con folio.
- Conversacion muestra ida y vuelta mock.

### 10.24 Configuracion y seguridad

Donde:

- `app/(paco)/settings/index.tsx`
- `app/(paco)/settings/password.tsx`
- `app/(paco)/settings/nip.tsx`
- `app/(paco)/settings/accounts.tsx`

Motion/recurso:

- `Row`/`PressableScale` para opciones.
- `AnimatedBar` para pasos.
- `ShakeView` para validaciones.
- `MorphButton` para guardar.
- `MutableContainer` para confirmaciones sensibles.

Como hacerlo:

1. Index de settings debe usar rows con press feedback.
2. Cambiar contraseña/NIP debe mostrar progreso por pasos.
3. Si contraseñas/NIP no coinciden, sacudir bloque de campos.
4. Guardar debe usar `MorphButton`.
5. Recuperar NIP debe revelar codigo mock con `PopIn`.
6. Cuentas/tarjetas deben usar cards con `PressableScale`; agregar/eliminar abre confirmacion mutable.
7. Logout, logout global y eliminar cuenta deben usar confirmacion sobria sin confetti.

Estado final esperado:

- Acciones sensibles muestran confirmacion clara y no celebratoria.

### 10.25 Chat interno

Donde:

- `app/(paco)/chat/index.tsx`
- `app/(paco)/chat/[id].tsx`

Motion/recurso:

- `Row` con `PressableScale`.
- `SharedSurface` simulado chat preview -> sala.
- `MutableContainer` para crear sala.
- `FadeSlideIn` para burbujas.
- `TypingIndicator`.
- `LiquidButton` para adjuntos.

Como hacerlo:

1. Lista de chats debe usar `ListGroup`.
2. Preview de chat debe conservar avatar/iniciales en sala.
3. Crear sala debe convertir participantes seleccionados en chips.
4. En sala, mensajes nuevos aparecen con `FadeSlideIn`.
5. Si hay respuesta mock, usar typing indicator antes de mostrarla.
6. Adjuntos deben aparecer como preview con `PopIn`.

Estado final esperado:

- Chat navega con continuidad.
- Crear sala y adjuntar tienen feedback.

### 10.26 Terminos y condiciones

Donde:

- `app/(paco)/legal.tsx`

Motion/recurso:

- `AnimatedBar` para progreso de lectura.
- `MorphButton` para aceptar/firmar.
- `PopIn` para sello/fecha.

Como hacerlo:

1. Agregar progreso de lectura o progreso simulado si el ScrollView no expone posicion facilmente.
2. Boton aceptar debe permanecer al final o sticky segun layout existente.
3. Al aceptar, usar `MorphButton`: "Aceptar" -> "Firmando" -> "Aceptado".
4. Mostrar fecha/hora mock con `PopIn`.
5. No usar confetti ni motion festivo.

Estado final esperado:

- Terminos aceptados quedan fechados y visibles.

### 10.27 Onboarding de tareas

Donde:

- `app/(paco)/onboarding-tasks/index.tsx`
- `app/(paco)/onboarding-tasks/[id].tsx`
- `store/paco-store.ts`

Motion/recurso:

- `AnimatedBar` para avance.
- `SharedSurface` simulado tarea -> detalle.
- `LiquidButton` para descargar/abrir recurso.
- `MorphButton` para completar tarea.
- `Pulse` para video/audio mock.

Como hacerlo:

1. Listado debe mostrar tareas con estado y fecha; cada row entra con `FadeSlideIn`.
2. Al abrir tarea, conservar icono/color en header.
3. Recursos video/PDF/audio/imagen deben tener accion observable.
4. Video/audio mock usa `Pulse` en boton play.
5. Completar tarea usa `MorphButton`, cambia store y actualiza progreso del plan.
6. Si tarea queda "Por calificar", mostrar badge con `PopIn`.

Estado final esperado:

- Tarea completada o por calificar se refleja en listado y dashboard.

### 10.28 Ofertas PiN

Donde:

- `app/(paco)/pin.tsx`

Motion/recurso:

- `Shimmer` para carga mock de ofertas por ubicacion.
- `PressableScale` para cards.
- `SharedSurface` simulado oferta -> detalle/cupon.
- `LiquidButton` para guardar/copiar cupon.
- `Pulse` discreto para permiso/ubicacion activa.

Como hacerlo:

1. Al montar, simular busqueda por ubicacion con skeleton.
2. Cards de oferta deben entrar con stagger.
3. Abrir oferta debe conservar logo/icono/color.
4. Guardar o copiar cupon debe usar `LiquidButton`.
5. Si ubicacion no esta concedida en mock, mostrar `MutableContainer` con CTA para permiso simulado.

Estado final esperado:

- Oferta/cupon queda guardado o copiado visualmente.

## 11. Recursos adicionales permitidos

Estos recursos se pueden usar siempre que respeten Expo SDK 56 y no agreguen integraciones reales:

- **Haptics:** opcional con `expo-haptics`, solo si se aprueba dependencia. Uso: confirmaciones, switches, firma, errores suaves.
- **SVG animado:** permitido con `react-native-svg` ya instalado. Uso: graficas, donut, check, progreso circular.
- **Skeleton shimmer:** usar `Shimmer` existente para cargas locales de listas.
- **Confetti contenido:** usar `ConfettiBurst` existente solo en logros puntuales: curso completado, onboarding completado o exito no financiero.
- **Typing indicator:** crear con tres puntos animados por opacidad/translateY. Uso: soporte, voz RH y chat interno.
- **Shared transition real:** si se implementa con Reanimated, documentar dependencia tecnica y fallback. Si no, usar simulacion `SharedSurface`.
- **Lottie/Rive:** no introducir sin aprobacion. Para este prototipo, preferir primitives propios.
- **Audio/camara/documentos:** simular visualmente, no integrar APIs nativas salvo instruccion explicita.

## 12. Instrucciones de implementacion para agentes

Antes de tocar pantallas:

1. Leer `docs/paco-motion-branding-plan.md`.
2. Revisar `components/paco/motion.tsx`.
3. Revisar `components/paco/ui.tsx` y `components/paco/layout.tsx`.
4. Si se toca Expo/RN API nueva, consultar Expo SDK 56.
5. Crear primitive reusable si el patron se repite en mas de dos pantallas.

Al implementar un modulo:

1. Identificar accion primaria.
2. Cambiar accion primaria a `MorphButton` si tiene proceso/exito/error.
3. Envolver acciones secundarias con `LiquidButton` si cambian de estado.
4. Usar `PressableScale` en toda card/row clickeable.
5. Agregar entrada `FadeSlideIn` a bloques relevantes.
6. Agregar `ShakeView` a validaciones fallidas.
7. Agregar `PopIn` a sellos, badges, checks y estados nuevos.
8. Usar `AnimatedBar` para progreso.
9. Actualizar store local para que el motion tenga consecuencia visible.
10. Registrar en `docs/paco-interactions-plan.md` lo implementado.

Formato de registro obligatorio en `docs/paco-interactions-plan.md`:

```md
### [Modulo] - [Nombre de microinteraccion]
- Disparador:
- Ruta:
- Primitive:
- Propiedades animadas:
- Duracion/fisica:
- Estado local afectado:
- Feedback textual:
- Reduce motion:
- Verificacion manual:
```

## 13. Prioridad de ejecucion

Prioridad 1, impacto alto:

- `app/(paco)/login.tsx`
- `app/(paco)/home.tsx`
- `app/(paco)/advance.tsx`
- `app/(paco)/services.tsx`
- `app/(paco)/topups.tsx`
- `app/(paco)/surveys/[id].tsx`
- `app/(paco)/training/[courseId]/[lessonId].tsx`
- `app/(paco)/receipts.tsx`

Prioridad 2, profundidad de producto:

- `app/(paco)/requests/new.tsx`
- `app/(paco)/voice/index.tsx`
- `app/(paco)/voice/[id].tsx`
- `app/(paco)/document-requests.tsx`
- `app/(paco)/corporate-docs.tsx`
- `app/(paco)/support.tsx`
- `app/(paco)/chat/[id].tsx`

Prioridad 3, pulido transversal:

- `app/(paco)/celebrations.tsx`
- `app/(paco)/recognitions.tsx`
- `app/(paco)/wellness/index.tsx`
- `app/(paco)/pin.tsx`
- `app/(paco)/help.tsx`
- `app/(paco)/settings/*`
- `app/(paco)/legal.tsx`

## 14. Fases de implementacion

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

## 15. Reglas de performance

- Preferir `transform` y `opacity`.
- Evitar animar `top`, `left`, `width`, `height` en listas grandes.
- Limitar stagger a los primeros elementos visibles.
- No usar loops infinitos salvo estados activos reales: audio, grabacion, carga.
- Detener animaciones al desmontar.
- Evitar particulas/confetti salvo logros puntuales.
- Skeleton shimmer solo si la carga dura mas de 250-300 ms.

## 16. Accesibilidad

Debe existir soporte para reducir movimiento:

- Si reduce motion esta activo, sustituir desplazamientos por fades.
- Evitar shakes fuertes; usar borde/mensaje.
- No depender del color o movimiento para comunicar exito/error.
- Mantener feedback textual.
- Los cambios de estado deben ser entendibles sin animacion.

## 17. Sobre Skills y MCP

La propuesta de instalar un skill de animacion para Claude Code es util como metodologia, pero este repo esta trabajando en Cursor. La idea equivalente aqui es convertir este documento y los primitives del repo en reglas semanticas que cualquier agente pueda seguir.

Acciones recomendadas:

- Mantener este documento como referencia principal de motion.
- Si se usa Claude Code fuera de Cursor, crear un `SKILL.md` con una version condensada de estas reglas.
- Si se diseña en Framer, usar Framer MCP solo como apoyo visual, no como fuente tecnica unica.
- No introducir Framer Motion en la app mobile salvo que se cree una app web/Next separada.

## 18. Prompt maestro para agentes

Usar este prompt al pedir implementacion:

> Implementa motion premium en Paco App usando el sistema existente de Expo/React Native. No uses Framer Motion web salvo que el objetivo sea una superficie React/Next separada. Traduce los conceptos de Framer Motion a Reanimated: `whileTap` como press shared values, variants como presets en `theme/motion.ts`, layout transitions como `SharedSurface` o simulacion documentada, y spring physics como `withSpring`. Cada microinteraccion debe declarar disparador, objeto, transformacion, fisica, narrativa, estado final, accesibilidad y performance. Prioriza morphing de botones primarios, botones liquidos, contenedores mutables, transiciones de elemento compartido y microanimaciones narrativas en flujos core. Respeta Expo SDK 56, NativeWind, tokens de marca Paco y reduce motion.

## 19. Criterios de aceptacion especificos de motion

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

## 20. Definicion de terminado

Esta iniciativa se considera completa cuando:

- `docs/paco-interactions-plan.md` refleja las microinteracciones implementadas.
- `docs/paco-ux-decisions.md` registra decisiones de motion branding.
- Los primitives de motion estan centralizados.
- Las pantallas principales usan esos primitives.
- Los flujos financieros, legales, RH, documentos y capacitaciones tienen narrativa visual.
- La app conserva rendimiento fluido en mobile.
- `npm run typecheck` pasa.
- No hay lints nuevos en archivos tocados.
