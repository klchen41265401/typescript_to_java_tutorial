import type { NavItem } from "@/types";
import { Book, Code, GitCompare, Home, Layers, X } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "首頁",
    path: "/",
    icon: "Home",
  },
  {
    id: "comparison",
    label: "語法對照",
    icon: "GitCompare",
    children: [
      { id: "types", label: "基本型別", path: "/comparison/types" },
      { id: "types-detail", label: "📊 資料類型完整對比", path: "/types-detail" },
      { id: "advanced-types", label: "進階型別 (泛型、介面)", path: "/comparison/advanced-types" },
      { id: "oop", label: "物件導向程式設計", path: "/comparison/oop" },
      { id: "collections", label: "集合操作", path: "/comparison/collections" },
      { id: "async", label: "異步程式設計", path: "/comparison/async" },
      { id: "java-specific", label: "Java 專屬特性", path: "/comparison/java-specific" },
      { id: "patterns", label: "設計模式", path: "/comparison/patterns" },
      { id: "testing", label: "測試框架", path: "/comparison/testing" },
      { id: "challenges", label: "⚠️ 常見陷阱與挑戰", path: "/comparison/challenges" },
    ],
  },
  {
    id: "springboot",
    label: "Spring Boot 框架",
    icon: "Layers",
    children: [
      { id: "springboot-basics", label: "Spring Boot 核心", path: "/comparison/springboot" },
      { id: "di", label: "依賴注入 (DI)", path: "/comparison/springboot#di" },
      { id: "rest-api", label: "REST API 設計", path: "/comparison/springboot#rest" },
      { id: "jpa", label: "資料持久化 (JPA)", path: "/comparison/springboot#jpa" },
      { id: "aop", label: "AOP 面向切面", path: "/comparison/springboot#aop" },
      { id: "transaction", label: "事務管理", path: "/comparison/springboot#transaction" },
      { id: "interceptor", label: "攔截器與過濾器", path: "/comparison/springboot#interceptor" },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Book,
  Code,
  GitCompare,
  Layers,
};

export const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set(["comparison", "springboot"])
  );

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const isActive = (path?: string) => {
    if (!path) return false;

    // 處理帶有錨點的路徑（例如：/comparison/springboot#di）
    if (path.includes("#")) {
      const [pathPart, hashPart] = path.split("#");
      return location.pathname === pathPart && location.hash === `#${hashPart}`;
    }

    // 一般路徑比對
    // 如果當前 URL 有 hash，則不啟用沒有 hash 的父項目
    if (location.hash && location.pathname === path) {
      return false;
    }

    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const renderNavItem = (item: NavItem, depth: number = 0) => {
    const Icon = item.icon ? iconMap[item.icon] : null;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const active = isActive(item.path);

    return (
      <div key={item.id} className="nav-item">
        <div className={`flex items-center ${depth > 0 ? "pl-8" : ""}`}>
          {hasChildren ? (
            <button
              onClick={() => {
                toggleExpand(item.id);
              }}
              className={`flex items-center w-full px-4 py-2.5 text-left transition-all rounded-lg ${
                active
                  ? "bg-gradient-primary text-white font-medium shadow-primary"
                  : "text-gray-700 hover:bg-blue-50 hover:text-primary-600"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span className="flex-1 ml-3">{item.label}</span>
              <span className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}>›</span>
            </button>
          ) : item.path ? (
            <button
              onClick={() => {
                try {
                  navigate(item.path!);
                } catch (error) {
                  console.error("✗ navigate() failed:", error);
                  window.history.pushState({}, "", item.path);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }

                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={`flex items-center w-full px-4 py-2.5 text-left transition-all rounded-lg ${
                active
                  ? "bg-gradient-primary text-white font-medium shadow-primary"
                  : "text-gray-700 hover:bg-blue-50 hover:text-primary-600"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span className="ml-3">{item.label}</span>
            </button>
          ) : null}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:h-full overflow-y-auto shadow-lg scrollbar-hide`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-primary shadow-primary">
          <h2 className="text-xl font-bold text-white">Java 教學</h2>
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:text-blue-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">{navItems.map((item) => renderNavItem(item))}</nav>
      </aside>
    </>
  );
};

export default Navigation;
