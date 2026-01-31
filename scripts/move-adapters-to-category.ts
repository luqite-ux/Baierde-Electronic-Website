/**
 * 将表格里的 3 个 RF Adapters 产品（SMA-KKY22.2、SMA/MMCX-KJ、SMA/SSMA-KK）归入 adapters 分类。
 * 会：确保有 category slug=adapters、其下有 series，再把标题含 "RF Adapters" 的产品归入该 series。
 *
 * 运行：pnpm exec tsx scripts/move-adapters-to-category.ts
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

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "product"
}

async function getOrCreateCategory(name: string): Promise<string> {
  if (!name.trim()) throw new Error("category 名称为空")
  const slug = toSlug(name)
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "category" && (title == $name || slug.current == $slug)][0]{ _id }`,
    { name: name.trim(), slug }
  )
  if (existing?._id) return existing._id
  const _id = `category-${slug}`.replace(/--+/g, "-")
  await client.createOrReplace({
    _id,
    _type: "category",
    title: name.trim(),
    slug: { _type: "slug", current: slug },
  })
  return _id
}

async function getOrCreateSeries(name: string, categoryId: string): Promise<string> {
  if (!name.trim()) throw new Error("series 名称为空")
  const slug = toSlug(name)
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "series" && (name == $name || slug.current == $slug)][0]{ _id }`,
    { name: name.trim(), slug }
  )
  if (existing?._id) return existing._id
  const _id = `series-${slug}`.replace(/--+/g, "-")
  await client.createOrReplace({
    _id,
    _type: "series",
    name: name.trim(),
    slug: { _type: "slug", current: slug },
    category: { _type: "reference", _ref: categoryId },
  })
  return _id
}

async function main() {
  console.log("--- 将 RF Adapters 产品归入 adapters 分类 ---")

  // 使用 "Adapters" 保证 slug 为 "adapters"（toSlug("Adapters") = "adapters"）
  const categoryId = await getOrCreateCategory("Adapters")
  console.log("分类 adapters:", categoryId)

  const seriesId = await getOrCreateSeries("RF Adapters", categoryId)
  console.log("Series RF Adapters:", seriesId)

  const products = await client.fetch<
    { _id: string; title: string; slug: string | null }[]
  >(
    `*[_type == "product" && (
      title match "*RF Adapters*" ||
      title match "*rf adapters*" ||
      slug.current == "sma-kky22-2" ||
      slug.current == "sma-kky22-2-rf-adapters" ||
      slug.current match "*sma-mmcx-kj*" ||
      slug.current match "*sma-ssma-kk*" ||
      slug.current match "*sma-mmcx-kk*"
    )]{ _id, title, "slug": slug.current }`
  )

  if (products.length === 0) {
    console.log("未找到标题含 RF Adapters 或 slug 匹配的适配器产品。")
    console.log("若产品已在 Sanity 中，可在 Studio 中手动将该产品的 Series 改为「RF Adapters」（分类 Adapters）。")
    return
  }

  console.log("找到", products.length, "条产品，正在归入 adapters …")
  for (const p of products) {
    await client.patch(p._id).set({ series: { _type: "reference", _ref: seriesId } }).commit()
    console.log("  [OK]", p.title, "→", p.slug)
  }
  console.log("--- 完成 ---")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
