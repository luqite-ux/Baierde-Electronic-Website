// lib/data.ts
import { PRODUCTS, type Product } from "@/data/products"

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = PRODUCTS.find((x) => x.slug === slug)
  return p || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.category === category)
}

export async function getProductsBySeries(series: string): Promise<Product[]> {
  return PRODUCTS.filter((p) => (p.series || "").toLowerCase() === series.toLowerCase())
}

export async function getRelatedProducts(
  _id: string,
  series?: string,
  category?: string,
  limit = 8
): Promise<Product[]> {
  const pool = PRODUCTS.filter((p) => p._id !== _id)

  const bySeries = series ? pool.filter((p) => p.series === series) : []
  const byCategory = category ? pool.filter((p) => p.category === category) : []

  const merged = [...bySeries, ...byCategory]
  const uniq = Array.from(new Map(merged.map((p) => [p._id, p])).values())

  return uniq.slice(0, limit)
}
