# Sprint 4 — Caso Destacado MES + Sección ADN Pellisoft
## Fase 1 · Duración estimada: 1 semana

> **Agentes responsables:** Agent 03 (Web Designer) · Agent 04 (Frontend Expert)  
> **Prerequisito:** Sprint 3 completado y mergeado a `develop`  
> **Objetivo:** Implementar el caso destacado MES que demuestra capacidad técnica real, y la sección ADN Pellisoft con el efecto parallax de la "P" de fondo y el logo verde, cerrando la narrativa de marca.

---

## Goal del Sprint

> **"Al terminar este sprint, la web demuestra con un caso real (dashboard MES) lo que Pellisoft construye, y cierra la narrativa de marca con la sección ADN + el relato de Teruel para el mundo."**

---

## Referencia visual

**Imagen de apoyo — Dashboard MES** (`docs/pellisoft-images-logo/mockup-mes-dashboard.png` o equivalente):
- Dashboard oscuro con: vista isométrica de planta industrial, KPIs (OEE 94.2%, Producción 1450 uds), gráficas de barras y líneas, alertas
- Paleta: negro carbón, verde encina en métricas positivas, arcilla en alertas
- Texto: `"SISTEMAS MES INDUSTRIAL (PREP/FAB)"`, `"Desde Teruel, para el mundo"`, `"ESTADO DE LÍNEA: ACTIVA"`
- Este mockup es la referencia directa del caso destacado

**Mockup formulario** (`docs/pellisoft-images-logo/mockup-formulario.png`):
- Referencia parcial para la sección ADN: el logo `logo-verde.png` se ve en la esquina superior izquierda de esta imagen — confirma que el logo verde se usa en contextos con fondo muy oscuro / identidad territorial

**Logo ADN:**
- `public/logos/logo-verde.png` → usado como elemento decorativo de fondo (gigante, opacidad baja) en la sección ADN

---

## Historias de usuario

### US-23 · Sección Caso Destacado — layout y estructura
**Como** decisor B2B,  
**quiero** ver un ejemplo real de lo que Pellisoft ha construido,  
**para que** pueda evaluar su nivel técnico antes de contactarles.

**Tareas:**
- [ ] Crear `components/sections/FeaturedProjectSection.tsx`
- [ ] Ancla: `id="casos"`
- [ ] Layout: 2 columnas en desktop (texto izquierda, visual derecha)
- [ ] **Columna izquierda (texto):**
  - Eyebrow label: `"Caso real · Software Industrial"` — `font-mono text-sm text-tech_blue_light`
  - Título: `"Sistema MES para planta industrial"` — `font-heading text-3xl`
  - Descripción: párrafo explicando qué se resolvió con el MES (digitalización de planta, KPIs en tiempo real, reducción de errores)
  - Métricas destacadas (3 KPIs en formato grande):
    ```
    94.2%     1450 uds     0
    OEE       Producción   Alertas calidad
    ```
  - CTA: `"Ver más proyectos →"` — outline `tech_blue`
- [ ] **Columna derecha (visual):**
  - Mockup del dashboard MES (imagen de apoyo)
  - Borde glow verde encina: `box-shadow: 0 0 40px rgba(45,80,22,0.3)`
  - Ligera rotación 3D: `perspective: 1000px, rotateY: -5deg` (Framer Motion)
  - En hover: `rotateY: 0deg` (enderezan el mockup)
- [ ] Fondo de la sección: `bg-slate_dark` para diferenciarla del `bg-carbon`

---

### US-24 · Métricas animadas (Counter)
**Como** visitante,  
**quiero** ver los números de KPIs contando al entrar en vista,  
**para que** los datos tengan impacto visual y sensación de dinamismo.

**Tareas:**
- [ ] Crear `components/ui/AnimatedCounter.tsx`
- [ ] Props: `{ from: number, to: number, suffix?: string, duration?: number }`
- [ ] Implementar con `useMotionValue` + `useTransform` de Framer Motion, o con GSAP `gsap.to`:
  ```typescript
  // Al entrar en viewport: anima de 0 → valor final en 1.5s
  // Usar IntersectionObserver o Framer Motion viewport
  ```
- [ ] Ejemplos de uso:
  - `94.2%` OEE
  - `1450 uds` producción
  - `0` alertas de calidad
- [ ] Respetar `prefers-reduced-motion`: mostrar el número final directamente

---

### US-25 · Scroll reveal del Caso Destacado
**Como** visitante,  
**quiero** que el caso destacado aparezca de forma cinematográfica al hacer scroll,  
**para que** la sección tenga el peso visual que merece.

**Tareas:**
- [ ] Texto (izquierda): `whileInView` con `opacity 0→1`, `x: -30→0`, duración 700ms
- [ ] Visual del mockup (derecha): `opacity 0→1`, `x: 30→0`, duración 700ms, delay 200ms
- [ ] Los KPIs inician su conteo exactamente cuando entran en viewport
- [ ] `viewport={{ once: true, amount: 0.4 }}`

---

### US-26 · Sección ADN Pellisoft — layout y contenido
**Como** visitante,  
**quiero** entender los valores y origen de Pellisoft,  
**para que** la marca no sea solo técnica, sino también cercana y diferenciada.

**Tareas:**
- [ ] Crear `components/sections/DnaSection.tsx`
- [ ] Ancla: `id="adn"`
- [ ] Fondo: `bg-carbon` con overlay de `encina_deep` (#1A2F0D) sutil
- [ ] **Elemento de fondo decorativo:**
  - Logo `logo-verde.png` o la letra "P" gigante en formato SVG
  - Tamaño: ~600px, centrado/derecha, opacidad 8-10%
  - Color: Verde Encina muy oscuro (ya está en el PNG del logo verde)
  - Este elemento es el que hace el efecto **parallax**
- [ ] **Contenido (centrado o izquierda):**
  - Eyebrow: `"ADN · Identidad"` — `font-mono text-sm text-encina_light`
  - Titular: `"Desde Teruel,"` + `"para el mundo."` — `font-heading text-display`, en 2 líneas
    - `"Desde Teruel,"` → color `white_soft`
    - `"para el mundo."` → color `arcilla` (acento narrativo, único uso prominente del arcilla en la UI)
  - Párrafo 1: `"Pellisoft nace en Teruel con una convicción clara: el software de calidad industrial no tiene por qué venir de las grandes ciudades. Nuestras raíces están en Aragón, pero nuestro código llega a cualquier planta, empresa o proyecto."` 
  - Párrafo 2: `"Trabajamos con precisión de ingeniero y cercanía de equipo local. Sin sobre-ingeniería. Sin promesas vacías. Solo software que funciona."`
  - Valores en fila (3 iconos + texto):
    - Precisión técnica · Trato cercano · Visión a largo plazo
- [ ] **Logo verde visible** como elemento de identidad:
  - `<Image src="/logos/logo-verde.png" />` — tamaño contenido, posicionado en esquina o centrado
  - **No** en el navbar ni en el header — solo en esta sección
- [ ] Ancho completo (`w-full`), padding vertical generoso (`py-32`)

---

### US-27 · Efecto Parallax en la sección ADN
**Como** visitante,  
**quiero** que el símbolo de fondo de la sección ADN se mueva a diferente velocidad al hacer scroll,  
**para que** la sección tenga profundidad visual y sensación cinematográfica.

**Tareas:**
- [ ] Implementar parallax con GSAP ScrollTrigger en `DnaSection.tsx` (`"use client"`):
  ```typescript
  useEffect(() => {
    if (prefersReducedMotion) return
    gsap.to(backgroundRef.current, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [])
  ```
- [ ] El elemento de parallax es el `logo-verde.png` gigante de fondo (o la "P" SVG equivalente)
- [ ] El texto del primer plano se desplaza a velocidad normal (sin parallax)
- [ ] En móvil: desactivar parallax (rendimiento) — el fondo aparece estático
- [ ] Respetar `prefers-reduced-motion`: no inicializar GSAP

---

### US-28 · Footer
**Como** visitante,  
**quiero** un footer limpio con información de contacto y navegación secundaria,  
**para que** pueda acceder a links importantes sin volver al inicio.

**Tareas:**
- [ ] Crear `components/layout/Footer.tsx`
- [ ] **Logo a usar:** `public/logos/logo-blanco.png` — sobre fondo oscuro del footer
- [ ] Estructura:
  ```
  [Logo blanco]    Servicios · Casos · ADN · Contacto    © 2026 Pellisoft
                   Política de privacidad
  ```
- [ ] Fondo: `bg-slate_dark` con borde superior sutil `tech_blue` al 15% opacidad
- [ ] Texto: `text-muted`, links con hover `text-white_soft`
- [ ] Sin elementos decorativos complejos — limpio y funcional

---

### US-29 · Responsive de Caso Destacado y ADN
**Como** visitante móvil,  
**quiero** que el caso y la sección ADN sean legibles y funcionales en mi teléfono,  
**para que** la experiencia sea completa sin importar el dispositivo.

**Tareas:**
- [ ] Caso Destacado en móvil:
  - Layout: columna única, visual del mockup primero (o debajo), texto encima
  - Métricas en fila de 3 (reducir texto si hace falta)
  - Mockup sin rotación 3D en móvil
- [ ] ADN en móvil:
  - Logo/P de fondo: aún más transparente (5% opacidad) para no interferir con texto
  - Párrafos reducidos
  - Los 3 valores en columna si no caben en fila

---

## Criterios de aceptación del Sprint

- [ ] El caso destacado muestra el mockup MES con borde glow verde
- [ ] Los 3 KPIs cuentan desde 0 al entrar en viewport
- [ ] En hover del mockup, se endereza la perspectiva 3D suavemente
- [ ] La sección ADN muestra el logo `logo-verde.png` en el fondo semitransparente
- [ ] La "P"/logo de fondo se desplaza visiblemente más lento que el texto al hacer scroll (parallax)
- [ ] `"para el mundo."` está en color `arcilla` claramente visible
- [ ] El footer muestra `logo-blanco.png` y todos los links de navegación
- [ ] En móvil, el parallax está desactivado (fondo estático)
- [ ] `prefers-reduced-motion` desactiva todos los efectos de movimiento
- [ ] Build limpio sin errores TypeScript

---

## Dependencias

- Sprint 3 completado
- Imagen del dashboard MES disponible en `public/images/` (mockup de referencia del proyecto)
- Copy final de la sección ADN (puede ser placeholder revisado en Sprint 6)

## Definition of Done

- Código en rama `feature/sprint-4-cases-adn` mergeada a `develop`
- Parallax verificado a 60fps en Chrome DevTools sin janks
- Sección ADN con narrativa visual coherente con identidad Pellisoft
- Revisión Agent 03 (visual) + Agent 04 (código) aprobada
