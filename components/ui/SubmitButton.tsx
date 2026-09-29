'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Loader2, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubmitButtonProps {
  state: 'idle' | 'loading' | 'success' | 'error'
}

const LABELS = {
  idle: { text: 'Enviar mensaje', Icon: ArrowRight },
  loading: { text: 'Enviando…', Icon: Loader2 },
  success: { text: 'Mensaje enviado', Icon: Check },
  error: { text: 'No se pudo enviar · reintentar', Icon: RotateCcw },
} as const

export default function SubmitButton({ state }: SubmitButtonProps) {
  const { text, Icon } = LABELS[state]

  return (
    <div className="w-full">
      <button
        type="submit"
        disabled={state === 'loading' || state === 'success'}
        className={cn(
          'liquid-button relative flex w-full items-center justify-center gap-2 py-4 font-medium text-white_soft',
          'disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-tech_blue_light',
          state === 'success' && '!bg-none !bg-encina',
          state === 'error' && '!bg-none !bg-red-900/80',
        )}
      >
        {/* Barra de progreso mientras se envía */}
        {state === 'loading' && (
          <motion.span
            className="absolute inset-y-0 left-0 -z-10 bg-white/15"
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            aria-hidden
          />
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            {text}
            <Icon size={18} className={state === 'loading' ? 'animate-spin' : undefined} />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {state === 'success' && (
          <motion.p
            key="success-msg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-3 text-center font-body text-sm text-encina_light"
            role="status"
          >
            Recibido en Andorra (Teruel). Te respondemos muy pronto.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
