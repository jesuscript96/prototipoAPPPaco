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
