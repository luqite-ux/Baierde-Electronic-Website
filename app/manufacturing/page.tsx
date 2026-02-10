import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Factory,
  Cpu,
  Package,
  Settings,
  Wrench,
  Zap,
  Cog,
  TestTube2,
  FlaskConical,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Manufacturing Capability | RF Connector Production | Baierde",
  description:
    "Advanced RF connector manufacturing with 210+ equipment sets: CNC turning/milling, automatic lathes, wire cutting, crimping, high-frequency welding. IEC-compliant production since 2006.",
  alternates: {
    canonical: "https://brdelectronic.com/manufacturing",
  },
  openGraph: {
    title: "Manufacturing Capability | RF Connector Production | Baierde",
    description:
      "Advanced RF connector manufacturing with 210+ equipment sets. CNC machining, automated production, and rigorous quality control.",
    url: "https://brdelectronic.com/manufacturing",
    type: "website",
  },
}

export default function ManufacturingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Manufacturing" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Manufacturing Capability</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          State-of-the-art production facilities equipped with advanced CNC machining, automated assembly lines, and
          comprehensive testing equipment. Delivering precision RF connectors since 2006.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Factory className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">15,000m²</h3>
            <p className="text-sm text-muted-foreground">Production Facility</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Cpu className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">210+</h3>
            <p className="text-sm text-muted-foreground">Equipment Sets</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">5M+ Units</h3>
            <p className="text-sm text-muted-foreground">Monthly Capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Settings className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">150+</h3>
            <p className="text-sm text-muted-foreground">Skilled Workers</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Production Process Timeline</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          From concept to delivery, our streamlined manufacturing process ensures quality and efficiency at every stage.
        </p>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />
          <div className="space-y-8">
            {[
              {
                icon: FlaskConical,
                title: "R&D & Design",
                description:
                  "Engineering team develops custom solutions, creates technical drawings, and designs tooling based on customer specifications.",
              },
              {
                icon: Cog,
                title: "CNC Machining",
                description:
                  "Precision CNC turning and milling, automatic lathes, and wire cutting machines produce connector bodies, contacts, and hardware with ±0.01mm tolerance.",
              },
              {
                icon: Zap,
                title: "Plating & Surface Treatment",
                description:
                  "In-house electroplating applies gold, silver, or nickel coatings for optimal conductivity and corrosion resistance.",
              },
              {
                icon: Wrench,
                title: "Assembly & Crimping",
                description:
                  "Semi-automated assembly lines with trained technicians. Crimping machines, cable stripping equipment, and high-frequency welding for cable assemblies.",
              },
              {
                icon: TestTube2,
                title: "Quality Testing",
                description:
                  "100% electrical testing with network analyzers. Sample-based environmental testing including salt spray, vibration, and temperature cycling.",
              },
              {
                icon: Package,
                title: "Packaging & Shipping",
                description:
                  "Careful packaging with ESD protection, proper labeling, and documentation. Fast logistics to global destinations.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:order-2"}`}>
                    <Card className="inline-block text-left">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <step.icon className="h-5 w-5 text-primary" />
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-12 h-12 shrink-0 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold text-lg leading-none tabular-nums z-10 border-4 border-background">
                    <span className="inline-flex items-center justify-center size-full">{index + 1}</span>
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Manufacturing Equipment & Capabilities</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">CNC Turning & Milling</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Multi-axis CNC machining centers produce complex connector components with ultra-precise tolerances.
                    Automated tool changing and continuous operation ensure high throughput.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Automatic Lathes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Swiss-type automatic lathes for high-volume production of precision turned parts. Ideal for contacts
                    and small connector components requiring tight tolerances.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Wire Cutting (EDM)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Electrical discharge machining for intricate shapes and hard materials. Perfect for precision slots,
                    keyways, and complex geometries in connector bodies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Crimping Machines</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automated and semi-automated crimping equipment for reliable cable-to-connector terminations.
                    Ensures consistent crimp quality and pull strength.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cable Stripping</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Precision cable stripping machines for coaxial cables. Removes outer jacket, shield, and dielectric
                    without damaging center conductor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">High-Frequency Welding</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized welding equipment for RF cable assembly center conductor attachment. Ensures optimal
                    electrical continuity and mechanical strength.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/e7-94-9f-e4-ba-a7-e8-bd-a6-e9-97-b4.jpg"
              alt="CNC machining center production workshop at Baierde Electronic factory"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/e5-85-ac-e5-8f-b8-e5-a4-a7-e9-97-a8.jpg"
              alt="Baierde Electronic factory building exterior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mb-16 bg-muted/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">OEM/ODM Custom Services</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          Our engineering team works closely with customers to develop custom{" "}
          <Link href="/products/connectors" className="text-primary hover:underline">
            RF connector
          </Link>{" "}
          and{" "}
          <Link href="/products/cable-assemblies" className="text-primary hover:underline">
            cable assembly
          </Link>{" "}
          solutions. From initial design through prototyping and mass production, we support your project at every
          stage.
        </p>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Custom Design Engineering</p>
              <p className="text-sm text-muted-foreground">Tailored solutions for unique requirements</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Rapid Prototyping</p>
              <p className="text-sm text-muted-foreground">Fast sample production for testing</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Tooling Development</p>
              <p className="text-sm text-muted-foreground">In-house mold and fixture design</p>
            </div>
          </div>
        </div>
        <Button asChild>
          <Link href="/contact">
            Discuss Your Custom Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Quality Assurance & Testing</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          Every Baierde connector undergoes rigorous quality control with 100% electrical testing, strict IEC/GB
          standards compliance, and comprehensive inspection procedures. Our dedicated QC lab is equipped with network
          analyzers, environmental test chambers, and precision measurement instruments.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <Link href="/quality">View Quality & Testing Equipment</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Browse Our Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
