# Paco App Prototype Agent Guide

## Regla Expo Obligatoria

Expo ha cambiado. Antes de escribir o modificar codigo relacionado con Expo, React Native, Expo Router, permisos, assets, camara, audio, linking, documentos, storage, status bar o navegacion, lee la documentacion versionada exacta de Expo SDK 56:

https://docs.expo.dev/versions/v56.0.0/

Usa APIs y patrones compatibles con `expo@~56.0.9`, `expo-router@~56.2.9`, `react@19.2.3` y `react-native@0.85.3`.

## Objetivo Del Proyecto

Construir un prototipo front-end completo de Paco App con mock data. El prototipo debe permitir recorrer visualmente todas las funcionalidades descritas en los archivos de referencia, sin backend real ni integraciones productivas.

El resultado esperado es una app Expo/React Native mobile-first, navegable, con datos realistas, estados de UI y acciones simuladas.

La intencion no es copiar exactamente la app que aparece en la referencia. La app de referencia debe usarse para entender funcionalidades, jerarquia, flujos, casos borde y contenido operativo. El prototipo debe reinterpretar esa experiencia con una UI mucho mas moderna, clara y corporativa, usando el storybook existente como base de patrones y mejorando la UX donde sea necesario.

## Fuentes De Verdad

Antes de implementar cualquier modulo, revisa estas fuentes:

- `funcionalidadvideo.md`: fuente funcional principal. Toda funcionalidad descrita ahi debe tener una representacion en el prototipo.
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4`: video de referencia obligatorio y de alta densidad informativa. Debe consultarse para extraer flujos, orden de navegacion, microinteracciones, estados, textos visibles, relaciones entre modulos y detalles no capturados en el markdown.
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4`: video de referencia obligatorio y de alta densidad informativa. Debe consultarse para extraer la continuacion de modulos, menus, configuracion, documentos, capacitaciones, chats y detalles de uso.
- `docs/claude-fable/one-shot-master-prompt.md`: prompt maestro para intentar construir todo el prototipo de una sola vez.
- `docs/claude-fable/functional-spec.md`: especificacion funcional exhaustiva que debe cubrirse.
- `docs/claude-fable/implementation-guide.md`: guia de arquitectura y ejecucion.
- `docs/claude-fable/acceptance-checklist.md`: checklist de aceptacion; si algo no pasa este checklist, no esta terminado.
- Videos de referencia indicados por el usuario, si existen en el workspace o son provistos despues. Si no estan disponibles en la ruta esperada, busca nombres/rutas alternativas dentro de `assets/`, documenta la ausencia y usa `funcionalidadvideo.md` como respaldo temporal.
- Codigo actual del repo: patrones existentes en `app/`, `components/ui.tsx`, `mock/`, `lib/`, `store/` y `theme/`.
- Documentacion Expo SDK 56 para cualquier API Expo.

Si una funcionalidad del documento parece ambigua, no la omitas. Implementa una version mock razonable y deja el comportamiento visible en UI.

## Protocolo Anti-Superficialidad

Esta tarea es grande y no debe resolverse con una cobertura superficial. Cubrir una funcionalidad no significa crear una tarjeta, una pantalla estatica o un texto descriptivo. Una funcionalidad solo cuenta como cubierta cuando tiene profundidad suficiente para que un usuario pueda entender y recorrer el flujo principal.

Antes de implementar cada modulo, crea o actualiza documentacion de preparacion en `docs/`:

- `docs/paco-coverage.md`: matriz maestra de trazabilidad de todas las funcionalidades.
- `docs/paco-module-briefs.md`: expediente por modulo con alcance, subtareas, pantallas, estados, datos, acciones y criterios de listo.
- `docs/paco-ux-decisions.md`: decisiones de rediseño UX/UI cuando el prototipo se aparte de la referencia del video.
- `docs/paco-mock-data-map.md`: mapa de entidades, fixtures, relaciones y acciones mock por modulo.

Para cada funcionalidad, documenta y ejecuta al menos:

- Proposito del usuario: que intenta lograr y por que existe el flujo.
- Entrada al flujo: desde donde se accede y que precondiciones existen.
- Pantallas o estados necesarios: normal, vacio, carga, error, exito, bloqueado o pendiente segun aplique.
- Datos mock: entidades, valores realistas y relaciones con otros modulos.
- Acciones simuladas: botones, formularios, confirmaciones, cambios de estado y feedback.
- Reglas o restricciones: validaciones, bloqueos, limites, obligatoriedad, permisos o dependencias.
- Decision UX: mantener, mejorar, reagrupar o simplificar respecto a la referencia.
- Verificacion manual: como se recorre el flujo y que resultado visible confirma que funciona.

No se permite marcar un modulo como terminado si sus subfuncionalidades no estan desglosadas. Si un modulo contiene cinco flujos internos, cada flujo debe tener su propio registro de cobertura y su propio resultado visible.

## Definicion De Profundidad Por Funcionalidad

Una funcionalidad esta lista solo si cumple estos criterios:

- Es navegable desde el dashboard, menu, notificacion, listado o flujo padre correspondiente.
- Tiene datos mock suficientemente ricos para parecer un caso real, no placeholders genericos.
- Tiene al menos una interaccion principal funcional en UI local.
- Muestra feedback claro despues de la interaccion.
- Incluye estados alternos relevantes: vacio, error, pendiente, completado, bloqueado o leido/no leido cuando aplique.
- Esta conectada conceptualmente con otros modulos cuando la referencia lo indica, por ejemplo adelanto de nomina con reporte de gastos, encuesta obligatoria con bloqueo o voz del colaborador con notificaciones/chat.
- Esta registrada en la matriz de cobertura con ruta, mock data, accion simulada, decision UX y verificacion.

Si no se puede cumplir algun punto por limitacion del prototipo, se debe documentar explicitamente como simulacion intencional y aun asi mostrar una representacion visual.

## Direccion De Producto, UI Y UX

- No replicar pixel-perfect la app del video. La referencia sirve para descubrir alcance funcional, no para congelar el diseno visual.
- Usar `app/(storybook)` y `components/ui.tsx` como punto de partida para un sistema visual nuevo, consistente y superior.
- Priorizar una UX moderna de app corporativa: navegacion clara, dashboards utiles, formularios guiados, feedback inmediato, estados explicitos, jerarquia visual limpia y reduccion de friccion.
- Tener libertad para reorganizar pantallas, agrupar pasos, cambiar layout, mejorar textos, simplificar interacciones y proponer patrones actuales siempre que no se pierda ninguna funcionalidad.
- Mantener trazabilidad: si se mejora o reordena un flujo respecto al video, la funcionalidad original debe seguir cubierta en la matriz de cobertura.
- Evitar arrastrar errores o limitaciones visibles del sandbox de referencia. Cuando el video muestre fallas, implementar el comportamiento esperado y documentar la diferencia si es relevante.
- El estandar visual debe sentirse como una app corporativa contemporanea: clara, confiable, accesible, rapida de entender y preparada para crecer.

## Contrato De Cobertura Funcional

El prototipo debe cubrir todas y cada una de las funcionalidades del documento de referencia. Para dar por terminado el trabajo, debe existir trazabilidad entre el documento y la app implementada.

Cobertura minima obligatoria:

- Acceso y configuracion inicial: permisos, login, activacion, recuperacion, error de credenciales, ayuda externa.
- Dashboard: saludo, banners, accesos a modulos, notificaciones y entrada a menu.
- Estado de animo: registro diario, slider mock, etiquetas, factores, historico y graficas mock.
- Cumpleanos y aniversarios: tabs, filtros por fecha y medallas de antiguedad.
- Notificaciones: listado, tipos, leido/no leido, borrar todas y destinos mock.
- Adelanto de nomina: validacion de antiguedad, cuenta, monto, desglose, legales y confirmacion.
- Reporte de gastos: adeudos, mis gastos, filtros, grafica circular mock y soporte WhatsApp.
- Recargas: operadores, tipo, montos, telefono, confirmacion y codigo mock.
- Pago de servicios: categorias, proveedores, referencia, escaneo mock, metodo, desglose, KYC y codigo mock.
- Comunicacion interna: comunicados, adjuntos y descarga/apertura simulada.
- Encuestas: obligatorias, bloqueo de navegacion, preguntas y desbloqueo al finalizar.
- Voz del colaborador: categorias, descripcion, comentario, adjunto, anonimo, envio, estatus y chat con RH.
- Reconocimientos: medallas, busqueda de colaborador, motivo, enviados y recibidos.
- Solicitudes: nueva solicitud, fechas, cuestionario dinamico, comentarios, pendientes, finalizadas, timeline, editar y eliminar.
- Bienestar en linea: categorias, recursos multimedia/documentos y estado vacio.
- Solicitud de documentos: carpetas, formatos, generacion PDF mock, firma mock y guardado/subida mock.
- Capacitaciones: pendientes/en curso/finalizadas, online/offline, descarga, progreso, lecciones, recursos, audio mock, grabacion mock, entregables y completar leccion.
- Perfil y expediente: datos laborales/personales, contrato, edicion de correo/telefono y carga mock de CV/contrato.
- Documentos corporativos: carpetas, documentos, visor/descarga mock.
- Recibos de nomina: PDF/XML, firma individual y firma masiva mock.
- Cartas SUA: listado, visor y firma mock.
- Preguntas frecuentes: redireccion mock a soporte externo.
- Chat de soporte tecnico: formulario, ticket y conversacion mock.
- Configuracion y seguridad: foto, cambiar contrasena, recuperar NIP, cambiar NIP, cuentas/tarjetas, logout, logout global y eliminar cuenta.
- Chat interno: lista, busqueda, crear sala, participantes, mensajes y adjuntos mock.
- Terminos y condiciones: texto legal mock, aceptacion/firma visible y fecha.

Si falta una pantalla completa por tiempo, debe existir al menos una ruta o tarjeta navegable que muestre el flujo, datos mock y estado esperado. No dejes funcionalidades solo como texto en un plan.

## Arquitectura Esperada

- Mantener `app/(storybook)` como catalogo de componentes/patrones.
- Montar Paco App en un grupo de rutas separado, preferentemente `app/(paco)`.
- Centralizar datos de dominio Paco en `mock/paco-data.ts` o archivos equivalentes por dominio si crecen demasiado.
- Centralizar llamadas simuladas en `lib/paco-api.ts`; deben devolver promesas con latencia breve para probar estados de carga.
- Usar `store/demo-store.ts` o stores pequenos por dominio para estado local de demo: sesion, encuesta obligatoria, notificaciones leidas, formularios enviados, modo offline y acciones simuladas.
- Reutilizar `components/ui.tsx` para componentes verdaderamente compartidos. Evita crear abstracciones si solo se usan una vez.
- Mantener rutas y nombres tecnicos en ingles o kebab-case cuando sea natural para Expo Router; mantener copy visible al usuario en espanol.

## Principios De UI

- Mobile-first, portrait, tactil y legible.
- Copy claro, humano y especifico para Paco App.
- UI moderna basada en componentes del storybook, con mejoras deliberadas de layout, espaciado, estados y jerarquia visual.
- UX flexible: se pueden cambiar ordenes, agrupaciones o patrones del video cuando eso mejore la experiencia sin eliminar funcionalidad.
- Estados minimos por modulo: carga, vacio, contenido, exito y error simulado cuando aplique.
- Botones con feedback visible: enviado, guardado, descargado, firmado, leido, eliminado, copiado o pendiente.
- No depender solo del color para comunicar estatus; acompanar con texto o icono.
- Mantener targets tactiles de al menos 44 px.
- Preferir datos realistas mexicanos: MXN, CLABE, RFC, CURP, NSS, nomina quincenal, fechas locales y empresas/departamentos creibles.

## Mock Data Y Acciones Simuladas

No integrar servicios reales. Simula:

- Login, activacion y recuperacion.
- Permisos de ubicacion, notificaciones, camara, microfono y archivos.
- Pagos, recargas, adelantos, KYC, codigos de validacion y pasarela.
- Firmas de documentos, descargas, subida de archivos y sincronizacion offline.
- Push notifications, WhatsApp, soporte externo, chat interno y mensajes con RH.

Las acciones mock deben actualizar UI local cuando sea util. Ejemplos: marcar notificacion como leida, agregar solicitud enviada, mostrar adelanto en gastos, completar encuesta y desbloquear dashboard.

## Coordinacion De Agentes

Cuando se trabaje en paralelo, dividir por dominio y evitar editar el mismo archivo central al mismo tiempo.

Roles recomendados:

- UI/Navegacion: shell, layouts, rutas, menu, dashboard y componentes compartidos.
- Mock Domain: tipos, fixtures, mock API y estados base.
- Core Financiero: adelanto, gastos, recargas, servicios, KYC y pasarela mock.
- RH/Contenido: mood, cumpleanos, reconocimientos, solicitudes, comunicacion, bienestar, documentos y capacitaciones.
- Perfil/Soporte/Chats: expediente, configuracion, terminos, soporte tecnico, WhatsApp mock y chat interno.
- QA: typecheck, lints, rutas rotas, cobertura contra checklist funcional y smoke test.

Cada agente debe reportar:

- Archivos tocados.
- Funcionalidades cubiertas.
- Subfuncionalidades cubiertas y subfuncionalidades pendientes.
- Profundidad alcanzada: pantallas, estados, mock data, acciones, validaciones y conexiones entre modulos.
- Entradas actualizadas en `docs/paco-coverage.md`, `docs/paco-module-briefs.md`, `docs/paco-ux-decisions.md` o `docs/paco-mock-data-map.md`.
- Funcionalidades pendientes o ambiguas.
- Riesgos o deuda tecnica.
- Verificacion realizada.

## Checklist Antes De Implementar

- Leer `funcionalidadvideo.md`.
- Localizar, abrir y analizar los videos de referencia:
  - `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4`
  - `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4`
- Leer `AGENTS.md`.
- Revisar estructura actual de `app/`, `components/ui.tsx`, `mock/data.ts`, `lib/mock-api.ts`, `store/demo-store.ts` y `theme/tokens.ts`.
- Confirmar si los videos/assets referidos existen con la ruta indicada o con otro nombre.
- Revisar `app.json` por assets faltantes antes de correr builds/previews.
- Consultar Expo SDK 56 si se toca una API Expo.
- Crear o actualizar la documentacion preparatoria en `docs/` antes de montar pantallas masivas.

## Checklist Antes De Cerrar

- Todas las funcionalidades del contrato de cobertura tienen pantalla/ruta/componente visible.
- Todas las subfuncionalidades de cada modulo estan registradas y verificadas, no solo el modulo padre.
- Existe mock data para cada modulo.
- Las rutas principales son navegables desde dashboard, menu o indice.
- Las acciones importantes dan feedback visual.
- La matriz de cobertura demuestra profundidad: rutas, estados, datos, interacciones, decisiones UX y verificacion.
- `npm run typecheck` pasa o se documenta claramente cualquier bloqueo.
- Revisar lints de archivos tocados.
- Reportar lo implementado y lo que queda como simulacion intencional.

## Restricciones

- No agregar backend.
- No introducir secretos, llaves o credenciales.
- No hacer commits salvo instruccion explicita.
- No ejecutar comandos destructivos.
- No revertir cambios del usuario.
- No instalar dependencias nativas para simular algo que puede resolverse visualmente, salvo que el usuario lo apruebe o sea indispensable.
