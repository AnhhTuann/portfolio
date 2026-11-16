# ============================================================
# Stage 1: Build frontend (React + Vite)
# ============================================================
FROM node:22-alpine AS build-frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
# Dùng /api relative path - Nginx sẽ proxy, không cần hardcode domain
RUN VITE_API_URL="" npm run build

# ============================================================
# Stage 2: Production backend
# ============================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Copy frontend build output vào thư mục để serve
COPY --from=build-frontend /app/frontend/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
