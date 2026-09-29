'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  glowColor: 'blue' | 'purple' | 'arcilla' | 'encina'
  badge?: string
  size?: 'sm' | 'lg'
  className?: string
  children?: React.ReactNode
}

const glowConfig = {
  blue: { tint: 'glass-blue' },
  purple: { tint: 'glass-purple' },
  arcilla: { tint: 'glass-arcilla' },
  encina: { tint: 'glass-encina' },
}

const badgeColorMap = {
  blue: 'bg-tech_blue/10 text-tech_blue_light border-tech_blue/20',
  purple: 'bg-tech_purple/10 text-tech_purple_light border-tech_purple/20',
  arcilla: 'bg-arcilla/10 text-arcilla_light border-arcilla/20',
  encina: 'bg-encina/10 text-encina_light border-encina/20',
}

export default function ServiceCard({
  title,
  description,
  icon,
  glowColor,
  badge,
  size = 'sm',
  className,
  children,
}: ServiceCardProps) {
  const config = glowConfig[glowColor]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'glass glass-interactive relative flex flex-col rounded-2xl p-7 overflow-hidden',
        config.tint,
        size === 'lg' ? 'min-h-[280px]' : 'min-h-[200px]',
        className
      )}
    >
      {/* Content */}
      <div className="flex flex-col h-full gap-4">
        {/* Icon */}
        <div className="text-muted_light group-hover:text-white_soft transition-colors">
          {icon}
        </div>

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              'inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 font-mono text-xs',
              badgeColorMap[glowColor]
            )}
          >
            {badge}
          </span>
        )}

        {/* Title */}
        <h3
          className={cn(
            'font-heading font-semibold text-white_soft',
            size === 'lg' ? 'text-2xl' : 'text-xl'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted_light leading-relaxed flex-1">
          {description}
        </p>

        {/* Children */}
        {children}
      </div>
    </motion.div>
  )
}
