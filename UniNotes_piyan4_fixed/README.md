# UniNotes｜大學生數位學習筆記

UniNotes 是一個以 Astro 建立的繁體中文知識庫，整理 AI 工具、科技知識、數位工具與學習技巧。網站採用 Markdown 管理文章，讓新增內容不必重做頁面，適合作為可持續擴充的個人知識站。

## 功能

- 首頁展示四大分類與最新文章
- 分類總覽與分類文章列表
- Markdown 文章頁，自動產生 H2／H3 目錄
- 即時搜尋文章標題、簡介與標籤
- 關於頁與響應式版面

## 技術

Astro 5、Astro Content Collections、Markdown、原生 CSS／JavaScript、GitHub Actions、GitHub Pages。

## 本機執行

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址即可預覽。正式建置與預覽：

```bash
npm run build
npm run preview
```

## 新增一篇文章

在 `src/content/articles/` 新增 Markdown 檔案，例如 `github-pages-guide.md`：

```yaml
---
title: "GitHub Pages 部署入門"
description: "了解如何將靜態網站發布到公開網址。"
category: "科技知識"
tags:
  - GitHub
  - 網站部署
date: 2026-11-07
updated: 2026-11-07
---

# GitHub Pages 部署入門

文章內容從這裡開始。

## 準備工作

## 部署步驟

## 小結
```

儲存後，文章會自動進入首頁最新文章、對應分類、搜尋結果與文章詳細頁。無須新增 Astro 路由。完整規則請閱讀 [`AGENTS.md`](./AGENTS.md)。

## GitHub Pages 部署

1. 將專案推送到 GitHub repository 的 `main` 分支。
2. 編輯 `astro.config.mjs`，本專案已設定為 `site: https://Chen56223.github.io`、`base: /piyan4`，對應網址 `https://Chen56223.github.io/piyan4/`。若更換 Repository 名稱或帳號，才需要同步修改 `astro.config.mjs`。
3. 在 GitHub repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。
4. 推送到 `main` 後，至 **Actions** 確認 Deploy to GitHub Pages 工作流程成功。
5. 在 **Settings → Pages** 查看公開網址。

> 本 Repository 的 GitHub Actions 工作流程位於根目錄 `.github/workflows/deploy.yml`；請勿將整個專案再包在 `UniNotes/` 子資料夾內。

## 專案規則

`AGENTS.md` 是 AI 助手的開發手冊，定義專案目的、技術、資料夾責任、視覺規範、文章格式、分類管理、部署流程與完成檢查清單。未來請先讓 AI 閱讀該文件，再要求新增文章或頁面。
