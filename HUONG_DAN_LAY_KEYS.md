# 🔑 Hướng dẫn lấy Firebase Config và Gemini API Key

## 📋 BƯỚC 1: Lấy Firebase Configuration

### 1.1. Tạo/Cập nhật Firebase Project

1. **Truy cập Firebase Console:**
   - Mở: https://console.firebase.google.com/
   - Đăng nhập bằng Google account

2. **Tạo Project mới (nếu chưa có):**
   - Click **"Add project"** hoặc **"Create a project"**
   - Đặt tên: `companion-journey` (hoặc tên bạn muốn)
   - Click **Continue** → **Continue** → **Create project**
   - Đợi 30 giây để Firebase tạo project

3. **Thêm Web App:**
   - Trong Firebase Console, click biểu tượng **Web** (`</>`)
   - Đặt tên app: `Companion Journey Web`
   - **KHÔNG** check "Also set up Firebase Hosting"
   - Click **"Register app"**

4. **Copy Firebase Config:**
   - Bạn sẽ thấy đoạn code như này:
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
   - **COPY** các giá trị này (không copy dấu ngoặc kép và dấu phẩy)

### 1.2. Bật Authentication

1. Trong Firebase Console, click **Authentication** (menu bên trái)
2. Click **"Get started"** (nếu lần đầu)
3. Vào tab **"Sign-in method"**
4. **Bật Email/Password:**
   - Click vào "Email/Password"
   - Bật toggle **"Enable"**
   - Click **Save**
5. **Bật Google Sign-in:**
   - Click vào "Google"
   - Bật toggle **"Enable"**
   - Chọn email support (có thể dùng email của bạn)
   - Click **Save**

### 1.3. Tạo Firestore Database

1. Trong Firebase Console, click **Firestore Database** (menu bên trái)
2. Click **"Create database"**
3. Chọn **"Start in production mode"**
4. Chọn location (ví dụ: `asia-southeast1` - Singapore)
5. Click **"Enable"**
6. Đợi 30 giây để database được tạo

### 1.4. Deploy Firestore Security Rules

1. Trong Firestore Database, click tab **"Rules"**
2. Xóa toàn bộ code mặc định
3. Mở file `firestore.rules` trong project của bạn
4. **Copy toàn bộ nội dung** từ file đó
5. **Paste** vào Rules editor trong Firebase Console
6. Click **"Publish"**

---

## 📋 BƯỚC 2: Lấy Gemini API Key

### 2.1. Truy cập Google AI Studio

1. **Mở:** https://makersuite.google.com/app/apikey
   - Hoặc: https://aistudio.google.com/app/apikey
2. **Đăng nhập** bằng Google account (cùng account với Firebase nếu có thể)

### 2.2. Tạo API Key

1. Click **"Create API Key"** hoặc **"Get API key"**
2. Chọn project:
   - Có thể chọn Firebase project vừa tạo
   - Hoặc chọn "Create API key in new project"
3. **COPY** API key hiển thị (dạng: `AIzaSyC...`)

⚠️ **LƯU Ý:** 
- Giữ bí mật API key này!
- Không chia sẻ công khai
- Free tier: 15 requests per minute (RPM)

---

## 📋 BƯỚC 3: Điền thông tin vào file .env

1. **Mở file `.env`** trong thư mục `companion-journey` bằng Notepad

2. **Điền thông tin** theo mẫu sau:

```env
# Firebase Configuration (từ bước 1.1)
VITE_FIREBASE_API_KEY=AIzaSyC... (giá trị từ apiKey)
VITE_FIREBASE_AUTH_DOMAIN=companion-journey.firebaseapp.com (giá trị từ authDomain)
VITE_FIREBASE_PROJECT_ID=companion-journey (giá trị từ projectId)
VITE_FIREBASE_STORAGE_BUCKET=companion-journey.appspot.com (giá trị từ storageBucket)
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (giá trị từ messagingSenderId)
VITE_FIREBASE_APP_ID=1:123456789:web:abc123 (giá trị từ appId)

# Gemini AI API Key (từ bước 2.2)
VITE_GEMINI_API_KEY=AIzaSyC... (API key từ Google AI Studio)
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

3. **Lưu file** (Ctrl + S)

---

## ✅ Checklist hoàn thành

- [ ] Firebase project đã tạo
- [ ] Web app đã thêm vào Firebase
- [ ] Firebase config đã copy
- [ ] Authentication đã bật (Email/Password + Google)
- [ ] Firestore Database đã tạo
- [ ] Firestore Rules đã deploy
- [ ] Gemini API key đã lấy
- [ ] File `.env` đã điền đầy đủ thông tin

---

## 🚀 Bước tiếp theo

Sau khi hoàn thành tất cả, chạy:

```powershell
npm run dev
```

Mở trình duyệt: **http://localhost:5173**

---

## 🐛 Xử lý lỗi

### Lỗi: "Firebase: Error (auth/configuration-not-found)"
- Kiểm tra lại file `.env` có đúng format không
- Đảm bảo không có khoảng trắng thừa sau dấu `=`
- Kiểm tra các giá trị đã copy đầy đủ chưa

### Lỗi: "Firebase: Error (auth/api-key-not-valid)"
- Kiểm tra lại API key trong `.env`
- Đảm bảo copy đầy đủ, không thiếu ký tự

### Lỗi: "Module not found"
- Chạy lại: `npm install`

---

## 📞 Cần giúp?

Nếu gặp vấn đề, kiểm tra:
1. File `.env` có đúng format không
2. Firebase config đã copy đầy đủ chưa
3. Console logs trong browser (F12)
4. Terminal output khi chạy `npm run dev`

