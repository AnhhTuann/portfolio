import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = express.Router();

// Route Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();

    if (!cleanUsername || !cleanPassword) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' });
    }

    const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(TRIM(username)) = LOWER($1)', [cleanUsername]);
    const user = rows[0];
    if (!user) return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });

    const validPass = await bcrypt.compare(cleanPassword, user.password_hash);
    if (!validPass) return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route tạo Admin (Dùng nội bộ khi setup)
router.post('/setup', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users');
    if (rows[0].count > 0) return res.status(400).json({ success: false, message: 'Admin đã tồn tại.' });

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);

    res.json({ success: true, message: 'Admin created.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
