'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        variant === 'primary'
          ? 'bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white shadow-lg shadow-[#1E40AF]/25 hover:brightness-110'
          : 'border border-[rgba(245,245,245,0.3)] bg-transparent text-[#F5F5F5] hover:bg-white/5',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
