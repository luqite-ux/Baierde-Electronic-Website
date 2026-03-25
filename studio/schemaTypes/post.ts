import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog & Insights',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, media, publishedAt}: {title?: string; media?: any; publishedAt?: string}) {
      return {
        title: title || 'Untitled',
        media,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : undefined,
      }
    },
  },
})

