import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
import { Stethoscope, HeartPulse, ScanSearch, Activity, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Medical Device RF Connectors | Diagnostic Equipment | Baierde",
  description:
    "Precision RF connectors for medical devices and diagnostic equipment. Meets medical industry standards.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/medical",
  },
}

const applications = [
  { icon: ScanSearch, label: "Medical imaging & MRI" },
  { icon: HeartPulse, label: "Patient monitoring" },
  { icon: Stethoscope, label: "Diagnostic equipment" },
  { icon: Activity, label: "Wireless sensors & telemetry" },
]

const series = [
  { name: "SMA", href: "/products/connectors/sma", desc: "Standard interfaces for test and RF front-ends" },
  { name: "MMCX / MCX", href: "/products/connectors/mmcx", desc: "Compact connections for portable devices" },
  { name: "BNC", href: "/products/connectors/bnc", desc: "Quick-connect for lab and bench equipment" },
]

export default function MedicalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Medical Devices" }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Medical Device Solutions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4">
          Precision RF connectors for diagnostic equipment, patient monitoring, and medical imaging systems. We supply
          reliable, consistent components for OEMs who need stable electrical performance and quality documentation to
          support regulatory requirements.
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
          These connector series are commonly used in medical and life-science equipment. We can provide documentation
          and support for your qualification process.
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
        <h2 className="text-2xl font-bold mb-6">Why Choose Baierde for Medical</h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
          {[
            "Stable electrical performance — critical for sensitive medical RF",
            "Consistent quality — 100% tested in our QC laboratory",
            "Documentation support — for regulatory and audit needs",
            "OEM/ODM — custom configurations and cable assemblies",
          ].map((text) => (
            <li key={text} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Need Connectors for Medical Equipment?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Our team can help you select the right series and provide samples or documentation. Contact us for a
          consultation.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact">Request a Quote</Link>
        </Button>
      </div>
    </div>
  )
}
