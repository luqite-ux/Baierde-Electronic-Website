"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { PopularSeriesItem } from "@/lib/sanity.data"

export function Header({ popularSeries = [] }: { popularSeries?: PopularSeriesItem[] }) {
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
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Products <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-64">
                <Link href="/products" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  All Products
                </Link>
                <div className="border-t border-border my-2" />
                <Link href="/products/connectors" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  RF Coaxial Connectors
                </Link>
                <Link href="/products/adapters" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  RF Adapters
                </Link>
                <Link href="/products/cable-assemblies" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  RF Cable Assemblies
                </Link>
                {popularSeries.length > 0 && (
                  <>
                    <div className="border-t border-border my-2" />
                    <div className="px-3 py-1 text-xs text-muted-foreground font-semibold">Popular Series</div>
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
            <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Solutions <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-56">
                <Link href="/applications" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  All Applications
                </Link>
                <div className="border-t border-border my-2" />
                <Link href="/applications/telecom-5g" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  Telecom & 5G
                </Link>
                <Link href="/applications/automotive" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  Automotive
                </Link>
                <Link href="/applications/medical" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                  Medical Devices
                </Link>
                <Link
                  href="/applications/instrumentation"
                  className="block px-3 py-2 text-sm hover:bg-muted rounded-md"
                >
                  Test & Measurement
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/manufacturing"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Manufacturing
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button asChild className="hidden md:flex bg-primary text-foreground hover:bg-primary-dark">
            <Link href="/contact">Request Quote</Link>
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
            <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>

            <div>
              <button
                className="flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                Products <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link href="/products" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    All Products
                  </Link>
                  <Link href="/products/connectors" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    RF Coaxial Connectors
                  </Link>
                  <Link href="/products/adapters" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    RF Adapters
                  </Link>
                  <Link href="/products/cable-assemblies" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    RF Cable Assemblies
                  </Link>
                  {popularSeries.length > 0 && (
                    <>
                      <div className="border-t border-border my-2 pt-2 mt-2">
                        <div className="text-xs text-muted-foreground font-semibold mb-2">Popular Series</div>
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
                className="flex w-full items-center justify-between text-sm font-medium"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
              >
                Solutions{" "}
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link href="/applications" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    All Applications
                  </Link>
                  <Link href="/applications/telecom-5g" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    Telecom & 5G
                  </Link>
                  <Link href="/applications/automotive" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    Automotive
                  </Link>
                  <Link href="/applications/medical" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                    Medical Devices
                  </Link>
                  <Link
                    href="/applications/instrumentation"
                    className="text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Test & Measurement
                  </Link>
                </div>
              )}
            </div>

            <Link href="/manufacturing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Manufacturing
            </Link>
            <Link href="/about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/search" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Search
            </Link>
            <Button asChild className="bg-primary text-foreground hover:bg-primary-dark">
              <Link href="/contact">Request Quote</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
