import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pellisoft — Software industrial y empresarial',
  description: 'Sistemas MES, SaaS y automatización desde Andorra (Teruel) para el mundo.',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png', type: 'image/png' }],
    shortcut: '/icon.png',
  },
  openGraph: {
    title: 'Pellisoft — Software industrial y empresarial',
    description: 'Sistemas MES, SaaS y automatización desde Andorra (Teruel) para el mundo.',
    url: 'https://pellisoft.es',
    siteName: 'Pellisoft',
    locale: 'es_ES',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pellisoft',
  description: 'Software industrial y empresarial diseñado para escalar',
  url: 'https://pellisoft.es',
  email: 'info@pellisoft.es',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Andorra (Teruel)',
    addressRegion: 'Aragón',
    addressCountry: 'ES',
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-carbon text-white_soft antialiased">
        {children}
        {/* JSON-LD structured data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Plausible Analytics — privacy-first, no cookie banner needed */}
        <Script
          defer
          data-domain="pellisoft.es"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
