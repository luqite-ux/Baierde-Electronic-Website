/**
 * 产品技术参数按系列 fallback（与 scripts/sync-specs-to-sanity.ts 一致）
 * 当 Sanity 未返回 specs 或 schema 未部署时，前端仍能展示完整参数
 */

export type SpecItem = { label: string; value: string }

const SMA_SPECS: SpecItem[] = [
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

const SMB_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–4 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const MCX_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–6 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const BNC_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–4 GHz" },
  { label: "VSWR", value: "≤1.30" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
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

const SMP_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Frequency", value: "DC–40 GHz" },
  { label: "VSWR", value: "≤1.35" },
  { label: "Insulation Material", value: "PTFE" },
  { label: "Conductor Material", value: "Brass" },
  { label: "Plating", value: "Gold plating" },
  { label: "Body", value: "Brass" },
  { label: "Operating Temp.", value: "-55~+155 ℃" },
]

const ADAPTER_SPECS: SpecItem[] = [
  { label: "Impedance", value: "50 Ω" },
  { label: "Insertion Loss", value: "Low" },
  { label: "VSWR", value: "≤1.35" },
]

/** 按系列返回用于展示的频率标签（如 "DC-4GHz"），Sanity 未填 frequencyMax 时在列表卡片用 */
export function getFrequencyLabelForSeries(
  seriesName: string | null,
  title: string
): string {
  const s = (seriesName ?? title ?? "").toUpperCase()
  if (s.includes("SMA") || s.includes("SSMA")) return "DC-18GHz"
  if (s.includes("SMB") || s.includes("SMC") || s.includes("SSMC") || s.includes("BNC")) return "DC-4GHz"
  if (s.includes("MCX") || s.includes("MMCX")) return "DC-6GHz"
  if (s.includes("SMP")) return "DC-40GHz"
  if (s.includes("D4") || s.includes("N TYPE") || s.includes("N-TYPE")) return "DC-11GHz"
  return ""
}

export function getSpecsForSeries(
  seriesName: string | null,
  title: string
): SpecItem[] {
  const s = (seriesName ?? title ?? "").toUpperCase()
  if (s.includes("ADAPTER")) return ADAPTER_SPECS
  if (s.includes("SMA")) return SMA_SPECS
  if (s.includes("SMB")) return SMB_SPECS
  if (s.includes("MCX")) return MCX_SPECS
  if (s.includes("MMCX")) return MCX_SPECS
  if (s.includes("SMP")) return SMP_SPECS
  if (s.includes("BNC")) return BNC_SPECS
  if (
    s.includes("N TYPE") ||
    s.includes("N-TYPE") ||
    /\bN\s*[-]?\s*J\b/i.test(title) ||
    /\bN\s*[-]?\s*K\b/i.test(title)
  )
    return N_TYPE_SPECS
  return SMA_SPECS
}
