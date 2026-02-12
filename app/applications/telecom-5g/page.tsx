import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { Radio, Wifi, TowerCell, Cable, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "5G & Telecommunications RF Connectors | Baierde Electronic",
  description:
    "High-frequency RF connectors for 5G base stations, antennas, and telecom infrastructure. Reliable connectivity for next-generation networks.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/telecom-5g",
  },
}

const applications = [
  { icon: TowerCell, label: "5G base stations & small cells" },
  { icon: Radio, label: "Macro and indoor antennas" },
  { icon: Wifi, label: "Backhaul and fronthaul links" },
  { icon: Cable, label: "RRU/BBU and feeder systems" },
]

const series = [
  { name: "SMA / SSMA", href: "/products/connectors/sma", desc: "Up to 18GHz, base station and antenna interfaces" },
  { name: "SMP", href: "/products/connectors/smp", desc: "DC–40GHz, blind-mate for dense 5G equipment" },
  { name: "N-Type", href: "/products/connectors", desc: "High power, feeder and outdoor applications" },
]

export default function Telecom5GPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Telecom & 5G" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Telecommunications & 5G Solutions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
          Our RF connectors support the deployment and operation of 5G networks, providing reliable high-frequency
          connectivity for base stations, antennas, and network infrastructure. From sub-6 GHz to mmWave, we supply
          IEC/GB-certified components trusted by operators and equipment makers worldwide.
        </p>
        <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Discuss Your Project</Link>
        </Button>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Key Applications</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map(({ icon: Icon, label }) => (
            <Card key={label}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Recommended Product Series</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          These connector series are commonly used in telecom and 5G applications. We can customize configurations and
          cable assemblies for your project.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {series.map(({ name, href, desc }) => (
            <Link key={name} href={href}>
              <Card className="h-full hover:shadow-md transition-shadow border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                  <span className="text-primary text-sm font-medium mt-2 inline-block">View series →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Why Choose Baierde for Telecom & 5G</h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
          {[
            "IEC/GB certified — compliant with international and Chinese standards",
            "Wide frequency range — from DC to 40GHz for sub-6 and mmWave",
            "Fast lead time — 2–3 weeks for standard configurations",
            "OEM/ODM support — custom interfaces and cable assemblies",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Need a Quote for Your 5G or Telecom Project?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Our team can help you select the right connectors and provide samples or volume pricing. Request a quote or
          discuss your requirements.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </div>
    </div>
  )
}
