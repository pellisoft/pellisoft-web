'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import MockDashboard from '@/components/ui/MockDashboard'
import Button from '@/components/ui/Button'

export default function FeaturedProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="w-full bg-slate_dark py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left column — text */}
          <motion.div
            className="lg:col-span-5"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-4">
              Caso real · Software Industrial
            </span>

            <motion.h2
              className="font-heading text-3xl lg:text-4xl font-bold text-white_soft"
              initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              Sistema MES para planta industrial
            </motion.h2>

            <p className="text-muted_light font-body mt-4 leading-relaxed">
              Desarrollamos un sistema MES completo para una planta industrial aragonesa.
              Monitorización en tiempo real, control de KPIs de producción y reducción
              drástica de paradas no planificadas.
            </p>

            {/* KPI metrics */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-tech_blue/15">
              <div>
                <AnimatedCounter
                  to={94}
                  suffix="%"
                  className="font-heading text-4xl font-bold text-encina_light"
                />
                <p className="font-mono text-xs text-muted mt-1">OEE Eficiencia</p>
              </div>
              <div>
                <AnimatedCounter
                  to={1450}
                  className="font-heading text-4xl font-bold text-tech_blue_light"
                />
                <p className="font-mono text-xs text-muted mt-1">Producción uds</p>
              </div>
              <div>
                <AnimatedCounter
                  to={0}
                  className="font-heading text-4xl font-bold text-white_soft"
                />
                <p className="font-mono text-xs text-muted mt-1">Alertas cal.</p>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            >
              <Button variant="outline">Ver más proyectos →</Button>
            </motion.div>
          </motion.div>

          {/* Right column — dashboard visual */}
          <motion.div
            className="lg:col-span-7"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30, rotateY: -5 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ perspective: 1200 }}
            whileHover={{ rotateY: 2, scale: 1.01 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-[0_0_60px_rgba(45,80,22,0.25)] border border-encina/25">
              <MockDashboard />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
