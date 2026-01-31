import { Resend } from "resend"
import { NextResponse } from "next/server"
import { createSanityWriteClient } from "@/lib/sanity.write"

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = "luqite@gmail.com"
const FROM = "Website RFQ <noreply@brdelectronic.com>"
const SUBJECT = "New RFQ Inquiry from Website"

type ContactBody = {
  name?: string
  email?: string
  company?: string
  country?: string
  product?: string
  quantity?: string
  message?: string
  attachmentFileName?: string
  productSlug?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildHtml(body: ContactBody): string {
  const row = (label: string, value: string) =>
    value
      ? `  <tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;color:#374151;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(String(value))}</td></tr>`
      : ""
  const attachment = body.attachmentFileName
    ? row("Attachment (filename)", body.attachmentFileName)
    : ""

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#111;">
  <h2 style="margin-bottom:16px;">New RFQ / Contact Form Submission</h2>
  <table style="border-collapse:collapse;">
    ${row("Name", body.name || "")}
    ${row("Email", body.email || "")}
    ${row("Company", body.company || "")}
    ${row("Country", body.country || "")}
    ${row("Product Interest", body.product || "")}
    ${row("Estimated Quantity", body.quantity || "")}
    ${row("Message", body.message || "")}
    ${body.productSlug ? row("Product Slug", body.productSlug) : ""}
    ${attachment}
  </table>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody

    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "SANITY_WRITE_TOKEN is not configured.", step: "sanity" as const },
        { status: 500 }
      )
    }

    const sanityWriteClient = createSanityWriteClient()

    let inquiryId: string | undefined
    try {
      const doc = await sanityWriteClient.create({
        _type: "inquiry",
        name: body.name ?? "",
        email: body.email ?? "",
        company: body.company ?? "",
        country: body.country ?? "",
        product: body.product ?? "",
        quantity: body.quantity ?? "",
        message: body.message ?? "",
        productSlug: body.productSlug ?? "",
        attachmentFileName: body.attachmentFileName ?? "",
        status: "new",
        createdAt: new Date().toISOString(),
      })
      inquiryId = doc._id
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sanity create failed"
      return NextResponse.json(
        { ok: false, error: msg, step: "sanity" as const },
        { status: 500 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is not configured.", step: "resend" as const, inquiryId },
        { status: 500 }
      )
    }

    const html = buildHtml(body)
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO_EMAIL,
      subject: SUBJECT,
      html,
    })

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "Failed to send email.", step: "resend" as const, inquiryId },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, inquiryId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error"
    return NextResponse.json(
      { ok: false, error: msg },
      { status: 500 }
    )
  }
}
