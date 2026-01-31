import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: '佰尔得',

  projectId: '746jvz7j',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Inquiries')
              .id('inquiry')
              .child(
                S.documentTypeList('inquiry').defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
              ),
            S.documentTypeListItem('category'),
            S.documentTypeListItem('series'),
            S.documentTypeListItem('product'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
