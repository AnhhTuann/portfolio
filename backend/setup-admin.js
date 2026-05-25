import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './models/index.js';

dotenv.config();

const createAdmin = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('❌ Vui lòng thiết lập MONGODB_URI trong file .env trước!');
    process.exit(1);
  }

  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || '123456';

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    const count = await User.countDocuments();
    if (count > 0) {
      console.log('⚠️ Admin đã tồn tại. Không thể tạo thêm.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    console.log(`🎉 Đã khởi tạo Admin thành công!\n- Username: ${username}\n- Password: ${password}`);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
