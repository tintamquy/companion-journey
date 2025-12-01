# 🔐 Hướng dẫn thêm Environment Variables trên Cloudflare Pages

## Cách 1: Thêm trong quá trình Setup (Màn hình hiện tại)

Trong màn hình cấu hình deploy, bạn sẽ thấy phần **"Variable"** ở phía dưới:

### Bước 1: Thêm từng biến một

1. **Variable name:** Nhập tên biến (ví dụ: `VITE_FIREBASE_API_KEY`)
2. **Variable value:** Nhập giá trị (ví dụ: `AIzaSyDHFBxiQvtFCxXmNfsXpmaRKZH2Fbhm_gQ`)
3. Click **"Add variable"** hoặc nút **"+"** để thêm biến tiếp theo

### Bước 2: Lặp lại cho tất cả biến

Thêm từng biến một theo danh sách sau:

```
1. Variable name: VITE_FIREBASE_API_KEY
   Variable value: AIzaSyDHFBxiQvtFCxXmNfsXpmaRKZH2Fbhm_gQ

2. Variable name: VITE_FIREBASE_AUTH_DOMAIN
   Variable value: companion-journey.firebaseapp.com

3. Variable name: VITE_FIREBASE_PROJECT_ID
   Variable value: companion-journey

4. Variable name: VITE_FIREBASE_STORAGE_BUCKET
   Variable value: companion-journey.firebasestorage.app

5. Variable name: VITE_FIREBASE_MESSAGING_SENDER_ID
   Variable value: 207950880826

6. Variable name: VITE_FIREBASE_APP_ID
   Variable value: 1:207950880826:web:928775fdc968ef25241503

7. Variable name: VITE_GEMINI_API_KEY
   Variable value: AIzaSyDqMRW1GuKQmYLORrD5X2VJbfwLoKqFwL4
```

### Bước 3: Deploy

Sau khi thêm xong tất cả biến, click nút **"Deploy"** màu xanh ở góc dưới bên phải.

---

## Cách 2: Thêm sau khi Deploy (Khuyến nghị)

Nếu bạn không thấy phần Variables trong màn hình setup, hoặc muốn thêm sau:

### Bước 1: Deploy project trước

1. Điền **Build command:** `npm run build`
2. Để trống phần Variables (hoặc bỏ qua)
3. Click **"Deploy"** để tạo project

### Bước 2: Thêm Environment Variables sau khi deploy

1. Vào **Cloudflare Dashboard** → **Pages**
2. Click vào project **companion-journey**
3. Vào tab **Settings** (bên trái)
4. Scroll xuống phần **Environment variables**
5. Click **"Add variable"** hoặc **"Add environment variable"**

### Bước 3: Thêm từng biến

Thêm 7 biến như danh sách ở trên.

### Bước 4: Redeploy

Sau khi thêm xong:
1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click **"Retry deployment"** hoặc **"Redeploy"**

---

## ⚠️ Lưu ý quan trọng

1. **Tên biến phải chính xác:** Bắt đầu bằng `VITE_` (ví dụ: `VITE_FIREBASE_API_KEY`)
2. **Giá trị không có khoảng trắng:** Copy chính xác từ file `.env`
3. **Encrypt:** Có thể tích vào checkbox "Encrypt" để mã hóa (khuyến nghị)
4. **Production và Preview:** Có thể set khác nhau cho Production và Preview branches

---

## ✅ Kiểm tra sau khi thêm

1. Vào **Settings** → **Environment variables**
2. Kiểm tra tất cả 7 biến đã được thêm
3. Kiểm tra deployment logs để xem biến có được load đúng không

---

## 🆘 Nếu không thấy phần Variables

1. **Scroll xuống:** Phần Variables có thể ở phía dưới, cần scroll
2. **Click "Advanced settings":** Có thể ẩn trong phần Advanced
3. **Deploy trước:** Deploy project trước, sau đó thêm trong Settings

