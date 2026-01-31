"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProductQuoteFormProps {
  productTitle: string
  productSlug: string
}

export function ProductQuoteForm({ productTitle, productSlug }: ProductQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    product: productTitle,
    quantity: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: formData.country,
          product: formData.product,
          quantity: formData.quantity,
          message: formData.message,
          productSlug,
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || !data.ok) {
        setSubmitError(data.error || "Failed to send. Please try again.")
        return
      }
      setIsSubmitted(true)
    } catch {
      setSubmitError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Alert className="border-primary bg-primary/5">
        <CheckCircle className="h-5 w-5 text-primary" />
        <AlertDescription className="ml-2">
          <div className="font-semibold mb-1">Your inquiry has been sent successfully.</div>
          <p className="text-sm text-muted-foreground">We will respond within 24 hours.</p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pq-name">Full Name *</Label>
          <Input
            id="pq-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pq-email">Email *</Label>
          <Input
            id="pq-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pq-company">Company *</Label>
          <Input
            id="pq-company"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Your Company Ltd."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pq-country">Country *</Label>
          <Input
            id="pq-country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="United States"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pq-product">Product</Label>
          <Input id="pq-product" value={formData.product} disabled className="bg-muted" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pq-quantity">Estimated Quantity *</Label>
          <Input
            id="pq-quantity"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="e.g., 1000 pieces"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pq-message">Additional Requirements</Label>
        <Textarea
          id="pq-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please provide any specific requirements, technical details, or questions..."
          rows={4}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-foreground hover:bg-primary-dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Request Quote for This Product"}
      </Button>
    </form>
  )
}
