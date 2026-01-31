"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConnectorSortSelectProps {
  defaultValue: string
}

function ConnectorSortSelectInner({ defaultValue }: ConnectorSortSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "popularity") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    
    const newURL = params.toString()
      ? `/products/connectors?${params.toString()}`
      : "/products/connectors"
    
    router.push(newURL)
  }

  return (
    <Select value={defaultValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popularity">Most Popular</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function ConnectorSortSelect(props: ConnectorSortSelectProps) {
  return (
    <Suspense fallback={
      <div className="w-[150px] h-10 border rounded-md flex items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    }>
      <ConnectorSortSelectInner {...props} />
    </Suspense>
  )
}
