import { createClient } from '@sanity/client'
import { fetchWithRetry } from './sanity.client'

/**
 * 服务端写入用 Sanity Client（需 SANITY_WRITE_TOKEN）。
 * 仅在后端 API 等环境中使用，切勿在前端或暴露 token 的代码中引用。
 */
export function createSanityWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN!,
    useCdn: false,
    fetch: fetchWithRetry,
  })
}
