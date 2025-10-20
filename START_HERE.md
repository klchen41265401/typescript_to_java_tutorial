# Java & Spring Boot 教學 - 啟動指南

## 🚀 啟動專案

### 方式一：使用 PowerShell 腳本

#### 啟動後端

```powershell
cd backend
.\start-backend.ps1
```

#### 啟動前端

```powershell
cd frontend
npm run dev
```

### 方式二：手動啟動

#### 啟動後端（Spring Boot）

```powershell
cd backend
mvn clean install
mvn spring-boot:run
```

啟動後訪問：

- API: http://localhost:8080/api
- H2 Console: http://localhost:8080/api/h2-console

#### 啟動前端（React）

```powershell
cd frontend
npm install  # 首次需要
npm run dev
```

啟動後訪問：

- 前端: http://localhost:3000

## 📝 測試 API

### 測試範例

```powershell
# 建立使用者
Invoke-RestMethod -Uri "http://localhost:8080/api/users" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"John Doe","email":"john@example.com","age":30}'

# 取得所有使用者
Invoke-RestMethod -Uri "http://localhost:8080/api/users" -Method Get

# 取得單一使用者
Invoke-RestMethod -Uri "http://localhost:8080/api/users/1" -Method Get
```

## ⚠️ 常見問題

### 前端啟動失敗

如果出現 `Cannot find module` 錯誤：

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

### 後端編譯失敗

如果 Maven 編譯失敗：

```powershell
cd backend
mvn clean
mvn install -DskipTests
mvn spring-boot:run
```

### Port 被占用

如果 port 8080 或 3000 被占用：

查看佔用的進程：

```powershell
netstat -ano | findstr :8080
netstat -ano | findstr :3000
```

終止進程：

```powershell
taskkill /PID <進程ID> /F
```

## 📚 專案結構

```
java教學/
├── frontend/          # React 前端
│   ├── src/
│   │   ├── App.tsx   # 主應用程式（已簡化但完整）
│   │   ├── main.tsx  # React 入口
│   │   └── index.css # 全域樣式
│   ├── package.json
│   └── vite.config.ts
│
├── backend/           # Spring Boot 後端
│   ├── src/main/
│   │   ├── java/com/tutorial/
│   │   │   ├── TutorialApplication.java
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   └── config/
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
└── START_HERE.md     # 本檔案
```

## 🎯 學習建議

1. **先啟動後端** - 確保 Spring Boot 正常運行
2. **啟動前端** - 瀏覽教學內容
3. **測試 API** - 使用 Postman 或 curl 測試
4. **閱讀原始碼** - 查看詳細註解
5. **動手實作** - 修改和擴展功能

## 📖 下一步

- 查看 `README.md` 了解詳細說明
- 瀏覽 `PROJECT_SUMMARY.md` 查看專案摘要
- 訪問前端網站學習語言比較
- 測試 REST API 端點

Happy Learning! 🎉
