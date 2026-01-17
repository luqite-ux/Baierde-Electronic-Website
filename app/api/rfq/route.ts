import { Resend } from "resend"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const body = await req.json()

    const fullName = body.fullName || ""
    const email = body.email || ""
    const company = body.company || ""
    const country = body.country || ""
    const product = body.product || ""
    const quantity = body.quantity || ""
    const message = body.message || ""

    // 收件人列表：优先用环境变量 RFQ_TO（逗号分隔），否则默认用你测试邮箱
    const toList = (process.env.RFQ_TO || "3293958@qq.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const subject = `New RFQ Inquiry - ${product || "Website"} (${company || "Unknown Company"})`

    // 发件人：生产环境建议用你在 Resend 里验证过的域名邮箱，例如 rfq@brdelectronic.com
    // 测试阶段可以先用 Resend 提供的 onboarding@resend.dev
    const from = process.env.RFQ_FROM || "RFQ <onboarding@resend.dev>"

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from,
      to: toList,
      replyTo: email || undefined,
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
