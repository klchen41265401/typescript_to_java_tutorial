# Java & Spring Boot 教學專案

> 從 TypeScript 到 Java 與 Spring Boot 的學習之旅

這是一個專為熟悉 TypeScript、React、Vue 的前端工程師設計的 Java 教學專案。透過對比學習的方式，幫助你快速掌握 Java 和 Spring Boot 開發。

## 📋 專案結構

```
java教學/
├── frontend/                 # React + TypeScript 教學網站
│   ├── src/
│   │   ├── components/      # UI 組件
│   │   ├── pages/           # 頁面組件
│   │   ├── data/            # 教學數據
│   │   └── types/           # TypeScript 型別定義
│   └── package.json
│
├── backend/                  # Spring Boot 範例專案
│   ├── src/main/java/
│   │   └── com/tutorial/
│   │       ├── controller/  # REST API 控制器
│   │       ├── service/     # 業務邏輯層
│   │       ├── repository/  # 資料存取層
│   │       ├── model/       # 實體類別
│   │       ├── dto/         # 資料傳輸物件
│   │       ├── exception/   # 例外處理
│   │       └── config/      # 配置類別
│   └── pom.xml
│
└── README.md
```

## 🎯 學習內容

### Part 1: Java 基礎

- **型別系統與變數** - 對比 TypeScript 的型別系統
- **類別與介面** - 物件導向程式設計
- **泛型** - 型別參數化
- **集合框架** - List, Set, Map 等資料結構
- **Stream API** - 函數式程式設計
- **例外處理** - try-catch-finally 機制

### Part 2: Spring Boot

- **依賴注入 (DI)** - IoC 容器與元件管理
- **REST API 開發** - @RestController 和路由
- **Spring Data JPA** - ORM 和資料庫操作
- **全域例外處理** - @RestControllerAdvice
- **資料驗證** - @Valid 和 Bean Validation
- **CORS 配置** - 跨域資源共享

### Part 3: Kotlin（預留）

- Kotlin 基礎語法
- Kotlin vs Java 比較
- Spring Boot with Kotlin

## 🚀 快速開始

### 前置需求

- **Node.js** 18+ (前端)
- **Java** 17+ (後端)
- **Maven** 3.8+ (後端建置工具)
- **Git**

### 安裝前端

```powershell
cd frontend
npm install
npm run dev
```

前端網站將在 http://localhost:3000 啟動

### 安裝後端

```powershell
cd backend
mvn clean install
mvn spring-boot:run
```

後端 API 將在 http://localhost:8080/api 啟動

### 存取 H2 資料庫控制台

URL: http://localhost:8080/api/h2-console

連線設定：

- JDBC URL: `jdbc:h2:mem:tutorialdb`
- Username: `sa`
- Password: (留空)

## 📚 API 端點

### 使用者管理

| 方法   | 端點                | 說明               |
| ------ | ------------------- | ------------------ |
| GET    | `/api/users`        | 取得所有使用者     |
| GET    | `/api/users/{id}`   | 取得單一使用者     |
| POST   | `/api/users`        | 建立新使用者       |
| PUT    | `/api/users/{id}`   | 更新使用者         |
| DELETE | `/api/users/{id}`   | 刪除使用者         |
| GET    | `/api/users/search` | 搜尋使用者（分頁） |
| GET    | `/api/users/stats`  | 取得統計資訊       |

### 範例請求

#### 建立使用者

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
```

#### 取得所有使用者

```bash
curl http://localhost:8080/api/users
```

## 🔍 主要差異對比

### 依賴注入

**TypeScript (React Context)**

```typescript
const ServiceContext = createContext<Services | null>(null);
export const useService = () => useContext(ServiceContext);
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
  const user = await userService.getUser(req.params.id);
  res.json(user);
});
```

**Spring Boot**

```java
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.getUser(id);
    return ResponseEntity.ok(user);
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

## 🎨 技術棧

### 前端

- **React** 18 - UI 框架
- **TypeScript** - 型別系統
- **Vite** - 建置工具
- **TailwindCSS** - 樣式框架
- **React Router** - 路由管理
- **Prism.js** - 程式碼語法高亮

### 後端

- **Spring Boot** 3.2 - 應用程式框架
- **Java** 17 - 程式語言
- **Spring Data JPA** - ORM
- **H2 Database** - 記憶體資料庫
- **Lombok** - 程式碼生成
- **Maven** - 專案管理工具

## 📖 學習路徑

1. **瀏覽教學網站** - 開啟前端網站，閱讀語言比較
2. **執行後端專案** - 啟動 Spring Boot，測試 API
3. **對照程式碼** - 比較 TypeScript 和 Java 的實作差異
4. **實作練習** - 嘗試修改和擴展功能
5. **深入研究** - 閱讀原始碼註解，理解設計模式

## 💡 重要概念

### Single Responsibility Principle (單一職責原則)

每個類別只負責一項職責：

- **Controller** - 處理 HTTP 請求
- **Service** - 業務邏輯
- **Repository** - 資料存取
- **Model** - 資料模型

### Dependency Injection (依賴注入)

透過建構子注入依賴，提高可測試性和維護性：

```java
@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }
}
```

### Exception Handling (例外處理)

統一的例外處理機制：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Error> handleNotFound(Exception ex) {
        // 統一處理 404 錯誤
    }
}
```

## 🔧 開發工具推薦

### IDE

- **IntelliJ IDEA** - Java 開發最佳 IDE
- **VS Code** - 前端和輕量級 Java 開發

### 擴充套件

- **Spring Boot Extension Pack** (VS Code)
- **Language Support for Java** (VS Code)
- **Maven for Java** (VS Code)

### 瀏覽器工具

- **React Developer Tools**
- **Postman** - API 測試

## 📝 進階主題（未來擴展）

- [ ] Spring Security - 身份驗證與授權
- [ ] Spring AOP - 面向切面編程
- [ ] JUnit & Mockito - 單元測試
- [ ] PostgreSQL - 關聯式資料庫
- [ ] Docker - 容器化部署
- [ ] Kotlin - 現代 JVM 語言

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🌟 資源連結

- [Spring Boot 官方文檔](https://spring.io/projects/spring-boot)
- [Java 官方教學](https://docs.oracle.com/javase/tutorial/)
- [Maven 官方指南](https://maven.apache.org/guides/)
- [React 官方文檔](https://react.dev/)
- [TypeScript 官方文檔](https://www.typescriptlang.org/)

---

**Happy Learning! 🎉**

從 TypeScript 到 Java 的旅程，讓我們一起探索 JVM 世界！
