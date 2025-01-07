import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Pastikan menggunakan impor modular
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAGnR5D8qAQ1aJAvzxCkBOpXUxdC19Jowo",
    authDomain: "vocab-garden-74fad.firebaseapp.com",
    projectId: "vocab-garden-74fad",
    storageBucket: "vocab-garden-74fad.firebasestorage.app",
    messagingSenderId: "1009466081750",
    appId: "1:1009466081750:web:1f61cba05525d184a82477"
  };
  

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan auth dan firestore dengan cara modular
const auth = getAuth(app);
const db = getFirestore(app);

// Inisialisasi Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider, db };
