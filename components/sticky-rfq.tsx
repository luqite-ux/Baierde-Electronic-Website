"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StickyRFQ() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <Button asChild size="lg" className="bg-primary text-foreground hover:bg-primary-dark shadow-lg h-14 px-6">
        <Link href="/contact">
          <MessageSquare className="mr-2 h-5 w-5" />
          Request a Quote
        </Link>
      </Button>
    </div>
  )
}
