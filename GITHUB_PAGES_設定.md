# GitHub Pages 部署設定指南

## 問題說明

GitHub Pages 目前設定從 `/root` 資料夾部署，但專案的前端程式碼在 `frontend/` 資料夾中，導致只顯示 README.md。

## 解決方案

已建立 GitHub Actions 自動部署工作流程，會自動建置前端專案並部署到 GitHub Pages。

## 設定步驟

### 1. 前往 GitHub Repository Settings

1. 開啟 https://github.com/klchen41265401/typescript_to_java_tutorial
2. 點擊上方的 **Settings** 標籤
3. 在左側選單找到 **Pages**

### 2. 修改 Build and deployment 設定

在 **Source** 區塊：

- 將 "Deploy from a branch" 改為 **"GitHub Actions"**
- 這樣 GitHub 就會使用我們建立的 `.github/workflows/deploy.yml` 來自動建置和部署

### 3. 等待自動部署

1. 回到 Repository 首頁
2. 點擊上方的 **Actions** 標籤
3. 你會看到一個正在執行或已完成的工作流程：`部署到 GitHub Pages`
4. 等待綠色勾勾出現（表示部署成功）

### 4. 查看網站

部署完成後，你的網站會在：

- **https://klchen41265401.github.io/typescript_to_java_tutorial/**

## 工作流程說明

已建立的 GitHub Actions 工作流程會：

1. ✅ 自動檢出程式碼
2. ✅ 安裝 Node.js 和依賴套件
3. ✅ 執行 `npm run build` 建置前端專案
4. ✅ 將 `frontend/dist` 資料夾的內容部署到 GitHub Pages
5. ✅ 每次 push 到 main 分支時自動執行

## 未來使用方式

以後只要：

```bash
git add .
git commit -m "更新內容"
git push
```

GitHub Actions 就會自動建置和部署！不需要手動操作。

## 故障排除

### 如果 Actions 執行失敗

1. 檢查 Actions 頁面的錯誤訊息
2. 確保 `frontend/package.json` 中的依賴都正確
3. 確保 GitHub Pages 設定為 "GitHub Actions" 模式

### 如果看到 404 錯誤

- 等待 2-3 分鐘讓 GitHub Pages 更新
- 清除瀏覽器快取
- 確認 Actions 工作流程已成功完成

## 本地測試

在推送到 GitHub 前，可以先在本地測試：

```powershell
cd frontend
npm run build
npm run preview
```

這會啟動一個本地預覽伺服器，確保建置沒問題。
