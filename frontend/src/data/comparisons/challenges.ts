import type { ComparisonItem } from "@/types";

/**
 * 從 TypeScript 轉換到 Java 的常見挑戰與陷阱
 *
 * 真實記錄學習過程中會遇到的困難點
 */
export const challengesComparisons: ComparisonItem[] = [
  {
    title: "❌ Null 和 Undefined 的差異",
    typescript: {
      language: "typescript",
      code: `// TypeScript 有 null 和 undefined 兩個
let name: string | null = null;
let age: number | undefined = undefined;

// 可選鏈 (Optional Chaining)
const user = { profile: { name: "Alice" } };
console.log(user?.profile?.name);  // "Alice"
console.log(user?.address?.city);  // undefined (不會報錯)

// 空值合併 (??)
const value = null ?? "default";  // "default"
const count = 0 ?? 10;            // 0 (不是 10!)

// strictNullChecks 模式
function greet(name?: string): string {
  // 需要處理 undefined 情況
  return \`Hello, \${name ?? "Guest"}\`;
}

// 型別守衛
function process(value: string | null) {
  if (value !== null) {
    // 這裡 TypeScript 知道 value 是 string
    console.log(value.toUpperCase());
  }
}`,
      filename: "null-handling.ts",
      explanation: "TypeScript 區分 null 和 undefined",
      highlights: [
        'null 表示"沒有值", undefined 表示"未定義"',
        "可選鏈 ?. 安全存取屬性",
        "strictNullChecks 強制處理 null/undefined",
      ],
    },
    java: {
      language: "java",
      code: `// Java 只有 null (沒有 undefined)
String name = null;
Integer age = null;

// NullPointerException 是最常見的錯誤!
User user = getUser();
// user.getName();  // 如果 user 是 null 就會 NPE!

// Java 8+ Optional 類別
Optional<String> optionalName = Optional.ofNullable(name);
String result = optionalName.orElse("Guest");

// 鏈式呼叫 Optional
Optional<User> optUser = Optional.ofNullable(user);
String city = optUser
    .map(User::getProfile)
    .map(Profile::getAddress)
    .map(Address::getCity)
    .orElse("Unknown");

// Objects.requireNonNull 檢查
public void setName(String name) {
    this.name = Objects.requireNonNull(name, "Name cannot be null");
}

// @Nullable 和 @NonNull 註解 (需要工具支援)
public void process(@Nullable String value) {
    if (value != null) {
        System.out.println(value.toUpperCase());
    }
}`,
      filename: "NullHandling.java",
      explanation: "Java 的 null 是最大陷阱,需要小心處理",
      highlights: [
        "⚠️ NullPointerException 是最常見的運行時錯誤",
        "Optional 提供函數式風格的 null 處理",
        "沒有編譯時 null 檢查(除非用工具)",
      ],
    },
    keyDifferences: [
      "❌ 最大挑戰: Java 沒有 undefined,所有未初始化都是 null",
      "❌ Java 沒有可選鏈,需要多層 if 或 Optional",
      "⚠️ TypeScript strictNullChecks 比 Java 更安全",
      "❌ Java Optional 較為冗長,不如 ?. 直觀",
    ],
    similarities: ["都需要處理空值情況", "都有空值檢查機制", "都鼓勵避免 null"],
  },
  {
    title: "❌ == vs === 和 equals()",
    typescript: {
      language: "typescript",
      code: `// TypeScript/JavaScript 比較運算子
// == 會做型別轉換 (不推薦!)
console.log(5 == "5");    // true (危險!)
console.log(0 == false);  // true (危險!)

// === 嚴格相等 (推薦)
console.log(5 === "5");   // false
console.log(0 === false); // false

// 物件比較 (比較引用)
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };
console.log(obj1 === obj2);  // false (不同引用!)

const obj3 = obj1;
console.log(obj1 === obj3);  // true (同一引用)

// 深度比較需要工具
import _ from 'lodash';
console.log(_.isEqual(obj1, obj2));  // true

// 字串和數字比較簡單
const a = "hello";
const b = "hello";
console.log(a === b);  // true (原始型別比較值)`,
      filename: "equality.ts",
      explanation: "TypeScript 繼承 JavaScript 的相等性規則",
      highlights: ["永遠使用 === 而非 ==", "物件和陣列比較引用", "原始型別比較值"],
    },
    java: {
      language: "java",
      code: `// Java 比較運算子
// == 對基本型別比較值
int a = 5;
int b = 5;
System.out.println(a == b);  // true

// == 對物件比較引用!
String str1 = new String("hello");
String str2 = new String("hello");
System.out.println(str1 == str2);  // false (不同物件!)

// equals() 方法比較內容
System.out.println(str1.equals(str2));  // true

// 字串字面量特殊情況 (字串池)
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);  // true (同一個字串池物件)

// 自定義 equals() 方法
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Person)) return false;
        Person other = (Person) obj;
        return age == other.age &&
               Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

// 使用
Person p1 = new Person("Alice", 25);
Person p2 = new Person("Alice", 25);
System.out.println(p1 == p2);        // false (不同引用)
System.out.println(p1.equals(p2));   // true (內容相同)`,
      filename: "Equality.java",
      explanation: "Java 的 == 和 equals() 是完全不同的!",
      highlights: [
        "⚠️ == 永遠比較引用(除了基本型別)",
        "必須使用 .equals() 比較物件內容",
        "覆寫 equals() 必須同時覆寫 hashCode()",
      ],
    },
    keyDifferences: [
      "❌ 最大陷阱: Java == 不比較物件內容!",
      "❌ Java 字串必須用 .equals(),不能用 ==",
      "⚠️ Java 需要手動實作 equals() 和 hashCode()",
      "⚠️ TypeScript === 對物件也是比較引用",
    ],
    similarities: ["物件比較都是比較引用", "基本型別都是比較值", "深度比較都需要特殊處理"],
  },
  {
    title: "❌ 沒有隱式型別轉換",
    typescript: {
      language: "typescript",
      code: `// TypeScript/JavaScript 有隱式轉換 (可能出錯)
const result1 = "5" + 3;     // "53" (字串連接)
const result2 = "5" - 3;     // 2 (數字運算)
const result3 = "5" * "2";   // 10 (都轉成數字)

// 真值判斷
if ("") {  // false
  console.log("empty string is falsy");
}

if (0) {  // false
  console.log("0 is falsy");
}

if ([]) {  // true! (空陣列是 truthy)
  console.log("empty array is truthy");
}

// 可以用 + 轉換型別
const num = +"123";  // 123 (數字)

// 布林轉換
const bool = !!"hello";  // true

// NaN 問題
const invalid = parseInt("abc");  // NaN
console.log(invalid === invalid);  // false! (NaN 不等於自己)
console.log(Number.isNaN(invalid));  // true`,
      filename: "type-coercion.ts",
      explanation: "JavaScript 的隱式轉換規則複雜且易錯",
      highlights: ["字串和數字運算會自動轉換", "真值判斷有複雜規則", "NaN 是唯一不等於自己的值"],
    },
    java: {
      language: "java",
      code: `// Java 不允許隱式型別轉換 (更安全!)
// String result1 = "5" + 3;  // "53" (+ 對字串特殊處理)
// int result2 = "5" - 3;     // 編譯錯誤!
// int result3 = "5" * "2";   // 編譯錯誤!

// 必須明確轉換
int num = Integer.parseInt("123");
String str = String.valueOf(456);
String str2 = Integer.toString(789);

// 基本型別之間可以轉換 (但會失去精度)
int i = 10;
long l = i;  // OK (向上轉換)
// int i2 = l;  // 編譯錯誤! (需要強制轉換)
int i2 = (int) l;  // OK

// 沒有 truthy/falsy 概念
// if ("") {}  // 編譯錯誤! 必須是 boolean
if ("".isEmpty()) {  // OK
    System.out.println("empty");
}

// 布林轉換必須明確
String text = "hello";
boolean hasValue = text != null && !text.isEmpty();

// 包裝類別需要小心 null
Integer value = null;
// int primitive = value;  // NullPointerException!
int primitive = value != null ? value : 0;  // 安全做法

// 字串連接
String message = "Result: " + 123;  // OK, 自動轉換
int num2 = 123 + 456;              // 579 (數字運算)
String str3 = "123" + "456";       // "123456" (字串連接)`,
      filename: "TypeCoercion.java",
      explanation: "Java 強制明確型別轉換,更安全但更冗長",
      highlights: [
        "⚠️ 必須明確呼叫 parseInt(), valueOf()",
        "✅ 沒有 truthy/falsy,減少混淆",
        "⚠️ 包裝類別拆箱可能 NullPointerException",
      ],
    },
    keyDifferences: [
      "❌ 挑戰: Java 不會自動轉換型別,必須明確呼叫方法",
      "✅ 好處: Java 型別安全性更高,不會有意外轉換",
      "❌ 陷阱: 包裝類別自動拆箱可能導致 NPE",
      "❌ 困難: 必須記住各種轉換方法名稱",
    ],
    similarities: [
      "字串連接時數字會轉成字串",
      "都需要處理解析失敗的情況",
      "都有基本型別和包裝型別",
    ],
  },
  {
    title: "❌ 陣列和集合的複雜性",
    typescript: {
      language: "typescript",
      code: `// TypeScript 陣列簡單易用
const numbers: number[] = [1, 2, 3, 4, 5];

// 豐富的陣列方法
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

// 展開運算子
const more = [...numbers, 6, 7, 8];
const copy = [...numbers];

// 解構
const [first, second, ...rest] = numbers;

// 陣列和物件混用
const mixed: (number | string)[] = [1, "two", 3, "four"];

// Set 和 Map
const uniqueNumbers = new Set([1, 2, 2, 3, 3]);  // Set {1, 2, 3}
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"]
]);

// 簡單迭代
for (const num of numbers) {
  console.log(num);
}`,
      filename: "arrays.ts",
      explanation: "TypeScript 陣列操作直觀簡單",
      highlights: ["陣列方法鏈式呼叫", "展開運算子和解構", "Set 和 Map 使用簡單"],
    },
    java: {
      language: "java",
      code: `// Java 陣列和集合複雜度高!
// 原始陣列 (固定大小)
int[] numbers = {1, 2, 3, 4, 5};
// numbers[5] = 6;  // ArrayIndexOutOfBoundsException!

// ArrayList (可變大小)
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

// Stream API 操作 (Java 8+)
List<Integer> doubled = list.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());

List<Integer> evens = list.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

int sum = list.stream()
    .reduce(0, Integer::sum);

// 複製集合
List<Integer> copy = new ArrayList<>(list);
List<Integer> copy2 = list.stream().collect(Collectors.toList());

// 不能混合型別 (需要用 Object 或泛型)
// List<???> mixed = ???  // 無法直接表達 number | string

// Set 和 Map
Set<Integer> uniqueNumbers = new HashSet<>(Arrays.asList(1, 2, 2, 3, 3));
Map<String, String> map = new HashMap<>();
map.put("key1", "value1");
map.put("key2", "value2");

// 迭代方式多種
for (Integer num : list) {  // for-each
    System.out.println(num);
}

list.forEach(num -> System.out.println(num));  // forEach

// 陣列 vs 集合的互轉
Integer[] array = list.toArray(new Integer[0]);
List<Integer> backToList = Arrays.asList(array);`,
      filename: "ArraysAndCollections.java",
      explanation: "Java 集合框架強大但複雜",
      highlights: [
        "⚠️ 原始陣列和集合是不同的東西",
        "⚠️ Stream API 需要 .collect() 收集結果",
        "⚠️ 不能用基本型別泛型 (用 Integer, 不能用 int)",
      ],
    },
    keyDifferences: [
      "❌ 最大挑戰: Java 區分原始陣列、List、Set、Map",
      "❌ Stream API 比 Array 方法冗長很多",
      "⚠️ Java 泛型不支援基本型別,必須用包裝類別",
      "⚠️ 需要明確呼叫 .collect() 收集結果",
      "❌ 沒有展開運算子和解構語法",
    ],
    similarities: ["都有 map, filter, reduce", "都支援 for-of/for-each 迭代", "都有 Set 和 Map"],
  },
  {
    title: "❌ 錯誤處理的差異",
    typescript: {
      language: "typescript",
      code: `// TypeScript 錯誤處理較簡單
function readFile(path: string): string {
  try {
    // ... 讀取檔案
    throw new Error("File not found");
  } catch (error) {
    // error 是 unknown 型別 (TypeScript 4.4+)
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;  // 重新拋出
  } finally {
    console.log("Cleanup");
  }
}

// 自定義錯誤類別
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// 使用
try {
  throw new ValidationError("Invalid email", "email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Field: \${error.field}\`);
  }
}

// Promise 錯誤處理
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}`,
      filename: "error-handling.ts",
      explanation: "TypeScript 沿用 JavaScript 的錯誤處理",
      highlights: [
        "只有一種 Error 類別",
        "catch 可以捕獲任何類型",
        "async/await 自動處理 Promise 錯誤",
      ],
    },
    java: {
      language: "java",
      code: `// Java 錯誤處理更複雜!
// Checked Exception (必須處理)
public String readFile(String path) throws IOException {
    try {
        // ... 讀取檔案
        throw new FileNotFoundException("File not found");
    } catch (FileNotFoundException e) {
        System.err.println(e.getMessage());
        throw e;  // 重新拋出
    } finally {
        System.out.println("Cleanup");
    }
}

// 使用時必須處理或宣告
public void caller() {
    try {
        String content = readFile("test.txt");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// 或者宣告 throws
public void caller2() throws IOException {
    String content = readFile("test.txt");
}

// 自定義異常
public class ValidationException extends Exception {
    private String field;

    public ValidationException(String message, String field) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}

// Unchecked Exception (RuntimeException)
public class InvalidStateException extends RuntimeException {
    public InvalidStateException(String message) {
        super(message);
    }
}

// 多重 catch
try {
    // ...
} catch (FileNotFoundException e) {
    // 處理檔案不存在
} catch (IOException e) {
    // 處理其他 IO 錯誤
} catch (Exception e) {
    // 處理所有其他錯誤
}

// try-with-resources (自動關閉資源)
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line = reader.readLine();
} catch (IOException e) {
    e.printStackTrace();
}`,
      filename: "ErrorHandling.java",
      explanation: "Java 有 Checked/Unchecked Exception 區別",
      highlights: [
        "⚠️ Checked Exception 必須處理或宣告",
        "⚠️ 方法簽名必須宣告 throws",
        "✅ try-with-resources 自動管理資源",
      ],
    },
    keyDifferences: [
      "❌ 最大挑戰: Java Checked Exception 必須處理,否則編譯錯誤",
      "⚠️ 方法簽名需要宣告 throws,影響 API 設計",
      "❌ 錯誤處理程式碼變得冗長",
      "✅ 好處: 強制開發者考慮錯誤處理",
      "⚠️ 爭議: 過度使用反而降低程式碼品質",
    ],
    similarities: ["都有 try-catch-finally", "都可以自定義錯誤類別", "都支援重新拋出錯誤"],
  },
  {
    title: "⚠️ 記憶體管理與效能",
    typescript: {
      language: "typescript",
      code: `// TypeScript/JavaScript 自動記憶體管理
function createObjects() {
  const objects = [];
  for (let i = 0; i < 1000000; i++) {
    objects.push({ id: i, data: "test" });
  }
  // 離開作用域後自動回收
}

// 閉包可能導致記憶體洩漏
function createCounter() {
  let count = 0;
  const largeData = new Array(1000000).fill("data");

  return {
    increment: () => ++count,
    // largeData 因為閉包無法被回收!
  };
}

// WeakMap 避免記憶體洩漏
const cache = new WeakMap();
function processData(obj: object) {
  if (!cache.has(obj)) {
    cache.set(obj, expensiveOperation(obj));
  }
  return cache.get(obj);
}

// 效能考量
// 避免在迴圈中建立函數
const items = [1, 2, 3];
// 不好
items.forEach(item => {
  const handler = () => console.log(item);  // 每次都建立新函數
  handler();
});

// 好
function handler(item: number) {
  console.log(item);
}
items.forEach(handler);`,
      filename: "memory-management.ts",
      explanation: "JavaScript 引擎自動 GC,但需注意洩漏",
      highlights: ["自動垃圾回收", "閉包可能導致記憶體洩漏", "WeakMap/WeakSet 幫助管理快取"],
    },
    java: {
      language: "java",
      code: `// Java 也是自動記憶體管理 (GC)
public void createObjects() {
    List<MyObject> objects = new ArrayList<>();
    for (int i = 0; i < 1000000; i++) {
        objects.add(new MyObject(i, "test"));
    }
    // 離開作用域後可以被 GC
}

// Java 記憶體區域
// Stack: 區域變數、方法呼叫
// Heap: 所有物件

// 基本型別 vs 包裝類別效能差異
int primitive = 42;        // Stack (快)
Integer wrapper = 42;      // Heap (慢,有 GC 壓力)

// 自動裝箱拆箱有效能成本
Integer sum = 0;
for (int i = 0; i < 100000; i++) {
    sum += i;  // 每次都裝箱拆箱!效能差!
}

// 正確做法
int sum2 = 0;
for (int i = 0; i < 100000; i++) {
    sum2 += i;  // 只用基本型別
}

// 字串連接效能
// 不好 (每次都建立新字串物件)
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // 非常慢!
}

// 好 (使用 StringBuilder)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result2 = sb.toString();

// Stream API vs 傳統迴圈
// Stream (較慢但可讀)
list.stream()
    .filter(x -> x > 10)
    .map(x -> x * 2)
    .collect(Collectors.toList());

// 傳統迴圈 (較快)
List<Integer> result3 = new ArrayList<>();
for (Integer x : list) {
    if (x > 10) {
        result3.add(x * 2);
    }
}`,
      filename: "MemoryManagement.java",
      explanation: "Java GC 成熟,但需注意基本型別效能",
      highlights: [
        "⚠️ 基本型別 vs 包裝類別效能差異大",
        "⚠️ 字串連接用 StringBuilder",
        "⚠️ Stream API 有效能成本",
      ],
    },
    keyDifferences: [
      "⚠️ Java 基本型別效能遠高於包裝類別",
      "⚠️ Java 字串不可變,連接需要用 StringBuilder",
      "✅ 兩者都有自動 GC,但 Java GC 更可控",
      "⚠️ TypeScript 沒有基本型別/物件區分,效能較難優化",
    ],
    similarities: ["都是自動記憶體管理", "都需注意記憶體洩漏", "都要避免不必要的物件建立"],
  },
];
