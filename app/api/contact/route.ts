import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { SITE_URL } from '@/lib/site'

// Rechaza caracteres de control (CR/LF, NUL...) en campos de una sola línea
const singleLine = /^[^\p{Cc}]*$/u

const contactSchema = z.object({
  name:    z.string().trim().min(2).max(100).regex(singleLine),
  company: z.string().trim().max(100).regex(singleLine).optional(),
  email:   z.email().max(254),
  project: z.string().trim().min(10).max(2000),
  website: z.string().max(200).optional(), // honeypot
})

// Orígenes desde los que se acepta el formulario
const ALLOWED_ORIGINS = new Set([SITE_URL, `https://www.${new URL(SITE_URL).host}`])

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.has(origin)) return true
  return process.env.NODE_ENV === 'development' && /^http:\/\/localhost:\d+$/.test(origin)
}

// Simple in-memory rate limit store (per instance, resets on cold start)
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 60_000 // 60 seconds
const RATE_LIMIT_MAX_ENTRIES = 5_000

function getClientIp(request: NextRequest): string {
  // En Vercel, x-real-ip y x-forwarded-for los fija el edge y el cliente no puede falsearlos.
  // No usar cf-connecting-ip: Cloudflare solo hace DNS, así que esa cabecera la controla el cliente.
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}

function pruneRateLimit(now: number) {
  for (const [ip, ts] of rateLimitMap) {
    if (now - ts >= RATE_LIMIT_MS) rateLimitMap.delete(ip)
  }
  // Tope de seguridad por si llegan muchas IPs distintas dentro de la ventana
  if (rateLimitMap.size > RATE_LIMIT_MAX_ENTRIES) rateLimitMap.clear()
}

export async function POST(request: NextRequest) {
  try {
    // Solo peticiones desde nuestra propia web (evita envíos cross-site)
    const origin = request.headers.get('origin')
    if (!isAllowedOrigin(origin)) {
      return NextResponse.json({ error: 'Origen no permitido' }, { status: 403 })
    }

    // Exigir JSON: un <form> cross-site solo puede enviar text/plain, urlencoded o multipart
    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return NextResponse.json({ error: 'Tipo de contenido no soportado' }, { status: 415 })
    }

    // Rate limiting
    const ip = getClientIp(request)
    const now = Date.now()
    pruneRateLimit(now)
    const lastSubmit = rateLimitMap.get(ip)
    if (lastSubmit && now - lastSubmit < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Espera un momento.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

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
    const emailFrom = process.env.CONTACT_EMAIL_FROM ?? 'Pellisoft Web <web@pellisoft.com>'

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

    // Resend does not throw on API errors: it returns { data, error }
    const { data: sent, error } = await resend.emails.send({
      from: emailFrom,
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

    if (error) {
      console.error('[contact] Resend error:', error.name, error.message)
      return NextResponse.json(
        { error: 'No se pudo enviar el mensaje' },
        { status: 502 }
      )
    }

    console.info('[contact] Email sent:', sent?.id)

    // Record rate limit
    rateLimitMap.set(ip, now)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
