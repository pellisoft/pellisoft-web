# Sprint 5 — Orchestration Document
## Contact Command Center · Páginas Secundarias · Fixes globales

> **Sprint:** 5  
> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Orquestador:** Copilot Agent (Rol Orchestrator)  
> **Prerequisito:** Sprint 4 ✅ COMPLETADO  
> **Estado:** En ejecución

---

## Índice

1. [Notas y fixes globales (fuera de User Stories)](#1-notas-y-fixes-globales)
2. [Mapa de responsabilidades por agente](#2-mapa-de-responsabilidades-por-agente)
3. [Plan de ejecución y dependencias](#3-plan-de-ejecución-y-dependencias)
4. [Agent 03 — Web Designer / UI Expert](#4-agent-03--web-designer--ui-expert)
5. [Agent 04 — Frontend Expert](#5-agent-04--frontend-expert)
6. [Criterios de aceptación compartidos](#6-criterios-de-aceptación-compartidos)
7. [Variables de entorno requeridas](#7-variables-de-entorno-requeridas)

---

## 1. Notas y fixes globales

Además de las User Stories del Sprint, se añaden los siguientes fixes transversales solicitados explícitamente:

### FIX-05 — Navbar: logo más grande y visible
**Problema:** Logo en Navbar actualmente 40×40 px (`h-9 w-9`) demasiado pequeño para la identidad de marca.  
**Solución:**
- Logo: `width={52} height={52}` con `className="h-12 w-12 object-contain"` (de 36px a 48px)
- Añadir nombre "Pellisoft" en texto junto al logo en desktop: `font-heading font-bold text-white_soft text-sm tracking-wide`
- Espaciado logo+texto: `gap-3`
- En móvil: mostrar solo el isotipo (logo), sin texto

### FIX-06 — Banner Hero 100% ancho
**Problema:** El HeroSection usa `max-w-7xl` en el contenido interno pero el fondo de la sección ya es `w-full`. El gradiente de fondo parece recortado.  
**Verificar:** que el `<section>` tenga `w-full` y los gradientes de fondo (`radial-gradient`) sean `inset-0` sin restricciones de ancho. Si no es así, ajustar.  
**Nota:** El patrón correcto ya se aplica desde Sprint 3. Solo verificar que HeroSection lo cumple.

### FIX-07 — Favicon: logo-azul.png
**Problema:** El favicon actual es `app/favicon.ico` genérico de Next.js.  
**Solución:** En `app/layout.tsx`, añadir en `metadata`:
```typescript
icons: {
  icon: '/logos/logo-azul.png',
  apple: '/logos/logo-azul.png',
},
```
El archivo `/public/logos/logo-azul.png` ya existe (1024×1024px).

### FIX-08 — Secciones bien enlazadas desde Navbar
**Problema:** Los links del Navbar (`#servicios`, `#proyectos`, `#adn`, `#contacto`) no scrollan correctamente porque:
1. La sección `FeaturedProjectSection` tiene `id="casos"` pero el nav apunta a `#proyectos`
2. La sección `ContactSection` (Sprint 5) debe tener `id="contacto"`
3. Los anchor links en el Navbar deben ser consistentes con los IDs de sección
**Solución:**
- Cambiar el NAV_LINKS en Navbar.tsx: `{ label: 'Proyectos', href: '#casos' }` → mantener o ajustar
- Asegurar que todas las secciones tienen el `id` correcto:
  - `#servicios` → ServicesSection ✅
  - `#proceso` → HowWeWorkSection ✅ (no está en nav, correcto)
  - `#casos` → FeaturedProjectSection ✅ — el nav debe apuntar a `#casos` o renombrar el id a `#proyectos`
  - `#adn` → DnaSection ✅
  - `#contacto` → ContactSection (Sprint 5) — debe ser `id="contacto"`
- **Decisión:** cambiar `FeaturedProjectSection` id a `id="proyectos"` para alinear con el nav existente. Es la solución más limpia.
- Los links de página secundaria deben navegar a la URL de ruta (`/servicios`, `/proyectos`, `/adn`, `/contacto`) en lugar de anclas cuando se está en otra página

---

## 2. Mapa de responsabilidades por agente

| Fix / User Story | Título | Agente |
|---|---|---|
| FIX-05 | Navbar: logo grande + nombre texto | **Agent 04** |
| FIX-06 | Banner Hero 100% verificado | **Agent 04** |
| FIX-07 | Favicon logo-azul.png | **Agent 04** |
| FIX-08 | Secciones bien enlazadas | **Agent 04** |
| US-30 | ContactSection layout Command Center | **Agent 04** |
| US-31 | TerminalInput componente | **Agent 04** |
| US-32 | Formulario estado + validación Zod | **Agent 04** |
| US-33 | SubmitButton micro-interacción | **Agent 04** |
| US-34 | Mapa SVG Teruel → mundo | **Agent 03** + Agent 04 |
| US-35 | API Route /api/contact (Resend) | **Agent 04** |
| US-36 | Email template (React Email) | **Agent 04** |
| US-37 | Páginas secundarias estáticas | **Agent 04** |
| US-38 | Responsive formulario | **Agent 04** |
| — | Diseño visual ContactSection specs | **Agent 03** |
| — | Mapa/globo SVG de Teruel | **Agent 03** |

---

## 3. Plan de ejecución y dependencias

```
[FASE A — Agent 03: Specs visuales + SVG Mapa]
    Diseño ContactSection glassmorphism container
    SVG mapa Teruel → mundo (animado con stroke-dashoffset)
    Specs TerminalInput (línea base, colores, cursor)
    Specs SubmitButton (estados visuales)
        ↓

[FASE B — Agent 04: Fixes globales]  ← paralelo con Fase A
    FIX-05: Navbar logo grande + nombre "Pellisoft"
    FIX-07: Favicon en layout.tsx
    FIX-08: Alinear IDs de secciones con nav links
        ↓

[FASE C — Agent 04: Sprint 5 nuevos componentes]  ← depende A + B
    lib/email/templates/ContactEmail.tsx
    components/ui/TerminalInput.tsx
    components/ui/SubmitButton.tsx
    components/sections/ContactSection.tsx
    app/api/contact/route.ts (reemplazar stub)
        ↓

[FASE D — Agent 04: Páginas secundarias]
    app/servicios/page.tsx
    app/adn/page.tsx
    app/contacto/page.tsx
    app/proyectos/page.tsx
    Navbar actualizado para rutas de páginas secundarias
        ↓

[FASE E — Agent 04: app/page.tsx]
    Añadir ContactSection a la home
        ↓

[FASE F — Verificación]
    npx tsc --noEmit → 0 errores
    npm run build → success
```

---

## 4. Agent 03 — Web Designer / UI Expert

### TASK-03-S · ContactSection — specs del contenedor glassmorphism

```
CONTACT SECTION CONTAINER
══════════════════════════

Sección outer: w-full bg-carbon py-20 lg:py-28
id="contacto"

Section header (fuera del glassmorphism):
  Eyebrow: "Contacto · Command Center"
    font-mono text-xs text-muted tracking-widest
  H2: "Iniciemos tu proyecto"
    font-heading text-4xl font-bold text-white_soft

Glassmorphism container (max-w-5xl mx-auto):
  background: rgba(17, 19, 24, 0.85)
  backdrop-filter: blur(16px)
  border: 1px solid rgba(74, 124, 47, 0.4)
  box-shadow:
    0 0 60px rgba(45, 80, 22, 0.15),
    inset 0 1px 0 rgba(74,124,47,0.1)
  border-radius: 16px
  overflow: hidden

Layout interno (grid 2 columnas desktop, 1 columna mobile):
  Col izquierda (40%): info de contacto + mapa SVG
  Col derecha (60%): formulario
```

### TASK-03-T · Columna izquierda specs

```
COLUMNA IZQUIERDA
═════════════════

Fondo: bg-slate_dark/50 border-r border-encina/20 p-8

Elementos en orden:
  1. Status badge:
     <div class="flex items-center gap-2">
       <span class="animate-pulse w-2 h-2 rounded-full bg-encina_light" />
       <span class="font-mono text-xs text-encina_light">SISTEMA ACTIVO</span>
     </div>

  2. Título (mismo que section header en mobile, oculto en desktop):
     "Iniciemos tu proyecto"

  3. Descripción:
     "Cuéntanos qué necesitas. Respondemos desde Teruel en menos de 24h."
     font-body text-muted_light text-sm

  4. Mapa SVG (ver TASK-03-U):
     Tamaño: 200×180 en desktop
     Oculto en móvil (hidden md:block)

  5. Info de contacto:
     Email: info@pellisoft.es — font-mono text-sm
     Ubicación: Teruel, Aragón, España
     Icono: Mail + MapPin de Lucide
```

### TASK-03-U · SVG Mapa Teruel → mundo

```
MAPA TERUEL SVG
═══════════════

ViewBox: 0 0 200 180
Fondo: transparente

Elementos:
  1. Continente/silueta de España y Europa simplificada:
     Path simplificado de la costa ibérica y Europa occidental
     fill="#1E293B" (muy oscuro), stroke="rgba(59,130,246,0.15)", strokeWidth=0.5

  2. Punto Teruel (x≈78, y≈102 en el mapa):
     Círculo exterior (pulso): r=8, fill="#C1440E", opacity=0.3, animate-pulse
     Círculo interior: r=4, fill="#C1440E"
     Glow: filter feGaussianBlur σ=3, fill="#E05520"

  3. Líneas de conexión (a 3 ciudades destino):
     Teruel → Madrid: línea curva (M 78,102 Q 52,90 42,98)
     Teruel → Barcelona: línea curva (M 78,102 Q 100,72 115,68)
     Teruel → "Europa/Mundo" (punto en Francia/Alemania): M 78,102 Q 110,60 130,45
     Estilo: stroke="#3B82F6", strokeWidth=0.8, strokeDasharray="4 3", opacity=0.5

  4. Puntos destino:
     Madrid: cx=42, cy=98, r=2.5, fill="#3B82F6"
     Barcelona: cx=115, cy=68, r=2.5, fill="#3B82F6"
     Europa: cx=130, cy=45, r=2.5, fill="#A855F7"

  5. Animación stroke-dashoffset:
     Las líneas de conexión: strokeDasharray=100, strokeDashoffset animado 100→0
     Al entrar en viewport con whileInView de Framer Motion
     pathLength en motion.path: initial=0, whileInView=1
```

### TASK-03-V · TerminalInput specs visuales

```
TERMINAL INPUT DESIGN
═════════════════════

Container: position relative, pb-1
  
Label: 
  font-mono text-xs text-muted tracking-widest uppercase mb-1
  Transición: cuando focused → text-arcilla_light
  
Input/textarea:
  background: transparent
  border: none
  outline: none
  color: text-white_soft
  font-family: font-body
  width: 100%
  padding-bottom: 8px

Línea base (pseudoelemento o div absoluto):
  height: 1px
  bottom: 0
  background: por defecto rgba(107,114,128,0.4) (muted)
  Focused: arcilla (#C1440E) con glow arcilla 4px
  Válido: encina_light (#4A7C2F) 
  Inválido: red-500 con pulse animation

Cursor terminal:
  ::after con content: "|"
  animation: blink 0.8s step-end infinite
  Solo visible cuando el campo está en focus

Error message:
  font-mono text-xs text-red-400 mt-1
  fadeIn con Framer Motion
```

### TASK-03-W · SubmitButton specs estados

```
SUBMIT BUTTON STATES
════════════════════

Tamaño: w-full, py-4, rounded-lg, font-mono text-sm

idle:
  background: arcilla (#C1440E)
  hover: arcilla_light (#E05520), brightness +10%
  texto: "ENVIAR MENSAJE"
  cursor: pointer

loading:
  background: bg-carbon
  border: 1px solid encina_light
  Barra de progreso verde interna (motion.div absolute)
  width: 0% → 100% en 2500ms
  texto: "ENVIANDO PAQUETE DE DATOS..."
  cursor: not-allowed

success:
  background: encina (#2D5016)
  texto: "● CONEXIÓN ESTABLECIDA"
  debajo del botón: "Nos pondremos en contacto desde Teruel pronto."
  cursor: default

error:
  background: red-900/80
  texto: "✕ ERROR DE CONEXIÓN — REINTENTA"
  parpadeo leve con Framer animate opacity [1, 0.6, 1]
  cursor: pointer (permite reintentar)
```

---

## 5. Agent 04 — Frontend Expert

### TASK-04-R · FIX-05 — Navbar logo grande + nombre "Pellisoft"

Modificar `components/layout/Navbar.tsx`:
```tsx
// Logo section — desktop: isotipo + nombre, mobile: solo isotipo
<Link href="/" className="flex items-center gap-3" aria-label="Pellisoft — inicio">
  <Image
    src="/logos/logo-azul.png"
    alt="Pellisoft"
    width={52}
    height={52}
    className="h-12 w-12 object-contain"
    priority
  />
  <span className="hidden md:block font-heading font-bold text-white_soft text-sm tracking-wide">
    Pellisoft
  </span>
</Link>
```

### TASK-04-S · FIX-07 — Favicon en layout.tsx

En `app/layout.tsx`, actualizar `metadata`:
```typescript
export const metadata: Metadata = {
  title: 'Pellisoft — Software industrial y empresarial',
  description: 'Sistemas MES, SaaS y automatización desde Teruel para el mundo.',
  icons: {
    icon: '/logos/logo-azul.png',
    apple: '/logos/logo-azul.png',
  },
  openGraph: { ... }
}
```

### TASK-04-T · FIX-08 — Alinear IDs de secciones con nav

1. En `components/sections/FeaturedProjectSection.tsx`: cambiar `id="casos"` → `id="proyectos"`
2. Verificar que Navbar NAV_LINKS son:
   ```typescript
   const NAV_LINKS = [
     { label: 'Servicios', href: '#servicios' },
     { label: 'Proyectos', href: '#proyectos' },
     { label: 'ADN', href: '#adn' },
     { label: 'Contacto', href: '#contacto' },
   ]
   ```
3. Verificar que ContactSection usa `id="contacto"`
4. En páginas secundarias: los links del Navbar navegan a `/servicios`, `/proyectos`, `/adn`, `/contacto` (rutas reales, no anclas)

### TASK-04-U · `lib/email/templates/ContactEmail.tsx`

Crear template de email con React Email:
```typescript
import {
  Body, Container, Head, Heading, Hr, Html, 
  Link, Preview, Section, Text, Row, Column
} from '@react-email/components'

interface ContactEmailProps {
  name: string
  company?: string
  email: string
  project: string
  sentAt: string
}

export function ContactEmailTemplate({ name, company, email, project, sentAt }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de {name} vía pellisoft.es</Preview>
      <Body style={{ fontFamily: 'Inter, sans-serif', background: '#f5f5f5', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', background: '#ffffff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          {/* Header */}
          <Section style={{ background: '#0F172A', padding: '24px 32px' }}>
            <Heading style={{ color: '#3B82F6', fontSize: 18, fontWeight: 700, margin: 0, fontFamily: 'monospace' }}>
              PELLISOFT
            </Heading>
            <Text style={{ color: '#6B7280', fontSize: 11, margin: '4px 0 0', fontFamily: 'monospace' }}>
              Nuevo mensaje desde la web
            </Text>
          </Section>
          {/* Datos */}
          <Section style={{ padding: '24px 32px' }}>
            <Row>
              <Column>
                <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 4px' }}>
                  <strong>Nombre:</strong> {name}
                </Text>
                {company && (
                  <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 4px' }}>
                    <strong>Empresa:</strong> {company}
                  </Text>
                )}
                <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 4px' }}>
                  <strong>Email:</strong>{' '}
                  <Link href={`mailto:${email}`} style={{ color: '#1E40AF' }}>{email}</Link>
                </Text>
              </Column>
            </Row>
            <Hr style={{ borderColor: '#E5E7EB', margin: '16px 0' }} />
            <Text style={{ color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              Mensaje:
            </Text>
            <Section style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 6, padding: '16px' }}>
              <Text style={{ color: '#374151', fontSize: 13, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                {project}
              </Text>
            </Section>
          </Section>
          {/* CTA */}
          <Section style={{ padding: '0 32px 24px' }}>
            <Link
              href={`mailto:${email}?subject=Re: tu consulta a Pellisoft`}
              style={{ display: 'inline-block', background: '#1E40AF', color: '#ffffff', borderRadius: 6, padding: '10px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              Responder a {name}
            </Link>
          </Section>
          {/* Footer */}
          <Section style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '16px 32px' }}>
            <Text style={{ color: '#9CA3AF', fontSize: 11, margin: 0, fontFamily: 'monospace' }}>
              Enviado desde pellisoft.es · {sentAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### TASK-04-V · `components/ui/TerminalInput.tsx`

Ver specs de Agent 03 (TASK-03-V). Implementación:
```typescript
'use client'

interface TerminalInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
  isValid?: boolean
}
```

Animaciones:
- Línea base como `<motion.div>` con `animate={{ backgroundColor: focused ? '#C1440E' : isValid ? '#4A7C2F' : error ? '#EF4444' : 'rgba(107,114,128,0.4)' }}`
- Error message: `<AnimatePresence>` + `motion.p` con `initial={{ opacity: 0, y: -4 }}, animate={{ opacity: 1, y: 0 }}`
- Cursor terminal: `::after` CSS en globals.css o inline con `<span className="terminal-cursor">` en un `<style jsx>` NO — usar CSS class en globals.css

### TASK-04-W · `components/ui/SubmitButton.tsx`

```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SubmitButtonProps {
  state: 'idle' | 'loading' | 'success' | 'error'
  disabled?: boolean
}
```

Usar `AnimatePresence mode="wait"` para transicionar entre estados. Cada estado es un `motion.div` con clave única.

### TASK-04-X · `components/sections/ContactSection.tsx`

**User Stories:** US-30, US-31, US-32, US-33, US-34, US-38

Estado del formulario:
```typescript
type FormState = 'idle' | 'loading' | 'success' | 'error'
const [formState, setFormState] = useState<FormState>('idle')
const [fields, setFields] = useState({ name: '', company: '', email: '', project: '', website: '' })
const [errors, setErrors] = useState<Record<string, string>>({})
const [touched, setTouched] = useState<Record<string, boolean>>({})
```

El campo `website` es el honeypot anti-spam — `hidden aria-hidden tabIndex=-1`.

Validación con Zod:
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  name:    z.string().min(2, 'Nombre demasiado corto').max(100),
  company: z.string().max(100).optional(),
  email:   z.string().email('Email no válido'),
  project: z.string().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)').max(2000),
})
```

Submit handler:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  // Honeypot check
  if (fields.website) return
  // Validate
  const result = contactSchema.safeParse(fields)
  if (!result.success) {
    setErrors(result.error.flatten().fieldErrors as Record<string, string>)
    return
  }
  setFormState('loading')
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (res.ok) setFormState('success')
    else setFormState('error')
  } catch {
    setFormState('error')
  }
}
```

### TASK-04-Y · `app/api/contact/route.ts`

Reemplazar el stub actual con la implementación completa:
- Validación Zod server-side (nunca confiar en client)
- Honeypot anti-spam: rechazar silenciosamente si `website` campo viene relleno
- Rate limiting básico (cabeceras Vercel `x-forwarded-for`)
- Envío con Resend (import `ContactEmailTemplate`)
- Respuestas: nunca exponer stack traces

Gestión del `RESEND_API_KEY` no configurada: si no existe, retornar 503 sin crash.

### TASK-04-Z · Páginas secundarias (`app/*/page.tsx`)

**`app/servicios/page.tsx`:**
- Metadata: `title: 'Servicios — Pellisoft'`
- Hero secundario (sin PIsotype animado, solo texto)
- Reutilizar `<ServicesSection>` y `<HowWeWorkSection>`
- Navbar y Footer incluidos

**`app/adn/page.tsx`:**
- Metadata: `title: 'ADN — Pellisoft'`
- Hero secundario
- Reutilizar `<DnaSection>`

**`app/contacto/page.tsx`:**
- Metadata: `title: 'Contacto — Pellisoft'`
- Sin hero, ir directo al formulario con `pt-24` (compensar Navbar)
- Reutilizar `<ContactSection>`

**`app/proyectos/page.tsx`:**
- Metadata: `title: 'Proyectos — Pellisoft'`
- Placeholder elegante: `"Próximamente — Nuestros casos de éxito"` en carbon, estilo oscuro, CTA a `/contacto`

**Componente `SecondaryHero`** (crear en `components/layout/SecondaryHero.tsx`):
```typescript
interface SecondaryHeroProps {
  eyebrow: string
  title: string
  description?: string
}
```
Diseño: `w-full bg-carbon pt-32 pb-16`, eyebrow en `font-mono text-xs text-tech_blue_light`, título en `font-heading text-5xl font-bold`.

### TASK-04-AA · Actualizar `app/page.tsx`

Añadir `ContactSection` y asegurar orden completo:
```tsx
<Navbar />
<main>
  <HeroSection />
  <ServicesSection />
  <HowWeWorkSection />
  <FeaturedProjectSection />
  <DnaSection />
  <ContactSection />
</main>
<Footer />
```

### TASK-04-AB · Cursor terminal CSS en globals.css

Añadir la clase CSS del cursor parpadeante en `styles/globals.css`:
```css
@keyframes terminal-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-cursor::after {
  content: '|';
  animation: terminal-blink 0.8s step-end infinite;
  color: #C1440E;
  margin-left: 1px;
}
```

---

## 6. Criterios de aceptación compartidos

| Criterio | Agente verificador |
|---|---|
| Logo Navbar visible, tamaño 48px, con texto "Pellisoft" en desktop | Agent 03 |
| Favicon logo-azul.png visible en tab del navegador | Agent 04 |
| Todos los nav links scrollan a la sección correcta | Agent 04 |
| ContactSection glassmorphism con borde encina | Agent 03 |
| TerminalInput: línea arcilla en focus, verde en válido, roja en inválido | Agent 03 |
| SubmitButton: 4 estados con AnimatePresence | Agent 04 |
| Mapa SVG Teruel con punto arcilla pulsante y líneas animadas | Agent 03 |
| API Route valida con Zod, no expone stack traces | Agent 04 |
| Honeypot anti-spam funcionando | Agent 04 |
| Páginas `/servicios`, `/adn`, `/contacto`, `/proyectos` cargan sin null | Agent 04 |
| `npx tsc --noEmit` → 0 errores | Agent 04 |
| `npm run build` → exitoso | Agent 04 |

---

## 7. Variables de entorno requeridas

Crear `.env.local` con:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=info@pellisoft.es
```

Si no existen, la API Route devuelve `{ error: 'Servicio no disponible' }` con status 503 sin crash.

---

## Artefactos esperados al finalizar el Sprint

| Artefacto | Agente | Estado |
|---|---|---|
| FIX-05: `components/layout/Navbar.tsx` (logo grande) | Agent 04 | ⬜ |
| FIX-07: `app/layout.tsx` (favicon) | Agent 04 | ⬜ |
| FIX-08: `FeaturedProjectSection.tsx` id corregido | Agent 04 | ⬜ |
| `lib/email/templates/ContactEmail.tsx` | Agent 04 | ⬜ |
| `components/ui/TerminalInput.tsx` | Agent 04 | ⬜ |
| `components/ui/SubmitButton.tsx` | Agent 04 | ⬜ |
| `components/sections/ContactSection.tsx` | Agent 04 | ⬜ |
| `app/api/contact/route.ts` (reemplazado) | Agent 04 | ⬜ |
| `components/layout/SecondaryHero.tsx` | Agent 04 | ⬜ |
| `app/servicios/page.tsx` | Agent 04 | ⬜ |
| `app/adn/page.tsx` | Agent 04 | ⬜ |
| `app/contacto/page.tsx` | Agent 04 | ⬜ |
| `app/proyectos/page.tsx` | Agent 04 | ⬜ |
| `app/page.tsx` actualizado | Agent 04 | ⬜ |
| `styles/globals.css` cursor terminal | Agent 04 | ⬜ |

---

> **Nota del Orquestador:** Sprint 5 es el sprint de mayor carga de este fase 1. La ContactSection es la pieza de conversión clave de toda la web. El formulario debe comunicar confianza técnica (estética terminal) y seguridad (validación, Zod, rate limiting). Los fixes globales (navbar, favicon, enlaces) deben resolverse antes de los nuevos componentes para que la experiencia de navegación sea coherente.
