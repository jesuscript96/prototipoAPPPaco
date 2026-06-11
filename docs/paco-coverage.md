# Paco App · Matriz de cobertura

Trazabilidad entre `funcionalidadvideo.md` + videos de referencia (verificados con ffprobe/ffmpeg, contact sheets en `docs/video-frames/`) y el prototipo implementado en `app/(paco)/`. Mock data en `mock/paco/`, estado global en `store/paco-store.ts`, API simulada en `lib/paco-api.ts`, sistema visual propio en `components/paco/`.

| Funcionalidad | Ruta | Mock data | Acciones vivas | Estados | Conexiones | Verificación |
| --- | --- | --- | --- | --- | --- | --- |
| Permisos (notificaciones/ubicación) | `/(paco)/welcome` | — | Diálogos secuenciales estilo OS, permitir/denegar | pendiente, concedido, denegado | PiN bloqueado sin ubicación | Smoke test web: diálogos y estados ✓ |
| Login | `/(paco)/login` | `employee` | Inicia sesión (mockLogin), ojo contraseña | error credenciales (barra roja), cargando, éxito | → home o bloqueo encuesta | Probado con pwd "error" y válida ✓ |
| Activación con celular | `/(paco)/activate` | — | Validación 10 dígitos, enviar solicitud | error, enviando, enviada | → login | Validación y éxito ✓ |
| Recuperar contraseña | `/(paco)/recover` | — | Validación email, enviar liga | error, enviada | → login | ✓ |
| Ayuda externa (4 círculos) | `/(paco)/help` + HelpFab | `faqTopics`, `company` | Acordeones FAQ, abrir portal/WhatsApp (toast), ticket | abierto/cerrado | → support | ✓ |
| Dashboard | `/(paco)/home` | `banners`, `moduleRegistry`, derivados del store | 4 acciones rápidas, pendientes accionables, banners, grid 24 módulos | bloqueado por encuesta / desbloqueado; pendiente/listo por ítem | mood, onboarding, curso, encuesta, adeudos, celebraciones | Smoke test completo ✓ |
| Bloqueo encuesta obligatoria | `/(paco)/home` + `surveys/[id]` | `surveys[nom035]` | Responder 5 preguntas (sí/no, única, múltiple, escala, abierta) | bloqueado, en progreso, enviado, desbloqueado | notificación n1 se marca leída | Recorrido completo en preview ✓ |
| Encuestas normales | `/(paco)/surveys` | `surveys[clima-junio]` | Runner por pregunta, enviar | pendiente, completada, vacío | dashboard pendientes | ✓ |
| Notificaciones | `/(paco)/notifications` | `seedNotifications` (7 tipos) | abrir destino, marcar leída/todas, borrar una/todas | leída/no leída, vacío | deep-links a 7 módulos; finanzas/curso generan push nuevas | ✓ |
| Cumpleaños y aniversarios | `/(paco)/celebrations` | `celebrations` (6) | tabs Todos/Cumpleaños/Aniversarios, filtro por día, felicitar | sin celebraciones (filtros), felicitación enviada | banner home "hoy" | ✓ |
| Estado de ánimo | `/(paco)/mood` | `moodLevels`, sentimientos base+extra, 18 factores, `seedMoodEntries` | slider con avatar/color, multi-select, "Mostrar más", guardar | sin entrada hoy, registrando (3 pasos), guardado, histórico | gráficas, dashboard | ✓ |
| Gráficas mood | `/(paco)/mood-charts` | entradas del store | tabs S/M/6M/A | vacío por periodo, con datos | promedio, conteo sentimientos/factores | ✓ |
| Onboarding de tareas | `/(paco)/onboarding-tasks` + `[id]` | `onboardingTasks` (mensaje/examen/material) | leer/confirmar, examen → mentor, descargar materiales | pendiente, vence pronto, por calificar, completada | push mock, progreso en dashboard | ✓ |
| Adelanto de nómina | `/(paco)/advance` | `company` (mín/máx/comisión), `seedAccounts` | elegibilidad (+caso no elegible demo), KYC 1er uso, slider $200–$2,500, cuenta destino, desglose, legales, confirmar | no elegible, KYC pendiente/validado, revisión, confirmado | movimiento en gastos + push; cuentas de settings | ✓ |
| KYC compartido | `components/paco/kyc.tsx` | `kycSteps` | captura INE frente/reverso/selfie, verificación por fases | capturando, verificando, validado | adelanto y servicios | ✓ |
| Recargas | `/(paco)/topups` | 13 operadores con montos reales | operador → tipo → monto → teléfono+confirmación → código → pagar | teléfono inválido, validando, éxito | movimiento en gastos | ✓ |
| Pago de servicios | `/(paco)/services` | 6 categorías, 14 proveedores con referencias | categoría → proveedor → monto/referencia → escaneo cámara mock → método → desglose+comisión → KYC → código → éxito | referencia inválida, escaneando, KYC, pagado | movimiento en gastos; omite KYC si ya validado | ✓ |
| Reporte de gastos | `/(paco)/expenses` | `seedMovements` + generados | tabs Adeudos/Mis gastos/Soporte, filtros periodo+tipo, gráfica por categoría, detalle expandible, WhatsApp con conversación | $0 adeudos, sin resultados de filtro, soporte activo | recibe movimientos de adelanto/recarga/servicio | ✓ |
| Club PiN | `/(paco)/pin` | `pinCoupons`, categorías | filtros, obtener cupón (código), abrir PiN | ubicación no concedida (CTA), cupón generado | permiso de welcome | ✓ |
| Comunicación interna | `/(paco)/comms` + `[id]` | `communications` con adjuntos DOCX/PDF/PPTX/IMG/XLSX | filtro recientes/antiguos, abrir, descargar adjuntos | leído/no leído, vacío | marca leído al abrir | ✓ |
| Voz del colaborador | `/(paco)/voice` | 9 categorías con descripción | categoría → título+comentario → adjuntar/quitar foto → anónimo → enviar con folio | validaciones, enviado | aparece en estatus | ✓ |
| Estatus de voz + chat RH | `/(paco)/voice/status` + `[id]` | `seedVoiceReports` | filtros recientes/antiguos/no leídos, búsqueda, chat con respuesta automática RH, adjuntar | semáforo amarillo/naranja/turquesa, esperando respuesta | notificación n5 | ✓ |
| Reconocimientos | `/(paco)/recognitions` | 7 medallas con valores, `directory` | carrusel medallas, buscador de colaborador, motivo, enviar; tabs Recibidos/Enviados | validaciones, enviado, vacío por tab | medalla de sistema al finalizar curso | ✓ |
| Solicitudes | `/(paco)/requests` + `new` + `[id]` | 5 tipos con cuestionarios dinámicos | catálogo → info → fechas → preguntas (abierta/sí-no/única) → comentarios → resumen → enviar; timeline etapas; editar (fechas/comentarios) y eliminar con confirmación | no iniciada, en evaluación, aprobada, rechazada | — | ✓ |
| Bienestar en línea | `/(paco)/wellness` + `[id]` | 4 categorías, recursos multimedia | abrir carpeta, buscar, ordenar, descargar | carpeta vacía ("Por el momento…"), sin coincidencias | — | ✓ |
| Solicitud de documentos | `/(paco)/document-requests` | 3 carpetas, 4 formatos | confirmar generación, vista previa PDF autocompletada, firmar, guardar+subida automática | disponible, generando, generado, firmado y subido | datos del expediente | ✓ |
| Capacitaciones | `/(paco)/training` + curso + lección | 3 cursos (offline obligatorio, en curso, finalizado) | tabs, búsqueda, descarga offline con 6 fases, temario con candados, video/audio players, grabación .wav con permiso, entregable, enviar actividad, lección finalizada, evaluación, satisfacción, finalizar | pendiente/en curso/finalizado, descargando, bloqueada, actividad enviada, sincronización pendiente→sincronizado | medalla sistema + push al finalizar | ✓ |
| Mi expediente | `/(paco)/profile` | `employee` completo (RFC/CURP/NSS…) | editar correo/teléfono con guardar/cancelar, contrato PDF en visor, subir CV/contrato, foto | editando, guardado | tarjeta digital con QR mock | ✓ |
| Documentos corporativos | `/(paco)/corporate-docs` | 4 carpetas (1 vacía) | abrir/cerrar carpetas, búsqueda global, descargar | vacío, sin resultados, descargado | — | ✓ |
| Recibos de nómina | `/(paco)/receipts` | 4 recibos | visor PDF, descargar PDF/XML, firmar individual con fases FirmaMX, firmar todos, certificado | pendiente/firmado, firmando | — | ✓ |
| Cartas SUA | `/(paco)/sua` | 2 cartas | abrir visor, descargar, firmar | pendiente/firmada, vacío | — | ✓ |
| Soporte técnico | `/(paco)/support` | `botReplies`, `company` | formulario nombre/correo/teléfono/consulta → ticket #PA-2086 → bot conversacional → escalar a agente | sin conversación, bot, escalado | FAQ y WhatsApp | ✓ |
| Chat interno | `/(paco)/chat` + `[id]` | `seedChatRooms`, `directory` | búsqueda, crear sala (participantes+nombre), 1-1 y grupal, enviar mensajes, adjuntar imagen/documento/video | sin chats, sala creada, mensaje enviado | — | ✓ |
| Configuración | `/(paco)/settings` + password/nip/accounts | `banks`, `seedAccounts` | foto, cambiar contraseña (validaciones+ojo), recuperar NIP (correo), cambiar NIP (3 pasos con dots), cuentas/tarjetas (alta con tabs y validación 16/18 dígitos, eliminar con confirmación), logout local/global, eliminar cuenta | éxito por acción, errores de validación, baja solicitada | cuentas alimentan adelanto | ✓ |
| Términos y privacidad | `/(paco)/legal` | `legalDocument` (5 secciones TBM) | leer, aceptar checkbox, firmar (caja de firma) | pendiente/firmado con fecha-hora y carácter Mandante | linked desde adelanto | ✓ |

## Gates globales

- `npm run typecheck` ✓ (estricto, exactOptionalPropertyTypes, noUncheckedIndexedAccess)
- Rutas tipadas regeneradas (`.expo/types/router.d.ts`)
- Sin errores de consola en smoke test web (viewport móvil 375×812)
- Sin botones sin `onPress`: toda acción dispara navegación, cambio de estado o toast
- UI no copia pixel-perfect: rediseño corporativo propio (ver `paco-ux-decisions.md`)
