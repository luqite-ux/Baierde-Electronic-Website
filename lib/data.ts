// lib/data.ts
import { PRODUCTS, type Product } from "@/data/products"

// ==========================================
// 原有的产品 (Product) 相关函数 (保持不变)
// ==========================================

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

// ==========================================
// 新增：博客 (Blog) 相关函数 (修复报错的关键)
// ==========================================

// 1. 定义博客文章的类型接口 (你可以根据实际情况修改字段)
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

// 2. 模拟一些博客数据 (后续你可以把这些移到 "@/data/posts" 并导入)
const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    excerpt: "This is my first blog post.",
    date: "2024-01-01",
    content: "Welcome to my blog based on Next.js!"
  },
  {
    slug: "nextjs-tutorial",
    title: "Learning Next.js",
    excerpt: "A guide to Next.js 14.",
    date: "2024-02-15",
    content: "Next.js is a React framework for production..."
  }
];

// 3. 导出获取所有博客文章的函数
export async function getBlogPosts(): Promise<BlogPost[]> {
  // 这里返回所有文章
  return BLOG_POSTS;
}

// 4. 导出根据 Slug 获取单篇博客文章的函数
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  // 查找匹配 slug 的文章
  return BLOG_POSTS.find((post) => post.slug === slug);
}