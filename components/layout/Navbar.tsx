'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'ADN', href: '#adn' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      el?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-black/85 backdrop-blur-[14px] border-b border-tech_blue/20'
            : 'bg-transparent'
        )}
      >
        <nav className="flex h-20 lg:h-24 w-full items-center justify-between px-8 md:px-14 lg:px-20 xl:px-28">
          {/* Logo — click scrolls to top */}
          <button
            onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' }) }}
            className="flex items-center gap-4 cursor-pointer"
            aria-label="Pellisoft — volver al inicio"
          >
            <Image
              src="/logos/logo-azul.png"
              alt="Pellisoft"
              width={80}
              height={80}
              className="h-16 w-16 lg:h-20 lg:w-20 object-contain"
              priority
            />
            <span className="hidden md:block font-heading font-bold text-white_soft text-xl lg:text-2xl tracking-wide">
              Pellisoft
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-base lg:text-lg font-medium text-muted_light hover:text-white_soft transition-colors duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick('#contacto')}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-tech px-6 py-3 text-base font-medium text-white_soft transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            >
              Hablar con Pellisoft
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden items-center justify-center text-white_soft"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-black/95 backdrop-blur-xl border-l border-encina/30 md:hidden"
            >
              <div className="flex flex-col gap-6 px-8 pt-24 pb-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-lg font-medium text-white_soft hover:text-tech_blue_light transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('#contacto')}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-tech px-5 py-3 text-sm font-medium text-white_soft"
                >
                  Hablar con Pellisoft
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
