'use client'

import { useState } from 'react'
import Link from 'next/link'
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
            Contacto
          </span>
          <h2 className="font-heading text-4xl font-bold text-white_soft">
            Iniciemos tu proyecto
          </h2>
          <p className="mt-3 font-body text-lg text-muted_light max-w-xl mx-auto">
            Cuéntanos qué necesitas. Tu mensaje llega directo a Andorra (Teruel)
            y te respondemos en menos de 24&nbsp;h.
          </p>
        </motion.div>

        {/* Glassmorphism container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass glass-encina mx-auto max-w-5xl rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr]">

            {/* LEFT — Info + Map */}
            <div className="flex flex-col gap-6 border-b border-white/10 bg-black/20 p-8 md:border-b-0 md:border-r lg:p-10">
              {/* Estado del buzón */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-encina_light animate-pulse" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-widest text-encina_light">
                  Buzón abierto
                </span>
              </div>

              {/* Mapa: los mensajes llegan a Teruel */}
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <TeruelMap received={formState === 'success'} />
                <p className="mt-2 text-center font-mono text-[11px] text-muted">
                  Desde cualquier sitio, directo a Teruel
                </p>
              </div>

              {/* Datos de contacto */}
              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="glass glass-blue glass-interactive !rounded-full flex items-center gap-2.5 px-4 py-2.5 font-mono text-sm text-muted_light hover:text-white_soft transition-colors"
                >
                  <Mail size={15} className="text-tech_blue_light shrink-0" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>
                <div className="flex items-center gap-2.5 px-4 font-mono text-xs text-muted">
                  <MapPin size={14} className="text-arcilla_light shrink-0" />
                  Andorra (Teruel), Aragón, España
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="p-8 lg:p-10">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                </div>

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

                {/* Información básica RGPD (art. 13) */}
                <p className="font-body text-xs leading-relaxed text-muted_light/80">
                  Usaremos tus datos solo para responder a tu consulta. No los cedemos a terceros.
                  Puedes ejercer tus derechos escribiéndonos. Más información en la{' '}
                  <Link href="/privacidad" className="text-tech_blue_light underline underline-offset-2 hover:text-white_soft">
                    política de privacidad
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

