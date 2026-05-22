# Sprint 3 — Services Bento Grid & "Cómo Trabajamos"
## Fase 1 · Duración estimada: 1 semana

> **Agentes responsables:** Agent 03 (Web Designer) · Agent 04 (Frontend Expert)  
> **Prerequisito:** Sprint 2 completado y mergeado a `develop`  
> **Objetivo:** Construir la sección de servicios con el Bento Grid animado y la sección de proceso "Cómo trabajamos", demostrando la capacidad técnica de Pellisoft de forma visual y clara.

---

## Goal del Sprint

> **"Al terminar este sprint, la web comunica los 3 servicios principales con un grid moderno e interactivo, y el proceso de trabajo en 4 pasos que genera confianza B2B."**

---

## Referencia visual

**Mockup principal** (`docs/pellisoft-images-logo/mockup-onepage.png`):
- Sección "Servicios" debajo del Hero — 3 cards horizontales iguales en el mockup, pero el diseño final usa **bento asimétrico** (1 grande + 2 medianas según architecture.md)
- Cada card: fondo oscuro `slate_dark`, borde sutil, icono lineal, título en blanco, descripción gris, flecha `→`
- El mockup muestra exactamente: **Sistemas MES Industrial** · **Facturación SaaS** · **Automatización e Integraciones**

**Imagen de apoyo — Dashboard MES** (`mockup-mes-dashboard.png`):
- Referencia del tipo de contenido que maneja Pellisoft (visualización de producción, KPIs, líneas de datos)
- Útil para el icono/ilustración de la card MES en el Bento Grid

**Mockup verde completo** (`mockup-verde-full.png`):
- Muestra la disposición del bento grid desde una perspectiva diferente: card MES grande a la izquierda, TPV y Facturación en columna derecha

---

## Historias de usuario

### US-15 · Bento Grid — Estructura y layout
**Como** visitante,  
**quiero** ver los servicios de Pellisoft de forma visual y clara,  
**para que** en un vistazo entienda qué tipo de software desarrollan.

**Tareas:**
- [ ] Crear `components/sections/ServicesSection.tsx`
- [ ] Ancla: `id="servicios"`
- [ ] Título de sección: `"Servicios"` — `font-heading`, `text-3xl`, blanco
- [ ] Layout Bento Grid con CSS Grid (áreas nombradas):
  ```
  Desktop (lg):
  ┌─────────────────────┬──────────────┐
  │                     │     TPV      │
  │   MES Industrial    │  Inteligente │
  │     (col-span 2)    ├──────────────┤
  │                     │  Facturación │
  └─────────────────────┴──────────────┘

  Mobile / Tablet:
  Tres cards en columna única o 2-col
  ```
- [ ] Grid Tailwind: `grid-cols-3 grid-rows-2` en desktop, `grid-cols-1` en móvil
- [ ] Card MES: `col-span-2 row-span-2` (card grande protagonista)
- [ ] Cards TPV y Facturación: `col-span-1 row-span-1` cada una

---

### US-16 · Card — Sistemas MES Industrial (card grande)
**Como** visitante B2B industrial,  
**quiero** ver el servicio MES presentado de forma impactante,  
**para que** entienda que Pellisoft tiene expertise real en software industrial.

**Tareas:**
- [ ] Fondo: `bg-slate_dark` con gradiente sutil hacia `tech_blue` muy oscuro en esquina
- [ ] Borde: `1px solid` `tech_blue` al 25% opacidad
- [ ] **Contenido:**
  - Icono: SVG lineal de planta industrial / línea de producción conectada a nodos (inspirado en imagen MES de apoyo)
  - Título: `"Sistemas MES Industrial"` — `font-heading text-2xl`
  - Descripción: `"Monitorización y control de producción en tiempo real. Digitalización de planta, KPIs y gestión de estados."` — `text-muted_light text-sm`
  - Tag: `"MES · SCADA · Industrial"` — badge verde encina pequeño
  - Flecha `→` en esquina inferior derecha
- [ ] **Hover:**
  - `translateY: -4px` (Framer Motion `whileHover`)
  - Borde: `tech_blue` al 60% opacidad
  - Glow azul sutil: `box-shadow: 0 0 24px rgba(30,64,175,0.25)`
  - Icono: micro-animación de "pulso" (escala 1 → 1.05 → 1)
  - Cursor: `cursor-pointer`

---

### US-17 · Card — TPV Inteligente
**Como** visitante,  
**quiero** ver el servicio de TPV presentado de forma clara,  
**para que** sepa que Pellisoft también ofrece soluciones para comercio.

**Tareas:**
- [ ] Fondo: `bg-slate_dark` con gradiente sutil hacia `tech_purple` muy oscuro
- [ ] Borde: `1px solid` `tech_purple` al 25% opacidad
- [ ] **Contenido:**
  - Icono: SVG lineal de pantalla TPV / monitor con señal
  - Título: `"TPV Inteligente"` — `font-heading text-xl`
  - Descripción: `"Punto de venta adaptado a tu negocio. Gestión de productos, clientes y ventas integrada."` — `text-muted_light text-sm`
  - Flecha `→` en esquina inferior derecha
- [ ] **Hover:**
  - `translateY: -4px`
  - Glow morado sutil: `box-shadow: 0 0 24px rgba(124,58,237,0.25)`
  - Icono: rotación ligera (3°) + pulso

---

### US-18 · Card — Facturación SaaS
**Como** visitante,  
**quiero** ver el servicio de facturación presentado de forma clara,  
**para que** entienda la propuesta de Pellisoft en gestión empresarial.

**Tareas:**
- [ ] Fondo: `bg-slate_dark` con gradiente sutil hacia `arcilla` muy oscuro
- [ ] Borde: `1px solid` `arcilla` al 25% opacidad
- [ ] **Contenido:**
  - Icono: SVG lineal de documento/factura con circuito
  - Título: `"Facturación SaaS"` — `font-heading text-xl`
  - Descripción: `"Facturación electrónica en la nube. Integración con ERP, contabilidad y gestión de clientes."` — `text-muted_light text-sm`
  - Flecha `→` en esquina inferior derecha
- [ ] **Hover:**
  - `translateY: -4px`
  - Glow arcilla sutil: `box-shadow: 0 0 24px rgba(193,68,14,0.25)`
  - Icono: separación de elementos en eje Z (efecto profundidad via `perspective` + `rotateX` leve)

---

### US-19 · Componente Card reutilizable
**Como** desarrollador,  
**quiero** un componente base de card para no duplicar lógica,  
**para que** los cambios de estilo sean consistentes en todas las cards.

**Tareas:**
- [ ] Crear `components/ui/Card.tsx` con props:
  ```typescript
  interface CardProps {
    title: string
    description: string
    icon: React.ReactNode
    glowColor: 'blue' | 'purple' | 'arcilla' | 'encina'
    badge?: string
    size?: 'sm' | 'lg'
    className?: string
    children?: React.ReactNode
  }
  ```
- [ ] El `glowColor` mapea al token de color correspondiente
- [ ] Usar `clsx` / `tailwind-merge` para composición de clases
- [ ] Componente `"use client"` (necesita Framer Motion `whileHover`)

---

### US-20 · Scroll reveal en la sección de Servicios
**Como** visitante,  
**quiero** que las cards aparezcan progresivamente al hacer scroll,  
**para que** la sección tenga vida y no aparezca de golpe.

**Tareas:**
- [ ] Usar Framer Motion `whileInView` en cada card con `viewport={{ once: true, amount: 0.3 }}`
- [ ] Stagger de entrada: card MES primero, luego TPV y Facturación con 0.15s de delay
- [ ] Animación: `hidden: { opacity: 0, y: 30 }` → `visible: { opacity: 1, y: 0 }`
- [ ] Duración: 600ms, ease: `easeOut`

---

### US-21 · Sección "Cómo Trabajamos"
**Como** decisor B2B,  
**quiero** entender el proceso de trabajo de Pellisoft,  
**para que** sepa qué esperar si contrato sus servicios.

**Tareas:**
- [ ] Crear `components/sections/HowWeWorkSection.tsx`
- [ ] Ancla: `id="proceso"`
- [ ] Título: `"Cómo trabajamos"` — `font-heading text-3xl`
- [ ] Subtítulo: `"Un proceso claro, de principio a fin"` — `text-muted_light`
- [ ] 4 pasos en layout horizontal (desktop) / vertical (móvil):

| Nº | Título | Descripción |
|---|---|---|
| 01 | Análisis | Entendemos tu negocio y tus procesos antes de escribir una sola línea de código. |
| 02 | Diseño | Arquitectura técnica y UX pensadas para durar. Sin sobre-ingeniería. |
| 03 | Desarrollo | Código limpio, componentes modulares y entregas iterativas. |
| 04 | Escalado | Sistemas preparados para crecer contigo. Sin rehacer desde cero. |

- [ ] Cada paso tiene:
  - Número grande (`font-mono`, `text-6xl`, `text_blue` con 30% opacidad) como fondo decorativo
  - Línea conectora entre pasos (desktop): `border-t border-dashed border-muted/30`
  - Icono Lucide relevante (Microscope, Pencil, Code, TrendingUp)
  - Título en blanco, descripción en `muted_light`
- [ ] Scroll reveal: pasos aparecen secuencialmente (stagger 0.2s) al entrar en viewport

---

### US-22 · Responsive de Servicios y Proceso
**Como** visitante móvil,  
**quiero** que las secciones de servicios y proceso sean legibles en mi teléfono,  
**para que** no tenga que hacer zoom ni desplazamiento horizontal.

**Tareas:**
- [ ] Bento Grid en móvil: `grid-cols-1`, todas las cards en columna, misma altura
- [ ] La card MES en móvil pierde su tamaño grande, pasa a ser igual que las demás
- [ ] "Cómo trabajamos" en móvil: layout vertical con línea conectora vertical
- [ ] Verificar que los textos no se cortan y los bordes están completos

---

## Criterios de aceptación del Sprint

- [ ] El Bento Grid muestra 3 cards (1 grande + 2 medianas) en desktop
- [ ] Cada card tiene su color de glow diferenciado (azul, morado, arcilla)
- [ ] El hover de cada card activa elevación + glow sin lag
- [ ] La card MES tiene su badge verde encina visible
- [ ] Los 4 pasos de "Cómo trabajamos" son visibles y legibles
- [ ] El stagger de entrada funciona al hacer scroll (sin animación sin scroll)
- [ ] En móvil, todas las cards están en columna sin overflow horizontal
- [ ] `prefers-reduced-motion` desactiva los hovers y scroll reveals
- [ ] Build limpio sin errores

---

## Dependencias

- Sprint 1 y 2 completados
- Definición final de copy de servicios (puede ser placeholder revisado en QA)
- SVG de iconos (pueden ser Lucide Icons en primera iteración, SVG custom en Sprint 6 QA)

## Definition of Done

- Código en rama `feature/sprint-3-services` mergeada a `develop`
- Bento Grid visualmente coherente con mockup de referencia
- Hover effects fluidos a 60fps (verificado en Chrome DevTools → Performance)
- Revisión Agent 03 (visual) + Agent 04 (código) aprobada
