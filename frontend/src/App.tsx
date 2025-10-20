import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import ComparisonPage from "./pages/ComparisonPage";
import HomePage from "./pages/HomePage";
import TypesPage from "./pages/comparison/TypesPage";

/**
 * 應用程式主元件
 *
 * 定義路由結構和頁面佈局
 */
function App() {
  return (
    <BrowserRouter basename="/typescript_to_java_tutorial">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="comparison/:category" element={<ComparisonPage />} />
          <Route path="types-detail" element={<TypesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
