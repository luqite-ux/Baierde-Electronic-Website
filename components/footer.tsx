import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="mb-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo1.png"
                alt="Baierde Electronic RF Connector Manufacturer Logo"
                width={260}
                height={91}
                className="mb-3 h-auto w-[105px] md:w-[130px]"
              />
            </Link>
            <p className="text-xs text-muted-foreground/80 mb-4 leading-relaxed">
              Professional RF Coaxial Connector Manufacturer Since 2006
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivering precision-engineered RF coaxial connectors, adapters, and cable assemblies worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/connectors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  RF Coaxial Connectors
                </Link>
              </li>
              <li>
                <Link href="/products/adapters" className="text-muted-foreground hover:text-primary transition-colors">
                  RF Adapters
                </Link>
              </li>
              <li>
                <Link
                  href="/products/cable-assemblies"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  RF Cable Assemblies
                </Link>
              </li>
              <li>
                <Link
                  href="/products/connectors/sma"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  SMA Series
                </Link>
              </li>
              <li>
                <Link
                  href="/products/connectors/mmcx"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  MMCX Series
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/manufacturing" className="text-muted-foreground hover:text-primary transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-muted-foreground hover:text-primary transition-colors">
                  Quality & Certifications
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@brdconnector.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@brdconnector.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+8618136817958" className="text-muted-foreground hover:text-primary transition-colors">
                  +86 181 3681 7958
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/8618136817958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +86 181 3681 7958
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Zhongtian North Road, Xinfeng Town,
                  <br />
                  Dantu District, Zhenjiang City,
                  <br />
                  Jiangsu Province, China
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zhenjiang Baierde Electronic Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
