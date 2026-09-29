import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export type GlassTint = 'blue' | 'purple' | 'encina' | 'arcilla' | 'neutral'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tint?: GlassTint
  interactive?: boolean
  children: ReactNode
}

// Superficie "liquid glass" — estilos en styles/globals.css (.glass)
export default function GlassCard({
  tint = 'blue',
  interactive = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn('glass rounded-2xl', `glass-${tint}`, interactive && 'glass-interactive', className)}
      {...props}
    >
      {children}
    </div>
  )
}
