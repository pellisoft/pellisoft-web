# Auditoría web — pellisoft.com

Revisión de la web desde el punto de vista de captación de clientes: diseño, mensaje, confianza, conversión, SEO, legal y técnica. Documento vivo: marcar `[x]` los puntos resueltos y añadir entradas en el [Historial](#historial).

**Fecha:** 2026-09-29 · **Alcance:** landing, ficha de proyecto y formulario, versión en producción.

> **Contexto:** pellisoft.com es la **web corporativa / portfolio** de la empresa: quiénes somos, qué servicios ofrecemos y qué hemos construido. Cada SaaS propio (PLRFactu y los siguientes) tiene **su propia web con precios y venta**. Aquí los productos se muestran como prueba de capacidad y se enlaza a su web. Lo que se "vende" desde aquí son los **servicios a medida**.

---

## 1. Resumen ejecutivo

La web **transmite calidad técnica**. Es moderna, coherente y rápida, está cuidada al detalle y bien protegida. Hoy está por encima de la media de las webs de consultoras de software pequeñas en España.

Pero **todavía no está preparada para convertir visitas en clientes**. Cuenta bien *cómo* trabajamos, pero no deja claro *para quién* es ni *qué problema concreto resolvemos*. No da motivos para confiar en una empresa nueva y solo ofrece una vía de contacto, la de mayor compromiso. Además le faltan dos obligaciones legales básicas (aviso legal y privacidad) que un cliente B2B mirará antes de escribir.

La buena noticia: la base técnica y visual ya está hecha. Lo que falta es **mensaje, confianza y cumplimiento**. Es sobre todo contenido y requiere poco desarrollo.

### Puntuación por área (1–10)

| Área | Nota | Comentario |
|---|:-:|---|
| Diseño visual | **8** | Estética *liquid glass* coherente con la marca. El hero desaprovecha espacio |
| Claridad de la propuesta de valor | **5** | Dice qué hacemos, no para quién ni con qué resultado |
| Confianza / prueba social | **3** | Sin clientes, testimonios ni caras. Un solo proyecto |
| Conversión | **4** | Un único CTA de alta fricción; sin alternativa ligera |
| SEO y visibilidad | **4** | Una sola página, sin imagen para compartir y con URLs duplicadas |
| Legal (LSSI / RGPD) | **2** | Sin aviso legal ni política de privacidad |
| Técnica y rendimiento | **8** | Next 16 estático, carga rápida. Queda código muerto |
| Seguridad | **8** | Cabeceras, CSP y validación de la API correctas (ver `docs/security.md`) |

**Veredicto:** con los puntos P0 y P1 resueltos, la web pasaría de "bonita" a "comercial". Las tareas son de horas o días, no de semanas.

---

## 2. Hallazgos y recomendaciones

Prioridad: **P0** crítico (bloquea o expone) · **P1** alto impacto en captación · **P2** mejora notable · **P3** pulido.
Esfuerzo: **S** < 2 h · **M** medio día · **L** 1–3 días.

### P0 — Crítico

- [x] **P0-1 · Aviso legal inexistente** · ✅ `/aviso-legal` creada. ⚠️ **Rellenar `LEGAL` en `lib/site.ts` antes de publicar** (`/aviso-legal` → 404) · Esfuerzo S
  La LSSI (art. 10) obliga a mostrar el titular, el NIF, el domicilio, el email y los datos registrales, si los hay. No tenerlo puede acarrear sanción y **resta credibilidad**: es lo primero que busca un comprador B2B cuando no conoce a la empresa.
  → Página `/aviso-legal` y enlace en el footer.

- [x] **P0-2 · Sin política de privacidad ni información en el formulario** · Esfuerzo S
  El formulario recoge nombre, email y empresa. El RGPD (art. 13) exige informar de responsable, finalidad, base legal, conservación y derechos.
  → Página `/privacidad`, texto breve bajo el botón ("Usaremos tus datos solo para responder a tu consulta. Más info en Privacidad") y enlace en el footer.
  → Plausible no usa cookies, así que **no hace falta banner de cookies**. Conviene decirlo en la política.

- [x] **P0-3 · Páginas duplicadas activas** (`/servicios`, `/adn`, `/contacto` → 200) · Esfuerzo S
  Repiten secciones de la landing. Google las ve como contenido duplicado y reparte la relevancia.
  → Borrarlas y redirigir con 308 a `/#servicios`, `/#adn` y `/#contacto` (ya se hace así con `/proyectos`), y quitarlas del sitemap.

### P1 — Alto impacto en captación

- [x] **P1-1 · El hero no dice para quién ni qué resultado** · Esfuerzo M
  "Software industrial y empresarial diseñado para escalar" podría ser de cualquier empresa. En 5 segundos el visitante debe saber si esto es para él.
  → Titular orientado a resultado y a cliente. Ejemplos:
  - *"Software a medida para pymes e industria que quieren dejar el Excel y el papel"*
  - *"Digitalizamos tu planta o tu negocio con software hecho para ti, no para todos"*
  → Subtítulo con los tres pilares: **industria** (MES/PLC), **negocio** (SaaS/TPV), **a medida**.
  → **Bug visual:** mientras cambia, la palabra animada deja un hueco en blanco y la frase queda redundante ("Automatización industrial — SaaS y automatización…"). Reescribir la frase y reservar el ancho del hueco.

- [x] **P1-2 · El logo ocupa media portada** · Esfuerzo M
  El isotipo grande en el hero es espacio desaprovechado: el logo ya está en la navbar.
  → Sustituirlo por algo que **demuestre**: una composición de cristal con capturas reales (PLRFactu dentro del `BrowserFrame`, y un panel MES cuando exista) o un mini diagrama "máquina → datos → decisión".

- [ ] ⏸️ **Deuda técnica (aplazado hasta el arranque de la empresa)** · **P1-3 · Cero prueba social** · Esfuerzo M
  Una empresa nueva sin referencias genera dudas. Sin inventar nada, se puede compensar con:
  - **Quién está detrás:** foto y nombre del fundador, trayectoria real (años en industria, sectores, tecnologías) y enlace a LinkedIn. En B2B pequeño **la persona vende más que la marca**.
  - **PLRFactu como prueba:** "Nuestro propio SaaS, en producción" demuestra capacidad de construir y operar un producto.
  - **Ejemplos de problemas que resolvemos**, planteados como escenarios y no como clientes. Por ejemplo: "Una planta que apunta paros en papel → OEE en tiempo real".
  - Más adelante, **testimonios** de los primeros clientes, aunque sean proyectos pequeños.

- [ ] **P1-4 · Un único CTA de alta fricción** · Esfuerzo S–M · *(rebajado a P2 por el contexto portfolio: el formulario basta; la reserva de llamada es un extra)*
  "Hablar con Pellisoft" + formulario exige que el cliente sepa ya qué quiere.
  → Añadir un **CTA de bajo compromiso**: *"Diagnóstico gratuito de 30 min"* con reserva en calendario (Cal.com o Calendly; hay que dar de alta el dominio en la CSP).
  → Opcional: botón de **WhatsApp Business**, muy eficaz con pymes locales.
  → Texto de expectativa junto al formulario: "Te respondemos en 24 h con una primera valoración, sin compromiso".

- [x] **P1-5 · Mensaje disperso entre industria y comercio** · Esfuerzo S · *(versión ligera: basta una línea clara en hero o servicios sobre a quién nos dirigimos)*
  El jefe de planta y el dueño de una peluquería no compran igual.
  → A corto plazo: bloque **"¿Para quién trabajamos?"** con dos o tres perfiles (Industria · Pyme y comercio · Empresas con software a medida), cada uno con su dolor típico y lo que ofrecemos.
  → A medio plazo: una landing por perfil, que ayuda también al SEO.

- [x] **P1-6 · Sin imagen al compartir** (`og:image` vacío) · Esfuerzo S
  Al pegar el enlace en LinkedIn o WhatsApp sale sin imagen, y LinkedIn es el canal B2B principal.
  → `app/opengraph-image.png` (1200×630) con la marca y el titular. Las fichas de proyecto ya usan su captura.

### P2 — Mejora notable

- [ ] **P2-1 · FAQ comercial** · Esfuerzo S
  Resuelve objeciones antes del contacto. Preguntas típicas: ¿cuánto cuesta un proyecto?, ¿cuánto tarda?, ¿de quién es el código?, ¿dais soporte después?, ¿trabajáis en remoto o venís a planta?, ¿qué pasa si ya tengo un ERP?

- [x] ~~**P2-2 · Orientación de precio**~~ · *Descartado: los precios van en la web de cada SaaS; para servicios a medida basta "presupuesto sin compromiso".*
  <!-- original -->
  El comprador pyme se va si no intuye el rango. No hace falta tarifa; basta con algo como "Proyectos a medida desde X €" o "Presupuesto cerrado por fases en 48 h". *(Solo con cifras reales.)*

- [x] ~~**P2-3 · Gancho de actualidad: Verifactu**~~ · *Se traslada a la web de PLRFactu (es argumento de venta del producto).*
  <!-- original -->
  Muchas pymes y autónomos tendrán que cumplir Verifactu próximamente (confirmar el calendario vigente de la AEAT). PLRFactu ya lo cumple.
  → Un bloque o artículo "¿Tu negocio está preparado para Verifactu?" con CTA atrae tráfico cualificado.

- [ ] **P2-4 · Contraste de texto insuficiente** · Esfuerzo S
  `text-muted` (#6B7280 sobre #0A0A0A) da un contraste de **4.0:1**. Es menos de 4.5:1, el mínimo WCAG AA para texto normal. Se usa en 16 sitios, sobre todo etiquetas pequeñas en mono.
  → Aclarar el token (por ejemplo, #8B93A1) o usar `text-muted_light` en el texto pequeño.

- [x] **P2-5 · Footer demasiado escueto** · Esfuerzo S
  → Añadir aviso legal, privacidad, email, LinkedIn, NIF y la frase de marca. El footer es donde el B2B busca "¿esto es una empresa real?".

- [ ] **P2-6 · Medición de conversiones** · Esfuerzo S
  Plausible está instalado pero sin objetivos.
  → Goals: envío del formulario, clic en "Hablar con Pellisoft", clic en la web de PLRFactu y, cuando exista, reserva de llamada.

- [ ] **P2-7 · SEO local y datos estructurados** · Esfuerzo S
  → JSON-LD `ProfessionalService` con `areaServed` (España), `sameAs` (LinkedIn), `founder` y `knowsAbout`.
  → Alta en **Google Business Profile** (Andorra, Teruel): gratis y con mucho peso en búsquedas locales como "desarrollo software Teruel" o "software Aragón".

- [ ] **P2-8 · Captura de PLRFactu con cifras de marketing** · Esfuerzo S
  La captura "Por qué PLRFactu" muestra "+1200 negocios activos" y "+98% satisfacción". Si no son reales, restan credibilidad en cuanto alguien pregunte.
  → Rehacer la captura sin esa franja y revisar la propia web de fmp-tpv.com.

- [x] **P2-9 · Separar "Productos propios" de "Proyectos a medida"** · Esfuerzo S
  Así el portfolio crece ordenado. Productos: SaaS con web propia, CTA "Visitar web". Proyectos a medida: trabajos para clientes, cuando los haya, CTA "Ver caso" con estructura *Reto → Solución → Resultado*.
  → En `lib/projects.ts` basta con un campo `kind: 'product' | 'client'` y dos subtítulos dentro de la sección Proyectos.

### P3 — Pulido

- [x] **P3-1 · Código y dependencias sin uso** · Esfuerzo S
  `gsap` y `@gsap/react` ya no se importan en ningún sitio. Además, `MockDashboard`, `AnimatedCounter` (el error de lint), `ProjectCard`, `SecondaryHero` y `components/icons/*` solo los usan las páginas duplicadas o nadie. Se eliminarían junto con P0-3.
- [ ] **P3-2 · Página 404 propia** con la estética de la web y un enlace a la landing.
- [ ] **P3-3 · Rendimiento en móviles modestos:** las manchas del fondo (blur 90px animado) y muchos `backdrop-filter` pueden pesar en gama baja. Valorar reducir blur y animación por debajo de `md`.
- [ ] **P3-4 · Ficha de proyecto con estructura de caso** cuando haya más proyectos: *Reto → Solución → Resultado → Tecnologías*.
- [ ] **P3-5 · Versión en inglés** para dar sentido real a "para el mundo". Baja prioridad hasta tener mercado fuera.

---

## 3. Qué añadiría

Propuesta de estructura de la landing, en orden:

1. **Hero** con titular orientado a cliente y visual de producto (P1-1, P1-2)
2. **¿Para quién?** tres perfiles con su dolor (P1-5) — *nuevo*
3. Servicios
4. Proyectos
5. Cómo trabajamos
6. **Quién está detrás / ADN**, con el fundador visible (P1-3)
7. **FAQ** (P2-1) — *nuevo*
8. Contacto con **dos vías**: formulario y reserva de llamada (P1-4)
9. Footer completo con información legal (P0-1, P0-2, P2-5)

Fuera de la web, con mucho impacto en captación:
- **LinkedIn** de empresa y del fundador, publicando avances de proyectos (PLRFactu, los que vengan).
- **Google Business Profile**.
- **Contenido**: 1 artículo al mes sobre problemas reales del cliente (Verifactu, OEE, digitalizar partes de trabajo…). Ayuda al SEO y se reutiliza en LinkedIn.

---

## 4. Plan sugerido

| Fase | Contenido | Esfuerzo total |
|---|---|---|
| **1 · Cumplimiento y limpieza** | P0-1, P0-2, P0-3, P1-6, P2-5, P3-1 | ~1 día |
| **2 · Mensaje y confianza** | P1-1, P1-2, P1-3, P1-5, P2-4 | 2–3 días (depende de textos y foto) |
| **3 · Conversión** | P1-4, P2-1, P2-2, P2-6 | ~1 día |
| **4 · Visibilidad** | P2-3, P2-7, contenidos, LinkedIn | continuo |

**Necesario del lado de Pellisoft:** datos del titular (nombre o razón social, NIF, domicilio), trayectoria del fundador, foto, LinkedIn y, si se quiere, rango de precios y la herramienta de calendario.

---

## Historial

### 2026-09-29 — Fases 1, 2 y 4
- **Legal:** `/aviso-legal` y `/privacidad` con plantilla común (`components/layout/LegalPage.tsx`). Datos del titular centralizados en `LEGAL` (`lib/site.ts`), **pendientes de rellenar**. Texto informativo RGPD bajo el formulario.
- **Limpieza:** borradas `/servicios`, `/adn`, `/contacto` y `/proyectos` (listado), con redirecciones 308 a sus secciones. Eliminados `ProjectCard`, `SecondaryHero`, `MockDashboard`, `AnimatedCounter`, `AnimatedText`, `PIsotype`, `GlowBorder`, `components/icons/*`, `hooks/*` y las dependencias `gsap` y `@gsap/react`. Lint sin errores.
- **Compartir:** `app/opengraph-image.tsx` (1200×630) con el titular nuevo.
- **Footer:** marca, navegación, contacto y enlaces legales.
- **Hero:** titular "Software a medida para tu planta y tu negocio.", subtítulo con los servicios, chips "Industria · Pymes y comercio · Proyectos a medida". El logo se sustituye por el primer producto propio en `BrowserFrame`, con el chip "en producción" y una tarjeta decorativa de despliegue. Eliminada la palabra animada (hueco en blanco y redundancia).
- **Proyectos:** campo `kind: 'product' | 'client'` en `lib/projects.ts`. La sección se agrupa en "Productos propios" (CTA principal: visitar su web) y "Proyectos a medida" (CTA: ver caso). La ficha muestra el tipo.
- **Otros:** navbar con `router.push` y sin avisos de lint; corregido un desbordamiento horizontal en móvil en la sección Proyectos.
- **Aplazado (deuda):** P1-3, sección del fundador y prueba social, hasta el arranque de la empresa.

### 2026-09-29 — Ajuste por contexto
- La web es corporativa/portfolio; los SaaS venden en su propia web.
- Descartados P2-2 (precio) y P2-3 (Verifactu, pasa a PLRFactu). P1-4 rebajado. P1-5 simplificado. Añadido P2-9 (productos vs. proyectos a medida).

### 2026-09-29 — Auditoría inicial
- Revisión de la web en producción en escritorio (1440 px) y móvil (390 px), metadatos, rutas y código.
- Documento creado con 22 hallazgos priorizados (3 P0, 6 P1, 8 P2, 5 P3).
