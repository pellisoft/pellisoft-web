'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const lineColor = error
    ? '#EF4444'
    : isValid
    ? '#4A7C2F'
    : focused
    ? '#C1440E'
    : 'rgba(107,114,128,0.4)'

  const sharedProps = {
    id: name,
    name,
    required,
    placeholder,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className: [
      'w-full bg-transparent border-none outline-none',
      'font-body text-white_soft text-sm leading-relaxed',
      'placeholder:text-muted/50 pb-2',
      focused ? 'terminal-cursor-active' : '',
    ].join(' '),
  }

  return (
    <div className="relative flex flex-col gap-1 pb-1">
      <label
        htmlFor={name}
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: focused ? '#E05520' : '#6B7280' }}
      >
        {label}
        {required && <span className="ml-1 text-arcilla">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...sharedProps}
          rows={4}
          style={{ resize: 'none' }}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {/* Animated baseline */}
      <motion.div
        animate={{ backgroundColor: lineColor }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 h-px"
      />

      {/* Glow when focused */}
      {focused && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            boxShadow: `0 0 8px 1px ${error ? '#EF4444' : '#C1440E'}44`,
          }}
        />
      )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-red-400 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
