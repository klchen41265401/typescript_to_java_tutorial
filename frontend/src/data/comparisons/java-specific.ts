import type { ComparisonItem } from "@/types";

/**
 * Java 專屬特性
 *
 * 註解處理器、反射、Lambda、Stream API 進階、方法引用
 */
export const javaSpecificComparisons: ComparisonItem[] = [
  {
    title: "Lambda 表達式與方法引用",
    typescript: {
      language: "typescript",
      code: `// TypeScript 箭頭函數
const numbers = [1, 2, 3, 4, 5];

// 標準箭頭函數
const doubled = numbers.map(n => n * 2);

// 多行箭頭函數
const processed = numbers.map(n => {
  const result = n * 2;
  console.log(result);
  return result;
});

// 函數作為參數
function processArray(
  arr: number[],
  operation: (n: number) => number
): number[] {
  return arr.map(operation);
}

const result = processArray(numbers, n => n * 2);

// 函數作為返回值
function createMultiplier(factor: number): (n: number) => number {
  return n => n * factor;
}

const double = createMultiplier(2);
const tripled = numbers.map(double);`,
      filename: "lambdas.ts",
      explanation: "JavaScript 原生支援函數式程式設計",
      highlights: ["箭頭函數簡潔", "函數是一等公民", "支援閉包"],
    },
    java: {
      language: "java",
      code: `// Java Lambda 表達式 (Java 8+)
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Lambda 表達式
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());

// 多行 Lambda
List<Integer> processed = numbers.stream()
    .map(n -> {
        int result = n * 2;
        System.out.println(result);
        return result;
    })
    .collect(Collectors.toList());

// 函數式介面
@FunctionalInterface
interface Operation {
    int apply(int n);
}

public List<Integer> processArray(
    List<Integer> arr,
    Operation operation
) {
    return arr.stream()
        .map(operation::apply)
        .collect(Collectors.toList());
}

// 使用
List<Integer> result = processArray(numbers, n -> n * 2);

// 方法引用 (Method Reference)
// 靜態方法引用
numbers.stream()
    .map(String::valueOf)          // Integer::toString
    .collect(Collectors.toList());

// 實例方法引用
String str = "Hello";
numbers.stream()
    .forEach(System.out::println);  // System.out.println(n)

// 建構函數引用
numbers.stream()
    .map(Integer::new)
    .collect(Collectors.toList());

// 內建函數式介面
Function<Integer, String> converter = String::valueOf;
Predicate<Integer> isEven = n -> n % 2 == 0;
Consumer<Integer> printer = System.out::println;
Supplier<Double> random = Math::random;

// 使用
numbers.stream()
    .map(converter)
    .filter(s -> s.length() > 1)
    .forEach(printer);`,
      filename: "Lambdas.java",
      explanation: "Java 8+ Lambda 與方法引用",
      highlights: [
        "Lambda 需要函數式介面",
        "方法引用 :: 語法",
        "內建 Function, Predicate, Consumer, Supplier",
      ],
    },
    keyDifferences: [
      "⚠️ Java Lambda 需要函數式介面(@FunctionalInterface)",
      "✅ Java 方法引用 :: 更簡潔 (TypeScript 沒有)",
      "⚠️ Java Lambda 不能有多個抽象方法",
      "⚠️ TypeScript 箭頭函數更靈活",
    ],
    similarities: ["都支援簡潔的函數語法", "都支援閉包", "都可以作為參數傳遞"],
  },
  {
    title: "註解 (Annotations)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 裝飾器 (Decorators) - 實驗性功能
// tsconfig.json 需要啟用 experimentalDecorators

// 類別裝飾器
function Component(target: any) {
  console.log("Component decorator");
}

@Component
class MyComponent {
  // ...
}

// 方法裝飾器
function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyKey} with args:\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

// 屬性裝飾器
function ReadOnly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class User {
  @ReadOnly
  id: number = 1;
}`,
      filename: "decorators.ts",
      explanation: "TypeScript 裝飾器是實驗性功能",
      highlights: [
        "需要啟用 experimentalDecorators",
        "主要用於框架 (Angular)",
        "可以修改類別和方法行為",
      ],
    },
    java: {
      language: "java",
      code: `// Java 註解 (Annotations) - 核心功能
// 內建註解
@Override
public String toString() {
    return "MyClass";
}

@Deprecated
public void oldMethod() {
    // 過時的方法
}

@SuppressWarnings("unchecked")
public List getRawList() {
    return new ArrayList();
}

// 自定義註解
@Retention(RetentionPolicy.RUNTIME)  // 保留到運行時
@Target(ElementType.METHOD)          // 只能用於方法
public @interface Log {
    String value() default "";
    boolean enabled() default true;
}

// 使用自定義註解
public class Calculator {
    @Log("Adding two numbers")
    public int add(int a, int b) {
        return a + b;
    }
}

// 註解處理器 (在編譯時或運行時處理)
public class LogProcessor {
    public static void process(Object obj) throws Exception {
        Method[] methods = obj.getClass().getDeclaredMethods();

        for (Method method : methods) {
            if (method.isAnnotationPresent(Log.class)) {
                Log log = method.getAnnotation(Log.class);
                System.out.println("Found @Log: " + log.value());
            }
        }
    }
}

// Spring 常用註解
@Component
@Service
@Controller
@RestController
@Autowired
@RequestMapping("/api")
@GetMapping("/users/{id}")
@PostMapping("/users")
@Transactional
@Cacheable("users")

// Lombok 註解 (減少樣板程式碼)
@Data                    // 自動生成 getter/setter/toString/equals/hashCode
@AllArgsConstructor      // 自動生成全參數建構函數
@NoArgsConstructor       // 自動生成無參建構函數
@Builder                 // 建造者模式
@Slf4j                   // 自動生成 logger
public class User {
    private Long id;
    private String name;
    private String email;
}`,
      filename: "Annotations.java",
      explanation: "Java 註解是核心功能,廣泛使用",
      highlights: ["內建和自定義註解", "Spring/Lombok 大量使用", "可以在編譯時和運行時處理"],
    },
    keyDifferences: [
      "✅ Java 註解是語言核心,TypeScript 裝飾器是實驗性",
      "⚠️ Spring Boot 嚴重依賴註解,必須理解",
      "⚠️ Lombok 用註解自動生成程式碼",
      "⚠️ TypeScript 裝飾器主要用於 Angular",
    ],
    similarities: ["都可以添加元數據", "都可以修改行為", "都支援自定義"],
  },
  {
    title: "反射 (Reflection)",
    typescript: {
      language: "typescript",
      code: `// TypeScript/JavaScript 反射能力有限
const obj = {
  name: "Alice",
  age: 30,
  greet() {
    return "Hello!";
  }
};

// 獲取屬性名稱
const keys = Object.keys(obj);  // ["name", "age", "greet"]

// 獲取屬性值
const values = Object.values(obj);

// 檢查屬性存在
console.log("name" in obj);  // true

// 動態存取屬性
const propName = "name";
console.log(obj[propName]);  // "Alice"

// 動態呼叫方法
const methodName = "greet";
console.log(obj[methodName]());  // "Hello!"

// Reflect API (ES6+)
Reflect.get(obj, "name");  // "Alice"
Reflect.set(obj, "name", "Bob");
Reflect.has(obj, "name");  // true
Reflect.deleteProperty(obj, "age");

// Proxy (攔截物件操作)
const proxy = new Proxy(obj, {
  get(target, prop) {
    console.log(\`Getting \${String(prop)}\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`Setting \${String(prop)} = \${value}\`);
    target[prop] = value;
    return true;
  }
});

proxy.name;  // 觸發 get
proxy.name = "Charlie";  // 觸發 set`,
      filename: "reflection.ts",
      explanation: "JavaScript 是動態語言,反射能力有限",
      highlights: ["Object.keys/values 獲取屬性", "Reflect API 提供反射操作", "Proxy 攔截物件操作"],
    },
    java: {
      language: "java",
      code: `// Java 反射 (Reflection) - 強大但危險
import java.lang.reflect.*;

public class User {
    private String name;
    public int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String greet() {
        return "Hello!";
    }
}

// 使用反射
public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        // 獲取 Class 物件
        Class<?> clazz = User.class;
        // 或: Class<?> clazz = Class.forName("com.example.User");

        // 獲取建構函數並建立實例
        Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
        Object user = constructor.newInstance("Alice", 30);

        // 獲取所有欄位
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("Field: " + field.getName());
        }

        // 存取 private 欄位 (破壞封裝!)
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true);  // 允許存取 private
        String name = (String) nameField.get(user);
        System.out.println("Name: " + name);

        // 修改 private 欄位
        nameField.set(user, "Bob");

        // 獲取方法
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
        }

        // 動態呼叫方法
        Method greetMethod = clazz.getMethod("greet");
        String result = (String) greetMethod.invoke(user);
        System.out.println(result);  // "Hello!"

        // 檢查註解
        if (clazz.isAnnotationPresent(Deprecated.class)) {
            System.out.println("Class is deprecated");
        }

        // 獲取泛型資訊 (有限)
        Type[] genericInterfaces = clazz.getGenericInterfaces();
    }
}

// 反射的常見用途
// 1. 框架 (Spring, Hibernate)
// 2. JSON 序列化/反序列化
// 3. ORM 映射
// 4. 依賴注入
// 5. 動態代理

// ⚠️ 反射的缺點
// 1. 效能較差
// 2. 破壞封裝
// 3. 編譯時無法檢查
// 4. 程式碼難以理解`,
      filename: "Reflection.java",
      explanation: "Java 反射功能強大,框架廣泛使用",
      highlights: ["可以動態建立物件", "可以存取 private 成員", "Spring 框架大量使用反射"],
    },
    keyDifferences: [
      "✅ Java 反射更強大,可以存取型別資訊",
      "⚠️ Java 反射可以破壞封裝 (存取 private)",
      "⚠️ Spring/Hibernate 等框架依賴反射",
      "❌ 反射效能較差,應謹慎使用",
    ],
    similarities: ["都可以動態存取屬性", "都可以動態呼叫方法", "都有效能成本"],
  },
  {
    title: "Stream API 進階技巧",
    typescript: {
      language: "typescript",
      code: `// TypeScript 陣列方法進階
const users = [
  { id: 1, name: "Alice", age: 30, city: "New York" },
  { id: 2, name: "Bob", age: 25, city: "London" },
  { id: 3, name: "Charlie", age: 35, city: "New York" },
  { id: 4, name: "David", age: 28, city: "London" }
];

// 分組 (需要手動實作或用 lodash)
const groupByCity = users.reduce((acc, user) => {
  if (!acc[user.city]) {
    acc[user.city] = [];
  }
  acc[user.city].push(user);
  return acc;
}, {} as Record<string, typeof users>);

// 結果: { "New York": [...], "London": [...] }

// 分割 (partition)
const [adults, minors] = users.reduce(
  ([adults, minors], user) => {
    if (user.age >= 30) {
      adults.push(user);
    } else {
      minors.push(user);
    }
    return [adults, minors];
  },
  [[], []] as [typeof users, typeof users]
);

// flatMap
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArrays.flatMap(arr => arr);  // [1, 2, 3, 4, 5, 6]

// 去重複 (distinct)
const duplicates = [1, 2, 2, 3, 3, 3, 4];
const distinct = [...new Set(duplicates)];

// 取前 N 個
const firstThree = users.slice(0, 3);

// 跳過前 N 個
const skipTwo = users.slice(2);`,
      filename: "advanced-arrays.ts",
      explanation: "JavaScript 陣列方法功能豐富",
      highlights: ["reduce 可以實作複雜轉換", "flatMap 扁平化和映射", "slice 取子集"],
    },
    java: {
      language: "java",
      code: `// Java Stream API 進階
List<User> users = Arrays.asList(
    new User(1, "Alice", 30, "New York"),
    new User(2, "Bob", 25, "London"),
    new User(3, "Charlie", 35, "New York"),
    new User(4, "David", 28, "London")
);

// 分組 (groupingBy)
Map<String, List<User>> groupByCity = users.stream()
    .collect(Collectors.groupingBy(User::getCity));

// 結果: {"New York": [...], "London": [...]}

// 分組並計數
Map<String, Long> cityCount = users.stream()
    .collect(Collectors.groupingBy(
        User::getCity,
        Collectors.counting()
    ));

// 分割 (partitioningBy) - 返回 boolean 的分組
Map<Boolean, List<User>> partitioned = users.stream()
    .collect(Collectors.partitioningBy(u -> u.getAge() >= 30));

// true: adults, false: minors

// flatMap - 扁平化
List<List<Integer>> nestedLists = Arrays.asList(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4),
    Arrays.asList(5, 6)
);

List<Integer> flattened = nestedLists.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());  // [1, 2, 3, 4, 5, 6]

// distinct - 去重複
List<Integer> duplicates = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
List<Integer> distinct = duplicates.stream()
    .distinct()
    .collect(Collectors.toList());

// limit - 取前 N 個
List<User> firstThree = users.stream()
    .limit(3)
    .collect(Collectors.toList());

// skip - 跳過前 N 個
List<User> skipTwo = users.stream()
    .skip(2)
    .collect(Collectors.toList());

// peek - 除錯用 (不修改元素)
users.stream()
    .peek(u -> System.out.println("Processing: " + u.getName()))
    .filter(u -> u.getAge() > 25)
    .peek(u -> System.out.println("Filtered: " + u.getName()))
    .collect(Collectors.toList());

// reduce - 自定義歸約
int totalAge = users.stream()
    .map(User::getAge)
    .reduce(0, Integer::sum);

// 收集到 Map
Map<Integer, String> idToName = users.stream()
    .collect(Collectors.toMap(
        User::getId,
        User::getName
    ));

// joining - 字串連接
String names = users.stream()
    .map(User::getName)
    .collect(Collectors.joining(", "));  // "Alice, Bob, Charlie, David"`,
      filename: "AdvancedStreams.java",
      explanation: "Stream API 提供豐富的收集器",
      highlights: [
        "groupingBy 強大的分組功能",
        "Collectors 提供多種收集方式",
        "flatMap, distinct, limit, skip 常用操作",
      ],
    },
    keyDifferences: [
      "✅ Java groupingBy 內建分組,TypeScript 需要 reduce",
      "✅ Java Collectors 提供豐富的收集器",
      "⚠️ Java Stream API 語法較冗長",
      "⚠️ 需要熟記各種 Collectors 方法",
    ],
    similarities: ["都支援 flatMap", "都可以鏈式操作", "都有去重和限制數量功能"],
  },
];
