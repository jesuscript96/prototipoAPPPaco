# Paco App Module Briefs

> Actualización jun 2026: la implementación final usa rutas dedicadas por módulo en `app/(paco)/` (no la ruta dinámica `module/[id]` del primer borrador). La matriz con rutas, datos, acciones, estados y verificación por funcionalidad está en `docs/paco-coverage.md`; las decisiones de diseño (sistema Light Glass 3.0) en `docs/paco-ux-decisions.md`. Los briefs siguientes conservan el alcance funcional original por dominio.

## Acceso, Sesion Y Bloqueos

- Objetivo del usuario: entrar a Paco con una cuenta corporativa, activar cuenta si aun no existe y conceder permisos relevantes.
- Objetivo del negocio: asegurar que solo colaboradores registrados accedan y que las notificaciones/ubicacion habiliten valor posterior.
- Entradas: primer inicio, login recurrente, ayuda externa.
- Subflujos: permisos, login, activacion por celular, recuperar contrasena, error de credenciales, encuesta obligatoria.
- Pantallas: `/(paco)/onboarding`, `/(paco)/module/surveys`, `/(paco)/dashboard`.
- Estados: permisos pendientes/concedidos, credenciales invalidas, sesion iniciada, encuesta bloqueante pendiente, desbloqueado.
- Validaciones: contrasena visible/oculta, telefono requerido en activacion, encuesta obligatoria antes de dashboard.
- Dependencias: notificaciones, encuestas, soporte externo.
- Criterio de profundidad: el usuario debe poder iniciar, ver bloqueo por encuesta, responderla y entrar al dashboard.
- Smoke test: conceder permisos mock, enviar activacion, simular error, iniciar sesion, completar encuesta.

## Dashboard Y Navegacion

- Objetivo del usuario: entender pendientes y acceder rapido a beneficios, RH, documentos, soporte y configuracion.
- Objetivo del negocio: dar visibilidad a modulos parametrizados por empresa y empujar acciones pendientes.
- Entradas: login exitoso, encuesta completada, notificaciones.
- Subflujos: banners, grid de modulos, accesos rapidos, campana, menu lateral simulado.
- Pantallas: `/(paco)/dashboard`, rutas `/(paco)/module/[id]`.
- Estados: normal, modulo opcional, pendiente critico, notificacion no leida.
- Dependencias: todos los modulos.
- Criterio de profundidad: todo modulo de referencia debe estar accesible desde dashboard o menu.
- Smoke test: abrir dashboard y navegar a cada dominio.

## Finanzas

- Objetivo del usuario: solicitar adelanto, pagar recargas/servicios y entender adeudos/gastos.
- Objetivo del negocio: mostrar el core financiero de Paco con transparencia de comisiones y cobro.
- Entradas: dashboard, reporte de gastos, soporte WhatsApp.
- Subflujos: adelanto, gastos, recargas, pago de servicios, KYC, pasarela, soporte.
- Pantallas: `/(paco)/module/payroll-advance`, `expenses`, `topups`, `services`.
- Estados: elegible/no elegible, monto seleccionado, legal aceptado, confirmacion, procesado, adeudo visible, KYC completado.
- Validaciones: antiguedad minima, monto minimo/maximo, terminos obligatorios, referencia y telefono requeridos.
- Dependencias: perfil laboral, cuentas bancarias, configuracion de comisiones, reporte de gastos.
- Criterio de profundidad: una solicitud financiera debe mostrar desglose y producir feedback o registro relacionado.
- Smoke test: confirmar adelanto, ver gasto, simular recarga, completar KYC de servicio.

## Personas, Cultura Y RH

- Objetivo del usuario: participar en cultura organizacional, registrar bienestar y gestionar solicitudes.
- Objetivo del negocio: alimentar clima, engagement, reconocimientos y flujos administrativos.
- Entradas: dashboard, menu, notificaciones.
- Subflujos: onboarding de tareas, mood tracker, cumpleanos/aniversarios, reconocimientos, solicitudes.
- Pantallas: `employee-onboarding`, `mood`, `celebrations`, `recognitions`, `requests`.
- Estados: tarea programada/completada, mentor pendiente, mood pendiente/registrado, tabs, medalla seleccionada, solicitud pendiente/finalizada, timeline.
- Validaciones: seleccion de sentimiento/factor, destinatario de reconocimiento, fechas y preguntas requeridas.
- Dependencias: notificaciones, perfil, capacitacion, RH.
- Criterio de profundidad: cada modulo debe tener creacion/envio y consulta/historial.
- Smoke test: completar tarea de onboarding, registrar mood, felicitar, enviar reconocimiento, crear solicitud y ver timeline.

## Encuestas Y Voz Del Colaborador

- Objetivo del usuario: responder encuestas y reportar temas sensibles con seguimiento.
- Objetivo del negocio: cumplir normativas, obtener feedback y gestionar incidencias desde RH.
- Entradas: bloqueo, dashboard, notificaciones, menu.
- Subflujos: encuesta obligatoria, encuesta normal, voz anonima/no anonima, estatus, chat RH.
- Pantallas: `surveys`, `voice`, `voice-status`.
- Estados: bloqueada, progreso, enviada, pendiente, en proceso, atendida, mensaje nuevo.
- Validaciones: preguntas requeridas, categoria de reporte, comentario y anonimato.
- Dependencias: dashboard, notificaciones, chat.
- Criterio de profundidad: encuesta obligatoria debe afectar navegacion; voz debe tener estatus y conversacion.
- Smoke test: completar encuesta, enviar voz, responder chat.

## Contenido, Documentos Y Firma

- Objetivo del usuario: consultar comunicados, recursos, documentos, recibos y firmar lo requerido.
- Objetivo del negocio: distribuir informacion corporativa y conservar evidencia documental.
- Entradas: dashboard, menu perfil, notificaciones.
- Subflujos: comunicacion interna, bienestar, solicitud de documentos, documentos corporativos, recibos, cartas SUA.
- Pantallas: `comms`, `wellness`, `document-requests`, `corporate-docs`, `payroll-docs`.
- Estados: con documentos, carpeta vacia, descarga, generado, firmado, subido.
- Validaciones: confirmacion de generacion/firma, tipo de archivo visible.
- Dependencias: perfil, terminos, firma mock.
- Criterio de profundidad: cada documento debe tener tipo, estado y accion principal visible.
- Smoke test: abrir comunicado, descargar adjunto, firmar documento/recibo/carta.

## Capacitaciones

- Objetivo del usuario: completar cursos asignados aun si se descarga material offline.
- Objetivo del negocio: medir avance y evidencias de formacion.
- Entradas: dashboard, notificaciones, menu.
- Subflujos: pendientes/en curso/finalizadas, descarga offline, temario, lecciones, reproductores, grabacion, entregables.
- Pantallas: `training`.
- Estados: pendiente, descargando, descargado, en curso, leccion bloqueada, actividad enviada, finalizado.
- Validaciones: completar leccion anterior, subir/mandar actividad, marcar finalizada.
- Dependencias: notificaciones, offline, reconocimientos.
- Criterio de profundidad: debe existir progreso visual y una accion que cambie el estado del curso.
- Smoke test: descargar, comenzar, grabar mock, enviar actividad y finalizar leccion.

## Perfil, Configuracion Y Soporte

- Objetivo del usuario: consultar expediente, administrar seguridad/cuentas y pedir ayuda.
- Objetivo del negocio: mantener datos actualizados, soporte operativo y cumplimiento de tiendas.
- Entradas: menu, dashboard, reporte de gastos.
- Subflujos: expediente, tarjeta digital de colaborador, foto, contrasena, recuperar/cambiar NIP, cuentas/tarjetas, logout, eliminar cuenta, FAQ, WhatsApp, Zoho/bot, ticket tecnico, terminos.
- Pantallas: `profile`, `settings`, `support`, `legal`.
- Estados: lectura, editado, codigo enviado, cuenta agregada/eliminada, ticket creado, firmado.
- Validaciones: campos de contacto, NIP de 4 digitos, CLABE/tarjeta mock, confirmacion de baja.
- Dependencias: finanzas, soporte, legal.
- Criterio de profundidad: cada formulario debe dar feedback y mostrar estado resultante.
- Smoke test: editar contacto, agregar cuenta, crear ticket, firmar terminos.

## Chat Interno

- Objetivo del usuario: comunicarse con colaboradores y grupos internos.
- Objetivo del negocio: habilitar mensajeria corporativa segura dentro de Paco.
- Entradas: menu, dashboard.
- Subflujos: lista, busqueda, conversaciones 1-1, conversaciones grupales, crear sala, seleccionar participantes, enviar mensaje, adjuntos de documento/foto/video.
- Pantallas: `internal-chat`.
- Estados: conversaciones activas, nueva sala, mensaje enviado, adjunto mock.
- Validaciones: nombre de sala y participantes.
- Dependencias: directorio de colaboradores.
- Criterio de profundidad: crear sala y enviar mensaje deben actualizar UI local.
- Smoke test: crear sala y mandar mensaje.
