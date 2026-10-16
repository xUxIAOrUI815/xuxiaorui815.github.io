# 写作与发布

## 1. 写一篇文章

每篇文章使用独立目录，正文名为 `index.md`，图片可以放在旁边：

```text
content/posts/my-first-post/
├── index.md
└── diagram.png
```

可以直接创建文件，也可以运行 `hugo new content posts/my-first-post/index.md` 使用模板。文章顶部填写：

```toml
+++
title = '我的第一篇文章'
date = '2026-10-16T10:00:00+08:00'
slug = 'my-first-post'
draft = true
tags = ['学习笔记']
description = '用于搜索引擎和分享的一句话介绍。'
summary = '显示在首页文章列表里的摘要。'
+++
```

正文写在第二个 `+++` 后面。图片使用 `![图片说明](diagram.png)` 引用。

`slug` 决定文章地址，例如 `/posts/my-first-post/`。发布后尽量不再改动，避免旧链接失效。

## 2. 本地预览

```sh
hugo server -D
```

`-D` 会显示草稿。默认生产构建不会发布 `draft = true` 或日期在未来的文章。

注意：当前仓库是公开仓库。即使网页不展示草稿，已经提交到仓库的 Markdown 仍可被他人查看；不公开的草稿留在仓库外，或先不要提交。

## 3. 发布

将 `draft` 改为 `false`，确认文章日期不晚于当前时间。通过功能分支提交并合并到 `main`，GitHub Actions 会自动构建和部署。

也可以在 GitHub 网页上打开 `content/posts/`，通过 **Add file → Create new file** 创建 `文章目录/index.md`，或编辑已有 Markdown。提交到 `main` 后会走同一个发布流程。这是当前可用的网页写作方式。

提交成功与部署成功是两个状态：请在仓库的 **Actions → Build and deploy blog** 中确认绿色成功标记，然后访问网站。

首版验证中，工作流手动执行成功，但几次 Git 推送后没有观察到 `push` 事件运行，原因尚未确定。因此暂时不要只凭提交成功就判断文章已上线。如果 Actions 没有出现新的运行，在仓库目录执行：

```sh
gh workflow run pages.yaml --ref main
```

也可以在 GitHub 的 **Actions → Build and deploy blog → Run workflow** 中选择 `main`。需要本机 `gh` 已登录 GitHub。推送自动触发的配置已保留，待后续确认恢复。

## 4. 调整网站

| 要修改什么 | 文件 |
| --- | --- |
| 名字、介绍、GitHub / RSS 链接、菜单 | `hugo.toml` |
| 字体、间距、颜色 | `assets/css/extended/blog.css` |
| FAQ | `content/faq.md` |
| 文章元信息展示 | `layouts/_partials/post_meta.html` |
| 自动构建和部署 | `.github/workflows/pages.yaml` |

站名暂定为 **Rui’s Notes**，可以随时调整；它不影响 `xuxiaorui815.github.io` 域名。

## 5. 删除示例与回退

不需要排版示例时，删除 `content/posts/markdown-example/` 并提交。首页、搜索、标签与归档会自动更新。

如发布后发现问题，优先用 `git revert <提交号>` 创建回退提交，再合并到 `main`。不要用强制推送覆盖历史。
