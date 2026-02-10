/**
 * 自动删除 Sanity 中「未被任何 product 引用」的 series（productCount == 0）
 *
 * 运行：pnpm exec tsx scripts/delete-empty-series.ts
 * 或：pnpm delete-empty-series
 *
 * 需要：.env.local 中 SANITY_WRITE_TOKEN（或 SANITY_API_TOKEN）
 */

import { config } from "dotenv"
import path from "path"
import { createClient } from "@sanity/client"

config({ path: path.resolve(process.cwd(), ".env.local") })
config({ path: path.resolve(process.cwd(), ".env") })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01"
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!projectId) {
  console.error("请设置 NEXT_PUBLIC_SANITY_PROJECT_ID（.env.local 或 .env）")
  process.exit(1)
}
if (!token) {
  console.error("请设置 SANITY_WRITE_TOKEN 或 SANITY_API_TOKEN（需要写入权限）")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

type SeriesRow = {
  _id: string
  name: string
  slug: string | null
  productCount: number
}

async function main() {
  const query = `
    *[_type == "series"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "productCount": count(*[_type == "product" && references(^._id)])
    }
  `
  const allSeries: SeriesRow[] = await client.fetch(query)
  const emptySeries = allSeries.filter((s) => s.productCount === 0)
  if (!emptySeries.length) {
    console.log("没有找到 productCount==0 的 series，无需删除。")
    return
  }

  console.log(`将删除 ${emptySeries.length} 条 series（productCount==0）：`)
  for (const s of emptySeries) {
    console.log(`- ${s.name} (slug: ${s.slug ?? "-"}), _id: ${s._id}`)
  }

  let deleted = 0
  for (const s of emptySeries) {
    await client.delete(s._id)
    deleted++
    console.log(`[${deleted}/${emptySeries.length}] 已删除: ${s._id} (${s.name})`)
  }

  console.log(`\n完成：已删除 ${deleted} 条 series。`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

