# Sprint 1 — Project Setup & Design Foundation
## Fase 1 · Duración estimada: 1 semana

> **Agentes responsables:** Agent 01 (Software Architect) · Agent 03 (Web Designer)  
> **Objetivo:** Inicializar el proyecto con el stack completo, configurar los tokens de diseño y dejar la base técnica 100% lista para construir encima.

---

## Goal del Sprint

> **"Al terminar este sprint, el proyecto arranca en local, tiene todos los tokens de color y tipografía definidos, la estructura de carpetas establecida y los logos integrados en sus rutas correctas."**

---

## Contexto visual de referencia

- **Mockup principal:** `docs/pellisoft-images-logo/mockup-onepage.png`  
  → Fondo Negro Carbón, logo azul en navbar, isotipo "P" con gradiente azul→morado en hero
- **Logos disponibles en** `docs/pellisoft-images-logo/logos/`:

| Archivo | Uso en la web |
|---|---|
| `logo-azul.png` | Navbar (sobre fondo oscuro) — logo principal |
| `logo-blanco.png` | Footer · Secciones muy oscuras alternativas |
| `logo-morado.png` | Hero si se usa sobre el gradiente morado del isotipo |
| `logo-negro.png` | Reservado para fondos claros (futuras páginas) |
| `logo-verde.png` | Sección ADN Pellisoft — identidad territorial |

---

## Historias de usuario

### US-01 · Inicialización del proyecto
**Como** desarrollador,  
**quiero** tener el proyecto Next.js 14 inicializado con TypeScript, Tailwind y ESLint,  
**para que** pueda comenzar a construir componentes sin fricción técnica.

**Tareas:**
- [ ] Ejecutar `npx create-next-app@latest pellisoft-web --typescript --tailwind --eslint --app`
- [ ] Verificar que `npm run dev` arranca sin errores en `localhost:3000`
- [ ] Eliminar contenido de ejemplo de `app/page.tsx` y `globals.css`
- [ ] Confirmar estructura App Router activa (`app/` directory)

---

### US-02 · Instalación de dependencias
**Como** desarrollador,  
**quiero** tener todas las librerías del stack instaladas,  
**para que** no haya que interrumpir el trabajo en sprints posteriores.

**Tareas:**
- [ ] Instalar animaciones: `npm install framer-motion gsap @gsap/react`
- [ ] Instalar utilidades: `npm install zod lucide-react clsx tailwind-merge`
- [ ] Instalar email: `npm install resend react-email`
- [ ] Instalar CMS: `npm install next-sanity @sanity/client`
- [ ] Instalar SEO: `npm install next-sitemap`
- [ ] Instalar testing: `npm install -D vitest playwright @playwright/test`
- [ ] Verificar que no hay conflictos en `package.json`

---

### US-03 · Tokens de diseño (Tailwind)
**Como** diseñador/desarrollador,  
**quiero** tener la paleta de colores y tipografías definidas como tokens en Tailwind,  
**para que** todos los componentes usen el mismo sistema de diseño sin valores hardcodeados.

**Tareas:**
- [ ] Configurar `tailwind.config.ts` con la paleta completa:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondos
        carbon:       '#0A0A0A',
        slate_dark:   '#111318',
        // Marca principal
        tech_blue:    '#1E40AF',
        tech_blue_light: '#3B82F6',
        tech_purple:  '#7C3AED',
        tech_purple_light: '#A855F7',
        // Identidad territorial
        encina:       '#2D5016',
        encina_light: '#4A7C2F',
        encina_deep:  '#1A2F0D',
        arcilla:      '#C1440E',
        arcilla_light:'#E05520',
        // Tipografía
        white_soft:   '#F5F5F5',
        muted:        '#6B7280',
        muted_light:  '#9CA3AF',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top right, #3B82F620 0%, transparent 60%)',
      },
      keyframes: {
        glow_pulse: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%':       { opacity: '1',   filter: 'blur(12px)' },
        },
        cursor_blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
      },
      animation: {
        'glow-pulse': 'glow_pulse 4s ease-in-out infinite',
        'cursor':     'cursor_blink 0.8s step-end infinite',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### US-04 · Tipografías (Google Fonts / next/font)
**Como** diseñador/desarrollador,  
**quiero** las fuentes cargadas con `next/font` y sin layout shift,  
**para que** la web cargue rápido y la tipografía sea correcta desde el primer render.

**Tareas:**
- [ ] Configurar `app/layout.tsx` con `next/font/google`:
  - `Space_Grotesk` — weights: 400, 500, 600, 700
  - `Inter` — weights: 400, 500
  - `JetBrains_Mono` — weights: 400
- [ ] Aplicar variables CSS a `<html>` via `className`
- [ ] Verificar carga sin FOUT en DevTools

---

### US-05 · Estructura de carpetas y archivos base
**Como** desarrollador,  
**quiero** la estructura de carpetas del proyecto creada según la arquitectura,  
**para que** todos los sprints tengan un lugar definido donde escribir código.

**Tareas:**
- [ ] Crear estructura completa según `docs/architecture.md` sección 3.2:
  ```
  app/
    layout.tsx         ← Root layout con metadatos base y fuentes
    page.tsx           ← Home (vacío con placeholder)
    servicios/page.tsx
    proyectos/page.tsx
    adn/page.tsx
    contacto/page.tsx
    api/contact/route.ts ← Placeholder "coming soon"
  components/
    layout/            ← Navbar.tsx, Footer.tsx (vacíos)
    sections/          ← Archivos vacíos por sección
    ui/                ← Archivos vacíos de átomos
    icons/
  lib/
    sanity/
    email/templates/
    utils.ts
  hooks/
  styles/
    globals.css
  public/
    images/
    logos/             ← Copiar logos desde docs/
  ```
- [ ] Copiar logos a `public/logos/`:
  - `public/logos/logo-azul.png`
  - `public/logos/logo-blanco.png`
  - `public/logos/logo-morado.png`
  - `public/logos/logo-negro.png`
  - `public/logos/logo-verde.png`

---

### US-06 · Variables de entorno y configuración base
**Como** desarrollador,  
**quiero** el archivo `.env.local` y la configuración de Next.js preparados,  
**para que** los sprints de integración no necesiten parar a configurar entornos.

**Tareas:**
- [ ] Crear `.env.local` con todas las variables (vacías por ahora):
  ```env
  NEXT_PUBLIC_SANITY_PROJECT_ID=
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=
  RESEND_API_KEY=
  CONTACT_EMAIL_TO=
  ```
- [ ] Crear `.env.example` (para commitear sin valores reales)
- [ ] Añadir `.env.local` a `.gitignore`
- [ ] Configurar `next.config.ts`:
  - Habilitar `images.domains` para Sanity CDN
  - Habilitar `experimental.optimizeCss` si aplica

---

### US-07 · globals.css y reset base
**Como** desarrollador,  
**quiero** el CSS base limpio con el modo oscuro como default,  
**para que** todos los componentes partan del fondo correcto.

**Tareas:**
- [ ] Configurar `styles/globals.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --bg-primary: #0A0A0A;
    --color-primary: #F5F5F5;
  }

  html {
    scroll-behavior: smooth;
    color-scheme: dark;
  }

  body {
    background-color: #0A0A0A;
    color: #F5F5F5;
    font-family: var(--font-inter);
    -webkit-font-smoothing: antialiased;
  }

  /* Scrollbar oscura */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #2D5016; border-radius: 3px; }

  /* prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

### US-08 · Root Layout y metadatos base
**Como** SEO/desarrollador,  
**quiero** los metadatos globales definidos en `app/layout.tsx`,  
**para que** la web tenga título, descripción e imagen OG correctos desde el inicio.

**Tareas:**
- [ ] Configurar `app/layout.tsx` con metadata:
  ```typescript
  export const metadata: Metadata = {
    title: 'Pellisoft — Software industrial y empresarial',
    description: 'Sistemas MES, SaaS y automatización desde Teruel para el mundo.',
    openGraph: {
      title: 'Pellisoft — Software industrial y empresarial',
      description: 'Sistemas MES, SaaS y automatización desde Teruel para el mundo.',
      url: 'https://pellisoft.es',
      siteName: 'Pellisoft',
      locale: 'es_ES',
      type: 'website',
    },
  }
  ```
- [ ] Envolver el `<body>` con un contenedor de fuente aplicada

---

## Criterios de aceptación del Sprint

- [ ] `npm run dev` → sin errores de consola, carga en < 1s
- [ ] `npm run build` → build de producción sin warnings ni errores
- [ ] La web muestra fondo Negro Carbón al visitar `localhost:3000`
- [ ] Los 5 logos están accesibles en `public/logos/`
- [ ] `tailwind.config.ts` tiene todos los tokens definidos y funcionando
- [ ] Las 3 fuentes cargan correctamente (verificable en DevTools → Network)
- [ ] No hay valores de color hardcodeados fuera de `tailwind.config.ts`

---

## Dependencias / bloqueantes

- Ninguna dependencia externa bloqueante. Este sprint es autocontenido.

## Definition of Done

- Código en rama `feature/sprint-1-setup` mergeada a `develop`
- No hay errores de TypeScript (`npx tsc --noEmit` limpio)
- Estructura de carpetas completa y logos en su lugar
- Revisión de Agent 01 aprobada antes de merge
