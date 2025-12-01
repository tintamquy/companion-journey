# 🔧 Hướng dẫn Sửa Lỗi MIME Type trên Cloudflare Pages

## Vấn đề:
Lỗi: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

## Giải pháp 1: Cấu hình trong Cloudflare Pages Dashboard (KHUYẾN NGHỊ)

### Bước 1: Vào Cloudflare Pages Dashboard
1. Đăng nhập: https://dash.cloudflare.com/
2. Chọn **Pages** → chọn project **companion-journey**
3. Vào **Settings** → **Functions**

### Bước 2: Thêm Headers trong Functions
1. Tạo file mới: `functions/_headers.ts` (hoặc trong Functions tab)
2. Hoặc vào **Settings** → **Headers** và thêm:

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

### Bước 3: Hoặc dùng Transform Rules
1. Vào **Rules** → **Transform Rules** → **Modify Response Header**
2. Thêm rule:
   - **URL matches**: `/assets/*.js`
   - **Set header**: `Content-Type` = `application/javascript; charset=utf-8`
3. Lặp lại cho `.mjs`, `.css`, `.json`

## Giải pháp 2: Sử dụng Cloudflare Workers (Nếu có)

Tạo file `functions/_middleware.ts`:

```typescript
export async function onRequest(context: EventContext<any, any, any>) {
  const response = await context.next()
  
  // Set correct MIME types
  const url = new URL(context.request.url)
  
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.mjs')) {
    response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
  } else if (url.pathname.endsWith('.css')) {
    response.headers.set('Content-Type', 'text/css; charset=utf-8')
  } else if (url.pathname.endsWith('.json')) {
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
  }
  
  return response
}
```

## Giải pháp 3: Kiểm tra file _headers trong dist

1. Sau khi build, kiểm tra file `dist/_headers` có tồn tại không
2. Đảm bảo format đúng (không có BOM, line endings đúng)
3. File phải ở root của dist folder

## Giải pháp 4: Xóa cache và redeploy

1. Vào **Deployments**
2. Click **Retry deployment** hoặc **Redeploy**
3. Xóa browser cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+Shift+R)

## ✅ Kiểm tra sau khi sửa:

1. Mở DevTools (F12) → Network tab
2. Reload page
3. Kiểm tra các file `.js` trong Network tab
4. Xem Response Headers → `Content-Type` phải là `application/javascript`

## 📝 Lưu ý:

- Cloudflare Pages có thể không tự động apply file `_headers`
- Cách tốt nhất là dùng Transform Rules hoặc Functions
- File `_headers` trong dist chỉ là backup, Cloudflare có thể không đọc

