import type { ComparisonItem } from "@/types";

/**
 * 物件導向程式設計概念比較
 *
 * 涵蓋類別、繼承、多型、封裝等核心 OOP 概念
 */
export const oopComparisons: ComparisonItem[] = [
  {
    title: "類別與建構函數",
    typescript: {
      language: "typescript",
      code: `// TypeScript 類別
class Person {
  // 屬性宣告
  private name: string;
  public age: number;
  protected address?: string;

  // 建構函數
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  public greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }

  // Getter/Setter
  get personName(): string {
    return this.name;
  }

  set personName(value: string) {
    if (value.length > 0) {
      this.name = value;
    }
  }

  // 靜態成員
  static species: string = "Homo sapiens";

  static create(name: string, age: number): Person {
    return new Person(name, age);
  }
}

// 使用
const person = new Person("Alice", 25);
console.log(person.greet());`,
      filename: "person.ts",
      explanation: "TypeScript 類別語法簡潔,接近現代 JavaScript",
      highlights: [
        "存取修飾符: private, public, protected",
        "原生支援 getter/setter",
        "靜態成員用 static 關鍵字",
      ],
    },
    java: {
      language: "java",
      code: `// Java 類別
public class Person {
    // 屬性
    private String name;
    public int age;
    protected String address;

    // 建構函數
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 方法
    public String greet() {
        return "Hello, I'm " + name;
    }

    // Getter/Setter (需要明確定義)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }

    // 靜態成員
    public static String species = "Homo sapiens";

    public static Person create(String name, int age) {
        return new Person(name, age);
    }
}

// 使用
Person person = new Person("Alice", 25);
System.out.println(person.greet());`,
      filename: "Person.java",
      explanation: "Java 類別是 OOP 的基礎,語法較為冗長",
      highlights: [
        "必須明確宣告所有存取修飾符",
        "Getter/Setter 需要手動編寫(或用 Lombok)",
        "類別名必須與檔案名相同",
      ],
    },
    keyDifferences: [
      "⚠️ Java 的 Getter/Setter 需要手動編寫,TypeScript 用 get/set 關鍵字",
      "⚠️ Java 每個 public 類別必須在獨立檔案中",
      "✅ TypeScript 屬性可以在建構函數參數中直接宣告",
    ],
    similarities: ["都支援存取修飾符控制封裝", "都有建構函數和靜態成員", "都支援方法重載"],
  },
  {
    title: "簡化的建構函數參數屬性",
    typescript: {
      language: "typescript",
      code: `// TypeScript 參數屬性語法糖
class User {
  // 直接在建構函數參數宣告屬性!
  constructor(
    public id: number,
    private name: string,
    protected email: string,
    public readonly createdAt: Date = new Date()
  ) {}

  getName(): string {
    return this.name;
  }
}

// 等同於下面的完整寫法
class UserVerbose {
  public id: number;
  private name: string;
  protected email: string;
  public readonly createdAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }
}

const user = new User(1, "Bob", "bob@example.com");`,
      filename: "constructor-properties.ts",
      explanation: "TypeScript 提供簡潔的語法糖",
      highlights: ["參數屬性自動成為類別屬性", "readonly 確保屬性不可變", "大幅減少樣板程式碼"],
    },
    java: {
      language: "java",
      code: `// Java 傳統寫法 (較冗長)
public class User {
    public int id;
    private String name;
    protected String email;
    public final Date createdAt;

    public User(int id, String name, String email) {
        this(id, name, email, new Date());
    }

    public User(int id, String name, String email, Date createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }
}

// Java 14+ Record 類別 (簡化語法)
public record UserRecord(
    int id,
    String name,
    String email,
    Date createdAt
) {
    // Record 自動生成建構函數、getter、equals、hashCode、toString

    // 可以添加自定義方法
    public String displayName() {
        return name.toUpperCase();
    }
}

// Lombok 套件也能簡化
@Data
@AllArgsConstructor
public class UserLombok {
    private int id;
    private String name;
    private String email;
    private final Date createdAt = new Date();
}`,
      filename: "ConstructorProperties.java",
      explanation: "Java 需要更多程式碼,但 Record 和 Lombok 可以簡化",
      highlights: [
        "Record 類別自動生成 getter 和建構函數",
        "Lombok @Data 註解減少樣板程式碼",
        "final 關鍵字標記不可變",
      ],
    },
    keyDifferences: [
      "✅ TypeScript 參數屬性語法更簡潔",
      "⚠️ Java Record 是不可變的(immutable),TypeScript 類別預設可變",
      "⚠️ Lombok 是第三方套件,需要額外配置",
    ],
    similarities: ["都支援建構函數重載", "都可以設定預設值", "都有不可變屬性機制"],
  },
  {
    title: "繼承與多型",
    typescript: {
      language: "typescript",
      code: `// TypeScript 繼承
class Animal {
  constructor(protected name: string) {}

  makeSound(): string {
    return "Some sound";
  }

  introduce(): string {
    return \`I am \${this.name}\`;
  }
}

class Dog extends Animal {
  constructor(name: string, private breed: string) {
    super(name);  // 呼叫父類別建構函數
  }

  // 覆寫方法
  makeSound(): string {
    return "Woof!";
  }

  // 新增方法
  getBreed(): string {
    return this.breed;
  }
}

// 多型使用
function animalSound(animal: Animal): void {
  console.log(animal.makeSound());
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Animal("Whiskers");

animalSound(dog);  // "Woof!"
animalSound(cat);  // "Some sound"`,
      filename: "inheritance.ts",
      explanation: "TypeScript 單一繼承,使用 extends 關鍵字",
      highlights: [
        "super() 呼叫父類別建構函數",
        "覆寫方法自動支援多型",
        "子類別可以存取 protected 成員",
      ],
    },
    java: {
      language: "java",
      code: `// Java 繼承
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public String makeSound() {
        return "Some sound";
    }

    public String introduce() {
        return "I am " + name;
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);  // 必須是第一行
        this.breed = breed;
    }

    // 覆寫方法 (建議加 @Override)
    @Override
    public String makeSound() {
        return "Woof!";
    }

    public String getBreed() {
        return breed;
    }
}

// 多型使用
public void animalSound(Animal animal) {
    System.out.println(animal.makeSound());
}

Dog dog = new Dog("Buddy", "Golden Retriever");
Animal cat = new Animal("Whiskers");

animalSound(dog);  // "Woof!"
animalSound(cat);  // "Some sound"`,
      filename: "Inheritance.java",
      explanation: "Java 單一繼承,強型別多型",
      highlights: [
        "@Override 註解驗證覆寫正確性",
        "super() 必須是建構函數第一行",
        "多型透過父類別型別引用實現",
      ],
    },
    keyDifferences: [
      "⚠️ Java @Override 註解是最佳實踐,TypeScript 沒有",
      "⚠️ Java super() 必須是建構函數第一行",
      "✅ 兩者都只支援單一繼承",
    ],
    similarities: ["都使用 extends 關鍵字", "都支援方法覆寫", "都支援多型"],
  },
  {
    title: "存取修飾符與封裝",
    typescript: {
      language: "typescript",
      code: `// TypeScript 存取修飾符
class BankAccount {
  private balance: number;          // 只能在類別內存取
  protected accountNumber: string;  // 子類別可存取
  public owner: string;             // 任何地方可存取

  // # 私有欄位 (ES2022+)
  #pin: string;

  constructor(owner: string, initialBalance: number, pin: string) {
    this.owner = owner;
    this.balance = initialBalance;
    this.accountNumber = this.generateAccountNumber();
    this.#pin = pin;
  }

  // 公開方法提供受控存取
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number, pin: string): boolean {
    if (pin === this.#pin && this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }

  private generateAccountNumber(): string {
    return Math.random().toString(36).substring(7);
  }
}

const account = new BankAccount("Alice", 1000, "1234");
account.deposit(500);
// account.balance;  // Error: private
// account.#pin;     // Error: private`,
      filename: "encapsulation.ts",
      explanation: "TypeScript 提供編譯時的封裝檢查",
      highlights: [
        "private, protected, public 三種修飾符",
        "# 前綴提供真正的運行時私有",
        "編譯後可能仍可存取 private 成員",
      ],
    },
    java: {
      language: "java",
      code: `// Java 存取修飾符
public class BankAccount {
    private double balance;          // 只能在類別內存取
    protected String accountNumber;  // 同包或子類別可存取
    public String owner;             // 任何地方可存取
    String bankName;                 // 預設包級別存取

    private String pin;

    public BankAccount(String owner, double initialBalance, String pin) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountNumber = generateAccountNumber();
        this.pin = pin;
    }

    // 公開方法提供受控存取
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount, String pin) {
        if (this.pin.equals(pin) && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }

    private String generateAccountNumber() {
        return UUID.randomUUID().toString();
    }
}

BankAccount account = new BankAccount("Alice", 1000, "1234");
account.deposit(500);
// account.balance;  // Error: private
// account.pin;      // Error: private`,
      filename: "Encapsulation.java",
      explanation: "Java 提供編譯時和運行時的強封裝",
      highlights: [
        "四種存取級別: private, default, protected, public",
        "private 成員真正無法從外部存取",
        "反射可以繞過存取限制(特殊情況)",
      ],
    },
    keyDifferences: [
      "⚠️ Java 有預設(包級別)存取修飾符,TypeScript 沒有",
      "✅ Java private 是真正的運行時私有",
      "⚠️ TypeScript private 只在編譯時檢查,JavaScript 輸出可能可存取",
    ],
    similarities: [
      "都支援 private, protected, public",
      "都用於實現封裝原則",
      "都鼓勵使用 getter/setter",
    ],
  },
  {
    title: "多重實作 vs 單一繼承",
    typescript: {
      language: "typescript",
      code: `// TypeScript 介面與混合
interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

// 可以實作多個介面
class Duck implements Flyable, Swimmable {
  maxAltitude = 1000;
  maxDepth = 10;

  fly(): void {
    console.log("Flying...");
  }

  swim(): void {
    console.log("Swimming...");
  }
}

// Mixin 模式 (混合)
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    timestamp = Date.now();
  };
}

function Activatable<T extends Constructor>(Base: T) {
  return class extends Base {
    isActive = false;
    activate() { this.isActive = true; }
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);
const ActiveUser = Activatable(TimestampedUser);

const user = new ActiveUser("Alice");
user.activate();`,
      filename: "multiple-implementation.ts",
      explanation: "TypeScript 支援多重介面實作和 Mixin 模式",
      highlights: [
        "implements 可以實作多個介面",
        "Mixin 提供類似多重繼承的能力",
        "型別系統支援複雜組合",
      ],
    },
    java: {
      language: "java",
      code: `// Java 介面實作
public interface Flyable {
    void fly();
    int getMaxAltitude();
}

public interface Swimmable {
    void swim();
    int getMaxDepth();
}

// 可以實作多個介面
public class Duck implements Flyable, Swimmable {
    private int maxAltitude = 1000;
    private int maxDepth = 10;

    @Override
    public void fly() {
        System.out.println("Flying...");
    }

    @Override
    public int getMaxAltitude() {
        return maxAltitude;
    }

    @Override
    public void swim() {
        System.out.println("Swimming...");
    }

    @Override
    public int getMaxDepth() {
        return maxDepth;
    }
}

// Java 8+ 介面預設方法 (部分模擬多重繼承)
public interface Timestamped {
    default long getTimestamp() {
        return System.currentTimeMillis();
    }
}

public interface Activatable {
    boolean isActive();
    void setActive(boolean active);

    default void activate() {
        setActive(true);
    }
}

public class User implements Timestamped, Activatable {
    private String name;
    private boolean active = false;

    @Override
    public boolean isActive() {
        return active;
    }

    @Override
    public void setActive(boolean active) {
        this.active = active;
    }
}`,
      filename: "MultipleImplementation.java",
      explanation: "Java 透過介面實現多重實作",
      highlights: [
        "可實作多個介面但只能繼承一個類別",
        "介面 default 方法提供共用實作",
        "鑽石問題需要明確解決",
      ],
    },
    keyDifferences: [
      "⚠️ Java 沒有 Mixin 概念,用介面 default 方法替代",
      "✅ TypeScript Mixin 更靈活但複雜度較高",
      "⚠️ Java 多個介面有相同 default 方法時需要明確覆寫",
    ],
    similarities: ["都只支援單一類別繼承", "都可以實作多個介面", "都提供程式碼重用機制"],
  },
];
