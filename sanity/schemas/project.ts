import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nombre del proyecto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: '¿Proyecto destacado en portada?',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descripción breve',
      rows: 3,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Imagen / Mockup del proyecto',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tecnologías / Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'KPIs destacados',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'value', type: 'string', title: 'Valor' },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden de aparición',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
