import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Imagen que aparece al compartir pellisoft.com (LinkedIn, WhatsApp, X…)
export const alt = 'Pellisoft — Software a medida para tu planta y tu negocio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logos/logo-azul.png'), 'base64')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0A',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(30,64,175,0.55), transparent 45%), radial-gradient(circle at 10% 95%, rgba(124,58,237,0.45), transparent 45%), radial-gradient(circle at 70% 90%, rgba(193,68,14,0.25), transparent 40%)',
          color: '#F5F5F5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo}`} width={72} height={72} alt="" />
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 1 }}>Pellisoft</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Software a medida</span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              backgroundImage: 'linear-gradient(90deg, #3B82F6, #A855F7)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            para tu planta y tu negocio.
          </span>
          <span style={{ marginTop: 28, fontSize: 30, color: '#9CA3AF' }}>
            Automatización industrial · Sistemas MES · Plataformas SaaS · Integraciones
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#9CA3AF' }}>
          <span>pellisoft.com</span>
          <span style={{ color: '#E05520' }}>Andorra (Teruel), España</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
