# 🎬 Cinematic Portfolio — Tài Liệu Kỹ Thuật

> Portfolio cá nhân phong cách **Cinematic Dark/Light Mode**, xây dựng bằng **React + Express + PostgreSQL**. Admin tự quản lý nội dung qua JWT Auth, ảnh lưu dạng Base64 trực tiếp trong database.

---

## 📁 Cấu Trúc Dự Án

```
portfolio/
├── frontend/                     # React SPA (Vite + Tailwind v4)
│   └── src/
│       ├── pages/                # Portfolio, Admin, Login
│       ├── components/           # UI components + Admin Managers
│       └── services/             # authService, dataService (gọi REST API)
│
└── backend/                      # Node.js + Express + PostgreSQL
    ├── db.js                     # pg Pool + initDb() chạy schema.sql
    ├── schema.sql                # users / profile / projects / artworks / messages
    ├── routes/                   # authRoutes, dataRoutes
    ├── middleware/               # JWT auth guard
    ├── server.js                 # Entry point
    └── setup-admin.js            # Seed tài khoản admin
```

---

## 🗄️ Database (PostgreSQL)

Schema được tạo tự động khi backend khởi động (`initDb()` đọc `schema.sql`):

| Bảng        | Vai trò                                        |
| ----------- | ---------------------------------------------- |
| `users`     | Tài khoản admin (username + bcrypt hash)       |
| `profile`   | Singleton (id=1): name, avatar, mô tả, roles   |
| `projects`  | Dự án: name, pain_point, tech_stack (JSONB), ảnh Base64 |
| `artworks`  | Tranh/ảnh nghệ thuật                           |
| `messages`  | Tin nhắn liên hệ từ form                       |

Kết nối qua `DATABASE_URL` trong `backend/.env`:

```env
DATABASE_URL=postgres://user:pass@host:5432/portfolio
JWT_SECRET=change_me
PORT=5000
```

> Hoạt động trực tiếp với PostgreSQL. Với hosted DB yêu cầu SSL, `db.js` tự bật `ssl: { rejectUnauthorized: false }`.

---

## 🔐 Authentication

- Login: `POST /api/auth/login` → trả về JWT (7 ngày), lưu ở `localStorage`.
- Guard: `Authorization: Bearer <token>` trên mọi route ghi (`authMiddleware`).
- Tạo admin: `node setup-admin.js <username> <password>` (chỉ chạy khi bảng `users` trống).

---

## 🖼️ Ảnh Base64 trong PostgreSQL

Ảnh project/artwork/avatar được resize + nén phía client (Canvas) thành Base64 JPEG rồi lưu vào cột `TEXT`. Payload JSON giới hạn **50MB** ở Express.

---

## 🎨 Hiệu Ứng Animation

- **Aurora glow**: blob màu blur chuyển động chậm toàn màn hình.
- **Film grain**: overlay noise SVG chuyển động kiểu cinematic.
- **Scroll progress bar**: `useScroll` + `useSpring` của Motion.
- **Hero**: stagger reveal từng từ của tên, avatar với conic-gradient ring xoay + orbiting dot.
- **Marquee**: dải tech stack chạy vô hạn ở cuối hero.
- **Sections**: blur+rise reveal khi scroll vào viewport.
- **Projects**: spotlight theo con trỏ, 3D tilt hover, grayscale→color, scanline, index watermark.
- **Gallery**: masonry stagger reveal, overlay trượt lên khi hover.

---

## 🚀 Chạy Dự Án

```bash
# Backend
cd backend && npm install && cp .env.example .env
node setup-admin.js admin 123456
node server.js          # :5000

# Frontend
cd frontend && npm install
npm run dev             # :3000
```

---

## 📌 Ghi Chú

1. `VITE_API_URL` trong `frontend/.env` trỏ tới backend (mặc định `http://localhost:5000`).
2. About & Skills lưu `localStorage` (chỉnh từ Admin, không cần DB).
3. Tailwind v4 cấu hình qua `@theme {}` trong `index.css`, không cần `tailwind.config.js`.
