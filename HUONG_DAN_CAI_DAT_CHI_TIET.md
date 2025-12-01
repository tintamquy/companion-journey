# 🔧 Hướng dẫn cài đặt chi tiết - Companion Journey

## BƯỚC 1: Cài đặt Node.js (BẮT BUỘC)

### Cách 1: Tải từ website (Khuyến nghị)
1. Truy cập: **https://nodejs.org/**
2. Tải phiên bản **LTS** (Long Term Support) - khuyến nghị
3. Chạy file installer (.msi cho Windows)
4. Next → Next → Install
5. Sau khi cài xong, **KHỞI ĐỘNG LẠI PowerShell/Terminal**

### Cách 2: Sử dụng Chocolatey (nếu đã có)
```powershell
choco install nodejs-lts
```

### Kiểm tra cài đặt thành công:
Mở PowerShell mới và chạy:
```powershell
node --version
npm --version
```
Nếu hiển thị số phiên bản (ví dụ: v20.10.0) → ✅ Thành công!

---

## BƯỚC 2: Cài đặt Dependencies

Sau khi cài Node.js xong, mở PowerShell trong thư mục `companion-journey` và chạy:

```powershell
npm install
```

Quá trình này sẽ mất 2-5 phút. Đợi đến khi thấy:
```
added 500+ packages, and audited 501 packages in 2m
```

---

## BƯỚC 3: Lấy Firebase Configuration

### 3.1. Tạo Firebase Project

1. Truy cập: **https://console.firebase.google.com/**
2. Đăng nhập bằng Google account
3. Click **"Add project"** hoặc **"Create a project"**
4. Đặt tên project (ví dụ: "companion-journey")
5. Click **Continue** → **Continue** → **Create project**
6. Đợi Firebase tạo project (30 giây)

### 3.2. Thêm Web App

1. Trong Firebase Console, click biểu tượng **Web** (`</>`)
2. Đặt tên app (ví dụ: "Companion Journey Web")
3. **KHÔNG** check "Also set up Firebase Hosting" (bỏ qua)
4. Click **"Register app"**
5. **COPY** đoạn code config hiển thị, ví dụ:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "companion-journey.firebaseapp.com",
  projectId: "companion-journey",
  storageBucket: "companion-journey.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3.3. Bật Authentication

1. Trong Firebase Console, vào **Authentication** (menu bên trái)
2. Click **"Get started"**
3. Vào tab **"Sign-in method"**
4. Bật **Email/Password**:
   - Click vào "Email/Password"
   - Bật toggle "Enable"
   - Click **Save**
5. Bật **Google Sign-in**:
   - Click vào "Google"
   - Bật toggle "Enable"
   - Chọn email support (có thể dùng email của bạn)
   - Click **Save**

### 3.4. Tạo Firestore Database

1. Trong Firebase Console, vào **Firestore Database** (menu bên trái)
2. Click **"Create database"**
3. Chọn **"Start in production mode"** (hoặc test mode nếu chỉ test)
4. Chọn location (chọn gần bạn nhất, ví dụ: `asia-southeast1`)
5. Click **"Enable"**
6. Đợi database được tạo (30 giây)

### 3.5. Deploy Firestore Security Rules

1. Trong Firestore Database, click tab **"Rules"**
2. Xóa code mặc định
3. Copy toàn bộ nội dung từ file `firestore.rules` trong project
4. Paste vào Rules editor
5. Click **"Publish"**

---

## BƯỚC 4: Lấy Gemini API Key

### 4.1. Truy cập Google AI Studio

1. Truy cập: **https://makersuite.google.com/app/apikey**
   - Hoặc: **https://aistudio.google.com/app/apikey**
2. Đăng nhập bằng Google account (cùng account với Firebase nếu có thể)

### 4.2. Tạo API Key

1. Click **"Create API Key"** hoặc **"Get API key"**
2. Chọn project (có thể chọn Firebase project vừa tạo)
3. Click **"Create API key in new project"** hoặc chọn project có sẵn
4. **COPY** API key hiển thị (dạng: `AIzaSyC...`)

⚠️ **LƯU Ý**: Giữ bí mật API key này! Không chia sẻ công khai.

### 4.3. Kiểm tra Quota (Tùy chọn)

1. Vào: **https://aistudio.google.com/app/apikey**
2. Click vào API key vừa tạo
3. Kiểm tra quota: Free tier có **15 requests per minute (RPM)**

---

## BƯỚC 5: Tạo file .env

1. Trong thư mục `companion-journey`, tạo file mới tên: **`.env`**
   - (Không có tên file, chỉ có extension `.env`)

2. Copy nội dung sau và điền thông tin:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC... (từ firebaseConfig.apiKey)
VITE_FIREBASE_AUTH_DOMAIN=companion-journey.firebaseapp.com (từ firebaseConfig.authDomain)
VITE_FIREBASE_PROJECT_ID=companion-journey (từ firebaseConfig.projectId)
VITE_FIREBASE_STORAGE_BUCKET=companion-journey.appspot.com (từ firebaseConfig.storageBucket)
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (từ firebaseConfig.messagingSenderId)
VITE_FIREBASE_APP_ID=1:123456789:web:abc123 (từ firebaseConfig.appId)

# Gemini AI API Key
VITE_GEMINI_API_KEY=AIzaSyC... (từ Google AI Studio)
```

### Ví dụ file .env hoàn chỉnh:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=companion-journey.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=companion-journey
VITE_FIREBASE_STORAGE_BUCKET=companion-journey.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_GEMINI_API_KEY=AIzaSyC0987654321zyxwvutsrqponmlkj
```

---

## BƯỚC 6: Chạy ứng dụng

Sau khi hoàn thành tất cả các bước trên:

```powershell
npm run dev
```

Bạn sẽ thấy:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Mở trình duyệt và truy cập: **http://localhost:5173**

---

## ✅ Checklist hoàn thành

- [ ] Node.js đã cài đặt (`node --version` hiển thị số)
- [ ] Dependencies đã cài (`npm install` thành công)
- [ ] Firebase project đã tạo
- [ ] Web app đã thêm vào Firebase
- [ ] Authentication đã bật (Email/Password + Google)
- [ ] Firestore Database đã tạo
- [ ] Firestore Rules đã deploy
- [ ] Gemini API key đã lấy
- [ ] File `.env` đã tạo và điền đầy đủ
- [ ] Ứng dụng chạy được (`npm run dev`)

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "npm is not recognized"
**Giải pháp**: 
- Cài Node.js từ nodejs.org
- **KHỞI ĐỘNG LẠI PowerShell** sau khi cài

### Lỗi: "Firebase: Error (auth/configuration-not-found)"
**Giải pháp**: 
- Kiểm tra lại file `.env` có đúng format không
- Đảm bảo không có khoảng trắng thừa
- Kiểm tra các giá trị đã copy đầy đủ chưa

### Lỗi: "Firebase: Error (auth/api-key-not-valid)"
**Giải pháp**: 
- Kiểm tra lại API key trong `.env`
- Đảm bảo copy đầy đủ, không thiếu ký tự

### Lỗi: "Module not found"
**Giải pháp**: 
- Chạy lại `npm install`
- Xóa `node_modules` và `package-lock.json`, sau đó `npm install` lại

### Lỗi: "Port 5173 already in use"
**Giải pháp**: 
- Đóng ứng dụng khác đang dùng port 5173
- Hoặc thay đổi port trong `vite.config.ts`

---

## 📞 Cần hỗ trợ?

Nếu gặp vấn đề:
1. Kiểm tra lại từng bước trong checklist
2. Xem console logs trong browser (F12)
3. Xem terminal output khi chạy `npm run dev`

---

## 🎯 Sau khi setup xong

1. Test đăng ký tài khoản mới
2. Test đăng nhập
3. Test Google Sign-in
4. Test chuyển đổi ngôn ngữ
5. Kiểm tra mobile responsive

Chúc bạn thành công! 🚀

