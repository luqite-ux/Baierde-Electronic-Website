import {createClient} from '@sanity/client'

const FETCH_TIMEOUT_MS = 10_000
const RETRY_DELAYS_MS = [500, 1500]

/**
 * 兜底重试 fetch：10s 超时，失败后重试 2 次，间隔 500ms、1500ms。
 * 仅用于 server 端（sanity.client / sanity.write），勿在 client 组件中引用。
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  let lastError: unknown
  for (let attempt = 0; attempt <= 2; attempt++) {
    const controller = new AbortController()
    const to = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
      const res = await fetch(input, { ...init, signal: controller.signal })
      clearTimeout(to)
      return res
    } catch (e) {
      clearTimeout(to)
      lastError = e
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]))
      } else {
        throw lastError
      }
    }
  }
  throw lastError
}

/** 服务端读请求用：useCdn: false 直连 api.sanity.io，避免 apicdn.sanity.io 在国内网络 ConnectTimeoutError */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  fetch: fetchWithRetry,
})
