# Ruii’s Margins

[![Build and deploy blog](https://github.com/xUxIAOrUI815/xuxiaorui815.github.io/actions/workflows/pages.yaml/badge.svg)](https://github.com/xUxIAOrUI815/xuxiaorui815.github.io/actions/workflows/pages.yaml)

Xiaorui Xu 的个人博客。使用 **Hugo + PaperMod + GitHub Pages**，页面结构参考 [Lilian Weng 的 Lil’Log](https://lilianweng.github.io/)。

- 网站：<https://xuxiaorui815.github.io/>
- 内容：`content/posts/`
- 配置：`hugo.toml`
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
```

`public/` 为生成文件，不提交到 Git。GitHub Actions 对分支推送和 PR 执行构建与链接检查；只有 `main` 会部署。Pages 的发布来源应为 **GitHub Actions**。

首版已部署成功，但本次未观察到 Git 推送自动触发运行；原因尚未确定。当前可用 `gh workflow run pages.yaml --ref main` 手动发布，详见[验证记录](docs/validation.md)。

## 分支

- `main`：发布分支。
- `feat/blog-bootstrap`：初始搭建分支，首次发布与 `main` 指向同一个提交。
- 后续改动使用短期功能分支，合并到 `main` 后发布。

## 第一版内容与来源

首页、归档、搜索、标签、FAQ、文章目录、代码复制、RSS、深浅色模式和移动端布局均已配置。开站说明与排版示例是本站新写的内容，没有复制 Lilian Weng 的文章或个人资料。

PaperMod 通过 Git 子模块固定版本，保留其 [MIT 许可证](themes/PaperMod/LICENSE)。本站的少量样式覆盖位于 `assets/css/extended/blog.css`，不直接修改主题。首页提供 GitHub 与 [CSDN 主页](https://blog.csdn.net/KRADDDD?type=blog)入口；邮箱和独立浏览器写作入口尚未配置。
