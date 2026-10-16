# 首版验证记录

验证日期：2026-10-17（Asia/Shanghai）。

## 环境与依赖

- Windows 本地使用官方 Hugo Extended 0.168.0；下载包已核对官方 SHA256。
- PaperMod 固定为子模块提交 `d3768854d00ad003b0a8dbdba254ce9224377a01`。
- CI 使用相同 Hugo 版本，下载时校验 SHA256；GitHub 官方 Actions 固定到提交 SHA。

## 已完成的本地检查

- Hugo 生产构建成功。
- `python scripts/check_site.py`：17 个 HTML 页面、261 个站内链接通过；搜索索引、RSS 与站点地图可以解析。
- 配置与全部文章的 TOML front matter 解析成功。
- `hugo new content posts/_write-check/index.md` 成功生成文章目录对应的标题、slug、当前时间与 `draft = true`。临时文章已删除。
- 本地 HTTP 首页返回 200。
- 浏览器验证：首页、文章阅读、中文关键词搜索、目录锚点、深浅色切换、代码复制成功反馈。
- 390px 宽 iframe 验证：首页导航换行、文章标题、摘要与元信息可读，没有观察到水平溢出。这不是手机真机测试。

## 说明

当前 PaperMod 在 Hugo 0.168.0 下有两条弃用提示，涉及 `LanguageDirection` 和 `LanguageCode`，不影响构建与渲染。主题未直接修改；后续升级主题时复查。CI 仍会在实际构建错误或链接检查失败时中止发布。

本站尚未配置邮箱、CSDN、独立网页编辑器、评论或访问统计。当前网页写作入口是 GitHub 自带的文件编辑器。

远程部署结果以仓库 Actions 中 `Build and deploy blog` 的实际运行记录为准。
