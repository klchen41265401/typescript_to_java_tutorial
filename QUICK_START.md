# Java & Spring Boot 教學專案

## ✅ 專案架構完成

專案已經完整建立，包含：

### 📦 前端 (React + TypeScript)

- ✅ 簡化但完整的單頁應用
- ✅ 首頁、語言比較、範例頁面
- ✅ TailwindCSS 響應式設計
- ✅ React Router 路由系統

### 🌱 後端 (Spring Boot + Java)

- ✅ 完整的 REST API (CRUD)
- ✅ Spring Data JPA
- ✅ H2 記憶體資料庫
- ✅ 全域例外處理
- ✅ 資料驗證
- ✅ CORS 配置

## 🚀 啟動方式

### 後端啟動 (推薦先啟動)

```powershell
# 方式 1: 使用 Maven
cd backend
mvn clean install
mvn spring-boot:run

# 方式 2: 使用腳本
cd backend
.\start-backend.ps1
```

**後端將在以下位置啟動：**

- API: http://localhost:8080/api
- H2 Console: http://localhost:8080/api/h2-console
  - JDBC URL: `jdbc:h2:mem:tutorialdb`
  - Username: `sa`
  - Password: (留空)

### 前端啟動

```powershell
cd frontend
npm run dev
```

**前端將在以下位置啟動：**

- 網站: http://localhost:3000

## 🎯 專案特色

### 1. 簡潔的前端介面

前端使用單一檔案 (`App.tsx`) 實現：

- 首頁：介紹專案特色
- 語言比較：並排顯示 TypeScript/Java/Spring Boot 程式碼
- 範例頁面：展示可用的 API 端點

### 2. 完整的後端 API

實現使用者管理的完整 CRUD：

- GET /api/users - 列出所有使用者
- GET /api/users/{id} - 取得單一使用者
- POST /api/users - 建立使用者
- PUT /api/users/{id} - 更新使用者
- DELETE /api/users/{id} - 刪除使用者
- GET /api/users/search - 搜尋使用者（分頁）
- GET /api/users/stats - 統計資訊

### 3. 對比學習設計

每個比較範例包含三種實作：

- **TypeScript**: 前端開發者熟悉的語法
- **Java**: 對應的 Java 實作
- **Spring Boot**: 企業級框架的實作

## 📝 測試 API

### 使用 PowerShell

```powershell
# 建立使用者
Invoke-RestMethod -Uri "http://localhost:8080/api/users" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"John Doe","email":"john@example.com","age":30}'

# 取得所有使用者
Invoke-RestMethod -Uri "http://localhost:8080/api/users" | ConvertTo-Json

# 取得統計
Invoke-RestMethod -Uri "http://localhost:8080/api/users/stats" | ConvertTo-Json
```

### 使用 curl

```bash
# 建立使用者
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":30}'

# 取得所有使用者
curl http://localhost:8080/api/users
```

## 📚 學習路徑

1. **啟動後端** - 確保 API 正常運作
2. **測試 API** - 使用 curl 或 Postman 測試端點
3. **啟動前端** - 瀏覽教學內容
4. **閱讀原始碼** - 理解實作細節
5. **動手實作** - 擴展功能

## 🔍 核心差異對比

### 依賴注入

**TypeScript (React Context)**

```typescript
const ServiceContext = createContext<Services | null>(null);
```

**Spring Boot**

```java
@Service
public class UserService {
    @Autowired
    private UserRepository repository;
}
```

### REST API

**TypeScript (Express)**

```typescript
app.get("/users/:id", async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});
```

**Spring Boot**

```java
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getUser(id));
}
```

### 資料庫操作

**TypeScript (TypeORM)**

```typescript
const user = await userRepository.findOne({ where: { id } });
```

**Spring Boot (JPA)**

```java
Optional<User> user = userRepository.findById(id);
```

## 🛠️ 技術棧

### 前端

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router

### 後端

- Spring Boot 3.2
- Java 17
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## ⚠️ 常見問題

### 前端啟動失敗

1. 確認在正確的目錄：`cd frontend`
2. 重新安裝依賴：`npm install`
3. 清除快取：`Remove-Item -Recurse -Force node_modules; npm install`

### 後端啟動失敗

1. 確認 Java 17+ 已安裝：`java -version`
2. 確認 Maven 已安裝：`mvn -version`
3. 清除並重建：`mvn clean install`

### Port 被占用

```powershell
# 查看佔用的進程
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# 終止進程
taskkill /PID <進程ID> /F
```

## 📖 專案文件

- `START_HERE.md` - 快速啟動指南（本檔案）
- `README.md` - 完整專案文檔
- `PROJECT_SUMMARY.md` - 專案摘要

## 🎉 下一步

專案已經可以使用！建議步驟：

1. ✅ 先啟動後端（Spring Boot）
2. ✅ 測試 API 端點
3. ✅ 啟動前端網站
4. ✅ 瀏覽語言比較
5. ✅ 閱讀原始碼註解
6. ✅ 嘗試擴展功能

Happy Learning! 🚀
