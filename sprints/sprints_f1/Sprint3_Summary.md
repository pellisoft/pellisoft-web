# Sprint 3 — Summary
## Services Bento Grid & Cómo Trabajamos · Fase 1

> **Estado:** ✅ COMPLETADO  
> **Fecha de inicio:** Mayo 2026  
> **Fecha de cierre:** Mayo 2026  
> **Rama:** `feature/sprint-3-services`  
> **Agentes ejecutados:** Agent 03 (Web Designer) · Agent 04 (Frontend Expert)

---

## Resultado del Sprint

> **Sprint Goal cumplido:** La web comunica los 3 servicios principales con un Bento Grid moderno e interactivo, y el proceso de trabajo en 4 pasos que genera confianza B2B. Además se aplicaron correcciones críticas del Sprint 2.

---

## Build final

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully
✓ TypeScript: 0 errors
✓ Generating static pages (9/9)

Routes:
  ○ /  (SSG — Home con Hero + Servicios + Proceso)
  ○ /adn | /contacto | /proyectos | /servicios
  ƒ /proyectos/[slug] | /api/contact
```

---

## Correcciones retroactivas Sprint 2 (FIX)

### FIX-01 ✅ — Layout full-width aplicado
**Problema resuelto:** Las secciones se veían concentradas en el centro de la pantalla.

Se verificó y corrigió el patrón en todas las secciones:
```tsx
// PATRÓN CORRECTO (aplicado en Sprint 3 y corregido en Sprint 2)
<section className="w-full bg-[color] py-20">     ← 100% ancho
  <div className="mx-auto max-w-7xl px-6 ...">   ← contenido centrado
    ...
  </div>
</section>
```

Archivos corregidos:
- `HeroSection.tsx` → añadido `w-full` al `<section>`
- `ServicesSection.tsx` → patrón correcto desde el inicio
- `HowWeWorkSection.tsx` → patrón correcto desde el inicio

### FIX-02 ✅ — Logo Navbar corregido
**Problema resuelto:** El logo `logo-azul.png` es un archivo cuadrado **1024×1024px** (isotipo, no logo horizontal). Se estaba renderizando con dimensiones incorrectas `120×32` creando distorsión.

**Corrección aplicada en `Navbar.tsx`:**
```tsx
// ANTES (incorrecto para imagen cuadrada)
<Image src="/logos/logo-azul.png" width={120} height={32} className="h-8 w-auto" />

// DESPUÉS (correcto para imagen 1024×1024)
<Image src="/logos/logo-azul.png" width={40} height={40} className="h-9 w-9 object-contain" />
```

---

## Artefactos entregados

### Agent 03 — Web Designer

| Artefacto | Estado | Descripción |
|---|---|---|
| `components/icons/MesIcon.tsx` | ✅ | SVG planta industrial, 3 estaciones + señal |
| `components/icons/TpvIcon.tsx` | ✅ | SVG terminal TPV + señal wifi |
| `components/icons/FacturacionIcon.tsx` | ✅ | SVG factura + esquina + nube SaaS |
| `components/icons/index.ts` | ✅ | Exports actualizados |
| Specs Bento Grid | ✅ | Layout `2fr 1fr`, gaps, bordes, hover |
| Specs "Cómo Trabajamos" | ✅ | 4 pasos, conectores, iconos Lucide |

### Agent 04 — Frontend Expert

| Artefacto | Estado | Descripción |
|---|---|---|
| FIX Navbar logo | ✅ | 40×40 object-contain |
| FIX HeroSection w-full | ✅ | `w-full` añadido al `<section>` |
| `components/ui/Card.tsx` | ✅ | `ServiceCard` reutilizable con glow |
| `components/sections/ServicesSection.tsx` | ✅ | Bento Grid + scroll reveal |
| `components/sections/HowWeWorkSection.tsx` | ✅ | 4 pasos + stagger |
| `app/page.tsx` | ✅ | Todos los componentes montados |

---

## Componentes implementados en detalle

### `ServiceCard` (`components/ui/Card.tsx`)

```
Props:
  title, description, icon, glowColor, badge?, size?, className?, children?

glowColor → mapeo de estilos:
  'blue'    → border-tech_blue/25  |  hover: border-tech_blue/60  | shadow rgba(30,64,175,0.25)
  'purple'  → border-tech_purple/25 | hover: border-tech_purple/60 | shadow rgba(124,58,237,0.25)
  'arcilla' → border-arcilla/25    |  hover: border-arcilla/60   | shadow rgba(193,68,14,0.25)
  'encina'  → border-encina/25     |  hover: border-encina/60    | shadow rgba(45,80,22,0.25)

Animaciones:
  whileHover: y: -4px, duration 200ms
  Estado isHovered: box-shadow condicional via useState
  Background overlay: gradient sutil del color de acento al 4% opacidad

Accesibilidad:
  Icono SVG con aria-hidden="true"
  Texto legible en todas las variantes
```

### `ServicesSection` — Bento Grid

```
Layout:
  Mobile:  grid-cols-1, cards apiladas
  Tablet:  grid-cols-2, MES ocupa col-span-2
  Desktop: grid-cols-[2fr_1fr], grid-rows-2, min-h-[500px]
           MES: lg:row-span-2 (altura completa izquierda)
           TPV: fila 1 derecha
           Facturación: fila 2 derecha

Sección:
  Fondo: bg-slate_dark (#111318) — diferencia con hero bg-carbon
  Padding: py-20 lg:py-28
  Header: label "Qué hacemos" + H2 "Servicios" + subtítulo

Card MES:
  icon: MesIcon (44px) color tech_blue_light
  glowColor: 'blue', badge: "MES · SCADA · Industrial"
  size: 'lg' (min-h-[280px])
  
Card TPV:
  icon: TpvIcon (36px) color tech_purple_light
  glowColor: 'purple', size: 'sm'

Card Facturación:
  icon: FacturacionIcon (36px) color arcilla_light
  glowColor: 'arcilla', size: 'sm'

Scroll reveal:
  whileInView: opacity 0→1, y 30→0
  Stagger: MES delay=0, TPV delay=0.15s, Facturación delay=0.3s
  viewport: once:true, amount:0.2
```

### `HowWeWorkSection`

```
Sección:
  Fondo: bg-carbon (#0A0A0A) — vuelve al fondo del hero (contraste con slate_dark)
  Separador superior: border-t border-encina/20
  Layout: text-center, header centrado

Pasos (4):
  01 Análisis    → Microscope icon (encina_light)
  02 Diseño      → PenLine icon (encina_light)
  03 Desarrollo  → Code2 icon (encina_light)
  04 Escalado    → TrendingUp icon (encina_light)

Layout:
  Mobile: 1 columna con línea conectora vertical izquierda (border-l dashed)
  Desktop: 4 columnas con línea horizontal dashed entre pasos (absolute)

Estructura de cada paso:
  Icono en círculo (bg-slate_dark, border-encina/30, h-10 w-10)
  Número "01"-"04" (font-mono, text-xs, text-tech_blue_light)
  Título (font-heading text-lg semibold)
  Descripción (font-body text-sm text-muted_light)

Scroll reveal:
  stagger 0.15s × índice por paso
  viewport: once:true, amount:0.3
```

### Iconos SVG (Agent 03)

```
Todos: viewBox="0 0 40 40", fill="none", stroke="currentColor", strokeWidth=1.5
       strokeLinecap="round", strokeLinejoin="round", aria-hidden="true"

MesIcon:
  — 3 rectángulos de altura ascendente (línea de producción)
  — Líneas de conexión entre estaciones
  — Arcos de señal sobre estación central
  — Nodo circular fill

TpvIcon:
  — Marco monitor rect + pantalla interior
  — Base del monitor con línea horizontal
  — 3 arcos wifi concéntricos en pantalla
  — Punto central de señal

FacturacionIcon:
  — Documento con path (esquina doblada)
  — 3 líneas de contenido
  — Indicador de precio/moneda
  — Icono nube SaaS conectado con línea punteada
```

---

## Criterios de aceptación — Estado final

| Criterio | Estado |
|---|---|
| Secciones ocupan 100% ancho pantalla | ✅ |
| Logo cuadrado sin distorsión | ✅ (40×40, object-contain) |
| Bento Grid: 1 grande + 2 medianas en desktop | ✅ |
| Cards con glow diferenciado (azul/morado/arcilla) | ✅ |
| Badge verde encina en card MES | ✅ |
| 4 pasos de "Cómo trabajamos" con iconos | ✅ |
| Scroll reveal + stagger funcional | ✅ |
| Responsive móvil: columna única sin overflow | ✅ |
| `prefers-reduced-motion` respetado | ✅ (`initial={false}` cuando activado) |
| Build TypeScript limpio | ✅ (0 errores) |
| Build producción exitoso | ✅ (9 rutas) |

---

## Decisiones técnicas tomadas

### DEC-04 — Variantes Framer Motion en `whileInView`

**Situación:** Pasar un objeto `cardVariants` con `ease: 'easeOut'` inline dentro de `initial`/`whileInView` generaba error TypeScript porque `Easing` no acepta strings en ese contexto.

**Decisión:** Se separó el `transition` como prop independiente del `motion.div` con `ease: 'easeOut'` ahí sí es válido:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
>
```

### DEC-05 — Logo PNG es 1024×1024 (isotipo, no logotipo horizontal)

**Situación descubierta:** El archivo `logo-azul.png` es un isotipo cuadrado, no un logotipo horizontal con texto. Esto implica que en el Navbar se muestra solo el símbolo, no "Pellisoft" en texto.

**Implicación para sprints futuros:** Si se desea mostrar también el nombre en texto, hay dos opciones:
1. Añadir el nombre "Pellisoft" como texto junto al isotipo en el Navbar (`<span>Pellisoft</span>`)
2. Obtener/crear un logotipo horizontal PNG separado con isotipo + texto

**Pendiente de decisión del cliente** — documentado para Sprint 6 (QA).

### DEC-06 — Sección alternante carbon / slate_dark

Se estableció un patrón de alternancia de fondos entre secciones:
- Hero: `bg-carbon`
- Servicios: `bg-slate_dark` (ligeramente más claro, diferencia las secciones)
- Proceso: `bg-carbon` (vuelve al base, con separador encina)

Este patrón continúa en los sprints siguientes para dar ritmo visual a la página.

---

## Estado de la página al final del Sprint 3

```
app/page.tsx monta:
  ✅ <Navbar />           — sticky, glassmorphism, logo cuadrado
  ✅ <HeroSection />      — min-h-screen, isotipo P animado, texto rotativo
  ✅ <ServicesSection />  — Bento Grid 3 cards con glow
  ✅ <HowWeWorkSection /> — 4 pasos con iconos Lucide
  ⬜ <FeaturedProjectSection /> — Sprint 4
  ⬜ <DnaSection />              — Sprint 4
  ⬜ <ContactSection />          — Sprint 5
```

---

## Deuda técnica y notas para sprints siguientes

### NOTA-05 — Logo: decisión de logotipo horizontal
El isotipo cuadrado se muestra en el Navbar. Evaluar en Sprint 6 si añadir texto "Pellisoft" junto al isotipo o usar un PNG horizontal separado.

### NOTA-06 — Línea conectora HowWeWork en tablet (md)
En breakpoint `md` (2 columnas), la línea conectora horizontal del grid 4 columnas no aparece correctamente. En mobile (1 col) la línea vertical sí funciona. El breakpoint tablet queda sin conector visual — **pendiente para Sprint 6 QA**.

### NOTA-07 — ServiceCard `h-full` en Bento Grid
Las cards del Bento Grid usan `h-full` para ocupar toda la celda del grid. En algunos navegadores esto puede no funcionar correctamente si el padre del grid no tiene altura explícita. Se usa `lg:min-h-[500px]` en el grid — verificar en Safari en Sprint 5 Testing.

---

## Próximo sprint

**Sprint 4 — Featured Project & ADN Pellisoft**
- Agentes responsables: Agent 03 (diseño) + Agent 04 (implementación)
- Objetivo: Caso destacado (mockup dashboard MES) y sección ADN con parallax GSAP
- Dependencia: Sprint 3 ✅ COMPLETADO

---

> **Firma del Orquestador:** La web ya tiene su primera "pantalla completa" de contenido: Hero + Servicios + Proceso. El Bento Grid es el elemento visual más diferenciador hasta ahora. Las correcciones de layout full-width resuelven el problema visual reportado del Sprint 2. Sprint 3 cerrado.
