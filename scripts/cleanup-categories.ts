/**
 * 清理 Sanity 中多余分类，只保留 3 个：connectors / adapters / cable-assemblies
 * 会把「错误分类」下的 series 归到对应正确分类，再删除重复/错别字分类。
 *
 * 运行：pnpm exec tsx scripts/cleanup-categories.ts
 * 需要：.env.local 中 SANITY_WRITE_TOKEN
 */

import { config } from "dotenv"
import path from "path"
import { createClient } from "@sanity/client"

config({ path: path.resolve(process.cwd(), ".env.local") })
config({ path: path.resolve(process.cwd(), ".env") })

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error("请设置 SANITY_WRITE_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
})

/** 只保留这 3 个 slug，对应页面 /products/connectors、/products/adapters、/products/cable-assemblies */
const KEEPER_SLUGS = ["connectors", "adapters", "cable-assemblies"] as const

type Slug = (typeof KEEPER_SLUGS)[number]

/** 根据要删除的分类的 slug，推断应合并到哪个保留分类 */
function getTargetSlug(slug: string | null): Slug | null {
  if (!slug) return "connectors"
  const s = slug.toLowerCase()
  if (KEEPER_SLUGS.includes(s as Slug)) return null
  if (s.includes("adapter")) return "adapters"
  if (s.includes("connector")) return "connectors"
  if (s.includes("cable")) return "cable-assemblies"
  return "connectors"
}

async function main() {
  const categories = await client.fetch<
    { _id: string; title: string; slug: string | null }[]
  >(`*[_type == "category"]{ _id, title, "slug": slug.current }`)

  const keepers = new Map<Slug, string>()
  const toDelete: { _id: string; title: string; slug: string | null }[] = []

  for (const cat of categories) {
    const slug = cat.slug?.toLowerCase() ?? ""
    if (KEEPER_SLUGS.includes(slug as Slug)) {
      if (!keepers.has(slug as Slug)) keepers.set(slug as Slug, cat._id)
    } else {
      toDelete.push(cat)
    }
  }

  console.log("保留的分类（3 个）:")
  for (const slug of KEEPER_SLUGS) {
    const id = keepers.get(slug)
    console.log(`  - ${slug}: ${id ?? "(未找到)"}`)
  }
  console.log("将删除的分类:", toDelete.length, "个")
  toDelete.forEach((c) => console.log(`  - ${c.title} (${c.slug}) [${c._id}]`))

  if (toDelete.length === 0) {
    console.log("没有多余分类，无需清理。")
    return
  }

  const tx = client.transaction()

  for (const cat of toDelete) {
    const targetSlug = getTargetSlug(cat.slug)
    const targetId = targetSlug ? keepers.get(targetSlug) : null
    const seriesIds = await client.fetch<string[]>(
      `*[_type == "series" && category._ref == $catId]._id`,
      { catId: cat._id }
    )
    if (seriesIds.length > 0 && targetId) {
      for (const seriesId of seriesIds) {
        tx.patch(seriesId, { set: { category: { _type: "reference", _ref: targetId } } })
      }
      console.log(`  已将 ${seriesIds.length} 个 series 从「${cat.title}」归到「${targetSlug}」`)
    }
    tx.delete(cat._id)
    tx.delete(`drafts.${cat._id}`)
  }

  await tx.commit()
  console.log("清理完成。当前分类数为:", KEEPER_SLUGS.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
