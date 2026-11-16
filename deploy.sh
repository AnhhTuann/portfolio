#!/bin/bash
# deploy.sh - Script deploy portfolio lên Oracle server
# Dùng: ./deploy.sh

set -e

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIST="/var/www/portfolio"

echo "🚀 [1/5] Pull code mới nhất..."
git pull origin main

echo "🔨 [2/5] Build Docker images..."
docker compose build --no-cache

echo "⬆️  [3/5] Khởi động / restart containers..."
docker compose up -d

echo "⏳ [4/5] Chờ backend healthy..."
sleep 5
for i in {1..12}; do
    if curl -sf http://127.0.0.1:5000/api/health > /dev/null 2>&1; then
        echo "✅ Backend is up!"
        break
    fi
    echo "   Waiting... ($i/12)"
    sleep 5
done

echo "📦 [5/5] Copy frontend dist lên Nginx root..."
sudo mkdir -p "$FRONTEND_DIST"
# Lấy dist từ trong Docker image (không cần build lại)
CONTAINER=$(docker compose ps -q backend)
docker cp "$CONTAINER:/app/public/." "$FRONTEND_DIST/"
sudo chown -R www-data:www-data "$FRONTEND_DIST"

echo ""
echo "✅ Deploy hoàn thành!"
echo "   Backend:  http://127.0.0.1:5000/api/health"
echo "   Frontend: $FRONTEND_DIST"
echo ""
echo "   Reload Nginx: sudo nginx -s reload"
