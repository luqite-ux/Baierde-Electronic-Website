import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, Users, Clock, Wrench, FlaskConical, Download, ArrowRight, CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { getCategories, getCatalogFile } from "@/lib/sanity.data"

export const metadata: Metadata = {
  title: "RF Coaxial Connectors & Cable Assemblies Manufacturer | IEC Certified | Baierde Electronic",
  description:
    "Leading RF coaxial connector manufacturer since 2006. IEC/GB certified quality, in-house CNC machining, OEM/ODM services. SMA, MMCX, MCX, BNC connectors. Fast quote response in 24h.",
  keywords:
    "RF connector manufacturer, coaxial connector, SMA connector, MMCX connector, cable assemblies, OEM ODM, IEC certified",
  alternates: {
    canonical: "https://brdelectronic.com",
  },
  openGraph: {
    title: "RF Coaxial Connectors & Cable Assemblies Manufacturer | Baierde Electronic",
    description: "IEC certified RF connector manufacturer. 20+ years experience, 150+ employees, OEM/ODM services.",
    url: "https://brdelectronic.com",
    siteName: "Baierde Electronic",
    locale: "en_US",
    type: "website",
  },
}

// 开发环境刷新即可看到 Sanity 变化；生产可改为 60 或 300 降低后台更新频率
export const revalidate = 0

export default async function HomePage() {
  // 分类卡片图片、标题、描述来自 Sanity category（Card Image = image 字段）
  const categories = await getCategories()
  const catalog = await getCatalogFile()

  const faqs = [
    {
      question: "What types of RF connectors do you manufacture?",
      answer:
        "We manufacture a comprehensive range of RF coaxial connectors including SMA, MMCX, MCX, BNC, TNC, SMP, N-Type, and custom OEM/ODM designs. Our connectors support frequencies from DC to 40GHz for telecom, automotive, medical, and industrial applications.",
    },
    {
      question: "What is your minimum order quantity (MOQ)?",
      answer:
        "Our MOQ varies by product type and customization level. For standard connectors, we can accommodate orders from 100 pieces. For custom OEM/ODM projects, MOQ depends on tooling requirements. Contact us to discuss your specific needs.",
    },
    {
      question: "What is your typical lead time for orders?",
      answer:
        "Standard catalog products ship within 2-3 weeks from order confirmation. Custom cable assemblies typically require 3-4 weeks. OEM/ODM projects range from 4-6 weeks depending on complexity. We offer expedited service for urgent requirements.",
    },
    {
      question: "Do you provide free samples?",
      answer:
        "Yes, we provide free samples for evaluation purposes. Customers only need to cover shipping costs. Sample requests are typically processed within 3-5 business days. Contact us with your specific connector requirements.",
    },
    {
      question: "What quality certifications do your products have?",
      answer:
        "All products are manufactured to IEC 61169 and GB standards. We maintain a comprehensive QC laboratory with network analyzers, salt spray chambers, and durability testers. Every connector undergoes 100% electrical and mechanical testing before shipment.",
    },
    {
      question: "Do you offer customization and OEM/ODM services?",
      answer:
        "Yes, we specialize in custom RF solutions. Our engineering team can develop connectors to your exact specifications including custom dimensions, plating options, impedance values, and packaging. We have extensive OEM/ODM experience with international clients.",
    },
    {
      question: "What shipping methods do you use for international orders?",
      answer:
        "We ship worldwide via DHL, FedEx, UPS, and TNT for express delivery (5-7 days). Sea freight is available for large orders. All products are carefully packaged to ensure safe arrival. We handle export documentation and customs clearance.",
    },
  ]

  return (
    <>
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zhenjiang Baierde Electronic Co., Ltd.",
            alternateName: "Baierde Electronic",
            url: "https://brdelectronic.com",
            logo: "/images/logo.png",
            description:
              "Professional RF coaxial connector and cable assembly manufacturer since 2006. IEC certified quality, OEM/ODM services.",
            foundingDate: "2006",
            email: "info@brdconnector.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zhenjiang",
              addressRegion: "Jiangsu",
              addressCountry: "CN",
            },
            sameAs: [
              "https://www.linkedin.com/company/baierde-electronic",
              "https://www.facebook.com/baierdeelectronic",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "127",
            },
          }),
        }}
      />

      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl text-balance mb-6">
                RF Coaxial Connectors & Cable Assemblies Manufacturer
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                IEC/GB certified precision RF connectors for global markets. Trusted by 50+ countries since 2006.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Fast RFQ response within 24 hours. OEM/ODM customization available.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                {catalog.fileUrl ? (
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={catalog.fileUrl}
                      download={catalog.fileName ?? "catalog"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Catalog
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" disabled>
                    <Download className="mr-2 h-5 w-5" />
                    Catalog not available yet.
                  </Button>
                )}
              </div>

              {/* Quick Value Props with Icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">IEC/GB Standards</div>
                    <div className="text-xs text-muted-foreground">Full compliance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Factory className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">In-house CNC</div>
                    <div className="text-xs text-muted-foreground">210+ equipment</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FlaskConical className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">QC Laboratory</div>
                    <div className="text-xs text-muted-foreground">100% tested</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">OEM/ODM</div>
                    <div className="text-xs text-muted-foreground">Custom solutions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">Fast Lead Time</div>
                    <div className="text-xs text-muted-foreground">2-3 weeks</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">150+ Employees</div>
                    <div className="text-xs text-muted-foreground">Expert team</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/e5-85-ac-e5-8f-b8-e5-a4-a7-e9-97-a8.jpg"
                alt="Baierde Electronic Manufacturing Facility"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Signals */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">2006</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Employees</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">210+</div>
              <div className="text-sm text-muted-foreground">Equipment Sets</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">Strict QC</div>
              <div className="text-sm text-muted-foreground">100% Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Product Range</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive RF connectivity solutions for telecommunications, automotive, medical, and industrial
              applications
            </p>
          </div>

          {/* 分类卡片图片来自 Sanity category.image (Card Image)；标题、描述、链接亦来自 Sanity */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {categories.map((category) => {
              const href = category.slug ? `/products/${category.slug}` : "#"
              const imageUrl =
                category.imageUrl && category.imageUrl.trim() !== "" ? category.imageUrl : "/placeholder.svg"
              const exploreText: Record<string, string> = {
                connectors: "Explore Connectors",
                adapters: "Explore Adapters",
                "cable-assemblies": "Explore Cable Assemblies",
              }
              const buttonLabel = exploreText[category.slug || ""] ?? `Explore ${category.title.replace(/^RF\s+/i, "")}`

              return (
                <Link
                  key={category._id}
                  href={href}
                  className="block h-full rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Card className="group h-full cursor-pointer border-2 border-inherit bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={imageUrl}
                          alt={category.title}
                          width={400}
                          height={300}
                          className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {category.description || ""}
                      </p>
                      <span className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground group-hover:bg-primary/90">
                        {buttonLabel} <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Popular Series Chips */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Popular Series</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge
                asChild
                variant="secondary"
                className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/products/connectors/sma">SMA Connectors</Link>
              </Badge>
              <Badge
                asChild
                variant="secondary"
                className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/products/connectors/mmcx">MMCX Connectors</Link>
              </Badge>
              <Badge
                asChild
                variant="secondary"
                className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/products/connectors/mcx">MCX Connectors</Link>
              </Badge>
              <Badge
                asChild
                variant="secondary"
                className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/products/connectors/smp">SMP Connectors</Link>
              </Badge>
              <Badge
                asChild
                variant="secondary"
                className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/products/connectors/bnc">BNC Connectors</Link>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted RF connectivity solutions across diverse industries worldwide
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/applications/telecom-5g" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/5g-telecom-tower-base-station-antenna-equipment.jpg"
                      alt="Telecom & 5G Networks"
                      width={300}
                      height={200}
                      className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Telecom & 5G
                  </h3>
                  <p className="text-sm text-muted-foreground">Base stations, antennas, network infrastructure</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/applications/automotive" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/automotive-electronics-gps-navigation-system-dashb.jpg"
                      alt="Automotive Electronics"
                      width={300}
                      height={200}
                      className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Automotive</h3>
                  <p className="text-sm text-muted-foreground">GPS, infotainment, ADAS, vehicle connectivity</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/applications/medical" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/medical-diagnostic-equipment-monitoring-device-hos.jpg"
                      alt="Medical Devices"
                      width={300}
                      height={200}
                      className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Medical Devices
                  </h3>
                  <p className="text-sm text-muted-foreground">Diagnostic equipment, patient monitoring systems</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/applications/instrumentation" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/oscilloscope-test-measurement-equipment-laboratory.jpg"
                      alt="Test & Measurement"
                      width={300}
                      height={200}
                      className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Test & Measurement
                  </h3>
                  <p className="text-sm text-muted-foreground">Oscilloscopes, analyzers, laboratory equipment</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturing & QC Teaser */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Advanced Manufacturing & Quality Control
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our 5,000m² facility houses 210+ precision CNC machines and automated production lines. Every connector
                undergoes rigorous testing in our IEC-compliant QC laboratory.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">In-house CNC machining and precision tooling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Network analyzers, salt spray, durability testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">100% electrical and mechanical inspection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">IEC 61169 and GB standards compliance</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default">
                  <Link href="/manufacturing">
                    View Manufacturing Process <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/quality">Quality Assurance Details</Link>
                </Button>
              </div>
            </div>

            <div className="relative grid grid-cols-1 gap-4">
              <Image
                src="/images/production-workshop.jpg"
                alt="Baierde Electronic CNC Production Workshop with BST-N20 Machines"
                width={600}
                height={300}
                className="rounded-lg shadow-xl w-full object-cover"
              />
              <Image
                src="/images/factory-lab.jpg"
                alt="Baierde Electronic Quality Control Laboratory with Testing Equipment"
                width={600}
                height={300}
                className="rounded-lg shadow-xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with SEO Schema */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about our RF connectors, manufacturing, and services
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Have more questions?</p>
              <Button asChild variant="default" size="lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get a free quote within 24 hours. Our engineering team is ready to discuss your RF connector requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
