# ⚡ Tóm tắt nhanh - Setup Companion Journey

## 🚀 3 Bước chính

### 1️⃣ Cài Node.js
- Truy cập: **https://nodejs.org/**
- Tải phiên bản **LTS** và cài đặt
- **KHỞI ĐỘNG LẠI PowerShell** sau khi cài

### 2️⃣ Cài Dependencies
```powershell
cd companion-journey
npm install
```

### 3️⃣ Lấy Keys và tạo file .env

#### A. Firebase Config:
1. Vào: **https://console.firebase.google.com/**
2. Tạo project mới
3. Thêm Web app → Copy config
4. Bật Authentication (Email/Password + Google)
5. Tạo Firestore Database
6. Deploy Rules từ file `firestore.rules`

#### B. Gemini API Key:
1. Vào: **https://makersuite.google.com/app/apikey**
2. Tạo API key mới
3. Copy API key

#### C. Tạo file .env:
- Copy file `.env.example` thành `.env`
- Điền thông tin Firebase và Gemini API key

### 4️⃣ Chạy ứng dụng
```powershell
npm run dev
```

---

## 📚 Tài liệu chi tiết

- **HUONG_DAN_CAI_DAT_CHI_TIET.md** - Hướng dẫn từng bước đầy đủ
- **TAO_FILE_ENV.md** - Cách tạo file .env
- **SETUP_INSTRUCTIONS.md** - Hướng dẫn tổng quan

---

## ✅ Checklist

- [ ] Node.js đã cài (`node --version`)
- [ ] `npm install` thành công
- [ ] Firebase project đã tạo
- [ ] Authentication đã bật
- [ ] Firestore đã tạo + Rules đã deploy
- [ ] Gemini API key đã lấy
- [ ] File `.env` đã tạo và điền đầy đủ
- [ ] `npm run dev` chạy thành công

---

## 🆘 Cần giúp?

Xem **HUONG_DAN_CAI_DAT_CHI_TIET.md** để biết chi tiết từng bước!

