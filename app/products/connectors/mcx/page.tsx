import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { getProductsBySeries } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCX Connectors | Miniature Coaxial Connectors | Baierde",
  description: "MCX connectors with snap-on coupling for quick connections. DC-6GHz frequency range, compact design.",
  alternates: {
    canonical: "https://brdelectronic.com/products/connectors/mcx",
  },
}

export default async function MCXSeriesPage() {
  const mcxProducts = await getProductsBySeries("MCX")

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "MCX Connector Series",
            description: "Miniature coaxial connectors with snap-on coupling mechanism for quick RF connections.",
            url: "https://brdelectronic.com/products/connectors/mcx",
          }),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: "RF Connectors", href: "/products/connectors" },
          { label: "MCX Series" },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">MCX Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Miniature Coaxial (MCX) connectors feature a unique snap-on coupling mechanism for quick, tool-free
          connections. Ideal for applications requiring frequent mating and unmating up to 6GHz.
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
                <span className="font-medium">50Ω / 75Ω</span>
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
              <li>• GPS systems and navigation</li>
              <li>• Wireless communication modules</li>
              <li>• RF test equipment</li>
              <li>• Set-top boxes</li>
              <li>• Portable devices</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Key Advantages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Quick snap-on connection</li>
              <li>• Compact 30% smaller than SMA</li>
              <li>• Available in 50Ω and 75Ω</li>
              <li>• Straight and right angle</li>
              <li>• Excellent durability</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Baierde MCX Connectors?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Reliable Snap-On Design</h3>
            <p className="text-muted-foreground">
              Precision-engineered snap coupling provides secure connections with audible feedback for proper mating.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Dual Impedance Options</h3>
            <p className="text-muted-foreground">
              Available in both 50Ω (RF) and 75Ω (video) impedance to match your application requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quality Manufacturing</h3>
            <p className="text-muted-foreground">
              CNC-machined bodies with gold plating ensure low insertion loss and consistent electrical performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Application Support</h3>
            <p className="text-muted-foreground">
              Technical team available to assist with connector selection and custom configuration requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">MCX Connector Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mcxProducts.map((product) => (
            <Link key={product._id} href={`/products/detail/${product.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=300&width=300&query=MCX+RF+connector"}
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
          <Link href="/products/connectors/mmcx">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MMCX Connectors</h3>
                <p className="text-sm text-muted-foreground">Even more compact snap-on option</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/connectors/smb">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">SMB Connectors</h3>
                <p className="text-sm text-muted-foreground">Similar snap-on design, slightly larger</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/cable-assemblies">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MCX Cable Assemblies</h3>
                <p className="text-sm text-muted-foreground">Pre-terminated cables with MCX connectors</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/products/adapters">
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">MCX Adapters</h3>
                <p className="text-sm text-muted-foreground">Convert MCX to other connector types</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Need MCX Connectors for Your Application?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Request a quote for MCX connectors with competitive pricing and fast delivery. We offer both 50Ω and 75Ω
          options to match your requirements.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request Quote</Link>
        </Button>
      </div>
    </div>
  )
}
