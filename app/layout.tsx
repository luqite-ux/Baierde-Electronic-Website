import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ConditionalSiteLayout } from "@/components/conditional-site-layout"
import { getPopularSeries } from "@/lib/sanity.data"
import { cookies } from "next/headers"
import { getSiteContent, PREVIEW_COOKIE } from "@/lib/site-content/site-content"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://brdelectronic.com"),
  title: {
    default: "RF Coaxial Connectors & Cable Assemblies | Baierde Electronic",
    template: "%s | Baierde Electronic",
  },
  description:
    "Professional manufacturer of RF coaxial connectors, adapters, and cable assemblies since 2006. IEC certified, OEM/ODM services, worldwide delivery.",
  keywords: [
    "RF connectors",
    "coaxial connectors",
    "SMA connectors",
    "MMCX connectors",
    "RF adapters",
    "cable assemblies",
    "B2B electronics",
  ],
  authors: [{ name: "Zhenjiang Baierde Electronic Co., Ltd." }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brdelectronic.com",
    siteName: "Baierde Electronic",
    title: "RF Coaxial Connectors & Cable Assemblies | Baierde Electronic",
    description: "Professional manufacturer of RF coaxial connectors, adapters, and cable assemblies since 2006.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RF Coaxial Connectors & Cable Assemblies | Baierde Electronic",
    description: "Professional manufacturer of RF coaxial connectors, adapters, and cable assemblies since 2006.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
    generator: 'v0.app'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const popularSeries = await getPopularSeries()
  const preview = (await cookies()).has(PREVIEW_COOKIE)
  let snapshot
  let previewFailed = false
  try { snapshot = await getSiteContent("en") } catch (error) {
    if (!preview) throw error
    previewFailed = true
  }
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {preview && <aside role="status" className="border-b bg-amber-100 p-3 text-center text-black">Website content preview — not published.
          <form action="/api/site-content/exit-preview" method="POST"><button type="submit" className="underline">Exit preview</button></form>
        </aside>}
        {previewFailed ? <main className="p-8">Preview expired or unavailable. Exit preview and prepare a new preview from the admin.</main> :
          <ConditionalSiteLayout popularSeries={popularSeries} contentModules={snapshot?.pages.find(page => page.path === "/")?.modules}>{children}</ConditionalSiteLayout>}
        {!preview && <Analytics />}
        {!preview && process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
          <script
            async
            src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
          />
        )}
      </body>
    </html>
  )
}
