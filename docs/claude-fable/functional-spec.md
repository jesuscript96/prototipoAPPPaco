# Paco App Functional Specification

## 0. Objetivo De Este Documento

Este documento es la especificación funcional que debe usar un agente para construir el prototipo completo de Paco App en Expo/React Native con mock data. No es un resumen comercial ni un checklist ligero. Debe servir para que un agente implemente pantallas, flujos, estados, datos mock, acciones y feedback con suficiente profundidad.

El prototipo debe cubrir la app móvil del colaborador, no el back-office. El back-office existe como fuente conceptual: desde ahí RH y la empresa configuran usuarios, módulos, banners, comunicados, encuestas, contenidos, solicitudes, parámetros financieros, cursos, documentos y notificaciones. En el prototipo, todo eso debe estar representado con mock data local.

## 1. Fuentes Obligatorias

Antes de implementar, el agente debe leer/consultar:

- `AGENTS.md`
- `funcionalidadvideo.md`
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4`
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4`
- `docs/video-frames/video-13-45-contact.jpg`
- `docs/video-frames/video-13-48-contact.jpg`
- `docs/claude-fable/implementation-guide.md`
- `docs/claude-fable/acceptance-checklist.md`

Los videos muestran el comportamiento real de la app sandbox: login, dashboard, banners, cumpleaños, notificaciones, mood, adelanto, recargas, servicios, comunicación, menú lateral, reconocimientos, solicitudes, bienestar, documentos, capacitación, configuración, expediente, reportes, recibos, cartas SUA, estatus de voz, soporte y chat.

La transcripción en `funcionalidadvideo.md` contiene detalles hablados que no siempre son visibles en los frames: reglas de negocio, relación con panel, obligatoriedad, fallas del sandbox y comportamiento esperado.

## 2. Principio De Producto

Paco App es una plataforma móvil de beneficios, salud financiera y gestión del colaborador. El usuario principal es un colaborador de una empresa cliente. La app debe servir para:

- Entrar con cuenta corporativa.
- Recibir notificaciones y tareas asignadas.
- Consultar beneficios y contenidos.
- Solicitar adelantos y hacer pagos.
- Responder encuestas.
- Registrar bienestar emocional.
- Comunicarse con RH o soporte.
- Gestionar solicitudes de permisos/vacaciones.
- Consultar y firmar documentos.
- Completar capacitaciones.
- Administrar perfil, seguridad y cuentas.

El prototipo debe sentirse como una app moderna corporativa. No debe copiar pixel-perfect la referencia. La referencia sirve para entender alcance, flujos, contenido y jerarquía funcional.

## 3. Principios De UX/UI

La app debe evitar sentirse como un catálogo. Debe tener comportamiento de producto:

- El dashboard debe mostrar prioridades y no solo una cuadrícula.
- Las acciones críticas deben estar guiadas por pasos.
- Las operaciones financieras deben mostrar desglose y confirmación.
- Los módulos de RH deben guardar o simular cambios visibles.
- Los documentos deben abrirse, descargarse o firmarse en mock.
- Los chats deben permitir enviar mensajes.
- Las notificaciones deben modificar estado leído/no leído.
- Las encuestas obligatorias deben bloquear/desbloquear navegación.
- Las integraciones con terceros deben aparecer como steppers, modales, estados o pantallas intermedias.

Los componentes visuales deben ser modernos:

- Tarjetas con jerarquía clara.
- Tabs/segmentos para estados.
- Chips para selección múltiple.
- Steppers para procesos largos.
- Timeline para aprobaciones.
- Badges para estados.
- Toast/alerta para feedback.
- Empty states útiles.
- Copy claro y humano.

## 4. Datos Mock Globales

El prototipo debe crear datos mock centralizados. Como mínimo:

### Colaborador

Campos:

- nombre completo,
- nombre preferido,
- foto/avatar,
- correo,
- teléfono,
- género,
- fecha de nacimiento,
- número de colaborador,
- RFC,
- CURP,
- NSS,
- fecha de contratación,
- antigüedad calculada,
- empleador,
- periodicidad de pago,
- departamento,
- área,
- puesto,
- salario,
- cuenta bancaria principal,
- tarjetas/cuentas vinculadas,
- NIP configurado,
- flags de KYC.

### Empresa / Configuración

Campos:

- módulos habilitados,
- comisión adelanto,
- comisión servicios,
- mínimo de antigüedad,
- máximo de adelanto,
- periodicidad de nómina,
- links de FAQ,
- WhatsApp soporte,
- proveedor de chat técnico,
- proveedor PiN,
- proveedor firma digital,
- proveedor pasarela/KYC.

### Entidades Transversales

Crear mock data para:

- banners,
- notificaciones,
- mensajes,
- mood entries,
- colaboradores/directorio,
- cumpleaños/aniversarios,
- adelantos,
- gastos,
- operadores telefónicos,
- proveedores de servicios,
- encuestas,
- reportes voz,
- reconocimientos,
- solicitudes,
- contenidos bienestar,
- comunicaciones internas,
- documentos,
- recibos,
- cartas SUA,
- capacitaciones,
- lecciones,
- tareas onboarding,
- tickets soporte,
- salas de chat,
- términos legales.

## 5. Estados Globales

El store local debe poder representar:

- permisos concedidos,
- sesión iniciada,
- encuesta obligatoria completada,
- notificaciones leídas,
- mood del día registrado,
- adelanto confirmado,
- KYC financiero completado,
- recarga completada,
- servicio pagado,
- tarea onboarding completada,
- reporte voz enviado,
- solicitud creada/editada/eliminada,
- curso descargado,
- lección completada,
- documento firmado,
- cuenta bancaria agregada,
- soporte ticket creado,
- chat con mensajes nuevos,
- términos aceptados.

Toda acción principal debe modificar alguno de estos estados o estado local equivalente.

## 6. Arquitectura Funcional Esperada

La app puede organizarse con Expo Router:

```text
app/(paco)/
  onboarding.tsx
  dashboard.tsx
  module/[id].tsx
```

Pero la implementación interna no debe ser un archivo gigante sin estructura. Se recomienda separar:

```text
components/paco/
  access/
  dashboard/
  finance/
  people/
  documents/
  training/
  support/
mock/paco-data.ts
lib/paco-api.ts
store/demo-store.ts
```

Si se usa una ruta dinámica, cada módulo debe renderizar componentes reales, no secciones descriptivas.

## 7. Flujo Global De Usuario

### Primer uso

1. La app abre pantalla Paco.
2. Solicita permisos mock de notificaciones y ubicación.
3. Usuario puede elegir:
   - "Ya tengo cuenta",
   - "No tengo cuenta",
   - "Olvidé mi contraseña",
   - ayuda externa.
4. Si inicia sesión correctamente:
   - si hay encuesta obligatoria pendiente, se muestra bloqueo,
   - si no hay bloqueo, entra al dashboard.
5. En dashboard ve:
   - banners,
   - pendientes,
   - mood diario,
   - notificaciones,
   - módulos prioritarios,
   - estado financiero,
   - capacitación/offline,
   - onboarding de tareas,
   - menú o secciones por dominio.

### Uso recurrente

1. Usuario entra directo al dashboard si ya hay sesión mock.
2. La app muestra pendientes del día.
3. Push/notificaciones llevan a módulos concretos.
4. Acciones completadas deben cambiar estados en dashboard o módulo.

## 8. Acceso, Permisos Y Login

### Fuente

Video 13.45 desde 00:00 a 01:08 y transcripción líneas 118-122.

### Comportamiento observado

La app solicita:

- permiso de notificaciones,
- permiso de ubicación para Ofertas PIN,
- login con cuenta registrada,
- activación con teléfono si no está activa,
- ayuda externa mediante icono flotante de cuatro círculos,
- error visual si credenciales fallan,
- mostrar/ocultar contraseña.

### Pantallas mínimas

- Pantalla de bienvenida.
- Paso de permisos.
- Login.
- Activación por celular.
- Recuperación de contraseña.
- Ayuda externa.
- Estado de error de credenciales.

### Datos mock

- email/teléfono de colaborador,
- contraseña enmascarada,
- teléfono para activación,
- link ayuda,
- estado permisos,
- estado error.

### Acciones

- Conceder notificaciones.
- Conceder ubicación.
- Intentar login inválido y mostrar alerta roja.
- Iniciar sesión válida.
- Enviar solicitud de activación.
- Enviar recuperación de contraseña.
- Abrir ayuda externa mock.

### Estados

- permisos pendientes,
- permisos concedidos,
- login error,
- login exitoso,
- activación enviada,
- recuperación enviada.

### Criterio de aceptación

El usuario debe poder recorrer el flujo completo sin backend y llegar al dashboard. Cada botón visible debe generar feedback.

## 9. Dashboard Principal

### Fuente

Video 13.45 desde 01:08; contact sheet muestra logo Paco, banner "Happy Hug Day", saludo "Bienvenido/a, Ricardo", botón "Registra tu estado de ánimo", cumpleaños/aniversarios y grid de módulos.

### Objetivo

Ser el centro operativo del colaborador. No debe ser solo una lista de accesos.

### Contenido

Debe mostrar:

- saludo personalizado,
- banners configurados desde panel,
- CTA para registrar estado de ánimo,
- cumpleaños/aniversarios cercanos,
- notificaciones pendientes,
- encuesta obligatoria si existe,
- tareas onboarding,
- resumen financiero,
- capacitación pendiente,
- accesos a módulos agrupados.

### Acciones

- Abrir banner.
- Registrar mood.
- Resolver encuesta bloqueante.
- Continuar onboarding.
- Abrir notificaciones.
- Solicitar adelanto.
- Ver reporte gastos.
- Descargar curso.
- Abrir PiN.
- Navegar a módulo.

### Estados

- dashboard bloqueado por encuesta obligatoria,
- dashboard desbloqueado,
- mood pendiente/completado,
- notificaciones pendientes/leídas,
- tarea onboarding pendiente/completada,
- curso pendiente/descargado.

### Criterio de aceptación

Al menos cinco elementos del dashboard deben ser accionables y producir cambio visible. El dashboard debe resumir estado de la app, no solo mostrar iconos.

## 10. Cumpleaños Y Aniversarios

### Fuente

Video 13.45 desde 01:08 a 01:54. La referencia muestra tabs "Todos", "Cumpleaños", "Aniversarios" y lista por día.

### Objetivo

Fomentar convivencia interna y reconocimiento social.

### Pantalla

Debe incluir:

- tabs,
- filtros por día/semana,
- tarjeta de colaborador,
- tipo de evento,
- fecha,
- área/departamento,
- medalla de años para aniversarios,
- acción de felicitar.

### Datos mock

- colaboradores,
- fechas,
- tipo cumpleaños/aniversario,
- años de antigüedad,
- estado felicitación enviada.

### Acciones

- Cambiar tab.
- Filtrar por fecha.
- Enviar felicitación.
- Ver feedback "felicitación enviada".

### Estados

- todos,
- cumpleaños,
- aniversarios,
- sin celebraciones,
- felicitación enviada.

## 11. Registro De Estado De Ánimo

### Fuente

Video 13.45 desde 02:40 a 03:31 y video 13.48 frame "Estado de ánimo" con estado vacío, botón "Registra tu estado de ánimo" y "Mostrar gráficas".

### Objetivo

Capturar bienestar diario y alimentar analíticos de clima laboral.

### Flujo

1. Entrar desde dashboard o menú.
2. Si no se ha registrado hoy, mostrar estado vacío con CTA.
3. Iniciar registro.
4. Mostrar escala o slider desde "Muy mal" hasta "Muy bien".
5. Cambiar avatar/emoji/color según score.
6. Elegir sentimientos.
7. Mostrar "Mostrar más" o lista ampliada.
8. Elegir factores influyentes.
9. Guardar.
10. Mostrar confirmación.
11. Permitir ver gráficas.

### Sentimientos sugeridos

- Alivio,
- Confianza,
- Diversión,
- Esperanza,
- Gratitud,
- Satisfacción,
- Frustración,
- Estrés.

### Factores sugeridos

- Salud,
- Condición física,
- Cuidado personal,
- Pasatiempos,
- Familia,
- Amistades,
- Pareja,
- Trabajo,
- Educación,
- Viajes,
- Clima,
- Dinero,
- Sucesos actuales.

### Gráficas

Debe incluir:

- tabs S, M, 6M, A,
- tendencia de estados,
- conteo de sentimientos,
- conteo de factores.

### Estados

- sin entrada hoy,
- registrando,
- guardado,
- histórico vacío,
- histórico con datos.

## 12. Notificaciones Y Centro De Mensajes

### Fuente

Video 13.45 desde 01:54. Contact sheet muestra pantalla "Notificaciones", tarjetas con encuestas, fechas, preguntas y botón "Borrar todas las notificaciones".

### Objetivo

Centralizar novedades y acciones asignadas.

### Tipos

- encuesta obligatoria,
- recordatorio de encuesta,
- curso asignado,
- cumpleaños,
- reconocimiento,
- voz del colaborador atendida,
- comunicación interna,
- tarea onboarding,
- transacción financiera.

### Pantalla

Debe mostrar:

- lista de notificaciones,
- tipo,
- título,
- descripción,
- fecha/hora,
- estado leída/no leída,
- destino,
- adjuntos si aplica.

### Acciones

- marcar una como leída,
- marcar todas,
- borrar una,
- borrar todas,
- abrir destino,
- abrir adjunto mock.

### Estados

- con notificaciones,
- vacío,
- leídas,
- no leídas,
- error mock al abrir destino opcional.

## 13. Nuevo Módulo Onboarding De Tareas

### Fuente

Musts del usuario. Relacionado con push, comunicación, encuestas y capacitación.

### Objetivo

Gestionar tareas de incorporación o formación asignadas por la empresa.

### Tipos De Tarea

1. Mensaje para leer.
2. Encuesta o examen para responder.
3. Tema/material didáctico para estudiar y descargar.

### Reglas

- Cada tarea tiene día programado.
- Cada tarea puede tener fecha de vencimiento.
- Algunas tareas requieren mentor.
- El mentor puede calificar.
- Debe generar notificaciones push mock.

### Datos mock

- id,
- título,
- tipo,
- descripción,
- fecha programada,
- vencimiento,
- mentor,
- estado,
- materiales,
- preguntas si es examen,
- calificación si aplica.

### Flujo

1. Ver lista de tareas.
2. Filtrar por pendiente/completada/vencida.
3. Abrir tarea.
4. Si es mensaje: leer y confirmar.
5. Si es encuesta/examen: responder preguntas.
6. Si es material: abrir/descargar recurso.
7. Enviar avance.
8. Si requiere mentor, mostrar "pendiente de calificación".
9. Mostrar feedback.

### Estados

- programada,
- pendiente,
- vence pronto,
- vencida,
- enviada,
- mentor pendiente,
- aprobada,
- completada.

## 14. Adelanto De Nómina

### Fuente

Video 13.45 desde 04:01 a 05:58. Contact sheet muestra pantallas con monto $200/$300, saldo disponible $2,500, cuenta, comisión, total, fecha adelanto, fecha cobro, términos y botón confirmar.

### Objetivo

Permitir anticipo de salario devengado bajo reglas de empresa.

### Reglas

- Antigüedad mínima configurable, ejemplo 3 meses.
- Monto mínimo $200.
- Monto máximo calculado por salario/configuración, ejemplo $2,500.
- Comisión por convenio configurable.
- Requiere cuenta destino.
- Requiere aceptar términos.
- Primer uso requiere KYC con tercero.

### Flujo

1. Entrar al módulo.
2. Validar elegibilidad.
3. Si no es elegible, mostrar razón y CTA soporte.
4. Si es primer uso, iniciar KYC:
   - INE frente,
   - INE reverso,
   - selfie,
   - envío a tercero,
   - respuesta validada.
5. Seleccionar monto con slider o botones.
6. Mostrar saldo disponible.
7. Seleccionar cuenta destino.
8. Mostrar desglose:
   - monto,
   - comisión,
   - neto,
   - fecha solicitud,
   - fecha cobro.
9. Aceptar términos, mandato de cobro, domiciliación e información crediticia.
10. Confirmar.
11. Mostrar éxito.
12. Crear adeudo en reporte de gastos.

### Estados

- no elegible,
- elegible,
- KYC pendiente,
- KYC enviado,
- KYC validado,
- términos pendientes,
- listo para confirmar,
- confirmado,
- reflejado en gastos,
- error mock de pasarela.

## 15. Recargas Telefónicas

### Fuente

Video 13.45 desde 05:58 a 06:55. Contact sheet muestra Telcel, montos, saldo disponible y botón continuar.

### Objetivo

Comprar tiempo aire o datos con cargo al saldo/configuración financiera.

### Operadores

Incluir al menos:

- AT&T,
- Weex,
- Movistar,
- Bait,
- Telcel,
- Virgin Mobile,
- Mi Recarga,
- Unefon,
- Flash Mobile,
- PilloFon,
- FreedomPop,
- Oui móvil,
- Diri.

### Flujo

1. Elegir operador.
2. Elegir tipo: tiempo aire o datos.
3. Elegir monto.
4. Ver saldo disponible.
5. Capturar teléfono.
6. Confirmar teléfono.
7. Mostrar resumen.
8. Ir a pasarela mock.
9. Ingresar código de seguridad.
10. Confirmar pago.
11. Mostrar éxito.
12. Registrar movimiento en gastos.

### Estados

- seleccionando operador,
- seleccionando monto,
- teléfono inválido,
- listo para pagar,
- validando código,
- recarga exitosa,
- error mock.

## 16. Pago De Servicios

### Fuente

Video 13.45 desde 06:55 a 07:49. Contact sheet muestra CFE, monto, referencia, cámara, método de pago y teclado.

### Objetivo

Pagar servicios domésticos/gubernamentales con tarjeta o nómina.

### Categorías

- Televisión, telefonía e internet.
- Agua, luz y gas.
- Telepeaje.
- Entretenimiento.
- Pagos de gobierno.
- Ventas por catálogo.

### Proveedores

Incluir logos textuales o cards para:

- CFE,
- Telmex,
- Sky,
- Dish,
- PASE,
- algún proveedor de gobierno.

### Flujo

1. Elegir categoría.
2. Elegir proveedor.
3. Capturar monto.
4. Capturar referencia.
5. O usar botón cámara para escaneo mock.
6. Elegir método:
   - adelanto de nómina,
   - tarjeta.
7. Mostrar desglose:
   - importe,
   - comisión,
   - saldo final,
   - método.
8. Aceptar términos.
9. Pasar por KYC:
   - INE frente,
   - INE reverso,
   - selfie,
   - código.
10. Confirmar.
11. Mostrar pago exitoso.
12. Registrar gasto.

### Estados

- referencia vacía,
- referencia escaneada,
- KYC incompleto,
- listo para pagar,
- pagando,
- pagado,
- error tercero.

## 17. Estado De Cuenta / Reporte De Gastos

### Fuente

Video 13.45 adelanto refleja adeudo; video 13.48 desde 06:29 menciona reporte con gráfica circular, periodos y tipo de gasto, además de soporte WhatsApp.

### Objetivo

Mostrar al colaborador sus adeudos y movimientos hechos desde Paco.

### Pantalla

Debe incluir:

- adeudo total próximo,
- gráfica circular/resumen por categoría,
- tabs:
  - Adeudos,
  - Mis gastos,
  - Soporte.
- filtros:
  - fecha,
  - periodo nómina,
  - tipo gasto.
- lista de movimientos.
- detalle de movimiento.
- botón soporte WhatsApp.

### Acciones

- filtrar,
- abrir detalle,
- contactar WhatsApp,
- ver movimiento generado por adelanto/recarga/servicio.

### Estados

- sin movimientos,
- con adeudo,
- filtrado sin resultados,
- soporte abierto.

## 18. Club De Descuentos PiN

### Fuente

Permisos de ubicación en video 13.45 y musts del usuario.

### Objetivo

Redirigir a promociones/cupones de proveedor PiN.

### Flujo

1. Validar ubicación concedida.
2. Mostrar beneficios cercanos.
3. Mostrar categorías.
4. Abrir cupón.
5. Mostrar redirección mock.

### Datos

- marca,
- oferta,
- categoría,
- distancia,
- vigencia,
- ubicación aproximada,
- proveedor PiN.

## 19. Comunicación Interna

### Fuente

Video 13.45 desde 08:18; contact sheet muestra lista de comunicados con cards y adjuntos.

### Objetivo

Distribuir mensajes corporativos, políticas y materiales desde panel.

### Pantalla

- lista de comunicados,
- filtros recientes/antiguos,
- título,
- autor,
- fecha,
- cuerpo,
- adjuntos.

### Adjuntos

Soportar mock:

- imágenes,
- PDF,
- Excel,
- Word,
- PowerPoint.

### Acciones

- abrir comunicado,
- descargar adjunto,
- marcar leído.

## 20. Encuestas

### Fuente

Video 13.45 desde 09:07; video 13.48 muestra pregunta 2 de 3 con Sí/No.

### Objetivo

Responder evaluaciones internas, incluyendo NOM-035, y bloquear app si son obligatorias.

### Tipos De Pregunta

- opción única,
- opción múltiple,
- abierta,
- escala,
- sí/no.

### Flujo Obligatorio

1. Entrar app.
2. Detectar encuesta obligatoria.
3. Bloquear dashboard.
4. Mostrar explicación.
5. Responder pregunta por pregunta.
6. Mostrar progreso.
7. Validar respuestas.
8. Enviar.
9. Desbloquear app.

### Flujo Normal

1. Abrir módulo encuestas.
2. Ver pendientes/programadas.
3. Responder.
4. Enviar.
5. Ver estado completada.

### Estados

- pendiente,
- programada,
- vencida,
- obligatoria bloqueante,
- en progreso,
- enviada,
- desbloqueada.

## 21. Voz Del Colaborador

### Fuente

Video 13.45 desde 09:51 a 10:25 y video 13.48 frame de estatus con semáforo.

### Objetivo

Canal seguro para sugerencias, quejas, agradecimientos o denuncias.

### Categorías

- Abuso de autoridad.
- Acoso laboral.
- Acoso sexual.
- Agradecimiento.
- Clima laboral.
- Conflicto de interés.
- Discriminación.
- Higiene y seguridad.
- Innovación.

### Crear Reporte

Flujo:

1. Elegir categoría.
2. Ver descripción explicativa.
3. Escribir comentario.
4. Adjuntar foto/evidencia.
5. Activar/desactivar anonimato.
6. Enviar.
7. Recibir folio.
8. Mostrar estado inicial.

### Estatus

Debe mostrar:

- Pendiente con punto amarillo.
- En proceso con punto naranja.
- Atendido con punto verde/turquesa.
- Filtros:
  - recientes,
  - antiguos,
  - no leídos,
  - búsqueda por título.

### Chat RH

Debe incluir:

- mensajes tipo WhatsApp,
- respuesta de RH,
- respuesta del colaborador,
- adjuntar foto mock,
- estado "esperando respuesta".

## 22. Reconocimientos

### Fuente

Video 13.48 desde 00:00. Contact sheet muestra texto "Reconoce a tu equipo", campo "Se enviará a Orlando", motivo y botón continuar.

### Objetivo

Gamificar y promover valores organizacionales.

### Medallas

Incluir:

- Actitud de servicio.
- Adaptación al cambio.
- Compromiso.
- Confianza.
- Excelencia.
- Integridad.
- Iniciativa.

### Flujo Enviar

1. Ver carrusel/lista de medallas.
2. Seleccionar medalla.
3. Leer descripción de valor.
4. Buscar colaborador.
5. Seleccionar destinatario.
6. Escribir motivo.
7. Confirmar.
8. Ver éxito.
9. Agregar al historial de enviados.

### Historial

Tabs:

- Recibidos.
- Enviados.

Cada item:

- medalla,
- persona,
- motivo,
- fecha/hora,
- origen sistema/colaborador.

## 23. Solicitudes

### Fuente

Video 13.48 desde 00:34 a 01:55. La demo crea solicitud "Vacuna Covid" con fechas, preguntas 1/3, 2/3, 3/3 y comentarios; luego muestra historial con editar/eliminar.

### Objetivo

Gestionar permisos, vacaciones, incidencias e incapacidades.

### Pantalla Principal

Tabs:

- Nueva solicitud.
- Mis solicitudes.

### Nueva Solicitud

Categorías:

- Permiso con goce de sueldo.
- Permisos.
- Vacaciones.
- Incapacidades.
- Días personales.

Flujo:

1. Seleccionar tarjeta.
2. Ver pantalla informativa.
3. Pulsar comenzar.
4. Seleccionar fecha inicial.
5. Seleccionar fecha final.
6. Responder cuestionario dinámico:
   - pregunta abierta,
   - sí/no,
   - opción múltiple.
7. Agregar comentarios opcionales.
8. Revisar resumen.
9. Enviar.
10. Mostrar mensaje: se podrá editar mientras no inicie evaluación.

### Mis Solicitudes

Mostrar:

- pendientes,
- finalizadas,
- aprobadas,
- rechazadas,
- no iniciada,
- en evaluación.

Detalle:

- timeline de etapas,
- editar,
- eliminar con confirmación.

## 24. Bienestar En Línea

### Fuente

Video 13.48 desde 02:22 y contact sheet con carpetas Bienestar Mental/Físico/Financiero/Emocional.

### Objetivo

Biblioteca de contenidos de bienestar.

### Categorías

- Bienestar Mental.
- Bienestar Físico.
- Bienestar Financiero.
- Bienestar Emocional.

### Contenidos

- video,
- PowerPoint,
- PDF,
- Word,
- imagen.

### Estados

- carpeta con recursos,
- carpeta vacía con mensaje "Por el momento no hay ningún documento disponible".

### Acciones

- abrir carpeta,
- buscar,
- ordenar,
- abrir recurso,
- descargar recurso.

## 25. Solicitud De Documentos

### Fuente

Video 13.48 desde 02:53.

### Objetivo

Generar, firmar o cargar documentos solicitados por la empresa.

### Flujo

1. Ver carpetas.
2. Abrir carpeta.
3. Ver documentos disponibles.
4. Seleccionar formato.
5. Confirmar generación.
6. Mostrar PDF mock autocompletado.
7. Añadir firma.
8. Guardar.
9. Subir automáticamente al panel mock.
10. Mostrar estado firmado/subido.

### Datos

- carpeta,
- nombre documento,
- tipo,
- requiere firma,
- estado,
- fecha,
- archivo cargado.

## 26. Capacitación

### Fuente

Video 13.48 desde 03:20 a 04:55. Contact sheet muestra tabs Pendientes/En Curso/Finalizados, descargar, lección con audio, grabación, enviar actividad, siguiente.

### Objetivo

Plataforma de e-learning con soporte offline.

### Pantalla Principal

Tabs:

- Pendientes.
- En Curso.
- Finalizados.

Cada curso muestra:

- portada,
- título,
- modalidad,
- obligatorio,
- progreso,
- botón descargar si offline,
- estado descargado.

### Descarga Offline

Flujo:

1. Pulsar descargar.
2. Mostrar modal informativo:
   - contenido disponible sin conexión,
   - progreso guardado local,
   - sincroniza al recuperar conexión.
3. Mostrar progreso:
   - descargando portada 1/6,
   - descargando media 2/6,
   - descargando documentos,
   - completado.
4. Marcar curso como descargado.

### Curso / Lecciones

Debe mostrar:

- título,
- progreso,
- etiqueta obligatorio,
- temario,
- lecciones bloqueadas,
- lección actual.

### Lección

Debe incluir:

- video mock,
- audio player mock,
- archivo adjunto,
- grabación de audio mock,
- reproducción de audio grabado,
- subir entregable,
- enviar actividad,
- marcar lección finalizada,
- avanzar a siguiente.

### Evaluaciones

Si el curso incluye:

- examen,
- encuesta de satisfacción,
- pregunta abierta,
- opción múltiple,

deben mostrarse antes de finalizar o al final.

### Estados

- pendiente,
- descargando,
- descargado,
- en curso,
- bloqueado,
- actividad pendiente,
- actividad enviada,
- finalizado,
- sincronización pendiente,
- sincronizado.

## 27. Configuración Y Seguridad

### Fuente

Video 13.48 desde 04:55 a 06:05; contact sheet muestra cambiar contraseña y configuración.

### Objetivo

Administrar credenciales, seguridad y métodos financieros.

### Funciones

- agregar/cambiar foto,
- cambiar contraseña,
- recuperar NIP,
- cambiar NIP,
- administrar cuentas bancarias,
- administrar tarjetas,
- cerrar sesión en dispositivo,
- cerrar sesión en todos los dispositivos,
- eliminar cuenta.

### Cambiar Contraseña

Campos:

- contraseña actual,
- nueva contraseña,
- confirmar contraseña,
- icono ojo.

Acción:

- guardar,
- mostrar éxito,
- validar coincidencia.

### Recuperar NIP

Flujo:

1. Pulsar recuperar NIP.
2. Enviar código/link al correo.
3. Mostrar confirmación.

### Cambiar NIP

Campos:

- NIP actual,
- nuevo NIP,
- confirmar NIP.

### Cuentas/Tarjetas

Debe incluir:

- listado actual,
- eliminar,
- agregar con tabs:
  - Tarjeta,
  - Cuenta.

Tarjeta:

- alias,
- banco,
- número de tarjeta.

Cuenta:

- alias,
- banco,
- CLABE 18 dígitos.

## 28. Mi Expediente Digital

### Fuente

Video 13.48 desde 07:13. Contact sheet muestra configuración/expediente con datos de Ricardo Jafif.

### Objetivo

Mostrar expediente laboral y datos personales sincronizados desde panel.

### Campos

- nombre completo,
- género,
- fecha nacimiento,
- número colaborador,
- RFC,
- CURP,
- NSS,
- fecha contratación,
- antigüedad,
- empleador,
- periodicidad pago,
- departamento,
- área,
- puesto,
- correo,
- teléfono.

### Acciones

- editar correo,
- guardar/cancelar correo,
- editar teléfono,
- guardar/cancelar teléfono,
- abrir contrato laboral,
- subir CV,
- subir contrato si aplica.

### Tarjeta Digital

Debe integrarse tarjeta corporativa:

- nombre,
- foto/avatar,
- número colaborador,
- puesto,
- área,
- empresa,
- vigencia,
- QR mock,
- estado activo.

## 29. Documentos Corporativos

### Fuente

Video 13.48 desde 07:44.

### Objetivo

Biblioteca corporativa de políticas, reglamentos y manuales.

### Debe incluir

- carpetas,
- búsqueda,
- documentos por carpeta,
- tipo archivo,
- tamaño,
- estado,
- abrir,
- descargar.

Ejemplos:

- Test Condusef,
- Lead yourself first,
- Prestaciones y Beneficios,
- Políticas COVID,
- Manual de Operaciones.

## 30. Recibos De Nómina Y Cartas SUA

### Fuente

Video 13.48 desde 06:29.

### Recibos

Debe permitir:

- listar recibos por periodo,
- abrir PDF,
- descargar PDF,
- descargar XML,
- firmar recibo,
- firmar todos,
- descargar certificado de firma digital,
- mostrar estado firmado.

Debe simular integración de tercero para firma digital.

### Cartas SUA

Debe permitir:

- listar cartas asignadas,
- abrir carta,
- descargar formato,
- firmar,
- mostrar estado firmado.

## 31. Soporte Técnico Y Ayuda

### Fuente

Video 13.48 desde 08:26 a 09:08.

### Canales

- FAQ externa.
- WhatsApp.
- Chat técnico.
- Zoho.
- Bot.
- Ticket.

### FAQ

Debe redirigir mock al portal de Paco con temas:

- adelanto,
- recargas,
- servicios,
- descuentos,
- asistencias,
- seguros.

### WhatsApp

Desde reporte de gastos y soporte:

- preparar mensaje "necesito ayuda",
- mostrar conversación mock.

### Chat Técnico / Zoho / Bot

Flujo:

1. Si no hay conversación, mostrar CTA iniciar chat.
2. Solicitar:
   - nombre,
   - email,
   - teléfono,
   - consulta.
3. Enviar.
4. Crear ticket.
5. Mostrar bot respondiendo.
6. Permitir escalar a agente.

## 32. Chat Interno

### Fuente

Video 13.48 desde 10:00 a 10:31. Contact sheet muestra conversación con Simón y teclado.

### Objetivo

Mensajería interna corporativa tipo WhatsApp.

### Funciones

- listar conversaciones,
- buscar chats,
- conversación 1-1,
- conversación grupal,
- crear sala,
- nombrar sala,
- seleccionar participantes,
- enviar mensajes,
- adjuntar imagen,
- adjuntar documento,
- adjuntar video.

### Estados

- sin chats,
- chats existentes,
- sala creada,
- mensaje enviado,
- adjunto agregado,
- error mock opcional.

## 33. Términos, Privacidad Y Firma Legal

### Fuente

Video 13.48 final menciona política de privacidad clara y firmada.

### Debe incluir

- términos de uso,
- política de privacidad,
- versión,
- emisor,
- fecha,
- firmante,
- carácter "Mandante",
- aceptación,
- firma digital mock.

### Acciones

- leer,
- aceptar,
- firmar,
- ver estado firmado.

## 34. Módulos Opcionales Y Configuración Por Empresa

La referencia menciona que no todas las empresas tienen todos los módulos, excepto adelanto de nómina como core. El prototipo debe demostrar esta capacidad con mock config:

- módulo obligatorio,
- módulo habilitado,
- módulo opcional,
- módulo oculto/deshabilitado mock.

No hace falta ocultar módulos reales en el prototipo final si se quiere mostrar todo, pero sí debe representarse el concepto con badges o configuración.

## 35. Integraciones Terceras Simuladas

No implementar integraciones reales. Simular visualmente:

- Pasarela de pagos.
- KYC / verificación identidad.
- Firma digital.
- PiN.
- WhatsApp.
- Zoho.
- Bot soporte.
- Push notifications.
- Descarga offline.
- Cámara.
- Micrófono.
- File picker.

Cada integración simulada debe tener:

- pantalla/paso,
- estado,
- acción,
- feedback.

## 36. Checklist De No Superficialidad

Antes de terminar, revisar cada módulo:

- ¿Tiene más que una tarjeta?
- ¿Se puede recorrer como usuario?
- ¿Tiene datos mock específicos?
- ¿Tiene al menos una acción principal viva?
- ¿Cambia el estado?
- ¿Muestra feedback?
- ¿Tiene estados alternos?
- ¿Está conectado con otros módulos si aplica?
- ¿Los botones hacen algo?
- ¿Se ve como app moderna y no como documentación?

Si cualquier respuesta es "no", el módulo no está listo.

## 37. Verificación Técnica

Al terminar:

```sh
npm run typecheck
```

También revisar:

- lints de archivos tocados,
- rutas rotas,
- imports,
- botones sin `onPress`,
- pantallas vacías,
- errores en web.

## 38. Resultado Esperado

Al abrir la app, el usuario debe poder:

1. Entrar por onboarding/login.
2. Conceder permisos mock.
3. Ver dashboard operativo.
4. Resolver encuesta obligatoria.
5. Registrar mood.
6. Completar tareas onboarding.
7. Solicitar adelanto con KYC.
8. Hacer recarga.
9. Pagar servicio.
10. Ver gastos.
11. Abrir PiN.
12. Enviar voz del colaborador y conversar.
13. Enviar reconocimiento.
14. Crear solicitud.
15. Descargar/firma documentos.
16. Completar capacitación offline.
17. Ver expediente y tarjeta digital.
18. Firmar recibos/SUA.
19. Usar soporte/bot/WhatsApp.
20. Crear chat interno y enviar adjuntos.
21. Aceptar términos.

Ese es el nivel mínimo de profundidad esperado.
