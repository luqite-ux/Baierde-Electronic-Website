import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const fullName = body.fullName || ""
    const email = body.email || ""
    const company = body.company || ""
    const country = body.country || ""
    const product = body.product || ""
    const quantity = body.quantity || ""
    const message = body.message || ""

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const toList = (process.env.RFQ_TO || "info@brdconnector.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const subject = `New RFQ Inquiry - ${product || "Website"} (${company || "Unknown Company"})`

    await resend.emails.send({
      from: process.env.RFQ_FROM || "RFQ <onboarding@resend.dev>",
      to: toList,
      replyTo: email,
      subject,
      html: `
        <h2>New RFQ Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    })

    return Response.json({ ok: true })
  } catch (err: any) {
    return Response.json({ error: err?.message || "Server error" }, { status: 500 })
  }
}
