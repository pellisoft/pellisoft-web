'use client'

import { useState } from 'react'
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
  blue: {
    border: 'border-tech_blue/25',
    hoverBorder: 'hover:border-tech_blue/60',
    shadow: '0 0 28px rgba(30,64,175,0.25)',
    bg: 'rgba(30,64,175,0.04)',
  },
  purple: {
    border: 'border-tech_purple/25',
    hoverBorder: 'hover:border-tech_purple/60',
    shadow: '0 0 28px rgba(124,58,237,0.25)',
    bg: 'rgba(124,58,237,0.04)',
  },
  arcilla: {
    border: 'border-arcilla/25',
    hoverBorder: 'hover:border-arcilla/60',
    shadow: '0 0 28px rgba(193,68,14,0.25)',
    bg: 'rgba(193,68,14,0.04)',
  },
  encina: {
    border: 'border-encina/25',
    hoverBorder: 'hover:border-encina/60',
    shadow: '0 0 28px rgba(45,80,22,0.25)',
    bg: 'rgba(45,80,22,0.04)',
  },
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
  const [isHovered, setIsHovered] = useState(false)
  const config = glowConfig[glowColor]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? config.shadow : 'none',
        backgroundColor: '#111318',
        transition: 'box-shadow 0.2s ease',
      }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-7 cursor-pointer overflow-hidden',
        config.border,
        config.hoverBorder,
        'transition-colors duration-200',
        size === 'lg' ? 'min-h-[280px]' : 'min-h-[180px]',
        className
      )}
    >
      {/* Subtle gradient background overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: config.bg }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full gap-4">
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

        {/* Arrow */}
        <div className="flex justify-end mt-auto pt-2">
          <span className="text-muted_light text-lg transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
