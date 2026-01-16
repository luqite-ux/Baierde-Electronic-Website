import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getProductsBySeries } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BNC Connectors | Bayonet Neill-Concelman Connectors | Baierde",
  description:
    "BNC connectors with bayonet coupling for test instrumentation. DC-4GHz, quick-lock mechanism, 50Ω and 75Ω.",
  alternates: {
    canonical: "https://brdelectronic.com/products/connectors/bnc",
  },
}

export default async function BNCSeriesPage() {
  const bncProducts = await getProductsBySeries("BNC")

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "BNC Connector Series",
            description:
              "Bayonet Neill-Concelman connectors for test equipment and instrumentation with quick-lock coupling.",
            url: "https://brdelectronic.com/products/connectors/bnc",
          }),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "RF Connectors", href: "/products/connectors" },
          { label: "BNC Series" },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">BNC Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Bayonet Neill-Concelman (BNC) connectors are industry-standard RF connectors featuring quick bayonet coupling
          for secure, tool-free connections in test equipment and video applications.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Range:</span>
                <span className="font-medium">DC - 4GHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impedance:</span>
                <span className="font-medium">50Ω / 75Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coupling:</span>
                <span className="font-medium">Bayonet</span>
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
              <li>• Test and measurement equipment</li>
              <li>• Oscilloscopes and signal generators</li>
              <li>• Video surveillance systems</li>
              <li>• Broadcast and studio equipment</li>
              <li>• Laboratory instrumentation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Quick bayonet lock (1/4 turn)</li>
              <li>• Secure mechanical connection</li>
              <li>• Both 50Ω (RF) and 75Ω (video)</li>
              <li>• Wide range of configurations</li>
              <li>• Time-tested reliability</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Baierde BNC Connectors?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Proven Reliability</h3>
            <p className="text-muted-foreground">
              BNC remains the standard for test equipment worldwide due to its reliable bayonet coupling and excellent
              performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Universal Compatibility</h3>
            <p className="text-muted-foreground">
              Compatible with standard BNC test equipment and cables from all major manufacturers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quality Construction</h3>
            <p className="text-muted-foreground">
              Precision-machined brass bodies with nickel or gold plating ensure long service life and consistent
              performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Complete Range</h3>
            <p className="text-muted-foreground">
              Full selection of cable, PCB mount, bulkhead, and termination connectors in both impedances.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">BNC Connector Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bncProducts.map((product) => (
            <Link key={product._id} href={`/products/${product.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=300&width=300&query=BNC+RF+connector"}
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
          <Link href="/products/adapters">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">BNC Adapters</h3>
                <p className="text-sm text-muted-foreground">BNC to SMA, N-Type, and other conversions</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/cable-assemblies">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">BNC Cable Assemblies</h3>
                <p className="text-sm text-muted-foreground">Test cables with BNC connectors</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/tnc">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">TNC Connectors</h3>
                <p className="text-sm text-muted-foreground">Threaded version for secure connections</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/sma">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMA Connectors</h3>
                <p className="text-sm text-muted-foreground">Higher frequency alternative to 18GHz</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need BNC Connectors for Test Equipment?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Request a quote for BNC connectors and cable assemblies. We offer both 50Ω and 75Ω versions with fast delivery
          for laboratory and production needs.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Quote</Link>
        </Button>
      </div>
    </div>
  )
}
