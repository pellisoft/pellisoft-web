'use client'

import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Cpu, Users } from 'lucide-react'

const VALUES = [
  { Icon: MapPin, text: 'Andorra (Teruel), España', color: 'text-arcilla_light' },
  { Icon: Cpu, text: 'Precisión técnica', color: 'text-tech_blue_light' },
  { Icon: Users, text: 'Trato cercano', color: 'text-encina_light' },
] as const

export default function DnaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    let ctx: { revert: () => void } | null = null

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const bgEl = backgroundRef.current
      if (!bgEl || !sectionRef.current) return

      ctx = gsap.context(() => {
        gsap.to(bgEl, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }, sectionRef)
    }

    initGsap()

    return () => {
      ctx?.revert()
    }
  }, [shouldReduceMotion])

  return (
    <section
      id="adn"
      ref={sectionRef}
      className="w-full bg-carbon py-32 overflow-hidden relative"
    >
      {/* Background parallax logo */}
      <div
        ref={backgroundRef}
        className="absolute right-[60px] top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ width: 560, height: 560 }}
      >
        <Image
          src="/logos/logo-verde.png"
          alt=""
          width={500}
          height={500}
          className="w-full h-full object-contain opacity-[0.18] grayscale-[10%]"
          aria-hidden="true"
        />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            className="inline-flex w-fit items-center rounded-full border border-arcilla/30 bg-arcilla/10 px-4 py-1.5 font-mono text-sm font-bold text-arcilla_light mb-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            ADN · Identidad
          </motion.p>

          {/* Big headline */}
          <motion.h2
            className="font-heading font-bold text-white_soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Desde Andorra (Teruel),
          </motion.h2>
          <motion.h2
            className="font-heading font-bold text-arcilla"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            para el mundo.
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            className="font-body text-muted_light mt-6 text-lg leading-relaxed"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            Somos una empresa de software con raíces en Andorra (Teruel) y visión global.
            Nuestros sistemas corren en plantas industriales y negocios de toda España.
          </motion.p>

          <motion.p
            className="font-body text-muted mt-4 leading-relaxed"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          >
            No vendemos licencias ni plantillas. Construimos software a medida,
            con código limpio y sin dependencias de terceros innecesarias.
          </motion.p>

          {/* Values */}
          <ul className="mt-10 space-y-4">
            {VALUES.map(({ Icon, text, color }, i) => (
              <motion.li
                key={text}
                className="flex items-center gap-3"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -15 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.5 + i * 0.1 }}
              >
                <Icon size={18} className={`${color} flex-shrink-0`} />
                <span className="font-body text-white_soft">{text}</span>
              </motion.li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}
