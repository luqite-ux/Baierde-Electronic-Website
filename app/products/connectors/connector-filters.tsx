"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { ProductFilters, type FilterState } from "@/components/product-filters"

function ConnectorFiltersInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize filters from URL params
  const getFiltersFromParams = (): FilterState => ({
    series: searchParams.getAll("series"),
    mounting: searchParams.getAll("mounting"),
    frequency: searchParams.getAll("frequency"),
    impedance: searchParams.getAll("impedance"),
  })

  const [filters, setFilters] = useState<FilterState>(getFiltersFromParams)

  // Update filters when URL changes
  useEffect(() => {
    setFilters(getFiltersFromParams())
  }, [searchParams])

  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams()
    
    // Add filter params
    newFilters.series.forEach(s => params.append("series", s))
    newFilters.mounting.forEach(m => params.append("mounting", m))
    newFilters.frequency.forEach(f => params.append("frequency", f))
    newFilters.impedance.forEach(i => params.append("impedance", i))
    
    // Update URL without page reload
    const newURL = params.toString() 
      ? `/products/connectors?${params.toString()}`
      : "/products/connectors"
    
    router.push(newURL)
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    updateURL(newFilters)
  }

  return <ProductFilters onFilterChange={handleFilterChange} />
}

export function ConnectorFilters() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <ConnectorFiltersInner />
    </Suspense>
  )
}
