# Sprint 4 — Orchestration Document
## Orquestación de Agentes · Caso Destacado MES + Sección ADN Pellisoft

> **Sprint:** 4 — Caso Destacado MES + ADN Pellisoft  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Prerequisito:** Sprint 3 ✅ COMPLETADO  
> **Estado:** En ejecución

---

## Índice

1. [Notas carry-over de sprints anteriores](#1-notas-carry-over-de-sprints-anteriores)
2. [Mapa de responsabilidades por agente](#2-mapa-de-responsabilidades-por-agente)
3. [Plan de ejecución y dependencias](#3-plan-de-ejecución-y-dependencias)
4. [Agent 03 — Web Designer / UI Expert](#4-agent-03--web-designer--ui-expert)
5. [Agent 04 — Frontend Expert](#5-agent-04--frontend-expert)
6. [Criterios de aceptación compartidos](#6-criterios-de-aceptación-compartidos)
7. [Flujo de validación del sprint](#7-flujo-de-validación-del-sprint)

---

## 1. Notas carry-over de sprints anteriores

### FIX-04 — PIsotype: rediseño para asemejarse al logo real de Pellisoft (en morado)

**Origen:** Feedback del usuario sobre el isotipo "P" del Hero Section.

**Logo real analizado (imagen aportada):**
```
Estructura visual del logo Pellisoft:
  — Marco angular izquierdo:
      Trazo vertical (barra de la P)
      + corchete angular en la esquina superior izquierda
      Color: azul oscuro (#1E40AF)
  — Arco de circuito derecho:
      Curva que forma la "barriga" de la P mediante líneas de circuito
      Nodos/puntos en cada intersección (dots)
      Color: cian brillante (#00D9FF o similar)
  — Estilo: tech circuit board, NO relleno sólido
      Trazo doble: exterior + interior con nodos conectados
      Los arcos son líneas curvas con puntos en los extremos
```

**Requerimiento:** Rediseñar `components/ui/PIsotype.tsx` con esta misma estructura pero en paleta de proyecto:
- Marco angular: `tech_blue` (#1E40AF) — barra izquierda + corchete
- Arco de circuito + nodos: `tech_purple` (#7C3AED) y `tech_purple_light` (#A855F7)
- Glow de fondo: morado sutil
- **NO usar `fillRule="evenodd"` — usar trazos (stroke) como el logo real**

---

## 2. Mapa de responsabilidades por agente

| User Story / Fix | Título | Agente responsable | Agente soporte |
|---|---|---|---|
| FIX-04 | PIsotype rediseño fiel al logo (en morado) | **Agent 03** | Agent 04 (integración) |
| US-23 | Caso Destacado — layout y estructura | **Agent 04** | Agent 03 (specs visual) |
| US-24 | AnimatedCounter | **Agent 04** | — |
| US-25 | Scroll reveal Caso Destacado | **Agent 04** | — |
| US-26 | Sección ADN — layout y contenido | **Agent 04** | Agent 03 (specs visual) |
| US-27 | Efecto Parallax ADN | **Agent 04** | Agent 03 (specs GSAP) |
| US-28 | Footer | **Agent 04** | Agent 03 (specs layout) |
| US-29 | Responsive Caso Destacado + ADN | **Agent 04** | — |
| — | Mock dashboard MES (HTML/CSS) | **Agent 03** | — |
| — | Review visual final | **Agent 03** | — |

---

## 3. Plan de ejecución y dependencias

```
[FASE A — Agent 03: Diseño y specs]
    FIX-04: Rediseño PIsotype SVG (fiel al logo real, en morado/púrpura)
    Mock dashboard MES (visual de placeholder para FeaturedProject)
    Specs FeaturedProjectSection (layout, métricas, perspectiva 3D)
    Specs DnaSection (parallax, opacidades, valores)
    Specs Footer (estructura, logo blanco)
        ↓

[FASE B — Agent 04: Implementación]  ← depende de Fase A
    FIX-04: Integrar nuevo PIsotype en HeroSection
    US-24: AnimatedCounter.tsx
    US-23 + US-25: FeaturedProjectSection.tsx
    US-26 + US-27: DnaSection.tsx
    US-28: Footer.tsx
    US-29: Verificar responsive
    Actualizar app/page.tsx

[FASE C — Verificación]
    npx tsc --noEmit ✓
    npm run build ✓
    Agent 03 review visual
```

---

## 4. Agent 03 — Web Designer / UI Expert

### Contexto de rol
Agent 03 en este sprint tiene la tarea más crítica: rediseñar el PIsotype para que sea fiel al logo real de Pellisoft (en versión morada). Además produce los specs visuales de las dos nuevas secciones y el mock de dashboard MES.

---

### TASK-03-O · Rediseño PIsotype fiel al logo Pellisoft (en morado)

**Referencia visual del logo Pellisoft:**
```
El logo tiene:
1. BARRA VERTICAL IZQUIERDA: rectángulo/trazo vertical fino, aprox x=20-30, toda la altura
2. CORCHETE ANGULAR superior izquierdo: 
   - Línea horizontal de la barra hacia la derecha (parte superior)
   - Crea un ángulo de 90° en la esquina superior
3. ARCO DE CIRCUITO (barriga de la P):
   - NO es un semicírculo relleno
   - Son LÍNEAS de circuito (strokes) que forman 2 arcos concéntricos
   - Los arcos van desde el punto superior de la barra hasta el punto medio
   - Arco exterior + arco interior (más pequeño)
4. NODOS en cada extremo de las líneas:
   - Punto/círculo relleno en cada intersección
   - Aprox 4-5 nodos distribuidos en los extremos de los arcos
5. ESTILO: Todo stroke, strokeWidth ~3-4, sin fill en la P
```

**Código SVG a implementar en PIsotype.tsx:**
```
ViewBox: 0 0 160 200
Paleta: 
  — Estructura angular: #1E40AF (tech_blue) 
  — Arcos de circuito: gradiente #7C3AED → #A855F7 (tech_purple → light)
  — Nodos: #A855F7 (tech_purple_light) con glow

Elementos:
  1. Barra vertical izquierda (stroke, no fill):
     line x1=30 y1=20 x2=30 y2=180, strokeWidth=8, stroke="#1E40AF", strokeLinecap="round"
  
  2. Corchete superior (extensión hacia derecha desde la barra):
     — Línea horizontal: x1=30 y1=30 x2=70 y2=30, strokeWidth=8, stroke="#1E40AF"
     — Línea cortita en ángulo (efecto bracket): x1=25 y1=20 x2=55 y2=20
  
  3. Arco exterior del circuito (barriga P):
     path: M 30,30 Q 30,40 50,40 A 50,50 0 0 1 50,120 Q 30,120 30,130
     — Arco que va desde cerca del top hasta la mitad de la barra
     — strokeWidth=4, stroke="url(#gradientCircuit)"
  
  4. Arco interior (concéntrico):
     — Arco similar pero más pequeño/interior
     — strokeWidth=3, stroke="url(#gradientCircuit)", opacity=0.7
  
  5. Nodos (4-5 círculos rellenos):
     — Al inicio del arco exterior: cx=50, cy=40, r=5
     — Al final del arco exterior: cx=50, cy=120, r=5
     — Punto medio del arco exterior: cx=95, cy=80, r=6 (el más grande, el pivot)
     — Punto medio del arco interior: cx=80, cy=80, r=4
     — fill="#A855F7", con filtro glow

  6. Glow detrás (blur):
     ellipse cx=80 cy=90 rx=60 ry=70, fill="#7C3AED", opacity=0.08, blur(16px)
```

**Nota para Agent 03:** El SVG debe ser construido con `stroke` paths que representen el "esqueleto" de la P como el logo — angular bracket izquierdo + arcos de circuito a la derecha + nodos. Usa paths bezier para los arcos.

---

### TASK-03-P · Mock Dashboard MES (HTML visual para FeaturedProject)

Dado que no existe imagen PNG del dashboard en `public/images/`, crear un mock visual usando divs/SVG en React que simule un dashboard MES oscuro con:
- Barra superior con título "SISTEMA MES INDUSTRIAL"
- 3 métricas: OEE 94.2%, Producción 1450 uds, Alertas 0
- Gráfica de barras simplificada (SVG)
- Estado de línea "ACTIVA" con punto verde parpadeante

Este mock se usa como "screenshot" en `FeaturedProjectSection`.

---

### TASK-03-Q · Specs FeaturedProjectSection

```
FEATURED PROJECT SPECS
══════════════════════

Sección: w-full bg-slate_dark py-20 lg:py-28
Ancla: id="casos"

Layout desktop: grid 2 cols (text:visual = 5:7)
Layout mobile: 1 col, visual primero, texto debajo

Columna texto (izquierda):
  Eyebrow: "Caso real · Software Industrial"
    font-mono text-sm text-tech_blue_light tracking-wide
  
  H2: "Sistema MES para planta industrial"
    font-heading text-3xl font-bold text-white_soft
  
  Descripción:
    "Desarrollamos un sistema MES completo para una planta industrial aragonesa.
    Monitorización en tiempo real, control de KPIs de producción y reducción 
    drástica de paradas no planificadas."
    font-body text-muted_light
  
  Métricas (3, en fila):
    ┌──────────┬──────────────┬───────────────┐
    │  94.2%   │  1.450 uds   │      0        │
    │  OEE     │ Producción   │ Alertas cal.  │
    └──────────┴──────────────┴───────────────┘
    — Número: font-heading text-4xl font-bold
    — 94.2% → text-encina_light (verde = positivo)
    — 1450 → text-tech_blue_light
    — 0 → text-white_soft
    — Label debajo: font-mono text-xs text-muted

  CTA: "Ver más proyectos →"
    variant="outline" color tech_blue

Columna visual (derecha):
  MockDashboard component (desarrollado como JSX, no imagen)
  Borde: 1px solid encina/30
  Glow: box-shadow 0 0 40px rgba(45,80,22,0.3)
  Perspectiva inicial (desktop): rotateY=-5deg, perspective=1200px
  Hover: rotateY=0deg, transición 400ms ease
  Border-radius: rounded-xl
```

---

### TASK-03-R · Specs DnaSection + Footer

```
DNA SECTION SPECS
═════════════════

Sección: w-full bg-carbon py-32 overflow-hidden relative
Ancla: id="adn"

Fondo decorativo (parallax):
  — Logo-verde.png como elemento decorativo
  — Posición: absolute, right: -60px, top: 50%, transform translateY(-50%)
  — Tamaño: 500px × 500px  
  — Opacity: 0.06
  — Filtro: grayscale(0.3)
  — Este es el elemento que hace parallax (ref backgroundRef)

Contenido principal (z-10, max-w-2xl):
  Eyebrow: "ADN · Identidad"
    font-mono text-sm text-encina_light

  Titular línea 1: "Desde Teruel,"
    font-heading text-display font-bold text-white_soft

  Titular línea 2: "para el mundo."
    font-heading text-display font-bold text-arcilla
    (ÚNICO uso prominente del arcilla en la web)

  Párrafo 1: descripción de Pellisoft en Teruel
  Párrafo 2: forma de trabajar

  Valores (3 iconos inline de Lucide):
    MapPin → "Teruel, España"
    Cpu → "Precisión técnica"
    Users → "Trato cercano"

FOOTER SPECS
════════════

Footer: w-full bg-slate_dark border-t border-tech_blue/15
Padding: py-8 px-6

Layout: flex justify-between items-center, columna en mobile

Izquierda:
  <Image src="/logos/logo-blanco.png" width=32 height=32 className="h-8 w-8 object-contain" />
  (es cuadrado 1024×1024 igual que logo-azul)

Centro:
  Ul horizontal: Servicios · Proyectos · ADN · Contacto
  font-body text-sm text-muted, hover: text-white_soft

Derecha:
  © 2026 Pellisoft · Teruel, España
  font-mono text-xs text-muted
```

---

## 5. Agent 04 — Frontend Expert

### Tareas asignadas

#### TASK-04-K · FIX-04 — Integrar nuevo PIsotype
Después de que Agent 03 entregue el nuevo `PIsotype.tsx`, verificar que:
- `HeroSection.tsx` lo importa correctamente
- El tamaño `size={280}` sigue siendo válido
- Las animaciones GSAP de los nodos se mantienen

#### TASK-04-L · `components/ui/AnimatedCounter.tsx`
**User Story:** US-24
```typescript
interface AnimatedCounterProps {
  to: number
  suffix?: string
  duration?: number
  className?: string
}
```
- Usar `useState` + Framer Motion `useInView` + `useEffect` con interval/counter
- Al entrar en viewport: contar de 0 → `to` en `duration` segundos
- `prefers-reduced-motion`: mostrar número final directamente sin animación

#### TASK-04-M · `components/ui/MockDashboard.tsx`
Dashboard MES visual simulado (JSX puro, sin imágenes):
- Fondo `bg-carbon`, borde `border-encina/20`
- Header con título "SISTEMA MES INDUSTRIAL"
- 3 KPI cards inline
- Gráfica SVG de barras simple
- Indicador "LÍNEA ACTIVA" con punto verde parpadeante (`animate-pulse`)

#### TASK-04-N · `components/sections/FeaturedProjectSection.tsx`
**User Stories:** US-23, US-25
- Grid 2 cols desktop / 1 col mobile
- `AnimatedCounter` para los 3 KPIs (usa `useInView` para trigger)
- `MockDashboard` en columna derecha con perspectiva 3D Framer Motion
- Scroll reveal con `whileInView`, x: ±30→0, opacity 0→1
- ID: `id="casos"`

#### TASK-04-O · `components/sections/DnaSection.tsx`
**User Stories:** US-26, US-27
- `"use client"` + GSAP ScrollTrigger para parallax del fondo
- `useRef` para `sectionRef` y `backgroundRef`
- Parallax solo en desktop (window.innerWidth > 768)
- Logo verde de fondo con posición absoluta
- Valores con iconos Lucide

#### TASK-04-P · `components/layout/Footer.tsx`
**User Story:** US-28
- Logo blanco cuadrado (mismo tratamiento que logo-azul: 32×32, object-contain)
- Links de navegación con scroll suave
- Copyright

#### TASK-04-Q · Actualizar `app/page.tsx`
Montar todos los nuevos componentes en orden:
```
Navbar → Hero → Servicios → Proceso → Casos → ADN → Footer
```

---

### Criterios de aceptación de Agent 04

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run build` → exitoso
- [ ] PIsotype nuevo renderiza con estructura angular + arcos de circuito
- [ ] MockDashboard visible con KPIs y gráfica
- [ ] AnimatedCounter cuenta de 0 al valor al hacer scroll
- [ ] FeaturedProjectSection: grid 2cols + perspectiva 3D en desktop
- [ ] DnaSection: "para el mundo." en color arcilla
- [ ] DnaSection: parallax del fondo visible al hacer scroll
- [ ] Footer: logo blanco + links + copyright
- [ ] Responsive móvil sin overflow

---

## 6. Criterios de aceptación compartidos

| Criterio | Agente verificador |
|---|---|
| PIsotype similar al logo real (bracket + arcos + nodos) en morado | Agent 03 |
| Glow verde en mockup FeaturedProject | Agent 03 |
| "para el mundo." en arcilla visible y correcto | Agent 03 |
| Logo blanco en footer correcto | Agent 03 |
| Perspectiva 3D del mockup funcional | Agent 04 |
| Parallax GSAP sin jank | Agent 04 |
| AnimatedCounter funcional con InView | Agent 04 |
| Build TypeScript limpio | Agent 04 |

---

## 7. Flujo de validación del sprint

```
Agent 03: FIX-04 PIsotype + specs de secciones + MockDashboard specs
    ↓
Agent 04: Implementa en orden:
    AnimatedCounter → MockDashboard → FeaturedProjectSection
    DnaSection → Footer → page.tsx
    ↓
Verificación: tsc + build
    ↓
Agent 03 review visual
    ↓
Sprint 4 DONE ✓
```

---

## Artefactos esperados al finalizar el Sprint

| Artefacto | Agente | Estado |
|---|---|---|
| `components/ui/PIsotype.tsx` rediseñado | Agent 03 | ⬜ Pendiente |
| Specs FeaturedProject + DNA + Footer | Agent 03 | ⬜ Pendiente |
| `components/ui/AnimatedCounter.tsx` | Agent 04 | ⬜ Pendiente |
| `components/ui/MockDashboard.tsx` | Agent 04 | ⬜ Pendiente |
| `components/sections/FeaturedProjectSection.tsx` | Agent 04 | ⬜ Pendiente |
| `components/sections/DnaSection.tsx` | Agent 04 | ⬜ Pendiente |
| `components/layout/Footer.tsx` | Agent 04 | ⬜ Pendiente |
| `app/page.tsx` actualizado completo | Agent 04 | ⬜ Pendiente |

---

> **Nota del Orquestador:** El PIsotype rediseñado es la tarea más crítica visualmente. El logo Pellisoft tiene una identidad muy característica (bracket angular + circuit arcs + nodes) que diferencia la marca. El isotipo del Hero debe transmitir esa misma esencia en morado. Las secciones ADN y Caso Destacado cierran la narrativa comercial de la web y son el penúltimo paso antes del formulario de contacto.
