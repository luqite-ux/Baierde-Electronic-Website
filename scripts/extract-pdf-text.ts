/**
 * 从 boerdeproduct.pdf 提取纯文本，便于分析产品参数结构
 * 运行：pnpm exec tsx scripts/extract-pdf-text.ts
 */

import path from "path"
import fs from "fs"
import { PDFParse } from "pdf-parse"

const PDF_PATH = path.resolve(process.cwd(), "PDF/boerdeproduct.pdf")
const OUT_PATH = path.resolve(process.cwd(), "PDF/boerdeproduct-extracted.txt")

async function main() {
  const dataBuffer = fs.readFileSync(PDF_PATH)
  const parser = new PDFParse({ data: new Uint8Array(dataBuffer) })
  const result = await parser.getText()
  await parser.destroy()
  const text = result.text
  fs.writeFileSync(OUT_PATH, text, "utf-8")
  console.log("Pages:", result.total)
  console.log("Output:", OUT_PATH)
  console.log("--- First 3000 chars ---\n", text.slice(0, 3000))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
