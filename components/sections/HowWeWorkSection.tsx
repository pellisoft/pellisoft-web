'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ClipboardList,
  Code2,
  LifeBuoy,
  PenTool,
  Rocket,
  Search,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { GlassTint } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

interface Phase {
  number: string
  icon: LucideIcon
  title: string
  summary: string
  tint: Exclude<GlassTint, 'neutral'>
  weDo: string[]
  youGet: string[]
  fromYou: string
}

const PHASES: Phase[] = [
  {
    number: '01',
    icon: Search,
    title: 'Descubrimiento',
    summary:
      'Entendemos tu negocio y tus procesos antes de escribir una sola línea de código. Sin suposiciones.',
    tint: 'blue',
    weDo: [
      'Reunión inicial y visita a tu planta u oficina',
      'Análisis del proceso actual y sus cuellos de botella',
      'Revisión de sistemas, datos e integraciones existentes',
    ],
    youGet: ['Resumen del problema y de los objetivos', 'Primeras ideas de solución'],
    fromYou: 'Tiempo con las personas que conocen el proceso y acceso a la información actual.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Propuesta',
    summary:
      'Convertimos lo que hemos aprendido en un plan claro: qué construimos, cómo y en qué orden.',
    tint: 'purple',
    weDo: [
      'Definición del alcance y de las prioridades',
      'Arquitectura técnica y tecnologías recomendadas',
      'División del proyecto en fases con valor propio',
    ],
    youGet: ['Propuesta técnica por fases', 'Presupuesto y calendario'],
    fromYou: 'Validar prioridades y resolver dudas de negocio.',
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Diseño',
    summary:
      'Arquitectura y experiencia de uso pensadas para durar. Sin sobre-ingeniería ni deuda técnica innecesaria.',
    tint: 'arcilla',
    weDo: [
      'Prototipo navegable de las pantallas clave',
      'Modelo de datos y diseño de integraciones',
      'Revisión con los usuarios finales',
    ],
    youGet: ['Prototipo validado antes de programar', 'Especificación técnica'],
    fromYou: 'Feedback de quienes usarán el sistema en el día a día.',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Desarrollo iterativo',
    summary:
      'Código limpio y entregas frecuentes. Siempre sabes en qué punto estamos y puedes probar lo construido.',
    tint: 'blue',
    weDo: [
      'Desarrollo por iteraciones cortas',
      'Demos periódicas del avance',
      'Pruebas automáticas y revisión de código',
    ],
    youGet: ['Versiones funcionales que puedes probar', 'Visibilidad continua del progreso'],
    fromYou: 'Probar las entregas y darnos feedback rápido.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Puesta en marcha',
    summary:
      'Llevamos el sistema a producción sin sobresaltos y acompañamos a tu equipo en el arranque.',
    tint: 'encina',
    weDo: [
      'Despliegue en la nube o en tus servidores',
      'Migración de datos desde los sistemas anteriores',
      'Formación a los usuarios y acompañamiento inicial',
    ],
    youGet: ['Sistema en producción', 'Equipo formado y documentación'],
    fromYou: 'Coordinar el arranque con tu equipo y planificar el cambio.',
  },
  {
    number: '06',
    icon: LifeBuoy,
    title: 'Soporte y evolución',
    summary:
      'Sistemas preparados para crecer contigo. Añadimos funcionalidades sin rehacer desde cero.',
    tint: 'purple',
    weDo: [
      'Mantenimiento correctivo y actualizaciones de seguridad',
      'Monitorización, copias de seguridad y rendimiento',
      'Nuevas funcionalidades según las necesidades del negocio',
    ],
    youGet: ['Un sistema que sigue funcionando y mejorando', 'Un interlocutor técnico de confianza'],
    fromYou: 'Contarnos qué necesitas a medida que tu negocio evoluciona.',
  },
]

const AUTOPLAY_MS = 6000

const tintText: Record<Phase['tint'], string> = {
  blue: 'text-tech_blue_light',
  purple: 'text-tech_purple_light',
  encina: 'text-encina_light',
  arcilla: 'text-arcilla_light',
}

const tintBorder: Record<Phase['tint'], string> = {
  blue: 'border-tech_blue_light/60',
  purple: 'border-tech_purple_light/60',
  encina: 'border-encina_light/70',
  arcilla: 'border-arcilla_light/60',
}

export default function HowWeWorkSection() {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState<number | null>(0)
  const stepperRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stepperRef, { amount: 0.4 })

  const playing = autoplay && !hovered && inView && !shouldReduceMotion

  // Avance automático hasta que el usuario elige una fase
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setActive((i) => (i + 1) % PHASES.length), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [playing])

  const select = (i: number) => {
    setAutoplay(false)
    setActive(i)
  }

  const phase = PHASES[active]
  const progress = (active / (PHASES.length - 1)) * 100

  return (
    <section id="proceso" className="w-full bg-carbon/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-encina/30 bg-encina/10 px-4 py-1.5 font-mono text-sm font-bold text-encina_light mb-3">
            Proceso
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">Cómo trabajamos</h2>
          <p className="mt-3 font-body text-lg text-muted_light max-w-2xl mx-auto">
            Seis fases, de la primera conversación al sistema funcionando y evolucionando.
            Sabes en todo momento qué hacemos, qué recibes y qué necesitamos de ti.
          </p>
        </motion.div>

        {/* ── Desktop: stepper + panel ── */}
        <div
          ref={stepperRef}
          className="hidden lg:block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative mb-10" role="tablist" aria-label="Fases del proceso">
            {/* Track */}
            <div className="absolute left-[8.33%] right-[8.33%] top-7 h-px bg-white/10" aria-hidden />
            <div className="absolute left-[8.33%] right-[8.33%] top-7 h-px" aria-hidden>
              <motion.div
                className="h-[2px] -translate-y-[0.5px] rounded-full bg-gradient-to-r from-tech_blue_light via-tech_purple_light to-encina_light shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative grid grid-cols-6">
              {PHASES.map((p, i) => {
                const Icon = p.icon
                const isActive = i === active
                const isDone = i < active
                return (
                  <button
                    key={p.number}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="proceso-panel"
                    onClick={() => select(i)}
                    className="group flex flex-col items-center gap-3 px-2 text-center focus:outline-none"
                  >
                    <span
                      className={cn(
                        'glass !rounded-full flex h-14 w-14 items-center justify-center transition-all duration-300',
                        `glass-${p.tint}`,
                        isActive && cn('scale-110 border', tintBorder[p.tint]),
                        !isActive && 'group-hover:scale-105',
                        'group-focus-visible:ring-2 group-focus-visible:ring-tech_blue_light',
                      )}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.6}
                        className={cn(
                          'transition-colors',
                          isActive || isDone ? tintText[p.tint] : 'text-muted_light',
                        )}
                      />
                    </span>
                    <span className="font-mono text-xs text-muted">{p.number}</span>
                    <span
                      className={cn(
                        'font-heading text-sm font-semibold transition-colors',
                        isActive ? 'text-white_soft' : 'text-muted_light group-hover:text-white_soft',
                      )}
                    >
                      {p.title}
                    </span>
                    {/* Indicador de autoplay */}
                    <span className="h-0.5 w-12 overflow-hidden rounded-full bg-white/5" aria-hidden>
                      {isActive && playing && (
                        <motion.span
                          key={`bar-${active}`}
                          className="block h-full bg-white/40"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Panel */}
          <div id="proceso-panel" role="tabpanel" className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn('glass rounded-3xl p-10', `glass-${phase.tint}`)}
              >
                <PhaseDetail phase={phase} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Móvil / tablet: acordeón ── */}
        <div className="flex flex-col gap-3 lg:hidden">
          {PHASES.map((p, i) => {
            const Icon = p.icon
            const open = i === mobileOpen
            return (
              <div key={p.number} className={cn('glass rounded-2xl', `glass-${p.tint}`)}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setMobileOpen(open ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20">
                    <Icon size={18} strokeWidth={1.6} className={tintText[p.tint]} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-xs text-muted">{p.number}</span>
                    <span className="block font-heading font-semibold text-white_soft">{p.title}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn('text-muted_light transition-transform', open && 'rotate-180')}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6">
                        <PhaseDetail phase={p} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PhaseDetail({ phase, compact = false }: { phase: Phase; compact?: boolean }) {
  return (
    <div className={cn('grid gap-8', !compact && 'grid-cols-[1.1fr_1fr_1fr] gap-10')}>
      {/* Intro */}
      <div>
        {!compact && (
          <>
            <span
              className="block font-heading text-7xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-white/25 to-white/0"
              aria-hidden
            >
              {phase.number}
            </span>
            <h3 className="mt-2 font-heading text-3xl font-bold text-white_soft">{phase.title}</h3>
          </>
        )}
        <p className={cn('font-body leading-relaxed text-muted_light', compact ? 'text-sm' : 'mt-4')}>
          {phase.summary}
        </p>
      </div>

      <DetailList title="Qué hacemos" items={phase.weDo} tint={phase.tint} />

      <div className="flex flex-col gap-6">
        <DetailList title="Qué recibes" items={phase.youGet} tint={phase.tint} />
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="mb-1.5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <Users size={13} /> Qué necesitamos de ti
          </p>
          <p className="font-body text-sm leading-relaxed text-muted_light">{phase.fromYou}</p>
        </div>
      </div>
    </div>
  )
}

function DetailList({ title, items, tint }: { title: string; items: string[]; tint: Phase['tint'] }) {
  return (
    <div>
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 font-body text-sm leading-relaxed text-white_soft/90">
            <Check size={16} className={cn('mt-0.5 shrink-0', tintText[tint])} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
