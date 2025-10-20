import type { ComparisonItem } from "@/types";

/**
 * 測試框架對照
 *
 * Jest/Vitest vs JUnit 5, 測試生命週期, Mock, 斷言
 */
export const testingComparisons: ComparisonItem[] = [
  {
    title: "基本測試結構",
    typescript: {
      language: "typescript",
      code: `// Jest/Vitest 測試結構
// calculator.ts
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

// calculator.test.ts
import { describe, it, expect } from 'vitest';
import { Calculator } from './calculator';

describe('Calculator', () => {
  // 基本測試
  it('should add two numbers', () => {
    const calc = new Calculator();
    const result = calc.add(2, 3);
    expect(result).toBe(5);
  });

  it('should subtract two numbers', () => {
    const calc = new Calculator();
    expect(calc.subtract(5, 3)).toBe(2);
  });

  // 測試異常
  it('should throw error when dividing by zero', () => {
    const calc = new Calculator();
    expect(() => calc.divide(10, 0)).toThrow('Cannot divide by zero');
  });

  // 參數化測試
  it.each([
    [1, 2, 3],
    [5, 10, 15],
    [-1, 1, 0]
  ])('should add %i + %i = %i', (a, b, expected) => {
    const calc = new Calculator();
    expect(calc.add(a, b)).toBe(expected);
  });
});`,
      filename: "calculator.test.ts",
      explanation: "Jest/Vitest 測試框架",
      highlights: ["describe 分組測試", "it 或 test 定義測試", "expect 斷言"],
    },
    java: {
      language: "java",
      code: `// JUnit 5 測試結構
// Calculator.java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) a / b;
    }
}

// CalculatorTest.java
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Calculator Tests")
class CalculatorTest {
    private Calculator calculator;

    // 基本測試
    @Test
    @DisplayName("Should add two numbers")
    void shouldAddTwoNumbers() {
        calculator = new Calculator();
        int result = calculator.add(2, 3);
        assertEquals(5, result);
    }

    @Test
    @DisplayName("Should subtract two numbers")
    void shouldSubtractTwoNumbers() {
        calculator = new Calculator();
        assertEquals(2, calculator.subtract(5, 3));
    }

    // 測試異常
    @Test
    @DisplayName("Should throw exception when dividing by zero")
    void shouldThrowExceptionWhenDividingByZero() {
        calculator = new Calculator();
        Exception exception = assertThrows(
            IllegalArgumentException.class,
            () -> calculator.divide(10, 0)
        );
        assertEquals("Cannot divide by zero", exception.getMessage());
    }

    // 參數化測試
    @ParameterizedTest
    @CsvSource({
        "1, 2, 3",
        "5, 10, 15",
        "-1, 1, 0"
    })
    @DisplayName("Should add numbers correctly")
    void shouldAddParameterized(int a, int b, int expected) {
        calculator = new Calculator();
        assertEquals(expected, calculator.add(a, b));
    }

    // 超時測試
    @Test
    @Timeout(value = 100, unit = TimeUnit.MILLISECONDS)
    void shouldCompleteInTime() {
        calculator = new Calculator();
        calculator.add(1, 2);
    }
}`,
      filename: "CalculatorTest.java",
      explanation: "JUnit 5 測試框架",
      highlights: ["@Test 標註測試方法", "@DisplayName 描述測試", "Assertions 斷言"],
    },
    keyDifferences: [
      "⚠️ JUnit 使用 @Test 註解",
      "⚠️ JUnit 斷言方法參數順序: expected, actual",
      "⚠️ Jest/Vitest 使用 describe/it 結構",
      "⚠️ JUnit @DisplayName 提供測試描述",
    ],
    similarities: ["都有參數化測試", "都可以測試異常", "都有超時測試"],
  },
  {
    title: "測試生命週期",
    typescript: {
      language: "typescript",
      code: `// Jest/Vitest 測試生命週期
import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';

describe('Database Tests', () => {
  let db: any;
  let connection: any;

  // 所有測試前執行一次
  beforeAll(() => {
    console.log('Setting up database...');
    connection = { connected: true };
  });

  // 每個測試前執行
  beforeEach(() => {
    console.log('Creating fresh database instance...');
    db = { data: [] };
  });

  // 每個測試後執行
  afterEach(() => {
    console.log('Cleaning up test data...');
    db = null;
  });

  // 所有測試後執行一次
  afterAll(() => {
    console.log('Closing database connection...');
    connection = null;
  });

  it('should insert data', () => {
    db.data.push({ id: 1, name: 'Alice' });
    expect(db.data).toHaveLength(1);
  });

  it('should query data', () => {
    db.data.push({ id: 1, name: 'Alice' });
    const result = db.data.find((item: any) => item.id === 1);
    expect(result).toBeDefined();
    expect(result.name).toBe('Alice');
  });
});

// 巢狀 describe
describe('User Service', () => {
  describe('when user exists', () => {
    beforeEach(() => {
      // 設定已存在的使用者
    });

    it('should return user', () => {
      // 測試
    });
  });

  describe('when user does not exist', () => {
    beforeEach(() => {
      // 設定不存在的使用者
    });

    it('should return null', () => {
      // 測試
    });
  });
});`,
      filename: "lifecycle.test.ts",
      explanation: "Jest/Vitest 測試生命週期",
      highlights: [
        "beforeAll/afterAll 執行一次",
        "beforeEach/afterEach 每個測試執行",
        "支援巢狀 describe",
      ],
    },
    java: {
      language: "java",
      code: `// JUnit 5 測試生命週期
import org.junit.jupiter.api.*;

class DatabaseTest {
    private static Object connection;
    private Object db;

    // 所有測試前執行一次 (必須是 static)
    @BeforeAll
    static void setupDatabase() {
        System.out.println("Setting up database...");
        connection = new Object(); // 建立連線
    }

    // 每個測試前執行
    @BeforeEach
    void createFreshDatabase() {
        System.out.println("Creating fresh database instance...");
        db = new Object(); // 建立新實例
    }

    // 每個測試後執行
    @AfterEach
    void cleanupTestData() {
        System.out.println("Cleaning up test data...");
        db = null;
    }

    // 所有測試後執行一次 (必須是 static)
    @AfterAll
    static void closeDatabaseConnection() {
        System.out.println("Closing database connection...");
        connection = null;
    }

    @Test
    @DisplayName("Should insert data")
    void shouldInsertData() {
        // 測試程式碼
        assertNotNull(db);
    }

    @Test
    @DisplayName("Should query data")
    void shouldQueryData() {
        // 測試程式碼
        assertNotNull(db);
    }
}

// 巢狀測試
@DisplayName("User Service Tests")
class UserServiceTest {

    @Nested
    @DisplayName("When user exists")
    class WhenUserExists {

        @BeforeEach
        void setupExistingUser() {
            // 設定已存在的使用者
        }

        @Test
        @DisplayName("Should return user")
        void shouldReturnUser() {
            // 測試
        }
    }

    @Nested
    @DisplayName("When user does not exist")
    class WhenUserDoesNotExist {

        @BeforeEach
        void setupNonExistingUser() {
            // 設定不存在的使用者
        }

        @Test
        @DisplayName("Should return null")
        void shouldReturnNull() {
            // 測試
        }
    }
}

// 測試執行順序
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderedTest {
    @Test
    @Order(1)
    void firstTest() {
        System.out.println("First");
    }

    @Test
    @Order(2)
    void secondTest() {
        System.out.println("Second");
    }
}`,
      filename: "LifecycleTest.java",
      explanation: "JUnit 5 測試生命週期",
      highlights: [
        "@BeforeAll/@AfterAll 必須是 static",
        "@BeforeEach/@AfterEach 實例方法",
        "@Nested 巢狀測試",
      ],
    },
    keyDifferences: [
      "⚠️ JUnit @BeforeAll/@AfterAll 必須是 static",
      "⚠️ JUnit 使用 @Nested 內部類別",
      "⚠️ Jest/Vitest 巢狀 describe 更簡潔",
      "⚠️ JUnit 可以用 @Order 控制執行順序",
    ],
    similarities: ["都有 before/after 鉤子", "都支援巢狀測試結構", "都可以為測試分組"],
  },
  {
    title: "Mock 和 Spy",
    typescript: {
      language: "typescript",
      code: `// Jest/Vitest Mock
import { describe, it, expect, vi } from 'vitest';

// 被測試的類別
class UserService {
  constructor(private database: Database) {}

  async getUser(id: number) {
    return await this.database.findUser(id);
  }

  async createUser(name: string) {
    return await this.database.saveUser({ name });
  }
}

interface Database {
  findUser(id: number): Promise<any>;
  saveUser(user: any): Promise<any>;
}

describe('UserService with Mock', () => {
  it('should get user from database', async () => {
    // 創建 Mock 物件
    const mockDatabase: Database = {
      findUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
      saveUser: vi.fn()
    };

    const userService = new UserService(mockDatabase);
    const user = await userService.getUser(1);

    expect(user).toEqual({ id: 1, name: 'Alice' });
    expect(mockDatabase.findUser).toHaveBeenCalledWith(1);
    expect(mockDatabase.findUser).toHaveBeenCalledTimes(1);
  });

  // Spy - 監視真實物件的方法
  it('should spy on real object', () => {
    const realDatabase = {
      findUser: async (id: number) => ({ id, name: 'Real User' }),
      saveUser: async (user: any) => user
    };

    // 監視方法
    const spy = vi.spyOn(realDatabase, 'findUser');

    const userService = new UserService(realDatabase);
    userService.getUser(1);

    expect(spy).toHaveBeenCalledWith(1);

    // 恢復原始實作
    spy.mockRestore();
  });

  // Mock 模組
  vi.mock('./api', () => ({
    fetchUserFromAPI: vi.fn().mockResolvedValue({ id: 1, name: 'API User' })
  }));

  // Mock 計時器
  it('should work with fake timers', () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    setTimeout(callback, 1000);

    // 快進時間
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();

    vi.useRealTimers();
  });
});`,
      filename: "mock.test.ts",
      explanation: "Jest/Vitest Mock 功能",
      highlights: ["vi.fn() 創建 Mock 函數", "vi.spyOn() 監視方法", "vi.mock() Mock 模組"],
    },
    java: {
      language: "java",
      code: `// Mockito Mock
import org.junit.jupiter.api.*;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

// 被測試的類別
public class UserService {
    private Database database;

    public UserService(Database database) {
        this.database = database;
    }

    public User getUser(int id) {
        return database.findUser(id);
    }

    public User createUser(String name) {
        return database.saveUser(new User(name));
    }
}

interface Database {
    User findUser(int id);
    User saveUser(User user);
}

class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

// 測試類別
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    // 使用 @Mock 註解創建 Mock 物件
    @Mock
    private Database mockDatabase;

    // 自動注入 Mock
    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Should get user from database")
    void shouldGetUserFromDatabase() {
        // 設定 Mock 行為
        User expectedUser = new User("Alice");
        when(mockDatabase.findUser(1)).thenReturn(expectedUser);

        // 執行測試
        User user = userService.getUser(1);

        // 驗證
        assertEquals("Alice", user.getName());
        verify(mockDatabase).findUser(1);
        verify(mockDatabase, times(1)).findUser(1);
    }

    @Test
    @DisplayName("Should handle multiple calls")
    void shouldHandleMultipleCalls() {
        // 多次呼叫返回不同值
        when(mockDatabase.findUser(anyInt()))
            .thenReturn(new User("First"))
            .thenReturn(new User("Second"));

        User first = userService.getUser(1);
        User second = userService.getUser(2);

        assertEquals("First", first.getName());
        assertEquals("Second", second.getName());
    }

    @Test
    @DisplayName("Should throw exception")
    void shouldThrowException() {
        // Mock 拋出異常
        when(mockDatabase.findUser(999))
            .thenThrow(new RuntimeException("User not found"));

        assertThrows(RuntimeException.class, () -> {
            userService.getUser(999);
        });
    }

    // Spy - 部分 Mock
    @Test
    @DisplayName("Should spy on real object")
    void shouldSpyOnRealObject() {
        Database realDatabase = new DatabaseImpl();
        Database spyDatabase = spy(realDatabase);

        // 只 Mock 部分方法
        when(spyDatabase.findUser(1)).thenReturn(new User("Spy User"));

        UserService service = new UserService(spyDatabase);
        User user = service.getUser(1);

        assertEquals("Spy User", user.getName());
        verify(spyDatabase).findUser(1);
    }

    // ArgumentCaptor - 捕獲參數
    @Test
    @DisplayName("Should capture arguments")
    void shouldCaptureArguments() {
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        userService.createUser("Bob");

        verify(mockDatabase).saveUser(userCaptor.capture());
        assertEquals("Bob", userCaptor.getValue().getName());
    }
}`,
      filename: "UserServiceTest.java",
      explanation: "Mockito Mock 框架",
      highlights: ["@Mock 創建 Mock 物件", "when().thenReturn() 設定行為", "verify() 驗證呼叫"],
    },
    keyDifferences: [
      "⚠️ Mockito 使用 when().thenReturn() 語法",
      "⚠️ Jest/Vitest 使用 mockResolvedValue()",
      "⚠️ Mockito @InjectMocks 自動注入",
      "⚠️ ArgumentCaptor 捕獲參數 (Jest 用 mock.calls)",
    ],
    similarities: ["都可以 Mock 物件和方法", "都可以驗證呼叫次數", "都支援 Spy (部分 Mock)"],
  },
  {
    title: "斷言 (Assertions)",
    typescript: {
      language: "typescript",
      code: `// Jest/Vitest 斷言
import { describe, it, expect } from 'vitest';

describe('Assertions', () => {
  // 基本斷言
  it('should test equality', () => {
    expect(2 + 2).toBe(4);                    // 嚴格相等 ===
    expect({ a: 1 }).toEqual({ a: 1 });      // 深度相等
    expect('hello').not.toBe('world');
  });

  // 真假值
  it('should test truthiness', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect('hello').toBeDefined();
  });

  // 數字比較
  it('should test numbers', () => {
    expect(10).toBeGreaterThan(5);
    expect(5).toBeLessThan(10);
    expect(10).toBeGreaterThanOrEqual(10);
    expect(5).toBeLessThanOrEqual(5);
    expect(0.1 + 0.2).toBeCloseTo(0.3);      // 浮點數
  });

  // 字串匹配
  it('should test strings', () => {
    expect('Hello World').toContain('World');
    expect('test@example.com').toMatch(/.*@.*\\.com/);
  });

  // 陣列和迭代器
  it('should test arrays', () => {
    const arr = [1, 2, 3, 4];
    expect(arr).toContain(2);
    expect(arr).toHaveLength(4);
    expect(arr).toEqual(expect.arrayContaining([1, 2]));
  });

  // 物件斷言
  it('should test objects', () => {
    const user = { name: 'Alice', age: 30 };
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('name', 'Alice');
    expect(user).toMatchObject({ name: 'Alice' });
  });

  // 異常
  it('should test exceptions', () => {
    const throwError = () => {
      throw new Error('Oops!');
    };
    expect(throwError).toThrow();
    expect(throwError).toThrow('Oops!');
    expect(throwError).toThrow(Error);
  });

  // 異步斷言
  it('should test async code', async () => {
    const promise = Promise.resolve('success');
    await expect(promise).resolves.toBe('success');

    const rejection = Promise.reject(new Error('failed'));
    await expect(rejection).rejects.toThrow('failed');
  });

  // 自定義匹配器
  expect.extend({
    toBeWithinRange(received: number, floor: number, ceiling: number) {
      const pass = received >= floor && received <= ceiling;
      return {
        pass,
        message: () => \`expected \${received} to be within \${floor}-\${ceiling}\`
      };
    }
  });

  it('should use custom matcher', () => {
    expect(15).toBeWithinRange(10, 20);
  });
});`,
      filename: "assertions.test.ts",
      explanation: "Jest/Vitest 豐富的斷言",
      highlights: [
        "toBe vs toEqual",
        "toContain, toMatch, toHaveProperty",
        "resolves/rejects 異步斷言",
      ],
    },
    java: {
      language: "java",
      code: `// JUnit 5 斷言
import org.junit.jupiter.api.*;
import java.time.Duration;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

class AssertionsTest {

    // 基本斷言
    @Test
    @DisplayName("Should test equality")
    void shouldTestEquality() {
        assertEquals(4, 2 + 2);                     // 相等
        assertEquals("hello", "hello");
        assertNotEquals("hello", "world");

        // 物件相等
        User user1 = new User("Alice");
        User user2 = new User("Alice");
        assertEquals(user1, user2);  // 需要覆寫 equals()
    }

    // 真假值
    @Test
    @DisplayName("Should test boolean")
    void shouldTestBoolean() {
        assertTrue(true);
        assertFalse(false);
        assertNull(null);
        assertNotNull("hello");
    }

    // 數字比較
    @Test
    @DisplayName("Should test numbers")
    void shouldTestNumbers() {
        assertTrue(10 > 5);
        assertTrue(5 < 10);

        // 浮點數比較 (delta)
        assertEquals(0.3, 0.1 + 0.2, 0.0001);
    }

    // 字串匹配
    @Test
    @DisplayName("Should test strings")
    void shouldTestStrings() {
        String str = "Hello World";
        assertTrue(str.contains("World"));
        assertTrue(str.matches(".*World"));
    }

    // 陣列和集合
    @Test
    @DisplayName("Should test arrays")
    void shouldTestArrays() {
        int[] arr = {1, 2, 3, 4};
        assertEquals(4, arr.length);
        assertArrayEquals(new int[]{1, 2, 3, 4}, arr);

        List<Integer> list = Arrays.asList(1, 2, 3, 4);
        assertTrue(list.contains(2));
        assertEquals(4, list.size());
    }

    // 異常
    @Test
    @DisplayName("Should test exceptions")
    void shouldTestExceptions() {
        Exception exception = assertThrows(
            IllegalArgumentException.class,
            () -> {
                throw new IllegalArgumentException("Oops!");
            }
        );
        assertEquals("Oops!", exception.getMessage());

        assertDoesNotThrow(() -> {
            // 不會拋異常的程式碼
        });
    }

    // 超時
    @Test
    @DisplayName("Should complete in time")
    void shouldCompleteInTime() {
        assertTimeout(Duration.ofSeconds(1), () -> {
            // 應該在 1 秒內完成
            Thread.sleep(100);
        });

        assertTimeoutPreemptively(Duration.ofSeconds(1), () -> {
            // 超時會立即中斷
            Thread.sleep(100);
        });
    }

    // 群組斷言
    @Test
    @DisplayName("Should group assertions")
    void shouldGroupAssertions() {
        User user = new User("Alice", 30);

        assertAll("user properties",
            () -> assertEquals("Alice", user.getName()),
            () -> assertEquals(30, user.getAge()),
            () -> assertNotNull(user)
        );
        // 所有斷言都會執行,即使前面的失敗
    }

    // 假設 (Assumptions) - 不是斷言
    @Test
    @DisplayName("Should use assumptions")
    void shouldUseAssumptions() {
        assumeTrue("CI".equals(System.getenv("ENV")));
        // 如果假設失敗,測試會被跳過而不是失敗

        // 測試程式碼...
    }
}

// AssertJ (第三方斷言庫,更流暢)
import static org.assertj.core.api.Assertions.*;

@Test
void assertJExample() {
    String str = "Hello World";
    assertThat(str)
        .isNotNull()
        .startsWith("Hello")
        .contains("World")
        .endsWith("World");

    List<Integer> list = Arrays.asList(1, 2, 3);
    assertThat(list)
        .hasSize(3)
        .contains(1, 2)
        .doesNotContain(4);
}`,
      filename: "AssertionsTest.java",
      explanation: "JUnit 5 斷言",
      highlights: ["assertEquals(expected, actual)", "assertThrows 測試異常", "assertAll 群組斷言"],
    },
    keyDifferences: [
      "⚠️ JUnit 參數順序: assertEquals(expected, actual)",
      "⚠️ Jest/Vitest: expect(actual).toBe(expected)",
      "⚠️ JUnit assertAll 群組斷言會執行所有",
      "✅ AssertJ 提供更流暢的 API",
    ],
    similarities: ["都有基本相等斷言", "都可以測試異常", "都支援異步測試"],
  },
  {
    title: "整合測試",
    typescript: {
      language: "typescript",
      code: `// Vitest 整合測試
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express from 'express';
import request from 'supertest';

// 建立 Express 應用
const app = express();
app.use(express.json());

app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Alice' });
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 1, name });
});

// 整合測試
describe('User API Integration Tests', () => {
  // 測試 GET endpoint
  it('should get user by id', async () => {
    const response = await request(app)
      .get('/users/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({
      id: '1',
      name: 'Alice'
    });
  });

  // 測試 POST endpoint
  it('should create user', async () => {
    const newUser = { name: 'Bob' };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toMatchObject(newUser);
    expect(response.body).toHaveProperty('id');
  });
});

// 資料庫整合測試
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Database Integration Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // 啟動記憶體資料庫
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should save user to database', async () => {
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String
    }));

    const user = new User({ name: 'Alice', email: 'alice@test.com' });
    await user.save();

    const found = await User.findOne({ name: 'Alice' });
    expect(found).toBeDefined();
    expect(found?.email).toBe('alice@test.com');
  });
});`,
      filename: "integration.test.ts",
      explanation: "Node.js 整合測試",
      highlights: [
        "supertest 測試 HTTP API",
        "MongoMemoryServer 記憶體資料庫",
        "測試真實的 API 端點",
      ],
    },
    java: {
      language: "java",
      code: `// Spring Boot 整合測試
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import static org.junit.jupiter.api.Assertions.*;

// 完整應用程式上下文
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UserApiIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("Should get user by id")
    void shouldGetUserById() {
        // 測試 GET endpoint
        ResponseEntity<User> response = restTemplate.getForEntity(
            "/users/1",
            User.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Alice", response.getBody().getName());
    }

    @Test
    @DisplayName("Should create user")
    void shouldCreateUser() {
        // 測試 POST endpoint
        User newUser = new User("Bob", "bob@test.com");

        ResponseEntity<User> response = restTemplate.postForEntity(
            "/users",
            newUser,
            User.class
        );

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Bob", response.getBody().getName());
    }
}

// MockMvc 測試 (不啟動服務器)
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Should get user with MockMvc")
    void shouldGetUserWithMockMvc() throws Exception {
        mockMvc.perform(get("/users/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Alice"));
    }

    @Test
    @DisplayName("Should create user with MockMvc")
    void shouldCreateUserWithMockMvc() throws Exception {
        String userJson = "{\\"name\\":\\"Bob\\",\\"email\\":\\"bob@test.com\\"}";

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Bob"));
    }
}

// 資料庫整合測試
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest  // 只載入 JPA 相關配置
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Should save and find user")
    void shouldSaveAndFindUser() {
        // 儲存
        User user = new User("Alice", "alice@test.com");
        entityManager.persist(user);
        entityManager.flush();

        // 查詢
        User found = userRepository.findByName("Alice");

        assertNotNull(found);
        assertEquals("alice@test.com", found.getEmail());
    }
}

// 使用 H2 記憶體資料庫 (application-test.yml)
/*
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop
*/`,
      filename: "IntegrationTest.java",
      explanation: "Spring Boot 整合測試",
      highlights: [
        "@SpringBootTest 載入完整上下文",
        "TestRestTemplate 測試 REST API",
        "@DataJpaTest 測試資料層",
      ],
    },
    keyDifferences: [
      "⚠️ Spring Boot 測試需要載入應用程式上下文",
      "⚠️ @SpringBootTest, @DataJpaTest 等測試註解",
      "⚠️ MockMvc vs supertest 語法不同",
      "✅ Spring 提供強大的測試支援",
    ],
    similarities: ["都可以測試 HTTP API", "都支援記憶體資料庫", "都可以測試資料層"],
  },
];
