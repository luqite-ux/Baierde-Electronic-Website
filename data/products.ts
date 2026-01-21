// data/products.ts
import raw from "./products.seed.with-images.json"

export type ProductImage = string | { src: string; alt?: string }

export type ProductSpec = { label: string; value: string }

export type Product = {
  _id: string
  slug: string
  title: string
  shortDescription: string
  category: string
  series?: string
  images: ProductImage[]
  specs: ProductSpec[]
  seo: {
    title: string
    description: string
  }
}

/**
 * 统一把 seed 里的各种字段名“归一化”
 * 这样页面就不会因为字段名不一致而空白/404。
 */
function normalizeOne(p: any, idx: number): Product {
  const title =
    p.title || p.name || p.productName || p["产品名称"] || p["型号"] || `Product ${idx + 1}`

  const slug =
    p.slug ||
    p.handle ||
    p["Slug"] ||
    String(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const category =
    p.category || p.cat || p["Category"] || p["分类"] || "products"

  const series =
    p.series || p["Series"] || p["系列"] || ""

  const shortDescription =
    p.shortDescription ||
    p.short_description ||
    p.summary ||
    p.description ||
    p["简要描述"] ||
    ""

  const images = (p.images || p.image || p["图片"] || []) as any
  const imagesArray: ProductImage[] = Array.isArray(images) ? images : [images]
  const safeImages = imagesArray
    .filter(Boolean)
    .map((img: any) => {
      if (typeof img === "string") return img
      if (img && typeof img === "object" && img.src) return { src: img.src, alt: img.alt || title }
      return "/placeholder.svg"
    })

  const specsRaw = p.specs || p["规格"] || []
  const specs: ProductSpec[] = Array.isArray(specsRaw)
    ? specsRaw
        .filter(Boolean)
        .map((s: any) => ({
          label: String(s.label ?? s["参数"] ?? s["label"] ?? "").trim(),
          value: String(s.value ?? s["值"] ?? s["value"] ?? "").trim(),
        }))
        .filter((s) => s.label && s.value)
    : []

  const seoTitle =
    p?.seo?.title || p.seoTitle || `${title} | Baierde`

  const seoDesc =
    p?.seo?.description || p.seoDescription || shortDescription || `${title} product details.`

  return {
    _id: String(p._id || p.id || slug),
    slug,
    title,
    shortDescription,
    category,
    series: series || undefined,
    images: safeImages.length ? safeImages : ["/placeholder.svg"],
    specs,
    seo: { title: seoTitle, description: seoDesc },
  }
}

export const PRODUCTS: Product[] = (raw as any[]).map(normalizeOne)
