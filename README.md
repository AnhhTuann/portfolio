# 🎬 Anh Tuấn — Cinematic Portfolio (Fullstack Edition)

> _Nơi logic của Code giao thoa cùng cảm xúc của Nghệ thuật & Sự sống._

Dự án Portfolio cá nhân với phong cách **Cinematic**, hỗ trợ **Light/Dark Mode**, tích hợp hệ thống quản trị nội dung (Admin Panel). 
Đã được nâng cấp từ kiến trúc Firebase sang kiến trúc **Fullstack thực thụ** với **React (Frontend)** và **Node.js/Express + MongoDB (Backend)**.

---

## ✨ Tính Năng Chính

- 🌗 **Light / Dark Theme** — Chuyển đổi mượt mà với accent color riêng cho từng chế độ
- 🎨 **Cinematic UI** — Aurora glow, 3D perspective cards, scanline effects, grayscale-to-color hover
- 🔐 **Admin Panel (JWT Auth)** — Đăng nhập bảo mật bằng Token, quản lý Profile / Projects / Artworks và Hộp Thư Liên Hệ (Inbox)
- 🖼️ **Base64 Image trên MongoDB** — Ảnh được nén siêu tiết kiệm và mã hóa Base64, lưu trực tiếp vào MongoDB (lên tới 16MB/bản ghi).
- 📬 **Contact Form & Inbox** — Gửi tin nhắn liên hệ trực tiếp vào Database và duyệt/trả lời ngay trên trang quản trị.
- 📱 **Responsive** — Tương thích mọi kích thước màn hình.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
| Công nghệ              | Vai trò                 |
| ---------------------- | ----------------------- |
| React 19               | UI Framework            |
| TypeScript             | Type safety             |
| Tailwind CSS v4        | Styling (utility-first) |
| Vite 6                 | Build tool & Dev server |
| Framer Motion          | Animations              |
| Lucide React           | Icon system             |

### Backend (`/backend`)
| Công nghệ              | Vai trò                 |
| ---------------------- | ----------------------- |
| Node.js & Express      | API Server              |
| MongoDB (Mongoose)     | Cơ sở dữ liệu (NoSQL)   |
| JSON Web Token (JWT)   | Xác thực (Authentication)|
| Bcryptjs               | Mã hóa mật khẩu         |

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
    ├── models/                # Mongoose Schema (User, Project, Artwork, Message)
    ├── routes/                # Express API Routes (authRoutes, dataRoutes)
    ├── middleware/            # JWT Middleware bảo vệ API
    ├── server.js              # Entry point của Backend
    ├── setup-admin.js         # Script tạo tài khoản Admin
    └── package.json
```

---

## 🚀 Hướng Dẫn Khởi Chạy

**Yêu cầu:** Node.js ≥ 18 và có tài khoản [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 1. Khởi chạy Backend
```bash
cd backend
npm install

# Tạo file .env và điền MONGODB_URI, JWT_SECRET
cp .env.example .env

# Chạy script tạo tài khoản Admin (chỉ chạy 1 lần)
node setup-admin.js "tên_admin" "mật_khẩu"

# Khởi động server
node server.js
# Backend sẽ chạy tại http://localhost:5000
```

### 2. Khởi chạy Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend sẽ chạy tại http://localhost:3000 hoặc 5173
```

---

## 📄 License

MIT © Anh Tuấn
