/**
 * 将「SMA Cable Assemblies」等应属于电缆组件的产品归入 cable-assemblies 分类。
 * 会：确保有 category cable-assemblies、其下有 series，再把匹配到的 product 的 series 指向该 series。
 * 若「SMA Cable Assemblies」误出现在 RF Adapters 页，运行本脚本即可将其移回 RF Cable Assemblies。
 *
 * 运行：pnpm move-cable-assembly
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
  console.log("--- 将 Cable Assemblies 产品归入 cable-assemblies 分类 ---")

  const categoryId = await getOrCreateCategory("RF Cable Assemblies")
  console.log("分类 cable-assemblies:", categoryId)

  const seriesId = await getOrCreateSeries("SMA Cable Assemblies", categoryId)
  console.log("Series SMA Cable Assemblies:", seriesId)

  const products = await client.fetch<
    { _id: string; title: string; slug: string | null }[]
  >(
    `*[_type == "product" && (
      title match "*Cable Assemblies*" ||
      title match "*cable assemblies*" ||
      slug.current == "sma-cable-assemblies" ||
      slug.current match "*cable-assembly*"
    )]{ _id, title, "slug": slug.current }`
  )

  if (products.length === 0) {
    console.log("未找到标题或 slug 含 Cable Assemblies 的产品。")
    console.log("若产品已在 Sanity 中但标题不同，可在 Studio 中手动将该产品的 Series 改为「SMA Cable Assemblies」。")
    return
  }

  console.log("找到", products.length, "条产品，正在归入 cable-assemblies …")
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
