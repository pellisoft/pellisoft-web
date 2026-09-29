// Catálogo de proyectos de Pellisoft.
// Para añadir un proyecto: añade un objeto a PROJECTS y deja sus capturas en
// public/images/projects/<slug>/ (PNG/WebP, idealmente 1440px de ancho o más).

import type { GlassTint } from '@/components/ui/GlassCard'

export interface ProjectScreenshot {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface ProjectHighlight {
  title: string
  text: string
}

export interface Project {
  slug: string
  name: string
  /** Frase corta que aparece bajo el nombre */
  tagline: string
  /** Resumen de 1–2 frases para tarjetas y metadata */
  summary: string
  /** Párrafos de la página de detalle */
  description: string[]
  /** Web pública del proyecto */
  url: string
  category: string
  tint: GlassTint
  tags: string[]
  highlights: ProjectHighlight[]
  /** La primera captura se usa como portada */
  screenshots: ProjectScreenshot[]
  status: 'live' | 'beta' | 'in-progress'
  order: number
}

const shot = (
  slug: string,
  file: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): ProjectScreenshot => ({
  src: `/images/projects/${slug}/${file}`,
  alt,
  width,
  height,
  caption,
})

export const PROJECTS: Project[] = [
  {
    slug: 'plrfactu',
    name: 'PLRFactu',
    tagline: 'TPV inteligente con facturación Verifactu para negocios locales',
    summary:
      'Plataforma SaaS que une punto de venta, facturación Verifactu, mesas, pedidos por QR y agenda de citas para bares, peluquerías y comercios en España.',
    description: [
      'PLRFactu nace para que bares, peluquerías y pequeños comercios dejen de trabajar con varias herramientas que no se hablan entre sí. Desde una sola aplicación web cobran en el TPV táctil, gestionan su catálogo, emiten facturas y consultan sus ventas.',
      'La facturación cumple Verifactu desde el primer ticket: cada factura se encadena con hash y se envía automáticamente a la AEAT, sin coste adicional y sin trabajo extra para el negocio.',
      'El TPV funciona también sin conexión y sincroniza en cuanto vuelve la red. Es una PWA que se instala en cualquier tablet o PC, sin hardware propietario, con varios terminales, mesas y cocina actualizados en tiempo real.',
      'Por dentro es un SaaS multitenant: backend .NET con Clean Architecture y CQRS, PostgreSQL, tiempo real con SignalR y despliegue automatizado con CI/CD.',
    ],
    url: 'https://www.fmp-tpv.com',
    category: 'SaaS · Retail y hostelería',
    tint: 'purple',
    tags: ['SaaS', 'TPV', 'Verifactu', 'PWA offline', '.NET', 'PostgreSQL', 'SignalR'],
    highlights: [
      {
        title: 'Verifactu incluido',
        text: 'Facturas con hash encadenado y envío automático a la AEAT en todos los planes.',
      },
      {
        title: 'Funciona sin conexión',
        text: 'El TPV guarda los pedidos en local y sincroniza al recuperar la red.',
      },
      {
        title: 'Mesas y pedidos por QR',
        text: 'Plano del local en tiempo real y pedidos desde el móvil del cliente.',
      },
      {
        title: 'Agenda de citas',
        text: 'Reservas online con recordatorios automáticos para peluquería y estética.',
      },
      {
        title: 'Sin hardware obligatorio',
        text: 'Funciona en cualquier tablet o PC como aplicación instalable.',
      },
      {
        title: 'Multitenant',
        text: 'Cada negocio con sus datos aislados; varios locales desde un mismo acceso.',
      },
    ],
    screenshots: [
      shot('plrfactu', 'landing-hero.png', 'Portada de PLRFactu: el TPV inteligente para negocios locales', 2160, 1350, 'Landing pública'),
      shot('plrfactu', 'landing-modulos.png', 'Tabla de módulos incluidos en PLRFactu', 2160, 1140, 'Módulos de la plataforma'),
      shot('plrfactu', 'landing-diferencial.png', 'Diferenciales de PLRFactu: Verifactu, modo offline y sin hardware', 2160, 1050, 'Por qué PLRFactu'),
      shot('plrfactu', 'landing-precios.png', 'Planes y precios de PLRFactu', 2160, 1200, 'Planes y precios'),
    ],
    status: 'live',
    order: 1,
  },
]

export function getProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}
