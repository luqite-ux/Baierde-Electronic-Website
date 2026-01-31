import {defineType, defineField} from 'sanity'

export const series = defineType({
  name: 'series',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Series Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Series Image',
      type: 'image',
      options: {hotspot: true},
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
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{type: 'category'}],
        validation: R => R.required(),
      }),
      defineField({
        name: 'isPopular',
        title: 'Popular Series',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'frequencyLabel',
        title: 'Frequency Label',
        type: 'string',
        description: 'Display label for frequency range (e.g., "DC-18GHz"). If empty, will use fallback based on frequencyMax.',
      }),
      defineField({
        name: 'sortOrder',
        title: 'Sort Order',
        type: 'number',
        description: 'Order for displaying popular series (ascending).',
      }),
  ],
})
