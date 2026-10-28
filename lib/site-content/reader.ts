import { siteTypographyStyle } from './typography'
import type { SiteSnapshot } from './transport'

export type ContentModules = SiteSnapshot['pages'][number]['modules']
export function contentReader(modules: ContentModules = []) {
  const module = (key: string) => modules.find(item => item.key === key)
  const row = (id: string) => {
    const values = module('navigation')?.values
    for (const group of ['items', 'subitems', 'captions']) {
      const items = values?.[group]
      if (Array.isArray(items)) {
        const found = items.find(item => item?.id === id)
        if (found) return found
      }
    }
  }
  return {
    text(group: string, key: string, fallback: string) {
      const value = module(group)?.values[key]
      return typeof value === 'string' ? value : fallback
    },
    style(group: string, key: string) {
      return siteTypographyStyle(module(group)?.styles, key, { 'site-sans': 'var(--font-sans)' })
    },
    nav(id: string, fallback: string) { return typeof row(id)?.label === 'string' ? row(id).label : fallback },
    href(id: string, fallback: string) {
      const value = row(id)?.href
      return typeof value === 'string' && (/^\/(?!\/)/.test(value) || /^https:\/\//.test(value)) ? value : fallback
    },
  }
}
