import { Breadcrumbs } from "@/components/breadcrumbs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getProductsBySearch } from "@/lib/sanity.data"

export const metadata: Metadata = {
  title: "Search Products | Baierde Electronic",
  description: "Search our complete catalog of RF connectors, adapters, and cable assemblies.",
  alternates: {
    canonical: "https://brdelectronic.com/search",
  },
}

const POPULAR_LINKS = [
  { label: "SMA Connectors", href: "/products/connectors/sma" },
  { label: "MMCX Series", href: "/products/connectors/mmcx" },
  { label: "BNC Adapters", href: "/products/connectors/bnc" },
  { label: "Cable Assemblies", href: "/products/cable-assemblies" },
] as const

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams
  const q = typeof sp.q === "string" ? sp.q.trim() : ""

  const products = q ? await getProductsBySearch(q) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Search" }]} />

      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Search Products</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Find RF connectors, adapters, and cable assemblies
        </p>

        <form method="get" action="/search" className="flex gap-2 mb-8">
          <Input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search by product name, series, or specifications..."
            className="flex-1"
            aria-label="Search products"
          />
          <Button type="submit" className="bg-primary text-foreground hover:bg-primary/90 shrink-0">
            <Search className="h-5 w-5" aria-hidden />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <div className="text-center text-muted-foreground">
          <p className="mb-4">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {POPULAR_LINKS.map((item) => (
              <Button key={item.href} variant="outline" size="sm" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {q && (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {products.length > 0
              ? `${products.length} result${products.length === 1 ? "" : "s"} for “${q}”`
              : `No results for “${q}”`}
          </h2>
          {products.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={product.slug ? `/products/detail/${product.slug}` : "#"}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <Image
                        src={
                          product.imageUrl ||
                          "/placeholder.svg?height=300&width=300&query=RF+connector"
                        }
                        alt={product.title}
                        width={300}
                        height={300}
                        className="rounded-lg mb-3 w-full aspect-square object-cover"
                      />
                      {product.seriesName && (
                        <div className="text-xs text-primary font-semibold mb-1">
                          {product.seriesName} Series
                        </div>
                      )}
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                      {product.shortDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.shortDescription}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
