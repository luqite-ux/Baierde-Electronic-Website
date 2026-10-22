import assert from 'node:assert/strict'
import test from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Footer } from '../components/footer'

const expectedLinks = [
  ['Facebook', 'https://www.facebook.com/profile.php?id=61591334247866'],
  ['Instagram', 'https://www.instagram.com/baierdedianzi?igsh=azV5b2Fpb2J4dDZm&utm_source=qr'],
  ['YouTube', 'https://youtube.com/@baierde-j6t?si=hlAmijzKjnBHuCG7'],
  ['TikTok', 'https://www.tiktok.com/@baierde?_r=1&_t=ZS-93dNPyv4G0b'],
  ['LinkedIn', 'https://www.linkedin.com/in/bai-erde-2895173b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'],
  ['X', 'https://x.com/baierdeelennkd?s=21'],
] as const

test('footer exposes every supplied social profile as a safe accessible external link', () => {
  const html = renderToStaticMarkup(<Footer />).replaceAll('&amp;', '&')

  for (const [label, href] of expectedLinks) {
    const anchor = html.match(new RegExp(`<a[^>]+aria-label="Visit Baierde Electronic on ${label}"[^>]*>`))?.[0]
    assert.ok(anchor, `${label} accessible link is missing`)
    assert.ok(anchor.includes(`href="${href}"`), `${label} URL is missing`)
    assert.ok(anchor.includes('target="_blank"'), `${label} must open in a new tab`)
    assert.ok(anchor.includes('rel="noopener noreferrer"'), `${label} must isolate the new tab`)
  }
})
