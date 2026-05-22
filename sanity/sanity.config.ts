// @ts-nocheck
/**
 * Sanity Studio Configuration
 *
 * Prerequisites:
 *   npm install sanity @sanity/vision
 *
 * To run the Studio locally:
 *   npx sanity dev
 *
 * Or embed it in Next.js at /studio — see docs at https://www.sanity.io/docs/nextjs
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'pellisoft',
  title: 'Pellisoft CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
