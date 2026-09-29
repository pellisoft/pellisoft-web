import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BrowserFrame from '@/components/ui/BrowserFrame'
import ProjectGallery from '@/components/ui/ProjectGallery'
import { displayUrl, getProject, getProjects, PROJECT_KIND_LABEL } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Proyecto — Pellisoft' }
  const cover = project.screenshots[0]
  return {
    title: `${project.name} — Proyectos Pellisoft`,
    description: project.summary,
    alternates: { canonical: `${SITE_URL}/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.name} — Pellisoft`,
      description: project.summary,
      images: cover ? [{ url: cover.src, width: cover.width, height: cover.height }] : undefined,
    },
  }
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const cover = project.screenshots[0]

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="w-full bg-carbon/40 pt-32 pb-12">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted_light hover:text-white_soft transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Volver a proyectos
            </Link>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="glass glass-neutral !rounded-full px-3 py-1 font-mono text-[11px] text-white_soft">
                    {PROJECT_KIND_LABEL[project.kind]}
                  </span>
                  <span className="font-mono text-xs text-muted_light">{project.category}</span>
                  {project.status === 'live' && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-encina_light">
                      <span className="h-1.5 w-1.5 rounded-full bg-encina_light animate-pulse" aria-hidden />
                      EN PRODUCCIÓN
                    </span>
                  )}
                </div>
                <h1 className="font-heading text-5xl lg:text-6xl font-bold text-white_soft leading-tight">
                  {project.name}
                </h1>
                <p className="mt-4 font-body text-xl text-muted_light leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-button inline-flex shrink-0 items-center gap-2 self-start px-7 py-4 font-medium text-white_soft lg:self-auto"
                >
                  Visitar {displayUrl(project.url)}
                  <ArrowUpRight size={18} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Cover */}
        {cover && (
          <section className="w-full pb-16">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
              <BrowserFrame url={displayUrl(project.url) || project.name} tint={project.tint}>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  className="h-auto w-full"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </BrowserFrame>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="w-full bg-slate_dark/55 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr]">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white_soft mb-6">El proyecto</h2>
                <div className="flex flex-col gap-5">
                  {project.description.map((p, i) => (
                    <p key={i} className="font-body text-lg text-muted_light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass glass-neutral !rounded-full px-3 py-1 font-mono text-xs text-muted_light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`glass glass-${project.tint} h-fit rounded-2xl p-7`}>
                <h3 className="font-mono text-xs tracking-widest uppercase text-muted_light mb-5">
                  Qué incluye
                </h3>
                <ul className="flex flex-col gap-5">
                  {project.highlights.map((h) => (
                    <li key={h.title} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-encina_light" />
                      <div>
                        <p className="font-heading font-semibold text-white_soft">{h.title}</p>
                        <p className="mt-1 font-body text-sm text-muted_light leading-relaxed">{h.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.screenshots.length > 1 && (
          <section className="w-full bg-carbon/40 py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
              <h2 className="font-heading text-2xl font-bold text-white_soft mb-8">Capturas</h2>
              <ProjectGallery screenshots={project.screenshots} tint={project.tint} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="w-full bg-slate_dark/55 py-20">
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
              href="/#contacto"
              className="liquid-button inline-flex items-center gap-2 px-8 py-4 font-medium text-white_soft"
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
