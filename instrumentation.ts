export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { EnvHttpProxyAgent, setGlobalDispatcher } = await import('undici')
  setGlobalDispatcher(new EnvHttpProxyAgent())
}
