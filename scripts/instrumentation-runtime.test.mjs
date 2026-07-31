import assert from 'node:assert/strict'
import test from 'node:test'
import { getGlobalDispatcher, setGlobalDispatcher } from 'undici'

const instrumentationModule = await import('../instrumentation.ts')
const register = instrumentationModule.register ?? instrumentationModule.default?.register

test('does not install the Node.js proxy dispatcher in the Edge runtime', async () => {
  const originalRuntime = process.env.NEXT_RUNTIME
  const originalDispatcher = getGlobalDispatcher()

  try {
    process.env.NEXT_RUNTIME = 'edge'
    await register()
    assert.equal(getGlobalDispatcher(), originalDispatcher)
  } finally {
    setGlobalDispatcher(originalDispatcher)
    if (originalRuntime === undefined) delete process.env.NEXT_RUNTIME
    else process.env.NEXT_RUNTIME = originalRuntime
  }
})
