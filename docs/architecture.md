# Pellisoft — Architecture Document
## Documento de Arquitectura Técnica y Funcional

> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Estado:** Definición aprobada — lista para implementación

---

## Índice

1. [Visión general del proyecto](#1-visión-general-del-proyecto)
2. [Arquitectura funcional y UX — Agent 02](#2-arquitectura-funcional-y-ux--agent-02)
3. [Arquitectura técnica frontend — Agent 01](#3-arquitectura-técnica-frontend--agent-01)
4. [Sistema de diseño visual — Agent 03](#4-sistema-de-diseño-visual--agent-03)
5. [Implementación frontend — Agent 04](#5-implementación-frontend--agent-04)
6. [Estrategia de testing — Agent 05](#6-estrategia-de-testing--agent-05)
7. [Plan de QA y calidad — Agent 06](#7-plan-de-qa-y-calidad--agent-06)
8. [DevOps y despliegue — Agent 07](#8-devops-y-despliegue--agent-07)
9. [Mapa de dependencias entre agentes](#9-mapa-de-dependencias-entre-agentes)

---

## 1. Visión general del proyecto

### Objetivo
Web corporativa premium para **Pellisoft**, empresa de software industrial y empresarial con sede en Teruel.  
La web actúa como **canal comercial B2B**, proyectando imagen de partner tecnológico serio, capaz y diferenciado.

### Resultado esperado
- Web tipo **One Page principal** + páginas secundarias accesibles desde navegación
- Estética **Industrial Tech · Dark Mode · SaaS Premium**
- Animaciones profesionales, fluidas y con propósito funcional
- Base escalable para futuros productos SaaS

### Páginas del sitio
| Página | Tipo de ruta | Render |
|---|---|---|
| Home (`/`) | One Page | SSG |
| Servicios (`/servicios`) | Estática | SSG |
| Proyectos / Casos (`/proyectos`) | Dinámica (CMS) | ISR |
| ADN Pellisoft (`/adn`) | Estática | SSG |
| Contacto (`/contacto`) | Formulario | SSG + API Route |

---

## 2. Arquitectura funcional y UX — Agent 02

### 2.1 Objetivos de negocio priorizados

1. Generar confianza B2B inmediata en el primer scroll
2. Comunicar capacidad técnica real (MES, SaaS, automatización)
3. Convertir visitas en contacto comercial (formulario)
4. Escalar como base para productos SaaS futuros

### 2.2 Arquitectura de información — Home (One Page)

```
/
├── [Hero Section]         → Impacto + posicionamiento
├── [Servicios Bento Grid] → Capacidad técnica
├── [Cómo trabajamos]      → Proceso y confianza
├── [Caso destacado]       → Prueba de capacidad
├── [ADN Pellisoft]        → Humanización de marca
└── [Contacto Command Center] → Conversión
```

### 2.3 Flujos de usuario principales

**Flujo 1 — Decisor B2B (Director de operaciones / CTO):**
```
Aterriza en Hero → Lee servicios MES → Ve caso real → Confía → Contacta
```

**Flujo 2 — Explorador de marca:**
```
Aterriza en Hero → Baja al ADN → Entiende el relato Teruel → Confía → Contacta
```

**Flujo 3 — Referido directo:**
```
Aterriza → Navega a /proyectos → Valida capacidad → Contacta
```

### 2.4 Reglas funcionales

- El formulario de contacto es la **única conversión primaria** del sitio
- No existe carrito, login ni área privada en v1
- Los textos son concisos: párrafos < 3 líneas, titulares < 10 palabras
- Cada sección tiene un CTA claro o una transición que guía al siguiente bloque
- El blog / casos de éxito se gestiona desde CMS (Sanity) para no requerir deploy

### 2.5 Navegación

```
[Logo Pellisoft]   |   Servicios   Proyectos   ADN   Contacto   [CTA: Hablar con Pellisoft]
```

- Menú **sticky** con efecto **glassmorphism** sobre fondo oscuro
- En móvil: hamburger menu con panel lateral
- CTA principal siempre visible en desktop

---

## 3. Arquitectura técnica frontend — Agent 01

### 3.1 Stack definitivo

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSG/SSR/ISR, SEO, rendimiento |
| Lenguaje | **TypeScript** | Mantenibilidad, escalabilidad |
| Estilos | **Tailwind CSS v3** | Design tokens, purge CSS, consistencia |
| Animaciones | **Framer Motion** | Animaciones declarativas React-nativas |
| Animaciones avanzadas | **GSAP + ScrollTrigger** | Parallax, scroll-driven, timelines |
| CMS | **Sanity** | Blog, proyectos, gestión contenido |
| Email | **Resend + React Email** | Formulario de contacto |
| Base de datos | **Supabase** (opcional v2) | Captura de leads, escalado futuro |
| Hosting | **Vercel** | CDN global, deploys automáticos |

### 3.2 Estructura de carpetas del proyecto

```
pellisoft-web/
├── app/                          # App Router (Next.js 14)
│   ├── layout.tsx                # Root layout, metadatos globales
│   ├── page.tsx                  # Home (One Page)
│   ├── servicios/
│   │   └── page.tsx
│   ├── proyectos/
│   │   ├── page.tsx              # Listado de proyectos (ISR)
│   │   └── [slug]/
│   │       └── page.tsx          # Detalle de proyecto
│   ├── adn/
│   │   └── page.tsx
│   ├── contacto/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts          # API Route: envío de formulario
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Menú sticky glassmorphism
│   │   └── Footer.tsx
│   ├── sections/                 # Secciones del Home
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx   # Bento Grid
│   │   ├── HowWeWorkSection.tsx
│   │   ├── FeaturedProjectSection.tsx
│   │   ├── DnaSection.tsx        # ADN Pellisoft + Parallax
│   │   └── ContactSection.tsx    # Command Center
│   ├── ui/                       # Átomos reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GlowBorder.tsx
│   │   ├── GlassCard.tsx
│   │   ├── AnimatedText.tsx
│   │   └── TerminalInput.tsx
│   └── icons/
│       └── (SVG components)
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── email/
│   │   └── templates/
│   │       └── ContactEmail.tsx
│   └── utils.ts
│
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useGlowEffect.ts
│
├── styles/
│   └── globals.css               # Tokens base + reset
│
├── public/
│   ├── images/
│   ├── logos/
│   └── fonts/
│
├── sanity/                       # Sanity Studio (CMS)
│   ├── schemas/
│   │   ├── project.ts
│   │   └── blogPost.ts
│   └── sanity.config.ts
│
├── tailwind.config.ts            # Tokens de diseño
├── next.config.ts
├── tsconfig.json
└── .env.local                    # Variables de entorno
```

### 3.3 Patrones de renderizado

| Sección / Página | Estrategia | Razón |
|---|---|---|
| Home | SSG | Sin datos dinámicos, máximo rendimiento |
| Proyectos (listado) | ISR (60s) | Actualización desde CMS sin rebuild |
| Detalle de proyecto | ISR (60s) | Contenido editable en Sanity |
| API de contacto | Server Route | Procesamiento seguro del formulario |
| Servicios / ADN | SSG | Contenido estático |

### 3.4 Variables de entorno requeridas

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Resend (Email)
RESEND_API_KEY=
CONTACT_EMAIL_TO=

# Supabase (opcional, v2)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 3.5 Principios de arquitectura

- **Componentes server-first**: por defecto, todos los componentes son Server Components. Solo añadir `"use client"` donde se necesite interactividad
- **Cero over-engineering en v1**: no añadir contextos globales, state management externo ni abstracciones prematuras
- **API Routes seguras**: validación de inputs con Zod antes de cualquier operación en `/api/contact`
- **Separación clara UI / lógica**: los componentes de sección no contienen lógica de negocio; esta reside en `lib/`

---

## 4. Sistema de diseño visual — Agent 03

### 4.1 Paleta de color

```typescript
// tailwind.config.ts — tokens de diseño
colors: {
  carbon:   '#0A0A0A',   // Negro Carbón — fondos principales
  encina:   '#2D5016',   // Verde Encina — identidad, ADN
  encina_light: '#4A7C2F', // Verde Encina claro — glow, bordes activos
  arcilla:  '#C1440E',   // Arcilla Teruel — acento narrativo puntual
  slate_dark: '#111318', // Pizarra oscura — fondos de cards
  white:    '#F5F5F5',   // Blanco tipográfico
  muted:    '#6B7280',   // Texto secundario
  // Colores principales de marca
  tech_blue:    '#1E40AF', // Azul Tech — color de marca principal
  tech_purple:  '#7C3AED', // Morado Tech — CTAs, innovación
}
```

**Reglas de uso de color:**
- `carbon` y `slate_dark`: fondos de secciones y cards
- `tech_blue` + `tech_purple`: gradientes del hero, CTAs primarios
- `encina` / `encina_light`: sección ADN, elementos de identidad territorial
- `arcilla`: únicamente como acento puntual (cursor, highlight de texto narrativo)
- `white`: tipografía principal sobre fondos oscuros

### 4.2 Tipografía

```typescript
// tailwind.config.ts
fontFamily: {
  heading: ['Space Grotesk', 'sans-serif'],  // H1, H2, claims, hero
  body:    ['Inter', 'sans-serif'],           // Párrafos, formularios, nav
  mono:    ['JetBrains Mono', 'monospace'],  // Terminal inputs, código
}
```

**Jerarquía tipográfica:**
| Nivel | Fuente | Tamaño | Uso |
|---|---|---|---|
| H1 | Space Grotesk Bold | `5xl–7xl` | Hero claim principal |
| H2 | Space Grotesk SemiBold | `3xl–4xl` | Titulares de sección |
| H3 | Space Grotesk Medium | `xl–2xl` | Títulos de card |
| Body | Inter Regular | `base–lg` | Párrafos |
| Label | Inter Medium | `sm` | Etiquetas, nav |
| Mono | JetBrains Mono | `sm–base` | Inputs terminal, metadata |

### 4.3 Secciones: especificaciones de diseño

#### Hero Section
- **Fondo:** Negro Carbón (`#0A0A0A`)
- **Claim:** `"Software industrial y empresarial diseñado para escalar"`
- **Subclaim:** `"Sistemas MES, SaaS y automatización desde Teruel para el mundo"`
- **Elemento visual:** Isotipo "P" abstracto con nodos de datos y gradiente Azul Tech → Morado Tech
- **Logo:** "P" central con efecto **glow orgánico** en Verde Encina (latido muy lento, ~4s ciclo)
- **Animación de texto:** Las palabras clave ("Sistemas MES" / "Facturación SaaS" / "TPV") rotan con efecto **glitch controlado** o fade elegante
- **Animación de entrada:** fade + slide-up secuencial por capas
- **CTAs:** `[Hablar con Pellisoft]` (primario, gradiente tech) + `[Ver proyectos]` (outline)

#### Navbar (Glassmorphism)
```css
/* Efecto glassmorphism sobre fondo oscuro */
background: rgba(10, 10, 10, 0.75);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(45, 80, 22, 0.2);
```
- **Sticky**: permanece visible durante todo el scroll
- Transición: opacidad 0 → 1 al cargar, borde Verde Encina sutil al hacer scroll

#### Servicios — Bento Grid
- **Layout:** Grid asimétrico (1 card grande + 2 cards medianas)
- **Cards:**
  - Fondo: `slate_dark` con borde 1px `encina_light` al 30% opacidad
  - **Hover:** elevación sutil (translateY -4px), glow de color Verde o Arcilla, icono con micro-animación
  - Efecto hover de la card MES: separación de iconos en eje Z (profundidad)
- **Servicios representados:**
  1. Sistemas MES Industrial (card grande) — gráfico de línea de producción
  2. Facturación SaaS / TPV
  3. Automatización e Integraciones

#### Cómo trabajamos
- Flujo lineal: Análisis → Diseño → Desarrollo → Escalado
- Visual limpio, sin animaciones complejas
- Entrada de elementos al hacer scroll (Framer Motion `viewport`)

#### Caso destacado
- Dashboard MES industrial con métricas, gráficas, KPIs
- 1 solo caso — no saturar
- Screenshot / mockup con glow sutil de borde

#### ADN Pellisoft
- Sección ancho completo, fondo oscuro
- **"P" gigante de fondo:** Verde Encina muy oscuro (`#1A2F0D`)
- Texto: `"Desde Teruel, para el mundo"`
- **Efecto Parallax:** la "P" de fondo se desplaza a 30% de la velocidad del scroll
- Función: humanizar la marca sin perder profesionalidad

#### Contacto — Command Center
```
┌─────────────────────────────────────────┐
│  Glassmorphism card (cristal oscuro)    │
│  Borde Verde Encina con glow sutil      │
│                                         │
│  [Info Contacto]    [Formulario]        │
│  • Mapa oscuro       Nombre_            │
│    Teruel            Empresa (opt)_     │
│  • Email corp.       Email_             │
│  • Acceso soporte    Proyecto_______    │
│                                         │
│                    [Enviar Mensaje →]   │
└─────────────────────────────────────────┘
```
- **Inputs:** líneas base finas, al focus se iluminan en Arcilla + cursor terminal parpadeante
- **Validación en tiempo real:** línea roja pulsante si email incorrecto; destello Verde si correcto
- **Botón envío:** al pulsar → se transforma en barra de carga estilo terminal
- **Mensaje de éxito:** `"Conexión establecida. Nos pondremos en contacto desde Teruel."`
- **Mapa:** modo oscuro, punto naranja/arcilla sobre Teruel

### 4.4 Animaciones: principios y catálogo

**Principios:**
- Nada brusco, nada que distraiga continuamente
- Las animaciones tienen función: guiar la atención, confirmar interacciones
- `prefers-reduced-motion`: todas las animaciones respetan esta media query

**Catálogo de animaciones permitidas:**

| Nombre | Trigger | Duración | Uso |
|---|---|---|---|
| Fade + Slide Up | Carga / Scroll | 600–800ms | Entrada de secciones |
| Glow Orgánico | Idle (loop) | 4s ciclo | Isotipo logo |
| Text Rotate | Idle (loop) | 3s intervalo | Hero subclaim palabras |
| Card Hover Lift | Hover | 200ms | Cards de servicios |
| Card Glow | Hover | 200ms | Borde iluminado en hover |
| Parallax | Scroll | Continuo | ADN — "P" de fondo |
| Scroll Reveal | Scroll enter viewport | 500ms | Sección blog / contacto |
| Terminal Cursor | Idle (loop) | 500ms | Input activo formulario |
| Button Loading | Click | 1.5s | Envío de formulario |
| Input Focus Glow | Focus | 300ms | Campos del formulario |

---

## 5. Implementación frontend — Agent 04

### 5.1 Componentes críticos y su implementación

#### `HeroSection.tsx`
```typescript
// Framer Motion: variantes de entrada secuencial
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

// GSAP: animación idle de los nodos de la "P"
// Rotación continua y respiración del glow (gsap.to con repeat: -1, yoyo: true)
```

#### `Navbar.tsx`
```typescript
// "use client" — necesita scroll detection
// useScroll de Framer Motion para añadir borde al hacer scroll
// position: fixed, z-index: 50, glassmorphism via className Tailwind
```

#### `ServicesSection.tsx`
```typescript
// CSS Grid con área nombrada para layout bento asimétrico
// Framer Motion whileHover para lift + glow en cada card
// Cada card recibe un `glowColor` prop ('encina' | 'arcilla')
```

#### `DnaSection.tsx`
```typescript
// "use client" — GSAP ScrollTrigger para parallax
// useEffect + gsap.to(backgroundRef, { yPercent: -30, scrollTrigger: {...} })
// Respetar prefers-reduced-motion antes de inicializar GSAP
```

#### `ContactSection.tsx`
```typescript
// "use client" — estado de formulario local con useState
// Validación con Zod en cliente antes de enviar
// fetch POST a /api/contact
// Estados del botón: idle | loading | success | error
// Framer Motion AnimatePresence para transición de estados del botón
```

#### `TerminalInput.tsx`
```typescript
// Input base con estilos de línea inferior
// Cursor parpadeante implementado via keyframes CSS en Tailwind
// Clases de validación condicionales (border-arcilla, border-encina)
```

### 5.2 API Route: `/api/contact/route.ts`

```typescript
import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  email: z.string().email(),
  project: z.string().min(10).max(2000),
})

export async function POST(request: Request) {
  // 1. Parsear y validar con Zod (nunca confiar en input del cliente)
  // 2. Rate limiting básico (cabecera IP + tiempo)
  // 3. Enviar email via Resend
  // 4. Responder con status 200 o error estructurado
}
```

**Seguridad del formulario:**
- Validación estricta con Zod (server-side)
- No exponer stack traces en respuestas de error
- Variable `RESEND_API_KEY` solo en servidor (sin prefijo `NEXT_PUBLIC_`)
- Considerar añadir honeypot field anti-spam en v1.1

### 5.3 Estrategia responsive

| Breakpoint | Layout principal |
|---|---|
| `sm` (< 640px) | Single column, hero simplificado, animaciones reducidas |
| `md` (640–1024px) | 2 columnas, bento grid 2x2 |
| `lg` (> 1024px) | Layout completo, bento asimétrico |

- Hero en móvil: gráfico de nodos oculto, solo texto y CTA
- Parallax desactivado en móvil (rendimiento)
- Glassmorphism simplificado en dispositivos con `backdrop-filter` limitado

### 5.4 Performance

- Fuentes: `next/font` con `display: swap`
- Imágenes: `next/image` con tamaños declarados, formato WebP
- GSAP: importación dinámica (`dynamic import`) para reducir bundle inicial
- `prefers-reduced-motion`: hook `useReducedMotion` de Framer Motion
- Core Web Vitals objetivo: LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## 6. Estrategia de testing — Agent 05

### 6.1 Tipos de testing para v1

| Tipo | Herramienta | Alcance |
|---|---|---|
| Visual / E2E | Playwright | Flujos completos, responsive |
| Unitario (utils) | Vitest | Funciones `lib/`, validaciones Zod |
| Accesibilidad | axe-playwright | Contraste, roles ARIA |

### 6.2 Checklist de testing por sección

**Navegación:**
- [ ] Menú sticky visible en todos los breakpoints
- [ ] Links de navegación apuntan a secciones correctas (scroll suave)
- [ ] CTA del header abre / navega a sección de contacto

**Hero:**
- [ ] Animación de texto no provoca CLS
- [ ] Carga < 2.5s en conexión simulada 4G
- [ ] CTAs visibles y funcionales en móvil

**Servicios Bento Grid:**
- [ ] Hover funciona en desktop (mouse)
- [ ] Cards accesibles via teclado (focus visible)
- [ ] Grid no rompe en 768px

**ADN / Parallax:**
- [ ] Parallax no causa layout shift
- [ ] Parallax desactivado con `prefers-reduced-motion`

**Formulario de Contacto:**
- [ ] Validación en tiempo real funciona (email inválido → línea roja)
- [ ] Envío con datos correctos → estado de carga → mensaje de éxito
- [ ] Envío con email inválido → error sin enviar
- [ ] API Route devuelve 400 si faltan campos requeridos
- [ ] Sin datos sensibles expuestos en red tab del navegador

**Responsive (dispositivos a probar):**
- iPhone 14 (390px)
- iPad Air (820px)
- Desktop 1440px
- Desktop 1920px

### 6.3 Pruebas de animaciones

- Verificar que no hay janks (< 60fps) en scroll de parallax
- Verificar que `prefers-reduced-motion: reduce` desactiva las animaciones
- Verificar que el glow del logo no causa CPU alto en idle

---

## 7. Plan de QA y calidad — Agent 06

### 7.1 Estándares de calidad de marca

- Consistencia de paleta: ningún color fuera de los tokens definidos
- Tipografía: solo `Space Grotesk`, `Inter` y `JetBrains Mono`
- Espaciado: escala de 4px (Tailwind default), nunca valores arbitrarios sin justificación
- Iconografía: set único (Lucide Icons o Heroicons), trazo consistente

### 7.2 Checklist de QA final

**Visual:**
- [ ] La web no parece una plantilla genérica
- [ ] El branding Pellisoft es reconocible en todos los breakpoints
- [ ] Ningún elemento visual roto o desalineado
- [ ] El glassmorphism del navbar y formulario se ve correcto en Chrome, Firefox y Safari
- [ ] Las sombras de glow no sangran fuera de sus contenedores

**Contenido:**
- [ ] Todos los textos están revisados ortográficamente
- [ ] El copy comunica confianza B2B (sin tecnicismos innecesarios ni lenguaje demasiado informal)
- [ ] El mensaje "Desde Teruel, para el mundo" es visible y claro
- [ ] El mensaje de éxito del formulario es correcto

**Accesibilidad (nivel AA mínimo):**
- [ ] Contraste de texto principal > 4.5:1
- [ ] Todos los links e inputs tienen `aria-label` o texto visible
- [ ] Animaciones respetar `prefers-reduced-motion`
- [ ] Foco visible en todos los elementos interactivos

**Rendimiento:**
- [ ] Lighthouse score > 90 en Performance, Accessibility, SEO
- [ ] Sin errores de consola en producción
- [ ] Imágenes optimizadas (WebP, tamaños correctos)

**Formulario de contacto:**
- [ ] Email llega correctamente al destinatario
- [ ] El template de email tiene el diseño correcto
- [ ] Los errores del formulario son comprensibles para el usuario

### 7.3 Metadatos SEO (por página)

```typescript
// app/layout.tsx — metadatos globales
export const metadata = {
  title: 'Pellisoft — Software industrial y empresarial',
  description: 'Sistemas MES, SaaS y automatización desde Teruel para el mundo.',
  openGraph: { /* imagen de preview, título, descripción */ },
  twitter: { card: 'summary_large_image' },
}
```

---

## 8. DevOps y despliegue — Agent 07

### 8.1 Configuración de Vercel

- **Framework preset:** Next.js (auto-detectado)
- **Build command:** `next build`
- **Output directory:** `.next`
- **Node version:** 20.x LTS
- **Región principal:** `cdg1` (Frankfurt) — para menor latencia en Europa

### 8.2 Variables de entorno en Vercel

```
RESEND_API_KEY             → Production + Preview
CONTACT_EMAIL_TO           → Production + Preview
NEXT_PUBLIC_SANITY_PROJECT_ID → All environments
NEXT_PUBLIC_SANITY_DATASET    → All environments
SANITY_API_TOKEN           → Production only
```

### 8.3 Flujo CI/CD

```
Push a main (GitHub)
    ↓
Vercel detecta cambio
    ↓
Build automático (next build)
    ↓
Deploy a producción (automático si build OK)
    ↓
Preview deploy en PRs / ramas de feature
```

**Regla:** Nunca hacer push directo a `main`. Usar ramas `feature/`, `fix/` y Pull Requests.

### 8.4 Estructura de ramas Git

```
main          → Producción (protegida)
develop       → Integración y preview
feature/*     → Nuevas funcionalidades
fix/*         → Correcciones
```

### 8.5 Dominio y DNS

- Dominio principal: `pellisoft.es` (o `.com` según disponibilidad)
- Configurar en Vercel: dominio personalizado + SSL automático (Let's Encrypt)
- Redirección: `www.pellisoft.es` → `pellisoft.es` (non-www canónico)

### 8.6 Analítica y privacidad

- Herramienta recomendada: **Plausible Analytics** (privacy-first, no requiere banner de cookies)
- Alternativa: **Fathom Analytics**
- No usar Google Analytics en v1 (rompe estética con banner de cookies)
- Integración: script en `app/layout.tsx` con Next.js `Script` component (`strategy="afterInteractive"`)

### 8.7 Checklist de lanzamiento

- [ ] Dominio conectado y SSL activo
- [ ] Variables de entorno configuradas en Vercel (producción)
- [ ] Test de formulario de contacto en producción
- [ ] Lighthouse en producción > 90
- [ ] Metadatos OG verificados con [opengraph.xyz](https://opengraph.xyz)
- [ ] Robots.txt y sitemap.xml generados (`next-sitemap`)
- [ ] Monitorización básica activa (Vercel Analytics o Plausible)

---

## 9. Mapa de dependencias entre agentes

```
Agent 02 (Functional Analyst)
    │ Entrega: arquitectura UX, flujos, reglas funcionales
    ▼
Agent 03 (Web Designer)
    │ Entrega: sistema de diseño, especificaciones de componentes
    ▼
Agent 01 (Software Architect)
    │ Entrega: estructura de proyecto, patrones técnicos
    ▼
Agent 04 (Frontend Expert)
    │ Entrega: implementación completa
    ▼
Agent 05 (Tester) ──────────────────────── Feedback → Agent 04
    │ Entrega: reporte de bugs y mejoras
    ▼
Agent 06 (QA)
    │ Entrega: validación final de calidad y marca
    ▼
Agent 07 (DevOps)
    Entrega: web en producción, CI/CD activo
```

---

## Anexo: Comandos de inicio del proyecto

```bash
# 1. Crear proyecto Next.js
npx create-next-app@latest pellisoft-web --typescript --tailwind --eslint --app --src-dir=false

# 2. Instalar dependencias principales
npm install framer-motion gsap @gsap/react

# 3. Instalar dependencias de CMS y email
npm install next-sanity @sanity/client resend react-email

# 4. Instalar utilidades
npm install zod lucide-react clsx tailwind-merge

# 5. Instalar Sanity Studio (si se incluye en el mismo repo)
npm create sanity@latest -- --project <id> --dataset production

# 6. Instalar herramientas de testing
npm install -D vitest playwright @playwright/test axe-playwright

# 7. Instalar utilidades de SEO
npm install next-sitemap
```

---

**Pellisoft**  
Software industrial y empresarial diseñado para escalar.  
*Documento de arquitectura — Versión 1.0*
