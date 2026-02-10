'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StickyRFQ } from '@/components/sticky-rfq'
import type { PopularSeriesItem } from '@/lib/sanity.data'

/**
 * 站点布局：/studio 下不渲染 Header/Footer/main，避免破坏 Sanity Studio 的 theme 上下文。
 * 其余路由正常渲染站点 chrome。
 */
export function ConditionalSiteLayout({
  children,
  popularSeries = [],
}: {
  children: React.ReactNode
  popularSeries?: PopularSeriesItem[]
}) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Header popularSeries={popularSeries} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyRFQ />
    </>
  )
}
