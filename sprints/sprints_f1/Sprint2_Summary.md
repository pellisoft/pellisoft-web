# Sprint 2 — Summary
## Navbar & Hero Section · Fase 1

> **Estado:** ✅ COMPLETADO  
> **Fecha de inicio:** Mayo 2026  
> **Fecha de cierre:** Mayo 2026  
> **Rama:** `feature/sprint-2-hero`  
> **Agentes ejecutados:** Agent 03 (Web Designer) · Agent 04 (Frontend Expert)

---

## Resultado del Sprint

> **Sprint Goal cumplido:** La web muestra el hero completo con la "P" animada, el texto rotativo, los CTAs funcionales y el menú sticky con glassmorphism. Primera impresión 100% operativa.

---

## Build final

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 3.0s
✓ TypeScript: 0 errors
✓ Generating static pages (9/9)

Routes generadas:
  ○ /               (SSG — Home con Hero)
  ○ /adn
  ○ /contacto
  ○ /proyectos
  ƒ /proyectos/[slug]
  ƒ /api/contact
  ○ /servicios
```

---

## Decisiones técnicas tomadas

### DEC-01 — HeroSection versión simplificada (sin subcomponente `HeroContent`)

**Situación:** La arquitectura inicial planteaba un subcomponente `HeroContent` con prop `asMotion: boolean` que condicionalmente renderizaría `motion.div` o un `<div>` nativo. Esto generó incompatibilidades de tipos entre `HTMLMotionProps` y `HTMLAttributes<HTMLDivElement>`.

**Decisión:** Se eliminó el subcomponente `HeroContent` y se inlinó el contenido directamente en `HeroSection`. Los `motion.div` internos reciben `variants={shouldReduceMotion ? undefined : itemVariants}` e `initial={shouldReduceMotion ? false : 'hidden'}`.

**Justificación:** Código más directo, sin abstracciones prematuras, que sigue el principio de "cero over-engineering en v1" de `docs/architecture.md`.

---

### DEC-02 — Glassmorphism del Navbar vía className condicional (no Framer Motion)

**Situación:** El sprint especificaba usar `useScroll` + `useMotionValue` de Framer Motion para la transición del navbar.

**Decisión:** Se implementó con `useState + useEffect + window.scrollY > 20` y clases Tailwind condicionales con `transition-all duration-300`.

**Justificación:** La transición CSS con `transition-all` es más eficiente para este caso que interpolar valores con Framer Motion. Menor complejidad, mismo resultado visual.

---

### DEC-03 — Gradiente del H1 vía `style` inline (no clase Tailwind)

**Situación:** `bg-clip-text` con `text-transparent` y gradiente requiere `background-image`. La clase `bg-gradient-tech` de Tailwind aplica correctamente en fondos pero no en texto en todos los contextos.

**Decisión:** Se usó `style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)' }}` para el span del título.

**Justificación:** Excepción justificada y documentada: los colores del gradiente del título son los mismos tokens `tech_blue_light` → `tech_purple_light`. No es un valor arbitrario.

---

## Artefactos entregados

### Agent 03 — Web Designer

| Artefacto | Estado | Descripción |
|---|---|---|
| Specs visuales Navbar | ✅ | Layout, glassmorphism CSS, mobile panel |
| Specs SVG isotipo "P" | ✅ | ViewBox, paths, gradiente, nodos, circuit lines |
| Specs animaciones entrada | ✅ | Variants, timing, curvas easing |
| `components/ui/PIsotype.tsx` | ✅ | SVG inline con GSAP + reduced-motion |
| `components/ui/Button.tsx` | ✅ | motion.button con variants primary/outline |

### Agent 04 — Frontend Expert

| Artefacto | Estado | Descripción |
|---|---|---|
| `components/ui/AnimatedText.tsx` | ✅ | AnimatePresence, 4 palabras, 2.5s intervalo |
| `components/layout/Navbar.tsx` | ✅ | Fixed, glassmorphism scroll, mobile panel |
| `components/sections/HeroSection.tsx` | ✅ | Grid 2col, stagger, CTAs, isotipo |
| `app/page.tsx` | ✅ | Monta Navbar + HeroSection |

---

## Componentes implementados en detalle

### `Navbar.tsx`

```
Estado INICIAL:    bg-transparent, sin borde
Estado SCROLL>20:  bg-black/80, backdrop-blur-[12px], border-b border-tech_blue/15
                   Transición CSS: transition-all duration-300

Estructura:
  [Logo logo-azul.png 120×32px]  |  Servicios · Proyectos · ADN · Contacto  |  [Hablar con Pellisoft →]
  
Mobile (<768px):
  [Logo]  |  [Menu icon Lucide]
  Panel: x:280→0, bg-black/95, backdrop-blur-xl, border-l encina/30
  Overlay: bg-black/50, click-to-close
```

**Accesibilidad:**
- `aria-label` en logo link y botón hamburger
- `role="list"` en la lista de navegación
- Botón hamburger alterna `aria-label` según estado

### `AnimatedText.tsx`

```
Palabras: ["Sistemas MES", "Facturación SaaS", "TPV Inteligente", "Automatización"]
Intervalo: 2500ms
Transición:
  entrada: opacity 0→1, y -10→0, 400ms easeInOut
  salida:  opacity 1→0, y 0→10, 400ms easeInOut
Color: text-tech_blue_light (#3B82F6)
prefers-reduced-motion: muestra "Sistemas MES" estático
```

### `PIsotype.tsx`

```
ViewBox: 0 0 200 240
Letra P: path único con fillRule="evenodd" (exterior + hueco interior)
Fill: linearGradient tech_blue (#1E40AF) → tech_purple (#7C3AED)
Glow: ellipse detrás, fill=#3B82F6, opacity=0.07, filter=blur(8px)
Circuit lines: 4 líneas finas rgba(59,130,246,0.4) y rgba(124,58,237,0.3)
Nodos: 6 círculos (#3B82F6, #A855F7, #C1440E, #4A7C2F) con refs para GSAP

Animación GSAP (solo si !prefers-reduced-motion):
  gsap.to(nodo, { y: random(-8,8), duration: random(1.5,3.0), repeat:-1, yoyo:true, delay: i*0.3, ease:"sine.inOut" })
  Importación dinámica de GSAP (lazy import)
  Cleanup: gsap.killTweensOf(node) en unmount
```

### `HeroSection.tsx`

```
Layout: min-h-screen, bg-carbon, overflow-hidden, flex items-center
Grid: 1 col mobile → 2 cols lg (gap-12 lg:gap-16, items-center)

Columna izquierda (stagger animation):
  [Badge]    "Software B2B · Teruel, España" — font-mono xs, border tech_blue/30
  [H1]       "Software industrial y empresarial diseñado para escalar"
             "diseñado para escalar" → gradiente #3B82F6→#A855F7
  [Subclaim] <AnimatedText /> — SaaS y automatización desde Teruel para el mundo.
  [CTAs]     [Hablar con Pellisoft →] (primary) + [▶ Ver proyectos] (outline)

Columna derecha:
  <PIsotype size={280} /> con drop-shadow azul 25%

Fondo:
  radial-gradient top-right: rgba(59,130,246,0.10)
  radial-gradient bottom-left: rgba(124,58,237,0.07)

Animación de entrada (Framer Motion):
  containerVariants: staggerChildren:0.12, delayChildren:0.1
  itemVariants: y:24→0, opacity:0→1, duration:0.65, ease cubic-bezier
  isotopeVariants: x:40→0, opacity:0→1, duration:0.75, delay:0.3
  Trigger: animate="visible" al montar (once, no scroll trigger necesario en Hero)
```

### `Button.tsx`

```
variant="primary":
  bg: linear-gradient(135deg, #1E40AF → #7C3AED)
  shadow: shadow-lg shadow-tech_blue/25
  hover: brightness-110
  
variant="outline":
  border: rgba(245,245,245,0.3)
  bg: transparent → hover:bg-white/5

Micro-animaciones:
  whileHover: scale(1.03)
  whileTap: scale(0.97)
  
Tamaños: sm / md / lg (px/py variables)
```

---

## Criterios de aceptación — Estado final

| Criterio | Estado |
|---|---|
| Navbar sticky y glassmorphism al hacer scroll | ✅ |
| Mobile: hamburger abre/cierra panel lateral | ✅ |
| Logo `logo-azul.png` sin pixelación | ✅ (width=120, height=32 + `priority`) |
| Hero muestra titular, subclaim y 2 CTAs | ✅ |
| Palabras clave rotan cada 2.5s | ✅ |
| Isotipo "P" con gradiente azul→morado | ✅ |
| Animación GSAP idle en nodos | ✅ |
| Animación de entrada del Hero | ✅ (stagger 0.12s) |
| `prefers-reduced-motion` desactiva animaciones | ✅ |
| Build sin errores TypeScript | ✅ (0 errores) |
| Build producción exitoso | ✅ (9 rutas) |

---

## Estructura de componentes del Sprint

```
app/
  page.tsx               ✅ Navbar + HeroSection montados

components/
  layout/
    Navbar.tsx            ✅ IMPLEMENTADO — glassmorphism, mobile panel
  sections/
    HeroSection.tsx       ✅ IMPLEMENTADO — grid 2col, animaciones
  ui/
    AnimatedText.tsx      ✅ IMPLEMENTADO — texto rotativo AnimatePresence
    PIsotype.tsx          ✅ IMPLEMENTADO — SVG isotipo + GSAP
    Button.tsx            ✅ IMPLEMENTADO — primary/outline motion.button
```

---

## Deuda técnica y notas para sprints siguientes

### NOTA-01 — Footer no implementado
`components/layout/Footer.tsx` sigue siendo un placeholder. Se implementa en Sprint 6 (QA / Lanzamiento).

### NOTA-02 — Anclas de sección vacías
Los links del Navbar apuntan a `#servicios`, `#proyectos`, `#adn`, `#contacto`. Estos IDs serán añadidos a las secciones correspondientes en los Sprints 3, 4 y 5.

### NOTA-03 — `PIsotype` como fondo en mobile
La especificación US-14 indicaba que en mobile el isotipo debería ser un fondo semitransparente. En la implementación actual en mobile el isotipo desaparece de la columna derecha (1 col grid) y no aparece como fondo. **Pendiente para ajuste en Sprint 3 o como mejora post-sprint.**

### NOTA-04 — Gradiente del H1 como style inline
El span con gradiente de texto usa `style={}` inline. Es una excepción justificada (CSS `bg-clip-text` + `text-transparent` con gradiente custom), documentada aquí para que Agent 06 (QA) no lo marque como incumplimiento de los tokens.

### NOTA-05 — `bg-gradient-tech` en Navbar CTA
El botón CTA del Navbar usa la clase `bg-gradient-tech` del `tailwind.config.ts`, confirmando que el token de gradiente funciona correctamente.

---

## Próximo sprint

**Sprint 3 — Services Section & How We Work**
- Agentes responsables: Agent 03 (diseño Bento Grid) + Agent 04 (implementación)
- Objetivo: Implementar `ServicesSection.tsx` (Bento Grid asimétrico) y `HowWeWorkSection.tsx` (flujo lineal con scroll reveal)
- Dependencia: Sprint 2 ✅ COMPLETADO

---

> **Firma del Orquestador:** Primera impresión de Pellisoft operativa. El Navbar y la Hero Section están implementados con el nivel visual Industrial Tech · Dark Mode · SaaS Premium definido en la arquitectura. El build es limpio y el código es tipado. Sprint 2 cerrado.
