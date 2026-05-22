import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  email:   z.string().email(),
  project: z.string().min(10).max(2000),
  website: z.string().optional(), // honeypot
})

// Simple in-memory rate limit store (resets on cold start)
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 60_000 // 60 seconds

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
    const now = Date.now()
    const lastSubmit = rateLimitMap.get(ip)
    if (lastSubmit && now - lastSubmit < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Espera un momento.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate with Zod
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    const data = parsed.data

    // Honeypot: silently accept but don't send email
    if (data.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Check env config
    const apiKey = process.env.RESEND_API_KEY
    const emailTo = process.env.CONTACT_EMAIL_TO

    if (!apiKey || !emailTo) {
      console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL_TO')
      return NextResponse.json(
        { error: 'Servicio no disponible temporalmente' },
        { status: 503 }
      )
    }

    const { Resend } = await import('resend')
    const { ContactEmailTemplate } = await import('@/lib/email/templates/ContactEmail')

    const resend = new Resend(apiKey)

    const sentAt = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    await resend.emails.send({
      from: 'web@pellisoft.es',
      to: emailTo,
      replyTo: data.email,
      subject: `Nuevo contacto web: ${data.name}${data.company ? ` · ${data.company}` : ''}`,
      react: ContactEmailTemplate({
        name: data.name,
        company: data.company,
        email: data.email,
        project: data.project,
        sentAt,
      }),
    })

    // Record rate limit
    rateLimitMap.set(ip, now)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

