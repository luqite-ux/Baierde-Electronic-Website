/**
 * 将产品技术参数（来自 PDF/截图整理）同步到 Sanity 后台对应产品
 * 根据截图第一页整理的 SMA 完整参数表；其余系列用同类典型值。
 *
 * 运行前：确保 .env.local 中有 SANITY_WRITE_TOKEN
 * 运行：pnpm exec tsx scripts/sync-specs-to-sanity.ts
 */

import { config } from "dotenv"
import path from "path"
import { createClient } from "@sanity/client"

// 必须先加载 .env，再读取环境变量，避免 projectId 为空（不要在此处 import lib/sanity.client，否则会先执行其 createClient）
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
  console.error("请设置 SANITY_WRITE_TOKEN 或 SANITY_API_TOKEN")
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// ---------- 截图第一页（SMA）完整技术参数 ----------
const SMA_SPECS = [
  { label: "Frequency", value: "0–6 GHz" },
  { label: "VSWR", value: "≤1.3" },
  { label: "Insulation Resistance", value: "≥5000 MΩ" },
  { label: "Contact Resistance", value: "Center ≤3 mΩ, Outer ≤2 mΩ" },
  { label: "Working Voltage", value: "335 V" },
  { label: "Withstanding Voltage", value: "1000 V" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

// 其他系列：与截图描述一致，采用同类典型参数（可后续按更多截图补充）
const SMB_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–4 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const MCX_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–6 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const BNC_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–4 GHz" },
  { label: "VSWR", value: "≤1.30" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const N_TYPE_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–11 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const MMCX_SPECS = MCX_SPECS
const SMP_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–40 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const ADAPTER_SPECS = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Insertion Loss", value: "Low" },
  { label: "VSWR", value: "≤1.35" },
]

function getSpecsForSeries(seriesName: string | null, title: string): typeof SMA_SPECS {
  const s = (seriesName || title || "").toUpperCase()
  if (s.includes("ADAPTER")) return ADAPTER_SPECS
  if (s.includes("SMA")) return SMA_SPECS
  if (s.includes("SMB")) return SMB_SPECS
  if (s.includes("MCX")) return MCX_SPECS
  if (s.includes("MMCX")) return MMCX_SPECS
  if (s.includes("SMP")) return SMP_SPECS
  if (s.includes("BNC")) return BNC_SPECS
  if (s.includes("N TYPE") || s.includes("N-TYPE") || /\bN\s*[-]?\s*J\b/i.test(title) || /\bN\s*[-]?\s*K\b/i.test(title))
    return N_TYPE_SPECS
  return SMA_SPECS
}

async function main() {
  const query = `*[_type == "product"]{ _id, title, "slug": slug.current, "seriesName": series->name }`
  const products: { _id: string; title: string; slug: string | null; seriesName: string | null }[] =
    await writeClient.fetch(query)

  console.log(`共 ${products.length} 个产品，开始写入技术参数…`)

  let patched = 0
  for (const p of products) {
    const specs = getSpecsForSeries(p.seriesName, p.title)
    await writeClient
      .patch(p._id)
      .set({ specs })
      .commit()
    patched++
    console.log(`  [${patched}/${products.length}] ${p.slug || p._id} (${p.seriesName || "—"})`)
  }

  console.log(`\n已完成：${patched} 个产品已更新 specs。请在 Sanity Studio 中确认，并部署 schema 变更（如尚未部署）。`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
