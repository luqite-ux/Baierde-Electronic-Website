import Link from "next/link"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { FileText, Wrench, HelpCircle } from "lucide-react"
import { getCategories, getPopularSeries } from "@/lib/sanity.data"

export const metadata: Metadata = {
  title: "RF Connectors & Cable Assemblies | Product Catalog | Baierde",
  description:
    "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more. IEC certified quality.",
  alternates: {
    canonical: "https://brdelectronic.com/products",
  },
  openGraph: {
    title: "RF Connectors & Cable Assemblies | Product Catalog | Baierde",
    description:
      "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more.",
    url: "https://brdelectronic.com/products",
  },
}

// 开发环境刷新即可看到 Sanity 变化；生产建议 60，可改为 300 降低后台更新频率
export const revalidate = 60

export default async function ProductsPage() {
  const categories = await getCategories()
  const popularSeries = await getPopularSeries()

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "RF Connectors & Cable Assemblies",
            description:
              "Browse our complete range of RF coaxial connectors, adapters, and cable assemblies. SMA, MMCX, MCX, BNC, TNC series and more.",
            url: "https://brdelectronic.com/products",
          }),
        }}
      />

      <Breadcrumbs items={[{ label: "Products" }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">RF Connectors & Cable Assemblies</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Comprehensive range of RF coaxial connectors, adapters, and cable assemblies for telecommunications,
          automotive, medical, and industrial applications. All products manufactured to IEC/GB standards with strict
          quality control.
        </p>
      </div>

      {/* 分类卡片图片来自 Sanity category.image (Card Image)；标题、描述、链接亦来自 Sanity */}
      {categories.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {categories.map((category) => {
            const href = category.slug ? `/products/${category.slug}` : "#"
            // 严格空值检查：null/undefined/"" 都使用占位图
            const imageUrl = category.imageUrl && category.imageUrl.trim() !== "" 
              ? category.imageUrl 
              : "/placeholder.svg"
            // 提取分类名称的主要部分作为按钮文本
            const categoryName = category.title.replace(/^RF\s+/i, "").split(" ").pop() || category.title
            const buttonText = `View ${categoryName} →`

            return (
              <Link key={category._id} href={href}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Image
                      src={imageUrl}
                      alt={category.title}
                      width={400}
                      height={250}
                      className="rounded-lg mb-4 w-full object-cover aspect-video"
                    />
                    <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
                    <p className="text-muted-foreground mb-4">
                      {category.description || ""}
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      {buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

      {/* Popular Series */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Popular Connector Series</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {popularSeries.map((series) => {
            const href = series.slug ? `/products/connectors/${series.slug.toLowerCase()}` : "#"
            return (
              <Link key={series._id} href={href}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{series.name}</h3>
                    <p className="text-sm text-muted-foreground">{series.frequencyLabel || ""}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* How to Choose Guide */}
      <div className="mb-16 bg-muted/30 p-8 rounded-lg">
        <div className="flex items-start gap-4 mb-4">
          <Wrench className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Choose the Right RF Connector</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. Frequency Range</h3>
                <p className="text-muted-foreground">
                  Match the connector's frequency capability to your application. SMP for up to 40GHz, SMA for 18GHz,
                  MMCX/MCX for 6GHz, BNC for 4GHz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Physical Size</h3>
                <p className="text-muted-foreground">
                  Consider space constraints. MMCX and SSMA for compact designs, SMA for general use, N-Type for high
                  power.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Coupling Mechanism</h3>
                <p className="text-muted-foreground">
                  Threaded (SMA, SMC) for secure connections, snap-on (MCX, SMB) for quick mating, bayonet (BNC) for
                  tool-free locking.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Environment</h3>
                <p className="text-muted-foreground">
                  Assess temperature, vibration, and moisture. We offer ruggedized versions and various plating options
                  for harsh conditions.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="mt-6 bg-transparent">
              <Link href="/contact">Need Help Selecting? Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Download Resources */}
      <div className="mb-16 text-center">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Product Catalog</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Download our complete product catalog with technical specifications, dimensions, and ordering information for
          all RF connectors and cable assemblies.
        </p>
        <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark">
          <Link href="/contact?catalog=true">Download Catalog (PDF)</Link>
        </Button>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Product FAQ</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">How do I choose the right RF connector for my application?</h3>
            <p className="text-sm text-muted-foreground">
              Consider your frequency range, impedance requirements (50Ω or 75Ω), space constraints, and environmental
              conditions. Our technical team can provide consultation to help you select the optimal connector series.
              Contact us with your specifications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the difference between SMA and MMCX connectors?</h3>
            <p className="text-sm text-muted-foreground">
              SMA connectors are larger with threaded coupling and support frequencies up to 18GHz, making them ideal
              for telecom and test equipment. MMCX connectors are much more compact with snap-on coupling and support up
              to 6GHz, perfect for automotive and mobile applications where space is limited.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Are datasheets available for all products?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, detailed datasheets with specifications, dimensions, performance characteristics, and materials are
              available for all products. Download them from individual product pages or request them via our contact
              form.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I request custom connector configurations?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. We offer comprehensive OEM/ODM services for custom connector designs, special cable lengths,
              unique plating options, and application-specific modifications. Our engineering team will work with you
              from design to production.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What quality standards do your products meet?</h3>
            <p className="text-sm text-muted-foreground">
              All our RF connectors and cable assemblies are manufactured according to IEC and GB international
              standards. We maintain ISO 9001 certification and perform 100% inspection with our in-house QC laboratory
              using network analyzers and other precision test equipment.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What is the typical lead time for orders?</h3>
            <p className="text-sm text-muted-foreground">
              Standard products typically ship within 7-15 days. Custom cable assemblies require 15-30 days depending on
              complexity. Large volume orders and custom OEM projects are quoted individually. We also offer expedited
              production for urgent requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you provide samples for testing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we can provide samples for evaluation and testing purposes. Contact our sales team with your specific
              requirements and application details. Sample lead time is typically 3-7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
