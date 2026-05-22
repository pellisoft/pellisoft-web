import { groq } from 'next-sanity'

// All projects ordered
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    featured,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    },
    order
  }
`

// Featured project (first with featured == true)
export const featuredProjectQuery = groq`
  *[_type == "project" && featured == true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    }
  }
`

// Single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "imageUrl": image.asset->url,
    metrics[] {
      label,
      value
    }
  }
`

// All slugs for generateStaticParams
export const projectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`
