import { collection, getDocs, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPESCRIPT) ---
export interface Profile {
  name: string;
  avatarUrl: string;
  description: string;
  role: string[];
}

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createAt?: string;
}

export interface Project {
  id: string;
  name: string;
  painPoint: string;
  techStack: string[];
  imageUrl: string;
  liveLink?: string;
  sourceCode?: string;
}

export interface MessageData {
  name: string;
  email: string;
  message: string;
}

// --- CÁC HÀM TƯƠNG TÁC VỚI FIRESTORE ---

/**
 * Lấy danh sách tranh vẽ và bể cá từ collection 'artworks'
 */
export const getArtworks = async (): Promise<Artwork[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'artworks'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Artwork[];
  } catch (error) {
    console.error("Lỗi khi tải Artworks:", error);
    return [];
  }
};

/**
 * Lấy danh sách dự án từ collection 'projects'
 */
export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Project[];
  } catch (error) {
    console.error("Lỗi khi tải Projects:", error);
    return [];
  }
};

/**
 * Lưu tin nhắn liên hệ vào collection 'messages'
 */
export const saveContactMessage = async (data: MessageData) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn:", error);
    return { success: false, error };
  }
};

/**
 * Lấy cấu hình profile từ collection 'portfolio_settings'
 */
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const docRef = doc(db, 'portfolio_settings', 'profile');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi tải Profile:", error);
    return null;
  }
};

/**
 * Cập nhật cấu hình profile
 */
export const updateProfile = async (data: Profile) => {
  try {
    const docRef = doc(db, 'portfolio_settings', 'profile');
    await setDoc(docRef, data, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật Profile:", error);
    return { success: false, error };
  }
};
