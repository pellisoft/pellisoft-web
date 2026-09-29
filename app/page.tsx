import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
import FeaturedProjectSection from '@/components/sections/FeaturedProjectSection'
import DnaSection from '@/components/sections/DnaSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import HashScroller from '@/components/layout/HashScroller'

export default function HomePage() {
  return (
    <>
      <HashScroller />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowWeWorkSection />
        <FeaturedProjectSection />
        <DnaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
