import assert from 'node:assert/strict'
import test from 'node:test'

const configUrl = new URL('../next.config.mjs', import.meta.url)

async function loadConfig(cacheKey) {
  return (await import(`${configUrl.href}?test=${cacheKey}`)).default
}

test('keeps the Sanity Studio proxy and adds the customer admin proxy', async () => {
  process.env.NEXT_PUBLIC_ADMIN_URL = '  https://admin.globle-trade.com/\r\n'

  const config = await loadConfig('admin-enabled')
  const rewrites = await config.rewrites()

  assert.deepEqual(rewrites, {
    afterFiles: [
      { source: '/studio', destination: 'https://brdelectronic.sanity.studio' },
      { source: '/studio/:path*', destination: 'https://brdelectronic.sanity.studio/:path*' },
      { source: '/admin', destination: 'https://admin.globle-trade.com/admin' },
      { source: '/admin/:path*', destination: 'https://admin.globle-trade.com/admin/:path*' },
      { source: '/api/admin/:path*', destination: 'https://admin.globle-trade.com/api/admin/:path*' },
    ],
  })
})

test('keeps the Sanity Studio proxy when the admin origin is not configured', async () => {
  delete process.env.NEXT_PUBLIC_ADMIN_URL

  const config = await loadConfig('admin-disabled')
  const rewrites = await config.rewrites()

  assert.deepEqual(rewrites, {
    afterFiles: [
      { source: '/studio', destination: 'https://brdelectronic.sanity.studio' },
      { source: '/studio/:path*', destination: 'https://brdelectronic.sanity.studio/:path*' },
    ],
  })
})
