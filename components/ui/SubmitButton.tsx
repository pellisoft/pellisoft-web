'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SubmitButtonProps {
  state: 'idle' | 'loading' | 'success' | 'error'
}

export default function SubmitButton({ state }: SubmitButtonProps) {
  return (
    <div className="w-full">
      <button
        type="submit"
        disabled={state === 'loading' || state === 'success'}
        className="relative w-full overflow-hidden rounded-lg py-4 font-mono text-sm font-medium text-white_soft transition-all duration-200 disabled:cursor-not-allowed focus:outline-none"
        style={{
          background:
            state === 'success'
              ? '#2D5016'
              : state === 'error'
              ? 'rgba(127,29,29,0.8)'
              : state === 'loading'
              ? '#0A0A0A'
              : '#C1440E',
          border:
            state === 'loading' ? '1px solid #4A7C2F' : '1px solid transparent',
        }}
      >
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative z-10"
            >
              ENVIAR MENSAJE
            </motion.span>
          )}

          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <span>ENVIANDO PAQUETE DE DATOS...</span>
              {/* Progress bar */}
              <div className="w-full h-0.5 bg-encina/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-encina_light rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}

          {state === 'success' && (
            <motion.span
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              ● CONEXIÓN ESTABLECIDA
            </motion.span>
          )}

          {state === 'error' && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative z-10"
            >
              ✕ ERROR DE CONEXIÓN — REINTENTA
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Success message below button */}
      <AnimatePresence>
        {state === 'success' && (
          <motion.p
            key="success-msg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-3 text-center font-mono text-xs text-encina_light"
          >
            Nos pondremos en contacto desde Andorra (Teruel) pronto.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
