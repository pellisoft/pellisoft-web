'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { z } from 'zod'
import TerminalInput from '@/components/ui/TerminalInput'
import SubmitButton from '@/components/ui/SubmitButton'
import TeruelMap from '@/components/ui/TeruelMap'
import { CONTACT_EMAIL } from '@/lib/site'

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto').max(100),
  company: z.string().max(100).optional(),
  email: z.email('Email no válido').max(254),
  project: z.string().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)').max(2000),
})

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion()
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({
    name: '',
    company: '',
    email: '',
    project: '',
    website: '', // honeypot
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const updateField = (name: string) => (value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }))
    if (touched[name] && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const isFieldValid = (name: string) => {
    return touched[name] && !errors[name] && !!fields[name as keyof typeof fields]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: silently reject bots
    if (fields.website) return

    setTouched({ name: true, company: true, email: true, project: true })

    const result = contactSchema.safeParse({
      name: fields.name,
      company: fields.company || undefined,
      email: fields.email,
      project: fields.project,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          company: fields.company || undefined,
          email: fields.email,
          project: fields.project,
          website: fields.website,
        }),
      })

      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section id="contacto" className="w-full bg-carbon/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-3">
            Contacto · Command Center
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">
            Iniciemos tu proyecto
          </h2>
        </motion.div>

        {/* Glassmorphism container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass glass-encina mx-auto max-w-5xl rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr]">

            {/* LEFT — Info + Map */}
            <div
              className="p-8 lg:p-10 flex flex-col gap-6"
              style={{
                background: 'rgba(10,10,10,0.25)',
                borderRight: '1px solid rgba(74,124,47,0.2)',
              }}
            >
              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-encina_light animate-pulse"
                  aria-hidden
                />
                <span className="font-mono text-xs text-encina_light tracking-widest">
                  SISTEMA ACTIVO
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-muted_light leading-relaxed">
                Cuéntanos qué necesitas. Respondemos desde Andorra (Teruel) en menos de 24h.
              </p>

              {/* Map */}
              <div className="hidden md:flex items-center justify-center py-2">
                <TeruelMap width={200} height={180} />
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 font-mono text-sm text-muted_light hover:text-white_soft transition-colors"
                >
                  <Mail size={14} className="text-tech_blue_light flex-shrink-0" />
                  {CONTACT_EMAIL}
                </a>
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <MapPin size={13} className="text-arcilla flex-shrink-0" />
                  Andorra (Teruel), Aragón, España
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="p-8 lg:p-10">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

                {/* Honeypot — visually hidden */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.website}
                    onChange={(e) => setFields((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>

                <TerminalInput
                  label="Nombre"
                  name="name"
                  type="text"
                  required
                  value={fields.name}
                  onChange={updateField('name')}
                  error={touched.name ? errors.name : undefined}
                  isValid={isFieldValid('name')}
                />

                <TerminalInput
                  label="Empresa (opcional)"
                  name="company"
                  type="text"
                  value={fields.company}
                  onChange={updateField('company')}
                />

                <TerminalInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={fields.email}
                  onChange={updateField('email')}
                  error={touched.email ? errors.email : undefined}
                  isValid={isFieldValid('email')}
                />

                <TerminalInput
                  label="Proyecto"
                  name="project"
                  type="textarea"
                  required
                  placeholder="Cuéntanos qué necesitas construir..."
                  value={fields.project}
                  onChange={updateField('project')}
                  error={touched.project ? errors.project : undefined}
                  isValid={isFieldValid('project')}
                />

                <SubmitButton state={formState} />

                {formState === 'error' && (
                  <p className="text-center font-mono text-xs text-red-400">
                    Si el error persiste, escríbenos a {CONTACT_EMAIL}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

