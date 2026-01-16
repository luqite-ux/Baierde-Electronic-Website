import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Award,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Activity,
  Gauge,
  Microscope,
  Zap,
  Droplets,
  ArrowRight,
  FlaskConical,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Quality & Certifications | IEC Standards | Baierde Electronic",
  description:
    "IEC and GB certified RF connectors with comprehensive quality control. Network analyzer testing, environmental testing, salt spray, pull force testing, CMM inspection, and 100% electrical inspection.",
  alternates: {
    canonical: "https://brdelectronic.com/quality",
  },
  openGraph: {
    title: "Quality & Certifications | IEC Standards | Baierde Electronic",
    description: "IEC and GB certified RF connectors with comprehensive QC equipment and 100% electrical testing.",
    url: "https://brdelectronic.com/quality",
    type: "website",
  },
}

export default function QualityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Quality & Certifications" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Quality Assurance & Certifications</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Committed to delivering the highest quality RF connectors through rigorous testing procedures, advanced
          measurement equipment, and adherence to international IEC and GB standards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">IEC Standards</h3>
            <p className="text-sm text-muted-foreground">Full compliance with international standards</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Testing</h3>
            <p className="text-sm text-muted-foreground">Every product electrically tested</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <FileCheck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">GB Certified</h3>
            <p className="text-sm text-muted-foreground">Chinese national standards compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">RoHS Compliant</h3>
            <p className="text-sm text-muted-foreground">Environmentally friendly materials</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Quality Control Equipment</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Our dedicated QC laboratory is equipped with industry-leading test equipment to ensure every{" "}
          <Link href="/products/connectors" className="text-primary hover:underline">
            RF connector
          </Link>
          ,{" "}
          <Link href="/products/adapters" className="text-primary hover:underline">
            adapter
          </Link>
          , and{" "}
          <Link href="/products/cable-assemblies" className="text-primary hover:underline">
            cable assembly
          </Link>{" "}
          meets specifications and delivers reliable performance.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Network Analyzer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Vector network analyzers test VSWR, insertion loss, return loss, and impedance for 100% of
                    connectors. Frequency range up to 40GHz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Hipot Tester</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    High-voltage testing verifies dielectric withstanding voltage and insulation integrity between
                    contacts and body.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Insulation Resistance</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Megohmmeter tests measure insulation resistance between connector contacts to verify electrical
                    isolation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Salt Spray Tester</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Accelerated corrosion testing evaluates plating quality and long-term durability in harsh
                    environments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pull Force Tester</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Measures cable-to-connector retention force and mating/unmating forces to verify mechanical
                    reliability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Coating Thickness Gauge</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Non-destructive measurement of plating thickness ensures proper gold, silver, or nickel coating
                    depth.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <Microscope className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">CMM & Projector</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Coordinate measuring machine and optical projector verify precise dimensions and geometric
                    tolerances.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <FlaskConical className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Aging Test Chamber</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Temperature cycling and humidity chambers simulate long-term environmental exposure for reliability
                    validation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 relative aspect-[21/9] rounded-lg overflow-hidden">
          <Image
            src="/images/e5-8e-82-e6-88-bf-e7-85-a7-e7-89-87.jpg"
            alt="Quality control laboratory with testing equipment at Baierde Electronic"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16 bg-muted/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Quality Standards & Compliance</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          Baierde strictly adheres to international and national standards to ensure product compatibility, reliability,
          and safety across all markets.
        </p>
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              IEC Standards
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>IEC 61169 series for RF coaxial connectors</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>IEC 60512 for connector testing methods</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>IEC 60068 environmental testing standards</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              GB Standards
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>GB/T standards for connector specifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Industry-specific telecommunications standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>RoHS and environmental compliance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Quality Inspection Flow</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Multi-stage inspection process ensures consistent quality from raw materials to finished products.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Incoming Material Inspection (IQC)</h3>
                    <p className="text-sm text-muted-foreground">
                      Verify raw material dimensions, composition, and certificates. Reject non-conforming materials
                      before production.
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="h-8 w-8 text-primary rotate-90" />
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">In-Process Quality Control (IPQC)</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular sampling during machining and assembly. Dimensional checks, visual inspection, and
                      functional tests.
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="h-8 w-8 text-primary rotate-90" />
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Final Quality Control (FQC)</h3>
                    <p className="text-sm text-muted-foreground">
                      100% electrical testing with network analyzers. Visual inspection, dimension verification, and
                      mechanical tests.
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <ArrowRight className="h-8 w-8 text-primary rotate-90" />
            </div>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Outgoing Quality Assurance (OQA)</h3>
                    <p className="text-sm text-muted-foreground">
                      Final inspection before packaging. Verify quantity, labeling, documentation, and packaging
                      quality.
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Quality & Testing FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              What quality standards do your RF connectors meet?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              All Baierde{" "}
              <Link href="/products/connectors" className="text-primary hover:underline">
                RF connectors
              </Link>{" "}
              meet IEC 61169 series standards for dimensional and electrical specifications. We also comply with GB/T
              national standards and RoHS environmental requirements. Products are 100% electrically tested before
              shipment.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Do you provide test reports or certificates?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Yes, we provide comprehensive test reports including RF performance data (VSWR, insertion loss, return
              loss), dimensional inspection reports, and material certificates upon request. Certificates of conformity
              are included with all shipments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">What is your quality control process?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Our quality control follows a four-stage process: Incoming Material Inspection (IQC), In-Process Quality
              Control (IPQC), Final Quality Control (FQC) with 100% electrical testing, and Outgoing Quality Assurance
              (OQA). Learn more on our{" "}
              <Link href="/manufacturing" className="text-primary hover:underline">
                Manufacturing page
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              Can you provide custom testing or special inspection?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Yes, we can accommodate special testing requirements including extended temperature range testing,
              vibration testing, custom electrical parameters, or customer-specific inspection criteria. Contact us to
              discuss your requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">What environmental tests do you perform?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              We perform salt spray corrosion testing, temperature cycling (-55°C to +125°C), humidity exposure,
              vibration testing, and aging tests on sample batches to verify long-term reliability and environmental
              durability of our products.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">How do you ensure consistent plating quality?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Our in-house plating facilities use controlled electroplating processes with regular solution analysis and
              parameter monitoring. Coating thickness is measured non-destructively with thickness gauges, and salt
              spray testing validates corrosion resistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="bg-gradient-to-r from-primary/90 to-primary p-12 rounded-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
          Experience Our Quality Commitment
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Request samples or quotes on our IEC-certified RF connectors. Fast response, competitive pricing, and
          comprehensive technical support.
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
