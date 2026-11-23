import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { pool, initDb } from './db.js';

dotenv.config();

const createAdmin = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('❌ Vui lòng thiết lập DATABASE_URL trong file .env trước!');
    process.exit(1);
  }

  const username = process.argv[2];
  const password = process.argv[3];
  if (!username || !password || password.length < 16) {
    console.error('Provide an explicit admin username and password of at least 16 characters.');
    process.exit(1);
  }

  try {
    await initDb();

    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users');
    if (rows[0].count > 0) {
      console.log('⚠️ Admin đã tồn tại. Không thể tạo thêm.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);

    console.log(`Admin account ${username} provisioned successfully.`);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

createAdmin();
