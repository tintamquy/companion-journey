# 📝 Hướng dẫn tạo file .env

## Cách 1: Tạo bằng Notepad (Dễ nhất)

1. Mở **Notepad** (Windows)
2. Copy nội dung sau và paste vào:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
```

3. Điền thông tin vào sau dấu `=` (không có khoảng trắng)
4. Click **File** → **Save As**
5. Trong "File name", gõ: **`.env`** (bao gồm dấu chấm ở đầu)
6. Trong "Save as type", chọn: **"All Files (*.*)"**
7. Lưu vào thư mục: `C:\Users\PC\Desktop\DinhLeGroup-Website\companion-journey\`
8. Click **Save**

⚠️ **QUAN TRỌNG**: File phải tên là `.env` (không phải `.env.txt`)

---

## Cách 2: Tạo bằng PowerShell

Mở PowerShell trong thư mục `companion-journey` và chạy:

```powershell
@"
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
"@ | Out-File -FilePath .env -Encoding utf8
```

Sau đó mở file `.env` bằng Notepad và điền thông tin.

---

## Cách 3: Copy từ .env.example

1. Trong thư mục `companion-journey`, tìm file `.env.example`
2. Copy file này
3. Đổi tên thành `.env`
4. Mở bằng Notepad và điền thông tin

---

## ⚠️ Lưu ý quan trọng

1. **Không có khoảng trắng** sau dấu `=`
2. **Không có dấu ngoặc kép** (trừ khi giá trị có khoảng trắng)
3. **Không có dấu phẩy** ở cuối
4. File phải tên chính xác là **`.env`** (không phải `.env.txt`)

---

## Ví dụ file .env đúng:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=my-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-project-id
VITE_FIREBASE_STORAGE_BUCKET=my-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_GEMINI_API_KEY=AIzaSyC0987654321zyxwvutsrqponmlkj
```

---

## Kiểm tra file .env đã tạo đúng:

Mở PowerShell và chạy:
```powershell
Get-Content .env
```

Nếu thấy nội dung → ✅ Thành công!

