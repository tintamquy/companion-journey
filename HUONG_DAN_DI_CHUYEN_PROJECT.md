# 📦 Hướng dẫn di chuyển project sang ổ D

## Cách 1: Copy toàn bộ folder (Khuyến nghị)

### Bước 1: Tạo thư mục mới trên ổ D

1. Mở **File Explorer**
2. Vào **Ổ D:** (D:\)
3. Tạo thư mục mới: `Projects` hoặc `Development` (tùy bạn)
4. Ví dụ: `D:\Projects\`

### Bước 2: Copy folder companion-journey

1. Mở File Explorer
2. Đi đến: `C:\Users\PC\Desktop\DinhLeGroup-Website\companion-journey`
3. **Right-click** vào folder `companion-journey`
4. Chọn **Copy** (hoặc Ctrl + C)
5. Vào thư mục mới trên ổ D (ví dụ: `D:\Projects\`)
6. **Right-click** → **Paste** (hoặc Ctrl + V)
7. Đợi copy xong (có thể mất vài phút)

### Bước 3: Mở PowerShell trong thư mục mới

1. Mở File Explorer
2. Đi đến: `D:\Projects\companion-journey` (hoặc đường dẫn bạn đã copy)
3. **Right-click** vào khoảng trống trong folder
4. Chọn **"Open in Terminal"** hoặc **"Open PowerShell window here"**

### Bước 4: Kiểm tra và cài lại dependencies (nếu cần)

```powershell
# Kiểm tra node_modules có đầy đủ không
Test-Path node_modules

# Nếu không có hoặc thiếu, chạy lại:
npm install
```

---

## Cách 2: Di chuyển bằng PowerShell (Nhanh hơn)

### Bước 1: Tạo thư mục đích

Mở PowerShell và chạy:
```powershell
New-Item -ItemType Directory -Path "D:\Projects" -Force
```

### Bước 2: Di chuyển folder

```powershell
Move-Item -Path "C:\Users\PC\Desktop\DinhLeGroup-Website\companion-journey" -Destination "D:\Projects\companion-journey"
```

### Bước 3: Di chuyển đến thư mục mới

```powershell
cd D:\Projects\companion-journey
```

### Bước 4: Kiểm tra

```powershell
# Kiểm tra các file quan trọng
Test-Path package.json
Test-Path src
Test-Path node_modules

# Nếu node_modules thiếu, chạy:
npm install
```

---

## Cách 3: Copy bằng lệnh Robocopy (Nhanh nhất, giữ nguyên quyền)

### Bước 1: Tạo thư mục đích

```powershell
New-Item -ItemType Directory -Path "D:\Projects" -Force
```

### Bước 2: Copy bằng Robocopy

```powershell
robocopy "C:\Users\PC\Desktop\DinhLeGroup-Website\companion-journey" "D:\Projects\companion-journey" /E /COPYALL
```

### Bước 3: Di chuyển đến thư mục mới

```powershell
cd D:\Projects\companion-journey
```

---

## ✅ Sau khi di chuyển

### 1. Kiểm tra file quan trọng

```powershell
# Kiểm tra các file/folder chính
Test-Path package.json
Test-Path src
Test-Path public
Test-Path node_modules
```

### 2. Cài lại dependencies (nếu cần)

Nếu `node_modules` không có hoặc bị lỗi:
```powershell
npm install
```

### 3. Kiểm tra ứng dụng chạy được

```powershell
npm run dev
```

Nếu chạy thành công → ✅ Hoàn tất!

---

## ⚠️ Lưu ý quan trọng

1. **File .env**: Nếu đã tạo file `.env`, đảm bảo nó cũng được copy sang
2. **Git**: Nếu có git repository, folder `.git` cũng sẽ được copy
3. **node_modules**: Có thể xóa và cài lại để đảm bảo không có vấn đề:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

---

## 🎯 Đường dẫn mới đề xuất

- **D:\Projects\companion-journey\**
- **D:\Development\companion-journey\**
- **D:\Code\companion-journey\**

Chọn đường dẫn nào bạn thích!

---

## 📝 Checklist sau khi di chuyển

- [ ] Folder đã được copy/di chuyển sang ổ D
- [ ] Đã mở PowerShell trong thư mục mới
- [ ] Đã kiểm tra các file quan trọng
- [ ] Đã chạy `npm install` (nếu cần)
- [ ] Đã test `npm run dev` thành công
- [ ] File `.env` đã được copy (nếu có)

---

Sau khi di chuyển xong, tiếp tục làm theo `HUONG_DAN_LAY_KEYS.md` để lấy Firebase và Gemini keys!

