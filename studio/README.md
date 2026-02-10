# Sanity Studio（独立部署）

本目录为独立 Sanity Studio，不再嵌入 Next 应用。生产站点通过反向代理在 `https://www.brdelectronic.com/studio` 提供同域名访问。

## 本地开发

- 在仓库根目录：`pnpm studio:dev` 或 `pnpm --filter studio dev`
- 或在 studio 目录：`pnpm dev`
- 默认端口：**3333**，访问 http://localhost:3333/studio

## 构建与部署

1. **构建**：`pnpm build`（在 studio 目录）或 `pnpm --filter studio build`
2. **部署到 Sanity 托管**：`pnpm deploy`（在 studio 目录）或 `pnpm --filter studio deploy`
   - 部署后 Studio 地址为 `https://746jvz7j.sanity.studio/studio`
   - 生产站点的 Next 已配置 rewrites，将 `/studio` 反向代理到该地址，因此线上访问 https://www.brdelectronic.com/studio 即可打开后台

## 更多

- [Sanity 入门](https://www.sanity.io/docs/introduction/getting-started)
- [扩展 Studio](https://www.sanity.io/docs/content-studio/extending)
