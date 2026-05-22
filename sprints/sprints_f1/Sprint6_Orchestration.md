# Sprint 6 — Orchestration Document
## CMS · QA Final · SEO · Deploy a Producción

> **Sprint:** 6  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Prerequisito:** Sprint 5 ✅ COMPLETADO  
> **Estado:** En ejecución

---

## Índice

1. [Estado inicial del proyecto](#1-estado-inicial-del-proyecto)
2. [Mapa de responsabilidades por agente](#2-mapa-de-responsabilidades-por-agente)
3. [Plan de ejecución y dependencias](#3-plan-de-ejecución-y-dependencias)
4. [Agent 01 — Software Architect](#4-agent-01--software-architect)
5. [Agent 04 — Frontend Expert](#5-agent-04--frontend-expert)
6. [Agent 05 — Tester](#6-agent-05--tester)
7. [Agent 06 — QA](#7-agent-06--qa)
8. [Agent 07 — DevOps](#8-agent-07--devops)
9. [Tareas manuales (fuera del scope de código)](#9-tareas-manuales-fuera-del-scope-de-código)
10. [Criterios de aceptación del Sprint](#10-criterios-de-aceptación-del-sprint)

---

## 1. Estado inicial del proyecto

### Fixes aplicados antes de Sprint 6
| Fix | Estado |
|---|---|
| **FIX-09 · Favicon logo-azul.png** | ✅ APLICADO — `app/icon.png` creado desde `public/logos/logo-azul.png`. `metadata.icons` actualizado con `shortcut` + `icon` + `apple`. Next.js App Router sirve automáticamente `<link rel="icon">` desde `app/icon.png`. |

### Archivos stub pendientes de implementar
| Archivo | Estado |
|---|---|
| `lib/sanity/client.ts` | Stub con TODO — necesita implementación real |
| `lib/sanity/queries.ts` | Stub con TODO — necesita queries GROQ |
| `app/proyectos/[slug]/page.tsx` | Stub `return null` — necesita implementación |
| `app/proyectos/page.tsx` | Placeholder "Próximamente" — necesita ISR desde Sanity |

### Archivos a crear (nuevos en Sprint 6)
- `sanity/sanity.config.ts`
- `sanity/schemas/project.ts`
- `sanity/schemas/index.ts`
- `next-sitemap.config.js`
- `app/sitemap.ts` (alternativa nativa de Next.js)
- `components/ui/ProjectCard.tsx`

---

## 2. Mapa de responsabilidades por agente

| User Story / Task | Título | Agente |
|---|---|---|
| FIX-09 | Favicon logo-azul.png | ✅ Orquestador (ya aplicado) |
| US-39 | Sanity CMS setup: client + config | **Agent 01** |
| US-40 | Sanity schema — Proyectos | **Agent 01** |
| US-41 | /proyectos ISR + /proyectos/[slug] | **Agent 04** |
| US-41 | FeaturedProjectSection → CMS-aware | **Agent 04** |
| US-44 | next.config.ts headers + bundle | **Agent 07** |
| US-45 | SEO: JSON-LD, sitemap, robots.txt | **Agent 04** |
| US-45 | next-sitemap.config.js | **Agent 07** |
| US-47 | Plausible script en layout | **Agent 04** |
| — | README.md actualizado | **Agent 07** |
| US-42 | Checklist testing funcional | **Agent 05** (manual) |
| US-43 | Checklist QA visual y de marca | **Agent 06** (manual) |
| US-46 | Vercel + dominio + deploy | **Agent 07** (manual) |
| US-48 | Go-live checklist | **Agent 07** (manual) |

---

## 3. Plan de ejecución y dependencias

```
[FASE A — Agent 01: Arquitectura Sanity]
    US-39: lib/sanity/client.ts (implementación real)
    US-39: lib/sanity/queries.ts (GROQ queries)
    US-40: sanity/sanity.config.ts
    US-40: sanity/schemas/project.ts
    US-40: sanity/schemas/index.ts
        ↓

[FASE B — Agent 04: Frontend + SEO]  ← depende de Fase A
    US-41: app/proyectos/page.tsx → ISR desde Sanity (con fallback placeholder)
    US-41: app/proyectos/[slug]/page.tsx → detalle de proyecto
    US-41: components/ui/ProjectCard.tsx
    US-41: FeaturedProjectSection → fetch CMS con fallback hardcoded
    US-45: JSON-LD Organization en app/layout.tsx
    US-45: app/sitemap.ts → sitemap nativo Next.js
    US-47: Plausible script en layout.tsx
    Actualizar metadata por página (title, description, OG)
        ↓

[FASE C — Agent 07: DevOps + Build]  ← paralelo con B
    US-44: next.config.ts → headers caché para assets
    US-44: next-sitemap.config.js
    US-45: public/robots.txt manual (mientras se configura next-sitemap)
    README.md → comandos dev + variables de entorno
        ↓

[FASE D — Verificación código]
    npx tsc --noEmit → 0 errores
    npm run build → sin errores TypeScript ni build failures
        ↓

[FASE E — Manual (requiere acciones externas)]
    Agent 07: Vercel deploy + dominio
    Agent 07: Variables de entorno en Vercel
    Agent 05: Checklist testing funcional completo
    Agent 06: QA visual y de marca
    Agent 07: Go-live checklist
```

---

## 4. Agent 01 — Software Architect

### TASK-01-A · `lib/sanity/client.ts` — Implementación real

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-15',
  useCdn: process.env.NODE_ENV === 'production',
})
```

**Nota de seguridad:** `NEXT_PUBLIC_SANITY_PROJECT_ID` puede ser público (es un ID no secreto). El `SANITY_API_TOKEN` para escritura NUNCA debe tener prefijo `NEXT_PUBLIC_`.

### TASK-01-B · `lib/sanity/queries.ts` — GROQ queries

```typescript
import { groq } from 'next-sanity'

// Todos los proyectos ordenados
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    featured,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    },
    order
  }
`

// Proyecto destacado (featured: true)
export const featuredProjectQuery = groq`
  *[_type == "project" && featured == true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    }
  }
`

// Proyecto individual por slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    }
  }
`

// Todos los slugs para generateStaticParams
export const projectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`
```

### TASK-01-C · `sanity/schemas/project.ts`

```typescript
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nombre del proyecto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: '¿Proyecto destacado en portada?',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción breve',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen / Mockup del proyecto',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tecnologías / Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'KPIs destacados',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'value', type: 'string', title: 'Valor' },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden de aparición',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'image' },
  },
})
```

### TASK-01-D · `sanity/schemas/index.ts`

```typescript
import { project } from './project'
export const schemaTypes = [project]
```

### TASK-01-E · `sanity/sanity.config.ts`

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'pellisoft',
  title: 'Pellisoft CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

**Nota:** El Studio puede montarse en `app/studio/[[...tool]]/page.tsx` como Studio embebido, o usar `studio.sanity.io`. Para v1, recomendamos el Studio externo (menos configuración).

---

## 5. Agent 04 — Frontend Expert

### TASK-04-AC · `components/ui/ProjectCard.tsx`

Card de proyecto para la lista `/proyectos`:
```typescript
interface ProjectCardProps {
  title: string
  slug: string
  description: string
  imageUrl?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
}
```
Diseño: 
- Fondo `bg-slate_dark`, borde `border-tech_blue/20`, hover `border-tech_blue/50`
- Si tiene `imageUrl`: mostrar con `next/image` + `fill` object-cover, ratio 16:9
- Si no tiene imagen: placeholder con gradiente tech
- Tags: `font-mono text-xs` badges con `border border-tech_blue/30 bg-tech_blue/10`
- Metrics (si las hay): 3 valores en fila con `font-heading text-xl font-bold`
- CTA interno: `"Ver proyecto →"` como `<Link href="/proyectos/[slug]">`
- Scroll reveal: `whileInView`, `y: 20→0`, stagger

### TASK-04-AD · `app/proyectos/page.tsx` — ISR con Sanity

```typescript
import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'

export const revalidate = 60 // ISR: revalidar cada 60 segundos

// Tipo del proyecto
interface SanityProject {
  _id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
}
```

Fetch con manejo de error (si Sanity no está configurado, retorna array vacío):
```typescript
async function getProjects(): Promise<SanityProject[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    return await client.fetch(projectsQuery)
  } catch {
    return []
  }
}
```

Si no hay proyectos: mostrar mensaje "Próximamente" elegante (mismo diseño que Sprint 5 placeholder).  
Si hay proyectos: grid de `ProjectCard`.

### TASK-04-AE · `app/proyectos/[slug]/page.tsx` — Detalle ISR

```typescript
export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  const slugs = await client.fetch(projectSlugsQuery)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export const revalidate = 60
```

Layout del detalle:
- `SecondaryHero` con título del proyecto
- Imagen grande (si existe) con `next/image`
- Descripción completa
- Tags grid
- Métricas en fila con valores grandes (sin AnimatedCounter — es página estática)
- Sección CTA: `"¿Quieres algo así?"` + Button → `/contacto`

### TASK-04-AF · FeaturedProjectSection → CMS-aware

Convertir `FeaturedProjectSection` a Server Component (eliminar `"use client"`, mover client parts a sub-componente):
- Fetch del proyecto destacado en el Server Component padre
- Si CMS no configurado o no hay proyecto destacado: usar datos hardcoded (fallback)
- `AnimatedCounter` y efectos visuales se mueven a un `FeaturedProjectClient.tsx` con `"use client"`

**Fallback hardcoded** (usado cuando CMS no tiene proyecto destacado):
```typescript
const FALLBACK_PROJECT = {
  title: 'Sistema MES para planta industrial',
  description: 'Desarrollamos un sistema MES completo para una planta industrial aragonesa...',
  metrics: [
    { label: 'OEE Eficiencia', value: '94' },
    { label: 'Producción uds', value: '1450' },
    { label: 'Alertas cal.', value: '0' },
  ]
}
```

### TASK-04-AG · JSON-LD Organization Schema en `app/layout.tsx`

```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pellisoft',
  description: 'Software industrial y empresarial diseñado para escalar',
  url: 'https://pellisoft.es',
  email: 'info@pellisoft.es',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Teruel',
    addressRegion: 'Aragón',
    addressCountry: 'ES',
  },
  sameAs: [],
}
```

Añadir en el `<head>` del layout:
```tsx
<Script
  id="schema-org"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

### TASK-04-AH · Plausible Analytics en `app/layout.tsx`

```tsx
import Script from 'next/script'

// Dentro del layout, en el <body> o <head>:
<Script
  defer
  data-domain="pellisoft.es"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

Privacy-first, no requiere banner de cookies.

### TASK-04-AI · `app/sitemap.ts` — Sitemap nativo Next.js

```typescript
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { projectSlugsQuery } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pellisoft.es'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/adn`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
  
  // Dynamic project pages from Sanity
  let projectRoutes: MetadataRoute.Sitemap = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const slugs = await client.fetch(projectSlugsQuery)
      projectRoutes = slugs
        .filter((s: { slug: string }) => s.slug)
        .map((s: { slug: string }) => ({
          url: `${baseUrl}/proyectos/${s.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
    } catch { /* Sanity not configured */ }
  }
  
  return [...staticRoutes, ...projectRoutes]
}
```

### TASK-04-AJ · Metadata SEO por página

Verificar que todas las páginas tienen `metadata` exportado con `title` y `description` propios. Actualizar las que sean genéricas. Añadir `openGraph` completo en Home (`app/layout.tsx`).

---

## 6. Agent 05 — Tester

### Checklist de testing (US-42)

> **Nota:** Este checklist es para ejecución **manual** en el entorno `localhost:3000` o en staging. El agente debe ejecutar cada ítem y reportar el resultado.

**Prioridad ALTA (bloquea lanzamiento si falla):**
- [ ] Nav links scrollan a la sección correcta en Home
- [ ] Formulario de contacto envía y muestra estado success
- [ ] Email llega al buzón configurado
- [ ] `/servicios`, `/adn`, `/contacto`, `/proyectos` cargan sin null/error

**Prioridad MEDIA:**
- [ ] AnimatedCounter en FeaturedProject arranca en viewport
- [ ] Isotipo PIsotype anima al cargar Hero
- [ ] Perspectiva 3D del MockDashboard en hover
- [ ] Parallax en DnaSection es visible

**Prioridad BAJA (mejora experiencia):**
- [ ] No hay CLS al cargar (DevTools → Performance → CLS < 0.1)
- [ ] Tab navigation en formulario es correcta

---

## 7. Agent 06 — QA

### Checklist QA visual y de marca (US-43)

> **Nota:** Ejecución manual comparando el resultado con el diseño esperado.

**Bloquea lanzamiento:**
- [ ] `arcilla` (#C1440E) solo aparece en: cursor focus, "para el mundo.", botón envío, punto Teruel mapa
- [ ] `encina` aparece en: sección ADN, indicador SISTEMA ACTIVO, borde formulario
- [ ] Tipografías correctas: Space Grotesk en headings, Inter en body, JetBrains Mono en labels
- [ ] No hay textos placeholder ni lorem ipsum
- [ ] Favicon logo-azul.png visible en la pestaña del navegador

**No bloquea pero debe corregirse:**
- [ ] Espaciado entre secciones uniforme
- [ ] Hover states de todos los botones funcionan
- [ ] Logo en Navbar nítido a todas las densidades de pantalla (retina)

---

## 8. Agent 07 — DevOps

### TASK-07-A · `next.config.ts` — Headers de caché para assets estáticos

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
```

### TASK-07-B · `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://pellisoft.es/sitemap.xml
```

### TASK-07-C · `next-sitemap.config.js`

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pellisoft.es',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
```

Añadir en `package.json` scripts:
```json
"postbuild": "next-sitemap"
```

### TASK-07-D · `README.md` actualizado

El README debe incluir:
- Stack técnico
- Comandos de desarrollo: `npm run dev`, `npm run build`, `npm start`
- Variables de entorno requeridas (con descripción, sin valores reales)
- Estructura de carpetas principal
- Cómo acceder al Sanity Studio
- Proceso de deploy (Vercel)

### Tareas manuales de DevOps (requieren acceso externo)

**Antes del deploy:**
1. Crear proyecto en Sanity Studio → obtener `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. Configurar dominio de email en Resend para `web@pellisoft.es`
3. Crear cuenta Plausible → añadir dominio `pellisoft.es`

**Deploy a Vercel:**
```bash
# 1. Asegurar que main está limpio
git checkout main
git merge develop

# 2. Conectar repo a Vercel (primera vez: vercel.com dashboard)
# 3. Configurar variables de entorno en Vercel dashboard:
#    RESEND_API_KEY, CONTACT_EMAIL_TO
#    NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN

# 4. Deploy automático al hacer push a main
git push origin main
```

**DNS (si dominio en proveedor externo):**
```
Tipo    | Host          | Valor
--------|---------------|------------------
A       | @             | 76.76.21.21
CNAME   | www           | cname.vercel-dns.com
```

---

## 9. Tareas manuales (fuera del scope de código)

Estas tareas requieren acciones humanas o acceso a servicios externos que no pueden automatizarse desde el código:

| Tarea | Quién | Prerequisito |
|---|---|---|
| Crear proyecto en Sanity Studio | Developer | Cuenta Sanity |
| Configurar dominio email en Resend (`web@pellisoft.es`) | Developer | DNS del dominio |
| Crear cuenta Plausible + añadir dominio | Developer | Dominio activo |
| Conectar repo GitHub a Vercel | DevOps | Cuenta Vercel + repo |
| Configurar DNS (A record, CNAME www) | DevOps | Acceso al registrador |
| Publicar proyecto MES de prueba en Sanity | Developer | Studio configurado |
| Test manual formulario en producción | Tester | Deploy completo |
| Enviar sitemap a Google Search Console | DevOps | Dominio verificado |

---

## 10. Criterios de aceptación del Sprint

### Implementables en código (agentes)
- [ ] `lib/sanity/client.ts` implementado con `createClient`
- [ ] `lib/sanity/queries.ts` con 4 queries GROQ
- [ ] `sanity/schemas/project.ts` con todos los campos
- [ ] `app/proyectos/page.tsx` usa ISR + Sanity con fallback
- [ ] `app/proyectos/[slug]/page.tsx` implementado
- [ ] `FeaturedProjectSection` con fallback a datos hardcoded
- [ ] JSON-LD Organization en `layout.tsx`
- [ ] Plausible script en `layout.tsx`
- [ ] `app/sitemap.ts` generando rutas estáticas + dinámicas
- [ ] `public/robots.txt` con referencia al sitemap
- [ ] `next.config.ts` con headers de caché
- [ ] `README.md` completo con comandos y variables de entorno
- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run build` → exitoso

### Requieren acciones manuales
- [ ] Sanity Studio configurado con proyecto creado
- [ ] Formulario enviando emails reales en producción
- [ ] Dominio `pellisoft.es` activo con SSL
- [ ] Lighthouse producción: Performance ≥ 90, SEO ≥ 95
- [ ] Plausible registrando visitas reales

---

> **Nota del Orquestador:** Sprint 6 tiene dos dimensiones claramente separadas. La parte de **código** (Sanity client/schema, páginas ISR, SEO, build config) se implementa completamente de forma automática como subagente. La parte de **infraestructura y QA manual** (Vercel, dominio, Sanity Studio, testing en navegador) requiere acciones humanas y se documenta como guía de ejecución. El objetivo es que el código esté 100% listo para deploy y que el desarrollador solo tenga que ejecutar los pasos manuales documentados.
