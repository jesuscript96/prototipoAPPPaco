# Paco App UX Decisions

## Principio Rector

La app de referencia se usa como contrato funcional, no como plantilla visual. El prototipo reinterpreta los flujos con una UI corporativa moderna basada en el storybook existente: tarjetas claras, jerarquia por prioridades, estados visibles, formularios guiados, feedback inmediato y menos friccion.

## Decisiones Globales

- Navegacion: se agrupan modulos por dominios (Finanzas, Personas/RH, Documentos, Soporte) para evitar una cuadricula extensa sin contexto.
- Dashboard: se eleva de "lista de botones" a centro de accion con banners, pendientes, accesos y alertas.
- Formularios: se muestran como wizards compactos con progreso y resumen, no como pantallas largas sin guia.
- Estados: cada modulo muestra estado normal, exito y simulacion de estados alternos relevantes.
- Sandbox: fallas observadas en la referencia no se replican; se implementa el comportamiento esperado.
- Copy: se moderniza para ser directo, humano y corporativo, manteniendo terminologia Paco.
- Simulaciones: KYC, camara, audio, archivos, firma, pagos, WhatsApp y push se representan visualmente sin dependencias nativas.

## Flujos Redisenados

### Home Bento Grid (rediseno jun 2026)
- Friccion detectada: el grid de modulos era una rejilla uniforme (misma tarjeta 48.5% x 136px para los 24 modulos), sin jerarquia ni descanso visual, con iconos encerrados en cajas con borde.
- Decision: adoptar Bento Grid con tres niveles por dominio: tarjeta hero horizontal con dato vivo y accion directa (Adelanto con CTA "Solicitar", Estado de animo con caritas que registran en un toque, Recibos con chip "Firmar ahora"), tarjetas medias 48.5% para modulos frecuentes y pastillas mini para secundarios.
- Iconos: sin contenedor rigido; flotan sobre una "manchita" organica (blob sin borde, alpha bajo, descentrado determinista por seed) con color de categoria: Finanzas verde/petroleo, Personas y cultura coral/salmon, Documentos violeta/gris.
- Soporte y cuenta: deja de ser grid; es lista de gestion (ListGroup/Row, icono libre a la izquierda + chevron) con la estetica de "Hoy en Paco".
- Hero financiero: se elimina la fila de 4 quick actions porque el bento de Finanzas la absorbe con mas jerarquia; el hero queda como tarjeta de saldo y estado de adeudo.
- Funcionalidad preservada: los 24 modulos siguen navegables desde Home; las acciones directas reutilizan `registerMood` y `signReceipt` del store con feedback inline + toast global.
- Componentes: `components/paco/bento.tsx` (BentoIcon, BentoHeroTile, BentoHalfTile, BentoMini, BentoActionChip, bentoAccents). `GlassModuleTile` se conserva para otras pantallas.
- Criterio de uso documentado con ejemplos vivos en el storybook: `app/(storybook)/bento.tsx` (jerarquia, manchita, accion directa, listas de gestion y checklist de reglas).

### Onboarding Y Login
- Friccion detectada: la pantalla de bienvenida (permisos + 3 CTAs) agregaba un paso antes de lo que el usuario realmente quiere: entrar.
- Decision (jun 2026): eliminar `welcome.tsx`; la app abre directo en `login.tsx` con logo Paco + formulario. Los enlaces "No tengo cuenta" y "Olvide mi contrasena" dentro del form cubren activacion y recuperacion. Logout y eliminar cuenta redirigen a login.
- Permisos: la ubicacion se concede contextualmente desde Ofertas PiN; el permiso de notificaciones queda como simulacion intencional sin pantalla propia.
- Funcionalidad preservada: activacion, login, recuperar contrasena y ayuda (HelpFab).

### Encuesta Obligatoria
- Friccion detectada: bloqueo puede sentirse como error si no se explica.
- Decision: mostrar banner/pantalla de bloqueo con motivo, progreso y CTA.
- Funcionalidad preservada: no se accede a la app hasta completar encuesta.

### Finanzas
- Friccion detectada: adelanto, recargas y servicios pueden parecer operaciones riesgosas.
- Decision: usar resumen financiero, desglose de comision, terminos y confirmacion visible.
- Funcionalidad preservada: monto, comision, neto, fechas, pasarela, KYC y reflejo en gastos.

### Mood Tracker
- Friccion detectada: muchas etiquetas/factores pueden abrumar.
- Decision: chips priorizados, boton de "mostrar mas" simulado y grafica compacta.
- Funcionalidad preservada: slider, sentimientos, factores, registro e historico.

### Voz Del Colaborador
- Friccion detectada: categorias sensibles requieren confianza.
- Decision: tarjetas con descripcion contextual, anonimato claro y seguimiento conversacional.
- Funcionalidad preservada: categoria, comentario, evidencia, anonimo, estatus y chat RH.

### Solicitudes
- Friccion detectada: cuestionarios dinamicos pueden perder contexto.
- Decision: asistente por pasos con fechas, preguntas, comentarios y resumen.
- Funcionalidad preservada: nueva solicitud, preguntas, pendientes, timeline, editar y eliminar.

### Documentos Y Firma
- Friccion detectada: multiples bibliotecas/documentos se confunden.
- Decision: un patron comun de carpeta, documento, accion y estado de firma/descarga.
- Funcionalidad preservada: comunicados, bienestar, documentos corporativos, recibos, SUA y solicitudes.

### Capacitaciones
- Friccion detectada: offline, lecciones, audio y entregables son complejos.
- Decision: timeline de curso con descarga, progreso, bloqueos, actividades y evidencia.
- Funcionalidad preservada: tabs, offline, descarga, temario, reproductores, grabacion y avance.

### Perfil Y Configuracion
- Friccion detectada: seguridad, cuentas y datos personales mezclan riesgo y mantenimiento.
- Decision: separar expediente, seguridad, cuentas, soporte y legal con feedback por accion.
- Funcionalidad preservada: foto, contrasena, NIP, cuentas, logout, eliminar cuenta y terminos.

### Chat Interno
- Friccion detectada: chat tipo WhatsApp puede parecer externo.
- Decision: estilo mensajeria corporativa con salas, participantes y adjuntos visibles.
- Funcionalidad preservada: crear sala, buscar, enviar mensajes y adjuntos.

## Rediseño Visual 2.0 (junio 2026)

Tras una primera versión funcional considerada "muy básica", se ejecutó un rediseño completo del grupo `(paco)`:

- Capa visual propia en `components/paco/layout.tsx` que sustituye a `components/ui` dentro de Paco (misma API: Screen, Card, Button, Field, Badge, InlineAlert, EmptyState, Section, Progress, Divider, Checkbox). El storybook conserva la capa original.
- Shell oscuro tipo fintech: cabecera "ink" (#15143a) con círculos decorativos, botón de regreso integrado en cada pantalla (headers nativos ocultos) y contenido sobre lienzo claro con esquina superior redondeada de 32 px.
- Tokens nuevos en `tailwind.config.js`: paleta ink/mint/sun, sombras `card/soft/pop`.
- Botones pill (rounded-full, 52 px), tarjetas con sombra suave y borde hairline, alertas con barra de acento lateral, badges con punto de estado.
- Dashboard rediseñado: tarjeta "wallet" con saldo grande y 4 acciones rápidas, lista de pendientes con burbujas de icono tintadas por dominio, banners de color rotativo, grid de módulos con iconos lucide tintados por dominio (Finanzas azul, Personas violeta, Documentos ámbar, Soporte teal) y sello CORE para adelanto.
- Menú lateral → pantalla de perfil hero con grupos temáticos e iconografía consistente.
- StepHeader de asistentes en tarjeta oscura con progreso mint; Segmented y chips en estilo pill con estado activo ink.
- Card de la capa Paco omite su fondo/borde por defecto cuando el llamador define uno propio (NativeWind no resuelve conflictos de utilidades).

## Rediseño Visual 3.0 · Light Glass (vigente)

Iteración final por dirección del cliente: claro, no oscuro; lenguaje de materiales tipo Apple (Liquid Glass) con utilidad Revolut; radios contenidos; cero emojis.

- Lienzo claro `#f2f4fb` con fondo ambiental (`Ambient` en `components/paco/layout.tsx`): tres brillos de color (brand/mint/violeta) con blur en web, que es lo que las superficies glass dejan traslucir.
- Superficies glass: `bg-white/75` + borde hairline `border-white/80` + sombra `shadow-card`. El contraste se garantiza con CTAs y controles activos en tinta `ink #15143a` (botón primario, chips activos, tiles de acciones rápidas), no con color de marca plano.
- Escala de radios reducida: tarjetas 16 px (`rounded-2xl`), botones 14 px, inputs y filas 12 px, chips 10 px, sheets 20 px. Botones de navegación circulares estilo iOS (`GlassNavButton`).
- Tabs segmentadas con indicador animado (`Segmented` en `components/paco/ui.tsx`): píldora blanca que se desliza con spring entre opciones.
- Prohibición total de emojis: registro central de iconografía en `components/paco/icons.tsx` (módulos, banners, operadores de recarga, categorías de servicios, voz, bienestar, medallas, cursos, KYC, cupones PiN, niveles de ánimo con caras lucide, tipos de archivo). Los mocks ya no llevan campos `emoji`/`cover`.
- Acentos por dominio se mantienen (Finanzas azul, Personas violeta, Documentos ámbar, Soporte teal) en burbujas `IconBubble` de 12 px de radio.
- Dashboard: tarjeta wallet glass con saldo grande y 4 tiles ink; banners en tres tintes (ink, brand, glass); pendientes como lista glass con separadores hairline.

## Identidad 4.0 · Brand Guidelines aplicadas (vigente)

- **Color**: paleta oficial del PDF — Azul Paco #2F42CB (primario), azul medio #5176F3 (informativo/Soporte), naranja #FB4F33 reservado como acento estratégico (punto de no leído, sello CORE), azules claros nube/celeste/bruma como tints y lienzo, carbón #1E1E1E como tinta de CTAs y pizarra #263238 en hover. Énfasis UI del manual: verde 6AA84F, amarillo F1C232, rojo CC0000, violeta 674EA7 (Personas), mora A64D79.
- **Tipografía**: Lato cargada vía Google Fonts en web (cuerpo 150%); Gordita Bold declarada en `font-display` con fallback a Lato hasta contar con licencia.

## Tipografía 6.0 · Neogrotesca premium (Revolut)

- **Familia**: Inter (`@expo-google-fonts/inter` en nativo, Google Fonts en web) con fallback SF Pro Display en iOS y sistema.
- **Títulos H1/Hero**: peso Black (`font-black`), tracking negativo (`tracking-display` −1%, `tracking-hero` −2%) para compacidad impactante.
- **Subtítulos y botones**: peso Medium, tracking neutro; botones ya no usan Bold.
- **Cuerpo y legales**: Regular/Light, colores antracita (`ink-body` #2B2B2B, `ink-prose` #3D3D3D, `ink-legal` #4A4A4A) — sin negro puro en lectura.
- **Line-height**: `leading-relaxed` (1.625) en cuerpo; `leading-legal` (1.45) disponible para bloques legales.
- **Sistema central**: `theme/typography.ts` (`textClass`, `typographyScale`) + `components/paco/typography.tsx` (`PacoText`).
- **Iconografía**: migración completa a Phosphor Icons weight Bold mediante capa de compatibilidad `components/paco/glyphs.tsx` (resuelve nombres heredados con fallbacks). `react-native-svg` + `phosphor-react-native` instalados.
- **Densidad Revolut**: nuevo patrón `ListGroup`/`Row` — las colecciones (notificaciones, movimientos, comunicados, estatus de voz, chats, solicitudes, cuentas, recibos) dejan las tarjetas con borde por una lista única con separadores hairline, icono tintado de 36 px, subtítulo de una línea y meta alineada a la derecha (monto en negro, hora/estado en gris).
- **Storybook**: reescrito como fuente de verdad del sistema (fundamentos con HEX oficiales, componentes vivos, patrones de lista, formularios y una sala de Movimiento con demos reproducibles de cada microinteracción).
- **Movimiento**: sistema documentado en `docs/paco-interactions-plan.md` con specs (disparador/propiedades/curva/resultado) por interacción; primitivos en `components/paco/motion.tsx`.

## Navegación inferior (tab bar sticky)

- `components/paco/tabbar.tsx`: barra glass fija al fondo con cinco posiciones — Inicio, Dinero (estado de cuenta + flujos financieros), Solicitudes, Chat y "Más" (abre el menú completo).
- Estado activo: icono Phosphor cambia de `bold` a `fill` en Azul Paco, etiqueta en negrita y píldora indicadora que desliza con spring (misma física que las tabs segmentadas).
- Reglas de visibilidad: oculta sin sesión, durante el bloqueo por encuesta obligatoria (para no saltarse el candado) y en pantallas de conversación con composer (chat interno y chat con RH).
- Implementada como hermano del Stack (no overlay), de modo que ningún contenido queda tapado; el burger del dashboard se retiró porque el menú ahora vive en "Más".

## Identidad 5.0 · Assets Migrados Aplicados

- Los assets extraídos del repo Ionic se curaron en `assets/paco` y se consumen mediante `components/paco/assets.ts`, con `require` estático para Metro.
- Se usa asset real cuando aporta marca, proveedor, categoría, emoción o estado visual: onboarding/login, home, menú, módulos, recargas, servicios, adelanto, encuestas, mood, comunicados, documentos, capacitación, soporte y chat.
- Se conservan glyphs Phosphor para acciones pequeñas y universales: navegación, búsqueda, descarga, firma, envío, edición, eliminación y controles de formularios.
- No se replica pixel-perfect la app fuente. Los assets se integran dentro del lenguaje Light Glass vigente para que la app se sienta Paco sin heredar densidad, layout o fricción del Ionic original.
- Los duplicados y densidades `@2x/@3x` permanecen trazables en `migration-assets/paco-app`; la app consume solo una selección curada para evitar peso y ruido visual.

## Rediseño Visual 5.0 · Navy Glass (superado por Visual 6.0 · Liquid Glass)

Overhaul completo según `docs/paco-glass-visual-overhaul-plan.md`: navy corporativo `#004080` como oscuro primario (heroes, CTAs, badge CORE, tab activo); glass real con `expo-blur` en nativo y `backdrop-filter` en web vía `components/paco/glass.tsx`.

### Tokens y primitives

- **Navy:** `#004080` (DEFAULT), `#003366` (deep), `#0059A8` (soft) en `tailwind.config.js` y `theme/tokens.ts`.
- **Glass:** `GlassSurface`, `GlassHero`, `GlassDock`, `GlassModuleTile`, `GlassBottomSheet`, `GlassSearchBar`, `GlassConversationHeader/Footer`, `GlassIconButton`, helpers `glassInputClass`, `glassTextAreaClass`, `glassInputRowClass`.
- **Transversales migrados:** `layout.tsx` (Card→GlassSurface, Button navy), `ui.tsx`, `tabbar.tsx` (GlassDock), `motion.tsx` (MorphButton navy), `kyc.tsx`.
- **Home:** grid 22 módulos con `GlassModuleTile` (iconos ≥44px, títulos 17px, sin subtítulo visible; subtítulo en `accessibilityLabel`); wallet hero glass; encuesta obligatoria con icono en `GlassSurface`.
- **Limitación documentada:** máximo ~2 `BlurView` anidados por pantalla; overlays modales usan `bg-navy/40–80` sin blur extra en nativo.

### Registro de cobertura · 47 pantallas

| # | Módulo / ruta | Glass | Navy | Dock N/A | Funcional | Notas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `welcome.tsx` | — | — | — | — | Eliminada (jun 2026): entrada directa a login |
| 2 | `login.tsx` | ✅ | ✅ | N/A | ✅ | Form GlassSurface · pantalla de entrada |
| 3 | `activate.tsx` | ✅ | ✅ | N/A | ✅ | Capa automática |
| 4 | `recover.tsx` | ✅ | ✅ | N/A | ✅ | Capa automática |
| 5 | `help.tsx` | ✅ | ✅ | N/A | ✅ | GlassHero navy |
| 6 | `home.tsx` | ✅ | ✅ | ✅ | ✅ | Grid GlassModuleTile |
| 7 | `menu.tsx` | ✅ | ✅ | ✅ | ✅ | Perfil glass |
| 8 | `profile.tsx` | ✅ | ✅ | ✅ | ✅ | Hero + sheets glass |
| 9 | `mood.tsx` | ✅ | ✅ | ✅ | ✅ | Slider/chips |
| 10 | `mood-charts.tsx` | ✅ | ✅ | ✅ | ✅ | Capa automática |
| 11 | `celebrations.tsx` | ✅ | ✅ | ✅ | ✅ | Capa automática |
| 12 | `notifications.tsx` | ✅ | ✅ | ✅ | ✅ | Skeleton GlassSurface |
| 13 | `advance.tsx` | ✅ | ✅ | ✅ | ✅ | GlassHero + KYC |
| 14 | `expenses.tsx` | ✅ | ✅ | ✅ | ✅ | GlassHero + skeleton |
| 15 | `topups.tsx` | ✅ | ✅ | ✅ | ✅ | Operadores glass |
| 16 | `services.tsx` | ✅ | ✅ | ✅ | ✅ | Overlay navy |
| 17 | `comms/index.tsx` | ✅ | ✅ | ✅ | ✅ | ListGroup |
| 18 | `comms/[id].tsx` | ✅ | ✅ | ✅ | ✅ | FileTile |
| 19 | `surveys/index.tsx` | ✅ | ✅ | ✅ | ✅ | Capa automática |
| 20 | `surveys/[id].tsx` | ✅ | ✅ | ✅ | ✅ | Chips navy activos |
| 21 | `voice/index.tsx` | ✅ | ✅ | ✅ | ✅ | Categorías glass |
| 22 | `voice/status.tsx` | ✅ | ✅ | ✅ | ✅ | GlassSearchBar |
| 23 | `voice/[id].tsx` | ✅ | ✅ | ✅ | ✅ | Header/footer custom |
| 24 | `recognitions.tsx` | ✅ | ✅ | ✅ | ✅ | GlassSearchBar |
| 25 | `requests/index.tsx` | ✅ | ✅ | ✅ | ✅ | Catálogo tiles glass |
| 26 | `requests/new.tsx` | ✅ | ✅ | ✅ | ✅ | GlassHero wizard |
| 27 | `requests/[id].tsx` | ✅ | ✅ | ✅ | ✅ | Timeline + comentarios |
| 28 | `wellness/index.tsx` | ✅ | ✅ | ✅ | ✅ | GlassModuleTile |
| 29 | `wellness/[id].tsx` | ✅ | ✅ | ✅ | ✅ | GlassSearchBar |
| 30 | `document-requests.tsx` | ✅ | ✅ | ✅ | ✅ | Visor mock |
| 31 | `training/index.tsx` | ✅ | ✅ | ✅ | ✅ | Modal GlassSurface |
| 32 | `training/[courseId]/index.tsx` | ✅ | ✅ | ✅ | ✅ | Lecciones + encuesta |
| 33 | `training/[courseId]/[lessonId].tsx` | ✅ | ✅ | ✅ | ✅ | Player + checklist |
| 34 | `corporate-docs.tsx` | ✅ | ✅ | ✅ | ✅ | GlassSearchBar |
| 35 | `receipts.tsx` | ✅ | ✅ | ✅ | ✅ | GlassHero + sheet |
| 36 | `sua.tsx` | ✅ | ✅ | ✅ | ✅ | Visor panel |
| 37 | `onboarding-tasks/index.tsx` | ✅ | ✅ | ✅ | ✅ | Capa automática |
| 38 | `onboarding-tasks/[id].tsx` | ✅ | ✅ | ✅ | ✅ | glassTextAreaClass |
| 39 | `pin.tsx` | ✅ | ✅ | ✅ | ✅ | Cupones glass |
| 40 | `support.tsx` | ✅ | ✅ | ✅ | ✅ | Ticket mock |
| 41 | `settings/index.tsx` | ✅ | ✅ | ✅ | ✅ | Filas ListGroup |
| 42 | `settings/password.tsx` | ✅ | ✅ | ✅ | ✅ | glassInputRowClass |
| 43 | `settings/nip.tsx` | ✅ | ✅ | ✅ | ✅ | PIN boxes glass |
| 44 | `settings/accounts.tsx` | ✅ | ✅ | ✅ | ✅ | GlassBottomSheet |
| 45 | `chat/index.tsx` | ✅ | ✅ | ✅ | ✅ | Search + sheet |
| 46 | `chat/[id].tsx` | ✅ | ✅ | ✅ | ✅ | Conversación custom |
| 47 | `legal.tsx` | ✅ | ✅ | ✅ | ✅ | Términos mock |

**Shell:** `_layout.tsx` canvas `#F6F8FF` + `GlassDock` tab bar. **Storybook:** `fundamentos.tsx` swatches navy + demos glass.

**Gate QA (2026-06-11):** `npm run typecheck` ✅ · grep anti-patrones `bg-ink|bg-white/75|bg-white/80|border-slate-200 bg-white` en `app/(paco)` y `components/paco` → **0 coincidencias**.

## Visual 6.0 · Liquid Glass (vigente)

Sistema de materiales estilo Apple aplicado globalmente: 5 grosores de vidrio, colores jerárquicos de texto con vibrancy, separación por borde 1px y soporte completo de Reduce Transparency. Sustituye el modelo de 3 variantes glass (`light`/`info`/`elevated`) de Visual 5.0, que se mantiene como mapeo legacy.

### Regla de oro

**El color semántico nunca es relleno; es acento.** Un aviso de éxito ya no es una caja verde: es vidrio `thick` con borde separador, dot/icono verde vibrante y texto jerárquico. El único tinte de fondo permitido es el `wash` (≤8% alpha) y siempre vive encima de un material. El estatus se comunica con icono/dot + borde + texto, nunca solo con color de fondo.

### Tokens (`theme/tokens.ts` + `tailwind.config.js`)

- **`materials` x5:** `ultraThin` (35%/14px), `thin` (50%/18px), `regular` (65%/24px), `thick` (78%/28px), `ultraThick` (90%/32px) — cada uno con alpha web, alpha de overlay nativo, blur, intensity de expo-blur y `fallback` opaco. Más `materialsDark` (regular/thick navy) para hero, toast y chips activos.
- **`labels` jerárquicos:** primary `rgba(18,26,41,.96)`, secondary `.66`, tertiary `.42`, quaternary `.26` + `labelsOnDark`. Expuestos en Tailwind como `text-label-*` y `text-label-dark-*`. Al ser rgba sobre el vidrio, el texto absorbe el fondo (vibrancy simulada coherente en RN).
- **`separators`:** `separator` (hairline rgba), `opaqueSeparator` (#C8D2E0, Reduce Transparency), `glassEdge` (highlight superior). Todo contenedor glass lleva borde 1px.
- **`vibrants`:** por tono (`success/warning/danger/info/neutral`) → `accent` (glifo/dot/texto), `wash` (≤8% fondo sobre material) y `border` (~20-24%). Reemplazan a `semantic` y al viejo mapa `tones` como rellenos.

### Motor (`components/paco/glass.tsx`)

- `GlassSurface material="ultraThin|thin|regular|thick|ultraThick" tint="none|success|…"`; mapeo legacy `light→regular`, `info→regular+info`, `elevated→thick`.
- Asignación por superficie: dock=`thick`, sheets/modales=`ultraThick`, search/inputs=`thin`, cards=`regular`, hero/toast=`materialsDark`.
- `GlassDarkSurface` nuevo para superficies navy (hero, ToastHost).
- Burbujas de icono: `IconBubble` (glifos lucide) sigue en vidrio thin neutro (`border-separator` + `bg-white/55`). `AssetIconBubble` (assets PNG) migró al estilo Bento (jun 2026): icono libre sin caja ni borde sobre manchita orgánica (`iconBlobShapes` en `icons.tsx`); el color por defecto es azul marca suave y acepta `blobColor`/`blobAltColor` para teñirse por categoría (p. ej. coral de Personas en "Hoy en Paco").

### Reduce Transparency (`components/paco/a11y.ts`)

- Triple fuente: API iOS (`AccessibilityInfo.isReduceTransparencyEnabled` + listener), media query web `prefers-reduced-transparency` y toggle demo en Configuración → Accesibilidad (Android no expone la preferencia del sistema; limitación documentada).
- Activo: cada material rinde su `fallback` opaco sin blur, el borde pasa a `opaqueSeparator`. `useReduceMotion` ahora también escucha `AccessibilityInfo` en nativo.

### Primitives migrados

- `InlineAlert`: glass `thick` + tint + dot de acento + labels (caso del screenshot de adelanto resuelto).
- `Badge`: píldora translúcida + dot + `label-primary`, sin fondo tintado.
- `Card`: el bypass de glass quedó restringido a fondos de marca (`bg-navy|ink|white`); los tintes semánticos ya no escapan al material.
- `SuccessCard`, `SignatureBox`, `FileTile` descargado, `LiquidButton` done, KYC pasos completados, pills "Listo"/adeudo/permisos: borde vibrante + dot/icono acento sobre blanco translúcido, sin rellenos.
- Tipografía: `textClass`/`textColors` migrados a labels jerárquicos → vibrancy en toda la app de golpe.

### Barrido y gate

Barrido completo de `app/(paco)` (32 archivos, ~98 tintados) — burbujas, pills, callouts verdes de confirmación, pasos seleccionados, press feedback. **Gate (2026-06-11):** `rg "bg-(emerald|amber|red|green|violet|rose|orange)-(50|100)|bg-(emerald|amber|red|green|violet|brand|slate)-[45]00/1[05]?"` en `app/(paco)` y `components/paco` → **0 coincidencias** · `npm run typecheck` ✅.

**Storybook:** `fundamentos.tsx` con secciones Materiales (5 grosores), Colores jerárquicos, Capa de separación, Acentos vibrantes (InlineAlert x5 tonos) y demo en vivo de Reduce Transparency.
