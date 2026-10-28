# 网站内容接入

首页和全站导航读取同一 `en` 内容快照。固定 registry 为导航、首屏、实力数据、产品分类引导、应用行业、制造与质量、FAQ、联系引导及首页 SEO。现有产品分类、产品及文章继续读取原数据层；图片与页面结构保留原样。

`site-definition.json`、`site-content.json`、`site-integration.json` 供公司规范工作区的 `scripts/site-content-onboarding.mjs` 使用。定义内文字默认值从现有 Tailwind 样式及 Button/Badge 继承样式提取。导航按主导航、下拉导航、分组标题分组，保持固定布局和稳定行 ID；增删或更改行 ID 不会创建新导航位置。模块不可自由隐藏或重排。

服务端环境变量：`NEXT_PUBLIC_TENANT_ID`、`NEXT_PUBLIC_ADMIN_URL`、`SITE_CONTENT_DOMAIN=www.brdelectronic.com`、`SITE_CONTENT_INTEGRATION_KEY`。key 只可保存在服务端环境，不提交到 Git。正式域名使用 www，因为裸域名会跳转。

未发布时使用原文案且不输出采用标记。有效快照才在首页输出版本标记。预览失败明确显示退出入口；预览响应禁缓存、索引、Referer，并关闭分析脚本。FAQ 结构化数据与已编辑 FAQ 使用同一内容，输出时转义小于号。

验证：`node --import tsx --test tests/site-content.test.mjs tests/public-content-policy.test.mjs scripts/admin-proxy-contract.test.mjs scripts/instrumentation-runtime.test.mjs`；`pnpm build`。已有 `sanity.client.ts` 和 `sanity.write.ts` 的 Sanity fetch 类型错误不属于本次改动，单独 `tsc --noEmit` 仍会报告这两处；项目原配置跳过构建类型校验。
