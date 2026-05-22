'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Microscope, PenLine, Code2, TrendingUp } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: Microscope,
    title: 'Análisis',
    description:
      'Entendemos tu negocio y tus procesos antes de escribir una sola línea de código. Sin suposiciones.',
  },
  {
    number: '02',
    icon: PenLine,
    title: 'Diseño',
    description:
      'Arquitectura técnica y UX pensadas para durar. Sin sobre-ingeniería, sin deuda técnica innecesaria.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Desarrollo',
    description:
      'Código limpio, componentes modulares y entregas iterativas. Siempre sabés en qué punto estamos.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Escalado',
    description:
      'Sistemas preparados para crecer contigo. Añadimos funcionalidades sin rehacer desde cero.',
  },
]

export default function HowWeWorkSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="proceso" className="w-full bg-carbon py-20 lg:py-28">
      {/* Top separator */}
      <div className="w-full border-t border-encina/20 mb-0" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-16">

        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-encina/30 bg-encina/10 px-4 py-1.5 font-mono text-sm font-bold text-encina_light mb-3">
            Proceso
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">
            Cómo trabajamos
          </h2>
          <p className="mt-3 font-body text-lg text-muted_light max-w-xl mx-auto">
            Un proceso claro, de principio a fin
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Horizontal connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px border-t border-dashed border-muted/30 z-0" />

          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.15 }}
                className="relative z-10 flex flex-col items-start lg:items-center text-left lg:text-center"
              >
                {/* Mobile vertical connector */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden absolute left-[19px] top-[40px] w-px h-[calc(100%+2rem)] border-l border-dashed border-muted/30" />
                )}

                {/* Icon circle */}
                <div className="relative mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate_dark border border-encina/30 z-10">
                  <Icon size={20} className="text-encina_light" strokeWidth={1.5} />
                </div>

                {/* Step number label */}
                <span className="font-mono text-xs text-tech_blue_light mb-2">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-white_soft mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted_light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
