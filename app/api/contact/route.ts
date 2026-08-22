import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

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
  captchaToken?: string
  captchaAnswer?: string
  captchaScope?: string
}

/**
 * 询盘只写入 Sanity 后台，不再发送邮件。
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_TENANT_ID || !process.env.CAPTCHA_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Inquiry service is not configured." },
        { status: 500 }
      )
    }

    const name = body.name?.trim() ?? ''
    const email = body.email?.trim() ?? ''
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid name and email.' }, { status: 400 })
    }

    let captchaResult
    try {
      const { tenantId: captchaTenantId, siteScope, store } = createSupabaseCaptchaContextFromEnv()
      captchaResult = await verifyCaptchaSubmission({
        secret: process.env.CAPTCHA_SECRET,
        tenantId: captchaTenantId,
        siteScope,
        store,
        scope: body.captchaScope ?? '',
        token: body.captchaToken ?? '',
        answer: body.captchaAnswer ?? '',
      })
    } catch {
      return NextResponse.json({ ok: false, error: 'Verification service is temporarily unavailable.' }, { status: 503 })
    }
    if (!captchaResult.ok) {
      return NextResponse.json({ ok: false, error: 'The verification code is invalid or expired. Please try again.' }, { status: 400 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
    const message = [body.message, body.product && `Product: ${body.product}`, body.quantity && `Quantity: ${body.quantity}`, body.country && `Country: ${body.country}`, body.productSlug && `Product slug: ${body.productSlug}`, body.attachmentFileName && `Attachment: ${body.attachmentFileName}`].filter(Boolean).join('\n')
    const { error } = await supabase.from('inquiries').insert({
      tenant_id: process.env.NEXT_PUBLIC_TENANT_ID,
      name,
      email,
      company: body.company ?? "",
      subject: body.product ? `Website inquiry: ${body.product}` : 'Website inquiry',
      message,
      status: 'unread',
    })
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : typeof e === 'object' && e && 'message' in e ? String(e.message) : "Unexpected error"
    return NextResponse.json(
      { ok: false, error: msg },
      { status: 500 }
    )
  }
}
