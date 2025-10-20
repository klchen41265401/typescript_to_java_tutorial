import type { ComparisonItem } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import CodeBlock from "../CodeBlock";

interface ComparisonTableProps {
  item: ComparisonItem;
  showKotlin?: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ item, showKotlin = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="comparison-section my-8 fade-in">
      {/* 可收合的標題 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left mb-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 hover:from-primary-100 hover:to-blue-100 rounded-lg border border-primary-200 transition-all shadow-sm hover:shadow-primary"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
          {item.title}
        </h3>
        <div className="flex-shrink-0 ml-4">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-primary-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-primary-600" />
          )}
        </div>
      </button>

      {/* 可收合的內容 */}
      {isExpanded && (
        <div className="space-y-6">
          {/* 程式碼對照區塊 */}
          <div
            className={`grid ${
              showKotlin ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3"
            } gap-4`}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gradient-primary shadow-sm"></div>
                <h4 className="text-lg font-semibold text-primary-700">TypeScript</h4>
              </div>
              <CodeBlock example={item.typescript} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-sm"></div>
                <h4 className="text-lg font-semibold text-orange-700">Java</h4>
              </div>
              <CodeBlock example={item.java} />
            </div>

            {item.springboot && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm"></div>
                  <h4 className="text-lg font-semibold text-green-700">Spring Boot</h4>
                </div>
                <CodeBlock example={item.springboot} />
              </div>
            )}

            {showKotlin && item.kotlin && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"></div>
                  <h4 className="text-lg font-semibold text-purple-700">Kotlin</h4>
                </div>
                <CodeBlock example={item.kotlin} />
              </div>
            )}
          </div>

          {/* 主要差異 */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-5">
            <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
              <span className="mr-2">⚠️</span>
              主要差異
            </h4>
            <ul className="space-y-2">
              {item.keyDifferences.map((diff, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="mr-3 text-red-600 font-bold">•</span>
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 相似點 */}
          {item.similarities && item.similarities.length > 0 && (
            <div className="bg-green-50 rounded-lg border border-green-200 p-5">
              <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <span className="mr-2">✅</span>
                相似點
              </h4>
              <ul className="space-y-2">
                {item.similarities.map((similarity, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="mr-3 text-green-600 font-bold">•</span>
                    <span>{similarity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;
