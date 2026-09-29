'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import PIsotype from '@/components/ui/PIsotype'

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

const isotopeVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.3 },
  },
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      className="w-full relative min-h-screen bg-carbon/40 flex items-center"
    >
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(59,130,246,0.10) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(124,58,237,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="relative w-full px-8 md:px-14 lg:px-20 xl:px-28 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-center">

          {/* LEFT — Text content */}
          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? false : 'visible'}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light">
                Software B2B · Andorra (Teruel), España
              </span>
            </motion.div>

            {/* H1 */}
            <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
              <h1 className="font-heading text-display font-bold text-white_soft leading-tight">
                Software industrial y empresarial{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #3B82F6 0%, #A855F7 100%)' }}
                >
                  diseñado para escalar
                </span>
              </h1>
            </motion.div>

            {/* Subclaim */}
            <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
              <p className="font-body text-lg text-muted_light max-w-xl leading-relaxed">
                <AnimatedText className="mr-1" />
                {' '}— SaaS y automatización desde Andorra (Teruel) para el mundo.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo('contacto')}
                className="liquid-button inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white_soft hover:scale-[1.02] cursor-pointer"
              >
                Hablar con Pellisoft
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('proyectos')}
                className="glass glass-neutral glass-interactive !rounded-full inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-white_soft cursor-pointer"
              >
                <Play size={16} />
                Ver proyectos
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — PIsotype */}
          <motion.div
            variants={shouldReduceMotion ? undefined : isotopeVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? false : 'visible'}
            className="flex justify-center lg:justify-end items-center"
          >
            <PIsotype
              style={{ height: 'clamp(340px, 72vh, 700px)', width: 'auto' }}
              className="drop-shadow-[0_0_80px_rgba(124,58,237,0.55)]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
