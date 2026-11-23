import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb, pool } from './db.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

dotenv.config();

export const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 5000;

if (!process.env.DATABASE_URL) {
  console.error('❌ Vui lòng thiết lập DATABASE_URL trong file .env!');
  process.exit(1);
}

// Vercel Functions allow only a small request body; larger images need object storage.
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ limit: '3mb', extended: true }));
const allowedOrigins = new Set((process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',').map(value => value.trim()).filter(Boolean));
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.has(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed'));
} }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'unavailable', database: 'disconnected' });
  }
});

// Vercel Functions import this Express app and must not listen on a port.
// Schema has been initialized separately on the existing empty Neon project.
if (process.env.VERCEL !== '1') {
  initDb()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => {
      console.error('Error connecting to PostgreSQL:', error);
      process.exitCode = 1;
    });
}
