/**
 * 从一张透明底 PNG 生成所有网站图标（favicon、apple、android）。
 * 使用前：将您的透明底图标保存为 public/icon-transparent.png，然后运行：
 *   node scripts/generate-favicons.mjs
 * 或
 *   pnpm exec node scripts/generate-favicons.mjs
 */

import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public")
const sourcePath = join(publicDir, "icon-transparent.png")

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
]

async function main() {
  if (!existsSync(sourcePath)) {
    console.error("未找到源图：public/icon-transparent.png")
    console.error("请先将透明底图标（图2）保存为该路径，再运行本脚本。")
    process.exit(1)
  }

  let sharp
  try {
    sharp = (await import("sharp")).default
  } catch {
    console.error("请先安装 sharp：pnpm add -D sharp")
    process.exit(1)
  }

  const image = sharp(sourcePath)
  const meta = await image.metadata()
  if (meta.width !== meta.height) {
    console.warn("建议使用正方形源图，当前尺寸:", meta.width, "x", meta.height)
  }

  for (const { name, size } of sizes) {
    const outPath = join(publicDir, name)
    await image
      .clone()
      .resize(size, size)
      .png()
      .toFile(outPath)
    console.log("已生成:", name)
  }

  console.log("完成。")
  console.log("若需 .ico（部分浏览器标签页）：请将 public/favicon-32x32.png 用在线工具（如 favicon.io）转为 ICO 后替换 public/favicon.ico。")
  console.log("请刷新浏览器查看标签页图标。")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
