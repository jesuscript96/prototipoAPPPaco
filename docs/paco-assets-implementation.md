# Implementación De Assets Paco

## Resumen

Se curaron `147` assets desde `migration-assets/paco-app` hacia `assets/paco` para uso real en Expo/React Native. El inventario fuente completo permanece en `docs/paco-assets-inventory.md` y el manifiesto técnico en `migration-assets/paco-app/assets-manifest.json`.

## Capa Técnica

- `assets/paco/brand`: app icon, favicon, splash, logo textual, icono principal y fondos.
- `assets/paco/fonts`: Gordita y Lato para identidad tipográfica.
- `assets/paco/modules`: iconografía de dashboard, menú y módulos.
- `assets/paco/finance`: tarjetas, confirmación, correo y check.
- `assets/paco/topups`: operadores/tipos de recarga disponibles en el repo fuente.
- `assets/paco/services`: proveedores y categorías de servicios.
- `assets/paco/people`: avatar, comunicación, encuestas, smileys y adjuntos.
- `assets/paco/illustrations`: onboarding, errores, vacíos, soporte, documentos y capacitación.

`components/paco/assets.ts` expone `require` estático para Metro y helpers como `assetForModule`, `assetForTopupOperator`, `assetForService` y `assetForMoodScore`. `components/paco/icons.tsx` conserva `IconBubble` para glyphs y agrega `AssetIconBubble` para imágenes de marca.

## Uso En App

- Branding nativo: `app.json` apunta a `assets/paco/brand/icon.png`, `favicon.png` y `splash.png`.
- Fuentes: `expo-font` carga `Gordita`, `Gordita-Bold` y `Lato` en `app/(paco)/_layout.tsx`.
- Entrada: `welcome`, `login`, `activate`, `recover` y `help` usan logo/ilustraciones Paco.
- Home/Menu: header, avatar, hero financiero, banners, acciones rápidas y grid de módulos usan assets curados.
- Finanzas: `advance`, `expenses`, `topups`, `services` y `pin` usan tarjetas, proveedores, operadores y descuentos con fallback a glyphs.
- Personas/cultura: `mood`, `surveys`, `comms`, `recognitions` y `celebrations` usan smileys, comunicados, avatares e ilustraciones.
- Documentos/capacitación/soporte: `training`, `corporate-docs`, `document-requests`, `receipts`, `sua`, `support` y `chat` usan ilustraciones y assets de documentos/adjuntos.

## Criterio De Selección

Se seleccionaron variantes de mayor calidad cuando existían `@2x/@3x`. Los assets Cordova generados se usan para branding nativo o como referencia, no como UI diaria. Los glyphs Phosphor siguen activos para acciones universales de bajo tamaño: regresar, buscar, descargar, firmar, enviar, editar, borrar y estados compactos.

## Assets Conservados Como Fuente

El resto de los `281` assets extraídos permanecen en `migration-assets/paco-app` para auditoría, comparación visual o futuras pantallas. No se copiaron todos a `assets/paco` para evitar peso innecesario y duplicidad por densidades.
