# 📝 Hướng dẫn Commit và Push lên GitHub

## Bước 1: Kiểm tra Git Repository

```bash
# Kiểm tra git đã được khởi tạo chưa
git status
```

Nếu chưa có git repository:
```bash
git init
git branch -M main
```

## Bước 2: Kiểm tra file .env không bị commit

```bash
git status
```

**QUAN TRỌNG:** File `.env` KHÔNG được xuất hiện trong danh sách. Nếu có, kiểm tra lại `.gitignore`.

## Bước 3: Add và Commit

```bash
# Add tất cả file (trừ .env)
git add .

# Kiểm tra lại những file sẽ được commit
git status

# Commit với message rõ ràng
git commit -m "feat: setup project với Gemini 2.5 Pro, bảo mật API keys và sẵn sàng deploy"
```

## Bước 4: Tạo Repository trên GitHub

1. Đăng nhập GitHub: https://github.com
2. Click **New repository**
3. Đặt tên: `companion-journey`
4. Chọn **Private** (khuyến nghị) hoặc **Public**
5. **KHÔNG** tích "Initialize with README" (đã có sẵn)
6. Click **Create repository**

## Bước 5: Push lên GitHub

```bash
# Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/companion-journey.git

# Push code lên GitHub
git push -u origin main
```

Nếu gặp lỗi authentication:
- Sử dụng Personal Access Token thay vì password
- Hoặc setup SSH keys

## Bước 6: Verify

1. Vào repository trên GitHub
2. Kiểm tra:
   - ✅ Tất cả file code đã được push
   - ✅ File `.env` KHÔNG có trong repository
   - ✅ File `.env.example` CÓ trong repository
   - ✅ File `HUONG_DAN_DEPLOY.md` có trong repository

## ✅ Checklist trước khi Commit

- [ ] Build thành công: `npm run build`
- [ ] Không có lỗi TypeScript: `npm run build`
- [ ] File `.env` không có trong `git status`
- [ ] File `.env.example` có trong repository
- [ ] Tất cả thay đổi đã được test

## 🚀 Sau khi Push

Tiếp tục với [HUONG_DAN_DEPLOY.md](./HUONG_DAN_DEPLOY.md) để deploy lên Cloudflare Pages.

