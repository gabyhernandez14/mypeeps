import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-YLaJmye04pVCjkd8epAvZ7BEX3lRFBE",
  authDomain: "mypeeps-8bd58.firebaseapp.com",
  projectId: "mypeeps-8bd58",
  storageBucket: "mypeeps-8bd58.firebasestorage.app",
  messagingSenderId: "944792768609",
  appId: "1:944792768609:web:d0ffed24b0bfddefb0da20"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 