import sanitizeHtml from 'sanitize-html'

export function localized(value, locale, defaultLanguage, legacy = '') {
  const values = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  return [values[locale], values[defaultLanguage], ...Object.values(values), legacy]
    .find(item => typeof item === 'string' && item.trim()) || ''
}

export function safeArticleHtml(value) {
  return sanitizeHtml(value || '', {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan', 'scope'] },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    transformTags: { h1: 'h2' },
  })
}
