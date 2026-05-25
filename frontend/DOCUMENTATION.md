# 🎬 Cinematic Portfolio — Tài Liệu Kỹ Thuật

> Trang web portfolio cá nhân với phong cách **Cinematic Dark/Light Mode**, được xây dựng bằng React + Firebase, hệ thống Admin tự quản lý nội dung không cần backend riêng.

---

## 📁 Cấu Trúc Dự Án

```
src/
├── App.tsx                          # Router chính + ThemeProvider
├── main.tsx                         # Entry point
├── index.css                        # Hệ thống CSS Variables + Tailwind v4
├── lib/
│   └── firebase.ts                  # Cấu hình Firebase (Auth + Firestore)
├── services/
│   ├── dataService.ts               # CRUD Firestore (Profile, Projects, Artworks, Messages)
│   └── authService.ts               # Google Sign-In / Sign-Out
├── pages/
│   ├── Portfolio.tsx                 # Trang chính hiển thị portfolio
│   ├── Admin.tsx                    # Trang quản trị (Protected)
│   └── Login.tsx                    # Trang đăng nhập Google
└── components/
    ├── ThemeProvider.tsx             # Context quản lý Dark/Light mode
    ├── ThemeToggle.tsx              # Nút chuyển đổi theme (Sun/Moon)
    ├── ProtectedRoute.tsx           # Guard route yêu cầu đăng nhập
    ├── DigitalCanvas.tsx            # Hiển thị Projects (3D Perspective)
    ├── ArtisticVision.tsx           # Hiển thị Artworks (Masonry Layout)
    ├── TechnicalMastery.tsx         # Hiển thị Skills (đọc từ localStorage)
    ├── AboutManager.tsx             # Admin: Chỉnh sửa phần "About" (localStorage)
    ├── SkillsManager.tsx            # Admin: Chỉnh sửa Skills (localStorage)
    ├── ProjectManager.tsx           # Admin: CRUD Projects (Firestore)
    └── ArtworkManager.tsx           # Admin: CRUD Artworks (Firestore)
```

---

## 📦 Packages Đã Cài Đặt

### Dependencies (Production)

| Package | Version | Chức năng |
|---------|---------|-----------|
| **react** | ^19.0.0 | Thư viện UI chính |
| **react-dom** | ^19.0.0 | Render React vào DOM |
| **react-router-dom** | ^7.14.0 | Routing SPA (`/`, `/login`, `/admin`) |
| **firebase** | ^12.11.0 | Backend-as-a-Service: Auth + Firestore |
| **motion** | ^12.23.24 | Animation library (Framer Motion v12) — page transitions, hover effects |
| **lucide-react** | ^0.546.0 | Icon library (Sun, Moon, ChevronDown, Save, Trash2...) |
| **react-easy-crop** | ^5.5.7 | Crop ảnh Avatar hình tròn trước khi lưu |
| **vite** | ^6.2.0 | Build tool + Dev server siêu nhanh |
| **@tailwindcss/vite** | ^4.1.14 | Plugin Tailwind CSS v4 cho Vite |
| **@vitejs/plugin-react** | ^5.0.4 | Plugin React cho Vite (JSX transform) |

### DevDependencies

| Package | Version | Chức năng |
|---------|---------|-----------|
| **tailwindcss** | ^4.1.14 | Utility-first CSS framework (v4 — không cần `tailwind.config.js`) |
| **typescript** | ~5.8.2 | Type checking cho toàn bộ codebase |
| **autoprefixer** | ^10.4.21 | Tự động thêm vendor prefix cho CSS |

---

## 🔥 Kết Nối Firebase

### Bước 1: Tạo Project Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới (VD: `portfolio-ce5b6`)
3. Bật **Authentication → Google Sign-In**
4. Bật **Cloud Firestore** (chế độ production)

### Bước 2: Lấy Config

Vào **Project Settings → General → Your apps → Web app**, copy config:

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

### Bước 3: Cấu Trúc Firestore

```
Firestore Database
├── portfolio_settings/
│   └── profile (document)
│       ├── name: "Anh Tuấn"
│       ├── avatarUrl: "data:image/jpeg;base64,..."
│       ├── description: "Kỹ sư CNTT từ SGU..."
│       └── role: ["Software Engineer", "Creative Explorer"]
│
├── projects/ (collection)
│   └── {auto-id} (document)
│       ├── name: "NEXUS CMS"
│       ├── painPoint: "Hệ thống quản lý cũ quá cồng kềnh..."
│       ├── techStack: ["Next.js", "Tailwind", "Firestore"]
│       ├── imageUrl: "data:image/jpeg;base64,..."
│       ├── liveLink: "https://..."
│       ├── sourceCode: "https://github.com/..."
│       └── createdAt: "2026-04-09T..."
│
├── artworks/ (collection)
│   └── {auto-id} (document)
│       ├── title: "Nỗi ám ảnh..."
│       ├── imageUrl: "data:image/jpeg;base64,..."
│       ├── description: "2 giờ sáng, ánh đèn..."
│       └── createdAt: "2026-04-09T..."
│
└── messages/ (collection)
    └── {auto-id} (document)
        ├── name: "Người gửi"
        ├── email: "email@gmail.com"
        ├── message: "Nội dung..."
        └── createdAt: "2026-04-09T..."
```

### Bước 4: Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Ai cũng đọc được (trang portfolio công khai)
    match /{document=**} {
      allow read: if true;
    }
    // Chỉ user đã đăng nhập mới được ghi
    match /portfolio_settings/{doc} {
      allow write: if request.auth != null;
    }
    match /projects/{doc} {
      allow write: if request.auth != null;
    }
    match /artworks/{doc} {
      allow write: if request.auth != null;
    }
    // Ai cũng gửi được tin nhắn liên hệ
    match /messages/{doc} {
      allow create: if true;
    }
  }
}
```

---

## 🖼️ Kỹ Thuật Base64 — Lưu Ảnh Không Cần Storage

### Tại sao dùng Base64?

Firebase Storage **tính phí** theo dung lượng và lượt tải. Để **hoàn toàn miễn phí**, ta mã hóa ảnh thành chuỗi Base64 rồi lưu trực tiếp vào Firestore dưới dạng text.

### Cách hoạt động

```
Ảnh gốc (5MB) → FileReader → Canvas resize → toDataURL('image/jpeg', 0.8) → Chuỗi Base64 (~50-80KB)
```

### Code xử lý (ProjectManager.tsx)

```typescript
const handleImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 500;

        // Auto-crop ra tỉ lệ 16:10
        const targetRatio = 16 / 10;
        const imgRatio = img.width / img.height;
        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

        if (imgRatio > targetRatio) {
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }

        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        // Xuất JPEG chất lượng 80% → nhẹ nhàng cho Firestore
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    };
  });
};
```

### Hai chiến lược crop khác nhau

| Component | Chiến lược | Kích thước đầu ra |
|-----------|-----------|-------------------|
| **ProjectManager** | Auto-crop 16:10 (cắt bớt mép) | 800 × 500 px |
| **ArtworkManager** | Giữ nguyên tỉ lệ gốc (chỉ scale down) | Cạnh dài ≤ 800 px |
| **Admin Avatar** | Crop tròn thủ công (react-easy-crop) | 400 × 400 px |

---

## 🌗 Hệ Thống Light/Dark Theme

### Kiến trúc CSS Variables (index.css)

```css
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #FAFAFA;    /* Nền trắng sữa */
  --surface: #FFFFFF;       /* Thẻ card */
  --primary: #111827;       /* Chữ chính (đen) */
  --secondary: #374151;     /* Chữ phụ */
  --muted: #6B7280;         /* Chữ mờ */
  --subtle: rgba(0,0,0,0.1);  /* Viền nhẹ */
}

.dark {
  --background: #050505;    /* Nền đen cực */
  --surface: #0a0a0a;       /* Thẻ card tối */
  --primary: #ffffff;       /* Chữ trắng */
  --secondary: #d1d5db;
  --muted: #9ca3af;
  --subtle: rgba(255,255,255,0.05);
}
```

### Tại sao cần `@custom-variant dark`?

Tailwind CSS v4 mặc định dùng `prefers-color-scheme` (theo OS). Dòng `@custom-variant` ép Tailwind nghe theo class `.dark` trên thẻ `<html>` thay vì hệ điều hành, cho phép nút toggle hoạt động đúng.

### ThemeProvider (React Context)

```typescript
// Lưu theme vào localStorage, thêm/gỡ class .dark vào document.documentElement
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'dark';
});

useEffect(() => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

## 📝 Local Content Editor (Không cần DB)

Hai phần nội dung **"The Architect & The Artist"** và **"Technical Mastery"** có thể chỉnh sửa từ trang Admin mà **không lưu vào Firestore**, chỉ dùng `localStorage`.

### Cách hoạt động

```
Admin (sửa) → localStorage.setItem('about_data', JSON.stringify(data))
                                    ↓
Portfolio (hiển thị) → localStorage.getItem('about_data') → parse → render
```

### Đồng bộ Real-time giữa các tab

```typescript
// Portfolio.tsx lắng nghe sự kiện storage
useEffect(() => {
  const handleStorage = () => {
    const saved = localStorage.getItem('about_data');
    if (saved) setAboutData(JSON.parse(saved));
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, []);
```

> **Lưu ý:** Dữ liệu localStorage chỉ tồn tại trên thiết bị/trình duyệt đó. Nếu xóa cache trình duyệt, dữ liệu sẽ mất và tự động hiển thị giá trị mặc định.

---

## 🎨 Hiệu Ứng Đặc Biệt

### Aurora Glow (Hero Section)
Hiệu ứng ánh sáng Cực Quang chuyển động chậm bao quanh avatar:
```css
@keyframes aurora {
  0%   { transform: scale(1) translate(0, 0); opacity: 0.3; }
  33%  { transform: scale(1.2) translate(10vw, 5vh); opacity: 0.5; }
  66%  { transform: scale(0.8) translate(-5vw, 10vh); opacity: 0.4; }
  100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
}
```

### 3D Perspective Cards (DigitalCanvas)
Mỗi project card xoay nhẹ theo trục Y khi hover:
```css
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
/* Xoay 5° khi hover */
group-hover:rotate-y-[5deg] group-hover:translate-z-10
```

### Scanline Effect
Hiệu ứng tia quét dọc ảnh project kiểu cyberpunk:
```css
@keyframes scanline {
  0%   { transform: translateY(-10px); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateY(1000px); opacity: 0; }
}
```

### Grayscale → Color on Hover
Ảnh project mặc định grayscale + opacity thấp, khi hover chuyển sang full color:
```html
grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100
```

---

## 🔐 Hệ Thống Xác Thực

### Flow đăng nhập

```
User → /login → Click "ĐĂNG NHẬP VỚI GOOGLE"
                    ↓
        Firebase Auth (signInWithPopup + GoogleAuthProvider)
                    ↓
        onAuthStateChanged → redirect → /admin
```

### Protected Route

```typescript
// ProtectedRoute.tsx
export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

---

## 🚀 Chạy Dự Án

```bash
# Cài đặt
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Kiểm tra TypeScript
npm run lint
```

---

## 📌 Ghi Chú Quan Trọng

1. **Firebase API Key** trong `firebase.ts` là **public key** (không phải secret), được thiết kế để dùng ở client-side. Bảo mật nằm ở Firestore Rules.
2. **Giới hạn Firestore document**: Mỗi document tối đa **1MB**. Ảnh Base64 sau khi nén thường ~50-80KB, nên hoàn toàn an toàn.
3. **localStorage** có giới hạn ~5MB mỗi origin. Dữ liệu About/Skills rất nhẹ (~2-5KB) nên không lo tràn.
4. **Tailwind v4** không cần file `tailwind.config.js` — mọi cấu hình nằm trong `@theme {}` block trong CSS.
