# Sprint 1 — Orchestration Document
## Orquestación de Agentes · Project Setup & Design Foundation

> **Sprint:** 1 — Project Setup & Design Foundation  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Estado:** En ejecución

---

## Índice

1. [Mapa de responsabilidades por agente](#1-mapa-de-responsabilidades-por-agente)
2. [Plan de ejecución y dependencias](#2-plan-de-ejecución-y-dependencias)
3. [Agent 01 — Software Architect](#3-agent-01--software-architect)
4. [Agent 03 — Web Designer / UI Expert](#4-agent-03--web-designer--ui-expert)
5. [Criterios de aceptación compartidos](#5-criterios-de-aceptación-compartidos)
6. [Flujo de validación del sprint](#6-flujo-de-validación-del-sprint)

---

## 1. Mapa de responsabilidades por agente

| User Story | Título | Agente responsable | Agente soporte |
|---|---|---|---|
| US-01 | Inicialización del proyecto | **Agent 01** | — |
| US-02 | Instalación de dependencias | **Agent 01** | — |
| US-03 | Tokens de diseño (Tailwind) | **Agent 03** | Agent 01 |
| US-04 | Tipografías (next/font) | **Agent 03** | Agent 01 |
| US-05 | Estructura de carpetas y archivos base | **Agent 01** | — |
| US-06 | Variables de entorno y configuración base | **Agent 01** | — |
| US-07 | globals.css y reset base | **Agent 03** | Agent 01 |
| US-08 | Root Layout y metadatos base | **Agent 01** | Agent 03 |

### Leyenda
- **Responsable**: ejecuta la tarea y entrega el artefacto
- **Soporte**: revisa o provee inputs para la tarea

---

## 2. Plan de ejecución y dependencias

```
[FASE A — Agent 01: Base técnica]
    US-01 Inicialización del proyecto
        ↓
    US-02 Instalación de dependencias
        ↓
    US-05 Estructura de carpetas
        ↓
    US-06 Variables de entorno

[FASE B — Agent 03: Sistema de diseño]  ← depende de US-01 completado
    US-03 Tokens de diseño (tailwind.config.ts)
        ↓
    US-04 Tipografías (layout.tsx)
        ↓
    US-07 globals.css reset oscuro

[FASE C — Agent 01 + Agent 03: Integración]  ← depende de A y B completados
    US-08 Root Layout + metadatos base
        ↓
    Verificación build producción (npm run build)
```

**Regla de orquestación:**
- La Fase B puede iniciar en paralelo con US-05 y US-06 de la Fase A.
- La Fase C solo se inicia cuando ambas fases anteriores están completadas.
- Ningún agente hace merge a `main` directamente — todo va por `feature/sprint-1-setup` → `develop`.

---

## 3. Agent 01 — Software Architect

### Contexto de rol
Agent 01 actúa como **Software Architect** en este sprint. Su misión es establecer los cimientos técnicos del proyecto — la base sobre la que se construirán todos los sprints posteriores.

### Tareas asignadas

#### TASK-01-A · Inicialización del proyecto Next.js
**Prioridad:** Crítica (bloqueante para todos los demás)  
**User Story:** US-01

```bash
# Ejecutar desde d:\Develop\Pellisoft\pellisoft-web
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**Verificación:**
- `npm run dev` arranca en `localhost:3000` sin errores
- Estructura `app/` activa (App Router)
- `tsconfig.json` correcto con path alias `@/*`

**Entregable:** Proyecto Next.js 14 funcional en directorio raíz del workspace.

---

#### TASK-01-B · Instalación de dependencias del stack
**Prioridad:** Alta  
**User Story:** US-02  
**Depende de:** TASK-01-A

```bash
# Animaciones
npm install framer-motion gsap @gsap/react

# Utilidades
npm install zod lucide-react clsx tailwind-merge

# Email
npm install resend react-email @react-email/components

# CMS
npm install next-sanity @sanity/client @sanity/image-url

# SEO
npm install next-sitemap

# Testing (dev)
npm install -D vitest @vitest/ui playwright @playwright/test
npm install -D @testing-library/react @testing-library/jest-dom
```

**Verificación:**
- `package.json` contiene todas las dependencias sin conflictos
- No hay warnings de peer dependencies críticos

**Entregable:** `package.json` y `package-lock.json` actualizados.

---

#### TASK-01-C · Estructura de carpetas del proyecto
**Prioridad:** Alta  
**User Story:** US-05  
**Depende de:** TASK-01-A

Crear la estructura completa según `docs/architecture.md` sección 3.2:

```
app/
  layout.tsx           ← Root layout (actualizar en US-08)
  page.tsx             ← Home placeholder
  servicios/
    page.tsx
  proyectos/
    page.tsx
    [slug]/
      page.tsx
  adn/
    page.tsx
  contacto/
    page.tsx
  api/
    contact/
      route.ts         ← Placeholder "coming soon"

components/
  layout/
    Navbar.tsx         ← Placeholder
    Footer.tsx         ← Placeholder
  sections/
    HeroSection.tsx    ← Placeholder
    ServicesSection.tsx
    HowWeWorkSection.tsx
    FeaturedProjectSection.tsx
    DnaSection.tsx
    ContactSection.tsx
  ui/
    Button.tsx         ← Placeholder
    Card.tsx
    GlowBorder.tsx
    GlassCard.tsx
    AnimatedText.tsx
    TerminalInput.tsx
  icons/
    index.ts

lib/
  sanity/
    client.ts
    queries.ts
  email/
    templates/
      ContactEmail.tsx
  utils.ts

hooks/
  useScrollAnimation.ts
  useGlowEffect.ts

styles/
  globals.css          ← (Agent 03 configura el contenido)

public/
  images/
    .gitkeep
  logos/
    logo-azul.png      ← Copiar desde docs/pellisoft-images-logo/logos/
    logo-blanco.png
    logo-morado.png
    logo-negro.png
    logo-verde.png
  fonts/
    .gitkeep
```

**Regla para placeholders:** Cada archivo de componente placeholder debe exportar un componente funcional vacío con comentario de sección:
```typescript
// TODO: Sprint X — [descripción del componente]
export default function NombreComponente() {
  return null
}
```

**Entregable:** Estructura de carpetas completa con todos los archivos placeholder.

---

#### TASK-01-D · Variables de entorno y next.config.ts
**Prioridad:** Media  
**User Story:** US-06  
**Depende de:** TASK-01-A

Crear `.env.local`:
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Resend (Email)
RESEND_API_KEY=
CONTACT_EMAIL_TO=

# Supabase (opcional, v2)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Crear `.env.example` (copia sin valores reales — commitable).

Verificar `.gitignore` contiene `.env.local`.

Configurar `next.config.ts`:
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

**Entregable:** `.env.local`, `.env.example`, `next.config.ts` configurados.

---

#### TASK-01-E · Root Layout y metadatos base
**Prioridad:** Media  
**User Story:** US-08  
**Depende de:** TASK-01-A, TASK-03-B (fuentes)

Actualizar `app/layout.tsx` con metadatos completos y fuentes integradas:
- Metadata: title, description, openGraph
- Fuentes cargadas via `next/font/google` con variables CSS
- `<html>` con `lang="es"` y variables de fuente aplicadas
- `<body>` con clase de fuente base

**Entregable:** `app/layout.tsx` completo y funcional.

---

### Criterios de aceptación de Agent 01

- [ ] `npm run dev` → sin errores de consola
- [ ] `npm run build` → build exitoso sin warnings críticos
- [ ] `npx tsc --noEmit` → sin errores TypeScript
- [ ] Todos los logos copiados a `public/logos/`
- [ ] `.env.local` no commiteado (está en `.gitignore`)
- [ ] Estructura de carpetas 100% creada

---

## 4. Agent 03 — Web Designer / UI Expert

### Contexto de rol
Agent 03 actúa como **Web Designer** en este sprint. Su misión es traducir la identidad visual de Pellisoft a tokens de diseño concretos — el sistema que garantiza coherencia en todos los componentes de los sprints posteriores.

### Referencia visual
- **Estética:** Industrial Tech · Dark Mode · SaaS Premium
- **Paleta base:** Negro Carbón `#0A0A0A` + Verde Encina `#2D5016` + Azul Tech `#1E40AF`
- **Logos disponibles:** `public/logos/` (copiados por Agent 01)
- **Mockup de referencia:** `docs/pellisoft-images-logo/mockup-onepage.png` (si disponible)

### Tareas asignadas

#### TASK-03-A · Configuración completa de tailwind.config.ts
**Prioridad:** Crítica (bloqueante para todos los componentes de diseño)  
**User Story:** US-03  
**Depende de:** TASK-01-A

Implementar `tailwind.config.ts` completo con:

**Paleta de colores completa:**
```typescript
colors: {
  // Fondos
  carbon:              '#0A0A0A',   // Fondo principal
  slate_dark:          '#111318',   // Fondo cards / secciones alternativas

  // Marca principal — gradiente tech
  tech_blue:           '#1E40AF',   // Azul Tech profundo
  tech_blue_light:     '#3B82F6',   // Azul Tech claro (hover, acentos)
  tech_purple:         '#7C3AED',   // Morado Tech — CTAs, innovación
  tech_purple_light:   '#A855F7',   // Morado Tech claro

  // Identidad territorial — Teruel
  encina:              '#2D5016',   // Verde Encina — borde navbar, identidad
  encina_light:        '#4A7C2F',   // Verde Encina claro — bordes cards
  encina_deep:         '#1A2F0D',   // Verde Encina profundo — fondo ADN section

  // Acento cálido — uso muy puntual
  arcilla:             '#C1440E',   // Arcilla — cursor, highlight narrativo
  arcilla_light:       '#E05520',   // Arcilla claro

  // Tipografía
  white_soft:          '#F5F5F5',   // Texto principal
  muted:               '#6B7280',   // Texto secundario / captions
  muted_light:         '#9CA3AF',   // Texto terciario / placeholders
}
```

**Tipografías:**
```typescript
fontFamily: {
  heading: ['var(--font-space-grotesk)', 'sans-serif'],
  body:    ['var(--font-inter)', 'sans-serif'],
  mono:    ['var(--font-jetbrains-mono)', 'monospace'],
}
```

**Tamaños de fuente custom:**
```typescript
fontSize: {
  'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
}
```

**Gradientes de fondo:**
```typescript
backgroundImage: {
  'gradient-tech':  'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
  'gradient-hero':  'radial-gradient(ellipse at top right, #3B82F620 0%, transparent 60%)',
  'gradient-encina':'linear-gradient(180deg, #2D501610 0%, transparent 100%)',
}
```

**Keyframes y animaciones:**
```typescript
keyframes: {
  glow_pulse: {
    '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
    '50%':      { opacity: '1',   filter: 'blur(12px)' },
  },
  cursor_blink: {
    '0%, 100%': { opacity: '1' },
    '50%':      { opacity: '0' },
  },
  fade_up: {
    '0%':   { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  text_shimmer: {
    '0%':   { backgroundPosition: '200% center' },
    '100%': { backgroundPosition: '-200% center' },
  },
},
animation: {
  'glow-pulse':    'glow_pulse 4s ease-in-out infinite',
  'cursor':        'cursor_blink 0.8s step-end infinite',
  'fade-up':       'fade_up 0.6s ease-out forwards',
  'text-shimmer':  'text_shimmer 3s linear infinite',
},
```

**Sombras custom (glow effects):**
```typescript
boxShadow: {
  'glow-encina':  '0 0 20px rgba(45, 80, 22, 0.4)',
  'glow-blue':    '0 0 20px rgba(59, 130, 246, 0.4)',
  'glow-purple':  '0 0 20px rgba(124, 58, 237, 0.4)',
  'glow-arcilla': '0 0 20px rgba(193, 68, 14, 0.4)',
  'card':         '0 4px 24px rgba(0, 0, 0, 0.4)',
},
```

**Entregable:** `tailwind.config.ts` completo y funcional.

---

#### TASK-03-B · Carga de tipografías con next/font
**Prioridad:** Alta  
**User Story:** US-04  
**Depende de:** TASK-01-A

Configurar en `app/layout.tsx` la carga de las 3 fuentes del sistema:

```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
```

Aplicar las 3 variables CSS al elemento `<html>`:
```typescript
<html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
```

**Verificación:**
- DevTools → Network → Fonts: cargan Space Grotesk, Inter, JetBrains Mono
- No hay FOUT visible en primera carga
- Variables CSS `--font-*` disponibles en DOM

**Entregable:** Fuentes integradas en `app/layout.tsx`.

---

#### TASK-03-C · globals.css — Reset oscuro y estilos base
**Prioridad:** Alta  
**User Story:** US-07  
**Depende de:** TASK-03-A, TASK-03-B

Implementar `styles/globals.css` con:

**Directivas Tailwind:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Variables CSS root:**
```css
:root {
  --bg-primary:    #0A0A0A;
  --color-primary: #F5F5F5;
}
```

**Reset base para modo oscuro:**
```css
html {
  scroll-behavior: smooth;
  color-scheme: dark;
}

body {
  background-color: #0A0A0A;
  color: #F5F5F5;
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Scrollbar oscura personalizada (marca Pellisoft):**
```css
::-webkit-scrollbar       { width: 6px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb { background: #2D5016; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #4A7C2F; }
```

**Respeto a prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Estilos base de selección de texto (marca):**
```css
::selection {
  background-color: #2D5016;
  color: #F5F5F5;
}
```

**Entregable:** `styles/globals.css` completo.

---

### Criterios de aceptación de Agent 03

- [ ] `tailwind.config.ts` tiene todos los tokens de color (sin ninguno hardcodeado en componentes)
- [ ] Las 3 fuentes (Space Grotesk, Inter, JetBrains Mono) se cargan correctamente
- [ ] El fondo de la web es `#0A0A0A` (Negro Carbón) sin modificación
- [ ] La scrollbar muestra el verde encina `#2D5016`
- [ ] `prefers-reduced-motion` desactiva todas las animaciones
- [ ] Los tokens de animación (`glow-pulse`, `cursor`) están disponibles como clases Tailwind

---

## 5. Criterios de aceptación compartidos

Verificación final que validan **ambos agentes**:

| Criterio | Verificación |
|---|---|
| `npm run dev` sin errores | `localhost:3000` muestra fondo negro carbón |
| `npm run build` limpio | `0 errors, 0 warnings` en terminal |
| `npx tsc --noEmit` | Sin errores TypeScript |
| Logos accesibles | `GET /logos/logo-azul.png` → 200 OK |
| Tokens de diseño funcionando | Clase `bg-carbon` aplica `#0A0A0A` |
| Fuentes cargando | DevTools Network → 3 fuentes activas |
| `.env.local` excluido de git | `git status` no muestra `.env.local` |
| Sin valores hardcodeados | `grep -r "#0A0A0A" components/` → 0 resultados |

---

## 6. Flujo de validación del sprint

```
Agent 01 completa TASK-01-A (base Next.js)
    ↓
Agent 01 y Agent 03 trabajan en paralelo:
    → Agent 01: TASK-01-B, TASK-01-C, TASK-01-D
    → Agent 03: TASK-03-A, TASK-03-B, TASK-03-C
    ↓
Integración: Agent 01 completa TASK-01-E (layout.tsx final)
    ↓
Verificación conjunta:
    → npm run dev ✓
    → npm run build ✓
    → npx tsc --noEmit ✓
    ↓
Rama feature/sprint-1-setup → Pull Request → develop
    ↓
Sprint 1 DONE ✓
```

---

## Artefactos entregados por el Sprint

| Artefacto | Agente | Estado |
|---|---|---|
| Proyecto Next.js 14 inicializado | Agent 01 | ⬜ Pendiente |
| `package.json` con stack completo | Agent 01 | ⬜ Pendiente |
| Estructura de carpetas completa | Agent 01 | ⬜ Pendiente |
| `.env.local` + `.env.example` | Agent 01 | ⬜ Pendiente |
| `next.config.ts` | Agent 01 | ⬜ Pendiente |
| `tailwind.config.ts` con tokens | Agent 03 | ⬜ Pendiente |
| `app/layout.tsx` con fuentes + metadata | Agent 01 + Agent 03 | ⬜ Pendiente |
| `styles/globals.css` reset oscuro | Agent 03 | ⬜ Pendiente |
| Logos en `public/logos/` | Agent 01 | ⬜ Pendiente |
| Componentes placeholder | Agent 01 | ⬜ Pendiente |

---

> **Nota del Orquestador:** Este documento es el contrato de trabajo del Sprint 1. Cualquier desviación de los tokens de diseño o la estructura de carpetas aquí definida debe ser aprobada por el orquestador antes de implementarse, ya que afecta a todos los sprints posteriores.
