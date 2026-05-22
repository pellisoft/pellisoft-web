# Sprint 5 — Summary
## Contact Command Center · Páginas Secundarias · Fixes globales

> **Sprint:** 5  
> **Estado:** ✅ COMPLETADO  
> **Fecha:** Mayo 2026  
> **TypeScript:** `npx tsc --noEmit` → 0 errores  

---

## Resumen ejecutivo

Sprint 5 cierra el ciclo de conversión de la web: implementa el formulario de contacto "Command Center" (la única conversión primaria del sitio), activa todas las páginas secundarias como rutas reales, y resuelve 4 fixes globales solicitados sobre navegación, branding y favicon.

**Estado de la web tras Sprint 5:**
```
Navbar (logo 48px + texto "Pellisoft" en desktop, favicon logo-azul.png)
├── HeroSection            — id="hero"
├── ServicesSection        — id="servicios"
├── HowWeWorkSection       — id="proceso"
├── FeaturedProjectSection — id="proyectos" (corregido desde "casos")
├── DnaSection             — id="adn"
├── ContactSection         — id="contacto" (NUEVO)
└── Footer

Páginas secundarias:
├── /servicios  → ServicesSection + HowWeWorkSection + SecondaryHero
├── /adn        → DnaSection + SecondaryHero
├── /contacto   → ContactSection (directo, sin hero)
└── /proyectos  → Placeholder "Próximamente"
```

---

## Fixes globales implementados

### FIX-05 — Navbar: logo más grande y nombre "Pellisoft"
**Archivo:** `components/layout/Navbar.tsx`
| Antes | Después |
|---|---|
| Logo 40×40px, `h-9 w-9` | Logo 52×52px, `h-12 w-12` |
| Solo isotipo | Isotipo + texto "Pellisoft" en desktop (`hidden md:block`) |
| Sin texto de marca | `font-heading font-bold text-white_soft text-sm tracking-wide` |

El logo en desktop ahora muestra el isotipo + el nombre de la empresa, aportando más presencia de marca. En móvil solo se muestra el isotipo (comportamiento correcto para pantallas estrechas).

### FIX-07 — Favicon: logo-azul.png
**Archivo:** `app/layout.tsx`

Añadido en `metadata`:
```typescript
icons: {
  icon: '/logos/logo-azul.png',
  apple: '/logos/logo-azul.png',
},
```
El logo 1024×1024 cuadrado se usa tanto para el favicon del navegador como para el icono Apple Touch.

### FIX-08 — Secciones bien enlazadas desde Navbar
**Archivo:** `components/sections/FeaturedProjectSection.tsx`

`id="casos"` cambiado a `id="proyectos"` para alinear con el link `#proyectos` del Navbar. Todos los nav links ahora apuntan correctamente:
| Link Navbar | Sección | Estado |
|---|---|---|
| `#servicios` | `ServicesSection` `id="servicios"` | ✅ |
| `#proyectos` | `FeaturedProjectSection` `id="proyectos"` | ✅ (fix aplicado) |
| `#adn` | `DnaSection` `id="adn"` | ✅ |
| `#contacto` | `ContactSection` `id="contacto"` | ✅ (Sprint 5 nuevo) |

### Cursor terminal CSS
**Archivo:** `styles/globals.css`

Añadidos:
```css
@keyframes terminal-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.terminal-cursor-active::after { content: '|'; animation: terminal-blink 0.8s step-end infinite; color: #C1440E; }
```
Usado por `TerminalInput` al tener focus.

---

## US-34 · TeruelMap SVG (Agent 03)
**Archivo:** `components/ui/TeruelMap.tsx`

SVG decorativo que muestra Teruel y sus conexiones con el mundo:
- Silueta simplificada de la Península Ibérica + Europa occidental
- Punto `arcilla` en Teruel con animación de pulso infinito (`scale: [1, 1.4, 1]`)
- 3 líneas de conexión animadas con `pathLength` 0→1 al entrar en viewport:
  - Teruel → Madrid (azul, delay 0.2s)
  - Teruel → Barcelona (azul, delay 0.4s)
  - Teruel → París (morado, delay 0.6s)
- Grid de latitud/longitud tenue de fondo
- `useReducedMotion` respetado: sin animaciones si el usuario lo prefiere

---

## US-30, US-31, US-32, US-33, US-38 · ContactSection "Command Center"
**Archivo:** `components/sections/ContactSection.tsx`

### Layout
- `id="contacto"`, `bg-carbon`, `py-20 lg:py-28`
- Header centrado: eyebrow "Contacto · Command Center" + H2 "Iniciemos tu proyecto"
- Contenedor glassmorphism `max-w-5xl`:
  ```
  background: rgba(17,19,24,0.85)
  backdrop-filter: blur(16px)
  border: 1px solid rgba(74,124,47,0.4)
  box-shadow: 0 0 60px rgba(45,80,22,0.15), inset 0 1px 0 rgba(74,124,47,0.1)
  ```
- Grid `grid-cols-[5fr_7fr]` en desktop, 1 columna en mobile

### Columna izquierda
- Badge "● SISTEMA ACTIVO" (`animate-pulse`, encina_light)
- Descripción breve
- TeruelMap (oculto en mobile: `hidden md:flex`)
- Email `info@pellisoft.es` + ubicación Teruel

### Columna derecha (formulario)
- 4 campos: Nombre, Empresa (opcional), Email, Proyecto (textarea)
- Campo honeypot `website`: posición absoluta fuera de pantalla, `tabIndex=-1`, `aria-hidden`
- Validación Zod client-side en `handleSubmit`
- Campos marcados como "touched" en blur para activar errores
- `isFieldValid()`: línea verde cuando campo válido y tocado

### US-31 · TerminalInput
**Archivo:** `components/ui/TerminalInput.tsx`

| Estado | Línea base |
|---|---|
| Por defecto | `rgba(107,114,128,0.4)` (muted) |
| En focus | `#C1440E` (arcilla) + glow sutil |
| Válido | `#4A7C2F` (encina_light) |
| Inválido | `#EF4444` (red-500) |

- Animación de color: `motion.div` con `animate={{ backgroundColor }}`, transición 250ms
- Label flota arriba, cambia a `arcilla_light` en focus
- Error: `AnimatePresence` + `motion.p` con fade-in y desplazamiento y
- Cursor `|` parpadeante (clase CSS `.terminal-cursor-active::after`) en focus

### US-33 · SubmitButton
**Archivo:** `components/ui/SubmitButton.tsx`

| Estado | Visual |
|---|---|
| `idle` | fondo `arcilla` + "ENVIAR MENSAJE" |
| `loading` | fondo carbon, borde encina_light + barra de progreso verde `motion.div` 0%→100% en 2.5s + "ENVIANDO PAQUETE DE DATOS..." |
| `success` | fondo encina + "● CONEXIÓN ESTABLECIDA" + mensaje "Nos pondremos en contacto desde Teruel pronto." |
| `error` | fondo red-900/80 + "✕ ERROR DE CONEXIÓN — REINTENTA" |

`AnimatePresence mode="wait"` entre estados para transiciones limpias.

---

## US-35 · API Route — `/api/contact`
**Archivo:** `app/api/contact/route.ts`

Reemplazado el stub por implementación completa:

### Seguridad implementada
| Medida | Implementación |
|---|---|
| Validación server-side | Zod `contactSchema.safeParse(body)` — nunca confía en el body directamente |
| Honeypot anti-spam | Si `data.website` viene relleno → retorna 200 sin enviar email |
| Rate limiting | Map en memoria: mismo IP no puede enviar más de 1 vez cada 60s |
| Sin stack traces | Catch general → `{ error: 'Error interno del servidor' }` — nunca información interna |
| Env vars protegidas | `RESEND_API_KEY` sin prefijo `NEXT_PUBLIC_` — nunca expuesta al cliente |
| Graceful degradation | Si `RESEND_API_KEY` o `CONTACT_EMAIL_TO` no están configuradas → 503 sin crash |

### Flujo de ejecución
```
POST /api/contact
  → Rate limit check (60s por IP)
  → Zod parse del body
  → Honeypot check
  → Env vars check
  → Resend: enviar email con ContactEmailTemplate
  → 200 success
```

---

## US-36 · Email Template (React Email)
**Archivo:** `lib/email/templates/ContactEmail.tsx`

Email transaccional con `@react-email/components`:
- Header oscuro con "PELLISOFT" en azul monospace
- Sección de datos: Nombre, Empresa (condicional), Email (enlazado)
- Mensaje del proyecto en caja destacada con fondo gris claro
- CTA "Responder a [nombre]" con `mailto:` directo
- Footer con timestamp de envío (zona Europe/Madrid)

---

## US-37 · Páginas secundarias
Todas las páginas secundarias ahora son funcionales con metadatos SEO propios:

| Ruta | Título | Secciones |
|---|---|---|
| `/servicios` | Servicios — Pellisoft | SecondaryHero + ServicesSection + HowWeWorkSection |
| `/adn` | ADN — Pellisoft | SecondaryHero + DnaSection |
| `/contacto` | Contacto — Pellisoft | ContactSection (directo, `pt-16` para Navbar) |
| `/proyectos` | Proyectos — Pellisoft | Placeholder "Próximamente" + CTA a `/contacto` |

### SecondaryHero
**Archivo:** `components/layout/SecondaryHero.tsx`

Componente `"use client"` para encabezados de páginas secundarias:
- `pt-32 pb-16` (espacio para Navbar fijo)
- Eyebrow mono + H1 grande + descripción opcional
- `motion.animate` con entrada `y: 20→0`

---

## Inventario completo de archivos (post Sprint 5)

```
app/
  layout.tsx              ✅ ACTUALIZADO (favicon Sprint 5)
  page.tsx                ✅ ACTUALIZADO (ContactSection Sprint 5)
  api/contact/route.ts    ✅ IMPLEMENTADO (Sprint 5)
  servicios/page.tsx      ✅ IMPLEMENTADO (Sprint 5)
  adn/page.tsx            ✅ IMPLEMENTADO (Sprint 5)
  contacto/page.tsx       ✅ IMPLEMENTADO (Sprint 5)
  proyectos/page.tsx      ✅ IMPLEMENTADO (Sprint 5)
components/
  layout/
    Navbar.tsx            ✅ ACTUALIZADO (logo grande Sprint 5)
    Footer.tsx            ✅ (Sprint 4)
    SecondaryHero.tsx     ✅ NUEVO (Sprint 5)
  sections/
    HeroSection.tsx       ✅ (Sprint 2)
    ServicesSection.tsx   ✅ (Sprint 3)
    HowWeWorkSection.tsx  ✅ (Sprint 3)
    FeaturedProjectSection.tsx ✅ ACTUALIZADO (id fix Sprint 5)
    DnaSection.tsx        ✅ (Sprint 4)
    ContactSection.tsx    ✅ NUEVO (Sprint 5)
  ui/
    PIsotype.tsx          ✅ (Sprint 4 rediseño)
    Button.tsx            ✅ (Sprint 2)
    AnimatedText.tsx      ✅ (Sprint 2)
    Card.tsx              ✅ (Sprint 3)
    AnimatedCounter.tsx   ✅ (Sprint 4)
    MockDashboard.tsx     ✅ (Sprint 4)
    TerminalInput.tsx     ✅ NUEVO (Sprint 5)
    SubmitButton.tsx      ✅ NUEVO (Sprint 5)
    TeruelMap.tsx         ✅ NUEVO (Sprint 5)
  icons/
    MesIcon.tsx / TpvIcon.tsx / FacturacionIcon.tsx / index.ts ✅ (Sprint 3)
lib/
  email/templates/
    ContactEmail.tsx      ✅ NUEVO (Sprint 5)
styles/
  globals.css             ✅ ACTUALIZADO (cursor terminal Sprint 5)
tailwind.config.ts        ✅ (Sprint 1)
```

---

## Decisiones técnicas

| Decisión | Razón |
|---|---|
| `resend.emails.send({ react: ComponentFn({...}) })` en lugar de `renderAsync` | Evita incompatibilidad de importación entre versiones de `@react-email/components` |
| `handleBlur` solo marca como "touched" sin validación por campo | Evita problemas de tipado con Zod v4 `.shape` — la validación completa ocurre en submit |
| `SecondaryHero` como `"use client"` | Usa `motion.div` de Framer Motion, que requiere entorno cliente |
| Rate limiting en Map de memoria | Solución simple para serverless — aceptable para v1. No persiste entre cold starts |
| Honeypot devuelve 200 (no 4xx) | Los bots no deben saber que fueron detectados |

---

## Variables de entorno necesarias (production)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=info@pellisoft.es
```

Sin estas variables, la API devuelve 503 sin crash. El formulario mostrará estado `error` con el mensaje de fallback.

---

## Métricas del sprint

| Métrica | Valor |
|---|---|
| Archivos nuevos creados | 7 |
| Archivos modificados | 8 |
| Páginas secundarias activadas | 4 |
| Fixes globales aplicados | 4 (FIX-05, FIX-07, FIX-08, cursor CSS) |
| Errores TypeScript | 0 |
| Medidas de seguridad en API | 4 (Zod, honeypot, rate limit, no stack traces) |

---

## Próximo sprint

**Sprint 6 — QA + SEO + Polish**
- Open Graph images por página
- `next-sitemap` configurado y generado
- Lighthouse audit (Performance, Accessibility, SEO)
- Accesibilidad: aria-labels, skip-to-content, contraste
- Animaciones de detalle (hover estados, micro-interactions restantes)
- Test de formulario end-to-end en staging
- DevOps: configuración Vercel + variables de entorno
