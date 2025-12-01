# 🔧 Sửa lỗi Deploy trên Cloudflare Pages

## Lỗi gặp phải:
1. **MIME type error**: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`
2. **manifest.json syntax error**: `Manifest: Line: 1, column: 1, Syntax error`
3. **onboarding.js error**: `Uncaught (in promise) undefined`

## Giải pháp:

### 1. File _headers đã được tạo
File `public/_headers` đã được tạo với MIME types đúng. Cloudflare Pages sẽ tự động nhận diện file này.

### 2. Kiểm tra trong Cloudflare Pages Dashboard:

1. Vào **Settings** → **Builds & deployments**
2. Đảm bảo **Build output directory** là `dist`
3. Kiểm tra **Build command** là `npm run build`

### 3. Nếu vẫn lỗi, thêm vào Cloudflare Pages Settings:

Vào **Settings** → **Functions** → **Headers** và thêm:

```
/assets/*.js
  Content-Type: application/javascript; charset=utf-8

/assets/*.mjs
  Content-Type: application/javascript; charset=utf-8

/assets/*.css
  Content-Type: text/css; charset=utf-8

/*.json
  Content-Type: application/json; charset=utf-8
```

### 4. Xóa cache và redeploy:

1. Vào **Deployments**
2. Click vào deployment mới nhất
3. Click **Retry deployment** hoặc **Redeploy**

### 5. Xóa service worker cũ (nếu có):

Nếu browser đã cache service worker cũ:
1. Mở DevTools (F12)
2. Vào **Application** tab
3. Click **Service Workers**
4. Click **Unregister** cho service worker cũ
5. Hard refresh (Ctrl+Shift+R)

### 6. Kiểm tra manifest.json:

File `manifest.json` đã được kiểm tra và không có BOM. Nếu vẫn lỗi:
- Vào Cloudflare Pages → **Deployments** → xem file `manifest.json` trong dist
- Đảm bảo file không có lỗi syntax

## ✅ Sau khi sửa:

1. Commit và push code mới
2. Cloudflare Pages sẽ tự động rebuild
3. Xóa browser cache và test lại
4. Kiểm tra console không còn lỗi

## 📝 Lưu ý:

- File `_headers` phải ở trong `public/` folder
- Vite sẽ tự động copy vào `dist/` khi build
- Cloudflare Pages sẽ tự động nhận diện `_headers` và `_redirects` trong dist folder

