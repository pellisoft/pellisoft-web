# Sprint 1 — Summary
## Project Setup & Design Foundation · Fase 1

> **Estado:** ✅ COMPLETADO  
> **Fecha de inicio:** Mayo 2026  
> **Fecha de cierre:** Mayo 2026  
> **Rama:** `feature/sprint-1-setup`  
> **Agentes ejecutados:** Agent 01 (Software Architect) · Agent 03 (Web Designer)

---

## Resultado del Sprint

> **Sprint Goal cumplido:** El proyecto arranca en local, tiene todos los tokens de color y tipografía definidos, la estructura de carpetas establecida y los logos integrados en sus rutas correctas.

---

## Build final

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully
✓ TypeScript: 0 errors
✓ Generating static pages (9/9)

Routes generadas:
  ○ /               (SSG)
  ○ /adn            (SSG)
  ○ /contacto       (SSG)
  ○ /proyectos      (SSG)
  ƒ /proyectos/[slug] (SSR/ISR)
  ƒ /api/contact    (API Route)
  ○ /servicios      (SSG)
```

---

## Decisiones técnicas tomadas

### DEC-01 — Tailwind CSS v4 → Downgrade a v3.4.19

**Situación:** `create-next-app@latest` instaló automáticamente Tailwind CSS v4, que usa una sintaxis CSS diferente (`@theme {}` en lugar de `tailwind.config.ts`).

**Decisión:** Downgrade a Tailwind CSS v3.4.19 para respetar la arquitectura definida en `docs/architecture.md`.

**Justificación:**
- La arquitectura especifica explícitamente Tailwind v3 con `tailwind.config.ts`
- Toda la documentación del sistema de diseño usa tokens v3
- Los sprints 2-6 dependen de la sintaxis de `tailwind.config.ts`
- Tailwind v3 tiene mayor estabilidad y soporte de plugins en fecha de este sprint

**Impacto:** Ninguno en funcionalidad. `postcss.config.mjs` actualizado a `tailwindcss + autoprefixer`.

---

### DEC-02 — Inicialización en directorio raíz

**Situación:** El workspace `pellisoft-web/` ya existía con `docs/` y `sprints/`. El sprint requería `npx create-next-app@latest pellisoft-web` (crearía subdirectorio).

**Decisión:** Inicializar con `npx create-next-app@latest .` en el directorio raíz.

**Justificación:** El workspace IS el proyecto — los archivos de documentación conviven con el código fuente, según la estructura definida en `docs/architecture.md`.

**Impacto:** Ninguno. Los directorios `docs/` y `sprints/` conviven con el proyecto Next.js sin conflictos.

---

## Artefactos entregados

### Agent 01 — Software Architect

| Artefacto | Estado | Notas |
|---|---|---|
| Proyecto Next.js 14 inicializado | ✅ | v16.2.6 con App Router + TypeScript |
| `package.json` con stack completo | ✅ | 1337 paquetes instalados |
| Estructura de carpetas completa | ✅ | 29 archivos placeholder |
| `.env.local` | ✅ | Variables vacías, excluido de git |
| `.env.example` | ✅ | Commitable, sin valores reales |
| `next.config.ts` | ✅ | remotePatterns para cdn.sanity.io |
| `app/page.tsx` limpio | ✅ | Placeholder con roadmap de secciones |
| `app/api/contact/route.ts` | ✅ | Placeholder "coming soon" |
| `lib/utils.ts` con `cn()` | ✅ | Utility clsx + tailwind-merge |
| `public/logos/` con 5 logos | ✅ | Copiados desde docs/ |

### Agent 03 — Web Designer

| Artefacto | Estado | Notas |
|---|---|---|
| `tailwind.config.ts` completo | ✅ | 16 colores + tipografías + sombras + animaciones |
| `postcss.config.mjs` v3 | ✅ | tailwindcss + autoprefixer |
| `app/layout.tsx` con fuentes + metadata | ✅ | 3 fuentes Google + SEO completo |
| `styles/globals.css` reset oscuro | ✅ | Dark mode + scrollbar + reduced-motion |

---

## Tokens de diseño implementados

### Paleta de colores (16 tokens)

| Token | Valor | Uso |
|---|---|---|
| `carbon` | `#0A0A0A` | Fondo principal |
| `slate_dark` | `#111318` | Fondo cards / alternativo |
| `tech_blue` | `#1E40AF` | Gradiente hero, links primarios |
| `tech_blue_light` | `#3B82F6` | Hover, acentos azul |
| `tech_purple` | `#7C3AED` | CTAs, innovación |
| `tech_purple_light` | `#A855F7` | Hover, acentos morado |
| `encina` | `#2D5016` | Borde navbar, identidad territorial |
| `encina_light` | `#4A7C2F` | Bordes cards, hover |
| `encina_deep` | `#1A2F0D` | Fondo ADN section |
| `arcilla` | `#C1440E` | Cursor terminal, highlight narrativo |
| `arcilla_light` | `#E05520` | Hover arcilla |
| `white_soft` | `#F5F5F5` | Texto principal |
| `muted` | `#6B7280` | Texto secundario |
| `muted_light` | `#9CA3AF` | Placeholders, texto terciario |

### Sistema tipográfico

| Familia | Variable CSS | Fuente | Pesos |
|---|---|---|---|
| `font-heading` | `--font-space-grotesk` | Space Grotesk | 400, 500, 600, 700 |
| `font-body` | `--font-inter` | Inter | 400, 500 |
| `font-mono` | `--font-jetbrains-mono` | JetBrains Mono | 400 |

### Animaciones disponibles

| Clase Tailwind | Descripción | Duración |
|---|---|---|
| `animate-glow-pulse` | Pulsación del isotipo logo | 4s infinite |
| `animate-cursor` | Cursor terminal parpadeante | 0.8s infinite |
| `animate-fade-up` | Entrada de elementos | 0.6s forwards |

### Sombras glow

| Clase Tailwind | Color | Uso |
|---|---|---|
| `shadow-glow-encina` | Verde encina 40% | Navbar, elementos de identidad |
| `shadow-glow-blue` | Azul tech 40% | Cards servicios, CTAs |
| `shadow-glow-purple` | Morado tech 40% | CTAs innovación |
| `shadow-glow-arcilla` | Arcilla 40% | Inputs formulario activos |
| `shadow-card` | Negro 40% | Cards en general |

---

## Estructura de carpetas final

```
pellisoft-web/
├── app/
│   ├── layout.tsx          ✅ Fuentes + metadata SEO
│   ├── page.tsx            ✅ Placeholder Home
│   ├── adn/page.tsx        ✅ Placeholder
│   ├── contacto/page.tsx   ✅ Placeholder
│   ├── proyectos/
│   │   ├── page.tsx        ✅ Placeholder
│   │   └── [slug]/page.tsx ✅ Placeholder
│   ├── servicios/page.tsx  ✅ Placeholder
│   └── api/contact/route.ts ✅ Placeholder API
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ✅ Placeholder
│   │   └── Footer.tsx      ✅ Placeholder
│   ├── sections/           ✅ 6 secciones placeholder
│   ├── ui/                 ✅ 6 átomos placeholder
│   └── icons/index.ts      ✅ Placeholder
│
├── lib/
│   ├── sanity/             ✅ client.ts + queries.ts
│   ├── email/templates/    ✅ ContactEmail.tsx
│   └── utils.ts            ✅ cn() utility
│
├── hooks/
│   ├── useScrollAnimation.ts ✅ Placeholder
│   └── useGlowEffect.ts    ✅ Placeholder
│
├── styles/
│   └── globals.css         ✅ Reset oscuro completo
│
├── public/
│   ├── logos/              ✅ 5 logos PNG
│   ├── images/.gitkeep     ✅
│   └── fonts/.gitkeep      ✅
│
├── docs/                   ✅ Documentación (preexistente)
├── sprints/                ✅ Sprint docs (preexistente)
│
├── tailwind.config.ts      ✅ Sistema de diseño completo
├── next.config.ts          ✅ Sanity CDN configurado
├── tsconfig.json           ✅ Path alias @/* activo
├── .env.local              ✅ Variables (excluido de git)
├── .env.example            ✅ Template commitable
└── postcss.config.mjs      ✅ Tailwind v3 + autoprefixer
```

---

## Dependencias instaladas

### Producción
| Paquete | Versión | Sprint de uso |
|---|---|---|
| `next` | 16.2.6 | Todos |
| `react` / `react-dom` | 19.x | Todos |
| `typescript` | 5.x | Todos |
| `tailwindcss` | 3.4.19 | Todos |
| `framer-motion` | latest | Sprint 2, 3, 4 |
| `gsap` + `@gsap/react` | latest | Sprint 3 (DnaSection parallax) |
| `zod` | latest | Sprint 5 (formulario) |
| `lucide-react` | latest | Sprint 2+ (iconografía) |
| `clsx` + `tailwind-merge` | latest | Todos los componentes |
| `resend` + `react-email` | latest | Sprint 5 (contacto) |
| `next-sanity` + `@sanity/client` | latest | Sprint 4+ (CMS) |
| `next-sitemap` | latest | Sprint 6 (SEO) |

### Desarrollo
| Paquete | Uso |
|---|---|
| `vitest` + `@vitest/ui` | Unitarios (lib/, utils) |
| `playwright` + `@playwright/test` | E2E y visual |
| `@testing-library/react` | Testing de componentes |

---

## Criterios de aceptación — Estado final

| Criterio | Estado |
|---|---|
| `npm run dev` sin errores | ✅ |
| `npm run build` limpio | ✅ (9 rutas, 0 errores) |
| `npx tsc --noEmit` limpio | ✅ (0 errores TypeScript) |
| Fondo Negro Carbón en `localhost:3000` | ✅ |
| 5 logos en `public/logos/` | ✅ |
| `tailwind.config.ts` con todos los tokens | ✅ |
| 3 fuentes cargando correctamente | ✅ (Space Grotesk, Inter, JetBrains Mono) |
| Sin valores hardcodeados fuera de tokens | ✅ |
| `.env.local` excluido de git | ✅ |
| Estructura de carpetas completa | ✅ |

---

## Deuda técnica y notas para sprints siguientes

### NOTA-01 — Sanity Studio
El directorio `sanity/` con el Sanity Studio no fue creado en este sprint. Se pospone al Sprint 4 (CMS / ISR), cuando se necesite realmente.

### NOTA-02 — `@sanity/image-url`
Instalado pero el helper de `lib/sanity/client.ts` está como placeholder. Se implementa en Sprint 4.

### NOTA-03 — Testing config
`vitest.config.ts` y `playwright.config.ts` no están configurados. Se configuran en Sprint 5 (Testing) junto con los primeros tests reales.

### NOTA-04 — `prefers-reduced-motion` hook
El hook `useReducedMotion` de Framer Motion estará disponible cuando se implementen las animaciones en Sprint 2+. El hook personalizado `hooks/useScrollAnimation.ts` es un placeholder.

---

## Próximo sprint

**Sprint 2 — Hero Section & Navbar**
- Agente responsable: Agent 04 (Frontend Expert) + Agent 03 (Design review)
- Objetivo: Implementar `Navbar.tsx` con glassmorphism y `HeroSection.tsx` con animaciones de entrada, isotipo "P" y text rotation
- Dependencia: Sprint 1 ✅ COMPLETADO

---

> **Firma del Orquestador:** Todos los criterios de aceptación del Sprint 1 han sido verificados. El proyecto está listo para Sprint 2.
