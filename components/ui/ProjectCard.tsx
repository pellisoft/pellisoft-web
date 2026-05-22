'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  title: string
  slug: string
  description: string
  imageUrl?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
}

export default function ProjectCard({
  title,
  slug,
  description,
  imageUrl,
  tags,
  metrics,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-xl bg-slate_dark border border-tech_blue/20 hover:border-tech_blue/50 transition-colors duration-300 overflow-hidden"
    >
      {/* Image or placeholder */}
      {imageUrl ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="w-full aspect-video"
          style={{
            background:
              'linear-gradient(135deg, rgba(30,64,175,0.15) 0%, rgba(124,58,237,0.1) 100%)',
          }}
        />
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded-full border border-tech_blue/30 bg-tech_blue/10 text-tech_blue_light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-heading text-xl font-bold text-white_soft">
          {title}
        </h3>

        {description && (
          <p className="font-body text-sm text-muted_light leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-tech_blue/15">
            {metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-heading text-xl font-bold text-tech_blue_light">
                  {m.value}
                </p>
                <p className="font-mono text-xs text-muted mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/proyectos/${slug}`}
          className="inline-flex items-center gap-2 font-mono text-sm text-tech_blue_light hover:text-white_soft transition-colors mt-auto pt-2"
        >
          Ver proyecto <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}
