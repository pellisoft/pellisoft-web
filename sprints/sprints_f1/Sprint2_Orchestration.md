# Sprint 2 — Orchestration Document
## Orquestación de Agentes · Navbar & Hero Section

> **Sprint:** 2 — Navbar & Hero Section  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Prerequisito:** Sprint 1 ✅ COMPLETADO  
> **Estado:** En ejecución

---

## Índice

1. [Mapa de responsabilidades por agente](#1-mapa-de-responsabilidades-por-agente)
2. [Plan de ejecución y dependencias](#2-plan-de-ejecución-y-dependencias)
3. [Agent 03 — Web Designer / UI Expert](#3-agent-03--web-designer--ui-expert)
4. [Agent 04 — Frontend Expert](#4-agent-04--frontend-expert)
5. [Criterios de aceptación compartidos](#5-criterios-de-aceptación-compartidos)
6. [Flujo de validación del sprint](#6-flujo-de-validación-del-sprint)

---

## 1. Mapa de responsabilidades por agente

| User Story | Título | Agente responsable | Agente soporte |
|---|---|---|---|
| US-09 | Navbar con glassmorphism | **Agent 04** | Agent 03 (specs visuales) |
| US-10 | Hero Section — estructura y layout | **Agent 04** | Agent 03 (specs visuales) |
| US-11 | Animación de texto rotativo | **Agent 04** | Agent 03 (specs timing) |
| US-12 | Isotipo "P" animado (SVG + GSAP) | **Agent 04** | Agent 03 (diseño SVG) |
| US-13 | Animación de entrada del Hero | **Agent 04** | Agent 03 (curvas / timing) |
| US-14 | Responsive del Hero | **Agent 04** | Agent 03 (breakpoints) |
| — | Especificaciones visuales detalladas | **Agent 03** | — |
| — | Review visual final | **Agent 03** | — |

### Leyenda
- **Responsable**: ejecuta la tarea y entrega el artefacto de código
- **Soporte**: define las especificaciones visuales previas, revisa el resultado

---

## 2. Plan de ejecución y dependencias

```
[FASE A — Agent 03: Especificaciones visuales]
    Diseño SVG del isotipo "P" (forma + gradiente + nodos)
    Especificaciones glassmorphism Navbar
    Timing y curvas de animación para entrada del Hero
        ↓

[FASE B — Agent 04: Implementación de componentes]  ← depende de Fase A
    US-09  →  components/layout/Navbar.tsx
    US-11  →  components/ui/AnimatedText.tsx
    US-12  →  components/ui/PIsotype.tsx
        ↓
    US-10 + US-13 + US-14  →  components/sections/HeroSection.tsx
        ↓
    Actualizar app/page.tsx para montar los componentes
        ↓

[FASE C — Agent 03: Review visual]
    Verificar que el resultado visual coincide con las specs
    Documentar ajustes en el Summary
```

**Regla de orquestación:**
- Agent 04 NO inicia la implementación hasta que Agent 03 entrega las specs del SVG de la "P"
- Los componentes `AnimatedText` y `PIsotype` deben estar terminados antes de `HeroSection`
- El `Navbar` puede construirse en paralelo con `AnimatedText`

---

## 3. Agent 03 — Web Designer / UI Expert

### Contexto de rol
Agent 03 actúa como **diseñador UI** en este sprint. Antes de que Agent 04 escriba código, Agent 03 entrega las especificaciones precisas del sistema visual para el Navbar y la Hero Section. Sus outputs son las instrucciones que Agent 04 implementa.

### Tareas asignadas

#### TASK-03-F · Especificaciones del Navbar
**Prioridad:** Crítica (bloqueante para Agent 04)

**Output esperado:**

```
NAVBAR SPECS — Pellisoft
════════════════════════

Layout:
  height: 64px desktop / 56px mobile
  padding: 0 24px (md: 0 48px, lg: 0 80px)
  position: fixed, top: 0, left: 0, right: 0, z-index: 50

Estado INICIAL (scrollY === 0):
  background: transparent
  border-bottom: none
  backdrop-filter: none

Estado SCROLL (scrollY > 20):
  background: rgba(10, 10, 10, 0.80)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  border-bottom: 1px solid rgba(59, 130, 246, 0.15)
  transition: all 300ms ease

Logo:
  src: /logos/logo-azul.png
  height: 32px desktop / 28px mobile
  alt: "Pellisoft"

Links (desktop):
  font: Inter 500, 14px
  color: #9CA3AF (muted_light) → #F5F5F5 en hover
  gap: 32px entre links
  transition: color 150ms ease
  items: Servicios · Proyectos · ADN · Contacto

CTA "Hablar con Pellisoft":
  background: linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)
  color: #F5F5F5
  padding: 8px 20px
  border-radius: 6px
  font: Inter 500, 14px
  hover: brightness(1.1) + scale(1.02), transition 200ms
  arrow icon: Lucide ArrowRight, 16px

Mobile (< 768px):
  Ocultar links y CTA
  Mostrar icono: Lucide Menu, 24px, color white_soft
  Panel lateral derecho:
    width: 280px
    background: rgba(10, 10, 10, 0.95)
    backdrop-filter: blur(20px)
    border-left: 1px solid rgba(45, 80, 22, 0.3)
    padding: 80px 32px 32px
    animation: slide desde x:280 → x:0, duration 300ms ease
    links: Inter 500, 18px, gap 24px vertical
    CTA dentro del panel, ancho completo
```

---

#### TASK-03-G · Especificaciones del Isotipo SVG "P"
**Prioridad:** Crítica (bloqueante para US-12)

**Output esperado — SVG Isotipo "P":**

```
ISOTYPE SVG SPECS — Pellisoft "P"
══════════════════════════════════

ViewBox: 0 0 200 240
Dimensiones usadas: 280px desktop / 200px tablet / 160px como fondo mobile

Forma principal de la "P":
  — Rectángulo vertical izquierdo:
      x: 20, y: 20, width: 36, height: 200
      rx: 8 (bordes redondeados)
  — Arco superior (cuerpo de la P):
      Centro base: (56, 20)
      Arco semicircular hacia (56, 120)
      Grosor del arco: 36px
      → Equivale a un path que forma la "barriga" de la P

Fill: url(#gradientTech)
  gradientTech:
    linearGradient x1="0%" y1="0%" x2="100%" y2="100%"
    stop 0%:   #1E40AF (tech_blue)
    stop 100%: #7C3AED (tech_purple)

Líneas de circuito (circuit lines):
  — 4 líneas finas (stroke: rgba(59,130,246,0.35), strokeWidth: 1.5)
  — Emanan desde los bordes derecho e inferior de la "P"
  — Longitudes: 40px, 60px, 30px, 50px
  — Con pequeño codo (L path) al final

Nodos (data nodes):
  — 6 círculos pequeños
  — Posiciones: distribuidas alrededor de la "P" en las puntas de las líneas de circuito
  — Tamaños: r: 4px (small) o r: 6px (medium)
  — Colores:
      2 nodos: #3B82F6 (tech_blue_light)
      2 nodos: #A855F7 (tech_purple_light)
      1 nodo:  #C1440E (arcilla) ← el más prominente
      1 nodo:  #4A7C2F (encina_light) ← sutil

Glow layer (detrás de la "P"):
  — Ellipse: cx:100, cy:120, rx:80, ry:100
  — Fill: #3B82F6, opacity: 0.08
  — filter: blur(24px)
  — Animado: opacity 0.06 ↔ 0.14, duration 4s, ease-in-out, infinite (glow pulse)

Animaciones GSAP en los nodos:
  — gsap.to(cada nodo, { y: random(-8,8), duration: random(2,4), repeat:-1, yoyo:true, stagger:0.3 })
  — Respetar prefers-reduced-motion: if(reducedMotion) return (sin inicializar GSAP)
```

---

#### TASK-03-H · Especificaciones de animaciones de entrada del Hero
**Prioridad:** Alta

```
HERO ENTRANCE ANIMATION SPECS
══════════════════════════════

Container: staggerChildren: 0.12s, delayChildren: 0.1s

Variante de cada hijo (badge, h1, subclaim, ctas):
  hidden:  { opacity: 0, y: 24 }
  visible: { opacity: 1, y: 0 }
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }

Isotipo (columna derecha):
  hidden:  { opacity: 0, x: 40 }
  visible: { opacity: 1, x: 0 }
  transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }

Trigger: viewport once:true, amount: 0.1

prefers-reduced-motion:
  Si reducedMotion === true → omitir variants, renderizar directamente visible
```

---

#### TASK-03-I · Review visual final (post-implementación)
**Prioridad:** Alta  
**Depende de:** Agent 04 implementación completa

Verificar que la implementación cumple:
- [ ] El color de fondo del Hero es exactamente `#0A0A0A`
- [ ] El glassmorphism del Navbar es visible y correcto en scroll
- [ ] Los gradientes de la "P" y el CTA usan `tech_blue` → `tech_purple`
- [ ] El texto rotativo usa `tech_blue_light` (`#3B82F6`)
- [ ] La animación de entrada es fluida, sin saltos
- [ ] Ningún color hardcodeado fuera de los tokens de `tailwind.config.ts`

---

## 4. Agent 04 — Frontend Expert

### Contexto de rol
Agent 04 actúa como **UI Engineer** en este sprint. Implementa en código React/TypeScript todos los componentes visuales especificados por Agent 03. Prioriza: código limpio, tipado estricto, accesibilidad básica y rendimiento.

### Tareas asignadas

#### TASK-04-A · `components/ui/AnimatedText.tsx`
**Prioridad:** Alta (requerido por HeroSection)  
**User Story:** US-11

Componente de texto rotativo con Framer Motion `AnimatePresence`:
- Array de palabras: `["Sistemas MES", "Facturación SaaS", "TPV Inteligente", "Automatización"]`
- Intervalo de rotación: 2500ms
- Transición: opacity 0→1 + y: -10→0 / 0→-10 en salida
- Color de la palabra activa: `text-tech_blue_light`
- Respeta `prefers-reduced-motion` de Framer Motion

**Interface del componente:**
```typescript
interface AnimatedTextProps {
  words?: string[]
  interval?: number
  className?: string
}
```

---

#### TASK-04-B · `components/ui/PIsotype.tsx`
**Prioridad:** Alta (requerido por HeroSection)  
**User Story:** US-12

SVG inline del isotipo "P" con animaciones GSAP:
- Importación dinámica de GSAP (solo en cliente, solo si no reduced-motion)
- SVG responsive: recibe prop `size` (número) que controla viewBox
- Glow layer animado con la animación `glow-pulse` de Tailwind CSS
- 6 nodos flotantes animados individualmente con GSAP
- `"use client"` requerido

**Interface:**
```typescript
interface PIsotypeProps {
  size?: number      // default: 280
  className?: string
}
```

---

#### TASK-04-C · `components/layout/Navbar.tsx`
**Prioridad:** Alta  
**User Story:** US-09

Navbar sticky con:
- `"use client"` — necesita `useScroll` de Framer Motion y estado del menú móvil
- Detección de scroll con `scrollY > 20` para activar glassmorphism
- Logo con `next/image`
- Links desktop ocultos en `< md`
- Hamburger `Menu` icon de Lucide en `< md`
- Panel lateral móvil con `AnimatePresence` + `motion.div` slide desde la derecha
- CTA con gradiente tech
- Scroll suave a anclas al hacer click en links

---

#### TASK-04-D · `components/sections/HeroSection.tsx`
**Prioridad:** Alta  
**User Story:** US-10, US-13, US-14

Sección principal que orquesta:
- Grid 2 columnas en `lg:`, 1 columna en móvil
- Columna izquierda: badge + H1 + subclaim + `<AnimatedText>` + CTAs
- Columna derecha: `<PIsotype>`
- Fondo `bg-carbon` + gradiente radial `bg-gradient-hero`
- `motion.div` container con `staggerChildren` para la animación de entrada
- ID de ancla: `id="hero"`
- Altura: `min-h-screen` + padding-top para compensar el navbar fijo

---

#### TASK-04-E · Actualizar `app/page.tsx`
**Prioridad:** Media (integración final)

Montar los componentes en la página principal:
```typescript
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Sprint 3: ServicesSection */}
        {/* Sprint 3: HowWeWorkSection */}
        {/* Sprint 4: FeaturedProjectSection */}
        {/* Sprint 4: DnaSection */}
        {/* Sprint 5: ContactSection */}
      </main>
    </>
  )
}
```

---

### Criterios de aceptación de Agent 04

- [ ] `npx tsc --noEmit` → 0 errores TypeScript
- [ ] `npm run build` → build exitoso
- [ ] El navbar es `position: fixed` y visible sobre todas las secciones
- [ ] El glassmorphism se activa correctamente al hacer scroll > 20px
- [ ] El panel móvil abre y cierra sin errores de hidration
- [ ] `AnimatedText` rota correctamente con `AnimatePresence`
- [ ] `PIsotype` renderiza el SVG con gradiente azul→morado
- [ ] La animación GSAP de los nodos se inicializa sin errors de consola
- [ ] La animación de entrada del Hero ocurre una sola vez al cargar
- [ ] Sin `console.error` en runtime

---

## 5. Criterios de aceptación compartidos

| Criterio | Agente verificador |
|---|---|
| Fondo Hero es `#0A0A0A` | Agent 03 |
| Glassmorphism Navbar correcto en Chrome/Firefox | Agent 03 |
| Gradiente "P" azul→morado visible | Agent 03 |
| Sin errores TypeScript | Agent 04 |
| Build de producción exitoso | Agent 04 |
| Responsive en 390px / 820px / 1440px | Agent 04 |
| `prefers-reduced-motion` desactiva animaciones | Agent 04 |
| Sin valores hardcodeados (grep en components/) | Agent 03 |
| Logo PNG sin pixelación | Agent 03 |

---

## 6. Flujo de validación del sprint

```
Agent 03 entrega TASK-03-F (Navbar specs) + TASK-03-G (SVG specs) + TASK-03-H (animation specs)
    ↓
Agent 04 implementa en paralelo:
    → TASK-04-A: AnimatedText.tsx
    → TASK-04-B: PIsotype.tsx
    → TASK-04-C: Navbar.tsx
    ↓
Agent 04 implementa:
    → TASK-04-D: HeroSection.tsx (depende de A + B)
    → TASK-04-E: app/page.tsx (depende de C + D)
    ↓
Verificación técnica:
    → npx tsc --noEmit ✓
    → npm run build ✓
    ↓
Agent 03 review visual (TASK-03-I):
    → Comparación visual con mockup
    → Ajustes si hay desviaciones
    ↓
Sprint 2 DONE ✓
```

---

## Artefactos esperados al finalizar el Sprint

| Artefacto | Agente | Estado |
|---|---|---|
| Specs visuales Navbar | Agent 03 | ⬜ Pendiente |
| Specs SVG isotipo "P" | Agent 03 | ⬜ Pendiente |
| Specs animaciones entrada | Agent 03 | ⬜ Pendiente |
| `components/ui/AnimatedText.tsx` | Agent 04 | ⬜ Pendiente |
| `components/ui/PIsotype.tsx` | Agent 04 | ⬜ Pendiente |
| `components/layout/Navbar.tsx` | Agent 04 | ⬜ Pendiente |
| `components/sections/HeroSection.tsx` | Agent 04 | ⬜ Pendiente |
| `app/page.tsx` actualizado | Agent 04 | ⬜ Pendiente |
| Review visual Agent 03 | Agent 03 | ⬜ Pendiente |

---

> **Nota del Orquestador:** Este sprint es el de mayor impacto visual del proyecto. La primera impresión que el usuario tendrá de Pellisoft depende de este código. Ningún componente se considera "done" hasta que Agent 03 confirme que el resultado visual es coherente con la estética Industrial Tech · Dark Mode · SaaS Premium definida en `docs/architecture.md`.
