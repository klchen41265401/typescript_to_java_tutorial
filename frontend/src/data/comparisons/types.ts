import type { ComparisonItem } from '@/types';

export const typeSystemComparisons: ComparisonItem[] = [
  {
    title: '基本型別宣告',
    typescript: {
      language: 'typescript',
      code: `// TypeScript 型別宣告
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let items: number[] = [1, 2, 3];

// 型別推斷
let message = "Hello"; // 自動推斷為 string

// Union Types
let value: string | number = "test";
value = 42;`,
      filename: 'types.ts',
      explanation: 'TypeScript 使用冒號語法宣告型別，支援型別推斷',
      highlights: [
        '型別註記使用冒號 : 語法',
        '支援型別推斷',
        'Union Types 允許多種型別',
      ],
    },
    java: {
      language: 'java',
      code: `// Java 型別宣告
String name = "John";
int age = 30;
boolean isActive = true;
int[] items = {1, 2, 3};

// Java 10+ 型別推斷
var message = "Hello"; // 推斷為 String

// 泛型處理多型別
Object value = "test";
value = 42;`,
      filename: 'Types.java',
      explanation: 'Java 是靜態型別語言，型別宣告在變數名之前',
      highlights: [
        '型別宣告在變數名之前',
        'Java 10+ 支援 var 關鍵字',
        '基本型別和包裝類別需要區分',
      ],
    },
    keyDifferences: [
      'TypeScript 使用後置型別註記（name: string），Java 使用前置型別（String name）',
      'TypeScript 有 Union Types，Java 使用泛型或 Object',
      'Java 區分基本型別（int, boolean）和包裝類別（Integer, Boolean）',
    ],
    similarities: [
      '都是靜態型別系統',
      '都支援型別推斷',
      '都有陣列支援',
    ],
  },
  {
    title: '函數/方法宣告',
    typescript: {
      language: 'typescript',
      code: `// TypeScript 函數
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// 箭頭函數
const add = (a: number, b: number): number => a + b;

// 可選參數
function createUser(name: string, age?: number): void {
  console.log(name, age);
}`,
      filename: 'functions.ts',
      explanation: 'TypeScript 支援函數和箭頭函數',
      highlights: [
        '支援箭頭函數語法',
        '可選參數使用 ?',
        '模板字串使用反引號',
      ],
    },
    java: {
      language: 'java',
      code: `// Java 方法
public String greet(String name) {
    return "Hello, " + name + "!";
}

// 靜態方法
public static int add(int a, int b) {
    return a + b;
}

// 方法重載（模擬可選參數）
public void createUser(String name) {
    createUser(name, null);
}

public void createUser(String name, Integer age) {
    System.out.println(name + " " + age);
}`,
      filename: 'Functions.java',
      explanation: 'Java 方法需要宣告存取修飾符',
      highlights: [
        '需要宣告存取修飾符（public, private）',
        '使用方法重載提供多種參數組合',
        '沒有箭頭函數語法',
      ],
    },
    keyDifferences: [
      'TypeScript 函數可獨立存在，Java 方法必須在類別內',
      'TypeScript 原生支援可選參數，Java 需要方法重載',
      'Java 需要明確的存取修飾符',
    ],
    similarities: [
      '都支援參數型別檢查',
      '都可以指定返回型別',
      '都支援泛型',
    ],
  },
];
