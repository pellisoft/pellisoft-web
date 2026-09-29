import { cn } from '@/lib/utils'
import type { GlassTint } from '@/components/ui/GlassCard'
import type { ReactNode } from 'react'

interface BrowserFrameProps {
  url: string
  tint?: GlassTint
  className?: string
  children: ReactNode
}

// Marco de navegador "liquid glass" para mostrar capturas de proyectos
export default function BrowserFrame({ url, tint = 'blue', className, children }: BrowserFrameProps) {
  return (
    <div className={cn('glass rounded-2xl p-1.5 sm:p-2', `glass-${tint}`, className)}>
      <div className="flex items-center gap-3 px-2 pb-2 pt-1">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-arcilla_light/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-encina_light/90" />
        </div>
        <div className="flex-1 truncate rounded-full border border-white/10 bg-black/30 px-3 py-1 text-center font-mono text-[11px] text-muted_light">
          {url}
        </div>
        <span className="w-10" aria-hidden />
      </div>
      <div className="overflow-hidden rounded-xl border border-white/5 bg-black/40">{children}</div>
    </div>
  )
}
