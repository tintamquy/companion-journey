# 🔍 Kiểm Tra Cloudflare Pages - Sửa Lỗi Trắng Màn Hình

## ⚠️ Vấn đề:
- Web trắng màn hình trên Cloudflare Pages
- Local chạy được nhưng deploy không chạy
- Lỗi MIME type

## ✅ Bước 1: Kiểm tra Cloudflare Pages Function

### Cách vào:
1. Truy cập: **https://dash.cloudflare.com/**
2. Click **Pages** (menu bên trái)
3. Click vào project **companion-journey**
4. Click tab **Settings**
5. Scroll xuống phần **Functions**

### Kiểm tra:
- ✅ **Functions** phải được **Enable**
- ✅ Xem có file `functions/_middleware.ts` trong deployment không

### Nếu Functions chưa enable:
1. Click **Enable Functions**
2. Save
3. Vào **Deployments** → **Retry deployment**

## ✅ Bước 2: Kiểm tra Environment Variables

1. Vào **Settings** → **Environment variables**
2. Đảm bảo có đầy đủ các biến:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GEMINI_API_KEY`

## ✅ Bước 3: Kiểm tra Build Logs

1. Vào **Deployments**
2. Click vào deployment mới nhất
3. Xem **Build logs**
4. Kiểm tra:
   - Build có thành công không?
   - Có lỗi gì không?
   - File `functions/_middleware.ts` có được deploy không?

## ✅ Bước 4: Test trong Browser

1. Mở **DevTools** (F12)
2. Vào tab **Console**
3. Xem có lỗi gì không
4. Vào tab **Network**
5. Reload page (Ctrl+Shift+R)
6. Xem các file `.js` có load được không
7. Click vào file `.js` → xem **Response Headers** → `Content-Type`

## 🔧 Nếu vẫn lỗi MIME type:

### Giải pháp: Liên hệ Cloudflare Support

1. Vào **Support** trong Cloudflare Dashboard
2. Tạo ticket với nội dung:

```
Subject: Fix MIME types for Cloudflare Pages deployment

Hi Cloudflare Support,

I'm deploying a React SPA to Cloudflare Pages (companion-journey.pages.dev) 
and encountering MIME type issues. JavaScript files are being served with 
Content-Type: application/octet-stream instead of application/javascript.

Could you please set the correct Content-Type headers for:
- /assets/*.js → application/javascript; charset=utf-8
- /assets/*.mjs → application/javascript; charset=utf-8
- /assets/*.css → text/css; charset=utf-8
- /*.json → application/json; charset=utf-8

Project: companion-journey
Domain: companion-journey.pages.dev

Thank you!
```

## 🧪 Test Local Build:

```bash
npm run build
npm run preview
```

Mở http://localhost:4173 và kiểm tra xem có chạy được không.

## 📝 Checklist:

- [ ] Functions đã được enable trong Cloudflare Pages
- [ ] Environment variables đã được set đầy đủ
- [ ] Build logs không có lỗi
- [ ] File `functions/_middleware.ts` có trong deployment
- [ ] Browser console không có lỗi nghiêm trọng
- [ ] Network tab - file .js có Content-Type đúng

## ⚡ Nếu tất cả đều OK nhưng vẫn trắng:

Có thể vấn đề không phải MIME type mà là:
1. **Routing issue** - Kiểm tra `_redirects` file
2. **Environment variables** - Kiểm tra console logs
3. **Firebase config** - Kiểm tra Firebase console
4. **JavaScript error** - Xem console logs chi tiết

