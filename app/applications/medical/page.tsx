import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medical Device RF Connectors | Diagnostic Equipment | Baierde",
  description:
    "Precision RF connectors for medical devices and diagnostic equipment. Meets medical industry standards.",
  alternates: {
    canonical: "https://brdelectronic.com/applications/medical",
  },
}

export default function MedicalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Applications", href: "/applications" }, { label: "Medical Devices" }]} />
      <h1 className="text-4xl font-bold mb-4">Medical Device Solutions</h1>
      <p className="text-lg text-muted-foreground">
        Precision RF connectors for diagnostic equipment, patient monitoring, and medical imaging systems.
      </p>
    </div>
  )
}
