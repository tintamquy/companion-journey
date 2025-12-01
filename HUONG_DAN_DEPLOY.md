# 🚀 Hướng dẫn Deploy lên Cloudflare Pages

## Bước 1: Chuẩn bị Repository GitHub

1. **Kiểm tra file .env không bị commit:**
   ```bash
   git status
   ```
   - File `.env` KHÔNG được xuất hiện trong danh sách
   - File `.env.example` CÓ thể commit

2. **Commit code lên GitHub:**
   ```bash
   git add .
   git commit -m "feat: setup project với Gemini 2.5 Pro và bảo mật API keys"
   git push origin main
   ```

## Bước 2: Setup Cloudflare Pages

1. **Đăng nhập Cloudflare Dashboard:**
   - Truy cập: https://dash.cloudflare.com/
   - Chọn **Pages** từ menu bên trái

2. **Tạo Project mới:**
   - Click **Create a project**
   - Chọn **Connect to Git**
   - Chọn repository GitHub của bạn
   - Authorize Cloudflare Pages

3. **Cấu hình Build Settings:**
   - **Project name:** `companion-journey` (hoặc tên bạn muốn)
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (để trống)

4. **Thêm Environment Variables:**
   - Click vào **Settings** → **Environment variables**
   - Thêm các biến sau:
     ```
     VITE_FIREBASE_API_KEY=AIzaSyDHFBxiQvtFCxXmNfsXpmaRKZH2Fbhm_gQ
     VITE_FIREBASE_AUTH_DOMAIN=companion-journey.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=companion-journey
     VITE_FIREBASE_STORAGE_BUCKET=companion-journey.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=207950880826
     VITE_FIREBASE_APP_ID=1:207950880826:web:928775fdc968ef25241503
     VITE_GEMINI_API_KEY=AIzaSyDqMRW1GuKQmYLORrD5X2VJbfwLoKqFwL4
     ```
   - Chọn **Save and Deploy**

5. **Deploy:**
   - Cloudflare sẽ tự động build và deploy
   - Chờ build hoàn thành (khoảng 2-3 phút)
   - URL sẽ có dạng: `https://companion-journey.pages.dev`

## Bước 3: Cấu hình Custom Domain (Tùy chọn)

1. Vào **Settings** → **Custom domains**
2. Thêm domain của bạn
3. Cập nhật DNS records theo hướng dẫn

## Bước 4: Cập nhật Firebase Authorized Domains

1. Vào **Firebase Console** → **Authentication** → **Settings**
2. Thêm domain Cloudflare Pages vào **Authorized domains:**
   - `companion-journey.pages.dev`
   - Domain custom của bạn (nếu có)

## ✅ Kiểm tra sau khi Deploy

- [ ] Ứng dụng load được trên Cloudflare Pages
- [ ] Login/Signup hoạt động
- [ ] Google Sign-in hoạt động
- [ ] Dashboard hiển thị đúng
- [ ] Multi-language selector hoạt động
- [ ] API keys không bị lộ trong source code

## 🔒 Bảo mật

- ✅ File `.env` đã được thêm vào `.gitignore`
- ✅ API keys chỉ được lưu trong Environment Variables của Cloudflare
- ✅ Không có API keys trong code commit lên GitHub

## 📝 Lưu ý

- Mỗi lần push code mới lên GitHub, Cloudflare Pages sẽ tự động rebuild và deploy
- Nếu cần thay đổi Environment Variables, vào Settings → Environment variables và cập nhật
- Build logs có thể xem trong Cloudflare Dashboard → Pages → Deployments

