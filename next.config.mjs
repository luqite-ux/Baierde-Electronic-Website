/** @type {import('next').NextConfig} */
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
    return [
      { source: '/studio', destination: studioOrigin },
      { source: '/studio/:path*', destination: `${studioOrigin}/:path*` },
    ]
  },
}
export default nextConfig
