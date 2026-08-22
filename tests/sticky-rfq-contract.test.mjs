import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import test from 'node:test'

const root = fileURLToPath(new URL('..', import.meta.url))
const stickySource = readFileSync(path.join(root, 'components/sticky-rfq.tsx'), 'utf8')

test('fixed RFQ shortcut cannot obstruct mobile CAPTCHA or form actions', () => {
  const fixedWrapper = stickySource
    .split(/\r?\n/)
    .find((line) => line.includes('fixed') && line.includes('bottom-'))

  assert.ok(fixedWrapper, 'missing fixed RFQ wrapper')
  assert.match(fixedWrapper, /\bhidden\b/, 'fixed RFQ shortcut must be hidden at the mobile breakpoint')
  assert.match(fixedWrapper, /\bmd:flex\b/, 'fixed RFQ shortcut should remain available on desktop')
})
