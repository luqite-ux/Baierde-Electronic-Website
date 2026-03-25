import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '746jvz7j',
    dataset: 'production'
  },
  deployment: {
    appId: 'r3gx4ewvj7tzc10mv1zgk7vv',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  }
})
