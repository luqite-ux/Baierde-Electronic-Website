import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ConditionalSiteLayout } from "@/components/conditional-site-layout"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ConditionalSiteLayout>{children}</ConditionalSiteLayout>
        <Analytics />
      </body>
    </html>
  )
}
