'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StickyRFQ } from '@/components/sticky-rfq'

/**
 * 站点布局：/studio 下不渲染 Header/Footer/main，避免破坏 Sanity Studio 的 theme 上下文。
 * 其余路由正常渲染站点 chrome。
 */
export function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyRFQ />
    </>
  )
}
