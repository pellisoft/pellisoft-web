'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TerminalInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
  isValid?: boolean
}

// Campo de formulario con estilo "liquid glass"
export default function TerminalInput({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  error,
  isValid,
}: TerminalInputProps) {
  const [focused, setFocused] = useState(false)
  const errorId = `${name}-error`

  const fieldClass = cn(
    'w-full rounded-xl border bg-white/[0.03] px-4 py-3 font-body text-sm leading-relaxed text-white_soft',
    'placeholder:text-muted/60 outline-none transition-all duration-200',
    'backdrop-blur-sm',
    error
      ? 'border-red-400/60 shadow-[0_0_0_3px_rgba(248,113,113,0.12)]'
      : focused
      ? 'border-tech_blue_light/60 bg-white/[0.05] shadow-[0_0_0_3px_rgba(59,130,246,0.15),0_0_24px_-6px_rgba(124,58,237,0.5)]'
      : isValid
      ? 'border-encina_light/50'
      : 'border-white/10 hover:border-white/20',
    isValid && !error && 'pr-10',
  )

  const sharedProps = {
    id: name,
    name,
    required,
    placeholder,
    value,
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: fieldClass,
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={cn(
          'font-mono text-xs uppercase tracking-widest transition-colors',
          focused ? 'text-tech_blue_light' : 'text-muted_light',
        )}
      >
        {label}
        {required && <span className="ml-1 text-arcilla_light">*</span>}
      </label>

      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            {...sharedProps}
            rows={5}
            style={{ resize: 'none' }}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input type={type} {...sharedProps} onChange={(e) => onChange(e.target.value)} />
        )}

        <AnimatePresence>
          {isValid && !error && (
            <motion.span
              key="ok"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className={cn(
                'pointer-events-none absolute right-3 text-encina_light',
                type === 'textarea' ? 'top-3' : 'top-1/2 -translate-y-1/2',
              )}
              aria-hidden
            >
              <Check size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
