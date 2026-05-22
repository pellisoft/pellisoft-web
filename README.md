# Pellisoft Web

Web corporativa de Pellisoft — Software industrial y empresarial desde Teruel.

## Stack técnico

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v3.4 con design tokens propios
- **Animaciones:** Framer Motion + GSAP ScrollTrigger
- **CMS:** Sanity (proyectos dinámicos, ISR)
- **Email:** Resend + React Email
- **Analítica:** Plausible (privacy-first)
- **Deploy:** Vercel

## Comandos

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Check TypeScript
npx tsc --noEmit

# Linter
npm run lint
```

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

| Variable | Descripción | Requerida |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto Sanity | Para CMS |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset de Sanity (default: `production`) | Para CMS |
| `SANITY_API_TOKEN` | Token de API Sanity (solo producción) | Para escritura CMS |
| `RESEND_API_KEY` | API key de Resend para envío de emails | Para formulario |
| `CONTACT_EMAIL_TO` | Email destino para los mensajes del formulario | Para formulario |

## Estructura principal

```
app/                    # Next.js App Router
  layout.tsx            # Layout global (fuentes, metadata, analytics)
  page.tsx              # Home (One Page)
  servicios/            # Página de servicios
  proyectos/            # Lista y detalle de proyectos (ISR desde Sanity)
  adn/                  # Página ADN Pellisoft
  contacto/             # Página de contacto
  api/contact/          # API Route para el formulario
  sitemap.ts            # Sitemap generado dinámicamente

components/
  layout/               # Navbar, Footer, SecondaryHero
  sections/             # Secciones de la web (Hero, Servicios, etc.)
  ui/                   # Componentes reutilizables (Button, Card, etc.)
  icons/                # Iconos SVG personalizados

lib/
  sanity/               # Cliente y queries GROQ para Sanity
  email/templates/      # Templates de React Email

sanity/
  schemas/              # Esquemas de Sanity (project.ts)
  sanity.config.ts      # Configuración del Studio

public/logos/           # Logos en todas las variantes (azul, blanco, verde, etc.)
```

## Sanity CMS

Para gestionar proyectos y casos de éxito:

1. Accede al Studio en [studio.sanity.io](https://studio.sanity.io) con tu cuenta de Pellisoft
2. Crea y publica proyectos en la sección "Proyecto"
3. Marca un proyecto como "destacado" para que aparezca en la Home
4. Los cambios se reflejan en la web en <= 60 segundos (ISR)

## Deploy

La web se despliega automáticamente en Vercel al hacer push a `main`.

Para deploy manual:

```bash
git push pellisoft main
```

Configurar las variables de entorno en el dashboard de Vercel antes del primer deploy.
