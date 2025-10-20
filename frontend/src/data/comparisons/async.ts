import type { ComparisonItem } from "@/types";

/**
 * 非同步程式設計比較
 *
 * Promise vs CompletableFuture, async/await, 回調地獄, reactive programming
 */
export const asyncComparisons: ComparisonItem[] = [
  {
    title: "Promise vs CompletableFuture",
    typescript: {
      language: "typescript",
      code: `// TypeScript Promise
function fetchUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(response => response.json())
    .then(data => data as User);
}

// 使用 Promise
fetchUser(1)
  .then(user => {
    console.log(user.name);
    return fetchUser(user.friendId);
  })
  .then(friend => {
    console.log(friend.name);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Promise.all - 並行執行
const promises = [fetchUser(1), fetchUser(2), fetchUser(3)];
Promise.all(promises)
  .then(users => {
    console.log(\`Fetched \${users.length} users\`);
  });

// Promise.race - 第一個完成的
Promise.race(promises)
  .then(firstUser => {
    console.log("First user:", firstUser.name);
  });`,
      filename: "promises.ts",
      explanation: "Promise 是 JavaScript 非同步的核心",
      highlights: ["then() 鏈式呼叫", "catch() 統一錯誤處理", "Promise.all() 並行執行"],
    },
    java: {
      language: "java",
      code: `// Java CompletableFuture
public CompletableFuture<User> fetchUser(int id) {
    return CompletableFuture.supplyAsync(() -> {
        // 模擬 HTTP 請求
        return httpClient.get("/api/users/" + id);
    }).thenApply(response -> {
        return objectMapper.readValue(response, User.class);
    });
}

// 使用 CompletableFuture
fetchUser(1)
    .thenCompose(user -> {
        System.out.println(user.getName());
        return fetchUser(user.getFriendId());
    })
    .thenAccept(friend -> {
        System.out.println(friend.getName());
    })
    .exceptionally(error -> {
        System.err.println("Error: " + error.getMessage());
        return null;
    });

// allOf - 並行執行
CompletableFuture<User> f1 = fetchUser(1);
CompletableFuture<User> f2 = fetchUser(2);
CompletableFuture<User> f3 = fetchUser(3);

CompletableFuture.allOf(f1, f2, f3)
    .thenRun(() -> {
        System.out.println("All users fetched");
    });

// anyOf - 第一個完成的
CompletableFuture.anyOf(f1, f2, f3)
    .thenAccept(firstUser -> {
        System.out.println("First user: " + ((User) firstUser).getName());
    });`,
      filename: "CompletableFutures.java",
      explanation: "CompletableFuture 是 Java 8+ 的非同步解決方案",
      highlights: [
        "supplyAsync() 在執行緒池中執行",
        "thenCompose() 類似 Promise.then()",
        "exceptionally() 處理錯誤",
      ],
    },
    keyDifferences: [
      "⚠️ Java 需要明確指定執行緒池 (預設使用 ForkJoinPool)",
      "⚠️ thenCompose() vs thenApply() 容易混淆",
      "⚠️ allOf() 返回 CompletableFuture<Void>,需要手動獲取結果",
      "✅ 概念相似,但 Java 語法更冗長",
    ],
    similarities: ["都支援鏈式呼叫", "都有並行執行機制", "都可以組合多個非同步操作"],
  },
  {
    title: "async/await 語法",
    typescript: {
      language: "typescript",
      code: `// TypeScript async/await (非常直觀!)
async function getUserWithFriends(userId: number): Promise<UserWithFriends> {
  try {
    // 等待第一個請求
    const user = await fetchUser(userId);
    console.log(\`Got user: \${user.name}\`);

    // 等待第二個請求
    const friend = await fetchUser(user.friendId);
    console.log(\`Got friend: \${friend.name}\`);

    return {
      user,
      friend
    };
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
}

// 並行執行 (Promise.all + await)
async function getMultipleUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map(id => fetchUser(id));
  const users = await Promise.all(promises);
  return users;
}

// 循序執行 vs 並行執行
async function sequential() {
  const user1 = await fetchUser(1);  // 等待
  const user2 = await fetchUser(2);  // 等待
  // 總時間 = t1 + t2
}

async function parallel() {
  const [user1, user2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
  // 總時間 = max(t1, t2)
}`,
      filename: "async-await.ts",
      explanation: "async/await 讓非同步程式碼看起來像同步",
      highlights: [
        "async 函數自動返回 Promise",
        "await 暫停執行直到 Promise 完成",
        "try-catch 處理錯誤",
      ],
    },
    java: {
      language: "java",
      code: `// Java 沒有 async/await! (這是最大的痛點)
// 需要用 CompletableFuture 鏈式呼叫

public CompletableFuture<UserWithFriends> getUserWithFriends(int userId) {
    return fetchUser(userId)
        .thenCompose(user -> {
            System.out.println("Got user: " + user.getName());
            return fetchUser(user.getFriendId())
                .thenApply(friend -> {
                    System.out.println("Got friend: " + friend.getName());
                    return new UserWithFriends(user, friend);
                });
        })
        .exceptionally(error -> {
            System.err.println("Failed: " + error.getMessage());
            throw new RuntimeException(error);
        });
}

// 並行執行
public CompletableFuture<List<User>> getMultipleUsers(List<Integer> ids) {
    List<CompletableFuture<User>> futures = ids.stream()
        .map(this::fetchUser)
        .collect(Collectors.toList());

    return CompletableFuture.allOf(
        futures.toArray(new CompletableFuture[0])
    ).thenApply(v ->
        futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList())
    );
}

// 虛擬執行緒 (Java 19+, Project Loom)
// 可以用同步風格寫非同步程式碼
public UserWithFriends getUserWithFriendsVirtualThread(int userId)
    throws Exception {
    // 在虛擬執行緒中執行
    return Thread.startVirtualThread(() -> {
        User user = fetchUserSync(userId);
        System.out.println("Got user: " + user.getName());

        User friend = fetchUserSync(user.getFriendId());
        System.out.println("Got friend: " + friend.getName());

        return new UserWithFriends(user, friend);
    }).get();
}`,
      filename: "AsyncAwait.java",
      explanation: "Java 傳統上沒有 async/await,需要用回調",
      highlights: [
        "❌ 沒有 async/await 語法",
        "⚠️ CompletableFuture 鏈式呼叫較複雜",
        "✅ Java 19+ 虛擬執行緒改善此問題",
      ],
    },
    keyDifferences: [
      "❌ 最大挑戰: Java 沒有 async/await,程式碼可讀性差",
      "❌ 巢狀的 thenCompose/thenApply 難以閱讀",
      "⚠️ Java 19+ 虛擬執行緒是解決方案,但需新版本",
      "⚠️ TypeScript async/await 是語法糖,Java 需要語言層面支援",
    ],
    similarities: ["都需要處理非同步操作", "都有錯誤處理機制", "都支援並行執行"],
  },
  {
    title: "回調地獄 (Callback Hell)",
    typescript: {
      language: "typescript",
      code: `// TypeScript 舊式回調 (不推薦)
function oldStyleCallback() {
  fetchUserOld(1, (error, user) => {
    if (error) {
      console.error(error);
      return;
    }

    fetchUserOld(user.friendId, (error, friend) => {
      if (error) {
        console.error(error);
        return;
      }

      fetchUserOld(friend.friendId, (error, friendOfFriend) => {
        if (error) {
          console.error(error);
          return;
        }

        // 巢狀越來越深...
        console.log(friendOfFriend);
      });
    });
  });
}

// 用 Promise 改善
function withPromise() {
  fetchUser(1)
    .then(user => fetchUser(user.friendId))
    .then(friend => fetchUser(friend.friendId))
    .then(friendOfFriend => {
      console.log(friendOfFriend);
    })
    .catch(error => console.error(error));
}

// 用 async/await 最清晰
async function withAsyncAwait() {
  try {
    const user = await fetchUser(1);
    const friend = await fetchUser(user.friendId);
    const friendOfFriend = await fetchUser(friend.friendId);
    console.log(friendOfFriend);
  } catch (error) {
    console.error(error);
  }
}`,
      filename: "callback-hell.ts",
      explanation: "Promise 和 async/await 解決回調地獄",
      highlights: ["舊式回調造成巢狀地獄", "Promise 鏈式呼叫改善", "async/await 最清晰"],
    },
    java: {
      language: "java",
      code: `// Java 回調風格 (較少使用)
public void oldStyleCallback() {
    fetchUserWithCallback(1, new Callback<User>() {
        @Override
        public void onSuccess(User user) {
            fetchUserWithCallback(user.getFriendId(), new Callback<User>() {
                @Override
                public void onSuccess(User friend) {
                    fetchUserWithCallback(friend.getFriendId(), new Callback<User>() {
                        @Override
                        public void onSuccess(User friendOfFriend) {
                            // 巢狀越來越深...
                            System.out.println(friendOfFriend);
                        }

                        @Override
                        public void onError(Exception e) {
                            e.printStackTrace();
                        }
                    });
                }

                @Override
                public void onError(Exception e) {
                    e.printStackTrace();
                }
            });
        }

        @Override
        public void onError(Exception e) {
            e.printStackTrace();
        }
    });
}

// 用 CompletableFuture 改善
public void withCompletableFuture() {
    fetchUser(1)
        .thenCompose(user -> fetchUser(user.getFriendId()))
        .thenCompose(friend -> fetchUser(friend.getFriendId()))
        .thenAccept(friendOfFriend -> {
            System.out.println(friendOfFriend);
        })
        .exceptionally(error -> {
            error.printStackTrace();
            return null;
        });
}

// 用虛擬執行緒最清晰 (Java 19+)
public void withVirtualThread() {
    Thread.startVirtualThread(() -> {
        try {
            User user = fetchUserSync(1);
            User friend = fetchUserSync(user.getFriendId());
            User friendOfFriend = fetchUserSync(friend.getFriendId());
            System.out.println(friendOfFriend);
        } catch (Exception e) {
            e.printStackTrace();
        }
    });
}`,
      filename: "CallbackHell.java",
      explanation: "Java 也有回調地獄,CompletableFuture 改善",
      highlights: [
        "匿名內部類別造成冗長",
        "CompletableFuture 是現代做法",
        "虛擬執行緒提供同步風格",
      ],
    },
    keyDifferences: [
      "⚠️ Java 匿名內部類別比 JS 回調更冗長",
      "⚠️ CompletableFuture 比 async/await 難讀",
      "✅ Java 虛擬執行緒可以解決,但需 Java 19+",
      "❌ 大多數專案還在用 Java 11/17,無法用虛擬執行緒",
    ],
    similarities: ["都有回調地獄問題", "都有現代化的解決方案", "都鼓勵用更高階的抽象"],
  },
  {
    title: "Reactive Programming (響應式程式設計)",
    typescript: {
      language: "typescript",
      code: `// TypeScript RxJS (響應式擴展)
import { Observable, of, from, interval } from 'rxjs';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';

// 建立 Observable
const numbers$ = of(1, 2, 3, 4, 5);

// 轉換和過濾
numbers$
  .pipe(
    filter(n => n % 2 === 0),
    map(n => n * 2)
  )
  .subscribe(result => console.log(result));  // 4, 8

// 搜尋框防抖動範例
const searchBox = document.getElementById('search');
const search$ = fromEvent(searchBox, 'input');

search$
  .pipe(
    debounceTime(300),  // 等待 300ms
    map(event => (event.target as HTMLInputElement).value),
    filter(text => text.length > 2),
    switchMap(text => fetchSearchResults(text))
  )
  .subscribe(results => {
    displayResults(results);
  });

// Subject (可以主動發射值)
import { Subject } from 'rxjs';

const userClick$ = new Subject<MouseEvent>();

userClick$.subscribe(event => {
  console.log('Clicked at:', event.clientX, event.clientY);
});

document.addEventListener('click', event => {
  userClick$.next(event);
});`,
      filename: "reactive.ts",
      explanation: "RxJS 提供強大的響應式程式設計",
      highlights: ["Observable 表示資料流", "pipe() 組合運算子", "適合處理事件流和非同步序列"],
    },
    java: {
      language: "java",
      code: `// Java Reactor / RxJava (Spring WebFlux 使用)
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// Mono - 0 或 1 個元素
Mono<User> user = Mono.fromCallable(() -> fetchUserSync(1));

user.map(u -> u.getName())
    .subscribe(name -> System.out.println(name));

// Flux - 0 到 N 個元素
Flux<Integer> numbers = Flux.just(1, 2, 3, 4, 5);

numbers
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .subscribe(result -> System.out.println(result));  // 4, 8

// 防抖動範例 (實際使用較複雜)
Flux<String> searchStream = // ... 來自使用者輸入

searchStream
    .debounce(Duration.ofMillis(300))
    .filter(text -> text.length() > 2)
    .flatMap(text -> fetchSearchResults(text))
    .subscribe(results -> {
        displayResults(results);
    });

// Spring WebFlux 控制器範例
@RestController
public class UserController {

    @GetMapping("/users/{id}")
    public Mono<User> getUser(@PathVariable int id) {
        return userService.findById(id);
    }

    @GetMapping("/users")
    public Flux<User> getAllUsers() {
        return userService.findAll();
    }

    // 組合多個 Mono
    @GetMapping("/users/{id}/with-posts")
    public Mono<UserWithPosts> getUserWithPosts(@PathVariable int id) {
        return userService.findById(id)
            .zipWith(postService.findByUserId(id))
            .map(tuple -> new UserWithPosts(tuple.getT1(), tuple.getT2()));
    }
}`,
      filename: "Reactive.java",
      explanation: "Java Reactor 用於 Spring WebFlux",
      highlights: [
        "Mono 表示 0 或 1 個元素",
        "Flux 表示 0 到 N 個元素",
        "Spring WebFlux 非阻塞式 Web 框架",
      ],
    },
    keyDifferences: [
      "⚠️ Java Reactor 是完整的響應式框架,RxJS 是函式庫",
      "⚠️ Mono vs Flux 區分單一值和多值",
      "⚠️ Spring WebFlux 學習曲線陡峭",
      "✅ 概念相似,都是 Reactive Streams 規範",
      "❌ WebFlux 錯誤處理和除錯困難",
    ],
    similarities: [
      "都基於 Reactive Streams 規範",
      "都支援背壓 (backpressure)",
      "都提供豐富的運算子",
    ],
  },
  {
    title: "執行緒與並發控制",
    typescript: {
      language: "typescript",
      code: `// JavaScript/TypeScript 單執行緒模型
// Event Loop 處理非同步

// 1. 主執行緒
console.log("Start");

// 2. 非同步任務放入事件佇列
setTimeout(() => {
  console.log("Timeout");
}, 0);

// 3. Promise 微任務
Promise.resolve().then(() => {
  console.log("Promise");
});

// 4. 繼續主執行緒
console.log("End");

// 輸出: Start, End, Promise, Timeout

// Web Workers (真正的多執行緒)
const worker = new Worker('worker.js');

worker.postMessage({ data: largeData });

worker.onmessage = (event) => {
  console.log('Worker result:', event.data);
};

// worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};

// 並發限制 (常見面試題)
async function limitConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const promise = task().then(result => {
      results.push(result);
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex(p => p === promise),
        1
      );
    }
  }

  await Promise.all(executing);
  return results;
}`,
      filename: "concurrency.ts",
      explanation: "JavaScript 是單執行緒,用 Event Loop",
      highlights: ["Event Loop 處理非同步", "Web Workers 提供真正多執行緒", "並發控制需要手動實作"],
    },
    java: {
      language: "java",
      code: `// Java 真正的多執行緒
// Thread 類別
Thread thread = new Thread(() -> {
    System.out.println("Running in thread: " +
        Thread.currentThread().getName());
});
thread.start();

// ExecutorService (執行緒池)
ExecutorService executor = Executors.newFixedThreadPool(10);

// 提交任務
executor.submit(() -> {
    // 執行任務
    return "Result";
});

// 並發執行多個任務
List<Callable<User>> tasks = ids.stream()
    .map(id -> (Callable<User>) () -> fetchUserSync(id))
    .collect(Collectors.toList());

List<Future<User>> futures = executor.invokeAll(tasks);

// 獲取結果
for (Future<User> future : futures) {
    User user = future.get();  // 阻塞直到完成
    System.out.println(user.getName());
}

executor.shutdown();

// 並發安全 (synchronized)
public class Counter {
    private int count = 0;

    // 同步方法
    public synchronized void increment() {
        count++;
    }

    // 同步區塊
    public void incrementBlock() {
        synchronized(this) {
            count++;
        }
    }

    // 使用 Atomic 類別
    private AtomicInteger atomicCount = new AtomicInteger(0);

    public void incrementAtomic() {
        atomicCount.incrementAndGet();
    }
}

// 鎖 (Lock)
import java.util.concurrent.locks.ReentrantLock;

public class BankAccount {
    private double balance;
    private final ReentrantLock lock = new ReentrantLock();

    public void withdraw(double amount) {
        lock.lock();
        try {
            if (balance >= amount) {
                balance -= amount;
            }
        } finally {
            lock.unlock();
        }
    }
}

// CountDownLatch (等待多個執行緒完成)
CountDownLatch latch = new CountDownLatch(3);

for (int i = 0; i < 3; i++) {
    executor.submit(() -> {
        try {
            // 執行任務
            Thread.sleep(1000);
        } finally {
            latch.countDown();
        }
    });
}

latch.await();  // 等待所有任務完成
System.out.println("All tasks completed");`,
      filename: "Concurrency.java",
      explanation: "Java 有完整的並發框架",
      highlights: [
        "ExecutorService 管理執行緒池",
        "synchronized 關鍵字同步",
        "Lock, Atomic, CountDownLatch 等工具",
      ],
    },
    keyDifferences: [
      "❌ 巨大差異: Java 是真正多執行緒,JS 是單執行緒",
      "⚠️ Java 需要處理執行緒安全問題",
      "⚠️ Race condition, Deadlock 是 Java 常見問題",
      "✅ Java 並發工具更成熟但複雜度高",
      "⚠️ TypeScript 開發者需要重新學習並發概念",
    ],
    similarities: ["都需要處理非同步操作", "都有執行緒池概念", "都需要避免阻塞主執行緒"],
  },
];
