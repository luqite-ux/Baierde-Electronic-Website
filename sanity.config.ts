/**
 * 仅供前台读取 Sanity 数据用（projectId / dataset / apiVersion）。
 * Studio 为独立应用，配置在 studio/sanity.config.ts。
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
