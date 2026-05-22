# Sprint 6 — CMS, QA Final & Deploy a Producción
## Fase 1 · Duración estimada: 1–2 semanas

> **Agentes responsables:** Agent 07 (DevOps) · Agent 05 (Tester) · Agent 06 (QA) · Agent 01 (Software Architect)  
> **Prerequisito:** Sprint 5 completado y mergeado a `develop`  
> **Objetivo:** Integrar Sanity CMS para los proyectos dinámicos, ejecutar la batería completa de testing y QA, optimizar rendimiento, y desplegar la web a producción en Vercel con dominio configurado.

---

## Goal del Sprint

> **"Al terminar este sprint, pellisoft.es está en producción, Lighthouse > 90, el formulario envía emails reales, los proyectos se gestionan desde Sanity, y la web está lista para mostrar a clientes."**

---

## Referencia visual — Check final

Comparar el resultado final contra las 3 referencias visuales del proyecto:
1. `mockup-onepage.png` — Hero + Servicios + ADN + Contacto en vista general
2. `mockup-formulario.png` — Command Center con conexión establecida
3. `mockup-mes-dashboard.png` — Caso destacado MES con KPIs y visualización industrial

---

## Historias de usuario

### US-39 · Integración Sanity CMS — Setup inicial
**Como** desarrollador/DevOps,  
**quiero** tener Sanity configurado y conectado al proyecto Next.js,  
**para que** los proyectos y casos de éxito se puedan gestionar sin tocar código.

**Tareas:**
- [ ] Crear proyecto en [sanity.io](https://sanity.io) y obtener `projectId` + `dataset`
- [ ] Configurar variables de entorno en `.env.local` y en Vercel
- [ ] Crear `sanity/sanity.config.ts` con configuración del Studio
- [ ] Crear `lib/sanity/client.ts`:
  ```typescript
  import { createClient } from 'next-sanity'
  export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2026-05-15',
    useCdn: true,
  })
  ```
- [ ] Crear `lib/sanity/queries.ts` con las queries GROQ:
  ```typescript
  export const projectsQuery = `*[_type == "project"] | order(order asc) { title, slug, description, tags, image, metrics }`
  export const featuredProjectQuery = `*[_type == "project" && featured == true][0] { ... }`
  ```

---

### US-40 · Schema de Sanity — Proyectos
**Como** Pellisoft,  
**quiero** poder crear y editar proyectos desde el CMS,  
**para que** la sección de casos de éxito se actualice sin necesidad de un deploy.

**Tareas:**
- [ ] Crear `sanity/schemas/project.ts`:
  ```typescript
  export const project = defineType({
    name: 'project',
    title: 'Proyecto',
    type: 'document',
    fields: [
      defineField({ name: 'title', type: 'string', title: 'Nombre del proyecto' }),
      defineField({ name: 'slug', type: 'slug', title: 'URL', options: { source: 'title' } }),
      defineField({ name: 'featured', type: 'boolean', title: '¿Proyecto destacado?' }),
      defineField({ name: 'description', type: 'text', title: 'Descripción breve' }),
      defineField({ name: 'image', type: 'image', title: 'Imagen / Mockup', options: { hotspot: true } }),
      defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tecnologías / Tags' }),
      defineField({ name: 'metrics', type: 'array', title: 'KPIs destacados', of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'value', type: 'string' },
        ]
      }]}),
      defineField({ name: 'order', type: 'number', title: 'Orden de aparición' }),
    ]
  })
  ```
- [ ] Registrar el schema en `sanity.config.ts`
- [ ] Crear al menos 1 proyecto de prueba en el Studio (el caso MES con los datos del mockup)

---

### US-41 · Página /proyectos dinámica con ISR
**Como** visitante,  
**quiero** ver los proyectos reales de Pellisoft en la sección de casos,  
**para que** pueda evaluar su experiencia antes de contactarles.

**Tareas:**
- [ ] Actualizar `app/proyectos/page.tsx`:
  - Fetch de proyectos desde Sanity con ISR (revalidate: 60)
  - Grid de cards de proyectos (reutilizar componente `Card` del Sprint 3)
  - Cada card muestra: imagen, título, tags, descripción, métricas si las tiene
- [ ] Crear `app/proyectos/[slug]/page.tsx`:
  - Fetch de proyecto individual por slug
  - Layout: imagen grande, descripción completa, tags, métricas
  - CTA: `"¿Quieres algo así? Contacta con Pellisoft"`
- [ ] Actualizar `FeaturedProjectSection.tsx`:
  - En lugar de datos hardcodeados, fetchear el proyecto con `featured: true` desde Sanity
  - La imagen del mockup MES provendría del CMS
- [ ] Implementar `generateStaticParams` para pre-renderizar slugs conocidos

---

### US-42 · Testing funcional (Agent 05)
**Como** tester,  
**quiero** ejecutar todos los flujos principales de la web,  
**para que** no lleguen bugs a producción.

**Checklist de testing manual:**

**Navegación:**
- [ ] Menú sticky visible en todos los breakpoints al hacer scroll
- [ ] Links de navegación (Servicios, Casos, ADN, Contacto) llevan a la sección/página correcta
- [ ] Scroll suave funciona sin saltos bruscos
- [ ] CTA "Hablar con Pellisoft" del navbar lleva a la sección contacto
- [ ] Logo en Navbar lleva a `/` (Home)

**Hero:**
- [ ] Animación de texto rotativo cicla correctamente (no se queda colgado)
- [ ] Isotipo "P" tiene animación idle activa pero sutil
- [ ] Los 2 CTAs son clickables y responden al hover
- [ ] No hay CLS (Cumulative Layout Shift) al cargar (verificar en DevTools)

**Servicios Bento Grid:**
- [ ] Hover sobre cada card activa el glow del color correcto
- [ ] Cards entran en viewport con stagger correctamente
- [ ] En móvil, las cards no generan overflow horizontal

**Caso Destacado:**
- [ ] Los contadores KPI arrancan al entrar en viewport
- [ ] El mockup MES tiene el borde glow verde
- [ ] Hover del mockup activa la perspectiva 3D

**ADN Pellisoft:**
- [ ] El parallax es visible (la "P" de fondo se mueve más lento que el texto)
- [ ] `"para el mundo."` está en color arcilla
- [ ] El logo verde es visible en la sección

**Formulario de Contacto:**
- [ ] Todos los campos funcionan: escribir, borrar, copiar/pegar
- [ ] Email inválido → línea roja pulsante
- [ ] Email válido + blur → línea verde
- [ ] Submit sin campos requeridos → errores visibles por campo
- [ ] Submit con todos los campos correctos → barra de progreso verde → mensaje de éxito
- [ ] El email llega correctamente al buzón de destino
- [ ] El campo honeypot está presente en el DOM pero invisible (verificar con inspector)

**Responsive (dispositivos):**
- [ ] iPhone 14 Pro (393px): sin overflow, sin texto cortado, formulario funcional
- [ ] iPad Air (820px): grid servicios en 2 cols, formulario en 1 col
- [ ] MacBook 1440px: layout completo, bento asimétrico
- [ ] Desktop 1920px: sin elementos estirados o rotos

**Páginas secundarias:**
- [ ] `/servicios` carga correctamente
- [ ] `/adn` carga correctamente  
- [ ] `/contacto` carga correctamente con el formulario funcional
- [ ] `/proyectos` muestra los proyectos de Sanity o el placeholder

**Accesibilidad básica:**
- [ ] Todos los `<img>` tienen atributo `alt`
- [ ] Links del navbar tienen texto descriptivo
- [ ] Los botones tienen `aria-label` si no tienen texto visible
- [ ] Contraste texto/fondo > 4.5:1 en textos principales
- [ ] Tab navigation funciona en formulario y navbar

---

### US-43 · QA visual y de marca (Agent 06)
**Como** responsable de QA,  
**quiero** validar que la web proyecta la imagen premium que Pellisoft necesita,  
**para que** el primer cliente que la vea confíe en la empresa.

**Checklist QA de marca:**

**Identidad visual:**
- [ ] El logo `logo-azul.png` en navbar está nítido y bien proporcionado
- [ ] El logo `logo-verde.png` aparece solo en la sección ADN
- [ ] El logo `logo-blanco.png` aparece en el footer
- [ ] El logo `logo-negro.png` y `logo-morado.png` están en `public/logos/` para uso futuro (no implementados en v1)
- [ ] Los colores de la web coinciden exactamente con los tokens de `tailwind.config.ts`
- [ ] El `arcilla` solo aparece como acento (cursor, "para el mundo", botón envío) — no domina la UI
- [ ] El `encina` aparece en ADN, indicadores activos y bordes del formulario — no en hero

**Tipografía:**
- [ ] Space Grotesk se aplica en todos los H1/H2/H3
- [ ] Inter se aplica en todos los párrafos y navegación
- [ ] JetBrains Mono se aplica en labels de formulario, badges de código y metadata
- [ ] No hay fuentes fallback visibles (sans-serif genérico)

**Espaciado y ritmo:**
- [ ] Hay espacio vertical generoso entre secciones (mínimo `py-24`)
- [ ] Ninguna sección está "pegada" a la anterior
- [ ] Los márgenes laterales son consistentes en toda la web

**Animaciones:**
- [ ] Ninguna animación es brusca o molesta
- [ ] El parallax de ADN se siente cinematográfico, no distractivo
- [ ] Las micro-interacciones del formulario refuerzan la identidad "terminal"
- [ ] La animación de envío del formulario es satisfactoria (no ansiosa)

**Copy y textos:**
- [ ] Todos los textos están en español correcto (sin errores tipográficos del mockup que son placeholders)
- [ ] El claim del hero es exactamente: `"Software industrial y empresarial diseñado para escalar"`
- [ ] El subclaim es: `"Sistemas MES, SaaS y automatización desde Teruel para el mundo"`
- [ ] El mensaje de éxito del formulario es: `"Conexión establecida. Nos pondremos en contacto desde Teruel pronto."`
- [ ] No hay textos lorem ipsum ni placeholders en producción

**Percepción general:**
- [ ] La web NO parece una plantilla genérica de Next.js
- [ ] La web NO parece una demo de producto (es una web corporativa)
- [ ] La web transmite: precisión técnica + cercanía + diferenciación territorial
- [ ] Un CTO o director de operaciones confiaría en ella para pedir un presupuesto

---

### US-44 · Optimización de rendimiento (Agent 01 + 07)
**Como** desarrollador/DevOps,  
**quiero** que la web tenga excelente rendimiento medible,  
**para que** Google la posicione bien y los usuarios no abandonen por lentitud.

**Tareas:**
- [ ] Ejecutar Lighthouse en `develop` y corregir hasta:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 95
- [ ] Verificar que GSAP solo se carga donde se usa (dynamic import):
  ```typescript
  // En DnaSection.tsx y HeroSection.tsx
  const gsap = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ```
- [ ] Verificar que `next/image` está en todos los `<img>` con width/height declarados
- [ ] Verificar que no hay imágenes sin WebP (convertir PNG de mockups a WebP en `public/`)
- [ ] Verificar bundle size: `npm run build` → revisar que ningún chunk > 250kb
- [ ] Configurar `next.config.ts` con headers de caché apropiados para assets estáticos

---

### US-45 · SEO técnico
**Como** Pellisoft,  
**quiero** que la web sea encontrada cuando alguien busque "software industrial Teruel" o "sistema MES",  
**para que** el canal web genere leads orgánicos.

**Tareas:**
- [ ] Verificar metadatos en cada página (title, description, OG)
- [ ] Generar `sitemap.xml` con `next-sitemap`:
  ```javascript
  // next-sitemap.config.js
  module.exports = {
    siteUrl: 'https://pellisoft.es',
    generateRobotsTxt: true,
    changefreq: 'monthly',
    priority: 0.7,
  }
  ```
- [ ] Crear `public/robots.txt` (generado por next-sitemap)
- [ ] Añadir JSON-LD Schema para `Organization`:
  ```json
  {
    "@type": "Organization",
    "name": "Pellisoft",
    "description": "Software industrial y empresarial",
    "url": "https://pellisoft.es",
    "address": { "addressLocality": "Teruel", "addressCountry": "ES" }
  }
  ```
- [ ] Verificar que Next.js genera `<title>` y `<meta description>` correctos en source HTML
- [ ] Verificar con [opengraph.xyz](https://opengraph.xyz) que la preview de redes sociales es correcta

---

### US-46 · Configuración Vercel y dominio
**Como** DevOps,  
**quiero** desplegar la web a producción en Vercel con el dominio de Pellisoft,  
**para que** la web esté disponible para clientes reales.

**Tareas:**
- [ ] Conectar repositorio GitHub a Vercel (nuevo proyecto)
- [ ] Configurar todas las variables de entorno en Vercel (Production + Preview):
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL_TO`
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN` (solo Production)
- [ ] Configurar dominio personalizado en Vercel:
  - Añadir `pellisoft.es` (o `.com`)
  - Configurar DNS en el registrador (A record → Vercel IP, o nameservers Vercel)
  - Verificar SSL automático activo
  - Configurar redirect `www.pellisoft.es` → `pellisoft.es`
- [ ] Primer deploy a producción:
  - `git push origin main`
  - Verificar que Vercel completa el build sin errores
  - Verificar la web en el dominio real
- [ ] Configurar notificaciones de deploy en Slack/email (opcional)

---

### US-47 · Analítica con Plausible
**Como** Pellisoft,  
**quiero** saber cuántas visitas recibe la web y desde dónde vienen,  
**para que** pueda tomar decisiones de marketing sin violar la privacidad de los usuarios.

**Tareas:**
- [ ] Crear cuenta en [plausible.io](https://plausible.io) y añadir el dominio
- [ ] Añadir el script de Plausible en `app/layout.tsx`:
  ```typescript
  import Script from 'next/script'
  // Dentro del layout:
  <Script
    defer
    data-domain="pellisoft.es"
    src="https://plausible.io/js/script.js"
    strategy="afterInteractive"
  />
  ```
- [ ] Verificar que los datos de visitas aparecen en el dashboard de Plausible
- [ ] No es necesario banner de cookies (Plausible es privacy-first)

---

### US-48 · Checklist de lanzamiento (Go-live)
**Como** equipo,  
**quiero** una última verificación antes de comunicar el lanzamiento,  
**para que** no haya sorpresas cuando llegue el primer visitante real.

**Go-live checklist:**
- [ ] Dominio activo con SSL (candado verde en el navegador)
- [ ] Test de formulario en producción (envío real, email recibido)
- [ ] Lighthouse en producción: Performance ≥ 90, SEO ≥ 95
- [ ] Verificar en Chrome, Firefox y Safari (desktop + móvil)
- [ ] Verificar en iPhone y Android físico
- [ ] No hay errores en consola (F12 → Console limpia)
- [ ] No hay textos placeholder ni datos de prueba
- [ ] Todos los logos se muestran correctamente en sus secciones:
  - `logo-azul.png` → Navbar ✓
  - `logo-verde.png` → Sección ADN ✓
  - `logo-blanco.png` → Footer ✓
- [ ] Sanity Studio accesible en `/studio` o en `studio.sanity.io`
- [ ] Al menos 1 proyecto publicado en Sanity (el caso MES)
- [ ] Plausible registra la primera visita de prueba
- [ ] `sitemap.xml` accesible en `https://pellisoft.es/sitemap.xml`
- [ ] `robots.txt` accesible en `https://pellisoft.es/robots.txt`
- [ ] Google Search Console: sitio añadido y sitemap enviado

---

## Criterios de aceptación del Sprint

- [ ] Sanity CMS configurado, esquema de proyectos creado, 1 proyecto publicado
- [ ] `/proyectos` muestra datos reales de Sanity con ISR
- [ ] `FeaturedProjectSection` muestra el proyecto destacado desde CMS
- [ ] Todos los ítems del checklist de testing (US-42) completados sin fallos
- [ ] Todos los ítems del checklist de QA (US-43) aprobados
- [ ] Lighthouse producción: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 95
- [ ] Dominio `pellisoft.es` activo con SSL
- [ ] Formulario de contacto funcionando en producción (email real recibido)
- [ ] Plausible registrando visitas

---

## Dependencias

- Sprint 5 completado
- Cuenta Sanity creada (gratuita para empezar)
- Cuenta Resend creada y dominio de envío verificado
- Cuenta Vercel conectada al repositorio GitHub
- Dominio `pellisoft.es` (o el elegido) adquirido y con acceso DNS

## Definition of Done

- Web en producción, accesible en el dominio final
- Repositorio: rama `main` = producción, todo mergeado desde `develop`
- `README.md` del proyecto actualizado con comandos de desarrollo y variables de entorno requeridas
- Revisión final conjunta de todos los agentes (01–07) antes del go-live
- **La web está lista para ser mostrada a clientes reales.**

---

## Notas post-lanzamiento (Backlog v2)

Funcionalidades identificadas pero fuera del scope de Fase 1:

| Funcionalidad | Prioridad | Sprint estimado |
|---|---|---|
| Blog dinámico desde Sanity | Media | v2-Sprint 1 |
| Página de detalle de proyecto con galería | Media | v2-Sprint 1 |
| Área privada de cliente (login) | Alta | v2-Sprint 2 |
| Integración Supabase (captura de leads) | Media | v2-Sprint 2 |
| Three.js en hero (isotipo 3D) | Baja | v2-Sprint 3 |
| Versión en inglés (i18n) | Media | v2-Sprint 3 |
| Chat de soporte integrado | Baja | v2-Sprint 4 |
