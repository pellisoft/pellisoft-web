import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pellisoft.es'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/adn`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamic project routes from Sanity
  let projectRoutes: MetadataRoute.Sitemap = []

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { client } = await import('@/lib/sanity/client')
      const { projectSlugsQuery } = await import('@/lib/sanity/queries')
      const slugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery)

      projectRoutes = slugs
        .filter((s) => s.slug)
        .map((s) => ({
          url: `${baseUrl}/proyectos/${s.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
    } catch {
      // Sanity not configured or unreachable — skip dynamic routes
    }
  }

  return [...staticRoutes, ...projectRoutes]
}
