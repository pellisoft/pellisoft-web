# Sprint 5 — Contact Command Center & Páginas Secundarias
## Fase 1 · Duración estimada: 1 semana

> **Agentes responsables:** Agent 04 (Frontend Expert) · Agent 03 (Web Designer)  
> **Prerequisito:** Sprint 4 completado y mergeado a `develop`  
> **Objetivo:** Implementar el formulario de contacto "Command Center" con todas sus micro-interacciones, la API Route de envío seguro, y las páginas secundarias estáticas del sitio.

---

## Goal del Sprint

> **"Al terminar este sprint, el visitante puede rellenar y enviar el formulario de contacto con una experiencia visual de terminal/centro de control, y el email llega al buzón de Pellisoft. Las páginas de Servicios, ADN y Contacto son navegables."**

---

## Referencia visual

**Imagen de apoyo — Formulario** (`docs/pellisoft-images-logo/mockup-formulario.png`):
- Pantalla dividida: **izquierda** — globo terráqueo en modo oscuro con punto naranja sobre España/Teruel, líneas de conexión, `"CONEXIÓN: ESTABLECIDA"` 
- **Derecha** — formulario con campos línea base (no cajas), borde verde activo en el campo seleccionado, botón naranja `"ENVIAR MENSAJE"`, barra de progreso verde debajo del botón con `"ENVIANDO PAQUETE DE DATOS: MES INTEGRATION HUB... 45%"`
- Email y portal de soporte en la parte inferior izquierda
- El glassmorphism del contenedor es sutil — fondo oscuro con borde verde encina brillante

**Colores del formulario:**
- Contenedor: fondo `slate_dark` con borde `encina_light` + glow verde muy sutil
- Campo activo (focus): línea inferior `arcilla` brillante + cursor terminal parpadeante
- Campo válido: línea `encina_light` 
- Campo inválido: línea roja pulsante
- Botón envío: `arcilla` → `arcilla_light` en hover (confirmado por imagen de apoyo)
- Barra de progreso: gradiente `encina_light`

---

## Historias de usuario

### US-30 · ContactSection — layout Command Center
**Como** visitante,  
**quiero** un formulario de contacto que parezca un panel de control tecnológico,  
**para que** la experiencia de contacto sea coherente con la identidad de Pellisoft.

**Tareas:**
- [ ] Crear `components/sections/ContactSection.tsx`
- [ ] Ancla: `id="contacto"`
- [ ] Título de sección: `"Contacto"` + `"Command Center"` en `font-mono text-sm text-muted`
- [ ] Layout 2 columnas en desktop, 1 columna en móvil:
  ```
  ┌─────────────────────────────────────────────────────┐
  │  Glassmorphism container (borde encina + glow)      │
  │  ┌──────────────────┐  ┌───────────────────────┐   │
  │  │   Info Contacto  │  │      Formulario       │   │
  │  │   + Globe/Mapa   │  │   (ver US-31/32/33)   │   │
  │  └──────────────────┘  └───────────────────────┘   │
  └─────────────────────────────────────────────────────┘
  ```
- [ ] Contenedor glassmorphism:
  ```css
  background: rgba(17, 19, 24, 0.85)
  backdrop-filter: blur(16px)
  border: 1px solid rgba(74, 124, 47, 0.4)
  box-shadow: 0 0 60px rgba(45, 80, 22, 0.15), inset 0 1px 0 rgba(74,124,47,0.1)
  border-radius: 16px
  ```
- [ ] **Columna izquierda (info + mapa):**
  - Indicador de estado: `●  SISTEMA ACTIVO` en `encina_light` con punto parpadeante
  - Título: `"Iniciemos tu proyecto"` — `font-heading text-2xl`
  - Descripción breve: `"Cuéntanos qué necesitas. Respondemos desde Teruel en menos de 24h."`
  - Elemento visual del globo/mapa (ver US-34) 
  - Email: `info@pellisoft.es` — `font-mono text-sm`
  - Portal soporte: link estilizado

---

### US-31 · TerminalInput — componente de campo de formulario
**Como** desarrollador/diseñador,  
**quiero** un input con estética de terminal,  
**para que** el formulario tenga la identidad visual del "Command Center".

**Tareas:**
- [ ] Crear `components/ui/TerminalInput.tsx` (`"use client"`)
- [ ] Props:
  ```typescript
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
- [ ] **Diseño:**
  - Sin caja/borde lateral — solo línea inferior de 1px
  - Label: `font-mono text-xs text-muted` flotante arriba del campo
  - Línea base por defecto: `muted` al 40% opacidad
  - En focus: línea base → `arcilla` con transición 300ms + efecto glow arcilla sutil
  - Cursor terminal: `|` parpadeante al final del texto (CSS `animation: cursor 0.8s step-end infinite`)
  - En válido: línea base → `encina_light` con breve destello verde al hacer blur
  - En inválido: línea base → `red-500` con animación de pulso suave (Framer Motion `animate={{ opacity: [1, 0.4, 1] }}`)
- [ ] Texto de error: `font-mono text-xs text-red-400` debajo del campo
- [ ] El textarea tiene mínimo 4 filas, resize: none

---

### US-32 · Formulario — estado y validación cliente
**Como** visitante,  
**quiero** que el formulario me indique en tiempo real si mis datos son correctos,  
**para que** no envíe información incorrecta.

**Tareas:**
- [ ] Estado del formulario en `ContactSection.tsx` con `useState`:
  ```typescript
  type FormState = 'idle' | 'loading' | 'success' | 'error'
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ name: '', company: '', email: '', project: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  ```
- [ ] Validación client-side con Zod antes del submit:
  ```typescript
  const contactSchema = z.object({
    name:    z.string().min(2, 'Nombre demasiado corto').max(100),
    company: z.string().max(100).optional(),
    email:   z.string().email('Email no válido'),
    project: z.string().min(10, 'Cuéntanos un poco más').max(2000),
  })
  ```
- [ ] Validación en tiempo real (onBlur) para email
- [ ] No mostrar errores hasta el primer intento de envío o blur del campo
- [ ] Campos:
  1. Nombre* — `type="text"`
  2. Empresa (opcional) — `type="text"`, label con `"(opcional)"` en muted
  3. Email* — `type="email"`
  4. Proyecto* — `<textarea>`, placeholder: `"Cuéntanos qué necesitas construir..."`

---

### US-33 · Botón de envío con micro-interacción
**Como** visitante,  
**quiero** que el botón de enviar tenga una animación que confirme que mi mensaje se está enviando,  
**para que** no pulse el botón dos veces por incertidumbre.

**Referencia visual:** Mockup formulario — botón naranja que muestra barra de progreso verde con texto de terminal

**Tareas:**
- [ ] Crear `components/ui/SubmitButton.tsx`
- [ ] Estados visuales del botón con `AnimatePresence`:

| Estado | Visual |
|---|---|
| `idle` | `"Enviar Mensaje"` — fondo `arcilla`, texto blanco |
| `loading` | Barra de progreso verde (`encina_light`) animándose de 0→100% en 2s. Texto: `"Enviando paquete de datos..."` en `font-mono text-xs` |
| `success` | Check icon + `"Conexión establecida"` — fondo `encina` |
| `error` | X icon + `"Error de conexión. Reintenta."` — fondo `red-800` |

- [ ] Framer Motion para la transición entre estados (AnimatePresence con `mode="wait"`)
- [ ] La barra de progreso es un elemento `<motion.div>` con `width: 0% → 100%`
- [ ] En `success`: mostrar mensaje debajo: `"Nos pondremos en contacto desde Teruel pronto."`
- [ ] Botón deshabilitado durante `loading` y `success`

---

### US-34 · Elemento visual del mapa / globo
**Como** diseñador/visitante,  
**quiero** un elemento visual que evoque la conexión de Teruel con el mundo,  
**para que** el formulario no sea solo un grid de campos sino un "centro de control".

**Referencia visual:** Mockup formulario — globo terráqueo oscuro con líneas de latitud/longitud tenues, punto naranja sobre España, líneas de conexión hacia otros puntos

**Tareas:**
- [ ] Implementar como SVG o componente Canvas minimalista:
  - Opción A (recomendada v1): SVG estilizado de mapa plano de Europa/mundo en modo oscuro, punto `arcilla` sobre Teruel (~40.3°N 1.1°W), líneas de conexión simples hacia 3-4 ciudades
  - Opción B (v1.1): Three.js / react-globe.gl si se decide invertir más tiempo
- [ ] Tamaño: ~200px × 200px en el panel izquierdo
- [ ] Animación: punto de Teruel pulsa suavemente (glow `arcilla`, 2s ciclo)
- [ ] Las líneas de conexión se dibujan progresivamente con `stroke-dashoffset` al entrar en viewport
- [ ] En móvil: ocultar el globo, mostrar solo texto e iconos de contacto

---

### US-35 · API Route — /api/contact
**Como** sistema,  
**quiero** una API Route segura que procese el formulario y envíe el email,  
**para que** los mensajes lleguen a Pellisoft sin exponer datos sensibles.

**Tareas:**
- [ ] Crear `app/api/contact/route.ts`
- [ ] Implementación:
  ```typescript
  import { z } from 'zod'
  import { Resend } from 'resend'
  import { NextRequest, NextResponse } from 'next/server'

  const resend = new Resend(process.env.RESEND_API_KEY)

  const contactSchema = z.object({
    name:    z.string().min(2).max(100),
    company: z.string().max(100).optional(),
    email:   z.string().email(),
    project: z.string().min(10).max(2000),
  })

  export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const data = contactSchema.parse(body)
      
      await resend.emails.send({
        from:    'web@pellisoft.es',
        to:      process.env.CONTACT_EMAIL_TO!,
        subject: `Nuevo contacto web: ${data.name}`,
        react:   ContactEmailTemplate(data),
      })

      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
      }
      return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
  }
  ```
- [ ] **Seguridad:**
  - Nunca exponer `RESEND_API_KEY` (sin prefijo `NEXT_PUBLIC_`)
  - No incluir stack trace en respuestas de error (solo mensaje genérico)
  - Validación estricta con Zod (nunca confiar en el body sin parsear)
  - Rate limiting básico: comprobar si el mismo IP envió en los últimos 60s (usando headers de Vercel)
- [ ] **Campo honeypot anti-spam:** añadir campo oculto `website` en el formulario; si viene relleno, retornar 200 sin enviar

---

### US-36 · Template de email (React Email)
**Como** Pellisoft,  
**quiero** recibir los emails de contacto con un diseño limpio y profesional,  
**para que** la información llegue bien estructurada y sea fácil de procesar.

**Tareas:**
- [ ] Crear `lib/email/templates/ContactEmail.tsx`
- [ ] Diseño con React Email:
  - Header: logo Pellisoft (versión blanca o azul) + título `"Nuevo mensaje desde la web"`
  - Sección datos: Nombre, Empresa, Email del remitente
  - Sección mensaje: el texto del proyecto en caja destacada
  - Footer: `"Mensaje enviado desde pellisoft.es"` + fecha/hora
- [ ] Paleta: fondo blanco o muy claro (email es diferente a la web), texto oscuro
- [ ] Botón de respuesta rápida: `"Responder a [nombre]"` con `href="mailto:[email]"`

---

### US-37 · Páginas secundarias estáticas
**Como** visitante,  
**quiero** poder navegar a páginas individuales de Servicios, ADN y Contacto,  
**para que** pueda compartir URLs específicas y el SEO funcione por sección.

**Tareas:**
- [ ] `app/servicios/page.tsx`:
  - Reutilizar `ServicesSection` + `HowWeWorkSection`
  - Hero secundario simple (sin isotipo animado): título `"Servicios"` + descripción
  - Metadatos propios: `title: "Servicios — Pellisoft"`
- [ ] `app/adn/page.tsx`:
  - Reutilizar `DnaSection`
  - Hero secundario: título `"ADN Pellisoft"` + descripción
  - Metadatos: `title: "ADN — Pellisoft"`
- [ ] `app/contacto/page.tsx`:
  - Reutilizar `ContactSection` como protagonista
  - Sin hero — ir directamente al formulario con padding top
  - Metadatos: `title: "Contacto — Pellisoft"`
- [ ] `app/proyectos/page.tsx`:
  - Placeholder elegante: `"Próximamente — Nuestros casos de éxito"`
  - Misma estética oscura, CTA que redirige a contacto

---

### US-38 · Responsive del formulario
**Como** visitante móvil,  
**quiero** que el formulario de contacto sea completamente funcional en mi teléfono,  
**para que** pueda contactar con Pellisoft cómodamente.

**Tareas:**
- [ ] En móvil (`< 768px`):
  - Layout 1 columna: info de contacto arriba, formulario debajo
  - Globo/mapa: oculto (`hidden md:block`)
  - Campos a ancho completo
  - Botón de envío: ancho completo
- [ ] Verificar que el teclado virtual no oculta el botón de envío (scroll adecuado)
- [ ] Verificar que los errores de validación son legibles en pantalla pequeña

---

## Criterios de aceptación del Sprint

- [ ] Los 4 campos del formulario muestran la animación de focus (línea arcilla) correctamente
- [ ] La validación en tiempo real funciona: email inválido → línea roja; email válido → línea verde
- [ ] Al enviar, el botón muestra la barra de progreso verde con texto de terminal
- [ ] Al completar el envío, aparece el mensaje `"Conexión establecida. Nos pondremos en contacto desde Teruel pronto."`
- [ ] El email llega al buzón configurado en `CONTACT_EMAIL_TO` (test en staging)
- [ ] Si `RESEND_API_KEY` no está configurada, el formulario muestra estado error sin crash
- [ ] El campo honeypot anti-spam está presente pero invisible para el usuario
- [ ] Las páginas `/servicios`, `/adn`, `/contacto` cargan sin errores
- [ ] `/proyectos` muestra el placeholder elegante
- [ ] Build limpio, sin errores TypeScript

---

## Dependencias

- Sprint 4 completado
- API key de Resend configurada en `.env.local` para testing
- Email destino configurado en `CONTACT_EMAIL_TO`

## Definition of Done

- Código en rama `feature/sprint-5-contact` mergeada a `develop`
- Test manual de envío de formulario en `localhost:3000` confirmado
- Páginas secundarias navegables desde el navbar
- Revisión Agent 04 (código) + Agent 02 (flujo funcional) aprobada
