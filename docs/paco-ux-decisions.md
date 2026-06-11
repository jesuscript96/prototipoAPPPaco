# Paco App UX Decisions

## Principio Rector

La app de referencia se usa como contrato funcional, no como plantilla visual. El prototipo reinterpreta los flujos con una UI corporativa moderna basada en el storybook existente: tarjetas claras, jerarquia por prioridades, estados visibles, formularios guiados, feedback inmediato y menos friccion.

## Decisiones Globales

- Navegacion: se agrupan modulos por dominios (Finanzas, Personas/RH, Documentos, Soporte) para evitar una cuadricula extensa sin contexto.
- Dashboard: se eleva de "lista de botones" a centro de accion con banners, pendientes, accesos y alertas.
- Formularios: se muestran como wizards compactos con progreso y resumen, no como pantallas largas sin guia.
- Estados: cada modulo muestra estado normal, exito y simulacion de estados alternos relevantes.
- Sandbox: fallas observadas en la referencia no se replican; se implementa el comportamiento esperado.
- Copy: se moderniza para ser directo, humano y corporativo, manteniendo terminologia Paco.
- Simulaciones: KYC, camara, audio, archivos, firma, pagos, WhatsApp y push se representan visualmente sin dependencias nativas.

## Flujos Redisenados

### Onboarding Y Login
- Friccion detectada: permisos y login aparecen como pasos tecnicos aislados.
- Decision: convertirlos en onboarding progresivo con permisos, cuenta y ayuda contextual.
- Funcionalidad preservada: notificaciones, ubicacion, activacion, login, recuperar contrasena y ayuda.

### Encuesta Obligatoria
- Friccion detectada: bloqueo puede sentirse como error si no se explica.
- Decision: mostrar banner/pantalla de bloqueo con motivo, progreso y CTA.
- Funcionalidad preservada: no se accede a la app hasta completar encuesta.

### Finanzas
- Friccion detectada: adelanto, recargas y servicios pueden parecer operaciones riesgosas.
- Decision: usar resumen financiero, desglose de comision, terminos y confirmacion visible.
- Funcionalidad preservada: monto, comision, neto, fechas, pasarela, KYC y reflejo en gastos.

### Mood Tracker
- Friccion detectada: muchas etiquetas/factores pueden abrumar.
- Decision: chips priorizados, boton de "mostrar mas" simulado y grafica compacta.
- Funcionalidad preservada: slider, sentimientos, factores, registro e historico.

### Voz Del Colaborador
- Friccion detectada: categorias sensibles requieren confianza.
- Decision: tarjetas con descripcion contextual, anonimato claro y seguimiento conversacional.
- Funcionalidad preservada: categoria, comentario, evidencia, anonimo, estatus y chat RH.

### Solicitudes
- Friccion detectada: cuestionarios dinamicos pueden perder contexto.
- Decision: asistente por pasos con fechas, preguntas, comentarios y resumen.
- Funcionalidad preservada: nueva solicitud, preguntas, pendientes, timeline, editar y eliminar.

### Documentos Y Firma
- Friccion detectada: multiples bibliotecas/documentos se confunden.
- Decision: un patron comun de carpeta, documento, accion y estado de firma/descarga.
- Funcionalidad preservada: comunicados, bienestar, documentos corporativos, recibos, SUA y solicitudes.

### Capacitaciones
- Friccion detectada: offline, lecciones, audio y entregables son complejos.
- Decision: timeline de curso con descarga, progreso, bloqueos, actividades y evidencia.
- Funcionalidad preservada: tabs, offline, descarga, temario, reproductores, grabacion y avance.

### Perfil Y Configuracion
- Friccion detectada: seguridad, cuentas y datos personales mezclan riesgo y mantenimiento.
- Decision: separar expediente, seguridad, cuentas, soporte y legal con feedback por accion.
- Funcionalidad preservada: foto, contrasena, NIP, cuentas, logout, eliminar cuenta y terminos.

### Chat Interno
- Friccion detectada: chat tipo WhatsApp puede parecer externo.
- Decision: estilo mensajeria corporativa con salas, participantes y adjuntos visibles.
- Funcionalidad preservada: crear sala, buscar, enviar mensajes y adjuntos.

## Rediseño Visual 2.0 (junio 2026)

Tras una primera versión funcional considerada "muy básica", se ejecutó un rediseño completo del grupo `(paco)`:

- Capa visual propia en `components/paco/layout.tsx` que sustituye a `components/ui` dentro de Paco (misma API: Screen, Card, Button, Field, Badge, InlineAlert, EmptyState, Section, Progress, Divider, Checkbox). El storybook conserva la capa original.
- Shell oscuro tipo fintech: cabecera "ink" (#15143a) con círculos decorativos, botón de regreso integrado en cada pantalla (headers nativos ocultos) y contenido sobre lienzo claro con esquina superior redondeada de 32 px.
- Tokens nuevos en `tailwind.config.js`: paleta ink/mint/sun, sombras `card/soft/pop`.
- Botones pill (rounded-full, 52 px), tarjetas con sombra suave y borde hairline, alertas con barra de acento lateral, badges con punto de estado.
- Dashboard rediseñado: tarjeta "wallet" con saldo grande y 4 acciones rápidas, lista de pendientes con burbujas de icono tintadas por dominio, banners de color rotativo, grid de módulos con iconos lucide tintados por dominio (Finanzas azul, Personas violeta, Documentos ámbar, Soporte teal) y sello CORE para adelanto.
- Menú lateral → pantalla de perfil hero con grupos temáticos e iconografía consistente.
- StepHeader de asistentes en tarjeta oscura con progreso mint; Segmented y chips en estilo pill con estado activo ink.
- Card de la capa Paco omite su fondo/borde por defecto cuando el llamador define uno propio (NativeWind no resuelve conflictos de utilidades).

## Rediseño Visual 3.0 · Light Glass (vigente)

Iteración final por dirección del cliente: claro, no oscuro; lenguaje de materiales tipo Apple (Liquid Glass) con utilidad Revolut; radios contenidos; cero emojis.

- Lienzo claro `#f2f4fb` con fondo ambiental (`Ambient` en `components/paco/layout.tsx`): tres brillos de color (brand/mint/violeta) con blur en web, que es lo que las superficies glass dejan traslucir.
- Superficies glass: `bg-white/75` + borde hairline `border-white/80` + sombra `shadow-card`. El contraste se garantiza con CTAs y controles activos en tinta `ink #15143a` (botón primario, chips activos, tiles de acciones rápidas), no con color de marca plano.
- Escala de radios reducida: tarjetas 16 px (`rounded-2xl`), botones 14 px, inputs y filas 12 px, chips 10 px, sheets 20 px. Botones de navegación circulares estilo iOS (`GlassNavButton`).
- Tabs segmentadas con indicador animado (`Segmented` en `components/paco/ui.tsx`): píldora blanca que se desliza con spring entre opciones.
- Prohibición total de emojis: registro central de iconografía en `components/paco/icons.tsx` (módulos, banners, operadores de recarga, categorías de servicios, voz, bienestar, medallas, cursos, KYC, cupones PiN, niveles de ánimo con caras lucide, tipos de archivo). Los mocks ya no llevan campos `emoji`/`cover`.
- Acentos por dominio se mantienen (Finanzas azul, Personas violeta, Documentos ámbar, Soporte teal) en burbujas `IconBubble` de 12 px de radio.
- Dashboard: tarjeta wallet glass con saldo grande y 4 tiles ink; banners en tres tintes (ink, brand, glass); pendientes como lista glass con separadores hairline.
