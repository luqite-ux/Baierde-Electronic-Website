import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getProductsBySeries } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SMP Connectors | Sub-Miniature Push-On Connectors | Baierde",
  description:
    "High-frequency SMP connectors with push-on design. DC-40GHz for high-density applications, blind-mate capable.",
  alternates: {
    canonical: "https://brdelectronic.com/products/connectors/smp",
  },
}

export default async function SMPSeriesPage() {
  const smpProducts = await getProductsBySeries("SMP")

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "SMP Connector Series",
            description:
              "Sub-Miniature Push-On connectors for high-frequency applications up to 40GHz with minimal footprint.",
            url: "https://brdelectronic.com/products/connectors/smp",
          }),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "RF Connectors", href: "/products/connectors" },
          { label: "SMP Series" },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">SMP Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Sub-Miniature Push-On (SMP) connectors deliver exceptional performance up to 40GHz in an ultra-compact form
          factor. Perfect for high-density board-to-board connections and aerospace applications.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Range:</span>
                <span className="font-medium">DC - 40GHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impedance:</span>
                <span className="font-medium">50Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coupling:</span>
                <span className="font-medium">Push-On</span>
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
              <li>• 5G/mmWave test equipment</li>
              <li>• Aerospace and defense systems</li>
              <li>• High-speed digital applications</li>
              <li>• Phase array antennas</li>
              <li>• High-density PCB interconnects</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Key Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ultra-high frequency to 40GHz</li>
              <li>• Minimal board footprint</li>
              <li>• Blind-mate capability</li>
              <li>• Low insertion loss</li>
              <li>• High density board layouts</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Baierde SMP Connectors?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">40GHz Performance</h3>
            <p className="text-muted-foreground">
              Precision engineering ensures excellent electrical performance at mmWave frequencies for 5G and advanced
              applications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Space Efficiency</h3>
            <p className="text-muted-foreground">
              Smallest footprint among high-frequency connectors enables maximum channel density on PCBs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Blind-Mate Design</h3>
            <p className="text-muted-foreground">
              Self-aligning push-on design allows for blind-mate connections in modular systems and test fixtures.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Aerospace Quality</h3>
            <p className="text-muted-foreground">
              Military-grade materials and processing ensure reliability in demanding aerospace and defense
              applications.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">SMP Connector Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {smpProducts.map((product) => (
            <Link key={product._id} href={`/products/detail/${product.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=300&width=300&query=SMP+RF+connector"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="rounded-lg mb-3 w-full aspect-square object-cover"
                  />
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Link href="/products/connectors/smpm">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMPM Connectors</h3>
                <p className="text-sm text-muted-foreground">Modified SMP with detent for secure mating</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/sma">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMA Connectors</h3>
                <p className="text-sm text-muted-foreground">Larger threaded option to 18GHz</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/adapters">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMP Adapters</h3>
                <p className="text-sm text-muted-foreground">Convert SMP to other connector types</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/cable-assemblies">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMP Cable Assemblies</h3>
                <p className="text-sm text-muted-foreground">High-frequency cables with SMP connectors</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need SMP Connectors for High-Frequency Applications?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Request a quote for SMP connectors with 40GHz performance. Our engineering team can assist with connector
          selection for 5G, aerospace, and mmWave applications.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Quote</Link>
        </Button>
      </div>
    </div>
  )
}
