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

## 首次远程部署

- 提交 `a7238d8` 已推送到 `main` 和 `feat/blog-bootstrap`。
- Pages 发布来源已设为 `workflow`，HTTPS 已开启。
- [首次 Hugo 构建与部署](https://github.com/xUxIAOrUI815/xuxiaorui815.github.io/actions/runs/38929592249) 的 build、deploy 均成功。
- 公网 `/`、`/posts/hello-world/`、`/posts/markdown-example/`、`/search/`、`/index.json`、`/index.xml` 均返回 HTTP 200；首页内容与 Hugo 文章路径匹配，搜索索引包含两篇文章。
- 内置浏览器访问公网页面超时，因此视觉与交互检查采用前述本地浏览器结果；公网连通性使用独立 HTTP 请求验证。

之后的部署结果以仓库 Actions 中 `Build and deploy blog` 的实际运行记录为准。

## 尚未通过的自动触发验证

首版及后续几次 Git 推送未观察到对应的 `push` 工作流运行。已核对远程工作流内容、`main` 默认分支、Actions 启用状态，并尝试单分支推送和 GitHub CLI 凭据助手，仍未观察到自动触发。原因未确定，不能宣称“推送即发布”已验证完成。

手动触发的构建、链接检查和部署已成功；写作指南包含 `gh workflow run pages.yaml --ref main` 和 GitHub 网页上的手动发布方法。此问题不影响已发布的首版网站。
