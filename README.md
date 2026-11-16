# 🎬 Nguyễn Đức Anh Tuấn — Cinematic Portfolio (Fullstack Edition)

> _Nơi logic của Code giao thoa cùng cảm xúc của Nghệ thuật & Sự sống._

Dự án Portfolio cá nhân với phong cách **Cinematic**, hỗ trợ **Light/Dark Mode**, tích hợp hệ thống quản trị nội dung (Admin Panel).
Kiến trúc **Fullstack** gồm **React (Frontend)** và **Node.js/Express + PostgreSQL (Backend)**.

---

## ✨ Tính Năng Chính

- 🌗 **Light / Dark Theme** — Chuyển đổi mượt mà với accent color riêng cho từng chế độ
- 🎨 **Cinematic UI** — Aurora glow, film grain, marquee, staggered reveals, 3D perspective cards, spotlight hover, grayscale-to-color
- 🔐 **Admin Panel (JWT Auth)** — Đăng nhập bảo mật bằng Token, quản lý Profile / Projects / Artworks và Hộp Thư Liên Hệ (Inbox)
- 🖼️ **Base64 Image trên PostgreSQL** — Ảnh được nén và mã hóa Base64, lưu trực tiếp vào cột `TEXT` (lên tới hàng chục MB payload).
- 📬 **Contact Form & Inbox** — Gửi tin nhắn liên hệ trực tiếp vào Database và duyệt/xóa ngay trên trang quản trị.
- 📱 **Responsive** — Tương thích mọi kích thước màn hình.
- 📊 **Scroll Progress Bar** — Thanh tiến trình đọc trang mượt mà.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
| Công nghệ              | Vai trò                    |
| ---------------------- | -------------------------- |
| React 19               | UI Framework               |
| TypeScript             | Type safety                |
| Tailwind CSS v4        | Styling (utility-first)    |
| Vite 6                 | Build tool & Dev server    |
| Motion (Framer)        | Animations                 |
| Lucide React           | Icon system                |

### Backend (`/backend`)
| Công nghệ              | Vai trò                       |
| ---------------------- | ----------------------------- |
| Node.js & Express      | API Server                    |
| PostgreSQL (`pg`)      | Cơ sở dữ liệu quan hệ (SQL)   |
| JSON Web Token (JWT)   | Xác thực (Authentication)     |
| Bcryptjs               | Mã hóa mật khẩu               |

---

## 📁 Cấu Trúc Thư Mục

```
portfolio/
├── frontend/                  # Mã nguồn React UI
│   ├── src/
│   │   ├── components/        # Component UI và Admin Managers
│   │   ├── pages/             # Các trang (Portfolio, Admin, Login)
│   │   ├── services/          # Gọi API tới Backend (authService, dataService)
│   │   └── ...
│   └── package.json
│
└── backend/                   # Mã nguồn Node.js Server
    ├── routes/                # Express API Routes (authRoutes, dataRoutes)
    ├── middleware/            # JWT Middleware bảo vệ API
    ├── db.js                  # Kết nối PostgreSQL Pool + init schema
    ├── schema.sql             # Định nghĩa bảng (users, profile, projects, artworks, messages)
    ├── server.js              # Entry point của Backend
    ├── setup-admin.js         # Script tạo tài khoản Admin
    └── package.json
```

---

## 🚀 Hướng Dẫn Khởi Chạy

**Yêu cầu:** Node.js ≥ 18 và PostgreSQL database.

### 1. Khởi chạy Backend
```bash
cd backend
npm install

# Tạo file .env và điền DATABASE_URL, JWT_SECRET
cp .env.example .env

# Chạy script tạo tài khoản Admin (chỉ chạy 1 lần)
node setup-admin.js "ten_admin" "mat_khau"

# Khởi động server (tự động tạo schema nếu chưa có)
node server.js
# Backend sẽ chạy tại http://localhost:5000
```

### 2. Khởi chạy Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend sẽ chạy tại http://localhost:3000
```

### Ví dụ `DATABASE_URL`
```
postgres://postgres:postgres@localhost:5432/portfolio
```

---

## 📄 License

MIT © Nguyễn Đức Anh Tuấn
