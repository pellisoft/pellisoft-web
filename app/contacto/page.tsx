import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contacto — Pellisoft',
  description: 'Contacta con Pellisoft. Respondemos desde Andorra (Teruel) en menos de 24h.',
}

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
