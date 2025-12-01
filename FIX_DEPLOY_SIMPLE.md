# 🔧 Sửa Lỗi Deploy Đơn Giản - Cloudflare Pages

## ⚠️ Vấn đề:
- Web trắng màn hình khi deploy lên Cloudflare Pages
- Local chạy được nhưng deploy không chạy
- Lỗi MIME type: `application/octet-stream` thay vì `application/javascript`

## ✅ Giải pháp ĐƠN GIẢN NHẤT:

### Cách 1: Kiểm tra Cloudflare Pages Function (Tự động)

File `functions/_middleware.ts` đã được tạo. Cloudflare Pages sẽ tự động sử dụng nó.

**Kiểm tra:**
1. Vào **Cloudflare Dashboard** → **Pages** → **companion-journey**
2. Vào **Settings** → **Functions**
3. Đảm bảo **Functions** đã được **Enable**
4. Xem deployment logs để đảm bảo function được deploy

### Cách 2: Deploy Cloudflare Worker (Nếu Function không hoạt động)

1. **Cài đặt Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login:**
   ```bash
   wrangler login
   ```

3. **Deploy Worker:**
   ```bash
   wrangler deploy
   ```

4. **Route traffic qua Worker:**
   - Vào Cloudflare Dashboard → Workers & Pages
   - Add route: `companion-journey.pages.dev/*` → Worker

### Cách 3: Liên hệ Cloudflare Support (Nhanh nhất)

Nếu không thể tự fix, liên hệ Cloudflare Support:
1. Vào **Support** trong Cloudflare Dashboard
2. Tạo ticket yêu cầu set MIME types cho Pages
3. Cung cấp domain: `companion-journey.pages.dev`
4. Yêu cầu set headers:
   - `/assets/*.js` → `Content-Type: application/javascript; charset=utf-8`
   - `/assets/*.mjs` → `Content-Type: application/javascript; charset=utf-8`
   - `/assets/*.css` → `Content-Type: text/css; charset=utf-8`
   - `/*.json` → `Content-Type: application/json; charset=utf-8`

## 🧪 Test Local:

1. **Build:**
   ```bash
   npm run build
   ```

2. **Preview:**
   ```bash
   npm run preview
   ```

3. **Kiểm tra:**
   - Mở http://localhost:4173
   - Mở DevTools → Network
   - Xem file `.js` có `Content-Type` đúng không

## 📝 Kiểm tra sau khi deploy:

1. Xóa browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Mở DevTools (F12) → Console
4. Xem có lỗi gì không
5. Network tab → xem file `.js` có load được không

## ⚡ Nếu vẫn lỗi:

Có thể vấn đề không phải MIME type mà là:
- Routing issue (SPA routing)
- Environment variables chưa được set
- Firebase config chưa đúng

Kiểm tra Console logs để xem lỗi cụ thể.

