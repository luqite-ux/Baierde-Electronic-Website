/**
 * 根据 Excel 的 image_main 列，批量上传图片到 Sanity 并 patch 到对应 product。
 * 不导入/创建 product，只做：上传 asset + patch product 绑定主图。
 *
 * 数据：data/product.xlsx（列含 slug/name、image_main），图片目录 data/images/
 * 运行：pnpm upload-images
 * 环境变量：SANITY_API_TOKEN 或 SANITY_WRITE_TOKEN（写入权限）
 */

import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'
import * as XLSX from 'xlsx'

config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

const EXCEL_PATH = path.resolve(process.cwd(), 'data/product.xlsx')
const IMAGES_DIR = path.resolve(process.cwd(), 'data/images')

// ---------------------------------------------------------------------------
// 工具
// ---------------------------------------------------------------------------

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'product'
}

function getStr(row: Record<string, unknown>, ...keys: string[]): string {
  const lower = (x: string) => x.trim().toLowerCase()
  const want = new Set(keys.map(lower))
  for (const k of Object.keys(row)) {
    if (want.has(lower(k))) {
      const v = row[k]
      if (v != null && String(v).trim()) return String(v).trim()
    }
  }
  return ''
}

// ---------------------------------------------------------------------------
// Sanity 客户端（写）
// ---------------------------------------------------------------------------

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('请设置 SANITY_API_TOKEN 或 SANITY_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// 查找 product 文档
// ---------------------------------------------------------------------------

type ProductDoc = {
  _id: string
  mainImage?: { _type: string; asset?: { _ref?: string } }
  image?: { _type: string; asset?: { _ref?: string } }
  images?: Array<{ _type: string; asset?: { _ref?: string } }>
}

/** 查 product：用 Excel 原始 slug 值，不对 slug 做 toSlug */
async function findProduct(slug: string): Promise<ProductDoc | null> {
  const docId = `product-${slug}`

  const byId = await client.fetch<ProductDoc | null>(
    `*[_id == $id][0]{ _id, mainImage, image, images }`,
    { id: docId }
  )
  if (byId?._id) return byId

  const bySlug = await client.fetch<ProductDoc | null>(
    `*[_type == "product" && slug.current == $slug][0]{ _id, mainImage, image, images }`,
    { slug }
  )
  return bySlug
}

function hasMainImage(doc: ProductDoc): boolean {
  if (doc.mainImage?.asset?._ref) return true
  if (doc.image?.asset?._ref) return true
  if (Array.isArray(doc.images) && doc.images[0]?.asset?._ref) return true
  return false
}

/** 根据 schema：本项目 product 使用 mainImage；若有 image/images 也可扩展 */
function getImageFieldName(): 'mainImage' | 'image' | 'images' {
  return 'mainImage'
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function main() {
  console.log('Excel 路径:', EXCEL_PATH)
  console.log('图片目录:', IMAGES_DIR)
  console.log('---')

  if (!fs.existsSync(EXCEL_PATH)) {
    console.error('Excel 文件不存在:', EXCEL_PATH)
    process.exit(1)
  }

  const wb = XLSX.readFile(EXCEL_PATH)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[]
  const total = rows.length
  console.log('总行数:', total)

  let success = 0
  let skip = 0
  let missing = 0
  let failed = 0
  const failures: { slug: string; image_main: string; reason: string }[] = []

  const imageField = getImageFieldName()

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const slugRaw = getStr(row, 'slug', 'Slug')
    const name = getStr(row, 'name', 'Name', '产品名', 'model', 'Model')
    // 查 product 用 Excel 原始 slug，无 slug 列时才用 toSlug(name)
    const slug = slugRaw || toSlug(name)
    const image_main = getStr(row, 'image_main', 'image main')

    if (!image_main) {
      failures.push({ slug, image_main: '(空)', reason: 'Excel 无 image_main' })
      failed++
      console.log(`  [FAIL] slug=${slug} image_main=(空) 原因: Excel 无 image_main`)
      continue
    }

    const filePath = path.resolve(process.cwd(), 'data/images', image_main)
    if (!fs.existsSync(filePath)) {
      missing++
      console.log(`  [MISSING] slug=${slug} image_main=${image_main}`)
      continue
    }

    try {
      const product = await findProduct(slug)
      if (!product) {
        failures.push({ slug, image_main, reason: '未找到对应 product 文档' })
        failed++
        console.log(`  [FAIL] slug=${slug} image_main=${image_main} 原因: 未找到对应 product 文档`)
        continue
      }

      if (hasMainImage(product)) {
        skip++
        console.log(`  [SKIP] slug=${slug} image_main=${image_main} (skip existing)`)
        continue
      }

      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: image_main,
      })
      const assetId = asset._id

      const imageValue = {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: assetId },
      }

      if (imageField === 'mainImage') {
        await client.patch(product._id).set({ mainImage: imageValue }).commit()
      } else if (imageField === 'image') {
        await client.patch(product._id).set({ image: imageValue }).commit()
      } else {
        await client.patch(product._id).set({ images: [imageValue] }).commit()
      }

      success++
      console.log(`  [OK] slug=${slug} image_main=${image_main} -> ${assetId}`)
    } catch (e) {
      const reason = e instanceof Error ? e.message : String(e)
      failures.push({ slug, image_main, reason })
      failed++
      console.log(`  [FAIL] slug=${slug} image_main=${image_main} 原因: ${reason}`)
    }
  }

  console.log('---')
  console.log('总行数:', total)
  console.log('成功绑定:', success)
  console.log('跳过(已有图):', skip)
  console.log('缺失文件:', missing)
  console.log('失败:', failed)
  if (failures.length) {
    console.log('失败明细:')
    failures.forEach(({ slug, image_main, reason }) =>
      console.log(`  - slug=${slug} image_main=${image_main} 原因: ${reason}`)
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
