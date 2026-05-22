# Sprint 4 — Summary
## Caso Destacado MES + Sección ADN Pellisoft

> **Sprint:** 4  
> **Estado:** ✅ COMPLETADO  
> **Fecha:** Mayo 2026  
> **TypeScript:** `npx tsc --noEmit` → 0 errores  
> **Build:** `npm run build` → ✅ (validado en Sprint 4)

---

## Resumen ejecutivo

Sprint 4 completa la narrativa visual y comercial de la web: añade el **caso real de software industrial** (MES), la **sección de identidad de Pellisoft** (ADN/origen), y el **Footer**. Además, resuelve el fix carry-over de las tres primeras sprints: el isotipo "P" del Hero fue completamente rediseñado para asemejarse al logo real de Pellisoft, con una estructura de bracket angular + arcos de circuito + nodos, en paleta morada.

**Estado de la web tras Sprint 4:**
```
Navbar (glassmorphism, logo-azul.png)
├── HeroSection — PIsotype rediseñado + AnimatedText + CTAs
├── ServicesSection — Bento Grid (MES / TPV / Facturación)
├── HowWeWorkSection — 4 pasos del proceso
├── FeaturedProjectSection — Caso MES con MockDashboard + KPIs animados
├── DnaSection — Origen Teruel + "para el mundo." en arcilla + parallax
└── Footer — logo-blanco.png + navegación + copyright
```

---

## FIX-04 — PIsotype: rediseño fiel al logo Pellisoft (en morado)

### Problema
El isotipo PIsotype.tsx de sprints anteriores era una "P" sólida rellena con `fillRule="evenodd"` y gradiente azul→morado. No se asemejaba al logo real de Pellisoft que tiene un estilo de circuito electrónico angular.

### Solución implementada
Rediseño completo del SVG en `components/ui/PIsotype.tsx`:

| Elemento | Antes | Después |
|---|---|---|
| Trazo de la P | Relleno sólido `fill="url(#gradientTech)"` | Strokes (líneas) sin fill |
| Estilo | Genérico, tipográfico | Angular bracket + arcos de circuito |
| Colores | Azul→morado | Bracket en azul (#1E40AF→#3B82F6) + arcos en morado (#7C3AED→#A855F7) |
| Nodos | 6 círculos genéricos | 6 nodos en uniones de circuito (con glow filter) |
| Glow | Blur elipse azul | Blur elipse morada (opacity 6%) |

**Estructura SVG final:**
```
ViewBox: 0 0 200 260

Bracket izquierdo (stroke azul, sw=10):
  — Barra vertical: (40,20) → (40,220)
  — Barra superior: (40,28) → (85,28)
  — Barra media: (40,128) → (75,128)

Arco exterior circuito (stroke morado, sw=5):
  M 85,28 C 185,28 185,128 85,128

Arco interior circuito (stroke morado, sw=3, opacity=0.7):
  M 85,50 C 150,50 150,106 85,106

Nodos animados (6 círculos con nodeGlow filter):
  [0] Unión bracket-arco superior: (85,28), r=6
  [1] Unión bracket-arco inferior: (85,128), r=6
  [2] Ápex del arco exterior: (180,78), r=8 (más prominente)
  [3] Arco interior top: (148,56), r=4
  [4] Arco interior bottom: (148,100), r=4
  [5] Extensión decorativa: (200,45), r=3

Líneas de extensión (decorativas, opacity=0.5):
  (180,78) → (200,60) → (200,45)
```

**Animación GSAP (mantenida):**
- Dynamic `import('gsap')` en `useEffect`
- Todos los nodos: `y: 'random(-8, 8)'`, yoyo repeat, sine.inOut
- `prefers-reduced-motion`: respetado
- Cleanup on unmount

---

## US-24 — AnimatedCounter

**Archivo:** `components/ui/AnimatedCounter.tsx`

Componente para contar de 0 a un valor objetivo al entrar en el viewport:

```typescript
interface AnimatedCounterProps {
  to: number
  suffix?: string
  duration?: number    // ms, default 2000
  className?: string
}
```

**Implementación:**
- `useInView` de Framer Motion con `{ once: true, amount: 0.5 }`
- `requestAnimationFrame` con easing `easeOut` = `1 - (1 - progress)³`
- `prefers-reduced-motion`: muestra valor final sin animación
- `rafId` inicializado a `0` (compatible con TypeScript strict)

---

## US-23 + US-25 — FeaturedProjectSection

**Archivo:** `components/sections/FeaturedProjectSection.tsx`

### Layout
- `id="casos"`, `bg-slate_dark`
- Grid 12 columnas desktop: texto (5) + visual (7)
- 1 columna móvil

### Contenido
| Elemento | Descripción |
|---|---|
| Eyebrow | "Caso real · Software Industrial" (font-mono, tech_blue_light) |
| H2 | "Sistema MES para planta industrial" (scroll reveal x: -30→0) |
| Descripción | Párrafo explicativo del proyecto MES aragonés |
| KPIs (3) | `AnimatedCounter`: OEE 94%, Producción 1450, Alertas 0 |
| CTA | Button variant="outline" → "Ver más proyectos →" |
| Visual | `MockDashboard` en `motion.div` con perspectiva 3D |

### MockDashboard
**Archivo:** `components/ui/MockDashboard.tsx`

Dashboard MES simulado en JSX puro (sin imágenes externas):
- Header con título "SISTEMA MES INDUSTRIAL" + indicador LÍNEA ACTIVA (`animate-pulse`)
- 3 KPIs: OEE 94.2%, Producción 1.450, Alertas 0
- Gráfica SVG de barras de 8 horas
- Footer de turno/timestamp

### Efectos visuales
- Columna visual: `whileHover={{ rotateY: 2, scale: 1.01 }}`, `style={{ perspective: 1200 }}`
- Glow verde: `shadow-[0_0_60px_rgba(45,80,22,0.25)]`
- Scroll reveal columna texto: `x: -30→0, opacity 0→1`
- Scroll reveal columna visual: `x: 30→0, opacity 0→1`

---

## US-26 + US-27 — DnaSection

**Archivo:** `components/sections/DnaSection.tsx`

### Layout
- `id="adn"`, `bg-carbon`, `py-32`, `overflow-hidden`, `relative`
- Fondo decorativo absoluto (logo-verde.png, 500×500, opacity 6%)
- Contenido principal `max-w-2xl` en `z-10`

### Contenido
| Elemento | Descripción |
|---|---|
| Eyebrow | "ADN · Identidad" (font-mono, encina_light) |
| H2 línea 1 | "Desde Teruel," (text-white_soft) |
| H2 línea 2 | "para el mundo." (text-arcilla) ← único uso prominente del arcilla |
| Párrafo 1 | Descripción de Pellisoft y su presencia en España |
| Párrafo 2 | Filosofía de software a medida sin licencias |
| Valores (3) | MapPin/Cpu/Users icons + texto |

### Valores
```
📍 Teruel, España — arcilla_light
💻 Precisión técnica — tech_blue_light
👥 Trato cercano — encina_light
```

### Parallax GSAP (US-27)
- GSAP ScrollTrigger con dynamic import
- Solo activo si no `prefers-reduced-motion`
- `backgroundRef.current` capturado en variable local antes de `gsap.context()` (TypeScript narrowing)
- `yPercent: -30`, `scrub: true` (trigger: top→bottom del viewport)
- Cleanup: `ctx?.revert()` on unmount

---

## US-28 — Footer

**Archivo:** `components/layout/Footer.tsx`

```
bg-slate_dark, border-t border-tech_blue/15
flex justify-between (column en mobile)

Izquierda: logo-blanco.png (32×32, object-contain) + "Pellisoft"
Centro: Servicios · Proyectos · ADN · Contacto (links internos)
Derecha: © 2026 Pellisoft · Teruel, España (font-mono xs muted)
```

---

## US-29 — Responsive

Todas las secciones cumplen breakpoints:

| Sección | Mobile | Desktop |
|---|---|---|
| FeaturedProject | 1 col, visual primero (order), texto después | 2 cols (5+7) |
| DnaSection | `max-w-2xl` natural | Logo fondo visible en lado derecho |
| Footer | Columna vertical, gap-6 | Fila horizontal, justify-between |

---

## Actualizaciones globales

### `app/page.tsx`
Actualizado para montar todas las secciones en orden:
```tsx
<Navbar />
<main>
  <HeroSection />
  <ServicesSection />
  <HowWeWorkSection />
  <FeaturedProjectSection />
  <DnaSection />
  {/* Sprint 5: ContactSection */}
</main>
<Footer />
```

---

## Inventario de archivos del proyecto (post Sprint 4)

```
components/
  layout/
    Navbar.tsx               ✅ (Sprint 2)
    Footer.tsx               ✅ NEW (Sprint 4)
  sections/
    HeroSection.tsx          ✅ (Sprint 2)
    ServicesSection.tsx      ✅ (Sprint 3)
    HowWeWorkSection.tsx     ✅ (Sprint 3)
    FeaturedProjectSection.tsx ✅ NEW (Sprint 4)
    DnaSection.tsx           ✅ NEW (Sprint 4)
  ui/
    PIsotype.tsx             ✅ REDISEÑADO (Sprint 4)
    Button.tsx               ✅ (Sprint 2)
    AnimatedText.tsx         ✅ (Sprint 2)
    Card.tsx                 ✅ (Sprint 3)
    AnimatedCounter.tsx      ✅ NEW (Sprint 4)
    MockDashboard.tsx        ✅ NEW (Sprint 4)
  icons/
    MesIcon.tsx              ✅ (Sprint 3)
    TpvIcon.tsx              ✅ (Sprint 3)
    FacturacionIcon.tsx      ✅ (Sprint 3)
    index.ts                 ✅ (Sprint 3)
app/
  layout.tsx                 ✅ (Sprint 1)
  page.tsx                   ✅ ACTUALIZADO (Sprint 4)
styles/
  globals.css                ✅ (Sprint 1)
tailwind.config.ts           ✅ (Sprint 1)
```

---

## Decisiones técnicas

| Decisión | Razón |
|---|---|
| MockDashboard como JSX puro | No existe imagen de dashboard real en `public/images/` |
| AnimatedCounter con `requestAnimationFrame` | Más preciso y sin dependencias extra vs interval |
| `bgEl` variable local en DnaSection GSAP | TypeScript null-narrowing inside gsap.context() callback |
| Perspectiva 3D separada del overflow-hidden | `overflow-hidden` en div interior; `perspective` en motion.div exterior — evita que clip corte el transform |
| OEE: `to={94}` `suffix="%"` | AnimatedCounter acepta enteros; simplificado de 94.2% |

---

## Métricas del sprint

| Métrica | Valor |
|---|---|
| Archivos creados | 5 (Footer, FeaturedProject, DnaSection, AnimatedCounter, MockDashboard) |
| Archivos modificados | 2 (PIsotype rediseñado, page.tsx actualizado) |
| Errores TypeScript | 0 |
| Secciones de página | 6 (Hero + Services + Process + Featured + DNA + Footer) |
| Animaciones nuevas | 3 (AnimatedCounter, perspectiva 3D, parallax GSAP) |

---

## Próximo sprint

**Sprint 5 — ContactSection**
- Formulario de contacto con validación
- API Route Next.js para envío de emails
- Integración con servicio de email (Resend/Nodemailer)
- Protección anti-spam

**Sprint 6 — QA + SEO**
- Metadata y Open Graph
- Lighthouse performance audit
- Accesibilidad (a11y)
- Polish final + animaciones de detalle
