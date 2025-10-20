# 靜態部署指南

## 🚀 快速部署步驟

### 1. 本地構建

```bash
# 進入 frontend 目錄
cd frontend

# 安裝依賴（如果還沒安裝）
npm install

# 執行構建
npm run build
```

構建完成後，會在 `dist` 目錄生成靜態文件。

---

## 📦 部署選項

### 選項 1: Netlify（推薦 - 最簡單）

#### 方法 A：拖放部署

1. 前往 [Netlify](https://app.netlify.com/)
2. 註冊/登入
3. 直接將 `dist` 資料夾拖放到 Netlify
4. 完成！自動獲得 HTTPS 域名

#### 方法 B：Git 自動部署

1. 將專案推送到 GitHub/GitLab
2. 在 Netlify 中「New site from Git」
3. 設定構建命令：
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. 部署後自動更新

**Netlify 配置文件**: `public/_redirects` ✅ 已創建

---

### 選項 2: Vercel

#### 方法 A：CLI 部署

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 在 frontend 目錄執行
cd frontend
vercel
```

#### 方法 B：Git 自動部署

1. 前往 [Vercel](https://vercel.com/)
2. Import Git Repository
3. 設定：
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**Vercel 配置文件**: `public/vercel.json` ✅ 已創建

---

### 選項 3: GitHub Pages

```bash
# 安裝 gh-pages
npm install -D gh-pages

# 在 package.json 新增 script
"deploy": "gh-pages -d dist"

# 構建並部署
npm run build
npm run deploy
```

**注意**: 需要在 `vite.config.ts` 設定 `base: '/repo-name/'`

---

### 選項 4: Cloudflare Pages

1. 前往 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 連結 Git 儲存庫
3. 設定：
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Build output directory**: `frontend/dist`
4. 部署完成

---

## 🔧 進階設定

### 自訂域名

- **Netlify**: Settings → Domain management
- **Vercel**: Settings → Domains
- **GitHub Pages**: Repository Settings → Pages

### 環境變數

如需 API 端點或其他環境變數，在部署平台設定：

```
VITE_API_URL=https://api.example.com
```

在程式碼中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### HTTPS

所有推薦的平台都自動提供免費 HTTPS 證書。

---

## ✅ 部署檢查清單

- [x] 構建成功（`npm run build`）
- [x] SPA 路由配置（`_redirects` / `vercel.json`）
- [x] Vite 配置優化（`base: './'`）
- [ ] 測試構建版本（`npm run preview`）
- [ ] 檢查主控台無錯誤
- [ ] 所有路由正常運作

---

## 🧪 本地測試構建版本

```bash
# 預覽生產版本
npm run preview
```

這會在 `http://localhost:4173` 啟動靜態伺服器。

---

## 🐛 常見問題

### 1. 路由 404 錯誤

**原因**: SPA 需要將所有路由重定向到 `index.html`
**解決**: 確保 `_redirects` 或 `vercel.json` 已正確配置 ✅

### 2. 資源路徑錯誤

**原因**: `base` 設定不正確
**解決**: 使用 `base: './'` 確保相對路徑 ✅

### 3. CSS 未載入

**原因**: Tailwind 配置問題
**解決**: 確認 `tailwind.config.js` 的 `content` 路徑正確 ✅

---

## 📊 構建分析

查看打包文件大小：

```bash
npm run build -- --mode production
```

當前打包結果：

- `index.html`: ~0.75 KB
- `CSS`: ~29.58 KB (gzip: 5.92 KB)
- `JS`: ~390.75 KB (gzip: 124.20 KB)

✅ 大小合理，載入速度優秀！

---

## 🎯 推薦部署方案

**最佳選擇**: **Netlify 拖放部署**

- ✅ 零設定
- ✅ 自動 HTTPS
- ✅ 全球 CDN
- ✅ 免費額度充足

立即開始：將 `dist` 資料夾拖到 [Netlify Drop](https://app.netlify.com/drop) 即可！
