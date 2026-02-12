import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { Navigation, Radio, Car, Cpu, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Automotive RF Connectors | GPS, ADAS & Infotainment | Baierde",
  description: "Compact MMCX and MCX connectors for automotive electronics. GPS, infotainment, ADAS applications.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/automotive",
  },
}

const applications = [
  { icon: Navigation, label: "GPS & satellite antennas" },
  { icon: Radio, label: "Infotainment & car audio" },
  { icon: Car, label: "ADAS & radar modules" },
  { icon: Cpu, label: "V2X & telematics" },
]

const series = [
  { name: "MMCX", href: "/products/connectors/mmcx", desc: "Compact, snap-on; ideal for PCB and antenna modules" },
  { name: "MCX", href: "/products/connectors/mcx", desc: "Small form factor, DC–6GHz for in-vehicle RF" },
  { name: "SMA", href: "/products/connectors/sma", desc: "Robust interfaces for external antennas and test" },
]

export default function AutomotivePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Automotive" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Automotive Electronics Solutions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
          Compact, reliable RF connectors for GPS, infotainment, ADAS, and vehicle connectivity systems. Our MMCX and
          MCX series are widely used in automotive-grade applications where space and weight matter, with consistent
          performance from DC to 6GHz.
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
          These connector series suit automotive PCB, antenna, and harness applications. We support custom cable
          assemblies and mating interfaces.
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
        <h2 className="text-2xl font-bold mb-6">Why Choose Baierde for Automotive</h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
          {[
            "Space-saving MMCX/MCX — high density on PCB and in harnesses",
            "Stable performance — DC to 6GHz for GPS, cellular, and radar",
            "Volume production — consistent quality for Tier-1 and OEMs",
            "OEM/ODM — custom lengths, connectors, and cable assemblies",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Need Automotive-Grade Connectors?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Request samples or volume pricing for your automotive project. Our team can recommend the right series and
          configurations.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </div>
    </div>
  )
}
