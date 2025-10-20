/**
 * 資料類型對比資料
 *
 * 提供 Java 和 JavaScript/TypeScript 的資料類型完整對比
 *
 * @author Your Name
 * @version 1.0
 * @since 2025-01-15
 */

export interface TypeComparison {
  id: string;
  category: string;
  javaType: {
    name: string;
    size?: string;
    range?: string;
    defaultValue?: string;
    example: string;
    description: string;
  };
  jsType: {
    name: string;
    size?: string;
    range?: string;
    defaultValue?: string;
    example: string;
    description: string;
  };
  notes?: string[];
  pitfalls?: string[];
}

export const typesComparisonData: TypeComparison[] = [
  // ==================== 整數類型 ====================
  {
    id: "byte",
    category: "整數類型",
    javaType: {
      name: "byte",
      size: "8 位元（1 位元組）",
      range: "-128 到 127",
      defaultValue: "0",
      example: `byte age = 25;
byte negative = -10;
// ❌ 編譯錯誤
// byte overflow = 200; // 超出範圍`,
      description: "最小的整數類型，用於節省記憶體",
    },
    jsType: {
      name: "number",
      size: "64 位元浮點數",
      range: "±2^53-1（安全整數範圍）",
      defaultValue: "undefined",
      example: `let age: number = 25;
let negative: number = -10;
// ✅ 不會報錯，但可能精度問題
let overflow: number = 200;`,
      description: "JavaScript 只有一種數字類型",
    },
    notes: [
      "Java 的 byte 專門用於節省記憶體，JavaScript 沒有對應類型",
      "JavaScript 的 number 是 64 位元浮點數，可以表示整數和小數",
      "TypeScript 的 number 只是型別註解，執行時仍是 JavaScript 的 number",
    ],
    pitfalls: [
      "Java: byte 範圍很小（-128~127），容易溢位",
      "JavaScript: 大整數會有精度問題，需使用 BigInt",
    ],
  },
  {
    id: "short",
    category: "整數類型",
    javaType: {
      name: "short",
      size: "16 位元（2 位元組）",
      range: "-32,768 到 32,767",
      defaultValue: "0",
      example: `short year = 2025;
short temperature = -15;
// ❌ 編譯錯誤
// short overflow = 50000;`,
      description: "短整數，用於節省記憶體",
    },
    jsType: {
      name: "number",
      size: "64 位元浮點數",
      range: "±2^53-1",
      defaultValue: "undefined",
      example: `let year: number = 2025;
let temperature: number = -15;
let overflow: number = 50000; // OK`,
      description: "統一使用 number",
    },
    notes: [
      "Java 的 short 比 int 節省記憶體，但現代開發較少使用",
      "JavaScript 沒有 short 的概念，統一使用 number",
    ],
  },
  {
    id: "int",
    category: "整數類型",
    javaType: {
      name: "int",
      size: "32 位元（4 位元組）",
      range: "-2,147,483,648 到 2,147,483,647",
      defaultValue: "0",
      example: `int count = 1000;
int population = 1000000;
int negative = -999;

// ✅ 最常用的整數類型
int id = 12345;`,
      description: "Java 最常用的整數類型",
    },
    jsType: {
      name: "number",
      size: "64 位元浮點數",
      range: "±2^53-1（安全整數）",
      defaultValue: "undefined",
      example: `let count: number = 1000;
let population: number = 1000000;
let negative: number = -999;

// TypeScript 只是型別提示
let id: number = 12345;`,
      description: "統一使用 number",
    },
    notes: [
      "Java 的 int 是最常用的整數類型，效能好",
      "JavaScript 的 number 可以處理整數和小數",
      "TypeScript 的 number 在編譯後消失，執行時仍是 JavaScript 的 number",
    ],
    pitfalls: ["Java: int 運算可能溢位，需注意範圍", "JavaScript: 大於 2^53-1 的整數會失去精度"],
  },
  {
    id: "long",
    category: "整數類型",
    javaType: {
      name: "long",
      size: "64 位元（8 位元組）",
      range: "-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807",
      defaultValue: "0L",
      example: `long timestamp = 1699948800000L;
long bigNumber = 9999999999L;

// ⚠️ 必須加 L 後綴
long fileSize = 10000000000L;`,
      description: "長整數，用於大數值",
    },
    jsType: {
      name: "number / BigInt",
      size: "64 位元浮點數 / 任意精度",
      range: "number: ±2^53-1 / BigInt: 無限制",
      defaultValue: "undefined",
      example: `// 使用 number（可能精度問題）
let timestamp: number = 1699948800000;

// 使用 BigInt（精確）
let bigNumber: bigint = 9999999999n;
let fileSize: bigint = 10000000000n;`,
      description: "大整數需使用 BigInt",
    },
    notes: [
      "Java 的 long 數字字面量必須加 L 或 l 後綴",
      "JavaScript 的 BigInt 使用 n 後綴，可以表示任意大的整數",
      "BigInt 不能與 number 直接運算",
    ],
    pitfalls: [
      "Java: 忘記加 L 後綴會被當作 int，可能溢位",
      "JavaScript: 使用 number 處理大整數會失去精度，應該用 BigInt",
    ],
  },

  // ==================== 浮點數類型 ====================
  {
    id: "float",
    category: "浮點數類型",
    javaType: {
      name: "float",
      size: "32 位元（4 位元組）",
      range: "約 ±3.4 × 10^38",
      defaultValue: "0.0f",
      example: `float price = 19.99f;
float pi = 3.14f;

// ⚠️ 必須加 f 或 F 後綴
float ratio = 0.5f;`,
      description: "單精度浮點數",
    },
    jsType: {
      name: "number",
      size: "64 位元浮點數",
      range: "約 ±1.7 × 10^308",
      defaultValue: "undefined",
      example: `let price: number = 19.99;
let pi: number = 3.14;

// 不需要後綴
let ratio: number = 0.5;`,
      description: "統一使用 number",
    },
    notes: [
      "Java 的 float 精度較低，一般使用 double",
      "JavaScript 的 number 就是 64 位元浮點數（相當於 Java 的 double）",
      "JavaScript 沒有單精度浮點數的概念",
    ],
    pitfalls: [
      "Java: float 精度不足，金融運算應使用 BigDecimal",
      "JavaScript: 浮點數運算有精度問題（0.1 + 0.2 !== 0.3）",
    ],
  },
  {
    id: "double",
    category: "浮點數類型",
    javaType: {
      name: "double",
      size: "64 位元（8 位元組）",
      range: "約 ±1.7 × 10^308",
      defaultValue: "0.0",
      example: `double price = 99.99;
double pi = 3.141592653589793;

// Java 預設的浮點數類型
double average = 87.5;`,
      description: "雙精度浮點數，Java 最常用的浮點數類型",
    },
    jsType: {
      name: "number",
      size: "64 位元浮點數",
      range: "約 ±1.7 × 10^308",
      defaultValue: "undefined",
      example: `let price: number = 99.99;
let pi: number = 3.141592653589793;

// JavaScript 唯一的數字類型
let average: number = 87.5;`,
      description: "JavaScript 的 number 就是 64 位元浮點數",
    },
    notes: [
      "Java 的 double 和 JavaScript 的 number 精度相同",
      "兩者都遵循 IEEE 754 標準",
      "浮點數運算都有精度問題",
    ],
    pitfalls: [
      "Java & JavaScript: 不要用浮點數比較相等（應該比較差值）",
      "Java & JavaScript: 金融運算不應使用浮點數",
    ],
  },

  // ==================== 字元類型 ====================
  {
    id: "char",
    category: "字元類型",
    javaType: {
      name: "char",
      size: "16 位元（2 位元組）",
      range: "0 到 65,535（Unicode）",
      defaultValue: "'\\u0000'",
      example: `char letter = 'A';
char digit = '9';
char unicode = '\\u4E2D'; // 中

// ❌ 只能存單一字元
// char wrong = "AB"; // 編譯錯誤`,
      description: "單一字元，使用單引號",
    },
    jsType: {
      name: "string",
      size: "動態大小",
      range: "任意長度",
      defaultValue: "undefined",
      example: `let letter: string = 'A';
let digit: string = '9';
let unicode: string = '\\u4E2D';

// ✅ 字串可以是任意長度
let text: string = "AB";`,
      description: "JavaScript 沒有字元類型，統一使用字串",
    },
    notes: [
      "Java 區分字元（char）和字串（String）",
      "JavaScript 只有字串（string），沒有字元的概念",
      "Java 的 char 使用單引號，String 使用雙引號",
      "JavaScript 的 string 單引號和雙引號都可以",
    ],
    pitfalls: ["Java: 容易混淆單引號和雙引號", "JavaScript: 沒有字元類型，單一字元也是字串"],
  },

  // ==================== 布林類型 ====================
  {
    id: "boolean",
    category: "布林類型",
    javaType: {
      name: "boolean",
      size: "不確定（JVM 實作決定）",
      range: "true 或 false",
      defaultValue: "false",
      example: `boolean isActive = true;
boolean hasPermission = false;

// ✅ 只能是 true 或 false
if (isActive) {
    System.out.println("Active");
}`,
      description: "布林值，只有 true 和 false",
    },
    jsType: {
      name: "boolean",
      size: "不確定",
      range: "true 或 false",
      defaultValue: "undefined",
      example: `let isActive: boolean = true;
let hasPermission: boolean = false;

// ⚠️ JavaScript 有 truthy/falsy
if (isActive) {
    console.log("Active");
}`,
      description: "TypeScript 的 boolean，JavaScript 有 truthy/falsy 概念",
    },
    notes: [
      "Java 的 boolean 只能是 true 或 false，不能是其他值",
      'JavaScript 有 truthy 和 falsy 的概念（0, "", null, undefined, NaN 是 falsy）',
      "TypeScript 的 boolean 只是型別檢查，執行時仍是 JavaScript",
    ],
    pitfalls: [
      "Java: 不能用數字當作布林值（0 不是 false）",
      "JavaScript: 容易混淆 truthy/falsy 和真正的布林值",
    ],
  },

  // ==================== 字串類型 ====================
  {
    id: "string",
    category: "字串類型",
    javaType: {
      name: "String",
      size: "動態大小（引用類型）",
      range: "任意長度",
      defaultValue: "null",
      example: `String name = "張三";
String message = "Hello, World!";

// ✅ 不可變（Immutable）
String text = "Java";
text = text + " Programming"; // 建立新字串`,
      description: "字串類別，不可變",
    },
    jsType: {
      name: "string",
      size: "動態大小",
      range: "任意長度",
      defaultValue: "undefined",
      example: `let name: string = "張三";
let message: string = 'Hello, World!';

// ✅ 也是不可變（Immutable）
let text: string = "JavaScript";
text = text + " Programming";`,
      description: "JavaScript 的原始型別，不可變",
    },
    notes: [
      "Java 的 String 是類別（引用型別），但行為像原始型別",
      "JavaScript 的 string 是原始型別",
      "兩者都是不可變的（Immutable）",
      "JavaScript 支援模板字串（template literals）",
    ],
    pitfalls: [
      "Java: String 頻繁拼接效能差，應使用 StringBuilder",
      "JavaScript: 字串拼接建立新字串，大量拼接應使用陣列 join",
    ],
  },

  // ==================== null 和 undefined ====================
  {
    id: "null-undefined",
    category: "空值類型",
    javaType: {
      name: "null",
      size: "-",
      range: "只有 null",
      defaultValue: "-",
      example: `String name = null;
Integer count = null;

// ✅ 只能用於引用類型
// int num = null; // ❌ 編譯錯誤

if (name == null) {
    System.out.println("Name is null");
}`,
      description: "表示「沒有物件」，只能用於引用類型",
    },
    jsType: {
      name: "null / undefined",
      size: "-",
      range: "null 或 undefined",
      defaultValue: "undefined",
      example: `let name: string | null = null;
let age: number | undefined = undefined;

// ⚠️ 兩者語意不同
// null: 明確表示「沒有值」
// undefined: 未定義或未賦值

if (name == null) { // null 或 undefined
    console.log("Name is nullish");
}`,
      description: "JavaScript 有 null 和 undefined 兩種空值",
    },
    notes: [
      "Java 只有 null，表示引用沒有指向任何物件",
      "JavaScript 有 null 和 undefined，語意略有不同",
      "null 表示「刻意設為空」，undefined 表示「未定義」",
      "TypeScript 可以區分 null 和 undefined",
    ],
    pitfalls: [
      "Java: 基本型別不能是 null（需要用包裝類別）",
      "JavaScript: 容易混淆 null 和 undefined，應使用 === 比較",
    ],
  },

  // ==================== 陣列類型 ====================
  {
    id: "array",
    category: "陣列類型",
    javaType: {
      name: "陣列（Array）",
      size: "固定大小",
      range: "由宣告時決定",
      defaultValue: "null",
      example: `// 宣告並初始化
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Alice", "Bob"};

// 宣告後分配記憶體
int[] scores = new int[10];
scores[0] = 95;

// ⚠️ 大小固定，不能動態改變
// numbers[10] = 6; // ❌ 陣列越界`,
      description: "固定大小的陣列，型別必須相同",
    },
    jsType: {
      name: "Array",
      size: "動態大小",
      range: "可動態增減",
      defaultValue: "undefined",
      example: `// 宣告並初始化
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob"];

// 空陣列
let scores: number[] = [];
scores.push(95);

// ✅ 可以動態增加
numbers.push(6);`,
      description: "JavaScript 陣列是動態的，可以改變大小",
    },
    notes: [
      "Java 陣列大小固定，宣告時必須指定",
      "JavaScript 陣列動態調整大小",
      "Java 陣列元素型別必須相同",
      "JavaScript 陣列可以包含不同型別（不推薦）",
    ],
    pitfalls: [
      "Java: 陣列大小固定，通常使用 ArrayList 替代",
      "JavaScript: 陣列可以是稀疏的（sparse array）",
    ],
  },

  // ==================== 物件類型 ====================
  {
    id: "object",
    category: "物件類型",
    javaType: {
      name: "Object / 自訂類別",
      size: "動態（在堆積上）",
      range: "由類別定義決定",
      defaultValue: "null",
      example: `// 使用類別
class User {
    String name;
    int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

User user = new User("張三", 25);
System.out.println(user.name);`,
      description: "Java 必須先定義類別，才能建立物件",
    },
    jsType: {
      name: "object",
      size: "動態",
      range: "可動態增減屬性",
      defaultValue: "undefined",
      example: `// 物件字面量
let user = {
    name: "張三",
    age: 25
};

// 動態新增屬性
user.email = "test@example.com";

// TypeScript 介面
interface User {
    name: string;
    age: number;
}`,
      description: "JavaScript 物件是動態的，可以隨時新增屬性",
    },
    notes: [
      "Java 必須先定義類別結構",
      "JavaScript 可以直接建立物件字面量",
      "TypeScript 提供介面（interface）做型別檢查",
      "Java 物件必須透過 new 關鍵字建立",
    ],
    pitfalls: [
      "Java: 忘記初始化物件會是 null，存取會拋出 NullPointerException",
      "JavaScript: 動態新增屬性容易出錯，應使用 TypeScript 約束",
    ],
  },
];

/**
 * 型別系統比較
 */
export const typeSystemComparison = {
  java: {
    name: "Java",
    typeSystem: "靜態型別系統",
    features: [
      "編譯時型別檢查",
      "強型別（不能隱式轉換）",
      "基本型別 vs 引用型別",
      "需要明確宣告型別",
      "型別安全性高",
    ],
    pros: [
      "編譯時發現錯誤",
      "IDE 支援更好（自動完成、重構）",
      "程式碼可讀性高",
      "效能優化更好",
      "適合大型專案",
    ],
    cons: ["程式碼較冗長", "學習曲線較陡", "開發速度較慢", "需要處理型別轉換"],
  },
  javascript: {
    name: "JavaScript",
    typeSystem: "動態型別系統",
    features: [
      "執行時型別檢查",
      "弱型別（自動型別轉換）",
      "所有變數都是 var/let/const",
      "不需要宣告型別",
      "型別可以改變",
    ],
    pros: ["程式碼簡潔", "學習曲線平緩", "開發速度快", "靈活性高"],
    cons: ["執行時才發現錯誤", "容易出現型別相關 bug", "IDE 支援較弱", "大型專案難維護"],
  },
  typescript: {
    name: "TypeScript",
    typeSystem: "靜態型別系統（編譯到 JavaScript）",
    features: [
      "編譯時型別檢查",
      "漸進式型別系統",
      "可以選擇性使用型別",
      "完全相容 JavaScript",
      "編譯後型別消失",
    ],
    pros: ["結合靜態和動態的優點", "IDE 支援好", "漸進式採用", "大型專案友善"],
    cons: ["需要編譯步驟", "學習成本較高", "執行時仍是 JavaScript", "型別定義需要維護"],
  },
};

/**
 * 常見陷阱
 */
export const commonPitfalls = [
  {
    title: "Java 整數溢位",
    java: `int max = Integer.MAX_VALUE;
int overflow = max + 1; // ⚠️ 溢位變成負數
System.out.println(overflow); // -2147483648`,
    javascript: `const max = Number.MAX_SAFE_INTEGER;
const overflow = max + 1;
console.log(overflow); // ⚠️ 精度問題`,
    solution: "Java 使用 long 或檢查溢位；JavaScript 使用 BigInt",
  },
  {
    title: "浮點數精度問題",
    java: `double result = 0.1 + 0.2;
System.out.println(result); // 0.30000000000000004`,
    javascript: `const result = 0.1 + 0.2;
console.log(result); // 0.30000000000000004`,
    solution: "兩者都應使用專門的 Decimal 類別處理精確計算",
  },
  {
    title: "null vs undefined",
    java: `String name = null;
// Java 只有 null
if (name == null) {
    System.out.println("Name is null");
}`,
    javascript: `let name = null;
let age; // undefined

// JavaScript 有兩種空值
console.log(name === null); // true
console.log(age === undefined); // true`,
    solution: "JavaScript 使用 == 會同時比較 null 和 undefined",
  },
  {
    title: "陣列大小",
    java: `int[] numbers = new int[5];
// numbers[5] = 10; // ❌ ArrayIndexOutOfBoundsException

// 使用 ArrayList 動態調整
ArrayList<Integer> list = new ArrayList<>();
list.add(10);`,
    javascript: `const numbers: number[] = [];
numbers[5] = 10; // ✅ OK，陣列自動擴展
console.log(numbers); // [empty × 5, 10]`,
    solution: "Java 陣列固定大小，需要動態陣列用 ArrayList",
  },
  {
    title: "型別轉換",
    java: `// ❌ 不能隱式轉換
// int num = "123"; // 編譯錯誤

// ✅ 需要明確轉換
int num = Integer.parseInt("123");
String str = String.valueOf(123);`,
    javascript: `// ⚠️ 自動型別轉換（可能出錯）
const num = "123" + 456; // "123456" (字串)
const result = "10" - 5; // 5 (數字)

// ✅ 明確轉換
const numValue = Number("123");
const strValue = String(123);`,
    solution: "JavaScript 避免依賴自動轉換，應明確轉換型別",
  },
];

/**
 * 最佳實踐
 */
export const bestPractices = [
  {
    title: "Java 型別選擇",
    recommendations: [
      "整數優先使用 int，需要更大範圍用 long",
      "浮點數優先使用 double，幾乎不用 float",
      "字串拼接多次使用 StringBuilder",
      "集合優先使用介面型別（List、Set、Map）",
      "避免使用基本型別的包裝類別（除非必要）",
    ],
  },
  {
    title: "JavaScript/TypeScript 型別選擇",
    recommendations: [
      "大整數使用 BigInt 而非 number",
      "使用 TypeScript 提供型別安全",
      "避免使用 any，改用 unknown",
      "使用型別守衛（type guard）檢查型別",
      "金融運算使用 decimal.js 等函式庫",
    ],
  },
  {
    title: "共通建議",
    recommendations: [
      "不要用 == 比較浮點數相等",
      "字串比較使用 equals（Java）或 ===（JavaScript）",
      "避免過度使用 null，考慮 Optional（Java）",
      "大型專案使用靜態型別（Java 或 TypeScript）",
      "注意數字運算的溢位和精度問題",
    ],
  },
];
