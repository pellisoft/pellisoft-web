'use client'

import { motion, useReducedMotion } from 'framer-motion'
import MesIcon from '@/components/icons/MesIcon'
import TpvIcon from '@/components/icons/TpvIcon'
import FacturacionIcon from '@/components/icons/FacturacionIcon'
import ServiceCard from '@/components/ui/Card'

const hidden = { opacity: 0, y: 30 }
const visible = { opacity: 1, y: 0 }

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="servicios" className="w-full bg-slate_dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-3">
            Qué hacemos
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">
            Servicios
          </h2>
          <p className="mt-3 font-body text-lg text-muted_light max-w-xl">
            Software a medida para industria y empresa. Soluciones que duran.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] lg:grid-rows-2 gap-4 lg:min-h-[500px]">

          {/* MES Industrial — card grande, rowspan 2 */}
          <motion.div
            className="lg:row-span-2"
            initial={shouldReduceMotion ? false : hidden}
            whileInView={shouldReduceMotion ? undefined : visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
          >
            <ServiceCard
              title="Sistemas MES Industrial"
              description="Monitorización y control de producción en tiempo real. Digitalización de planta, KPIs de producción y gestión de estados de máquina. Conectamos tu fábrica con el software que necesita."
              icon={<MesIcon size={44} className="text-tech_blue_light" />}
              glowColor="blue"
              badge="MES · SCADA · Industrial"
              size="lg"
              className="h-full"
            />
          </motion.div>

          {/* TPV Inteligente */}
          <motion.div
            initial={shouldReduceMotion ? false : hidden}
            whileInView={shouldReduceMotion ? undefined : visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <ServiceCard
              title="TPV Inteligente"
              description="Punto de venta adaptado a tu negocio. Gestión de productos, clientes y ventas integrada con tu sistema de gestión."
              icon={<TpvIcon size={36} className="text-tech_purple_light" />}
              glowColor="purple"
              size="sm"
              className="h-full"
            />
          </motion.div>

          {/* Facturación SaaS */}
          <motion.div
            initial={shouldReduceMotion ? false : hidden}
            whileInView={shouldReduceMotion ? undefined : visible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <ServiceCard
              title="Facturación SaaS"
              description="Facturación electrónica en la nube. Integración con ERP, contabilidad y gestión de clientes. Sin instalaciones."
              icon={<FacturacionIcon size={36} className="text-arcilla_light" />}
              glowColor="arcilla"
              size="sm"
              className="h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
