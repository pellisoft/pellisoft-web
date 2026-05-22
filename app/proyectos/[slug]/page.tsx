import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft } from 'lucide-react'

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

async function getProject(slug: string): Promise<SanityProject | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null
  try {
    const { client } = await import('@/lib/sanity/client')
    const { projectBySlugQuery } = await import('@/lib/sanity/queries')
    return await client.fetch<SanityProject | null>(projectBySlugQuery, { slug })
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const { client } = await import('@/lib/sanity/client')
    const { projectSlugsQuery } = await import('@/lib/sanity/queries')
    const slugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery)
    return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Proyecto — Pellisoft' }
  return {
    title: `${project.title} — Pellisoft`,
    description: project.description,
  }
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="w-full bg-carbon pt-32 pb-16 border-b border-tech_blue/10">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-white_soft transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Volver a proyectos
            </Link>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded-full border border-tech_blue/30 bg-tech_blue/10 text-tech_blue_light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white_soft leading-tight">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Image */}
        {project.imageUrl && (
          <section className="w-full bg-slate_dark">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-8">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-tech_blue/20">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="w-full bg-carbon py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <h2 className="font-heading text-2xl font-bold text-white_soft mb-6">
                  El proyecto
                </h2>
                <p className="font-body text-muted_light leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs text-tech_blue_light tracking-widest uppercase">
                    KPIs del proyecto
                  </h3>
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-slate_dark rounded-lg px-5 py-4 border border-tech_blue/20"
                    >
                      <p className="font-heading text-3xl font-bold text-tech_blue_light">
                        {m.value}
                      </p>
                      <p className="font-mono text-xs text-muted mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-slate_dark py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 text-center">
            <span className="inline-flex w-fit items-center rounded-full border border-encina/30 bg-encina/10 px-4 py-1.5 font-mono text-sm font-bold text-encina_light mb-4">
              ¿Te interesa algo así?
            </span>
            <h2 className="font-heading text-3xl font-bold text-white_soft mb-6">
              Cuéntanos tu proyecto
            </h2>
            <p className="font-body text-muted_light max-w-lg mx-auto mb-8">
              Respondemos desde Andorra (Teruel) en menos de 24 horas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-md bg-arcilla hover:bg-arcilla_light px-8 py-4 font-medium text-white_soft transition-colors duration-200"
            >
              Hablar con Pellisoft →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
