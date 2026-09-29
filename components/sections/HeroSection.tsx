'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Factory, Play, Store, Code2 } from 'lucide-react'
import BrowserFrame from '@/components/ui/BrowserFrame'
import { displayUrl, getProjects } from '@/lib/projects'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

// A quién nos dirigimos
const AUDIENCES = [
  { icon: Factory, label: 'Industria', color: 'text-arcilla_light' },
  { icon: Store, label: 'Pymes y comercio', color: 'text-encina_light' },
  { icon: Code2, label: 'Proyectos a medida', color: 'text-tech_blue_light' },
]

// Pasos del "despliegue" decorativo: muestra cómo trabajamos, no datos reales
const DEPLOY_LINES = [
  { text: '$ git push origin main', className: 'text-muted_light' },
  { text: '✓ tests', className: 'text-encina_light' },
  { text: '✓ build', className: 'text-encina_light' },
  { text: '✓ desplegado en producción', className: 'text-tech_blue_light' },
]

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  // Visual del hero: el primer producto propio publicado
  const product = getProjects().find((p) => p.kind === 'product' && p.url)
  const cover = product?.screenshots[0]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  const float = (delay: number, distance = 8) =>
    shouldReduceMotion
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center bg-carbon/40">
      <div className="relative w-full px-6 pt-28 pb-16 md:px-12 lg:px-16 lg:pt-32 lg:pb-24 xl:px-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-12">

          {/* Texto */}
          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? false : 'visible'}
            className="flex flex-col gap-6"
          >
            <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light">
                Software a medida · Andorra (Teruel)
              </span>
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="font-heading text-display font-bold leading-tight text-white_soft"
            >
              Software a medida{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)' }}
              >
                para tu planta y tu negocio.
              </span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="max-w-xl font-body text-lg leading-relaxed text-muted_light"
            >
              Automatización industrial, sistemas MES, plataformas SaaS e integraciones.
              Diseñamos, construimos y mantenemos el software que tu empresa necesita, sin
              plantillas ni intermediarios.
            </motion.p>

            {/* Para quién */}
            <motion.ul
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="flex flex-wrap gap-2"
              aria-label="Para quién trabajamos"
            >
              {AUDIENCES.map(({ icon: Icon, label, color }) => (
                <li
                  key={label}
                  className="glass glass-neutral !rounded-full inline-flex items-center gap-2 px-3.5 py-1.5 font-body text-sm text-white_soft/90"
                >
                  <Icon size={15} className={color} />
                  {label}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="flex flex-col gap-4 pt-2 sm:flex-row"
            >
              <button
                onClick={() => scrollTo('contacto')}
                className="liquid-button inline-flex cursor-pointer items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white_soft hover:scale-[1.02]"
              >
                Hablar con Pellisoft
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('proyectos')}
                className="glass glass-neutral glass-interactive !rounded-full inline-flex cursor-pointer items-center justify-center gap-2 px-7 py-4 text-base font-medium text-white_soft"
              >
                <Play size={16} />
                Ver proyectos
              </button>
            </motion.div>
          </motion.div>

          {/* Visual: producto real en producción + flujo de despliegue */}
          {product && cover && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              className="relative mx-auto w-full max-w-2xl lg:max-w-none"
              style={{ perspective: 1400 }}
            >
              <motion.div
                style={{ rotateY: shouldReduceMotion ? 0 : -6, rotateX: shouldReduceMotion ? 0 : 3 }}
                className="drop-shadow-[0_30px_60px_rgba(124,58,237,0.25)]"
              >
                <Link href={`/proyectos/${product.slug}`} aria-label={`Ver ${product.name}`}>
                  <BrowserFrame url={displayUrl(product.url)} tint={product.tint}>
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      className="h-auto w-full"
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </BrowserFrame>
                </Link>
              </motion.div>

              {/* Chip: producto en producción */}
              <motion.div
                {...float(0)}
                className="glass glass-encina !rounded-full absolute -top-4 right-4 flex items-center gap-2 px-4 py-2 font-mono text-xs text-white_soft md:-right-4"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-encina_light" aria-hidden />
                {product.name} · en producción
              </motion.div>

              {/* Tarjeta: despliegue */}
              <motion.div
                {...float(1.5, 10)}
                className="glass glass-blue !bg-none !bg-carbon/90 absolute -bottom-8 -left-2 hidden w-64 rounded-2xl p-4 font-mono text-xs sm:block md:-left-8"
                aria-hidden
              >
                <div className="mb-2 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-arcilla_light/80" />
                  <span className="h-2 w-2 rounded-full bg-[#EAB308]/80" />
                  <span className="h-2 w-2 rounded-full bg-encina_light/90" />
                </div>
                {DEPLOY_LINES.map((line, i) => (
                  <motion.p
                    key={line.text}
                    className={line.className}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.45, duration: 0.3 }}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
