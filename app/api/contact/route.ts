import { NextResponse } from "next/server"
import { createSanityWriteClient } from "@/lib/sanity.write"

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

/**
 * 询盘只写入 Sanity 后台，不再发送邮件。
 */
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

    return NextResponse.json({ ok: true, inquiryId: doc._id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unexpected error"
    return NextResponse.json(
      { ok: false, error: msg },
      { status: 500 }
    )
  }
}
