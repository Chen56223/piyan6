# AGENTS.md — UniNotes 專案開發手冊

> 本文件是 UniNotes 的最高優先級專案規範。開始任何新增、修改或重構前，AI 助手必須先閱讀本文件，並以既有架構為基礎工作。

## 1. 專案目標與範圍

UniNotes 是提供大學生使用的繁體中文數位學習知識庫。內容聚焦四個領域：

- **AI 工具**：生成式 AI、提示詞、AI 學習應用與使用倫理。
- **科技知識**：網路、API、程式、資訊安全等概念入門。
- **數位工具**：筆記、協作、文件與生產力工具教學。
- **學習技巧**：讀書方法、時間管理、資訊整理與考試準備。

核心設計原則：內容資料與頁面呈現分離。新增一般知識文章時，應只新增 Markdown 檔案，不應為每篇文章複製一份 Astro 頁面。網站需適合持續擴充、容易搜尋、手機可讀。

## 2. 技術與指令

- Astro 5：靜態網站產生器。
- Astro Content Collections：文章載入、欄位驗證與靜態路由。
- Markdown：文章內容及 Frontmatter。
- 原生 CSS／少量瀏覽器 JavaScript：樣式與搜尋互動。
- GitHub Actions + GitHub Pages：自動建置與部署。

常用指令：

```bash
npm install       # 安裝依賴
npm run dev       # 本機開發伺服器
npm run build     # 正式建置，輸出至 dist/
npm run preview   # 預覽正式建置結果
```

除非需求確實無法用現有技術完成，否則不要增加框架或大型依賴。新增依賴前先說明必要性。

## 3. 專案目錄與責任

```text
UniNotes/
├── AGENTS.md                    # AI 必讀規則
├── README.md                    # 專案介紹、執行與部署說明
├── astro.config.mjs             # 網站網址與 GitHub Pages base
├── package.json                 # 指令與依賴
├── .github/workflows/deploy.yml # GitHub Pages 自動部署
├── public/images/               # 靜態圖片，使用小寫 kebab-case 命名
└── src/
    ├── content.config.ts        # 文章集合與 Frontmatter schema
    ├── content/articles/        # 所有 Markdown 文章
    ├── components/              # 可重複使用的 Astro 元件
    ├── layouts/                 # 共用頁面版型
    ├── lib/site.ts              # 分類資料、網址與日期工具
    ├── pages/                   # Astro 路由頁面
    └── styles/global.css        # 全站設計系統與響應式樣式
```

檔案責任：

- `src/content/articles/` 是文章內容的唯一來源。
- `src/content.config.ts` 定義文章欄位與允許的分類；修改分類時要同步檢查 `src/lib/site.ts`。
- `src/lib/site.ts` 集中管理分類名稱、slug 與部署路徑工具，避免各頁自行硬編碼。
- `src/components/` 放跨頁共用 UI；不要複製貼上相同卡片或導覽列。
- `src/layouts/BaseLayout.astro` 管理共用 HTML、標題、描述、Header、Footer 與全站 CSS。
- `src/pages/` 只負責路由與資料組合；文章詳情由動態路由產生。

## 4. 視覺與使用體驗規範

品牌定位：清爽、可信任、容易閱讀的學生知識筆記。維持白底、藍色重點、卡片式資訊層級，不要任意改成與現有品牌不一致的風格。

既有色彩：

- 背景：`#FFFFFF`
- 主色：`#2563EB`
- 淺藍：`#EFF6FF`
- 主要文字：`#1F2937`
- 次要文字：`#64748B`

設計要求：

1. 版面留白充足，標題、摘要、內文層級清楚。
2. 卡片、按鈕與導覽互動維持一致的圓角、間距與狀態。
3. 文章正文行寬需適合長文閱讀，表格在窄螢幕不可造成整頁溢出。
4. 必須支援手機、平板與桌面；不可只檢查桌面版。
5. 使用語意化 HTML；互動控制需有可理解的標籤，鍵盤可操作。
6. 圖片提供有意義的替代文字；裝飾圖片才可使用空 alt。
7. 不使用只有顏色才能辨識的狀態提示。

## 5. 路由與頁面規則

以下路由是網站既有功能，修改時不可破壞：

- `/`：首頁、分類入口、最新文章。
- `/categories/`：分類總覽。
- `/categories/[slug]/`：指定分類的文章列表。
- `/articles/[...slug]/`：文章內容與自動目錄。
- `/search/`：搜尋標題、簡介與標籤。
- `/about/`：專案介紹與使用方式。

新增一般文章不需要新增路由檔。只有新增真正不同的功能頁面時，才在 `src/pages/` 建立新 `.astro` 檔，並沿用 `BaseLayout`、共用元件及 `url()`。

## 6. 新增文章的標準流程

1. 在 `src/content/articles/` 新增英文小寫檔名，單字以連字號分隔，例如 `github-pages-guide.md`。
2. Frontmatter 必須符合下方格式與 schema。
3. `category` 只能使用四個允許值之一，且需與 `src/content.config.ts` 完全一致。
4. 文章第一個標題使用 H1；主要段落使用 H2；子段落使用 H3。不要跳級使用標題。
5. 寫清楚摘要、步驟、實例與必要的注意事項；避免空泛文字。
6. 涉及版本、價格、政策或工具功能等易變資訊時，標示查證日期並提供可靠來源連結。
7. 完成後執行 `npm run build`，確認文章頁與分類頁可成功產生。

標準 Frontmatter：

```yaml
---
title: "文章標題"
description: "一至兩句說明文章能解決什麼問題。"
category: "數位工具"
tags:
  - 教學
  - 入門
date: 2026-11-07
updated: 2026-11-07
---
```

欄位規則：

- `title`：必填字串，使用繁體中文或必要的產品名稱。
- `description`：必填字串，作為卡片摘要與頁面描述。
- `category`：必填，僅限 `AI 工具`、`科技知識`、`數位工具`、`學習技巧`。
- `tags`：字串陣列；用 2–5 個具體標籤即可。
- `date`：必填，首次發布日期，格式 `YYYY-MM-DD`。
- `updated`：必填，最後實質更新日期；沒有更新時可與 `date` 相同。

文章正文建議結構：

```markdown
# 文章標題

用一小段說明主題與閱讀收穫。

## 核心概念

## 操作步驟或實際應用

### 範例

## 常見問題／注意事項

## 小結
```

不要求每篇文章硬套所有段落；依主題調整，但需保持清楚易讀。程式碼使用 fenced code block 並標註語言。引用外部資料時附上來源，不可捏造來源或數據。

## 7. 分類管理規則

分類目前由 `src/lib/site.ts` 的 `categories` 陣列管理，文章 schema 則由 `src/content.config.ts` 驗證。若要新增、刪除或更名分類，必須同步更新兩處，並檢查分類頁、首頁、關於頁與既有文章。分類 slug 使用英文小寫 kebab-case，且不可重複。

## 8. 元件與程式碼規範

- 元件檔名使用 PascalCase，例如 `ArticleCard.astro`。
- 頁面與工具檔案沿用現有命名方式；一般檔案使用 kebab-case 或既有慣例。
- Astro 元件需明確定義必要的 Props 型別。
- 重複 UI 優先抽成元件，元件只負責單一清楚職責。
- 內部連結必須使用 `src/lib/site.ts` 的 `url()`，確保 GitHub Pages 子路徑部署正常。
- 不可把 `/UniNotes/...` 寫死在頁面中，也不可假設網站一定部署在網域根目錄。
- 搜尋結果若動態插入 HTML，必須對使用者輸入及文章欄位做 HTML escaping。
- 不提交 `node_modules/`、`dist/`、本機密鑰、token 或個人資料。

## 9. GitHub Pages 部署規則

`astro.config.mjs` 的 `site` 與 `base` 必須依實際 GitHub 帳號及 repository 設定：

- 一般專案儲存庫 `帳號.github.io/UniNotes`：`site` 設為 `https://帳號.github.io`，`base` 設為 `/UniNotes`。
- 若 repository 名稱本身是 `帳號.github.io`，或使用自訂網域：`base` 設為 `/`，並將 `site` 設為實際網域。

GitHub Actions 工作流程部署 `main` 分支。GitHub Repository 的 Settings → Pages → Build and deployment 應選擇 **GitHub Actions**。push 到 `main` 後，檢查 Actions 工作流程成功，再開啟 Pages 網址驗證。

## 10. AI 助手執行任務的規則

每次接到任務時：

1. 先閱讀本文件及與任務直接相關的檔案，不可未檢查就重寫整個專案。
2. 先理解現有資料流、元件與路由，再選擇最小且一致的修改方式。
3. 新增內容時沿用既有設計、分類、命名與元件；不得只為了展示而複製一套新架構。
4. 若需求與本文件衝突，先指出衝突及影響，再採用使用者明確指定的方向。
5. 不刪除既有文章、頁面或功能，除非使用者明確要求。
6. 不偽稱已推送 GitHub 或已部署；只有實際完成並確認後才能如此回報。
7. 完成後摘要列出修改檔案、功能變更、測試結果，以及仍需使用者操作的事項。

## 11. 完成前檢查清單

- [ ] `npm run build` 成功。
- [ ] 首頁、分類、文章、搜尋、關於頁都能正常開啟。
- [ ] 新文章有正確分類、日期、標籤與摘要。
- [ ] 站內連結使用 `url()`，部署子路徑不會失效。
- [ ] 手機版沒有明顯水平溢位或文字難以閱讀。
- [ ] 沒有提交密鑰、個資、`node_modules/` 或 `dist/`。
- [ ] README 與實際專案設定一致。
