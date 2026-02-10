import {defineType, defineField} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{type: 'series'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),
    // --- 产品视频（Product Video）：用于详情页展示与 SEO VideoObject。支持本地上传 / YouTube / Vimeo；全部 optional，不影响旧产品。---
    defineField({
      name: 'productVideo',
      title: 'Product Video',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'videoType',
          title: 'Video Type',
          type: 'string',
          options: {
            list: [
              { title: 'Upload (MP4/WebM)', value: 'upload' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'Vimeo', value: 'vimeo' },
            ],
          },
        }),
        defineField({
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'Only for "Upload". MP4 or WebM.',
          hidden: ({ parent }) => parent?.videoType !== 'upload',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'string',
          description: 'YouTube or Vimeo page URL. Only for YouTube/Vimeo.',
          hidden: ({ parent }) => !['youtube', 'vimeo'].includes(parent?.videoType ?? ''),
        }),
        defineField({
          name: 'poster',
          title: 'Poster',
          type: 'image',
          options: { hotspot: true },
          description: 'Cover image for the video. Recommended for SEO.',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Optional. Falls back to product name in VideoObject.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Optional. Falls back to product short description in VideoObject.',
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for product cards and listings',
    }),
    defineField({
      name: 'mountingType',
      title: 'Mounting Type',
      type: 'string',
      options: {
        list: [
          {title: 'Straight', value: 'straight'},
          {title: 'Right Angle', value: 'right-angle'},
          {title: 'PCB Mount', value: 'pcb'},
          {title: 'Bulkhead', value: 'bulkhead'},
          {title: 'Cable Mount', value: 'cable'},
        ],
      },
    }),
    defineField({
      name: 'frequencyMax',
      title: 'Max Frequency (GHz)',
      type: 'number',
    }),
    defineField({
      name: 'impedance',
      title: 'Impedance (Ω)',
      type: 'number',
      options: {
        list: [
          {title: '50Ω', value: 50},
          {title: '75Ω', value: 75},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'specs',
      title: 'Technical Specifications',
      type: 'array',
      description: 'Product technical parameters (e.g. Impedance, Frequency, VSWR). Shown on product detail page.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Parameter Name' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare: ({ label, value }: { label?: string; value?: string }) => ({
              title: [label, value].filter(Boolean).join(': '),
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
})
