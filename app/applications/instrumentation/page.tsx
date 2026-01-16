import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test & Measurement RF Connectors | Lab Equipment | Baierde",
  description:
    "High-precision RF connectors for oscilloscopes, analyzers, and laboratory equipment. Excellent electrical performance.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/instrumentation",
  },
}

export default function InstrumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Test & Measurement" }]} />
      <h1 className="text-4xl font-bold mb-4">Test & Measurement Solutions</h1>
      <p className="text-lg text-muted-foreground">
        High-precision connectors for oscilloscopes, spectrum analyzers, and laboratory equipment.
      </p>
    </div>
  )
}
