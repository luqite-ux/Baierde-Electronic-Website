import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getConnectorProducts } from "@/lib/sanity.data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SMA Connectors | DC-18GHz RF Connectors | Baierde Electronic",
  description:
    "Professional SMA connectors for high-frequency applications. Straight, right angle, male/female configurations. IEC certified quality.",
  alternates: {
    canonical: "https://brdelectronic.com/products/connectors/sma",
  },
}

export default async function SMASeriesPage() {
  const smaProducts = await getConnectorProducts({ series: ["SMA"] })

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "SMA Connector Series",
            description:
              "SubMiniature version A (SMA) connectors for applications up to 18GHz. Threaded coupling for secure connections.",
            url: "https://brdelectronic.com/products/connectors/sma",
          }),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "RF Connectors", href: "/products/connectors" },
          { label: "SMA Series" },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">SMA Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          SubMiniature version A (SMA) connectors are the most widely used RF connector type for applications up to
          18GHz. Featuring threaded coupling for secure connections and excellent electrical performance.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Range:</span>
                <span className="font-medium">DC - 18GHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impedance:</span>
                <span className="font-medium">50Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coupling:</span>
                <span className="font-medium">Threaded</span>
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
            <h3 className="text-xl font-semibold mb-3">Applications</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Telecommunications equipment</li>
              <li>• Test and measurement instruments</li>
              <li>• Microwave systems</li>
              <li>• Wireless infrastructure</li>
              <li>• Aerospace and defense</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Available Configurations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Straight Male/Female</li>
              <li>• Right Angle Male/Female</li>
              <li>• PCB Mount</li>
              <li>• Bulkhead</li>
              <li>• Cable Mount</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Baierde SMA Connectors?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">IEC/GB Certified Quality</h3>
            <p className="text-muted-foreground">
              All SMA connectors manufactured to international standards with 100% inspection using network analyzers
              and precision test equipment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Precision Machining</h3>
            <p className="text-muted-foreground">
              CNC-machined brass bodies with gold or nickel plating ensure consistent performance and long service life.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Custom Configurations</h3>
            <p className="text-muted-foreground">
              OEM/ODM services available for special plating, materials, or unique mounting requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Standard products ship within 7-15 days, with expedited options available for urgent projects.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">SMA Connector Products</h2>
        {smaProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {smaProducts.map((product) => (
              <Link
                key={product._id}
                href={product.slug ? `/products/connectors/${product.slug}` : "#"}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=300&width=300&query=SMA+RF+connector"}
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
          <p className="text-muted-foreground">暂无 SMA 系列产品，请稍后在 Sanity 中添加。</p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Link href="/products/adapters">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMA Adapters</h3>
                <p className="text-sm text-muted-foreground">Gender changers and inter-series adapters</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/cable-assemblies">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMA Cable Assemblies</h3>
                <p className="text-sm text-muted-foreground">Pre-terminated cables with SMA connectors</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/mmcx">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MMCX Connectors</h3>
                <p className="text-sm text-muted-foreground">Compact alternative for space-limited designs</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/smp">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMP Connectors</h3>
                <p className="text-sm text-muted-foreground">High-frequency option up to 40GHz</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need SMA Connectors for Your Project?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get a quote for SMA connectors with competitive pricing and fast delivery. Our team is ready to assist with
          technical specifications and custom requirements.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Quote</Link>
        </Button>
      </div>
    </div>
  )
}
