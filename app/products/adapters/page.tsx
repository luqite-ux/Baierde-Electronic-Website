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

export default function AdaptersPage() {
  const [filters, setFilters] = useState<FilterState>({
    series: [],
    mounting: [],
    frequency: [],
    impedance: [],
  })
  const [sortBy, setSortBy] = useState("popularity")

  const adapters = useMemo(() => {
    let filtered = mockProducts.filter((p) => p.category === "adapters")

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
            name: "RF Adapters",
            description:
              "High-quality RF adapters for seamless connectivity. BNC to SMA, N-Type to SMA, and custom adapter configurations.",
            url: "https://brdelectronic.com/products/adapters",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: "RF Adapters" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">RF Adapters</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Professional RF adapters for inter-series connections, gender changes, and specialty configurations. Low
          insertion loss and excellent VSWR characteristics for reliable signal transmission.
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
                {adapters.length} {adapters.length === 1 ? "product" : "products"}
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adapters.map((product) => (
              <Link key={product._id} href={`/products/detail/${product.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=300&width=300&query=RF+adapter"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="rounded-lg mb-3 w-full aspect-square object-cover"
                    />
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

          <div className="mt-12 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Custom Adapter Solutions</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Need a specific adapter configuration not listed here? Our engineering team can design and manufacture
              custom adapters to meet your exact specifications including special impedance matching, unique connector
              combinations, and application-specific requirements.
            </p>
            <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
              <Link href="/contact">Request Custom Adapter</Link>
            </Button>
          </div>

          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">RF Adapters for Every Application</h2>
            <p className="text-muted-foreground mb-4">
              RF adapters are essential components for creating seamless connections between different connector series,
              changing gender configurations, or adapting impedance in RF systems. Baierde Electronic manufactures
              precision RF adapters that maintain signal integrity while providing the flexibility needed for complex RF
              installations and test setups.
            </p>
            <p className="text-muted-foreground mb-4">
              Our adapter portfolio includes inter-series adapters (such as BNC to SMA, N-Type to SMA), gender changers
              (male-to-male, female-to-female), right angle adapters, and specialty configurations. Each adapter is
              precision machined to ensure consistent impedance, minimize insertion loss (typically less than 0.2 dB),
              and maintain excellent VSWR characteristics across the specified frequency range.
            </p>
            <p className="text-muted-foreground">
              All adapters are manufactured in our ISO-certified facility using high-quality materials including brass
              bodies with gold or nickel plating and PTFE dielectrics. We perform 100% testing to verify electrical
              performance and mechanical tolerances, ensuring reliable operation in demanding telecommunications,
              aerospace, and test equipment applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
