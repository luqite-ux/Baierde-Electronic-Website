import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug } from "@/lib/sanity.data"
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

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const url = `https://brdelectronic.com/products/connectors/${slug}`

  return {
    title: `${product.title} | RF Coaxial Connectors | Baierde`,
    description: product.shortDescription || `High-quality ${product.title} RF coaxial connector from Baierde Electronic.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | Baierde Electronic`,
      description: product.shortDescription || `High-quality ${product.title} RF coaxial connector.`,
      url: url,
      siteName: "Baierde Electronic",
      images: product.imageUrl
        ? [
            {
              url: product.imageUrl,
              width: 1200,
              height: 630,
              alt: product.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

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

          {/* Key Specifications */}
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase">Specifications</h3>
              <div className="space-y-3">
                {product.frequencyMax && (
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-sm font-medium">Frequency Range</span>
                    <span className="text-sm text-muted-foreground">DC-{product.frequencyMax}GHz</span>
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
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
