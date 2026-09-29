'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { displayUrl, type Project } from '@/lib/projects'
import { cn } from '@/lib/utils'

const tagTint = {
  blue: 'border-tech_blue/30 bg-tech_blue/10 text-tech_blue_light',
  purple: 'border-tech_purple/30 bg-tech_purple/10 text-tech_purple_light',
  encina: 'border-encina/30 bg-encina/10 text-encina_light',
  arcilla: 'border-arcilla/30 bg-arcilla/10 text-arcilla_light',
  neutral: 'border-white/15 bg-white/5 text-muted_light',
}

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('glass glass-interactive group flex flex-col rounded-2xl overflow-hidden', `glass-${project.tint}`)}
    >
      <Link href={`/proyectos/${project.slug}`} className="block p-2 pb-0" aria-label={`Ver ${project.name}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/5">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-tech_blue/20 to-tech_purple/10" />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted_light">{project.category}</span>
          {project.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-encina_light">
              <span className="h-1.5 w-1.5 rounded-full bg-encina_light animate-pulse" aria-hidden />
              EN PRODUCCIÓN
            </span>
          )}
        </div>

        <div>
          <h3 className="font-heading text-2xl font-bold text-white_soft">{project.name}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted_light">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className={cn('rounded-full border px-2 py-0.5 font-mono text-xs', tagTint[project.tint])}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <Link
            href={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-sm text-white_soft hover:text-tech_blue_light transition-colors"
          >
            Ver proyecto <ArrowRight size={14} />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted_light hover:text-white_soft transition-colors"
          >
            {displayUrl(project.url)} <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
