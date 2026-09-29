'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectScreenshot } from '@/lib/projects'
import type { GlassTint } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

interface ProjectGalleryProps {
  screenshots: ProjectScreenshot[]
  tint: GlassTint
}

export default function ProjectGallery({ screenshots, tint }: ProjectGalleryProps) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + screenshots.length) % screenshots.length)),
    [screenshots.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const current = open === null ? null : screenshots[open]

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {screenshots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              'glass glass-interactive group rounded-2xl p-2 text-left cursor-zoom-in',
              `glass-${tint}`,
            )}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {s.caption && (
              <p className="px-2 pb-1 pt-3 font-mono text-xs text-muted_light">{s.caption}</p>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-10"
            onClick={close}
          >
            <div className="relative max-h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="mx-auto h-auto max-h-[80vh] w-auto rounded-xl border border-white/10 object-contain"
                sizes="100vw"
                priority
              />
              {current.caption && (
                <p className="mt-3 text-center font-mono text-xs text-muted_light">
                  {current.caption} · {open! + 1}/{screenshots.length}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="glass glass-neutral absolute right-4 top-4 !rounded-full p-2 text-white_soft"
            >
              <X size={20} />
            </button>
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(-1) }}
                  aria-label="Anterior"
                  className="glass glass-neutral absolute left-3 top-1/2 -translate-y-1/2 !rounded-full p-2 text-white_soft"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(1) }}
                  aria-label="Siguiente"
                  className="glass glass-neutral absolute right-3 top-1/2 -translate-y-1/2 !rounded-full p-2 text-white_soft"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
