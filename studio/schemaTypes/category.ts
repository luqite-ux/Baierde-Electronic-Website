import {defineType, defineField} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: R => R.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: R => R.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'image', title: 'Card Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
  ],
})
