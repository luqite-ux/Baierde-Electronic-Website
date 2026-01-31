"use client"

import { useState, useMemo } from "react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { mockProducts } from "@/lib/mock-data"
import { ArrowUpDown, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function CableAssembliesPage() {
  const [filters, setFilters] = useState<FilterState>({
    series: [],
    mounting: [],
    frequency: [],
    impedance: [],
  })
  const [sortBy, setSortBy] = useState("popularity")

  const cables = useMemo(() => {
    let filtered = mockProducts.filter((p) => p.category === "cable-assemblies")

    if (filters.series.length > 0) {
      filtered = filtered.filter((p) => p.series && filters.series.includes(p.series))
    }

    if (sortBy === "newest") {
      filtered = [...filtered].reverse()
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "RF Cable Assemblies",
            description:
              "Pre-tested RF cable assemblies with low-loss coaxial cables. Custom lengths and connector configurations available.",
            url: "https://brdelectronic.com/products/cable-assemblies",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: "RF Cable Assemblies" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">RF Cable Assemblies</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          High-quality RF cable assemblies manufactured with precision connectors and low-loss coaxial cables. Each
          assembly is fully tested to ensure optimal performance and reliability.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <ProductFilters onFilterChange={setFilters} />
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {cables.length} {cables.length === 1 ? "product" : "products"}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <ProductFilters onFilterChange={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {cables.map((product) => (
              <Link key={product._id} href={`/products/detail/${product.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=300&width=300&query=RF+cable+assembly"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="rounded-lg mb-3 w-full aspect-square object-cover"
                    />
                    {product.series && (
                      <div className="text-xs text-primary font-semibold mb-1">{product.series} Series</div>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.specs.slice(0, 2).map((spec) => (
                        <span key={spec.label} className="text-xs bg-muted px-2 py-1 rounded">
                          {spec.value}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Available Cable Types</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• RG316 - Flexible, high-temperature rated</li>
                  <li>• RG174 - Standard low-loss coaxial</li>
                  <li>• RG178 - Miniature diameter cable</li>
                  <li>• RG58 - Medium power applications</li>
                  <li>• Custom cable specifications available</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customization Options</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom cable lengths (10cm to 10m+)</li>
                  <li>• Mixed connector types (SMA, BNC, N-Type, etc.)</li>
                  <li>• Right angle and straight configurations</li>
                  <li>• Male/female connector combinations</li>
                  <li>• Special cable types and plating options</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/30 p-8 rounded-lg text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Need Custom Cable Assemblies?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team can manufacture cable assemblies to your exact specifications with fast turnaround times. Contact
              us with your requirements.
            </p>
            <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">RF Cable Assemblies for Professional Applications</h2>
            <p className="text-muted-foreground mb-4">
              RF cable assemblies are pre-terminated coaxial cables with connectors attached at one or both ends,
              providing a complete plug-and-play solution for RF signal transmission. At Baierde Electronic, we
              manufacture custom cable assemblies using high-quality low-loss coaxial cables and precision RF
              connectors, with each assembly 100% tested before shipment to ensure optimal electrical performance.
            </p>
            <p className="text-muted-foreground mb-4">
              Our cable assembly portfolio includes standard configurations with SMA, BNC, N-Type, MMCX, and MCX
              connectors, as well as custom mixed-connector assemblies to meet specific application requirements. We use
              industry-standard cable types including RG316 for high-temperature applications, RG174 for general
              purpose, RG178 for miniature designs, and RG58 for medium power requirements. Custom cable lengths from
              10cm to 10 meters or longer are available.
            </p>
            <p className="text-muted-foreground">
              Every cable assembly undergoes rigorous testing including VSWR measurement, insertion loss verification,
              and visual inspection to ensure mechanical integrity and electrical performance. With our in-house cable
              assembly production line and experienced technicians, we provide fast turnaround times of 15-30 days for
              custom orders, with expedited service available for urgent projects. Whether you need standard cable
              assemblies or application-specific custom solutions, Baierde Electronic delivers reliable quality for
              telecommunications, test equipment, aerospace, and industrial applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
