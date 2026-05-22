# Sprint 2 — Navbar & Hero Section
## Fase 1 · Duración estimada: 1 semana

> **Agentes responsables:** Agent 03 (Web Designer) · Agent 04 (Frontend Expert)  
> **Prerequisito:** Sprint 1 completado y mergeado a `develop`  
> **Objetivo:** Implementar la primera impresión de la web: la navegación sticky y la Hero Section con el isotipo animado, titular, subclaim y CTAs.

---

## Goal del Sprint

> **"Al terminar este sprint, la web muestra el hero completo con la 'P' animada, el texto rotativo, los CTAs funcionales y el menú sticky con glassmorphism. Primera impresión 100% operativa."**

---

## Referencia visual

**Mockup principal** (`docs/pellisoft-images-logo/mockup-onepage.png`):
- **Navbar:** Logo azul izquierda + links texto blanco derecha. Fondo oscuro semitransparente. Sin borde visible en estado inicial.
- **Hero izquierda:** Titular blanco muy grande, subclaim gris claro, 2 CTAs (botón azul relleno + botón outline blanco)
- **Hero derecha:** Isotipo "P" geométrico con gradiente **azul → morado** (`tech_blue` → `tech_purple`), nodos de datos flotantes (círculos pequeños en azul, morado, naranja)
- **Logo a usar en Navbar:** `public/logos/logo-azul.png`

**Imágenes de apoyo:**
- Mockup verde (`mockup-verde-...`): referencia alternativa para el logo con isotipo verde + texto blanco
- La "P" del hero NO es el logo PNG — es un elemento gráfico SVG/CSS construido para la web

---

## Historias de usuario

### US-09 · Navbar con glassmorphism
**Como** visitante,  
**quiero** una barra de navegación que permanezca visible mientras hago scroll,  
**para que** siempre pueda navegar entre secciones sin perder el contexto.

**Tareas:**
- [ ] Crear `components/layout/Navbar.tsx` (`"use client"`)
- [ ] Estructura del navbar:
  ```
  [Logo: logo-azul.png]  —  Servicios · Casos · ADN · Contacto  —  [Hablar con Pellisoft →]
  ```
- [ ] Estilos glassmorphism (activar al hacer scroll `scrollY > 20`):
  ```css
  background: rgba(10, 10, 10, 0.80)
  backdrop-filter: blur(12px)
  border-bottom: 1px solid rgba(59, 130, 246, 0.15)  /* tech_blue muy sutil */
  ```
- [ ] `position: fixed`, `z-index: 50`, ancho completo
- [ ] Transición suave: sin borde en top → borde sutil al hacer scroll (Framer Motion `useScroll` + `useMotionValue`)
- [ ] CTA "Hablar con Pellisoft": gradiente `tech_blue` → `tech_purple`, border-radius pequeño
- [ ] Links de navegación con scroll suave hacia anclas (`href="#servicios"`, `href="#adn"`, etc.)
- [ ] **Logo:** `<Image src="/logos/logo-azul.png" />` — altura 32px desktop / 28px móvil

**Mobile (< 768px):**
- [ ] Ocultar links de navegación y CTA
- [ ] Mostrar ícono hamburger (Lucide `Menu`)
- [ ] Panel lateral (`<motion.div>`) deslizable desde la derecha con los links
- [ ] Logo visible siempre

---

### US-10 · Hero Section — estructura y layout
**Como** visitante B2B,  
**quiero** ver inmediatamente qué hace Pellisoft y cómo contactarles,  
**para que** en menos de 5 segundos entienda el valor de la empresa.

**Tareas:**
- [ ] Crear `components/sections/HeroSection.tsx`
- [ ] Layout: grid 2 columnas en desktop (`lg:grid-cols-2`), 1 columna en móvil
- [ ] **Columna izquierda:**
  - Badge superior: `"Software B2B · Teruel, España"` — small, monospace, borde sutil `tech_blue`
  - H1: `"Software industrial y empresarial diseñado para escalar"` — `font-heading`, `text-display`, blanco
  - Subclaim: `"Sistemas MES, SaaS y automatización desde Teruel para el mundo"` — `text-muted_light`, `font-body`
  - Texto rotativo (ver US-11)
  - CTA primario: `"Hablar con Pellisoft"` — fondo gradiente `tech_blue`→`tech_purple`, hover: brighten
  - CTA secundario: `"Ver proyectos"` — outline blanco, hover: fill blanco suave
- [ ] **Columna derecha:**
  - Isotipo "P" animado (ver US-12)
- [ ] Fondo: `bg-carbon` con gradiente radial sutil `gradient-hero` en esquina superior derecha
- [ ] Altura: `min-h-screen` con padding top para el navbar
- [ ] Ancla: `id="hero"`

---

### US-11 · Animación de texto rotativo (Hero subclaim)
**Como** visitante,  
**quiero** ver cómo las palabras clave de los servicios rotan suavemente,  
**para que** entienda el alcance completo de Pellisoft en pocos segundos.

**Tareas:**
- [ ] Crear `components/ui/AnimatedText.tsx`
- [ ] Array de palabras: `["Sistemas MES", "Facturación SaaS", "TPV Inteligente", "Automatización"]`
- [ ] Implementar con Framer Motion `AnimatePresence`:
  ```typescript
  // Cada 2.5s cambia la palabra activa
  // Salida: opacity 0 + y: -10
  // Entrada: opacity 1 + y: 0
  // Duración transición: 400ms ease
  ```
- [ ] La palabra rotativa está en color `tech_blue_light` dentro del subclaim
- [ ] Respetar `prefers-reduced-motion`: mostrar la primera palabra estática sin animación

---

### US-12 · Isotipo "P" animado (Hero derecha)
**Como** visitante,  
**quiero** ver el símbolo de Pellisoft con una animación viva pero no intrusiva,  
**para que** la marca transmita dinamismo y tecnología de alto nivel.

**Referencia visual:** Mockup principal — La "P" tiene un gradiente azul→morado, líneas geométricas de circuito y nodos flotantes.

**Tareas:**
- [ ] Crear `components/ui/PIsotype.tsx`
- [ ] Implementar como SVG inline (no imagen PNG, para poder animar):
  - Forma geométrica de la "P" con trazo doble (inspirado en el logo real)
  - Fill: gradiente `tech_blue` → `tech_purple`
  - Líneas de circuito emanando de los bordes (líneas finas, opacidad 40%)
  - 5-6 nodos (círculos pequeños) en posiciones fijas: 2 azules, 2 morados, 1 naranja/arcilla
- [ ] **Animación idle (GSAP):**
  ```typescript
  // gsap.to(nodes, { y: "random(-8, 8)", duration: "random(2, 4)", repeat: -1, yoyo: true, stagger: 0.3 })
  // gsap.to(glowLayer, { opacity: 0.6->1, duration: 4, repeat: -1, yoyo: true }) // "respiración"
  ```
- [ ] Glow sutil detrás de la "P": `box-shadow` o `filter: drop-shadow` en `tech_blue` con 40% opacidad
- [ ] En móvil: tamaño reducido, animaciones simplificadas, posicionado centrado encima del texto
- [ ] Respetar `prefers-reduced-motion`: desactivar GSAP, mostrar "P" estática

---

### US-13 · Animación de entrada del Hero (Framer Motion)
**Como** visitante,  
**quiero** que los elementos del hero aparezcan de forma elegante al cargar la página,  
**para que** la primera impresión sea fluida y premium, no instantánea.

**Tareas:**
- [ ] Implementar `containerVariants` con `staggerChildren: 0.12` en `HeroSection.tsx`
- [ ] Cada elemento (badge, H1, subclaim, CTAs) entra con:
  ```typescript
  hidden: { opacity: 0, y: 24 }
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } }
  ```
- [ ] El isotipo entra desde la derecha: `hidden: { opacity: 0, x: 40 }` → `visible: { opacity: 1, x: 0 }`
- [ ] Toda la animación de entrada ocurre 1 sola vez (`once: true`)
- [ ] Respetar `prefers-reduced-motion`

---

### US-14 · Responsive del Hero
**Como** visitante móvil,  
**quiero** que el Hero sea legible y funcional en mi teléfono,  
**para que** no pierda información ni tenga que hacer zoom.

**Tareas:**
- [ ] En móvil (`< 768px`):
  - Layout: 1 columna, texto primero, isotipo debajo (o fondo, opacidad 20%)
  - H1: tamaño `text-4xl` (no `text-display` completo)
  - Isotipo: aparece como fondo semitransparente en el hero, no como columna separada
  - CTAs: stack vertical, ancho completo
- [ ] En tablet (`768px–1024px`):
  - Layout 2 columnas, isotipo más pequeño
- [ ] Verificar en 390px (iPhone), 820px (iPad), 1440px (desktop)

---

## Criterios de aceptación del Sprint

- [ ] El navbar es sticky y aplica glassmorphism al hacer scroll
- [ ] En móvil, el menú hamburger abre y cierra el panel lateral sin errores
- [ ] El logo `logo-azul.png` se muestra correctamente en el navbar (sin pixelación)
- [ ] El Hero muestra el titular, subclaim y los 2 CTAs correctamente
- [ ] Las palabras clave rotan cada 2.5s con transición suave
- [ ] El isotipo "P" tiene la animación de "respiración" idle activa
- [ ] La animación de entrada completa ocurre en < 1s total
- [ ] Con `prefers-reduced-motion: reduce` activado, no hay animaciones
- [ ] Build de producción sin errores TypeScript ni Tailwind
- [ ] Lighthouse Performance > 85 solo para esta sección

---

## Dependencias

- Sprint 1 completado: tokens de color, fuentes, estructura de carpetas, logos en `public/`

## Definition of Done

- Código en rama `feature/sprint-2-hero` mergeada a `develop`
- Navbar y Hero visualmente idénticos al mockup de referencia
- Responsive validado en 3 breakpoints
- Revisión conjunta Agent 03 (visual) + Agent 04 (código) aprobada
