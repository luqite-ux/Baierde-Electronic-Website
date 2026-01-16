import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "5G & Telecommunications RF Connectors | Baierde Electronic",
  description:
    "High-frequency RF connectors for 5G base stations, antennas, and telecom infrastructure. Reliable connectivity for next-generation networks.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/telecom-5g",
  },
}

export default function Telecom5GPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Telecom & 5G" }]} />
      <h1 className="text-4xl font-bold mb-4">Telecommunications & 5G Solutions</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Our RF connectors support the deployment and operation of 5G networks, providing reliable high-frequency
        connectivity for base stations, antennas, and network infrastructure.
      </p>
      <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
        <Link href="/contact">Discuss Your Project</Link>
      </Button>
    </div>
  )
}
