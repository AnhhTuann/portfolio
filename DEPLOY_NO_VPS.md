# Deploy Portfolio không dùng VPS (Vercel + Render + PostgreSQL)

> Tài liệu chuẩn bị triển khai; **không có tài khoản hosting hoặc database nào được tạo tự động bằng commit này**.

## 1. Backend API (Render)

- Tạo **Web Service** từ repo `AnhhTuann/portfolio`, root directory: `backend`.
- Runtime: Node.js; build: `npm ci`; start: `npm start`.
- Required environment variables (set privately in Render dashboard): `DATABASE_URL` (PostgreSQL managed, e.g. Neon, with SSL); `JWT_SECRET` (random, strong). Render supplies `PORT`.
- Health check: `/api/health`.
- Ensure database contents have been restored from a valid backup before directing users to this service. On launch `backend/server.js` calls `initDb()`.
- Verify `https://YOUR-BACKEND.onrender.com/api/health` returns JSON; do not use temporary local database URLs.

## 2. Frontend (Vercel)

- Import the same repository, set **Root Directory** to `frontend`.
- Framework: Vite; build: `npm run build`; output: `dist`; install: `npm ci`.
- Add **Production** environment variable: `VITE_API_URL=https://YOUR-BACKEND.onrender.com` (no trailing slash). Frontend API clients append `/api/auth` and `/api/data`.
- `frontend/vercel.json` handles React Router SPA deep links (e.g. /admin) after deployment.
- Verify login, admin dashboard, image upload and contact form with real backend before switching production DNS.

## 3. Custom domain

- In **Vercel → Project → Domains**, add `anhhtuann.eu.org` only after ownership/delegation is confirmed.
- Set DNS A/ALIAS exactly as instructed by Vercel in the authoritative DNS provider (e.g. deSEC); do not guess IP or point to Oracle VPS.
- Keep Render API on its provider hostname unless a dedicated API subdomain is needed; configure it separately if desired.
- Never change nameservers or overwrite an existing working A/CNAME record without checking the current service.

## 4. Deployment checks

1. Backend health returns `{ "status": "ok" }`.
2. Frontend root and nested routes refresh successfully (no 404).
3. Auth and protected data reads/writes use the configured backend.
4. Database and content are present and backed up.
5. Custom domain resolves to correct project with HTTPS.

## Important restrictions

- Render's Free web services may spin down after inactivity; do not promise always-on performance.
- Render's filesystem is ephemeral. This project stores images in PostgreSQL Base64; review Neon storage and network usage.
- Never commit `.env`, passwords, JWT secret, or DB credentials.
- Deploying via Vercel and Render still requires authenticated accounts and one-time secret setup; this GitHub change alone **does not deploy** the site.
