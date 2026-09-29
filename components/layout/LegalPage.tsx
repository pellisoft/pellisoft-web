import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LEGAL } from '@/lib/site'
import type { ReactNode } from 'react'

interface LegalPageProps {
  title: string
  children: ReactNode
}

// Plantilla común para las páginas legales
export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="w-full pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted_light hover:text-white_soft transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
          <h1 className="font-heading text-4xl font-bold text-white_soft">{title}</h1>
          <p className="mt-2 font-mono text-xs text-muted_light">
            Última actualización: {LEGAL.updatedAt}
          </p>

          <article
            className={[
              'glass glass-neutral mt-10 rounded-3xl p-8 md:p-10',
              'font-body text-muted_light leading-relaxed',
              '[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white_soft',
              '[&_h2:first-child]:mt-0',
              '[&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5',
              '[&_strong]:text-white_soft [&_a]:text-tech_blue_light [&_a:hover]:text-white_soft [&_a]:underline [&_a]:underline-offset-2',
            ].join(' ')}
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
