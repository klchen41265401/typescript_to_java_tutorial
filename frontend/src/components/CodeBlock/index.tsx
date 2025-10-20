import type { CodeExample } from "@/types";
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-typescript";
import React, { useEffect, useRef } from "react";

interface CodeBlockProps {
  example: CodeExample;
  showFilename?: boolean;
  maxHeight?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  example,
  showFilename = true,
  maxHeight, // 移除預設值，讓程式碼完整顯示
  className = "",
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [example.code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("複製失敗:", error);
    }
  };

  const languageMap: Record<string, string> = {
    typescript: "typescript",
    java: "java",
    springboot: "java",
    kotlin: "kotlin",
  };

  const prismLanguage = languageMap[example.language] || "javascript";

  return (
    <div className={`code-block-container ${className}`}>
      {showFilename && example.filename && (
        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-300">
          <span className="text-sm text-gray-700 font-mono">{example.filename}</span>
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1.5 rounded hover:bg-gray-200"
            title="複製程式碼"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      )}

      <div className="relative">
        {!showFilename && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 z-10 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded bg-gray-100 hover:bg-gray-200"
            title="複製程式碼"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
        <pre
          className={`${showFilename ? "rounded-b-lg" : "rounded-lg"} !my-0`}
          style={maxHeight ? { maxHeight } : {}}
        >
          <code ref={codeRef} className={`language-${prismLanguage}`}>
            {example.code}
          </code>
        </pre>
      </div>

      {example.explanation && (
        <div className="mt-3 px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">{example.explanation}</p>
        </div>
      )}

      {example.highlights && example.highlights.length > 0 && (
        <div className="mt-3 px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 重點提示</h4>
          <ul className="space-y-1">
            {example.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
