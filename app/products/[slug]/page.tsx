import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductQuoteForm from "@/components/product-quote-form"
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data"
import type { Metadata } from "next"

interface ProductPageProps {
  params: { slug: string }
}

// 兼容 images: string | {src, alt}
function getImgSrc(img: any): string {
  if (!img) return "/placeholder.svg"
  if (typeof img === "string") return img
  if (typeof img === "object" && img.src) return img.src
  return "/placeholder.svg"
}
function getImgAlt(img: any, fallback: string): string {
  if (!img) return fallback
  if (typeof img === "object" && img.alt) return img.alt
  return fallback
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: "Product Not Found" }

  const url = `https://brdelectronic.com/products/${product.slug}`
  const title = product.seo?.title || `${product.title} | Baierde`
  const description =
    product.seo?.description ||
    product.shortDescription ||
    `View specifications and request a quote for ${product.title}.`

  const ogImg = getImgSrc(product.images?.[0])

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Baierde Electronic",
      images: [{ url: ogImg, width: 1200, height: 630, alt: product.title }],
      locale: "en_US",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const list = await getProducts()
  return list.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product._id, product.series, product.category)

  const categoryNames: Record<string, string> = {
    connectors: "RF Coaxial Connectors",
    adapters: "RF Adapters",
    "cable-assemblies": "RF Cable Assemblies",
    products: "Products",
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryNames[product.category] || "Category", href: `/products/${product.category}` },
    { label: product.title, href: `/products/${product.slug}` },
  ]

  const coverImg = product.images?.[0]
  const coverSrc = getImgSrc(coverImg)
  const coverAlt = getImgAlt(coverImg, product.title)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems.slice(1)} />

      <div className="grid gap-12 lg:grid-cols-2 mb-16">
        {/* 左侧：图片 */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image src={coverSrc} alt={coverAlt} fill className="object-cover" priority />
          </div>

          {/* 额外图片（最多4张） */}
          {product.images && product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img: any, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-muted">
                  <Image
                    src={getImgSrc(img)}
                    alt={getImgAlt(img, product.title)}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* 右侧：标题/描述/规格 */}
        <div className="space-y-6">
          {product.series ? <Badge variant="secondary">{product.series} Series</Badge> : null}

          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>

          <p className="text-lg text-muted-foreground">
            {product.shortDescription || "Request a quote to get pricing, lead time and availability."}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="#request-quote">Request a Quote</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>

          {product.specs && Array.isArray(product.specs) && product.specs.length ? (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {product.specs.map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between border-b pb-2 text-sm">
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      {/* RFQ 表单 */}
      <div id="request-quote" className="mb-16 scroll-mt-8">
        <Card className="border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Request a Quote for {product.title}</h2>
            <ProductQuoteForm product={product.title} />
          </CardContent>
        </Card>
      </div>

      {/* 相关产品 */}
      {relatedProducts.length ? (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p: any) => {
              const img0 = p.images?.[0]
              return (
                <Link key={p.slug} href={`/products/${p.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-5">
                      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={getImgSrc(img0)}
                          alt={getImgAlt(img0, p.title)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-semibold leading-snug">{p.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{p.series || ""}</div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
