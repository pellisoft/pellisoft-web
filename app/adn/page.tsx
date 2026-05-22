import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SecondaryHero from '@/components/layout/SecondaryHero'
import DnaSection from '@/components/sections/DnaSection'

export const metadata: Metadata = {
  title: 'ADN — Pellisoft',
  description: 'Quiénes somos. Software industrial desde Andorra (Teruel) para el mundo.',
}

export default function AdnPage() {
  return (
    <>
      <Navbar />
      <main>
        <SecondaryHero
          eyebrow="Nuestra identidad"
          title="ADN Pellisoft"
          description="Nuestras raíces en Andorra (Teruel) y nuestra visión global. Código limpio, trato cercano."
        />
        <DnaSection />
      </main>
      <Footer />
    </>
  )
}
