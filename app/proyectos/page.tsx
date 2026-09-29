import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SecondaryHero from '@/components/layout/SecondaryHero'
import ProjectCard from '@/components/ui/ProjectCard'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Proyectos — Pellisoft',
  description: 'Proyectos de Pellisoft en producción: SaaS, TPV, facturación y software industrial.',
}

export default function ProyectosPage() {
  const projects = getProjects()

  return (
    <>
      <Navbar />
      <main>
        <SecondaryHero
          eyebrow="Casos reales"
          title="Proyectos"
          description="Software industrial y empresarial que funciona en producción."
        />
        <section className="w-full bg-carbon/40 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
