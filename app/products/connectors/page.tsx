import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpDown, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getConnectorProducts, getSeriesByCategory, type ConnectorProductFilters } from "@/lib/sanity.data"
import { ConnectorFilters } from "./connector-filters"
import { ConnectorSortSelect } from "./connector-sort-select"

interface ConnectorsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ConnectorsPage({ searchParams }: ConnectorsPageProps) {
  // Await searchParams in Next.js 15
  const sp = await searchParams
  
  // Parse filters from searchParams
  const filters: ConnectorProductFilters = {
    series: sp.series ? (Array.isArray(sp.series) ? sp.series : [sp.series]) : undefined,
    mounting: sp.mounting ? (Array.isArray(sp.mounting) ? sp.mounting : [sp.mounting]) : undefined,
    frequency: sp.frequency ? (Array.isArray(sp.frequency) ? sp.frequency : [sp.frequency]) : undefined,
    impedance: sp.impedance ? (Array.isArray(sp.impedance) ? sp.impedance : [sp.impedance]) : undefined,
  }

  const sortBy = (sp.sort as string | undefined) || "popularity"

  // Fetch data
  const connectors = await getConnectorProducts(filters)
  const seriesList = await getSeriesByCategory("connectors")

  // Sort products (already sorted by sortOrder, title in query, but handle "newest" if needed)
  let sortedConnectors = [...connectors]
  if (sortBy === "newest") {
    sortedConnectors = sortedConnectors.reverse()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "RF Coaxial Connectors",
            description:
              "High-performance RF coaxial connectors for telecom, aerospace, and industrial applications. IEC certified SMA, MMCX, MCX, BNC, TNC connectors.",
            url: "https://brdelectronic.com/products/connectors",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: "RF Coaxial Connectors" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">RF Coaxial Connectors</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Professional-grade RF coaxial connectors designed for high-frequency applications up to 40GHz. Available in
          multiple series including SMA, MMCX, MCX, BNC, TNC, and specialized configurations.
        </p>
      </div>

      {/* Series Quick Links */}
      <div className="grid gap-3 md:grid-cols-5 mb-8">
        {seriesList.slice(0, 5).map((series) => (
          <Link key={series._id} href={series.slug ? `/products/connectors/${series.slug}` : "#"}>
            <Button variant="outline" className="w-full bg-transparent">
              {series.name} Series
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <ConnectorFilters />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {sortedConnectors.length} {sortedConnectors.length === 1 ? "product" : "products"}
              </p>
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <ConnectorFilters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <ConnectorSortSelect defaultValue={sortBy} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedConnectors.map((product) => (
              <Link key={product._id} href={product.slug ? `/products/connectors/${product.slug}` : "#"}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=300&width=300&query=RF+connector"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="rounded-lg mb-3 w-full aspect-square object-cover"
                    />
                    {product.seriesName && (
                      <div className="text-xs text-primary font-semibold mb-1">{product.seriesName} Series</div>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                    {product.shortDescription && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.shortDescription}</p>
                    )}
                    {/* Key specs chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.frequencyMax && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          DC-{product.frequencyMax}GHz
                        </span>
                      )}
                      {product.impedance && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {product.impedance}Ω
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* SEO Text Block */}
          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About RF Coaxial Connectors</h2>
            <p className="text-muted-foreground mb-4">
              RF coaxial connectors are precision-engineered components designed to maintain signal integrity in
              high-frequency applications. At Baierde Electronic, we manufacture a comprehensive range of RF connectors
              that meet international IEC and GB standards, serving telecommunications, aerospace, medical, and
              industrial markets worldwide.
            </p>
            <p className="text-muted-foreground mb-4">
              Our connector portfolio includes industry-standard series such as SMA (SubMiniature version A) for
              applications up to 18GHz, MMCX and MCX for compact designs up to 6GHz, BNC for test equipment up to 4GHz,
              and specialized high-frequency SMP connectors for applications reaching 40GHz. Each series is available in
              multiple configurations including straight, right angle, PCB mount, bulkhead, and cable mount versions.
            </p>
            <p className="text-muted-foreground">
              With over 150 employees and 210+ sets of precision CNC equipment, Baierde Electronic combines advanced
              manufacturing capabilities with rigorous quality control. Every connector undergoes 100% inspection in our
              in-house laboratory using network analyzers and precision test equipment to ensure consistent performance,
              low insertion loss, and excellent VSWR characteristics. We also provide OEM/ODM services for custom
              connector designs tailored to your specific application requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
