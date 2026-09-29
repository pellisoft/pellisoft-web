'use client'

import { motion } from 'framer-motion'

interface SecondaryHeroProps {
  eyebrow: string
  title: string
  description?: string
}

export default function SecondaryHero({ eyebrow, title, description }: SecondaryHeroProps) {
  return (
    <section className="w-full bg-carbon/40 pt-32 pb-16 border-b border-tech_blue/10">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex w-fit items-center rounded-full border border-tech_blue/30 bg-tech_blue/10 px-4 py-1.5 font-mono text-sm font-bold text-tech_blue_light mb-4">
            {eyebrow}
          </span>
          <h1 className="font-heading text-5xl font-bold text-white_soft leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-4 font-body text-lg text-muted_light max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
