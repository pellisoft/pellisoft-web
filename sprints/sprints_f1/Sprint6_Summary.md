# Sprint 6 — Summary
## CMS · QA Final · SEO · Deploy a Producción

> **Sprint:** 6  
> **Estado:** ✅ CÓDIGO COMPLETADO — Pendiente acciones manuales de infraestructura  
> **Fecha:** Mayo 2026  
> **TypeScript:** `npx tsc --noEmit` → 0 errores (todos los sprints)

---

## Resumen ejecutivo

Sprint 6 cierra la Fase 1 del proyecto. El código de producción está completo al 100%: Sanity CMS integrado con fallback graceful, páginas ISR funcionales, SEO técnico completo (JSON-LD, sitemap, robots.txt), favicon corregido, y configuración de build optimizada.

Las tareas restantes para el go-live son **exclusivamente manuales** (crear proyecto Sanity, configurar Vercel, DNS, test en producción) y están documentadas en detalle para que el desarrollador las ejecute.

---

## FIX-09 — Favicon logo-azul.png (aplicado por Orquestador)

**Problema:** `metadata.icons` en Sprint 5 apuntaba a `/logos/logo-azul.png` pero el `app/favicon.ico` por defecto de Next.js tenía prioridad en algunos navegadores.

**Solución aplicada:**
1. Copiado `public/logos/logo-azul.png` → `app/icon.png`  
   → Next.js App Router sirve automáticamente `app/icon.png` como `<link rel="icon">` nativo
2. Actualizado `metadata.icons` en `app/layout.tsx`:
   ```typescript
   icons: {
     icon: [{ url: '/icon.png', type: 'image/png' }],
     apple: [{ url: '/icon.png', type: 'image/png' }],
     shortcut: '/icon.png',
   },
   ```
3. `app/favicon.ico` permanece (Next.js lo ignora cuando existe `app/icon.png`)

**Resultado:** La "P" de Pellisoft en azul aparece en la pestaña del navegador en todos los navegadores modernos.

---

## US-39 + US-40 — Sanity CMS Setup (Agent 01)

### `lib/sanity/client.ts` — Implementado

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-15',
  useCdn:    process.env.NODE_ENV === 'production',
})
```

### `lib/sanity/queries.ts` — 4 GROQ queries

| Query | Descripción |
|---|---|
| `projectsQuery` | Todos los proyectos ordenados por `order` |
| `featuredProjectQuery` | Primer proyecto con `featured == true` |
| `projectBySlugQuery` | Proyecto individual por `slug.current` ($slug param) |
| `projectSlugsQuery` | Solo slugs, para `generateStaticParams` |

### `sanity/schemas/project.ts` — Esquema de documento

Campos del tipo `project`:
| Campo | Tipo | Notas |
|---|---|---|
| `title` | string | Requerido |
| `slug` | slug | Auto-generado desde title, requerido |
| `featured` | boolean | Para destacar en portada, default: false |
| `description` | text | Descripción breve |
| `image` | image | Con hotspot para recorte |
| `tags` | array of strings | Layout: tags UI |
| `metrics` | array of objects | `{ label, value }` — KPIs del proyecto |
| `order` | number | Orden en la lista, default: 99 |

### `sanity/sanity.config.ts`

Configuración del Sanity Studio (con `// @ts-nocheck` porque `sanity` no está instalado como devDependency; se instala cuando se configure el Studio con `npm install sanity @sanity/vision`).

---

## US-41 — Páginas de proyectos ISR (Agent 04)

### `components/ui/ProjectCard.tsx`

Card `"use client"` con:
- Imagen `next/image` con `fill` object-cover en ratio 16:9
- Placeholder con gradiente tech si no hay imagen
- Tags con `font-mono text-xs` en badges
- Métricas en fila (hasta 3) con `font-heading text-xl font-bold text-tech_blue_light`
- CTA `<Link>` → `/proyectos/[slug]` con ícono ArrowRight
- Scroll reveal `whileInView`

### `app/proyectos/page.tsx` — ISR

```typescript
export const revalidate = 60 // Revalida cada 60 segundos
```

Comportamiento:
- Si `NEXT_PUBLIC_SANITY_PROJECT_ID` no está configurado → retorna `[]` sin error
- Si hay proyectos: grid 3 columnas de `ProjectCard`
- Si no hay proyectos: placeholder "Próximamente" con CTA a `/contacto`

### `app/proyectos/[slug]/page.tsx` — Detalle ISR

Implementado con:
- `generateStaticParams()` — pre-renderiza slugs conocidos en build time
- `generateMetadata()` — título y descripción únicos por proyecto
- `await params` (Next.js 16 — `params` es Promise)
- `notFound()` si el proyecto no existe
- Layout: header con tags + H1, imagen si existe, descripción + métricas en grid 2/3 + 1/3, CTA a `/contacto`

---

## US-44 — next.config.ts: headers de caché (Agent 07)

Headers `Cache-Control: public, max-age=31536000, immutable` añadidos para:
- `/logos/:path*` — logos y assets de marca
- `/fonts/:path*` — fuentes locales

Mejora el Lighthouse Performance score al reducir peticiones repetidas de assets estáticos.

---

## US-45 — SEO Técnico (Agent 04 + 07)

### JSON-LD Organization Schema

Añadido en `app/layout.tsx` con `<Script>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pellisoft",
  "url": "https://pellisoft.es",
  "email": "info@pellisoft.es",
  "address": {
    "addressLocality": "Teruel",
    "addressRegion": "Aragón",
    "addressCountry": "ES"
  }
}
```

### `app/sitemap.ts` — Sitemap nativo Next.js

Rutas estáticas:
```
/             → priority 1.0
/servicios    → priority 0.8
/proyectos    → priority 0.9
/adn          → priority 0.7
/contacto     → priority 0.8
```

Rutas dinámicas: generadas desde Sanity (`/proyectos/[slug]`) con fallback graceful si Sanity no está configurado.

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://pellisoft.es/sitemap.xml
```

### `next-sitemap.config.js`

Configurado para uso con `npm run postbuild` (por si se prefiere el sitemap estático sobre el dinámico de `app/sitemap.ts`).

---

## US-47 — Plausible Analytics (Agent 04)

Añadido en `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="pellisoft.es"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

- Privacy-first: no cookies, no GDPR banner necesario
- `strategy="afterInteractive"` → no bloquea el render inicial
- Activo al hacer `npm run build` + deploy — requiere crear cuenta en plausible.io y añadir el dominio

---

## DevOps (Agent 07)

### `README.md` — Completamente reescrito

El README ahora incluye:
- Stack técnico con versiones
- Comandos: `npm run dev`, `npm run build`, `npm start`, `npx tsc --noEmit`
- Variables de entorno tabuladas con descripción
- Estructura de carpetas principal
- Guía Sanity CMS (acceso al Studio, publicar proyectos)
- Instrucciones de deploy (Vercel + git push)

### `package.json` — Script `postbuild`

```json
"postbuild": "next-sitemap"
```

Se ejecuta automáticamente después de `npm run build`.

---

## Inventario completo del proyecto (post Sprint 6)

```
app/
  layout.tsx              ✅ ACTUALIZADO (JSON-LD + Plausible + favicon Sprint 6)
  icon.png                ✅ NUEVO (favicon logo-azul, Sprint 6)
  page.tsx                ✅ (Sprint 5)
  sitemap.ts              ✅ NUEVO (Sprint 6)
  api/contact/route.ts    ✅ (Sprint 5)
  servicios/page.tsx      ✅ (Sprint 5)
  adn/page.tsx            ✅ (Sprint 5)
  contacto/page.tsx       ✅ (Sprint 5)
  proyectos/
    page.tsx              ✅ ACTUALIZADO ISR (Sprint 6)
    [slug]/page.tsx       ✅ IMPLEMENTADO (Sprint 6)

components/
  layout/
    Navbar.tsx            ✅ (Sprint 5)
    Footer.tsx            ✅ (Sprint 4)
    SecondaryHero.tsx     ✅ (Sprint 5)
  sections/
    HeroSection.tsx       ✅ (Sprint 2)
    ServicesSection.tsx   ✅ (Sprint 3)
    HowWeWorkSection.tsx  ✅ (Sprint 3)
    FeaturedProjectSection.tsx ✅ (Sprint 4/5)
    DnaSection.tsx        ✅ (Sprint 4)
    ContactSection.tsx    ✅ (Sprint 5)
  ui/
    PIsotype.tsx          ✅ (Sprint 4)
    Button.tsx            ✅ (Sprint 2)
    AnimatedText.tsx      ✅ (Sprint 2)
    Card.tsx              ✅ (Sprint 3)
    AnimatedCounter.tsx   ✅ (Sprint 4)
    MockDashboard.tsx     ✅ (Sprint 4)
    TerminalInput.tsx     ✅ (Sprint 5)
    SubmitButton.tsx      ✅ (Sprint 5)
    TeruelMap.tsx         ✅ (Sprint 5)
    ProjectCard.tsx       ✅ NUEVO (Sprint 6)
  icons/
    MesIcon.tsx / TpvIcon.tsx / FacturacionIcon.tsx / index.ts ✅ (Sprint 3)

lib/
  sanity/
    client.ts             ✅ IMPLEMENTADO (Sprint 6)
    queries.ts            ✅ IMPLEMENTADO (Sprint 6)
  email/templates/
    ContactEmail.tsx      ✅ (Sprint 5)

sanity/
  schemas/
    project.ts            ✅ NUEVO (Sprint 6)
    index.ts              ✅ NUEVO (Sprint 6)
  sanity.config.ts        ✅ NUEVO (Sprint 6, ts-nocheck)

public/
  logos/                  ✅ 5 variantes (azul, blanco, verde, negro, morado)
  robots.txt              ✅ NUEVO (Sprint 6)

styles/
  globals.css             ✅ (Sprint 5)
tailwind.config.ts        ✅ (Sprint 1)
next.config.ts            ✅ ACTUALIZADO headers (Sprint 6)
next-sitemap.config.js    ✅ NUEVO (Sprint 6)
README.md                 ✅ ACTUALIZADO (Sprint 6)
```

---

## Tareas manuales de go-live

El siguiente checklist es para el developer, NO requiere cambios de código:

### Antes del primer deploy

```
[ ] 1. Crear proyecto Sanity en sanity.io
       → Obtener NEXT_PUBLIC_SANITY_PROJECT_ID
       → Publicar proyecto MES de prueba con featured: true

[ ] 2. Configurar email en Resend (resend.com)
       → Verificar dominio pellisoft.es para envío
       → Obtener RESEND_API_KEY
       → Configurar CONTACT_EMAIL_TO=info@pellisoft.es

[ ] 3. Crear cuenta Plausible (plausible.io)
       → Añadir dominio pellisoft.es
       → No necesita configuración adicional en el código

[ ] 4. Conectar repositorio GitHub a Vercel (vercel.com/new)
       → Seleccionar repo pellisoft-web
       → Framework preset: Next.js

[ ] 5. Configurar variables de entorno en Vercel (antes del primer build):
       RESEND_API_KEY          = [de Resend]
       CONTACT_EMAIL_TO        = info@pellisoft.es
       NEXT_PUBLIC_SANITY_PROJECT_ID = [de Sanity]
       NEXT_PUBLIC_SANITY_DATASET    = production
       SANITY_API_TOKEN        = [de Sanity settings > API]
```

### Deploy

```bash
git checkout main
git merge develop
git push origin main
# Vercel despliega automáticamente
```

### DNS (si dominio en registrador externo)

```
Tipo  | Host | Valor
A     | @    | 76.76.21.21
CNAME | www  | cname.vercel-dns.com
```

### Post-deploy checklist

```
[ ] SSL activo (candado verde)
[ ] Favicon logo-azul visible en la pestaña
[ ] Test formulario → email recibido en info@pellisoft.es
[ ] /sitemap.xml accesible
[ ] /robots.txt accesible
[ ] Plausible registra visita de prueba
[ ] Lighthouse Performance ≥ 90 (Chrome DevTools → Lighthouse)
[ ] Añadir dominio a Google Search Console
[ ] Enviar sitemap desde Search Console
```

---

## Decisiones técnicas del sprint

| Decisión | Razón |
|---|---|
| `app/icon.png` en lugar de solo `metadata.icons` | Next.js App Router da prioridad al archivo físico `app/icon.{png,jpg,svg}` sobre `metadata.icons`. Más fiable en todos los navegadores. |
| Sanity con fallback graceful (try/catch + env check) | La web funciona perfectamente sin Sanity configurado. Evita errores en build y en previews sin CMS. |
| `await params` en rutas dinámicas | Next.js 16 tipea `params` como `Promise` en Server Components. Necesario para compilación sin errores. |
| `app/sitemap.ts` nativo en lugar de solo `next-sitemap` | El sitemap nativo de Next.js es dinámico (incluye rutas de Sanity en tiempo real). `next-sitemap.config.js` queda como alternativa estática. |
| `// @ts-nocheck` en `sanity.config.ts` | El package `sanity` (Studio) no está instalado. Este archivo es referencia para cuando se configure el Studio. No afecta al build de la web. |
| `strategy="afterInteractive"` para Plausible | No bloquea el First Contentful Paint. El script de analytics es no-crítico. |

---

## Métricas del sprint

| Métrica | Valor |
|---|---|
| Archivos nuevos creados | 9 |
| Archivos modificados | 6 |
| Errores TypeScript (todos los sprints) | 0 |
| Páginas de la web | 5 (Home + /servicios + /adn + /contacto + /proyectos) |
| Rutas dinámicas | 1 (/proyectos/[slug]) |
| Archivos SEO generados | 3 (sitemap.ts, robots.txt, JSON-LD) |
| Instalaciones manuales pendientes | 1 (`sanity` package para el Studio) |

---

## Resumen por sprint — Fase 1 completa

| Sprint | Estado | Hito |
|---|---|---|
| Sprint 1 | ✅ | Setup: Next.js, Tailwind tokens, estructura |
| Sprint 2 | ✅ | Navbar glassmorphism + Hero + PIsotype |
| Sprint 3 | ✅ | Bento Grid servicios + proceso 4 pasos |
| Sprint 4 | ✅ | PIsotype rediseño + Caso MES + ADN + Footer |
| Sprint 5 | ✅ | Contact Command Center + páginas secundarias + fixes nav |
| Sprint 6 | ✅ | Sanity CMS + SEO + sitemap + favicon + build config |
| **FASE 1** | **✅ CÓDIGO LISTO** | **Deploy pendiente (acciones manuales)** |
