"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:info@brdconnector.com?subject=Quote Request for ${encodeURIComponent(productTitle)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0ACompany: ${encodeURIComponent(formData.company)}%0D%0ACountry: ${encodeURIComponent(formData.country)}%0D%0AProduct: ${encodeURIComponent(productTitle)} (${productSlug})%0D%0AQuantity: ${encodeURIComponent(formData.quantity)}%0D%0AMessage: ${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Button type="submit" size="lg" className="w-full bg-primary text-foreground hover:bg-primary-dark">
        Request Quote for This Product
      </Button>
    </form>
  )
}
