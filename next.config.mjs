/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, '').replace(/\/$/, '')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    // 分类卡片图片来自 Sanity CDN，需放行 cdn.sanity.io
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  // 生产环境 /studio 反向代理到独立部署的 Sanity Studio（同域名子路径）
  async rewrites() {
    const studioOrigin = 'https://brdelectronic.sanity.studio'
    const afterFiles = [
      { source: '/studio', destination: studioOrigin },
      { source: '/studio/:path*', destination: `${studioOrigin}/:path*` },
    ]

    if (adminUrl) {
      afterFiles.push(
        { source: '/admin', destination: `${adminUrl}/admin` },
        { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
      )
    }

    return { afterFiles }
  },
}
export default nextConfig
