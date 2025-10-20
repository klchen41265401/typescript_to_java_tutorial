import ComparisonTable from "@/components/ComparisonTable";
import { advancedTypesComparisons } from "@/data/comparisons/advanced-types";
import { asyncComparisons } from "@/data/comparisons/async";
import { challengesComparisons } from "@/data/comparisons/challenges";
import { collectionsComparisons } from "@/data/comparisons/collections";
import { javaSpecificComparisons } from "@/data/comparisons/java-specific";
import { oopComparisons } from "@/data/comparisons/oop";
import { patternComparisons } from "@/data/comparisons/patterns";
import { springBootComparisons } from "@/data/comparisons/springboot";
import { testingComparisons } from "@/data/comparisons/testing";
import { typeSystemComparisons } from "@/data/comparisons/types";
import type { ComparisonItem } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

interface ComparisonData {
  title: string;
  description: string;
  comparisons: ComparisonItem[];
  warning?: string;
}

/**
 * 對照學習頁面元件
 *
 * 根據路由參數顯示不同類別的程式碼對照教學
 * 支援錨點導航，特別是 Spring Boot 的子主題
 */
const ComparisonPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const [currentData, setCurrentData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setIsLoading(true);
    // 根據 category 載入對應的資料
    let data: ComparisonData | null = null;

    switch (category) {
      case "types":
        data = {
          title: "基本型別系統",
          description: "比較 TypeScript 和 Java 的基本型別宣告、函數定義",
          comparisons: typeSystemComparisons,
        };
        break;
      case "advanced-types":
        data = {
          title: "進階型別系統",
          description: "深入探討泛型、介面、抽象類別、列舉等進階概念",
          comparisons: advancedTypesComparisons,
          warning: "⚠️ 這部分內容較複雜,建議先掌握基本型別後再學習",
        };
        break;
      case "oop":
        data = {
          title: "物件導向程式設計",
          description: "比較類別、繼承、多型、封裝等 OOP 核心概念",
          comparisons: oopComparisons,
        };
        break;
      case "collections":
        data = {
          title: "集合操作比較",
          description: "比較陣列、列表的操作方法,JavaScript Array 方法與 Java Stream API",
          comparisons: collectionsComparisons,
        };
        break;
      case "async":
        data = {
          title: "異步程式設計",
          description: "比較 Promise/async-await 與 CompletableFuture、反應式程式設計",
          comparisons: asyncComparisons,
          warning: "❌ Java 沒有 async/await 關鍵字!需要使用 CompletableFuture 或 Virtual Threads",
        };
        break;
      case "java-specific":
        data = {
          title: "Java 專屬特性",
          description: "Lambda、註解、反射、Stream API 進階等 TypeScript 沒有的 Java 特性",
          comparisons: javaSpecificComparisons,
          warning: "⚠️ 這些是 Java 獨有的概念,TypeScript 開發者需要額外學習",
        };
        break;
      case "patterns":
        data = {
          title: "設計模式實作",
          description: "比較 Singleton、Factory、Observer、Builder、Strategy 等常見設計模式",
          comparisons: patternComparisons,
        };
        break;
      case "testing":
        data = {
          title: "測試框架對照",
          description: "比較 Jest/Vitest 與 JUnit 5,Mock、斷言、整合測試等",
          comparisons: testingComparisons,
        };
        break;
      case "springboot":
        data = {
          title: "Spring Boot 框架概念",
          description: "依賴注入、REST API、JPA、AOP、事務管理、攔截器等",
          comparisons: springBootComparisons,
        };
        break;
      case "challenges":
        data = {
          title: "⚠️ 常見陷阱與挑戰",
          description: "從 TypeScript 轉換到 Java 會遇到的實際困難和需要注意的地方",
          comparisons: challengesComparisons,
          warning: "💡 這些是實際開發中最容易踩的坑,務必仔細閱讀!",
        };
        break;
      default:
        data = null;
    }

    setCurrentData(data);
    setIsLoading(false);
  }, [category]);

  // 處理錨點滾動
  useEffect(() => {
    if (!isLoading && location.hash && currentData) {
      const hash = location.hash.substring(1); // 移除 # 符號
      const element = sectionRefs.current[hash];

      if (element) {
        // 延遲滾動以確保頁面已渲染
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [isLoading, location.hash, currentData]);

  // 只有在載入完成且 category 無效時才重新導向
  if (!isLoading && !currentData && category) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || !currentData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 text-lg">載入中...</div>
      </div>
    );
  }

  // Spring Boot 主題的錨點 ID 映射
  const springBootSections = [
    { id: "di", title: "依賴注入 (DI)", searchTerm: "依賴注入" },
    { id: "rest", title: "REST API 設計", searchTerm: "REST API" },
    { id: "jpa", title: "資料持久化 (JPA)", searchTerm: "資料持久化" },
    { id: "aop", title: "AOP 面向切面", searchTerm: "AOP" },
    { id: "transaction", title: "事務管理", searchTerm: "事務管理" },
    { id: "interceptor", title: "攔截器與過濾器", searchTerm: "攔截器" },
  ];

  return (
    <div className="space-y-8">
      {/* 頁面標題 */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{currentData.title}</h1>
        <p className="text-lg text-gray-600">{currentData.description}</p>
        {currentData.warning && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800">{currentData.warning}</p>
          </div>
        )}
      </div>

      {/* Spring Boot 快速導航 */}
      {category === "springboot" && (
        <div className="bg-gradient-to-r from-primary-50 via-blue-50 to-green-50 rounded-lg p-6 border border-primary-200 shadow-sm">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-700 to-green-600 bg-clip-text text-transparent mb-4">
            📑 快速導航
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {springBootSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 bg-white rounded-lg border border-primary-200 hover:border-primary-500 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-primary-700 text-center shadow-sm hover:shadow-primary"
                onClick={(e) => {
                  e.preventDefault();
                  const element = sectionRefs.current[section.id];
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 對照表格列表 */}
      <div className="space-y-12">
        {currentData.comparisons.map((comparison, index) => {
          // 為 Spring Boot 主題添加錨點
          let sectionId: string | undefined;
          if (category === "springboot") {
            const section = springBootSections.find((s) => comparison.title.includes(s.searchTerm));
            if (section) {
              sectionId = section.id;
            }
          }

          return (
            <div
              key={index}
              ref={
                sectionId
                  ? (el) => {
                      sectionRefs.current[sectionId!] = el;
                    }
                  : undefined
              }
              id={sectionId}
              className="space-y-4 scroll-mt-24"
            >
              <ComparisonTable item={comparison} />
            </div>
          );
        })}
      </div>

      {/* 導航提示 */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200 shadow-sm">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-700 to-accent-cyan bg-clip-text text-transparent mb-3">
          💡 學習提示
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 仔細比較三種語言的語法差異,找出相似的概念</li>
          <li>• 注意每個範例下方的「關鍵差異」和「相似點」說明</li>
          <li>• 可以點擊程式碼區塊右上角的複製按鈕來複製程式碼</li>
          <li>• 使用左側導航列切換不同的學習主題</li>
          <li>• 標記 ❌ 的是從 TypeScript 轉到 Java 特別容易犯錯的地方</li>
          <li>• 標記 ⚠️ 的是需要特別注意的重要概念差異</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonPage;
