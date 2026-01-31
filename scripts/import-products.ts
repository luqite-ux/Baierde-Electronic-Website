/**
 * Excel → Sanity 批量导入 Product
 * 数据源：data/product.xlsx（首行为表头，每行一个 product）
 *
 * Excel 列：name, model, slug, category, series, frequency_range, impedance,
 * connector_type, gender, mounting_type, material, plating, description,
 * seo_title, seo_description
 *
 * 运行：pnpm import-products
 * 只导入前 5 条：IMPORT_LIMIT=5 或把下方 LIMIT 改为 5
 * Token：SANITY_API_TOKEN 或 SANITY_WRITE_TOKEN
 */

import { config } from 'dotenv'
import path from 'path'
import { createClient } from '@sanity/client'
import * as XLSX from 'xlsx'

config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

/** 只导入前 N 条，0 表示不限制。改为 5 可快速只导入前 5 条；也可用环境变量 IMPORT_LIMIT=5 */
const LIMIT = Number(process.env.IMPORT_LIMIT) || 0

const EXCEL_PATH = path.resolve(process.cwd(), 'data/product.xlsx')

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

function parseFrequency(s: string): number | undefined {
  if (!s || typeof s !== 'string') return undefined
  const m = String(s).match(/(\d+(?:\.\d+)?)\s*(?:ghz)?/i)
  return m ? parseFloat(m[1]) : undefined
}

function parseImpedance(s: string): 50 | 75 | undefined {
  if (!s || typeof s !== 'string') return undefined
  if (/75|75\s*Ω|75\s*ohm/i.test(s)) return 75
  if (/50|50\s*Ω|50\s*ohm/i.test(s)) return 50
  return undefined
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
// Category / Series 查找或创建（按 name/title）
// ---------------------------------------------------------------------------

async function getOrCreateCategory(name: string): Promise<string> {
  if (!name.trim()) throw new Error('category 名称为空')
  const slug = toSlug(name)
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "category" && (title == $name || slug.current == $slug)][0]{ _id }`,
    { name: name.trim(), slug }
  )
  if (existing?._id) return existing._id
  const _id = `category-${slug}`.replace(/--+/g, '-')
  await client.createOrReplace({
    _id,
    _type: 'category',
    title: name.trim(),
    slug: { _type: 'slug', current: slug },
  })
  return _id
}

async function getOrCreateSeries(name: string, categoryId: string): Promise<string> {
  if (!name.trim()) throw new Error('series 名称为空')
  const slug = toSlug(name)
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "series" && (name == $name || slug.current == $slug)][0]{ _id }`,
    { name: name.trim(), slug }
  )
  if (existing?._id) return existing._id
  const _id = `series-${slug}`.replace(/--+/g, '-')
  await client.createOrReplace({
    _id,
    _type: 'series',
    name: name.trim(),
    slug: { _type: 'slug', current: slug },
    category: { _type: 'reference', _ref: categoryId },
  })
  return _id
}

// ---------------------------------------------------------------------------
// 从 Excel 行构建 Product 文档（按你提供的列，适配现有 product schema）
// specifications 映射：frequency_range→frequencyMax，impedance→impedance，
// mounting_type→mountingType；connector_type/gender/material/plating→tags
// model 写入 shortDescription 前缀；seo_title/seo_description 无对应字段则省略
// ---------------------------------------------------------------------------

type ExcelRow = Record<string, unknown>

function buildProduct(row: ExcelRow, seriesId: string): Record<string, unknown> {
  const name = getStr(row, 'name', 'Name', '产品名')
  if (!name) throw new Error('缺少 name')

  const slugRaw = getStr(row, 'slug', 'Slug')
  const current = slugRaw ? toSlug(slugRaw) : toSlug(name)

  const model = getStr(row, 'model', 'Model', '型号')
  const description = getStr(row, 'description', 'Description', '描述')
  const shortDesc = [model ? `Model: ${model}` : '', description].filter(Boolean).join('\n\n').trim() || undefined

  const frequency_range = getStr(row, 'frequency_range', 'frequency range', '频率范围')
  const impedanceStr = getStr(row, 'impedance', 'Impedance', '阻抗')
  const mounting_type = getStr(row, 'mounting_type', 'mounting type', '安装类型')
  const connector_type = getStr(row, 'connector_type', 'connector type', '连接器类型')
  const gender = getStr(row, 'gender', 'Gender', '性别')
  const material = getStr(row, 'material', 'Material', '材料')
  const plating = getStr(row, 'plating', 'Plating', '镀层')

  const frequencyMax = parseFrequency(frequency_range)
  const impedance = parseImpedance(impedanceStr)

  const tags = [connector_type, gender, material, plating].map((s) => s.trim()).filter(Boolean)

  const doc: Record<string, unknown> = {
    _id: `product-${current}`,
    _type: 'product',
    title: name,
    slug: { _type: 'slug', current },
    series: { _type: 'reference', _ref: seriesId },
    publishedAt: new Date().toISOString(),
  }
  if (shortDesc) doc.shortDescription = shortDesc
  if (mounting_type) doc.mountingType = mounting_type
  if (frequencyMax != null && !Number.isNaN(frequencyMax)) doc.frequencyMax = frequencyMax
  if (impedance === 50 || impedance === 75) doc.impedance = impedance
  if (Array.isArray(tags) && tags.length > 0) doc.tags = tags

  return doc
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function main() {
  console.log('Excel 路径:', EXCEL_PATH)
  console.log('LIMIT:', LIMIT || '全部')
  console.log('---')

  const wb = XLSX.readFile(EXCEL_PATH)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet) as ExcelRow[]
  const toProcess = LIMIT > 0 ? rows.slice(0, LIMIT) : rows

  let ok = 0
  const failed: { title: string; err: string }[] = []

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i]
    const name = getStr(row, 'name', 'Name', '产品名')
    const title = name || `(行 ${i + 2})`
    try {
      const catName = getStr(row, 'category', 'Category', '分类')
      const seriesName = getStr(row, 'series', 'Series', '系列')
      if (!seriesName) throw new Error('缺少 series/系列')
      const categoryId = await getOrCreateCategory(catName || seriesName)
      const seriesId = await getOrCreateSeries(seriesName, categoryId)

      const product = buildProduct(row, seriesId)
      await client.createOrReplace(product as never)

      const t = (product.title as string) || title
      const s = (product.slug as { current?: string })?.current ?? '-'
      console.log(`  [OK] ${t}  →  ${s}`)
      ok++
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e)
      failed.push({ title, err })
      console.error(`  [FAIL] ${title}: ${err}`)
    }
  }

  console.log('---')
  console.log(`成功: ${ok} 条`)
  if (failed.length) console.log(`失败: ${failed.length} 条`)
  failed.forEach(({ title, err }) => console.log(`  - ${title}: ${err}`))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
