import type { ComparisonItem } from "@/types";

export const springBootComparisons: ComparisonItem[] = [
  {
    title: "依賴注入 (Dependency Injection)",
    typescript: {
      language: "typescript",
      code: `// TypeScript/React 使用 Context 或組合
import React, { createContext, useContext } from 'react';

// 建立服務
class UserService {
  async getUser(id: string) {
    return fetch(\`/api/users/\${id}\`);
  }
}

// 建立 Context
const ServiceContext = createContext<UserService>(
  new UserService()
);

// 在元件中使用
function UserComponent() {
  const userService = useContext(ServiceContext);
  // 使用 userService...
}`,
      filename: "UserService.tsx",
      explanation: "前端通常使用 Context API 或簡單的模組匯入",
      highlights: ["使用 React Context 共享服務", "手動建立實例", "透過 useContext 獲取"],
    },
    java: {
      language: "java",
      code: `// Spring Boot 依賴注入
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

// 定義服務
@Service
public class UserService {
    public User getUser(Long id) {
        // 業務邏輯
        return userRepository.findById(id);
    }
}

// 注入使用
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
}`,
      filename: "UserController.java",
      explanation: "Spring Boot 自動管理物件生命週期",
      highlights: ["使用 @Service 註解定義服務", "使用 @Autowired 自動注入", "Spring 容器管理實例"],
    },
    springboot: {
      language: "java",
      code: `// Spring Boot 進階 DI 配置
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    // 手動配置 Bean
    @Bean
    public UserService userService(UserRepository repo) {
        return new UserService(repo);
    }

    // 條件式 Bean
    @Bean
    @ConditionalOnProperty(name = "cache.enabled")
    public CacheService cacheService() {
        return new RedisCacheService();
    }
}

// 建構子注入 (推薦方式)
@Service
public class UserService {
    private final UserRepository userRepository;

    // Spring Boot 會自動注入
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}`,
      filename: "AppConfig.java",
      explanation: "Spring Boot 提供多種 DI 方式與配置",
      highlights: ["@Configuration 定義配置類", "建構子注入更安全", "支援條件式載入"],
    },
    keyDifferences: [
      "Spring Boot 有 IoC 容器自動管理物件",
      "TypeScript/React 需手動建立和傳遞依賴",
      "Spring Boot 支援多種注入方式(欄位、建構子、Setter)",
    ],
    similarities: ["都是為了解耦和可測試性", "都支援單例模式", "都可以實現依賴替換"],
  },
  {
    title: "REST API 定義",
    typescript: {
      language: "typescript",
      code: `// TypeScript/Express REST API
import express from 'express';

const app = express();

// GET 請求
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.json(user);
});

// POST 請求
app.post('/api/users', async (req, res) => {
  const newUser = req.body;
  const created = await userService.createUser(newUser);
  res.status(201).json(created);
});

// PUT 請求
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await userService.updateUser(id, req.body);
  res.json(updated);
});

// DELETE 請求
app.delete('/api/users/:id', async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});`,
      filename: "userRoutes.ts",
      explanation: "Express 使用函數式路由定義",
      highlights: ["直接使用 HTTP 方法函數", "路由參數從 req.params 取得", "手動設定 status code"],
    },
    java: {
      language: "java",
      code: `// Spring Boot REST Controller
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET 請求
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    // POST 請求
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT 請求
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @RequestBody User user
    ) {
        User updated = userService.updateUser(id, user);
        return ResponseEntity.ok(updated);
    }

    // DELETE 請求
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}`,
      filename: "UserController.java",
      explanation: "Spring Boot 使用註解式路由定義",
      highlights: ["使用 @RestController 標註", "註解定義 HTTP 方法", "自動序列化/反序列化 JSON"],
    },
    springboot: {
      language: "java",
      code: `// Spring Boot 進階 REST 功能
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    // 自動驗證請求
    @PostMapping
    public ResponseEntity<User> createUser(
        @Valid @RequestBody CreateUserDTO dto
    ) {
        User created = userService.createUser(dto);
        return ResponseEntity.created(
            URI.create("/api/users/" + created.getId())
        ).body(created);
    }

    // 分頁查詢
    @GetMapping
    public ResponseEntity<Page<User>> listUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.findAll(search, pageable);
        return ResponseEntity.ok(users);
    }

    // 全域例外處理
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
        UserNotFoundException ex
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}

// DTO 驗證
public class CreateUserDTO {
    @NotBlank(message = "名稱不能為空")
    private String name;

    @Email(message = "信箱格式錯誤")
    private String email;

    @Min(value = 18, message = "年齡必須大於18歲")
    private Integer age;
}`,
      filename: "UserController.java",
      explanation: "Spring Boot 內建驗證、分頁、例外處理",
      highlights: ["內建 Bean Validation", "支援分頁和排序", "統一例外處理機制"],
    },
    keyDifferences: [
      "Spring Boot 使用註解，Express 使用函數",
      "Spring Boot 自動處理 JSON 轉換",
      "Spring Boot 內建驗證和分頁支援",
    ],
    similarities: ["都遵循 RESTful 設計", "都支援路徑參數和查詢參數", "都可以自定義錯誤處理"],
  },
  {
    title: "資料持久化",
    typescript: {
      language: "typescript",
      code: `// TypeScript/TypeORM 資料庫操作
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Repository } from 'typeorm';

// 定義 Entity
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}

// Repository 操作
class UserService {
  constructor(
    private userRepository: Repository<User>
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }
}`,
      filename: "User.entity.ts",
      explanation: "TypeORM 提供類似 JPA 的 ORM 功能",
      highlights: ["使用裝飾器定義 Entity", "Repository 模式操作資料庫", "型別安全的查詢"],
    },
    java: {
      language: "java",
      code: `// Spring Boot JPA 資料持久化
import javax.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;

// 定義 Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // Getters and Setters
}

// Repository 介面
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContaining(String keyword);
}

// Service 層使用
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User create(User user) {
        return userRepository.save(user);
    }
}`,
      filename: "UserRepository.java",
      explanation: "JPA 提供完整的 ORM 解決方案",
      highlights: ["使用 JPA 註解定義映射", "Repository 介面自動實現", "方法名稱自動生成查詢"],
    },
    springboot: {
      language: "java",
      code: `// Spring Boot JPA 進階功能
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {

    // 方法名稱查詢
    List<User> findByAgeGreaterThan(Integer age);

    // JPQL 查詢
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findByEmailDomain(@Param("domain") String domain);

    // 原生 SQL 查詢
    @Query(value = "SELECT * FROM users WHERE created_at > ?1",
           nativeQuery = true)
    List<User> findRecentUsers(LocalDateTime since);

    // 分頁查詢
    Page<User> findByNameContaining(String keyword, Pageable pageable);
}

// Entity 關聯
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 一對多關聯
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts;

    // 多對多關聯
    @ManyToMany
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;
}

// 審計功能
@EntityListeners(AuditingEntityListener.class)
public class User {
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}`,
      filename: "UserRepository.java",
      explanation: "JPA 支援複雜查詢、關聯、審計",
      highlights: ["支援 JPQL 和原生 SQL", "自動處理實體關聯", "內建審計功能"],
    },
    keyDifferences: [
      "Spring Boot JPA Repository 方法自動實現",
      "TypeORM 需要手動實現查詢邏輯",
      "JPA 註解更豐富，支援更複雜的映射",
    ],
    similarities: ["都使用裝飾器/註解定義映射", "都支援關聯管理", "都提供 Repository 模式"],
  },
  {
    title: "AOP (面向切面程式設計)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 裝飾器實作 AOP
// 日誌裝飾器
function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    console.log(\`[LOG] Calling \${propertyKey} with:\`, args);
    const start = Date.now();

    try {
      const result = await originalMethod.apply(this, args);
      console.log(\`[LOG] \${propertyKey} completed in \${Date.now() - start}ms\`);
      return result;
    } catch (error) {
      console.error(\`[LOG] \${propertyKey} failed:\`, error);
      throw error;
    }
  };

  return descriptor;
}

// 權限檢查裝飾器
function RequireAuth(roles: string[]) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const user = getCurrentUser(); // 假設有這個函數

      if (!user || !roles.some(role => user.roles.includes(role))) {
        throw new Error('Unauthorized');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// 使用裝飾器
class UserService {
  @Log
  @RequireAuth(['admin'])
  async deleteUser(id: number): Promise<void> {
    // 刪除使用者邏輯
    console.log(\`Deleting user \${id}\`);
  }

  @Log
  async getUser(id: number): Promise<User> {
    // 獲取使用者邏輯
    return { id, name: 'Alice' };
  }
}`,
      filename: "decorators.ts",
      explanation: "TypeScript 裝飾器提供基本 AOP 功能",
      highlights: ["裝飾器可以包裝方法", "支援多個裝飾器組合", "需要手動實作橫切關注點"],
    },
    java: {
      language: "java",
      code: `// Spring AOP
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // 定義切入點 (Pointcut)
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}

    // 前置通知 (Before)
    @Before("serviceMethods()")
    public void logBefore(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("[Before] Calling method: " + methodName);
    }

    // 後置通知 (After)
    @After("serviceMethods()")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("[After] Method completed");
    }

    // 返回通知 (AfterReturning)
    @AfterReturning(
        pointcut = "serviceMethods()",
        returning = "result"
    )
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("[AfterReturning] Result: " + result);
    }

    // 異常通知 (AfterThrowing)
    @AfterThrowing(
        pointcut = "serviceMethods()",
        throwing = "error"
    )
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
        System.err.println("[AfterThrowing] Error: " + error.getMessage());
    }

    // 環繞通知 (Around) - 最強大
    @Around("serviceMethods()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        System.out.println("[Around-Before] " + methodName + " args: " + Arrays.toString(args));
        long start = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed(); // 執行原方法
            long duration = System.currentTimeMillis() - start;
            System.out.println("[Around-After] " + methodName + " completed in " + duration + "ms");
            return result;
        } catch (Throwable e) {
            System.err.println("[Around-Error] " + methodName + " failed: " + e.getMessage());
            throw e;
        }
    }
}

// 自定義註解 + AOP
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequireRole {
    String[] value();
}

@Aspect
@Component
public class SecurityAspect {

    @Around("@annotation(requireRole)")
    public Object checkRole(
        ProceedingJoinPoint joinPoint,
        RequireRole requireRole
    ) throws Throwable {
        String[] roles = requireRole.value();
        User user = getCurrentUser();

        boolean hasRole = Arrays.stream(roles)
            .anyMatch(role -> user.getRoles().contains(role));

        if (!hasRole) {
            throw new AccessDeniedException("Insufficient permissions");
        }

        return joinPoint.proceed();
    }
}

// 使用 AOP
@Service
public class UserService {

    @RequireRole({"ADMIN"})
    public void deleteUser(Long id) {
        // 刪除使用者邏輯
        System.out.println("Deleting user " + id);
    }

    public User getUser(Long id) {
        // AOP 自動記錄日誌
        return userRepository.findById(id).orElse(null);
    }
}`,
      filename: "AOP.java",
      explanation: "Spring AOP 提供完整的切面支援",
      highlights: [
        "@Aspect 定義切面",
        "多種通知類型 (Before, After, Around)",
        "支援自定義註解觸發",
      ],
    },
    keyDifferences: [
      "⚠️ Spring AOP 功能更強大,支援多種通知類型",
      "⚠️ Spring AOP 基於代理模式,自動織入",
      "⚠️ TypeScript 裝飾器需要手動實作所有邏輯",
      "⚠️ Spring AOP 可以用 @Pointcut 定義複雜切入點表達式",
    ],
    similarities: ["都可以攔截方法執行", "都支援在方法前後執行邏輯", "都可以獲取方法參數和返回值"],
  },
  {
    title: "事務管理 (@Transactional)",
    typescript: {
      language: "typescript",
      code: `// TypeScript/TypeORM 事務管理
import { DataSource } from 'typeorm';

class UserService {
  constructor(private dataSource: DataSource) {}

  // 手動事務管理
  async transferMoney(fromId: number, toId: number, amount: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    // 開始事務
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 扣款
      await queryRunner.manager.query(
        'UPDATE accounts SET balance = balance - ? WHERE user_id = ?',
        [amount, fromId]
      );

      // 加款
      await queryRunner.manager.query(
        'UPDATE accounts SET balance = balance + ? WHERE user_id = ?',
        [amount, toId]
      );

      // 提交事務
      await queryRunner.commitTransaction();
      console.log('Transaction committed');
    } catch (error) {
      // 回滾事務
      await queryRunner.rollbackTransaction();
      console.error('Transaction rolled back:', error);
      throw error;
    } finally {
      // 釋放連線
      await queryRunner.release();
    }
  }

  // 使用 transaction 方法
  async createUserWithProfile(userData: any, profileData: any) {
    return this.dataSource.transaction(async manager => {
      const user = await manager.save(User, userData);
      const profile = await manager.save(Profile, {
        ...profileData,
        userId: user.id
      });
      return { user, profile };
    });
  }
}`,
      filename: "transaction.ts",
      explanation: "TypeORM 需要手動管理事務",
      highlights: [
        "手動開始、提交、回滾",
        "需要 try-catch-finally",
        "transaction 方法提供簡化語法",
      ],
    },
    java: {
      language: "java",
      code: `// Spring Boot 宣告式事務
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private AccountRepository accountRepository;

    // 宣告式事務 (方法級別)
    @Transactional
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        // 扣款
        Account from = accountRepository.findById(fromId)
            .orElseThrow(() -> new AccountNotFoundException());
        from.setBalance(from.getBalance().subtract(amount));
        accountRepository.save(from);

        // 模擬錯誤 - 會自動回滾
        if (amount.compareTo(BigDecimal.valueOf(10000)) > 0) {
            throw new IllegalArgumentException("Amount too large");
        }

        // 加款
        Account to = accountRepository.findById(toId)
            .orElseThrow(() -> new AccountNotFoundException());
        to.setBalance(to.getBalance().add(amount));
        accountRepository.save(to);

        // 方法結束自動提交,發生異常自動回滾
    }

    // 事務傳播行為
    @Transactional(propagation = Propagation.REQUIRED)
    public void methodA() {
        // 如果當前有事務,加入;沒有則創建新事務
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void methodB() {
        // 總是創建新事務,掛起當前事務
    }

    @Transactional(propagation = Propagation.NESTED)
    public void methodC() {
        // 如果當前有事務,則在巢狀事務中執行
    }

    // 隔離級別
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void readCommitted() {
        // 讀已提交 (避免髒讀)
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void repeatableRead() {
        // 可重複讀 (避免髒讀和不可重複讀)
    }

    // 只讀事務 (優化效能)
    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // 指定回滾異常
    @Transactional(rollbackFor = {CustomException.class})
    public void processPayment() {
        // 只在特定異常時回滾
    }

    // 不回滾特定異常
    @Transactional(noRollbackFor = {WarningException.class})
    public void processWithWarnings() {
        // WarningException 不會導致回滾
    }
}

// 程式化事務管理 (較少使用)
@Service
public class ManualTransactionService {

    @Autowired
    private PlatformTransactionManager transactionManager;

    public void manualTransaction() {
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);

        try {
            // 業務邏輯
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}`,
      filename: "TransactionService.java",
      explanation: "Spring Boot 宣告式事務管理",
      highlights: ["@Transactional 自動管理事務", "支援傳播行為和隔離級別", "異常自動回滾"],
    },
    keyDifferences: [
      "✅ Spring @Transactional 宣告式,無需手動管理",
      "⚠️ TypeORM 需要手動開始、提交、回滾",
      "✅ Spring 支援複雜的傳播行為",
      "⚠️ Spring 預設只回滾 RuntimeException",
    ],
    similarities: ["都支援事務回滾", "都可以巢狀事務", "都需要注意事務邊界"],
  },
  {
    title: "攔截器與過濾器",
    typescript: {
      language: "typescript",
      code: `// Express 中介軟體 (類似攔截器/過濾器)
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// 全域中介軟體 (類似 Filter)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // 繼續執行下一個中介軟體
});

// 錯誤處理中介軟體
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

// 身份驗證中介軟體
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 驗證 token
    const user = verifyToken(token);
    req.user = user; // 掛載到 request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// 套用到特定路由
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected resource', user: req.user });
});

// CORS 中介軟體
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 限流中介軟體
const rateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const now = Date.now();
    const userRequests = requests.get(ip) || [];

    // 移除過期請求
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    validRequests.push(now);
    requests.set(ip, validRequests);
    next();
  };
};

app.use(rateLimiter(100, 60000)); // 每分鐘最多 100 個請求`,
      filename: "middleware.ts",
      explanation: "Express 中介軟體處理請求",
      highlights: ["app.use() 註冊中介軟體", "next() 傳遞控制權", "可以修改 req 和 res"],
    },
    java: {
      language: "java",
      code: `// Spring Boot 攔截器 (Interceptor)
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.stereotype.Component;

@Component
public class LoggingInterceptor implements HandlerInterceptor {

    // 請求處理前
    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler
    ) throws Exception {
        String method = request.getMethod();
        String uri = request.getRequestURI();
        System.out.println("[" + LocalDateTime.now() + "] " + method + " " + uri);

        // 返回 true 繼續執行,false 終止請求
        return true;
    }

    // 請求處理後 (視圖渲染前)
    @Override
    public void postHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        ModelAndView modelAndView
    ) throws Exception {
        System.out.println("Request processed");
    }

    // 請求完成後 (視圖渲染後)
    @Override
    public void afterCompletion(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        Exception ex
    ) throws Exception {
        System.out.println("Request completed");
    }
}

// 註冊攔截器
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoggingInterceptor loggingInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor)
            .addPathPatterns("/api/**")  // 攔截路徑
            .excludePathPatterns("/api/public/**");  // 排除路徑
    }
}

// Spring Boot 過濾器 (Filter) - 更底層
@Component
@Order(1)  // 過濾器執行順序
public class CorsFilter implements Filter {

    @Override
    public void doFilter(
        ServletRequest request,
        ServletResponse response,
        FilterChain chain
    ) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // 繼續過濾器鏈
        chain.doFilter(request, response);
    }
}

// 身份驗證攔截器
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler
    ) throws Exception {
        String token = request.getHeader("Authorization");

        if (token == null || !isValidToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized");
            return false;  // 終止請求
        }

        // 將用戶資訊存到 request attribute
        User user = getUserFromToken(token);
        request.setAttribute("user", user);

        return true;
    }
}

// 限流過濾器
@Component
public class RateLimitFilter implements Filter {
    private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60000;

    @Override
    public void doFilter(
        ServletRequest request,
        ServletResponse response,
        FilterChain chain
    ) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String ip = httpRequest.getRemoteAddr();
        long now = System.currentTimeMillis();

        List<Long> timestamps = requestCounts.computeIfAbsent(ip, k -> new ArrayList<>());

        // 移除過期時間戳
        timestamps.removeIf(time -> now - time > WINDOW_MS);

        if (timestamps.size() >= MAX_REQUESTS) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(429);
            httpResponse.getWriter().write("Too many requests");
            return;
        }

        timestamps.add(now);
        chain.doFilter(request, response);
    }
}`,
      filename: "InterceptorConfig.java",
      explanation: "Spring Boot 攔截器和過濾器",
      highlights: [
        "HandlerInterceptor 攔截 Controller",
        "Filter 更底層,攔截所有請求",
        "preHandle, postHandle, afterCompletion",
      ],
    },
    keyDifferences: [
      "⚠️ Spring 區分 Filter (底層) 和 Interceptor (Controller 層)",
      "⚠️ Express 中介軟體統一概念",
      "⚠️ Spring Interceptor 可以存取 Handler 資訊",
      "⚠️ Filter 執行順序由 @Order 控制",
    ],
    similarities: ["都可以在請求前後執行邏輯", "都可以終止請求", "都可以修改請求和響應"],
  },
];
