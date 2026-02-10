import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug, getSeriesBySlug, getConnectorProducts } from "@/lib/sanity.data"
import { getFrequencyAndImpedanceFromDetailSpecs } from "@/lib/specs-fallback"
import type { Metadata } from "next"

/** 将 YouTube / Vimeo 页面 URL 转为 iframe embed URL */
function getEmbedUrl(
  videoUrl: string | null | undefined,
  videoType: string | null | undefined
): string | null {
  if (!videoUrl || !videoType) return null
  if (videoType === "youtube") {
    const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/)
    return m ? `https://www.youtube.com/embed/${m[1]}` : null
  }
  if (videoType === "vimeo") {
    const m = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return m ? `https://player.vimeo.com/video/${m[1]}` : null
  }
  return null
}

/** 判断是否有可展示的产品视频（含 upload / youtube / vimeo） */
function hasProductVideo(pv: { videoType?: string | null; videoFileUrl?: string | null; videoUrl?: string | null } | null | undefined): boolean {
  if (!pv?.videoType) return false
  if (pv.videoType === "upload") return !!(pv.videoFileUrl?.trim())
  if (pv.videoType === "youtube" || pv.videoType === "vimeo") return !!(pv.videoUrl?.trim())
  return false
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (product) {
    const url = `https://brdelectronic.com/products/connectors/${slug}`
    return {
      title: `${product.title} | RF Coaxial Connectors | Baierde`,
      description: product.shortDescription || `High-quality ${product.title} RF coaxial connector from Baierde Electronic.`,
      alternates: { canonical: url },
      openGraph: {
        title: `${product.title} | Baierde Electronic`,
        description: product.shortDescription || `High-quality ${product.title} RF coaxial connector.`,
        url: url,
        siteName: "Baierde Electronic",
        images: product.imageUrl ? [{ url: product.imageUrl, width: 1200, height: 630, alt: product.title }] : [],
        locale: "en_US",
        type: "website",
      },
    }
  }
  const series = await getSeriesBySlug("connectors", slug)
  if (series) {
    const url = `https://brdelectronic.com/products/connectors/${slug}`
    const title = `${series.name} Connectors | RF Coaxial Connectors | Baierde`
    return {
      title,
      description: `${series.name} series RF coaxial connectors. Professional-grade, IEC certified.`,
      alternates: { canonical: url },
      openGraph: {
        title: `${series.name} Connectors | Baierde Electronic`,
        description: `${series.name} series RF coaxial connectors.`,
        url: url,
        siteName: "Baierde Electronic",
        locale: "en_US",
        type: "website",
      },
    }
  }
  return { title: "Not Found" }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (product) {
    return <ProductDetailView slug={slug} product={product} />
  }
  const series = await getSeriesBySlug("connectors", slug)
  if (series) {
    return <SeriesPageView slug={slug} series={series} />
  }
  notFound()
}

/** 产品详情视图 */
async function ProductDetailView({
  slug,
  product,
}: {
  slug: string
  product: Awaited<ReturnType<typeof getProductBySlug>> & { title: string }
}) {

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: "RF Coaxial Connectors", href: "/products/connectors" },
    { label: product.title },
  ]

  // Map mounting type values to display names
  const mountingTypeMap: Record<string, string> = {
    straight: "Straight",
    "right-angle": "Right Angle",
    pcb: "PCB Mount",
    bulkhead: "Bulkhead",
    cable: "Cable Mount",
  }

  const mountingDisplayName = product.mountingType
    ? mountingTypeMap[product.mountingType] || product.mountingType
    : null

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.shortDescription || product.title,
            image: product.imageUrl || undefined,
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
              url: `https://brdelectronic.com/products/connectors/${slug}`,
            },
          }),
        }}
      />

      {/* VideoObject JSON-LD：仅当 productVideo 有效时输出，便于 Google 视频索引收录 */}
      {hasProductVideo(product.productVideo) && (() => {
        const pv = product.productVideo!
        const vName = pv.title || product.title
        const vDesc = (pv.description || product.shortDescription || product.title || "").slice(0, 300)
        const vThumb = pv.posterUrl || product.imageUrl
        const pageUrl = `https://brdelectronic.com/products/connectors/${slug}`
        const videoLd: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: vName,
          description: vDesc,
          thumbnailUrl: vThumb || undefined,
          uploadDate: product.createdAt || product.updatedAt || new Date().toISOString(),
          publisher: { "@type": "Organization", name: "Baierde Electronic" },
          potentialAction: { "@type": "WatchAction", target: [pageUrl] },
        }
        if (pv.videoType === "upload" && pv.videoFileUrl) videoLd.contentUrl = pv.videoFileUrl
        if (pv.videoType === "youtube" || pv.videoType === "vimeo") {
          const embed = getEmbedUrl(pv.videoUrl, pv.videoType)
          if (embed) videoLd.embedUrl = embed
        }
        if (pv.videoType === "upload" && !videoLd.embedUrl) videoLd.embedUrl = pageUrl
        return (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
        )
      })()}

      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid gap-8 lg:grid-cols-2 mb-12">
        {/* Product Image & Video（主图下方；productVideo：upload→video 标签，youtube/vimeo→iframe） */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.productVideo?.videoType === "upload" && product.productVideo.videoFileUrl && (
            <div className="rounded-lg overflow-hidden border border-border bg-muted shadow-sm">
              <video
                controls
                preload="metadata"
                poster={product.productVideo.posterUrl ?? undefined}
                className="w-full aspect-video object-contain"
              >
                <source src={product.productVideo.videoFileUrl} type="video/mp4" />
                <source src={product.productVideo.videoFileUrl} type="video/webm" />
              </video>
            </div>
          )}
          {(product.productVideo?.videoType === "youtube" || product.productVideo?.videoType === "vimeo") &&
            product.productVideo.videoUrl &&
            (() => {
              const embed = getEmbedUrl(product.productVideo.videoUrl, product.productVideo.videoType)
              if (!embed) return null
              return (
                <div className="rounded-lg overflow-hidden border border-border bg-muted shadow-sm aspect-video">
                  <iframe
                    src={embed}
                    title={product.productVideo.title || product.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
            })()}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.seriesName && (
            <Badge variant="secondary" className="text-sm font-semibold">
              {product.seriesName} Series
            </Badge>
          )}

          <div>
            <h1 className="text-4xl font-bold mb-4 text-balance">{product.title}</h1>
            {product.shortDescription && (
              <p className="text-lg text-muted-foreground leading-relaxed">{product.shortDescription}</p>
            )}
          </div>

          {/* Key Specifications：由 getProductBySlug 统一设为 getSpecsForSeries（规格书红框参数），与列表同源 */}
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">Specifications</h3>
              <div className="space-y-3">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec: { label: string; value: string }, index: number) => (
                    <div key={index} className="flex justify-between items-center border-b border-border pb-2">
                      <span className="text-sm font-medium">{spec.label}</span>
                      <span className="text-sm text-muted-foreground">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    {product.frequencyMax != null && product.frequencyMax > 0 && (
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="text-sm font-medium">Frequency Range</span>
                        <span className="text-sm text-muted-foreground">DC-{product.frequencyMax} GHz</span>
                      </div>
                    )}
                    {product.impedance && (
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="text-sm font-medium">Impedance</span>
                        <span className="text-sm text-muted-foreground">{product.impedance}Ω</span>
                      </div>
                    )}
                    {mountingDisplayName && (
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="text-sm font-medium">Mounting Type</span>
                        <span className="text-sm text-muted-foreground">{mountingDisplayName}</span>
                      </div>
                    )}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="text-sm font-medium">Tags</span>
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Request Quote Button */}
          <Button asChild size="lg" className="w-full bg-primary text-foreground hover:bg-primary-dark">
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

/** 系列页视图：slug 为系列 slug（如 d4）时展示该系列产品列表，避免 404 */
async function SeriesPageView({
  slug,
  series,
}: {
  slug: string
  series: { _id: string; name: string; slug: string | null }
}) {
  const products = await getConnectorProducts({ series: [series.name] })
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: "RF Coaxial Connectors", href: "/products/connectors" },
    { label: `${series.name} Series` },
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{series.name} Connector Series</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {series.name} series RF coaxial connectors. Professional-grade, IEC certified.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            href={product.slug ? `/products/connectors/${product.slug}` : "#"}
          >
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
                {/* 与详情同源：getFrequencyAndImpedanceFromDetailSpecs → getSpecsForSeries */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {(() => {
                    const { frequency, impedance } = getFrequencyAndImpedanceFromDetailSpecs(
                      product.seriesName ?? null,
                      product.title ?? ""
                    )
                    return (
                      <>
                        {frequency && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">{frequency}</span>
                        )}
                        {impedance && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">{impedance}</span>
                        )}
                      </>
                    )
                  })()}
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-muted-foreground">暂无 {series.name} 系列产品。</p>
      )}
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/products/connectors">Back to RF Coaxial Connectors</Link>
        </Button>
      </div>
    </div>
  )
}
