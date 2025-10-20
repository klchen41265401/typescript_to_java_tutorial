import React, { useEffect, useState } from "react";

/**
 * 滾動進度條組件
 *
 * 職責：
 * - 追蹤頁面滾動進度
 * - 在頁面頂部顯示進度條
 * - 提供視覺化的閱讀進度反饋
 *
 * 遵循 Single Responsibility Principle (SRP)：只負責滾動進度的顯示
 *
 * @author Your Name
 * @version 1.0
 * @since 2025-01-20
 */
export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    /**
     * 計算滾動進度
     *
     * 使用 try-catch 確保錯誤處理
     */
    const updateScrollProgress = () => {
      try {
        // 尋找實際的滾動容器（main 元素）
        const mainElement = document.querySelector("main");

        if (mainElement) {
          const scrollTop = mainElement.scrollTop;
          const scrollHeight = mainElement.scrollHeight;
          const clientHeight = mainElement.clientHeight;
          const docHeight = scrollHeight - clientHeight;

          if (docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            const finalProgress = Math.min(Math.max(progress, 0), 100);
            setScrollProgress(finalProgress);
          } else {
            setScrollProgress(0);
          }
        }
      } catch (error) {
        console.error("計算滾動進度時發生錯誤:", error);
      }
    }; // 初始化進度
    updateScrollProgress();

    // 尋找滾動容器並監聽滾動事件
    const mainElement = document.querySelector("main");

    if (mainElement) {
      mainElement.addEventListener("scroll", updateScrollProgress, { passive: true });
      window.addEventListener("resize", updateScrollProgress, { passive: true });
    }

    // 清理事件監聽器
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", updateScrollProgress);
      }
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-[100]"
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="頁面閱讀進度"
    >
      <div
        className="h-full bg-gradient-primary transition-all duration-300 ease-out relative overflow-hidden shadow-primary-lg"
        style={{
          width: `${scrollProgress}%`,
        }}
      >
        {/* 流動光效 */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
          style={{
            animation: "shimmer 2s infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgressBar;
