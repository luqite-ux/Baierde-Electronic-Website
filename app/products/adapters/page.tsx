import Link from "next/link"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProductsByCategory } from "@/lib/sanity.data"

export const metadata = {
  title: "RF Adapters | Baierde Electronic",
  description:
    "Professional RF adapters for inter-series connections, gender changes, and specialty configurations. Low insertion loss and excellent VSWR.",
  alternates: { canonical: "https://brdelectronic.com/products/adapters" },
}

export default async function AdaptersPage() {
  let products: Awaited<ReturnType<typeof getProductsByCategory>>
  try {
    products = await getProductsByCategory("adapters")
  } catch {
    products = []
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "RF Adapters",
            description:
              "High-quality RF adapters for seamless connectivity. BNC to SMA, N-Type to SMA, and custom adapter configurations.",
            url: "https://brdelectronic.com/products/adapters",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: "RF Adapters" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">RF Adapters</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Professional RF adapters for inter-series connections, gender changes, and specialty configurations. Low
          insertion loss and excellent VSWR characteristics for reliable signal transmission.
        </p>
      </div>

      <div className="mb-12">
        <p className="text-sm text-muted-foreground mb-6">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {products.map((product) => (
            <Link
              key={product._id}
              href={product.slug ? `/products/connectors/${product.slug}` : "#"}
              className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=300&width=300&query=RF+adapter"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="rounded-lg mb-3 w-full aspect-square object-cover"
                  />
                  {product.seriesName && (
                    <div className="text-xs text-primary font-semibold mb-1">{product.seriesName} Series</div>
                  )}
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  {product.shortDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.frequencyMax != null && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">DC-{product.frequencyMax}GHz</span>
                    )}
                    {product.impedance != null && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">{product.impedance}Ω</span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 && (
        <div className="rounded-lg border bg-muted/30 p-8 text-center text-muted-foreground mb-12">
          <p>暂无 RF Adapters 产品，请先在 Sanity 中为该分类添加产品。</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/products">返回产品总览</Link>
          </Button>
        </div>
      )}

      <div className="mt-12 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Custom Adapter Solutions</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Need a specific adapter configuration not listed here? Our engineering team can design and manufacture
          custom adapters to meet your exact specifications including special impedance matching, unique connector
          combinations, and application-specific requirements.
        </p>
        <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Custom Adapter</Link>
        </Button>
      </div>

      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">RF Adapters for Every Application</h2>
        <p className="text-muted-foreground mb-4">
          RF adapters are essential components for creating seamless connections between different connector series,
          changing gender configurations, or adapting impedance in RF systems. Baierde Electronic manufactures
          precision RF adapters that maintain signal integrity while providing the flexibility needed for complex RF
          installations and test setups.
        </p>
        <p className="text-muted-foreground mb-4">
          Our adapter portfolio includes inter-series adapters (such as BNC to SMA, N-Type to SMA), gender changers
          (male-to-male, female-to-female), right angle adapters, and specialty configurations. Each adapter is
          precision machined to ensure consistent impedance, minimize insertion loss (typically less than 0.2 dB),
          and maintain excellent VSWR characteristics across the specified frequency range.
        </p>
        <p className="text-muted-foreground">
          All adapters are manufactured in our ISO-certified facility using high-quality materials including brass
          bodies with gold or nickel plating and PTFE dielectrics. We perform 100% testing to verify electrical
          performance and mechanical tolerances, ensuring reliable operation in demanding telecommunications,
          aerospace, and test equipment applications.
        </p>
      </div>
    </div>
  )
}
