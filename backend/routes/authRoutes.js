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

// Admin accounts are provisioned offline with setup-admin.js, never through a public API.

export default router;
