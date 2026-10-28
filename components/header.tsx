"use client"

import { contentReader, type ContentModules } from "@/lib/site-content/reader"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { PopularSeriesItem } from "@/lib/sanity.data"

export function Header({ popularSeries = [], contentModules = [] }: { popularSeries?: PopularSeriesItem[]; contentModules?: ContentModules }) {
  const copy = contentReader(contentModules)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo1.png" alt="Baierde Electronic" width={200} height={80} className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link href={copy.href("home","/")} className="hq-typography text-sm font-medium text-foreground hover:text-primary transition-colors" style={copy.style("navigation", "items.home.label")}>{copy.nav("home","Home")}</Link>

          <div className="relative group">
            <button className="hq-typography flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors" style={copy.style("navigation", "items.products.label")}>{copy.nav("products","Products")}<ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-64">
                <Link href={copy.href("all-products","/products")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.all-products.label")}>{copy.nav("all-products","All Products")}</Link>
                <div className="border-t border-border my-2" />
                <Link href={copy.href("rf-coaxial-connectors","/products/connectors")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.rf-coaxial-connectors.label")}>{copy.nav("rf-coaxial-connectors","RF Coaxial Connectors")}</Link>
                <Link href={copy.href("rf-adapters","/products/adapters")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.rf-adapters.label")}>{copy.nav("rf-adapters","RF Adapters")}</Link>
                <Link href={copy.href("rf-cable-assemblies","/products/cable-assemblies")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.rf-cable-assemblies.label")}>{copy.nav("rf-cable-assemblies","RF Cable Assemblies")}</Link>
                {popularSeries.length > 0 && (
                  <>
                    <div className="border-t border-border my-2" />
                    <div className="hq-typography px-3 py-1 text-xs text-muted-foreground font-semibold" style={copy.style("navigation", "captions.popular-series.label")}>{copy.nav("popular-series","Popular Series")}</div>
                    {popularSeries.map((series) => (
                      <Link
                        key={series._id}
                        href={series.slug ? `/products/connectors/${series.slug.toLowerCase()}` : "#"}
                        className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        {series.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="hq-typography flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors" style={copy.style("navigation", "items.solutions.label")}>{copy.nav("solutions","Solutions")}<ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-56">
                <Link href={copy.href("all-applications","/applications")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.all-applications.label")}>{copy.nav("all-applications","All Applications")}</Link>
                <div className="border-t border-border my-2" />
                <Link href={copy.href("telecom-5g","/applications/telecom-5g")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.telecom-5g.label")}>{copy.nav("telecom-5g","Telecom & 5G")}</Link>
                <Link href={copy.href("automotive","/applications/automotive")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.automotive.label")}>{copy.nav("automotive","Automotive")}</Link>
                <Link href={copy.href("medical-devices","/applications/medical")} className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md" style={copy.style("navigation", "subitems.medical-devices.label")}>{copy.nav("medical-devices","Medical Devices")}</Link>
                <Link
                  href={copy.href("test-measurement","/applications/instrumentation")}
                  className="hq-typography block px-3 py-2 text-sm hover:bg-muted rounded-md"
                 style={copy.style("navigation", "subitems.test-measurement.label")}>{copy.nav("test-measurement","Test & Measurement")}</Link>
              </div>
            </div>
          </div>

          <Link
            href={copy.href("manufacturing","/manufacturing")}
            className="hq-typography text-sm font-medium text-foreground hover:text-primary transition-colors"
           style={copy.style("navigation", "items.manufacturing.label")}>{copy.nav("manufacturing","Manufacturing")}</Link>
          <Link href={copy.href("about","/about")} className="hq-typography text-sm font-medium text-foreground hover:text-primary transition-colors" style={copy.style("navigation", "items.about.label")}>{copy.nav("about","About")}</Link>
          <Link href={copy.href("contact","/contact")} className="hq-typography text-sm font-medium text-foreground hover:text-primary transition-colors" style={copy.style("navigation", "items.contact.label")}>{copy.nav("contact","Contact")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild className="hidden md:flex bg-primary text-foreground hover:bg-primary-dark">
            <Link href={copy.href("request-quote","/contact")} style={copy.style("navigation", "items.request-quote.label")} className="hq-typography">{copy.nav("request-quote","Request Quote")}</Link>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            <Link href={copy.href("home","/")} className="hq-typography text-sm font-medium" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "items.home.label")}>{copy.nav("home","Home")}</Link>

            <div>
              <button
                className="hq-typography flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setProductsOpen(!productsOpen)}
               style={copy.style("navigation", "items.products.label")}>{copy.nav("products","Products")}<ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link href={copy.href("all-products","/products")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.all-products.label")}>{copy.nav("all-products","All Products")}</Link>
                  <Link href={copy.href("rf-coaxial-connectors","/products/connectors")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.rf-coaxial-connectors.label")}>{copy.nav("rf-coaxial-connectors","RF Coaxial Connectors")}</Link>
                  <Link href={copy.href("rf-adapters","/products/adapters")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.rf-adapters.label")}>{copy.nav("rf-adapters","RF Adapters")}</Link>
                  <Link href={copy.href("rf-cable-assemblies","/products/cable-assemblies")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.rf-cable-assemblies.label")}>{copy.nav("rf-cable-assemblies","RF Cable Assemblies")}</Link>
                  {popularSeries.length > 0 && (
                    <>
                      <div className="border-t border-border my-2 pt-2 mt-2">
                        <div className="hq-typography text-xs text-muted-foreground font-semibold mb-2" style={copy.style("navigation", "captions.popular-series.label")}>{copy.nav("popular-series","Popular Series")}</div>
                        {popularSeries.map((series) => (
                          <Link
                            key={series._id}
                            href={series.slug ? `/products/connectors/${series.slug.toLowerCase()}` : "#"}
                            className="block text-sm py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {series.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                className="hq-typography flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
               style={copy.style("navigation", "items.solutions.label")}>{copy.nav("solutions","Solutions")}{" "}
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link href={copy.href("all-applications","/applications")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.all-applications.label")}>{copy.nav("all-applications","All Applications")}</Link>
                  <Link href={copy.href("telecom-5g","/applications/telecom-5g")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.telecom-5g.label")}>{copy.nav("telecom-5g","Telecom & 5G")}</Link>
                  <Link href={copy.href("automotive","/applications/automotive")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.automotive.label")}>{copy.nav("automotive","Automotive")}</Link>
                  <Link href={copy.href("medical-devices","/applications/medical")} className="hq-typography text-sm" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "subitems.medical-devices.label")}>{copy.nav("medical-devices","Medical Devices")}</Link>
                  <Link
                    href={copy.href("test-measurement","/applications/instrumentation")}
                    className="hq-typography text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                   style={copy.style("navigation", "subitems.test-measurement.label")}>{copy.nav("test-measurement","Test & Measurement")}</Link>
                </div>
              )}
            </div>

            <Link href={copy.href("manufacturing","/manufacturing")} className="hq-typography text-sm font-medium" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "items.manufacturing.label")}>{copy.nav("manufacturing","Manufacturing")}</Link>
            <Link href={copy.href("about","/about")} className="hq-typography text-sm font-medium" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "items.about.label")}>{copy.nav("about","About")}</Link>
            <Link href={copy.href("contact","/contact")} className="hq-typography text-sm font-medium" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "items.contact.label")}>{copy.nav("contact","Contact")}</Link>
            <Link href={copy.href("search","/search")} className="hq-typography text-sm font-medium" onClick={() => setMobileMenuOpen(false)} style={copy.style("navigation", "items.search.label")}>{copy.nav("search","Search")}</Link>
            <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
              <Link href={copy.href("request-quote","/contact")} style={copy.style("navigation", "items.request-quote.label")} className="hq-typography">{copy.nav("request-quote","Request Quote")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
