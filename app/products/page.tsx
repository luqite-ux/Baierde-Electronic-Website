import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/data"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Product Catalog</h1>
      <p className="text-muted-foreground mb-10">
        Browse all products. Click any item to view details and request a quote.
      </p>

      {products.length === 0 ? (
        <div className="p-6 border rounded-lg text-sm">
          No products found. Please check <code>data/products.seed.with-images.json</code> and{" "}
          <code>lib/data.ts</code>.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p: any) => {
            const title = p.title || p.name || p.productName || "Untitled"
            const desc = p.shortDescription || p.short_description || p.summary || p.description || ""
            const slug = p.slug
            if (!slug) return null

            // ✅ 关键修复：兼容 images[0] 为 string 或 {src, alt}
            const firstImage = p.images?.[0]
            const imgSrc =
              typeof firstImage === "string"
                ? firstImage
                : firstImage && typeof firstImage === "object" && "src" in firstImage
                  ? (firstImage as any).src
                  : typeof p.image === "string"
                    ? p.image
                    : "/placeholder.svg"

            const imgAlt =
              firstImage && typeof firstImage === "object" && (firstImage as any).alt
                ? (firstImage as any).alt
                : title

            return (
              <Link
                key={p._id || slug}
                href={`/products/${slug}`}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-muted">
                  <Image src={imgSrc} alt={imgAlt} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-semibold line-clamp-2">{title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{desc}</div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
