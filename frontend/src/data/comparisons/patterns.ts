import type { ComparisonItem } from "@/types";

/**
 * 設計模式實作對照
 *
 * Singleton, Factory, Observer, Builder, Strategy 模式
 */
export const patternComparisons: ComparisonItem[] = [
  {
    title: "Singleton 模式",
    typescript: {
      language: "typescript",
      code: `// TypeScript Singleton - 多種實作方式

// 方式 1: ES6 模組天生單例
// config.ts
export const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
// 任何 import config 的地方都是同一個實例

// 方式 2: 類別 Singleton
class Database {
  private static instance: Database;
  private connection: string;

  // private 建構函數
  private constructor() {
    this.connection = "Connected to DB";
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query(sql: string): void {
    console.log(\`Executing: \${sql}\`);
  }
}

// 使用
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);  // true

// 方式 3: 立即執行函數 (IIFE)
const Logger = (() => {
  let instance: any;

  class LoggerClass {
    private logs: string[] = [];

    log(message: string) {
      this.logs.push(message);
      console.log(message);
    }
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = new LoggerClass();
      }
      return instance;
    }
  };
})();

const logger = Logger.getInstance();`,
      filename: "singleton.ts",
      explanation: "TypeScript 實作 Singleton 很簡單",
      highlights: ["ES6 模組天生單例", "private 建構函數", "靜態方法返回實例"],
    },
    java: {
      language: "java",
      code: `// Java Singleton - 多種實作方式

// 方式 1: Eager Initialization (餓漢式)
public class DatabaseEager {
    private static final DatabaseEager INSTANCE = new DatabaseEager();

    private DatabaseEager() {
        // private 建構函數
    }

    public static DatabaseEager getInstance() {
        return INSTANCE;
    }
}

// 方式 2: Lazy Initialization (懶漢式) - 非線程安全
public class DatabaseLazy {
    private static DatabaseLazy instance;

    private DatabaseLazy() {}

    public static DatabaseLazy getInstance() {
        if (instance == null) {
            instance = new DatabaseLazy();
        }
        return instance;
    }
}

// 方式 3: Thread-Safe Lazy (雙重檢查鎖定)
public class DatabaseThreadSafe {
    private static volatile DatabaseThreadSafe instance;

    private DatabaseThreadSafe() {}

    public static DatabaseThreadSafe getInstance() {
        if (instance == null) {
            synchronized (DatabaseThreadSafe.class) {
                if (instance == null) {
                    instance = new DatabaseThreadSafe();
                }
            }
        }
        return instance;
    }
}

// 方式 4: Bill Pugh (推薦) - 利用類別載入機制
public class Database {
    private Database() {}

    private static class SingletonHelper {
        private static final Database INSTANCE = new Database();
    }

    public static Database getInstance() {
        return SingletonHelper.INSTANCE;
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// 方式 5: Enum Singleton (最佳實踐)
public enum DatabaseEnum {
    INSTANCE;

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// 使用
Database db1 = Database.getInstance();
Database db2 = Database.getInstance();
System.out.println(db1 == db2);  // true

DatabaseEnum.INSTANCE.query("SELECT * FROM users");`,
      filename: "Singleton.java",
      explanation: "Java Singleton 需要考慮多線程",
      highlights: ["多種實作方式", "必須考慮線程安全", "Enum Singleton 最安全"],
    },
    keyDifferences: [
      "⚠️ Java 必須考慮多線程安全",
      "⚠️ Java 雙重檢查鎖定 (Double-Check Locking)",
      "✅ Java Enum Singleton 防止反射攻擊",
      "✅ TypeScript 模組系統天生單例",
    ],
    similarities: ["都使用 private 建構函數", "都有靜態方法獲取實例", "都保證全域只有一個實例"],
  },
  {
    title: "Factory 工廠模式",
    typescript: {
      language: "typescript",
      code: `// TypeScript Factory Pattern
interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak(): string {
    return "Woof!";
  }
}

class Cat implements Animal {
  speak(): string {
    return "Meow!";
  }
}

class Bird implements Animal {
  speak(): string {
    return "Tweet!";
  }
}

// Simple Factory
class AnimalFactory {
  static createAnimal(type: string): Animal {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      case 'bird':
        return new Bird();
      default:
        throw new Error(\`Unknown animal type: \${type}\`);
    }
  }
}

// 使用
const dog = AnimalFactory.createAnimal('dog');
console.log(dog.speak());  // "Woof!"

// Factory Method Pattern
abstract class AnimalStore {
  abstract createAnimal(): Animal;

  orderAnimal(): Animal {
    const animal = this.createAnimal();
    console.log(\`Created: \${animal.speak()}\`);
    return animal;
  }
}

class DogStore extends AnimalStore {
  createAnimal(): Animal {
    return new Dog();
  }
}

class CatStore extends AnimalStore {
  createAnimal(): Animal {
    return new Cat();
  }
}

const dogStore = new DogStore();
dogStore.orderAnimal();`,
      filename: "factory.ts",
      explanation: "TypeScript 工廠模式實作",
      highlights: ["Simple Factory 用靜態方法", "Factory Method 用抽象類別", "返回介面類型"],
    },
    java: {
      language: "java",
      code: `// Java Factory Pattern
public interface Animal {
    String speak();
}

public class Dog implements Animal {
    @Override
    public String speak() {
        return "Woof!";
    }
}

public class Cat implements Animal {
    @Override
    public String speak() {
        return "Meow!";
    }
}

public class Bird implements Animal {
    @Override
    public String speak() {
        return "Tweet!";
    }
}

// Simple Factory
public class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type) {
            case "dog":
                return new Dog();
            case "cat":
                return new Cat();
            case "bird":
                return new Bird();
            default:
                throw new IllegalArgumentException("Unknown animal type: " + type);
        }
    }
}

// 使用
Animal dog = AnimalFactory.createAnimal("dog");
System.out.println(dog.speak());  // "Woof!"

// Factory Method Pattern
public abstract class AnimalStore {
    public abstract Animal createAnimal();

    public Animal orderAnimal() {
        Animal animal = createAnimal();
        System.out.println("Created: " + animal.speak());
        return animal;
    }
}

public class DogStore extends AnimalStore {
    @Override
    public Animal createAnimal() {
        return new Dog();
    }
}

public class CatStore extends AnimalStore {
    @Override
    public Animal createAnimal() {
        return new Cat();
    }
}

// 使用
AnimalStore dogStore = new DogStore();
dogStore.orderAnimal();

// Abstract Factory (工廠的工廠)
public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

public class MacFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}`,
      filename: "Factory.java",
      explanation: "Java 工廠模式常用於框架",
      highlights: [
        "@Override 標註工廠方法",
        "Abstract Factory 創建產品族",
        "Spring 使用工廠模式 (BeanFactory)",
      ],
    },
    keyDifferences: [
      "⚠️ Java 需要 @Override 註解",
      "⚠️ Java 通常有更多的類別文件",
      "✅ Spring BeanFactory 是工廠模式的應用",
      "類似的概念和結構",
    ],
    similarities: ["都使用介面定義產品", "都用抽象類別定義工廠方法", "都可以擴展新產品類型"],
  },
  {
    title: "Observer 觀察者模式",
    typescript: {
      language: "typescript",
      code: `// TypeScript Observer Pattern
interface Observer {
  update(data: any): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class NewsAgency implements Subject {
  private observers: Observer[] = [];
  private news: string = "";

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.news);
    }
  }

  setNews(news: string): void {
    this.news = news;
    this.notify();
  }
}

class NewsChannel implements Observer {
  constructor(private name: string) {}

  update(news: string): void {
    console.log(\`\${this.name} received news: \${news}\`);
  }
}

// 使用
const agency = new NewsAgency();
const channel1 = new NewsChannel("CNN");
const channel2 = new NewsChannel("BBC");

agency.attach(channel1);
agency.attach(channel2);

agency.setNews("Breaking News!");
// CNN received news: Breaking News!
// BBC received news: Breaking News!

// 使用 EventEmitter (Node.js/前端常用)
import { EventEmitter } from 'events';

class Store extends EventEmitter {
  private state: any = {};

  setState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.emit('change', this.state);
  }

  getState(): any {
    return this.state;
  }
}

const store = new Store();
store.on('change', (state) => {
  console.log('State changed:', state);
});

store.setState({ count: 1 });`,
      filename: "observer.ts",
      explanation: "TypeScript 觀察者模式",
      highlights: ["陣列存儲觀察者", "EventEmitter 是內建實作", "前端框架 (React, Vue) 使用此模式"],
    },
    java: {
      language: "java",
      code: `// Java Observer Pattern
import java.util.*;

public interface Observer {
    void update(Object data);
}

public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

public class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String news;

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }

    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }
}

public class NewsChannel implements Observer {
    private String name;

    public NewsChannel(String name) {
        this.name = name;
    }

    @Override
    public void update(Object news) {
        System.out.println(name + " received news: " + news);
    }
}

// 使用
NewsAgency agency = new NewsAgency();
NewsChannel channel1 = new NewsChannel("CNN");
NewsChannel channel2 = new NewsChannel("BBC");

agency.attach(channel1);
agency.attach(channel2);

agency.setNews("Breaking News!");

// 使用內建 Observable (已棄用)
// Java 9+ 不建議使用 java.util.Observable

// PropertyChangeListener (Java Beans)
import java.beans.*;

public class Person {
    private String name;
    private PropertyChangeSupport support;

    public Person() {
        support = new PropertyChangeSupport(this);
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        support.addPropertyChangeListener(listener);
    }

    public void setName(String name) {
        String oldName = this.name;
        this.name = name;
        support.firePropertyChange("name", oldName, name);
    }
}

// 使用
Person person = new Person();
person.addPropertyChangeListener(evt -> {
    System.out.println("Name changed: " + evt.getOldValue() + " -> " + evt.getNewValue());
});

person.setName("Alice");`,
      filename: "Observer.java",
      explanation: "Java 觀察者模式",
      highlights: [
        "List 存儲觀察者",
        "PropertyChangeListener 內建支援",
        "Spring 事件機制使用此模式",
      ],
    },
    keyDifferences: [
      "⚠️ Java Observable 已棄用",
      "✅ Java PropertyChangeListener 提供內建支援",
      "✅ TypeScript EventEmitter 更簡潔",
      "⚠️ Spring 有 @EventListener 註解",
    ],
    similarities: ["都使用介面定義觀察者", "都使用列表存儲觀察者", "都有通知機制"],
  },
  {
    title: "Builder 建造者模式",
    typescript: {
      language: "typescript",
      code: `// TypeScript Builder Pattern
class User {
  constructor(
    public id: number,
    public name: string,
    public email?: string,
    public age?: number,
    public address?: string
  ) {}
}

// Builder 類別
class UserBuilder {
  private id: number = 0;
  private name: string = "";
  private email?: string;
  private age?: number;
  private address?: string;

  setId(id: number): this {
    this.id = id;
    return this;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setAddress(address: string): this {
    this.address = address;
    return this;
  }

  build(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.age,
      this.address
    );
  }
}

// 使用
const user = new UserBuilder()
  .setId(1)
  .setName("Alice")
  .setEmail("alice@example.com")
  .setAge(30)
  .build();

// 使用物件字面量 (更簡單的方式)
const user2: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com"
};`,
      filename: "builder.ts",
      explanation: "TypeScript Builder 模式",
      highlights: ["鏈式呼叫 (fluent API)", "可選參數處理", "物件字面量是更簡單的替代方案"],
    },
    java: {
      language: "java",
      code: `// Java Builder Pattern
public class User {
    private final int id;
    private final String name;
    private final String email;
    private final Integer age;
    private final String address;

    // private 建構函數
    private User(UserBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Integer getAge() { return age; }
    public String getAddress() { return address; }

    // Static Builder 類別
    public static class UserBuilder {
        private int id;
        private String name;
        private String email;
        private Integer age;
        private String address;

        public UserBuilder id(int id) {
            this.id = id;
            return this;
        }

        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder age(Integer age) {
            this.age = age;
            return this;
        }

        public UserBuilder address(String address) {
            this.address = address;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

// 使用
User user = new User.UserBuilder()
    .id(1)
    .name("Alice")
    .email("alice@example.com")
    .age(30)
    .build();

// Lombok @Builder 註解 (自動生成)
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLombok {
    private int id;
    private String name;
    private String email;
    private Integer age;
    private String address;
}

// 使用 Lombok
UserLombok user2 = UserLombok.builder()
    .id(2)
    .name("Bob")
    .email("bob@example.com")
    .build();`,
      filename: "Builder.java",
      explanation: "Java Builder 模式處理複雜物件",
      highlights: ["private 建構函數", "Static inner Builder 類別", "Lombok @Builder 自動生成"],
    },
    keyDifferences: [
      "⚠️ Java 需要更多樣板程式碼",
      "✅ Lombok @Builder 大幅簡化",
      "✅ TypeScript 物件字面量更簡單",
      "⚠️ Java Builder 常用於不可變物件",
    ],
    similarities: ["都使用鏈式呼叫", "都用於構建複雜物件", "都提高可讀性"],
  },
  {
    title: "Strategy 策略模式",
    typescript: {
      language: "typescript",
      code: `// TypeScript Strategy Pattern
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(
    private cardNumber: string,
    private cvv: string
  ) {}

  pay(amount: number): void {
    console.log(\`Paid \${amount} using Credit Card \${this.cardNumber}\`);
  }
}

class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): void {
    console.log(\`Paid \${amount} using PayPal account \${this.email}\`);
  }
}

class CryptoPayment implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  pay(amount: number): void {
    console.log(\`Paid \${amount} using Crypto wallet \${this.walletAddress}\`);
  }
}

// Context
class ShoppingCart {
  private items: string[] = [];
  private paymentStrategy?: PaymentStrategy;

  addItem(item: string): void {
    this.items.push(item);
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(amount: number): void {
    if (!this.paymentStrategy) {
      throw new Error("Payment strategy not set");
    }
    this.paymentStrategy.pay(amount);
  }
}

// 使用
const cart = new ShoppingCart();
cart.addItem("Book");
cart.addItem("Pen");

// 選擇信用卡支付
cart.setPaymentStrategy(new CreditCardPayment("1234-5678", "123"));
cart.checkout(100);

// 切換到 PayPal 支付
cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(100);

// 使用函數式方法 (更簡潔)
type PaymentFn = (amount: number) => void;

const creditCard = (cardNumber: string): PaymentFn => {
  return (amount) => console.log(\`Paid \${amount} with card \${cardNumber}\`);
};

const paypal = (email: string): PaymentFn => {
  return (amount) => console.log(\`Paid \${amount} with PayPal \${email}\`);
};

const cart2 = {
  pay: creditCard("1234-5678")
};

cart2.pay(100);`,
      filename: "strategy.ts",
      explanation: "TypeScript 策略模式",
      highlights: ["介面定義策略", "Context 持有策略", "函數式方法更簡潔"],
    },
    java: {
      language: "java",
      code: `// Java Strategy Pattern
public interface PaymentStrategy {
    void pay(int amount);
}

public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    public CreditCardPayment(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card " + cardNumber);
    }
}

public class PayPalPayment implements PaymentStrategy {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal account " + email);
    }
}

public class CryptoPayment implements PaymentStrategy {
    private String walletAddress;

    public CryptoPayment(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Crypto wallet " + walletAddress);
    }
}

// Context
public class ShoppingCart {
    private List<String> items = new ArrayList<>();
    private PaymentStrategy paymentStrategy;

    public void addItem(String item) {
        items.add(item);
    }

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(int amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("Payment strategy not set");
        }
        paymentStrategy.pay(amount);
    }
}

// 使用
ShoppingCart cart = new ShoppingCart();
cart.addItem("Book");
cart.addItem("Pen");

// 選擇信用卡支付
cart.setPaymentStrategy(new CreditCardPayment("1234-5678", "123"));
cart.checkout(100);

// 切換到 PayPal 支付
cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(100);

// 使用 Lambda (Java 8+) - 簡化版
@FunctionalInterface
public interface PaymentStrategyFn {
    void pay(int amount);
}

public class ShoppingCart2 {
    private PaymentStrategyFn paymentStrategy;

    public void setPaymentStrategy(PaymentStrategyFn strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(int amount) {
        paymentStrategy.pay(amount);
    }
}

// 使用
ShoppingCart2 cart2 = new ShoppingCart2();
cart2.setPaymentStrategy(amount ->
    System.out.println("Paid " + amount + " with credit card")
);
cart2.checkout(100);`,
      filename: "Strategy.java",
      explanation: "Java 策略模式",
      highlights: [
        "@Override 標註策略方法",
        "Lambda 可以簡化策略",
        "Spring 中常用 (不同資料源策略)",
      ],
    },
    keyDifferences: [
      "⚠️ Java 需要明確的類別定義",
      "✅ Java 8+ Lambda 可以簡化單方法策略",
      "✅ TypeScript 函數式方法更靈活",
      "類似的設計理念",
    ],
    similarities: ["都使用介面定義策略", "都可以動態切換策略", "都遵循開放封閉原則"],
  },
];
