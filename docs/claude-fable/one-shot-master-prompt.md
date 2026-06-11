# One-Shot Master Prompt For Claude Code / Fable 5

Usa este prompt como mensaje principal para intentar construir el prototipo completo de Paco App en una sola ejecución larga.

```text
Eres un agente senior de producto, UX y frontend trabajando en este repositorio Expo/React Native. Tu tarea es construir el front-end completo del prototipo Paco App con mock data, con la mayor profundidad posible, en una sola ejecución larga.

Idioma de trabajo y UI visible: español.

No hagas backend. No uses servicios reales. No metas secretos. Todo debe ser front-end, mock data, estado local, rutas y simulaciones.

REGLA EXPO:
Antes de escribir o modificar código relacionado con Expo, React Native, Expo Router, permisos, cámara, audio, documentos, linking, assets o navegación, consulta documentación exacta Expo SDK 56:
https://docs.expo.dev/versions/v56.0.0/

FUENTES OBLIGATORIAS:
1. Lee `AGENTS.md`.
2. Lee `funcionalidadvideo.md`.
3. Consulta y analiza visualmente estos videos:
   - `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4`
   - `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4`
4. Lee:
   - `docs/claude-fable/functional-spec.md`
   - `docs/claude-fable/acceptance-checklist.md`
   - `docs/claude-fable/implementation-guide.md`

IMPORTANTE:
No copies pixel-perfect la app de referencia. Los videos y documentos son contrato funcional, no guía visual cerrada. Debes reinterpretar la experiencia con una UI/UX moderna de app corporativa usando el storybook y componentes existentes como base.

OBJETIVO:
Construir una app navegable y funcional de prototipo, donde cada módulo tenga flujo real mock:
- pantallas o pasos,
- datos mock realistas,
- estado local,
- acciones observables,
- feedback,
- estados vacío/carga/error/éxito cuando aplique,
- conexiones entre módulos cuando existan,
- y todos los botones principales funcionando.

NO SUPERFICIALIDAD:
Una tarjeta con texto o un listado estático no cuenta como módulo implementado. Cada módulo debe poder recorrerse como usuario.

ORDEN DE EJECUCIÓN:
1. Preflight:
   - Verifica package, rutas, storybook, componentes, assets y videos.
   - Revisa si hay cambios existentes y no los reviertas.

2. Análisis de fuentes:
   - Extrae todos los flujos de `funcionalidadvideo.md`.
   - Extrae visualmente jerarquía, pantallas y detalles de ambos videos.
   - Contrasta contra `docs/claude-fable/functional-spec.md`.

3. Arquitectura:
   - Mantén storybook como guía visual.
   - Crea o refuerza un grupo `app/(paco)/`.
   - Centraliza mock data de dominio.
   - Centraliza acciones mock con estado local.
   - Evita un único archivo gigante si puedes separar por dominios.

4. Implementa el shell:
   - onboarding/login,
   - permisos mock,
   - dashboard operativo,
   - navegación por dominios,
   - bloqueo por encuesta obligatoria,
   - menú/accesos.

5. Implementa módulos con profundidad:
   - Acceso / permisos / login / activación / soporte externo.
   - Dashboard principal.
   - Cumpleaños y aniversarios.
   - Registro de estado de ánimo.
   - Notificaciones y centro de mensajes.
   - Nuevo módulo onboarding de tareas.
   - Adelanto de nómina con KYC primer uso.
   - Recargas de tiempo aire.
   - Pago de servicios.
   - Estado de cuenta / reporte de gastos.
   - Club de Descuentos PiN.
   - Voz del colaborador.
   - Reconocimientos.
   - Encuestas.
   - Soporte y ayuda con WhatsApp, Zoho/bot.
   - Chat en vivo 1-1 y grupal con adjuntos.
   - Solicitudes de permisos/vacaciones/incapacidades.
   - Mi expediente digital y tarjeta digital de colaborador.
   - Recibos de nómina PDF/XML/certificado/firma.
   - Cartas SUA.
   - Solicitud de documentos.
   - Documentos corporativos.
   - Capacitación con offline, multimedia, evaluaciones y satisfacción.
   - Bienestar en línea.
   - Configuración y seguridad.
   - Términos y privacidad.

6. Para cada módulo:
   - Define datos mock.
   - Implementa flujo principal.
   - Implementa al menos una acción principal que cambie UI.
   - Implementa estados alternos relevantes.
   - Si hay integración tercera, simúlala con stepper/estado/feedback.
   - Si hay documento o archivo, simula descargar/subir/firmar/abrir.
   - Si hay chat, permite enviar mensaje localmente.
   - Si hay listado, permite filtrar o cambiar tabs cuando aplique.

7. Revisión anti-superficial:
   - Recorre `docs/claude-fable/acceptance-checklist.md`.
   - Busca botones sin acción y corrígelos.
   - Busca módulos que sean solo texto y conviértelos en flujo.

8. QA:
   - Ejecuta `npm run typecheck`.
   - Revisa lints de archivos tocados.
   - Corrige errores.

9. Respuesta final:
   - Resume lo implementado por dominios.
   - Di qué comandos corriste.
   - Lista cualquier limitación mock intencional.

No te detengas tras crear solo documentación o scaffolding. El trabajo esperado es escribir código hasta tener una app prototipo recorrible y funcional.
```
