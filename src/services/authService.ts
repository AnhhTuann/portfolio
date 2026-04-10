import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Lỗi đăng nhập Google:", error.message);
    return { success: false, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error("Lỗi đăng nhập Email:", error.message);
    let msg = error.message;
    if (error.code === 'auth/invalid-credential') msg = 'Email hoặc mật khẩu không đúng.';
    if (error.code === 'auth/user-not-found') msg = 'Tài khoản không tồn tại.';
    if (error.code === 'auth/wrong-password') msg = 'Sai mật khẩu.';
    if (error.code === 'auth/too-many-requests') msg = 'Quá nhiều lần thử. Vui lòng đợi.';
    return { success: false, error: msg };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error("Lỗi đăng xuất:", error.message);
    return { success: false, error: error.message };
  }
};
