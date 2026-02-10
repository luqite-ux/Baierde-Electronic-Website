import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getConnectorProducts } from "@/lib/sanity.data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MMCX Connectors | Micro Miniature Coaxial Connectors | Baierde",
  description:
    "Compact MMCX connectors for automotive and mobile applications. DC-6GHz, space-saving design, snap-on coupling.",
  alternates: {
    canonical: "https://brdelectronic.com/products/connectors/mmcx",
  },
}

export default async function MMCXSeriesPage() {
  const mmcxProducts = await getConnectorProducts({ series: ["MMCX"] })

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "MMCX Connector Series",
            description:
              "Micro-Miniature Coaxial connectors for high-density PCB applications with snap-on coupling. DC-6GHz.",
            url: "https://brdelectronic.com/products/connectors/mmcx",
          }),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "RF Connectors", href: "/products/connectors" },
          { label: "MMCX Series" },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">MMCX Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Micro-Miniature Coaxial (MMCX) connectors are designed for high-density PCB applications where space is at a
          premium. Featuring snap-on coupling for quick connections without tools.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Range:</span>
                <span className="font-medium">DC - 6GHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impedance:</span>
                <span className="font-medium">50Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coupling:</span>
                <span className="font-medium">Snap-On</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mating Cycles:</span>
                <span className="font-medium">500+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Typical Use Cases</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Automotive GPS and navigation</li>
              <li>• Mobile device antennas</li>
              <li>• Wireless modules</li>
              <li>• IoT devices</li>
              <li>• Compact consumer electronics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 30% smaller than MCX</li>
              <li>• Tool-free snap-on coupling</li>
              <li>• Right angle available</li>
              <li>• Low profile design</li>
              <li>• PCB and cable mount</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Baierde MMCX Connectors?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Automotive Grade Quality</h3>
            <p className="text-muted-foreground">
              Designed to withstand vibration, temperature cycling, and harsh automotive environments with reliable
              performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Space-Saving Design</h3>
            <p className="text-muted-foreground">
              Ultra-compact footprint allows for high-density PCB layouts in mobile and IoT applications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Consistent Quality</h3>
            <p className="text-muted-foreground">
              100% electrical testing ensures every connector meets specifications for insertion loss and VSWR.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Volume Production</h3>
            <p className="text-muted-foreground">
              High-volume manufacturing capability with competitive pricing for automotive OEM projects.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">MMCX Connector Products</h2>
        {mmcxProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mmcxProducts.map((product) => (
              <Link
                key={product._id}
                href={product.slug ? `/products/connectors/${product.slug}` : "#"}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=300&width=300&query=MMCX+RF+connector"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="rounded-lg mb-3 w-full aspect-square object-cover"
                    />
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription ?? ""}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无 MMCX 系列产品，请稍后在 Sanity 中添加。</p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Link href="/products/connectors/mcx">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MCX Connectors</h3>
                <p className="text-sm text-muted-foreground">Slightly larger snap-on alternative</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/cable-assemblies">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MMCX Cable Assemblies</h3>
                <p className="text-sm text-muted-foreground">Flexible cables with MMCX connectors</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/sma">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMA Connectors</h3>
                <p className="text-sm text-muted-foreground">Higher frequency option to 18GHz</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/adapters">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MMCX Adapters</h3>
                <p className="text-sm text-muted-foreground">Adapt MMCX to other connector types</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need MMCX Connectors for Automotive or Mobile?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get a quote for MMCX connectors with competitive volume pricing. Our engineering team can assist with
          connector selection and custom requirements.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Quote</Link>
        </Button>
      </div>
    </div>
  )
}
