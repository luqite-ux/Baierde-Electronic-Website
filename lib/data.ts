// Data fetching functions - currently using mock data, ready for Sanity integration

import { mockProducts, mockBlogPosts, type Product, type BlogPost } from "./mock-data"
import { getProductBySlug as getSanityProductBySlug } from "./sanity.data"

export async function getProducts(): Promise<Product[]> {
  // TODO: Replace with Sanity query
  // const products = await client.fetch('*[_type == "product"]');
  return mockProducts
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const mock = mockProducts.find((p) => p.slug === slug)
  if (!mock) return undefined
  // 从 Sanity 拉取产品视频，合并到 mock 数据，便于详情页展示
  try {
    const sanityProduct = await getSanityProductBySlug(slug)
    if (sanityProduct?.productVideo) {
      return { ...mock, productVideo: sanityProduct.productVideo }
    }
  } catch {
    // 忽略 Sanity 请求失败，仅使用 mock
  }
  return mock
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // TODO: Replace with Sanity query
  return mockProducts.filter((p) => p.category === category)
}

export async function getProductsBySeries(series: string): Promise<Product[]> {
  // TODO: Replace with Sanity query
  return mockProducts.filter((p) => p.series?.toLowerCase() === series.toLowerCase())
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // TODO: Replace with Sanity query
  return mockBlogPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // TODO: Replace with Sanity query
  return mockBlogPosts.find((p) => p.slug === slug)
}

export async function getRelatedProducts(productId: string, series?: string, category?: string): Promise<Product[]> {
  // TODO: Replace with Sanity query
  // Get products from same series or same category, excluding current product
  const related = mockProducts.filter((p) => {
    if (p._id === productId) return false
    if (series && p.series?.toLowerCase() === series.toLowerCase()) return true
    if (category && p.category === category) return true
    return false
  })
  return related.slice(0, 4) // Limit to 4 related products
}
