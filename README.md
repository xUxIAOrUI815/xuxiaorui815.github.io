# Ruii’s Margins

[![Build and deploy blog](https://github.com/xUxIAOrUI815/xuxiaorui815.github.io/actions/workflows/pages.yaml/badge.svg)](https://github.com/xUxIAOrUI815/xuxiaorui815.github.io/actions/workflows/pages.yaml)

Xiaorui Xu 的个人博客。使用 **Hugo + PaperMod + GitHub Pages**，页面结构参考 [Lilian Weng 的 Lil’Log](https://lilianweng.github.io/)。

- 网站：<https://xuxiaorui815.github.io/>
- 内容：`content/posts/`
- 配置：`hugo.toml`
- 个人简介与经历：`content/about.md`
- [写作与发布指南](docs/writing.md)

## 本地预览

安装 [Hugo Extended 0.168.0](https://github.com/gohugoio/hugo/releases/tag/v0.168.0)，然后运行：

```sh
git clone --recurse-submodules https://github.com/xUxIAOrUI815/xuxiaorui815.github.io.git
cd xuxiaorui815.github.io
hugo server -D
```

已有本地仓库时先运行 `git submodule update --init --recursive`。打开终端中打印的本地网址。

当前 Windows 工作区也可以运行（使用相邻 `.tools` 中的 Hugo）：

```powershell
.\scripts\preview.ps1
```

## 构建与验证

```sh
hugo --gc --minify --environment production
python scripts/check_site.py
node --test scripts/test_reading_progress.mjs
```

`public/` 为生成文件，不提交到 Git。GitHub Actions 对分支推送和 PR 执行构建与链接检查；只有 `main` 会部署。Pages 的发布来源应为 **GitHub Actions**。

首版已部署成功，但本次未观察到 Git 推送自动触发运行；原因尚未确定。当前可用 `gh workflow run pages.yaml --ref main` 手动发布，详见[验证记录](docs/validation.md)。

## 分支

- `main`：发布分支。
- `feat/blog-bootstrap`：初始搭建分支，首次发布与 `main` 指向同一个提交。
- 后续改动使用短期功能分支，合并到 `main` 后发布。

## 第一版内容与来源

首页、归档、搜索、标签、About、FAQ、文章目录、代码复制、RSS、深浅色模式和移动端布局均已配置。开站说明与排版示例是本站新写的内容，没有复制 Lilian Weng 的文章或个人资料。

PaperMod 通过 Git 子模块固定版本，保留其 [MIT 许可证](themes/PaperMod/LICENSE)。本站的少量样式覆盖位于 `assets/css/extended/`，不直接修改主题。首页依次提供 GitHub、[CSDN 主页](https://blog.csdn.net/KRADDDD?type=blog)与 [RSS 订阅](https://xuxiaorui815.github.io/index.xml)入口；About 页面另提供邮箱链接，独立浏览器写作入口尚未配置。

## About 页面

导航中的 About 位于 Tags 与 FAQ 之间。编辑 `content/about.md` 的正文和 front matter 即可维护简介、联系入口、教育、组织与经历、探索方向；时间线支持多条记录。布局位于 `layouts/about.html`，样式位于 `assets/css/extended/about.css`。

当前资料来自用户确认可参考的 GitHub 主页（2026-10-17）。学校、年龄、职位和任职时间尚未提供，因此不展示这些字段。Ant Group 仅按主页所列组织展示，不视为已确认的任职经历。补齐资料后可更新 `education`、`experience` 条目及其 `period` 字段。About 不进入文章列表、搜索索引或 RSS，也不加载文章阅读进度组件。

## 咖啡行星标志与阅读进度

页头及浏览器标签页使用「咖啡行星」标志，液面为灰色，随深浅色主题适配。页头 SVG 源文件在 `assets/brand/coffee-planet.svg`，标签页和 Apple 图标在 `static/`。

文章页的咖啡杯表示正文滚动进度：正文开始时满杯，最后一行进入视口时空杯。它不计时，也不把文章标题、目录、页脚算入阅读范围；一屏内能展示完整正文的短文章会直接显示读到文末。文章开头，咖啡位于阅读时长旁；文章头部离开视口后，同一个咖啡杯进入 44px 高的顶部阅读栏，显示当前文章标题和已读百分比。桌面和手机使用相同行为，长标题会省略，目录跳转会为顶部栏留出空间。Tab 图标保持静态。关闭 JavaScript 时隐藏进度，文章仍正常显示；系统选择减少动态效果时不播放液面过渡。

实现位于 `assets/js/reading-coffee.mjs`、`assets/css/extended/reading-coffee.css` 与 `layouts/_partials/extend_post_content.html` 模板钩子；主题文件没有修改。页边星和走神括号保存在 `assets/brand/reserved/`，暂不展示。
