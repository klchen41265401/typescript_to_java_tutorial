import type { ComparisonItem } from "@/types";

export const collectionsComparisons: ComparisonItem[] = [
  {
    title: "陣列與列表操作",
    typescript: {
      language: "typescript",
      code: `// TypeScript 陣列操作
const numbers: number[] = [1, 2, 3, 4, 5];

// Map - 轉換
const doubled = numbers.map(n => n * 2);

// Filter - 篩選
const evens = numbers.filter(n => n % 2 === 0);

// Reduce - 累積
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Find - 查找
const firstEven = numbers.find(n => n % 2 === 0);

// forEach - 迭代
numbers.forEach(n => console.log(n));

// some/every - 測試
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);`,
      filename: "arrays.ts",
      explanation: "TypeScript 陣列方法直觀易用",
      highlights: ["豐富的陣列方法", "支援箭頭函數", "可以鏈式調用"],
    },
    java: {
      language: "java",
      code: `// Java Stream API
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Map - 轉換
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());

// Filter - 篩選
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// Reduce - 累積
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// Find - 查找
Optional<Integer> firstEven = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findFirst();

// forEach - 迭代
numbers.forEach(n -> System.out.println(n));

// anyMatch/allMatch - 測試
boolean hasEven = numbers.stream()
    .anyMatch(n -> n % 2 == 0);
boolean allPositive = numbers.stream()
    .allMatch(n -> n > 0);`,
      filename: "Collections.java",
      explanation: "Java Stream API 提供類似功能",
      highlights: ["需要先呼叫 .stream()", "使用 Lambda 或方法引用", "需要 collect() 收集回 List"],
    },
    keyDifferences: [
      "TypeScript 陣列方法直接可用，Java 需要先轉換為 Stream",
      "Java find 操作返回 Optional",
      "Java 需要 collect() 將 Stream 收集回集合",
    ],
    similarities: ["都支援 map、filter、reduce", "都支援 Lambda 表達式", "都可以鏈式調用"],
  },
  {
    title: "Map 操作 (鍵值對)",
    typescript: {
      language: "typescript",
      code: `// TypeScript Map
const userMap = new Map<number, string>();

// 新增
userMap.set(1, "Alice");
userMap.set(2, "Bob");
userMap.set(3, "Charlie");

// 獲取
const name = userMap.get(1);  // "Alice"
const notFound = userMap.get(99);  // undefined

// 檢查存在
if (userMap.has(1)) {
  console.log("User 1 exists");
}

// 刪除
userMap.delete(2);

// 大小
console.log(userMap.size);  // 2

// 迭代
for (const [id, name] of userMap) {
  console.log(\`\${id}: \${name}\`);
}

// 轉換為陣列
const entries = Array.from(userMap.entries());
const keys = Array.from(userMap.keys());
const values = Array.from(userMap.values());

// Object vs Map
const obj = { name: "Alice", age: 25 };
const map = new Map([["name", "Alice"], ["age", 25]]);

// Map 可以用任何型別作為 key
const objKey = { id: 1 };
const mapWithObjKey = new Map();
mapWithObjKey.set(objKey, "value");`,
      filename: "maps.ts",
      explanation: "Map 是 ES6 引入的鍵值對集合",
      highlights: ["可以用任何型別作為 key", "保持插入順序", "有 size 屬性"],
    },
    java: {
      language: "java",
      code: `// Java HashMap
Map<Integer, String> userMap = new HashMap<>();

// 新增
userMap.put(1, "Alice");
userMap.put(2, "Bob");
userMap.put(3, "Charlie");

// 獲取
String name = userMap.get(1);  // "Alice"
String notFound = userMap.get(99);  // null

// 檢查存在
if (userMap.containsKey(1)) {
    System.out.println("User 1 exists");
}

// 刪除
userMap.remove(2);

// 大小
System.out.println(userMap.size());  // 2

// 迭代 - 方式1: entrySet
for (Map.Entry<Integer, String> entry : userMap.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 迭代 - 方式2: forEach (Java 8+)
userMap.forEach((id, name) -> {
    System.out.println(id + ": " + name);
});

// 轉換為 List
List<Map.Entry<Integer, String>> entries =
    new ArrayList<>(userMap.entrySet());
List<Integer> keys = new ArrayList<>(userMap.keySet());
List<String> values = new ArrayList<>(userMap.values());

// getOrDefault - 提供預設值
String defaultName = userMap.getOrDefault(99, "Unknown");

// computeIfAbsent - 不存在時計算
userMap.computeIfAbsent(4, id -> "User" + id);

// LinkedHashMap - 保持插入順序
Map<Integer, String> orderedMap = new LinkedHashMap<>();

// TreeMap - 自動排序
Map<Integer, String> sortedMap = new TreeMap<>();`,
      filename: "Maps.java",
      explanation: "Java 有多種 Map 實作",
      highlights: ["HashMap 最常用,無序", "LinkedHashMap 保持順序", "TreeMap 自動排序"],
    },
    keyDifferences: [
      "⚠️ Java get() 返回 null,TypeScript 返回 undefined",
      "⚠️ Java 有多種 Map 實作 (HashMap, LinkedHashMap, TreeMap)",
      "✅ TypeScript Map 預設保持順序,Java 需要 LinkedHashMap",
      "⚠️ Java put() 會返回舊值,可能產生混淆",
    ],
    similarities: ["都提供 get/set 操作", "都可以迭代", "都有檢查 key 存在的方法"],
  },
  {
    title: "Set 操作 (集合)",
    typescript: {
      language: "typescript",
      code: `// TypeScript Set
const numbers = new Set<number>();

// 新增
numbers.add(1);
numbers.add(2);
numbers.add(2);  // 重複不會被加入
numbers.add(3);

console.log(numbers.size);  // 3

// 檢查存在
console.log(numbers.has(2));  // true

// 刪除
numbers.delete(2);

// 清空
// numbers.clear();

// 迭代
for (const num of numbers) {
  console.log(num);
}

// 轉換為陣列
const array = Array.from(numbers);
const array2 = [...numbers];

// 陣列去重
const duplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(duplicates)];  // [1, 2, 3, 4]

// 集合運算
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// 聯集
const union = new Set([...setA, ...setB]);  // {1, 2, 3, 4, 5}

// 交集
const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);  // {3}

// 差集
const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);  // {1, 2}`,
      filename: "sets.ts",
      explanation: "Set 自動去重,保持插入順序",
      highlights: ["自動去重複", "檢查存在 O(1) 時間", "可以用展開運算子"],
    },
    java: {
      language: "java",
      code: `// Java HashSet
Set<Integer> numbers = new HashSet<>();

// 新增
numbers.add(1);
numbers.add(2);
numbers.add(2);  // 重複不會被加入
numbers.add(3);

System.out.println(numbers.size());  // 3

// 檢查存在
System.out.println(numbers.contains(2));  // true

// 刪除
numbers.remove(2);

// 清空
// numbers.clear();

// 迭代
for (Integer num : numbers) {
    System.out.println(num);
}

// 轉換為 List
List<Integer> list = new ArrayList<>(numbers);

// 陣列去重
List<Integer> duplicates = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
Set<Integer> unique = new HashSet<>(duplicates);  // {1, 2, 3, 4}
List<Integer> uniqueList = new ArrayList<>(unique);

// 集合運算
Set<Integer> setA = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> setB = new HashSet<>(Arrays.asList(3, 4, 5));

// 聯集
Set<Integer> union = new HashSet<>(setA);
union.addAll(setB);  // {1, 2, 3, 4, 5}

// 交集
Set<Integer> intersection = new HashSet<>(setA);
intersection.retainAll(setB);  // {3}

// 差集
Set<Integer> difference = new HashSet<>(setA);
difference.removeAll(setB);  // {1, 2}

// LinkedHashSet - 保持順序
Set<Integer> orderedSet = new LinkedHashSet<>();

// TreeSet - 自動排序
Set<Integer> sortedSet = new TreeSet<>();`,
      filename: "Sets.java",
      explanation: "Java 有多種 Set 實作",
      highlights: ["HashSet 最快,無序", "LinkedHashSet 保持順序", "TreeSet 自動排序"],
    },
    keyDifferences: [
      "⚠️ TypeScript Set 預設保持順序,Java HashSet 不保證",
      "⚠️ Java 集合運算需要明確呼叫 addAll/retainAll/removeAll",
      "✅ TypeScript 可以用展開運算子,Java 較冗長",
      "⚠️ Java 有多種 Set 實作供選擇",
    ],
    similarities: ["都自動去重", "都提供快速的存在檢查", "都可以迭代"],
  },
  {
    title: "排序操作",
    typescript: {
      language: "typescript",
      code: `// TypeScript 排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 數字排序 (需要提供比較函數!)
numbers.sort((a, b) => a - b);  // 升序
console.log(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]

numbers.sort((a, b) => b - a);  // 降序

// 字串排序 (預設字典序)
const words = ["banana", "apple", "cherry"];
words.sort();  // ["apple", "banana", "cherry"]

// 物件排序
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];

// 按年齡排序
people.sort((a, b) => a.age - b.age);

// 按名字排序
people.sort((a, b) => a.name.localeCompare(b.name));

// 多重排序條件
people.sort((a, b) => {
  if (a.age !== b.age) {
    return a.age - b.age;
  }
  return a.name.localeCompare(b.name);
});

// ⚠️ sort() 會修改原陣列!
// 不修改原陣列的方式
const sorted = [...numbers].sort((a, b) => a - b);`,
      filename: "sorting.ts",
      explanation: "sort() 是原地排序,會修改原陣列",
      highlights: ["需要提供比較函數", "會修改原陣列", "localeCompare 用於字串"],
    },
    java: {
      language: "java",
      code: `// Java 排序
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);

// Collections.sort() - 修改原 List
Collections.sort(numbers);  // 升序
System.out.println(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序
Collections.sort(numbers, Collections.reverseOrder());

// List.sort() - Java 8+
numbers.sort(Integer::compareTo);  // 升序
numbers.sort((a, b) -> b - a);     // 降序

// Stream sorted() - 不修改原 List
List<Integer> sorted = numbers.stream()
    .sorted()
    .collect(Collectors.toList());

// 物件排序
class Person {
    String name;
    int age;
}

List<Person> people = Arrays.asList(
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 35)
);

// 按年齡排序 - Comparator
people.sort(Comparator.comparingInt(p -> p.age));

// 按名字排序
people.sort(Comparator.comparing(p -> p.name));

// 多重排序條件
people.sort(
    Comparator.comparingInt((Person p) -> p.age)
        .thenComparing(p -> p.name)
);

// 實作 Comparable 介面
class Person implements Comparable<Person> {
    String name;
    int age;

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
}

// 陣列排序
int[] array = {3, 1, 4, 1, 5, 9, 2, 6};
Arrays.sort(array);`,
      filename: "Sorting.java",
      explanation: "Java 提供多種排序方式",
      highlights: [
        "Collections.sort() 原地排序",
        "Comparator 提供強大的排序能力",
        "Stream sorted() 不修改原集合",
      ],
    },
    keyDifferences: [
      "⚠️ Java Comparator 比 JS 比較函數更強大",
      "⚠️ Java 可以實作 Comparable 介面定義自然順序",
      "✅ Java Stream sorted() 不修改原集合",
      "⚠️ TypeScript sort() 必須提供比較函數避免字串轉換",
    ],
    similarities: ["都支援自定義比較", "都可以多重條件排序", "基本版本都是原地排序"],
  },
];
