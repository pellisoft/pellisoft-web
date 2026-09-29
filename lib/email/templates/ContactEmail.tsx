import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { SITE_DOMAIN } from '@/lib/site'

interface ContactEmailProps {
  name: string
  company?: string
  email: string
  project: string
  sentAt: string
}

export function ContactEmailTemplate({
  name,
  company,
  email,
  project,
  sentAt,
}: ContactEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo mensaje de {name} vía {SITE_DOMAIN}</Preview>
      <Body
        style={{
          fontFamily: 'Inter, -apple-system, sans-serif',
          background: '#f5f5f5',
          margin: 0,
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            maxWidth: 560,
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}
        >
          {/* Header */}
          <Section style={{ background: '#0F172A', padding: '24px 32px' }}>
            <Heading
              style={{
                color: '#3B82F6',
                fontSize: 18,
                fontWeight: 700,
                margin: 0,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
              }}
            >
              PELLISOFT
            </Heading>
            <Text
              style={{
                color: '#6B7280',
                fontSize: 11,
                margin: '4px 0 0',
                fontFamily: 'monospace',
              }}
            >
              Nuevo mensaje desde la web
            </Text>
          </Section>

          {/* Contact data */}
          <Section style={{ padding: '24px 32px 0' }}>
            <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 6px' }}>
              <strong>Nombre:</strong> {name}
            </Text>
            {company ? (
              <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 6px' }}>
                <strong>Empresa:</strong> {company}
              </Text>
            ) : null}
            <Text style={{ color: '#374151', fontSize: 13, margin: '0 0 6px' }}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${email}`} style={{ color: '#1E40AF' }}>
                {email}
              </Link>
            </Text>
          </Section>

          <Section style={{ padding: '16px 32px 0' }}>
            <Hr style={{ borderColor: '#E5E7EB', margin: '0 0 16px' }} />
            <Text
              style={{ color: '#374151', fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}
            >
              Mensaje:
            </Text>
            <Section
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: 6,
                padding: '16px',
              }}
            >
              <Text
                style={{
                  color: '#374151',
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {project}
              </Text>
            </Section>
          </Section>

          {/* Reply CTA */}
          <Section style={{ padding: '20px 32px' }}>
            <Link
              href={`mailto:${email}?subject=Re: tu consulta a Pellisoft`}
              style={{
                display: 'inline-block',
                background: '#1E40AF',
                color: '#ffffff',
                borderRadius: 6,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Responder a {name}
            </Link>
          </Section>

          {/* Footer */}
          <Section
            style={{
              background: '#F9FAFB',
              borderTop: '1px solid #E5E7EB',
              padding: '16px 32px',
            }}
          >
            <Text
              style={{
                color: '#9CA3AF',
                fontSize: 11,
                margin: 0,
                fontFamily: 'monospace',
              }}
            >
              Enviado desde {SITE_DOMAIN} · {sentAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
