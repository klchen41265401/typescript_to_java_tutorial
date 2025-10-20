import type { ComparisonItem } from "@/types";

/**
 * 進階型別系統比較
 *
 * 包含泛型、介面、抽象類別、列舉等進階概念
 */
export const advancedTypesComparisons: ComparisonItem[] = [
  {
    title: "泛型 (Generics) - 基礎",
    typescript: {
      language: "typescript",
      code: `// TypeScript 泛型
function identity<T>(value: T): T {
  return value;
}

// 使用時指定型別
const num = identity<number>(42);
const str = identity<string>("hello");

// 泛型類別
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("test");`,
      filename: "generics.ts",
      explanation: "TypeScript 泛型語法簡潔,型別推斷強大",
      highlights: ["使用 <T> 宣告型別參數", "可以省略型別參數讓編譯器推斷", "支援多個型別參數"],
    },
    java: {
      language: "java",
      code: `// Java 泛型
public <T> T identity(T value) {
    return value;
}

// 使用時指定型別
Integer num = identity(42);
String str = identity("hello");

// 泛型類別
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return this.value;
    }
}

Box<Integer> numberBox = new Box<>(123);
Box<String> stringBox = new Box<>("test");`,
      filename: "Generics.java",
      explanation: "Java 泛型在編譯時進行型別檢查",
      highlights: [
        "泛型方法需要在返回型別前宣告 <T>",
        "不能使用基本型別,必須用包裝類別",
        "型別擦除導致運行時泛型資訊丟失",
      ],
    },
    keyDifferences: [
      "❌ Java 不支援基本型別泛型 (需用 Integer, 不能用 int)",
      "⚠️ Java 有型別擦除 (Type Erasure),運行時泛型資訊丟失",
      "⚠️ TypeScript 泛型只存在於編譯時,不影響運行時",
    ],
    similarities: [
      "都使用 <T> 語法定義型別參數",
      "都可以有多個型別參數 <T, U, V>",
      "都支援型別約束",
    ],
  },
  {
    title: "泛型約束 (Generic Constraints)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 泛型約束
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(item: T): number {
  return item.length;
}

getLength("hello");      // OK: string 有 length
getLength([1, 2, 3]);    // OK: array 有 length
// getLength(123);       // Error: number 沒有 length

// keyof 約束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
getProperty(person, "name");  // OK
// getProperty(person, "xyz"); // Error: "xyz" 不是 person 的 key`,
      filename: "generic-constraints.ts",
      explanation: "TypeScript 提供強大的泛型約束機制",
      highlights: ["extends 關鍵字限制型別", "keyof 運算子獲取物件所有 key", "型別安全的屬性存取"],
    },
    java: {
      language: "java",
      code: `// Java 泛型約束
interface HasLength {
    int getLength();
}

public <T extends HasLength> int getLength(T item) {
    return item.getLength();
}

// 多重約束
interface Comparable<T> {}
interface Serializable {}

public <T extends Comparable<T> & Serializable> void sort(List<T> list) {
    // T 必須同時實現兩個介面
}

// 上界通配符 (Upper Bounded Wildcard)
public void processList(List<? extends Number> list) {
    for (Number num : list) {
        System.out.println(num);
    }
}

// 下界通配符 (Lower Bounded Wildcard)
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}`,
      filename: "GenericConstraints.java",
      explanation: "Java 泛型約束較為複雜,但功能強大",
      highlights: [
        "extends 可以有多重約束 (用 & 連接)",
        "通配符 ? 用於更靈活的型別匹配",
        "PECS: Producer-Extends, Consumer-Super",
      ],
    },
    keyDifferences: [
      "⚠️ Java 通配符 (? extends, ? super) 概念複雜,TypeScript 沒有",
      "✅ TypeScript 的 keyof 更直觀,Java 需要反射",
      "⚠️ Java 的型別擦除導致某些運行時檢查不可用",
    ],
    similarities: ["都使用 extends 關鍵字約束型別", "都支援多重約束", "都能提供編譯時型別安全"],
  },
  {
    title: "介面 (Interface)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 介面
interface User {
  id: number;
  name: string;
  email?: string;  // 可選屬性
  readonly createdAt: Date;  // 唯讀屬性
}

// 介面繼承
interface Admin extends User {
  role: string;
  permissions: string[];
}

// 函數介面
interface Comparator<T> {
  (a: T, b: T): number;
}

const numberComparator: Comparator<number> = (a, b) => a - b;

// 可索引型別
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Alice", "Bob"];`,
      filename: "interfaces.ts",
      explanation: "TypeScript 介面靈活,支援多種結構描述",
      highlights: ["可選屬性用 ? 標記", "readonly 關鍵字定義唯讀屬性", "支援函數型別和索引簽名"],
    },
    java: {
      language: "java",
      code: `// Java 介面
public interface User {
    int getId();
    String getName();
    String getEmail();  // Java 傳統上沒有可選概念
    Date getCreatedAt();
}

// 介面繼承
public interface Admin extends User {
    String getRole();
    List<String> getPermissions();
}

// 函數式介面 (Java 8+)
@FunctionalInterface
public interface Comparator<T> {
    int compare(T a, T b);
}

Comparator<Integer> numberComparator = (a, b) -> a - b;

// 預設方法 (Java 8+)
public interface Repository {
    void save(Object entity);

    default void saveAll(List<Object> entities) {
        entities.forEach(this::save);
    }
}`,
      filename: "Interfaces.java",
      explanation: "Java 介面定義契約,Java 8+ 支援預設方法",
      highlights: [
        "介面方法預設是 public abstract",
        "@FunctionalInterface 支援 Lambda",
        "default 方法提供預設實作",
      ],
    },
    keyDifferences: [
      "❌ Java 介面不能直接定義屬性,只能定義 getter/setter",
      "✅ TypeScript 介面更像結構描述,Java 介面是行為契約",
      "⚠️ Java 8+ 的 default 方法讓介面可以有實作",
    ],
    similarities: ["都支援介面繼承", "都可以定義多個方法", "都支援泛型"],
  },
  {
    title: "抽象類別 vs 介面",
    typescript: {
      language: "typescript",
      code: `// TypeScript 抽象類別
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 具體方法
  getName(): string {
    return this.name;
  }

  // 抽象方法
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Woof!";
  }
}

// TypeScript 可以實作多個介面
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck extends Animal implements Flyable, Swimmable {
  makeSound(): string {
    return "Quack!";
  }

  fly(): void {
    console.log("Flying...");
  }

  swim(): void {
    console.log("Swimming...");
  }
}`,
      filename: "abstract-classes.ts",
      explanation: "TypeScript 抽象類別可以有實作和狀態",
      highlights: [
        "abstract 關鍵字定義抽象類別和方法",
        "可以有建構函數和屬性",
        "可以同時繼承類別和實作多個介面",
      ],
    },
    java: {
      language: "java",
      code: `// Java 抽象類別
public abstract class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    // 具體方法
    public String getName() {
        return name;
    }

    // 抽象方法
    public abstract String makeSound();
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public String makeSound() {
        return "Woof!";
    }
}

// Java 也可以實作多個介面
public interface Flyable {
    void fly();
}

public interface Swimmable {
    void swim();
}

public class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) {
        super(name);
    }

    @Override
    public String makeSound() {
        return "Quack!";
    }

    @Override
    public void fly() {
        System.out.println("Flying...");
    }

    @Override
    public void swim() {
        System.out.println("Swimming...");
    }
}`,
      filename: "AbstractClasses.java",
      explanation: "Java 抽象類別用於程式碼重用和定義契約",
      highlights: [
        "@Override 註解標記覆寫方法",
        "super() 呼叫父類別建構函數",
        "單一繼承但可實作多個介面",
      ],
    },
    keyDifferences: [
      "⚠️ 兩者都只能單一繼承抽象類別",
      "✅ TypeScript 不需要 @Override 註解",
      "⚠️ Java 強制要求明確的存取修飾符",
    ],
    similarities: ["都支援抽象方法和具體方法混合", "都可以有建構函數", "都可以同時實作多個介面"],
  },
  {
    title: "列舉 (Enum)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 數字列舉
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up;
console.log(Direction.Down);  // 2

// 字串列舉
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// 異質列舉 (不推薦)
enum Mixed {
  No = 0,
  Yes = "YES"
}

// 常數列舉 (編譯時內聯)
const enum Color {
  Red,
  Green,
  Blue
}

let c = Color.Red;  // 編譯後變成 let c = 0;`,
      filename: "enums.ts",
      explanation: "TypeScript 列舉在編譯時轉換為數字或字串",
      highlights: [
        "數字列舉會自動遞增",
        "字串列舉更安全但無法反向映射",
        "const enum 編譯時完全移除",
      ],
    },
    java: {
      language: "java",
      code: `// Java 列舉
public enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

Direction dir = Direction.UP;

// 帶屬性和方法的列舉
public enum Status {
    PENDING("pending", 0),
    APPROVED("approved", 1),
    REJECTED("rejected", 2);

    private final String value;
    private final int code;

    Status(String value, int code) {
        this.value = value;
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public int getCode() {
        return code;
    }
}

// 使用
Status status = Status.PENDING;
System.out.println(status.getValue());  // "pending"

// 列舉可以實作介面
public enum Operation implements Calculator {
    ADD {
        public int apply(int a, int b) { return a + b; }
    },
    SUBTRACT {
        public int apply(int a, int b) { return a - b; }
    };

    public abstract int apply(int a, int b);
}`,
      filename: "Enums.java",
      explanation: "Java 列舉是完整的類別,功能強大",
      highlights: ["列舉可以有建構函數和方法", "每個列舉值可以有自己的實作", "列舉可以實作介面"],
    },
    keyDifferences: [
      "✅ Java 列舉是真正的類別,TypeScript 列舉只是語法糖",
      "⚠️ Java 列舉更強大但也更複雜",
      "❌ TypeScript const enum 在運行時完全消失",
    ],
    similarities: ["都提供型別安全的常數集合", "都可以用於 switch 語句", "都支援迭代"],
  },
  {
    title: "型別別名 vs 介面",
    typescript: {
      language: "typescript",
      code: `// Type Alias (型別別名)
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// 聯合型別
type Result = Success | Error;

// 交集型別
type Employee = Person & {
  employeeId: string;
};

// Interface
interface Point2D {
  x: number;
  y: number;
}

// 介面可以聲明合併
interface Window {
  title: string;
}

interface Window {
  version: number;
}

// 最終 Window 有 title 和 version

// Type 可以表示任何型別
type StringOrNumber = string | number;
type Callback = (data: string) => void;
type Tuple = [string, number];

// Interface 只能表示物件型別
interface User {
  name: string;
  age: number;
}`,
      filename: "type-vs-interface.ts",
      explanation: "Type 更靈活,Interface 更適合物件定義",
      highlights: [
        "Type 可以表示聯合型別和基本型別",
        "Interface 支援聲明合併",
        "Type 適合複雜型別組合",
      ],
    },
    java: {
      language: "java",
      code: `// Java 沒有 Type Alias 概念
// 但可以用介面或泛型達到類似效果

// 標記介面 (Marker Interface)
public interface Serializable {
    // 空介面,只用於標記
}

// 使用泛型模擬聯合型別
public class Result<T, E> {
    private T success;
    private E error;

    private Result(T success, E error) {
        this.success = success;
        this.error = error;
    }

    public static <T, E> Result<T, E> success(T value) {
        return new Result<>(value, null);
    }

    public static <T, E> Result<T, E> error(E error) {
        return new Result<>(null, error);
    }
}

// 函數式介面作為回調
@FunctionalInterface
public interface Callback {
    void onComplete(String data);
}

// 記錄類別 (Java 14+) 類似 Tuple
public record Point(int x, int y) {}`,
      filename: "TypeVsInterface.java",
      explanation: "Java 使用類別和介面構建型別系統",
      highlights: [
        "沒有真正的型別別名",
        "Record 類別提供簡潔的數據容器",
        "使用泛型和模式達到類似效果",
      ],
    },
    keyDifferences: [
      "❌ Java 沒有 Union Types,需要用繼承或泛型替代",
      "❌ Java 沒有 Type Alias,只能定義新的類別或介面",
      "✅ TypeScript Type 更靈活,可以表示複雜型別組合",
    ],
    similarities: ["都可以定義物件結構", "都支援泛型", "都提供型別檢查"],
  },
];
