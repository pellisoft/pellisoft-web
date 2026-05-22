'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  to,
  suffix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(wrapperRef, { once: true, amount: 0.5 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (shouldReduceMotion) {
      setCount(to)
      return
    }

    let startTime: number | null = null
    let rafId = 0

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(to * eased))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [inView, to, duration, shouldReduceMotion])

  return (
    <span ref={wrapperRef} className={className}>
      {count}
      {suffix}
    </span>
  )
}
