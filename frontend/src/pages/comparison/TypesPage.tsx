import {
  bestPractices,
  commonPitfalls,
  typesComparisonData,
  typeSystemComparison,
} from "@/data/types";
import { AlertCircle, CheckCircle2, Code, Lightbulb, TrendingUp } from "lucide-react";
import React, { useState } from "react";

/**
 * 資料類型對比頁面
 *
 * 職責：
 * - 展示 Java 和 JavaScript/TypeScript 的資料類型完整對比
 * - 提供互動式程式碼範例
 * - 說明常見陷阱和最佳實踐
 *
 * 遵循 Single Responsibility Principle (SRP)：只負責資料類型對比的展示
 *
 * @author Your Name
 * @version 1.0
 * @since 2025-01-15
 */
const TypesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedType, setExpandedType] = useState<string | null>(null);

  // 取得所有類別
  const categories = ["all", ...Array.from(new Set(typesComparisonData.map((t) => t.category)))];

  // 過濾資料
  const filteredData =
    selectedCategory === "all"
      ? typesComparisonData
      : typesComparisonData.filter((t) => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 頁面標題 */}
      <header className="border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">☕ 資料類型完整對比</h1>
        <p className="text-lg text-gray-600">
          深入理解 Java 和 JavaScript/TypeScript 的資料類型差異
        </p>
      </header>

      {/* 型別系統比較 */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          型別系統核心差異
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Java */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-orange-600 mb-3">☕ Java</h3>
            <p className="text-sm text-gray-600 mb-3">{typeSystemComparison.java.typeSystem}</p>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">特性：</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {typeSystemComparison.java.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* JavaScript */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-yellow-600 mb-3">📜 JavaScript</h3>
            <p className="text-sm text-gray-600 mb-3">
              {typeSystemComparison.javascript.typeSystem}
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">特性：</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {typeSystemComparison.javascript.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TypeScript */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">📘 TypeScript</h3>
            <p className="text-sm text-gray-600 mb-3">
              {typeSystemComparison.typescript.typeSystem}
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">特性：</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {typeSystemComparison.typescript.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 類別篩選 */}
      <section>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "📋 全部類型" : category}
            </button>
          ))}
        </div>
      </section>

      {/* 資料類型對比 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-600" />
          詳細對比
        </h2>

        {filteredData.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* 標題列 */}
            <div
              className="bg-gray-50 px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">{type.category}</span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {type.javaType.name} ↔ {type.jsType.name}
                  </h3>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  {expandedType === type.id ? "收起 ▲" : "展開 ▼"}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">{type.javaType.description}</p>
            </div>

            {/* 展開內容 */}
            {expandedType === type.id && (
              <div className="p-6 space-y-6">
                {/* 基本資訊對比 */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Java */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-orange-600 text-lg flex items-center gap-2">
                      ☕ Java
                    </h4>
                    <div className="space-y-2 text-sm">
                      {type.javaType.size && (
                        <div>
                          <span className="font-semibold text-gray-700">大小：</span>
                          <span className="text-gray-600">{type.javaType.size}</span>
                        </div>
                      )}
                      {type.javaType.range && (
                        <div>
                          <span className="font-semibold text-gray-700">範圍：</span>
                          <span className="text-gray-600">{type.javaType.range}</span>
                        </div>
                      )}
                      {type.javaType.defaultValue && (
                        <div>
                          <span className="font-semibold text-gray-700">預設值：</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
                            {type.javaType.defaultValue}
                          </code>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        <code>{type.javaType.example}</code>
                      </pre>
                    </div>
                  </div>

                  {/* JavaScript/TypeScript */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-600 text-lg flex items-center gap-2">
                      📘 JavaScript/TypeScript
                    </h4>
                    <div className="space-y-2 text-sm">
                      {type.jsType.size && (
                        <div>
                          <span className="font-semibold text-gray-700">大小：</span>
                          <span className="text-gray-600">{type.jsType.size}</span>
                        </div>
                      )}
                      {type.jsType.range && (
                        <div>
                          <span className="font-semibold text-gray-700">範圍：</span>
                          <span className="text-gray-600">{type.jsType.range}</span>
                        </div>
                      )}
                      {type.jsType.defaultValue && (
                        <div>
                          <span className="font-semibold text-gray-700">預設值：</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
                            {type.jsType.defaultValue}
                          </code>
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        <code>{type.jsType.example}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* 重點說明 */}
                {type.notes && type.notes.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      重點說明
                    </h5>
                    <ul className="space-y-1 text-sm text-blue-800">
                      {type.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 常見陷阱 */}
                {type.pitfalls && type.pitfalls.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h5 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      常見陷阱
                    </h5>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      {type.pitfalls.map((pitfall, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">⚠️</span>
                          <span>{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 常見陷阱範例 */}
      <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          常見陷阱範例
        </h2>
        <div className="space-y-6">
          {commonPitfalls.map((pitfall, idx) => (
            <div key={idx} className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">{pitfall.title}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">☕ Java</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      <code>{pitfall.java}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">📘 JavaScript</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      <code>{pitfall.javascript}</code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>✅ 解決方案：</strong> {pitfall.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最佳實踐 */}
      <section className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          最佳實踐
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {bestPractices.map((practice, idx) => (
            <div key={idx} className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-3">{practice.title}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {practice.recommendations.map((rec, recIdx) => (
                  <li key={recIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 快速參考卡片 */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 快速參考</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-orange-600 mb-3">☕ Java 記憶口訣</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • <strong>整數</strong>：byte &lt; short &lt; int &lt; long（由小到大）
              </li>
              <li>
                • <strong>浮點</strong>：double 優先於 float
              </li>
              <li>
                • <strong>字元</strong>：char 用單引號，String 用雙引號
              </li>
              <li>
                • <strong>引用</strong>：類別、陣列、介面都是引用型別
              </li>
              <li>
                • <strong>null</strong>：只能用於引用型別
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-blue-600 mb-3">📘 JavaScript 記憶口訣</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • <strong>數字</strong>：只有 number 和 BigInt
              </li>
              <li>
                • <strong>字串</strong>：單引號、雙引號、反引號都可以
              </li>
              <li>
                • <strong>布林</strong>：注意 truthy/falsy
              </li>
              <li>
                • <strong>空值</strong>：null 和 undefined 不同
              </li>
              <li>
                • <strong>物件</strong>：動態語言，屬性可隨時增減
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypesPage;
