import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // 生成 source map 方便除錯（可選）
    sourcemap: false,
    // 優化打包
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "prism-vendor": ["prismjs"],
        },
      },
    },
    // 調整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  // 確保 SPA 路由正常工作
  base: "./",
});
