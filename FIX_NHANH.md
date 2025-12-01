# ⚡ Sửa Lỗi MIME Type NHANH - Cloudflare Pages

## 🔴 Vấn đề:
Lỗi: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

## ✅ Giải pháp NHANH NHẤT:

### Cách 1: Dùng Cloudflare Transform Rules (2 phút)

1. **Vào Cloudflare Dashboard:**
   - https://dash.cloudflare.com/
   - Chọn domain `companion-journey.pages.dev` (hoặc vào Pages → companion-journey)

2. **Vào Rules → Transform Rules → Modify Response Header**

3. **Tạo 4 rules sau:**

   **Rule 1: JavaScript files**
   - Name: `Fix JS MIME Type`
   - When: `(http.request.uri.path matches "^/assets/.*\\.js$")`
   - Then: `Set static` → Header name: `Content-Type` → Value: `application/javascript; charset=utf-8`

   **Rule 2: MJS files**
   - Name: `Fix MJS MIME Type`
   - When: `(http.request.uri.path matches "^/assets/.*\\.mjs$")`
   - Then: `Set static` → Header name: `Content-Type` → Value: `application/javascript; charset=utf-8`

   **Rule 3: CSS files**
   - Name: `Fix CSS MIME Type`
   - When: `(http.request.uri.path matches "^/assets/.*\\.css$")`
   - Then: `Set static` → Header name: `Content-Type` → Value: `text/css; charset=utf-8`

   **Rule 4: JSON files**
   - Name: `Fix JSON MIME Type`
   - When: `(http.request.uri.path matches ".*\\.json$")`
   - Then: `Set static` → Header name: `Content-Type` → Value: `application/json; charset=utf-8`

4. **Save và test lại!**

### Cách 2: Dùng Cloudflare Pages Functions (Tự động)

File `functions/_middleware.ts` đã được tạo. Cloudflare Pages sẽ tự động sử dụng nó.

**Nếu không hoạt động:**
1. Vào **Pages** → **companion-journey** → **Settings** → **Functions**
2. Đảm bảo Functions đã được enable
3. Redeploy project

### Cách 3: Kiểm tra và Clear Cache

1. **Xóa browser cache:**
   - Ctrl+Shift+Delete → Clear all
   - Hoặc Incognito mode

2. **Xóa Cloudflare cache:**
   - Vào **Caching** → **Configuration** → **Purge Everything**

3. **Redeploy:**
   - Vào **Pages** → **Deployments** → **Retry deployment**

## 🧪 Test sau khi sửa:

1. Mở DevTools (F12) → **Network** tab
2. Reload page (Ctrl+Shift+R)
3. Click vào file `.js` bất kỳ
4. Xem **Response Headers** → `Content-Type` phải là `application/javascript`

## ✅ Nếu vẫn lỗi:

1. Kiểm tra file `dist/_headers` có trong deployment không
2. Thử cách 1 (Transform Rules) - cách này chắc chắn hoạt động
3. Liên hệ Cloudflare support nếu cần

