# 🔧 Git 推送問題解決指南

## ⚠️ 當前問題

您遇到權限錯誤：

```
remote: Permission to klchen41265401/typescript_to_java_tutorial.git denied to Kenensh.
```

這是因為 Git 使用了錯誤的 GitHub 帳號。

---

## 🎯 解決方案（三選一）

### **方案 1：使用個人訪問令牌（推薦）**

#### 步驟 1：生成 GitHub Personal Access Token

1. **前往 GitHub**：https://github.com/settings/tokens
2. 點擊「Generate new token」→「Generate new token (classic)」
3. **設定權限**：
   - Note: `TypeScript to Java Tutorial`
   - Expiration: 選擇期限（建議 90 days）
   - 勾選權限：
     - ✅ `repo` (完整勾選)
     - ✅ `workflow` (如果需要 GitHub Actions)
4. 點擊「Generate token」
5. **立即複製 token**（只顯示一次！）

#### 步驟 2：使用 Token 推送

```powershell
# 移除舊的遠端設定
git remote remove origin

# 使用 Token 設定新的遠端
git remote add origin https://你的TOKEN@github.com/klchen41265401/typescript_to_java_tutorial.git

# 推送
git push -u origin main
```

**範例**（假設 token 是 `ghp_xxxxxxxxxxxx`）：

```powershell
git remote add origin https://ghp_xxxxxxxxxxxx@github.com/klchen41265401/typescript_to_java_tutorial.git
```

---

### **方案 2：使用 SSH（最安全，推薦長期使用）**

#### 步驟 1：生成 SSH 金鑰

```powershell
# 生成新的 SSH 金鑰
ssh-keygen -t ed25519 -C "your_email@example.com"

# 按 Enter 使用預設位置
# 可以設定密碼或直接按 Enter

# 啟動 SSH Agent
Start-Service ssh-agent

# 添加金鑰
ssh-add ~/.ssh/id_ed25519
```

#### 步驟 2：將 SSH 公鑰添加到 GitHub

```powershell
# 複製公鑰到剪貼簿
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

1. 前往：https://github.com/settings/keys
2. 點擊「New SSH key」
3. Title: `My Windows PC`
4. Key: 貼上剛才複製的內容
5. 點擊「Add SSH key」

#### 步驟 3：使用 SSH 推送

```powershell
# 移除舊的遠端設定
git remote remove origin

# 使用 SSH 設定新的遠端
git remote add origin git@github.com:klchen41265401/typescript_to_java_tutorial.git

# 推送
git push -u origin main
```

---

### **方案 3：切換 GitHub 帳號（如果使用 GitHub Desktop）**

如果您已安裝 GitHub Desktop：

1. 開啟 GitHub Desktop
2. File → Options → Accounts
3. 登出 (Kenensh)
4. 重新登入 (klchen41265401)
5. 使用 GitHub Desktop 推送

---

## 🚀 快速解決（推薦：方案 1）

### **完整步驟**：

```powershell
# 1. 前往 GitHub 生成 Token
# https://github.com/settings/tokens
# 勾選 repo 權限，複製 Token

# 2. 在 PowerShell 執行（替換成您的 Token）
cd "C:\Users\MyUser\Desktop\test\other\java學習\java教學\frontend"

git remote remove origin

git remote add origin https://你的TOKEN@github.com/klchen41265401/typescript_to_java_tutorial.git

git push -u origin main
```

---

## 🔍 確認設定

```powershell
# 檢查遠端設定
git remote -v

# 應該顯示：
# origin  https://TOKEN@github.com/klchen41265401/typescript_to_java_tutorial.git (fetch)
# origin  https://TOKEN@github.com/klchen41265401/typescript_to_java_tutorial.git (push)
```

---

## 📝 推送後的步驟

推送成功後，您可以：

### 1️⃣ **確認 GitHub 上的代碼**

前往：https://github.com/klchen41265401/typescript_to_java_tutorial

### 2️⃣ **部署到 Netlify（自動部署）**

1. 前往：https://app.netlify.com/
2. 點擊「Add new site」→「Import an existing project」
3. 選擇 GitHub，授權並選擇您的 repo
4. **設定構建**：
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. 點擊「Deploy site」

每次推送代碼會自動重新部署！

### 3️⃣ **或部署到 Vercel（自動部署）**

1. 前往：https://vercel.com/
2. 點擊「New Project」
3. Import Git Repository
4. 選擇您的專案
5. **設定**：
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (自動偵測)
   - **Output Directory**: `dist` (自動偵測)
6. 點擊「Deploy」

---

## 🐛 常見問題

### Q1: Token 不小心公開了怎麼辦？

**A**: 立即前往 GitHub Settings → Tokens 刪除該 Token，然後生成新的。

### Q2: 忘記 Token 怎麼辦？

**A**: Token 只顯示一次，忘記了只能重新生成。

### Q3: 推送時要求輸入密碼？

**A**: GitHub 已停用密碼驗證，必須使用 Token 或 SSH。

### Q4: 權限錯誤 403？

**A**: 確認 Token 有勾選 `repo` 權限，或檢查您是否有該倉庫的寫入權限。

---

## ✅ 成功推送後

您應該看到：

```
Enumerating objects: 40, done.
Counting objects: 100% (40/40), done.
Delta compression using up to 8 threads
Compressing objects: 100% (36/36), done.
Writing objects: 100% (40/40), 123.45 KiB | 12.34 MiB/s, done.
Total 40 (delta 2), reused 0 (delta 0), pack-reused 0
To github.com:klchen41265401/typescript_to_java_tutorial.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🎉 下一步

1. ✅ 代碼已推送到 GitHub
2. 🚀 設定自動部署（Netlify/Vercel）
3. 🌐 獲得公開網址
4. 📤 分享您的作品！

有任何問題歡迎查看 `部署指南.md`！
