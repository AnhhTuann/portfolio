# Deploy Portfolio lên Oracle Cloud

> Stack: React + Vite (frontend) | Express + PostgreSQL (backend) | Docker Compose | Nginx

---

## Kiến trúc

```
Internet (port 80/443)
    └── Nginx (host)
            ├── GET /api/* → proxy → Docker backend (127.0.0.1:5000)
            └── GET /* → static files (/var/www/portfolio)

Docker Compose:
    portfolio_postgres  (127.0.0.1:5432)
    portfolio_backend   (127.0.0.1:5000)
```

---

## Lần đầu setup Oracle server

### 1. Cài Docker & Nginx

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Cài Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Cài Nginx
sudo apt install -y nginx

# Bật Nginx auto-start
sudo systemctl enable --now nginx
```

### 2. Mở port trên Oracle Cloud

Vào **Oracle Cloud Console → Networking → Virtual Cloud Networks → Security Lists**:
- Thêm Ingress Rule: **TCP port 80** (HTTP)
- Thêm Ingress Rule: **TCP port 443** (HTTPS - khi có SSL)

Và mở firewall trên VM:
```bash
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
# Lưu rules
sudo netfilter-persistent save
```

### 3. Clone repo

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git /home/ubuntu/portfolio
cd /home/ubuntu/portfolio
```

### 4. Tạo file `.env`

```bash
cp .env.example .env
nano .env
```

Điền vào:
```env
POSTGRES_PASSWORD=mot_password_manh_o_day
JWT_SECRET=mot_chuoi_random_rat_dai_va_phuc_tap_o_day
PORT=5000
```

### 5. Build và chạy Docker Compose

```bash
docker compose build
docker compose up -d

# Kiểm tra containers đang chạy
docker compose ps

# Xem logs backend
docker compose logs -f backend
```

### 6. Tạo admin user

```bash
# Exec vào container backend
docker compose exec backend node setup-admin.js
```

### 7. Setup Nginx

```bash
# Copy config
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio

# Sửa domain (tạm để IP nếu chưa có domain)
sudo nano /etc/nginx/sites-available/portfolio
# → Thay YOUR_DOMAIN bằng IP public hoặc domain thật

# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Copy frontend dist (lần đầu)
sudo mkdir -p /var/www/portfolio
CONTAINER=$(docker compose ps -q backend)
docker cp "$CONTAINER:/app/public/." /var/www/portfolio/
sudo chown -R www-data:www-data /var/www/portfolio

# Reload Nginx
sudo systemctl reload nginx
```

### 8. Kiểm tra

```bash
# Backend API
curl http://localhost:5000/api/health
# → {"status":"ok"}

# Qua Nginx
curl http://YOUR_IP/api/health
# → {"status":"ok"}

# Mở browser: http://YOUR_IP
```

---

## Deploy lần sau (cập nhật code)

```bash
cd /home/ubuntu/portfolio
./deploy.sh
```

> Script tự động: pull code → build → restart → copy dist → xong ✅

---

## Thêm SSL với Certbot (khi có domain)

```bash
# Cài certbot
sudo apt install -y certbot python3-certbot-nginx

# Lấy SSL cert (thay YOUR_DOMAIN)
sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN

# Auto-renew
sudo systemctl enable certbot.timer
```

---

## Troubleshooting

| Vấn đề | Lệnh kiểm tra |
|--------|---------------|
| Backend không lên | `docker compose logs backend` |
| DB connection fail | `docker compose logs postgres` |
| Nginx 502 Bad Gateway | `curl http://127.0.0.1:5000/api/health` |
| Nginx config lỗi | `sudo nginx -t` |
| Frontend không cập nhật | Chạy `./deploy.sh` lại |
| Xem tất cả containers | `docker compose ps` |
| Restart một service | `docker compose restart backend` |

---

## Ports Reference

| Service | Bind | Expose ra ngoài |
|---------|------|----------------|
| PostgreSQL | `127.0.0.1:5432` | ❌ Không |
| Backend API | `127.0.0.1:5000` | ❌ Không (qua Nginx) |
| Nginx HTTP | `0.0.0.0:80` | ✅ Port 80 |
| Nginx HTTPS | `0.0.0.0:443` | ✅ Port 443 (sau khi SSL) |
