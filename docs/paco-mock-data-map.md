# Paco Mock Data Map

Mapa de entidades mock del prototipo. Todo vive en `mock/paco/` (re-exportado por `mock/paco/index.ts`), el estado mutable en `store/paco-store.ts` y la latencia simulada en `lib/paco-api.ts`.

## mock/paco/core.ts
- `employee`: expediente completo de Ricardo Jafif Pereyra (RFC, CURP, NSS, antigüedad, salario quincenal, área/puesto).
- `company`: parámetros de empresa (antigüedad mínima 3 meses, comisión adelanto 8%, comisión servicios $12, máximos, proveedores externos: Veridoc KYC, FirmaMX, PiN, Zoho, WhatsApp).
- `banners`: 3 banners de panel con destino (`Href`). Iconos en `bannerIcons`.
- `directory`: 8 colaboradores para buscador de reconocimientos y chat.
- `celebrations`: 6 eventos (cumpleaños/aniversarios) con offset de día y años de antigüedad.
- `moduleRegistry`: 24 módulos con dominio y ruta; alimenta grid del dashboard.
- `seedNotifications`: 7 notificaciones de 7 tipos con deep-link.

## mock/paco/finance.ts
- `seedAccounts` + `banks`: cuentas CLABE/tarjeta y catálogo de bancos.
- `seedMovements` + `expensePeriods`: movimientos sembrados del estado de cuenta.
- `topupOperators`: 13 operadores con montos reales por operador.
- `serviceCategories`: 6 categorías y 14 proveedores con etiqueta/ejemplo de referencia.
- `kycSteps`: pasos INE frente/reverso/selfie (iconos en `kycIcons`).
- `pinCoupons` + `pinCategories`: 5 cupones geolocalizados.

## mock/paco/people.ts
- `moodLevels` (5 niveles con color; caras lucide vía `moodIconFor`), `baseFeelings` + `extraFeelings`, `moodFactors` (18), `seedMoodEntries` (8 entradas con semanas para filtros S/M/6M/A).
- `surveys`: NOM-035 obligatoria (5 preguntas de 5 tipos) y clima laboral opcional.
- `voiceCategories` (9 con descripción) y `seedVoiceReports` (3 reportes con chat y semáforo).
- `recognitionBadges` (7 valores) y `seedRecognitions` (recibidos/enviados, origen sistema/colaborador).
- `requestTypes` (5 tipos con cuestionario dinámico y días de aprobación) y `seedRequests` (aprobada/rechazada con etapas).
- `onboardingTasks`: mensaje, examen con mentor y material descargable.

## mock/paco/content.ts
- `communications`: 3 comunicados con adjuntos DOCX/PDF/PPTX/IMG/XLSX.
- `wellnessCategories`: 4 carpetas (emocional vacía a propósito).
- `documentFolders` + `documentTemplates`: 4 formatos generables/firmables.
- `corporateFolders`: 4 carpetas (una vacía a propósito).
- `seedReceipts` (4) y `seedSuaLetters` (2).
- `courses` + `downloadPhases`: 3 cursos (offline obligatorio con 3 lecciones, evaluación y satisfacción; online en curso; finalizado) y las 6 fases de descarga.
- `faqTopics`, `botReplies`, `seedChatRooms`, `legalDocument` (5 secciones TBM).

## Estado mutable (store/paco-store.ts)
Sesión y permisos; encuestas completadas; notificaciones (leer/borrar/push); entradas de ánimo; felicitaciones; cuentas (alta/baja); KYC; movimientos generados por adelanto/recarga/servicio; tareas de onboarding; reportes de voz con chat y respuesta automática de RH; reconocimientos; solicitudes (crear/editar/eliminar); lecturas y descargas; documentos generados/firmados/subidos; recibos y SUA firmados; progreso de cursos, descargas offline y sincronización; perfil editable; seguridad (contraseña/NIP); ticket de soporte con bot y escalamiento; salas de chat; aceptación legal; toast global.
