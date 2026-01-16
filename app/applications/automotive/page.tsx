import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automotive RF Connectors | GPS, ADAS & Infotainment | Baierde",
  description: "Compact MMCX and MCX connectors for automotive electronics. GPS, infotainment, ADAS applications.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/automotive",
  },
}

export default function AutomotivePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Automotive" }]} />
      <h1 className="text-4xl font-bold mb-4">Automotive Electronics Solutions</h1>
      <p className="text-lg text-muted-foreground">
        Compact, reliable RF connectors for GPS, infotainment, ADAS, and vehicle connectivity systems.
      </p>
    </div>
  )
}
