# React 前端啟動腳本

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Java & Spring Boot 教學 - 前端啟動  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 檢查 Node.js 是否安裝
Write-Host "檢查 Node.js 環境..." -ForegroundColor Yellow
$nodeVersion = node --version 2>&1
if ($nodeVersion) {
    Write-Host "✓ Node.js 已安裝: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ 未找到 Node.js，請先安裝 Node.js 18 或更高版本" -ForegroundColor Red
    exit 1
}

# 檢查 node_modules 是否存在
if (!(Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "首次啟動，正在安裝依賴..." -ForegroundColor Yellow
    npm install

    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ 依賴安裝失敗" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ 依賴安裝成功" -ForegroundColor Green
}

Write-Host ""
Write-Host "啟動開發伺服器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  前端網站: http://localhost:3000" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

npm run dev
