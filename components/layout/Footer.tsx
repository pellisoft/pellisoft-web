import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

const NAV_ITEMS = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'ADN', href: '/#adn' },
  { label: 'Contacto', href: '/#contacto' },
]

const LEGAL_ITEMS = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Privacidad', href: '/privacidad' },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate_dark/55">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">

          {/* Marca */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logos/logo-blanco.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-heading text-lg font-semibold text-white_soft">Pellisoft</span>
            </Link>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-muted_light">
              Software a medida, automatización industrial y plataformas SaaS. Desde Andorra
              (Teruel), para el mundo.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Secciones">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted_light">Web</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-muted_light transition-colors hover:text-white_soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted_light">Contacto</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 font-body text-sm text-muted_light transition-colors hover:text-white_soft"
            >
              <Mail size={14} className="shrink-0 text-tech_blue_light" />
              {CONTACT_EMAIL}
            </a>
            <p className="mt-2.5 flex items-center gap-2 font-body text-sm text-muted_light">
              <MapPin size={14} className="shrink-0 text-arcilla_light" />
              Andorra (Teruel), Aragón, España
            </p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-muted_light">© {new Date().getFullYear()} Pellisoft</p>
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-muted_light transition-colors hover:text-white_soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
