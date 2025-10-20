import { Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import ScrollProgressBar from "../ScrollProgressBar";

/**
 * 主要佈局元件
 *
 * 包含側邊欄導航、頁首和主內容區域
 * 支援拖動調整側邊欄寬度
 */
export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); // 預設寬度 256px
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 處理拖動調整寬度
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      // 限制最小 200px，最大 500px
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 滾動進度條 */}
      <ScrollProgressBar />

      {/* 側邊欄容器 */}
      <div
        ref={sidebarRef}
        className="relative hidden lg:block"
        style={{ width: `${sidebarWidth}px` }}
      >
        <Navigation isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* 拖動控制桿 */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-gradient-primary hover:w-1.5 transition-all group"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-20 bg-gradient-primary rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-primary">
            <div className="flex flex-col gap-1">
              <div className="w-0.5 h-3 bg-white rounded"></div>
              <div className="w-0.5 h-3 bg-white rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 手機版導航 */}
      <div className="lg:hidden">
        <Navigation isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-white to-primary-50 border-b border-primary-100 px-4 py-3 flex items-center justify-between lg:px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-accent-cyan bg-clip-text text-transparent">
            Java & Spring Boot 教學平台
          </h1>
          <div className="flex items-center space-x-4">
            {/* 可以在這裡加入搜尋、使用者選單等 */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8 scrollbar-hide">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
          <p>Java & Spring Boot 教學平台 © 2025 | 從 TypeScript 到 Java 的學習之旅</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
