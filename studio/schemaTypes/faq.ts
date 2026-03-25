import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare({title, subtitle}: {title?: string; subtitle?: string}) {
      return {
        title: title || 'FAQ',
        subtitle: subtitle ? subtitle.slice(0, 80) : undefined,
      }
    },
  },
})

