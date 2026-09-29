'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Handshake, MapPin, MessagesSquare, Pickaxe, Sparkles, TreeDeciduous, Wheat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import museoMinero from '@/public/images/adn/andorra-museo-minero.webp'
import pueblo from '@/public/images/adn/andorra-pueblo.webp'
import { cn } from '@/lib/utils'

const PHOTOS = [
  {
    src: museoMinero,
    alt: 'Vista aérea del castillete minero y los campos de labor de Andorra (Teruel), con el pueblo al fondo',
    caption: 'Museo Minero de Andorra (Teruel)',
  },
  {
    src: pueblo,
    alt: 'Andorra (Teruel) con el cerro del Pilar al fondo',
    caption: 'Andorra (Teruel)',
  },
]
const PHOTO_INTERVAL_MS = 6000

// Las dos figuras de Andorra: el minero y el labrador
const HERITAGE: {
  icon: LucideIcon
  figure: string
  title: string
  text: string
  tint: 'arcilla' | 'encina'
  iconColor: string
}[] = [
  {
    icon: Pickaxe,
    figure: 'Del minero',
    title: 'Método y constancia',
    text: 'En la mina las cosas se hacen bien a la primera, con método y sin atajos. Así construimos software: probado, seguro y pensado para no fallar.',
    tint: 'arcilla',
    iconColor: 'text-arcilla_light',
  },
  {
    icon: Wheat,
    figure: 'Del labrador',
    title: 'Paciencia y previsión',
    text: 'En el campo se siembra hoy pensando en la cosecha de mañana. Diseñamos cada sistema para que crezca contigo durante años.',
    tint: 'encina',
    iconColor: 'text-encina_light',
  },
]

const COMMITMENTS: { icon: LucideIcon; title: string; text: string; color: string }[] = [
  {
    icon: Handshake,
    title: 'La palabra vale',
    text: 'Lo que acordamos se cumple. Y si algo se complica, te lo decimos pronto.',
    color: 'text-tech_blue_light',
  },
  {
    icon: MessagesSquare,
    title: 'De tú a tú',
    text: 'Hablas directamente con quien diseña y programa tu proyecto.',
    color: 'text-tech_purple_light',
  },
  {
    icon: TreeDeciduous,
    title: 'Hecho para durar',
    text: 'Como la encina: raíces profundas y crecimiento sin prisa.',
    color: 'text-encina_light',
  },
  {
    icon: Sparkles,
    title: 'Sin humo',
    text: 'Sin tecnicismos para impresionar ni funciones que no necesitas.',
    color: 'text-arcilla_light',
  },
]

export default function DnaSection() {
  const shouldReduceMotion = useReducedMotion()
  const photoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  // Parallax suave de la foto dentro de su marco
  const photoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const [photoIndex, setPhotoIndex] = useState(0)

  // Las fotos se van alternando (sin rotación si se prefiere menos movimiento)
  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(
      () => setPhotoIndex((i) => (i + 1) % PHOTOS.length),
      PHOTO_INTERVAL_MS,
    )
    return () => clearInterval(timer)
  }, [shouldReduceMotion])
  const photo = PHOTOS[photoIndex]

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.5, ease: 'easeOut' as const, delay },
        }

  return (
    <section id="adn" className="relative w-full overflow-hidden bg-carbon/40 py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Historia + foto */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              {...fadeUp()}
              className="mb-4 inline-flex w-fit items-center rounded-full border border-arcilla/30 bg-arcilla/10 px-4 py-1.5 font-mono text-sm font-bold text-arcilla_light"
            >
              ADN · Identidad
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-heading font-bold text-white_soft"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Desde Andorra (Teruel),{' '}
              <span className="text-arcilla">para el mundo.</span>
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="mt-6 font-body text-lg leading-relaxed text-muted_light">
              Venimos de una tierra de mineros y labradores. En Andorra el trabajo se ha hecho
              siempre bajo tierra y a pie de campo: madrugar, cumplir lo que se dice y no dejar
              las cosas a medias.
            </motion.p>

            <motion.p {...fadeUp(0.3)} className="mt-4 font-body leading-relaxed text-muted_light">
              Así entendemos también el software. Desde un pueblo de Teruel construimos para
              empresas de cualquier sitio: la distancia ya no importa, la forma de trabajar sí.
            </motion.p>

            <motion.p {...fadeUp(0.4)} className="mt-4 font-body leading-relaxed text-white_soft">
              Con nosotros hablas directamente con quien diseña y programa tu proyecto.
              Sin intermediarios y sin humo.
            </motion.p>
          </div>

          {/* Foto */}
          <motion.figure
            {...fadeUp(0.2)}
            className="glass glass-arcilla rounded-3xl p-2"
          >
            <div ref={photoRef} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <motion.div
                className="absolute inset-x-0 -inset-y-[10%]"
                style={shouldReduceMotion ? undefined : { y: photoY }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={photo.caption}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      className="object-cover saturate-[0.85]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              {/* Viñeta con los tonos de la marca para integrarla en el modo oscuro */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0) 45%, rgba(10,10,10,0.75) 100%), linear-gradient(135deg, rgba(193,68,14,0.12), rgba(45,80,22,0.12))',
                }}
                aria-hidden
              />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center gap-2 font-mono text-xs text-white_soft/90">
                <MapPin size={14} className="shrink-0 text-arcilla_light" />
                <span className="flex-1">{photo.caption}</span>
                <span className="flex gap-1.5">
                  {PHOTOS.map((p, i) => (
                    <button
                      key={p.caption}
                      type="button"
                      onClick={() => setPhotoIndex(i)}
                      aria-label={`Ver foto: ${p.caption}`}
                      aria-current={i === photoIndex}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        i === photoIndex ? 'w-5 bg-white_soft' : 'w-1.5 bg-white_soft/40 hover:bg-white_soft/70',
                      )}
                    />
                  ))}
                </span>
              </figcaption>
            </div>
          </motion.figure>
        </div>

        {/* Herencia: minero y labrador */}
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          {HERITAGE.map((h, i) => {
            const Icon = h.icon
            return (
              <motion.div
                key={h.figure}
                {...fadeUp(i * 0.1)}
                className={cn('glass rounded-3xl p-8', `glass-${h.tint}`)}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                    <Icon size={24} strokeWidth={1.6} className={h.iconColor} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">{h.figure}</p>
                    <h3 className="font-heading text-2xl font-bold text-white_soft">{h.title}</h3>
                  </div>
                </div>
                <p className="mt-5 font-body leading-relaxed text-muted_light">{h.text}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Compromisos */}
        <motion.p {...fadeUp()} className="mt-16 mb-6 font-mono text-xs uppercase tracking-widest text-muted">
          Lo que nos trajimos del pueblo
        </motion.p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                {...fadeUp(i * 0.08)}
                className="glass glass-neutral glass-interactive rounded-2xl p-6"
              >
                <Icon size={22} strokeWidth={1.6} className={c.color} />
                <h4 className="mt-4 font-heading text-lg font-semibold text-white_soft">{c.title}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted_light">{c.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
