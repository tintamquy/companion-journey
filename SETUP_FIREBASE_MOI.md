# ✅ Đã cập nhật Firebase Config mới

## ✅ Thông tin Firebase Project mới

- **Project ID:** `khongthudam-b262d`
- **Auth Domain:** `khongthudam-b262d.firebaseapp.com`
- **API Key:** Đã cập nhật trong `.env`
- **Firebase SDK:** Đã cài (firebase@10.14.1)

## 📋 Bước tiếp theo - Setup Firebase Console

### 1. Bật Authentication

1. Truy cập: https://console.firebase.google.com/
2. Chọn project: **khongthudam-b262d**
3. Vào **Authentication** (menu bên trái)
4. Click **"Get started"** (nếu lần đầu)
5. Vào tab **"Sign-in method"**
6. **Bật Email/Password:**
   - Click vào "Email/Password"
   - Bật toggle **"Enable"**
   - Click **Save**
7. **Bật Google Sign-in:**
   - Click vào "Google"
   - Bật toggle **"Enable"**
   - Chọn email support (có thể dùng email của bạn)
   - Click **Save**

### 2. Tạo Firestore Database

1. Trong Firebase Console, click **Firestore Database** (menu bên trái)
2. Click **"Create database"**
3. Chọn **"Start in production mode"** (hoặc test mode nếu chỉ test)
4. Chọn location (ví dụ: `asia-southeast1` - Singapore)
5. Click **"Enable"**
6. Đợi 30 giây để database được tạo

### 3. Deploy Firestore Security Rules

1. Trong Firestore Database, click tab **"Rules"**
2. Xóa toàn bộ code mặc định
3. Mở file `firestore.rules` trong project (D:\Projects\companion-journey\firestore.rules)
4. **Copy toàn bộ nội dung** từ file đó
5. **Paste** vào Rules editor trong Firebase Console
6. Click **"Publish"**

Nội dung Rules sẽ như này:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /checkins/{checkinId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /badges/{badgeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /aiCache/{cacheKey} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    match /groups/{groupId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.members;
      allow write: if request.auth != null && request.auth.uid in resource.data.members;
    }
  }
}
```

### 4. Lấy Gemini API Key (Nếu chưa có)

1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập → **Create API Key**
3. Copy API key
4. Mở file `.env` và điền vào:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

## 🚀 Test ứng dụng

Sau khi hoàn thành các bước trên:

```powershell
cd D:\Projects\companion-journey
npm run dev
```

Mở trình duyệt: **http://localhost:5173**

## ✅ Checklist

- [x] File `.env` đã cập nhật với Firebase config mới
- [x] Firebase SDK đã cài
- [ ] Authentication đã bật (Email/Password + Google)
- [ ] Firestore Database đã tạo
- [ ] Firestore Rules đã deploy
- [ ] Gemini API key đã lấy và điền vào `.env` (nếu cần)
- [ ] Đã test `npm run dev` thành công

## 🎯 Sau khi setup xong

1. Test đăng ký tài khoản mới
2. Test đăng nhập bằng email/password
3. Test đăng nhập bằng Google
4. Kiểm tra Firestore có tạo user profile không

---

**Lưu ý:** Code đã sẵn sàng, chỉ cần setup trong Firebase Console là có thể chạy được!

