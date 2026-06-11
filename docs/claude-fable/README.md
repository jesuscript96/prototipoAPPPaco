# Guía Para Ejecutar Con Claude Code / Fable 5

## Qué Hay En Esta Carpeta

- `one-shot-master-prompt.md`: prompt principal para pegar en Claude Code/Fable 5.
- `functional-spec.md`: especificación funcional exhaustiva del prototipo.
- `implementation-guide.md`: guía técnica y de arquitectura.
- `acceptance-checklist.md`: checklist para evitar cobertura superficial.

## Cómo Usarlo

1. Abre Claude Code en la raíz del repo:

```sh
cd /Users/jvch/Desktop/789.mx/prototipoAPPPACO
```

2. Pega completo el contenido de:

```text
docs/claude-fable/one-shot-master-prompt.md
```

3. Asegúrate de que el agente lea estos archivos antes de codificar:

```text
AGENTS.md
funcionalidadvideo.md
docs/claude-fable/functional-spec.md
docs/claude-fable/implementation-guide.md
docs/claude-fable/acceptance-checklist.md
```

4. Asegúrate de que consulte los videos:

```text
assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4
assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4
```

5. Déjalo trabajar largo. Esta tarea no debería resolverse en minutos si se hace con profundidad.

## Qué Exigirle Al Agente

Si devuelve algo superficial, pídele explícitamente:

```text
No acepto rutas con tarjetas estáticas. Recorre `docs/claude-fable/acceptance-checklist.md` y convierte cada módulo en flujo funcional con datos, estado, acciones y feedback.
```

## Comandos De Verificación

```sh
npm run typecheck
npm run web
```

Luego abrir:

```text
http://localhost:8081
```

## Criterio De Éxito

La app debe permitir recorrer todos los módulos desde `Paco App completa`, con flujos mock vivos y una UX moderna. No basta con un dashboard lleno de accesos.
