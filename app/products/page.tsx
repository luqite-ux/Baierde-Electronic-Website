import Link from "next/link"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { FileText, Wrench, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "RF Connectors & Cable Assemblies | Product Catalog | Baierde",
  description:
    "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more. IEC certified quality.",
  alternates: {
    canonical: "https://brdelectronic.com/products",
  },
  openGraph: {
    title: "RF Connectors & Cable Assemblies | Product Catalog | Baierde",
    description:
      "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more.",
    url: "https://brdelectronic.com/products",
  },
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "RF Connectors & Cable Assemblies",
            description:
              "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more.",
            url: "https://brdelectronic.com/products",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products" }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">RF Connectors & Cable Assemblies</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Comprehensive range of RF coaxial connectors, adapters, and cable assemblies for telecommunications,
          automotive, medical, and industrial applications. All products manufactured to IEC/GB standards with strict
          quality control.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="grid gap-6 md:grid-cols-3 mb-16">
        <Link href="/products/connectors">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Image
                src="/rf-coaxial-connectors-sma-mmcx-mcx-variety.jpg"
                alt="RF Coaxial Connectors"
                width={400}
                height={250}
                className="rounded-lg mb-4 w-full object-cover aspect-video"
              />
              <h2 className="text-2xl font-semibold mb-2">RF Coaxial Connectors</h2>
              <p className="text-muted-foreground mb-4">
                SMA, MMCX, MCX, BNC, TNC, N-Type connectors for high-frequency applications up to 40GHz
              </p>
              <Button variant="link" className="p-0 text-primary">
                View Connectors →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products/adapters">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Image
                src="/rf-adapters-inter-series-connectors-variety.jpg"
                alt="RF Adapters"
                width={400}
                height={250}
                className="rounded-lg mb-4 w-full object-cover aspect-video"
              />
              <h2 className="text-2xl font-semibold mb-2">RF Adapters</h2>
              <p className="text-muted-foreground mb-4">
                Inter-series adapters and gender changers for seamless RF connectivity between different connector types
              </p>
              <Button variant="link" className="p-0 text-primary">
                View Adapters →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products/cable-assemblies">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Image
                src="/rf-cable-assemblies-coaxial-cables-with-connectors.jpg"
                alt="RF Cable Assemblies"
                width={400}
                height={250}
                className="rounded-lg mb-4 w-full object-cover aspect-video"
              />
              <h2 className="text-2xl font-semibold mb-2">RF Cable Assemblies</h2>
              <p className="text-muted-foreground mb-4">
                Custom cable assemblies with various lengths and connector configurations for any application
              </p>
              <Button variant="link" className="p-0 text-primary">
                View Cable Assemblies →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Popular Series */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Popular Connector Series</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            { name: "SMA Series", freq: "DC-18GHz", href: "/products/connectors/sma" },
            { name: "MMCX Series", freq: "DC-6GHz", href: "/products/connectors/mmcx" },
            { name: "MCX Series", freq: "DC-6GHz", href: "/products/connectors/mcx" },
            { name: "BNC Series", freq: "DC-4GHz", href: "/products/connectors/bnc" },
            { name: "SMP Series", freq: "DC-40GHz", href: "/products/connectors/smp" },
          ].map((series) => (
            <Link key={series.name} href={series.href}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">{series.name}</h3>
                  <p className="text-sm text-muted-foreground">{series.freq}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* How to Choose Guide */}
      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <div className="flex items-start gap-4 mb-4">
          <Wrench className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Choose the Right RF Connector</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. Frequency Range</h3>
                <p className="text-muted-foreground">
                  Match the connector's frequency capability to your application. SMP for up to 40GHz, SMA for 18GHz,
                  MMCX/MCX for 6GHz, BNC for 4GHz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Physical Size</h3>
                <p className="text-muted-foreground">
                  Consider space constraints. MMCX and SSMA for compact designs, SMA for general use, N-Type for high
                  power.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Coupling Mechanism</h3>
                <p className="text-muted-foreground">
                  Threaded (SMA, SMC) for secure connections, snap-on (MCX, SMB) for quick mating, bayonet (BNC) for
                  tool-free locking.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Environment</h3>
                <p className="text-muted-foreground">
                  Assess temperature, vibration, and moisture. We offer ruggedized versions and various plating options
                  for harsh conditions.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="mt-6 bg-transparent">
              <Link href="/contact">Need Help Selecting? Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Download Resources */}
      <div className="mb-16 text-center">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Product Catalog</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Download our complete product catalog with technical specifications, dimensions, and ordering information for
          all RF connectors and cable assemblies.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact?catalog=true">Download Catalog (PDF)</Link>
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Product FAQ</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How do I choose the right RF connector for my application?</h3>
            <p className="text-sm text-muted-foreground">
              Consider your frequency range, impedance requirements (50Ω or 75Ω), space constraints, and environmental
              conditions. Our technical team can provide consultation to help you select the optimal connector series.
              Contact us with your specifications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the difference between SMA and MMCX connectors?</h3>
            <p className="text-sm text-muted-foreground">
              SMA connectors are larger with threaded coupling and support frequencies up to 18GHz, making them ideal
              for telecom and test equipment. MMCX connectors are much more compact with snap-on coupling and support up
              to 6GHz, perfect for automotive and mobile applications where space is limited.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Are datasheets available for all products?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, detailed datasheets with specifications, dimensions, performance characteristics, and materials are
              available for all products. Download them from individual product pages or request them via our contact
              form.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I request custom connector configurations?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. We offer comprehensive OEM/ODM services for custom connector designs, special cable lengths,
              unique plating options, and application-specific modifications. Our engineering team will work with you
              from design to production.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What quality standards do your products meet?</h3>
            <p className="text-sm text-muted-foreground">
              All our RF connectors and cable assemblies are manufactured according to IEC and GB international
              standards. We maintain ISO 9001 certification and perform 100% inspection with our in-house QC laboratory
              using network analyzers and other precision test equipment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the typical lead time for orders?</h3>
            <p className="text-sm text-muted-foreground">
              Standard products typically ship within 7-15 days. Custom cable assemblies require 15-30 days depending on
              complexity. Large volume orders and custom OEM projects are quoted individually. We also offer expedited
              production for urgent requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you provide samples for testing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we can provide samples for evaluation and testing purposes. Contact our sales team with your specific
              requirements and application details. Sample lead time is typically 3-7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
