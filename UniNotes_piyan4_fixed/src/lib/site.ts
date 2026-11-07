export const categories = [
  { slug: 'ai', label: 'AI 工具', description: '認識並善用各種 AI 工具，提升學習與工作效率。' },
  { slug: 'tech', label: '科技知識', description: '用淺顯的方式理解常見的科技概念與趨勢。' },
  { slug: 'tools', label: '數位工具', description: '筆記、協作與開發等實用數位工具的使用指南。' },
  { slug: 'study', label: '學習技巧', description: '適合大學生的讀書方法、時間管理與整理技巧。' },
] as const;

export const slugOf = (label: string) => categories.find((c) => c.label === label)?.slug ?? 'ai';

/** 產生含 base 路徑的網址，確保部署在 GitHub Pages 子路徑時連結正確 */
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

export const fmt = (d: Date) => d.toISOString().slice(0, 10);
