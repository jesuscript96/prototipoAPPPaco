# Implementation Guide For Paco Prototype

## Propósito

Esta guía existe para que un agente pueda construir el prototipo completo de Paco App de una vez, sin quedarse en un dashboard con accesos simples.

El objetivo no es documentación bonita. El objetivo es una app funcional de prototipo.

## Stack Detectado

- Expo SDK 56.
- React Native / React 19.
- Expo Router.
- TypeScript estricto.
- NativeWind/Tailwind.
- Zustand para estado local.
- TanStack Query disponible.
- Componentes base en `components/ui.tsx`.
- Storybook móvil en `app/(storybook)`.

## Fuentes De Verdad

Leer antes de codificar:

- `AGENTS.md`
- `funcionalidadvideo.md`
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.45.15.mp4`
- `assets/videosfuncioalidades/WhatsApp Video 2026-02-03 at 13.48.21.mp4`
- `docs/claude-fable/functional-spec.md`
- `docs/claude-fable/acceptance-checklist.md`

Los videos contienen información crítica: pantallas, orden, navegación, tabs, formularios, campos, listas, conversaciones, menús y comportamiento de sandbox.

## Enfoque Correcto

Construir como app real mock:

- Dashboard operativo, no showroom.
- Módulos con pasos, no tarjetas.
- Datos realistas mexicanos.
- Estado local que cambia.
- Botones con feedback visible.
- Cross-module effects.
- Empty/loading/error/success states.
- Mock integrations claras.

## Enfoque Incorrecto

No hacer esto:

- Crear solo un grid de módulos.
- Crear pantallas que solo describen lo que harían.
- Poner botones sin `onPress`.
- Poner todos los módulos en una sola pantalla estática.
- Decir "integración simulada" sin mostrar flujo de integración.
- Marcar como hecho un módulo sin formularios, estados ni resultado.

## Arquitectura Sugerida

```text
app/
  (paco)/
    _layout.tsx
    onboarding.tsx
    dashboard.tsx
    module/
      [id].tsx
components/
  paco/
    financial/
    people/
    documents/
    support/
  ui.tsx
mock/
  paco-data.ts
lib/
  paco-api.ts
store/
  demo-store.ts
```

Si el agente prefiere una estructura distinta, debe mantener separación por dominios y evitar un archivo inmanejable.

## Reglas Por Módulo

Cada módulo debe tener:

- Ruta navegable.
- Datos mock.
- Estado local.
- Flujo principal.
- Acción principal.
- Feedback.
- Estado alterno.
- Verificación visual.

Ejemplo mínimo aceptable:

```text
Recargas:
- elegir operador,
- elegir paquete,
- capturar/confirmar teléfono,
- mostrar resumen,
- pedir código de seguridad,
- confirmar pago,
- mostrar éxito y movimiento mock.
```

Ejemplo insuficiente:

```text
Recargas:
- tarjeta con texto "Aquí se harán recargas".
```

## Integraciones Terceras Mock

Simular de forma visible:

- Pasarela de pagos.
- KYC INE/selfie.
- Firma digital.
- WhatsApp.
- Zoho/bot.
- PiN.
- Descarga offline.
- Subida/descarga de archivos.
- Push notifications.

Usar steppers, badges, estados y confirmaciones.

## QA Obligatorio

Antes de terminar:

```sh
npm run typecheck
```

Además:

- Revisar lints de archivos tocados.
- Buscar botones sin `onPress`.
- Recorrer dashboard y todos los módulos.
- Comparar contra `docs/claude-fable/acceptance-checklist.md`.

## Resultado Esperado

Una app Expo web/mobile-first que permita abrir `Paco App completa` y recorrer todos los módulos con comportamiento mock realista.
