# Paco Prototype Acceptance Checklist

Usar este checklist para determinar si el prototipo está realmente completo.

## Gates Globales

- [ ] `AGENTS.md` leído.
- [ ] `funcionalidadvideo.md` leído.
- [ ] Video `13.45.15.mp4` consultado.
- [ ] Video `13.48.21.mp4` consultado.
- [ ] Expo SDK 56 docs consultadas si se tocó Expo/RN API.
- [ ] Storybook/componentes existentes revisados.
- [ ] App no copia pixel-perfect el video; mejora UX moderna.
- [ ] `npm run typecheck` pasa.
- [ ] No hay lints nuevos.
- [ ] No hay botones principales sin acción.

## Definición De Profundidad

Para cada módulo:

- [ ] Tiene ruta o pantalla navegable.
- [ ] Tiene datos mock realistas.
- [ ] Tiene flujo principal recorrible.
- [ ] Tiene estado local que cambia.
- [ ] Tiene feedback visible.
- [ ] Tiene estados alternos relevantes.
- [ ] Tiene validaciones o restricciones si aplican.
- [ ] Tiene integración mock visible si aplica.
- [ ] Tiene relación con otros módulos si la referencia lo indica.

## Checklist Por Módulo

### Inicio / Dashboard

- [ ] Saludo personalizado.
- [ ] Banners de panel.
- [ ] Pendientes críticos.
- [ ] Notificaciones pendientes.
- [ ] Acceso rápido a mood.
- [ ] Onboarding de tareas visible.
- [ ] Resumen financiero.
- [ ] Curso/offline destacado.
- [ ] PiN destacado.
- [ ] Navegación clara por dominios.

### Acceso

- [ ] Permisos de notificaciones.
- [ ] Permisos de ubicación.
- [ ] Login.
- [ ] Error de credenciales.
- [ ] Mostrar/ocultar contraseña.
- [ ] Activación con celular.
- [ ] Recuperar contraseña.
- [ ] Ayuda externa.

### Cumpleaños Y Aniversarios

- [ ] Tabs.
- [ ] Fechas actuales/futuras.
- [ ] Medallas de antigüedad.
- [ ] Felicitación con feedback.

### Estado De Ánimo

- [ ] Escala visual.
- [ ] Avatar/estado.
- [ ] Sentimientos multi-select.
- [ ] Factores multi-select.
- [ ] Guardado.
- [ ] Histórico.
- [ ] Gráficas S/M/6M/A.

### Notificaciones / Mensajes

- [ ] Tipos diversos.
- [ ] Leída/no leída.
- [ ] Marcar leída.
- [ ] Borrar.
- [ ] Adjuntos multimedia.
- [ ] Navegación o acción asociada.

### Onboarding De Tareas

- [ ] Mensajes para leer.
- [ ] Encuestas/exámenes.
- [ ] Material didáctico.
- [ ] Video/PDF/imagen/audio.
- [ ] Fechas programadas.
- [ ] Vencimiento.
- [ ] Mentor calificador.
- [ ] Push mock.
- [ ] Completar tarea.

### Adelanto De Nómina

- [ ] Validación de antigüedad.
- [ ] Capacidad de pago.
- [ ] Slider/simulador de monto.
- [ ] Cuenta destino.
- [ ] Comisión.
- [ ] Neto.
- [ ] Fecha solicitud/cobro.
- [ ] Términos.
- [ ] KYC primer uso.
- [ ] INE frente/reverso/selfie.
- [ ] Tercero/pasarela mock.
- [ ] Confirmación.
- [ ] Reflejo en gastos.

### Recargas

- [ ] Operadores.
- [ ] Tiempo aire/datos.
- [ ] Montos.
- [ ] Teléfono.
- [ ] Confirmación.
- [ ] Código.
- [ ] Pago mock.
- [ ] Éxito.

### Pago De Servicios

- [ ] Categorías.
- [ ] Proveedores.
- [ ] Referencia.
- [ ] Escaneo mock.
- [ ] Monto.
- [ ] Método de pago.
- [ ] Desglose.
- [ ] KYC.
- [ ] Pago exitoso.

### Reporte De Gastos

- [ ] Adeudos.
- [ ] Historial.
- [ ] Filtros.
- [ ] Gráfica/resumen visual.
- [ ] Soporte WhatsApp.

### Club PiN

- [ ] Promociones.
- [ ] Ubicación.
- [ ] Cupones.
- [ ] Redirección mock.

### Voz Del Colaborador

- [ ] Categorías.
- [ ] Descripción por categoría.
- [ ] Comentario.
- [ ] Evidencia.
- [ ] Anonimato.
- [ ] Envío.
- [ ] Folio.
- [ ] Estatus.
- [ ] Chat RH.

### Reconocimientos

- [ ] Medallas.
- [ ] Valores/descripciones.
- [ ] Destinatario.
- [ ] Motivo.
- [ ] Enviar.
- [ ] Recibidos/enviados.

### Encuestas

- [ ] NOM-035.
- [ ] Bloqueo obligatorio.
- [ ] Tipos de pregunta.
- [ ] Progreso.
- [ ] Envío.
- [ ] Desbloqueo.

### Soporte

- [ ] FAQ.
- [ ] WhatsApp.
- [ ] Zoho.
- [ ] Bot.
- [ ] Ticket.
- [ ] Conversación.
- [ ] Escalamiento.

### Chat En Vivo

- [ ] 1-1.
- [ ] Grupal.
- [ ] Crear sala.
- [ ] Participantes.
- [ ] Mensajes.
- [ ] Documentos.
- [ ] Fotos.
- [ ] Videos.
- [ ] Búsqueda.

### Solicitudes

- [ ] Permisos.
- [ ] Vacaciones.
- [ ] Incapacidades.
- [ ] Fechas.
- [ ] Cuestionario.
- [ ] Comentarios.
- [ ] Timeline.
- [ ] Historial.
- [ ] Editar.
- [ ] Eliminar.

### Expediente

- [ ] Datos personales/laborales.
- [ ] Editar correo.
- [ ] Editar teléfono.
- [ ] Contrato.
- [ ] Subir CV/contrato mock.
- [ ] Tarjeta digital colaborador.

### Recibos / SUA

- [ ] Recibos.
- [ ] PDF.
- [ ] XML.
- [ ] Firma.
- [ ] Firma masiva.
- [ ] Certificado.
- [ ] Cartas SUA.

### Documentos

- [ ] Solicitud de documentos.
- [ ] Carga.
- [ ] Generación PDF.
- [ ] Firma.
- [ ] Documentos corporativos.
- [ ] Descarga.

### Capacitación

- [ ] Pendientes/en curso/finalizados.
- [ ] Online/offline.
- [ ] Descarga.
- [ ] Progreso.
- [ ] Temario.
- [ ] Lecciones bloqueadas.
- [ ] Video/audio/documentos.
- [ ] Grabación.
- [ ] Entregables.
- [ ] Evaluación.
- [ ] Satisfacción.
- [ ] Sincronización mock.

### Bienestar

- [ ] Mental.
- [ ] Físico.
- [ ] Financiero.
- [ ] Emocional.
- [ ] Recursos.
- [ ] Estado vacío.

### Configuración

- [ ] Foto.
- [ ] Contraseña.
- [ ] Recuperar NIP.
- [ ] Cambiar NIP.
- [ ] Cuentas.
- [ ] Tarjetas.
- [ ] Logout local/global.
- [ ] Eliminar cuenta.

### Legal

- [ ] Términos.
- [ ] Privacidad.
- [ ] Versión.
- [ ] Aceptación.
- [ ] Firma.
- [ ] Fecha/f firmante.
