import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { Gauge, Radio, Cpu, Beaker, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Test & Measurement RF Connectors | Lab Equipment | Baierde",
  description:
    "High-precision RF connectors for oscilloscopes, analyzers, and laboratory equipment. Excellent electrical performance.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/instrumentation",
  },
}

const applications = [
  { icon: Gauge, label: "Oscilloscopes & probes" },
  { icon: Radio, label: "Spectrum & network analyzers" },
  { icon: Cpu, label: "Signal generators & sources" },
  { icon: Beaker, label: "Lab fixtures & test jigs" },
]

const series = [
  { name: "SMA", href: "/products/connectors/sma", desc: "Standard lab interface, DC–18GHz" },
  { name: "BNC", href: "/products/connectors/bnc", desc: "Quick-connect, video and lower-frequency test" },
  { name: "N-Type", href: "/products/connectors", desc: "High power and precision measurement" },
  { name: "SMP", href: "/products/connectors/smp", desc: "DC–40GHz for high-frequency test" },
]

export default function InstrumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Test & Measurement" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Test & Measurement Solutions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
          High-precision connectors for oscilloscopes, spectrum analyzers, network analyzers, and laboratory equipment.
          We supply IEC-compliant SMA, BNC, N-Type, and SMP series with excellent electrical performance and repeatability
          for demanding test and measurement applications.
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
          These connector series are widely used in test and measurement. We offer standard and precision grades, plus
          cable assemblies and adapters.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <h2 className="text-2xl font-bold mb-6">Why Choose Baierde for Test & Measurement</h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
          {[
            "Excellent electrical performance — low VSWR, consistent phase",
            "100% tested — our QC lab verifies every connector",
            "Wide frequency range — from DC to 40GHz for your bench",
            "Adapters & cable assemblies — complete interconnect solutions",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Need Connectors for Lab or Test Equipment?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Request samples or discuss your requirements. We can recommend the right series and provide adapters or
          cable assemblies.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </div>
    </div>
  )
}
