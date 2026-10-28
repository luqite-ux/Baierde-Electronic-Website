import test from 'node:test'
import assert from 'node:assert/strict'
import reader from '../lib/site-content/reader.ts'
const { contentReader } = reader
import transport from '../lib/site-content/transport.ts'
import protection from '../lib/site-content/preview-protection.ts'
import origin from '../lib/site-content/form-origin.ts'
const { loadSiteSnapshot } = transport
const { protectPreviewResponse } = protection
const { allowsPreviewFormOrigin } = origin

test('published text and typography use the same module; missing fields preserve existing design', () => {
  const copy = contentReader([{key:'hero', type:'hero', values:{title:'Published title'}, styles:{title:{fontSizeDesktop:52}}}])
  assert.equal(copy.text('hero','title','Original'), 'Published title')
  assert.equal(copy.text('hero','body','Original body'), 'Original body')
  assert.equal(copy.style('hero','title')['--hq-font-size-desktop'], '52px')
  assert.equal(copy.style('hero','body'), undefined)
})
test('navigation uses stable rows and only accepts internal or HTTPS destinations', () => {
  const copy = contentReader([{key:'navigation', type:'navigation', values:{items:[{id:'home',label:'Start',href:'/about'},{id:'bad',label:'Bad',href:'javascript:alert(1)'}]}}])
  assert.equal(copy.nav('home','Home'), 'Start')
  assert.equal(copy.href('home','/'), '/about')
  assert.equal(copy.href('bad','/'), '/')
})

test('unpublished public content falls back; an expired preview never falls back', async () => {
  const config = { adminUrl:'https://admin.globle-trade.com',tenantId:'tenant',domain:'www.brdelectronic.com',integrationKey:'test-only' }
  assert.equal(await loadSiteSnapshot(config,'en',null,async () => new Response('',{status:404})),null)
  await assert.rejects(loadSiteSnapshot(config,'en','expired',async (url,init) => {
    assert.equal(init.cache,'no-store')
    assert.equal(init.method,'POST')
    assert.equal(new URL(url).search,'')
    return new Response('',{status:403})
  }), /preview denied or expired/i)
})
test('preview disables browser and CDN caches, indexing, and referrers', () => {
  const headers = new Headers()
  protectPreviewResponse(headers,true)
  for (const name of ['Cache-Control','CDN-Cache-Control','Vercel-CDN-Cache-Control']) assert.match(headers.get(name),/no-store/)
  assert.match(headers.get('X-Robots-Tag'),/noindex/)
  assert.equal(headers.get('Referrer-Policy'),'no-referrer')
})
test('preview forms reject cross-site or missing origin without same-origin fetch metadata', () => {
  assert.equal(allowsPreviewFormOrigin(new Headers({origin:'https://evil.example'}),'https://www.brdelectronic.com'),false)
  assert.equal(allowsPreviewFormOrigin(new Headers(),'https://www.brdelectronic.com'),false)
  assert.equal(allowsPreviewFormOrigin(new Headers({origin:'null','sec-fetch-site':'same-origin'}),'https://www.brdelectronic.com'),true)
})
