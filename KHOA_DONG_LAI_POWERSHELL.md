# 🔄 Khởi động lại PowerShell

## Vấn đề
Sau khi cài Node.js, PowerShell hiện tại có thể chưa nhận ra lệnh `npm` và `node`.

## Giải pháp

### Bước 1: Đóng PowerShell hiện tại
- Đóng cửa sổ PowerShell đang mở

### Bước 2: Mở PowerShell mới
- Nhấn `Windows + X`
- Chọn **"Windows PowerShell"** hoặc **"Terminal"**
- Hoặc tìm "PowerShell" trong Start Menu

### Bước 3: Kiểm tra Node.js
Chạy lệnh:
```powershell
node --version
npm --version
```

Nếu hiển thị số phiên bản (ví dụ: v20.10.0) → ✅ Thành công!

### Bước 4: Di chuyển đến thư mục project
```powershell
cd C:\Users\PC\Desktop\DinhLeGroup-Website\companion-journey
```

### Bước 5: Cài đặt dependencies
```powershell
npm install
```

---

## Nếu vẫn không được

### Kiểm tra Node.js đã cài chưa:
1. Mở **File Explorer**
2. Vào: `C:\Program Files\nodejs\`
3. Nếu thấy file `node.exe` → Node.js đã cài
4. Nếu không thấy → Cần cài lại Node.js

### Cài lại Node.js:
1. Truy cập: https://nodejs.org/
2. Tải phiên bản **LTS**
3. Chạy installer
4. **Quan trọng**: Chọn "Add to PATH" khi cài (mặc định đã chọn)
5. Khởi động lại máy tính (hoặc ít nhất là PowerShell)

---

## Kiểm tra PATH

Nếu Node.js đã cài nhưng vẫn không chạy được:

1. Mở **System Properties**:
   - Nhấn `Windows + R`
   - Gõ: `sysdm.cpl`
   - Enter

2. Vào tab **"Advanced"** → **"Environment Variables"**

3. Trong **"System variables"**, tìm **"Path"**
   - Click **"Edit"**
   - Kiểm tra có: `C:\Program Files\nodejs\`
   - Nếu không có → Click **"New"** → Thêm: `C:\Program Files\nodejs\`
   - Click **OK** → **OK**

4. **Khởi động lại PowerShell** và thử lại

