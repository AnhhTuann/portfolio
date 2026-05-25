const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/auth`;

export const signInWithEmail = async (username: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      return { success: true };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error: any) {
    return { success: false, error: 'Không thể kết nối đến máy chủ.' };
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  return { success: true };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
