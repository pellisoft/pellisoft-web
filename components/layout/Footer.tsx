'use client'

import Image from 'next/image'

const NAV_ITEMS = ['Servicios', 'Proyectos', 'ADN', 'Contacto'] as const

export default function Footer() {
  return (
    <footer className="w-full bg-slate_dark border-t border-tech_blue/15">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logos/logo-blanco.png"
              alt="Pellisoft"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-heading text-white_soft font-semibold text-sm">Pellisoft</span>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-body text-sm text-muted hover:text-white_soft transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="font-mono text-xs text-muted">
            © 2026 Pellisoft · Andorra (Teruel), España
          </p>

        </div>
      </div>
    </footer>
  )
}
