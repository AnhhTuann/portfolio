import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

// Route Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Tìm admin
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });

    // Kiểm tra pass
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });

    // Tạo token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Route Đổi mật khẩu hoặc tạo Admin (Dùng nội bộ khi setup)
router.post('/setup', async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count > 0) return res.status(400).json({ success: false, message: 'Admin đã tồn tại.' });

    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.json({ success: true, message: 'Admin created.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
