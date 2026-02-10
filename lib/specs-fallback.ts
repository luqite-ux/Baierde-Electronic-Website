/**
 * 各系列产品技术参数（规格书红框「主要技术特性」）
 * - 详情页：getProductBySlug 统一用 getSpecsForSeries 覆盖 product.specs，所有系列详情都显示本文件参数
 * - 列表页：通过 getFrequencyAndImpedanceFromDetailSpecs 从同一套 getSpecsForSeries 取频率/阻抗，与详情同源
 */

export type SpecItem = { label: string; value: string }

/** SMA 系列：按规格书 PAGE-45 主要技术特性（红框） */
const SMA_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~12.4 GHz (flexible cable), 0~18 GHz (semi-rigid/flexible cable)" },
  { label: "VSWR", value: "≤1.15+0.02F (flexible cable), ≤1.10+0.02F (semi-rigid/flexible cable)" },
  { label: "Insulation Resistance", value: "≥5000 MΩ" },
  { label: "Withstanding Voltage", value: "1000 V" },
  { label: "Contact Resistance", value: "Center ≤0.003 Ω, Outer ≤0.002 Ω" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-65~+165 ℃" },
]

/** SSMA 系列：按规格书 PAGE-39 主要技术特性（红框） */
const SSMA_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~30 GHz" },
  { label: "VSWR", value: "≤1.07+0.01F" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Withstanding Voltage", value: "750 V" },
  { label: "Contact Resistance", value: "Center ≤0.006 Ω, Outer ≤0.0025 Ω" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

/** SMC 系列：按规格书 PAGE-61 主要技术特性（红框） */
const SMC_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~11 GHz" },
  { label: "VSWR", value: "Straight ≤1.25, Right angle ≤1.35" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Voltage Rating", value: "250 V" },
  { label: "Withstanding Voltage", value: "750 V" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-65~+165 ℃" },
]

/** SMB 系列：按规格书 PAGE-33 主要技术特性（红框） */
const SMB_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~4 GHz" },
  { label: "VSWR", value: "≤1.34" },
  { label: "Contact Resistance", value: "Center ≤0.006 Ω, Outer ≤0.001 Ω" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Withstanding Voltage", value: "750 V(rms)" },
  { label: "Voltage Rating", value: "250 V(rms)" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-65~+165 ℃" },
]

/** SSMB 系列：按规格书 PAGE-29 主要技术特性（红框） */
const SSMB_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~3 GHz" },
  { label: "VSWR", value: "Straight <1.22 (0-1GHz), <1.35 (0-3GHz); Right angle <1.50 (0~1GHz), <1.63 (0~3GHz)" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Withstanding Voltage", value: "500 V" },
  { label: "Contact Resistance", value: "Center ≤0.005 Ω, Outer ≤0.0025 Ω" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

/** MCX 系列：按规格书 PAGE-21 主要技术特性（红框） */
const MCX_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~6 GHz" },
  { label: "VSWR", value: "≤1.30" },
  { label: "Voltage Rating", value: "250 V(rms)" },
  { label: "Contact Resistance", value: "Center ≤0.005 Ω, Outer ≤0.0025 Ω" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Withstanding Voltage", value: "750 V(rms)" },
  { label: "Insertion Loss", value: "0.1 dB at 1 GHz" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-65~+155 ℃" },
]

/** MMCX 系列：按规格书 PAGE-13 主要技术特性（红框） */
const MMCX_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC-6 GHz" },
  { label: "Voltage Rating", value: "170 V(rms)" },
  { label: "Contact Resistance", value: "Center <5 mΩ, Outer <2.5 mΩ" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Withstanding Voltage", value: "500 V(rms)" },
  { label: "VSWR", value: "Straight ≤1.15, Right angle ≤1.25" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

/** BNC 系列：按规格书 PAGE-65 主要技术特性（红框） */
const BNC_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~4 GHz" },
  { label: "Voltage Rating", value: "500 V(rms)" },
  { label: "Contact Resistance", value: "Center ≤0.002 Ω, Outer ≤0.0025 Ω" },
  { label: "Insulation Resistance", value: "≥5000 MΩ" },
  { label: "Withstanding Voltage", value: "1500 V(rms)" },
  { label: "VSWR", value: "≤1.30" },
  { label: "Disengage Force", value: "≥0.6 N" },
  { label: "Durability", value: "500 Cycles" },
  { label: "Operating Temp.", value: "-55~+165 ℃" },
]

/** BMA 系列：按规格书 PAGE-73 主要技术特性（红框） */
const BMA_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~18 GHz" },
  { label: "VSWR", value: "≤1.15+0.012f" },
  { label: "Insulation Resistance", value: "≥5000 MΩ" },
  { label: "Withstanding Voltage", value: "1000 V" },
  { label: "Contact Resistance", value: "Center ≤0.003 Ω, Outer ≤0.002 Ω" },
  { label: "Operating Temp.", value: "-65~+125 ℃" },
]

const N_TYPE_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–11 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

/** SMP 系列：按规格书 PAGE-03 主要技术特性，全系列通用 */
const SMP_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0~12.4 GHz (flexible cable), 0~40 GHz (semi-rigid/flexible cable)" },
  { label: "VSWR", value: "≤1.15+0.02F (flexible cable), ≤1.1+0.02F (semi-rigid/flexible cable)" },
  { label: "Insulation Resistance", value: "5000 MΩ" },
  { label: "Withstanding Voltage", value: "500 V" },
  { label: "Durability", value: "Smooth bore 1000 cycles, Limited detent 500 cycles, Full detent 100 cycles" },
  { label: "Axial Misalignment", value: "0, +0.25 mm" },
  { label: "Radial Misalignment", value: "±0.25 mm" },
  { label: "Engagement Force (max)", value: "Smooth bore 9 N, Limited detent 45 N, Full detent 68 N" },
  { label: "Separation Force (min)", value: "Smooth bore 2.2 N, Limited detent 9 N, Full detent 22 N" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
]

/** D4 系列：按规格书 PAGE-71 主要技术特性 */
const D4_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "0–2 GHz" },
  { label: "VSWR", value: "≤1.06 (0~0.1GHz), ≤1.22 (0.1~0.5GHz), ≤1.50 (0.5~2GHz)" },
  { label: "Insulation Resistance", value: "≥1000 MΩ" },
  { label: "Contact Resistance", value: "Center ≤10 mΩ, Outer ≤5 mΩ" },
  { label: "Withstanding Voltage", value: "1000 V" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+125 ℃" },
  { label: "Durability", value: "500 Cycles" },
]

const ADAPTER_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Insertion Loss", value: "Low" },
  { label: "VSWR", value: "≤1.35" },
]

/** 列表卡片用：从与详情相同的 getSpecsForSeries 中取出 Frequency / Impedance，保证列表与详情参数一致 */
export function getFrequencyAndImpedanceFromDetailSpecs(
  seriesName: string | null,
  title: string
): { frequency: string | null; impedance: string | null } {
  const specs = getSpecsForSeries(seriesName, title)
  const frequency = specs.find((i) => i.label === "Frequency")?.value ?? null
  const impedance = specs.find((i) => i.label === "Impedance")?.value ?? null
  return { frequency, impedance }
}

export function getSpecsForSeries(
  seriesName: string | null,
  title: string
): SpecItem[] {
  const s = (seriesName ?? title ?? "").toUpperCase()
  if (s.includes("ADAPTER")) return ADAPTER_SPECS
  if (s.includes("SSMA")) return SSMA_SPECS
  if (s.includes("SMA")) return SMA_SPECS
  if (s.includes("SSMB")) return SSMB_SPECS
  if (s.includes("SMB")) return SMB_SPECS
  if (s.includes("MMCX")) return MMCX_SPECS
  if (s.includes("MCX")) return MCX_SPECS
  if (s.includes("SMP")) return SMP_SPECS
  if (s.includes("BNC")) return BNC_SPECS
  if (s.includes("BMA")) return BMA_SPECS
  if (s.includes("D4")) return D4_SPECS
  if (s.includes("SSMC")) return SMC_SPECS
  if (s.includes("SMC")) return SMC_SPECS
  if (
    s.includes("N TYPE") ||
    s.includes("N-TYPE") ||
    /\bN\s*[-]?\s*J\b/i.test(title) ||
    /\bN\s*[-]?\s*K\b/i.test(title)
  )
    return N_TYPE_SPECS
  return SMA_SPECS
}
