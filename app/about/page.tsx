import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Award, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Baierde Electronic | RF Connector Manufacturer Since 2006",
  description:
    "Zhenjiang Baierde Electronic Co., Ltd. - Professional RF connector manufacturer in Jiangsu, China. 150+ employees, 15 mid/senior engineers, specializing in 5G connectors, adapters, and cable assemblies since 2006.",
  alternates: {
    canonical: "https://brdelectronic.com/about",
  },
  openGraph: {
    title: "About Baierde Electronic | RF Connector Manufacturer Since 2006",
    description: "Professional RF connector manufacturer in Jiangsu, China. 150+ employees, 15 mid/senior engineers.",
    url: "https://brdelectronic.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Baierde Electronic</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Professional RF coaxial connector manufacturer serving global markets with precision-engineered connectivity
          solutions since 2006.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Company Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded in <strong>2006</strong>, Zhenjiang Baierde Electronic Co., Ltd. is a private high-tech enterprise
            located in Zhenjiang, Jiangsu Province, China. For nearly two decades, we have specialized in the research,
            development, manufacturing, and export of high-quality RF coaxial connectors, adapters, and cable
            assemblies.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our commitment to innovation has positioned us at the forefront of RF connectivity solutions, particularly
            in the emerging{" "}
            <Link href="/products/connectors" className="text-primary hover:underline">
              5G connector products
            </Link>{" "}
            market. We continuously invest in advanced manufacturing equipment and technical talent to meet the evolving
            needs of telecommunications, automotive, medical device, and test & measurement industries worldwide.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, Baierde serves customers in more than 50 countries, providing competitive pricing, reliable quality,
            and responsive customer service. Our commitment to international standards and continuous improvement has
            made us a trusted partner for B2B customers globally.
          </p>
        </div>

        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="/images/e5-85-ac-e5-8f-b8-e5-a4-a7-e9-97-a8.jpg"
            alt="Baierde Electronic manufacturing facility entrance in Zhenjiang, Jiangsu"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Company Capability Snapshot</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">150+</h3>
              <p className="text-muted-foreground">Skilled Employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">15</h3>
              <p className="text-muted-foreground">Mid/Senior Technical Titles</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">15,000m²</h3>
              <p className="text-muted-foreground">Production Facility</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-muted-foreground">Countries Served</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">20</h3>
              <p className="text-muted-foreground">Years of Experience</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">High-Tech</h3>
              <p className="text-muted-foreground">Private Enterprise</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16 bg-muted/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Product Scope & Expertise</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          Baierde specializes in three core product categories, with particular strength in next-generation 5G
          connectivity solutions:
        </p>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">
                <Link href="/products/connectors" className="hover:text-primary transition-colors">
                  RF Coaxial Connectors
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                SMA, SSMA, SMP, SMB, SMC, SSMC, MCX, MMCX, BNC, D4, and specialized 5G connector series for
                high-frequency applications up to 65GHz.
              </p>
              <Link href="/products/connectors" className="text-sm text-primary hover:underline">
                Browse Connectors →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">
                <Link href="/products/adapters" className="hover:text-primary transition-colors">
                  RF Adapters
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Inter-series adapters, gender changers, and impedance matching adapters for flexible system integration.
                Same-day custom adapter quotes available.
              </p>
              <Link href="/products/adapters" className="text-sm text-primary hover:underline">
                Browse Adapters →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">
                <Link href="/products/cable-assemblies" className="hover:text-primary transition-colors">
                  Cable Assemblies
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Custom RF cable assemblies with flexible coax, semi-rigid coax, or conformable cable. Full OEM/ODM
                support with fast prototyping.
              </p>
              <Link href="/products/cable-assemblies" className="text-sm text-primary hover:underline">
                Browse Cable Assemblies →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 rounded-lg border-l-4 border-primary">
          <h2 className="text-3xl font-bold mb-6">Our Quality Policy</h2>
          <blockquote className="text-xl md:text-2xl font-medium text-balance leading-relaxed mb-6">
            "Quality first, reputation matters, management as foundation, service with sincerity."
          </blockquote>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            This guiding principle shapes every decision we make at Baierde. From incoming material inspection to final
            electrical testing, we maintain rigorous quality protocols that exceed international standards. Our
            commitment to{" "}
            <Link href="/quality" className="text-primary hover:underline">
              IEC and GB compliance
            </Link>{" "}
            ensures that every connector delivers reliable performance in demanding applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link href="/quality">Learn About Our Quality System</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/manufacturing">View Manufacturing Capabilities</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/90 to-primary p-12 rounded-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Ready to Partner With Us?</h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get a fast quote on RF connectors, adapters, or custom cable assemblies. Our experienced team responds within
          24 hours with competitive pricing and technical support.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
