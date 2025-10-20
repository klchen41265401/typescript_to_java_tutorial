import { BookOpen, Code2, GitCompare, Zap } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * 首頁元件
 *
 * 提供教學平台的入口,展示主要學習路徑和功能特色
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    console.log("HomePage navigating to:", path);
    navigate(path);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-accent-cyan bg-clip-text text-transparent">
          TypeScript vs Java vs Spring Boot
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          從熟悉的 TypeScript 視角學習 Java 和 Spring Boot 的語法與架構設計
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => handleNavigate("/comparison/types")}
            className="px-6 py-3 bg-gradient-primary hover:shadow-primary-lg text-white rounded-lg font-semibold transition-all shadow-primary"
          >
            開始學習
          </button>
          <a
            href="#features"
            className="px-6 py-3 bg-white hover:bg-primary-50 text-primary-700 border border-primary-200 rounded-lg font-semibold transition-all shadow-sm hover:shadow-primary"
          >
            了解更多
          </a>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">學習路徑</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => handleNavigate("/comparison/types")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-8 h-8 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-900">基本型別</h3>
            </div>
            <p className="text-gray-600">比較 TypeScript 和 Java 的基本型別宣告、函數定義方式</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/advanced-types")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">進階型別</h3>
            </div>
            <p className="text-gray-600">深入理解泛型、介面、抽象類別、列舉等進階概念</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/oop")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <GitCompare className="w-8 h-8 text-accent-cyan" />
              <h3 className="text-xl font-semibold text-gray-900">物件導向</h3>
            </div>
            <p className="text-gray-600">學習類別、繼承、多型、封裝等 OOP 核心概念</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/collections")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">集合操作</h3>
            </div>
            <p className="text-gray-600">比較 JavaScript Array 方法與 Java Stream API 的使用方式</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/async")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-accent-teal" />
              <h3 className="text-xl font-semibold text-gray-900">異步程式設計</h3>
            </div>
            <p className="text-gray-600">
              Promise/async-await vs CompletableFuture、反應式程式設計
            </p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/java-specific")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-8 h-8 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900">Java 專屬特性</h3>
            </div>
            <p className="text-gray-600">Lambda、註解、反射、Stream API 進階等 Java 獨有概念</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/patterns")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <GitCompare className="w-8 h-8 text-pink-600" />
              <h3 className="text-xl font-semibold text-gray-900">設計模式</h3>
            </div>
            <p className="text-gray-600">
              Singleton、Factory、Observer、Builder、Strategy 等模式實作
            </p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/testing")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">測試框架</h3>
            </div>
            <p className="text-gray-600">Jest/Vitest vs JUnit 5,Mock、斷言、整合測試對照</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/springboot")}
            className="p-6 bg-white rounded-lg hover:shadow-primary-lg transition-all border border-primary-100 text-left w-full hover:border-primary-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Spring Boot</h3>
            </div>
            <p className="text-gray-600">依賴注入、REST API、JPA、AOP、事務管理、攔截器</p>
          </button>

          <button
            onClick={() => handleNavigate("/comparison/challenges")}
            className="p-6 bg-red-50 rounded-lg hover:shadow-lg transition-all border-2 border-red-300 text-left w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-semibold text-red-900">⚠️ 常見陷阱</h3>
            </div>
            <p className="text-red-700">從 TypeScript 轉 Java 最容易踩的坑,實際開發必看!</p>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">平台特色</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-primary">
                <GitCompare className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">對照式學習</h3>
              <p className="text-gray-600">
                三欄對照設計,同時展示 TypeScript、Java 和 Spring Boot 的程式碼實作,快速理解差異
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-accent">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">語法高亮</h3>
              <p className="text-gray-600">
                使用 Prism.js 提供專業的程式碼語法高亮,支援 TypeScript、Java 和 Kotlin
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-accent">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">重點提示</h3>
              <p className="text-gray-600">
                每個範例都附有關鍵差異和相似點說明,幫助你快速掌握核心概念
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-accent">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">循序漸進</h3>
              <p className="text-gray-600">
                從基礎型別到 Spring Boot 框架,課程設計由淺入深,適合有前端經驗的開發者學習
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-50 via-blue-50 to-accent-cyan/10 rounded-lg border border-primary-200 shadow-primary">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-accent-cyan bg-clip-text text-transparent mb-4">
          準備好開始學習了嗎?
        </h2>
        <p className="text-gray-600 mb-6">從型別系統開始,逐步理解 Java 和 Spring Boot 的核心概念</p>
        <button
          onClick={() => handleNavigate("/comparison/types")}
          className="inline-block px-8 py-4 bg-gradient-primary hover:shadow-primary-lg text-white rounded-lg font-semibold transition-all shadow-primary"
        >
          開始第一課
        </button>
      </section>
    </div>
  );
};

export default HomePage;
