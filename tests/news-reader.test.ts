import assert from 'node:assert/strict'
import test from 'node:test'

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://news-fixture.invalid'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.NEXT_PUBLIC_TENANT_ID = 'tenant-a'
const { dbArticles } = require('../lib/unified-content')
const originalFetch = globalThis.fetch
const row = { id: 'article-a', slug: 'rf-adapter', title: '', excerpt: '', content: '',
  title_i18n: { en: 'RF Adapter', zh: '射频适配器' }, excerpt_i18n: { en: 'English summary' },
  content_i18n: { en: '<h1>Overview</h1><p>50 ohm</p><script>alert(1)</script>' },
  published_at: '2026-09-14T00:00:00Z', updated_at: '2026-09-14T01:00:00Z', featured_image: null }

test('published i18n-only articles retain their title, summary and safe body', async () => {
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input))
    if (url.pathname.endsWith('/tenants')) return Response.json({ default_language: 'en' })
    assert.equal(url.searchParams.get('tenant_id'), 'eq.tenant-a')
    assert.equal(url.searchParams.get('is_published'), 'eq.true')
    assert.equal(init?.cache, 'no-store')
    return Response.json([row])
  }
  try {
    const articles = await dbArticles()
    assert.equal(articles?.[0].title, 'RF Adapter')
    assert.equal(articles?.[0].excerpt, 'English summary')
    assert.equal(articles?.[0].content, '<h2>Overview</h2><p>50 ohm</p>')
  } finally { globalThis.fetch = originalFetch }
})

test('requested language wins and missing fields fall back without discarding legacy content', async () => {
  globalThis.fetch = async input => String(input).includes('/tenants')
    ? Response.json({ default_language: 'en' })
    : Response.json([{ ...row, excerpt: 'Legacy summary', excerpt_i18n: { zh: ' ' } }])
  try {
    const articles = await dbArticles('zh')
    assert.equal(articles?.[0].title, '射频适配器')
    assert.equal(articles?.[0].excerpt, 'Legacy summary')
  } finally { globalThis.fetch = originalFetch }
})

test('database failure is reported rather than returning a demo fallback sentinel', async () => {
  globalThis.fetch = async () => Response.json({ message: 'unavailable' }, { status: 503 })
  try { await assert.rejects(() => dbArticles()) }
  finally { globalThis.fetch = originalFetch }
})

test('all published pages are read without silently truncating the news catalogue', async () => {
  globalThis.fetch = async input => {
    const url = new URL(String(input))
    if (url.pathname.endsWith('/tenants')) return Response.json([{ default_language: 'en' }])
    const offset = Number(url.searchParams.get('offset'))
    assert.equal(url.searchParams.get('tenant_id'), 'eq.tenant-a')
    assert.equal(url.searchParams.get('is_published'), 'eq.true')
    return Response.json(offset === 0 ? Array.from({ length: 500 }, (_, i) => ({ ...row, id: `article-${i}` })) : [{ ...row, id: 'last' }])
  }
  try {
    const articles = await dbArticles()
    assert.equal(articles.length, 501)
    assert.equal(articles[500]._id, 'last')
  } finally { globalThis.fetch = originalFetch }
})
