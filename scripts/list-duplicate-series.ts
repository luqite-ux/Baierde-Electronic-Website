/**
 * 列出 Sanity 中重复的 series（同名或同 slug），便于在 Studio 中删除重复项
 * 会显示每个 series 的 _id、name、slug、关联产品数；重复的会标出
 *
 * 运行：pnpm exec tsx scripts/list-duplicate-series.ts
 * 需要 .env.local 中的 NEXT_PUBLIC_SANITY_PROJECT_ID 等（只读即可）
 */

import { config } from "dotenv"
import path from "path"
import { createClient } from "@sanity/client"

config({ path: path.resolve(process.cwd(), ".env.local") })
config({ path: path.resolve(process.cwd(), ".env") })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01"

if (!projectId) {
  console.error("请设置 NEXT_PUBLIC_SANITY_PROJECT_ID")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
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
  const list: SeriesRow[] = await client.fetch(query)

  const byName = new Map<string, SeriesRow[]>()
  const bySlug = new Map<string, SeriesRow[]>()
  for (const s of list) {
    const name = (s.name || "").trim()
    const slug = (s.slug || "").trim().toLowerCase()
    if (!byName.has(name)) byName.set(name, [])
    byName.get(name)!.push(s)
    if (slug) {
      if (!bySlug.has(slug)) bySlug.set(slug, [])
      bySlug.get(slug)!.push(s)
    }
  }

  const duplicateNames = [...byName.entries()].filter(([, arr]) => arr.length > 1)
  const duplicateSlugs = [...bySlug.entries()].filter(([, arr]) => arr.length > 1)

  console.log("========== 所有 Series ==========\n")
  for (const s of list) {
    const dupName = byName.get((s.name || "").trim())!.length > 1
    const dupSlug = s.slug && bySlug.get((s.slug || "").toLowerCase())!.length > 1
    const tag = dupName || dupSlug ? " [重复]" : ""
    console.log(`${s.name} (slug: ${s.slug ?? "-"})  _id: ${s._id}  产品数: ${s.productCount}${tag}`)
  }

  if (duplicateNames.length > 0) {
    console.log("\n========== 按「名称」重复的 Series（可保留一个、其余在 Studio 中删除）==========")
    for (const [name, arr] of duplicateNames) {
      console.log(`\n名称 "${name}" 共 ${arr.length} 条:`)
      for (const s of arr) {
        console.log(`  - _id: ${s._id}, slug: ${s.slug ?? "-"}, 产品数: ${s.productCount}`)
      }
      const withProducts = arr.filter((s) => s.productCount > 0)
      const withoutProducts = arr.filter((s) => s.productCount === 0)
      if (withProducts.length === 1 && withoutProducts.length > 0) {
        console.log(`  建议: 保留有产品的 1 条 (${withProducts[0]._id})，在 Studio 中删除其余 ${withoutProducts.length} 条（无产品）`)
      } else if (withProducts.length > 1) {
        console.log(`  注意: 多条都有产品，需在 Studio 中先把产品改到同一 series 再删重复`)
      }
    }
  }

  if (duplicateSlugs.length > 0) {
    console.log("\n========== 按「Slug」重复的 Series ==========")
    for (const [slug, arr] of duplicateSlugs) {
      if (arr.length <= 1) continue
      console.log(`\nslug "${slug}" 共 ${arr.length} 条:`)
      for (const s of arr) {
        console.log(`  - _id: ${s._id}, name: ${s.name}, 产品数: ${s.productCount}`)
      }
    }
  }

  if (duplicateNames.length === 0 && duplicateSlugs.length === 0) {
    console.log("\n未发现同名或同 slug 的重复 series。若你认为有重复，可能是名称/拼写略有不同，可在 Studio 中手动核对后删除。")
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
