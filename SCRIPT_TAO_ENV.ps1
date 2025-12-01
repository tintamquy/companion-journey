# Script tạo file .env tự động
# Chạy script này: .\SCRIPT_TAO_ENV.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TẠO FILE .ENV CHO COMPANION JOURNEY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra file .env đã tồn tại chưa
if (Test-Path .env) {
    Write-Host "⚠️  File .env đã tồn tại!" -ForegroundColor Yellow
    $overwrite = Read-Host "Bạn có muốn ghi đè không? (y/n)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "❌ Hủy bỏ." -ForegroundColor Red
        exit
    }
}

Write-Host "📝 Đang tạo file .env..." -ForegroundColor Green

# Tạo nội dung file .env
$envContent = @"
# Firebase Configuration
# Lấy từ Firebase Console -> Project Settings -> General -> Your apps -> Web app config
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Gemini AI API Key
# Lấy từ: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=
"@

# Ghi file
$envContent | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host "✅ File .env đã được tạo!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Bước tiếp theo:" -ForegroundColor Cyan
Write-Host "1. Mở file .env bằng Notepad" -ForegroundColor White
Write-Host "2. Điền thông tin Firebase và Gemini API key" -ForegroundColor White
Write-Host "3. Lưu file" -ForegroundColor White
Write-Host ""
Write-Host "📖 Xem hướng dẫn chi tiết trong: HUONG_DAN_CAI_DAT_CHI_TIET.md" -ForegroundColor Yellow

