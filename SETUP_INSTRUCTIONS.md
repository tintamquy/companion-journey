# Hướng dẫn cài đặt Companion Journey

## Bước 1: Cài đặt Node.js

Nếu bạn chưa có Node.js:

1. Truy cập https://nodejs.org/
2. Tải và cài đặt phiên bản LTS (khuyến nghị)
3. Mở PowerShell/Terminal và kiểm tra:
   ```bash
   node --version
   npm --version
   ```

## Bước 2: Cài đặt Dependencies

Mở terminal trong thư mục `companion-journey` và chạy:

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả các package cần thiết.

## Bước 3: Tạo Firebase Project

1. Truy cập https://console.firebase.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Thêm Web App:
   - Click vào biểu tượng Web (</>)
   - Đặt tên app
   - Copy thông tin config

## Bước 4: Cấu hình Firebase

### Authentication:
1. Vào Authentication → Sign-in method
2. Bật Email/Password
3. Bật Google Sign-in provider

### Firestore:
1. Vào Firestore Database
2. Tạo database (chế độ production hoặc test mode)
3. Vào tab Rules
4. Copy nội dung từ file `firestore.rules` vào đây
5. Publish

## Bước 5: Lấy Gemini API Key

1. Truy cập https://makersuite.google.com/app/apikey
2. Đăng nhập với Google account
3. Tạo API key mới
4. Copy API key

## Bước 6: Tạo file .env

1. Trong thư mục `companion-journey`, tạo file `.env`
2. Copy nội dung từ `.env.example`
3. Điền thông tin:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_key_here
```

## Bước 7: Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt và truy cập: http://localhost:5173

## Kiểm tra

- [ ] Node.js đã cài đặt
- [ ] Dependencies đã cài đặt (`npm install` thành công)
- [ ] Firebase project đã tạo
- [ ] Authentication đã bật (Email/Password + Google)
- [ ] Firestore đã tạo và rules đã deploy
- [ ] File `.env` đã tạo và điền đầy đủ
- [ ] Ứng dụng chạy được (`npm run dev`)

## Gặp vấn đề?

- **Lỗi "npm not found"**: Cài đặt Node.js lại
- **Lỗi Firebase**: Kiểm tra lại config trong `.env`
- **Lỗi Gemini API**: Kiểm tra API key và quota
- **Lỗi build**: Xóa `node_modules` và chạy `npm install` lại

