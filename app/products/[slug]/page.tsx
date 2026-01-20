import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ProductQuoteForm from "@/components/product-quote-form" 
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data"
import { Download, Mail, FileText, Package, Cog } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }

  const url = `https://brdelectronic.com/products/${slug}`
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: url,
      siteName: "Baierde Electronic",
      images: [{ url: product.images[0] || "/placeholder.svg", width: 1200, height: 630, alt: product.title }],
      locale: "en_US",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const categoryNames: Record<string, string> = {
    connectors: "RF Coaxial Connectors",
    adapters: "RF Adapters",
    "cable-assemblies": "RF Cable Assemblies",
  }

  const relatedProducts = await getRelatedProducts(product._id, product.series, product.category)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryNames[product.category] || "Category", href: `/products/${product.category}` },
    { label: product.title, href: `/products/${slug}` },
  ]

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems.slice(1)} />

        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.title} fill className="object-cover" priority />
            </div>
          </div>

          <div className="space-y-6">
            {product.series && <Badge variant="secondary">{product.series} Series</Badge>}
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg text-muted-foreground">{product.shortDescription}</p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg"><a href="#request-quote">Request a Quote</a></Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">Specifications</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b pb-2 text-sm">
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 表单部分 - 核心修复点 */}
        <div id="request-quote" className="mb-16 scroll-mt-8">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Request a Quote for {product.title}</h2>
              <ProductQuoteForm product={product.title} />
            </CardContent>
          </Card>
        </div>

        {/* 相关产品列表可保留你之前的代码 */}
      </div>
    </>
  )
}