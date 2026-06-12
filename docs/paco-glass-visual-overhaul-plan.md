# Paco App · Plan de overhaul visual Glass + color corporativo `#004080`

> **Actualización 2026-06-11 · Visual 6.0:** el modelo de 3 variantes glass (`light`/`info`/`elevated`) descrito en este plan fue **superado** por el sistema Liquid Glass de 5 materiales (`ultraThin`→`ultraThick`) con labels jerárquicos, acentos vibrantes y Reduce Transparency. Las variantes legacy se mantienen como mapeo de compatibilidad en `components/paco/glass.tsx`. Ver `docs/paco-ux-decisions.md` § "Visual 6.0 · Liquid Glass".

Documento operativo para un agente implementador. Objetivo: elevar la percepción premium de toda la app corrigiendo superficies “baratas”, aplicando **glass estilo Apple de verdad**, migrando el color oscuro primario a **`#004080`**, y rediseñando el **menú de módulos del Home** (y grids equivalentes): **iconos más grandes, sin subtítulo descriptivo, título más grande**, sobre tiles glass premium.

**Aclaración importante:** el cambio de “quitar texto descriptivo y agrandar icono” **NO aplica al tab bar inferior** (Inicio / Dinero / Solicitudes…). Aplica al **grid de acceso a módulos** en `home.tsx` y a cualquier catálogo visual similar en la app.

Este plan **no elimina funcionalidades**. Solo cambia capa visual, tokens, primitives y composición. Toda acción mock, flujo, validación, store y navegación debe seguir intacta.

Documentos relacionados (no reemplazar, complementar):

- `docs/paco-motion-branding-plan.md` — motion y microinteracciones.
- `docs/paco-interactions-plan.md` — registro de animaciones ya hechas.
- `docs/paco-ux-decisions.md` — decisiones de producto; agregar sección “Visual 5.0” al cerrar.
- `AGENTS.md` — reglas Expo SDK 56.

---

## 0. Diagnóstico del problema actual

### 0.1 Lo que se ve “barato” hoy

| Síntoma | Causa en código | Ejemplo visible |
| --- | --- | --- |
| Tarjetas hero negras planas | `Card className="gap-3 bg-ink"` usa carbón `#1E1E1E` opaco | `app/(paco)/requests/new.tsx` paso 0 (Vacaciones) |
| Glass falso | `bg-white/75` sin blur real en nativo; solo sombra + borde | `Card`, `ListGroup`, tab bar |
| CTAs oscuros genéricos | `Button` primary = `bg-ink` | Botón “Comenzar” en solicitudes |
| Menú módulos Home “barato” | Icono 26px en burbuja 40px + título 13px + subtítulo gris 11px en card blanca plana | `app/(paco)/home.tsx` líneas ~288–302 |
| Grids similares sin unificar | `wellness/index.tsx`, catálogos en `requests/index.tsx`, operadores en `topups.tsx` usan layouts distintos | varias rutas |
| Títulos de módulo pequeños | `text-[13px]` no aprovecha espacio al quitar subtítulo | `home.tsx` |
| Inconsistencia de oscuro | Mezcla `#1E1E1E`, `#000`, `#2F42CB`, `#202C89` | grep `bg-ink` en `(paco)` |

### 0.2 Capturas de referencia del cliente

**Home — grid de módulos (prioridad visual #1):**

1. Cards blancas opacas sin glass real → **`GlassModuleTile`** con blur.
2. Iconos ilustrados pequeños arriba a la izquierda → **icono dominante centrado o superior, 44–52px** dentro de burbuja **56–64px**.
3. Subtítulo gris bajo el título (“Hasta $2,500 esta quincena”, “Tiempo aire y datos”…) → **eliminar del UI** (no borrar dato del mock; conservar en `moduleRegistry.subtitle` para accesibilidad o tooltips futuros).
4. Título del módulo pequeño → **17–18px bold**, puede ocupar 2 líneas max.
5. Badge CORE en adelanto → mantener, pero sobre glass y color navy `#004080`, no carbón.

**Nueva solicitud → Vacaciones (prioridad #2):**

1. Card superior negra sólida → **hero glass azul `#004080`**.
2. Card informativa plana → **glass tintado info**.
3. Botón negro plano → **CTA `#004080`**.

**Tab bar:** no es foco de este overhaul salvo pulido glass del dock. **Conservar labels** “Inicio / Dinero / Solicitudes…” salvo instrucción futura explícita.

---

## 1. Decisiones de diseño (vigentes para este overhaul)

### 1.1 Color oscuro oficial

| Token | Valor | Uso |
| --- | --- | --- |
| `navy` / `ink` (nuevo DEFAULT) | `#004080` | CTAs primarios, hero cards, toggles on, burbujas propias, step headers oscuros |
| `navy-deep` | `#003366` | Hover/pressed, sombras, gradientes |
| `navy-soft` | `#0059A8` | Variante secundaria, iconos sobre navy |
| `navy-glass` | `rgba(0, 64, 128, 0.72)` | Fondo glass hero sobre ambient |
| `navy-glass-border` | `rgba(255, 255, 255, 0.28)` | Borde superior glass oscuro |

**Regla:** dejar de usar `#1E1E1E` y `#000000` como color de marca en `(paco)`. Reservar `#1E1E1E` solo para **texto body** si hace falta contraste sobre fondos claros.

El azul Paco `#2F42CB` y azul medio `#5176F3` **se mantienen** como acentos informativos/links, no como reemplazo del navy hero.

### 1.2 Sistema Glass Apple (especificación técnica)

Crear primitives centralizados en `components/paco/glass.tsx` (archivo nuevo). **No** repetir estilos inline en pantallas.

#### Variantes obligatorias

| Primitive | Uso | Web | iOS/Android |
| --- | --- | --- | --- |
| `GlassSurface` | Cards, list groups, sheets | `backdrop-filter: saturate(180%) blur(24px)` + `bg-white/55` | `expo-blur` `BlurView` intensity 40–55 + overlay blanco 45% |
| `GlassHero` | Tarjetas oscuras tipo Vacaciones, wallet, perfil | `bg-[#004080]/75` + blur 32px + borde blanco 28% + highlight inset | BlurView tint dark + overlay `#004080` 78% |
| `GlassDock` | Tab bar | blur 28px + white/55 | BlurView + overlay |
| `GlassNavButton` | Botón atrás circular | blur 20px + white/65 | BlurView light |
| `GlassChip` | Chips activos | navy glass o sólido navy | igual |
| `GlassInput` | Fields | white/70 + blur 12px | BlurView light detrás |

#### Anatomía visual (todas las superficies glass)

```
┌─ border: 1px rgba(255,255,255,0.75) ─────────────┐
│  highlight inset top (web): inset 0 1px 0 white/80 │
│  ┌─ contenido ─────────────────────────────────┐ │
│  │  texto / iconos                              │ │
│  └──────────────────────────────────────────────┘ │
│  shadow: 0 8px 32px rgba(0,64,128,0.12)          │
└──────────────────────────────────────────────────┘
  fondo ambiental visible a través del blur
```

#### Dependencia `expo-blur`

Para glass real en nativo, **sí se recomienda** instalar `expo-blur` compatible SDK 56. Consultar docs versionadas antes de instalar.

Si el usuario no aprueba la dependencia:

- Fallback documentado: capas `bg-white/80` + borde fuerte + `Ambient` más visible.
- Marcar en UI un badge discreto “Glass simulado (web)” solo en storybook, no en producción.

### 1.3 Patrón `GlassModuleTile` — menú de módulos (Home y equivalentes)

Este es el **cambio principal** que pidió el cliente. Crear primitive reutilizable en `components/paco/glass.tsx` (o `components/paco/module-tile.tsx`).

#### Anatomía objetivo (tile 2 columnas)

```
┌──────────────────────────────┐  ← GlassSurface, min-h ~120px, p-4
│  [ CORE ]          (opcional)│  ← badge esquina sup. derecha
│                              │
│      ┌────────────┐          │
│      │  icono 48px│          │  ← AssetIconBubble 56–64px, imageSize 44–48px
│      └────────────┘          │
│                              │
│  Adelanto de                 │  ← title 17–18px font-bold, 2 líneas max
│  nómina                      │
│                              │  ← SIN subtítulo visible
└──────────────────────────────┘
```

#### Especificación numérica

| Propiedad | Actual (`home.tsx`) | Objetivo |
| --- | --- | --- |
| Ancho tile | `w-[48.5%]` | Mantener 48–49% en grid 2 cols |
| Altura mínima | ~auto (~90px) | **`min-h-[120px]`** |
| Burbuja icono | `size={40}` `imageSize={26}` | **`size={56}`** `imageSize={44}` |
| Título módulo | `text-[13px]` | **`text-[17px] leading-5 font-bold`** |
| Subtítulo | `text-[11px] text-slate-400` visible | **No renderizar** en UI |
| Fondo | `bg-white/75` plano | **`GlassSurface variant="light"`** |
| Press | `active:bg-white` | `PressableScale` + ligero lift |
| Badge CORE | `bg-ink` | **`bg-navy` `#004080`** |

#### API del componente

```tsx
<GlassModuleTile
  title="Adelanto de nómina"
  icon={moduleAsset}           // ImageSourcePropType desde assetForModule
  iconTint="bg-brand-100"
  href="/(paco)/advance"
  core                          // optional badge CORE
  accessibilityHint="Hasta $2,500 esta quincena"  // subtitle mock → a11y only
/>
```

**Regla de datos:** `moduleRegistry[].subtitle` en `mock/paco/core.ts` **permanece** en fixtures. Solo deja de mostrarse visualmente. Pasarlo a `accessibilityHint` o `accessibilityLabel` compuesto:

```tsx
accessibilityLabel={`${module.title}. ${module.subtitle}`}
```

#### Motion (coherente con motion plan)

- `PressableScale` en todo tile.
- Entrada: `FadeSlideIn` con stagger `index * 40ms` por dominio.
- Shared transition opcional hacia pantalla destino (fase 2 motion): icono/título viajan al header.

### 1.4 Tipografía general

| Elemento | Antes | Después |
| --- | --- | --- |
| `GlassModuleTile` title | 13px | **17–18px** |
| Encabezado dominio Home (“Finanzas”) | 16px | **18px** |
| `Screen` title | 27px | **32px** (módulos internos) |
| `Screen` description | 14px | 15px; **no duplicar** info ya obvia del tile |
| Hero card title (Vacaciones) | 24px | **28px** |

### 1.5 Tab bar (dock inferior) — alcance limitado

Archivo: `components/paco/tabbar.tsx`

**No quitar labels.** Solo pulido glass coherente:

1. Aplicar `GlassDock` / blur real al contenedor flotante.
2. Mantener iconos ~26px y textos “Inicio / Dinero / Solicitudes…”.
3. Conservar `accessibilityLabel`, spring del indicador, reglas de ocultamiento.

Funcionalidad que **no** debe romperse:

- Ocultar dock en login, welcome, conversaciones.
- Ocultar si encuesta obligatoria bloquea.
- `router.replace(tab.href)` igual.

---

## 2. Fase 0 · Migración de tokens (hacer primero)

### 2.1 Archivos a tocar

| Archivo | Acción |
| --- | --- |
| `tailwind.config.js` | Reemplazar escala `ink.DEFAULT` → `#004080`, `ink.deep` → `#003366`, `ink.soft` → `#0059A8`. Agregar `navy` alias si preferible. |
| `theme/tokens.ts` | Agregar `navy: "#004080"`, `navyDeep`, `navySoft`, objetos `glass` con rgba. |
| `components/paco/glass.tsx` | **Crear** primitives glass + **`GlassModuleTile`**. |
| `components/paco/layout.tsx` | Migrar `Card`, `Button`, `GlassNavButton`, `Screen` a primitives glass + navy. |
| `components/paco/ui.tsx` | Migrar `ListGroup`, `Row`, `Segmented`, chips, toggles, toasts, chat bubbles. |
| `components/paco/tabbar.tsx` | Pulido glass del dock (**mantener labels**). |
| `app/(paco)/home.tsx` | **Migrar grid módulos** a `GlassModuleTile`. |
| `app/(storybook)/fundamentos.tsx` | Actualizar swatches de color. |

### 2.2 Mapa de reemplazo global

Ejecutar búsqueda y reemplazo **controlado** (revisar cada caso):

| Buscar | Reemplazar por | Notas |
| --- | --- | --- |
| `bg-ink` (CTAs, heroes) | `GlassHero` o `bg-navy` / clase token | No en texto |
| `border-ink` | `border-navy` | |
| `text-ink` en CTAs/chips activos | `text-navy` o blanco sobre hero | |
| `#1E1E1E` en iconos sobre glass claro | `#004080` o `#1E1E1E` solo body text | |
| `bg-white/75` en Card default | `GlassSurface variant="light"` | |
| `bg-ink/95` toast | `GlassHero` compacto o navy sólido 95% | |

### 2.3 Checklist Fase 0

- [ ] `npm run typecheck` pasa.
- [ ] Storybook fundamentos muestra `#004080`.
- [ ] Ningún `bg-ink` opaco carbón en heroes sin migrar.
- [ ] `GlassSurface` demo en storybook.
- [ ] **`GlassModuleTile` demo en storybook** con y sin badge CORE.
- [ ] Home grid sin subtítulos visibles; iconos ≥44px; títulos ≥17px.
- [ ] Tab bar conserva labels; solo glass polish si aplica.

---

## 3. Primitives a implementar (instrucciones para agente)

### 3.1 `GlassSurface`

```tsx
// API objetivo
<GlassSurface variant="light" | "info" | "elevated" radius={16} className="">
  {children}
</GlassSurface>
```

- `light`: listas, cards neutras.
- `info`: alertas tipo “Flujo de aprobación” — fondo `brand-100/40` + blur + borde `brand-200/50`.
- `elevated`: modales, sheets.

### 3.2 `GlassModuleTile` ⭐ (menú Home)

Primitive dedicado al grid de acceso a módulos. **Obligatorio antes de tocar otras pantallas similares.**

```tsx
<GlassModuleTile
  title={module.title}
  icon={moduleAsset}
  iconTint={style.tint}
  href={module.href}
  core={module.core}
  accessibilityLabel={`${module.title}. ${module.subtitle}`}
/>
```

Implementación interna:

1. Wrapper `GlassSurface variant="light"`.
2. `Link` + `PressableScale` de expo-router.
3. Layout vertical: icono centrado o top-left según diseño final (recomendado **top-left** como screenshot, pero icono **mucho más grande**).
4. **No** renderizar prop `subtitle` en `<Text>`.
5. Badge CORE: `bg-navy` + texto accent naranja.

**Migración directa en `home.tsx`:**

```tsx
// ANTES (líneas ~287-304)
<Pressable className="mb-3 w-[48.5%] rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card active:bg-white">
  <AssetIconBubble size={40} imageSize={26} ... />
  <Text className="mt-3 text-[13px] font-bold ...">{module.title}</Text>
  <Text className="mt-1 text-[11px] ...">{module.subtitle}</Text>
</Pressable>

// DESPUÉS
<GlassModuleTile
  title={module.title}
  icon={moduleAsset}
  iconTint={style.tint}
  href={module.href}
  core={module.core}
  accessibilityLabel={`${module.title}. ${module.subtitle}`}
/>
```

### 3.3 `GlassHero`

```tsx
<GlassHero eyebrow="Vacaciones" title="Vacaciones" subtitle="..." decorative />
```

- Fondo navy glass `#004080`.
- Decoración: arco circular sutil (como screenshot cliente) vía `View` absoluto `border-white/20` parcial — **no emoji**.
- Tipografía: eyebrow uppercase tracking, title 28px bold white, subtitle white/85.

**Migración directa:** reemplazar en pantallas:

```tsx
// ANTES (barato)
<Card className="gap-3 bg-ink">...</Card>

// DESPUÉS
<GlassHero eyebrow={requestType.category} title={requestType.name} subtitle={requestType.description} />
```

### 3.4 `Button` primary

En `components/paco/layout.tsx`:

- Primary: fondo `#004080` con highlight inset web; pressed → `#003366`.
- Secondary: `GlassSurface variant="light"`.
- Mantener props `loading`, `disabled`, `icon`, animación press existente.

### 3.5 `Screen`

- Título 32px.
- `GlassNavButton` usa blur real.
- Padding bottom contenido: `pb-28` (dock más compacto sin labels).

- Título 32px.
- `GlassNavButton` usa blur real.
- Padding bottom contenido: mantener `pb-40` (tab bar con labels sigue ocupando espacio).

---

## 3.6 Dónde aplicar `GlassModuleTile` en toda la app

Patrón unificado para **catálogos visuales en grid 2 columnas** donde el usuario elige un módulo/categoría. Misma regla: **icono grande, título grande, sin línea descriptiva de marketing**.

| Pantalla | Archivo | Elemento actual | Acción |
| --- | --- | --- | --- |
| **Home — menú módulos** ⭐ | `home.tsx` ~275–310 | `moduleRegistry` grid, subtitle visible | **`GlassModuleTile`** — migración obligatoria |
| Bienestar — categorías | `wellness/index.tsx` | grid 2 cols, subtítulo “N recursos” | `GlassModuleTile`; contador de recursos → **badge** esquina o `accessibilityLabel`, no texto gris bajo título |
| Recargas — operadores | `topups.tsx` step operator | grid operadores | `GlassModuleTile` variant compact o lista 2 cols con icono asset grande; sin tagline |
| Solicitudes — catálogo tipos | `requests/index.tsx` | filas con subtítulo “N preguntas · ~X días” | **No es grid Home** pero alinear: icono 40→48px; subtítulo operativo **una línea** en `Row.subtitle` (dato funcional, no marketing) — **no eliminar** porque indica preguntas/plazo |
| Servicios — categorías | `services.tsx` step 1 | `RadioOption` con helper | Icono más grande en burbuja; helper → colapsar en detalle o `accessibilityHint` |
| Voz — categorías | `voice/index.tsx` | cards categoría | `GlassModuleTile` o card glass sin párrafo descriptivo en listado (descripción solo al seleccionar) |
| Capacitaciones — listado cursos | `training/index.tsx` | cards curso | Icono/burbuja más grande; metadata (deadline, progreso) como **badge**, no párrafo |

**Regla de oro:**

- **Quitar:** subtítulos de marketing del menú Home (`moduleRegistry.subtitle`).
- **Conservar visible:** metadatos operativos (estado, plazo, conteo, progreso) pero en formato **badge/meta compacta**, no párrafo gris 11px bajo el título.
- **Nunca eliminar** del mock/store; reubicar en accesibilidad o badge.

---

Formato por entrada:

- **Rutas**
- **Problema actual**
- **Cambios visuales obligatorios**
- **Instrucciones paso a paso**
- **Funcionalidad que NO se toca**

---

### 4.1 Acceso · Welcome, Login, Activación, Recuperación, Ayuda

**Rutas:** `welcome.tsx`, `login.tsx`, `activate.tsx`, `recover.tsx`, `help.tsx`

**Problema actual:** cards planas; overlay modal `bg-ink/40`; botones carbón; poco blur.

**Cambios visuales:**

- Hero de welcome con `GlassHero` navy suave o brand gradient glass.
- Formularios sobre `GlassSurface`.
- Modal permisos: `GlassSurface elevated` centrado, no caja blanca dura.
- Botones primarios navy `#004080`.

**Instrucciones:**

1. Reemplazar cards de permisos por `GlassSurface variant="light"`.
2. Login: fields → `GlassInput`; error mantiene `ShakeView`.
3. Overlay `bg-ink/40` → `rgba(0,64,128,0.35)` + blur backdrop si web.
4. No cambiar flujos mock de activación/recuperación.

**Funcionalidad intacta:** permisos, toggle password, errores credenciales, links ayuda, navegación.

---

### 4.2 Dashboard · Home ⭐ (menú de módulos — prioridad #1)

**Ruta:** `home.tsx`  
**Mock:** `mock/paco/core.ts` → `moduleRegistry`, `domainStyles`, `banners`

**Problema actual (confirmado en código y screenshot cliente):**

```tsx
// home.tsx ~288-302 — esto es lo que se ve "barato"
<Pressable className="mb-3 w-[48.5%] rounded-2xl border border-white/80 bg-white/75 p-4 shadow-card">
  <AssetIconBubble size={40} imageSize={26} />
  <Text className="mt-3 text-[13px] font-bold">{module.title}</Text>
  <Text className="mt-1 text-[11px] text-slate-400">{module.subtitle}</Text>  // ← ELIMINAR del UI
</Pressable>
```

**Cambios visuales obligatorios — bloque “Módulos por dominio”:**

| # | Cambio | Detalle |
| --- | --- | --- |
| 1 | Sustituir Pressable inline | Por `<GlassModuleTile />` importado de `@/components/paco/glass` |
| 2 | Quitar subtítulo | **No renderizar** `module.subtitle` como `<Text>` |
| 3 | Icono | `AssetIconBubble` **56px**, `imageSize` **44–48px** |
| 4 | Título | **17–18px** bold, `leading-5`, max 2 líneas |
| 5 | Glass | `GlassSurface` con blur real / fallback |
| 6 | CORE badge | `bg-navy` `#004080`, texto accent `#FB4F33` |
| 7 | Dominio header | “Finanzas”, “Personas y cultura”… → **18px** bold |
| 8 | Motion | `FadeSlideIn delay={index * 40}` por tile; `PressableScale` |

**Instrucciones paso a paso:**

1. Crear `GlassModuleTile` en `components/paco/glass.tsx` (ver §3.2).
2. En `home.tsx`, importar `GlassModuleTile`.
3. Reemplazar el `.map` de `moduleRegistry` (bloque `{/* Modulos por dominio */}`) por:

```tsx
{moduleRegistry.filter((m) => m.domain === domain).map((module, index) => (
  <FadeSlideIn key={module.id} delay={index * 40} className="mb-3 w-[48.5%]">
    <GlassModuleTile
      title={module.title}
      icon={assetForModule(module.id)}
      iconTint={style.tint}
      href={module.href}
      core={module.core}
      accessibilityLabel={`${module.title}. ${module.subtitle}`}
    />
  </FadeSlideIn>
))}
```

4. **No modificar** `moduleRegistry` en mock salvo que un subtítulo esté incorrecto funcionalmente.
5. Verificar los **22 módulos** siguen navegando: Finanzas (5), Personas (9), Documentos (5), Soporte (5).
6. Probar badge CORE solo en `advance`.

**Otros bloques del Home (misma sesión visual, distinto componente):**

| Bloque | Líneas aprox. | Cambio |
| --- | --- | --- |
| Wallet hero | ~172–210 | `GlassHero variant="finance"` — no confundir con ModuleTile |
| Quick actions (4 tiles) | ~175–185 | Iconos 50→**56px**; fondo navy glass; **sin** label secundario si existe |
| Banners carrusel | ~190–207 | Glass + tint; subtítulo banner **puede quedar** (es contenido editorial, no menú módulo) |
| Pendientes “Hoy en Paco” | ~210–250 | `ListGroup` glass; **mantener** meta operativa (“Pendiente de hoy”) — no es menú |
| Celebraciones hoy | ~252–273 | Glass strip; mantener nombres |

**Funcionalidad intacta:** bloqueo encuesta, pendientes clicables, todos los `href` de módulos, saldo animado, badge notificaciones, dominios agrupados, banner links, CORE en adelanto.

**Verificación manual:**

1. Abrir Home → grid Finanzas muestra 5 tiles sin subtítulo gris.
2. Iconos claramente más grandes que antes.
3. Tap en cada módulo abre ruta correcta.
4. VoiceOver/TalkBack lee título + subtítulo vía `accessibilityLabel`.
5. Adelanto muestra badge CORE navy.

---

### 4.3 Menú / Perfil hub

**Ruta:** `menu.tsx`, `profile.tsx`

**Problema actual:** avatar border `bg-ink`; hero perfil `Card bg-ink`.

**Cambios visuales:**

- Hero perfil → `GlassHero` con iniciales/foto, nombre, rol.
- Filas de menú → `ListGroup` dentro `GlassSurface`.
- Avatar: borde glass blanco, fondo navy si sin foto.

**Instrucciones:**

1. `profile.tsx` Card hero → `GlassHero`.
2. `menu.tsx` grupos temáticos: iconos 20→24px en burbujas glass tintadas.
3. Conservar navegación a settings, legal, logout.

**Funcionalidad intacta:** grupos temáticos, foto mock, rutas hijas.

---

### 4.4 Estado de ánimo

**Rutas:** `mood.tsx`, `mood-charts.tsx`

**Problema actual:** slider y chips planos; poca profundidad.

**Cambios visuales:**

- Contenedor slider → `GlassSurface`.
- Chips sentimientos → `GlassChip` activo navy.
- Botón guardar → Button primary navy.
- Gráficas en `GlassSurface`.

**Instrucciones:**

1. Envolver secciones en glass.
2. Chip activo: `border-navy bg-navy text-white` con transición (ver motion plan).
3. No eliminar “mostrar más”, factores, histórico S/M/6M/A.

**Funcionalidad intacta:** registro diario, multi-select, guardado store, charts.

---

### 4.5 Cumpleaños y aniversarios

**Ruta:** `celebrations.tsx`

**Cambios:** `Segmented` sobre glass; filas en `ListGroup` glass; medallas con burbuja `GlassSurface`.

**Funcionalidad intacta:** tabs, filtros fecha, medallas antigüedad, felicitar.

---

### 4.6 Notificaciones

**Ruta:** `notifications.tsx`

**Cambios:** `ListGroup` → `GlassSurface` wrapper; skeleton mantiene; unread dot sin cambio color.

**Funcionalidad intacta:** leído/no leído, borrar todas, tipos, destinos mock.

---

### 4.7 Finanzas · Adelanto, Gastos, Recargas, Servicios

**Rutas:** `advance.tsx`, `expenses.tsx`, `topups.tsx`, `services.tsx`, `components/paco/kyc.tsx`

**Problema actual:** múltiples `Card bg-ink` (advance, expenses resumen); chips monto `border-ink bg-ink`; KYC plano.

**Cambios visuales:**

| Pantalla | Elemento | Target |
| --- | --- | --- |
| advance | Resumen elegibilidad | `GlassHero` |
| advance | Slider monto | track glass, fill navy |
| advance | Desglose | `GlassSurface` accordion |
| expenses | Card total adeudo | `GlassHero` finance |
| expenses | Gráfica | dentro glass elevated |
| topups | Operadores | tiles glass, selección navy border |
| topups | Montos | `GlassChip` |
| services | Categorías | grid glass |
| services | Escaneo mock | marco glass + pulse |
| kyc | Pasos | `GlassSurface` por paso |

**Instrucciones advance.tsx:**

1. Localizar `Card className="gap-3 bg-ink"` → `GlassHero`.
2. Checkbox legal sin cambio lógica; estilo checkbox navy.
3. Confirmar → Button navy; SuccessCard mantiene confetti reglas motion.

**Funcionalidad intacta:** slider, comisión, términos, KYC, reflejo gastos, validaciones, códigos mock.

---

### 4.8 Comunicación interna

**Rutas:** `comms/index.tsx`, `comms/[id].tsx`

**Cambios:** lista glass; detalle header `GlassHero` compacto con título comunicado; adjuntos chips glass.

**Funcionalidad intacta:** listado, leído, descarga/adjuntos mock.

---

### 4.9 Encuestas

**Rutas:** `surveys/index.tsx`, `surveys/[id].tsx`, bloqueo en `home.tsx`

**Cambios:**

- Cards encuesta obligatoria/opcional → glass + badge accent.
- Preguntas: opciones scale/chips navy glass.
- Bloqueo home: overlay glass elevated, icono candado en superficie glass (no plano amarillo sin blur).

**Funcionalidad intacta:** bloqueo navegación, preguntas, progreso, completar desbloquea.

---

### 4.10 Voz del colaborador

**Rutas:** `voice/index.tsx`, `voice/status.tsx`, `voice/[id].tsx`

**Cambios:** categorías cards glass; toggle anonimato; chat burbujas — propias `bg-navy` glass, ajenas glass claro; composer glass.

**Funcionalidad intacta:** categorías, adjunto, anónimo, folio, estatus colores, chat RH.

---

### 4.11 Reconocimientos

**Ruta:** `recognitions.tsx`

**Cambios:** medallas selección — círculo activo navy glass; tabs glass; enviados/recibidos list glass.

**Funcionalidad intacta:** buscar colaborador, medalla, motivo, enviados/recibidos.

---

### 4.12 Solicitudes ⭐ (prioridad alta — screenshot cliente)

**Rutas:** `requests/index.tsx`, `requests/new.tsx`, `requests/[id].tsx`

**Problema actual (confirmado en código):**

```tsx
// requests/new.tsx línea ~84
<Card className="gap-3 bg-ink">
```

**Cambios visuales obligatorios:**

| Elemento | Archivo | Instrucción exacta |
| --- | --- | --- |
| Hero Vacaciones | `new.tsx` step 0 | Reemplazar `Card bg-ink` por `<GlassHero eyebrow={category} title={name} subtitle={description} />` |
| Alert aprobación | `new.tsx` step 0 | `InlineAlert` → envolver contenido en `GlassSurface variant="info"` o extender `InlineAlert` para usar glass |
| CTA Comenzar | `new.tsx` | `Button` primary navy; icono calendario blanco |
| Catálogo tipos | `index.tsx` | Tiles `Pressable` con `border-slate-200 bg-white` → `GlassSurface` + press scale |
| Wizard pasos | `new.tsx` steps 1+ | `StepHeader` navy glass; chips fechas glass |
| Detalle timeline | `[id].tsx` | timeline en glass; estados color preservados |

**Instrucciones paso a paso `requests/new.tsx`:**

1. Importar `GlassHero` desde `@/components/paco/glass`.
2. Eliminar `Card className="gap-3 bg-ink"` del step 0.
3. Insertar `GlassHero` con props del `requestType`.
4. Verificar contraste WCAG: texto blanco sobre `#004080` OK.
5. `InlineAlert` tono info: aplicar fondo glass azul claro translúcido.
6. No alterar máquina de estados `step`, `submit`, `createRequest`.

**Funcionalidad intacta:** wizard fechas → preguntas dinámicas → comentarios → éxito; editar/eliminar en detalle; tabs index.

---

### 4.13 Bienestar en línea

**Rutas:** `wellness/index.tsx`, `wellness/[id].tsx`

**Cambios:** categorías → **`GlassModuleTile`** (mismo patrón Home); quitar línea “N recursos” bajo título → badge contador o solo a11y; detalle recurso hero glass; player controles glass.

**Funcionalidad intacta:** categorías, multimedia mock, vacío, descarga.

---

### 4.14 Solicitud de documentos

**Ruta:** `document-requests.tsx`

**Cambios:** carpetas glass; visor/firma panel glass elevated; progreso PDF en barra navy.

**Funcionalidad intacta:** carpetas, generar PDF, firma, subida mock.

---

### 4.15 Capacitaciones

**Rutas:** `training/index.tsx`, `training/[courseId]/index.tsx`, `training/[courseId]/[lessonId].tsx`

**Cambios:** cards curso glass; progreso navy; lección header glass; controles audio/grabación sobre glass.

**Funcionalidad intacta:** tabs, offline, descarga fases, lecciones, completar, confetti curso.

---

### 4.16 Documentos corporativos · Recibos · SUA

**Rutas:** `corporate-docs.tsx`, `receipts.tsx`, `sua.tsx`

**Problema:** `receipts.tsx` tiene `Card bg-ink`.

**Cambios:** heroes resumen → `GlassHero`; filas documento glass; firma masiva panel glass.

**Funcionalidad intacta:** PDF/XML, firma individual/masiva, visor, descarga.

---

### 4.17 Onboarding de tareas

**Rutas:** `onboarding-tasks/index.tsx`, `onboarding-tasks/[id].tsx`

**Cambios:** lista tareas glass; detalle hero glass; recursos multimedia glass.

**Funcionalidad intacta:** estados completada/por calificar, tipos recurso, progreso plan.

---

### 4.18 Ofertas PiN

**Ruta:** `pin.tsx`

**Cambios:** skeleton glass; cards oferta glass; cupón chip navy.

**Funcionalidad intacta:** ubicación mock, cupones, guardar/copiar.

---

### 4.19 FAQ y soporte

**Rutas:** `help.tsx`, `support.tsx`

**Problema:** `help.tsx` `Card bg-ink`.

**Cambios:** hero ayuda → `GlassHero`; FAQ acordeón glass; ticket/chat composer glass.

**Funcionalidad intacta:** FAQ expand, link externo mock, ticket, conversación.

---

### 4.20 Configuración y seguridad

**Rutas:** `settings/index.tsx`, `password.tsx`, `nip.tsx`, `accounts.tsx`

**Cambios:** filas glass; forms glass; confirmaciones destructivas mantienen rojo, no navy.

**Funcionalidad intacta:** contraseña, NIP, cuentas, logout, eliminar cuenta.

---

### 4.21 Chat interno

**Rutas:** `chat/index.tsx`, `chat/[id].tsx`

**Cambios:** lista glass; header sala glass compact; burbujas y composer igual patrón voz del colaborador; **dock oculto en conversación** (ya implementado).

**Funcionalidad intacta:** crear sala, buscar, mensajes, adjuntos.

---

### 4.22 Términos legales

**Ruta:** `legal.tsx`

**Cambios:** contenido scroll en glass; CTA aceptar navy; sello glass.

**Funcionalidad intacta:** aceptación, fecha visible.

---

## 4.23 Cobertura total · inventario exhaustivo de pantallas

**Respuesta directa:** sí, el overhaul aplica a **absolutamente todas las pantallas navegables** de `app/(paco)/`. No hay rutas excluidas. La única excepción es `index.tsx` (redirect sin UI) y `_layout.tsx` (shell, cubierto vía tab bar + canvas).

**Total:** 47 pantallas con UI + 1 shell + 1 redirect + 8 componentes transversales Paco.

### Estrategia de cobertura (dos capas)

1. **Capa automática (componentes compartidos):** migrar `layout.tsx`, `ui.tsx`, `tabbar.tsx`, `motion.tsx`, `kyc.tsx` propaga glass + navy a cualquier pantalla que use `Screen`, `Card`, `ListGroup`, `Button`, `Field`, etc. (~12 pantallas dependen casi solo de esto).
2. **Capa explícita (estilos inline):** **35 pantallas** tienen hoy `bg-white`, `bg-white/75`, `border-slate-200`, `bg-ink` o similares **fuera** de los primitives — requieren auditoría archivo por archivo en Sprint C. No basta con migrar componentes transversales.

### Inventario completo · 47 pantallas

| # | Archivo | Sección plan | Tipo migración |
| --- | --- | --- | --- |
| 1 | `welcome.tsx` | 4.1 | Explícita (cards permisos, overlay modal) |
| 2 | `login.tsx` | 4.1 | Explícita (form card, fields inline) |
| 3 | `activate.tsx` | 4.1 | Automática (Screen + Card) |
| 4 | `recover.tsx` | 4.1 | Automática |
| 5 | `help.tsx` | 4.1 / 4.19 | Explícita (hero bg-ink + FAQ) |
| 6 | `home.tsx` | 4.2 | Explícita (grid, wallet, banners, pendientes) |
| 7 | `menu.tsx` | 4.3 | Explícita (avatar, listas inline glass) |
| 8 | `profile.tsx` | 4.3 | Explícita (hero bg-ink, sheets, fields) |
| 9 | `mood.tsx` | 4.4 | Explícita (slider, chips) |
| 10 | `mood-charts.tsx` | 4.4 | Automática |
| 11 | `celebrations.tsx` | 4.5 | Automática |
| 12 | `notifications.tsx` | 4.6 | Explícita (skeleton card inline) |
| 13 | `advance.tsx` | 4.7 | Explícita (hero bg-ink) |
| 14 | `expenses.tsx` | 4.7 | Explícita (hero bg-ink + card inline) |
| 15 | `topups.tsx` | 4.7 | Explícita (grid operadores, chips monto) |
| 16 | `services.tsx` | 4.7 | Automática + RadioOption/KYC |
| 17 | `comms/index.tsx` | 4.8 | Automática |
| 18 | `comms/[id].tsx` | 4.8 | Automática |
| 19 | `surveys/index.tsx` | 4.9 | Automática |
| 20 | `surveys/[id].tsx` | 4.9 | Explícita (chips respuesta bg-ink) |
| 21 | `voice/index.tsx` | 4.10 | Explícita (adjunto preview, categorías) |
| 22 | `voice/status.tsx` | 4.10 | Explícita (search bar, filtros) |
| 23 | `voice/[id].tsx` | 4.10 | Explícita (header/composer custom, no Screen) |
| 24 | `recognitions.tsx` | 4.11 | Explícita (medallas, búsqueda, listas) |
| 25 | `requests/index.tsx` | 4.12 | Explícita (catálogo tiles slate) |
| 26 | `requests/new.tsx` | 4.12 | Explícita (hero bg-ink, wizard fields) |
| 27 | `requests/[id].tsx` | 4.12 | Explícita (timeline, comentarios) |
| 28 | `wellness/index.tsx` | 4.13 | Explícita → `GlassModuleTile` |
| 29 | `wellness/[id].tsx` | 4.13 | Explícita (player, search) |
| 30 | `document-requests.tsx` | 4.14 | Explícita (visor, carpetas) |
| 31 | `training/index.tsx` | 4.15 | Explícita (search, modal offline) |
| 32 | `training/[courseId]/index.tsx` | 4.15 | Explícita (lecciones, encuesta) |
| 33 | `training/[courseId]/[lessonId].tsx` | 4.15 | Explícita (video, checklist) |
| 34 | `corporate-docs.tsx` | 4.16 | Explícita (search, empty state) |
| 35 | `receipts.tsx` | 4.16 | Explícita (hero bg-ink, sheet firma) |
| 36 | `sua.tsx` | 4.16 | Explícita (visor panel) |
| 37 | `onboarding-tasks/index.tsx` | 4.17 | Automática |
| 38 | `onboarding-tasks/[id].tsx` | 4.17 | Explícita (form entregable) |
| 39 | `pin.tsx` | 4.18 | Automática |
| 40 | `support.tsx` | 4.19 | Automática |
| 41 | `settings/index.tsx` | 4.20 | Explícita (filas settings) |
| 42 | `settings/password.tsx` | 4.20 | Explícita (fields inline) |
| 43 | `settings/nip.tsx` | 4.20 | Explícita (PIN boxes) |
| 44 | `settings/accounts.tsx` | 4.20 | Explícita (sheet agregar cuenta) |
| 45 | `chat/index.tsx` | 4.21 | Explícita (search, sheet crear sala) |
| 46 | `chat/[id].tsx` | 4.21 | Explícita (header/composer custom, no Screen) |
| 47 | `legal.tsx` | 4.22 | Automática |

### Shell y componentes transversales (obligatorios)

| Archivo | Rol |
| --- | --- |
| `app/(paco)/_layout.tsx` | Canvas `#F6F8FF` + tab bar glass |
| `components/paco/glass.tsx` | Primitives (nuevo) |
| `components/paco/layout.tsx` | Card, Button, Screen, Field, GlassNavButton |
| `components/paco/ui.tsx` | ListGroup, Row, Segmented, modals, chat, charts |
| `components/paco/tabbar.tsx` | GlassDock |
| `components/paco/motion.tsx` | MorphButton navy |
| `components/paco/kyc.tsx` | Pasos KYC glass |
| `app/(storybook)/fundamentos.tsx` | Demos navy + glass |

### Gate de cierre · ninguna pantalla sin revisar

Antes de dar por terminado el overhaul, ejecutar auditoría en `app/(paco)/`:

```bash
# Debe retornar 0 coincidencias (salvo comentarios):
rg 'bg-ink|bg-white/75|bg-white/80|border-slate-200 bg-white' app/(paco)/
```

Cada coincidencia restante = pantalla incompleta. Sustituir por primitive glass o componente migrado.

---

## 5. Componentes transversales (checklist único)

El agente debe migrar estos archivos **antes** de declarar un módulo terminado:

| Componente | Archivo | Cambio |
| --- | --- | --- |
| Card default | `layout.tsx` | Delegar a `GlassSurface` |
| Button primary | `layout.tsx` | Navy `#004080` |
| GlassNavButton | `layout.tsx` | Blur real |
| Screen titles | `layout.tsx` | 32px, pb ajustado |
| ListGroup | `ui.tsx` | Glass wrapper |
| Row | `ui.tsx` | Fondo hover glass |
| Segmented | `ui.tsx` | Track glass, pill blanca |
| SelectChip | `ui.tsx` | GlassChip activo navy |
| RadioOption | `ui.tsx` | Borde navy seleccionado |
| ToggleRow | `ui.tsx` | Track navy |
| ToastHost | `ui.tsx` | Glass dark compact |
| StepHeader | `ui.tsx` | Navy glass |
| SuccessCard | `ui.tsx` | Glass elevated + confetti |
| ConfirmSheet | `ui.tsx` | Glass elevated |
| ChatBubble | `ui.tsx` | Propia navy glass |
| **GlassModuleTile** ⭐ | `glass.tsx` | Icono 44–48px, título 17–18px, sin subtitle UI, glass |
| MorphButton | `motion.tsx` | Variante primary navy |
| PacoTabBar | `tabbar.tsx` | Glass dock; **mantener labels** |
| Storybook | `(storybook)/*` | Sección Glass + ModuleTile + color navy |

---

## 6. Orden de ejecución recomendado

### Sprint A — Sistema (bloqueante)

1. Tokens `#004080` en tailwind + theme.
2. Crear `components/paco/glass.tsx` incluyendo **`GlassModuleTile`**.
3. Migrar **`home.tsx` grid módulos** ⭐ (impacto inmediato visible).
4. Migrar `layout.tsx` (Card, Button, Screen, GlassNavButton).
5. Pulido glass `tabbar.tsx` (**sin quitar labels**).
6. Storybook: fundamentos + demo `GlassModuleTile`.

### Sprint B — Heroes negro + catálogos grid

1. `home.tsx` wallet + banners + pendientes glass.
2. `wellness/index.tsx` → `GlassModuleTile`.
3. `topups.tsx` operadores → tiles glass icono grande.
4. `requests/new.tsx` ⭐ hero Vacaciones.
5. `advance.tsx`, `expenses.tsx`, `profile.tsx`, `help.tsx`, `receipts.tsx`.

### Sprint C — Resto de módulos

Seguir orden sección 4 sin saltar funcionalidades.

### Sprint D — QA visual

- Recorrer `docs/claude-fable/acceptance-checklist.md` — ningún ítem funcional roto.
- Verificar contraste texto.
- Verificar dock en web iOS Android (blur o fallback).
- `npm run typecheck`.
- Registrar en `docs/paco-ux-decisions.md` sección **Visual 5.0 · Navy Glass**.

---

## 7. Criterios de aceptación

### Globales

- [ ] Color primario oscuro es `#004080`, no carbón `#1E1E1E`, en CTAs y heroes.
- [ ] Glass visible: blur en web; blur nativo o fallback documentado.
- [ ] **Home grid: 0 subtítulos visibles** en tiles de módulo; iconos ≥44px; títulos ≥17px.
- [ ] **`GlassModuleTile` reutilizado** en wellness y catálogos grid equivalentes.
- [ ] Subtítulos mock conservados en `moduleRegistry` + `accessibilityLabel`.
- [ ] Tab bar **conserva labels** (no confundir con menú Home).
- [ ] Títulos `Screen` ≥32px en módulos internos.
- [ ] Ninguna funcionalidad del checklist funcional eliminada.
- [ ] `npm run typecheck` pasa.
- [ ] **Las 47 pantallas del inventario §4.23 revisadas** (automática + explícita).
- [ ] **Auditoría grep §4.23 retorna 0** anti-patrones (`bg-ink`, `bg-white/75`, `border-slate-200 bg-white`).

### Por módulo

- [ ] Todas las rutas listadas en sección 4 **y tabla §4.23** revisadas.
- [ ] No quedan `Card className="... bg-ink"` en `(paco)`.
- [ ] Listas usan patrón glass unificado.
- [ ] Botones primarios navy consistentes.
- [ ] Pantallas con layout custom (`chat/[id]`, `voice/[id]`) migradas explícitamente (no dependen de `Screen`).

### Anti-patrones prohibidos

- ❌ Añadir glass copiando `bg-white/75` sin primitive.
- ❌ Dejar heroes negros carbón.
- ❌ Quitar textos funcionales (descripciones de módulo, alerts, legales) — solo mejorar contenedor.
- ❌ Romper navegación tab bar.
- ❌ Instalar deps nativas sin documentar en plan/limitaciones.

---

## 8. Prompt listo para agente implementador

Copiar y usar:

> Implementa el overhaul visual de Paco App según `docs/paco-glass-visual-overhaul-plan.md`. Prioridad #1: crear `GlassModuleTile` y migrar el **grid de módulos del Home** (`home.tsx`): iconos 44–48px, títulos 17–18px, **eliminar subtítulos visibles** (conservar en `accessibilityLabel`), tiles con glass real. Color oscuro primario `#004080`. Aplicar el mismo patrón en `wellness/index.tsx` y catálogos grid similares. **No quitar labels del tab bar inferior.** Luego heroes `GlassHero` en solicitudes/advance/etc. No elimines funcionalidades ni lógica de store/navegación. Verifica `npm run typecheck`.

---

## 9. Registro de avance (plantilla)

El agente debe completar una fila por módulo en `docs/paco-ux-decisions.md` o tabla propia:

| Módulo | Rutas | Glass aplicado | Navy OK | Tab/Dock N/A | Funcionalidad verificada | Notas |
| --- | --- | --- | --- | --- | --- | --- |
| Solicitudes | new, index, [id] | ☐ | ☐ | ☐ | ☐ | Prioridad screenshot |
| … | | | | | | |

---

## 10. Limitaciones conocidas

- **NativeWind + blur:** `backdrop-filter` solo web. Nativo requiere `expo-blur` para paridad real.
- **Performance:** no anidar más de 2 BlurView por pantalla; preferir un blur en contenedor padre.
- **Marca PDF vs cliente:** `#004080` es instrucción del cliente para oscuro primario; convive con azul Paco `#2F42CB` para links/acentos. Documentar en UX decisions.
