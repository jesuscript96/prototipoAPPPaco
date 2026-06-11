# Paco Mock Data Map

## Entidades Principales

### `EmployeeProfile`
- Campos: nombre, correo, telefono, genero, nacimiento, numero colaborador, RFC, CURP, NSS, fecha contratacion, antiguedad, empleador, periodicidad, departamento, area, puesto, salario, foto.
- Relaciones: adelanto, expediente, configuracion, recibos, solicitudes.
- Acciones: editar correo, editar telefono, cargar contrato/CV mock.

### `CompanyConfig`
- Campos: modulos habilitados, comision adelanto, comision servicios, antiguedad minima, links soporte, politicas.
- Relaciones: dashboard, finanzas, legal, soporte.
- Acciones: ninguna en prototipo; alimenta reglas.

### `Banner`
- Campos: titulo, subtitulo, tipo, destino.
- Relaciones: dashboard, comunicacion interna.
- Acciones: navegar a modulo.

### `PacoModule`
- Campos: id, titulo, descripcion, dominio, prioridad, icono, ruta, pendientes.
- Relaciones: dashboard, menu, cobertura.
- Acciones: navegacion.

### `Notification`
- Campos: id, tipo, titulo, cuerpo, fecha, leida, destino.
- Relaciones: onboarding de tareas, encuestas, capacitaciones, cumpleanos, reconocimientos, voz.
- Acciones: marcar leida, borrar todas, navegar.

### `OnboardingTask`
- Campos: tipo, titulo, fecha programada, vencimiento, mentor, estatus, materiales.
- Relaciones: notificaciones push, mentor, capacitaciones, encuestas/examenes.
- Acciones: leer, responder, descargar material, completar tarea.

### `MoodEntry`
- Campos: fecha, score, etiqueta, sentimientos, factores.
- Relaciones: mood tracker, perfil.
- Acciones: registrar mood, consultar historico.

### `Celebration`
- Campos: colaborador, fecha, tipo, anos, area, foto.
- Relaciones: cumpleanos/aniversarios, notificaciones.
- Acciones: felicitar mock.

### `PayrollAdvance`
- Campos: minimo, maximo, monto, comision, neto, fecha solicitud, fecha cobro, cuenta, estatus.
- Relaciones: gastos, cuenta bancaria, legal, KYC, tercero pasarela.
- Acciones: validar INE/selfie primer uso, seleccionar monto, aceptar terminos, confirmar, crear gasto.

### `DiscountCoupon`
- Campos: marca, oferta, distancia, categoria, vencimiento.
- Relaciones: ubicacion, Club PiN, dashboard.
- Acciones: abrir cupon externo mock.

### `Expense`
- Campos: tipo, monto, comision, periodo, fecha, estatus.
- Relaciones: adelanto, recarga, servicios.
- Acciones: filtrar, consultar detalle, soporte WhatsApp mock.

### `TopupOperator`
- Campos: nombre, tipos, montos, logo textual.
- Relaciones: recargas, gastos.
- Acciones: seleccionar operador/tipo/monto, confirmar telefono, validar codigo.

### `ServiceProvider`
- Campos: categoria, proveedor, referencia, comision, monto sugerido.
- Relaciones: servicios, KYC, gastos.
- Acciones: escaneo mock, pagar, completar KYC.

### `Survey`
- Campos: titulo, obligatoria, preguntas, fecha limite, estatus, progreso.
- Relaciones: bloqueo, notificaciones.
- Acciones: responder, enviar, desbloquear app.

### `FeedbackReport`
- Campos: categoria, descripcion, comentario, anonimo, adjuntos, estatus, mensajes.
- Relaciones: voz, estatus, chat RH, notificaciones.
- Acciones: crear reporte, filtrar estatus, enviar mensaje.

### `Recognition`
- Campos: medalla, descripcion, emisor, receptor, motivo, fecha, direccion.
- Relaciones: reconocimientos, notificaciones, capacitacion.
- Acciones: enviar, consultar recibidos/enviados.

### `EmployeeRequest`
- Campos: tipo, categoria, fechas, preguntas, respuestas, comentarios, estatus, timeline.
- Relaciones: solicitudes, RH.
- Acciones: crear, editar, eliminar, consultar timeline.

### `ContentResource`
- Campos: titulo, tipo, categoria, tamano, descargable, estado.
- Relaciones: comunicacion, bienestar, documentos, capacitaciones.
- Acciones: abrir, descargar.

### `DocumentItem`
- Campos: carpeta, nombre, tipo, requiereFirma, firmado, generado, tamano.
- Relaciones: documentos corporativos, solicitud documentos, recibos, SUA.
- Acciones: generar, firmar, descargar, subir.

### `TrainingCourse`
- Campos: titulo, modalidad, obligatorio, progreso, descargado, lecciones.
- Relaciones: capacitacion, notificaciones, reconocimientos.
- Acciones: descargar, comenzar, enviar actividad, responder evaluacion/satisfaccion, completar leccion.

### `EmployeeDigitalCard`
- Campos: titular, numero colaborador, puesto, area, empleador, vigencia, QR mock.
- Relaciones: expediente, identidad corporativa.
- Acciones: mostrar credencial digital.

### `BankAccount`
- Campos: alias, banco, tipo, clabe/tarjeta, estatus.
- Relaciones: adelanto, configuracion.
- Acciones: agregar, eliminar.

### `SupportTicket`
- Campos: nombre, correo, telefono, consulta, estatus, mensajes.
- Relaciones: soporte, FAQ, WhatsApp, Zoho, bot.
- Acciones: abrir bot, enviar ticket, recibir respuesta mock.

### `ChatRoom`
- Campos: nombre, participantes, mensajes, adjuntos.
- Relaciones: chat interno, directorio.
- Acciones: crear sala, enviar mensaje, adjuntar archivo mock.

### `LegalAcceptance`
- Campos: documento, version, aceptado, firmante, fecha, rol.
- Relaciones: terminos, adelanto.
- Acciones: aceptar y firmar.

## Acciones Con Cambio De Estado

- `completeMandatorySurvey`: encuesta obligatoria pasa a completada y dashboard queda desbloqueado.
- `markAllNotificationsRead`: notificaciones quedan leidas.
- `submitPayrollAdvance`: crea adeudo/gasto mock.
- `submitMood`: agrega registro del dia.
- `submitFeedbackReport`: crea reporte pendiente/en proceso.
- `sendRecognition`: agrega reconocimiento enviado.
- `submitRequest`: agrega solicitud pendiente con timeline.
- `downloadCourse`: curso offline pasa a descargado.
- `completeLesson`: incrementa progreso de curso.
- `signDocument`: documento/recibo/carta pasa a firmado.
- `createSupportTicket`: ticket queda abierto con mensaje inicial.
- `createChatRoom`: nueva sala visible.
- `sendChatMessage`: mensaje aparece en conversacion.
- `addBankAccount`: nueva cuenta aparece en configuracion.
- `acceptLegal`: terminos quedan firmados con fecha.
