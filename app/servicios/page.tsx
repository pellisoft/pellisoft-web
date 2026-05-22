import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SecondaryHero from '@/components/layout/SecondaryHero'
import ServicesSection from '@/components/sections/ServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'

export const metadata: Metadata = {
  title: 'Servicios — Pellisoft',
  description: 'MES industrial, TPV y facturación SaaS. Software a medida desde Andorra (Teruel)',
}

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        <SecondaryHero
          eyebrow="Qué construimos"
          title="Servicios"
          description="Software industrial y empresarial a medida. Sin plantillas, sin atajos."
        />
        <ServicesSection />
        <HowWeWorkSection />
      </main>
      <Footer />
    </>
  )
}
