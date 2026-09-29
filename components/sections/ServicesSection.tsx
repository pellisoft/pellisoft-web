'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  AppWindow,
  Code,
  Cpu,
  Database,
  Factory,
  LifeBuoy,
  Plug,
  Rocket,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ServiceCard from '@/components/ui/Card'

type Tint = 'blue' | 'purple' | 'encina' | 'arcilla'

interface Service {
  title: string
  description: string
  icon: LucideIcon
  tint: Tint
  badge: string
}

const iconColor: Record<Tint, string> = {
  blue: 'text-tech_blue_light',
  purple: 'text-tech_purple_light',
  encina: 'text-encina_light',
  arcilla: 'text-arcilla_light',
}

const SERVICES: Service[] = [
  {
    title: 'Software a medida',
    description:
      'Aplicaciones web y de escritorio diseñadas alrededor de cómo trabaja tu empresa, no al revés. Desde el análisis hasta la puesta en producción.',
    icon: Code,
    tint: 'blue',
    badge: 'Web · Escritorio · Móvil',
  },
  {
    title: 'Automatización industrial y PLC',
    description:
      'Programación y puesta en marcha de PLC, pantallas HMI y sistemas SCADA. Modificaciones y mejoras sobre instalaciones existentes.',
    icon: Cpu,
    tint: 'encina',
    badge: 'PLC · HMI · SCADA',
  },
  {
    title: 'MES y conexión de planta',
    description:
      'Captura de datos de máquina en tiempo real, trazabilidad, OEE y paros. Conectamos la planta con tu ERP y tus informes.',
    icon: Factory,
    tint: 'arcilla',
    badge: 'OEE · Trazabilidad · OPC UA',
  },
  {
    title: 'Optimización de procesos',
    description:
      'Analizamos tus flujos de trabajo, eliminamos papel y tareas repetitivas y los convertimos en procesos digitales medibles.',
    icon: Workflow,
    tint: 'purple',
    badge: 'Consultoría · Digitalización',
  },
  {
    title: 'Plataformas SaaS y aplicaciones web',
    description:
      'Productos multi-cliente listos para escalar: suscripciones, roles, modo offline e instalables como app en cualquier dispositivo.',
    icon: AppWindow,
    tint: 'blue',
    badge: 'SaaS · PWA · Multitenant',
  },
  {
    title: 'Integraciones y APIs',
    description:
      'Hacemos que tus sistemas hablen entre sí: ERP, facturación electrónica y Verifactu, pasarelas de pago, email y servicios de terceros.',
    icon: Plug,
    tint: 'purple',
    badge: 'REST · ERP · Verifactu',
  },
  {
    title: 'Bases de datos y analítica',
    description:
      'Diseño, migración y optimización de bases de datos. Cuadros de mando e informes para decidir con datos reales.',
    icon: Database,
    tint: 'encina',
    badge: 'SQL Server · PostgreSQL · BI',
  },
  {
    title: 'Cloud, despliegues y DevOps',
    description:
      'Infraestructura en la nube o en tus servidores, contenedores, CI/CD, copias de seguridad y monitorización.',
    icon: Rocket,
    tint: 'arcilla',
    badge: 'CI/CD · Docker · Cloud',
  },
  {
    title: 'Mantenimiento y soporte evolutivo',
    description:
      'Nos hacemos cargo de tus aplicaciones: corrección de incidencias, seguridad, actualizaciones y nuevas funcionalidades.',
    icon: LifeBuoy,
    tint: 'blue',
    badge: 'Soporte · Evolutivo · SLA',
  },
]

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="servicios" className="w-full bg-slate_dark/55 py-20 lg:py-28">
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
          <p className="mt-3 font-body text-lg text-muted_light max-w-2xl">
            De la planta a la nube: desarrollamos, conectamos y mantenemos el software
            que tu empresa necesita para funcionar mejor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 3) * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={<Icon size={32} strokeWidth={1.5} className={iconColor[service.tint]} />}
                  glowColor={service.tint}
                  badge={service.badge}
                  className="h-full"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
