# Pellisoft Web

Web corporativa de Pellisoft — Software industrial y empresarial desde Teruel.

## Stack técnico

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v3.4 con design tokens propios
- **Animaciones:** Framer Motion + GSAP ScrollTrigger
- **Contenido:** proyectos estáticos en `lib/projects.ts`
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
| `RESEND_API_KEY` | API key de Resend para envío de emails | Para formulario |
| `CONTACT_EMAIL_TO` | Email destino para los mensajes del formulario | Para formulario |
| `CONTACT_EMAIL_FROM` | Remitente (dominio verificado en Resend) | Opcional |

## Estructura principal

```
app/                    # Next.js App Router
  layout.tsx            # Layout global (fuentes, metadata, analytics)
  page.tsx              # Home (One Page)
  servicios/            # Página de servicios
  proyectos/            # Detalle de proyectos (SSG desde lib/projects.ts)
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
  projects.ts           # Datos de los proyectos
  email/templates/      # Templates de React Email

public/logos/           # Logos en todas las variantes (azul, blanco, verde, etc.)
```

## Proyectos

Los proyectos se definen en `lib/projects.ts` y sus capturas en `public/images/projects/<slug>/`.

## Seguridad

Ver [docs/security.md](docs/security.md): controles aplicados, cabeceras HTTP, CSP y pendientes.

## Deploy

La web se despliega automáticamente en Vercel al hacer push a `main`.

Para deploy manual:

```bash
git push pellisoft main
```

Configurar las variables de entorno en el dashboard de Vercel antes del primer deploy.
