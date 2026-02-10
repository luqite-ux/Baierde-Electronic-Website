/**
 * 为 products.seed.with-images.json 中 specs 为空的产品添加通用 RF 技术参数
 * 按产品系列（从 name 前缀推断）填充典型参数，便于页面展示
 * 运行：pnpm exec tsx scripts/add-product-specs.ts
 */

import path from "path"
import fs from "fs"

const SEED_PATH = path.resolve(process.cwd(), "data/products.seed.with-images.json")

type ProductSpec = { label: string; value: string }

// 按系列前缀的典型技术参数（Impedance, Frequency, VSWR 等）
const SERIES_SPECS: Record<string, ProductSpec[]> = {
  SMA: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–18 GHz" },
    { label: "VSWR", value: "≤1.30" },
    { label: "Interface", value: "IEC 61169-15" },
  ],
  SSMA: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–18 GHz" },
    { label: "VSWR", value: "≤1.30" },
    { label: "Interface", value: "IEC 61169-15" },
  ],
  MCX: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–6 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-36" },
  ],
  MMCX: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–6 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-37" },
  ],
  SMP: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–40 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-49" },
  ],
  SMB: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–4 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-10" },
  ],
  SMC: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–10 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-13" },
  ],
  SSMC: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–10 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-13" },
  ],
  BNC: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–4 GHz" },
    { label: "VSWR", value: "≤1.30" },
    { label: "Interface", value: "IEC 61169-8" },
  ],
  D4: [
    { label: "Impedance", value: "50Ω" },
    { label: "Frequency", value: "DC–11 GHz" },
    { label: "VSWR", value: "≤1.35" },
    { label: "Interface", value: "IEC 61169-4" },
  ],
  Adapter: [
    { label: "Impedance", value: "50Ω" },
    { label: "Insertion Loss", value: "Low" },
    { label: "VSWR", value: "≤1.35" },
  ],
}

function getSpecsForProduct(name: string, series?: string): ProductSpec[] {
  if (series && series.includes("Adapter")) return SERIES_SPECS.Adapter
  const upper = (name || "").toUpperCase()
  for (const key of Object.keys(SERIES_SPECS)) {
    if (key === "Adapter") continue
    if (upper.startsWith(key) || upper.includes(`-${key}-`) || upper.includes(`/${key}`))
      return SERIES_SPECS[key]
  }
  return SERIES_SPECS.SMA
}

function main() {
  const raw = fs.readFileSync(SEED_PATH, "utf-8")
  const products: any[] = JSON.parse(raw)
  let updated = 0
  for (const p of products) {
    if (p.specs == null || !Array.isArray(p.specs) || p.specs.length === 0) {
      p.specs = getSpecsForProduct(p.name || p.title, p.series)
      updated++
    }
  }
  fs.writeFileSync(SEED_PATH, JSON.stringify(products, null, 2), "utf-8")
  console.log(`已为 ${updated} 个产品添加技术参数，共 ${products.length} 个产品`)
}

main()
