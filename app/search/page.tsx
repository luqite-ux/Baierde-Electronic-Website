import { Breadcrumbs } from "@/components/breadcrumbs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Products | Baierde Electronic",
  description: "Search our complete catalog of RF connectors, adapters, and cable assemblies.",
  alternates: {
    canonical: "https://brdelectronic.com/search",
  },
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Search" }]} />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Search Products</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Find RF connectors, adapters, and cable assemblies
        </p>

        <div className="flex gap-2 mb-12">
          <Input type="search" placeholder="Search by product name, series, or specifications..." className="flex-1" />
          <Button className="bg-primary text-foreground hover:bg-primary-dark">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center text-muted-foreground">
          <p className="mb-4">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm">
              SMA Connectors
            </Button>
            <Button variant="outline" size="sm">
              MMCX Series
            </Button>
            <Button variant="outline" size="sm">
              BNC Adapters
            </Button>
            <Button variant="outline" size="sm">
              Cable Assemblies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
