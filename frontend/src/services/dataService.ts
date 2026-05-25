const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/data`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const mapId = (item: any) => ({ ...item, id: item._id });

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
  createdAt?: string;
}

export interface Project {
  id: string;
  name: string;
  painPoint: string;
  techStack: string[];
  imageUrl: string;
  liveLink?: string;
  sourceCode?: string;
  createdAt?: string;
}

export interface MessageData {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

// --- CÁC HÀM TƯƠNG TÁC VỚI CUSTOM BACKEND ---

export const getArtworks = async (): Promise<Artwork[]> => {
  try {
    const res = await fetch(`${API_URL}/artworks`);
    const data = await res.json();
    return data.map(mapId);
  } catch (error) {
    console.error("Lỗi khi tải Artworks:", error);
    return [];
  }
};

export const addArtwork = async (data: Omit<Artwork, 'id'>) => {
  try {
    const res = await fetch(`${API_URL}/artworks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const updateArtworkData = async (id: string, data: Partial<Artwork>) => {
  try {
    const res = await fetch(`${API_URL}/artworks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteArtworkData = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/artworks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    return data.map(mapId);
  } catch (error) {
    console.error("Lỗi khi tải Projects:", error);
    return [];
  }
};

export const addProject = async (data: Omit<Project, 'id'>) => {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const updateProjectData = async (id: string, data: Partial<Project>) => {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteProjectData = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const saveContactMessage = async (data: MessageData) => {
  try {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const getMessages = async (): Promise<MessageData[]> => {
  try {
    const res = await fetch(`${API_URL}/messages`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.map(mapId);
  } catch (error) {
    console.error("Lỗi khi tải Tin nhắn:", error);
    return [];
  }
};

export const deleteMessageData = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const updateMessageStatus = async (id: string, read: boolean) => {
  try {
    const res = await fetch(`${API_URL}/messages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ read })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const res = await fetch(`${API_URL}/profile`);
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error("Lỗi khi tải Profile:", error);
    return null;
  }
};

export const updateProfile = async (data: Profile) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, error };
  }
};
