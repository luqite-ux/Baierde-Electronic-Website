import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RFQForm } from "@/components/rfq-form"
import { Mail, Phone, MapPin, Clock, CheckCircle2, Download, MessageCircle } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us & Request Quote | Baierde Electronic",
  description:
    "Get in touch with Baierde Electronic for RF connector inquiries, quotes, and technical support. Fast response guaranteed.",
  alternates: {
    canonical: "https://brdelectronic.com/contact",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Baierde Electronic",
  url: "https://brdelectronic.com",
  logo: "https://brdelectronic.com/logo.png",
  description: "RF Coaxial Connectors & Cable Assemblies Manufacturer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zhongtian North Road, Xinfeng Town, Dantu District",
    addressLocality: "Zhenjiang City",
    addressRegion: "Jiangsu Province",
    addressCountry: "CN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+86-181-3681-7958",
      contactType: "sales",
      email: "info@brdelectronic.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
  sameAs: [
    "https://linkedin.com/company/baierde-electronic",
    "https://twitter.com/baierde",
    "https://facebook.com/baierde",
  ],
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Get in touch with our team for product inquiries, technical support, or to request a quote. We typically
            respond within 24 hours.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">What to Include in Your RFQ</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Product series and specifications",
                    "Required quantity (MOQ)",
                    "Target price or budget",
                    "Expected delivery date",
                    "Application or industry",
                    "Technical drawings (if custom)",
                    "Quality standards required",
                    "Shipping destination",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Request for Quote (RFQ)</h2>
                <RFQForm />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Email</div>
                      <a
                        href="mailto:info@brdelectronic.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@brdelectronic.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Tel</div>
                      <a
                        href="tel:+8618136817958"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +86 181 3681 7958
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">WhatsApp</div>
                      <a
                        href="https://wa.me/8618136817958"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +86 181 3681 7958
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Address</div>
                      <div className="text-sm text-muted-foreground">
                        Zhongtian North Road, Xinfeng Town,
                        <br />
                        Dantu District, Zhenjiang City,
                        <br />
                        Jiangsu Province, China
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Business Hours</div>
                      <div className="text-sm text-muted-foreground">
                        Monday - Friday
                        <br />
                        9:00 AM - 6:00 PM (CST)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Product Catalog</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download our complete product catalog with specifications and pricing information.
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/catalog.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Catalog
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  Our sales team typically responds to inquiries within 24 hours. For urgent requests, please mention it
                  in your message.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-16 overflow-hidden">
          <CardContent className="p-0 h-[400px]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=119.3975%2C32.1845%2C119.4275%2C32.2145&layer=mapnik&marker=32.1995%2C119.4125"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              title="Baierde Electronic Location Map - Zhenjiang, Jiangsu, China"
              className="w-full h-full"
            />
          </CardContent>
        </Card>

        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions About Purchasing</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is your Minimum Order Quantity (MOQ)?</h3>
              <p className="text-sm text-muted-foreground">
                Our standard MOQ is 100 pieces for most standard products. For custom or specialized connectors, the MOQ
                may vary based on specifications. We can discuss flexible options for trial orders or sample
                requirements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What are your typical lead times?</h3>
              <p className="text-sm text-muted-foreground">
                Standard products: 7-15 days after order confirmation. Custom products: 15-30 days depending on
                complexity. Rush orders can be accommodated with additional coordination. Lead times may vary during
                peak seasons.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do you provide samples? How much do they cost?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we provide samples for evaluation. Standard product samples are available at nominal cost
                (typically $10-50 depending on the product). Sample fees can be deducted from your first bulk order.
                Shipping costs are typically paid by the customer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can you customize products to our specifications?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely. We offer OEM and ODM services with full customization capabilities. Our engineering team can
                work with your specifications, drawings, or samples to develop custom RF connectors, adapters, and cable
                assemblies. We provide prototyping, testing, and full production services.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What are your shipping terms and options?</h3>
              <p className="text-sm text-muted-foreground">
                We support EXW, FOB, CIF, and DDP terms. Shipping options include express (DHL, FedEx, UPS - 3-7 days),
                air freight (5-10 days), and sea freight (20-40 days). We work with reliable logistics partners to
                ensure safe and timely delivery worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What payment terms do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept T/T (wire transfer), L/C at sight, and PayPal for qualified customers. Standard terms are 30%
                deposit with 70% balance before shipment. Flexible payment terms can be discussed for long-term partners
                and large orders.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How quickly can I get a quote?</h3>
              <p className="text-sm text-muted-foreground">
                Standard product quotes are typically provided within 24 hours. Custom or complex inquiries may take 2-3
                business days as we evaluate technical requirements and manufacturing feasibility. For urgent quotes,
                please mark your inquiry as "urgent."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
