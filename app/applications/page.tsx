import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RF Connector Applications & Solutions | Baierde Electronic",
  description:
    "RF connector solutions for telecom, automotive, medical, and industrial applications. Expert guidance for your connectivity needs.",
  alternates: {
    canonical: "https://brdelectronic.com/applications",
  },
}

export default function ApplicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications" }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">Industry Applications & Solutions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Our RF connectivity solutions serve diverse industries worldwide. From 5G telecommunications to automotive
          electronics, we provide reliable connectors engineered for your specific application requirements.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Link href="/applications/telecom-5g">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Image
                src="/5g-telecom-tower.jpg"
                alt="Telecom & 5G"
                width={600}
                height={400}
                className="rounded-t-lg w-full"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">Telecommunications & 5G</h2>
                <p className="text-muted-foreground mb-4">
                  High-performance connectors for base stations, antennas, and network infrastructure. Supporting 5G
                  deployment with reliable RF connectivity solutions.
                </p>
                <Button variant="link" className="p-0">
                  Explore Telecom Solutions →
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/applications/automotive">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Image
                src="/automotive-electronics.jpg"
                alt="Automotive Electronics"
                width={600}
                height={400}
                className="rounded-t-lg w-full"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">Automotive Electronics</h2>
                <p className="text-muted-foreground mb-4">
                  Compact MMCX and MCX connectors for GPS, infotainment systems, ADAS, and vehicle connectivity.
                  Automotive-grade reliability.
                </p>
                <Button variant="link" className="p-0">
                  Explore Automotive Solutions →
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/applications/medical">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Image
                src="/medical-device-equipment.jpg"
                alt="Medical Devices"
                width={600}
                height={400}
                className="rounded-t-lg w-full"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">Medical Devices</h2>
                <p className="text-muted-foreground mb-4">
                  Precision connectors for diagnostic equipment, patient monitoring systems, and medical imaging
                  devices. Meets stringent medical industry standards.
                </p>
                <Button variant="link" className="p-0">
                  Explore Medical Solutions →
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/applications/instrumentation">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <Image
                src="/test-measurement-equipment.jpg"
                alt="Test & Measurement"
                width={600}
                height={400}
                className="rounded-t-lg w-full"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">Test & Measurement</h2>
                <p className="text-muted-foreground mb-4">
                  High-precision connectors for oscilloscopes, spectrum analyzers, network analyzers, and laboratory
                  equipment. Excellent electrical performance.
                </p>
                <Button variant="link" className="p-0">
                  Explore Instrumentation Solutions →
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Need Application Guidance?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our technical team can help you select the optimal RF connectors for your specific application. Contact us for
          expert consultation.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Contact Our Team</Link>
        </Button>
      </div>
    </div>
  )
}
