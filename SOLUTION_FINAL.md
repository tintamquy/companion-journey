# 🔧 Giải Pháp CUỐI CÙNG - Fix MIME Type trên Cloudflare Pages

## ⚠️ Vấn đề:
Cloudflare Pages không tự động apply file `_headers`. Cần cấu hình thủ công.

## ✅ Giải pháp CHẮC CHẮN - Dùng Cloudflare Dashboard:

### Bước 1: Vào Cloudflare Dashboard
1. Truy cập: **https://dash.cloudflare.com/**
2. Đăng nhập
3. Click **Pages** (menu bên trái)
4. Click vào project **companion-journey**

### Bước 2: Vào Settings → Functions
1. Trong project, click tab **Settings**
2. Scroll xuống phần **Functions**
3. Đảm bảo **Functions** đã được **Enable**

### Bước 3: Kiểm tra Function đã deploy
1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Xem **Build logs** → tìm "Functions" hoặc "_middleware"
4. Nếu không thấy, function chưa được deploy

### Bước 4: Nếu Function không hoạt động - Dùng Transform Rules

**Cách vào Transform Rules:**
1. Trong Cloudflare Dashboard, click **Websites** (hoặc **Domains**)
2. Tìm domain của bạn (nếu có custom domain)
3. Hoặc vào **Pages** → **companion-journey** → **Custom domains**
4. Click vào domain → vào domain settings
5. Click tab **Rules** → **Transform Rules** → **Modify Response Header**

**Tạo Rules:**
- Rule 1: Path matches `^/assets/.*\.js$` → Set `Content-Type` = `application/javascript; charset=utf-8`
- Rule 2: Path matches `^/assets/.*\.mjs$` → Set `Content-Type` = `application/javascript; charset=utf-8`
- Rule 3: Path matches `^/assets/.*\.css$` → Set `Content-Type` = `text/css; charset=utf-8`
- Rule 4: Path matches `.*\.json$` → Set `Content-Type` = `application/json; charset=utf-8`

## 🔄 Giải pháp THAY THẾ - Sửa trong Cloudflare Pages Settings:

### Option 1: Dùng Cloudflare Workers (Nếu có)
Tạo Worker với code:
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const url = new URL(request.url)
  
  const newResponse = new Response(response.body, response)
  
  if (url.pathname.match(/\.(js|mjs)$/)) {
    newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8')
  } else if (url.pathname.endsWith('.css')) {
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8')
  } else if (url.pathname.endsWith('.json')) {
    newResponse.headers.set('Content-Type', 'application/json; charset=utf-8')
  }
  
  return newResponse
}
```

### Option 2: Liên hệ Cloudflare Support
Nếu không thể tự fix, liên hệ Cloudflare support để họ set headers cho bạn.

## 📝 Kiểm tra sau khi sửa:

1. Xóa browser cache hoàn toàn (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Mở DevTools (F12) → Network tab
4. Reload page
5. Click vào file `.js` bất kỳ
6. Xem **Response Headers** → `Content-Type` phải là `application/javascript`

## ⚡ Cách NHANH NHẤT:

**Đợi Cloudflare Pages Function tự động chạy:**
- File `functions/_middleware.ts` đã được tạo
- Sau khi Cloudflare deploy lại (2-3 phút), function sẽ tự động fix
- Nếu không hoạt động, dùng Transform Rules (cách trên)

