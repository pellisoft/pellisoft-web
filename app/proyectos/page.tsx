import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SecondaryHero from '@/components/layout/SecondaryHero'
import ProjectCard from '@/components/ui/ProjectCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proyectos — Pellisoft',
  description: 'Casos de éxito de Pellisoft. MES industrial, SaaS y automatización.',
}

export const revalidate = 60

interface SanityProject {
  _id: string
  title: string
  slug: string
  description: string
  imageUrl?: string
  tags?: string[]
  metrics?: { label: string; value: string }[]
}

async function getProjects(): Promise<SanityProject[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const { projectsQuery } = await import('@/lib/sanity/queries')
    return await client.fetch<SanityProject[]>(projectsQuery)
  } catch {
    return []
  }
}

export default async function ProyectosPage() {
  const projects = await getProjects()

  return (
    <>
      <Navbar />
      <main>
        <SecondaryHero
          eyebrow="Casos reales"
          title="Proyectos"
          description="Software industrial y empresarial que funciona en producción."
        />
        <section className="w-full bg-carbon py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    slug={project.slug}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                    metrics={project.metrics}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-6">
                  Próximamente
                </span>
                <h2 className="font-heading text-4xl font-bold text-white_soft mb-4">
                  Nuestros casos de éxito
                </h2>
                <p className="font-body text-lg text-muted_light max-w-xl mx-auto mb-10">
                  Estamos preparando una selección de proyectos industriales y empresariales.
                  Mientras tanto, cuéntanos el tuyo.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-md bg-tech_blue px-6 py-3 font-medium text-white_soft hover:bg-tech_blue_light transition-colors duration-200"
                >
                  Hablar con Pellisoft →
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
