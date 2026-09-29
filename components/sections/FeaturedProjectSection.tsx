'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import BrowserFrame from '@/components/ui/BrowserFrame'
import { displayUrl, getProjects, type Project, type ProjectKind } from '@/lib/projects'
import { cn } from '@/lib/utils'

const GROUPS: { kind: ProjectKind; title: string; description: string }[] = [
  {
    kind: 'product',
    title: 'Productos propios',
    description: 'Plataformas SaaS que diseñamos, construimos y operamos. Cada una tiene su propia web.',
  },
  {
    kind: 'client',
    title: 'Proyectos a medida',
    description: 'Software desarrollado para empresas con necesidades concretas.',
  },
]

// Sección "Proyectos" de la landing: muestra todos los proyectos de lib/projects.ts,
// agrupados en productos propios y proyectos a medida
export default function FeaturedProjectSection() {
  const shouldReduceMotion = useReducedMotion()
  const projects = getProjects()
  if (projects.length === 0) return null
  const groups = GROUPS.map((g) => ({ ...g, items: projects.filter((p) => p.kind === g.kind) })).filter(
    (g) => g.items.length > 0,
  )

  return (
    <section id="proyectos" className="w-full overflow-hidden bg-slate_dark/55 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-3">
            Lo que construimos
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">Proyectos</h2>
          <p className="mt-3 font-body text-lg text-muted_light max-w-xl">
            Software que ya funciona en producción.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {groups.map((group) => (
            <div key={group.kind}>
              <div className="mb-12 flex flex-col gap-1 border-l-2 border-tech_purple_light/50 pl-4">
                <h3 className="font-heading text-xl font-semibold text-white_soft">{group.title}</h3>
                <p className="font-body text-sm text-muted_light">{group.description}</p>
              </div>
              <div className="flex flex-col gap-20 lg:gap-28">
                {group.items.map((project, i) => (
                  <ProjectShowcase
                    key={project.slug}
                    project={project}
                    reversed={i % 2 === 1}
                    reduceMotion={!!shouldReduceMotion}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Al abrir un proyecto, la entrada actual del historial pasa a ser /#proyectos
// para que "atrás" vuelva a esta sección de la landing
function rememberSection() {
  window.history.replaceState(window.history.state, '', '/#proyectos')
}

function ProjectShowcase({
  project,
  reversed,
  reduceMotion,
}: {
  project: Project
  reversed: boolean
  reduceMotion: boolean
}) {
  const cover = project.screenshots[0]
  const dir = reversed ? 1 : -1
  const href = `/proyectos/${project.slug}`

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      {/* Text */}
      <motion.div
        className={cn('lg:col-span-5', reversed && 'lg:order-2')}
        initial={reduceMotion ? false : { opacity: 0, x: 30 * dir }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-muted_light">{project.category}</span>
          {project.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-encina_light">
              <span className="h-1.5 w-1.5 rounded-full bg-encina_light animate-pulse" aria-hidden />
              EN PRODUCCIÓN
            </span>
          )}
        </div>

        <h4 className="font-heading text-3xl lg:text-4xl font-bold text-white_soft">
          {project.name}
        </h4>
        <p className="mt-2 font-heading text-lg text-tech_purple_light">{project.tagline}</p>

        <p className="text-muted_light font-body mt-4 leading-relaxed">{project.summary}</p>

        <ul className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h.title} className="flex gap-3 font-body text-sm text-muted_light">
              <Check size={16} className="mt-0.5 shrink-0 text-encina_light" />
              <span>
                <strong className="font-semibold text-white_soft">{h.title}.</strong> {h.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Producto propio: la acción principal es ir a su web. Proyecto a medida: ver el caso */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.kind === 'product' && project.url ? (
            <>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-button inline-flex items-center gap-2 px-6 py-3 font-medium text-white_soft"
              >
                Visitar {displayUrl(project.url)} <ArrowUpRight size={16} />
              </a>
              <Link
                href={href}
                onClick={rememberSection}
                className="glass glass-neutral glass-interactive !rounded-full inline-flex items-center gap-2 px-6 py-3 font-medium text-white_soft"
              >
                Ver detalles <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <Link
              href={href}
              onClick={rememberSection}
              className="liquid-button inline-flex items-center gap-2 px-6 py-3 font-medium text-white_soft"
            >
              Ver caso <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Screenshot */}
      <motion.div
        className={cn('lg:col-span-7', reversed && 'lg:order-1')}
        initial={reduceMotion ? false : { opacity: 0, x: -30 * dir, rotateY: 5 * dir }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ perspective: 1200 }}
        whileHover={reduceMotion ? undefined : { rotateY: 2 * -dir, scale: 1.01 }}
      >
        {cover && (
          <Link href={href} onClick={rememberSection} aria-label={`Ver ${project.name}`}>
            <BrowserFrame url={displayUrl(project.url) || project.name} tint={project.tint}>
              <Image
                src={cover.src}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </BrowserFrame>
          </Link>
        )}
      </motion.div>
    </article>
  )
}
