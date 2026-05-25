import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-L4oBn_1QerjYtD8uCuSfe8g3OuCchmk",
  authDomain: "portfolio-ce5b6.firebaseapp.com",
  projectId: "portfolio-ce5b6",
  storageBucket: "portfolio-ce5b6.firebasestorage.app",
  messagingSenderId: "278877009421",
  appId: "1:278877009421:web:69d5ec1a5f74ff2e2d4744",
  measurementId: "G-W74R8DMHYX"
};

// Khởi tạo Firebase App
export const app = initializeApp(firebaseConfig);

// Khởi tạo và export Firestore database instance
export const db = getFirestore(app);

// Khởi tạo Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
