import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ProductQuoteForm from "@/components/product-quote-form" // 去掉大括号
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data"
import { Download, Mail, FileText, Package, Cog } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const url = `https://brdelectronic.com/products/${slug}`

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: url,
      siteName: "Baierde Electronic",
      images: [
        {
          url: product.images[0] || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const categoryNames = {
    connectors: "RF Coaxial Connectors",
    adapters: "RF Adapters",
    "cable-assemblies": "RF Cable Assemblies",
  }

  const relatedProducts = await getRelatedProducts(product._id, product.series, product.category)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryNames[product.category], href: `/products/${product.category}` },
    { label: product.title, href: `/products/${slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images,
            sku: product.slug,
            brand: {
              "@type": "Brand",
              name: "Baierde Electronic",
            },
            manufacturer: {
              "@type": "Organization",
              name: "Zhenjiang Baierde Electronic Co., Ltd.",
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
              url: `https://brdelectronic.com/products/${slug}`,
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: `https://brdelectronic.com${item.href}`,
            })),
          }),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems.slice(1)} />

        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.images[0] || "/placeholder.svg?height=600&width=600"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnail gallery placeholder for future expansion */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Above Fold */}
          <div className="space-y-6">
            {product.series && (
              <Badge variant="secondary" className="text-sm font-semibold">
                {product.series} Series
              </Badge>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-balance">{product.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Key Specs as Chips */}
            <div className="flex flex-wrap gap-2">
              {product.specs.slice(0, 4).map((spec, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  <span className="text-xs">
                    {spec.label}: <strong>{spec.value}</strong>
                  </span>
                </Badge>
              ))}
            </div>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
                <a href="#request-quote">Request a Quote</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Link>
              </Button>
            </div>

            {/* Download Datasheet */}
            {product.datasheetUrl ? (
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href={product.datasheetUrl} download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Technical Datasheet (PDF)
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Request Technical Datasheet
                </Link>
              </Button>
            )}

            {/* Quick Specifications Card */}
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">Quick Specifications</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-border pb-2 last:border-0"
                    >
                      <span className="text-sm font-medium">{spec.label}</span>
                      <span className="text-sm text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="packaging">Packaging & Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="leading-relaxed">{product.description}</p>
                  {product.overview && <p className="leading-relaxed mt-4">{product.overview}</p>}
                  <p className="leading-relaxed mt-4">
                    All {product.title} units are manufactured in our ISO-certified facility using precision CNC
                    machining and undergo rigorous quality control testing. We ensure compliance with IEC and GB
                    international standards for reliable performance in demanding environments.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {product.specs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex flex-col space-y-1 p-4 rounded-lg bg-muted/50 border border-border"
                        >
                          <span className="text-sm font-semibold text-muted-foreground uppercase">{spec.label}</span>
                          <span className="text-lg font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Custom specifications available upon request. Contact our engineering
                        team for detailed technical drawings and performance data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Applications & Industries</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Typical Applications</h3>
                      <ul className="space-y-2">
                        {product.applications && product.applications.length > 0 ? (
                          product.applications.map((app, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>{app}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>Telecommunications Infrastructure</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>Test & Measurement Equipment</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>Medical Device Electronics</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>Aerospace & Defense Systems</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2 text-primary">•</span>
                              <span>Automotive Electronics & GPS</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Industry Sectors</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>5G & Wireless Communications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>Industrial IoT & Smart Manufacturing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>Broadcasting & Video Distribution</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>Radar & Navigation Systems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span>Scientific Research Equipment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="packaging" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Packaging & Shipping Information</h2>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Package className="mr-2 h-5 w-5 text-primary" />
                        Standard Packaging
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.packagingInfo ||
                          "Products are individually packaged in anti-static bags and packed in sturdy cartons with foam protection. Bulk orders are packaged on pallets with shrink wrap and corner protection for safe international shipping."}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Standard Lead Time</h4>
                        <p className="text-sm text-muted-foreground">3-5 business days for stock items</p>
                        <p className="text-sm text-muted-foreground">2-3 weeks for custom orders</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Shipping Methods</h4>
                        <p className="text-sm text-muted-foreground">Express: DHL, FedEx, UPS (3-5 days)</p>
                        <p className="text-sm text-muted-foreground">Sea freight for large orders</p>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm">
                        <strong>Note:</strong> Custom packaging options available for OEM customers. Contact us for
                        white-label and branded packaging solutions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="mb-16 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Cog className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Need Customization?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We offer comprehensive OEM and ODM services for custom RF connector solutions. Our engineering team
                  can modify existing designs or develop entirely new products to meet your specific requirements
                  including custom frequency ranges, materials, plating options, and mechanical configurations.
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm mb-4">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Custom mechanical designs
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Special frequency requirements
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    Material & plating options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary">✓</span>
                    White-label & branded packaging
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
                  <Link href="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="request-quote" className="mb-16 scroll-mt-8">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Request a Quote for This Product</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our sales team will respond within 24 hours with pricing and availability.
                </p>
              </div>
              <ProductQuoteForm productTitle={product.title} productSlug={product.slug} />
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct._id} className="group hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg?height=200&width=200"}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {relatedProduct.series && (
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedProduct.series}
                      </Badge>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedProduct.shortDescription}</p>
                    <Button asChild variant="outline" className="w-full bg-transparent" size="sm">
                      <Link href={`/products/${relatedProduct.slug}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Explore more products in this category</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/products/${product.category}`}>{categoryNames[product.category]}</Link>
                  </Button>
                </CardContent>
              </Card>
              {product.series && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-3">View all {product.series} series products</p>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/products/connectors/${product.series.toLowerCase()}`}>{product.series} Series</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Browse all our products</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/products">All Products</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
