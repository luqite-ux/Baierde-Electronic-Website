import { defineType, defineField } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  orderings: [
    {
      name: 'createdAtDesc',
      title: 'Created at (newest first)',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'productSlug',
      title: 'Product Slug',
      type: 'string',
    }),
    defineField({
      name: 'attachmentFileName',
      title: 'Attachment File Name',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Quoted', value: 'quoted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
