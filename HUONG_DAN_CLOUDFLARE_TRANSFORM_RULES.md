# 📍 Hướng dẫn Vào ĐÚNG Chỗ - Cloudflare Transform Rules

## ⚠️ QUAN TRỌNG:
- **Transform Rules** là tính năng của **CLOUDFLARE**, KHÔNG phải Firebase
- Bạn đang deploy lên **Cloudflare Pages** (companion-journey.pages.dev)
- Cần vào **Cloudflare Dashboard**, không phải Firebase Console

## 🚀 Cách Vào Cloudflare Dashboard:

### Bước 1: Đăng nhập Cloudflare
1. Truy cập: **https://dash.cloudflare.com/**
2. Đăng nhập bằng tài khoản Cloudflare của bạn

### Bước 2: Tìm Domain hoặc Pages Project

**Cách A: Qua Pages (Dễ nhất)**
1. Trong menu bên trái, click **Pages**
2. Tìm và click vào project **companion-journey**
3. Click tab **Custom domains** hoặc xem domain: `companion-journey.pages.dev`
4. Click vào domain đó để vào domain settings

**Cách B: Qua Domains**
1. Trong menu bên trái, click **Websites** (hoặc **Domains**)
2. Tìm domain `companion-journey.pages.dev` (nếu có)
3. Hoặc tìm domain chính của bạn (nếu đã add custom domain)

### Bước 3: Vào Transform Rules
1. Sau khi vào domain, click tab **Rules** ở menu trên
2. Click **Transform Rules**
3. Click **Modify Response Header**
4. Click **Create rule**

### Bước 4: Tạo Rule

**Rule 1: Fix JavaScript files**
- **Rule name**: `Fix JS MIME Type`
- **When incoming requests match**: 
  - Field: `URI Path`
  - Operator: `matches regex`
  - Value: `^/assets/.*\.js$`
- **Then**: 
  - Action: `Set static`
  - Header name: `Content-Type`
  - Value: `application/javascript; charset=utf-8`
- Click **Deploy**

**Rule 2: Fix MJS files**
- **Rule name**: `Fix MJS MIME Type`
- **When**: URI Path matches regex `^/assets/.*\.mjs$`
- **Then**: Set header `Content-Type` = `application/javascript; charset=utf-8`

**Rule 3: Fix CSS files**
- **Rule name**: `Fix CSS MIME Type`
- **When**: URI Path matches regex `^/assets/.*\.css$`
- **Then**: Set header `Content-Type` = `text/css; charset=utf-8`

**Rule 4: Fix JSON files**
- **Rule name**: `Fix JSON MIME Type`
- **When**: URI Path matches regex `.*\.json$`
- **Then**: Set header `Content-Type` = `application/json; charset=utf-8`

## 🔄 Nếu Không Thấy Transform Rules:

### Lý do có thể:
1. **Bạn đang ở Pages, chưa vào domain settings**
   - Pages không có Transform Rules trực tiếp
   - Cần vào domain settings của `companion-journey.pages.dev`

2. **Domain chưa được add vào Cloudflare**
   - `companion-journey.pages.dev` là subdomain của Cloudflare
   - Có thể cần add domain chính vào Cloudflare trước

### Giải pháp thay thế: Dùng Cloudflare Pages Functions

File `functions/_middleware.ts` đã được tạo và commit. Cloudflare Pages sẽ tự động sử dụng nó sau khi deploy.

**Kiểm tra:**
1. Vào **Pages** → **companion-journey** → **Settings** → **Functions**
2. Đảm bảo Functions đã được enable
3. Xem deployment logs để đảm bảo function được deploy

## ✅ Cách Đơn Giản Nhất:

**Đợi Cloudflare Pages Function tự động chạy:**
- File `functions/_middleware.ts` đã được tạo
- Sau khi Cloudflare Pages deploy lại (2-3 phút), function sẽ tự động fix MIME type
- Không cần làm gì thêm!

## 🧪 Test:
1. Đợi 2-3 phút sau khi push code
2. Xóa browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R)
4. Mở DevTools → Network → xem file .js có Content-Type đúng không

