# 🎬 Anh Tuấn — Cinematic Portfolio

> _Nơi logic của Code giao thoa cùng cảm xúc của Nghệ thuật & Sự sống._

Trang web portfolio cá nhân với phong cách **Cinematic**, hỗ trợ **Light/Dark Mode**, tích hợp hệ thống quản trị nội dung (Admin Panel) và kết nối Firebase Firestore.

---

## ✨ Tính Năng Chính

- 🌗 **Light / Dark Theme** — Chuyển đổi mượt mà với accent color riêng cho từng chế độ
- 🎨 **Cinematic UI** — Aurora glow, 3D perspective cards, scanline effects, grayscale-to-color hover
- 🔐 **Admin Panel** — Đăng nhập Google, quản lý Profile / Projects / Artworks (CRUD)
- 🖼️ **Base64 Image** — Ảnh được nén và mã hóa Base64, lưu trực tiếp vào Firestore (miễn phí, không cần Storage)
- ✏️ **Local Editor** — Chỉnh sửa phần "About" và "Skills" ngay trên Admin, lưu tạm vào localStorage
- 📬 **Contact Form** — Gửi tin nhắn liên hệ trực tiếp vào Firestore
- 📱 **Responsive** — Tương thích mọi kích thước màn hình

---

## 🛠️ Tech Stack

| Công nghệ              | Vai trò                 |
| ---------------------- | ----------------------- |
| React 19               | UI Framework            |
| TypeScript             | Type safety             |
| Tailwind CSS v4        | Styling (utility-first) |
| Vite 6                 | Build tool & Dev server |
| Firebase Auth          | Xác thực Google Sign-In |
| Cloud Firestore        | Database (NoSQL)        |
| Framer Motion (motion) | Animations              |
| Lucide React           | Icon system             |
| react-easy-crop        | Crop avatar hình tròn   |

---

## 🚀 Chạy Dự Án

**Yêu cầu:** Node.js ≥ 18

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy dev server
npm run dev

# 3. Build production
npm run build

# 4. Kiểm tra TypeScript
npm run lint
```

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── App.tsx                    # Router + ThemeProvider
├── index.css                  # CSS Variables + Tailwind v4 config
├── lib/firebase.ts            # Firebase config (Auth + Firestore)
├── services/
│   ├── dataService.ts         # CRUD: Profile, Projects, Artworks, Messages
│   └── authService.ts         # Google Sign-In / Sign-Out
├── pages/
│   ├── Portfolio.tsx           # Trang chính
│   ├── Admin.tsx               # Trang quản trị (Protected)
│   └── Login.tsx               # Đăng nhập Google
└── components/
    ├── ThemeProvider.tsx        # Dark/Light mode context
    ├── ThemeToggle.tsx          # Nút chuyển theme
    ├── DigitalCanvas.tsx        # Hiển thị Projects (3D cards)
    ├── ArtisticVision.tsx       # Hiển thị Artworks (Masonry)
    ├── TechnicalMastery.tsx     # Hiển thị Skills
    ├── AboutManager.tsx         # Admin: sửa About (localStorage)
    ├── SkillsManager.tsx        # Admin: sửa Skills (localStorage)
    ├── ProjectManager.tsx       # Admin: CRUD Projects (Firestore)
    └── ArtworkManager.tsx       # Admin: CRUD Artworks (Firestore)
```

---

## 🔥 Cấu Hình Firebase

1. Tạo project tại [Firebase Console](https://console.firebase.google.com/)
2. Bật **Authentication → Google Sign-In**
3. Bật **Cloud Firestore** (production mode)
4. Copy config vào `src/lib/firebase.ts`

> Chi tiết đầy đủ về Firestore Rules, cấu trúc database, kỹ thuật Base64 và các hiệu ứng UI → xem [DOCUMENTATION.md](./DOCUMENTATION.md)

---

## 📄 License

MIT © Anh Tuấn
