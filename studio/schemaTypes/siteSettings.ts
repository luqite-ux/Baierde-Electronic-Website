import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'catalogFile',
      title: 'Product Catalog File',
      type: 'file',
      description: 'Global product catalog download for the website',
    }),
  ],
  preview: {
    select: {
      fileName: 'catalogFile.asset.originalFilename',
    },
    prepare({fileName}) {
      return {
        title: 'Site Settings',
        subtitle: fileName || 'No catalog file uploaded',
      }
    },
  },
})
