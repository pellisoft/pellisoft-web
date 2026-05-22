'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  words?: string[]
  interval?: number
  className?: string
}

const DEFAULT_WORDS = ['Sistemas MES', 'Facturación SaaS', 'TPV Inteligente', 'Automatización']

export default function AnimatedText({
  words = DEFAULT_WORDS,
  interval = 2500,
  className,
}: AnimatedTextProps) {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words.length, interval, shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <span className={cn('text-tech_blue_light font-medium', className)}>
        {words[0]}
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center overflow-hidden', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-tech_blue_light font-medium"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
