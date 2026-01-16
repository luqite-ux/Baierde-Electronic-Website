import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = body.fullName || "";
    const email = body.email || "";
    const company = body.company || "";
    const country = body.country || "";
    const product = body.product || "";
    const quantity = body.quantity || "";
    const message = body.message || "";

    await resend.emails.send({
      from: "RFQ <rfq@brdelectronic.com>",
      to: ["info@brdconnector.com"],
      replyTo: email,
      subject: `New RFQ Inquiry – ${product || "Website"}`,
      html: `
        <h2>New RFQ Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Estimated Quantity:</strong> ${quantity}</p>
        <p><strong>Message:</strong><br/>${(message || "-").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("RFQ error:", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
