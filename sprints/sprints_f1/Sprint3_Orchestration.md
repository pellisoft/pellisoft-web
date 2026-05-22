# Sprint 3 — Orchestration Document
## Orquestación de Agentes · Services Bento Grid & "Cómo Trabajamos"

> **Sprint:** 3 — Services Bento Grid & How We Work  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Prerequisito:** Sprint 2 ✅ COMPLETADO  
> **Estado:** En ejecución

---

## Índice

1. [Notas de calidad del sprint anterior](#1-notas-de-calidad-del-sprint-anterior)
2. [Mapa de responsabilidades por agente](#2-mapa-de-responsabilidades-por-agente)
3. [Plan de ejecución y dependencias](#3-plan-de-ejecución-y-dependencias)
4. [Agent 03 — Web Designer / UI Expert](#4-agent-03--web-designer--ui-expert)
5. [Agent 04 — Frontend Expert](#5-agent-04--frontend-expert)
6. [Criterios de aceptación compartidos](#6-criterios-de-aceptación-compartidos)
7. [Flujo de validación del sprint](#7-flujo-de-validación-del-sprint)

---

## 1. Notas de calidad del sprint anterior

> **Feedback del Orquestador — mejoras obligatorias a implementar en Sprint 3:**

### FIX-01 — Layout full-width: la web se ve concentrada en el centro
**Problema:** Las secciones usan `max-w-7xl mx-auto` en el wrapper raíz, haciendo que el contenido aparezca centrado con márgenes vacíos en monitores grandes. Las secciones deben ocupar el **100% del ancho de pantalla** como fondo, con el contenido centrado solo en el interior.

**Solución obligatoria para Sprint 3 y corrección retroactiva de Sprint 2:**
```
PATRÓN CORRECTO:
<section class="w-full bg-carbon">                    ← sección 100% ancho
  <div class="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">  ← contenido centrado
    ...
  </div>
</section>

PATRÓN INCORRECTO (a eliminar):
<section class="mx-auto max-w-7xl ...">              ← NO centrar la sección
```

El navbar ya es correcto (`fixed top-0 left-0 right-0`). HeroSection necesita revisar que el `<section>` sea `w-full` y que el background gradient cubra todo el viewport, no solo el contenedor.

### FIX-02 — Logo: tamaño y proporciones
**Problema:** El logo `logo-azul.png` puede verse desproporcionado si la imagen tiene dimensiones no cuadradas. `width={120} height={32}` fuerza un aspect-ratio que puede no corresponder al real.

**Solución:**
```typescript
// Usar width y height reales del archivo, con h-8 w-auto
<Image
  src="/logos/logo-azul.png"
  alt="Pellisoft"
  width={160}   // Ancho mayor para logos horizontales
  height={40}
  className="h-7 w-auto object-contain"
  priority
/>
```
Verificar dimensiones reales del PNG antes de asignar width/height.

### FIX-03 — HeroSection: corrección del layout full-width
La sección Hero debe garantizar que:
- `<section>` ocupa `w-full min-h-screen` 
- El fondo radial gradiente cubre **toda la pantalla** (`absolute inset-0` ya es correcto)
- No hay `max-w-7xl` a nivel de `<section>`, solo a nivel del `<div>` interno

---

## 2. Mapa de responsabilidades por agente

| User Story / Fix | Título | Agente responsable | Agente soporte |
|---|---|---|---|
| FIX-01, FIX-02, FIX-03 | Correcciones retroactivas Sprint 2 | **Agent 04** | Agent 03 (review) |
| US-15 | Bento Grid — Estructura y layout | **Agent 04** | Agent 03 (specs) |
| US-16 | Card — Sistemas MES Industrial | **Agent 04** | Agent 03 (specs SVG icono) |
| US-17 | Card — TPV Inteligente | **Agent 04** | Agent 03 (specs SVG icono) |
| US-18 | Card — Facturación SaaS | **Agent 04** | Agent 03 (specs SVG icono) |
| US-19 | Componente Card reutilizable | **Agent 04** | Agent 03 (props interface) |
| US-20 | Scroll reveal en Servicios | **Agent 04** | — |
| US-21 | Sección "Cómo Trabajamos" | **Agent 04** | Agent 03 (specs layout) |
| US-22 | Responsive Servicios + Proceso | **Agent 04** | — |
| — | Iconos SVG para las 3 cards | **Agent 03** | — |
| — | Review visual final | **Agent 03** | — |

---

## 3. Plan de ejecución y dependencias

```
[FASE 0 — Agent 04: Correcciones Sprint 2 (obligatorio primero)]
    FIX-01: Patrón w-full en todas las secciones existentes
    FIX-02: Dimensiones correctas del logo en Navbar
    FIX-03: Verificar HeroSection full-width

[FASE A — Agent 03: Iconos SVG y specs de cards]  ← paralelo con Fase 0
    Icono MES (planta industrial / nodos conectados)
    Icono TPV (pantalla / monitor con señal)
    Icono Facturación (documento con circuito)
    Specs layout Bento Grid
    Specs "Cómo Trabajamos"

[FASE B — Agent 04: Componentes nuevos]  ← depende de Fase 0 + Fase A
    US-19  →  components/ui/Card.tsx (componente base)
    US-16/17/18  →  datos de servicios en ServicesSection
    US-15 + US-20  →  components/sections/ServicesSection.tsx
    US-21 + US-22  →  components/sections/HowWeWorkSection.tsx
    Actualizar app/page.tsx

[FASE C — Agent 03: Review visual final]
    Verificar coherencia visual
    Documentar ajustes
```

---

## 4. Agent 03 — Web Designer / UI Expert

### Contexto de rol
En este sprint Agent 03 produce los iconos SVG inline para las cards de servicios y las especificaciones de layout del Bento Grid y "Cómo Trabajamos". Los iconos deben ser minimalistas, de trazo fino (no fill sólido), coherentes entre sí.

### Tareas asignadas

#### TASK-03-J · Icono SVG — Sistemas MES Industrial

```
SVG: viewBox="0 0 40 40", stroke solo (no fill sólido), strokeWidth=1.5
Color: currentColor (hereda del CSS, facilita hover)

Descripción: Planta industrial con nodos conectados
Elementos:
  — 3 rectángulos pequeños (máquinas/estaciones): 
      rect (4,20,8,12) | rect (16,16,8,16) | rect (28,10,8,22)
      Representan una línea de producción con escalado ascendente
  — Líneas de conexión entre las 3 estaciones (a nivel de top):
      line (12,24) → (16,20) | line (24,20) → (28,14)
  — Pequeño ícono de señal/onda sobre la estación central:
      path "M 18,12 Q 20,10 22,12" (arco de onda)
  — Línea base horizontal: line (2,32) → (38,32)
Estilo: trazo fino tech, minimalista industrial
```

#### TASK-03-K · Icono SVG — TPV Inteligente

```
SVG: viewBox="0 0 40 40", stroke solo, strokeWidth=1.5
Color: currentColor

Descripción: Pantalla de punto de venta con señal wifi
Elementos:
  — Monitor/pantalla: rect (4,8,32,22) rx=2 (marco)
  — Pantalla interior: rect (7,11,26,16) rx=1 (pantalla interna, más pequeño)
  — Base del monitor: rect (14,30,12,4) + line (10,34)→(30,34)
  — Símbolo de señal wifi dentro de la pantalla:
      3 arcos concéntricos centrados en (20,26): r=3, r=6, r=9 (solo parte superior)
  — Punto central debajo del wifi: circle (20,26) r=1.5
Estilo: tecnológico, punto de venta moderno
```

#### TASK-03-L · Icono SVG — Facturación SaaS

```
SVG: viewBox="0 0 40 40", stroke solo, strokeWidth=1.5
Color: currentColor

Descripción: Documento de factura con circuito/nube
Elementos:
  — Documento base: rect (8,4,20,32) rx=2
  — Esquina doblada (efecto página): path "M 28,4 L 28,10 L 34,10" 
    con línea diagonal M(28,4) L(34,10)
  — Líneas de contenido (texto de factura):
      line (12,14)→(24,14) | line (12,18)→(20,18) | line (12,22)→(22,22)
  — Símbolo euro/moneda en la zona inferior del documento: 
      text o path simplificado "€" a (16,30) tamaño pequeño
  — Icono nube pequeño conectado con línea punteada a la esquina superior derecha:
      path de nube simple a (32,6) con línea (28,8)→(32,8)
Estilo: profesional, SaaS, documento + conectividad
```

#### TASK-03-M · Specs del Bento Grid

```
BENTO GRID SPECS
════════════════

Desktop (lg: ≥ 1024px):
  grid-template-columns: 2fr 1fr
  grid-template-rows: 1fr 1fr
  gap: 16px (gap-4)

  Card MES:     grid-column: 1 / 2  |  grid-row: 1 / 3  (rowspan 2)
  Card TPV:     grid-column: 2 / 3  |  grid-row: 1 / 2
  Card Factura: grid-column: 2 / 3  |  grid-row: 2 / 3

  Altura mínima del grid: 480px (las 2 filas juntas)
  La card MES es visualmente dominante (ocupa toda la altura izquierda)

Tablet (md: 640px–1024px):
  grid-template-columns: 1fr 1fr
  grid-template-rows: auto
  gap: 16px
  Todas las cards en grid 2×2, MES ocupa col-span-2 en fila 1

Mobile (< 640px):
  grid-template-columns: 1fr
  gap: 12px
  Todas las cards en columna, misma altura auto

Card base (all):
  background: #111318 (slate_dark)
  border-radius: 16px (rounded-2xl)
  padding: 28px (p-7)
  border: 1px solid + color de acento al 25% (según glowColor)
  transition: all 200ms ease
  cursor: pointer

Card hover (all):
  transform: translateY(-4px)
  border-color: acento al 60%
  box-shadow: 0 0 28px color_acento al 25%
```

#### TASK-03-N · Specs "Cómo Trabajamos"

```
HOW WE WORK SECTION SPECS
══════════════════════════

Fondo: bg-carbon (negro carbón, mismo que hero)
Padding: py-20 lg:py-28
Separador visual superior: línea 1px border-encina/20

Título: "Cómo trabajamos"
  font-heading, text-4xl, font-bold, text-white_soft
  text-center

Subtítulo: "Un proceso claro, de principio a fin"
  font-body, text-lg, text-muted_light, text-center, mt-3, mb-16

Layout de 4 pasos — Desktop:
  4 columnas iguales (grid-cols-4)
  Línea conectora horizontal entre columnas (border-dashed border-muted/30)
    → implementar como ::after o elemento absoluto
  
Layout de 4 pasos — Mobile:
  1 columna
  Línea conectora vertical izquierda (border-l-2 border-dashed)

Cada paso:
  Número decorativo: "01" ... "04"
    font-mono, text-6xl, font-bold, color tech_blue al 20% opacidad
    position: absolute, top-left de la card de paso
  
  Icono Lucide (40px, strokeWidth=1.5):
    01 → <Microscope /> (Análisis)
    02 → <PenLine /> (Diseño)
    03 → <Code2 /> (Desarrollo)
    04 → <TrendingUp /> (Escalado)
  
  Número visible "01"-"04": font-mono, text-sm, text-tech_blue_light, mb-3
  Título: font-heading, text-xl, font-semibold, text-white_soft, mb-2
  Descripción: font-body, text-sm, text-muted_light, leading-relaxed

Animación scroll reveal (stagger 0.2s entre pasos):
  whileInView: { opacity: 0,y:20 } → { opacity:1, y:0 }
  viewport: { once: true, amount: 0.3 }
```

---

## 5. Agent 04 — Frontend Expert

### Contexto de rol
Agent 04 implementa todos los componentes de este sprint. Primero corrige los problemas visuales del Sprint 2 (FIX-01/02/03), luego implementa los nuevos componentes siguiendo las specs de Agent 03.

### Tareas asignadas

#### TASK-04-F · FIX-01/02/03 — Correcciones Sprint 2

**FIX-01 — Layout full-width en HeroSection:**
- Verificar que `<section>` en HeroSection tiene `w-full` (no `max-w-*`)
- El fondo gradiente debe cubrir 100% del viewport
- Solo el `<div>` interior lleva `max-w-7xl mx-auto`

**FIX-02 — Logo Navbar con dimensiones correctas:**
- Cambiar a `width={160} height={40}` con `className="h-7 w-auto object-contain"`
- Asegurar que el logo se ve nítido en retina (no escalado forzado)

**FIX-03 — Patrón section full-width:**
Todas las secciones del proyecto siguen el patrón:
```tsx
<section id="..." className="w-full bg-[color] py-20">
  <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
    {/* contenido */}
  </div>
</section>
```

---

#### TASK-04-G · `components/ui/Card.tsx`
**User Story:** US-19

Interface:
```typescript
interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  glowColor: 'blue' | 'purple' | 'arcilla' | 'encina'
  badge?: string
  size?: 'sm' | 'lg'
  className?: string
}
```

Mapeo de `glowColor`:
```typescript
const glowMap = {
  blue:    { border: 'border-tech_blue/25',   hover: 'hover:border-tech_blue/60',   shadow: '0 0 28px rgba(30,64,175,0.25)',    bg: 'rgba(30,64,175,0.04)' },
  purple:  { border: 'border-tech_purple/25', hover: 'hover:border-tech_purple/60', shadow: '0 0 28px rgba(124,58,237,0.25)',   bg: 'rgba(124,58,237,0.04)' },
  arcilla: { border: 'border-arcilla/25',     hover: 'hover:border-arcilla/60',     shadow: '0 0 28px rgba(193,68,14,0.25)',    bg: 'rgba(193,68,14,0.04)' },
  encina:  { border: 'border-encina/25',      hover: 'hover:border-encina/60',      shadow: '0 0 28px rgba(45,80,22,0.25)',     bg: 'rgba(45,80,22,0.04)' },
}
```

Usar Framer Motion `whileHover={{ y: -4 }}` + estado `isHovered` para shadow condicional.
`"use client"` requerido.

---

#### TASK-04-H · `components/sections/ServicesSection.tsx`
**User Stories:** US-15, US-16, US-17, US-18, US-20

- Sección full-width `w-full bg-slate_dark`
- Título de sección con gradiente de texto sutil
- Bento Grid con CSS Grid: `lg:grid-cols-[2fr_1fr]` + `grid-rows-2` con altura mínima
- Card MES: `lg:row-span-2`, fondo con gradiente azul muy sutil
- Cards TPV y Facturación: altura igual, fondo con gradientes morado y arcilla
- Iconos SVG inline de Agent 03
- Scroll reveal con `whileInView` + stagger
- ID: `id="servicios"`

---

#### TASK-04-I · `components/sections/HowWeWorkSection.tsx`
**User Stories:** US-21, US-22

- Sección full-width `w-full bg-carbon`
- Separador visual superior
- Grid 4 columnas desktop / 1 columna mobile
- Líneas conectoras entre pasos
- Iconos Lucide: Microscope, PenLine, Code2, TrendingUp
- Scroll reveal con stagger 0.2s
- ID: `id="proceso"`

---

#### TASK-04-J · Actualizar `app/page.tsx`

Añadir los nuevos componentes:
```typescript
import ServicesSection from '@/components/sections/ServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
```
Montar en el orden correcto: Navbar → Hero → Servicios → Proceso → ...

---

### Criterios de aceptación de Agent 04

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run build` → exitoso
- [ ] Secciones ocupan 100% del ancho de pantalla
- [ ] Logo visible sin pixelación
- [ ] Bento Grid: 1 card grande izquierda + 2 medianas derecha en desktop
- [ ] Hover de cards funciona con elevación + glow
- [ ] 4 pasos de "Cómo trabajamos" visibles con stagger
- [ ] Responsive correcto en 390px / 820px / 1440px

---

## 6. Criterios de aceptación compartidos

| Criterio | Agente verificador |
|---|---|
| Secciones 100% ancho pantalla | Agent 03 + Agent 04 |
| Logo proporciones correctas | Agent 03 |
| 3 cards con glow diferenciado (azul/morado/arcilla) | Agent 03 |
| Badge verde encina en card MES | Agent 03 |
| Bento Grid coherente con mockup | Agent 03 |
| Iconos SVG consistentes entre sí | Agent 03 |
| Build TypeScript limpio | Agent 04 |
| prefers-reduced-motion respetado | Agent 04 |
| Sin valores hardcodeados fuera de tokens | Agent 04 |

---

## 7. Flujo de validación del sprint

```
Agent 04 aplica FIX-01/02/03 (correcciones Sprint 2)
Agent 03 produce iconos SVG + specs Bento Grid + specs HowWeWork
    ↓ (paralelo)
Agent 04 implementa:
    Card.tsx → ServicesSection.tsx → HowWeWorkSection.tsx → page.tsx
    ↓
npx tsc --noEmit ✓ + npm run build ✓
    ↓
Agent 03 review visual
    ↓
Sprint 3 DONE ✓
```

---

## Artefactos esperados al finalizar el Sprint

| Artefacto | Agente | Estado |
|---|---|---|
| FIX-01/02/03 aplicados | Agent 04 | ⬜ Pendiente |
| Iconos SVG para 3 cards | Agent 03 | ⬜ Pendiente |
| `components/ui/Card.tsx` (ServiceCard) | Agent 04 | ⬜ Pendiente |
| `components/sections/ServicesSection.tsx` | Agent 04 | ⬜ Pendiente |
| `components/sections/HowWeWorkSection.tsx` | Agent 04 | ⬜ Pendiente |
| `app/page.tsx` actualizado | Agent 04 | ⬜ Pendiente |
| Review visual Agent 03 | Agent 03 | ⬜ Pendiente |

---

> **Nota del Orquestador:** Este sprint añade la primera "carne" de contenido a la web. El Bento Grid es el elemento visual más sofisticado hasta ahora. Las correcciones de FIX-01/02/03 son obligatorias antes de implementar los nuevos componentes — sin layout full-width correcto, todos los componentes futuros heredarán el problema.
