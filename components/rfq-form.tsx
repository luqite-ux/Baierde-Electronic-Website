"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function RFQForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    product: "",
    quantity: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Submit via API (no mailto)
const res = await fetch("/api/rfq", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: formData.name,
    email: formData.email,
    company: formData.company,
    country: formData.country,
    product: formData.product || "",
    quantity: formData.quantity || "",
    message: formData.message || "",
  }),
});

if (!res.ok) {
  // 如果你有 toast / setError，就在这里处理
  // setError("Submission failed. Please try again.");
  setIsSubmitting(false);
  return;
}

setIsSubmitted(true);
setIsSubmitting(false);
  }

  if (isSubmitted) {
    return (
      <Alert className="border-primary bg-primary/5">
        <CheckCircle className="h-5 w-5 text-primary" />
        <AlertDescription className="ml-2">
          <div className="font-semibold mb-1">Thank you for your inquiry!</div>
          <p className="text-sm text-muted-foreground">
            We've received your request and will respond within 24 hours. A copy has been sent to your email.
          </p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: "" })
            }}
            placeholder="John Smith"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              if (errors.email) setErrors({ ...errors, email: "" })
            }}
            placeholder="john@company.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name *</Label>
          <Input
            id="company"
            required
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value })
              if (errors.company) setErrors({ ...errors, company: "" })
            }}
            placeholder="Your Company Ltd."
            className={errors.company ? "border-destructive" : ""}
          />
          {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            required
            value={formData.country}
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value })
              if (errors.country) setErrors({ ...errors, country: "" })
            }}
            placeholder="United States"
            className={errors.country ? "border-destructive" : ""}
          />
          {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product">Product Interest</Label>
          <Input
            id="product"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            placeholder="SMA Connectors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Estimated Quantity</Label>
          <Input
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="1000 pieces"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value })
            if (errors.message) setErrors({ ...errors, message: "" })
          }}
          placeholder="Please provide details about your requirements..."
          rows={5}
          className={errors.message ? "border-destructive" : ""}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Attach File (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input id="file" type="file" className="hidden" />
          <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
          <span className="text-sm text-muted-foreground">Max 10MB</span>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-foreground hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request for Quote"}
      </Button>
    </form>
  )
}
